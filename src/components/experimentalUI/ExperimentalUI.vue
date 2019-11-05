<template>
  <div class="experimental">
    <p>début experimentation</p>
    <button v-if="canShare()" @click="share()">partage</button>
    <button v-if="canVibrate()" @click="vibrate()">vibrer</button>
    <p>fin de l'experimentation</p>
  </div>
</template>

<script>
import nativeUI from '@/services/nativeUI'
export default {
  name: 'ExperimentalUI',
  methods: {
    canShare () {
      return nativeUI.canShare()
    },
    share () {
      nativeUI.share()
    },
    canVibrate () {
      return nativeUI.canVibrate()
    },
    vibrate () {
      nativeUI.vibrate(500)
    }
  }
}
</script>

<style scoped>
button {
  display: block;
  background: white;
  text-align: center;
  margin: 1em auto;
}
.experimental {
  color: grey;
}
</style>
