import React, { useEffect } from "react";
import GameClient from "./GameClient";
import { setBodyGamePlay } from "./library";
// import { Link } from "react-navi";

export default function ScreenGame() {
  useEffect(setBodyGamePlay(), []);
  return (
    <div className="screen screen--game">
      {/* <Link href="/"> Menu</Link> */}
      <GameClient />
    </div>
  );
}
