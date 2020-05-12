import React from "react";
import { mount, route } from "navi";
import { Router, View, NotFoundBoundary, Link } from "react-navi";

const screen = (name) => require(`./Screen${name}`).default;

const routes = mount({
  "/": route({
    title: "Menu",
    view: screen("Menu"),
  }),
  "/hra": route({
    title: "Hra",
    view: screen("Game"),
  }),
  "/help": route({
    title: "Help",
    view: screen("Help"),
  }),
  "/story": route({
    title: "Příběh",
    view: screen("Story"),
  }),
  "/credits": route({
    title: "Credits",
    view: screen("Credits"),
  }),
});

const renderNotFound = () => (
  <div>
    <h1>404</h1>
    <Link href="/">Zpet na menu</Link>
  </div>
);

export default function Applicaiton() {
  return (
    <Router routes={routes}>
      <NotFoundBoundary render={renderNotFound}>
        <div className="app">
          <View />
        </div>
      </NotFoundBoundary>
    </Router>
  );
}
