import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Must contain at least 8 characters")
  .max(16, "Must contain less than 16 characters")
  .regex(/^\S*$/, { message: "Password must not contain whitespace" });

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
