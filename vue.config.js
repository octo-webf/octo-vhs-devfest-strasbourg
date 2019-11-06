const WorkboxPlugin = require('workbox-webpack-plugin')
const OCTO_VHS_API = 'https://api-octovhs.herokuapp.com'
const urlAPIToCache = `(${OCTO_VHS_API}/categories/(.)*/videos)`

module.exports = {
  configureWebpack: {
    plugins: [
      new WorkboxPlugin.GenerateSW({
        swDest: 'service-worker.js',
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            urlPattern: new RegExp(`^${urlAPIToCache}$`),
            handler: 'networkFirst',
            options: {
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
      )
    ]
  }
}
