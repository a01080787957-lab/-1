"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

const KO: Record<string, string> = {
  "Invalid login credentials": "이메일 또는 비밀번호가 맞지 않아요.",
  "User already registered": "이미 가입된 이메일이에요.",
  "Email not confirmed": "이메일 인증이 필요해요. 받은 편지함을 확인해 주세요.",
};
const input = "w-full rounded-lg border border-gray-300 px-3 py-3 text-base";

// 로그인/회원가입 공용 폼입니다. mode 값으로 구분합니다.
export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email")).trim(), password = String(f.get("password"));
    if (mode === "signup" && password.length < 6) return setError("비밀번호는 6자 이상이어야 해요.");
    if (mode === "signup" && password !== String(f.get("password2"))) return setError("비밀번호 확인이 일치하지 않아요.");
    setLoading(true);
    const supabase = createClient();
    const { data, error } = mode === "login"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) return setError(KO[error.message] ?? error.message);
    if (mode === "signup" && !data.session) return setError("확인 메일을 보냈어요. 메일의 링크를 누른 뒤 로그인해 주세요.");
    router.push("/mypage");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div><label htmlFor="email" className="mb-2 block font-bold">이메일</label>
        <input id="email" name="email" type="email" required autoComplete="email" className={input} /></div>
      <div><label htmlFor="password" className="mb-2 block font-bold">비밀번호</label>
        <input id="password" name="password" type="password" required autoComplete={mode === "login" ? "current-password" : "new-password"} className={input} /></div>
      {mode === "signup" && (
        <div><label htmlFor="password2" className="mb-2 block font-bold">비밀번호 확인</label>
          <input id="password2" name="password2" type="password" required autoComplete="new-password" className={input} /></div>
      )}
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <button type="submit" disabled={loading} className="w-full rounded-lg bg-blue-700 px-4 py-4 text-lg font-bold text-white disabled:opacity-50">
        {loading ? "처리 중..." : mode === "login" ? "로그인" : "가입하기"}
      </button>
    </form>
  );
}
