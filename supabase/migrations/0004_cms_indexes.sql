create index if not exists cms_content_public_idx
  on cms_content(type, published_at desc)
  where status = 'PUBLISHED';

create index if not exists applications_reference_lookup_idx
  on applications(reference);
