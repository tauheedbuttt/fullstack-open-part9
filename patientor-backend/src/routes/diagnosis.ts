import express, { Response } from "express";
import diagnosisService from "../services/diagnosisService";
import { Diagnosis } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<Diagnosis[]>) => {
  const diagnoses = diagnosisService.getDiagnosis();
  res.send(diagnoses);
});

router.get(
  "/:code",
  (req, res: Response<Diagnosis | undefined | { error: string }>) => {
    const { code } = req.params;
    const diagnosis = diagnosisService.findByCode(code);

    if (!diagnosis)
      return res.status(404).send({ error: "Diagnosis not found" });
    return res.send(diagnosis);
  }
);

export default router;
