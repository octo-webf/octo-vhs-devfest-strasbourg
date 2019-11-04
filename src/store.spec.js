import { actions, getters, mutations } from './store'
import context from 'jest-plugin-context'
import { stub } from 'sinon'

const { setOnlineStatus } = actions
const { isOffline } = getters
const { SET_ONLINE_STATUS } = mutations

describe('store', () => {
  context('mutations', () => {
    describe('#SET_ONLINE_STATUS', () => {
      it('should update the state of online from false to true', () => {
        const state = { online: false }
        SET_ONLINE_STATUS(state, true)
        expect(state.online).toEqual(true)
      })
      it('should update the state of online from true to false', () => {
        const state = { online: true }
        SET_ONLINE_STATUS(state, false)
        expect(state.online).toEqual(false)
      })
    })
  })

  context('getters', () => {
    let state
    describe('#isOffline', () => {
      context('When the app is online', () => {
        beforeEach(() => {
          state = { online: true }
        })
        it('should return false (isOffline)', () => {
          const onlineResult = isOffline(state)
          expect(onlineResult).toBe(false)
        })
      })
      context('When the app is not online', () => {
        beforeEach(() => {
          state = { online: false }
        })
        it('should return true (isOffline)', () => {
          const onlineResult = isOffline(state)
          expect(onlineResult).toBe(true)
        })
      })
    })
  })

  context('#actions', () => {
    let commit
    beforeEach(() => {
      commit = stub()
    })
    describe('#setOnlineStatus', () => {
      context('with an online value', () => {
        it('should commit SET_ONLINE_STATUS with true value', async () => {
          const commitName = 'SET_ONLINE_STATUS'
          const sendedValue = true
          const args = [commitName, sendedValue]
          await setOnlineStatus({ commit }, sendedValue)
          expect(commit.calledOnce).toBe(true)
          expect(commit.firstCall.args).toEqual(args)
        })
      })
      context('with an offline value', () => {
        it('should commit SET_ONLINE_STATUS with false value', async () => {
          const commitName = 'SET_ONLINE_STATUS'
          const sendedValue = false
          const args = [commitName, sendedValue]
          await setOnlineStatus({ commit }, sendedValue)
          expect(commit.calledOnce).toBe(true)
          expect(commit.firstCall.args).toEqual(args)
        })
      })
    })
  })
})
