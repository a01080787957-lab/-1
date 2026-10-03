import type { Check } from "@/lib/types";
const icon = { ok: "✓", warn: "△", no: "✗" };
const color = { ok: "text-green-700", warn: "text-yellow-700", no: "text-red-700" };
export default function ReasonList({ checks }: { checks: Check[] }) {
  return (
    <ul className="mt-2 space-y-1 text-sm">
      {checks.map((c, i) => (<li key={i} className={color[c.status]}><b>{icon[c.status]}</b> {c.text}</li>))}
    </ul>
  );
}
