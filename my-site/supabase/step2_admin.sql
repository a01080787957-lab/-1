-- 2단계: 사진 칸 추가 + 관리자만 서비스를 추가·수정·삭제하고 사진을 올릴 수 있게 하는 규칙
alter table services add column if not exists image_url text;

create policy "관리자 서비스 추가" on services for insert to authenticated
  with check (exists (select 1 from admins where user_id = auth.uid()));
create policy "관리자 서비스 수정" on services for update to authenticated
  using (exists (select 1 from admins where user_id = auth.uid()))
  with check (exists (select 1 from admins where user_id = auth.uid()));
create policy "관리자 서비스 삭제" on services for delete to authenticated
  using (exists (select 1 from admins where user_id = auth.uid()));

-- 사진 보관함 (보기는 누구나, 올리기·수정·삭제는 관리자만)
insert into storage.buckets (id, name, public) values ('service-images', 'service-images', true)
  on conflict (id) do nothing;
create policy "관리자 사진 올리기" on storage.objects for insert to authenticated
  with check (bucket_id = 'service-images' and exists (select 1 from admins where user_id = auth.uid()));
create policy "관리자 사진 수정" on storage.objects for update to authenticated
  using (bucket_id = 'service-images' and exists (select 1 from admins where user_id = auth.uid()));
create policy "관리자 사진 삭제" on storage.objects for delete to authenticated
  using (bucket_id = 'service-images' and exists (select 1 from admins where user_id = auth.uid()));
