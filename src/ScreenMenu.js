import React from "react";
import { Link } from "react-navi";

export default function ScreenMenu({ route }) {
  return (
    <div className="container">
      <h1>Korona Česká</h1>
      <div className="mainMenu">
        <Link className="mainMenu__link" href="/hra">
          <b>Nová hra</b>
        </Link>
        <Link className="mainMenu__link" href="/story">
          Příběh
        </Link>
        <Link className="mainMenu__link" href="/help">
          Nápověda
        </Link>
        <Link className="mainMenu__link" href="/credits">
          O autorech
        </Link>
      </div>
    </div>
  );
}
