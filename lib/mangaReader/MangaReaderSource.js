import url from "url";
import _ from "lodash";
import Q from "q";

import fetch from "../fetch-html";
import MangaSource from "../MangaSource";

class MangaReaderSource extends MangaSource {
  constructor () {
    super("manga-reader");
  }

  getMangas () {
    return fetch("http://www.mangareader.net/alphabetical").then(($) => {
      return _.map($("ul.series_alpha > li > a"), (link) => {
        var $link = $(link);
        return { text: $link.text().trim(), code: encodeURIComponent($link.attr("href")) };
      });
    });
  }

  getChapters (manga) {
    return fetch(url.resolve("http://www.mangareader.net/", decodeURIComponent(manga))).then(($) => {
      return _.map($("#listing").find("tr.table_head ~ tr"), (line) => {
        var $line = $(line);
        return {
          text: $line.find("td:nth-child(1)").text().trim(),
          code: encodeURIComponent($line.find("a").attr("href")),
          added: $line.find("td:nth-child(2)").text().trim()
        };
      });
    });
  }

  getPages (chapter) {
    let baseUrl = url.resolve("http://www.mangareader.net/", decodeURIComponent(chapter));
    let defer = Q.defer();
    fetch(baseUrl).then(($) => {
      let totalPages = parseInt($("#pageMenu").find("option:last-child").text().trim(), 10);
      defer.notify("[");
      (function asyncLoop (pageNumber, pageUrl) {
        if (pageNumber === totalPages) {
          defer.notify("]");
          return defer.resolve();
        }
        if (pageNumber > 0) {
          defer.notify(",");
        }

        fetch(pageUrl).then($ => {
          let $img = $("#img");
          let nextPageUrl = url.resolve("http://www.mangareader.net/", $img.parent().attr("href"));
          let page = {
            pageNumber,
            pageUrl,
            image: url.resolve("http://www.mangareader.net/", $img.attr("src")),
            width: $img.attr("width"),
            height: $img.attr("height"),
            nextPageUrl
          };
          defer.notify(JSON.stringify(page));
          asyncLoop(pageNumber + 1, nextPageUrl);
        }).catch(defer.reject);
      })(0, baseUrl);

    });
    return defer.promise;
  }
}

export default new MangaReaderSource();