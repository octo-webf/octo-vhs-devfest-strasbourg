import { actions, getters, mutations } from './store'
import context from 'jest-plugin-context'
import { stub } from 'sinon'

const { setOnlineStatus, setUpdateAvailable } = actions
const { isOutdated, isOffline } = getters
const { SET_OUTDATED_STATUS, SET_ONLINE_STATUS } = mutations

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

    describe('#SET_OUTDATED_STATUS', () => {
      it('should update the state of outdated from false to true', () => {
        const state = { outdated: false }
        SET_OUTDATED_STATUS(state, true)
        expect(state.outdated).toEqual(true)
      })
      it('should update the state of outdated from true to false', () => {
        const state = { outdated: true }
        SET_OUTDATED_STATUS(state, false)
        expect(state.outdated).toEqual(false)
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

    describe('#isOutdated', () => {
      context('When the app is outdated', () => {
        beforeEach(() => {
          state = { outdated: true }
        })
        it('should return true', () => {
          const outdatedResult = isOutdated(state)
          expect(outdatedResult).toBe(true)
        })
      })
      context('When the app is not outdated', () => {
        beforeEach(() => {
          state = { outdated: false }
        })
        it('should return false', () => {
          const outdatedResult = isOutdated(state)
          expect(outdatedResult).toBe(false)
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
    describe('#setUpdateAvailable', () => {
      it('should commit SET_OUTDATED_STATUS with true value', async () => {
        const commitName = 'SET_OUTDATED_STATUS'
        const sendedValue = true
        const args = [commitName, sendedValue]
        await setUpdateAvailable({ commit })
        expect(commit.calledOnce).toBe(true)
        expect(commit.firstCall.args).toEqual(args)
      })
    })
  })
})
