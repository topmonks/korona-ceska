import React from "react";
import { getAnswerCardField } from "./library";
import Illustration from "./Illustration";

export default function Card({ card, answer }) {
  if (answer === null) {
    return (
      <div className="card">
        <h3 className="card__name">{card.name}</h3>
        <p className="card__text">{card.text}</p>
        <div className="card__img">
          <Illustration img={card.img} />
        </div>
      </div>
    );
  }

  if (!card) {
    return null;
  }

  return (
    <div className="card">
      <p className="card__event-answer">
        "{getAnswerCardField(card, answer, "effect")}"
      </p>
    </div>
  );
}
