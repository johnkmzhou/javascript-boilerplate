const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(createProxyMiddleware("http://localhost:3000/api"));
  app.use(createProxyMiddleware("http://localhost:3000/public"));
  app.use(createProxyMiddleware("http://localhost:3000/uploads"));
};
