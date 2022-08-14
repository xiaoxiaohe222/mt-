<template>
	<view class="takeout-item" @click="takeoutItemClick">
		<view class="left">
			<image class="img" :src="takeout.logo"></image>
		</view>
		<view class="right">
			<view class="title">{{takeout.shop}}</view>
			<view class="sale">
				<text>月售200</text>
				<text>约{{takeout.duration}}分钟</text>
			</view>
			<view class="price">
				<text>起送¥{{takeout.delivering}}</text>
				<text class="price-on">配送¥0.3</text>
				<text>人均¥{{takeout.capita}}</text>
			</view>
			<view class="footer">
				<text class="iconfont icon-xiaoxi"></text>
				<text>{{takeout.types}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			takeout: Object
		},
		methods: {
			takeoutItemClick() {
				uni.navigateTo({
					url: '/packageA/order/order?openid='+this.takeout.openid
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.takeout-item {
		border-bottom: 1rpx solid #ccc;
		padding: 20rpx 0;
		width: 100%;
		height: 200rpx;
		//background-color: #edf;
		display: flex;

		.left {
			flex: 1;
			height: 100%;

			.img {
				width: 100%;
				height: 100%;
			}
		}

		.right {
			margin-left: 5rpx;
			flex: 2;
			height: 100%;

			//background-color: orange;
			.title {}

			.sale {
				margin-top: 10rpx;
				display: flex;
				justify-content: space-between;
				font-size: 24rpx;
				color: gray;
			}

			.price {
				padding: 20rpx 0;
				font-size: 24rpx;
				color: gray;

				.price-on {
					margin: 0 30rpx;
				}

			}

			.footer {
				font-size: 24rpx;
				color: gray;
			}
		}
	}
</style>
