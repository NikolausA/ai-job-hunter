import { router } from "./trpc";
import { jobRouter } from "./routers/job";
import { userRouter } from "./routers/user";
import { profileRouter } from "./routers/profile";

export const appRouter = router({
  user: userRouter,
  job: jobRouter,
  profile: profileRouter,
});

export type AppRouter = typeof appRouter;
