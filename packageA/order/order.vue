<template>
	<view class="order">
		<!-- 头部 -->
		<OrderHeader :goodInfo='goodInfo'></OrderHeader>
		<!-- tab栏目 -->
		<OrderTabs :tabList="tabList" :currentIndex="currentIndex"></OrderTabs>
		<!-- 对应的下面的三个组件的显示 -->
		<view class="content">
			<TakeOrder  :goodInfo='goodInfo[0]' :goodList='goodList' v-if="currentIndex === 0"></TakeOrder>
			<RatingOrder :goodRating="goodRating" v-if="currentIndex === 1"></RatingOrder>
			<InfoOrder :goodInfo='goodInfo' v-if="currentIndex === 2"></InfoOrder>
		</view>

	</view>
</template>

<script>
	import request from '@/api/request.js'
	import OrderHeader from '@/componnets/order/OrderHeader.vue'
	import OrderTabs from '@/componnets/order/OrderTabs.vue'
	import TakeOrder from '@/componnets/order/TakeOrder.vue'
	import RatingOrder from '@/componnets/order/RatingOrder.vue'
	import InfoOrder from '@/componnets/order/InfoOrder.vue'
	export default {
		components: {
			OrderHeader,
			OrderTabs,
			TakeOrder,
			InfoOrder,
			RatingOrder
		},
		data() {
			return {
				openid: '', //5dfcf328da83f620e4077114
				tabList: ['点菜', '评价', '商家'],
				currentIndex: 0,
				goodList: [],
				goodInfo: [],
				goodRating: []
			};
		},
		onLoad({
			openid
		}) {
			this.openid = openid
			this.getData()
		},
		methods: {
			async getData() {
				const p1 = request('/forshop/getdishes', {openid: this.openid}, 'POST')
				const p2 = request('/message/discuss', {merchantid: this.openid}, 'POST')
				const p3 = request('/forshop/shop', {openid: this.openid}, 'POST')
				const res = await Promise.all([p1,p2,p3])
				this.goodList = res[0].map(item=>{
					this.$set(item,'count',0)
					return item
				})
				this.goodRating = res[1]
				this.goodInfo = res[2]
			},
			async getRatingData(data){
				const res = await request('/message/discuss', {merchantid: this.openid,...data}, 'POST')
				if(Array.isArray(res)){
					this.goodRating = res
				}else{
					this.goodRating = []
				}
			}
		}

	}
</script>

<style lang="scss" scoped>
	$height: 250rpx;

	.order {
		width: 100%;
		height: 100vh;

		// padding: 0 20rpx;
		.content {
			height: calc(100vh - #{$height});
		}
	}
</style>
