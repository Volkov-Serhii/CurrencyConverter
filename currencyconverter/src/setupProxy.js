const { createProxyMiddleware } = require('http-proxy-middleware');

const context =  [
    '/NBU_Exchange',
    '/NBUStatService'
  ];

  module.exports = function(app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://bank.gov.ua',
        changeOrigin: true,
    });
  
    app.use(appProxy);
  };