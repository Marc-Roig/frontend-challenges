import type IComment from "@/types/Comment";
import { trpc } from "@/utils/trpc";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import useQueryUpdateLike from "./hooks/useQueryUpdateLike";

function ActionButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-[0.15rem] text-xs font-light text-brand-text2"
    >
      {children}
    </button>
  );
}

function LikeButton({ comment }: { comment: IComment }) {
  const { updateCommentLikes } = useQueryUpdateLike(comment);

  const like = trpc.comment.like.useMutation({
    onSuccess: () => updateCommentLikes(true),
  });
  const unlike = trpc.comment.unlike.useMutation({
    onSuccess: () => updateCommentLikes(false),
  });

  const handleLike = () => {
    if (comment.liked) return unlike.mutate({ commentId: comment.id });
    like.mutate({ commentId: comment.id });
  };

  return (
    <ActionButton onClick={handleLike}>
      {comment.liked ? (
        <AiFillHeart className="ml animate-like text-error" size={"1.25rem"} />
      ) : (
        <AiOutlineHeart size={"1.25rem"} />
      )}
      <p className="hidden text-sm md:block">
        {`${comment.likes} like${comment.likes !== 1 ? "s" : ""}`}
      </p>
    </ActionButton>
  );
}

function getRepliesText(comment: IComment, repliesVisible: boolean) {
  if (comment?.replies.length === 0) return "";
  if (repliesVisible) return "Hide replies";

  const repliesText = comment?.replies.length > 1 ? "replies" : "reply";
  return `${comment.replies.length} ${repliesText}`;
}

function ReplyButton({ onClick }: { onClick?: () => void }) {
  return (
    <ActionButton onClick={onClick}>
      <AiOutlineComment size={"1.25rem"} />
      <p className="hidden md:block">Reply</p>
    </ActionButton>
  );
}

function ShowRepliesButton({
  comment,
  repliesVisible,
  onClick,
}: {
  comment: IComment;
  repliesVisible: boolean;
  onClick?: () => void;
}) {
  const repliesText = getRepliesText(comment, repliesVisible);
  return (
    <button className="text-sm font-light" onClick={onClick}>
      {repliesText}
    </button>
  );
}

export { LikeButton, ReplyButton, ShowRepliesButton };
