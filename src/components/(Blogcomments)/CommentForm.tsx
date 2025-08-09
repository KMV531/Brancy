"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { BlogComment } from "@/types/commentType";
import Image from "next/image";

export default function CommentForm({
  blogId,
  onNewComment,
}: {
  blogId: string;
  onNewComment: (comment: BlogComment) => void;
}) {
  const { user } = useUser();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newComment: BlogComment = {
      clerkUserId: user.id!,
      content,
      postedAt: new Date().toISOString(),
      isApproved: true,
      author: {
        username: user.username || "",
        profileImage: user.imageUrl || "",
      },
    };

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({
          blogId,
          content,
          author: newComment.author,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const { result } = await res.json();
        onNewComment(result.comments[result.comments.length - 1]); // get the last added one
        setContent("");
        toast.success("Your comment has been published !");
      } else {
        const { error } = await res.json();
        toast.error(`Error submitting : ${error || "Unknown error"}`);
      }
    } catch (err) {
      toast.error("Error during submition");
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h1 className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-medium">
        Comment
      </h1>
      <div className="border border-gray-400 w-[80%] my-4 mb-10 mx-auto" />
      <form onSubmit={handleSubmit} className="space-y-4 mt-6 mb-8">
        <div className="flex items-center justify-center gap-4">
          <Image
            src={"/assets/form1.webp"}
            alt="Image"
            width={100}
            height={100}
            className="rounded-full object-cover"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Leave a comment..."
            className="w-full p-3 border border-gray-300 rounded-md resize-none"
            required
            minLength={5}
            maxLength={1000}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-400 transition-all cursor-pointer sub-title"
          disabled={loading}
        >
          {loading ? "Publishing..." : "Publish my comment"}
        </button>
      </form>
    </section>
  );
}
