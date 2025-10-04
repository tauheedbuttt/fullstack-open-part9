import z from "zod";
import { newEntrySchema } from "./utils";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type NewPatientEntry = z.infer<typeof newEntrySchema>;
export interface Patient extends NewPatientEntry {
  id: string;
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type PatientWithoutSsn = Omit<Patient, "ssn">;
