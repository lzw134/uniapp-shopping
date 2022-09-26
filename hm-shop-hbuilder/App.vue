<script>
	import initApp from '@/utils/init.js'
	export default {
		/** tab点击 */
		onTabItemTap(item) {
		    console.log('tab点击')
		},
		onLaunch: function() {
			// 对路由进行统一拦截，实现路由导航守卫 router.beforeEach 功能
			initApp()
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "@/uni_modules/uview-ui/index.scss";

/* 引入公共样式 */
@import "@/css/common.css";



</style>
