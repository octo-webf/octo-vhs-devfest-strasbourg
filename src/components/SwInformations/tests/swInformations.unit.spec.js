import { shallowMount, createLocalVue } from '@vue/test-utils'
import context from 'jest-plugin-context'
import { stub } from 'sinon'
import Vuex from 'vuex'
import SwInformations from '../'
const offlineMessage = 'Vous naviguez actuellement en mode hors ligne.'
const outdatedMessage = 'Une mise à jour est disponible, cliquez sur le block pour mettre à jour l\'application.'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('SwInformations', () => {
  let wrapper, store
  const defaultGetters = { isOffline: () => false, isOutdated: () => false }

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
    context('When the application is offline and up to date', () => {
      beforeEach(() => {
        const isOffline = () => true
        const getters = { ...defaultGetters, isOffline }
        store = new Vuex.Store({ getters })
        wrapper = shallowMount(SwInformations, { store, localVue })
      })
      it('should display offline message', () => {
        expect(wrapper.html()).toContain(offlineMessage)
      })
      it('should not display outdated message', () => {
        expect(wrapper.html()).not.toContain(outdatedMessage)
      })
    })
    context('When the application is offline and and outdated', () => {
      beforeEach(() => {
        const isOffline = () => true
        const isOutdated = () => true
        const getters = { ...defaultGetters, isOffline, isOutdated }
        store = new Vuex.Store({ getters })
        wrapper = shallowMount(SwInformations, { store, localVue })
      })
      it('should display offline message', () => {
        expect(wrapper.html()).toContain(offlineMessage)
      })
      it('should display outdated message', () => {
        expect(wrapper.html()).toContain(outdatedMessage)
      })
    })
    context('When the application is online and outdated', () => {
      beforeEach(() => {
        const isOutdated = () => true
        const getters = { ...defaultGetters, isOutdated }
        store = new Vuex.Store({ getters })
        wrapper = shallowMount(SwInformations, { store, localVue })
      })
      it('should not display offline message', () => {
        expect(wrapper.html()).not.toContain(offlineMessage)
      })
      it('should display outdated message', () => {
        expect(wrapper.html()).toContain(outdatedMessage)
      })
    })
    context('When the application is online and up to date', () => {
      beforeEach(() => {
        const getters = { ...defaultGetters }
        store = new Vuex.Store({ getters })
        wrapper = shallowMount(SwInformations, { store, localVue })
      })
      it('should not display offline message', () => {
        expect(wrapper.html()).not.toContain(offlineMessage)
      })
      it('should not display outdated message', () => {
        expect(wrapper.html()).not.toContain(outdatedMessage)
      })
    })
  })

  describe('methods', () => {
    beforeEach(() => {
      store = new Vuex.Store({
        getters: { ...defaultGetters }
      })
      wrapper = shallowMount(SwInformations, { store, localVue })
    })
    describe('#updatePage', () => {
      let windowStub
      beforeEach(() => {
        windowStub = stub()
        global.window.location.reload = windowStub
        expect(windowStub.called).toBe(false)
      })
      afterEach(() => {
      })
      it('should call window.location.reload()', () => {
        wrapper.vm.updatePage()
        expect(windowStub.calledOnce).toBe(true)
      })
    })
  })
})
