import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import mapCommentFromDB from "./utils/map-from-db";

const createComment = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      postId: z.string(),
      parentId: z.string().optional(),
      content: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const comment = await ctx.prisma.comment.create({
      data: {
        id: input.id,
        content: input.content,
        authorId: ctx.session.user.id,
        postId: input.postId,
        parentId: input.parentId,
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

export default createComment;
