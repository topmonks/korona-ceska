import React, { useMemo } from "react";
import {
  isEventCard,
  isStoryCard,
  makeClass as css,
} from "./library";
import { illustrationStyles } from "./Illustration";
import { useTransition, animated, config } from "react-spring";

export default function Card({ card, effect, week }) {
  const isIncident = useMemo(() => isEventCard(card), [card]);
  const isStory = useMemo(() => isStoryCard(card), [card]);

  const transitionsForIllustrations = useTransition(
    `text-${week}-${effect}-${card?.img}`,
    (p) => p,
    {
      from: { opacity: 0, transform: "scale(0.98)" },
      enter: { opacity: 1, transform: "scale(1)" },
      leave: { opacity: 0, transform: "scale(0)", display: "none" },
      config: { ...config.melasses },
    }
  );
  const transitionsForTextContents = useTransition(
    `${week}-${effect}-${card?.img}`,
    (p) => p,
    {
      from: { opacity: 0, transform: "scale(1)" },
      enter: { opacity: 1, transform: "scale(1)" },
      leave: { opacity: 0, transform: "scale(1)", display: "none" },
      config: { ...config.wobbly, friction: 22, duration: 250 },
    }
  );

  const cardWeekNumber = !isStory ? (
    <div className="card__week">{week}. týden</div>
  ) : null;

  if (effect) {
    return (
      <div className="card card--effect">
        {cardWeekNumber}
        {transitionsForTextContents.map(({ props, key }) => (
          <animated.div
            key={key}
            style={props}
            className="card__animated card__animated--text"
          >
            <p className="card__text card__text--effect">
              "{effect}"
            </p>
          </animated.div>
        ))}
      </div>
    );
  }

  if (!card) {
    return null;
  }

  return (
    <div
      className={css(
        "card",
        isIncident && "card--incident",
        isStory && "card--story"
      )}
    >
      {cardWeekNumber}

      {!isIncident &&
        card.img &&
        transitionsForIllustrations.map(({ props, key }) => (
          <animated.div
            key={key}
            className="card__animated card__animated--image"
            style={Object.assign({}, props, illustrationStyles(card.img))}
          /> // ^ it's background image
        ))}

      {transitionsForTextContents.map(({ props, key }) => (
        <animated.div
          key={key}
          style={props}
          className="card__animated card__animated--text"
        >
          <h3 className={css("card__name", isStory && "card__name--story")}>
            {card.name}
          </h3>
          <p
            className={css("card__text", isStory && "card__text--story")}
            dangerouslySetInnerHTML={{ __html: card.text }}
          />
        </animated.div>
      ))}
    </div>
  );
}
