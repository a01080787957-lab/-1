import { createClient } from "./supabase-server";
// 로그인한 사용자와 관리자 여부를 돌려줍니다. (관리자 여부는 admins 표에 있는지로 판단)
export async function getUserAndRole() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { user: null, isAdmin: false };
  const { data } = await supabase.from("admins").select("user_id").eq("user_id", user.id).maybeSingle();
  return { user, isAdmin: !!data };
}
