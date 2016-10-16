import request from "request-promise";
import cheerio from "cheerio";
import Q from "q";

import logger from "./logger";

export default (url) => {
  let retries = 0;
  return req(url).catch((e) => {
    if (retries < 5) {
      logger.warn(`Try ${retries}: failed to retrieve url "${url}"`, e);
      retries++;
      return req(url);
    }
    return Q.reject(e);
  });
};

function req (url) {
  return request({
    uri: url,
    transform (body) {
      return cheerio.load(body);
    }
  });
}