<script>
export default {
  name: 'VideoLayout',
  props: {
    title: String,
    video: Object,
    playing: Boolean,
    fullScreened: Boolean,
    infos: Object
  },
  data () {
    return {
      currentTime: this.infos && this.infos.currentTime,
      currentVolume: this.infos && this.infos.volume
    }
  },
  computed: {
    canShare () {
      return navigator && navigator.share
    }
  },
  methods: {
    updateTime () {
      this.currentTime = this.infos && this.infos.currentTime
    },
    updateVolume () {
      this.currentVolume = this.infos && this.infos.volume
    }
  }
}
</script>

<template>
    <div class="overlay">
        <div
            id="top_overlay"
            class="clickable"
            @click="$emit('preview')"
            data-test="preview-button"
            >
            <div id="firstTop">
                {{title}}
            </div>
            <div id="secondTop">
                <img alt="play" src="../../assets/pictos/back.svg">
                Retour
            </div>
        </div>
        <div
            id="playing_overlay"
            @click="$emit('playOrPause')"
            class="clickable"
            data-test="playable-main-button"
            :class="{ display: !playing }"
            >
            <img alt="play" src="../../assets/pictos/circle-play.svg">
        </div>
        <nav id="bottom_overlay">
            <span class="timer">{{infos && Math.round(infos.currentTime)}}/{{infos && Math.round(this.video.duration)}}</span>
            <input
                @keydown.prevent=""
                class="clickable progress"
                ref="playerSlider"
                v-if="video"
                type="range"
                @change="$emit('timeChange', currentTime)"
                v-model="currentTime"
                step="1"
                min="0"
                @select.prevent=""
                :max="video.duration"
                data-test="player-slider-input"
            />
            <ul>
                <li
                    class="clickable"
                    @click="$emit('playOrPause')"
                    data-test="playable-button"
                >
                    <img v-if="!playing" alt="play" src="../../assets/pictos/play.svg">
                    <img v-else alt="pause" src="../../assets/pictos/pause.svg">
                </li>
                <li
                class="clickable"
                @click="$emit('moveTime', -10)"
                data-test="back-time-button"
                >
                    <img alt="rewind" src="../../assets/pictos/rewind.svg">
                </li>
                <li
                    class="clickable"
                    @click="$emit('moveTime', 10)"
                    data-test="next-time-button"
                >
                    <img alt="forward" src="../../assets/pictos/forward.svg">

                </li>

                <li
                    class="clickable"
                    @click="$emit('download')"
                    data-test="download-button"
                    >
                    <img alt="play" src="../../assets/pictos/download.svg">

                </li>
                <li class="clickable"><img alt="play" src="../../assets/pictos/volume.svg"><input
                class="audio-slider"
                @keydown.prevent=""
                type="range"
                @change="$emit('volumeChange', currentVolume)"
                v-model="currentVolume"
                step="0.01"
                min="0"
                max="1"
                data-test="audio-slider-input"
                /></li>
                <li
                    class="clickable"
                    @click="$emit('changeScreenSize')"
                    data-test="screen-change-button"
                >
                    <span v-if="fullScreened"><img alt="play" src="../../assets/pictos/minimise-screen.svg"></span>
                    <span v-else><img alt="play" src="../../assets/pictos/full-screen.svg"></span>
                </li>
                <li v-if="canShare"
                    class="clickable"
                    @click="$emit('share')"
                    data-test="share-button"
                >
                    <span>♺</span>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
ul {
  margin: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
}
li {
  display: inline-block;
}
.audio-slider {
  max-width: 30vw;
}
.clickable {
  cursor: pointer;
}
.timer {
  margin-top: -50px;
  color: white;
  font-size: 0.5em;
  float: left;
  margin-left: 5%;
}
#bottom_overlay {
  font-size: 2em;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  max-height: 100px;
  height: 10vh;
  overflow: hidden;
  padding: 10px;
  background-color: transparent;
  z-index: 300000;
}
#top_overlay {
  position: absolute;
  top: 5vh;
  left: 2vw;
  z-index: 1000;
}
#firstTop {
  display: block;
  height: 10vh;
  line-height: 3vh;
  font-size: 2.5em;
  font-weight: bolder;
}
#secondTop {
  height: 5vh;
  line-height: 5vh;
  font-size: 1.5em;
  color: #00AFCB;
}
#secondTop>img {
  vertical-align: top;
  height: 100%;
}
#playing_overlay {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.5s, opacity 0.5s linear;
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  z-index: 300000;
}
#playing_overlay.display {
  visibility: visible;
  opacity: 1;
}
#playing_overlay>img {
  opacity: 0.9;
  min-width: 15vw;
  min-height: 15vh;
}
@media only screen and (min-width: 1024px) {
  #playing_overlay {
    font-size: 10em;
    min-width: 200px;
    min-height: 200px;
    max-width: 300px;
  }
}
.progress {
  display: block;
  width: 90%;
  margin: auto;
  height: 10px;
}
input[type=range].progress {
  -webkit-appearance: none;
  background: transparent;
}
input[type=range]::-webkit-slider-thumb.progress {
  -webkit-appearance: none;
}
input[type=range].progress:focus {
  outline: none;
}
input[type=range].progress::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: 1px solid #FF4338;
  height: 25px;
  width: 25px;
  border-radius: 100%;
  background: #FF4338;
  cursor: pointer;
  margin-top: -10px;
  box-shadow: 2px 2px 0 #000, -2px -2px 0 #000;
}
input[type=range].progress::-webkit-slider-runnable-track {
  width: 100%;
  height: 8px;
  cursor: pointer;
  background: #3071a9;
  border-radius: 3px;
  border: 0.2px solid #010101;
}
.clickable img {
  width: 7vh;
  margin: 1vh 0;
  max-width: 10vw;
}
</style>
