<template>
	<view>
		<TakeoutItem v-for="(item,index) in takeoutData" :key='index' :takeout="item"></TakeoutItem>
	</view>
</template>

<script>
	import TakeoutItem from '@/componnets/index/TakeoutItem.vue'
	export default {
		props:{
			takeoutData:Array
		},
		components: {
			TakeoutItem
		}
	}
</script>

<style scoped lang="scss">

</style>
