import assert from "assert";
import {isNull} from "util";

export default class MangaSource {
  constructor (name) {
    assert(!isNull(name));
    this.name = name;
  }
}