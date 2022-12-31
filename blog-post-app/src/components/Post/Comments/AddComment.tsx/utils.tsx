import type IComment from "@/types/Comment";

type CommentFromContentProps = {
  parentComment?: IComment;
} & Omit<IComment, "liked" | "likes" | "replies" | "createdAt" | "updatedAt">;

export const getCommentFromContent = ({
  id,
  content,
  postId,
  parentComment,
  author,
}: CommentFromContentProps) => {
  const newComment: IComment = {
    id,
    content,
    postId,
    author,
    replyFrom: parentComment,
    replies: [],
    liked: false,
    likes: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return newComment;
};
