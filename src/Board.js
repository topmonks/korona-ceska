import React, { useMemo } from "react";
import Card from "./Card";
import { getAnswerCardField, calculateMood } from "./library";

export default function Board({ G, ctx, moves, events, reset }) {
  const { values, card, answer } = G;
  const mood = useMemo(() => calculateMood(values), [values]);

  const { loose, win, draw } = ctx.gameover || {};

  const handleAnswer = (answer = false) => () => {
    moves.answer(answer);
  };

  const handleContinue = () => {
    events.endTurn()
  };

  const handleNewGame = () => {
    reset();
  }

  const answerButton = (answer) => (
    <button className="button__answer" onClick={handleAnswer(answer)}>
      {getAnswerCardField(card, answer, "answer")}
    </button>
  );


  return (
    <div className={`board board--${mood}`}>
      <p>{JSON.stringify(values)}</p>

      {ctx.gameover && (
        <div className="board__gameover">
          {win && <h1>Si vyhral</h1>}
          {loose && <h1>Si prohral na {loose}. hodnote</h1>}
          {draw && <h1>Ti dosli karty z {mood} balicku</h1>}
        </div>
      )}

      {card && (
        <div className="board__card">
          <Card {...{ card, answer }} />
        </div>
      )}
      {!ctx.gameover && (
        <div className="board__buttons">
          {answer === null && [
            answerButton(true),
            answerButton(false)
          ]}
          {answer !== null && (
            <button className="button__default" onClick={handleContinue}>
              Pokračovat
            </button>
          )}
        </div>
      )}
      {ctx.gameover && (
        <div className="board__buttons">
          <button className="button__default" onClick={handleNewGame}>
            Nový hra
          </button>
        </div>
      )}
    </div>
  );
}
