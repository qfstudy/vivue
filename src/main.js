import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

const context = require.context('./', true, /^((?!App\.vue).)+\.vue$/)
console.log(context.keys())
context.keys().forEach((path) => {
  console.log(context(path))
  let res = context(path)
  Vue.component(res.default.name, res.default)
})

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
