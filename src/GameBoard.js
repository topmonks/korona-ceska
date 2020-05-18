import React, { useMemo, useEffect } from "react";
import Card from "./Card";
import { getAnswerCardField, calculateMood, isIncidentCard, hasYesNoAnswer, changeBodyGameMood, preloadIllustrations } from "./library";
import { Link } from "react-navi";
import GameOver from "./GameOver";
import { Answers } from "./GameKorona";
import GameValues from "./GameValues";




export default function GameBoard({ G, ctx, moves, events, reset, stage }) {
  const { values, card, answer, effect } = G;
  const mood = useMemo(() => calculateMood(values), [values]);

  useEffect(changeBodyGameMood(mood), [mood])
  useEffect(preloadIllustrations, [])

  const handleAnswer = (answer) => (event) => {
    event.preventDefault();
    moves.MakeAnswer(answer);
  };

  const handleNewGame = () => {
    localStorage.setItem('newbie', true);
    reset();
    window.location.reload(); //  hardcore shorcut, fixme
  };

  const answerButton = (answer, title, secondary = false) => (
    <button
      key={`${ctx.turn}-${answer}`}
      className={`button__answer ${secondary ? 'button__answer--secondary' : ''}`}
      onClick={handleAnswer(answer)}
    >
      {answer === Answers.CONTINUE ? title : getAnswerCardField(card, answer, "answer") || title}
    </button>
  );


  return (
    <div className={`game-board game-board--${mood}`}>
      <div className="game-board__header">
        <GameValues turn={ctx.turn} values={values} />
      </div>

      {ctx.gameover && (
        <div className="game-board__gameover">
          <GameOver {...ctx.gameover} />
        </div>
      )}

      {card && (
        <div className="game-board__card">
          <Card {...{ card, answer, effect }} week={ctx.turn - 1} />
        </div>
      )}

      {!ctx.gameover && (
        <div className="game-board__buttons">
          {isIncidentCard(card) && answerButton(Answers.OK, "OK")}
          {answer === null && hasYesNoAnswer(card) && (
            <>
              {answerButton(Answers.YES, "Ano")}
              {answerButton(Answers.NO, "Ne")}
            </>
          )}
          {effect && answerButton(Answers.CONTINUE, 'Pokračovat')}
          {ctx.phase === 'newbie' && (
            <>
              {answerButton(Answers.NEXT, "Pokračovat")}
              {answerButton(Answers.SKIP, "Přeskočit příběh", true)}
            </>
          )}
        </div>
      )}

      {ctx.gameover && (
        <div className="game-board__buttons">
          <button className="button__default" onClick={handleNewGame}>Nová hra</button>
          <Link href="/">Zpět na menu</Link>
        </div>
      )}
    </div>
  );
}
