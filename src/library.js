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


export function isPlayAnswer(answer) {
  return answer === Answers.YES || answer === Answers.NO;
}

export function isPlayCard(card) {
  if (!card) return false;
  if (!card.name || !card.img || !card.text) return false;
  return card.yesvalues && card.novalues;
}

export function isEventCard(card) {
  if (!card) return false;
  return card.values && !isPlayCard(card);
}
export function isStoryCard(card) {
  if (!card) return false;
  return card.text && card.name && !isPlayCard(card) && !isEventCard(card);
}
export function isTutorialCard(card) {
  if (!card) return false;
  return card.text1 && card.text2;
}

/**
 * Returns updated values array based on Yes / No answer and/or the card value
 */
export function calculateValues(values, card, answer) {
  const applicate = (value, index) => values[index] + value;
  const calculate = (updates) => updates.split(",").map(Number).map(applicate);

  let results = [];

  if (answer === Answers.YES) {
    results = calculate(card.yesvalues);
  } else if (answer === Answers.NO) {
    results = calculate(card.novalues);
  } else if (card.values) {
    results = calculate(card.values)
  } else {
    results = values;
  }

  return results.map((value) => {
    if (value > 100) return 100;
    if (value < 0) return 0;
    return value;
  });
}

export function getAnswerCardField(card, answer, field) {
  const value = (card || {})[answer.toLowerCase() + field]; // yesvalues / novalues
  if (!value || value === "n-a") return undefined;
  return value;
}


export function changeBodyGameMood(mood) {
  return () => {
    document.body.classList.remove("game-mood-positive");
    document.body.classList.remove("game-mood-neutral");
    document.body.classList.remove("game-mood-negative");

    document.body.classList.add(`game-mood-${mood}`);
  };
}

export function setBodyGamePlay() {
  return () => {
    document.body.classList.add("game-play");
  };
}
export function resetBodyGamePlay() {
  return () => {
    document.body.classList.remove("game-play");
  };
}

export const makeClass = (...classes) => classes.filter(Boolean).join(" ");


export const VALUE_TITLES = {
  virus: "Epidemie",
  health: "Zdraví",
  economy: "Ekonomika",
  trust: "Důvěra"
}

export const getValueTitle = ({ type, value }) => {
  return `${VALUE_TITLES[type]}: ${value.toFixed(0)}%`;
}

export const getShareText = (outcome) => {
  if (!outcome) return "Narazil jsem na zajímavou hru.";
  return outcome.win ? "Vyhrál jsem! A prej že to nejde.." : "Prohrál jsem, je to vážně těžké!";
}

export function gameLogToUrlComponent(logs) {
  const answers = logs.filter(log => {
    const { type } = log.action.payload;
    return type.startsWith('Make') && type.endsWith('Answer')
  }).map(log => {
    const { args: [answer] } = log.action.payload;
    return answer
  });
  return answers.join(':');
}

export function makeShareHandler() {
  if (!navigator.share) return null;

  return async ({ week, outcome, seed, log } = {}) => {
    try {
      navigator.share({
        title: 'Korona česká',
        text: getShareText(outcome),
        url: makeShareLink({ week, outcome, seed, log }),
      })
    } catch (error) {

    }
  };
}

export function makeShareLink({ week, outcome, seed, log } = {}) {
  let link = `https://korona-ceska.cz/`;

  // TODO: instead of home use URL of static Game Over Screen, It'll use suitable Illustration of the Outcome
  if (week && outcome && log && seed) {
    const record = gameLogToUrlComponent(log);
    link += `#${week}!${seed}!${record}`
  }

  return link;
}

export function scrollToTop() {
  setImmediate(document.body.scrollTop);
}

export function hasOverflow(el) {
  const delta = el.scrollHeight - el.clientHeight;
  return delta > 0;
}
