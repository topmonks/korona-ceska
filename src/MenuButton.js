import React from "react";
import { Link } from "react-navi";
import { makeClass as css } from "./library";

export default function MenuButton({ onGameLeave, ...pass }) {

  return (
    <Link
      className={css(
        'menu-button',
      )}
      href="/"
      onClick={onGameLeave}
      {...pass}
    >
      MENU
    </Link>
  )
}