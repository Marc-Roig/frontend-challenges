import type IComment from "@/types/Comment";
import { trpc } from "@/utils/trpc";

const commentUtils = (postId: string) => {
  const utils = trpc.useContext();
  return {
    // Get thread of comments.
    // Can be the main thread or a nested thread if parentId is provided.
    getCommentThread: (parentId?: string) => {
      return utils.comment.getComments.getData({ postId, parentId }) || [];
    },
    // Update thread of comments.
    updateCommentThread: (comments: IComment[], parentId?: string) => {
      return utils.comment.getComments.setData({ postId, parentId }, comments);
    },
    // Add a reply in a thread of comments
    addReplyToComments: (comments: IComment[], replyComment: IComment) =>
      comments.map((c) => {
        if (c.id === replyComment.replyFrom?.id)
          c.replies.push({ id: replyComment.id });
        return c;
      }) || [],
    // Remove a reply from a thread of comments
    removeReplyFromComments: (comments: IComment[], replyComment: IComment) =>
      comments.map((c) => {
        if (c.id === replyComment.replyFrom?.id)
          c.replies = c.replies.filter((r) => r.id !== replyComment.id);
        return c;
      }) || [],
  };
};

const useQueryUpdateComments = (postId: string) => {
  const utils = commentUtils(postId);

  const addNewComment = (comment: IComment) => {
    // update list of replies for parent comment
    utils.updateCommentThread(
      [comment, ...utils.getCommentThread(comment.replyFrom?.id)],
      comment.replyFrom?.id
    );

    const parentComment = comment.replyFrom;
    // In nested comments, to update the list of replies for the parent comment
    // we have to access react-query data from the grandparent comment
    if (parentComment) {
      const parentReplyFrom = parentComment.replyFrom?.id;
      // Comments from the parent thread
      const parentComments = utils.getCommentThread(parentReplyFrom);
      const parentCommentsWithReply = utils.addReplyToComments(
        parentComments,
        comment
      );

      utils.updateCommentThread(parentCommentsWithReply, parentReplyFrom);
    }
  };

  const deleteComment = (comment: IComment) => {
    const newComments = utils
      .getCommentThread(comment.replyFrom?.id)
      .filter((c) => c.id !== comment.id);

    utils.updateCommentThread(newComments, comment.replyFrom?.id);

    const parentComment = comment.replyFrom;
    if (parentComment) {
      const parentReplyFrom = parentComment.replyFrom?.id;
      const parentComments = utils.getCommentThread(parentReplyFrom);
      const parentCommentsWithoutReply = utils.removeReplyFromComments(
        parentComments,
        comment
      );

      utils.updateCommentThread(parentCommentsWithoutReply, parentReplyFrom);
    }
  };

  return { addNewComment, deleteComment };
};

export default useQueryUpdateComments;
