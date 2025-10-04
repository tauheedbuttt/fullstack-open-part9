import z from "zod";
import { Gender, HealthCheckRating } from "./types";

export const baseEntrySchema = {
  id: z.string(),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { id, ...baseNewEntrySchema } = baseEntrySchema;

export const healthCheckSchema = {
  type: z.literal("HealthCheck"),
  healthCheckRating: z.enum(HealthCheckRating),
};

export const hospitalSchema = {
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }),
};

export const occupationalHealthcareSchema = {
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string(),
      endDate: z.string(),
    })
    .optional(),
};

export const entrySchema = z.union([
  z.object({ ...baseNewEntrySchema, ...healthCheckSchema }),
  z.object({ ...baseNewEntrySchema, ...hospitalSchema }),
  z.object({ ...baseNewEntrySchema, ...occupationalHealthcareSchema }),
]);

export const newEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.enum(Object.values(Gender)),
  occupation: z.string(),
  entries: z
    .array(
      z.union([
        z.object({ ...baseEntrySchema, ...healthCheckSchema }),
        z.object({ ...baseEntrySchema, ...hospitalSchema }),
        z.object({ ...baseEntrySchema, ...occupationalHealthcareSchema }),
      ])
    )
    .optional(),
});
