import type IComment from "@/types/Comment";
import { trpc } from "@/utils/trpc";
import DropdownMenu, {
  type Items,
} from "@/components/ui/dropdown/DropdownMenu";
import React from "react";
import useQueryUpdateComments from "../hooks/useQueryUpdateComments";

function CommentDropdownMenu({ comment }: { comment: IComment }) {
  const { deleteComment } = useQueryUpdateComments(comment.postId);
  const deleteCommentMut = trpc.comment.deleteComment.useMutation({
    onSuccess: () => {
      deleteComment(comment);
    },
  });

  const items: Items[] = [
    {
      label: "Edit",
      onClick: () => {
        console.log("Edit");
      },
    },
    {
      label: "Delete",
      color: "red",
      onClick: () => {
        deleteCommentMut.mutate({ id: comment.id });
      },
    },
  ];

  return <DropdownMenu className="-mr-2" items={items} />;
}

export default CommentDropdownMenu;
