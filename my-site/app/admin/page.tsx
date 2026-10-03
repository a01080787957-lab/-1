import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { deleteService } from "./actions";
import ConfirmSubmit from "@/components/admin/ConfirmSubmit";
import type { Service } from "@/lib/types";

export default async function AdminHome() {
  const { data, error } = await createClient().from("services").select("*").order("id", { ascending: false });
  const list = (data ?? []) as Service[];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">서비스 관리 ({list.length})</h1>
        <Link href="/admin/services/new" className="rounded-lg bg-blue-700 px-3 py-2 text-sm font-bold text-white">+ 새 서비스</Link>
      </div>
      {error && <p className="text-red-700">불러오지 못했어요: {error.message}</p>}
      <ul className="divide-y divide-gray-200 rounded-xl border border-gray-200">
        {list.map((s) => (
          <li key={s.id} className="flex items-center gap-3 p-3">
            {s.image_url ? <img src={s.image_url} alt="" className="h-14 w-14 rounded-lg object-cover" /> : <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">사진 없음</div>}
            <div className="min-w-0 flex-1"><p className="truncate font-bold">{s.name}</p><p className="text-xs text-gray-500">{s.category} · {s.provider}</p></div>
            <div className="flex flex-col items-end gap-1">
              <Link href={`/admin/services/${s.id}`} className="text-sm text-blue-700 underline">수정</Link>
              <form action={deleteService}><input type="hidden" name="id" value={s.id} /><ConfirmSubmit label="삭제" message={`"${s.name}"을(를) 삭제할까요?`} /></form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
