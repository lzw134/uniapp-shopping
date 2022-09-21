<template>
	<view class="pics">
		<view class="menu">
			<menus @getGoodsList="getGoodsList"/>
		</view>
		<view class="list">
			<goodsList ref="goodsList"/>
		</view>
	</view>
</template>

<script>
	import menus from './components/menu.vue'
	import goodsList from './components/list.vue'
	export default {
		components: {
			menus,
			goodsList
		},
		data() {
			return {
				list:[]
			}
		},
		methods: {
			getGoodsList(item){
				this.$refs.goodsList.getGoodsList(item.id)
			}
		}
	}
</script>

<style lang="scss" scoped>
page{
	height: 100%;
}
.pics{
	height: 100%;
	display: flex;
    flex-wrap: nowrap;
	.menu{
		width: 150rpx;
		height: 100%;
	}
	.list{
		width: calc(100% - 150rpx);
		height: 100%;
	}
}
</style>










