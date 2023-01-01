import type IComment from "@/types/Comment";
import { type RouterInputs, trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";
import { getCommentFromContent } from "../AddComment.tsx/utils";
import useQueryUpdateComments from "./useQueryUpdateComments";

export const useGetComments = (
  data: RouterInputs["comment"]["getComments"],
  options?: {
    enabled?: boolean;
  }
) => {
  const result = trpc.comment.getComments.useInfiniteQuery(data, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    ...options,
  });

  return {
    ...result,
    comments: result.data?.pages.flatMap((page) => page.comments),
  };
};

interface AddCommentProps {
  postId: string;
  parentComment?: IComment;
  onMutate?: (comment: Partial<IComment>) => void;
}

export const useAddComment = ({
  postId,
  parentComment,
  onMutate,
}: AddCommentProps) => {
  // To update the comment list with the new comment
  const { addNewComment } = useQueryUpdateComments(postId);

  // Author of the comment
  const { data: session } = useSession();
  const author = {
    id: session?.user?.id || "",
    name: session?.user?.name || "",
  };

  // Mutation to post a comment
  return trpc.comment.create.useMutation({
    // Optimistically update the comment list
    onMutate: (comment) => {
      const newComment: IComment = getCommentFromContent({
        ...comment,
        parentComment,
        author,
      });
      addNewComment(newComment);

      if (onMutate) onMutate(comment);
    },
  });
};

export const useEditComment = ({
  postId,
  parentComment,
  onMutate,
}: AddCommentProps) => {
  // To update the comment list with the new comment
  const { editComment } = useQueryUpdateComments(postId);

  // Author of the comment
  const { data: session } = useSession();
  const author = {
    id: session?.user?.id || "",
    name: session?.user?.name || "",
  };

  // Mutation to post a comment
  return trpc.comment.edit.useMutation({
    // Optimistically update the comment list
    onMutate: (comment) => {
      const newComment: IComment = getCommentFromContent({
        ...comment,
        postId,
        parentComment,
        author,
      });
      editComment(comment.id, newComment);
      if (onMutate) onMutate(comment);
    },
  });
};
