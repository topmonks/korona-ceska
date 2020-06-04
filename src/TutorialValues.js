import React from "react";
import  "./styles/tutorial.css"

const valueLables = {
  virus: 'Epidemie',
  health: 'Zdraví',
  economy: 'Ekonomika',
  trust: 'Důvěra',
};
const valueImages = {
  virus: require('./icons/virus.svg'),
  health: require('./icons/health.svg'),
  economy: require('./icons/economy.svg'),
  trust: require('./icons/trust.svg'),
}

export default function TutorialValues({ virus, health, economy, trust }) {

  const value = type => (
    <div key={type} className={`tutorial-values__item tutorial-values__item--${type}`}>
      <img src={valueImages[type]} alt={`Ikona ${valueLables[type]}`} />
      <p className="tutorial-values__label">{valueLables[type]}</p>
    </div>
  );

  return (
    <div className="tutorial-values">
      {virus && value('virus')}
      {health && value('health')}
      {economy && value('economy')}
      {trust && value('trust')}
    </div>
  )
}

