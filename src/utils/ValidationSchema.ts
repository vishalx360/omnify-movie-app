import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Must contain at least 8 characters")
  .max(16, "Must contain less than 16 characters")
  .regex(/^\S*$/, { message: "Password must not contain whitespace" });


// favorite
export const MovieSchema = z.object({
  poster_path: z.string().nullable(),
  adult: z.boolean(),
  overview: z.string(),
  release_date: z.string(),
  genre_ids: z.array(z.number()),
  movie_id: z.string(),
  original_title: z.string(),
  original_language: z.string(),
  title: z.string(),
  backdrop_path: z.string().nullable(),
  popularity: z.number(),
  vote_count: z.number(),
  video: z.boolean(),
  vote_average: z.string(),
});

export const AddToFavoriteSchema = MovieSchema.pick({
  movie_id: true,
  poster_path: true,
  title: true,
  release_date: true,
  overview: true,
  vote_average: true,
})

// movie
export const getListSchema = z.object({
  type: z.enum(["POPULAR", "TOPRATED", "NOWPLAYING", "UPCOMING"]),
  page: z.number().default(1),
});

export const getDetailsSchema = z.object({
  movie_id: z.string(),
});

export const getSimilarSchema = z.object({
  movie_id: z.string(),
  page: z.number().default(1),
});

export const searchSchema = z.object({
  query: z.string(),
  page: z.number().default(1),
  year: z.number().optional(),
});

export const searchSchemaLocal = z.object({
  query: z.string().optional(),
});

export const SigninSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
});

export const SignUpSchema = z.object({
  email: z.string().email(),
  name: z
    .string()
    .min(4, "Must contain at least 4 characters")
    .max(50, "Must contain less than 50 characters"),
  password: z
    .string()
    .regex(/^\S*$/, { message: "Password must not contain whitespace" }),
});


