import { shallowMount } from '@vue/test-utils'
import context from 'jest-plugin-context'
import VideoLayout from '..'

describe('VideoLayout.vue', () => {
  global.navigator.share = async () => {}
  context('Basic mounts', () => {
    describe('Without any props', () => {
      it('should mount the component', async () => {
        const wrapper = await shallowMount(VideoLayout, {
        })
        expect(wrapper).toBeDefined()
      })
    })
    describe('With basics props', () => {
      const title = 'the video title'
      const video = {}
      const infos = {}
      const playing = false
      const fullScreened = false

      const propsData = { title, video, infos, playing, fullScreened }
      it('should mount the component', async () => {
        const wrapper = await shallowMount(VideoLayout, {
          propsData
        })
        expect(wrapper).toBeDefined()
      })
    })
  })
  context('clickable emit', () => {
    let wrapper
    const title = 'the video title'
    const video = {}
    const infos = {}
    const playing = false
    const fullScreened = false

    const propsData = { title, video, infos, playing, fullScreened }
    beforeEach(async () => {
      wrapper = await shallowMount(VideoLayout, {
        propsData
      })
    })
    describe('preview button', () => {
      const selector = '[data-test=preview-button]'
      it('should emit preview event', () => {
        const clickableElement = wrapper.find(selector)
        clickableElement.trigger('click')
        expect(wrapper.emitted().preview).toBeTruthy()
      })
      describe('preview button', () => {
        it('should have a clickable style', () => {
          const clickableElement = wrapper.find(selector)
          expect(clickableElement.classes()).toContain('clickable')
        })
      })
    })
    describe('player-slider-input', () => {
      const selector = '[data-test=player-slider-input]'
      it('should emit moveTimeEvent with the sended value', () => {
        const clickableElement = wrapper.find(selector)
        const emittedValue = 375
        clickableElement.value = emittedValue
        wrapper.vm.currentTime = emittedValue
        clickableElement.trigger('change', emittedValue)
        expect(wrapper.emitted().timeChange).toBeTruthy()
        expect(wrapper.emitted().timeChange.length).toBe(1)
        expect(wrapper.emitted().timeChange[0][0] < 0).toBe(false)
        expect(wrapper.emitted().timeChange[0][0]).toEqual(emittedValue)
      })
      describe('preview button', () => {
        it('should have a clickable style', () => {
          const clickableElement = wrapper.find(selector)
          expect(clickableElement.html()).toContain('class="clickable')
        })
      })
    })
    describe('playable main button', () => {
      const selector = '[data-test=playable-main-button]'
      it('should emit playOrPause', () => {
        const clickableElement = wrapper.find(selector)
        clickableElement.trigger('click')
        expect(wrapper.emitted().playOrPause).toBeTruthy()
      })
      describe('preview button', () => {
        it('should have a clickable style', () => {
          const clickableElement = wrapper.find(selector)
          expect(clickableElement.classes()).toContain('clickable')
        })
      })
    })
    describe('share button', () => {
      const selector = '[data-test=share-button]'
      it('should emit share', () => {
        const clickableElement = wrapper.find(selector)
        clickableElement.trigger('click')
        expect(wrapper.emitted().share).toBeTruthy()
      })
      describe('share button', () => {
        it('should have a clickable style', () => {
          const clickableElement = wrapper.find(selector)
          expect(clickableElement.classes()).toContain('clickable')
        })
      })
    })
    describe('playable button', () => {
      const selector = '[data-test=playable-button]'
      it('should emit playOrPause', () => {
        const clickableElement = wrapper.find(selector)
        clickableElement.trigger('click')
        expect(wrapper.emitted().playOrPause).toBeTruthy()
      })
      describe('preview button', () => {
        it('should have a clickable style', () => {
          const clickableElement = wrapper.find(selector)
          expect(clickableElement.classes()).toContain('clickable')
        })
      })
    })
    describe('back in time button', () => {
      const selector = '[data-test=back-time-button]'
      it('should emit moveTimeEvent with a negative value of -10', () => {
        const clickableElement = wrapper.find(selector)
        clickableElement.trigger('click')
        expect(wrapper.emitted().moveTime).toBeTruthy()
        expect(wrapper.emitted().moveTime.length).toBe(1)
        expect(wrapper.emitted().moveTime[0][0] < 0).toBe(true)
        expect(wrapper.emitted().moveTime[0][0]).toEqual(-10)
      })
      describe('preview button', () => {
        it('should have a clickable style', () => {
          const clickableElement = wrapper.find(selector)
          expect(clickableElement.classes()).toContain('clickable')
        })
      })
    })
    describe('next in time button', () => {
      const selector = '[data-test=next-time-button]'
      it('should emit moveTimeEvent with a positive value of 10', () => {
        const clickableElement = wrapper.find(selector)
        clickableElement.trigger('click')
        expect(wrapper.emitted().moveTime).toBeTruthy()
        expect(wrapper.emitted().moveTime.length).toBe(1)
        expect(wrapper.emitted().moveTime[0][0] < 0).toBe(false)
        expect(wrapper.emitted().moveTime[0][0]).toEqual(10)
      })
      describe('preview button', () => {
        it('should have a clickable style', () => {
          const clickableElement = wrapper.find(selector)
          expect(clickableElement.classes()).toContain('clickable')
        })
      })
    })
    describe('download button', () => {
      const selector = '[data-test=download-button]'
      it('should emit download', () => {
        const clickableElement = wrapper.find(selector)
        clickableElement.trigger('click')
        expect(wrapper.emitted().download).toBeTruthy()
      })
      describe('preview button', () => {
        it('should have a clickable style', () => {
          const clickableElement = wrapper.find(selector)
          expect(clickableElement.classes()).toContain('clickable')
        })
      })
    })
    describe('screen change button', () => {
      const selector = '[data-test=screen-change-button]'
      it('should emit changeScreenSize', () => {
        const clickableElement = wrapper.find(selector)
        clickableElement.trigger('click')
        expect(wrapper.emitted().changeScreenSize).toBeTruthy()
      })
      describe('preview button', () => {
        it('should have a clickable style', () => {
          const clickableElement = wrapper.find(selector)
          expect(clickableElement.classes()).toContain('clickable')
        })
      })
    })
  })
  context('displayer', () => {
    let wrapper
    const title = 'the video title'
    const video = { duration: 255 }
    const infos = { currentTime: 15, volume: 0.5 }
    const playing = false
    const fullScreened = false

    const propsData = { title, video, infos, playing, fullScreened }
    beforeEach(async () => {
      wrapper = await shallowMount(VideoLayout, {
        propsData
      })
    })
    describe('progressbar video', () => {
      const selector = '[data-test=player-slider-input]'
      it('should display the slider element', () => {
        const displayableElement = wrapper.find(selector)
        expect(displayableElement.exists()).toBeTruthy()
      })
      it('should have the max value as video.duration', () => {
        const displayableElement = wrapper.find(selector)
        expect(displayableElement.html()).toContain('max="' + video.duration + '"')
      })
      it('should have the value as currentTime', () => {
        const displayableElement = wrapper.find(selector)
        expect(displayableElement.element.value).toBe(infos.currentTime.toString())
      })
      it('should not update value of currentTime when updateTime is not called', () => {
        const newTime = 42
        const oldTime = infos.currentTime
        const displayableElement = wrapper.find(selector)
        expect(displayableElement.element.value).toBe(infos.currentTime.toString())
        infos.currentTime = newTime
        expect(displayableElement.element.value).toBe(oldTime.toString())
      })
      it('should update value of currentTime when updateTime is called', () => {
        const newTime = 42
        const displayableElement = wrapper.find(selector)
        expect(displayableElement.element.value).toBe(infos.currentTime.toString())
        infos.currentTime = newTime
        wrapper.vm.updateTime()
        expect(displayableElement.element.value).toBe(newTime.toString())
      })
    })
    describe('progressbar audio', () => {
      const selector = '[data-test=audio-slider-input]'
      it('should display the slider element', () => {
        const displayableElement = wrapper.find(selector)
        expect(displayableElement.exists()).toBeTruthy()
      })
      it('should have the value as volume', () => {
        const displayableElement = wrapper.find(selector)
        expect(displayableElement.element.value).toBe(infos.volume.toString())
      })
      it('should not update value of currentVolume when updateVolume is not called', () => {
        const newVolume = 1
        const oldVolume = infos.volume
        const displayableElement = wrapper.find(selector)
        expect(displayableElement.element.value).toBe(infos.volume.toString())
        infos.volume = newVolume
        expect(displayableElement.element.value).toBe(oldVolume.toString())
      })
      it('should update value of currentVolume when updateVolume is called', () => {
        const newVolume = 1
        const displayableElement = wrapper.find(selector)
        expect(displayableElement.element.value).toBe(infos.volume.toString())
        infos.Volume = newVolume
        wrapper.vm.updateVolume()
        expect(displayableElement.element.value).toBe(newVolume.toString())
      })
    })
  })
})
