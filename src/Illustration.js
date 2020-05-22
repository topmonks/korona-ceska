import React from "react";
import images from "./cloudinary.json";

const screenSizes = [
  ["only screen and (max-height: 455px)", 100],
  ["only screen and (min-height: 456px) and (max-height: 555px)", 126],
  ["only screen and (min-height: 556px) and (max-height: 667px)", 162],
  ["only screen and (min-height: 668px) and (max-height: 735px)", 202],
  ["only screen and (min-height: 736px) and (max-height: 811px)", 242],
  ["only screen and (min-height: 812px) and (max-height: 1023px)", 260],
  ["only screen and (min-height: 1024px)", 400]
];

function addTransformations(src, dpr, height) {
  return src.replace("upload", `upload/f_auto,dpr_${dpr},h_${height},q_auto`);
}

export function* getIllustrationsUrls(dpr) {
  for (let { secure_url: src } of Object.values(images)) {
    for (let [media, height] of screenSizes) {
      if (window.matchMedia(media).matches) {
        yield addTransformations(src, dpr, height);
      }
    }
  }
}

const imgUrl = (img, { dpr }) => {
  const src = images[`illustrations/${img}.png`]["secure_url"];
  for (let [media, height] of screenSizes) {
    if (window.matchMedia(media).matches) {
      return addTransformations(src, dpr, height);
    }
  }
};

export default function Illustration({ img, alt }) {
  const dpr = window.devicePixelRatio;
  return (
    <img className="illustration" alt={alt || img}
         srcSet={`${imgUrl(img, { dpr })} ${dpr}x`}
         width="480" height="640" />
  );
}

