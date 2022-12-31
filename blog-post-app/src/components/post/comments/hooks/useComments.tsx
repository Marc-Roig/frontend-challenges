import { trpc } from "@/utils/trpc";

export const useGetComments = (
  postId: string,
  parentId?: string,
  options?: {
    enabled?: boolean;
  }
) => {
  const result = trpc.comment.getComments.useInfiniteQuery(
    { postId, parentId },
    { getNextPageParam: (lastPage) => lastPage.nextCursor, ...options }
  );

  return {
    ...result,
    comments: result.data?.pages.flatMap((page) => page.comments),
  };
};
