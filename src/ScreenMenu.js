import React from "react";
import ScreenButton from "./ScreenButton";

export default function ScreenMenu({ route }) {
  return (
    <div className="screen screen--menu">
      <h1>Korona Česká</h1>
      <div>
        <ScreenButton primary path="/hra">
          <b>Nová hra</b>
        </ScreenButton>
        <ScreenButton primary path="/help">
          Nápověda
        </ScreenButton>
        <ScreenButton primary path="/credits">
          O autorech
        </ScreenButton>
      </div>
    </div>
  );
}

