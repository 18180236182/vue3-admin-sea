// const path = require('path')

module.exports = {
  outputDir: './build',
  devServer: {
    port: 4120,
    proxy: {
      '/api': {
        target: 'http://192.168.0.110:10719/',
        pathRewrite: {
          '^/api': ''
        },
        ws: true,
        changeOrigin: true
      }
    }
  }
}
