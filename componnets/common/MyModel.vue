<template>
	<view class="model" v-if="showModel">
		<view class="box">
			<view class="title">请登录后再操作</view>
			<view class="btns">
				<view class="btn cancel" @click="cancel">取消</view>
				<view class="btn confirm" @click="confirm">登录</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '@/api/request.js'
	export default {
		props: {
			showModel: Boolean
		},
		data() {
			return {
				//showModel: true
			}
		},
		methods: {
			cancel() {
				this.$emit('update:showModel', false)
			},
			confirm() {
				this.getUserInfo()
			},
			getUserInfo() {
				uni.getUserProfile({
					desc: 'Wexin',
					success: res => {
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
						// this.userInfo = res.datas
						uni.setStorageSync('userInfo', JSON.stringify(res.datas))
						console.log('到这里表示已经登录，可以去结算了')
						let orderData = JSON.parse(uni.getStorageSync('orderData'))
						orderData.openid = res.datas.openid
						uni.setStorageSync('orderData', JSON.stringify(orderData))
						 
						this.$emit('update:showModel', false)
						// 跳转到pay页面
						uni.navigateTo({
							url:'/packageA/pay/pay'
						})
					}
				} catch (e) {
					uni.showToast({
						title: '后台接口繁忙，稍后再试',
						icon: 'error'
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.model {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .6);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999;

		.box {
			text-align: center;
			width: 500rpx;
			height: 170rpx;

			background-color: #fff;
			color: #888;

			.title {
				height: 100rpx;
				line-height: 100rpx;
				border-bottom: 1rpx solid #eee;
			}

			.btns {
				font-size: 24rpx;
				height: 70rpx;
				display: flex;
				align-items: center;

				.btn {
					width: 50%;
					text-align: center;
				}

			}
		}
	}
</style>
