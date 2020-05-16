import React from 'react';

export default function GameValues({ turn, values }) {

  return (
    <div className="game-values">
      <p>
        <small>{turn}. kolo</small> = {JSON.stringify(values)}
      </p>
    </div>
  )
}