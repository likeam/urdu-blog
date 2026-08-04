"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    image: "",
    video: "",
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated") fetchBlogs();
  }, [status]);

  const fetchBlogs = async () => {
    const res = await fetch("/api/blogs");
    const data = await res.json();
    setBlogs(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const newBlog = await res.json();
        setBlogs([newBlog, ...blogs]);
        setForm({
          title: "",
          excerpt: "",
          content: "",
          category: "",
          image: "",
          video: "",
          seoTitle: "",
          seoDescription: "",
          seoKeywords: "",
        });
        setMessage("بلاگ کامیابی سے شائع ہو گیا!");
      } else {
        const err = await res.json();
        setMessage("خرابی: " + err.error);
      }
    } catch (error) {
      setMessage("سرور کی خرابی");
    }
    setLoading(false);
  };

  const deleteBlog = async (id) => {
    if (!confirm("کیا آپ واقعی اس بلاگ کو حذف کرنا چاہتے ہیں؟")) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (res.ok) {
        setBlogs(blogs.filter((b) => b.id !== id));
      }
    } catch (error) {
      alert("حذف کرنے میں خرابی");
    }
  };

  if (status === "loading")
    return <div className="text-center py-12">لوڈ ہو رہا ہے...</div>;

  return (
    <div className="py-8 md:py-12 px-4 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#2c1810]">
          <span className="text-[#8b5e3c]">✦</span> منتظم ڈیش بورڈ
        </h2>
        <button
          onClick={() => router.push("/api/auth/signout")}
          className="px-4 py-2 bg-red-600 text-white rounded-full text-sm font-semibold hover:bg-red-700 transition"
        >
          لاگ آؤٹ
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-[#2c1810] mb-4">
          نیا بلاگ شامل کریں
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#5a4a3a] font-medium mb-1">
                عنوان *
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="admin-input"
                required
              />
            </div>
            <div>
              <label className="block text-[#5a4a3a] font-medium mb-1">
                زمرہ *
              </label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="admin-input"
                placeholder="مثلاً ٹیکنالوجی"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[#5a4a3a] font-medium mb-1">
                اقتباس (مختصر تعارف) *
              </label>
              <input
                type="text"
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                className="admin-input"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[#5a4a3a] font-medium mb-1">
                مکمل مواد *
              </label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                rows="4"
                className="admin-input"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-[#5a4a3a] font-medium mb-1">
                تصویر کا لنک
              </label>
              <input
                type="url"
                name="image"
                value={form.image}
                onChange={handleChange}
                className="admin-input"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <label className="block text-[#5a4a3a] font-medium mb-1">
                ویڈیو لنک (اختیاری)
              </label>
              <input
                type="url"
                name="video"
                value={form.video}
                onChange={handleChange}
                className="admin-input"
                placeholder="https://youtube.com/embed/..."
              />
            </div>
            <div>
              <label className="block text-[#5a4a3a] font-medium mb-1">
                SEO ٹائٹل
              </label>
              <input
                type="text"
                name="seoTitle"
                value={form.seoTitle}
                onChange={handleChange}
                className="admin-input"
                placeholder="SEO کے لیے عنوان"
              />
            </div>
            <div>
              <label className="block text-[#5a4a3a] font-medium mb-1">
                SEO تفصیل
              </label>
              <input
                type="text"
                name="seoDescription"
                value={form.seoDescription}
                onChange={handleChange}
                className="admin-input"
                placeholder="SEO کے لیے مختصر تفصیل"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[#5a4a3a] font-medium mb-1">
                SEO کلیدی الفاظ
              </label>
              <input
                type="text"
                name="seoKeywords"
                value={form.seoKeywords}
                onChange={handleChange}
                className="admin-input"
                placeholder="کلیدی الفاظ، کوما سے الگ کریں"
              />
            </div>
          </div>
          {message && <p className="mt-3 text-green-600">{message}</p>}
          <button type="submit" className="admin-btn mt-4" disabled={loading}>
            {loading ? "شائع ہو رہا ہے..." : "بلاگ شائع کریں"}
          </button>
        </form>
      </div>

      <div>
        <h3 className="text-xl font-bold text-[#2c1810] mb-4">آپ کے بلاگز</h3>
        <div className="space-y-4">
          {blogs.map((b) => (
            <div
              key={b._id || b.id}
              className="flex flex-wrap items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-[#e8ddd0]"
            >
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-[#2c1810]">{b.title}</h4>
                <p className="text-sm text-[#5a4a3a]">
                  {b.category} | {new Date(b.date).toLocaleDateString("ur-PK")}
                </p>
                {b.video && (
                  <span className="text-xs text-blue-600">🎬 ویڈیو شامل</span>
                )}
              </div>
              <button
                onClick={() => deleteBlog(b.id)}
                className="admin-btn admin-btn-danger text-sm px-4 py-2 mt-2 sm:mt-0"
              >
                حذف کریں
              </button>
            </div>
          ))}
          {blogs.length === 0 && (
            <p className="text-[#5a4a3a]">
              کوئی بلاگ موجود نہیں۔ پہلا بلاگ شامل کریں۔
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
