import React from "react";
import { OccupationalHealthcareEntry } from "../../../types";
import { Input } from "@mui/material";

export interface OccupationalHealthcareFormProps {
  entry: OccupationalHealthcareEntry;
  setEntry: React.Dispatch<React.SetStateAction<OccupationalHealthcareEntry>>;
}

const OccupationalHealthcareForm = ({
  entry,
  setEntry,
}: OccupationalHealthcareFormProps) => {
  return (
    <>
      <label>
        <span>Employer Name</span>
        <br />
        <Input
          type="text"
          name="employerName"
          value={entry.employerName}
          onChange={(e) => setEntry({ ...entry, employerName: e.target.value })}
        />
      </label>
      <label>
        <span>Sick Leave Start Date</span>
        <br />
        <Input
          type="date"
          name="sickLeaveStartDate"
          value={entry.sickLeave?.startDate}
          onChange={(e) =>
            setEntry({
              ...entry,
              sickLeave: {
                ...entry.sickLeave,
                startDate: e.target.value,
                endDate: entry.sickLeave?.endDate || "",
              },
            })
          }
        />
      </label>
      <label>
        <span>Sick Leave End Date</span>
        <br />
        <Input
          type="date"
          name="sickLeaveEndDate"
          value={entry.sickLeave?.endDate}
          onChange={(e) =>
            setEntry({
              ...entry,
              sickLeave: {
                ...entry.sickLeave,
                endDate: e.target.value,
                startDate: entry.sickLeave?.startDate || "",
              },
            })
          }
        />
      </label>
    </>
  );
};

export default OccupationalHealthcareForm;
