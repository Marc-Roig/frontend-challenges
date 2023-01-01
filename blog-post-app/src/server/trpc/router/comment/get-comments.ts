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
      orderBy: z.string().optional().default("createdAt"),
      order: z.enum(["desc", "asc"]).optional().default("desc"), // newest first
    })
  )
  .query(async ({ ctx, input }) => {
    const comments = await ctx.prisma.comment.findMany({
      where: {
        postId: input.postId,
        parentId: input.parentId || null,
      },
      take: input.limit + 1,
      cursor: input.cursor
        ? {
            id: input.cursor,
          }
        : undefined,
      orderBy: {
        [input.orderBy]: input.order,
      },
      include: {
        replies: true,
        author: true,
        parent: true,
        likedBy: {
          where: {
            id: ctx.session?.user?.id || "",
          },
          select: {
            id: true,
          },
        },
      },
    });

    const nextCursor =
      comments.length >= input.limit + 1 ? comments.pop()?.id : null;

    return {
      comments: comments?.map(mapCommentFromDB),
      nextCursor,
    };
  });

export default getComments;
