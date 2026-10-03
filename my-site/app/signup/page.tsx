import Link from "next/link";
import AuthForm from "@/components/AuthForm";
export default function Signup() {
  return (<div className="space-y-4"><h1 className="text-xl font-bold">회원가입</h1><AuthForm mode="signup" />
    <p className="text-xs text-gray-500">이메일은 로그인과 관심 서비스 저장 용도로만 사용해요.</p>
    <p className="text-sm text-gray-600">이미 회원이신가요? <Link href="/login" className="font-bold text-blue-700 underline">로그인</Link></p></div>);
}
