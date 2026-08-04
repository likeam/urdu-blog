import { notFound } from "next/navigation";
import connectDB from "@/lib/db";
import Blog from "@/lib/models/Blog";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({ params }) {
  const { slug } = await params; // ⬅️ await کریں
  await connectDB();
  const blog = await Blog.findOne({ slug });
  if (!blog) return { title: "بلاگ نہیں ملا" };
  return {
    title: blog.seoTitle || blog.title,
    description: blog.seoDescription || blog.excerpt,
    keywords: blog.seoKeywords || "",
  };
}

export default async function BlogPage({ params }) {
  const { slug } = await params; // ⬅️ await کریں
  await connectDB();
  const blog = await Blog.findOne({ slug });
  if (!blog) notFound();

  const getCategoryEmoji = (cat) => {
    const map = {
      ٹیکنالوجی: "💻",
      ادب: "📖",
      صحت: "❤️",
      تعلیم: "🎓",
      ثقافت: "🎭",
    };
    return map[cat] || "📝";
  };

  return (
    <article className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-6 flex items-center gap-2 text-sm text-[#8a7a6a]">
        <span>{getCategoryEmoji(blog.category)}</span>
        <span>{blog.category}</span>
        <span className="w-1 h-1 bg-[#d4a373] rounded-full"></span>
        <span>{formatDate(blog.date)}</span>
        <span className="w-1 h-1 bg-[#d4a373] rounded-full"></span>
        <span>✍️ {blog.author}</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-[#2c1810] mb-4">
        {blog.title}
      </h1>
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full rounded-2xl max-h-[400px] object-cover mb-6"
        />
      )}
      {blog.video && (
        <div className="video-container mb-6">
          {blog.video.includes("youtube.com/embed") ? (
            <iframe src={blog.video} allowFullScreen loading="lazy"></iframe>
          ) : blog.video.includes("youtu.be") ? (
            <iframe
              src={`https://www.youtube.com/embed/${blog.video.split("/").pop()}`}
              allowFullScreen
              loading="lazy"
            ></iframe>
          ) : (
            <video controls>
              <source src={blog.video} type="video/mp4" />
              آپ کا براؤزر ویڈیو کو سپورٹ نہیں کرتا۔
            </video>
          )}
        </div>
      )}
      <div className="prose prose-lg max-w-none text-[#2c1810] leading-relaxed">
        {blog.content.split("\n").map((para, i) => (
          <p key={i} className="mb-4">
            {para}
          </p>
        ))}
      </div>
    </article>
  );
}
