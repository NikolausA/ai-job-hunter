import { z } from "zod";

export const JobSchema = z.object({
  id: z.string(),
  title: z.string(),
  company: z.string(),
  description: z.string(),
  location: z.string(),
  tags: z.string().array(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
