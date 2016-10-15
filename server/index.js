import _ from "lodash";
import express from "express";
import MangaSources from "../lib/MangaSources";
import mangaSourceUrl from "./mangaSourceUrl";
import mangaSourceRouter from "./mangaSourceRouter";
import requestLogger from "./requestLogger";

let PORT = process.env.PORT || 8100;
let app = express();

app.use(requestLogger.start);
app.get("/", availableMangaSources);

routeMangaSources();

app.use(requestLogger.stop);
app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}!`);
});

function availableMangaSources (req, res, next) {
  res.send(_.map(MangaSources, function (mangaSource) {
    return {
      name: mangaSource.name,
      url: mangaSourceUrl(mangaSource)
    };
  }));
  next();
}

function routeMangaSources () {
  _.each(MangaSources, function (mangaSource) {
    app.use(mangaSourceUrl(mangaSource), mangaSourceRouter(mangaSource));
  });
}