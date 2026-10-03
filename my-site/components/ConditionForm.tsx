import { CATEGORIES, SEOUL_GU, OUTSIDE_SEOUL, INCOME_OPTIONS } from "@/lib/constants";

function Choice({ type = "radio", name, value, label }: { type?: "radio" | "checkbox"; name: string; value: string; label: string }) {
  return (
    <label className="min-w-[30%] flex-1 cursor-pointer rounded-lg border border-gray-300 px-3 py-3 text-center text-sm has-[:checked]:border-blue-700 has-[:checked]:bg-blue-50 has-[:checked]:font-bold">
      <input type={type} name={name} value={value} required={type === "radio"} className="sr-only" />{label}
    </label>
  );
}
function Field({ title, children }: { title: string; children: React.ReactNode }) {
  return (<fieldset><legend className="mb-2 font-bold">{title}</legend><div className="flex flex-wrap gap-2">{children}</div></fieldset>);
}
const input = "w-full rounded-lg border border-gray-300 px-3 py-3 text-base";

// 일반 입력 폼입니다. 제출하면 /results 로 이동하면서 조건이 주소에 붙습니다.
export default function ConditionForm() {
  return (
    <form action="/results" method="get" className="space-y-6">
      <div><label htmlFor="age" className="mb-2 block font-bold">만 나이</label>
        <input id="age" name="age" type="number" inputMode="numeric" min={1} max={120} required placeholder="예: 25" className={input} /></div>
      <div><label htmlFor="region" className="mb-2 block font-bold">거주 지역</label>
        <select id="region" name="region" required defaultValue="" className={input}>
          <option value="" disabled>선택해 주세요</option>
          {SEOUL_GU.map((g) => <option key={g} value={g}>서울 {g}</option>)}
          <option value={OUTSIDE_SEOUL}>{OUTSIDE_SEOUL}</option>
        </select></div>
      <Field title="학생인가요?"><Choice name="student" value="yes" label="학생이에요" /><Choice name="student" value="no" label="학생이 아니에요" /></Field>
      <Field title="지금 일하고 있나요?"><Choice name="employment" value="employed" label="일하고 있어요" /><Choice name="employment" value="unemployed" label="일하지 않아요" /></Field>
      <Field title="소득 수준은 어느 쪽에 가깝나요?">{INCOME_OPTIONS.map((o) => <Choice key={o.value} name="income" value={o.value} label={o.label} />)}</Field>
      <Field title="관심 분야 (여러 개 선택, 안 고르면 전체)">{CATEGORIES.map((c) => <Choice key={c} type="checkbox" name="category" value={c} label={c} />)}</Field>
      <button type="submit" className="w-full rounded-lg bg-blue-700 px-4 py-4 text-lg font-bold text-white">서비스 찾기</button>
    </form>
  );
}
