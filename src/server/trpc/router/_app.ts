import { router } from "../trpc";
import { authRouter } from "./auth";
import {workoutPlanRouter} from "./workoutPlan";

export const appRouter = router({
  auth: authRouter,
  workoutPlan: workoutPlanRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
