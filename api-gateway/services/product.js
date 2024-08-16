

const { createProxyMiddleware } = require('http-proxy-middleware');

const productProxy = createProxyMiddleware({
    target: 'http://localhost:5003',
    changeOrigin: true,
    pathRewrite: (path, req) => {
      const dynamicPart = path.replace('/api-gateway/v1/products/', '')
      return `/api/v1/products/${dynamicPart}`
    },
    on: {
        proxyReq: (proxyReq, req, res) => {
          proxyReq.setHeader('user-id', req.userId)
        } 
      }
})

module.exports = productProxy







/*

const { createProxyMiddleware } = require('http-proxy-middleware');

const productProxy = createProxyMiddleware({
    target: 'http://localhost:5002/api/v1/product',
    changeOrigin: true,
    logger: console,
    on: {
        proxyReq: (proxyReq, req, res) => {
          console.log(req.userId)
          proxyReq.setHeader('user-id', req.userId)
        },
        proxyRes: (proxyRes, req, res) => {
          //console.log(proxyRes)
        },
        error: (err, req, res) => {
            console.log(err)
        },
      },
})

module.exports = productProxy


*/