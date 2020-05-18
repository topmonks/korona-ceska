import { TurnOrder } from 'boardgame.io/core';
import { calculateMood, calculateValues, getIncidentCard, hasYesNoAnswer, isIncidentCard, getAnswerCardField, } from './library';

const { cards: CARD_DECKS, events: EVENT_CARDS, story: STORY_CARDS } = require('./events.json');

export const Answers = {
  YES: true,
  NO: false,
  OK: 'OK',
  CONTINUE: 'CONTINUE',
  NEXT: 'NEXT',
  SKIP: 'SKIP',
}

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
      story: [...STORY_CARDS].reverse()
    }

    // TODO: If yo want to skip for good, add localStorage.setItem to the end of newbie phase
    if (localStorage.getItem('newbie')) {
      ctx.events.endPhase();
    }

    return {
      // player,
      values,
      decks,
      card: null,
      answer: null,
      effect: null,
    }
  },


  phases: {
    newbie: {
      start: true,
      next: 'play'
    },
    play: {
    },
  },

  moves: { MakeAnswer },

  turn: {
    order: TurnOrder.CONTINUE,
    onBegin: (G, ctx) => {
      if (G.card) return; // for some reason is it called twioce fot the very first turn

      if (ctx.phase === 'newbie') {
        G.card = G.decks.story.pop();
        if (!G.card) ctx.events.endPhase();
        return;
      }

      const incident = getIncidentCard(EVENT_CARDS, ctx.turn);

      if (incident?.last && incident.turn < ctx.turn) {
        G.values = calculateValues(G.values, incident)
      } else if (incident) {
        G.card = incident;
      }

      if (!G.card) {
        const mood = calculateMood(G.values);
        G.card = G.decks[mood].pop();
      }
    },
    onEnd: (G, ctx) => {
      G.card = null;
      G.answer = null;
      G.effect = null;
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
    G.answer = null;
    G.effect = null;
  },

  ai: {
    enumerate: (G, ctx) => {
      const moves = [];

      if (ctx.phase === 'newbie') {
        moves.push({ move: 'MakeAnswer', args: [Answers.NEXT] });
        moves.push({ move: 'MakeAnswer', args: [Answers.SKIP] });
      } else if (G.answer === null && hasYesNoAnswer(G.card)) {
        moves.push({ move: 'MakeAnswer', args: [true] });
        moves.push({ move: 'MakeAnswer', args: [false] });
      } else if (G.effect) {
        moves.push({ move: 'MakeAnswer', args: [Answers.CONTINUE] });
      } else if (isIncidentCard(G.card)) {
        moves.push({ move: 'MakeAnswer', args: [Answers.OK] });
      } else {
        moves.push({ move: 'endTurn' });
      }

      return moves;
    }
  }
}

function MakeAnswer(G, ctx, answer) {

  if (answer === Answers.CONTINUE) {
    ctx.events.endTurn();
    return;
  }

  if (answer === Answers.SKIP) {
    ctx.events.endPhase();
    return;
  }


  if (hasYesNoAnswer(G.card) || isIncidentCard(G.card)) {
    G.values = calculateValues(G.values, G.card, answer);
  }

  G.answer = answer;
  G.effect = getAnswerCardField(G.card, answer, 'effect') || null;

  if (!G.effect) {
    ctx.events.endTurn();
  }
}
