<template>
	<view class="pay">
		<!-- 头部收货地址区域 -->
		<view class="address" @click="getAddress">
			<!-- 如果没有点击收货地址 -->
			<view v-if="!addressInfo.userName" class="no-address">+新增收货地址</view>
			<!-- 已经选择收货地址 -->
			<view class="has-address" v-else>
				<div class="info">
					<image class="avatar" src="../../static/coen/address.png"></image>
					<view class="detail">
						<view>{{addressInfo.cityName}}-{{addressInfo.countyName}}-{{addressInfo.detailInfo}}</view>
						<view>{{addressInfo.userName}} {{addressInfo.telNumber}}</view>
					</view>
				</div>
				<image class="r-arrow" src="../../static/coen/jiantou.png"></image>
			</view>
		</view>
		<!-- 立即送出 -->
		<view class="now">
			<image class="now-img" src="../../static/coen/times.png"></image>
			<text>立即送出</text>
		</view>
		<!-- 订单列表 -->
		<view class="order-list">
			<view class="order-item" v-for="(item,index) in orderData.goodList" :key='index'>
				<view class="left">
					<image class="order-item-img" :src="item.objdis.image"></image>
					<view class="desc">
						<view>{{item.objdis.input}}</view>
						<view class="price">x{{item.count}}</view>
					</view>
				</view>
				<view class="right">
					单价:¥{{item.objdis.Discount}}
				</view>
			</view>
		</view>
		<!-- 配送费 -->
		<view class="delivery">
			配送费: ¥{{orderData.physical}}
		</view>
		<!-- 高度90 -->
		<view style="height: 90rpx;"></view>
		<!-- footer bar -->
		<view class="bar">
			<text class="total">合计: <text style="font-weight: bold;">¥{{totalMoney}}</text>
			</text>
			<view class="pay-btn" @click="toPay">去支付</view>
		</view>
	</view>
</template>

<script>
	import request from '@/api/request.js'
	export default {
		data() {
			return {
				addressInfo: {},
				orderData: {}
			}
		},
		onLoad() {
			this.orderData = JSON.parse(uni.getStorageSync('orderData') || '{}')
			console.log(this.orderData)
		},
		computed: {
			totalMoney() {
				return (this.orderData.payment * 10 + this.orderData.physical * 10).toFixed(0) / 10
			}
		},
		methods: {
			getAddress() {
				uni.chooseAddress({
					success: (res) => {
						this.addressInfo = res
					},
					fail: (e) => {
						console.log(e)
					}
				})
			},
			async toPay() {
				// 去支付    支付的前提是 第一：必须选择了收货地址   第二至少一件商品  
				if (!this.addressInfo.userName) {
					return uni.showToast({
						title: '必须填收货地址'
					})
				}
				// 判断是否有商品数据
				if (this.orderData.goodList.length <= 0) {
					return uni.showToast({
						title: '必须选择一个商品才能支付'
					})
				}
				// 进入这里表示可以支付
				/*
				MerchantId: "5dfcf328da83f620e4077113"
				goodList: [{_id: "5e63bc5859eb7e2bff8479cc", openid: "5dfcf328da83f620e4077113", optidata: "烤串",…}]
				logo: "http://lstkk.oss-cn-beijing.aliyuncs.com/meituan/public/uploads/1583594443653.png"
				payment: 0.4
				physical: 1
				
				*/
				// 第一步 统一下单
				let data = {
					peopleobj: {
						address: this.addressInfo.detailInfo,
						name: this.addressInfo.userName,
						ophone: this.addressInfo.telNumber
					},
					arrinfo: this.orderData.goodList,
					merchantid: this.orderData.MerchantId,
					ide: this.orderData.MerchantId.slice(0, 7),
					commod: this.orderData.shop, //商家名称
					logo: this.orderData.logo,
					useropenid: this.orderData.openid,
					payment: this.orderData.payment + this.orderData.physical

				}
				console.log(data, "data参数")
				const res = await request('/wxpay/fictpay', data, 'POST')
				if (res.msg = "SUCCESS") {
					uni.showToast({
						title: res.datas,
						icon: "success"
					})
				}


			}
		}
	}
</script>

<style scoped lang="scss">
	.pay {
		padding: 20rpx;
		min-height: 100vh;
		background-color: #f6f6f6;

		.address {
			position: relative;
			height: 150rpx;
			background-color: #fff;

			.no-address {
				width: 300rpx;
				height: 70rpx;
				border: 1rpx solid darkgreen;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				line-height: 70rpx;
				text-align: center;
				font-size: 24rpx;
				color: darkgreen;
				border-radius: 40rpx;
			}

			.has-address {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.info {
					height: 100%;
					display: flex;
					align-items: center;

					.avatar {
						width: 40rpx;
						height: 40rpx;
						margin: 0 10rpx;
					}

					.detail {
						font-size: 28rpx;
						display: flex;
						flex-direction: column;
					}
				}

				.r-arrow {
					width: 35rpx;
					height: 35rpx;
					margin-right: 10rpx;
				}
			}
		}

		.now {
			background-color: #fff;
			height: 90rpx;
			border-top: 1rpx solid #eee;
			display: flex;
			align-items: center;
			font-size: 26rpx;

			.now-img {
				margin: 0 10rpx;
				width: 35rpx;
				height: 35rpx;
			}
		}

		.order-list {
			margin-top: 20rpx;
			background-color: #fff;

			.order-item {
				border-bottom: 1rpx solid #eee;
				//background-color: #fff;
				height: 200rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.left {
					display: flex;
					align-items: center;
					height: 80%;

					.order-item-img {
						width: 200rpx;
						height: 90%;
						margin-right: 15rpx;
					}

					.desc {
						height: 100%;
						display: flex;
						flex-direction: column;
						font-size: 28rpx;

						.price {
							font-size: 24rpx;
						}
					}
				}

				.right {
					height: 80%;
					font-size: 26rpx;
				}
			}
		}

		.delivery {
			background-color: #fff;
			height: 90rpx;
			margin-top: 20rpx;
			line-height: 90rpx;
			text-align: right;
			font-size: 24rpx;
		}

		.bar {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100vw;
			height: 90rpx;
			line-height: 90rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;
			padding: 0 20rpx;
			font-size: 24rpx;

			.total {}

			.pay-btn {
				box-sizing: border-box;
				height: 70rpx;
				line-height: 50rpx;
				text-align: center;
				padding: 10rpx 50rpx;
				background-color: darkgreen;
				color: #fff;
				margin-right: 70rpx;
			}
		}
	}
</style>
