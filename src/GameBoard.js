import React, { useMemo, useEffect } from "react";
import Card from "./Card";
import { calculateMood, isEventCard, isPlayCard, changeBodyGameMood, } from "./library";
import GameOver from "./GameOver";
import { Answers } from "./GameKorona";
import GameValues from "./GameValues";
import GameButton from "./GameButton";
import ScreenButton from "./ScreenButton";
import { useTransition, animated, config } from 'react-spring';

export default function GameBoard({ G, ctx, moves, events, reset, onGameReset }) {
  const { values, card, lastAnswer, effect, week, stage } = G;
  const mood = useMemo(() => calculateMood(values), [values]);

  useEffect(changeBodyGameMood(mood), [mood]);

  const transitions = useTransition(`${stage}-${week}-${effect}-${card?.img}`, p => p, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-100%,0,0)' },
    config: config.stiff
  });

  const handleAnswer = (answer) => {
    if (ctx.phase === 'newbie') {
      moves.MakeNewbieAnswer(answer);
    } else {
      moves.MakeAnswer(answer);
    }
  };

  const handleNewGame = () => {
    onGameReset()
  };

  const gameButton = ({ answer, title, ...pass }) => (
    <GameButton
      key={`${ctx.turn}-${answer}`}
      {...{ answer, card, title, ...pass }}
      onAnswer={handleAnswer}
    />
  );


  return (
    <div className={`game-board game-board--${mood}${ctx.phase === 'newbie' ? ' game-board--story' : ''}`}>
      <div className="game-board__header">
        <GameValues turn={ctx.turn} values={values} />
      </div>

      {ctx.gameover && (
        <div className="game-board__gameover">
          <GameOver draw={!card && !ctx.gameover} {...ctx.gameover} />
        </div>
      )}

      {card && transitions.map(({ props, key }) => (
        <animated.div key={key} style={props} className="game-board__card">
          <Card {...{ card, effect, week }} answer={lastAnswer} />
        </animated.div>
      ))}

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
