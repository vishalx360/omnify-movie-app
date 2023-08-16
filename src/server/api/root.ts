import { exampleRouter } from "@/server/api/routers/example";
import { createTRPCRouter } from "@/server/api/trpc";
import { AuthenticationRouter } from "./routers/authentication";
import { MovieRouter, } from "./routers/movie";
import { FavoriteRouter } from "./routers/favorite";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  authentication: AuthenticationRouter,
  movie: MovieRouter,
  favorite: FavoriteRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
