import React from "react";
import { Link } from "react-navi";

export default function ScreenMenu({ route }) {
  return (
    <div className="screen screen--menu">
      <h1>Korona Česká</h1>
      <div className="main-menu">
        <Link className="main-menu__link" href="/hra">
          <b>Nová hra</b>
        </Link>
        <Link className="main-menu__link" href="/story">
          Příběh
        </Link>
        <Link className="main-menu__link" href="/help">
          Nápověda
        </Link>
        <Link className="main-menu__link" href="/credits">
          O autorech
        </Link>
      </div>
    </div>
  );
}
