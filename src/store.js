import Vue from 'vue'
import Vuex from 'vuex'
import sortBy from 'lodash/sortBy'
import rtlDetect from 'rtl-detect'
import { getViewportFocusItemId } from './mixins/intersection-observer'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: '',
    resources: [],
    locale: 'en_US',
    keyword: '',
    section: '',
    lastVisibleItemId: [], // Used for intersection observer on lists
    viewportFocusItemId: null,
    isDark: false
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
      // Set internal ID (for navigation)
      data.forEach((item, index) => {
        item.id = index
      })
      state.resources = data.filter(
        (o) => o.method.toLowerCase() !== 'options'
      )
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
    },
    SET_IS_DARK (state, data) {
      state.isDark = data
    },
    APPEND_LAST_VISIBLE_ITEM_ID (state, data) {
      state.lastVisibleItemId.push(data)
      state.viewportFocusItemId = getViewportFocusItemId(state.lastVisibleItemId)
    },
    DELETE_FROM_LAST_VISIBLE_ITEM_ID (state, data) {
      const index = state.lastVisibleItemId.indexOf(data)
      if (index === -1) return
      state.lastVisibleItemId.splice(index, 1)
      state.viewportFocusItemId = getViewportFocusItemId(state.lastVisibleItemId)
    },
    CLEAR_LAST_VISIBLE_ITEM_ID (state) {
      state.lastVisibleItemId = []
      state.viewportFocusItemId = null
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
