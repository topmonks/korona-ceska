import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { isLocalhost } from './library';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


try {
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  if (!isLocalhost()) {
    serviceWorker.register();

    // update service worker
    navigator.serviceWorker.addEventListener("controllerchange", (registration) => {
      registration.waiting.postMessage("skipWaiting");
    });
  }
} catch (errror) {
  console.warn('This has to be your fault.', errror)
}