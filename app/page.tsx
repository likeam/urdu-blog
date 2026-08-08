"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import BlogList from "@/components/ui/BlogList";
import CategoryFilter from "@/components/ui/CategoryFilter";
import VideoSection from "@/components/ui/VideoSection";
import FlipCard from "@/components/ui/FlipCard";

export default function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("سب");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      setBlogs(data);
      // extract categories
      const cats = ["سب", ...new Set(data.map((b) => b.category))];
      setCategories(cats);
      applyFilters(data, selectedCategory, search, sort);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  const applyFilters = (data, category, query, sortType) => {
    let result = [...data];
    if (category !== "سب") {
      result = result.filter((b) => b.category === category);
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q) ||
          b.content.toLowerCase().includes(q),
      );
    }
    if (sortType === "newest") {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortType === "oldest") {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortType === "az") {
      result.sort((a, b) => a.title.localeCompare(b.title, "ur"));
    }
    setFiltered(result);
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    applyFilters(blogs, cat, search, sort);
  };

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearch(val);
    applyFilters(blogs, selectedCategory, val, sort);
  };

  const handleSort = (e) => {
    const val = e.target.value;
    setSort(val);
    applyFilters(blogs, selectedCategory, search, val);
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const featured = blogs.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient py-12 md:py-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-block bg-[#8b5e3c]/10 text-[#8b5e3c] px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            ✦ تازہ ترین مضامین
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#2c1810] leading-tight">
            خوش آمدید
            <br className="sm:hidden" />
            <span className="text-[#8b5e3c]">اردو بلاگ</span> پر
          </h1>
          <p className="mt-4 md:mt-6 text-lg md:text-xl text-[#5a4a3a] max-w-2xl mx-auto leading-relaxed">
            علم، ثقافت، اور معلومات کا ایک نیا سفر۔ ہمارے بلاگز پڑھیں اور اپنے
            علم میں اضافہ کریں۔
          </p>
        </div>
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#d4a373]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#8b5e3c]/10 rounded-full blur-3xl"></div>
      </section>

      {/* Featured */}
      <section className="py-12 md:py-18 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2c1810]">
            <span className="text-[#8b5e3c]">✦</span> نمایاں بلاگز
          </h2>
          <a
            href="#allBlogs"
            className="text-[#8b5e3c] font-medium hover:underline"
          >
            سب دیکھیں
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featured.map((blog, i) => (
            <FlipCard key={blog._id || blog.id} blog={blog} index={i} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 md:py-12 px-4 max-w-7xl mx-auto border-t border-[#e8ddd0]/60">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2c1810]">
            <span className="text-[#8b5e3c]">✦</span> زمرہ جات
          </h2>
          <p className="text-[#5a4a3a] mt-2">
            اپنی پسند کے زمرے کا انتخاب کریں
          </p>
        </div>
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={handleCategoryChange}
        />
      </section>

      {/* All Blogs */}
      <section className="py-8 md:py-16 px-4 max-w-7xl mx-auto" id="allBlogs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2c1810]">
            <span className="text-[#8b5e3c]">✦</span> تمام بلاگز
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="بلاگ تلاش کریں..."
                className="search-input w-full sm:w-64 px-4 py-2.5 rounded-full text-[#2c1810] placeholder-[#8a7a6a] text-sm"
                value={search}
                onChange={handleSearch}
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a7a6a]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <select
              className="px-4 py-2.5 rounded-full border-2 border-[#e8ddd0] bg-white text-[#2c1810] text-sm focus:border-[#8b5e3c] focus:outline-none"
              value={sort}
              onChange={handleSort}
            >
              <option value="newest">نئے ترین</option>
              <option value="oldest">قدیم ترین</option>
              <option value="az">الف سے ز</option>
            </select>
          </div>
        </div>
        <BlogList blogs={filtered.slice(0, visibleCount)} />
        {filtered.length > visibleCount && (
          <div className="text-center mt-10">
            <button
              onClick={loadMore}
              className="px-8 py-3 border-2 border-[#8b5e3c] text-[#8b5e3c] rounded-full font-semibold hover:bg-[#8b5e3c] hover:text-white transition-all duration-300"
            >
              مزید بلاگز لوڈ کریں
            </button>
          </div>
        )}
      </section>

      {/* Videos */}
      <VideoSection blogs={blogs} />
    </div>
  );
}
