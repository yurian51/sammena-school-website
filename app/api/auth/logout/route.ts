import { NextResponse } from "next/server"

const COOKIE_NAME = "sammena_session"

export async function POST() {
  const response = NextResponse.json({ data: { loggedOut: true } }, { status: 200 })
  response.cookies.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  })
  return response
}
