import { ChangeEvent, FormEvent, useState } from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const operatorFunctions: {
  [operator: string]: (a: number, b: number) => number;
} = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  x: (a, b) => a * b,
  '/': (a, b) => a / b,
};

export default function Card({
  firstNumber,
  secondNumber,
  operator,
  onAnswer,
  onNextQuestion,
}: {
  firstNumber: number;
  secondNumber: number;
  operator: '+' | '-' | 'x' | '/';
  onAnswer: (correct: boolean) => void;
  onNextQuestion: () => void;
}) {
  const answer = operatorFunctions[operator](firstNumber, secondNumber);
  const [submittedAnswer, setSubmittedAnswer] = useState<number | ''>('');
  const [correct, setCorrect] = useState<boolean | null>(null);

  const changeAnswer = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setSubmittedAnswer(value ? parseInt(value) : '');
  };

  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setCorrect(answer === submittedAnswer);
    onAnswer(answer === submittedAnswer);
  };

  const nextQuestion = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onNextQuestion();
  };

  if (correct === true || correct === false) {
    return (
      <div
        style={{
          width: '70vw',
          height: '50vh',
          border: '10px solid #000077',
          borderRadius: 10,
          backgroundColor: correct ? '#007700' : '#770000',
          textAlign: 'center',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          fontSize: '8rem',
        }}
      >
        <div style={{ fontSize: '8rem' }}>
          {firstNumber} {operator} {secondNumber}
        </div>{' '}
        <div style={{ fontSize: '6rem' }}>=</div>
        <form
          onSubmit={nextQuestion}
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            width: '100%',
          }}
        >
          <div>
            {!correct && (
              <span
                style={{ textDecoration: 'line-through', marginRight: '1rem' }}
              >
                {submittedAnswer}
              </span>
            )}
            {answer}
          </div>
          <button
            type="submit"
            autoFocus
            style={{
              fontSize: '7rem',
              backgroundColor: 'inherit',
              border: 'none',
              color: '#ffffff',
            }}
          >
            <ArrowForwardIosIcon style={{ fontSize: '4rem' }} />
          </button>
        </form>
      </div>
    );
  }

  return (
    <div
      style={{
        width: '70vw',
        height: '50vh',
        border: '10px solid #000077',
        borderRadius: 10,
        textAlign: 'center',
        color: '#000077',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
      }}
    >
      <div style={{ fontSize: '8rem' }}>
        {firstNumber} {operator} {secondNumber}
      </div>{' '}
      <div style={{ fontSize: '6rem' }}>=</div>
      <form
        onSubmit={onSubmit}
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          width: '100%',
        }}
      >
        <input
          type="number"
          placeholder="?"
          value={submittedAnswer}
          onChange={changeAnswer}
          autoFocus
          style={{
            fontSize: '8rem',
            width: '60%',
            textAlign: 'center',
            color: '#000077',
            border: '5px solid #000077',
            borderRadius: 10,
          }}
        />
        <button
          type="submit"
          style={{
            color: '#ffffff',
            backgroundColor: '#000077',
            borderColor: '#000077',
            border: '5px solid #000077',
            borderRadius: 10,
            height: '100%',
          }}
          disabled={submittedAnswer === ''}
        >
          <ArrowForwardIosIcon style={{ fontSize: '6rem' }} />
        </button>
      </form>
    </div>
  );
}
