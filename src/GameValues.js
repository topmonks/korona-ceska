import React from 'react';
import ValueIcon from './ValueIcon';
import Tooltip from "rmc-tooltip/es";
import 'rmc-tooltip/assets/bootstrap.css';


export default function GameValues({ values, }) {
  const [virus, health, economy, trust] = values;

  const valuePercent = value => <span aria-hidden="true">{value.toFixed(0)}%</span>

  return (
    <div className="game-values">
      <Tooltip
        overlayClassName={"tooltip-overlay"}
        placement="bottom"
        destroyTooltipOnHide={true}
        overlay={<span aria-hidden="true">Epidemie</span>}>
        <div className="game-values__value">
          <ValueIcon type="virus" value={virus} loose={virus === 100}/>
          {valuePercent(virus)}
        </div>
      </Tooltip>
      <Tooltip
        overlayClassName={"tooltip-overlay"}
        placement="bottom"
        destroyTooltipOnHide={true}
        overlay={<span aria-hidden="true">Zdraví</span>}>
        <div className="game-values__value">
          <ValueIcon small type="health" value={health} loose={!health}/>
          {valuePercent(health)}
        </div>
      </Tooltip>
      <Tooltip
        overlayClassName={"tooltip-overlay"}
        placement="bottom"
        destroyTooltipOnHide={true}
        overlay={<span aria-hidden="true">Ekonomika</span>}>
        <div className="game-values__value">
          <ValueIcon small type="economy" value={economy} loose={!economy}/>
          {valuePercent(economy)}
        </div>
      </Tooltip>
      <Tooltip
        overlayClassName={"tooltip-overlay"}
        placement="bottom"
        destroyTooltipOnHide={true}
        overlay={<span aria-hidden="true">Důvěra</span>}>
        <div className="game-values__value">
          <ValueIcon small type="trust" value={trust} loose={!trust}/>
          {valuePercent(trust)}
        </div>
      </Tooltip>
    </div>
  )
}
