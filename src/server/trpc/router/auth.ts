import {z} from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const authRouter = router({
    getSession: publicProcedure.query(({ ctx }) => {
	return ctx.session;
    }),
    createUser: publicProcedure
	.input(
	    z.object({
		email: z.string(),
		password: z.string(),
		name: z.string(),
	    })
	)
	.mutation(async ({ ctx, input }) => {
	    try {
		await ctx.prisma.user.create({
		    data: {
			name: input.name,
			email: input.email,
			password: input.password,
		    }
		})
	    } catch(error) {
		console.log(error)
	    }
	}),
    upsertUserInfo: protectedProcedure
	.input(
	    z.object({
		userId: z.string(),
		height: z.number(),
		weight: z.number(),
		goal: z.enum(["FatLoss", "Maintanence", "MuscleGain"]),
		gender: z.enum(["Male", 'Female']),
	    })
	)
	.mutation(async ({ ctx, input }) => {
	    try {
		await ctx.prisma.userInfo.upsert({
		    where: {
			userId: input.userId,
		    },
		    create: {
			height: input.height,
			weight: input.weight,
			goal: input.goal,
			gender: input.gender,
			userId: input.userId,
		    },
		    update: {
			height: input.height,
			weight: input.weight,
			goal: input.goal,
			gender: input.gender,
			userId: input.userId,
		    }
		})
	    } catch(error) {
		console.error(error)
	    }
	}),
    getUserInfo: protectedProcedure
	.input(
	    z.object({
		userId: z.string(),
	    })
	)
	.query(async ({ ctx, input }) => {
	    try {
		await ctx.prisma.userInfo.findFirst({
		    where: {
			userId: input.userId,
		    },
		})
	    } catch(error) {
		console.error(error)
	    }
	})
});
