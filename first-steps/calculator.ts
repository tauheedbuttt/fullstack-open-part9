export type Operation = "multiply" | "add" | "divide";

export const calculator = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case "multiply":
      return a * b;
    case "divide":
      if (b === 0) throw new Error("Can't divide by 0!");
      return a / b;
    case "add":
      return a + b;
    default:
      throw new Error("Operation is not multiply, add or divide!");
  }
};

const main = () => {
  try {
    const a = Number(process.argv[2]);
    const b = Number(process.argv[3]);
    const op = process.argv[4] as Operation;
    if (isNaN(a) || isNaN(b))
      throw new Error("Provided values were not numbers!");
    console.log(calculator(a, b, op));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
};
if (require.main === module) main();
