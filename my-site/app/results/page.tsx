import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { matchService, parseProfile } from "@/lib/matching";
import ResultCard from "@/components/ResultCard";
import { BADGES } from "@/lib/constants";
import type { Service, Color } from "@/lib/types";

export default async function Results({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const p = parseProfile(searchParams);
  if (!p) return (<div><p>조건이 입력되지 않았어요.</p><Link href="/find" className="font-bold text-blue-700 underline">조건 입력하러 가기</Link></div>);

  const { data, error } = await supabase.from("services").select("*").order("id");
  if (error) return <p>데이터를 불러오지 못했어요: {error.message}</p>;

  const query = new URLSearchParams(
    Object.entries(searchParams).flatMap(([k, v]) => (v === undefined ? [] : (Array.isArray(v) ? v : [v]).map((x) => [k, x] as [string, string])))
  ).toString();
  const rows = (data as Service[])
    .filter((s) => p.categories.length === 0 || p.categories.includes(s.category))
    .map((s) => ({ s, r: matchService(s, p) }));
  const group = (c: Color) => rows.filter((x) => x.r.color === c);
  const cards = (c: Color) => group(c).map(({ s, r }) => <ResultCard key={s.id} service={s} result={r} query={query} />);

  return (
    <div className="space-y-8">
      <div><h1 className="text-xl font-bold">추천 결과 {rows.length}건</h1>
        <Link href="/find" className="text-sm text-blue-700 underline">조건 다시 입력하기</Link></div>
      {rows.length === 0 && <p>선택한 분야에 등록된 서비스가 없어요.</p>}
      {(["green", "yellow"] as Color[]).map((c) => group(c).length > 0 && (
        <section key={c} className="space-y-3"><h2 className="font-bold">{BADGES[c]} ({group(c).length})</h2>{cards(c)}</section>
      ))}
      {group("red").length > 0 && (
        <details><summary className="cursor-pointer font-bold">{BADGES.red} ({group("red").length}) 펼쳐 보기</summary>
          <div className="mt-3 space-y-3">{cards("red")}</div></details>
      )}
    </div>
  );
}
