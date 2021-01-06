<template>
	<view class="warp">
		<!-- header -->
		<commonHeader headerTitl="支付详情" xingHide="true" lingHide="true" fenxiangHide="true"></commonHeader>
		<view class="pay-warp">
			<image class="payComplete-img" src="/static/images/payComplete.png" mode=""></image>
			<view class="payComplete-title">支付成功</view>
		</view>
		<view class="order-info">
			<view class="money">￥ 88.56</view>
			<view class="info-list">
				<text>商家名称</text>
				<text>火锅底</text>
			</view>
			<view class="info-list">
				<text>订单编号</text>
				<text>1564641541541</text>
			</view>
			<view class="info-list">
				<text>下单时间</text>
				<text>2021年1月6日14:36:00</text>
			</view>
			<view class="info-list">
				<text>付款方式</text>
				<text>卫星</text>
			</view>
		</view>
	
		<view class="btn" @click="toOrder">查看订单</view>
		<view class="btn" @click="toIndex">返回首页</view>
	
	</view>
</template>

<script>
	// header
	import commonHeader from "@/components/common-header/common-header";
	export default {
		data() {
			return {

			}
		},
		components: {
			commonHeader
		},
		methods: {
			toIndex(){
				uni.navigateTo({
					url: '../index/index'
				})
			},
			toOrder(){
				uni.navigateTo({
					url: '../offlineEarnings/offlineEarnings'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	$bgc: #f8f6f9;
	$minColor: #ff7114;
	.warp {
		background: $bgc;
		height: 100vh;
		overflow-y: hidden;
	}

	.pay-warp {
		margin-top: 100rpx;
		width: 100%;
		height: 500rpx;
		background: $minColor;
		text-align: center;

		.payComplete-img {
			width: 100rpx;
			height: 100rpx;
			margin-top: 100rpx;

		}

		.payComplete-title {
			color: #fff;
			font-size: 30rpx;
			margin-top: 15rpx;
		}
	}

	.order-info {
		width: 80%;
		background-color: #fff;
		margin: -80rpx auto 100rpx auto;
		padding: 30rpx 20rpx;

		.money {
			color: $minColor;
			font-size: 40rpx;
			font-weight: 600;
			text-align: center;
			border-bottom: dashed 4rpx $bgc;
			padding-bottom: 30rpx;
			 position: relative;
			 &::before, &::after{
				 position: absolute;
				 content: '';
				 width: 30rpx;
				 height: 30rpx;
				 background: $bgc;			 		
				 border-radius: 50%;
			 }

			&::before {	
				bottom: -15rpx;
				left: -30rpx;
			}
			position: relative;
			
			&::after {
				bottom: -15rpx;
				right: -30rpx;
				
			}
		}

		.info-list {
			font-size: 28rpx;
			display: flex;
			justify-content: space-between;
			color: rgb(164, 161, 164);
		}

		.info-list:nth-child(2) {
			padding-top: 30rpx;			
		}
	}

	.btn{
		background: $minColor;
		width: 80%;
		height: 45rpx;
		text-align: center;
		color: #fff;
		margin: 40rpx auto;
		padding: 20rpx 0;
		border-radius: 50rpx;
		
	}
	

</style>
