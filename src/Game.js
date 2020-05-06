import { TurnOrder } from 'boardgame.io/core';

export const KoronaCeska = {
  // The name of the game.
  name: 'korona-ceska',

  // Function that returns the initial value of G.
  // setupData is an optional custom object that is
  // passed through the Game Creation API.
  setup: (ctx, setupData) => ({
    epidemie: 50,
    zdravi: 50,
    ekonomika: 50,
    duvera: 50,
    // FIXME: fetch and then start the game
    decks: require('./events.json').cards,
    mood: 'neutral', // 'positive', 'negative',
    card: null, // card in hand
  }),

  moves: {
    // short-form move.
    YES: (G, ctx) => {
      const card = G.card = G.decks[G.mood].pop();
      console.log(card)

    },
    NAH: (G, ctx) => {
      const card = G.card = G.decks[G.mood].pop();

      console.log(card)
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
    onBegin: (G, ctx) => G,

    // Called at the end of a turn.
    onEnd: (G, ctx) => G,

    // Ends the turn if this returns true.
    endIf: (G, ctx) => true,

    // Called at the end of each move.
    onMove: (G, ctx) => G,

    // Ends the turn automatically after a number of moves.
    moveLimit: 1,

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
  //   A: {
  //     // Called at the beginning of a phase.
  //     onBegin: (G, ctx) => G,

  //     // Called at the end of a phase.
  //     onEnd: (G, ctx) => G,

  //     // Ends the phase if this returns true.
  //     endIf: (G, ctx) => true,

  //     // Overrides `moves` for the duration of this phase.
  //     moves: { ... },

  //     // Overrides `turn` for the duration of this phase.
  //     turn: { ... },
  //   },

  //   ...
  // },

  // Ends the game if this returns anything.
  // The return value is available in `ctx.gameover`.
  // endIf: (G, ctx) => obj, FIXME

  // Called at the end of the game.
  // `ctx.gameover` is available at this point.
  onEnd: (G, ctx) => G,
}