import React, { useMemo } from "react";
import Card from "./Card";
import { getAnswerCardField, calculateMood } from "./library";

export default function Board({ G, ctx, moves, events }) {
  const { values, card, answer } = G;
  const mood = useMemo(() => calculateMood(values), [values]);

  const handleAnswer = (answer = false) => () => {
    moves.answer(answer);
  };

  const handleContinue = () => {
    moves.continue();
    events.endTurn();
  };

  const answerButton = (answer) => (
    <button class="button__answer" onClick={handleAnswer(answer)}>
      {getAnswerCardField(card, answer, "answer")}
    </button>
  );

  console.log('win?', ctx.gameover);

  return (
    <div className={`board board--${mood}`}>
      <p>{JSON.stringify(values)}</p>

      <div className="board__card">
        <Card {...{ card, answer }} />
      </div>
      {answer === null && (
        <div className="board__buttons">
          {answerButton(true)}
          {answerButton(false)}
        </div>
      )}
      {answer !== null && (
        <div className="board__buttons">
          <button class="button__default" onClick={handleContinue}>
            Pokračovat
          </button>
        </div>
      )}
    </div>
  );
}
