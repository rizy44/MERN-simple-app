const {
  httpRequestsTotal,
  httpRequestDurationSeconds,
} = require("./metrics");

const METRICS_PATH = "/metrics";

function getRouteLabel(req) {
  if (req.baseUrl && req.route && req.route.path) {
    return `${req.baseUrl}${req.route.path}`;
  }

  if (req.route && req.route.path) {
    return req.route.path;
  }

  return "unmatched";
}

function httpMetrics(req, res, next) {
  if ((req.path || "").startsWith(METRICS_PATH)) {
    return next();
  }

  const method = req.method;
  const stopTimer = httpRequestDurationSeconds.startTimer();

  res.on("finish", () => {
    const route = getRouteLabel(req);
    const statusCode = String(res.statusCode);

    httpRequestsTotal.inc({
      method,
      route,
      status_code: statusCode,
    });

    stopTimer({
      method,
      route,
      status_code: statusCode,
    });
  });

  next();
}

module.exports = httpMetrics;
