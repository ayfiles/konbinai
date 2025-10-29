
-- Migration: 20251029135308
-- Create storage bucket for project reference files
insert into storage.buckets (id, name, public)
values ('project-references', 'project-references', false);

-- Allow anyone to upload files (since this is before authentication)
create policy "Anyone can upload project references"
on storage.objects for insert
with check (bucket_id = 'project-references');

-- Allow anyone to read their own uploaded files
create policy "Anyone can view project references"
on storage.objects for select
using (bucket_id = 'project-references');

-- Migration: 20251029151915
-- Create storage bucket for project reference uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-references', 'project-references', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Allow anyone to view files (needed for email links to work)
CREATE POLICY "Public Access to Project References"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-references');

-- Allow authenticated users to upload files
CREATE POLICY "Allow uploads to project references"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'project-references');
