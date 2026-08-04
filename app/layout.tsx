import "./globals.css";
import { Noto_Nastaliq_Urdu } from "next/font/google";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Providers from "./providers";

const notoNastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "اردو بلاگ - جدید اور جامع بلاگنگ",
  description: "اردو میں جدید بلاگز، مضامین، ویڈیوز اور معلومات",
  keywords: "اردو, بلاگ, مضامین, ویڈیوز, ثقافت, تعلیم",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="ur" dir="rtl" className={notoNastaliq.className}>
      <body>
        <Providers session={session}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
