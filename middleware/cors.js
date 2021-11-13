const CorsMiddleware = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "POST, PUT, GET, DELETE, OPTIONS");
  res.header("access-control-allow-headers", "Origin, X-Request-With, Content-Type, Accept, Authorization");

  
  return next();
};

module.exports = CorsMiddleware;
