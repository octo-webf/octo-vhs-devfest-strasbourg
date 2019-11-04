<template>
  <aside class="information__block" v-show="isOffline">
    <div v-if="isOffline">Vous naviguez actuellement en mode hors ligne.</div>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SwInformations',
  computed: {
    ...mapGetters(['isOffline'])
  }
}
</script>

<style scoped>
  .information__block {
    display: block;
    background: white;
    color: #0e2356;
    width: 90vw;
    position: fixed;
    bottom: 5vh;
    opacity: 0.6;
    left: 5vw;
    right: 5vw;
  }
</style>
