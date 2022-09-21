<template>
	<view>
		   <newsItem :newsList="newsList"/>
	</view>
</template>

<script>
	import newsItem from '../../components/news_item.vue'
	export default {
		data() {
			return {
				newsList:[]
			}
		},
		components:{
			newsItem
		},
		onLoad() {
			this.getNewList()
		},
		methods: {
			getNewList(){
				// #ifdef H5
				const res = uni.request({
					url:'/api2/getnewslist',
					method:'get',
					success:res=>{
					this.newsList = res.data.message
					}
				})
				// #endif
				
				// #ifdef MP-WEIXIN
				uni.request({
					url:'http://localhost:8082/api/getnewslist',
					method:'get',
					success:res=>{
					this.newsList = res.data.message
					}
				})
				// #endif
			}
		}
	}
</script>

<style lang="scss">
 .news{
	 
	 
 }
</style>
