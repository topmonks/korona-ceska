import React, { useMemo, useEffect, } from "react";
import Card from "./Card";
import { calculateMood, isEventCard, isPlayCard, changeBodyGameMood, makeShareHadler, } from "./library";
import GameOver from "./GameOver";
import { Answers } from "./GameKorona";
import GameValues from "./GameValues";
import GameButton from "./GameButton";
import ScreenButton from "./ScreenButton";

export default function GameBoard({ G, ctx, moves, events, reset }) {
  const { values, card, lastAnswer, effect, week, stage } = G;
  const mood = useMemo(() => calculateMood(values), [values]);
  const share = useMemo(makeShareHadler, [])

  useEffect(changeBodyGameMood(mood), [mood]);

  const handleAnswer = (answer) => {
    if (ctx.phase === 'newbie') {
      moves.MakeNewbieAnswer(answer);
    } else {
      moves.MakeAnswer(answer);
    }
  };

  const gameButton = ({ answer, title, ...pass }) => (
    <GameButton
      key={`${ctx.turn}-${answer}`}
      {...{ answer, card, title, ...pass }}
      onAnswer={handleAnswer}
    />
  );

  const handleShareClick = event => {
    event.preventDefault();
    share(ctx.gameover);
  };

  return (
    <div className={`game-board game-board--${mood}${ctx.phase === 'newbie' ? ' game-board--story' : ''}`}>
      <div className="game-board__header">
        {ctx.phase !== 'newbie' && <GameValues values={values} />}
      </div>

      {ctx.gameover && (
        <div className="game-board__gameover">
          <GameOver draw={!card && !ctx.gameover} {...ctx.gameover} />
        </div>
      )}

      {card && (
        <Card {...{ card, effect, week }} answer={lastAnswer} />
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
          <ScreenButton>Hlavní Menu</ScreenButton>
          {share ? <ScreenButton onClick={handleShareClick}>Sdílet výsledek</ScreenButton> : gameButton({ placeholder: true })}
        </div>
      )}
    </div>
  );
}
