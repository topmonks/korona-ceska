import React, { useMemo, useEffect } from "react";
import Card from "./Card";
import { calculateMood, isEventCard, isPlayCard, changeBodyGameMood, } from "./library";
import GameOver from "./GameOver";
import { Answers } from "./GameKorona";
import GameValues from "./GameValues";
import GameButton from "./GameButton";
import ScreenButton from "./ScreenButton";

export default function GameBoard({ G, ctx, moves, events, reset, stage }) {
  const { values, card, lastAnswer, effect, week } = G;
  const mood = useMemo(() => calculateMood(values), [values]);

  useEffect(changeBodyGameMood(mood), [mood]);

  const handleAnswer = (answer) => {
    if (ctx.phase === 'newbie') {
      moves.MakeNewbieAnswer(answer);
    } else {
      moves.MakeAnswer(answer);
    }
  };

  const handleNewGame = () => {
    reset();
  };

  const gameButton = ({ answer, title, ...pass }) => (
    <GameButton
      key={`${ctx.turn}-${answer}`}
      {...{ answer, card, title, ...pass }}
      onAnswer={handleAnswer}
    />
  );

  // log(ctx.phase, ctx.turn)
  console.log(
    ctx.phase + "\n",
    stage,
    card
  )

  return (
    <div className={`game-board game-board--${mood}`}>
      <div className="game-board__header">
        <GameValues turn={ctx.turn} values={values} />
      </div>

      {ctx.gameover && (
        <div className="game-board__gameover">
          <GameOver draw={!card && !ctx.gameover} {...ctx.gameover} />
        </div>
      )}

      {card && (
        <div className="game-board__card">
          <Card {...{ card, effect, week }} answer={lastAnswer} />
        </div>
      )}

      {!ctx.gameover && (
        <div className="game-board__buttons">
          {isEventCard(card) && [
            gameButton({ answer: Answers.OK, title: 'OK' }),
            gameButton({ placeholder: true }),
          ]}
          {isPlayCard(card) && !effect && [
            gameButton({ answer: Answers.YES, title: 'Ano' }),
            gameButton({ answer: Answers.NO, title: 'Ne' }),
          ]}
          {stage === 'play' && effect && [
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
