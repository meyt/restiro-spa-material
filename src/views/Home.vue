<template>
  <div class="home">
    <h1 v-text="title" />
    <v-divider class="mb-4"/>
    <template v-for="group in Object.keys(groupedResources).sort()">
      <template v-for="(item, index) in groupedResources[group]">
        <v-divider :key="index + 'divider'" class="mb-5" v-if="index > 0"/>
        <resource
          :key="index"
          :value="item"
        />
      </template>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import resource from '../components/resource'
export default {
  components: {
    resource
  },
  computed: {
    ...mapState(['title']),
    ...mapGetters(['groupedResources'])
  }
}
</script>

<style>
.home {
  margin-top: 6px;
  margin-bottom: 500px;
}
</style>
