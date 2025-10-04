import { useState } from "react";
import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  NewEntry,
  OccupationalHealthcareEntry,
  ZodIssue,
} from "../../../types";
import patientService from "../../../services/patients";
import HealthCheckForm from "./HealthCheckForm";
import HospitalForm from "./HospitalForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";
import {
  Alert,
  Autocomplete,
  Input,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { AxiosError } from "axios";

interface EntryFormProps {
  id: string;
  addEntry: (entry: Entry) => void;
  codes: Array<string>;
}

const EntryForm = ({ id, addEntry, codes }: EntryFormProps) => {
  const [error, setError] = useState<string | undefined>();
  const [entry, setEntry] = useState<NewEntry>({
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [],
    type: "HealthCheck",
    healthCheckRating: 0,
  });

  const notify = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError(undefined);
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEntry({ ...entry, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const newEntry = await patientService.createEntry(id, entry);
      addEntry(newEntry);
      setEntry({
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: "HealthCheck",
        healthCheckRating: 0,
      });
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        const error = (e.response?.data?.error as ZodIssue[])
          ?.map((item) => item.message)
          .join(", ");
        notify(error);
      } else if (e instanceof Error) {
        notify(e.message);
      } else {
        notify("Unknown error");
      }
    }
  };

  const typeForms = {
    ["HealthCheck"]: (
      <HealthCheckForm
        entry={entry as HealthCheckEntry}
        setEntry={
          setEntry as React.Dispatch<React.SetStateAction<HealthCheckEntry>>
        }
      />
    ),
    ["Hospital"]: (
      <HospitalForm
        entry={entry as HospitalEntry}
        setEntry={
          setEntry as React.Dispatch<React.SetStateAction<HospitalEntry>>
        }
      />
    ),
    ["OccupationalHealthcare"]: (
      <OccupationalHealthcareForm
        entry={entry as OccupationalHealthcareEntry}
        setEntry={
          setEntry as React.Dispatch<
            React.SetStateAction<OccupationalHealthcareEntry>
          >
        }
      />
    ),
  };
  const form = typeForms[entry.type];

  return (
    <div
      style={{
        border: "1px dotted black",
        borderRadius: 12,
        padding: 10,
        marginBottom: 10,
      }}
    >
      <h2>EntryForm</h2>

      {error && <Alert severity="error">{error}</Alert>}
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: "fit-content",
        }}
        onSubmit={handleSubmit}
      >
        {/* switch type of entry input */}
        <label>
          <Select
            value={entry.type}
            name="type"
            onChange={(e) =>
              setEntry({ ...entry, type: e.target.value as never })
            }
          >
            <MenuItem value="HealthCheck">HealthCheck</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">
              OccupationalHealthcare
            </MenuItem>
          </Select>
        </label>
        {/* base fields */}
        <label>
          Description
          <br />
          <Input
            type="text"
            value={entry.description}
            name="description"
            onChange={handleChange}
          />
        </label>
        <label>
          Date
          <br />
          <Input
            type="date"
            value={entry.date}
            name="date"
            onChange={handleChange}
          />
        </label>
        <label>
          Specialist
          <br />
          <Input
            type="text"
            value={entry.specialist}
            name="specialist"
            onChange={handleChange}
          />
        </label>
        {/* use multiple select from mui for codes */}
        <Autocomplete
          multiple
          options={codes}
          getOptionLabel={(option) => option}
          onChange={(_event, value) => {
            setEntry({ ...entry, diagnosisCodes: value });
          }}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Diagnosis Codes" />
          )}
        />
        <br />
        {/* type wise different fields */}
        {form}
        <button type="submit">Add Entry</button>
      </form>
    </div>
  );
};

export default EntryForm;
