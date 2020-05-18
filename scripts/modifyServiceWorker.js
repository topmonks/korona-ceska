// Adds update event listener to generated service-worker.js

const fs = require("fs");

fs.readFile("build/service-worker.js", "utf8", (err, data) => {
  if (err) return console.error(err);

  const snippet = `
addEventListener('install', () => {
  skipWaiting();
});
addEventListener('activate', e => {
  e.waitUntil(workbox.core.clientsClaim());
});
  `;

  const result = data.replace(
    "workbox.core.clientsClaim();",
    `workbox.core.clientsClaim();\n${snippet}`
  );

  fs.writeFile("build/service-worker.js", result, "utf8", readError => {
    if (readError) return console.log(readError);
  });
});
