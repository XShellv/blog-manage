const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: process.env.PROXY_HOST,
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/",
      },
    })
  );
};
