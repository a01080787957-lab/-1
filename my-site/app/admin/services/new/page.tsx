import ServiceForm from "@/components/admin/ServiceForm";
export default function NewService({ searchParams }: { searchParams: { error?: string } }) {
  return (<div className="space-y-4"><h1 className="text-xl font-bold">새 서비스 추가</h1><ServiceForm error={searchParams.error} /></div>);
}
