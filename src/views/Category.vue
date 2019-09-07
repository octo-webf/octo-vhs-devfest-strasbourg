<template>
  <div>
    <article v-for="video in videos" :key="video.oid">
      <router-link :to="{ name: 'video', params: { videoId: video.oid } }" class="shortcut-container">
        <img alt="play" class="playHover" src="../assets/pictos/circle-play.svg">
        <figure class="growsandstays">
          <img :src="video.thumb" :alt="video.title">
          <progress :max="convertVideoTime(video.duration)" :value="localVideos && localVideos[video.oid] && Math.abs(localVideos[video.oid].time)"></progress>
          <figcaption> <span class="fig-title"> {{video.title }}</span></figcaption>
        </figure>
      </router-link>
    </article>
  </div>
</template>

<script>
import octotvServices from '../services/octotv'

export default {
  name: 'Category',
  data () {
    return {
      videos: undefined,
      localVideos: undefined
    }
  },
  methods: {
    convertVideoTime (time) {
      return octotvServices.getVideoTime(time)
    }
  },
  async created () {
    this.videos = await octotvServices.getVideos(this.$route.params.categoryId)
  },
  beforeMount () {
    this.localVideos = JSON.parse(localStorage.videos)
  }
}
</script>

<style>
progress {
  display: block;
  width: 100%;
  height: 2px;
  background: #444;
  border-radius: 14px;
}
progress[value]::-webkit-progress-value {
  background: #e50914;
}
article {
  border-radius: 15px;
  display: inline-block;
  position: relative;
  margin: 3vw;
  background-color: rgba(51,80,118,0.8);
}
figure {
  display: inline-block;
  margin: 0;
}
img {
  width: 100%;
}
figcaption {
  color: white;
  width: 100%;
  text-align: center;
}
.fig-title {
  display: block;
  padding: 5px;
}
.shortcut-container {
  height: 20vw;
  min-height: 25vh;
  max-height: 250px;
  display: block;
  width: 15vw;
  min-width: 25vh;
  border: 4px solid rgba(255,255,255,0.5);
  border-radius: 15px;
  overflow: hidden;
}
.shortcut-container:hover, .shortcut-container:focus {
  outline: none;
  border: 4px solid rgba(255,255,255,1);
}
.playHover {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 0;
}
.shortcut-container:hover .playHover, .shortcut-container:focus .playHover{
  transition: all 0.5s ease;
  width: 40%;
}
</style>
