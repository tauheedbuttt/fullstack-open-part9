import patientData from "../../data/patients";
import { Patient, PatientWithoutSsn } from "../types";

const patient: Patient[] = patientData;

const getPatients = (): Patient[] => {
  return patient;
};

const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
  return patient.map(({ ssn: _ssn, ...rest }) => rest);
};

export default {
  getPatients,
  getPatientsWithoutSsn,
};
