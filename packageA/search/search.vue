<template>
	<view class="search-box">
		<!-- 搜索框部分 -->
		<view class="search-input">
			<input @confirm="inputConfirm" v-model="searchdata" confirm-type="search" type="text" placeholder="请输入关键字"
				focus />
			<view class="btn" @click="inputConfirm">搜索</view>
		</view>
		<!-- 搜素历史部分 -->
		<view class="history" v-if="showHistory">
			<view class="history-header">
				<text>搜索历史</text>
				<text @click="delAll" class="iconfont icon-delete"></text>
			</view>
			<view class="history-content">
				<view @click="getData(item)" class="item" v-for="(item,index) in historyData" :key="index">{{item}}
				</view>
			</view>
		</view>
		<!-- 搜索没有结果的图片展示 -->
		<view v-if="takeoutData.length === 0 && showHistory === false" class="no-results" @confirm='inputConfirm'>
			<image class="img" src="../../static/coen/meoyopu.png" mode=""></image>
			<text class="no-results-title">没有你要找的商品</text>
		</view>
		<!-- 搜索结果展示 -->
		<Takeout v-if="takeoutData.length !== 0 && showHistory === false" :takeoutData='takeoutData'></Takeout>

	</view>
</template>

<script>
	import request from '../../api/request.js'
	import Takeout from '@/componnets/index/Takeout.vue'
	export default {
		data() {
			return {
				showHistory: true,
				searchdata: '',
				takeoutData: [],
				historyData: JSON.parse(uni.getStorageSync('history') || '[]')
			};
		},
		watch: {
			historyData: {
				handler(newV) {
					uni.setStorageSync('history', JSON.stringify(newV))
				},
				deep: true
			}
		},
		components: {
			Takeout
		},
		methods: {
			delAll() {
				uni.showModal({
					title: '提示',
					content: '确定删除吗?',
					success: (res) => {
						if (res.confirm) {
							this.historyData = []
							uni.removeStorageSync('history');
						}
					}
				});

			},
			inputConfirm() {
				this.getData(this.searchdata)
			},
			async getData(searchdata) {
				this.showHistory = false
				this.searchdata = searchdata
				try {
					const res = await request('/forshop/search', {
						searchdata
					}, 'POST')
					if (Array.isArray(res)) {
						this.takeoutData = res
					} else {
						this.takeoutData = []
					}

				} catch (e) {
					console.log(e)
				}
				// 将搜索历史添加记录
				if (!this.historyData.includes(this.searchdata)) {
					if (!this.searchdata.trim()) return
					this.historyData.unshift(this.searchdata)
				}
			}


		}
	}
</script>

<style lang="scss" scoped>
	.search-box {

		//background-color: #fed;
		.search-input {
			display: flex;
			align-items: center;
			height: 100rpx;
			padding-left: 20rpx;

			input {
				padding-left: 30rpx;
				width: 80%;
				background-color: #eee;
				height: 70%;
				border-radius: 15rpx;
			}

			.btn {
				width: 20%;
				text-align: center;
			}
		}

		.history {
			padding: 30rpx 20rpx 0;

			.history-header {
				height: 60rpx;

				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			.history-content {
				padding-top: 20rpx;
				display: flex;
				flex-wrap: wrap;

				.item {
					font-size: 24rpx;
					margin-right: 30rpx;
					margin-bottom: 30rpx;
					border-radius: 8rpx;
					padding: 10rpx 20rpx;
					background-color: #eee;
				}
			}
		}

		.no-results {
			height: calc(100vh - 100rpx);
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.img {
				margin-top: -120rpx;
				width: 200rpx;
				height: 200rpx;
			}

			.no-results-title {}
		}
	}
</style>
