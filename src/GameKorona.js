import { TurnOrder } from 'boardgame.io/core';
import {
  calculateMood,
  calculateValues,
  getAnswerCardField,
  isPlayAnswer,
  isPlayCard,
  isEventCard,
  gameLogToUrlComponent,
} from './library';

const {
  story: STORY_CARDS,
  tutorial: TUTORIAL_CARDS,
  cards: CARD_DECKS,
  events: EVENT_CARDS,
} = require('./events.json');


export const getCardDecks = ({ random }) => ({
  story: [...STORY_CARDS].reverse(),
  tutorial: [...TUTORIAL_CARDS].reverse(),
  neutral: random.Shuffle(CARD_DECKS.neutral),
  positive: random.Shuffle(CARD_DECKS.positive),
  negative: random.Shuffle(CARD_DECKS.negative),
  events: [...EVENT_CARDS].reverse(),
});

export const isCardDeckEmpty = (G) => {
  const mood = calculateMood(G.values);
  return !G.decks[mood].length && !G.decks.neutral.length;
}

export const getNextCard = (G, ctx) => {
  const { stage, decks } = G;

  if (stage === 'event') return decks.events.pop();
  if (ctx.phase === 'story') return decks.story.pop();
  if (ctx.phase === 'tutorial') return decks.tutorial.pop();

  const { values } = G;
  const mood = calculateMood(values);
  return decks[mood].pop() || decks.neutral.pop();
}

export const getCurrentStage = ({ activePlayers, currentPlayer }) => {
  return activePlayers?.[currentPlayer];
}
export const getGameSeed = (ctx) => {
  return ctx.random._obj.state.seed;
}

export function setStage(ctx, stage) {
  // ctx.events.setStage(stage);
  return stage;
}

export const Answers = {
  YES: 'YES',
  NO: 'NO',
  OK: 'OK',
  CONTINUE: 'CONTINUE',
  NEXT: 'NEXT',
  SKIP: 'SKIP',
  FINISH: 'FINISH',
};

export const LAST_GAME_RECORD_STORAGE_KEY = 'last-game';
export const STORY_GAME_ENABLE_STORAGE_KEY = 'game-story';
export const BONUS_GAME_MODE_STORAGE_KEY = 'game-bonus';

export const enableBonusMode = (enable) => {
  if (typeof enable === 'boolean') {
    localStorage.setItem(BONUS_GAME_MODE_STORAGE_KEY, enable ? 'on' : 'off');
  }

  if (global.location.hash === '#bonus') {
    localStorage.setItem(BONUS_GAME_MODE_STORAGE_KEY, 'on');
    global.location.hash = 'bonus-aktivovan-diky-za-feedback!';
  }

  const value = localStorage.getItem(BONUS_GAME_MODE_STORAGE_KEY);
  return value && value;
}


export const enableKoronaStoryNewbie = (enable) => {
  if (enable !== undefined) {
    localStorage.setItem(STORY_GAME_ENABLE_STORAGE_KEY, enable ? 'on' : 'off');
  }

  const value = localStorage.getItem(STORY_GAME_ENABLE_STORAGE_KEY);
  return value && value;
}


export const storeLastGameRecord = ({ week, seed, log }) => {
  if (log?.length) {
    localStorage.setItem(
      LAST_GAME_RECORD_STORAGE_KEY,
      `${week}:${seed}:${gameLogToUrlComponent(log)}`
    );
  }
}

export default {
  name: 'korona-ceska',

  // Function that returns the initial value of G.
  // setupData is an optional custom object that is
  // passed through the Game Creation API.
  setup: (ctx, setupData) => {
    let values = [50, 50, 50, 50]; // Initial values

    const bonus = enableBonusMode();
    if (bonus === 'on') {
      values = [50, 100, 100, 100];
    }

    if (enableKoronaStoryNewbie() === 'off') {
      ctx.events.setPhase('game');
    }

    const seed = getGameSeed(ctx);

    if (global.gtag) {
      global.gtag('event', 'game_start', { seed });
    }


    return {
      values,
      decks: getCardDecks(ctx),
      card: null,
      finalEventCard: null,
      seed,
    }
  },


  phases: {
    story: {
      start: true,
      next: 'tutorial',
      moves: { MakeNewbieAnswer }
    },
    tutorial: {
      next: 'game',
      moves: { MakeAnswer },
      onEnd: () => {
        enableKoronaStoryNewbie(false);
      }
    },
    game: {}
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
      G.card = null;
      G.effect = null;

      if (G.finalEventCard && ctx.turn > 16) {
        G.values = calculateValues(G.values, G.finalEventCard);
      }
    },
  },

  endIf: (G, ctx) => {
    if (G.effect) return; // Do not end before user confirm the effect

    const [epidemie, zdravi, ekonomika, duvera] = G.values;
    if (epidemie === 100) return { loose: 'epidemie' };

    if (!zdravi) return { loose: 'health' };
    if (!ekonomika) return { loose: 'economy' };
    if (!duvera) return { loose: 'trust' };

    if (!epidemie) return { win: true };

    if (!G.card && isCardDeckEmpty(G)) {
      return { draw: true }
    }
  },

  // End of the Game
  onEnd: (G, ctx) => {
    if (global.gtag) global.gtag('event', 'game_over', ctx.gameover);
  },

  ai: {
    enumerate: (G, ctx) => {
      const moves = [];

      if (ctx.phase === 'story') {
        moves.push({ move: 'MakeNewbieAnswer', args: [Answers.NEXT] });
        moves.push({ move: 'MakeNewbieAnswer', args: [Answers.SKIP] });
      } else if (isPlayCard(G.card)) {
        moves.push({ move: 'MakeAnswer', args: [Answers.YES] });
        moves.push({ move: 'MakeAnswer', args: [Answers.NO] });
      } else if (G.effect) {
        moves.push({ move: 'MakeAnswer', args: [Answers.CONTINUE] });
      } else if (ctx.phase === 'tutorial') {
        moves.push({ move: 'MakeNewbie', args: [Answers.CONTINUE] });
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
  if (global.gtag) {
    global.gtag('event', 'story_move', { answer, seed: G.seed });
  }

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
  if (global.gtag) {
    global.gtag('event', 'play_move', { answer, seed: G.seed });
  }

  const turnNextToEffect = () => {
    G.effect = null;

    if (G.week > 0 && G.week % 4 === 0 && G.week <= 16) {
      G.stage = setStage(ctx, 'event');
      G.card = getNextCard(G, ctx);

      if (G.week === 16) G.finalEventCard = G.card; // using every 16+ week
    } else {
      if (ctx.phase === 'tutorial') {
        ctx.events.endPhase();
      } else {
        ctx.events.endTurn();
      }
    }
  }

  if (answer === Answers.CONTINUE) {
    turnNextToEffect()
  } else if (isPlayAnswer(answer)) { // YES/NO answers
    G.effect = getAnswerCardField(G.card, answer, 'effect');
    G.values = calculateValues(G.values, G.card, answer);
    if (!G.effect) turnNextToEffect();
  } else if (answer === Answers.OK) { // special event card
    G.values = calculateValues(G.values, G.card);
    ctx.events.endTurn();
  }

  if (ctx.phase === 'tutorial') {
    if (!G.decks.tutorial.length) {
      if (!G.effect) ctx.events.endPhase();
    } else {
      G.card = G.decks.tutorial.pop();
    }
  }

}
