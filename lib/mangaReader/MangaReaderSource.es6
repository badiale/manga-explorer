import url from "url";
import _ from "lodash";

import fetch from "../fetch-html";
import MangaSource from "../MangaSource";

class MangaReaderSource extends MangaSource {
  constructor () {
    super("manga-reader");
  }

  getMangas () {
    let baseUrl = "http://www.mangareader.net/alphabetical";
    return fetch(baseUrl).then(($) => {
      return _.map($("ul.series_alpha > li > a"), (link) => {
        var $link = $(link);
        return { text: $link.text().trim(), link: url.resolve(baseUrl, $link.attr("href")) };
      });
    });
  }

  getChapters (manga) {
    let baseUrl = url.resolve("http://www.mangareader.net/", manga);
    console.log(manga, baseUrl);
    return fetch(baseUrl).then(($) => {
      console.log("here");
      var collection = $("#listing").find("tr.table_head ~ tr");
      console.log(manga, baseUrl, collection.size());
      return _.map(collection, (line) => {
        var $line = $(line);
        return {
          text: $line.find("td:nth-child(2)").text().trim(),
          link: url.resolve(baseUrl, $line.find("a").attr("href")),
          added: $line.find("td:last").text().trim()
        };
      });
    });
  }
}

export default new MangaReaderSource();