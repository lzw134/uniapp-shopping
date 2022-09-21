<template>
	<view class="goodlist" :pageIndex="pageIndex">
		<goodslist ref="goodslist" />
	</view>
</template>

<script>
	import goodslist from '@/components/goods-list.vue'
	export default {
		name: "goods",
		components: {
			goodslist
		},
		data() {
			return {
				pageIndex: 1
			}
		},
		/*下拉加载更多*/
		onPullDownRefresh() {
			let time2 = setTimeout(() => {
				clearTimeout(time2)
				this.$refs.goodslist.pageChange()
				/*停止显示下拉刷新加载中图标*/
				uni.stopPullDownRefresh()
			}, 2000)
		}
	}
</script>

<style lang="scss" scoped>
	.goodlist {
		background-color: #ccc;
	}
</style>
