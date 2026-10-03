import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import ServiceForm from "@/components/admin/ServiceForm";
import type { Service } from "@/lib/types";
export default async function EditService({ params, searchParams }: { params: { id: string }; searchParams: { error?: string } }) {
  const { data } = await createClient().from("services").select("*").eq("id", params.id).maybeSingle();
  if (!data) notFound();
  return (<div className="space-y-4"><h1 className="text-xl font-bold">서비스 수정</h1><ServiceForm service={data as Service} error={searchParams.error} /></div>);
}
