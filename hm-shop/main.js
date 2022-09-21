import Vue from 'vue'
import App from './App'
import {myRequest} from 'utils/api.js'
import moment from 'moment'
import {url} from 'utils/url.js'
Vue.config.productionTip = false
/*挂载myRequest*/
Vue.prototype.$myRequest = myRequest
/*挂载moment*/
Vue.prototype.$moment = moment
/*挂载url*/
Vue.prototype.$url = url
/*Vue时间过滤器*/
Vue.filter('getDate',(date)=>{
	/*将时间转换为正确的格式*/
	return moment(date).format('yyyy-MM-DD hh:mm:ss')
})
/*Vue image前缀过滤器*/
Vue.filter('getUrlImage',(image)=>{
	return url + image
})
//uview
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

uni.$u.config.unit = 'rpx'

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
