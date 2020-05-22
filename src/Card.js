import React, { useMemo } from "react";
import {
  getAnswerCardField,
  isEventCard,
  isStoryCard,
  makeClass as css,
} from "./library";
import Illustration from "./Illustration";

export default function Card({ card, answer, effect, week }) {
  const isIncident = useMemo(() => isEventCard(card), [card]);
  const isStory = useMemo(() => isStoryCard(card), [card]);

  if (effect) {
    return (
      <div className="card card--effect">
        <p className="card__text card__text--effect">
          "{getAnswerCardField(card, answer, "effect")}"
        </p>
      </div>
    );
  }

  if (!card) {
    return null;
  }

  const turnNo = !isStory ? <span>{week}. týden</span> : null;

  return (
    <div
      className={css(
        "card",
        isIncident && "card--incident",
        isStory && "card--story"
      )}
    >
      {!isIncident && card.img && (
        <div
          className={css("card__img", isStory && "card__img--story")}
        >
          <Illustration img={card.img} />
        </div>
      )}
      <h3 className="card__name">
        {card.name} {turnNo}
      </h3>
      <p
        className={css("card__text", isStory && "card__text--story")}
        dangerouslySetInnerHTML={{ __html: card.text }}
      />
    </div>
  );
}
