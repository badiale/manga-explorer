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
    return fetch(baseUrl).then(($) => {
      let totalPages = parseInt($("#pageMenu").find("option:last-child").text().trim(), 10);
      let pages = [];

      return (function asyncLoop (pageNumber, pageUrl) {
        if (pageNumber === totalPages) {
          return Q.resolve(pages);
        }
        return fetch(pageUrl).then($ => {
          let $img = $("#img");
          var nextPageUrl = url.resolve("http://www.mangareader.net/", $img.parent().attr("href"));
          pages.push({
            pageNumber,
            pageUrl,
            image: url.resolve("http://www.mangareader.net/", $img.attr("src")),
            width: $img.attr("width"),
            height: $img.attr("height"),
            nextPageUrl
          });
          return asyncLoop(pageNumber + 1, nextPageUrl);
        });
      })(0, baseUrl);
    });
  }
}

export default new MangaReaderSource();