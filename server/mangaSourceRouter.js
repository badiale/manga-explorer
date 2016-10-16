import express from "express";
import _ from "lodash";
import mangaSourceUrl from "./mangaSourceUrl";

export default function mangaSourceRouter (mangaSource) {
  let app = express();

  app.get("/", promiseRequest(function () {
    return mangaSource.getMangas().then(mangas => {
      return _.map(mangas, manga => {
        manga.link = mangaSourceUrl(mangaSource) + "/" + manga.code;
        return manga;
      });
    });
  }));

  app.get("/:manga", promiseRequest(function (req) {
    return mangaSource.getChapters(req.params.manga).then(chapters => {
      return _.map(chapters, chapter => {
        chapter.link = mangaSourceUrl(mangaSource) + "/chapter/" + chapter.code;
        return chapter;
      });
    });
  }));

  app.get("/chapter/:chapter", promiseRequest(function (req) {
    return mangaSource.getPages(req.params.chapter);
  }));

  function promiseRequest (callback) {
    return function (req, res, next) {
      res.type("json");
      callback(req, res).then(result => {
        res.send(result);
        next();
      }, next, part => {
        res.write(part);
      });
    };
  }

  return app;
}
