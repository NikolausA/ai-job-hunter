import { z } from "zod";

export const jobSchema = z.object({
  id: z.string(),
  title: z.string(),
  company: z.string(),
  description: z.string(),
  location: z.string(),
  tags: z.string().array(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createJobSchema = z.object({
  title: z.string(),
  company: z.string(),
  description: z.string(),
  location: z.string(),
  tags: z.string().array(),
});

export const getJobByIdSchema = z.object({ id: z.string() });
