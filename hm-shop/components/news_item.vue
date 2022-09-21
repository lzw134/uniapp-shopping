<template>
	<view>
	<view class="news_item" v-for="(item,index) in newsList" :key="index" @click="goDetail(item.id)">
		<image src="@/static/image/address.png"></image>
		<view class="right">
			<view class="tit">
				{{item.title}}
			</view>
			<view class="info">
				<text>发表时间：{{item.add_time | getDate}}</text>
				<text>浏览：{{item.click}}</text>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import getDate from "../utils/common.js";
	export default {
		name: "news_item",
		props:{
			newsList:Array
		},
		methods:{
			goDetail(id){
				uni.navigateTo({
					url:'/pages/news-detail/news-detail?id='+id
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.news_item {
		display: flex;
		padding: 10rpx 20rpx;
		border-bottom: 1px solid $shop-color;
		image {
			max-width: 200rpx;
			min-width: 200rpx;
			height: 150rpx;
		}
	}

	.right {
		margin-left: 15rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.tit {
			font-size: 33rpx;
		}
		.info {
			font-size: 24rpx;
			text:nth-child(2) {
				margin-left: 30rpx;
			}
		}
	}
</style>
