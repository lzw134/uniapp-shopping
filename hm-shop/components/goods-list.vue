<template>
	<view>
		<view class="goods_list">
			<view class="good_item" v-for="item in HotGoods" :key="item.id" @click="GoodsDetails(item.id)">
				<image :src="JSON.parse(item.good_pic)[0] | getUrlImage"></image>
				<view class="price">
					<text>￥{{item.new_price}}</text>
					<text>￥{{item.good_sales}}</text>
				</view>
				<view class="good_name">
					{{item.good_name}}
				</view>
			</view>
		</view>
		<!--底线-->
		<view class="lint_over" v-if="pageFlog">
			<text>----我是有底线的----</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "goods-list",
		data() {
			return {
				HotGoods: [],
				pageIndex: 1,
				pageFlog: false
			}
		},
		mounted() {
			this.getHotGoods()
		},
		methods: {
			async pageChange() {
				const res = await this.$myRequest({
					url: '/api/good/hot',
					data: {
						pageIndex: ++this.pageIndex
					}
				})

				if (res) {
					if (res.length > 0) {
						this.HotGoods = [...this.HotGoods, ...res]
						uni.hideLoading()
					} else {
						this.pageFlog = true
					}
				}
			},
			async getHotGoods() {
				// #ifdef H5
				const res = await this.$myRequest({
					url: '/api/good/hot',
					data: {
						pageIndex: this.pageIndex
					}
				})
				if (res) {

					this.HotGoods = res
				}
				// #endif
				// #ifdef MP-WEIXIN
				const res = await this.$myRequest({
					url: '/api/good/hot',
					data: {
						pageIndex: this.pageIndex
					}
				})
				if (res) {
					this.HotGoods = res
				}
				// #endif
			},
			GoodsDetails(id){
			  uni.navigateTo({
			  	url:'/pages/good-detail/good-detail?id='+id
			  })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods_list {
		padding: 0 15rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.good_item {
			background: #fff;
			width: 355rpx;
			margin: 10rpx 0;

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

	.lint_over {
		text-align: center;
	}
</style>
