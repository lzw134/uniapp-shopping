<template>
	<view>
	   <view class="news_detail">
		  <text class="title">{{new_Detail.title}}</text>
		  <view class="info">
			  <text>发表时间:{{new_Detail.add_time | getDate }}</text>
			  <text>浏览:{{new_Detail.click}}</text>
		  </view>
		  <view class="content">
			   <rich-text :nodes="new_Detail.content"></rich-text>
		  </view>
	    </view>
    </view>
</template>

<script>
	export default {
		data() {
			return {
				new_Detail:{}
			}
		},
		onLoad(options) {
			this.getNewDetail(options.id)
		},
		methods: {
			getNewDetail(id){
				// #ifdef H5
				const res = uni.request({
					url:'/api2/getnew/'+id,
					method:'get',
					success:res=>{
					  this.new_Detail = res.data.message[0]
					}
				})
				// #endif
				
				// #ifdef MP-WEIXIN
				uni.request({
					url:'http://localhost:8082/api/getnew/'+id,
					method:'get',
					success:res=>{
					  this.new_Detail = res.data.message[0]
					}
				})
				// #endif
			}
		}
	}
</script>

<style scoped lang="scss">
.news_detail{
	font-size: 30rpx;
	padding: 0 20rpx;
	.title{
		text-align:center;
		width:700rpx;
		display: block;
		margin: 20rpx;
	}
	.info{
		display: flex;
        justify-content: space-between;
	}
}
</style>
