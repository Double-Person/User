<template>
	<view class="address">
		<!-- header -->
		<commonHeader headerTitl="地址"></commonHeader>

		<view class="address-content">
			<view class="item">
				<view class="address-content-title">
					联系方式
				</view>
				<view class="address-content-phone">
					电&emsp;&emsp;话: <text>{{vendor.CELLPHONE}}</text>
				</view>
				<view class="address-content-address">
					联系地址: <text>{{vendor.CITY+vendor.FULLADD}}</text>
				</view>

				<view class="page-section page-section-gap" @tap="gomap">
					<map style="width: 100%; height: 410rpx;" :latitude="latitude" :longitude="longitude" :markers="covers">
					</map>
				</view>

				<view class="addressTips" @tap="gomap">
					点击查看详情
				</view>
			</view>
		</view>
		<!-- tabbar -->
		<tabbar></tabbar>
	</view>
</template>

<script>
	// header
	import commonHeader from "@/components/common-header/common-header";
	// 引入tabbar
	import tabbar from "@/components/common-tabbar/common-tabbar";
	export default {
		data() {
			return {
				vendor: {},
				title: 'map',
				latitude: 39.909,
				longitude: 116.39742,
				covers: [{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '../../static/images/location.png',
					width: 30,
					height: 30
				}]
			};
		},
		components: {
			commonHeader,
			tabbar
		},
		onLoad(e) {
			this.vendor = JSON.parse(e.vendor);
			// locationPoint  locationAddress
			let locationPoint = uni.getStorageSync('locationPoint');
			this.latitude = JSON.parse(locationPoint).latitude;
			this.longitude = JSON.parse(locationPoint).longitude;
			this.covers[0].latitude = JSON.parse(locationPoint).latitude;
			this.covers[0].longitude = JSON.parse(locationPoint).longitude;

		},
		methods: {
			// 前往地图
			gomap() {
				uni.openLocation({
					latitude: JSON.parse(this.latitude),
					longitude: JSON.parse(this.longitude),
				});
			}
		}
	}
</script>

<style lang="less">
	.address {
		background: #f7f7f7;
		padding-top: 130rpx;
		height: 87%;
		color: #333;
		font-size: 30rpx;
		/* #ifdef APP-PLUS */
		padding-top: 170rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		padding-top: 170rpx;
		/* #endif */

		.address-content {
			background: #f7f7f7;
			padding: 0 30rpx;
			height: 100%;

			.item {
				height: 100%;
				background: #fff;
				border-radius: 20rpx;
				padding: 0 30rpx;

				.address-content-title {
					padding: 30rpx 0 20rpx 0;
					font-weight: bold;
					font-size: 39rpx;
				}

				>view {
					margin-top: 10rpx;

					text {
						margin-left: 20rpx;
					}
				}

				.page-section {
					margin-top: 50rpx;
				}
			}

			.addressTips {
				color: #f00;
				margin-top: 30rpx;
			}
		}
	}
</style>
