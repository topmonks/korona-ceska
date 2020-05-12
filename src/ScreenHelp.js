import React from "react";
import { Link } from "react-navi";

export default function ScreenHelp({ route }) {
  return (
    <div>
      <h1>Nápověda</h1>

      <Link className="navi__link" href="/">
        {" "}
        Zpět do menu
      </Link>
    </div>
  );
}
