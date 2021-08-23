<template>
	<view class="container" v-if="data">
		<view class="_lname">{{details.lname}}</view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" style="width: 730rpx; height: 600rpx;">
			<swiper-item v-for="(item,index) in picList" :key='index' >
				<image style="width: 750rpx;height: 100%;" :src="base+item.md" mode=""></image>
			</swiper-item>
		</swiper>
		<view class="details_title">{{details.title}}</view>
		<view class="details_subtitle">{{details.subtitle}}</view>
		<view class="details_price">￥{{details.price}}</view>
		<!-- 折叠栏 -->
		<uni-collapse>
			<uni-collapse-item title="更多商品推荐" open>
				<uni-list>
					<uni-list-item v-for="(item,index) in laptopList" :key='index' :title="item.spec" clickable showArrow :to="`/pages/goods-detail/goods-detail?lid=${item.lid}`"></uni-list-item>
				</uni-list>
			</uni-collapse-item>
		</uni-collapse>
		<view v-html="html_details"></view>
		<!-- 底部选购栏占位符 -->
		<view style="height: 88rpx;">	</view>
		<uni-goods-nav class="goods_nav"></uni-goods-nav>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ild:'',
				data:null,
				base:'http://101.96.128.94:9999/'
			};
		},
		onLoad(option) {
			console.log(option)
			const ild=option.lid
			this.ild=ild
		},
		mounted() {
			this.getDataList()
		},
		methods:{
			getDataList(){
				const url='http://101.96.128.94:9999/data/product/details.php'
				uni.request({
					url,
					method: 'GET',
					data: {lid:this.ild},
					success: res => {
						console.log(res)
						this.data=res.data
					},
					fail: (err) => {console.log(err)},
					complete: () => {}
				});
			}	
		},
		computed:{
			details(){
				return this.data.details
			},
			family(){
				return this.data.family
			},
			picList(){
				return this.data.details.picList
			},
			laptopList(){
				return this.data.family.laptopList
			},
			html_details(){
				let details=this.details.details
			        details=details.replace(/<img/g, '<img width="100%"')
			        details=details.replace(/src="img/g, 'src="http://101.96.128.94:9999/img')
					details=details.replace(/src="\/\img20/g, 'src="https://img20')
					return details
			}
		}
	}
</script>

<style lang="less">
	.goods_nav{
		position: fixed;
		bottom: 0;
		width: 100%;
	}
	.details_price{
		color: red;
		font-size: 35rpx;
		font-weight: 600;
	}
	.details_subtitle{
		color: #808080;
		font-size: 30rpx;
	}
	.details_title{
		font-weight: 600;
		 overflow: hidden;
		  text-overflow: ellipsis;
		  display: -webkit-box;
		  -webkit-line-clamp: 2;
		  -webkit-box-orient: vertical;
	}
	._lname{
		border-bottom: 1rpx solid #ddd;
		padding: 10rpx;
	}
.container{
	padding: 6rpx;
}
</style>
