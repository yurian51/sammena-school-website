-- Announcement records do not have a long-form body; allow NULL as represented by the CMS domain type.
ALTER TABLE public.cms_content ALTER COLUMN body DROP NOT NULL;
