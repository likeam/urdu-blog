import FlipCard from "./FlipCard";

export default function BlogList({ blogs }) {
  if (blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-6xl mb-4">🔍</p>
        <p className="text-[#5a4a3a] text-lg">کوئی بلاگ نہیں ملا</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-10">
      {blogs.map((blog, i) => (
        <FlipCard key={blog._id || blog.id} blog={blog} index={i} />
      ))}
    </div>
  );
}
