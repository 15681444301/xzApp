<template>
	<view>
		<uni-collapse v-if="tags.length !=0">
			<uni-collapse-item :title="tags[current].cate_name" :open='open'>
				<uni-tag  class="uni_tag" v-for="(item,index) in tags" :key='index' :text="item.cate_name" :type="index==current?'warning':'default'" @click="doCheck(index)"></uni-tag>
			</uni-collapse-item>
		</uni-collapse>
		<view class="uni_grid ">
			<uni-grid :column="3" :showBorder='false' :square='false' :highlight='false' >
				<uni-grid-item v-for="(item,index) in cates" :key='index'>
					<view class="uni_grid_content" @click="goRooms(index)">
						<image :src="item.icon_url" mode="" style="width: 200rpx;height: 200rpx; border-radius: 20rpx;"></image>
						<view >{{item.tag_name}}</view>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				tags:[],
				current:0,
				open:false,
				cates:[]
			}
		},
		mounted() {
			this.getTags()
		},
		methods: {
			goRooms(index){
				const {short_name,tag_name}=this.cates[index]
				uni.navigateTo({
					url:`../Rooms/Rooms?tag_name=${tag_name}&short_name=${short_name}`,
				});
			},
			doCheck(index){
				this.current=index
				this.getCates(index)
				this.open=true
				this.$nextTick(()=>{
					this.open=false
				})
			},
			getCates(index){
				const short_name=this.tags[index].short_name
				// #ifndef H5
			const url='http://capi.douyucdn.cn/api/v1/getColumnDetail'
				// #endif
				// #ifdef H5
				const url='/capi/api/v1/getColumnDetail'
				// #endif
				uni.request({
					url,
					method: 'GET',
					data: {shortName:short_name},
					success: res => {
						// console.log(res)
						this.cates=res.data.data
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getTags(){
				// #ifndef H5
				const url='http://capi.douyucdn.cn/api/v1/getColumnList'
				// #endif
				// #ifdef H5
				const url='/capi/api/v1/getColumnList'
				// #endif
				uni.request({
					url,
					method: 'GET',
					data: {},
					success: res => {
						// console.log(res)
					 this.tags=res.data.data
					 this.getCates(0)
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="less">
	.uni_grid{
		padding: 10rpx;
		.uni_grid_content{
			margin: 10rpx;
		}
	}
.uni_tag{
	margin: 7rpx;
}
</style>
