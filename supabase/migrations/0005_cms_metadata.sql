alter table cms_content add column if not exists category text;
alter table cms_content add column if not exists summary text;
alter table cms_content add column if not exists priority text check (priority is null or priority in ('NORMAL','IMPORTANT'));
