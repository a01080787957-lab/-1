"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase-server";
import { getUserAndRole } from "@/lib/auth";

const text = (f: FormData, k: string) => String(f.get(k) ?? "").trim();
const num = (f: FormData, k: string) => { const s = text(f, k); return s === "" ? null : Number(s); };

// 서비스 추가/수정 (id가 있으면 수정). 서버에서 관리자인지 다시 확인합니다.
export async function saveService(formData: FormData) {
  const { isAdmin } = await getUserAndRole();
  if (!isAdmin) redirect("/login");
  const id = text(formData, "id");
  const back = id ? `/admin/services/${id}` : "/admin/services/new";
  const fail = (msg: string): never => redirect(`${back}?error=${encodeURIComponent(msg)}`);
  const supabase = createClient();

  const row: Record<string, unknown> = {
    name: text(formData, "name"), summary: text(formData, "summary"), description: text(formData, "description"),
    category: text(formData, "category"), min_age: num(formData, "min_age"), max_age: num(formData, "max_age"),
    region: text(formData, "region"), student: text(formData, "student"), employment: text(formData, "employment"),
    income: text(formData, "income"), provider: text(formData, "provider"), apply_period: text(formData, "apply_period"),
    official_url: text(formData, "official_url"), apply_url: text(formData, "apply_url"), last_checked: text(formData, "last_checked"),
  };

  const file = formData.get("image") as File | null;
  if (file && file.size > 0) {
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) fail("사진은 jpg, png, webp 파일만 올릴 수 있어요.");
    if (file.size > 4 * 1024 * 1024) fail("사진은 4MB 이하만 올릴 수 있어요.");
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${file!.type.split("/")[1]}`;
    const { error } = await supabase.storage.from("service-images").upload(path, file, { contentType: file.type });
    if (error) fail("사진 업로드에 실패했어요: " + error.message);
    row.image_url = supabase.storage.from("service-images").getPublicUrl(path).data.publicUrl;
  } else if (formData.get("remove_image")) {
    row.image_url = null;
  }

  const { error } = id ? await supabase.from("services").update(row).eq("id", id) : await supabase.from("services").insert(row);
  if (error) fail("저장에 실패했어요: " + error.message);
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteService(formData: FormData) {
  const { isAdmin } = await getUserAndRole();
  if (!isAdmin) redirect("/login");
  await createClient().from("services").delete().eq("id", text(formData, "id"));
  revalidatePath("/admin");
  redirect("/admin");
}
