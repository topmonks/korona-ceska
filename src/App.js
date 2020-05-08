import { Client } from 'boardgame.io/react';
import { KoronaCeska } from './Game';
import Board from './Board';

const App = Client({
  // A game object.
  game: KoronaCeska,
  numPlayers: 1,

  // Your React component representing the game board.
  // The props that this component receives are listed below.
  board: Board,

  // multiplayer: false, ALERT: this broked turrn orders
  debug: true

  // An optional Redux store enhancer.
  // This is useful for augmenting the Redux store
  // for purposes of debugging or simply intercepting
  // events in order to kick off other side-effects in
  // response to moves.
  // enhancer: applyMiddleware(your_middleware),
});

export default App;