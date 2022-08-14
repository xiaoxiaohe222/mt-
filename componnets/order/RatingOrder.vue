<template>
	<view class="rating">
		<view class="title-list" v-if="allRating.length">
			<view v-for="(item,index) in allTags" :key="index" class="title-item"
				:class="{active : currentIndex === index}" @click="tagClick(item,index)">{{item}}</view>
		</view>

		<block v-if="allRating.length">
			<scroll-view class="scroll" scroll-y="true">
				<view class="content-item" v-for="(item,index) in allRating" :key="index">
					<view class="content-item-header">
						<view class="left">
							<image class="img" src="../../static/loadingmeituan.jpg"></image>
							<text>{{item.nickName}}</text>
						</view>
						<text class="date">{{item.time}}</text>
					</view>
					<view class="content-body">
						{{item.usermess}}
					</view>
				</view>
			</scroll-view>
		</block>
		<view v-else style="text-align: center;padding: 30rpx 0;">暂无评论</view>
	</view>
</template>

<script>
	export default {
		props: ['goodRating'],
		data() {
			return {
				currentIndex: 0
			}
		},
		methods: {
			tagClick(item, index) { //点击每个tag的回调
				this.currentIndex = index
				// 调用父组件的方法获取评论数据
				let data = {}
				if (item !== '全部') {
					data.classmessage = item
				}
				this.$parent.getRatingData(data)
			}
		},
		computed: {
			// 计算所有的标签
			allTags() {
				let res = []
				res = this.goodRating.map(item => item.classmessage)
				// 去重
				res = [...new Set(res)]
				// 去掉空值
				res = res.filter(item => item.length)
				res = ['全部', ...res]
				return res
			},
			// 计算所有的评论
			allRating() {
				return this.goodRating.map(item => item.messagedata)
			}
		}
	}
</script>

<style scoped lang="scss">
	$height: 80rpx;

	.scroll {
		height: calc(100% - #{$height});
	}

	.rating {
		height: 100%;
		padding: 0 10rpx;

		.title-list {
			padding-top: 20rpx;
			height: 60rpx;
			display: flex;
			flex-wrap: wrap;

			.title-item {
				padding: 10rpx;
				border: 1rpx solid #ccc;
				margin-right: 15rpx;
				font-size: 24rpx;
				font-weight: bold;

				&.active {
					background-color: darkgreen;
					color: #fff;
				}
			}
		}

		.content-item {
			border-bottom: 1px solid #ccc;
			padding: 30rpx 10rpx;

			.content-item-header {
				display: flex;
				width: 100%;
				align-items: center;
				justify-content: space-between;

				.left {
					display: flex;
					align-items: center;
					height: 100%;
					color: #bfbfbf;

					.img {
						width: 30rpx;
						height: 30rpx;
						margin-right: 15rpx;
					}
				}

				.date {
					font-size: 24rpx;
				}
			}

			.content-body {
				font-size: 28rpx;
				padding-top: 20rpx;
			}
		}

	}
</style>
