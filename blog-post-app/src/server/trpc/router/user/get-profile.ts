import { z } from "zod";
import { publicProcedure } from "../../trpc";

const getProfile = publicProcedure
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
        image: true,
      },
    });
    return user;
  });

export default getProfile;
