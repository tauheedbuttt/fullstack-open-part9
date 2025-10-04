import patientData from "../../data/patients";
import { NewPatientEntry, Patient, PatientWithoutSsn } from "../types";
import { v1 as uuid } from "uuid";
const patient: Patient[] = patientData;

const getPatients = (): Patient[] => {
  return patient;
};

const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
  return patient.map(({ ssn: _ssn, ...rest }) => rest);
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
    ...entry,
  };

  patient.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatientsWithoutSsn,
  addPatient,
};
