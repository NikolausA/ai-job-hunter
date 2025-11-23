import { router, publicProcedure } from "../trpc";
import { getUserByIdSchema } from "../../../shared/types";

export const userRouter = router({
  getById: publicProcedure
    .input(getUserByIdSchema)
    .query(async ({ ctx, input }) => {
      return ctx.prisma.user.findUniqueOrThrow({
        where: { id: input.id },
      });
    }),
  getUserWithProfiles: publicProcedure
    .input(getUserByIdSchema)
    .query(async ({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: { id: input.id },
        include: { profiles: true },
      });
    }),
});
