import { z } from "zod";
import { publicProcedure } from "../../trpc";
import mapCommentFromDB from "./utils/map-from-db";

const getComments = publicProcedure
  .input(
    z.object({
      postId: z.string(),
      parentId: z.string().optional(),
      cursor: z.string().optional(),
    })
  )
  .query(async ({ ctx, input }) => {
    const comments = await ctx.prisma.comment.findMany({
      where: {
        postId: input.postId,
        parentId: input.parentId || null,
      },
      take: 10,
      skip: input.cursor ? 1 : 0,
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

    return comments?.map(mapCommentFromDB);
  });

export default getComments;
