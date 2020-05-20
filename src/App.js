import React from "react";
import { mount, route, redirect } from "navi";
import { Router, View, NotFoundBoundary, Link } from "react-navi";
import { Helmet, HelmetProvider } from 'react-navi-helmet-async'
import { getIllustrationsUrls } from "./Illustration";

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
  "/credits": route({
    title: "Credits",
    view: screen("Credits"),
  }),
  "index.html": redirect("/")
});

const renderNotFound = () => (
  <div>
    <h1>404</h1>
    <Link href="/">Zpět na menu</Link>
  </div>
);

const linkElement = (href, i) => (<link key={i} rel="prefetch" as="image" href={href} />);

const prefetchUrls = () => {
  const dpr = window.devicePixelRatio;
  return Array.from(getIllustrationsUrls(dpr))
}

export default function Application() {
  console.log(prefetchUrls())
  return (
    <HelmetProvider>
      <Router routes={routes}>
        <NotFoundBoundary render={renderNotFound}>
          <div className="app">
            <Helmet>
              {prefetchUrls().map(linkElement)}
            </Helmet>
            <View />
          </div>
        </NotFoundBoundary>
      </Router>
    </HelmetProvider>
  );
}
