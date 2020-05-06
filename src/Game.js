import { TurnOrder } from 'boardgame.io/core';
import { calculateMood, calculateValues } from './library';



export const KoronaCeska = {
  // The name of the game.
  name: 'korona-ceska',

  // Function that returns the initial value of G.
  // setupData is an optional custom object that is
  // passed through the Game Creation API.
  setup: (ctx, setupData) => {
    // Initial values
    const values = [50, 50, 50, 50]

    // FIXME: fetch and then start the game
    const decks = require('./events.json').cards

    // Get first card
    const card = decks[calculateMood(values)].pop();

    return {
      values,
      decks,
      card,
      answer: null,
    }
  },

  moves: {
    // short-form move.
    answer: (G, ctx, answer) => {
      G.answer = answer;
      G.values = calculateValues(G.values, G.card, answer);
    },
    continue: (G, ctx) => {
      const mood = calculateMood(G.values);
      G.answer = null;
      G.card = G.decks[mood].pop();
    },

    // long-form move.
    // B: {
    //   move: (G, ctx) => { },
    //   undoable: false,  // prevents undoing the move.
    //   redact: true,     // prevents the move arguments from showing up in the log.
    //   client: false,    // prevents the move from running on the client.
    //   noLimit: true,    // prevents the move counting towards a player’s number of moves.
    // },
  },

  // Everything below is OPTIONAL.

  // Function that allows you to tailor the game state to a specific player.
  // playerView: (G, ctx, playerID) => G,

  // The seed used by the pseudo-random number generator.
  seed: 'random-string',

  turn: {
    // The turn order.
    order: TurnOrder.DEFAULT,

    // Called at the beginning of a turn.
    onBegin: (G, ctx) => {

      // G.decks = ctx.random.Shuffle(G.decks);
    },

    // Called at the end of a turn.
    onEnd: (G, ctx) => G,

    // Ends the turn if this returns true.
    endIf: (G, ctx) => true,

    // Called at the end of each move.
    onMove: (G, ctx) => G,

    // Ends the turn automatically after a number of moves.
    moveLimit: 2,

    // Calls setActivePlayers with this as argument at the
    // beginning of the turn.
    // activePlayers: { ... },

    // stages: {
    //   A: {
    //     // Players in this stage are restricted to moves defined here.
    //     moves: { ... },

    //     // Players in this stage will be moved to the stage specified
    //     // here when the endStage event is called.
    //     next: 'B'
    //   },

    //   ...
    // },
  },

  // phases: {
  //   neutral: {
  //     // Called at the beginning of a phase.
  //     onBegin: (G, ctx) => G,

  //     // Called at the end of a phase.
  //     onEnd: (G, ctx) => G,

  //     // Ends the phase if this returns true.
  //     endIf: (G, ctx) => true,

  //     // Overrides `moves` for the duration of this phase.
  //     // moves: { ... },

  //     // Overrides `turn` for the duration of this phase.
  //     // turn: { ... },
  //   },
  //   positive: {

  //   },
  //   negative: {

  //   }
  // },

  // Ends the game if this returns anything.
  // The return value is available in `ctx.gameover`.
  // endIf: (G, ctx) => obj, FIXME

  // Called at the end of the game.
  // `ctx.gameover` is available at this point.
  onEnd: (G, ctx) => G,
}
