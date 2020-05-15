import React from "react";
import { Link } from "react-navi";

export default function MainMenu() {
  return (
    <div className="main-menu">
      <Link className="main-menu__link" href="/hra">
        <b>Nová hra</b>
      </Link>
      <Link className="main-menu__link" href="/story">
        Příběh
      </Link>
      <Link className="main-menu__link" href="/help">
        pověda
      </Link>
      <Link className="main-menu__link" href="/credits">
        O autorech
      </Link>
    </div>
  );
}
