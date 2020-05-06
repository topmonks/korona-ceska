import React from 'react';
import Card from './Card';
import { getAnswerCardField } from './library';



export default function Board({ G, ctx, moves, events }) {
  const { values, card, answer } = G
  console.warn('Not yet implemented.', { ctx, moves, card })

  const handleAnswer = (answer = false) => () => {
    moves.answer(answer);
  }

  const handleContinue = () => {
    moves.continue();
    events.endTurn();
  }

  const answerButton = answer => (
    <button onClick={handleAnswer(answer)}>
      {getAnswerCardField(card, answer, 'answer')}
    </button>
  );

  return (
    <div className="board">
      <p>{JSON.stringify(values)}</p>

      <div className="board__card">
        <Card {...{ card, answer }} />
      </div>
      {!answer && (
        <div className="board__buttons">
          {answerButton(true)}
          {answerButton(false)}
        </div>
      )}
      {answer && (
        <div className="board__buttons">
          <button onClick={handleContinue}>Pokračovat</button>
        </div>
      )}
    </div>
  )
}