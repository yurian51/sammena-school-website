const CACHE_NAME = "sammena-public-v1";
const OFFLINE_URL = "/offline";
const PRIVATE_PREFIXES = ["/api/", "/portal", "/admin", "/sis", "/admissions/admin"];

function isPrivatePath(pathname) {
  return PRIVATE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(prefix));
}

function isCacheableResponse(response) {
  if (!response.ok) return false;
  if (response.headers.has("Set-Cookie")) return false;

  const cacheControl = response.headers.get("Cache-Control")?.toLowerCase() ?? "";
  if (cacheControl.includes("no-store") || cacheControl.includes("private")) return false;

  return true;
}

async function cacheResponse(request, response) {
  if (!isCacheableResponse(response)) return response;

  const copy = response.clone();
  void caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
  return response;
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(["/offline", "/"]))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin || isPrivatePath(url.pathname)) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => cacheResponse(request, response))
        .catch(async () => {
          const cached = await caches.match(request);
          return cached || caches.match(OFFLINE_URL);
        })
    );
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => cacheResponse(request, response))
      .catch(() => caches.match(request))
  );
});
