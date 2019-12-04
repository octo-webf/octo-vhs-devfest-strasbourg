import context from 'jest-plugin-context'
import swUtils from '../swUtils'
import store from '../../store'
import { stub, restore } from 'sinon'

describe('#setAppOnlineStatus', () => {
  beforeEach(() => {
    store.dispatch = stub()
  })
  afterEach(() => {
    store.dispatch = restore()
  })
  describe('#swUtils', () => {
    describe('#setAppOnlineStatus', () => {
      context('Navigator is offline', () => {
        beforeEach(() => {
          navigator.__defineGetter__('onLine', () => false)
        })
        it('should call store.dispatch Once', () => {
          swUtils.setAppOnlineStatus()
          expect(store.dispatch.calledOnce).toBe(true)
        })
        it('should have call dispatch setAppOnlineStatus with "false" args', () => {
          swUtils.setAppOnlineStatus()
          expect(store.dispatch.firstCall.args[0]).toBe('setOnlineStatus')
          expect(store.dispatch.firstCall.args[1]).toBe(false)
        })
      })
      context('Navigator is online', () => {
        beforeEach(() => {
          navigator.__defineGetter__('onLine', () => true)
        })
        it('should call store.dispatch Once', () => {
          swUtils.setAppOnlineStatus()
          expect(store.dispatch.calledOnce).toBe(true)
        })
        it('should have call dispatch setAppOnlineStatus with "true" args', () => {
          swUtils.setAppOnlineStatus()
          expect(store.dispatch.firstCall.args[0]).toBe('setOnlineStatus')
          expect(store.dispatch.firstCall.args[1]).toBe(true)
        })
      })
    })

    describe('#setUpdateAvailable', () => {
      it('should call store.dispatch Once', () => {
        swUtils.setUpdateAvailable()
        expect(store.dispatch.calledOnce).toBe(true)
      })
      it('should have call dispatch setUpdateAvailable', () => {
        swUtils.setUpdateAvailable()
        expect(store.dispatch.firstCall.args[0]).toBe('setUpdateAvailable')
      })
    })
  })
})
