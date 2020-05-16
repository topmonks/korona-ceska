import React from "react";

const getIll = (img) => {
  try {
    return require(`./illustrations/${img}.png`);
  } catch (error) {
    console.warn("Unknown Incident Illustration", { img });
  }
};

export default function IncidentEvent({ name, img, text, onConfirm }) {
  const handleConfirm = event => {
    event.preventDefault();
    setImmediate(onConfirm);
  }
  return (
    <div className="game-incident">
      <h4>{name}</h4>
      <p>{text}</p>
      <img style={{ height: 72, width: 72 }} alt="person" src={getIll(img)} />
      <button onClick={handleConfirm}>OK, co se da delat</button>
    </div>
  );
}
