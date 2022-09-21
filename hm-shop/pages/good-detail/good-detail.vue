<template>
	<view class="goods_details">
		<!--轮播图-->
		<!-- 是否显示面板指示点（indicator-dots） -->
		<!-- <swiper class="swiper" circular indicator-dots indicator-color="#CCC" autoplay interval="2000" duration="500">
				<swiper-item v-for="item in swiper" :key="item.id">
					<image :src="item | getUrlImage"></image>
				</swiper-item>
		</swiper> -->
		<rich-text :nodes="detail.good_details"></rich-text>
		<!--分割线-->
		<view class="line"></view>
		<view class="box1">
			<view class="price">
				<text>￥{{detail.new_price}}</text>
				<text>￥{{detail.old_price}}</text>
			</view>
			<view class="good_name">
				{{detail.good_name}}
			</view>
		</view>
		<!--分割线-->
		<view class="line"></view>
		<view class="box2">
			<view>货号：SD7159810321</view>
			<view>库存：200</view>
		</view>
		<view class="good-nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: null,
				swiper: [],
				options: [{
						icon: 'headphones',
						text: '客服'
					},
					{
						icon: 'shop',
						text: '店铺',
						info: 2,
						infoBackgroundColor: '#007aff',
						infoColor: "red"
					},
					{
						icon: 'cart',
						text: '购物车',
						info: 2
					}
				],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		onLoad(options) {
			this.getGoodsDetail(options.id)
		},
		methods: {
			async getGoodsDetail(id) {
				this.detail = await this.$myRequest({
					url: '/api/good/detail?id=' + id,
				})
				this.swiper = JSON.parse(this.detail.good_pic)
			},
			onClick(e) {
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})
			},
			async buttonClick(e) {
				/*e.index===0 代表加入购物车*/
				/*e.index===1 代表立即购买*/
				if(e.index===0){
					const res = this.$myRequest({
						url: '/api/shop/add',
						data:{s_id:this.detail.id,count:1,telp:2}
					})
				}else{
					const res = this.$myRequest({
						url: '/api/shop/add',
						data:{s_id:this.detail.id,count:1,telp:1}
					})
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
				this.options[2].info++
			}
		}
	}
</script>

<style scoped lang="scss">
	.goods_details {
		.swiper {
			height: 500rpx;

			image: {
				height: 100%;
				width: 100%;
			}
		}

		.box1 {
			padding: 10px;

			.price {
				font-size: 35rpx;
				color: $shop-color;

				/*设置第二个*/
				text:nth-child(2) {
					color: #ccc;
					font-size: 28rpx;
					text-decoration: line-through;
				}
			}

			.good_name {
				font-size: 32rpx;
				line-height: 60rpx;
			}
		}

		.box2 {
			padding: 0 10px;
			font-size: 32rpx;
			line-height: 80rpx;
		}
	}

	.line {
		width: 100%;
		height: 10rpx;
		background-color: #eee;
	}

	.good-nav {
		position: fixed;
		width: 100%;
		bottom: 0;
	}
</style>
