import { router, publicProcedure } from "../trpc";
import { getProfilesByUserSchema } from "../../../shared/types";

export const profileRouter = router({
  getByUser: publicProcedure
    .input(getProfilesByUserSchema)
    .query(async ({ ctx, input }) => {
      return ctx.prisma.profile.findMany({ where: { userId: input.userId } });
    }),
});
