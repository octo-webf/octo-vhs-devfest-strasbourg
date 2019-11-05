<template>
  <div class="experimental">
    <p>début experimentation</p>
    <button v-if="canShare()" @click="share()">partage</button>
    <button v-if="canVibrate()" @click="vibrate()">vibrer</button>
    <div>
      Batterie en <template v-if="this.battery && !this.battery.charging">dé</template>charge ({{batteryLevel*100}}%)
    </div>
    <p>fin de l'experimentation</p>
  </div>
</template>

<script>
import nativeUI from '@/services/nativeUI'
export default {
  name: 'ExperimentalUI',
  data () {
    return {
      battery: null,
      batteryLevel: 0
    }
  },
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
    },
    updateLevel (level) {
      this.batteryLevel = level
    }
  },
  async mounted () {
    this.battery = await nativeUI.getBattery()
    console.log(this.battery.level)
    this.updateLevel(this.battery.level)
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
