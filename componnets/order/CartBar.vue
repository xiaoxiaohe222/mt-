<template>
	<view class="cart-bar">
		<view class="inner">
			<view class="inner-left">
				<image v-if="totalCount<=0" class="img" src="../../static/coen/weigou.png"></image>
				<image class="img" v-else src="../../static/coen/yigou.png"></image>
				<view class="point" v-if="totalCount>0">{{totalCount}}</view>
				<view class="price">
					<view class="total">¥{{totalMoney}}</view>
					<view class="other-need">另需配送费0.3元</view>
				</view>
			</view>
			<view @click="pay" class="start-price" :class="{active: showText!==delivering+'元起送'}">
				{{showText}}
			</view>
		</view>
		<!-- 模态框 -->
		<MyModel :showModel.sync="showModel"></MyModel>
	</view>
</template>

<script>
	import MyModel from '@/componnets/common/MyModel.vue'
	// 三种状态  1元起送   还差0.8元（yelllow）  去结算（yellow）
	export default {
		props: ['totalCount', 'totalMoney', 'delivering'],
		components: {
			MyModel
		},
		data() {
			return {
				showModel: false
			}
		},
		methods: {
			pay() {
				// 如果不是显示 去结算 点击无效
				if (this.showText !== '去结算') return
				// 如果没有登录，则需要先登
				if (!uni.getStorageSync('userInfo')) {
					this.showModel = true
				} else {
					uni.navigateTo({
						url: '/packageA/pay/pay'
					})
				}

			}
		},
		computed: {
			showText() {
				if (this.totalMoney <= 0) {
					return `${this.delivering}元起送`
				} else if (this.totalMoney > 0 && this.totalMoney < 1) {
					let number = (1 * 10 - this.totalMoney * 10) / 10
					//console.log(number, 88888, this.totalMoney)
					return `还差${number}起送`
				} else {
					return '去结算'
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.cart-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		height: 130rpx;
		//background-color: pink;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;

		.inner {
			overflow: hidden;
			height: 100%;
			width: 90%;
			background-color: #000;
			border-radius: 75rpx;

			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #fff;

			.inner-left {
				position: relative;
				width: 75%;
				height: 100%;
				display: flex;

				.img {
					width: 110rpx;
					height: 130rpx;
				}

				.point {
					position: absolute;
					left: 80rpx;
					top: 50rpx;
					width: 30rpx;
					height: 30rpx;
					text-align: center;
					line-height: 30rpx;
					font-size: 20rpx;
					border-radius: 50%;
					color: #fff;
					background-color: red;
				}

				.price {
					margin-left: 20rpx;
					height: 100%;

					.total {
						margin: 10rpx 0;
					}

					.other-need {
						font-size: 26rpx;
						color: #a9a9a9;
					}
				}
			}

			.start-price {
				width: 25%;
				height: 100%;
				text-align: center;
				line-height: 130rpx;

				&.active {
					background-color: darkgreen;
					color: #fff;
				}
			}
		}
	}
</style>
