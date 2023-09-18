import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { getMovieDetails } from "@/utils/GetMovieData";
import { AddToFavoriteSchema } from "@/utils/ValidationSchema";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const FavoriteRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    const favorites = await ctx.prisma.favroite.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        movie_id: true,
      },
    });
    const movieDetailsPromises = favorites.map(
      async (fav) => await getMovieDetails(fav.movie_id)
    );
    const movieDetails = await Promise.all(movieDetailsPromises);
    return movieDetails;
  }),
  doesExist: protectedProcedure
    .input(
      z.object({
        movie_id: z.number(),
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
      return ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          favroites: {
            create: {
              movie_id: input.movie_id,
            },
          },
        },
      });
    }),
  remove: protectedProcedure
    .input(z.object({ movie_id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.favroite.deleteMany({
        where: {
          movie_id: input.movie_id,
          userId: ctx.session.user.id,
        },
      });
    }),
});
