import { getCategoryEmoji } from "@/lib/utils";

export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`category-pill px-4 py-2 rounded-full text-sm font-medium ${cat === selected ? "active" : ""} bg-[#f5efe8] text-[#2c1810]`}
          onClick={() => onSelect(cat)}
        >
          {cat === "سب" ? "✨ سب" : getCategoryEmoji(cat) + " " + cat}
        </button>
      ))}
    </div>
  );
}
