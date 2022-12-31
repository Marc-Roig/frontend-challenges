import type IComment from "@/types/Comment";
import { trpc } from "@/utils/trpc";
import type { RouterOutputs } from "@/utils/trpc";
import { type InfiniteData } from "@tanstack/react-query";
import { compact } from "@s-libs/micro-dash";

type Page = RouterOutputs["comment"]["getComments"];

type MapCallback = (
  comment: IComment,
  options: {
    idx: number;
    pageIdx: number;
    numPages: number;
    numComments: number;
  }
) => IComment | IComment[] | undefined;

// Utility to iterate over all pages of comments and apply a callback method
const mapPagesComments = (callback: MapCallback, data?: InfiniteData<Page>) => {
  if (!data) return;
  return {
    ...data,
    pages: data.pages.map((page, pageIdx) => ({
      ...page,
      comments: compact(
        page.comments.flatMap((comment, idx) =>
          callback(comment, {
            idx,
            pageIdx: pageIdx,
            numPages: data.pages.length,
            numComments: page.comments.length,
          })
        )
      ),
    })),
  };
};

const commentUtils = (postId: string) => {
  const utils = trpc.useContext();

  return {
    // Update thread of comments. By passing a callback method,
    // iterate all comments and make necessary changes
    updateCommentThread: (callback: MapCallback, parentId?: string) => {
      // Using trpc utility, iterate over all pages of comments and
      // the callback method will be applied to each comment
      return utils.comment.getComments.setInfiniteData(
        { postId, parentId },
        (data) => mapPagesComments(callback, data)
      );
    },
    addNewComment: (comment: IComment, callback: MapCallback) => {
      return utils.comment.getComments.setInfiniteData(
        { postId, parentId: comment.replyFrom?.id },
        (data) => {
          // If there is no data, create a new page with the comment
          const firstPage = data?.pages?.at(0);
          if (!firstPage?.comments.length)
            return {
              pages: [{ comments: [comment], nextCursor: null }],
              pageParams: [],
            };

          return mapPagesComments(callback, data);
        }
      );
    },
  };
};

const useQueryUpdateComments = (postId: string) => {
  const utils = commentUtils(postId);

  const addNewComment = (comment: IComment) => {
    // Add comment to the first page
    utils.addNewComment(comment, (c, { idx, pageIdx }) => {
      if (idx === 0 && pageIdx === 0) return [comment, c];
      return c;
    });

    // In nested comments, to update the list of replies for the parent comment
    // we have to access react-query data from the grandparent comment
    const parentComment = comment.replyFrom;
    if (parentComment) {
      const threadId = parentComment.replyFrom?.id;

      // Add reply to the parent thread
      utils.updateCommentThread((c) => {
        if (c.id === parentComment.id) c.replies.push({ id: comment.id });
        return c;
      }, threadId);
    }
  };

  const deleteComment = (comment: IComment) => {
    utils.updateCommentThread((c) => {
      if (c.id === comment.id) return;
      return c;
    }, comment.replyFrom?.id);

    // In nested comments, to update the list of replies for the parent comment
    // we have to access react-query data from the grandparent comment
    const parentComment = comment.replyFrom;
    if (parentComment) {
      const threadId = parentComment.replyFrom?.id;

      // Remove reply from the parent thread
      utils.updateCommentThread((c) => {
        if (c.id === parentComment.id)
          c.replies = c.replies.filter((r) => r.id !== comment.id);
        return c;
      }, threadId);
    }
  };

  const editComment = (commentId: string, newComment: IComment) => {
    utils.updateCommentThread((c) => {
      if (c.id !== commentId) return c;
      return newComment;
    }, newComment.replyFrom?.id);
  };

  const updateCommentLikes = (comment: IComment, liked: boolean) => {
    utils.updateCommentThread((c) => {
      if (c.id !== comment.id) return c;
      return {
        ...c,
        liked,
        likes: liked ? c.likes + 1 : c.likes - 1,
      };
    }, comment.replyFrom?.id);
  };

  return { addNewComment, deleteComment, editComment, updateCommentLikes };
};

export default useQueryUpdateComments;
