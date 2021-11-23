const CorsMiddleware = (req, res, next) => {
  res.header("access-control-allow-origin", "*");
  res.header("access-control-allow-methods", "POST, PUT, GET, DELETE, OPTIONS");
  res.header("access-control-allow-headers", "Origin, X-Request-With, Content-Type, Accept, Authorization");

  
  return next();
};

module.exports = CorsMiddleware;
