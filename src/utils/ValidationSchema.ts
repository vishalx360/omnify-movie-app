import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Must contain at least 8 characters")
  .max(16, "Must contain less than 16 characters")
  .regex(/^\S*$/, { message: "Password must not contain whitespace" });

// favorite
export const AddToFavoriteSchema = z.object({
  movie_id: z.number(),
});

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
