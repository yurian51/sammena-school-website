-- Default-deny browser/API access to application tables.
-- Server-side PostgreSQL access remains governed by DATABASE_URL credentials.
DO $$
DECLARE
  table_record record;
BEGIN
  FOR table_record IN
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public'
      AND tablename <> '_sammena_migrations'
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', table_record.tablename);
  END LOOP;
END
$$;

-- The only intentionally public database read is already-published school news
-- and announcements. Drafts, review items, and archived content remain private.
DROP POLICY IF EXISTS cms_public_read_published ON public.cms_content;
CREATE POLICY cms_public_read_published
  ON public.cms_content
  FOR SELECT
  TO anon, authenticated
  USING (
    status = 'PUBLISHED'
    AND (published_at IS NULL OR published_at <= now())
    AND (expires_at IS NULL OR expires_at > now())
  );
