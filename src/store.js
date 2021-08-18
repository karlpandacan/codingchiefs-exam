import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isDarkTheme: localStorage.getItem('isDarkTheme') || 'no',
  },
  mutations: {
    set_light_theme(state) {
      state.isDarkTheme = 'no';
    },
    set_dark_theme(state) {
      state.isDarkTheme = 'yes';
    },
  },
  actions: {
    setToDarkTheme({ commit }) {
      return new Promise((resolve) => {
        localStorage.setItem('isDarkTheme', 'yes')
        commit('set_dark_theme')
        resolve()
      })
    },
    setToLightTheme({ commit }) {
      return new Promise((resolve) => {
        localStorage.setItem('isDarkTheme', 'no')
        commit('set_light_theme')
        resolve()
      })
    }
  },
  getters: {
    isDarkTheme: state => state.isDarkTheme == 'yes',
  }
})
