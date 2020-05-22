import React, { useEffect, useState, useRef } from "react";
import GameClient from "./GameClient";
import { setBodyGamePlay } from "./library";


export default function ScreenGame() {
  useEffect(setBodyGamePlay(), []);
  const [key, setKey] = useState(null)
  const gameRef = useRef(null)

  return (
    <div className="screen screen--game">
      <GameClient
        ref={gameRef} key={key}
        onGameReset={() => {
          setKey((Math.random() * 1000).toString())
          setImmediate(() => {
            gameRef.current.client.reset();
            gameRef.current.client.events.setPhase('player');
          })
        }}
      />
    </div>
  );
}
