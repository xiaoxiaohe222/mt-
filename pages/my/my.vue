<template>
	<view class="my">
		<!-- 未登录状态 -->
		<view class="title" v-if="!userInfo.openid">
			<text>登录mt外卖 开启吃货旅程</text>
			<button @click="getUserInfo" class="btn" type="primary">去登录</button>
		</view>
		<!-- 已经登录的状态-->
		<view class="isLogin" v-else>
			<image class="img" :src="userInfo.avatarUrl"></image>
			<text class="username">{{userInfo.nickName}}</text>
		</view>
	</view>
</template>

<script>
	import request from '@/api/request.js'
	export default {
		data() {
			return {
				userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}')
			};
		},
		methods: {
			getUserInfo() {
				uni.getUserProfile({
					desc: 'Wexin',
					success: res => {
						console.log(res, 111)
						this.uniLogin(res.userInfo.nickName, res.userInfo.avatarUrl)
					},
					fail: err => {
						console.log(err, '第一层授权失败')
					}
				})
			},
			uniLogin(nickName, avatarUrl) {
				uni.login({
					provider: 'weixin',
					success: (res) => {
						const code = res.code
						const appid = 'wx1c4f52496526b5d1'
						const AppSecret = '350865c33386db2c78f151c30bfc70d0'
						const data = {
							nickName,
							avatarUrl,
							code,
							appid,
							secret: AppSecret
						}
						this.login(data)
					},
					fail: (error) => {
						console.log(error, '第二层unilogin失败')
					}
				});
			},
			async login(data) {
				try {
					const res = await request('/wxuser/wxlogin', data, 'POST')
					if (res.msg === 'success') {
						this.userInfo = res.datas
						uni.setStorageSync('userInfo', JSON.stringify(res.datas))
					}
				} catch (e) {
					uni.showToast({
						title: '后台接口繁忙，稍后再试',
						icon: 'error'
					})
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.title {
		height: 350rpx;
		background-image: linear-gradient(to top, lightgreen, darkgreen);
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #fff;

		.btn {
			width: 50%;
			background-image: linear-gradient(to right, #49a0ea, #3786d1);
			height: 60rpx;
			line-height: 60rpx;
			border-radius: 30rpx;
			font-size: 26rpx;
			margin-top: 15rpx;
		}
	}

	.isLogin {
		font-size: 28rpx;
		color: #fff;
		height: 350rpx;
		background-image: linear-gradient(to top, lightgreen, darkgreen);
		display: flex;
		align-items: center;

		.img {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			margin: 0 20rpx 0 30rpx;
		}
	}
</style>
