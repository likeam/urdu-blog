export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ur-PK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getCategoryEmoji(cat) {
  const map = {
    ٹیکنالوجی: "💻",
    ادب: "📖",
    صحت: "❤️",
    تعلیم: "🎓",
    ثقافت: "🎭",
  };
  return map[cat] || "📝";
}
