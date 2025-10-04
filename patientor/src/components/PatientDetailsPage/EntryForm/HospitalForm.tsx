import { Input } from "@mui/material";
import { HospitalEntry } from "../../../types";

export interface HospitalFormProps {
  entry: HospitalEntry;
  setEntry: React.Dispatch<React.SetStateAction<HospitalEntry>>;
}

const HospitalForm = ({ entry, setEntry }: HospitalFormProps) => {
  return (
    <>
      <label>
        <span>Discharge Date</span>
        <br />
        <Input
          type="date"
          name="dischargeDate"
          value={entry.discharge?.date}
          onChange={(e) =>
            setEntry({
              ...entry,
              discharge: { ...entry.discharge, date: e.target.value },
            })
          }
        />
      </label>
      <label>
        <span>Discharge Criteria</span>
        <br />
        <Input
          type="text"
          name="dischargeCriteria"
          value={entry.discharge?.criteria}
          onChange={(e) =>
            setEntry({
              ...entry,
              discharge: { ...entry.discharge, criteria: e.target.value },
            })
          }
        />
      </label>
    </>
  );
};

export default HospitalForm;
