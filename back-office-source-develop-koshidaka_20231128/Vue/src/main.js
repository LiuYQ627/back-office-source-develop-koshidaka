// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import VueI18n from 'vue-i18n'
import { data } from './resource/static/properties/index.js'
import filters from './filters'
/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230413 bai.ry(Neusoft)   G001.00.0  issue課題#1466を対応します.
 */

Object.keys(filters).forEach(k => {
  Vue.filter(k, filters[k])
})

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'ja',
  fallbackLocale: 'ja',
  messages: data
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  i18n: i18n,
  vuetify,
  template: '<App/>',
  data: {
    // G001.00.0 Update-Start
    // title: 'ログイン',
    title: '',
    // G001.00.0 Update-End
    winId: 'O00001'
  }
})
