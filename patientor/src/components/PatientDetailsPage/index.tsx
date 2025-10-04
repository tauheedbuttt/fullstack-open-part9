import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Gender, Patient } from "../../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

const PatientDetailsPage = () => {
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
          style={{ marginBottom: "1em" }}
        >
          <p>
            {entry.date} {entry.description}
          </p>
          <p>diagnosed by {entry.specialist}</p>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>{code}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientDetailsPage;
