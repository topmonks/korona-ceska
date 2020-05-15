import React from "react";
import { getAnswerCardField } from "./library";
import Illustration from "./Illustration";
import IncidentEvent from "./IncidentEvent";

export default function Card({ card, answer, incident }) {
  if (answer === null) {
    return (
      <div className="card">
        <h3 className="card__name">{card.name}</h3>
        <p className="card__text">{card.text}</p>
        <Illustration img={card.img} />
        {incident && <IncidentEvent {...incident} />}
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
