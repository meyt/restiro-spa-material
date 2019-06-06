<template>
  <v-app :dark="isDark">
    <v-navigation-drawer
      fixed
      v-model="drawer"
      :left="!isRtl"
      :right="isRtl"
      app
      :class="{'grey lighten-4': !isDark}"
    >
      <v-text-field v-model="keyword" placeholder="Search..." class="mx-3"/>
      <v-list dense >
        <v-list-group
          v-for="group in drawerItems"
          :key="group.title + keyword.length"
          v-model="group.active"
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ formatGroupTitle(group.title) }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <v-list-tile
            v-for="(item, index) in group.child"
            :key="index"
            :to="'/' + item.anchor"
            @click="jumpToSection(item.anchor)">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }} </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
      </v-list>
      <div class="px-3">
        <v-switch v-model="isDarkLocal" append-icon="brightness_4" />
      </div>
    </v-navigation-drawer>

    <v-content>
      <v-container>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import split from 'lodash/split'
import { getResourceAnchor, updateFavicon } from './helpers'
import throttle from 'lodash/throttle'
import sectionScrollMixin from './mixins/section-scroll'

export default {
  name: 'App',
  data () {
    return {
      isDarkLocal: this.isDark,
      drawer: true
    }
  },
  mixins: [sectionScrollMixin],
  watch: {
    '$route.params' (newVal) {
      this.$store.commit('SET_SECTION', newVal.sectionName)
    },
    isDarkLocal (newVal) {
      this.$store.commit('SET_IS_DARK', newVal)
    }
  },
  computed: {
    ...mapState([
      'title',
      'section',
      'locale',
      'isDark'
    ]),
    ...mapGetters([
      'groupedResources',
      'isRtl'
    ]),
    keyword: {
      get () {
        return this.$store.state.keyword
      },
      set (val) {
        this.$store.commit('SET_KEYWORD', val)
      }
    },
    drawerItems () {
      const result = []
      Object.keys(this.groupedResources).sort().forEach((key) => {
        const group = {
          title: key,
          active: this.keyword.length > 0,
          child: []
        }
        this.groupedResources[key].forEach(resource => {
          const anchor = getResourceAnchor(resource)
          group.child.push({
            title: resource.display_name,
            subtitle: resource.path,
            method: resource.method,
            anchor: anchor
          })
          if (this.section === anchor) {
            group.active = true
          }
        })
        result.push(group)
      })
      return result
    }
  },
  async mounted () {
    await this.$store.dispatch('loadIndex')
    this.$vuetify.lang.current = this.locale
      ? this.locale.split('_')[0]
      : 'en'
    this.$vuetify.rtl = this.isRtl
    updateFavicon('./restiro.png')
    this.$router.push(`/${this.drawerItems[0].child[0].anchor}`)

    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    formatGroupTitle (title) {
      return split(title, /(?=[A-Z])/g).join(' ')
    },
    onScroll: throttle(function () {
      this.updateSection()
    }, 100)
  }
}
</script>
