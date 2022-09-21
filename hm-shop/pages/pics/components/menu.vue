<template>
	<view class="menu">
		<scroll-view scroll-y="true">
			<view
			@click="handleClick(item)"
			:class="active===item.id?'active':''"
			v-for="item in menuList" 
			:key="item.id">
			{{item.text}}
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
		 return {
				menuList: [],
				active: -1
			}
		},
		mounted() {
			this.getMenu()
		},
		methods: {
			async getMenu(){
				const res = await this.$myRequest({
					url: '/api/class/list'
				})
				this.menuList = res
			},
			handleClick(item){
				this.active = item.id
				this.$emit('getGoodsList',item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.menu{
		height: 100%;
		width: 100%;
		border-right: 1px solid #eee;
		view{
		height:60px;
		line-height: 60px;
		text-align: center;
		border-bottom: 1px solid #eee;
		}
	}
	/*被选中时的样式*/
	.active{
		background-color: $shop-color;
		color:#fff;
	}
</style>
