import { redirect } from "next/navigation";
import { getUserAndRole } from "@/lib/auth";
// /admin 아래 모든 화면은 여기서 관리자인지 먼저 확인합니다.
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin } = await getUserAndRole();
  if (!user) redirect("/login");
  if (!isAdmin) return (<div className="space-y-2"><h1 className="text-xl font-bold">접근 권한이 없어요</h1><p className="text-gray-600">관리자 계정으로 로그인해야 볼 수 있는 페이지예요.</p></div>);
  return (<div><p className="mb-4 rounded bg-amber-50 px-3 py-2 text-sm text-amber-800">관리자 모드</p>{children}</div>);
}
