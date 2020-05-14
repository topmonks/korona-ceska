import React from "react";
import GameClient from "./GameClient";
import { Link } from "react-navi";

export default function ScreenGame() {
  return (
    <div style={{ flex: "1 1 100%" }}>
      <Link href="/"> Menu</Link>
      <GameClient />
    </div>
  );
}
