import React from 'react';



export default function Board({ G, ctx, moves }) {
  console.warn('Not yet implemented.', { ctx, moves })

  return (
    <div>
      <p>{JSON.stringify(G)}</p>
      <button onClick={moves.YES}>YES</button>
      <button onClick={moves.NAH}>NAH</button>
    </div>
  )
}