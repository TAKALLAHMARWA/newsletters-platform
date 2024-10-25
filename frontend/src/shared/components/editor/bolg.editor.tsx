
"use client";
import React, { useRef, useState } from "react";
import EmailEditor from "react-email-editor"; // Tu peux continuer d'utiliser Unlayer
import toast from "react-hot-toast";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface BlogEditorProps {
  title: string;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ title }) => {
  const [jsonData, setJsonData] = useState<any>(null);
  const emailEditorRef = useRef(null);
  const { user } = useClerk();
  const router = useRouter();

  const saveBlog = async () => {
    emailEditorRef.current?editor;
    unlayer?.exportHtml(async (data: any) => {
      const { design, html } = data;
      setJsonData(design);

      // Sauvegarde de l'article de blog dans la base de données en appelant le focntionne du backend dans le controleur blog 
      await fetch("http://localhost:5000/blogs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content: html, // Enregistre le contenu HTML de l'article
          authorId: user?.id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          toast.success("Blog saved successfully");
          router.push("/dashboard/write-blog");
        })
        .catch((error) => {
          console.error("Error saving blog:", error);
          toast.error("Failed to save blog.");
        });
    });
  };

  return (
    <div className="w-full h-[90vh] relative">
      <EmailEditor ref={emailEditorRef} />
      <div className="absolute bottom-0 flex items-center justify-end gap-4 right-0 w-full border-t p-3">
        <button className="btn-primary" onClick={saveBlog}>
          Save Blog
        </button>
      </div>
    </div>
  );
};

export default BlogEditor;
