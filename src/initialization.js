import swUtils from './services/swUtils'
import { register } from 'register-service-worker'

function initServiceWorker () {
  window.addEventListener('online', swUtils.setAppOnlineStatus)
  window.addEventListener('offline', swUtils.setAppOnlineStatus)
  swUtils.setAppOnlineStatus()
  if ('serviceWorker' in navigator) {
    register(`${process.env.BASE_URL}service-worker.js`, {
      updated () {
        swUtils.setUpdateAvailable()
      },
      offline () {
        console.log('No internet connection found. App is running in offline mode.')
      }
    })
  }
}
initServiceWorker()
