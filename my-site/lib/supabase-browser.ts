import { createBrowserClient } from "@supabase/ssr";
// 브라우저(회원이 보는 화면)에서 로그인·가입할 때 쓰는 연결입니다.
export const createClient = () =>
  createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
