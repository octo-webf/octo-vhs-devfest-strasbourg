import store from '../store'

export default {
  name: 'swUtils',

  setAppOnlineStatus () {
    store.dispatch('setOnlineStatus', navigator.onLine)
  },
  setUpdateAvailable () {
    store.dispatch('setUpdateAvailable')
  }
}
