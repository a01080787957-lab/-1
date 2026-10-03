import "./globals.css";
import Header from "@/components/Header";
import Disclaimer from "@/components/Disclaimer";
export const metadata = { title: "청년 서비스 찾기", description: "내 조건에 맞는 서울 청년 지원 서비스를 이유와 함께 찾아보세요." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased">
        <Header />
        <main className="mx-auto max-w-xl px-4 py-6">{children}</main>
        <footer className="mx-auto max-w-xl px-4 pb-10"><Disclaimer /></footer>
      </body>
    </html>
  );
}
