import { env } from "@/env.mjs";
import MovieDB from "node-themoviedb";
import { redisClient } from "./redisClient";
const mdb = new MovieDB(env.TMDB_API_KEY);

export const movieSectionTypes = [
  "NOWPLAYING",
  "UPCOMING",
  "POPULAR",
  "TOPRATED",
] as const;

export const DEFAULT_QUERY_CONFIG = {
  query: {
    page: 1,
    region: "IN",
  },
};

export const API_MAPPING = {
  POPULAR: (query: typeof DEFAULT_QUERY_CONFIG) => mdb.movie.getPopular(query),
  TOPRATED: (query: typeof DEFAULT_QUERY_CONFIG) =>
    mdb.movie.getTopRated(query),
  NOWPLAYING: (query: typeof DEFAULT_QUERY_CONFIG) =>
    mdb.movie.getNowPlaying(query),
  UPCOMING: (query: typeof DEFAULT_QUERY_CONFIG) =>
    mdb.movie.getUpcoming(query),
};

export async function getList({
  type,
  page,
}: {
  type: (typeof movieSectionTypes)[number];
  page: number;
}) {
  const apiFunction = API_MAPPING[type];
  const response = await apiFunction({
    query: {
      ...DEFAULT_QUERY_CONFIG.query,
      page: page,
    },
  });
  return response.data.results;
}

export async function getMovieDetails(movie_id: string | number) {
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
      60 * 60 * 24 * 30
    );
    return response.data;
  }
}

export async function getSimilar({
  movie_id,
  page,
}: {
  movie_id: string;
  page: number;
}) {
  const response = await mdb.movie.getSimilarMovies({
    query: {
      page: page,
    },
    pathParameters: {
      movie_id: movie_id,
    },
  });
  return response.data.results;
}
export async function getSearchResults({
  query,
  page,
}: {
  query: string;
  page: number;
}) {
  const response = await mdb.search.movies({
    query: {
      query: query,
      page: page,
    },
  });
  return response.data.results;
}
