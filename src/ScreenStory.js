import React from 'react';
import { Link } from 'react-navi';


export default function ScreenStory({ route }) {

  return (
    <div>
      <h1>{route.title}</h1>

      <Link href="/"> Zpet na Menu</Link>
    </div>
  );
}