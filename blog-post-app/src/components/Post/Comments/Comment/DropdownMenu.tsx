import type IComment from "@/types/Comment";
import { trpc } from "@/utils/trpc";
import DropdownMenu, {
  type Items,
} from "@/components/ui/Dropdown/DropdownMenu";
import React from "react";
import useQueryUpdateComments from "../hooks/useQueryUpdateComments";
import { useSession } from "next-auth/react";
import useEditingComment from "../hooks/useEditingComment";

function CommentDropdownMenu({ comment }: { comment: IComment }) {
  const { deleteComment } = useQueryUpdateComments(comment.postId);
  const deleteCommentMut = trpc.comment.deleteComment.useMutation({
    onSuccess: () => {
      deleteComment(comment);
    },
  });
  // get user id using use session
  const { data: session } = useSession();

  // toggle state to edit comment
  const { editComment } = useEditingComment();

  // if user is not the author of the comment, don't show the dropdown menu
  if (session?.user?.id !== comment.author.id) {
    return null;
  }

  const items: Items[] = [
    {
      label: "Edit",
      onClick: () => {
        editComment(comment.id);
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
