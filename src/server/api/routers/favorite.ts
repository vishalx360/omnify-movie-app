import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { AddToFavoriteSchema } from "@/utils/ValidationSchema";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const FavoriteRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.favroite.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
  doesExist: protectedProcedure
    .input(
      z.object({
        movie_id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const exist = await ctx.prisma.favroite.count({
        where: {
          userId: ctx.session.user.id,
          movie_id: input.movie_id,
        },
      });
      return exist !== 0;
    }),

  add: protectedProcedure
    .input(AddToFavoriteSchema)
    .mutation(async ({ ctx, input }) => {
      const exist = await ctx.prisma.favroite.count({
        where: {
          userId: ctx.session.user.id,
          movie_id: input.movie_id,
        },
      });
      if (exist) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Movie already exists in favorites",
        });
      }
      // only create if it doesnt exist
      return ctx.prisma.favroite.create({
        data: { ...input, userId: ctx.session.user.id },
      });
    }),
  remove: protectedProcedure
    .input(z.object({ movie_id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.favroite.deleteMany({
        where: {
          movie_id: input.movie_id,
          userId: ctx.session.user.id,
        },
      });
    }),
});
