import type IComment from "@/types/Comment";
import { trpc } from "@/utils/trpc";
import type { MergeComponentProps } from "@/utils/types";
import React, { type KeyboardEvent, useState } from "react";
import { Button } from "../../../ui/Button";
import { TextArea } from "../../../ui/TextArea";
import useEditingComment from "../hooks/useEdittingComment";
import useQueryUpdateComments from "../hooks/useQueryUpdateComments";

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

  // Update the comment list with the new comment
  const { addNewComment, editComment } = useQueryUpdateComments(postId);
  // Mutation to post a comment
  const postComment = trpc.comment.create.useMutation({
    onSuccess: (comment) => {
      addNewComment(comment);
      setCommentText("");
    },
  });

  const { stopEditingComment } = useEditingComment();

  // Mutation to edit comment content
  const editCommentMut = trpc.comment.edit.useMutation({
    onSuccess: (comment) => {
      editComment(comment);
      setCommentText("");
      stopEditingComment(comment.id);
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
          onSelect={() => setIsCommentUnfolded(true)}
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
            onClick={handlePostComment}
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
