import React, { useEffect, useMemo } from "react";
import ScreenButton from "./ScreenButton";
import { resetBodyGamePlay, makeShareHandler, scrollToTop } from "./library";
import { setShowKoronaStoryNewbie, showKoronaStoryNewbie } from "./GameKorona";
import logoKorona from "./icons/logo.svg";

export default function ScreenMenu({ route }) {
  useEffect(resetBodyGamePlay(), []);
  useEffect(scrollToTop, []);
  const share = useMemo(makeShareHandler, []);

  return (
    <div className="screen screen--menu">
      <img className="logo--menu" src={logoKorona} alt="korona logo" />
      <div>
        <ScreenButton primary path="/hra">
          <b>Nová hra</b>
        </ScreenButton>
        {!showKoronaStoryNewbie() && (
          <ScreenButton
            onClick={() => {
              setShowKoronaStoryNewbie(true);
            }}
            path="/hra"
          >
            Začít s příběhem
          </ScreenButton>
        )}
        <ScreenButton path="/help">Nápověda</ScreenButton>
        <ScreenButton path="/credits">O autorech</ScreenButton>
        {share && (
          <ScreenButton onClick={() => share()}>
            <b>Sdílet</b>
          </ScreenButton>
        )}
      </div>
    </div>
  );
}
