import React, { useMemo } from "react";
import { getAnswerCardField, isIncidentCard } from "./library";
import Illustration from "./Illustration";

export default function Card({ card, answer }) {
  const isIncident = useMemo(() => isIncidentCard(card), [card]);

  if (answer === null) {
    return (
      <div className={`card ${isIncident ? 'card--incident' : ''}`}>
        <h3 className="card__name">{card.name}</h3>
        <p className="card__text">{card.text}</p>
        {!isIncident && (
          <div className="card__img">
            <Illustration key={card.text} img={card.img} />
          </div>
        )}
      </div>
    );
  }

  if (!card) {
    return null;
  }

  return (
    <div className="card card--effect">
      <p className="card__text card__text--effect">
        "{getAnswerCardField(card, answer, "effect")}"
      </p>
    </div>
  );
}
