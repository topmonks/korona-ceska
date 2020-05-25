import React from "react";
import { Link } from "react-navi";
import { makeClass as css } from "./library";
import iconBurger from './icons/burger.svg';

export default function MenuButton({ ...pass }) {
  return (
    <Link
      className={css(
        'menu-button',
      )}
      href="/"
      {...pass}
    >
      <img src={iconBurger} alt="Menu burger" />
    </Link>
  )
}