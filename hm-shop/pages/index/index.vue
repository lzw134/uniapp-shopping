<template>
	<view>
		<!--轮播图-->
		<view class="swiper">
			<swiper circular indicator-dots indicator-color="#CCC" autoplay interval="2000" duration="500">
				<swiper-item v-for="item in swiper" :key="item.id">
					<image :src="item.banner_pic | getUrlImage" @error="imgerror(index)"></image>
				</swiper-item>
			</swiper>
		</view>
		<!--导航栏-->
		<view class="nav">
			<view class="nav-item" v-for="(item,index) in navs" :key="index" @click="navItemClick(item.path)">
				<view :class="item.icon"></view>
				<text>{{item.title}}</text>
			</view>
		</view>
		<!--商品列-->
		<view class="hot_goods">
			<view class="tit">
				推荐商品
			</view>
			<goodList ref="goodslist"/>
		</view>
	</view>
</template>

<script>
	import goodList from '@/components/goods-list.vue';
	export default {
		components: {
			goodList
		},
		data() {
			return {
				title: '首页',
				swiper: [],
				swiperErr: [{
						id: 1,
						banner_pic: '../../static/image/error.png'
					},
					{
						id: 2,
						banner_pic: '../../static/image/error.png'
					},
					{
						id: 3,
						banner_pic: '../../static/image/error.png'
					}
				],
				HotGoods: [],
				navs: [{
						icon: 'iconfont icon-ziyuan',
						title: '生鲜超市',
						path: '/pages/goods/goods'
					},
					{
						icon: 'iconfont icon-guanyuwomen',
						title: '联系我们',
						path: '/pages/contact/contact'
					},
					{
						icon: 'iconfont icon-ziyuan',
						title: '商品分类',
						path: '/pages/pics/pics'
					},
					{
						icon: 'iconfont icon-ziyuan',
						title: '美食交流',
						path: '/pages/videos/videos'
					}
				]
			}
		},
		onLoad() {
			this.getSwiperData()
		},
		onReachBottom() {
			this.$refs.goodslist.pageChange()
		},
		methods: {
			async getSwiperData() {
				// #ifdef H5
				const res = await this.$myRequest({
					url: '/api/banner/list'
				})
				if (res) {
					this.swiper = res
				} else {
					this.swiper = this.swiperErr
				}
				// #endif
				// #ifdef MP-WEIXIN
				const res = await this.$myRequest({
					url: '/api/banner/list'
				})
				if (res) {
					this.swiper = res
				} else {
					this.swiper = this.swiperErr
				}
				// #endif
			},
			imgerror(index) {
				this.$set(this.swiper, index, this.swiperErr)
			},
			navItemClick(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper {
		width: 750rpx;

		/* #ifdef MP-WEIXIN */
		height: 380rpx;
		/* #endif */

		/* #ifdef H5 */
		height: 300rpx;
		/* #endif */

		image {
			height: 100%;
			width: 100%;
		}
	}

	.nav {
		display: flex;

		.nav-item {
			width: 25%;
			text-align: center;

			view {
				width: 120rpx;
				height: 120rpx;
				background-color: $shop-color;
				border-radius: 60rpx;
				margin: 10px auto;
				line-height: 120rpx;
				color: #fff;
				font-size: 50rpx;
			}
		}
	}

	.hot_goods {
		background-color: #eee;
		overflow: hidden;
		margin-top: 10rpx;

		.tit {
			height: 50px;
			line-height: 50px;
			color: $shop-color;
			text-align: center;
			/*设置字体行宽10px*/
			letter-spacing: 10px;
			background: #fff;
			margin: 7rpx 0;
		}
	}
</style>
