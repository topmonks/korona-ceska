import React, { useMemo } from "react";
import Card from "./Card";
import { getAnswerCardField, calculateMood } from "./library";
import { Link } from "react-navi";

export default function GameBoard({ G, ctx, moves, events, reset }) {
  const { values, card, answer, incident } = G;
  const mood = useMemo(() => calculateMood(values), [values]);

  const { loose, win, draw } = ctx.gameover || {};

  const handleAnswer = (answer = false) => () => {
    moves.answer(answer);
  };

  const handleContinue = () => {
    events.endTurn();
  };

  const handleNewGame = () => {
    reset();
  };

  const answerButton = (answer) => (
    <button className="button__answer" onClick={handleAnswer(answer)}>
      {getAnswerCardField(card, answer, "answer")}
    </button>
  );

  return (
    <div className={`board board--${mood}`}>
      <div className="gameContainer">
        <div className="board__attributes">
          <p>
            <small>{ctx.turn}. kolo</small> = {JSON.stringify(values)}
          </p>
        </div>

        {ctx.gameover && (
          <div className="board__gameover">
            {win && <h1>Si vyhral</h1>}
            {loose && <h1>Si prohral na {loose}. hodnote</h1>}
            {draw && <h1>Ti dosly karty z {mood} balicku</h1>}
          </div>
        )}

        {card && (
          <div
            className={`board__card ${incident ? "board__card--incident" : ""}`}
          >
            <Card {...{ card, answer, incident }} />
          </div>
        )}

        {!ctx.gameover && (
          <div className="board__buttons">
            {answer === null && (
              <>
                {answerButton(true)}
                {answerButton(false)}
              </>
            )}
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
            <Link href="/">Zpet na menu</Link>
          </div>
        )}
      </div>
    </div>
  );
}
