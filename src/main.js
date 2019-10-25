import Vue from 'vue'

Vue.config.productionTip = false

const context = require.context('./', true, /^((?!App\.vue).)+\.vue$/)
context.keys().forEach((path) => {
  let res = context(path)
  Vue.component(res.default.name, res.default)
})
new Vue({
  el: '#app',
  methods:{
    yyy(){
      console.log('yyy')
    }
  }
})
