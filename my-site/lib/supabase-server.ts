import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
// 서버에서 "지금 로그인한 사람이 누구인지" 확인할 때 쓰는 연결입니다.
export function createClient() {
  const store = cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => { try { list.forEach(({ name, value, options }) => store.set(name, value, options)); } catch {} },
    },
  });
}
