import { useState } from 'react';
import Card from './components/Card';

interface IEquation {
  firstNumber: number;
  secondNumber: number;
  operator: '+' | '-' | 'x' | '/';
}

const operators = ['+', '-', 'x'];

const generateRandomEquation = (): IEquation => {
  const operator = operators[
    Math.floor(Math.random() * operators.length)
  ] as any;
  const bigNumber = operator === '+' || operator === '-';
  const number1 = Math.floor(Math.random() * (bigNumber ? 100 : 10));
  const number2 = Math.floor(Math.random() * (bigNumber ? 100 : 10));
  return {
    firstNumber: number1 > number2 ? number1 : number2,
    secondNumber: number1 > number2 ? number2 : number1,
    operator: operator,
  };
};

function App() {
  const [equation, setEquation] = useState<IEquation>(generateRandomEquation());
  const [total, setTotal] = useState<number>(1);
  const [totalRight, setTotalRight] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);

  const onAnswer = (correct: boolean) => {
    setTotalRight(correct ? totalRight + 1 : totalRight);
    setStreak(correct ? streak + 1 : 0);
  };

  const onNextQuestion = () => {
    setTotal(total + 1);
    setEquation(generateRandomEquation());
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '1rem',
      }}
    >
      <Card
        key={total}
        firstNumber={equation.firstNumber}
        secondNumber={equation.secondNumber}
        operator={equation.operator}
        onAnswer={onAnswer}
        onNextQuestion={onNextQuestion}
      />
      <div style={{ fontSize: '2rem', color: '#000077' }}>Streak: {streak}</div>
      <div style={{ fontSize: '2rem', color: '#000077' }}>
        Total: {totalRight} out of {total}
      </div>
    </div>
  );
}

export default App;
