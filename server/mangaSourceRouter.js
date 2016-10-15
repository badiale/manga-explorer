import express from "express";
import logger from "../lib/logger";

export default function mangaSourceRouter (mangaSource) {
  let app = express();

  app.get("/", promiseRequest(function () {
    return mangaSource.getMangas();
  }));

  app.get("/:manga", promiseRequest(function (req) {
    return mangaSource.getChapters(req.params.manga);
  }));

  app.get("/:manga/:chapter", promiseRequest(function (req) {
    return mangaSource.getPages(req.params.manga, req.params.chapter);
  }));

  function promiseRequest (callback) {
    return function (req, res, next) {
      callback(req, res).then(result => {
        res.send(result);
        next();
      }, message => {
        logger.error(req.ip, req.originalUrl, message);
        res.status(500).send(message);
        next();
      });
    };
  }

  return app;
}
