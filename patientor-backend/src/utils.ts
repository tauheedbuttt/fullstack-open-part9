import z from "zod";
import { Gender, HealthCheckRating } from "./types";

export const baseEntrySchema = {
  id: z.string(),
  description: z.string().nonempty("Description is required"),
  date: z.string().nonempty("Date is required"),
  specialist: z.string().nonempty("Specialist is required"),
  diagnosisCodes: z.array(z.string()).optional(),
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { id, ...baseNewEntrySchema } = baseEntrySchema;

export const healthCheckSchema = {
  type: z.literal("HealthCheck"),
  healthCheckRating: z.enum(HealthCheckRating).nonoptional(),
};

export const hospitalSchema = {
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string().nonempty("Discharge date is required"),
    criteria: z.string().nonempty("Discharge criteria is required"),
  }),
};

export const occupationalHealthcareSchema = {
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string().nonempty("Sick leave start date is required"),
      endDate: z.string().nonempty("Sick leave end date is required"),
    })
    .optional(),
};

export const entrySchema = z.union([
  z.object({ ...baseNewEntrySchema, ...healthCheckSchema }),
  z.object({ ...baseNewEntrySchema, ...hospitalSchema }),
  z.object({ ...baseNewEntrySchema, ...occupationalHealthcareSchema }),
]);

export const newEntrySchema = z.object({
  name: z.string().nonempty("Name is required"),
  dateOfBirth: z.string().nonempty("Date of birth is required"),
  ssn: z.string().nonempty("SSN is required"),
  gender: z.enum(Object.values(Gender)),
  occupation: z.string().nonempty("Occupation is required"),
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
