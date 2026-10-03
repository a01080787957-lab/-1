import { createClient } from "@supabase/supabase-js";
// 데이터 보관소(Supabase)와 연결합니다. 항상 최신 데이터를 가져오도록 캐시를 끕니다.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { global: { fetch: (url, options) => fetch(url, { ...options, cache: "no-store" }) } }
);
