import { isNotNumber } from "./utils";

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercise = (
  dailyExerciseHours: number[],
  targetAmount: number
): ExerciseResult => {
  if (isNotNumber(targetAmount) || targetAmount <= 0)
    throw new Error("Invalid target amount");
  if (dailyExerciseHours.some((h) => isNotNumber(h) || h < 0))
    throw new Error("Invalid daily exercise hours");

  const total = dailyExerciseHours.reduce((sum, h) => sum + h, 0);
  const average = total / dailyExerciseHours.length;
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((h) => h > 0).length;

  const ratingMapping = {
    1: "bad",
    2: "not too bad but could be better",
    3: "good",
  };
  const rating =
    average >= targetAmount ? 3 : average >= targetAmount / 2 ? 2 : 1;

  return {
    periodLength,
    trainingDays,
    success: average >= targetAmount,
    rating,
    ratingDescription: ratingMapping[rating],
    target: targetAmount,
    average,
  };
};

const main = () => {
  try {
    const target = Number(process.argv[2]);
    const dailyExerciseHours = process.argv.slice(3).map((h) => Number(h));

    console.log(calculateExercise(dailyExerciseHours, target));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
};

if (require.main === module) main();
