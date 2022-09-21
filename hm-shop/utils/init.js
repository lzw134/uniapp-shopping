import config from "./config.js"
export default function initApp() {
	/**
	 * 页面跳转拦截器
	 */
	let list = ["switchTab"];
	list.forEach(item => { //用遍历的方式分别为,uni.navigateTo,uni.redirectTo,uni.reLaunch,uni.switchTab这4个路由方法添加拦截器
		uni.addInterceptor(item, {
			invoke(e) { // 调用前拦截
				//获取用户的token
			    const token = uni.getStorageSync('token'),
				//获取要跳转的页面路径（url去掉"?"和"?"后的参数）
				url = e.url.split('?')[0];
				let notNeed = config.whiteList.includes(url)
				// 如果在whiteList里面就不需要登录
				if (notNeed) {
					return e
				} else {
					//需要登录
					if (!token) {
						uni.navigateTo({
							url: '/pages/login/login'
						})
						setTimeout(()=>{
							uni.showToast({
								title: '请先登录',
								icon: 'none'
							})
						},1000)
						return false
					}else{
						return e
					}
				}
				
			},
			fail(err) { // 失败回调拦截 
				console.log(err);
				if (Debug) {
					console.log(err);
					uni.showModal({
						content: JSON.stringify(err),
						showCancel: false
					});
				}
			}
		})
	})
}

