import Link from "next/link";
import MatchBadge from "./MatchBadge";
import ReasonList from "./ReasonList";
import type { Service, MatchResult } from "@/lib/types";
export default function ResultCard({ service, result, query }: { service: Service; result: MatchResult; query: string }) {
  return (
    <Link href={`/services/${service.id}?${query}`} className="block rounded-xl border border-gray-200 p-4 active:bg-gray-50">
      {service.image_url && <img src={service.image_url} alt="" loading="lazy" className="mb-3 h-36 w-full rounded-lg object-cover" />}
      <MatchBadge color={result.color} />
      <h3 className="mt-2 text-lg font-bold">{service.name}</h3>
      <p className="text-sm text-gray-600">{service.summary}</p>
      <p className="mt-1 text-xs text-gray-500">{service.category} · {service.provider}</p>
      <ReasonList checks={result.checks} />
    </Link>
  );
}
