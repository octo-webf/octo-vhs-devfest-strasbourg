const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new WorkboxPlugin.GenerateSW({
        swDest: 'service-worker.js',
        clientsClaim: true,
        skipWaiting: true
      }
      )
    ]
  }
}
