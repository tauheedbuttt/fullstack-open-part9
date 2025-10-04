import z from "zod";
import { Gender } from "./types";

export const entrySchema = z.object({
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

export const newEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.enum(Object.values(Gender)),
  occupation: z.string(),
  entries: z.array(entrySchema),
});
