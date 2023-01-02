import { z } from "zod";
import { protectedProcedure } from "../../trpc";

const getProfile = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: input.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });
    return user;
  });

export default getProfile;
