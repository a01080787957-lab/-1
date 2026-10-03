import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserAndRole } from "@/lib/auth";
export default async function MyPage() {
  const { user, isAdmin } = await getUserAndRole();
  if (!user) redirect("/login");
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">마이페이지</h1>
      <p className="text-gray-600">{user.email} 님{isAdmin && " (관리자)"}</p>
      {isAdmin && <Link href="/admin" className="block rounded-lg border border-amber-600 px-4 py-3 text-center font-bold text-amber-700">관리자 페이지로 이동</Link>}
      <p className="rounded-lg bg-gray-100 p-3 text-sm text-gray-600">관심 서비스 모아보기는 다음 단계에서 추가돼요.</p>
    </div>
  );
}
