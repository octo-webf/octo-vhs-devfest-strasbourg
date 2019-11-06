import context from 'jest-plugin-context'
import nativeUI from '../nativeUI'
import { stub } from 'sinon'

describe('#nativeUI', () => {
  describe('#share', () => {
    const defaultUrl = 'http://toto'
    let shareStub
    beforeEach(() => {
      shareStub = stub().resolves()
      global.navigator.share = shareStub

      const url = defaultUrl
      // DEVNOTE : SIBE : only way founded to stub the location
      Object.defineProperty(global.window, 'location', {
        value: {
          href: url
        }
      })
    })
    context('#with a given url', () => {
      it('should call navigator.share once', async () => {
        const title = 'titre'
        const text = 'texte'
        const url = 'http://localhost'
        await nativeUI.share(title, text, url)
        expect(shareStub.calledOnce).toBe(true)
      })
      it('should call navigator.share with a formed object with url, title and text', async () => {
        const title = 'titre'
        const text = 'texte'
        const url = 'http://localhost'
        const expectedObject = { text, title, url }
        await nativeUI.share(title, text, url)
        expect(shareStub.firstCall.args[0]).toEqual(expectedObject)
      })
    })
    context('#without any given url', () => {
      it('should call navigator.share once', async () => {
        const title = 'titre'
        const text = 'texte'
        await nativeUI.share(title, text)
        expect(shareStub.calledOnce).toBe(true)
      })
      it('should call navigator.share with a formed object with the window.location.href url, title and text', async () => {
        const title = 'titre'
        const text = 'texte'
        const url = defaultUrl
        const expectedObject = { text, title, url }
        await nativeUI.share(title, text)
        expect(shareStub.firstCall.args[0]).toEqual(expectedObject)
      })
    })
  })
})
