<template>
	<view class="changepwd">
		<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
		<u--form labelPosition="left" labelWidth="80" :rules="rules" :model="model1" ref="form1">
			<u-form-item :required="required" label="姓名" prop="userInfo.name" borderBottom ref="item1">
				<u--input class="inputx" type="text" placeholder="请输入姓名" inputAlign="right"
					v-model="model1.userInfo.name" border="none"></u--input>
			</u-form-item>
			<u-form-item :required="required" label="联系电话" prop="userInfo.tel" borderBottom ref="item1">
				<u--input class="inputx" type="text" placeholder="请联系人电话" inputAlign="right" maxlength="11"
					v-model="model1.userInfo.tel" border="none"></u--input>
			</u-form-item>
			<picker id="picker" mode="multiSelector" :range="range" :value="value" @columnchange="columnchange"
				@cancel="pickerCancel" @change="getcity">
				<u-form-item :required="required" label="地址" prop="userInfo.address" borderBottom ref="item1">
					<u-input class="inputx" type="text" placeholder="请选择地址" inputAlign="right"
						v-model="model1.userInfo.address" border="none"></u-input>
					<u-icon name="arrow-right"></u-icon>
				</u-form-item>
			</picker>
			<u-form-item label="详细地址" prop="userInfo.raddress" borderBottom ref="item1">
				<u-input class="inputx" type="text" placeholder="请输入详细地址" inputAlign="right"
					v-model="model1.userInfo.raddress" border="none"></u-input>
			</u-form-item>
			<u-form-item @click="selectaddress" label="定位选择" prop="userInfo.jwd" borderBottom ref="item1">
				<u-input disabledColor="#ffffff" disabled class="inputx" type="text" placeholder="请选择地址"
					inputAlign="right" v-model="model1.userInfo.jwd" border="none"></u-input>
				<u-icon name="arrow-right"></u-icon>
			</u-form-item>
			<u-form-item label="默认地址" prop="userInfo.default" borderBottom ref="item1">
				<u-radio-group v-model="model1.userInfo.default" placement="row">
					<u-radio :customStyle="{marginRight: '8px'}" activeColor="#FFDC05" :name="true" label="是 ">是
					</u-radio>
					<u-radio activeColor="#FFDC05" :name="false" label="否 ">否</u-radio>
				</u-radio-group>
			</u-form-item>
		</u--form>
		<div class="footerinfo">
			<u-button class="mt50" shape='circle' type="primary" @click="submit">保存为新地址</u-button>
		</div>
	</view>
</template>

<script>
	import area from '@/utils/area.js'
	export default {
		data() {
			return {
				selected: '',
				range: [
					[''],
					[''],
					['']
				],
				provinceCodes: [],
				cityCodes: [],
				value: [0, 0, 0],
				model1: {
					userInfo: {
						name: null,
						tel: null,
						address: null,
						raddress: null,
						jwd: null,
						default: true,
					},
				},
				required: true,
				rules: {
					'userInfo.name': {
						type: 'string',
						required: true,
						// 自定义验证函数，同步校验
						validator: (rule, value, callback) => {
							//返回true表示校验通过，返回false表示不通过
							// this.$u.test.mobile()就是返回true或者false的，uview自带的校验方法，此处也可以自己写校验函数
							return this.$u.test.chinese(value) || this.$u.test.landline(value);
						},
						message: '请输入真实姓名',
						// 触发器可以同时用blur和change
						trigger: ['change', 'blur'],
					},
					'userInfo.tel': {
						type: 'number',
						required: true,
						validator: (rule, value, callback) => {
							return this.$u.test.mobile(value)
						},
						message: '请入真实手机号',
						trigger: ['change', 'blur'],
					},
					'userInfo.address': {
						type: 'string',
						required: true,
						validator: (rule, value, callback) => {
							return true
						},
						message: '请选择地址',
						trigger: ['change', 'blur'],
					}
				}
			};
		},
		methods: {
			submit() {
				 this.$refs.form1.validate().then( async  (res) => {
					const result = await this.$myRequest({
						url: '/api/address/add',
						data: {
							username: this.model1.userInfo.name,
							iphone: this.model1.userInfo.tel,
							tel: '',
							address: this.model1.userInfo.address,
							home: this.model1.userInfo.jwd,
							isDefault: 1
						}
					})
					setTimeout(()=>{uni.$u.toast(result.data.msg)},1000)
					uni.navigateTo({
						url: '/pages/address_admin/address_admin'
					})
				}).catch(errors => {
					uni.$u.toast('信息有误')
			    })
			},
			pickerCancel() {
				console.log('pickerCancel')
			},
			selectaddress() {
				var that = this;
				uni.chooseLocation({
					success: function(res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
						that.model1.userInfo.jwd = res.address
					}
				});
			},
			getcity(e) {
				console.log(e)
				var cityselect = e.detail.value
				this.model1.userInfo.address = this.range[0][cityselect[0]] + " " + this.range[1][cityselect[1]] + " " +
					this.range[2][cityselect[2]]
			},
			columnchange: function(e) {
				this.value[e.detail.column] = e.detail.value
				this.selected = ''
				if (0 == e.detail.column) {
					let provinceCode = this.provinceCodes[e.detail.value - 1]
					this.range[1] = ['']
					this.range[2] = ['']
					let cities = ['']
					this.cityCodes = []
					for (let cityCode in area.city_list) {
						if (Number(cityCode) >= Number(provinceCode) && Number(cityCode) <= Number(provinceCode) +
							9900) {
							cities.push(area.city_list[cityCode])
							this.cityCodes.push(cityCode)
						}
					}
					this.range[1] = cities
					this.value.splice(1, 1, 0)
					this.value.splice(2, 1, 0)
				} else if (1 == e.detail.column) {
					this.value[2] = 0
					let cityCode = this.cityCodes[e.detail.value - 1]
					this.range[2] = ['']
					let counties = ['']
					for (let countyCode in area.county_list) {
						if (Number(countyCode) >= Number(cityCode) && Number(countyCode) <= Number(cityCode) + 99) {
							counties.push(area.county_list[countyCode])
						}
					}
					this.range[2] = counties

					this.value.splice(2, 1, 0)
					console.log(this.value)
					console.log(this.cityCodes)
					console.log(this.range)
				}
				this.$forceUpdate()
				if (this.range[2][this.value[2]]) {
					this.selected = this.range[2][this.value[2]]
				} else if (this.range[1][this.value[1]]) {
					this.selected = this.range[1][this.value[1]]
				} else if (this.range[0][this.value[0]]) {
					this.selected = this.range[0][this.value[0]]
				}
			}
		},
		onShow: function() {
			for (let provinceCode in area.province_list) {
				this.range[0].push(area.province_list[provinceCode])
				this.provinceCodes.push(provinceCode)
			}
		}
	};
</script>

<style lang="scss" scoped>
	.changepwd {
		width: 100%;
		margin: 0 auto;
	}

	.inputx {
		width: 100%;
		text-align: right;
	}

	.mt50 {
		margin-top: 50rpx;
	}

	.footerinfo {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: nowrap;
		flex-direction: row;
		height: 100rpx;
		position: fixed;
		bottom: 0;
		width: 750rpx;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>
