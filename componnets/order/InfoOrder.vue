<template>
	<view class="info">
		<view class="info-item">
			<text class="iconfont icon-location"></text>
			<text>{{goodInfo[0].address}}</text>
		</view>
		<view class="info-item">
			<text class="iconfont icon-delete"></text>
			<text>查看食品安全档案</text>
		</view>
		<view class="info-item">
			<text class="iconfont icon-zengjia"></text>
			<text>配送时间{{goodInfo[0].times}}</text>
		</view>
		<view class="info-item">
			<text class="iconfont icon-xiaoxi"></text>
			<text>商家服务:到店自取(享优惠)</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['goodInfo']
	}
</script>

<style scoped lang="scss">
	.info {
		height: 100%;
		background-color: #eee;
		overflow: hidden;

		.info-item {
			margin: 20rpx 0;
			padding: 30rpx 10rpx;
			font-size: 26rpx;
			background-color: #fff;
			display: flex;
			align-items: center;

			.iconfont {
				margin-right: 15rpx;
			}
		}
	}
</style>
