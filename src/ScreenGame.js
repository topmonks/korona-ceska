import React, { useEffect, useRef } from "react";
import GameClient from "./GameClient";
import { setBodyGamePlay } from "./library";

export default function ScreenGame() {
  useEffect(setBodyGamePlay(), []);
  const gameRef = useRef(null)

  return (
    <div className="screen screen--game">
      <GameClient ref={gameRef} />
    </div>
  );
}
