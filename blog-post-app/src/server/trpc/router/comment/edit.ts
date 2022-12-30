import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import mapCommentFromDB from "./utils/map-from-db";

const editComment = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      content: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const comment = await ctx.prisma.comment.update({
      where: {
        id: input.id,
      },
      data: {
        content: input.content,
      },
      include: {
        replies: true,
        author: true,
        parent: true,
        likedBy: true,
      },
    });

    return mapCommentFromDB(comment);
  });

export default editComment;
