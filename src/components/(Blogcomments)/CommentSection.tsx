import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import CommentForm from "./CommentForm";
import { BlogComment } from "@/types/commentType";

export default function CommentSection({
  blogId,
  comments: initialComments,
}: {
  blogId: string;
  comments: BlogComment[];
}) {
  const { user, isLoaded } = useUser();
  const [comments, setComments] = useState<BlogComment[]>(
    initialComments || []
  );

  // Fetch updated comments after mount
  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await fetch(`/api/comments?blogId=${blogId}`);
        const data = await res.json();
        setComments(data.comments || []); // must return only approved
      } catch (err) {
        console.error("Failed to load comments:", err);
      }
    }

    fetchComments();
  }, [blogId]);

  const handleNewComment = (comment: BlogComment) => {
    console.log("Prev state before adding new comment:", comments);
    setComments((prev = []) => [...prev, comment]);
  };

  if (!isLoaded) return null;

  return (
    <div className="mt-8 space-y-6 mb-8">
      {user ? (
        <>
          {!comments?.some((c) => c.clerkUserId === user.id) && (
            <CommentForm blogId={blogId} onNewComment={handleNewComment} />
          )}
        </>
      ) : (
        <p className="text-[20px] text-[#181A2A] font-bold bg-[#F6F6F7] sub-title border border-[#068D53] p-4 rounded-md">
          <span className="font-medium title">Login to comment:</span> You must
          be signed in to leave a comment.
        </p>
      )}

      {comments
        ?.filter((c) => c.isApproved)
        .map((comment, i) => (
          <div key={i} className="pt-4">
            <div className="flex items-center space-x-3 mb-2">
              <img
                src={comment.author.profileImage}
                alt={comment.author.username}
                className="w-8 h-8 rounded-full"
              />
              <span className="font-semibold sub-title">
                {comment.author.username}
              </span>
              <span className="text-gray-500 text-sm sub-title">
                {new Date(comment.postedAt).toLocaleString()}
              </span>
            </div>
            <p className="text-gray-800 sub-title">{comment.content}</p>
          </div>
        ))}
    </div>
  );
}
