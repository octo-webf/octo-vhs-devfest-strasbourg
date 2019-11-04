import { shallowMount, createLocalVue } from '@vue/test-utils'
import context from 'jest-plugin-context'
import Vuex from 'vuex'
import SwInformations from '../'
const offlineMessage = 'Vous naviguez actuellement en mode hors ligne.'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('SwInformations', () => {
  let wrapper, store
  const defaultGetters = { isOffline: () => false }

  describe('default', () => {
    beforeEach(() => {
      store = new Vuex.Store({
        getters: { ...defaultGetters }
      })
      wrapper = shallowMount(SwInformations, { store, localVue })
    })

    it('should mount the component', () => {
      expect(wrapper).toBeDefined()
      expect(wrapper.exists()).toBe(true)
    })
  })
  describe('display', () => {
    context('When the application is offline', () => {
      beforeEach(() => {
        const isOffline = () => true
        const getters = { ...defaultGetters, isOffline }
        store = new Vuex.Store({ getters })
        wrapper = shallowMount(SwInformations, { store, localVue })
      })
      it('should display offline message', () => {
        expect(wrapper.html()).toContain(offlineMessage)
      })
    })
    context('When the application is online', () => {
      beforeEach(() => {
        const getters = { ...defaultGetters }
        store = new Vuex.Store({ getters })
        wrapper = shallowMount(SwInformations, { store, localVue })
      })
      it('should not display offline message', () => {
        expect(wrapper.html()).not.toContain(offlineMessage)
      })
    })
  })
})
