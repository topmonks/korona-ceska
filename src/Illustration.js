import React from "react";

export default function Illustration({ img }) {
  return (
    <img
      style={{ height: "320px" }}
      alt="person"
      src={require(`./illustrations/${img}.png`)}
    />
  );
}
