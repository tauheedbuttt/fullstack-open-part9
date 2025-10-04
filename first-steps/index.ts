import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculator, Operation } from "./calculator";
import { calculateExercise } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    const { height, weight } = req.query;
    const bmi = calculateBmi(Number(height), Number(weight));
    return res.send(`Your BMI is ${bmi}`);
  } catch (err: unknown) {
    if (err instanceof Error)
      return res.status(400).send({ error: `${err.message}` });
    return res.status(400).send({ error: "malformed parameters" });
  }
});

app.post("/calculate", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  const result = calculator(Number(value1), Number(value2), op as Operation);
  res.send({ result });
});

interface ExerciseRequest {
  daily_exercises: Array<number>;
  target: number;
}

app.post("/exercises", (req, res) => {
  try {
    const { daily_exercises, target } = req.body as ExerciseRequest;
    const result = calculateExercise(daily_exercises, target);

    return res.json(result);
  } catch (err: unknown) {
    if (err instanceof Error)
      return res.status(400).send({ error: `${err.message}` });
    return res.status(400).send({ error: "malformed parameters" });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
