import React, { useMemo } from "react";
import Card from "./Card";
import { getAnswerCardField, calculateMood } from "./library";
import { Link } from "react-navi";
import GameStory from "./GameStory";
import GameIncident from "./GameIncident";
import GameOver from "./GameOver";

export default function GameBoard({ G, ctx, moves, events, reset }) {
  const { values, card, answer, incident } = G;
  const mood = useMemo(() => calculateMood(values), [values]);

  const handleAnswer = (answer = false) => () => {
    moves.MakeAnswer(answer);
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
    <div className={`game-board game-board--${mood}`}>
      <div className="game-board__attributes">
        <p>
          <small>{ctx.turn}. kolo</small> = {JSON.stringify(values)}
        </p>
      </div>

      {ctx.phase === 'newbie' && (
        <GameStory
          onFinish={moves.FinishTutorial}
        />
      )}


      {ctx.phase === 'incident' && (
        <GameIncident
          {...incident}
          onConfirm={moves.MakeAcknowledge}
        />
      )}


      {ctx.gameover && (
        <div className="game-board__gameover">
          <GameOver {...ctx.gameover} />
        </div>
      )}

      {card && (
        <div className="game-board__card">
          <Card {...{ card, answer }} />
        </div>
      )}

      {!ctx.gameover && (
        <div className="game-board__buttons">
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
        <div className="game-board__buttons">
          <button className="button__default" onClick={handleNewGame}>Nová hra</button>
          <Link href="/">Zpet na menu</Link>
        </div>
      )}
    </div>
  );
}
