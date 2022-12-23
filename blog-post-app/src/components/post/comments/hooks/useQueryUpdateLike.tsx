import type IComment from "@/types/Comment";
import { trpc } from "@/utils/trpc";

const useQueryUpdateLike = (comment: IComment) => {
  const utils = trpc.useContext();
  const { postId } = comment;

  const updateCommentLikes = (liked: boolean) => {
    const comments = utils.comment.getComments
      .getData({
        postId,
      })
      ?.map((c) => {
        if (c.id !== comment.id) return c;
        return {
          ...c,
          liked,
          likes: liked ? c.likes + 1 : c.likes - 1,
        };
      });

    utils.comment.getComments.setData({ postId }, comments);
  };

  return { updateCommentLikes };
};

export default useQueryUpdateLike;
