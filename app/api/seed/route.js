import connectDB from "@/lib/db";
import Blog from "@/lib/models/Blog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  await connectDB();
  const count = await Blog.countDocuments();
  if (count > 0) {
    return Response.json({ message: "Database already has blogs" });
  }

  // Default blogs
  const defaultBlogs = [
    {
      title: "جدید ٹیکنالوجی اور ہماری زندگی",
      excerpt: "جدید ٹیکنالوجی نے ہماری زندگی کو کس طرح متاثر کیا ہے؟",
      content:
        "جدید ٹیکنالوجی نے ہماری زندگی کو بے حد آسان بنا دیا ہے۔ موبائل فونز، انٹرنیٹ، اور مصنوعی ذہانت نے ہمارے روزمرہ کے کاموں کو تیز اور موثر بنا دیا ہے۔ اس مضمون میں ہم ٹیکنالوجی کے مختلف پہلوؤں کا جائزہ لیں گے۔",
      category: "ٹیکنالوجی",
      image: "https://picsum.photos/seed/tech1/600/400",
      video: "",
      seoTitle: "جدید ٹیکنالوجی اور ہماری زندگی",
      seoDescription: "جدید ٹیکنالوجی کے اثرات اور فوائد پر ایک جامع مضمون۔",
      seoKeywords: "ٹیکنالوجی, جدید, زندگی",
      author: "علی رضا",
      date: new Date("2026-07-28"),
      slug: "jadeed-technology-aur-hamari-zindagi",
    },
    {
      title: "اردو ادب کا سنہری دور",
      excerpt: "اردو ادب کا سنہری دور کب تھا؟",
      content:
        "اردو ادب کا سنہری دور ۱۸ویں اور ۱۹ویں صدی کو کہا جاتا ہے۔ اس دور میں میر، غالب، اقبال، اور فیض جیسے عظیم شعراء نے اردو ادب کو بلندیوں تک پہنچایا۔",
      category: "ادب",
      image: "https://picsum.photos/seed/lit1/600/400",
      video: "",
      seoTitle: "اردو ادب کا سنہری دور",
      seoDescription: "اردو ادب کے سنہری دور کا جائزہ۔",
      seoKeywords: "اردو ادب, سنہری دور, میر, غالب",
      author: "فاطمہ زہرا",
      date: new Date("2026-07-25"),
      slug: "urdu-adab-ka-sunehri-daur",
    },
  ];

  await Blog.insertMany(defaultBlogs);
  return Response.json({ message: "Default blogs added successfully" });
}
