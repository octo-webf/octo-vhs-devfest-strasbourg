import { shallowMount, createLocalVue } from '@vue/test-utils'
import context from 'jest-plugin-context'
import { stub } from 'sinon'
import Vuex from 'vuex'
import swInformations from '../'
const outdatedMessage = 'Une mise à jour est disponible, cliquez sur le block pour mettre à jour l\'application.'
const offlineMessage = 'Vous naviguez actuellement en mode hors ligne.'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('swInformations', () => {
  let wrapper, store
  const defaultGetters = { isOutdated: () => false, isOffline: () => false }

  describe('default', () => {
    beforeEach(() => {
      store = new Vuex.Store({
        getters: { ...defaultGetters }
      })
      wrapper = shallowMount(swInformations, { store, localVue })
    })

    it('should mount the component', () => {
      expect(wrapper).toBeDefined()
      expect(wrapper.exists()).toBe(true)
    })
  })
  describe('methods', () => {
    beforeEach(() => {
      store = new Vuex.Store({
        getters: { ...defaultGetters }
      })
      wrapper = shallowMount(swInformations, { store, localVue })
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
  describe('display', () => {
    context('When the application is offline and up to date', () => {
      beforeEach(() => {
        const isOffline = () => true
        const getters = { ...defaultGetters, isOffline }
        store = new Vuex.Store({ getters })
        wrapper = shallowMount(swInformations, { store, localVue })
      })
      it('should display offline message', () => {
        expect(wrapper.html()).toContain(offlineMessage)
      })
      it('should not display outdated message', () => {
        expect(wrapper.html()).not.toContain(outdatedMessage)
      })
    })
    context('When the application is online and outdated', () => {
      beforeEach(() => {
        const isOutdated = () => true
        const getters = { ...defaultGetters, isOutdated }
        store = new Vuex.Store({ getters })
        wrapper = shallowMount(swInformations, { store, localVue })
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
        wrapper = shallowMount(swInformations, { store, localVue })
      })
      it('should not display html on the component', () => {
        expect(wrapper.html()).toBe(undefined)
      })
    })
    context('When the application is offline and outdated', () => {
      const isOutdated = () => true
      const isOffline = () => true
      beforeEach(() => {
        const getters = { ...defaultGetters, isOffline, isOutdated }
        store = new Vuex.Store({ getters })
        wrapper = shallowMount(swInformations, { store, localVue })
      })
      it('should display offline message', () => {
        expect(wrapper.html()).toContain(offlineMessage)
      })
      it('should display outdated message', () => {
        expect(wrapper.html()).toContain(outdatedMessage)
      })
    })
  })
  describe('#events', () => {
    let updatePage, selectedElement
    const selector = '.information__block'
    beforeEach(() => {
      updatePage = stub()
    })
    context('When the application is offline and up to date', () => {
      beforeEach(() => {
        const isOffline = () => true
        const getters = { ...defaultGetters, isOffline }
        store = new Vuex.Store({ getters })
        wrapper = shallowMount(swInformations, { methods: { updatePage }, store, localVue })
        selectedElement = wrapper.find(selector)
      })
      it('should not call updatePage on click', () => {
        selectedElement.trigger('click')
        expect(updatePage.called).toBe(false)
      })
    })
    context('When the application is online and outdated', () => {
      beforeEach(() => {
        const isOutdated = () => true
        const getters = { ...defaultGetters, isOutdated }
        store = new Vuex.Store({ getters })
        wrapper = shallowMount(swInformations, { methods: { updatePage }, store, localVue })
        selectedElement = wrapper.find(selector)
      })
      it('should call updatePage on click', () => {
        selectedElement.trigger('click')
        expect(updatePage.calledOnce).toBe(true)
      })
    })
    context('When the application is offline and outdated', () => {
      const isOutdated = () => true
      const isOffline = () => true
      beforeEach(() => {
        const getters = { ...defaultGetters, isOffline, isOutdated }
        store = new Vuex.Store({ getters })
        wrapper = shallowMount(swInformations, { methods: { updatePage }, store, localVue })
        selectedElement = wrapper.find(selector)
      })
      it('should call updatePage on click', () => {
        selectedElement.trigger('click')
        expect(updatePage.calledOnce).toBe(true)
      })
    })
  })
})
