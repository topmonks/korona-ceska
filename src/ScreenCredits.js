import React from "react";
import { Link } from "react-navi";
import logo from "./icons/tm-logo.svg";

export default function ScreenCredits({ route }) {
  return (
    <div className="screen screen--credits">
      <h1>O autorech</h1>
      <div className="screen--credits__logo">
        Hru vytvořila společnost{" "}
        <a
          href="https://www.topmonks.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          TopMonks s.r.o.
        </a>
        <div>
          <a
            href="https://www.topmonks.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={logo} alt="topmonks logo" height="64px" />
          </a>
        </div>
      </div>
      <div className="screen--credits__row">
        <h3>Dan Hromada</h3>
        <p>Programování</p>
      </div>
      <div className="screen--credits__row">
        <h3>Radek Jakl</h3>
        <p>Ilustrace, grafika a herní design</p>
      </div>
      <div className="screen--credits__row">
        <h3>Josef Tětek</h3>
        <p>Herní design a texty</p>
      </div>
      <div className="screen--credits__row">
        <h3>Lea Petrášová</h3>
        <p>Projekt, texty</p>
      </div>

      <Link className="navi__link screen--credits__button" href="/">
        Zpět do menu
      </Link>
    </div>
  );
}
