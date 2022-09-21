<template>
	<section class="aui-flexView">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-return"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title">我的订单</span>
			</div>
			<a href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-sys"></i>
			</a>
		</header>
		<section class="aui-scrollView">
			<div class="aui-tab" data-ydui-tab>
				<ul class="tab-nav">
					<block v-for="(menuTab,index) in menuTabs" :key="index">
						<li v-bind:id="'tabNum'+index" @click="swichMenu(index)" :class="[currentTab==index ? 'tab-nav-item tab-active' : 'tab-nav-item']">
							{{menuTab.name}}
						</li>
					</block>
				</ul>
				<div class="divHeight"></div>
				<div class="tab-panel">
					<block v-for="(menuList,index2) in menuLists" :key="index2">
						<div :class="[currentTab==index2 ? 'tab-panel-item tab-active' : 'tab-panel-item']">
							<block v-for="(menuList2,index3) in menuList" :key="index3">
								<div class="tab-item">
									<a href="javascript:void(0);" class="aui-well-item aui-well-item-clear">
										<div class="aui-well-item-hd">
											<img :src="menuList2.logoimg" alt="">
										</div>
										<div class="aui-well-item-bd">
											<h3>{{menuList2.dname}}</h3>
										</div>
										<span class="aui-well-item-fr">{{menuList2.zt}}</span>
									</a>
									<div class="aui-mail-product">
										<a href="javascript:;" class="aui-mail-product-item">
											<div class="aui-mail-product-item-hd">
												<img :src="menuList2.img" alt="">
											</div>
											<div class="aui-mail-product-item-bd">
												<p>{{menuList2.name}}</p>
											</div>
										</a>
									</div>
									<a href="javascript:;" class="aui-mail-payment">
										<p>
											共{{menuList2.sum}}件商品 实付款: ￥{{menuList2.pri}}
										</p>
									</a>
									<div class="aui-mail-button">
										<a href="javascript:;" :class="[menuList2.but_ddshouhuo==0 ? 'hd' : menuList2.but_ddshouhuo==2 ? '' :'aui-df-color']">等待收货</a>
										<a href="javascript:;" :class="[menuList2.but_wuliu==0 ? 'hd' : menuList2.but_wuliu==2 ? '' :'aui-df-color']">查看物流</a>
										<a href="javascript:;" :class="[menuList2.but_rebuy==0 ? 'hd' : menuList2.but_rebuy==2 ? '' :'aui-df-color']">再次购买</a>
										<a href="javascript:;" :class="[menuList2.but_pingjia==0 ? 'hd' : menuList2.but_pingjia==2 ? '' :'aui-df-color']">评价晒单</a>
										<a href="javascript:;" :class="[menuList2.but_fapiao==0 ? 'hd' : menuList2.but_fapiao==2 ? '' :'aui-df-color']">查看发票</a>
										<a href="javascript:;" :class="[menuList2.but_zhifu==0 ? 'hd' : menuList2.but_zhifu==2 ? '' :'aui-df-color']">去支付</a>
									</div>
								</div>
								<div :class="[index3+1==menuList.length ? 'hd':'divHeight']"></div>
							</block>
						</div>
					</block>
				</div>
			</div>
		</section>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				scrollLeft: 0,
				isClickChange: false,
				currentTab: 0,
				menuTabs: [
					{
						name: '全部'
					}, {
						name: '待付款'
					}, {
						name: '待收货'
					}, {
						name: '已完成'
					}, {
						name: '已取消'
					},
				],
				/*menuLists中5个数组,分别代表全部,待付款,待收货,已完成,已取消*/
				menuLists: [
					/*全部*/
					[],
					/*待付款*/
					[],
					/*待收货*/
					[],
					/*已完成*/
					[],
					/*已取消*/
					[],
				]
			}
		},
		onLoad() {
			this.getDateList()
		},
		methods: {
			swichMenu: async function(current) { //点击其中一个选项
				if (this.currentTab == current) {
					return false;
				} else {
					this.currentTab = current;
					this.setScrollLeft(current);
				}
			},
			swiperChange: async function(e) {
				let index = e.target.current;
				this.setScrollLeft(index);
				this.currentTab = index;
			},
			setScrollLeft: async function(tabIndex) {
				let leftWidthSum = 0;
				for (var i = 0; i <= tabIndex; i++) {
					let nowElement = await this.getWidth('tabNum' + i);
					leftWidthSum = leftWidthSum + nowElement.width;
				}
				let winWidth = uni.getSystemInfoSync().windowWidth;
				this.scrollLeft = leftWidthSum > winWidth ? (leftWidthSum - winWidth) : 0
			},
			getWidth: function(id) { //得到元素的宽高
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select("#" + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
				})
			},
			async getDateList() {
				const res = await this.$myRequest({
					url: '/api/order/order',
					data:{code:0}
				})
				if(res.length>0){
					const Arr = res.map(item=>{
					return {
							"logoimg": '../../static/icon-logo.png',
							"dname":"自营Apple产品专营店",
							"zt":"已完成",
							"img": this.$url + JSON.parse(item.good_pic)[0],
							"name":item.good_name,
							"sum":item.count,
							"pri":item.count*Number(item.new_price),
							// 0=没有,1=有,2=标红
							"but_rebuy":0,
							"but_pingjia":0,
							"but_fapiao":0,
							"but_zhifu":1,
							"but_wuliu":0,
							"but_ddshouhuo":0,
					}
					})
					/*使用这种赋值方式,页面可以监听*/
					this.$set(this.menuLists,0,Arr)
				}
			},
		}
	}
</script>

<style>
	@import '../../css/style.css';
</style>
