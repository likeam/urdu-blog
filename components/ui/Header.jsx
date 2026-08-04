"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Header() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-[#e8ddd0]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl md:text-2xl font-bold text-[#2c1810] tracking-wide"
          >
            <span className="text-[#8b5e3c]">✦</span>
            اردو بلاگ
            <span className="text-[#8b5e3c]">✦</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-base font-medium">
            <Link href="/" className="nav-link active text-[#2c1810]">
              ہوم
            </Link>
            <Link
              href="/#allBlogs"
              className="nav-link text-[#5a4a3a] hover:text-[#2c1810]"
            >
              بلاگز
            </Link>
            <Link
              href="/#videos"
              className="nav-link text-[#5a4a3a] hover:text-[#2c1810]"
            >
              ویڈیوز
            </Link>
            {session ? (
              <Link
                href="/admin"
                className="nav-link text-[#8b5e3c] hover:text-[#2c1810]"
              >
                ڈیش بورڈ
              </Link>
            ) : (
              <Link
                href="/login"
                className="nav-link text-[#8b5e3c] hover:text-[#2c1810]"
              >
                انتظامیہ
              </Link>
            )}
          </nav>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[#f5efe8] transition-colors"
            aria-label="مینو"
          >
            <svg
              className="w-6 h-6 text-[#2c1810]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#e8ddd0]/60 px-4 py-4 space-y-3 text-base font-medium">
          <Link
            href="/"
            className="block nav-link text-[#2c1810] py-1"
            onClick={() => setMobileOpen(false)}
          >
            ہوم
          </Link>
          <Link
            href="/#allBlogs"
            className="block nav-link text-[#5a4a3a] py-1"
            onClick={() => setMobileOpen(false)}
          >
            بلاگز
          </Link>
          <Link
            href="/#videos"
            className="block nav-link text-[#5a4a3a] py-1"
            onClick={() => setMobileOpen(false)}
          >
            ویڈیوز
          </Link>
          {session ? (
            <Link
              href="/admin"
              className="block nav-link text-[#8b5e3c] py-1"
              onClick={() => setMobileOpen(false)}
            >
              ڈیش بورڈ
            </Link>
          ) : (
            <Link
              href="/login"
              className="block nav-link text-[#8b5e3c] py-1"
              onClick={() => setMobileOpen(false)}
            >
              انتظامیہ
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
