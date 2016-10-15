import logger from "../lib/logger";

export default { begin, end, error };

function begin (req, res, next) {
  req.requestTime = Date.now();
  next();
}

function end (req, res, next) {
  logger.info(res.statusCode, req.ip, req.originalUrl, Date.now() - req.requestTime);
  next();
}

function error (error, req, res, next) {
  logger.error(500, req.ip, req.originalUrl, Date.now() - req.requestTime, error);
  res.status(500).send(error);
  next();
}