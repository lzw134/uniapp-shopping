<template>
	<view class="header">
		<view class="uesr">
			<view class="top-xh">
				<view class="h2">
					个人中心
				</view>
				<view class="pic">
					<image src="../../static/cy-my/xiaoxi.png" style="width: 40rpx;" mode="widthFix"></image>
				</view>
			</view>
			<view class="fot-xh">
				<navigator url="" hover-class="none">
					<view class="pic">
						<image :src="headerUrl" style="width: 130rpx;" mode="widthFix">
						</image>
					</view>
					<view class="txt">
						<view class="name">
							<view class="h3">
								{{nickName}}
							</view>
							<view class="phone">
								用户名称
							</view>
						</view>
					</view>
				</navigator>
			</view>
		</view>
		<!-- <view class="about">
			<view class="m-a1">
				<navigator url="" hover-class="none">
					<view class="pic">
						<image src="../../static/cy-my/tianjia.png" style="width: 76rpx;" mode="widthFix"></image>
					</view>
					<view class="txt">
						<text class="s1">点击此处添加宝宝</text>
						<text>记录宝宝成长</text>
					</view>
				</navigator>
			</view>
		</view> -->
		<view class="ul-list1-xh">
			<view class="li" v-for="(item,index) in navs" :key="index" @click="navigator(item)">
				<!-- <navigator v-bind:url="item.path" hover-class="none"> -->
					<view class="pic">
						<image v-bind:src="item.image" style="width: 35rpx;" mode="widthFix"></image>
					</view>
					<view class="txt">
						<text>{{item.title}}</text>
					</view>
				<!-- </navigator> -->
			</view>
		</view>
	</view>
</template>

<script>
	import initApp from '@/utils/weixinInit.js'
	export default {
		data() {
			return {
				/*昵称*/
				nickName:'',
				/*头像*/
				headerUrl: '',
				navs: [
				{
					image: '../../static/cy-my/dingdan.png',
					title: '我的订单',
					navigator: true,
					path: '/pages/order/order'
				},
				{
					image: '../../static/cy-my/dizhi.png',
					title: '我的地址',
					navigator: true,
					path: '/pages/address_admin/address_admin'
				},
				{
					image: '../../static/cy-my/guanyhu.png',
					title: '关于我们',
					navigator: true,
					path: '/pages/contact/contact'
				},
				{
					image: '../../static/cy-my/shehzi.png',
					title: '退出登录',
					navigator: false,
					path: '/pages/index/index'
				}
				]
			}
		},
		onShow() {
		   /*进行登录验证判断*/
		   const result = initApp()
		   result ? this.getStorage() : ''	   	
		},
		methods: {
            /*获取缓存数据*/
			getStorage(){
				this.nickName = uni.getStorageSync('nickName')
				this.headerUrl = uni.getStorageSync('avatarUrl')
			},
			/*跳转*/
			navigator(item){
				if(!item.navigator){
					uni.clearStorageSync()
					/*跳转到首页*/
					uni.switchTab({
						url:'/pages/index/index'
					})
					setTimeout(()=>{
						uni.showToast({
							icon:'none',
							title:'退出登录成功'
						})
					},1000)
				}
				uni.navigateTo({
					url:item.path
				})
			}
		}
	}
</script>

<style>
	@import url("cy-my.css");
</style>
