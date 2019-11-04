import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = {
  online: true
}
export const actions = {
  setOnlineStatus ({ commit }, status) {
    commit('SET_ONLINE_STATUS', status)
  }
}
export const mutations = {
  SET_ONLINE_STATUS: (state, status) => { state.online = status }
}
export const getters = {
  isOffline: state => { return !state.online }
}

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state
})
