import type IComment from "@/types/Comment";
import { trpc } from "@/utils/trpc";
import { useRef, useState } from "react";
import { Button } from "../../atoms/button";
import { TextArea } from "../../atoms/text-area";
import useQueryUpdateComments from "./hooks/useQueryUpdateComments";

export const CommentTextArea = ({
  postId,
  parentComment,
}: {
  postId: string;
  parentComment?: IComment;
}) => {
  const [commentText, setCommentText] = useState("");

  // Update the comment list with the new comment
  const { addNewComment } = useQueryUpdateComments(postId);
  // Mutation to post a comment
  const postComment = trpc.comment.create.useMutation({
    onSuccess: (comment) => {
      addNewComment(comment, parentComment);
      setCommentText("");
    },
  });

  const handlePostComment = () => {
    postComment.mutate({
      postId,
      parentId: parentComment?.id,
      content: commentText,
    });
  };

  return (
    <div className="flex w-full flex-wrap gap-4">
      <TextArea
        className="grow resize-none"
        placeholder="Add a comment"
        onChange={(e) => setCommentText(e.target.value)}
        value={commentText}
      />
      <Button disabled={!commentText.length} onClick={handlePostComment}>
        Post
      </Button>
    </div>
  );
};

const PostNewComment = ({ postId }: { postId: string }) => {
  return (
    <section className="flex flex-col gap-4 pt-2">
      <h2 className="text-2xl font-semibold">Comments</h2>
      <CommentTextArea postId={postId} />
    </section>
  );
};

export default PostNewComment;
