import Link from "next/link";
import { getUserAndRole } from "@/lib/auth";
import LogoutButton from "./LogoutButton";
// 화면 맨 위 메뉴입니다. 로그인 상태에 따라 보이는 메뉴가 달라집니다.
export default async function Header() {
  const { user, isAdmin } = await getUserAndRole();
  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-3 text-sm">
        <Link href="/" className="text-base font-bold text-blue-800">청년 서비스 찾기</Link>
        <nav className="flex items-center gap-3">
          {user ? (<>
            {isAdmin && <Link href="/admin" className="font-bold text-amber-700">관리자</Link>}
            <Link href="/mypage">마이페이지</Link>
            <LogoutButton />
          </>) : (<>
            <Link href="/login">로그인</Link>
            <Link href="/signup" className="font-bold text-blue-700">회원가입</Link>
          </>)}
        </nav>
      </div>
    </header>
  );
}
