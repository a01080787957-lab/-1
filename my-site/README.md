# 청년 서비스 찾기 (통합본: 1단계 로그인·관리자 + 2단계 서비스·사진 관리)

## 실행 순서
1. 이 폴더를 VS Code로 엽니다.
2. 폴더 안에 `.env.local` 파일을 새로 만들고 아래 두 줄을 채웁니다. (Supabase의 Project URL과 anon 키)
   NEXT_PUBLIC_SUPABASE_URL=https://글자들.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=긴_키
3. Supabase SQL Editor에서 아직 실행하지 않았다면 순서대로 실행합니다.
   schema.sql → seed.sql → step1_auth.sql → step2_admin.sql
4. 터미널에서 `npm install` 후 `npm run dev`, 브라우저에서 http://localhost:3000
5. /signup 으로 가입 후, step1_auth.sql 맨 아래 안내대로 내 이메일을 관리자로 지정합니다.
