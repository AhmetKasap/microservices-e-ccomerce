

const { createProxyMiddleware } = require('http-proxy-middleware');

const productProxy = createProxyMiddleware({
    target: 'http://localhost:5004',
    changeOrigin: true,
    pathRewrite: (path, req) => {
      const originalPath = req.originalUrl
      const dynamicPart = originalPath.replace('/api-gateway/v1/baskets/', '')
      return `/api/v1/baskets/${dynamicPart}`
    },
    on: {
        proxyReq: (proxyReq, req, res) => {
          proxyReq.setHeader('user-id', req.userId)
        } 
      }
})

module.exports = productProxy
