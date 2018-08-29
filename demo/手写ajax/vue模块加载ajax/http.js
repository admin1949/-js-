import  Vue from 'vue'
import myajax from '@/api/my_ajax'
// import xx from '@/api/xx'

// xl.baseUrl = '5151515'
// console.log(myajax().baseUrl)
// alert(xx().name)
// console.log(myajax)

myajax.baseUrl = 'http://app.iushan.com'

Vue.prototype.$api = myajax
