// const path = require('path')

module.exports = {
  outputDir: './build',
  devServer: {
    port: 4120,
    proxy: {
      '/api': {
        target: 'http://152.136.185.210:6000/',
        pathRewrite: {
          '^/api': ''
        },
        ws: true,
        changeOrigin: true
      }
    }
  }
}
