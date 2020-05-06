
export function calculateMood([epidemie]) {
  if (epidemie > 80) {
    return 'negative';
  } else if (epidemie > 20) {
    return 'neutral';
  } else {
    return 'positive';
  }
};

export function calculateValues(values, card, answer) {
  const applicate = (value, index) => values[index] + value;
  const calculate = (updates) => updates.split(',').map(Number).map(applicate);

  if (answer === true) {
    return calculate(card.yesvalues);
  } else if (answer === false) {
    return calculate(card.novalues);
  } else {
    throw new Error("Špatná odpověď.")
  }
}

export function getAnswerCardField(card, answer, field) {
  const value = card[(answer ? 'yes' : 'no') + field]
  if (!value) throw new Error(`Unknow Answer Card Field ${field}`);
  return value;
}