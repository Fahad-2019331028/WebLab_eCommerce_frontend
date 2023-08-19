const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/API',
    createProxyMiddleware({
      target: 'http://localhost:8000',
      changeOrigin: true,
    })
  );
  app.use(
    '/bankAPI',
    createProxyMiddleware({
      target: 'http://localhost:9000',
      changeOrigin: true,
    })
  );
};