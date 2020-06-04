import React from "react";
import { Link } from "react-navi";
import { makeClass as css } from "./library";
import "./styles/screen-button.css";

export default function ScreenButton({ children: title, path = '/', href, primary = false, small = false, ...pass }) {
  return (
    <Link
      className={css(
        'screen-button',
        primary && 'screen-button--primary',
        small && 'screen-button--small'
      )}
      href={href || path}
      {...pass}
    >
      {title}
    </Link>
  )
}
