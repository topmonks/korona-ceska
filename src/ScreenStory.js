import React from "react";
import { Link } from "react-navi";
import GameStory from "./GameStory";

export default function ScreenStory({ route }) {
  return (
    <div className="screen screen--story">
      <h1>{route.title}</h1>

      <Link className="navi__link" href="/">
        Zpět do menu
      </Link>
      <GameStory />
    </div>
  );
}
