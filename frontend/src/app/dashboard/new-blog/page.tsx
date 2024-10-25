
"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const BlogEditor = dynamic(
  () => import("@/shared/components/editor/bolg.editor"),
  {
    ssr: false,
  }
);

const NewBlogPage = () => {
  const searchParams = useSearchParams();
  const title: string = searchParams.get("title")!;
  const formattedTitle = title.replace(/-/g, " ");

  return (
    <div className="w-full flex bg-[#F7F7F7]">
      <div className="w-full p-5 bg-white rounded-r-xl">
        <Link
          href={"/dashboard/write-blog"}
          className="opacity-[.7] w-min flex text-xl items-center"
        >
          <span>Exit</span>
        </Link>
        <div className="my-5">
          <BlogEditor title={formattedTitle} />
        </div>
      </div>
    </div>
  );
};

export default NewBlogPage;
