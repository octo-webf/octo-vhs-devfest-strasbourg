/* eslint no-undef: 0 */
workbox.core.skipWaiting()
workbox.core.clientsClaim()

workbox.precaching.precacheAndRoute(self.__precacheManifest)

workbox.routing.registerRoute(
  /^(https:\/\/api-octovhs.herokuapp.com\/(.)*\/categories\/(.)*\/videos\/)/,
  new workbox.strategies.StaleWhileRevalidate({
    plugins: [new workbox.cacheableResponse.Plugin({ statuses: [0, 200] })]
  }),
  'GET'
)
workbox.routing.registerRoute(
  /^(https:\/\/api-octovhs.herokuapp.com\/categories)/,
  new workbox.strategies.CacheFirst({
    plugins: [new workbox.cacheableResponse.Plugin({ statuses: [0, 200] })]
  }),
  'GET'
)
const bgSyncPlugin = new workbox.backgroundSync.Plugin('analytics', {
  maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
})

workbox.routing.registerRoute(
  /.*analytics.*/,
  new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin]
  }),
  'GET'
)
