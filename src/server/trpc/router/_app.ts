import { router } from "../trpc";
import { authRouter } from "./auth";
import {categoryRouter} from "./category";
import {workoutPlanRouter} from "./workoutPlan";

export const appRouter = router({
  auth: authRouter,
  category: categoryRouter,
  workoutPlan: workoutPlanRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
