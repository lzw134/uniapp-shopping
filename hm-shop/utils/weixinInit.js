/*微信小程序只能在onShow中拦截*/
export default function initApp() {
	//获取用户的apenid
	const apenid = uni.getStorageSync('openid')

	//需要登录
	if (!apenid) {
		/*跳转到微信登录页面*/
		uni.navigateTo({
			url:'/pages/wchat-login/wchat-login'
		})
		return false
	}
	else {
		return true
	}
} 
