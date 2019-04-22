import Vue from 'vue'
import Vuex from 'vuex'
import sortBy from 'lodash/sortBy'
import rtlDetect from 'rtl-detect'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: '',
    resources: [],
    locale: 'en_US',
    keyword: '',
    section: ''
  },
  getters: {
    groupedResources (state, getters) {
      const resultByGroup = {}
      getters.sortedResources.forEach((resource) => {
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
    sortedResources (state) {
      return sortBy(state.resources, ['display_name'])
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
    loadIndex ({ commit, dispatch }) {
      const docs = window.restiro_docs
      commit('SET_TITLE', docs.title)
      commit('SET_RESOURCES', docs.resources)
      if (docs.locale) commit('SET_LOCALE', docs.locale)
      return Promise.resolve(true)
    }
  }
})
