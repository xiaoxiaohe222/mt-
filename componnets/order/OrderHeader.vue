<template>
	<view class="header">
		<image class="img" :src="goodInfo[0].logo"></image>
		<view class="title">
			<view>{{goodInfo[0].shop}}</view>
			<view class="time">
				<text class="iconfont icon-delete"></text>
				<text >配送约{{goodInfo[0].duration}}分钟</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['goodInfo']
	}
</script>

<style scoped lang="scss">
	.header{
		height: 150rpx;
		background-image: linear-gradient(to top, lightgreen, darkgreen);
		display: flex;
		align-items: center;
		
		.img{
			width: 100rpx;
			height: 100rpx;
			margin-right: 20rpx;
		}
		.title{
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			.time{
				margin-top: 20rpx;
				font-size: 24rpx;
			}
		}
	}
</style>
