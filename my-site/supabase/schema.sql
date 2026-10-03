create table services (
  id bigint generated always as identity primary key,
  name text not null,            -- 서비스명
  summary text not null,         -- 한 줄 설명
  description text not null,     -- 상세 설명
  category text not null,        -- 주거/취업/교육/장학금/생활/문화
  min_age int,                   -- 비우면 나이 제한 없음
  max_age int,
  region text not null default '전국',     -- 전국 / 서울 / 구 이름(예: 성동구)
  student text not null default '무관',    -- 학생만 / 학생아님만 / 무관
  employment text not null default '무관', -- 미취업만 / 취업자만 / 무관
  income text not null default '제한없음', -- 낮은소득만 / 보통이하 / 제한없음
  provider text not null,
  apply_period text not null,
  official_url text not null,
  apply_url text not null,
  last_checked date not null
);
alter table services enable row level security;
create policy "누구나 읽기" on services for select using (true);
