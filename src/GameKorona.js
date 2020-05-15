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


  moves: { MakeAnswer },

  turn: {
    order: TurnOrder.RESET,
    onBegin: (G, ctx) => { // for some reason is it called twioce fot the very first turn
      const incident = calculateIncidentEvent(EVENT_CARDS, ctx.turn);
      if (incident) {
        ctx.events.setPhase('incident');
        G.incident = incident;
      }

      if (!G.card) {
        const mood = calculateMood(G.values);
        G.card = G.decks[mood].pop();
      }
    },
    onEnd: (G, ctx) => {
      G.card = null;
      G.answer = null;
    },
  },

  phases: {
    newbie: {
      start: true,
      next: 'play',
      moves: { FinishTutorial }
    },
    play: {
      moves: { MakeAnswer }
    },
    incident: {
      moves: { MakeAcknowledge },
      next: 'play',
    },
  },

  endIf: (G, ctx) => {
    const [epidemie, zdravi, ekonomika, duvera] = G.values;

    if (!epidemie) return { win: true };

    if (epidemie === 100) return { loose: 1 };
    if (!zdravi) return { loose: 2 };
    if (!ekonomika) return { loose: 3 };
    if (!duvera) return { loose: 4 };
  },

  onEnd: (G, ctx) => {
    G.card = null;
  },

  ai: {
    enumerate: (G, ctx) => {
      const moves = [];

      switch (ctx.phase) {
        case 'newbie': {
          moves.push({ move: 'FinishTutorial' });
          break;
        }
        case 'play': {
          if (G.answer === null) {
            moves.push({ move: 'MakeAnswer', args: [true] });
            moves.push({ move: 'MakeAnswer', args: [false] });
          } else {
            moves.push({ move: 'endTurn' });

          }
          break;
        }
        case 'incident': {
          moves.push({ move: 'MakeAcknowledge' });
          break;
        }
        default: {
        }
      }

      return moves;
    }
  }
}

function FinishTutorial(G, ctx) {
  ctx.events.endPhase();
  console.log(ctx)
}

function MakeAnswer(G, ctx, answer) {
  G.values = calculateValues(G.values, G.card, answer, G.incident);

  if (hasAnswerCardField(G.card, answer, 'effect')) {
    G.answer = answer;
    // turn will be ended in the Board
  } else {
    ctx.events.endTurn();
  }
}

function MakeAcknowledge(G, ctx) {
  ctx.events.endPhase();
}

