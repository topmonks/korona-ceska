import React from "react";
import { Link } from "react-navi";
import { makeClass as css } from "./library";

export default function GameMenuButton({ onGameLeave, ...pass }) {

  return (
    <div
      className={css(
        'menu-button',
      )}
    >
      <Link
        href="/"
        onClick={onGameLeave}
        {...pass}
      >
        MENU
      </Link>
    </div>
  )
}