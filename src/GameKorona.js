import { TurnOrder } from 'boardgame.io/core';
import { calculateMood, calculateValues, hasAnswerCardField } from './library';

const { cards: CARD_DECKS } = require('./events.json');



export default {
  name: 'korona-ceska',
  // seed: persistedPlayerSeed('v0'),

  // Function that returns the initial value of G.
  // setupData is an optional custom object that is
  // passed through the Game Creation API.
  setup: (ctx, setupData) => {
    const values = [50, 50, 50, 50]; // Initial values
    // const player = { id: 0, name: 'Player' }

    const decks = {
      neutral: ctx.random.Shuffle(CARD_DECKS.neutral),
      positive: ctx.random.Shuffle(CARD_DECKS.positive),
      negative: ctx.random.Shuffle(CARD_DECKS.negative),
    }

    // Pop first card from the proper deck
    const card = decks[calculateMood(values)].pop();

    return {
      // player,
      values,
      decks,
      card,
      answer: null,
    }
  },

  moves: {
    // short-form move.
    answer: (G, ctx, answer) => {
      G.values = calculateValues(G.values, G.card, answer);

      if (hasAnswerCardField(G.card, answer, 'effect')) {
        G.answer = answer;
        // turn will be ended in the Board
      } else {
        ctx.events.endTurn();
      }
    }
  },

  turn: {
    order: TurnOrder.CONTINUE,
    onEnd: (G, ctx) => {
      const mood = calculateMood(G.values);
      G.card = G.decks[mood].pop();
      G.answer = null;
    },
  },

  endIf: (G, ctx) => {
    const [epidemie, zdravi, ekonomika, duvera] = G.values;

    if (!epidemie) return { win: true };

    if (epidemie === 100) return { loose: 1 };
    if (!zdravi) return { loose: 2 };
    if (!ekonomika) return { loose: 3 };
    if (!duvera) return { loose: 4 };

    const mood = calculateMood(G.values);
    if (G.decks[mood].length === 0) {
      return { draw: true };
    }
  },

  onEnd: (G) => {
    G.card = null;
  },

}
