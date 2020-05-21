import React, { useEffect } from "react";
import ScreenButton from "./ScreenButton";
import { resetBodyGamePlay } from "./library";

export default function ScreenMenu({ route }) {
  useEffect(resetBodyGamePlay(), []);
  return (
    <div className="screen screen--menu">
      <h1>Korona Česká</h1>
      <div>
        <ScreenButton primary path="/hra">
          <b>Nová hra</b>
        </ScreenButton>
        <ScreenButton path="/help">
          Nápověda
        </ScreenButton>
        <ScreenButton path="/credits">
          O autorech
        </ScreenButton>
      </div>
    </div>
  );
}

