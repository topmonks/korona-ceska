import React from "react";
import FadeIn from "react-fade-in";

const getIll = (img) => {
  try {
    return require(`./illustrations/${img}.png`)
  } catch (error) {
    console.warn('Unknown Illustration', { img });
  }
}

export default function Illustration({ img }) {
  return (
    <FadeIn>
      <img
        className="illustration"
        alt="person"
        src={getIll(img)}
      />
    </FadeIn>
  );
}
