<template>
	<view class="container">
		<scroll-view style="width: 30%;" :style="{ height: windowHeight + 'px' }" scroll-y>
			<view class="item_title" :class="{ cur: select == index }" v-for="(item, index) in hero" :key="index" @click="open(index)">
				<view>{{ item.title }}</view>
			</view>
		</scroll-view>
		<scroll-view style="width: 70%;" :style="{ height: windowHeight + 'px' }" scroll-y v-if="data && showRight">
			<view class="hero_right">
				<view class="hero_title">
					<view class="hero_img"><image :src="`https://game.gtimg.cn/images/lol/act/img/champion/${heroinfo.alias}.png`" mode=""></image></view>
					<view class="hero_herodetail">
						<view>{{ heroinfo.title }}</view>
						<view>昵称:{{ heroinfo.name }}</view>
						<view>金币:{{ heroinfo.goldPrice }}</view>
						<view>点券:{{ heroinfo.couponPrice }}</view>
					</view>
				</view>
				<!-- 卡片 -->
				<uni-card title="背景故事" >
					<view class="bg_tale">{{heroinfo.shortBio}}</view>
				</uni-card>
				<!--  -->
				<uni-collapse>
					<uni-collapse-item title="使用建议">
						<uni-list>
							<uni-list-item v-for="(item,index) in heroinfo.allytips" :key="index" :title="item"></uni-list-item>
						</uni-list>
					</uni-collapse-item>
				</uni-collapse>
				<!--  -->
				<uni-collapse>
					<uni-collapse-item title="对战技巧">
						<uni-list>
							<uni-list-item v-for="(item,index) in heroinfo.enemytips" :key="index" :title="item"></uni-list-item>
						</uni-list>
					</uni-collapse-item>
				</uni-collapse>
				<!--  -->
				<uni-collapse>
					<uni-collapse-item title="技能说明">
						<uni-list>
							<uni-list-item v-for="(item,index) in spells" :key="index" :title="item.name" :note="item.description" :thumb="item.abilityIconPath"  direction="column"></uni-list-item>
						</uni-list>
					</uni-collapse-item>
				</uni-collapse>
				<!--  -->
				<uni-collapse>
					<uni-collapse-item title="皮肤">
						<uni-list>
							<uni-list-item v-for="(item,index) in skins" :key="index" :title="item.name" :note="item.description" :thumb="item.iconImg"  ></uni-list-item>
						</uni-list>
					</uni-collapse-item>
				</uni-collapse>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			hero: [],
			data: null,
			url: 'https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js',
			select: 0,
			showRight:true
		};
	},
	mounted() {
		this.getDataList();
	},
	methods: {
		open(index) {
			// console.log(index);
			this.select = index;
			const heroId = this.hero[index].heroId;
			this.getdetail(heroId);
		},
		getdetail(heroId) {
			const url = `https://game.gtimg.cn/images/lol/act/img/js/hero/${heroId}.js`;
			uni.request({
				url: url,
				method: 'GET',
				data: {},
				success: res => {
					// console.log(res);
					this.data = res.data;
					this.showRight=false;
					this.$nextTick(()=>{
						this.showRight=true;
					})
				},
				fail: () => {},
				complete: () => {}
			});
		},
		getDataList() {
			uni.request({
				url: this.url,
				method: 'GET',
				data: {},
				success: res => {
					// console.log(res);
					this.hero = res.data.hero;
					const heroId = this.hero[0].heroId;
					this.getdetail(heroId);
				},
				fail: () => {},
				complete: () => {}
			});
		}
	},
	computed: {
		windowHeight() {
			return uni.getSystemInfoSync().windowHeight;
		},
		skins() {
			return this.data.skins;
		},
		spells() {
			return this.data.spells;
		},
		heroinfo() {
			return this.data.hero;
		}
	}
};
</script>

<style lang="less">
.bg_tale{
	font-size: 0.6em;
	}
.hero_right {
	padding: 10rpx;
	background-color: #eee;
	.hero_title {
		display: flex;
		.hero_img {
			width: 200rpx;
			height: 200rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.hero_herodetail {
			margin-left: 10rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			view:nth-child(1) {
				font-size: 40rpx;
				font-weight: 600;
			}
			view {
				font-size: 30rpx;
				font-weight: 500;
				letter-spacing: 2rpx;
			}
		}
	}
}
.item_title {
	padding: 20rpx;
	border-bottom: 1rpx solid #eeeeee;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}
.cur {
	background-color: #c0c0c0;
	color: blue;
	font-weight: bold;
}
.container {
	display: flex;
}
</style>
