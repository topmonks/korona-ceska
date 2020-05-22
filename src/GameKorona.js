import { TurnOrder } from 'boardgame.io/core';
import { calculateMood, calculateValues, getAnswerCardField, isPlayAnswer, isPlayCard, isEventCard, } from './library';

const { cards: CARD_DECKS, events: EVENT_CARDS, story: STORY_CARDS } = require('./events.json');


export const getCardDecks = ({ random }) => ({
  neutral: random.Shuffle(CARD_DECKS.neutral),
  positive: random.Shuffle(CARD_DECKS.positive),
  negative: random.Shuffle(CARD_DECKS.negative),
  story: [...STORY_CARDS].reverse(),
  events: EVENT_CARDS, //
});

export const isCardDeckEmpty = (G) => {
  const mood = calculateMood(G.values);
  return !G.decks[mood].length && !G.decks.neutral.length;
}

export const getNextCard = (G, ctx) => {
  const { stage, decks } = G;

  if (stage === 'event') return decks.events.pop();
  if (ctx.phase === 'newbie') return decks.story.pop();

  const { values } = G;
  const mood = calculateMood(values);
  return decks[mood].pop() || decks.neutral.pop();
}

export const getCurrentStage = ({ activePlayers, currentPlayer }) => {
  return activePlayers?.[currentPlayer];
}

export function setStage(ctx, stage) {
  // ctx.events.setStage(stage);
  return stage;
}

export const Answers = {
  YES: true,
  NO: false,
  OK: 'OK',
  CONTINUE: 'CONTINUE',
  NEXT: 'NEXT',
  SKIP: 'SKIP',
};

export const setShowKoronaStoryNewbie = (show) => {
  global._koronaDoNotShowStoryAgain = show;
}
export const showKoronaStoryNewbie = () => {
  return global._koronaDoNotShowStoryAgain !== false;
}


export default {
  name: 'korona-ceska',

  // Function that returns the initial value of G.
  // setupData is an optional custom object that is
  // passed through the Game Creation API.
  setup: (ctx, setupData) => {
    const values = [50, 50, 50, 50]; // Initial values

    if (!showKoronaStoryNewbie()) {
      ctx.events.setPhase('player');
    }

    return {
      values,
      decks: getCardDecks(ctx),
      card: null,
      finalEventCard: null,
    }
  },


  phases: {
    newbie: {
      start: true,
      next: 'player',
      moves: { MakeNewbieAnswer },
    },
    player: {}
  },

  moves: { MakeAnswer },

  turn: {
    order: TurnOrder.DEFAULT, // dont need this, it's not multiplayer game
    // activePlayers: { all: 'play' },
    // stages: {
    //   play: { next: 'play' },
    //   event: { next: 'play', }
    // },

    onBegin: (G, ctx) => {
      G.week = ctx.turn - 1;
      G.stage = 'play'; // getCurrentStage(ctx);
      G.card = getNextCard(G, ctx);
    },
    onEnd: (G, ctx) => {
      if (G.lastAnswer) G.values = calculateValues(G.values, G.card, G.lastAnswer);
      if (G.finalEventCard) G.values = calculateValues(G.values, G.card, G.finalEventCard);
      G.card = null;
      G.effect = null;
      G.lastAnswer = null;
    },
  },

  endIf: (G, ctx) => {
    const [epidemie, zdravi, ekonomika, duvera] = G.values;
    if (epidemie === 100) return { loose: 1 };

    if (!zdravi) return { loose: 2 };
    if (!ekonomika) return { loose: 3 };
    if (!duvera) return { loose: 4 };

    if (!epidemie) return { win: true };

    if (!G.card && isCardDeckEmpty(G)) {
      return { draw: true }
    }
  },

  // End of the Game
  onEnd: (G, ctx) => {
    setShowKoronaStoryNewbie(false);
  },

  ai: {
    enumerate: (G, ctx) => {
      const moves = [];

      if (ctx.phase === 'newbie') {
        moves.push({ move: 'MakeNewbieAnswer', args: [Answers.NEXT] });
        moves.push({ move: 'MakeNewbieAnswer', args: [Answers.SKIP] });
      } else if (isPlayCard(G.card) && !G.lastAnswer) {
        moves.push({ move: 'MakeAnswer', args: [true] });
        moves.push({ move: 'MakeAnswer', args: [false] });
      } else if (G.effect) {
        moves.push({ move: 'MakeAnswer', args: [Answers.CONTINUE] });
      } else if (isEventCard(G.card)) {
        moves.push({ move: 'MakeAnswer', args: [Answers.OK] });
      } else {
        // moves.push({ move: 'endTurn' });
      }

      return moves;
    }
  }
}


function MakeNewbieAnswer(G, ctx, answer) {
  if (answer === Answers.NEXT) {
    if (!G.decks.story.length) {
      ctx.events.endPhase();
    } else {
      G.card = G.decks.story.pop();
    }
  }
  if (answer === Answers.SKIP) {
    ctx.events.endPhase();
  }
}


function MakeAnswer(G, ctx, answer) {

  const turnNextToEffect = () => {
    if (G.week > 0 && G.week % 4 === 0) {
      G.stage = setStage(ctx, 'event');
      G.card = getNextCard(G, ctx);
      G.effect = null;
    } else {
      ctx.events.endTurn();
    }
  }

  if (answer === Answers.CONTINUE) {
    turnNextToEffect()
  } else if (isPlayAnswer(answer)) { // YES/NO answers
    G.lastAnswer = answer;
    G.effect = getAnswerCardField(G.card, answer, 'effect');
    if (!G.effect) turnNextToEffect();
  } else if (answer === Answers.OK) {
    G.lastAnswer = answer;
    if (G.week === 16) G.finalEventCard = G.card;
    ctx.events.endTurn();
  }

}
