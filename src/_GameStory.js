import React from 'react';
import SwipeableViews from 'react-swipeable-views';

const styles = {
  slide: {
    width: '100%', height: '100%'
  },
  slide1: {
    background: '#FEA900',
  },
  slide2: {
    background: '#B3DC4A',
  },
  slide3: {
    background: '#6AC0FF',
  },
};

export default function GameStory({ route, onFinish }) {
  const handleFinish = event => {
    event.preventDefault();
    setImmediate(onFinish);
  }
  return (
    <SwipeableViews className="game-story">
      <div style={Object.assign({}, styles.slide, styles.slide1)}>
        <button onClick={handleFinish}>Přeskočit</button>
      </div>
      <div style={Object.assign({}, styles.slide, styles.slide2)}>
        slide n°2
      </div>
      <div style={Object.assign({}, styles.slide, styles.slide3)}>
        slide n°3
      </div>
    </SwipeableViews>
  );
}
