import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = {
  online: true,
  outdated: false
}
export const actions = {
  setOnlineStatus ({ commit }, status) {
    commit('SET_ONLINE_STATUS', status)
  },
  setUpdateAvailable ({ commit }) {
    commit('SET_OUTDATED_STATUS', true)
  }
}
export const mutations = {
  SET_ONLINE_STATUS: (state, status) => { state.online = status },
  SET_OUTDATED_STATUS: (state, status) => { state.outdated = status }
}
export const getters = {
  isOffline: state => { return !state.online },
  isOutdated: state => { return state.outdated }
}

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state
})
