// 서비스 한 줄(Supabase services 표의 한 행)의 모양
export type Service = {
  id: number; name: string; summary: string; description: string; category: string;
  min_age: number | null; max_age: number | null;
  region: string; student: string; employment: string; income: string;
  provider: string; apply_period: string; official_url: string; apply_url: string; last_checked: string;
  image_url: string | null;
};
// 사용자가 입력한 조건
export type Profile = {
  age: number; region: string; student: "yes" | "no";
  employment: "employed" | "unemployed"; income: "low" | "mid" | "high" | "unknown";
  categories: string[];
};
export type Check = { status: "ok" | "warn" | "no"; text: string };
export type Color = "green" | "yellow" | "red";
export type MatchResult = { color: Color; checks: Check[] };
