import request from "request-promise";
import cheerio from "cheerio";

export default (url) => {
    return request({
        uri: url,
        transform (body) {
            return cheerio.load(body);
        }
    });
};