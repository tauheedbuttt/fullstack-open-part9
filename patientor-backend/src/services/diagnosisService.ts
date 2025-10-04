import diagnosesData from "../../data/diagnoses";
import { Diagnosis } from "../types";

const diagnoses: Diagnosis[] = diagnosesData;

const getDiagnosis = (): Diagnosis[] => {
  return diagnoses;
};

const findByCode = (code: string): Diagnosis | undefined => {
  const entry = diagnoses.find((d) => d.code === code);
  return entry;
};

export default {
  getDiagnosis,
  findByCode,
};
