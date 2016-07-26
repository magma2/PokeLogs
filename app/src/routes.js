import Vue from 'vue'

export default {
  '/': {
    component: Vue.component('landing-page', require('./components/default')),
    name: 'default'
  }
}
