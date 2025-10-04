import { HealthCheckEntry, HealthCheckRating } from "../../../types";

export interface HealthCheckFormProps {
  entry: HealthCheckEntry;
  setEntry: React.Dispatch<React.SetStateAction<HealthCheckEntry>>;
}

const HealthCheckForm = ({ entry, setEntry }: HealthCheckFormProps) => {
  return (
    <>
      {/* rating from the available enums of healthCheckRating in radio buttons */}
      {Object.values(HealthCheckRating)
        .filter((v) => typeof v === "number")
        .map((value) => (
          <label key={value} style={{ marginRight: "1em" }}>
            <input
              type="radio"
              name="healthCheckRating"
              value={value}
              checked={entry.healthCheckRating === value}
              onChange={() =>
                setEntry({
                  ...entry,
                  healthCheckRating: value as HealthCheckRating,
                })
              }
            />
            {HealthCheckRating[value as HealthCheckRating]}
          </label>
        ))}
    </>
  );
};

export default HealthCheckForm;
