import connectDB from "@/lib/db";
import Blog from "@/lib/models/Blog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort") || "newest";
  const limit = parseInt(searchParams.get("limit")) || 50;

  let filter = {};
  if (category && category !== "سب") {
    filter.category = category;
  }
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { excerpt: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }
  let sortOption = {};
  if (sort === "newest") sortOption = { date: -1 };
  else if (sort === "oldest") sortOption = { date: 1 };
  else if (sort === "az") sortOption = { title: 1 };

  const blogs = await Blog.find(filter).sort(sortOption).limit(limit);
  return Response.json(blogs);
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
  try {
    await connectDB();
    const body = await req.json();
    const {
      title,
      excerpt,
      content,
      category,
      image,
      video,
      seoTitle,
      seoDescription,
      seoKeywords,
    } = body;
    if (!title || !excerpt || !content || !category) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 },
      );
    }
    // generate slug from title
    // ... POST handler میں
    const baseSlug = title
      .replace(/\s+/g, "-")
      .replace(/[^\u0600-\u06FFa-zA-Z0-9-]/g, "")
      .toLowerCase();

    let slug = baseSlug;
    let counter = 1;
    while (await Blog.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    // پھر newBlog میں slug شامل کریں
    const newBlog = new Blog({
      title,
      excerpt,
      content,
      category,
      image: image || "",
      video: video || "",
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt,
      seoKeywords: seoKeywords || "",
      slug,
      author: session.user?.name || "منتظم",
      date: new Date(),
    });
    await newBlog.save();
    return Response.json(newBlog, { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
