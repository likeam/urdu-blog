"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDate, getCategoryEmoji } from "@/lib/utils";

export default function FlipCard({ blog, index = 0 }) {
  const [flipped, setFlipped] = useState(false);
  const delay = (index % 3) + 1;

  const handleToggle = () => {
    // For touch devices we toggle on click
    if (window.matchMedia("(hover: none)").matches) {
      setFlipped(!flipped);
    }
  };

  return (
    <div
      className={`flip-card animate-fade-in-up animate-fade-in-up-delay-${delay} ${flipped ? "flipped" : ""}`}
      onClick={handleToggle}
      onMouseEnter={() => {
        if (!window.matchMedia("(hover: none)").matches) setFlipped(true);
      }}
      onMouseLeave={() => {
        if (!window.matchMedia("(hover: none)").matches) setFlipped(false);
      }}
    >
      <div className="flip-card-inner">
        {/* Front */}
        <div className="flip-card-front">
          <img
            src={
              blog.image || "https://picsum.photos/seed/" + blog.id + "/600/400"
            }
            alt={blog.title}
            className="card-image w-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.target.src =
                "https://picsum.photos/seed/" + blog.id + "/600/400";
            }}
          />
          <div className="card-content">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs text-[#8a7a6a]">
                {formatDate(blog.date)}
              </span>
              <span className="w-1 h-1 bg-[#d4a373] rounded-full"></span>
              <span className="text-xs text-[#8a7a6a]">{blog.category}</span>
            </div>
            <h3 className="card-title">{blog.title}</h3>
            <p className="card-excerpt">{blog.excerpt}</p>
            <span className="card-category">
              {getCategoryEmoji(blog.category)} {blog.category}
            </span>
          </div>
        </div>
        {/* Back */}
        <div className="flip-card-back">
          <div className="flex items-center gap-2 text-sm text-[#8a7a6a] mb-1">
            <span>{getCategoryEmoji(blog.category)}</span>
            <span>{blog.category}</span>
            <span className="w-1 h-1 bg-[#d4a373] rounded-full"></span>
            <span>{formatDate(blog.date)}</span>
          </div>
          <h3 className="back-title">{blog.title}</h3>
          <p className="back-excerpt">
            {blog.content.length > 150
              ? blog.content.slice(0, 150) + "..."
              : blog.content}
          </p>
          <div className="back-meta">
            <span>✍️ {blog.author}</span>
            <span className="w-1 h-1 bg-[#d4a373] rounded-full"></span>
            <Link href={`/blog/${blog.slug}`} className="read-more-btn">
              مکمل پڑھیں
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
