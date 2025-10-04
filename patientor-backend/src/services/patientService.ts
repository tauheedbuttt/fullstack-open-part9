import patientData from "../../data/patients";
import {
  Entry,
  NewEntry,
  NewPatientEntry,
  Patient,
  PatientWithoutSsn,
} from "../types";
import { v1 as uuid } from "uuid";
const patient: Patient[] = patientData;

const getPatients = (): Patient[] => {
  return patient;
};

const getPatientById = (id: string): Patient | undefined => {
  return patient.find((p) => p.id === id);
};

const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
  return patient.map(({ ssn: _ssn, entries: _entries, ...rest }) => rest);
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
    entries: entry.entries || [],
    ...entry,
  };

  patient.push(newPatient);
  return newPatient;
};

const addEntry = (entry: NewEntry, patientId: string): Entry => {
  const patient = getPatientById(patientId);
  if (!patient) {
    throw new Error("Patient not found");
  }

  const newEntry: Entry = {
    id: uuid(),
    ...entry,
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPatientsWithoutSsn,
  addPatient,
  getPatientById,
  addEntry,
};
