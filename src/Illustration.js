import React from "react";

const getIll = (img) => {
  try {
    return require(`./illustrations/${img}.png`)
  } catch (error) {
    console.warn('Unknown Illustration', { img });
  }
}

export default function Illustration({ img }) {
  return (
    <img
      className="illustration"
      style={{ height: "320px" }}
      alt="person"
      src={getIll(img)}
    />
  );
}
