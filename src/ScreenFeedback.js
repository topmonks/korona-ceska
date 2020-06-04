import React, { useMemo, useRef, } from "react";
import ScreenButton from "./ScreenButton";
import { LAST_GAME_RECORD_STORAGE_KEY } from "./GameKorona";
import { getGameScreenLink } from "./library";
import "./styles/feedback.css";

export default function ScreenFeedback({ lastGameLog }) {
  const lastGameLogLine = useMemo(() => localStorage.getItem(LAST_GAME_RECORD_STORAGE_KEY) || "Ešťe nehrál.", []);
  const feedbackBackLink = getGameScreenLink('/hra/#bonus');


  const formRef = useRef();
  const handleSubmit = event => {
    event.preventDefault();
    formRef.current.submit();
  }

  return (
    <div className="screen screen--feedback" >
      <form
        action="https://formbotapp.com/dMeBswodfP3q61mFnPDe3Eui/default"
        method="POST"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <input type="hidden" name="formbot__redirect_uri" value={feedbackBackLink} />
        <div className="feedback-grid layout-wrapper full-screen">
          <div className="feedback-grid__header">
            <p>Pobavili jsme vás? Něco se nepovedlo? Máte dotaz? Nápad? Dejte nám vědět.</p>
          </div>
          <div className="feedback-grid__content">
            <input type="hidden" name="last-game" value={lastGameLogLine} />
            <textarea
              name="message"
              placeholder="Vaše zpráva ..."
            />
            <p>S vaši zprávou odešleme i průběh poslední hry, ať můžeme lépe pochopit případný problém.</p>

          </div>
          <div className="feedback-grid__footer">
            <div>
              <ScreenButton
                primary
                small
                onClick={handleSubmit}
                type="submit"
              >
                Odeslat
              </ScreenButton>
            </div>
            <div>
              <ScreenButton small>Zpět na menu</ScreenButton>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
