<template>
	<view class="page_reg">
		<input class="phone" type="text" placeholder="手机号" v-model="phone" />
		<button class="submit" type="primary" @tap="nextPage">下一步</button>
		<text class="tip">我们将向您的手机发送验证短信</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:''
			}
		},
		methods: {
			nextPage() {
				uni.navigateTo({
					url:'/pages/reg-pwd/reg-pwd?phone='+this.phone
				})
			}
		},
	}
</script>

<style>
	page {
		height: auto;
		min-height: 100%;
		background-color: #f5f6f8;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
<style lang="scss" scoped="">
	$form-border-color: rgba(214, 214, 214, 1);
	$text-color: #B6B6B6;
	
	.page_reg {
		width: 90%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.phone {
		width: 100%;
		border-bottom: 1px solid $form-border-color;
	}
	
	.submit {
		width: 100%;
		margin-top: 30px;
		color: white;
		background-color: rgba(252, 44, 93, 1.0);
		-webkit-tap-highlight-color: rgba(252, 44, 93, 1.0);
	
		&:active {
			color: #B6B6B6;
			background-color: rgba(252, 44, 93, 0.8);
		}
	}
	
	.tip {
		margin-top: 30px;
		font-size: 13px;
		color: $text-color;
	}
</style>
