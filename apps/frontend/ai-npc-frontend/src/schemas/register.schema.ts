import { z } from "zod";
import { RoleValues } from "@/constants/user.const";

export const registerSchema = z.object({
  name: z.string({ message: "Name is required" }),
  email: z.email("Email must be a valid address"),
  password: z
    .string({ message: "Password is required" })
    .min(6, "Password must be at least 6 characters long"),
  phone: z.string().optional(),
  avatarUrl: z.url("Avatar URL must be a valid URL").optional(),
  role: z.enum(RoleValues, {
    message: "Invalid role value.",
  }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
