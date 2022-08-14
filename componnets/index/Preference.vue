<template>
	<view class="preference">
		<view class="title">为你优选</view>
		<scroll-view class="scroll" :scroll-x="true" @scroll="scrollFn">
			<view class="scroll-item" v-for="item in preferData" :key="item._id">
				<view class="item-box">
					<image class="scroll-item-img" mode="widthFix" :src="item.image"></image>
					<view class="pre-item-title">{{item.title}}</view>
					<view class="pre-item-subtitle">{{item.lable}}</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props:{
			preferData:Array
		},
		methods: {
			scrollFn() {

			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.uni-scroll-view::-webkit-scrollbar {
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		display: none
	}

	.preference {
		margin: 30rpx 0;
		.title {
			color: #534e4d;
			margin-bottom: 5rpx;
		}

		.scroll {
			white-space: nowrap;
			width: 100%;
			height: 250rpx;

			// background-color: #fed;
			.scroll-item {
				display: inline-block;
				margin-right: 10rpx;
				width: 290rpx;
				height: 250rpx;

				.item-box {
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					// background-color: #bfe;
					.scroll-item-img {
						width: 290rpx;
						height: 150rpx;
					}

					.pre-item-title {
						font-size: 28rpx;
					}

					.pre-item-subtitle {
						font-size: 24rpx;
						color: gray;
					}
				}

			}
		}


	}
</style>
