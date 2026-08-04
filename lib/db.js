import mongoose from "mongoose";
import fs from "fs";
import path from "path";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function seedDatabase() {
  try {
    // Import Blog model dynamically to avoid circular dependency
    const Blog = (await import("@/lib/models/Blog")).default;
    const count = await Blog.countDocuments();
    if (count === 0) {
      console.log("🌱 Seeding database with initial blogs...");
      const dataPath = path.join(process.cwd(), "data", "blogs.json");
      const rawData = fs.readFileSync(dataPath, "utf-8");
      const blogs = JSON.parse(rawData);
      // Ensure each blog has a slug, if missing generate from title
      for (const blog of blogs) {
        if (!blog.slug) {
          blog.slug = blog.title
            .replace(/\s+/g, "-")
            .replace(/[^\u0600-\u06FFa-zA-Z0-9-]/g, "")
            .toLowerCase();
        }
        // Check if slug already exists (shouldn't, but just in case)
        const existing = await Blog.findOne({ slug: blog.slug });
        if (!existing) {
          await Blog.create(blog);
        }
      }
      console.log(`✅ Seeded ${blogs.length} blogs.`);
    }
  } catch (error) {
    console.error("❌ Seeding error:", error);
  }
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then(async (mongoose) => {
        // Seed database after connection
        await seedDatabase();
        return mongoose;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
