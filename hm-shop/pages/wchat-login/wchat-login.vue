<template>
	<view></view>
</template>

<script>
	export default {
		data() {
			return {
				nickName: 'hello',
				headerUrl: '../../static/logo.png'
			}
		},
		onLoad() {
			// var that = this
			// uni.checkSession({
			// 	  success: async function() {
			// 		console.log("处于登录态");
			// 	},
			// 	fail: function(res) {
			// 		console.log("需要重新登录");
			// 		this.login()
			// 	}
			// })
			this.login()
		},
		methods: {
			login() {
				var that = this
				uni.showModal({
					mask: true,
					title: '温馨提示',
					content: '授权微信登录后才能正常使用小程序',
					success(res) {
						if (res.confirm) {
							uni.getUserProfile({
								desc: '获取你的昵称、头像',
								success: userRes => {
									if (userRes.errMsg == 'getUserProfile:ok' && userRes.userInfo !=
										undefined) {
										var userInfo = {
											avatarUrl: userRes.userInfo.avatarUrl,
											nickName: userRes.userInfo.nickName
										}
										// 对页面中的变量进行赋值
										that.nickName = userInfo.nickName
										that.headerUrl = userInfo.avatarUrl
										// 调用接口请求openid
										that.getUserOpenId(userInfo)
									} else {
										uni.showToast({
											icon: 'none',
											title: '获取失败，请重试'
										})
									}
								},
								fail: error => {}
							})
						} else if (res.cancel) {

						}
					}
				})
			},
			getUserOpenId(userInfo) {
				var that = this
				uni.login({
					provider: 'weixin',
					async success(loginAuth) {
						var data = {
							'avatarUrl':userInfo.avatarUrl,
							'nickName':userInfo.nickName,
							'code': loginAuth.code
						}
						const res = await that.$myRequest({
							url: '/api/login/wlogin',
							method: 'post',
							data: data
						})
						uni.setStorageSync('nickName',userInfo.nickName)
						uni.setStorageSync('avatarUrl',userInfo.avatarUrl)
						uni.setStorageSync('token',res.token)
						uni.setStorageSync('openid',res.openid)
						uni.switchTab({
							url:'/pages/index/index'
						})
					}
				})
			}
		}
	}
</script>

<style>

</style>
