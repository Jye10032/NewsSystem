const { createProxyMiddleware } = require('http-proxy-middleware') // 更改引入方式

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/ajax', {
      // 遇到api1前缀的请求，就会触发该代理配置
      target: 'https://i.maoyan.com', // 请求转发给谁
      changeOrigin: true, // 控制服务器收到的请求头中Host字段的值
      pathRewrite: { '^/ajax': '' }
    })
  )
}
