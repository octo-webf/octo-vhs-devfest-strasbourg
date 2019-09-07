const { InjectManifest } = require('workbox-webpack-plugin')

module.exports = {
  chainWebpack: (config) => {
    config
      .plugin('service-worker')
      .use(InjectManifest, [{
        swSrc: './src/sw.js',
        swDest: 'service-worker.js'
      }])
    return config
  }
}
