interface TotalProps {
  exerciseCount: number;
}

const Total = ({ exerciseCount }: TotalProps) => {
  return <p>Number of exercises {exerciseCount}</p>;
};

export default Total;
