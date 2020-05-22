import React from "react";
import images from "./cloudinary.json";

const screenSizes = [
  ["(max-height: 455px)", 32],
  ["(min-height: 456px) and (max-height: 555px)", 136],
  ["(min-height: 556px) and (max-height: 667px)", 162],
  ["(min-height: 668px) and (max-height: 735px)", 202],
  ["(min-height: 736px) and (max-height: 811px)", 242],
  ["(min-height: 812px) and (max-height: 1023px)", 260],
  ["(min-height: 1024px)", 400]
];

function addTransformations(src, dpr, height) {
  return src.replace("upload", `upload/f_auto,dpr_${dpr},h_${height},q_auto`);
}

export function* getIllustrationsUrls(dpr) {
  for (let {secure_url: src} of Object.values(images)) {
    for (let [media, height] of screenSizes) {
      if (window.matchMedia(media).matches) {
        yield addTransformations(src, dpr, height);
      }
    }
  }
}

const imgUrl = (img, { height, dpr }) => {
  const src = images[`illustrations/${img}.png`]["secure_url"];
  return addTransformations(src, dpr, height);
};

const imgSrcSet = (img, { height, dpr = window.devicePixelRatio }) =>
  `${imgUrl(img, { height, dpr: 1 })} 1x,
   ${imgUrl(img, { height, dpr: 1.5 })} 1.5x,
   ${imgUrl(img, { height, dpr })} ${dpr}x`;

export default function Illustration({ img, alt }) {
  return (
    <picture>
      {screenSizes.map(([media, height]) => (
        <source key={height}
          media={media}
          srcSet={imgSrcSet(img, { height })}/>
      ))}
      <img className="illustration" alt={alt || img}
           src={imgUrl(img, { height: 640, dpr: "auto" })}
           width="480" height="640"/>
    </picture>
  );
}

