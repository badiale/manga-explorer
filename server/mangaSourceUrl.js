import url from "url";

export default function (mangaSource) {
  return url.resolve("/", mangaSource.name);
}