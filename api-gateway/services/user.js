const { createProxyMiddleware } = require('http-proxy-middleware');

const userProxy = createProxyMiddleware({
    target: 'http://localhost:5002',
    changeOrigin: true,
    pathRewrite: (path, req) => {
        const originalPath = req.originalUrl
        const dynamicPart = originalPath.replace('/api-gateway/v1/users/', '')
        return `/api/v1/users/${dynamicPart}`
    },
    on: {
        proxyReq: (proxyReq, req, res) => {
          proxyReq.setHeader('user-id', req.userId)
        }
      },
})






module.exports = userProxy