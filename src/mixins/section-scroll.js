import { mapState } from 'vuex'
import { getResourceAnchor } from '../helpers'

export default {
  computed: {
    ...mapState([
      'viewportFocusItemId',
      'resources'
    ])
  },
  methods: {
    jumpToSection (anchor) {
      var element = window.document.querySelector('#' + anchor)
      var top = element.offsetTop
      window.scrollTo(0, top)
      this.$store.commit('SET_SECTION', anchor)
      window.__jumping_to_section = true
    },
    updateSection () {
      if (window.__jumping_to_section) {
        delete window.__jumping_to_section
        return
      }
      const itemId = this.viewportFocusItemId
      if (!itemId) return
      const resource = this.resources[itemId]
      const anchor = getResourceAnchor(resource)
      this.$store.commit('SET_SECTION', anchor)
      this.$router.replace('/' + anchor)

      // Scroll navigation list item to viewport
      var navigationItem = window.document.querySelector(`a[href="#/${anchor}"].v-list__tile`)
      navigationItem.scrollIntoView({
        block: 'center',
        inline: 'center'
      })
    }
  }
}
