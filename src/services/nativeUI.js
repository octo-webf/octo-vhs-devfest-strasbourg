export default {
  name: 'nativeUI',

  share: async (title, text, url = window.location.href) => {
    return navigator.share({ title, text, url })
  }
}
