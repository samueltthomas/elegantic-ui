// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Alert from './components/Alert'
import Grid from './components/Grid'
import Col from './components/Col'
import Row from './components/Row'

Vue.config.productionTip = false

Vue.component('eu-alert', Alert)
Vue.component('eu-grid', Grid)
Vue.component('eu-col', Col)
Vue.component('eu-row', Row)

// document.body.innerHTML = '<div id="eu-app">' + document.body.innerHTML + '</div>'

/* eslint-disable no-new */
new Vue({
  el: '#app'
})
