import React from "react";

const imgUrl = (img, { height, dpr }) => `https://res.cloudinary.com/topmonks/image/upload/f_auto,dpr_${dpr},h_${height},q_auto/v1589954414/korona-ceska.cz/illustrations/${img}.png`;

const imgSrcSet = (img, { height }) =>
  `${imgUrl(img, { height, dpr: 1 })} 1x,
   ${imgUrl(img, { height, dpr: 1.5 })} 1.5x,
   ${imgUrl(img, { height, dpr: 2 })} 2x`;

export default function Illustration({ img, alt }) {
  return (
    <picture>
      <source
        media="(max-height: 667px)"
        srcSet={imgSrcSet(img, { height: 162 })}/>
      <source
        media="(min-height: 668px) and (max-height: 735px)"
        srcSet={imgSrcSet(img, { height: 222 })}/>
      <source
        media="(min-height: 736px) and (max-height: 811px)"
        srcSet={imgSrcSet(img, { height: 262 })}/>
      <source
        media="(min-height: 812px) and (max-height: 1023px)"
        srcSet={imgSrcSet(img, { height: 280 })}/>
      <source
        media="(min-height: 1024px)"
        srcSet={imgSrcSet(img, { height: 420 })}/>
      <img className="illustration" alt={alt || img}
           src={imgUrl(img, { height: 162, dpr: "auto" })}
           width="480" height="640"/>
    </picture>
  );
}
