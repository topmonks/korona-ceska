import React from 'react';
import ValueIcon from './ValueIcon';


export default function GameValues({ values, }) {
  const [virus, health, economy, trust] = values;

  const valuePercent = value => <span>{value.toFixed(0)}%</span>

  return (
    <div className="game-values">
      <div className="game-values__value">
        <ValueIcon type="virus" value={virus} loose={virus === 100} />
        {valuePercent(virus)}
      </div>
      <div className="game-values__value">
        <ValueIcon small type="health" value={health} loose={!health} />
        {valuePercent(health)}
      </div>
      <div className="game-values__value">
        <ValueIcon small type="economy" value={economy} loose={!economy} />
        {valuePercent(economy)}
      </div>
      <div className="game-values__value">
        <ValueIcon small type="trust" value={trust} loose={!trust} />
        {valuePercent(trust)}
      </div>

    </div>
  )
}
