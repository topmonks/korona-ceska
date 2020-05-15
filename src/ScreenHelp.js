import React from "react";
import { Link } from "react-navi";
import iconVirus from "./icons/virus.svg";
import iconEconomy from "./icons/economy.svg";
import iconHealth from "./icons/health.svg";
import iconTrust from "./icons/trust.svg";

export default function ScreenHelp({ route }) {
  return (
    <div className="screen screen--help">
      <h1>Nápověda</h1>
      <p className="help__text">
        Cílem hry je dostat epidemii pod kontrolu, aniž by došlo k devastaci
        ekonomiky, podlomení zdraví lidu či propadu důvěry ve veřejné instituce
        na nulu. Hráč musí stlačit ukazatel epidemie na nulovou úroveň a zároveň
        udržet ostatní ukazatele nad nulou.
      </p>
      <div className="help__grid">
        <div>
          <img src={iconVirus} width="64px" height="64px" alt="virus" />
          <p>Epidemie</p>
        </div>
        <div>
          {" "}
          <img src={iconHealth} width="64px" height="64px" alt="virus" />
          <p>Zdraví</p>
        </div>
        <div>
          {" "}
          <img src={iconEconomy} width="64px" height="64px" alt="virus" />
          <p>Ekonomika</p>
        </div>
        <div>
          {" "}
          <img src={iconTrust} width="64px" height="64px" alt="virus" />
          <p>Důvěra</p>
        </div>
      </div>

      <Link className="navi__link" href="/">
        {" "}
        Zpět do menu
      </Link>
    </div>
  );
}
