import Vue from 'vue'
import Vuex from 'vuex'
import rtlDetect from 'rtl-detect'
import * as Axios from 'axios'

Vue.use(Vuex)

const axios = Axios.create({
  baseURL: './',
  timeout: 1000
})

export default new Vuex.Store({
  state: {
    title: '',
    resources: [],
    locale: '',
    keyword: '',
    section: ''
  },
  getters: {
    groupedResources (state) {
      const resultByGroup = {}
      state.resources.forEach((resource) => {
        // Filter by keyword
        if (
          state.keyword.length > 0 &&
          resource.display_name.toLowerCase().indexOf(
            state.keyword.toLowerCase()
          ) === -1
        ) return
        const group = resource.tags[0] || 'general'
        if (typeof resultByGroup[group] === 'undefined') {
          resultByGroup[group] = [resource]
        } else {
          resultByGroup[group].push(resource)
        }
      })
      return resultByGroup
    },
    isRtl (state) {
      return rtlDetect.isRtlLang(state.locale)
    }
  },
  mutations: {
    SET_RESOURCES (state, data) {
      state.resources = data
    },
    SET_TITLE (state, data) {
      state.title = data
    },
    SET_LOCALE (state, data) {
      state.locale = data
    },
    SET_SECTION (state, data) {
      state.section = data
    },
    SET_KEYWORD (state, data) {
      state.keyword = data
    }
  },
  actions: {
    async loadIndex ({ commit, dispatch }) {
      const response = await axios.get('docs.json')
      commit('SET_TITLE', response.data.title)
      commit('SET_RESOURCES', response.data.resources)
      commit('SET_LOCALE', response.data.locale)
    }
  }
})
