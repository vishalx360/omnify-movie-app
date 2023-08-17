import { env } from "@/env.mjs";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  getDetailsSchema,
  getListSchema,
  getSimilarSchema,
  searchSchema,
} from "@/utils/ValidationSchema";
import { redisClient } from "@/utils/redisClient";
import { TRPCError } from "@trpc/server";
import MovieDB from "node-themoviedb";

const mdb = new MovieDB(env.TMDB_API_KEY);

const DEFAULT_QUERY = {
  query: {
    page: 1,
    region: "IN",
  },
};

export async function GetMovieDetails(movie_id: string | number) {
  try {
    // check cache
    const cachedMovie = await redisClient.get(`movie:${movie_id}`);
    if (cachedMovie) {
      return JSON.parse(cachedMovie) as MovieDB.Responses.Movie.GetDetails;
    } else {
      const response = await mdb.movie.getDetails({
        pathParameters: {
          movie_id,
        },
      });
      await redisClient.set(
        `movie:${movie_id}`,
        JSON.stringify(response.data),
        "EX",
        60 * 60 * 24 * 7
      );
      return response.data;
    }
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "some error occured while fetching",
    });
  }
}

const API_MAPPING = {
  POPULAR: (query: typeof DEFAULT_QUERY) => mdb.movie.getPopular(query),
  TOPRATED: (query: typeof DEFAULT_QUERY) => mdb.movie.getTopRated(query),
  NOWPLAYING: (query: typeof DEFAULT_QUERY) => mdb.movie.getNowPlaying(query),
  UPCOMING: (query: typeof DEFAULT_QUERY) => mdb.movie.getUpcoming(query),
};

export const MovieRouter = createTRPCRouter({
  getList: protectedProcedure.input(getListSchema).query(async ({ input }) => {
    const apiFunction = API_MAPPING[input.type];
    try {
      const response = await apiFunction({
        query: {
          ...DEFAULT_QUERY.query,
          page: input.page,
        },
      });
      return response.data.results;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "some error occured while fetching",
      });
    }
  }),

  getDetails: protectedProcedure
    .input(getDetailsSchema)
    .query(async ({ input }) => {
      return GetMovieDetails(input.movie_id);
    }),
  getSimilar: protectedProcedure
    .input(getSimilarSchema)
    .query(async ({ input }) => {
      try {
        const response = await mdb.movie.getSimilarMovies({
          query: {
            page: input.page,
          },
          pathParameters: {
            movie_id: input.movie_id,
          },
        });
        return response.data.results;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "some error occured",
        });
      }
    }),

  search: protectedProcedure.input(searchSchema).query(async ({ input }) => {
    try {
      const response = await mdb.search.movies({
        query: {
          query: input.query,
          page: input.page,
          year: input.year ?? undefined,
        },
      });
      return response.data.results;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "some error occured",
      });
    }
  }),
});
