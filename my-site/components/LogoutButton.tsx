"use client";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
export default function LogoutButton() {
  const router = useRouter();
  async function logout() {
    await createClient().auth.signOut();
    router.push("/");
    router.refresh();
  }
  return <button onClick={logout} className="text-gray-600 underline">로그아웃</button>;
}
