import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Diagnosis, Gender, Patient } from "../../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import groupBy from "lodash/groupBy";
import EntryDetails from "./EntryDetails";

interface PatientDetailsPageProps {
  diagnoses: Diagnosis[];
}

const PatientDetailsPage = ({ diagnoses }: PatientDetailsPageProps) => {
  const id = useParams().id;

  const [patient, setPatient] = useState<Patient | undefined>(undefined);

  useEffect(() => {
    if (!id) return;
    const fetchPatient = async () => {
      const patient = await patientService.getById(id);
      setPatient(patient);
    };
    void fetchPatient();
  }, [id]);

  const genderIcons = {
    [Gender.Male]: <MaleIcon />,
    [Gender.Female]: <FemaleIcon />,
    [Gender.Other]: <TransgenderIcon />,
  };
  const icon = patient ? genderIcons[patient.gender] : null;
  const groupedDiagnoses = groupBy(diagnoses, "code");

  return (
    <div>
      <h2>
        {patient?.name}
        {icon}
      </h2>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
      <h3>entries</h3>
      {patient?.entries.map((entry) => (
        <div
          key={entry.date + entry.description}
          style={{
            marginBottom: "1em",
            padding: 10,
            border: "1px solid black",
            borderRadius: 12,
          }}
        >
          <p>
            {entry.date} {entry.description}
          </p>
          <EntryDetails entry={entry} />
          <ul>
            {entry.diagnosisCodes?.map((code) => {
              const diagnosis = groupedDiagnoses[code]?.[0];
              return (
                <li key={code}>
                  {code} {diagnosis?.name}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientDetailsPage;
