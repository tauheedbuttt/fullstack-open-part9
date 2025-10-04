import { isNotNumber } from "./utils";

export function calculateBmi(heightCm: number, weightKg: number): string {
  if (isNotNumber(heightCm) || isNotNumber(weightKg))
    throw new Error("Invalid input");

  if (heightCm <= 0 || weightKg <= 0)
    throw new Error("Height or weight cannot be zero or negative");

  const heightM = heightCm / 100;

  const bmi = weightKg / (heightM * heightM);

  if (bmi < 18.5) {
    return `underweight.`;
  } else if (bmi < 25) {
    return `Normal range.`;
  } else if (bmi < 30) {
    return `overweight.`;
  } else {
    return `obese.`;
  }
}

const main = () => {
  try {
    const num1 = Number(process.argv[2]);
    const num2 = Number(process.argv[3]);

    console.log(calculateBmi(num1, num2));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
};

if (require.main === module) main();
