import { TurnOrder } from 'boardgame.io/core';
import { calculateMood, calculateValues, hasAnswerCardField, calculateIncidentEvent, } from './library';

const { cards: CARD_DECKS, events: EVENT_CARDS } = require('./events.json');



export default {
  name: 'korona-ceska',
  seed: Math.random().toString(), // TODO: Persist till game reset occur (not just page refresh like now)

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

    return {
      // player,
      values,
      decks,
      card: null,
      answer: null,
      incident: null,
    }
  },


  moves: {
    // the only move player can actually do
    answer: (G, ctx, answer) => {
      G.values = calculateValues(G.values, G.card, answer, G.incident);

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
    onBegin: (G, ctx) => { // for some reason is it called twioce fot the very first turn
      G.incident = calculateIncidentEvent(EVENT_CARDS, ctx.turn);

      if (!G.card) {
        const mood = calculateMood(G.values);
        G.card = G.decks[mood].pop();
      }
    },
    onEnd: (G, ctx) => {
      G.card = null;
      G.answer = null;
      G.incident = null;
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

  onEnd: (G, ctx) => {
    G.card = null;
  },

  ai: {
    enumerate: (G, ctx) => {
      const moves = [];

      if (G.answer === null && G.card) {
        moves.push({ move: 'answer', args: [true] });
        moves.push({ move: 'answer', args: [false] });
      } else if (!ctx.gameover) {
        moves.push({ event: 'endTurn' });
      }

      return moves;
    },
  }

}
