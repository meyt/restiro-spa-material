<template>
  <div class="home">
    <h1 v-text="pageTitle" />
    <v-divider class="mb-4"/>
    <template v-for="(group) in Object.keys(groupedResources).sort()">
      <template v-for="(item, index) in groupedResources[group]">
        <v-divider :key="item.id + 'divider'" class="mb-5" v-if="index > 0"/>
        <resource
          :key="item.id"
          :value="item"
          :observableItemId="parseInt(item.id)"
        />
      </template>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import resource from '../components/resource'
import capitalize from 'lodash/capitalize'

export default {
  components: {
    resource
  },
  computed: {
    ...mapState(['title']),
    ...mapGetters(['groupedResources']),
    pageTitle () {
      return capitalize(this.title)
    }
  },
  metaInfo () {
    return {
      title: this.pageTitle
    }
  }
}
</script>

<style>
.home {
  margin-top: 6px;
  margin-bottom: 500px;
}
</style>
