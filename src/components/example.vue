<template>
  <v-card class="resource-example elevation-1" tile>
    <v-toolbar card prominent @click="expanded = !expanded">
      <v-toolbar-title class="body-2 grey--text">
        {{ value.response.status }}
        {{ value.response.reason }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>{{ expanded ? 'expand_less' : 'expand_more' }}</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider v-if="expanded"/>
    <v-card-text v-if="expanded" >
      <div v-if="requestHeaders" class="mb-2">
        <div class="caption">Headers</div>
        <pre v-text="requestHeaders" />
      </div>

      <div v-if="requestBody" class="mb-2">
        <div class="caption">Body</div>
        <pre v-text="requestBody" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    value: {
      type: Object
    },
    expandedDefault: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      expanded: this.expandedDefault
    }
  },
  computed: {
    requestHeaders () {
      const result = []
      const headers = this.value.request.headers
      Object.keys(headers).forEach((key) => {
        result.push(`${key}: ${headers[key]}`)
      })
      return result.join('\n')
    },
    requestBody () {
      if (this.value.request.body_format === 'json') {
        return JSON.parse(this.value.request.body_text)
      }
      return this.value.request.body_text
    }
  }
}
</script>

<style>
.resource-example .v-toolbar {
  cursor: pointer
}
</style>
