import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import mapCommentFromDB from "./utils/map-from-db";

const deleteComment = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const comment = await ctx.prisma.comment.delete({
      where: {
        id: input.id,
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

export default deleteComment;
