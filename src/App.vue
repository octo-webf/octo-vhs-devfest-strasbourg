<template>
  <div id="app">
    <div v-if="isHome" class="before-content">
      <div class="headlogo">
        <img src="./assets/headerLogo.png" alt=""/>
      </div>
      <div class="abstract-text">
        <p>OctoVHS est une plateforme de visionnage en streaming d'octo.</p>
        <p>Que souhaitez vous regarder maintenant ?</p>
      </div>
    </div>
    <nav-bar v-else></nav-bar>
    <div v-if="this.getCategoryName" class="headline">{{this.getCategoryName}}</div>
    <router-view/>
    <sw-informations/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import swInformations from '@/components/swInformations/'
import octotvServices from './services/octotv'

export default {
  name: 'app',
  components: {
    NavBar,
    swInformations
  },
  computed: {
    categoryId () {
      return this.$route.params && this.$route.params.categoryId
    },
    getCategoryName () {
      const category = octotvServices.getCategoryInformations(this.categoryId)
      return category && category.name
    },
    isHome () {
      return this.$route && this.$route.name === 'home'
    }
  },
  beforeMount () {
    if (!localStorage.videos) {
      localStorage.videos = JSON.stringify({})
    }
  }
}
</script>

<style>
html{
  background-color: #0E2356;
  color: white;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-image: url("assets/tete_octo.svg");
  background-repeat: no-repeat;
  background-position: -70vh 20vh;
  background-size: 160vh;
}
header {
  z-index: 100;
  line-height: 50px;
  display: block;
  height: 50px;
  overflow: hidden;
  position: fixed;
  padding: 0 1em;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(1,1,1, 0.5);
}
.headline {
  padding-top: 50px;
  font-size: 3.5vw;
  text-align: center;
}
.headlogo img{
  max-height: 20vh;
  max-width: 60vw;
  width: auto;
  height: auto;
}
@media (orientation: landscape) {
  .headlogo img{
    max-height: 12vh;
  }
}
.headlogo {
  padding-top: 10vh;
  text-align: center;
  margin: 1em auto;
}
.abstract-text p{
  margin-block-end: 0;
  margin-block-start: 0.5em;
}
.abstract-text {
  color: #00AFCB;
  font-weight: bolder;
  text-shadow: 1px 0 #00AFCB;
  letter-spacing: 1px;
  font-size: 1.3em;
  line-height: 1em;
  width: 60%;
  margin: auto;
}
.before-content{
  margin-bottom: 5vh;
}
</style>
