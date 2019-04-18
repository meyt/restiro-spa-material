<template>
  <v-app>
    <v-navigation-drawer
      fixed
      v-model="drawer"
      :left="!isRtl"
      :right="isRtl"
      app
      class="grey lighten-4"
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
                <v-list-tile-title>{{ capitalize(group.title) }}</v-list-tile-title>
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
import capitalize from 'lodash/capitalize'
import { getResourceAnchor, updateFavicon, jumpToSection } from './helpers'

export default {
  name: 'App',
  data () {
    return {
      drawer: true
    }
  },
  watch: {
    '$route.params' (newVal) {
      this.$store.commit('SET_SECTION', newVal.sectionName)
    }
  },
  computed: {
    ...mapState([
      'title',
      'section',
      'locale'
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
  },
  methods: {
    capitalize,
    jumpToSection
  }
}
</script>
