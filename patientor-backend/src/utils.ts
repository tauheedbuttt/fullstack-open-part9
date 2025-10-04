import z from "zod";
import { Gender } from "./types";

export const newEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.enum(Object.values(Gender)),
  occupation: z.string(),
});
