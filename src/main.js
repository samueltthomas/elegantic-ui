// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Alert from './components/Alert'

Vue.config.productionTip = false

Vue.component('eu-alert', Alert)

document.body.innerHTML = '<div id="eu-app">' + document.body.innerHTML + '</div>'

/* eslint-disable no-new */
new Vue({
  el: '#eu-app'
})
