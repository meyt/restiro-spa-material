import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import fa from 'vuetify/es5/locale/fa'
import en from 'vuetify/es5/locale/en'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  lang: {
    locales: { fa, en },
    current: 'en'
  }
})
