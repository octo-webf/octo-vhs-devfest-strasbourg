export default {
  name: 'nativeUI',
  canShare: () => {
    return navigator && navigator.share && typeof navigator.share === 'function'
  },
  share: async (title, text, url = window.location.href) => {
    return navigator.share({ title, text, url })
  }
}
