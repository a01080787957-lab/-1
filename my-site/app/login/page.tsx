import Link from "next/link";
import AuthForm from "@/components/AuthForm";
export default function Login() {
  return (<div className="space-y-4"><h1 className="text-xl font-bold">로그인</h1><AuthForm mode="login" />
    <p className="text-sm text-gray-600">아직 회원이 아니신가요? <Link href="/signup" className="font-bold text-blue-700 underline">회원가입</Link></p></div>);
}
