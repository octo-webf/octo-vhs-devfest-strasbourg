/* eslint no-unused-expressions: 0 */
import Video from '../Video.vue'
import { shallowMount } from '@vue/test-utils'
import sinon from 'sinon'
import octotvServices from '../../services/octotv'

describe('Video.vue', () => {
  let sandbox,
    octotvserviceGetVideoInformationsStub,
    octotvserviceGetVideoURLStub,
    windowStub

  const stubs = { 'video-layout': true }

  beforeEach(() => {
    sandbox = sinon.createSandbox()
    windowStub = sinon.stub()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('Without any video information on the localStorage nor in the service on success request', () => {
    const emptyList = {}
    const videoResult = emptyList
    const videoURL = ''

    beforeEach(() => {
      localStorage.videos = JSON.stringify(videoResult)
      octotvserviceGetVideoInformationsStub = sandbox.stub(octotvServices, 'getVideoInformations').returns(Promise.resolve(videoResult))
      octotvserviceGetVideoURLStub = sandbox.stub(octotvServices, 'getVideoURL').returns(Promise.resolve(videoURL))
    })

    it('should mount the component', async () => {
      const wrapper = await shallowMount(Video, {
        computed: {
          videoId: () => 1
        },
        stubs
      })
      expect(wrapper).toBeDefined()
    })
    it('should call the information getter of octotv service once on mount', async () => {
      await shallowMount(Video, {
        computed: {
          videoId: () => 1
        },
        stubs
      })
      expect(octotvserviceGetVideoInformationsStub.calledOnce).toBe(true)
    })
    it('should call the URL getter of octotv service once on mount', async () => {
      global.window.addEventListener = windowStub
      await shallowMount(Video, {
        computed: {
          videoId: () => 1
        },
        stubs: ['video-layout']
      })
      expect(windowStub.called).toBe(true)
    })
    it('should call the URL getter of octotv service once on mount', async () => {
      const wrapper = await shallowMount(Video, {
        computed: {
          videoId: () => 1
        },
        stubs
      })
      // WORKAROUND : the finally is not awaited so I set the end of the load manually
      wrapper.vm.status.apiLoaded = true
      expect(octotvserviceGetVideoURLStub.called).toBe(true)
    })
  })
})
