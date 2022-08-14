<template>
	<view class="home">
		<!-- 定位 搜索 轮播部分 -->
		<Search></Search>
		<!-- 为你优选 -->
		<Preference :preferData="preferData"></Preference>
		<!-- 附近商家 -->
		<Title title='附近商家'></Title>
		<!-- 筛选 -->
		<view :catchtouchmove="true">
			<Delicacy :getTakeDataByOrder="getTakeDataByOrder" id="delicacy" :class="{fixed: isFixed}" :topDis="topDis">
			</Delicacy>
		</view>
		<!-- 列表展示区域 -->
		<template>
			<Takeout v-if="takeoutData.length" :takeoutData="takeoutData"></Takeout>
			<view v-else style="padding: 30rpx 0;text-align: center;">--暂无匹配数据--</view>
		</template>
	</view>
</template>

<script>
	import Search from '@/componnets/index/Search.vue'
	import Preference from '@/componnets/index/Preference.vue'
	import Delicacy from '@/componnets/index/Delicacy.vue'
	import Title from '@/componnets/index/Title.vue'
	import Takeout from '@/componnets/index/Takeout.vue'
	import request from '@/api/request.js' // 导入请求函数
	import {
		preferUrl
	} from '@/api/url.js' // 导入对应的url
	export default {
		components: {
			Search,
			Preference,
			Delicacy,
			Title,
			Takeout
		},
		data() {
			return {
				preferData: [],
				takeoutData: [], //附近商家数据
				positionType: '', // 传递给Delicacy的class类型确定是否固定
				topDis: 0, // delicacy组件到顶部的距离
				isFixed: false
			}
		},
		onPageScroll(e) {
			if (e.scrollTop >= this.topDis) {
				this.isFixed = true
			} else {
				this.isFixed = false
			}

		},
		onReady() {
			const query = uni.createSelectorQuery()
			const res = query.select("#delicacy").boundingClientRect(data => {
				this.topDis = data.top
			}).exec();
		},
		onLoad() {
			this.getData()
		},
		methods: {
			async getData() {
				const p1 = request(preferUrl)
				const p2 = request('/forshop/wxshop')
				try {
					const res = await Promise.all([p1, p2])
					this.preferData = res[0]
					this.takeoutData = res[1]
				} catch (e) {
					console.log(e)
				}
			},
			// 根据排序获得结果
			async getTakeDataByOrder(data) {
				const res = await request('/forshop/starting', data, 'POST')
				this.$parent.takeoutData = res
			}

		}
	}
</script>

<style scoped lang="scss">
	.home {
		padding: 0 15rpx;
	}

	.fixed {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		background-color: #fff;
	}
</style>
