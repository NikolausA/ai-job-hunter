import { z } from "zod";
import { ProfileSchema } from "./profile";

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string().optional(),
  skills: z.string().array(),
  createdAt: z.date(),
  updatedAt: z.date(),
  profiles: ProfileSchema.array(),
});
