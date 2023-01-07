import {z} from "zod"
import {protectedProcedure, publicProcedure, router} from "../trpc"

export const workoutPlanRouter = router({
    createWorkout: protectedProcedure
	.input(
	    z.object({
		name: z.string(),
		userId: z.string(),
	    })
	)
	.mutation(async ({ ctx, input }) => {
	    try {
		await ctx.prisma.workoutPlan.create({
		    data: {
			name: input.name,
			userInfoId: input.userId,
		    },
		    select: {
			id: true,
		    }
		})
	    } catch(error) {
		console.error(error)
	    }
	}),
    addExerciseToWorkoutPlan: protectedProcedure
	.input(
	    z.object({
		exerciseId: z.string(),
		workoutId: z.string(),
		sets: z.number(),
		reps: z.number(),
		rest: z.number(),
	    })
	)
	.mutation(async ({ ctx, input }) => {
	    try {
		    await ctx.prisma.workoutPlanOnExercise.create({
			data: {
			    exerciseId: input.exerciseId,
			    workoutPlanId: input.workoutId,
			    sets: input.sets,
			    reps: input.reps,
			    rest: input.reps,
			}
		    })
	    } catch(error) {
		console.error(error)
	    }
	}),
    getWorkoutPlan: protectedProcedure 
	.input(
	    z.object({
		userInfoId: z.string(),
	    })
	)
	.query(async ({ ctx, input }) => {
	    try {
		return await ctx.prisma.workoutPlan.findFirst({
		    where: {
			userInfoId: input.userInfoId,
		    }
		})
	    } catch(error) {
		console.error(error)
	    }
	})
})
