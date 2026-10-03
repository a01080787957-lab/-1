import { DISCLAIMER, TEST_NOTICE } from "@/lib/constants";
export default function Disclaimer() {
  return (
    <div className="mt-8 rounded-lg bg-gray-100 p-3 text-xs leading-relaxed text-gray-600">
      <p>{DISCLAIMER}</p>
      <p className="mt-1 font-bold text-amber-700">{TEST_NOTICE}</p>
    </div>
  );
}
