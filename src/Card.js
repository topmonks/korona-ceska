import React, { useMemo } from "react";
import { getAnswerCardField, isIncidentCard, isStoryCard } from "./library";
import Illustration from "./Illustration";

const css = (...classes) => classes.filter(Boolean).join(' ');

export default function Card({ card, answer, effect, week }) {
  const isIncident = useMemo(() => isIncidentCard(card), [card]);
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

  const turnNo = !isStory && !isIncident ? <span>{week}. týden</span> : null;

  return (
    <div className={css('card', isIncident && 'card--incident', isStory && 'card--story')}>
      <h3 className="card__name">{card.name} {turnNo}</h3>
      <p className={css('card__text', isStory && 'card__text--story')} dangerouslySetInnerHTML={{ __html: card.text }} />
      {!isIncident && card.img && (
        <div className="card__img">
          <Illustration key={card.text} img={card.img} />
        </div>
      )}
    </div>
  );
}
