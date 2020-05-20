import React from "react";
import images from "./cloudinary.json";

const screenSizes = [
  ["only screen and (max-height: 667px)", 162],
  ["only screen and (min-height: 668px) and (max-height: 735px)", 222],
  ["only screen and (min-height: 736px) and (max-height: 811px)", 262],
  ["only screen and (min-height: 812px) and (max-height: 1023px)", 280],
  ["only screen and (min-height: 1024px)", 420]
];

function addTransformations(src, dpr, height) {
  return src.replace("upload", `upload/f_auto,dpr_${dpr},h_${height},q_auto`);
}

export function* getIllustrationsUrls(dpr) {
  for (let key in images) {
    for (let [media, height] of screenSizes) {
      if (window.matchMedia(media).matches) {
        const src = images[key]["secure_url"];
        yield addTransformations(src, dpr, height);
      }
    }
  }
}

const imgUrl = (img, { height, dpr }) => {
  const src = images[`illustrations/${img}.png`]["secure_url"];
  return addTransformations(src, dpr, height);
};

const imgSrcSet = (img, { height }) =>
  `${imgUrl(img, { height, dpr: window.devicePixelRatio })}`;

export default function Illustration({ img, alt }) {
  return (
    <picture>
      {screenSizes.map(([media, height]) => (
        <source key={height}
          media={media}
          srcSet={imgSrcSet(img, { height })}/>
      ))}
      <img className="illustration" alt={alt || img}
           src={imgUrl(img, { height: 162, dpr: "auto" })}
           width="480" height="640"/>
    </picture>
  );
}

