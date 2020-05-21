import React, { useEffect } from "react";
import ValueIcon from "./ValueIcon";
import ScreenButton from "./ScreenButton";
import { resetBodyGamePlay } from "./library";

export default function ScreenHelp({ route }) {
  useEffect(resetBodyGamePlay(), []);
  return (
    <div className="screen screen--help">
      <div className="screen--help__text">
        <h1>Nápověda</h1>
        <p>
          Cílem hry je dostat epidemii pod kontrolu, aniž by došlo k devastaci
          ekonomiky, podlomení zdraví lidu či propadu důvěry ve veřejné
          instituce na nulu. Hráč musí stlačit ukazatel epidemie na nulovou
          úroveň a zároveň udržet ostatní ukazatele nad nulou.
        </p>
      </div>
      <div className="screen--help__grid">
        <div>
          <ValueIcon type="virus" value={72} />
          <p>Epidemie</p>
        </div>
        <div>
          <ValueIcon type="health" value={42} />
          <p>Zdraví</p>
        </div>
        <div>
          <ValueIcon type="economy" value={12} />
          <p>Ekonomika</p>
        </div>
        <div>
          <ValueIcon type="trust" value={34} />
          <p>Důvěra</p>
        </div>
      </div>

      <ScreenButton>Zpět na menu</ScreenButton>
    </div>
  );
}
