import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { matchService, parseProfile } from "@/lib/matching";
import MatchBadge from "@/components/MatchBadge";
import ReasonList from "@/components/ReasonList";
import type { Service } from "@/lib/types";

export default async function ServiceDetail({ params, searchParams }: { params: { id: string }; searchParams: Record<string, string | string[] | undefined> }) {
  const { data } = await supabase.from("services").select("*").eq("id", params.id).maybeSingle();
  if (!data) notFound();
  const s = data as Service;
  const p = parseProfile(searchParams);
  const query = new URLSearchParams(Object.entries(searchParams).flatMap(([k, v]) => (v === undefined ? [] : (Array.isArray(v) ? v : [v]).map((x) => [k, x] as [string, string])))).toString();
  const result = p ? matchService(s, p) : null;
  const rows: [string, string][] = [["제공기관", s.provider], ["신청 기간", s.apply_period], ["분류", s.category], ["마지막 확인일", s.last_checked]];
  const btn = "block rounded-lg px-4 py-4 text-center font-bold";
  return (
    <div className="space-y-5">
      {p && <Link href={`/results?${query}`} className="text-sm text-blue-700 underline">← 결과로 돌아가기</Link>}
      {s.image_url && <img src={s.image_url} alt={s.name} className="h-52 w-full rounded-xl object-cover" />}
      <h1 className="text-2xl font-bold">{s.name}</h1>
      <p className="text-gray-600">{s.summary}</p>
      {result && (<div className="rounded-xl border border-gray-200 p-4"><MatchBadge color={result.color} /><ReasonList checks={result.checks} />
        <p className="mt-2 text-xs text-gray-500">입력하신 조건 기준의 참고 결과이며 공식 판정이 아닙니다.</p></div>)}
      <p className="whitespace-pre-line leading-relaxed">{s.description}</p>
      <dl className="divide-y divide-gray-200 rounded-xl border border-gray-200 text-sm">
        {rows.map(([k, v]) => (<div key={k} className="flex justify-between gap-4 px-4 py-3"><dt className="text-gray-500">{k}</dt><dd className="text-right">{v}</dd></div>))}
      </dl>
      <a href={s.official_url} target="_blank" rel="noopener noreferrer" className={`${btn} bg-blue-700 text-white`}>공식 홈페이지 보기</a>
      <a href={s.apply_url} target="_blank" rel="noopener noreferrer" className={`${btn} border border-blue-700 text-blue-700`}>신청 페이지로 이동</a>
    </div>
  );
}
