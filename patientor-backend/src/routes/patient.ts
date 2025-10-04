import express, { Response } from "express";
import { PatientWithoutSsn } from "../types";
import patientService from "../services/patientService";
import { toNewPatientEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res: Response<PatientWithoutSsn[]>) => {
  const patients = patientService.getPatientsWithoutSsn();
  res.send(patients);
});

router.post("/", (req, res) => {
  try {
    const patient = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(patient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});
export default router;
