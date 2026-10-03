import { saveService } from "@/app/admin/actions";
import { CATEGORIES, SEOUL_GU } from "@/lib/constants";
import type { Service } from "@/lib/types";

const inp = "w-full rounded-lg border border-gray-300 px-3 py-3 text-base";
function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (<label className="block"><span className="mb-1 block font-bold">{label}</span>{children}{hint && <span className="mt-1 block text-xs text-gray-500">{hint}</span>}</label>);
}
function Select({ name, value, options }: { name: string; value?: string; options: string[] }) {
  return (<select name={name} defaultValue={value ?? options[0]} className={inp}>{options.map((o) => <option key={o} value={o}>{o}</option>)}</select>);
}

// 서비스 추가·수정에 같이 쓰는 입력 폼입니다. service가 있으면 수정, 없으면 새로 추가.
export default function ServiceForm({ service: s, error }: { service?: Service; error?: string }) {
  return (
    <form action={saveService} className="space-y-5">
      {s && <input type="hidden" name="id" value={s.id} />}
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <Field label="서비스명"><input name="name" required defaultValue={s?.name} className={inp} /></Field>
      <Field label="한 줄 설명"><input name="summary" required defaultValue={s?.summary} className={inp} /></Field>
      <Field label="상세 설명"><textarea name="description" required rows={6} defaultValue={s?.description} className={inp} /></Field>
      <Field label="카테고리"><Select name="category" value={s?.category} options={CATEGORIES} /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="최소 나이" hint="비우면 제한 없음"><input name="min_age" type="number" min={0} max={120} defaultValue={s?.min_age ?? ""} className={inp} /></Field>
        <Field label="최대 나이" hint="비우면 제한 없음"><input name="max_age" type="number" min={0} max={120} defaultValue={s?.max_age ?? ""} className={inp} /></Field>
      </div>
      <Field label="지역"><Select name="region" value={s?.region} options={["전국", "서울", ...SEOUL_GU]} /></Field>
      <Field label="학생 조건"><Select name="student" value={s?.student} options={["무관", "학생만", "학생아님만"]} /></Field>
      <Field label="취업 조건"><Select name="employment" value={s?.employment} options={["무관", "미취업만", "취업자만"]} /></Field>
      <Field label="소득 조건"><Select name="income" value={s?.income} options={["제한없음", "보통이하", "낮은소득만"]} /></Field>
      <Field label="제공기관"><input name="provider" required defaultValue={s?.provider} className={inp} /></Field>
      <Field label="신청 기간" hint="예: 상시, 2026-10-01~10-31"><input name="apply_period" required defaultValue={s?.apply_period} className={inp} /></Field>
      <Field label="공식 홈페이지 주소"><input name="official_url" type="url" required defaultValue={s?.official_url} className={inp} /></Field>
      <Field label="신청 페이지 주소"><input name="apply_url" type="url" required defaultValue={s?.apply_url} className={inp} /></Field>
      <Field label="마지막 확인일"><input name="last_checked" type="date" required defaultValue={s?.last_checked ?? new Date().toISOString().slice(0, 10)} className={inp} /></Field>
      <Field label="사진" hint="jpg, png, webp / 4MB 이하 / 직접 찍었거나 사용 권한이 있는 사진만 올려주세요">
        {s?.image_url && (<span className="mb-2 block"><img src={s.image_url} alt="" className="h-32 rounded-lg object-cover" />
          <span className="mt-1 flex items-center gap-2 text-sm"><input type="checkbox" name="remove_image" /> 현재 사진 삭제</span></span>)}
        <input name="image" type="file" accept="image/jpeg,image/png,image/webp" className={inp} />
      </Field>
      <button type="submit" className="w-full rounded-lg bg-blue-700 px-4 py-4 text-lg font-bold text-white">{s ? "수정 저장" : "서비스 추가"}</button>
    </form>
  );
}
