import React, { useMemo, useEffect, } from "react";
import Card from "./Card";
import { makeClass, calculateMood, isEventCard, isPlayCard, changeBodyGameMood, makeShareHandler, makeShareLink, } from "./library";
import GameOver from "./GameOver";
import { Answers } from "./GameKorona";
import GameValues from "./GameValues";
import GameButton from "./GameButton";
import ScreenButton from "./ScreenButton";
import MenuButton from "./MenuButton";
import FadeIn from "react-fade-in";

export default function GameBoard({ G, ctx, moves, events, reset, log }) {
  const { values, card, lastAnswer, effect, week, stage, seed } = G;
  const mood = useMemo(() => calculateMood(values), [values]);

  useEffect(changeBodyGameMood(mood), [mood]);


  const shareHandler = useMemo(makeShareHandler, [])
  const shareLink = useMemo(() => ctx.gameover && (
    makeShareLink({ week, outcome: ctx.gameover, seed, log })
  ), [ctx.gameover]) // eslint-disable-line

  const handleShareClick = event => {
    if (shareHandler) {
      event.preventDefault();
      const outcome = ctx.gameover;
      shareHandler({ week, outcome, seed, log });
    }
  };


  const handleAnswer = (answer) => {
    if (ctx.phase === 'newbie') {
      moves.MakeNewbieAnswer(answer);
    } else {
      moves.MakeAnswer(answer);
    }
  };
  console.log({ card })
  const gameButton = ({ answer, title, ...pass }) => (
    <GameButton
      key={`${ctx.turn}-${answer}`}
      {...{ answer, card, title, ...pass }}
      onAnswer={handleAnswer}
    />
  );

  const shouldBeBoardHeaderVisible = ctx.phase !== 'newbie';

  return (
    <div className={makeClass(
      'game-board',
      `game-board--${mood}`,
      ctx.phase === 'newbie' && 'game-board--story',
      ctx.gameover && 'game-board--outcome'
    )}>

      {shouldBeBoardHeaderVisible && (
        <FadeIn className="game-board__header">
          <GameValues values={values} />
          <MenuButton />
        </FadeIn>
      )}
      {/* mock container for grid layout */}
      {!shouldBeBoardHeaderVisible && <div className="game-board__header" />}

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
          <ScreenButton href={shareLink} onClick={handleShareClick}>
            Sdílet výsledek
          </ScreenButton>
        </div>
      )}
    </div>
  );
}
