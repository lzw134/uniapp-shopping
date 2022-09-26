const Base_Url = 'http://localhost:5000'
export const myRequest = (options)=> {
	return new Promise((resolve,reject)=>{
		uni.request({
			// #ifdef H5
			url:options.url,
			// #endif
			// #ifdef MP-WEIXIN
			url:Base_Url + options.url,
			// #endif
			method:options.method || 'get',
			data:options.data || {},
			header: {Authorization:`Bearer ${uni.getStorageSync('token')}`},
			success: res=>{
				if(res.data.code!==200 || res.data.code!==-1){
					/*这里判断后台传递过来的code是不是444,如果是就做路由拦截*/
					if(res.data.code===444){
						// uni.navigateTo({
						// 	url: '/pages/login/login'
						// })
						// setTimeout(()=>{
						// 	uni.showToast({
						// 		title: '身份过期,请先登录!',
						// 		icon: 'none'
						// 	})
						// },1000)
					}else{
						uni.showToast({
							icon:'none',
							title:res.data.msg
						})
					}
				}
				if(res.data.data){
					resolve(res.data.data)
				}else{
					resolve(res)
				}
				
			},
			fail: res=>{
				uni.showToast({
					icon:'none',
					title:'网络请求失败'
				})
				reject(res)
			}
		})
	})
}