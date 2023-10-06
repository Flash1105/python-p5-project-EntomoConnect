const { createProxyMiddleware} = require('http-proxy-middleware');

module.export = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5555',
            changeOrigin: true
        })
    );
};