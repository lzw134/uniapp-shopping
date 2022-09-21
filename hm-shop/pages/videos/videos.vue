<template>
	<view class="content" :style="{height:heightC - 50  + 'px'}">
		<!-- 聊天 -->
		<view v-for="(item,idx) in chatList" :key="idx" :class="item.isself?'chatself':'chatother'">
				<view class="person">
				<image v-if="item.isself" src="../../static/head.png"
					style="width: 80rpx;height: 80rpx;"></image>
				<image v-else src="../../static/image/address.png"
					style="width: 80rpx;height: 80rpx;"></image>
				<text class="nickname">{{item.username}}</text>
				</view>
				<view :class="item.isself?'chatbgvS':'chatbgvO'">{{item.msg}}</view>
		</view>
		<!-- input -->
		<view class="chatinput">
			<image src="../../static/head.png" style="width: 50rpx;height: 40rpx;margin: 0rpx 20rpx;">
			</image>
			<textarea v-model="msg" type="text" class="inputtext" placeholder="输入"/>
			<image src="../../static/select.png" style="width: 50rpx;height: 40rpx;margin:0rpx 20rpx;" @click="send">
			</image>
		</view>
	</view>
</template>

<script>
	import io from '@/scoket/scoket.io.js'
	import wio from '@/scoket/weapp.socket.io.js'
	export default {

		data() {
			return {
				heightC: 0,
				msg:'',
				username: '',
				chatList: [],
				keyBoard:0
			};
		},
		onLoad() {
			this.heightC = uni.getSystemInfoSync().windowHeight - uni.getSystemInfoSync().statusBarHeight;
			this.getmsg()
		},
		onUnload() {
			//#ifdef H5
			// 发送, 'message'是一个发送标志，要和后端一致，端口号要和后端socket端口号一样
			io('http://localhost:3000').disconnect()
			//#endif
			
			//#ifdef MP-WEIXIN
			wio('ws://localhost:3000').disconnect()
			//#endif
		},
		methods: {
            send(){
				  if (this.msg) {				
					//#ifdef H5
					// 发送, 'message'是一个发送标志，要和后端一致，端口号要和后端socket端口号一样
					console.log('111')
					io('http://localhost:3000').emit('message',{username:uni.getStorageSync('username'),msg:this.msg})
					//#endif
					
					//#ifdef MP-WEIXIN
					wio('ws://localhost:3000').emit('message', {username:uni.getStorageSync('nickName'),msg:this.msg})
					//#endif
					
					// 最后将发送的信息展示出来
					// this.chatList.push({
					// 	isself: true,
					// 	msg: this.msg
					// })
				  }
			},
			// 接收后端广播的消息
			getmsg(){
				//#ifdef H5
				io('http://localhost:3000',{
					query:{
						username:uni.getStorageSync('username')
					}}).on('msg', data=>{
					if(data.username===uni.getStorageSync('username')){
						this.chatList.push({
							isself: true,
							username:data.username,
							msg: data.msg
						}) 
					}else{
						this.chatList.push({
							isself: false,
							username:data.username,
							msg: data.msg
						}) 
					}	
				})
				//#endif
				
				//#ifdef MP-WEIXIN
				  wio('ws://localhost:3000',{query:{
						openid:uni.getStorageSync('openid')
					}}).on('msg', data=>{
					if(data.username===uni.getStorageSync('nickName')){
						this.chatList.push({
							isself: true,
							username:data.username,
							msg: data.msg
						}) 
					}else{
						this.chatList.push({
							isself: false,
							username:data.username,
							msg: data.msg
						}) 
					}	 
				  })
				//#endif
			}
		}
	}
</script>

<style lang="less">
	.content {
		position: fixed;
		width: 100%;
		background-color: #0F0F27;
		overflow: scroll;

		.topone {
			width: 90%;
			margin-left: 5%;
			height: 128rpx;
			background-color: #292A3F;
			border-radius: 20rpx;
			margin-top: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.chatself {
			display: flex;
			flex-direction: row-reverse;
			// align-items: center;
			// height: 120rpx;
			width: 90%;
			height: 120rpx;
			margin-left: 5%;
			// background-color: #007AFF;
			margin-top: 20rpx;
			margin-bottom: 10rpx;
		}

		.chatother {
			display: flex;
			// align-items: center;
			// height: 120rpx;
			width: 90%;
			height: 120rpx;
			margin-left: 5%;
			// background-color: #fc02ff;
			margin-top: 20rpx;
			margin-bottom: 10rpx;
		}
		
		.person {
			height: 100%;
			width: 80rpx;
			position: relative;
		}
        .nickname {
			position:absolute;
			bottom: 0;
			right:  0;
			color:red;
			font-size:10px;
		}
		
		.chatbgvS {
			color: #FFFFFF;
			padding: 20rpx 40rpx;
			max-width: calc(90% - 140rpx);
			background-color: #292A3F;
			font-size: 24rpx;
			border-radius: 500px 500px 5px 500px;
			margin-right: 10rpx;
			
		}

		.chatbgvO {
			color: #FFFFFF;
			padding: 20rpx 40rpx;
			max-width: calc(90% - 140rpx);
			background-color: #292A3F; 
			font-size: 24rpx;
			border-radius: 5px 500px 500px 500px; 
			margin-left: 10rpx;
		}

		.chatinput {
			position: fixed;
			bottom: 0rpx;
			//#ifdef H5
			height:100rpx;
			//#endif
			//#ifdef MP-WEIXIN
			height: 160rpx;
			//#endif
			width: 100%;
			background-color: #15152D;
			display: flex;
			// justify-content: space-between;
			align-items: center;

			.inputtext {
				width: calc(100% - 80rpx - 50rpx - 38rpx);
				height: 50rpx;
				line-height: 50rpx;
				word-wrap : break-word;
				background-color: #eee;
				color: #000;
				font-size: 28rpx;
			}
		}
	}
</style>
