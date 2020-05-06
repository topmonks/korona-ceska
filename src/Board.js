import React from 'react';



export default function Board({ G, ctx, moves }) {
  const { epidemie, zdravi, ekonomika, duvera, card } = G
  console.warn('Not yet implemented.', { ctx, moves, card })

  return (
    <div>
      <p>{JSON.stringify({ epidemie, zdravi, ekonomika, duvera, })}</p>
      <button onClick={moves.YES}>YES</button>
      <button onClick={moves.NAH}>NAH</button>
    </div>
  )
}