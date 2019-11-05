export default {
  name: 'nativeUI',
  canShare: () => {
    return navigator && navigator.share && typeof navigator.share === 'function'
  },
  share: async (title, text, url = window.location.href) => {
    return navigator.share({ title, text, url })
  },
  canVibrate: () => {
    return navigator && navigator.vibrate && typeof navigator.vibrate === 'function'
  },
  vibrate: duration => {
    navigator.vibrate(duration)
  }

}
