<template>
	<view v-if="data" style="padding: 6rpx;">
		<uni-grid :column="2" :showBorder='false' :square="false" :highlight='false'	>
			<uni-grid-item v-for="(item, index) in data.list" :key="index">
				<view class="item">
					<view class="item_img">
						<image :src="item.roomSrc" mode=""></image>
						<view>{{ item.hn }}</view>
						<view>{{ item.nickname }}</view>
					</view>
					<view>{{ item.roomName }}</view>
				</view>
			</uni-grid-item>
		</uni-grid>
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>

<script>
export default {
	data() {
		return {
			status:'more',
			data: null,
			short_name: '',
			// #ifndef H5
			url: 'https://m.douyu.com/api/room/list',
			// #endif
			// #ifdef H5
			url: '/douyu/api/room/list'
			// #endif
		};
	},
	onLoad(Option) {
		console.log(Option);
		const { short_name, tag_name } = Option;
		this.short_name = short_name;
		uni.setNavigationBarTitle({
			title: tag_name
		});
	},
	mounted() {
		this.getData();
	},
	onReachBottom() {
		this.getMore()
	},
	onPullDownRefresh() {
		uni.request({
			url: this.url,
			method: 'GET',
			data: {page:1,type:this.short_name},
			success: res => {
				console.log(res)
				this.data=res.data.data
				uni.stopPullDownRefresh()
				this.getMore()
			},
			fail: () => {},
			complete: () => {}
		});
	},
	methods: {
		getMore(){
			const{list,nowPage,pageCount}=this.data
			if(nowPage==pageCount){
				this.status='noMore'
				return;
			}
			if(this.status=='loading'){
				return
			}
			this.status='loading'
			uni.request({
				url: this.url,
				method: 'GET',
				data: {page: nowPage+1,type:this.short_name},
				success: res => {
					console.log(res)
					res.data.data.list=[...list,...res.data.data.list]
					this.status='more'
					this.data=res.data.data
				},
				fail: (err) => {console.log(err)},
				complete: () => {}
			});
		},
		getData() {
			uni.request({
				url: this.url,
				method: 'GET',
				data: { type: this.short_name, page: 1 },
				success: res => {
					console.log(res);
					this.data = res.data.data;
					this.getMore()
				}
			});
		}
	}
};
</script>

<style lang="less">
.item {
	padding: 5rpx;
	margin-top: 10rpx;
	.item_img {
		position: relative;
		image{
			width: 100%;
			height: 200rpx;	
			border-radius: 20rpx;
		}      
	   view:nth-child(2){
		   position: absolute;
		   top: 0rpx;
		   right: 20rpx;
		   font-size: 26rpx;
		   background-color: rgba(197, 197, 197, 0.6);
		   border-radius: 10rpx;
	   }
	   view:nth-child(3){
	   		   position: absolute;
	   		   left: 18rpx;
	   		   bottom: 10rpx;
	   		   font-size: 26rpx;
	   			   background-color: rgba(197, 197, 197, 0.6);
	   		   border-radius: 10rpx;
	   }
	}
	view{
		font-size: 26rpx;
	}
}
</style>
