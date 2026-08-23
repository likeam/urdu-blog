"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCategoryEmoji } from "@/lib/utils";

export default function Footer() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        const cats = [...new Set(data.map((b) => b.category))];
        setCategories(cats);
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="footer-gradient text-white/90 mt-8">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-2">
            <Link
              href="/"
              className="text-3xl font-bold flex items-center gap-3 text-white"
            >
              <span className="text-[#d4a373]">✦</span> اردو بلاگ{" "}
              <span className="text-[#d4a373]">✦</span>
            </Link>
            <p className="mt-3 text-white/80 text-sm leading-relaxed max-w-sm">
              اردو زبان میں معیاری، مستند اور دلچسپ مواد۔ علم، ثقافت، اور
              معلومات کا ایک نیا سفر۔
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-3">
              مقبول زمرے
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/#category-${encodeURIComponent(cat)}`}
                    className="hover:text-white transition"
                  >
                    {getCategoryEmoji(cat)} {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-3">رابطہ</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="/login" className="hover:text-white transition">
                  انتظامیہ
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition">
                  ہوم
                </Link>
              </li>
              <li>
                <Link href="/#videos" className="hover:text-white transition">
                  ویڈیوز
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-center text-sm text-white/50">
          <p>© 2026 ڈیجیٹل عبدالرحمانو۔ تمام حقوق محفوظ ہیں۔ایچ بی</p>
          <p className="mt-1">بزبانِ اردو — علم کا نیا سفر</p>
        </div>
      </div>
    </footer>
  );
}
