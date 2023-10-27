const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/festatic',
        createProxyMiddleware({
            target: 'https://obj.pipi.cn',
            changeOrigin: true,
        })
    );
};