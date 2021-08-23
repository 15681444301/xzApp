<template>
	<view v-if="list">
		<uni-list>
			<uni-list-item clickable v-for="(item,index) in list.data" :key="index"  :to='`../goods-detail/goods-detail?lid=${item.lid}`'>
                <template slot="body">
                	<view class="cell">
						<image :src="base+item.pic" mode=""></image>
					</view>
					<view class="title">
						<view >{{item.title}}</view>
						<view >￥{{item.price}}</view>
					</view>
                </template>
			</uni-list-item>
		</uni-list>
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status:'more',
				// list:{
				// 	pno:0,
				// 	pageSize:10,
				// 	pageCount:0,
				// 	data:[]
				// },
				list:null,
				url:'http://101.96.128.94:9999/data/product/list.php',
				base:'http://101.96.128.94:9999/'
			}
		},
		onPullDownRefresh() {
			uni.request({
				url: this.url,
				method: 'GET',
				data: {},
				success: res => {
					// console.log(res)
					this.list=res.data
					uni.stopPullDownRefresh()
				},
			});
		},
		onReachBottom(){
			const{data,pageCount,pno}=this.list
			if(pageCount==pno){
				this.status='noMore';
				return
			}
			if(this.status=='loading'){
				return
			}
			this.status='loading'
			uni.request({
				url: this.url,
				method: 'GET',
				data: {pno:pno+1},
				success: res => {
					// console.log(res)
					// console.log(this.list)
					
					// const dataList = [...this.list.data,...res.data.data]
					
					// this.list={...this.list,...res.data.data,pno:pno+1,data:[...this.list.data,...res.data.data]}
					// this.list = [...this.list ,...res.data.data]
					res.data.data=[...data,...res.data.data]
					this.list=res.data
					this.status='noMore'
				},
			});
		},
		methods: {
			getDatalist(){
				uni.request({
					url:this.url,
					method: 'GET',
					data: {},
					success: res => {
						// console.log(res)
						this.list=res.data
					},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		onLoad(){
			this.getDatalist()
		}
	}
</script>

<style lang="less">
	.title{
		margin-left: 20rpx;
		view:nth-child(1){
			 text-overflow: -o-ellipsis-lastline;
			  overflow: hidden;
			  text-overflow: ellipsis;
			  display: -webkit-box;
			  -webkit-line-clamp: 2;
			  line-clamp: 2;
			  -webkit-box-orient: vertical;
			  font-weight: 600;
			  margin-top: 20rpx;
		}
		view:nth-child(2){
			margin-top: 30rpx;
			color: red;
			font-size: 35rpx;
			font-weight: bold;
		}
	}
.cell{
	margin: -10rpx -15rpx;
	image{
		width: 200rpx;
		height: 200rpx;
	}
}
</style>
