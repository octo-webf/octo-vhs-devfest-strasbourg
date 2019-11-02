const { InjectManifest } = require('workbox-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new InjectManifest({
        swSrc: './src/sw.js',
        swDest: 'service-worker.js'
      })
    ]
  }
}
