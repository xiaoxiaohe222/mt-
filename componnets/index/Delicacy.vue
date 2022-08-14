<template>
	<view class="delicacy">
		<!-- 筛选的头部 -->
		<view class="delicacy-header">
			<view class="delicacy-header-item" @click="orderListTopClick">
				<text>{{synthesize}}</text>
				<image class="header-img" src="../../static/coen/paixu.png" mode="widthFix"></image>
			</view>
			<view class="delicacy-header-item">
				<text>销量高</text>
			</view>
			<view class="delicacy-header-item">
				<text>速度快</text>
			</view>
			<view class="delicacy-header-item">
				<text>津贴联盟</text>
			</view>
			<view class="delicacy-header-item choice" @click="choiceClick">
				<text>筛选</text>
				<image class="header-img" src="../../static/coen/shaixuan.png" mode="widthFix"></image>
			</view>
			<!-- 点击综合排序 下面的选择条目进行显示 -->
			<view class="order-list" v-if="showOrderList">
				<view @click="orderItemClick(item)" :class="{active: synthesize === item.name}" class="order-item"
					v-for="(item,index) in sortlist" :key="index">
					{{item.name}}
				</view>
			</view>
			<!-- 点击筛选 出现的多个选择列表 -->
			<view class="multiChoice" v-if="showMultiChoice">
				<view class="multiChoice-item">
					<view class="multiChoice-item-title">{{screendata.title}}</view>
					<view class="multiChoice-item-content">
						<view class="multiChoice-item-content-item"
							:class="{active: selScreendata.find(i=>i.name === item.name)}"
							@click="selScreendataClick(item)" v-for="item in screendata.datas" :key="item.name">
							{{item.name}}
						</view>
					</view>
				</view>
				<view class="multiChoice-item">
					<view class="multiChoice-item-title">{{person.title}}</view>
					<view class="multiChoice-item-content">
						<view class="multiChoice-item-content-item" :class="{active: selPerson.name === item.name}"
							@click="selPersonClick(item)" v-for="item in person.datas" :key="item.name">
							{{item.name}}
						</view>
					</view>
				</view>
				<!-- 底部的footer 清空和完成按钮-->
				<view class="multiChoice-footer">
					<view class="multiChoice-footer-item" @click="clear">清空</view>
					<view  class="multiChoice-footer-item active" @click="complete">完成</view>
				</view>
			</view>
		</view>
		<!-- 遮罩层 -->
		<view class="mask" v-if="showMask" @click="maskClick"></view>
	</view>
</template>

<script>
	import request from '@/api/request.js' // 导入请求函数
	export default {
		props: {
			topDis: Number,
			getTakeDataByOrder: Function
		},
		data() {
			return {
				synthesize: "综合排序", // 排序的字段
				showOrderList: false,
				showMultiChoice: false,
				showMask: false,
				sortlist: [{
						"name": "综合排序",
						"screen": "_id",
						"nums": 1
					},
					{
						"name": "起送价最低",
						"screen": "delivering",
						"nums": 1
					},
					{
						"name": "配送费最低",
						"screen": "physical",
						"nums": 1
					},
					{
						"name": "人均高到低",
						"screen": "capita",
						"nums": -1
					},
					{
						"name": "人均低到高",
						"screen": "capita",
						"nums": 1
					}
				],
				// 多选--商家特色
				screendata: {
					"title": "商家特色(可多选)",
					"datas": [{
							"id": 1,
							"sign": 'duration',
							"name": '配送最快'
						},
						{
							"id": 1,
							"sign": 'deliver',
							"name": '0元起送'
						},
						{
							"id": 1,
							"sign": 'physi',
							"name": '免配送费'
						}
					],
				},
				// 人均价
				person: {
					"title": "人均价",
					"datas": [{
							"name": "20元以下",
							"per": {
								"$lt": 20
							},
						},
						{
							"name": "20-40元",
							"per": {
								"$lte": 40,
								"$gte": 20
							},
						},
						{
							"name": "40元以上",
							"per": {
								"$gt": 40
							},
						},
					]
				},
				selScreendata: [{
					"id": 1,
					"sign": 'deliver',
					"name": '0元起送'
				}],
				selPerson: {
					"name": "20-40元",
					"per": {
						"$lte": 40,
						"$gte": 20
					},
				}
			}
		},
		computed: {

		},
		methods: {
			async complete() { // 点击完成的按钮
				//组织参数
				let data = {

				}
				this.selScreendata.forEach(item => {
					data[item.sign] = item.sign
				})
			
				this.selPerson.per && (data.capita = this.selPerson.per)
				
				if (Object.keys(data).length === 0) {
					return uni.showToast({
						title: '必须选择一个哟',
						icon: 'none'
					})
				}

				try {
					const res = await request('/forshop/multiple', data, 'POST')
					//console.log(111,res)
					if (Array.isArray(res)) {
						this.$parent.takeoutData = res
					} else {
						this.$parent.takeoutData = []
					}

					this.showOrderList = false
					this.showMultiChoice = false
					this.showMask = false
				} catch (e) {
					console.log(e)
				}

			},
			clear() { // 点击清空按钮
				this.selScreendata = []
				this.selPerson = {}
				this.showOrderList = false
				this.showMultiChoice = false
				this.showMask = false

			},
			selScreendataClick(item) { // 点击商家特色 可多选的每个item
				if (this.selScreendata.find(item1 => item1.name === item.name)) {
					this.selScreendata = this.selScreendata.filter(item1 => item1.name != item.name)
				} else {
					this.selScreendata.push(item)
				}
			},
			selPersonClick(item) { // 点击人均家的单选每个item
				if (this.selPerson.name === item.name) {
					this.selPerson = {}
				} else {
					this.selPerson = item
				}

			},
			orderListTopClick() { // 点击综合排序
				this.showOrderList = true
				this.showMultiChoice = false
				this.showMask = true

				uni.pageScrollTo({
					scrollTop: this.topDis + 2,
					duration: 300
				})

			},
			choiceClick() { // 点击筛选
				this.showOrderList = false
				this.showMultiChoice = true
				this.showMask = true
				uni.pageScrollTo({
					scrollTop: this.topDis + 2,
					duration: 300
				})
			},
			maskClick() { // 点击遮罩层
				this.showMask = false
				this.showOrderList = false
				this.showMultiChoice = false
			},
			orderItemClick(item) { // 点击每个排序item的回调
				this.synthesize = item.name
				// 遮罩和orerlist都要关闭
				this.showOrderList = false
				this.showMask = false
				if (item.name === '综合排序') return
				this.getTakeDataByOrder({
					screen: item.screen,
					nums: item.nums
				})
			}

		}
	}
</script>

<style scoped lang="scss">
	.delicacy {
		.delicacy-header {
			color: gray;
			font-size: 28rpx;
			position: relative;
			z-index: 22;
			display: flex;
			align-items: center;
			height: 70rpx;
			width: 100%;
			background-color: #fff;

			.delicacy-header-item {
				height: 100%;
				display: flex;
				align-items: center;
				margin-right: 15rpx !important;

				.header-img {
					width: 30rpx;
					height: 30rpx;
				}

				&.choice {
					position: absolute;
					right: 0;
					top: 50%;
					transform: translateY(-50%);
				}
			}

			.order-list {
				position: absolute;
				left: 0;
				top: 70rpx;
				right: 0;
				background-color: #fff;

				.order-item {
					padding: 10rpx 0;
					color: #000;
					height: 50rpx;
					line-height: 50rpx;
					font-size: 24rpx;
					border-top: 1rpx solid #eee;

					&.active {
						color: #fff;
						background-color: darkgreen;
					}
				}
			}

			.multiChoice {
				position: absolute;
				left: 0;
				top: 70rpx;
				right: 0;
				background-color: #fff;

				.multiChoice-item {
					.multiChoice-item-title {
						padding: 20rpx 0;
						font-size: 26rpx;
					}

					.multiChoice-item-content {
						padding: 20rpx 0;
						display: flex;
						flex-wrap: wrap;
						justify-content: space-around;

						.multiChoice-item-content-item {
							width: 25%;
							text-align: center;
							background-color: #eee;
							padding: 5rpx 10rpx;
							&.active {
								color: #fff;
								background-color: darkgreen;
							}
						}
					}
				}

				.multiChoice-footer {
					margin-top: 70rpx;
					color: #000;
					height: 70rpx;
					border-top: 1rpx solid #ccc;
					display: flex;

					.multiChoice-footer-item {
						flex: 1;
						height: 70rpx;
						line-height: 70rpx;
						text-align: center;

						&.active {
							background-color: darkgreen;
							color: #fff;
						}
					}
				}
			}


		}

		.mask {
			//z-index: -1;
			position: fixed;
			left: 0;
			top: 0;
			bottom: 0;
			right: 0;
			background-color: rgba(0, 0, 0, .3);
		}
	}
</style>
