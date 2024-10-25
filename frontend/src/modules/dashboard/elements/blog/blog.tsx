// pages/dashboard/write-blog.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const WriteBlog = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const router = useRouter();

  const handleCreateBlog = () => {
    if (blogTitle.length === 0) {
      toast.error("Enter the blog title to continue!");
    } else {
      const formattedTitle = blogTitle.replace(/\s+/g, "-").replace(/&/g, "-");
      router.push(`/dashboard/new-blog?title=${formattedTitle}`);
    }
  };

  return (
    <div className="w-full flex p-5 flex-wrap gap-6 relative">
      <div className="w-[200px] h-[200px] bg-slate-50 flex flex-col items-center justify-center rounded border cursor-pointer">
        <h5 className="text-2xl">Create New Blog</h5>
        <input
          type="text"
          className="border w-full my-2 h-[35px] px-2 outline-none"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
        />
        <button onClick={handleCreateBlog} className="btn-primary mt-3">
          Continue
        </button>
      </div>
    </div>
  );
};

export default WriteBlog;
