

const { createProxyMiddleware } = require('http-proxy-middleware');

const productProxy = createProxyMiddleware({
    target: 'http://localhost:5005',
    changeOrigin: true,
    pathRewrite: (path, req) => {
      const originalPath = req.originalUrl
      const dynamicPart = originalPath.replace('/api-gateway/v1/payments/', '')
      return `/api/v1/payments/${dynamicPart}`
    },
    on: {
        proxyReq: (proxyReq, req, res) => {
          proxyReq.setHeader('user-id', req.userId)
        } 
      }
})

module.exports = productProxy
