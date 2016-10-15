import logger from "../lib/logger";

export default {start, stop};

function start(req, res, next) {
  req.requestTime = Date.now();
  next();
}

function stop(req, res, next) {
  logger.info(res.statusCode, req.ip, req.originalUrl, Date.now() - req.requestTime);
  next();
}