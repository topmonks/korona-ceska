
export function calculateMood([epidemie]) {
  if (epidemie >= 80) {
    return 'negative';
  } else if (epidemie >= 20) {
    return 'neutral';
  } else {
    return 'positive';
  }
};

export function calculateValues(values, card, answer) {
  const applicate = (value, index) => values[index] + value;
  const calculate = (updates) => updates.split(',').map(Number).map(applicate);

  let results = [];

  if (answer === true) {
    results = calculate(card.yesvalues);
  } else if (answer === false) {
    results = calculate(card.novalues);
  } else {
    throw new Error("Špatná odpověď.")
  }

  return results.map(value => {
    if (value > 100) return 100;
    if (value < 0) return 0;
    return value;
  })
}

export function getAnswerCardField(card, answer, field) {
  const value = card[(answer ? 'yes' : 'no') + field]
  if (!value) return null;
  return value;
}


export function hasAnswerCardField(card, answer, field) {
  const value = getAnswerCardField(card, answer, field);
  return value && value !== 'n-a';
}



export function persistedPlayerSeed(v = 'v0') {
  const name = `player-seed-${v}`;
  const value = (localStorage.getItem(name) || Math.random()).toString();
  localStorage.setItem(name, value)
  return value
}
