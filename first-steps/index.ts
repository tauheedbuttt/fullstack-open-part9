import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  try {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.send(`Your BMI is ${bmi}`);
  } catch (err) {
    res.status(400).send({ error: err.message || "malformatted parameters" });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
