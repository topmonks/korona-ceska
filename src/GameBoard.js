import React, { useMemo, useEffect } from "react";
import Card from "./Card";
import { getAnswerCardField, calculateMood, isIncidentCard, hasYesNoAnswer } from "./library";
import { Link } from "react-navi";
import GameOver from "./GameOver";
import { Answers } from "./GameKorona";


export default function GameBoard({ G, ctx, moves, events, reset, stage }) {
  const { values, card, answer, effect } = G;
  const mood = useMemo(() => calculateMood(values), [values]);

  useEffect(() => {
    document.body.classList.remove('game-mood-positive');
    document.body.classList.remove('game-mood-neutral');
    document.body.classList.remove('game-mood-negative');

    document.body.classList.add(`game-mood-${mood}`);
  }, [mood])

  const handleAnswer = (answer) => (event) => {
    event.preventDefault();
    moves.MakeAnswer(answer);
  };

  const handleNewGame = () => {
    reset();
  };

  const answerButton = (answer, title) => (
    <button className="button__answer" onClick={handleAnswer(answer)}>
      {getAnswerCardField(card, answer, "answer") || title}
    </button>
  );


  return (
    <div className={`game-board game-board--${mood}`}>
      <div className="game-board__header">
        <p>
          <small>{ctx.turn}. kolo</small> = {JSON.stringify(values)}
        </p>
      </div>

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
      <div className="game-board__buttons">
        {isIncidentCard(card) && answerButton(Answers.OK, "OK")}
        {answer === null && hasYesNoAnswer(card) && (
          <>
            {answerButton(Answers.YES, "Ano")}
            {answerButton(Answers.NO, "Ne")}
          </>
        )}
        {effect && answerButton(Answers.CONTINUE, 'Pokračovat')}
      </div>



      {ctx.gameover && (
        <div className="game-board__buttons">
          <button className="button__default" onClick={handleNewGame}>Nová hra</button>
          <Link href="/">Zpet na menu</Link>
        </div>
      )}
    </div>
  );
}
