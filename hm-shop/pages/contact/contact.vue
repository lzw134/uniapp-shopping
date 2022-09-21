<template>
	<view class="contact">
		<image src="../../static/image/contact.png" class="img"></image>
		<view class="info">
			<view @click="telephone">联系电话/微信（代做毕业设计）:{{info.telephone}}</view>
			<view>联系地址:{{info.address}}</view>
		</view>
		<map class="map" v-bind:longitude="map.longitude" v-bind:scale="map.scale"  v-bind:latitude="map.latitude" v-bind:markers="map.markers"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				map:{
					latitude:30.670006 ,//维度
					longitude:104.046034 ,//精度,
					scale:15,
					markers:[
						{
							id:1,
							latitude:30.670006 ,//维度
							longitude:104.046034 ,//精度,
							iconPath:'../../static/image/address.png',
							width:30,
							height:30
						}
					]
				},
				info:{
					telephone:'17628223627',
					address:'四川省成都市青羊区浣花香美食广场2楼'
				}
			}
		},
		methods: {
			telephone(){
				uni.makePhoneCall({
					phoneNumber:''
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.contact{
  .img{
	width: 750rpx;
	height: 360rpx;
  }
  .info{
	padding: 10rpx 20rpx;
	font-size: 30rpx;
	view{
		line-height: 80rpx;
		border-bottom: 1px solid #eee;
	}
  }
  .map{
	width: 750rpx;
	height: 750rpx;
  }
}
</style>
