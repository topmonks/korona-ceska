import React from "react";
import { getAnswerCardField } from "./library";
import Illustration from "./Illustration";

export default function Card({ card, answer }) {
  if (answer === null) {
    return (
      <div className="card">
        <h3>{card.name}</h3>
        <p>{card.text}</p>
        <Illustration img={card.img} />
      </div>
    );
  }

  return (
    <div className="card">
      <p>{getAnswerCardField(card, answer, "effect")}</p>
    </div>
  );
}
