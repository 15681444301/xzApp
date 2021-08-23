<template>
	<view class="container">
		<image class="bg" src="../../static/images/bg.jpg" mode=""></image>
		<view class="logo"><image src="../../static/icons/logo.png" mode=""></image></view>
		<view class="input">
			<view class="input_user">
				<image src="../../static/images/user.png" mode=""></image>
				<input type="text" value="" placeholder="用户名/手机号" />
			</view>
			<view class="input_password">
				<image src="../../static/images/mima.png" mode=""></image>
				<input :type="pwd_type" value="" placeholder="密码" />
				<image @click="ShowHide=!ShowHide" :src="pwd_icon" mode=""></image>
			</view>
			</view>
			<view class="login" hover-class="active">登录</view>
			<view class="help ">
				<view class="help_password" hover-class="active">忘记密码?</view>
				<view class="help_register" hover-class="active">立即注册</view>
			</view>
			<view class="three">
				<view class="three_text">
					 ————————第三方直接登录——————
				</view>
			</view>
			<view class="three_logo">
				<image src="../../static/images/qq.jpg" mode=""></image>
				<image src="../../static/images/wx.jpg" mode=""></image>
				<image src="../../static/images/wb.jpg" mode=""></image>
			</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			ShowHide:false,
			
		};
	},
	methods: {
	
	},
	computed:{
		pwd_type(){
			return  this.ShowHide?  'text':'password'
		},
		pwd_icon(){
			return  this.ShowHide? '../../static/images/eye.png':'../../static/images/eye-close.png'
		}
	}
};
</script>

<style lang="less">
	.three_logo{
		position: fixed;
		width: 90%;
		bottom: 170rpx;
		display: flex;
		justify-content: space-around;
		image{
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
		}
	}
	.three{
		position: fixed;
		width: 90%;
		bottom: 300rpx;
		.three_text{
			text-align: center;
			font-size: 26rpx;
			color: white;
		}
		
	}
.help {
	display: flex;
	justify-content: space-between;
	margin-top: 20rpx;
	font-size: 26rpx;
	color: #a9a9a9;
	text-decoration: underline;
}
.login {
	width: 100%;
	background-color: #f6dda4;
	text-align: center;
	letter-spacing: 4rpx;
	font-size: 35rpx;
	margin-top: 60rpx;
	height: 60rpx;
	line-height: 60rpx;
}
.input_password {
	margin-top: 80rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #fff;
	padding: 15rpx;
	image {
		width: 30rpx;
		height: 30rpx;
		margin-right: 20rpx;
	}
	input {
		flex: 1;
		font-size: 26rpx;
		height: 45rpx;
	}
}
.input_user {
	margin-top: 80rpx;
	display: flex;
	align-items: center;
	background-color: #fff;
	padding: 15rpx;
	image {
		width: 30rpx;
		height: 30rpx;
		margin-right: 20rpx;
	}
	input {
		flex: 1;
		font-size: 26rpx;
		height: 45rpx;
	}
}
.logo {
	margin-top: 100rpx;
	display: flex;
	justify-content: center;
	image {
		width: 420rpx;
		height: 100rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
	}
}
.bg {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: -1;
	filter: blur(2px);
}
.container {
	padding: 50rpx;
	display: flex;
	flex-direction: column;
}
.active{
	opacity: 0.6;
}
</style>
