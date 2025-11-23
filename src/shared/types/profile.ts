import { z } from "zod";

export const ProfileSchema = z.object({
  id: z.string(),
  title: z.string(),
  experience: z.string(),
  userId: z.string(),
  createdAt: z.date(),
});

export const getProfilesByUserSchema = z.object({ userId: z.string() });
