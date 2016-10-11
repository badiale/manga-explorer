import assert from "assert";
import {isNull} from "util";

import Q from "q";

export default class MangaSource {
  constructor (name) {
    assert(!isNull(name));
    this.name = name;
  }

  getMangas() {
    return Q.reject("not implemented");
  }

  getChapters(manga) {
    return Q.reject("not implemented for manga " + manga);
  }

  getPages(chapter) {
    return Q.reject("not implemented for chapter " + chapter);
  }
}