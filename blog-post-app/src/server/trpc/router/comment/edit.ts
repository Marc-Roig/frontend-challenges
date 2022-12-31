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
    // check if user is allowed to edit comment
    const originalComment = await ctx.prisma.comment.findUnique({
      where: {
        id: input.id,
      },
      select: {
        authorId: true,
      },
    });

    if (!originalComment) throw new Error("Comment not found");
    if (originalComment.authorId !== ctx.session.user.id)
      throw new Error("Not allowed to edit comment");

    // update comment
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
