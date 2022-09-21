<template>
	<view>
		<scroll-view scroll-y="true">
			<view class="goodList">
			<view class="good_item" v-for="item in goodsList" :key="item.id" @click="GoodsDetails(item.id)">
				<image :src="JSON.parse(item.good_pic)[0] | getUrlImage" @click="handleLookImage(item.good_pic)"></image>
				<view class="price">
					<text>￥{{item.new_price}}</text>
					<text>￥{{item.good_sales}}</text>
				</view>
				<view class="good_name ">
					{{item.good_name}}
				</view>
			</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { url } from '../../../utils/url.js'
	export default {
	  name:'goodsList',
	  data(){
		return{
			goodsList:[]
		}
	  },
	  methods:{
		async getGoodsList(good_id){
			const res = await this.$myRequest({
			  	url: '/api/good/list',
				data:{
					'good_id': good_id
				}
			})
			this.goodsList = res
		  },
		handleLookImage(pic){
			const Array = [url + JSON.parse(pic)[0]]
			uni.previewImage({
				current:Array,
				urls:Array
			})
		},
		GoodsDetails(id){
		  uni.navigateTo({
		  	url:'/pages/good-detail/good-detail?id='+id
		  })
		}
	  }
	}
</script>

<style scoped lang="scss">
	.goodList{
		height: 100%;
		width: 100%;
		
		display: flex;
		flex-wrap: wrap;
		
		.good_item {
			background: #fff;
			width: 285rpx;
			
			/* #ifdef H5 */
			margin: 2px 3px 2px 3px;
			/* #endif */
			
			/* #ifdef MP-WEIXIN */
			margin: 1px 2px 1px 2px;
			/* #endif */
			
		    border:1px solid #eee;
			
			image {
				width: 80%;
				height: 300rpx;
				display: block;
				margin: auto;
			}
		
			.price {
				color: $shop-color;
				font-size: 36rpx;
		
				/*设置第二个text*/
				text:nth-child(2) {
					color: #ccc;
					font-size: 28rpx;
					margin-left: 7rpx;
					text-decoration: line-through;
				}
			}
		
			.good_name {
				font-size: 28rpx;
				line-height: 50rpx;
				padding-bottom: 15rpx;
				padding-top: 10rpx;
			}
		}
	}
</style>
