import { BADGES } from "@/lib/constants";
import type { Color } from "@/lib/types";
const style = { green: "bg-green-100 text-green-900", yellow: "bg-yellow-100 text-yellow-900", red: "bg-red-100 text-red-900" };
export default function MatchBadge({ color }: { color: Color }) {
  return <span className={`inline-block rounded-full px-3 py-1 text-sm font-bold ${style[color]}`}>{BADGES[color]}</span>;
}
