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

  mangaApp.get("/", function (req, res) {
    mangaSource.getMangas().then(mangas => res.send(mangas), (message) => res.status(500).send(message));
  });

  mangaApp.get("/:manga", function (req, res) {
    mangaSource.getChapters(req.params.manga).then(chapters => res.send(chapters), (message) => res.status(500).send(message));
  });

  app.use(baseUrl, mangaApp);
});

app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}!`);
});