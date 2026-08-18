"use client";

import { getCategoryEmoji } from "@/lib/utils";

export default function VideoSection({ blogs }) {
  const videoBlogs = blogs.filter((b) => b.video && b.video.trim() !== "");
  if (videoBlogs.length === 0) return null;

  return (
    <section
      className="py-8 md:py-16 px-4 max-w-6xl mx-auto border-t border-[#e8ddd0]/60"
      id="videos"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-[#2c1810] mb-8 text-center">
        <span className="text-[#8b5e3c]">✦</span> ویڈیوز
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videoBlogs.map((blog) => (
          <div
            key={blog._id || blog.id || blog.slug}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="video-container">
              {blog.video.includes("youtube.com/embed") ? (
                <iframe
                  src={blog.video}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
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
            <div className="p-5">
              <h3 className="font-bold text-lg text-[#2c1810]">{blog.title}</h3>
              <p className="text-sm text-[#5a4a3a]">{blog.excerpt}</p>
              <a
                href={`/blog/${blog.slug}`}
                className="text-[#8b5e3c] font-medium mt-2 inline-block"
              >
                مکمل پڑھیں →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
