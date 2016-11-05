import _ from "lodash";
import express from "express";
import logger from "../lib/logger";
import MangaSources from "../lib/MangaSources";
import mangaSourceUrl from "./mangaSourceUrl";
import mangaSourceRouter from "./mangaSourceRouter";
import requestLogger from "./requestLogger";

let PORT = process.env.PORT || 8100;
let app = express();

app.use(requestLogger.begin);
app.get("/", availableMangaSources);
routeMangaSources();
app.use(requestLogger.end);
app.use(requestLogger.error);

app.listen(PORT, "0.0.0.0", function () {
  logger.info(`Server started on port ${PORT}!`);
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