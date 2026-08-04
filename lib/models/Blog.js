import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, default: "" },
  video: { type: String, default: "" },
  seoTitle: { type: String, default: "" },
  seoDescription: { type: String, default: "" },
  seoKeywords: { type: String, default: "" },
  author: { type: String, default: "منتظم" },
  date: { type: Date, default: Date.now },
  slug: { type: String, unique: true, required: true, index: true },
});

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
