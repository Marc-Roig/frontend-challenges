import type IComment from "@/types/Comment";
import { trpc } from "@/utils/trpc";

const useQueryUpdateComments = (postId: string) => {
  const utils = trpc.useContext();

  const addNewComment = (comment: IComment, parentComment?: IComment) => {
    const input = { postId, parentId: comment.replyFrom?.id };
    // update list of replies for parent comment
    const comments = utils.comment.getComments.getData(input) || [];
    utils.comment.getComments.setData(input, [comment, ...comments]);

    // update parent comment with the new reply list (used to show the number of replies)
    if (parentComment) {
      const input = { postId, parentId: parentComment.replyFrom?.id };

      const comments = utils.comment.getComments.getData(input)?.map((c) => {
        if (c.id === parentComment.id) c.replies.push({ id: comment.id });
        return c;
      });

      utils.comment.getComments.setData(input, comments || []);
    }
  };

  return { addNewComment };
};

export default useQueryUpdateComments;
