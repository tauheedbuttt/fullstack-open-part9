import express, { Response } from "express";
import diaryService from "../services/diagnosisService";
import { Diagnosis } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<Diagnosis[]>) => {
  const diagnoses = diaryService.getDiagnosis();
  res.send(diagnoses);
});

export default router;
