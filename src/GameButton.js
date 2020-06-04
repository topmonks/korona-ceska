import React from "react";
import { getAnswerCardField, makeClass as css } from "./library";
import { Answers } from "./GameKorona";
import "./styles/game-button.css";

export default function GameButton({
  answer, card, title, onAnswer,
  secondary = false, placeholder = false,
  onClick
}) {

  if (onClick && !answer) {
    return <button className="game-button" onClick={onClick}>{title}</button>;
  }

  if (placeholder) {
    return <button className="game-button game-button--placeholder" aria-hidden="true" />;
  }

  const handleAnswer = (event) => {
    event.preventDefault();
    onAnswer(answer);
  }
  return (
    <button
      className={css(
        'game-button',
        'game-button--answer',
        secondary && 'game-button--secondary',
      )}
      onClick={handleAnswer}
    >
      {answer === Answers.CONTINUE ? title : getAnswerCardField(card, answer, "answer") || title}
    </button>
  );
}
