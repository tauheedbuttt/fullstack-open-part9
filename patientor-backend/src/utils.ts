import z from "zod";
import { Gender, HealthCheckRating } from "./types";

export const baseEntrySchema = {
  id: z.string(),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
};

export const healthCheckSchema = z
  .object({
    ...baseEntrySchema,
    type: z.literal("HealthCheck"),
    healthCheckRating: z.enum(HealthCheckRating),
  })
  .extend(baseEntrySchema);

export const hospitalSchema = z.object({
  ...baseEntrySchema,
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }),
});

export const occupationalHealthcareSchema = z.object({
  ...baseEntrySchema,
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string(),
      endDate: z.string(),
    })
    .optional(),
});

export const entrySchema = z.union([
  healthCheckSchema,
  hospitalSchema,
  occupationalHealthcareSchema,
]);

export const newEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.enum(Object.values(Gender)),
  occupation: z.string(),
  entries: z.array(entrySchema).optional(),
});
