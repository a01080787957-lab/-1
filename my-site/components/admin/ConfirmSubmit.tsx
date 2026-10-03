"use client";
// 누르면 "정말 삭제할까요?" 확인창을 띄우는 버튼입니다.
export default function ConfirmSubmit({ label, message }: { label: string; message: string }) {
  return <button type="submit" onClick={(e) => { if (!confirm(message)) e.preventDefault(); }} className="text-sm text-red-600 underline">{label}</button>;
}
