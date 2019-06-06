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
      <div>
        Request:
      </div>

      <div class="my-2" v-text="value.request.path" />

      <div v-if="requestHeaders" class="mb-2" title="Headers">
        <pre v-text="requestHeaders" />
      </div>

      <div v-if="requestBody" class="mb-2" title="Body">
        <pre v-text="requestBody" />
      </div>

      <div>
        Response:
      </div>
      <div v-if="responseHeaders" class="mb-2" title="Headers">
        <pre v-text="responseHeaders" />
      </div>
      <div v-if="responseBody" class="mb-2" title="Body">
        <pre v-text="responseBody" />
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
      const body = this.value.request.body
      if (!body) return
      if (this.value.request.body_format === 'json') return JSON.parse(body)
      return body
    },
    responseHeaders () {
      const result = []
      const headers = this.value.response.headers
      Object.keys(headers).forEach((key) => {
        result.push(`${key}: ${headers[key]}`)
      })
      return result.join('\n')
    },
    responseBody () {
      const body = this.value.response.body
      if (!body) return
      if (this.value.response.body_format !== 'json') return body
      return JSON.parse(body)
    }
  }
}
</script>

<style>
.resource-example .v-toolbar {
  cursor: pointer
}
</style>
