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
  return card
}

export function hasYesNoAnswer(card) {
  if (!card) return false;
  return card.yesvalues && card.novalues;
}

export function isIncidentCard(card) {
  if (!card) return false;
  return card.values && !hasYesNoAnswer(card);
}
export function isStoryCard(card) {
  if (!card) return false;
  return card.text && card.name && !hasYesNoAnswer(card) && !isIncidentCard(card);
}

export function calculateValues(values, card, answer) {
  const applicate = (value, index) => values[index] + value;
  const calculate = (updates) => updates.split(",").map(Number).map(applicate);

  let results = [];

  if (answer === true) {
    results = calculate(card.yesvalues);
  } else if (answer === false) {
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
  if (!value || value === 'n-a') return undefined;
  return value;
}

export function hasAnswerCardField(card, answer, field) {
  const value = getAnswerCardField(card, answer, field);
  return value && true;
}

export function changeBodyGameMood(mood) {
  return () => {
    document.body.classList.remove('game-mood-positive');
    document.body.classList.remove('game-mood-neutral');
    document.body.classList.remove('game-mood-negative');

    document.body.classList.add(`game-mood-${mood}`);
  };
}

export function preloadIllustrations() {
  if (global.illustrationsPreloaded) return;
  global.illustrationsPreloaded = true;

  const illustrations = [
    require('./illustrations/bures.png'),
    require('./illustrations/cupranek.png'),
    require('./illustrations/eman.png'),
    require('./illustrations/intro.png'),
    require('./illustrations/netahlo.png'),
    require('./illustrations/nguyen.png'),
    require('./illustrations/pohlova.png'),
    require('./illustrations/rymula.png'),
    require('./illustrations/skorene.png'),
    require('./illustrations/tiskar.png'),
    require('./illustrations/vojtik.png'),
    require('./illustrations/zdrava.png'),
  ];


  for (const ill of illustrations) {
    const img = document.createElement('img');
    img.style.position = 'fixed';
    img.style.top = '-200vh';
    img.style.left = '-200vw';
    img.src = ill;
    document.body.append(img);
  }
}

