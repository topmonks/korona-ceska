import React, { useMemo } from "react";
import {
  getAnswerCardField,
  isEventCard,
  isStoryCard,
  makeClass as css,
} from "./library";
import Illustration from "./Illustration";
import { useTransition, animated, config } from 'react-spring';



export default function Card({ card, answer, effect, week }) {
  const isIncident = useMemo(() => isEventCard(card), [card]);
  const isStory = useMemo(() => isStoryCard(card), [card]);


  const transitions = useTransition(`${week}-${effect}-${card?.img}`, p => p, {
    from: { opacity: 1, transform: 'scale(0.8)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.9)', display: 'none' },
    config: { ...config.wobbly, friction: 22 }
  });

  const cardWeekNumber = !isStory ? <div className="card__week">{week}. týden</div> : null;


  if (effect) {
    return (
      <div className="card card--effect">
        {cardWeekNumber}
        {transitions.map(({ props, key }) => (
          <animated.div key={key} style={props} className="card__content">
            <p className="card__text card__text--effect">
              "{getAnswerCardField(card, answer, "effect")}"
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
      {transitions.map(({ props, key }) => (
        <animated.div key={key} style={props} className="card__content">
          {!isIncident && card.img && (
            <div
              className={css("card__img", isStory && "card__img--story")}
            >
              <Illustration img={card.img} />
            </div>
          )}
          <h3 className="card__name">
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
