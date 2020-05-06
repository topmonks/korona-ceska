import React from "react";
import { getAnswerCardField } from "./library";
import Illustration from "./Illustration";

export default function Card({ card, answer }) {
  if (answer === null) {
    return (
      <div className="card">
        <h3>{card.name}</h3>
        <Illustration img={card.img} />
        <p>{card.text}</p>
      </div>
    );
  }

  return (
    <div className="card">
      <p>{getAnswerCardField(card, answer, "effect")}</p>
    </div>
  );
}
