import type IComment from "@/types/Comment";
import type { MergeComponentProps } from "@/utils/types";
import React, { type KeyboardEvent, useState } from "react";
import { Button } from "../../../ui/Button";
import { TextArea } from "../../../ui/TextArea";
import useEditingComment from "../hooks/useEditingComment";
import { nanoid } from "nanoid";
import { useAddComment, useEditComment } from "../hooks/useComments";
import useProtectedAction from "@/hooks/useProtectedAction";

interface CommentTextAreaProps {
  postId: string; // Post id to post the comment to
  comment?: IComment; // Comment to edit
  parentComment?: IComment; // Parent comment to reply to
  mode?: "edit" | "add";
  discardHandler?: () => void; // Handler to discard the comment
  unfoldDefault?: boolean; // Unfold the comment textarea by default
}

export const CommentTextArea = ({
  postId,
  comment,
  parentComment,
  mode = "add",
  discardHandler,
  unfoldDefault = false,
  placeholder = "Add a comment",
  value,
  ...props
}: MergeComponentProps<"textarea", CommentTextAreaProps>) => {
  const [commentText, setCommentText] = useState(value?.toString() || "");
  const [isCommentUnfolded, setIsCommentUnfolded] = useState(unfoldDefault);
  const { protectAction } = useProtectedAction();
  const { stopEditingComment } = useEditingComment();

  // Mutation to post a comment
  const postComment = useAddComment({
    postId,
    parentComment,
    onMutate: () => setCommentText(""),
  });

  // Mutation to edit comment content
  const editCommentMut = useEditComment({
    postId,
    parentComment,
    onMutate: (comment) => {
      setCommentText("");
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
      stopEditingComment(comment.id!);
    },
  });

  // Handle post by pressing control/cmd + enter
  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey) && commentText) {
      handlePostComment();
    }
  };

  // Post a comment
  const handlePostComment = () => {
    switch (mode) {
      case "add":
        postComment.mutate({
          id: nanoid(),
          postId,
          parentId: parentComment?.id,
          content: commentText,
        });
        break;
      case "edit":
        if (!comment) return;
        editCommentMut.mutate({
          id: comment.id,
          content: commentText,
        });
        break;
    }
  };

  // Discard the comment
  const handleDiscard = () => {
    // Call the discard handler if it exists
    if (discardHandler) discardHandler();
    // Stop editing the comment if it's in edit mode
    if (mode === "edit") stopEditingComment(comment?.id || "");
    // Reset the comment text
    setCommentText("");
    // Fold the comment textarea
    setIsCommentUnfolded(false);
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex w-full grow">
        <TextArea
          className={`grow ${
            isCommentUnfolded ? "h-40" : "h-16"
          } resize-none transition-all`}
          placeholder={placeholder}
          onChange={(e) => setCommentText(e.target.value)}
          onSelect={protectAction(() => setIsCommentUnfolded(true))}
          onKeyDown={handleKeyPress}
          value={commentText}
          {...props}
        />
      </div>
      {isCommentUnfolded && (
        <div className="flex gap-2">
          <Button
            variant="filled"
            disabled={!commentText.length}
            onClick={protectAction(handlePostComment)}
          >
            {mode === "add" ? "Post" : "Save"}
          </Button>
          <Button variant="subtle" onClick={handleDiscard}>
            Discard
          </Button>
        </div>
      )}
    </div>
  );
};
