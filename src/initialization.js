import swUtils from './services/swUtils'

function initServiceWorker () {
  window.addEventListener('online', swUtils.setAppOnlineStatus)
  window.addEventListener('offline', swUtils.setAppOnlineStatus)
  swUtils.setAppOnlineStatus()
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
    })
  }
}
initServiceWorker()
