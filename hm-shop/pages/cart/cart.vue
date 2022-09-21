<template>
	<view>
		<view v-if="showFlog">
		<u-sticky customNavHeight="0">
			<view>
				<view class="y-system-height bg-white"></view>
				<view class="bg-white y-flex y-font-size-26 y-p-y-20 y-p-x-30 y-align-center y-justify-between">
					<view class="w-90 y-flex y-justify-end" @click="isEdit = !isEdit">
						<span v-if="!isEdit">编辑</span>
						<span v-else>取消</span>
					</view>
					<view class="y-weight-bold y-font-size-32">
						购物车
					</view>
					<view class="w-90"></view>
				</view>
			</view>
		</u-sticky>
		<view>
			<view class="store-list y-p-30">
				<view class="bg-white store-single y-p-30 y-m-b-30 y-radius-30" v-for="(storeItem, storeIndex) in shoppingCart" :key="storeIndex">
					<view @click="storeSelBtn(storeIndex)" class="store-header y-flex y-align-center">
						<view class="sel-btn y-p-t-5">
							<u-icon v-if="(storeItem.isBuySelect && !isEdit) || (storeItem.isDelSelect && isEdit)" name="checkmark-circle-fill" color="#04BE02" size="40rpx"></u-icon>
							<view v-else class="no-select"></view>
						</view>
						<span class="y-font-size-30 y-m-l-13 y-m-r-10">{{storeItem.storeName}}</span>
						<u-icon name="arrow-right"></u-icon>
					</view>
					<view class="goods-list y-p-l-20">
						<view class="goods-item y-flex y-p-t-20" v-for="(goodsItem, goodsIndex) in storeItem.goodsList" :key="goodsIndex">
							<view @click="goodsSelBtn(storeIndex, goodsIndex)" class="y-flex y-align-center">
								<view class="sel-btn">
									<u-icon v-if="(goodsItem.isBuySelect && !isEdit) || (goodsItem.isDelSelect && isEdit)" name="checkmark-circle-fill" color="#04BE02" size="40rpx"></u-icon>
									<view v-else class="no-select"></view>
								</view>
							</view>
							<view class="y-m-l-15">
								<u-image :src="goodsItem.image" radius="10rpx" width="162rpx" height="162rpx"></u-image>
							</view>
							<view class="y-m-l-28 y-flex y-flex-1 y-flex-column">
								<view class="y-flex-1">
									<view class="goods-name y-font-size-28"> {{goodsItem.goodsName}} </view>
								</view>
								<view class="goods-price y-flex y-align-end y-flex-1">
									<view class="y-flex-1 y-font-size-30 y-weight-bold color-price"> ￥{{goodsItem.price}} </view>
									<view> 
		
										<u-number-box v-model="goodsItem.count" v-bind:disabled="numDisabled" @minus="numBoxMinus(goodsIndex)" @plus="numBoxPlus(goodsIndex)"></u-number-box>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view style="height: 120rpx;"></view>
		</view>
		<!-- #ifdef H5 -->
		<view class="y-position-fixed y-bottom-position y-left-0 y-right-0 y-p-y-20 y-p-x-30 bg-white y-flex">
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="y-position-fixed y-bottom-0 y-left-0 y-right-0 y-p-y-20 y-p-x-30 bg-white y-flex">
		<!-- #endif -->
			<view class="y-flex y-flex-1 y-align-center">
				<view @click="allSelBtn()" class="store-header y-flex y-align-center">
					<view class="sel-btn y-p-t-5">
						<u-icon v-if="allSelState" name="checkmark-circle-fill" color="#04BE02" size="40rpx"></u-icon>
						<view v-else class="no-select"></view>
					</view>
					<span class="y-font-size-28 y-m-l-10">全选</span>
				</view>
			</view>
			<view class="y-flex y-align-center y-font-size-28">
				<view v-if="!isEdit" class="y-font-size-33"> 总计: <span class="color-price y-weight-bold y-m-l-8">￥ {{totalPrice}} </span> </view>
				<view class="y-flex y-m-l-25">
					<u-button v-if="!isEdit" shape="circle" :hairline="false" :customStyle="submitBtnStyle" @click="totalGoods()"> 结算( {{totalSelCount}} ) </u-button>
					<u-button v-else shape="circle" :hairline="false" :customStyle="submitBtnStyle" @click="deleteGoods()"> 删除( {{totalSelCount}} ) </u-button>
				</view>
			</view>
		</view>
		</view>	
		<view v-else class="cart-container">
				<view class="cart-empty">
					<image src="../../static/image/none_shop.png" class="empty-img">
						<view class="ns-text-color-gray">
							<text>购物车空空如也!</text>
						</view>
					</div>
			</view>
		</view>
	</view>
</template>

<script>
	import initApp from '@/utils/weixinInit.js'
	export default {
		data() {
			return {
				isEdit: false, //是否编辑（购物/编辑）
				shoppingCart: [],//购物车数据
				numDisabled: false,//步进器禁用状态
				submitBtnStyle: {
					background: '#FD7026',
					color: '#ffffff',
					border: 'none'
				},//结算、删除按钮的样式
				showFlog:true //如果购物车为空，则显示购物车为空
			}
		},
		computed:{
			//是否已经全部选中
			allSelState(){
				let buyAllSelect = true // 购物全选
				let delAllSelect = true // 编辑全选
				this.shoppingCart.forEach(sitem=>{
					sitem.goodsList.forEach(gitem=>{
						if(!gitem.isBuySelect) buyAllSelect = false;
						if(!gitem.isDelSelect) delAllSelect = false;
					})
				})
				if(!this.isEdit) return buyAllSelect;
				else return delAllSelect;
			},
			//总价格
			totalPrice(){
				let totalPrice = 0
				this.shoppingCart.forEach(sitem=>{
					sitem.goodsList.forEach(gitem=>{
						if(gitem.isBuySelect){
							totalPrice = totalPrice*1 + gitem.price*gitem.count
						}
					})
				})
				return totalPrice
			},
			//当前操作下选中的数量
			totalSelCount(){
				let buyCount = 0 // 购物全选
				let delCount = 0 // 编辑全选
				this.shoppingCart.forEach(sitem=>{
					sitem.goodsList.forEach(gitem=>{
						if(gitem.isBuySelect){
							buyCount = buyCount*1 + gitem.count
						}
						if(gitem.isDelSelect){
							delCount = delCount*1 + 1
						}
					})
				})
				if(!this.isEdit){
					return buyCount
				} else{
					return delCount
				}
			}
		},
		/*
		onLoad只加载一次，监听页面加载，其参数为上个页面传递的数据，参数类型为Object（用于页面传参）
		onshow监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面。
		*/
		onShow() {
			/*先清除购物车缓存数据，再获取数据*/
			this.shoppingCart = []
			/*进行登录验证判断*/
			const result = initApp()
			result ? this.getData() : ''
		},
		methods: {
			//请求数据
			//我这里只有一家店铺，所以给shoppingCart设置一个索引
				async getData(){
					const res = await this.$myRequest({
						url: '/api/shop/list'
					})
					let goodsList = []
					/*设置显示的内容*/
					res.length && res.length > 0 ? this.showFlog = true : this.showFlog = false
					if(res.length){
						res.map((item,index)=>{
							let obj = {
								id: item.s_id,
								shop_id: item.shop_id,
								goodsName: item.good_name,
								image: this.$url + JSON.parse(item.good_pic)[0],
								price: item.new_price, 
								count: item.count,
								isDelSelect: false,
								isBuySelect: false,
							}
							goodsList.push(obj)
						})
					this.shoppingCart.push({
						id: 1,
						storeName: '万能商城',
						isDelSelect: false,
						isBuySelect: false,
						goodsList: goodsList
					})
				}
			},
			//商家的选中与否
			storeSelBtn(storeIndex){
				if(!this.isEdit){ //购物
					this.shoppingCart[storeIndex].isBuySelect = !this.shoppingCart[storeIndex].isBuySelect
					this.shoppingCart[storeIndex].goodsList.forEach(item=>{
						item.isBuySelect = this.shoppingCart[storeIndex].isBuySelect
					})
				}else{//编辑
					this.shoppingCart[storeIndex].isDelSelect = !this.shoppingCart[storeIndex].isDelSelect
					this.shoppingCart[storeIndex].goodsList.forEach(item=>{
						item.isDelSelect = this.shoppingCart[storeIndex].isDelSelect
					})
				}
			},
			//商品的选中与否
			goodsSelBtn(storeIndex, goodsIndex){
				if(!this.isEdit){ //购物
					this.shoppingCart[storeIndex].goodsList[goodsIndex].isBuySelect = !this.shoppingCart[storeIndex].goodsList[goodsIndex].isBuySelect
					let allIsSel = true //是否已经全部选中
					this.shoppingCart[storeIndex].goodsList.forEach(item=>{
						if(!item.isBuySelect){
							allIsSel = false
						}
					})
					this.shoppingCart[storeIndex].isBuySelect = allIsSel
				}else{//编辑
					this.shoppingCart[storeIndex].goodsList[goodsIndex].isDelSelect = !this.shoppingCart[storeIndex].goodsList[goodsIndex].isDelSelect
					let allIsSel = true //是否已经全部选中
					this.shoppingCart[storeIndex].goodsList.forEach(item=>{
						if(!item.isDelSelect){
							allIsSel = false
						}
					})
					this.shoppingCart[storeIndex].isDelSelect = allIsSel
				}
			},
			//全选
			allSelBtn(){
				let toState = !this.allSelState
				if(!this.isEdit){//购物
					this.shoppingCart.forEach(sitem=>{
						sitem.isBuySelect = toState
						sitem.goodsList.forEach(gitem=>{
							gitem.isBuySelect = toState
						})
					})
				}else{//编辑
					this.shoppingCart.forEach(sitem=>{
						sitem.isDelSelect = toState
						sitem.goodsList.forEach(gitem=>{
							gitem.isDelSelect = toState
						})
					})
				}
			},
			//步进器增
			async numBoxPlus(id){
				this.numDisabled = true
				const res = await this.$myRequest({
					url: '/api/shop/num',
					method:'post',
					data:{s_id:this.shoppingCart[0].goodsList[id].id,count:(this.shoppingCart[0].goodsList[id].count)+1}
				})
				if(res.data.code==200){
					this.numDisabled = false
				}
			},
			//步进器减
			async numBoxMinus(id){
				this.numDisabled = true
				const res = await this.$myRequest({
					url: '/api/shop/num',
					method:'post',
					data:{s_id:this.shoppingCart[0].goodsList[id].id,count:(this.shoppingCart[0].goodsList[id].count)===0?(this.shoppingCart[0].goodsList[id].count):(this.shoppingCart[0].goodsList[id].count)-1}
				})
				if(res.data.code==200){
					this.numDisabled = false
				}
			},
			//批量删除商品
			deleteGoods(){
				this.shoppingCart[0].goodsList.map(async (item,index)=>{
					if(item.isDelSelect){
						const res = await this.$myRequest({
							url: '/api/shop/delete',
							method:'post',
							data:{id:item.id}
						})
						if(res.data.code==200){
							/*后台删除成功后,将该item从本地数据中删除*/
							this.shoppingCart[0].goodsList.splice(index,1)
						}
					}
				})
			},
			//全选商品
			async totalGoods(){
				/*一定要多用filter函数*/
				let checkedlist = this.shoppingCart[0].goodsList.filter(item => item.isBuySelect)
				var arr = [];
				for(var i=0;i<checkedlist.length;i++){
					var item = [];
					item.push(checkedlist[i].shop_id)
					item.push(checkedlist[i].id);
				    item.push(checkedlist[i].count);
					console.log(checkedlist[i])
					arr.push(item);
				}
			    /*将二维数组转成json格式*/ 
				arr = JSON.stringify(arr)
				/**/
				const res = await this.$myRequest({
					url: '/api/pay/order',
					data:{list:arr}
				})
				if(res.data.code==200){
					setTimeout(()=>{
						uni.showToast({
							title: '结算成功!',
							icon: 'none'
						})
					},1000)
					uni.switchTab({
						url:'/pages/me/me'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.w-90{
		width: 90rpx;
	}
	.sel-btn{
		width: 45rpx;
		height: 45rpx;
	}
	.no-select{
		width: 39rpx;
		height: 39rpx;
		border-radius: 50%;
		border: 1px solid rgb(235, 236, 238);
	}
	/*无值页面*/
	.cart-container{
		box-sizing: border-box;
		position: relative;
		display: flex;
		width:100vw;
		height:80vh;
		justify-content:center;
		align-items:center;
	    .cart-empty{
		    text-align: center;
		    font-size: 10px;
		    padding: 0 10px;
				  .empty-img{
					  width:100px;
					  height:50px;
					  margin: 20px auto 10px auto;
				  }
				  .ns-text-color-gray{
				      color: #898989!important;
				  }
		        }
		}
</style>
