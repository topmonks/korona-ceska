import React from "react";
import ScreenButton from "./ScreenButton";

export default function ScreenFeedback() {
  const handleSubmit = event => {
    event.preventDefault(); // do not redirect to home
  }

  return (
    <div className="screen screen--feedback">
      <div className="feedback-grid">
        <div className="feedback-grid__header">
          <p>Pobavili jsme vás? Něco se nepovedlo? Máte dotaz? Nápad? Dejte nám vědět.</p>
        </div>
        <div className="feedback-grid__content">
          <textarea placeholder="Vaše zpráva ..."></textarea>
          <p>S vaši zprávou odešleme i průběh poslední hry, ať můžeme lépe pochopit případný problém.</p>
        </div>
        <div className="feedback-grid__footer">
          <div>
            <ScreenButton primary small onClick={handleSubmit}>Odeslat</ScreenButton>
          </div>
          <div>
            <ScreenButton small >Zpět na menu</ScreenButton>
          </div>
        </div>
      </div>
    </div>
  );
}
