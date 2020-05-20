import { Answers } from "./GameKorona";

export function calculateMood([epidemie]) {
  if (epidemie >= 75) {
    return "negative";
  } else if (epidemie >= 25) {
    return "neutral";
  } else {
    return "positive";
  }
}

export function getIncidentCard(cards = [], turn = 0) {
  if (typeof turn === "string") turn = parseInt(turn, 10);
  const card = cards.find(
    (event) => event.turn === turn || (event.last && turn >= event.turn)
  );
  return card;
}

export function isPlayAnswer(answer) {
  return answer === Answers.YES || answer === Answers.NO;
}

export function isPlayCard(card) {
  if (!card) return false;
  if (!card.name || !card.img || !card.text) return false;
  return card.yesvalues && card.novalues;
}

export function isIncidentCard(card) {
  if (!card) return false;
  return card.values && !isPlayCard(card);
}
export function isStoryCard(card) {
  if (!card) return false;
  return card.text && card.name && !isPlayCard(card) && !isIncidentCard(card);
}

export function calculateValues(values, card, answer) {
  const applicate = (value, index) => values[index] + value;
  const calculate = (updates) => updates.split(",").map(Number).map(applicate);

  let results = [];

  if (answer === Answers.YES) {
    results = calculate(card.yesvalues);
  } else if (answer === Answers.NO) {
    results = calculate(card.novalues);
  } else if (card.values) {
    return (results = calculate(card.values));
  } else {
    throw new Error("Nečekaná odpověď.");
  }
  return results.map((value) => {
    if (value > 100) return 100;
    if (value < 0) return 0;
    return value;
  });
}

export function calculateCardsCounts({
  neutral = [],
  positive = [],
  negative = [],
} = {}) {
  // C
  const sum = (total, deck) => total + deck.length;
  return [neutral, positive, negative].reduce(sum, 0);

  // B
  // return neutral.length + positive.length + negative.length;

  // A
  // return [...neutral, ...positive, ...negative].length;
}

export function getAnswerCardField(card, answer, field) {
  const value = (card || {})[(answer ? "yes" : "no") + field];
  if (!value || value === "n-a") return undefined;
  return value;
}

export function hasAnswerCardField(card, answer, field) {
  const value = getAnswerCardField(card, answer, field);
  return value && true;
}

export function changeBodyGameMood(mood) {
  return () => {
    document.body.classList.remove("game-mood-positive");
    document.body.classList.remove("game-mood-neutral");
    document.body.classList.remove("game-mood-negative");

    document.body.classList.add(`game-mood-${mood}`);
  };
}

export const makeClass = (...classes) => classes.filter(Boolean).join(" ");
