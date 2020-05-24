import React from "react";
import { Link } from "react-navi";
import { makeClass as css } from "./library";

export default function ScreenButton({ children: title, path = '/', href, primary = false, ...pass }) {
  return (
    <Link
      className={css(
        'screen-button',
        primary && 'screen-button--primary'
      )}
      href={href || path}
      {...pass}
    >
      {title}
    </Link>
  )
}