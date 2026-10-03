import type { Service, Profile, Check, MatchResult } from "./types";
import { OUTSIDE_SEOUL } from "./constants";

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

// 주소창의 조건(?age=25&region=성동구 ...)을 읽어서 Profile로 바꿉니다. 빠진 값이 있으면 null.
export function parseProfile(sp: SP): Profile | null {
  const age = Number(one(sp.age));
  const region = one(sp.region), student = one(sp.student), employment = one(sp.employment);
  const income = one(sp.income) ?? "unknown";
  if (!age || age < 1 || age > 120 || !region || !student || !employment) return null;
  const c = sp.category;
  return {
    age, region,
    student: student === "yes" ? "yes" : "no",
    employment: employment === "employed" ? "employed" : "unemployed",
    income: (["low", "mid", "high"].includes(income) ? income : "unknown") as Profile["income"],
    categories: c === undefined ? [] : Array.isArray(c) ? c : [c],
  };
}

// 서비스 하나와 사용자 조건을 비교해서 색깔과 추천 이유를 만듭니다. (AI 없이 규칙으로만)
export function matchService(s: Service, p: Profile): MatchResult {
  const checks: Check[] = [];
  const add = (status: Check["status"], text: string) => checks.push({ status, text });
  const test = (ok: boolean, yes: string, no: string) => add(ok ? "ok" : "no", ok ? yes : no);

  // 1) 나이
  if (s.min_age !== null || s.max_age !== null) {
    const label = `만 ${s.min_age ?? ""}~${s.max_age ?? ""}세`;
    test(p.age >= (s.min_age ?? 0) && p.age <= (s.max_age ?? 200), `연령 조건 일치 (${label})`, `연령 조건 불일치 (${label} 대상)`);
  }
  // 2) 거주지역
  if (s.region === "전국") add("ok", "전국 대상 서비스");
  else if (s.region === "서울") test(p.region !== OUTSIDE_SEOUL, "서울 거주 조건 일치", "서울 거주자 대상");
  else test(p.region === s.region, `${s.region} 거주 조건 일치`, `${s.region} 거주자 대상`);
  // 3) 학생 여부
  if (s.student === "학생만") test(p.student === "yes", "학생 조건 일치", "학생 대상 서비스");
  if (s.student === "학생아님만") test(p.student === "no", "비학생 조건 일치", "학생이 아닌 경우 대상");
  // 4) 취업 여부
  if (s.employment === "미취업만") test(p.employment === "unemployed", "미취업 조건 일치", "미취업자 대상 서비스");
  if (s.employment === "취업자만") test(p.employment === "employed", "취업자 조건 일치", "취업자 대상 서비스");
  // 5) 소득 수준 (경계가 애매하면 불일치가 아니라 '확인 필요')
  if (s.income === "낮은소득만" || s.income === "보통이하") {
    const strict = s.income === "낮은소득만";
    if (p.income === "unknown") add("warn", "소득 조건 확인 필요 (소득 수준을 선택하지 않았어요)");
    else if (p.income === "high") add("no", "소득 조건 불일치 (소득이 높은 편이면 대상이 아닐 수 있어요)");
    else if (p.income === "low" || !strict) add("ok", "소득 조건 일치");
    else add("warn", "소득 조건 확인 필요 (낮은 소득 대상)");
  }
  if (checks.length === 0) add("ok", "별도의 조건 제한이 없어요");

  const color = checks.some((c) => c.status === "no") ? "red" : checks.some((c) => c.status === "warn") ? "yellow" : "green";
  return { color, checks };
}
