import { z } from "zod";
import { publicProcedure } from "../../trpc";
import mapCommentFromDB from "./utils/map-from-db";

const getComments = publicProcedure
  .input(
    z.object({
      postId: z.string(),
      parentId: z.string().optional(),
      cursor: z.string().optional(),
      limit: z.number().optional().default(4),
    })
  )
  .query(async ({ ctx, input }) => {
    const comments = await ctx.prisma.comment.findMany({
      where: {
        postId: input.postId,
        parentId: input.parentId || null,
      },
      take: input.limit,
      skip: input.cursor ? input.limit : 0,
      cursor: input.cursor
        ? {
            id: input.cursor,
          }
        : undefined,
      orderBy: {
        createdAt: "desc", // newest first
      },
      include: {
        replies: true,
        author: true,
        parent: true,
        likedBy: {
          where: {
            id: ctx.session?.user?.id,
          },
          select: {
            id: true,
          },
        },
      },
    });

    let nextCursor = null;
    if (comments.length === input.limit)
      nextCursor = comments.slice(0, -1)?.at(0)?.id;

    return {
      comments: comments?.map(mapCommentFromDB),
      nextCursor,
    };
  });

export default getComments;
