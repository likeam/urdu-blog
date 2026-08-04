import connectDB from "@/lib/db";
import Blog from "@/lib/models/Blog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req, { params }) {
  const { id } = params;
  await connectDB();
  const blog = await Blog.findById(id);
  if (!blog)
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
    });
  return Response.json(blog);
}

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session)
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  const { id } = params;
  await connectDB();
  const body = await req.json();
  const updated = await Blog.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
  if (!updated)
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
    });
  return Response.json(updated);
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session)
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  const { id } = params;
  await connectDB();
  const deleted = await Blog.findByIdAndDelete(id);
  if (!deleted)
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
    });
  return Response.json({ message: "Deleted successfully" });
}
