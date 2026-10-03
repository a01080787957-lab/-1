-- 1단계: 관리자 목록 표 만들기 (Supabase SQL Editor에서 실행)
create table admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table admins enable row level security;
-- 로그인한 사람은 "자기 자신이 관리자인지"만 확인할 수 있습니다. 추가·삭제는 SQL Editor에서만 가능합니다.
create policy "본인 관리자 여부 확인" on admins for select using (auth.uid() = user_id);

-- ※ 내 계정을 관리자로 만들기: 회원가입을 먼저 한 뒤, 아래 줄의 이메일을 내 이메일로 바꿔서 따로 실행하세요.
-- insert into admins (user_id) select id from auth.users where email = '내이메일@example.com';
