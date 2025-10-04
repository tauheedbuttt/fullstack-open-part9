import express, { NextFunction, Request, Response } from "express";
import { NewPatientEntry, PatientWithoutSsn } from "../types";
import patientService from "../services/patientService";
import { newEntrySchema } from "../utils";
import z from "zod";

const router = express.Router();

router.get("/", (_req, res: Response<PatientWithoutSsn[]>) => {
  const patients = patientService.getPatientsWithoutSsn();
  res.send(patients);
});

router.get(
  "/:id",
  (
    req: Request,
    res: Response<PatientWithoutSsn | undefined | { error: string }>
  ) => {
    const { id } = req.params;
    const patient = patientService.getPatientById(id);
    if (!patient) return res.status(404).send({ error: "Patient not found" });
    return res.send(patient);
  }
);

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatientEntry>, res: Response) => {
    try {
      const patient = req.body;
      const addedPatient = patientService.addPatient(patient);
      res.json(addedPatient);
    } catch (error: unknown) {
      let errorMessage = "Something went wrong.";
      if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
      }
      res.status(400).send(errorMessage);
    }
  }
);

router.use(errorMiddleware);

export default router;
