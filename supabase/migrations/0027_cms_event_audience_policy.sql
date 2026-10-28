-- Published parent-only calendar events must never be exposed by the public CMS read policy.
drop policy if exists cms_public_read_published on public.cms_content;
create policy cms_public_read_published
  on public.cms_content for select to anon, authenticated
  using (
    status = 'PUBLISHED'
    and (published_at is null or published_at <= now())
    and (expires_at is null or expires_at > now())
    and (type <> 'EVENT' or event_audience = 'PUBLIC')
  );
