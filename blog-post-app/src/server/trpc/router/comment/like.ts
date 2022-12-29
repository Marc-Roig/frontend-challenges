import { z } from "zod";
import { protectedProcedure } from "../../trpc";

const like = protectedProcedure
  .input(
    z.object({
      commentId: z.string().min(1),
    })
  )
  .mutation(async ({ ctx, input }) => {
    // update where the user is not in likedBy
    const alreadyLiked = await ctx.prisma.comment.findUnique({
      where: {
        id: input.commentId,
      },
      select: {
        likedBy: {
          where: {
            id: ctx.session.user.id,
          },
        },
      },
    });

    if (alreadyLiked?.likedBy.length) {
      return;
    }

    const comment = await ctx.prisma.comment.update({
      where: {
        id: input.commentId,
      },
      data: {
        likes: {
          increment: 1,
        },
        likedBy: {
          connect: {
            id: ctx.session.user.id,
          },
        },
      },
    });

    return comment.likes;
  });

const unlike = protectedProcedure
  .input(
    z.object({
      commentId: z.string().min(1),
    })
  )
  .mutation(async ({ ctx, input }) => {
    // Do not unlike if not liked
    const alreadyLiked = await ctx.prisma.comment.findUnique({
      where: {
        id: input.commentId,
      },
      select: {
        likedBy: {
          where: {
            id: ctx.session.user.id,
          },
        },
      },
    });

    if (!alreadyLiked?.likedBy.length) {
      return;
    }

    const comment = await ctx.prisma.comment.update({
      where: {
        id: input.commentId,
      },
      data: {
        likes: {
          decrement: 1,
        },
        likedBy: {
          disconnect: {
            id: ctx.session.user.id,
          },
        },
      },
    });

    return comment.likes;
  });

export { like, unlike };
