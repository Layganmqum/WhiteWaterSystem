module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://v.juhe.cn',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api' : ""
        }
      }
    }
  }
}