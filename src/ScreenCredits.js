import React from "react";
import { Link } from "react-navi";

export default function ScreenCredits({ route }) {
  return (
    <div>
      <h1>{route.title}</h1>

      <Link className="navi__link" href="/">
        {" "}
        Zpět do menu
      </Link>
    </div>
  );
}
