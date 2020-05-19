import React from 'react';
import ValueIcon from './ValueIcon';


export default function GameValues({ turn, values }) {
  const [virus, health, economy, trust] = values;

  return (
    <div className="game-values">
      <div className="game-values__virus">
        <ValueIcon type="virus" value={virus} loose={virus === 100} />
      </div>
      <div className="game-values__rest">
        <ValueIcon small type="health" value={health} loose={!health} />
        <ValueIcon small type="economy" value={economy} loose={!economy} />
        <ValueIcon small type="trust" value={trust} loose={!trust} />
      </div>
    </div>
  )
}
