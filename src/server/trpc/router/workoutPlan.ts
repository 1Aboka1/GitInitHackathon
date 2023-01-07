import {z} from "zod"
import {protectedProcedure, router} from "../trpc"

export const workoutPlanRouter = router({
    createWorkout: protectedProcedure
	.input(
	    z.object({
		name: z.string()	
	    })
	)
	.mutation(async ({ ctx, input }) => {
	    try {
		await ctx.prisma.workoutPlan.create({
		    data: {
			name: input.name,
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
		    await ctx.prisma.workoutPlan.create({
			data: {
			    id: input.workoutId,
			    exercises: {
				connect: {
				    id: input.exerciseId,
				},
			    },
			},
		    })
	    }
	})
})
