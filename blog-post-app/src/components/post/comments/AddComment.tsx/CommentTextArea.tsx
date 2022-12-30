import type IComment from "@/types/Comment";
import { trpc } from "@/utils/trpc";
import React, { type KeyboardEvent, useState } from "react";
import { Button } from "../../../ui/button";
import { TextArea } from "../../../ui/text-area";
import useQueryUpdateComments from "../hooks/useQueryUpdateComments";

interface CommentTextAreaProps {
  postId: string;
  parentComment?: IComment;
  discardHandler?: () => void;
  unfoldDefault?: boolean;
  placeHolderDefault?: string;
}

export const CommentTextArea = ({
  postId,
  parentComment,
  discardHandler,
  unfoldDefault = false,
  placeHolderDefault = "Add a comment",
}: CommentTextAreaProps) => {
  const [commentText, setCommentText] = useState("");
  const [isCommentUnfolded, setIsCommentUnfolded] = useState(unfoldDefault);

  // Update the comment list with the new comment
  const { addNewComment } = useQueryUpdateComments(postId);
  // Mutation to post a comment
  const postComment = trpc.comment.create.useMutation({
    onSuccess: (comment) => {
      addNewComment(comment);
      setCommentText("");
    },
  });

  // Handle post by pressing control/cmd + enter
  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handlePostComment();
    }
  };

  // Post a comment
  const handlePostComment = () => {
    postComment.mutate({
      postId,
      parentId: parentComment?.id,
      content: commentText,
    });
  };

  // Discard the comment
  const handleDiscard = () => {
    if (discardHandler) discardHandler();
    setCommentText("");
    setIsCommentUnfolded(false);
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex w-full grow">
        <TextArea
          className={`grow ${
            isCommentUnfolded ? "h-36" : "h-16"
          } resize-none transition-all`}
          placeholder={placeHolderDefault}
          onChange={(e) => setCommentText(e.target.value)}
          onSelect={() => setIsCommentUnfolded(true)}
          onKeyDown={handleKeyPress}
          value={commentText}
        />
      </div>
      {isCommentUnfolded && (
        <div className="flex gap-2">
          <Button
            variant="filled"
            disabled={!commentText.length}
            onClick={handlePostComment}
          >
            Post
          </Button>
          <Button variant="subtle" onClick={handleDiscard}>
            Discard
          </Button>
        </div>
      )}
    </div>
  );
};
