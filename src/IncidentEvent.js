import React from "react";

const getIll = (img) => {
  try {
    return require(`./illustrations/${img}.png`);
  } catch (error) {
    console.warn("Unknown Incident Illustration", { img });
  }
};

export default function IncidentEvent({ name, img, text }) {
  return (
    <div className="incident">
      <h4>{name}</h4>
      <p>{text}</p>
      <img style={{ height: 72, width: 72 }} alt="person" src={getIll(img)} />
    </div>
  );
}
