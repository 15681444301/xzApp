<template>
	<view v-if="list">
		<swiper style="height: 300rpx;" :autoplay="true" :interval="3000" :duration="250" circular>
			<swiper-item v-for="(item, index) in carouselItems" :key="index">
				<image style="width: 750rpx;height: 300rpx;" :src="base + item.img" @click="godetail(index)"></image>
			</swiper-item>
		</swiper>
		<view v-for="(key, value) in items" :key="value">
			<uni-icons type="shop" size="20"></uni-icons>
			<text>{{key.title}}</text>
			<view class="uni_grid">
				<uni-grid :column="2" :showBorder="false" :square="false" :highlight="false">
					<uni-grid-item v-for="(item, index) in key.list" :key="index">
						<view class="uni_gg_item">
							<image :src="base + item.pic" mode=""></image>
							<view class="uni_gg_detail">
								<view>{{ item.title }}</view>
								<view>{{ item.details }}</view>
								<view>￥{{ item.price }}</view>
								<button type="primary" @click="godetail(index)">{{ item.price }}</button>
							</view>
						</view>
					</uni-grid-item>
				</uni-grid>
			</view>
		</view>
		<uni-grid :column="4" :showBorder="false" :square="false" :highlight="false">
			<uni-grid-item v-for="(item,index) in 4" :key='index'>
				<view  class='picture'>
					<image :src='`../../static/icons/icon${item}.png`' ></image>
				</view>
			</uni-grid-item>
		</uni-grid>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: null,
			base: 'http://101.96.128.94:9999/'
		};
	},
	methods: {
		godetail(index) {
			const { href, title } = this.list.carouselItems[index];
			uni.navigateTo({
				url: `/pages/detail/detail?href=${href}&title=${title}`
			});
		},
		getData() {
			const url = 'http://101.96.128.94:9999/data/product/index.php';
			uni.request({
				url,
				method: 'GET',
				success: res => {
					// console.log(res);
					this.list = res.data;
				}
			});
		}
	},
	computed: {
		carouselItems() {
			return this.list.carouselItems;
		},
		items() {
			return [
				{ title: '1F/首页推荐', list: this.list.newArrivalItems },
				{ title: '2F/热销单品', list: this.list.recommendedItems },
				{ title: '3F/最新上架', list: this.list.topSaleItems }
			];
		}
	},
	mounted() {
		this.getData();
	}
};
</script>

<style lang="less">
	.picture{
	  display:flex;
	  justify-content: space-around;
	  align-items: center;
	  justify-content: center;
	  height: 150rpx;
	  image{
		  width: 100rpx;
		  height: 100rpx;
	  }
	}
.uni_grid {
	padding: 6rpx;
	.uni_gg_item {
		margin: 6rpx;
		border: 1rpx solid #888;
		border-radius: 10rpx;
		image {
			width: 100%;
			height: 280rpx;
		}
		.uni_gg_detail {
			view:nth-child(1) {
				font-size: 30rpx;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
			view:nth-child(2) {
				font-size: 16rpx;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
			view:nth-child(3) {
				font-size: 30rpx;
				color: red;
				font-weight: bold;
			}
		}
	}
}

.swiper {
	height: 300rpx;
}
</style>
