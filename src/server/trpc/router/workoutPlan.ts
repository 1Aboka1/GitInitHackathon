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
	    })
	)
	.mutation(async ({ ctx, input }) => {
	    try {
		    await ctx.prisma.workoutPlan.update({
			where: {
			    id: input.workoutId,
			},
			data: {
			    exercises: {
				connect: {
				    id: input.exerciseId,
				},
			    },
			},
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
		await ctx.prisma.workoutPlan.findFirst({
		    where: {
			userInfoId: input.userInfoId,
		    }
		})
	    } catch(error) {
		console.error(error)
	    }
	})
})
