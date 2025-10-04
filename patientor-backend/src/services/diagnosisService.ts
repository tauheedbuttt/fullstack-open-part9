import diagnosesData from "../../data/diagnoses";
import { Diagnosis } from "../types";

const diagnoses: Diagnosis[] = diagnosesData;

const getDiagnosis = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getDiagnosis,
};
