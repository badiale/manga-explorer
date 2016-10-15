export default {start, stop};

function start(req, res, next) {
  req.requestTime = Date.now();
  next();
}

function stop(req, res, next) {
  console.log(res.statusCode, req.ip, req.originalUrl, Date.now() - req.requestTime);
  next();
}