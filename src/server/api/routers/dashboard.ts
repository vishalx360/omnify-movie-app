import { env } from "@/env.mjs";
import {
  createTRPCRouter,
  protectedProcedure
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";


import MovieDB from "node-themoviedb";

const mdb = new MovieDB(env.TMDB_API_KEY);

export const DashboardRouter = createTRPCRouter({
  getLatest: protectedProcedure.query(async ({ ctx }) => {
    try {
      const nowPlaying = await mdb.movie.getNowPlaying({
        query: {
          page: 1,
          region: "IN"
        }
      });
      return nowPlaying.data;

    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "some error occured",
      });
    }
    return;
  }),
});
