import type IComment from "@/types/Comment";
import { trpc } from "@/utils/trpc";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import useQueryUpdateComments from "../hooks/useQueryUpdateComments";
import ActionButton from "./_ActionButton";

function LikeButton({ comment }: { comment: IComment }) {
  // const { updateCommentLikes } = useQueryUpdateLike(comment);
  const { updateCommentLikes } = useQueryUpdateComments(comment.postId);

  const like = trpc.comment.like.useMutation({
    onSuccess: () => updateCommentLikes(comment, true),
  });
  const unlike = trpc.comment.unlike.useMutation({
    onSuccess: () => updateCommentLikes(comment, false),
  });

  const handleLike = () => {
    if (comment.liked) return unlike.mutate({ commentId: comment.id });
    like.mutate({ commentId: comment.id });
  };

  return (
    <ActionButton onClick={handleLike}>
      {comment.liked ? (
        <AiFillHeart className="animate-like text-error" size={"1.25rem"} />
      ) : (
        <AiOutlineHeart size={"1.25rem"} />
      )}
      <p className="hidden text-sm md:block">
        {`${comment.likes} like${comment.likes !== 1 ? "s" : ""}`}
      </p>
    </ActionButton>
  );
}

export default LikeButton;
