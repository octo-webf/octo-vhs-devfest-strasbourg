import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = {
  outdated: false,
  online: true
}
export const actions = {
  setUpdateAvailable ({ commit }) {
    commit('SET_OUTDATED_STATUS', true)
  },
  setOnlineStatus ({ commit }, status) {
    commit('SET_ONLINE_STATUS', status)
  }
}
export const mutations = {
  SET_OUTDATED_STATUS: (state, status) => { state.outdated = status },
  SET_ONLINE_STATUS: (state, status) => { state.online = status }
}
export const getters = {
  isOutdated: state => { return state.outdated },
  isOnline: state => { return state.online },
  isOffline: state => { return !state.online }
}

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state
})
