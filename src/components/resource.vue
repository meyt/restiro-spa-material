<template>
  <div :id="anchor" class="resource mb-5">
    <v-layout wrap >
      <v-flex sm12>
        <!-- Title -->
        <h1 ref="title" class="section-title">
          {{ value.display_name }}
          <router-link :to="'/' + anchor" @click.native="jumpToSection(anchor)">
            <v-icon>link</v-icon>
          </router-link>
        </h1>

        <!-- Description -->
        <div
          v-if="description && description.length > 0"
          v-html="description"
          class="resource-description pr-3"
        />
      </v-flex>

      <v-flex sm12 >
        <!-- Method and Path -->
        <v-chip small :color="methodColor" dark class="mx-0">
          <b v-text="value.method.toUpperCase()"/>
        </v-chip>
        <v-sheet :class="{'grey lighten-3': !isDark, 'px-2 py-2 mb-4': true}" >
          <div>
            <span v-text="value.path" />
          </div>
        </v-sheet>

        <!-- Permissions -->
        <div v-if="hasPermissions" class="my-4">
          <span v-for="(securityKey, index) in Object.keys(value.security)" :key="index">
            {{ capitalize(securityKey) }}:
            {{ value.security[securityKey].join(', ') }}
          </span>
        </div>

        <!-- Parameters -->
        <div
          v-for="(paramType, index) in paramTypes"
          :key="paramType + index"
          class="resource-parameters mb-4"
        >
          <div class="subheading" v-text="paramType[1]" />
          <v-layout v-for="(item, index) in value[paramType[0]]" :key="index" >
            <v-flex sm12 md2 class="py-1">
              <b v-text="item.display_name || item.name" />
              <div v-if="item.type" class="grey--text text--darken-1">
                Type: {{ item.type }}
              </div>
            </v-flex>
            <v-flex sm12 md10 class="py-1">
              <div v-if="item.description" v-html="marked(item.description)" />
              <div v-if="item.example">
                Example: {{ item.example }}
              </div>
              <div v-if="item.pattern">
                Pattern: {{ item.pattern }}
              </div>
              <div v-if="item.enum">
                Enum: {{ item.enum }}
              </div>
              <div v-if="item.minimum">
                Minimum: {{ item.minimum }}
              </div>
              <div v-if="item.maximum">
                Maximum: {{ item.maximum }}
              </div>
              <div v-if="item.min_length">
                Minimum Length: {{ item.min_length }}
              </div>
              <div v-if="item.max_length">
                Maximum Length: {{ item.max_length }}
              </div>
            </v-flex>
          </v-layout>
        </div>

        <!-- Examples -->
        <div v-if="value.examples.length > 0" class="resource-examples">
          <example
            v-for="(example, index) in examples"
            :key="index"
            :value="example"
            :expandedDefault="index === 0" />
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import marked from 'marked'
import example from './example'
import capitalize from 'lodash/capitalize'
import sortBy from 'lodash/sortBy'
import { getResourceAnchor, getMethodColor, jumpToSection } from '../helpers'

const paramTypes = [
  'header_params',
  'query_params',
  'form_params',
  'uri_params'
]

const paramNames = [
  'Header Parameters',
  'Query Parameters',
  'Form Parameters',
  'URI Parameters'
]

export default {
  components: {
    example
  },
  props: {
    value: {
      type: Object
    }
  },
  data () {
    return {
      lastEntry: false
    }
  },
  computed: {
    ...mapState(['isDark']),
    description () {
      if (!this.value.description) return ''
      return marked(this.value.description)
    },
    anchor () {
      return getResourceAnchor(this.value)
    },
    hasPermissions () {
      const values = Object.values(this.value.security)
      return this.value.security && values.length > 0 && values[0].length > 0
    },
    paramTypes () {
      const result = []
      paramTypes.forEach((param, index) => {
        if (!this.value[param]) return
        if (this.value[param].length === 0) return
        result.push([param, paramNames[index]])
      })
      return result
    },
    methodColor () {
      return getMethodColor(this.value.method)
    },
    examples () {
      return sortBy(
        this.value.examples,
        function (o) { return parseInt(o.response.status) }
      )
    }
  },
  methods: {
    capitalize,
    marked,
    jumpToSection
  }
}
</script>

<style>
h1 a{
  display: inline-block;
}
h1 a i.material-icons{
  vertical-align: middle;
  display: none;
}
h1:hover a i.material-icons {
  display: inline-block;
  width: 30px;
}
.theme--light.v-table tbody tr:hover:not(.v-datatable__expand-row) {
  background: initial;
}
</style>
