import React from "react";

export default function Illustration({ img }) {
  return <img alt="person" src={require(`./illustrations/${img}.png`)} />;
}
