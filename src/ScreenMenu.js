import React from 'react';
import { Link } from 'react-navi';


export default function ScreenMenu({ route }) {

  return (
    <div>
      <h1>{route.title}</h1>
      <Link href="/hra">Nova Hra</Link>
      <Link href="/story">Story</Link>
      <Link href="/help">Help</Link>
      <Link href="/credits">Credits</Link>
    </div>
  );
}