import React, { useMemo, useEffect } from "react";
import Card from "./Card";
import { calculateMood, isIncidentCard, isPlayCard, changeBodyGameMood, preloadIllustrations, isPlayAnswer } from "./library";
import GameOver from "./GameOver";
import { Answers } from "./GameKorona";
import GameValues from "./GameValues";
import GameButton from "./GameButton";
import ScreenButton from "./ScreenButton";


export default function GameBoard({ G, ctx, moves, events, reset, stage }) {
  const { values, card, answer, effect } = G;
  const mood = useMemo(() => calculateMood(values), [values]);

  useEffect(changeBodyGameMood(mood), [mood])
  useEffect(preloadIllustrations, [])

  const handleAnswer = (answer) => {
    moves.MakeAnswer(answer);
  };

  const handleNewGame = () => {
    reset();
    setImmediate(events.endPhase)
  };

  const gameButton = ({ answer, title, ...pass }) => (
    <GameButton
      key={`${ctx.turn}-${answer}`}
      {...{ answer, card, title, ...pass }}
      onAnswer={handleAnswer}
    />
  );

  return (
    <div className={`game-board game-board--${mood}`}>
      <div className="game-board__header">
        <GameValues turn={ctx.turn} values={values} />
      </div>

      {(ctx.gameover || !card) && (
        <div className="game-board__gameover">
          <GameOver draw={!card && !ctx.gameover} {...ctx.gameover} />
        </div>
      )}

      {card && (
        <div className="game-board__card">
          <Card {...{ card, answer, effect }} week={ctx.turn - 1} />
        </div>
      )}

      {!ctx.gameover && (
        <div className="game-board__buttons">
          {isIncidentCard(card) && [
            gameButton({ answer: Answers.OK, title: 'OK' }),
            gameButton({ placeholder: true }),
          ]}
          {isPlayCard(card) && !isPlayAnswer(answer) && [
            gameButton({ answer: Answers.YES, title: 'Ano' }),
            gameButton({ answer: Answers.NO, title: 'Ne' }),
          ]}
          {effect && [
            gameButton({ answer: Answers.CONTINUE, title: 'Pokračovat' }),
            gameButton({ placeholder: true }),
          ]}
          {ctx.phase === 'newbie' && [
            gameButton({ answer: Answers.NEXT, title: 'Pokračovat' }),
            gameButton({ answer: Answers.SKIP, title: 'Přeskočit příběh', secondary: true }),
          ]}
        </div>
      )}

      {ctx.gameover && (
        <div className="game-board__buttons">
          {gameButton({ onClick: handleNewGame, title: 'Hrát znovu' })}
          <ScreenButton>Zpět na menu</ScreenButton>
        </div>
      )}
    </div>
  );
}
