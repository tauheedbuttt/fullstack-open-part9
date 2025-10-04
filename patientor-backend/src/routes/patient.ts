import express, { Response } from "express";
import { PatientWithoutSsn } from "../types";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res: Response<PatientWithoutSsn[]>) => {
  const patients = patientService.getPatientsWithoutSsn();
  res.send(patients);
});

export default router;
