import React from "react";
import MainMenu from "./MainMenu";

export default function ScreenMenu({ route }) {
  return (
    <div className="screen screen--menu">
      <h1>Korona Česká</h1>
      <MainMenu />
    </div>
  );
}

