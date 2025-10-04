import patientData from "../../data/patients";
import { Entry, NewPatientEntry, Patient, PatientWithoutSsn } from "../types";
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

const addEntry = (entry: Entry, patientId: string): Entry => {
  const patient = getPatientById(patientId);
  if (!patient) {
    throw new Error("Patient not found");
  }

  patient.entries.push(entry);
  return entry;
};

export default {
  getPatients,
  getPatientsWithoutSsn,
  addPatient,
  getPatientById,
  addEntry,
};
