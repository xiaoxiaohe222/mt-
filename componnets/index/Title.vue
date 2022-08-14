<template>
	<view class="title">
		{{title}}
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				required: true
			}
		}
	}
</script>

<style scoped lang="scss">
	.title{
		padding: 20rpx 0;
		color: #534e4d;
	}
</style>
