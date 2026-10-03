import Link from "next/link";
export default function Home() {
  return (
    <div className="space-y-6 py-6">
      <h1 className="text-2xl font-bold leading-snug">내 상황에 맞는 서울 청년 서비스,<br />이유와 함께 찾아드려요</h1>
      <p className="text-gray-600">나이, 사는 곳, 학생·취업 여부, 소득 수준을 고르면 조건이 맞는 서비스와 추천 이유를 보여줘요. 신청은 공식 페이지에서 해요.</p>
      <Link href="/find" className="block rounded-lg bg-blue-700 px-4 py-4 text-center text-lg font-bold text-white">내 조건으로 찾기</Link>
    </div>
  );
}
