import assert from "assert";
import {isEmpty} from "lodash";

import Q from "q";

export default class MangaSource {
  constructor (name) {
    assert(!isEmpty(name));
    this.name = name;
  }

  getMangas () {
    return Q.reject("not implemented");
  }

  getChapters (manga) {
    return Q.reject(`not implemented for manga ${manga}`);
  }

  getPages (chapter) {
    return Q.reject(`not implemented for chapter ${chapter}`);
  }
}