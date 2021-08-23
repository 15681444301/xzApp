<template>
	<view>
		<web-view :src="href"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				href:''
			}
		},
		onLoad(options){
			console.log(options)
			const {href,title}=options
			this.href='http://101.96.128.94:9999/'+href
			uni.setNavigationBarTitle({
				title
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
