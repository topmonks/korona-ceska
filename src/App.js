import React from "react";
import { mount, route, redirect } from "navi";
import { Router, View, NotFoundBoundary, Link } from "react-navi";
import { Helmet, HelmetProvider } from 'react-navi-helmet-async'
import { getIllustrationsUrls } from "./Illustration";

const screen = (name) => require(`./Screen${name}`).default;

const routes = mount({
  "/": route({
    title: "Korona Česká",
    view: screen("Menu"),
  }),
  "/hra": route({
    title: "Korona Česká",
    view: screen("Game"),
  }),
  "/help": route({
    title: "Korona Česká",
    view: screen("Help"),
  }),
  "/credits": route({
    title: "Korona Česká",
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

const linkElement = (href, i) => (<link key={i} rel="preload" as="image" href={href} />);

const preloadUrls = () => {
  const dpr = window.devicePixelRatio;
  return Array.from(getIllustrationsUrls(dpr))
}

export default function Application() {
  const env = document.querySelector("meta[name=environment]").getAttribute("content");
  const openBeta = window.location.search === "?beta";
  if (env === "production" && !openBeta) {
    return (
      <>
        <h1 style={{ textAlign: "center" }}>Korona Česká</h1>
        <div style={{
          height: "66vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 16px"
        }}>
          <img
            alt="Korona Česká"
            src="/korona-fb-teaser.png"
            title="Již brzy vás tady něco čeká!"
            style={{ maxWidth: "800px", width: "100%", height: "auto" }}
            width="1200" height="628" />
        </div>
      </>
    )
  }



  return (
    <HelmetProvider>
      <Router routes={routes}>
        <NotFoundBoundary render={renderNotFound}>
          <div className="app">
            <Helmet>
              {preloadUrls().map(linkElement)}
            </Helmet>
            <View />
          </div>
        </NotFoundBoundary>
      </Router>
    </HelmetProvider>
  );
}
