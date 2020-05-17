import { Client } from 'boardgame.io/react';
import KoronaCeska from './GameKorona';
import Board from './GameBoard';


export default Client({
  // A game object.
  game: KoronaCeska,
  numPlayers: 1,

  // Your React component representing the game board.
  // The props that this component receives are listed below.
  board: Board,

  // multiplayer: false, ALERT: this broked turrn orders
  debug: false,

  // An optional Redux store enhancer.
  // This is useful for augmenting the Redux store
  // for purposes of debugging or simply intercepting
  // events in order to kick off other side-effects in
  // response to moves.
  // enhancer: applyMiddleware(your_middleware),
});
