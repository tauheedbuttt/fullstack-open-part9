import { Entry } from "../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface EntryDetailsProps {
  entry: Entry;
}

const EntryDetails = ({ entry }: EntryDetailsProps) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <div>
          <p>
            <LocalHospitalIcon /> Hospital Entry
          </p>
          <p>
            Discharge: {entry.discharge.date} - {entry.discharge.criteria}
          </p>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          <p>
            <WorkIcon /> Occupational Healthcare Entry
          </p>
          <p>Employer: {entry.employerName}</p>
          {entry.sickLeave && (
            <p>
              Sick Leave: {entry.sickLeave.startDate} -{" "}
              {entry.sickLeave.endDate}
            </p>
          )}
        </div>
      );
    case "HealthCheck":
      return (
        <div>
          <p>
            <FavoriteIcon /> Health Check Entry
          </p>
          <p>Health Check Rating: {entry.healthCheckRating}</p>
        </div>
      );
    default:
      return assertNever(entry);
  }
};

// Helper function for exhaustive type checking
const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

export default EntryDetails;
