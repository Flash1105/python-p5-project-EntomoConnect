const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use( 
        '/api/observations',
        createProxyMiddleware({
            target: 'http://127.0.0.1:5555/',
            pathRewrite: {
                '^/api/observations': '/api/observations',
            },
            changeOrigin: true,
        })
    );
    app.use( 
        '/api/discussions',
        createProxyMiddleware({
            target:  'http://127.0.0.1:5555/',
            pathRewrite: {
                '^/api/discussions': '/api/discussions',
            },
            changeOrigin: true,
        })
    );
};