<template>
	<view class="tabs">
		<view @click="$parent.currentIndex = index" class="tab-item" v-for="(item,index) in tabList" :key='index'>
			<view class='tab-in' :class="{active: currentIndex === index}">{{item}}</view>
		</view>

	</view>
</template>

<script>
	export default{
		props:{
			currentIndex:Number,
			tabList:Array
		}
		
	}
</script>

<style scoped lang="scss">
	.tabs {
		height: 100rpx;
		background-color: #fed;
		display: flex;

		.tab-item {
			line-height: 100rpx;
			height: 100%;
			padding: 0 20rpx;

			.tab-in {
				&.active {
					box-sizing: border-box;
					height: 80%;
					border-bottom: 2px solid darkgreen;
				}

			}
		}
	}
</style>
