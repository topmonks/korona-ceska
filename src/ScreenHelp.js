import React from "react";
import { Link } from "react-navi";
import ValueIcon from "./ValueIcon";

export default function ScreenHelp({ route }) {
  return (
    <div className="screen screen--help">
      <h1>Nápověda</h1>
      <p className="screen--help__text">
        Cílem hry je dostat epidemii pod kontrolu, aniž by došlo k devastaci
        ekonomiky, podlomení zdraví lidu či propadu důvěry ve veřejné instituce
        na nulu. Hráč musí stlačit ukazatel epidemie na nulovou úroveň a zároveň
        udržet ostatní ukazatele nad nulou.
      </p>
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

      <Link className="navi__link" href="/">
        Zpět do menu
      </Link>
    </div>
  );
}
