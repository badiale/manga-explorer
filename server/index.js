import url from "url";

import express from "express";
import MangaSources from "../lib/MangaSources";

let PORT = process.env.PORT || 8100;
let app = express();

app.get("/", function (req, res) {
  res.send(MangaSources);
});

Object.keys(MangaSources).forEach(function (key) {
  let mangaSource = MangaSources[ key ];
  let baseUrl = url.resolve("/", mangaSource.name);
  let mangaApp = express();

  mangaApp.get("/", promiseRequest(function () {
    return mangaSource.getMangas();
  }));

  mangaApp.get("/:manga", promiseRequest(function (req) {
    return mangaSource.getChapters(req.params.manga);
  }));

  mangaApp.get("/:manga/:chapter", promiseRequest(function (req) {
    return mangaSource.getPages(req.params.manga, req.params.chapter);
  }));

  function promiseRequest(callback) {
    return function (req, res) {
      callback(req, res).then(result => res.send(result), (message) => res.status(500).send(message));
    };
  }

  app.use(baseUrl, mangaApp);
});

app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}!`);
});