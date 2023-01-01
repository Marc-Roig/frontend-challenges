import type IComment from "@/types/Comment";
import type { Prisma } from "@prisma/client";

const mapCommentFromDB = (
  comment: Prisma.CommentGetPayload<{
    include: {
      replies: true;
      author: true;
      parent: true;
      likedBy: { select: { id: true } };
    };
  }>
): IComment => {
  console.log("comment", comment.likedBy);
  return {
    id: comment.id,
    content: comment.content,
    author: {
      id: comment.author.id,
      name: comment.author.name || "",
    },
    likes: comment.likes,
    liked: comment.likedBy.length > 0,
    replyFrom: comment.parentId
      ? {
          id: comment.parentId,
          replyFrom: comment.parent?.parentId
            ? { id: comment.parent?.parentId }
            : undefined,
        }
      : undefined,
    replies: comment.replies || [],
    postId: comment.postId,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
  };
};

export default mapCommentFromDB;
