<template>
	<view class="search-box">
		<!-- 定位 -->
		<view class="location">
			<text class="iconfont icon-location"></text>
			<text class="title">阿里巴巴淘宝城2期西溪园区</text>
			<text style="font-weight: bold;"> > </text>
		</view>
		<!-- 搜索button -->
		<view class="search" @click="search">
			<text class="iconfont icon-fangdajing1"></text>
			<input disabled placeholder-class="inputClass" type="text" placeholder="麻辣烫">
		</view>
		<!-- 轮播图区域 -->
		<swiper class="swiper" :indicator-dots="true" :interval="3000" :duration="1000">
			<swiper-item class="swiper-item" v-for="(item,index) in lable" :key="index">
				<view class="item" v-for="(item1,index1) in item" :key="index1">
					<image class="swiper-img" :src="item1.img"></image>
					<text class="swiper-title">{{item1.title}}</text>
				</view>
			</swiper-item>
			<!-- <swiper-item class="swiper-item">
				<view class="item" v-for="item in 10" :key="item">
					<image class="swiper-img" src="../../static/item.png"></image>
					<text class="swiper-title">美食</text>
				</view>
			</swiper-item> -->
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lable: [
					[{
							'img': '../../static/inster/meishi.png',
							'title': '美食'
						},
						{
							'img': '../../static/inster/chaoshi.png',
							'title': '超市便利'
						},
						{
							'img': '../../static/inster/shuiguo.png',
							'title': '蔬菜水果'
						},
						{
							'img': '../../static/inster/meituan.png',
							'title': '美团专送'
						},
						{
							'img': '../../static/inster/paotui.png',
							'title': '跑腿代购'
						},
						{
							'img': '../../static/inster/yexiao.png',
							'title': '夜宵'
						},
						{
							'img': '../../static/inster/jintie.png',
							'title': '津贴联盟'
						},
						{
							'img': '../../static/inster/pinping.png',
							'title': '甜点饮品'
						},
						{
							'img': '../../static/inster/shaokao.png',
							'title': '龙虾烧烤'
						},
						{
							'img': '../../static/inster/dangao.png',
							'title': '甜蜜蛋糕'
						}
					],
					[{
							'img': '../../static/inster/hanbao.png',
							'title': '汉堡披萨'
						},
						{
							'img': '../../static/inster/liaoli.png',
							'title': '日韩料理'
						},
						{
							'img': '../../static/inster/malatang.png',
							'title': '麻辣烫'
						},
						{
							'img': '../../static/inster/kuaican.png',
							'title': '快食简餐'
						},
						{
							'img': '../../static/inster/xianhua.png',
							'title': '浪漫鲜花'
						},
						{
							'img': '../../static/inster/lazi.png',
							'title': '无辣不欢'
						},
						{
							'img': '../../static/inster/jiaozi.png',
							'title': '饺子馆'
						},
						{
							'img': '../../static/inster/xiaochi.png',
							'title': '小吃馆'
						},
						{
							'img': '../../static/inster/baofan.png',
							'title': '煲仔饭'
						},
						{
							'img': '../../static/inster/qita.png',
							'title': '其他'
						}
					]
				]
			}
		},
		methods: {
			search() {
				uni.navigateTo({
					url:'/packageA/search/search'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	/deep/.uni-swiper-dots-horizontal {
		bottom: 10rpx;
	}

	/deep/.uni-swiper-dot {
		background-color: darkred;
		width: 40rpx;
		height: 10rpx;
		border-radius: 5rpx;
		background-color: #ccc;
	}

	/deep/.uni-swiper-dot-active {
		background-color: darkred;
		width: 40rpx;
		height: 10rpx;
		border-radius: 5rpx;
		background-color: darkgreen;
	}



	.search-box {
		// padding-top: 20rpx;
		.location {
			height: 70rpx;
			line-height: 70rpx;

			.iconfont {
				color: darkgreen;
				font-size: 35rpx;
			}

			.title {
				font-weight: bold;
				margin: 0 10rpx;
			}
		}

		.search {
			margin: 10rpx 0;
			padding-left: 20rpx;
			color: darkgrey;

			.icon-fangdajing1 {
				font-size: 30;
				margin-right: 4rpx;
			}

			/deep/.inputClass {
				font-size: 26rpx;
			}

			height: 70rpx;
			background-color: #f3f6f7;
			display: flex;
			align-items: center;
		}

		.swiper {
			width: 100%;
			height: 330rpx;

			.swiper-item {
				width: 100%;
				height: 100%;
				display: flex;
				flex-wrap: wrap;
				align-content: flex-start;

				.item {
					height: 150rpx;
					width: 20%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					.swiper-img {
						width: 70rpx;
						height: 70rpx;
						// border-radius: 50%;
					}

					.swiper-title {
						font-size: 26rpx;
					}
				}

			}

		}
	}
</style>
