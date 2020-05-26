import React, { useLayoutEffect, useRef, useState, useMemo } from "react";
import css from "classnames";
import Illustration from "./Illustration";
import { hasOverflow } from "./library";

const GAME_OUTCOMES = require('./outcomes.json');

const getOutcomeDetail = (outcome) => {
  const { loose, win, draw } = GAME_OUTCOMES;
  if (outcome.loose) return loose[outcome.loose];
  if (outcome.win) return win;
  if (outcome.draw) return draw;
  return null;
}

export default function GameOver({ win, loose, draw, week }) {
  const gameOverEl = useRef(null);
  const [isOverFlow, setIsOverflow] = useState(false);
  const outcome = useMemo(() => getOutcomeDetail({ win, loose, draw }), [win, loose, draw]);

  useLayoutEffect(() => {
    setIsOverflow(hasOverflow(gameOverEl.current));
  }, [gameOverEl]);

  if (!outcome) return null; // Should not happen

  return (
    <div
      ref={gameOverEl}
      className={css("game-over", { "game-over--overflow": isOverFlow })}
    >
      <div>
        <div className="card__img">
          <Illustration img={outcome.illustration.img} alt={outcome.illustration.alt} />
        </div>
        <h1>{outcome.title}</h1>
        <span className="game-over__week">Po {week} týdnech</span>
        <p dangerouslySetInnerHTML={{ __html: outcome.text }} />
      </div>
    </div>
  );
}
