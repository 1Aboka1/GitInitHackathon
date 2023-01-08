import {z} from "zod"
import {protectedProcedure, publicProcedure, router} from "../trpc"

export const workoutPlanRouter = router({
    createWorkout: protectedProcedure
	.input(
	    z.object({
		name: z.string(),
		userInfoId: z.string(),
	    })
	)
	.mutation(async ({ ctx, input }) => {
	    try {
		await ctx.prisma.workoutPlan.create({
		    data: {
			name: input.name,
			userInfoId: input.userInfoId,
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
		    },
		    include: {
			workoutPlanOnExercises: {
			    include: {
				exercise: {
				    include: {
					primaryMuscles: true,
					equipments: true,
				    }
				}
			    }
			}
		    },
		})
	    } catch(error) {
		console.error(error)
	    }
	}),
    deleteExerciseFromWorkoutPlan: protectedProcedure
	.input(
	    z.object({
		exerciseId: z.string(),
		workoutId: z.string(),
	    })
	)
	.mutation(async ({ ctx, input }) => {
	    try {
		await ctx.prisma.workoutPlanOnExercise.delete({
		    where: {
			workoutPlanId_exerciseId: {
			    workoutPlanId: input.workoutId,
			    exerciseId: input.exerciseId,
			}
		    }
		})
	    } catch(error) {
		console.error(error)
	    }
	})
})
