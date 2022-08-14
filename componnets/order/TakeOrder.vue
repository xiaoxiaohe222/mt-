<template>
	<view class="take-order">
		<view class="left">
			<scroll-view class="left-scroll" scroll-y="true">
				<view :class="{active: index === menuIndex}" v-for="(item,index) in menuBarList" :key="index"
					@click="menuIndex = index" class="left-scroll-item">{{item}}</view>
			</scroll-view>
		</view>
		<view class="right">
			<scroll-view class="right-scroll" scroll-y="true">
				<view class="title">{{menuBarList[menuIndex]}}</view>
				<view v-for="(item,index) in menuList" :key="index" class="right-scroll-item">
					<image class="img" :src="item.objdis.image"></image>
					<view class="info">
						<view class="info-title">{{item.objdis.input}}</view>
						<view class="info-desc">
							<text v-for="(tag,index) in item.objdis.tags" :key="index">{{tag}}</text>
						</view>
						<view class="sale">月售0</view>
						<view class="priceAndCount">
							<text class="p-price">¥{{item.objdis.Discount}}</text>
							<text class="o-price">¥{{item.objdis.Price}}</text>
							<view class="btns">
								<text @click="reduce(item)" class="dec iconfont icon-jian"></text>
								<text class="number">{{item.count}}</text>
								<text @click="add(item)" class="plus iconfont icon-zengjia"></text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- bar -->
		<CartBar :totalCount="totalCount" :totalMoney="totalMoney" :delivering="goodInfo.delivering"></CartBar>
	</view>
</template>

<script>
	import CartBar from '@/componnets/order/CartBar.vue'
	export default {
		props: ['goodInfo', 'goodList'],
		data() {
			return {
				menuIndex: 0,
				totalGoods: [], //已选择的总商品，每一项是一个item
				orderData: {} //支付需要的数据
			}
		},
		components: {
			CartBar
		},
		watch: {
			totalGoods: {
				handler(newV) {
					// 能拿到所有的添加进购物车的good
					let {
						orderData
					} = this
					// 所有的商品
					orderData.goodList = newV
					// 需要支付的总金额
					orderData.payment = this.totalMoney
					// 配送费
					orderData.physical = this.goodInfo.physical
					// 用户openid
					orderData.openid = JSON.parse(uni.getStorageSync('userInfo') || '{}').openid
					// 商家标识
					orderData.MerchantId = this.goodInfo.openid
					//商家logo
					orderData.logo = this.goodInfo.logo
					// 商家名称
					orderData.shop = this.goodInfo.shop
                  // console.log(orderData,88)
					uni.setStorageSync('orderData', JSON.stringify(orderData))
				},
				deep: true

			}
		},
		methods: {
			reduce(item) {
				if (item.count <= 0) {
					uni.showToast({
						title: '数量最低为0',
						icon: 'none'
					})
					this.totalGoods = this.totalGoods.filter(g => g._id !== item._id)
					return
				} else {
					item.count--
				}

			},
			add(item) {
				item.count++
				let res = this.totalGoods.find(good => good._id === item._id)
				if (!res) {
					this.totalGoods.push(item)
				}
				//console.log(this.totalGoods, 555)
			}
		},
		computed: {
			totalMoney() { // 总价
				let total = 0;
				this.totalGoods.forEach(item => {
					total += item.count * item.objdis.Discount * 10
				})
				return total.toFixed(0) / 10
			},
			totalCount() { //商品的总数量
				return this.totalGoods.reduce((pre, item) => pre += item.count, 0)
			},
			menuBarList() {
				return [...new Set(this.goodList.map(item => item.optidata))]
			},
			menuList() {
				let res = []
				this.goodList.forEach(item => {
					if (item.optidata === this.menuBarList[this.menuIndex]) {
						//this.$set(item, 'count', 0)
						res.push(item)
					}
				})
				return res;
			}
		}
	}
</script>

<style scoped lang="scss">
	.take-order {
		height: 100%;
		display: flex;

		.left {
			box-sizing: border-box;
			padding-bottom: 130rpx;
			width: 25%;
			height: 100%;
			background-color: #fbfbfb;

			.left-scroll {
				height: 100%;

				.left-scroll-item {
					font-size: 28rpx;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;

					&.active {
						background-color: darkgreen;
						color: #fff;
					}
				}
			}
		}

		.right {
			padding-bottom: 130rpx;
			width: 75%;
			height: 100%;
			box-sizing: border-box;

			//background-color: red;
			.right-scroll {
				height: 100%;
				//background-color: #bfe;

				.title {
					padding: 20rpx 0 20rpx 20rpx;
					font-size: 28rpx;
				}

				.right-scroll-item {
					padding: 20rpx 0;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					height: 200rpx;

					//background-color: #fed;
					.img {
						width: 180rpx;
						height: 180rpx;
						border-radius: 10rpx;
					}

					.info {
						margin-left: 20rpx;
						flex: 1;
						height: 100%;

						.info-title {}

						.info-desc {
							font-size: 24rpx;

							text {
								padding: 4rpx;
								background-color: #f2f2f2;
								margin-right: 4rpx;
							}
						}

						.sale {
							padding: 4rpx 0;
							font-size: 24rpx;
						}

						.priceAndCount {
							display: flex;
							align-items: center;

							.p-price {
								color: red;
							}

							.o-price {
								text-decoration: line-through;
								font-size: 24rpx;
								margin: 0 10rpx 0 20rpx;
							}

							.btns {
								width: 100%;
								padding-left: 20rpx;
								padding-right: 20rpx;
								//background-color: red;
								display: flex;
								justify-content: space-between;
								align-items: center;

								.number {
									//color: green;
								}

								.dec {
									// color: red;
									font-size: 48rpx;
								}

								.plus {
									font-size: 48rpx;
									color: darkgreen;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
