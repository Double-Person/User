<template>
	<view class="local-preferences-detail">
		<view class="warp">
			<image class="bg-img" src="/static/images/youhui.png" mode=""></image>
		</view>
		
		<view class="info">
			a我萨尔发违法ad发送到发送到发色人工费计划于六月徒客厅阳台发送到发送到发色人工费计划于六月徒客厅阳台发送到发送到发色人工费计划于六月徒客厅阳台
			
			<view class="phone" @click="callPhone">
				<image src="/static/images/tab04_4.png"></image>
				<view class="">12234556747</view>
			</view>
		</view>

		<!-- 热门推荐 -->
		<view class="localPreferences-content-hot">
			<view class="localPreferences-content-hot-title">
				<text class="iconfont icon-dian"></text>热门推荐
			</view>
			<view class="localPreferences-content-hot-item" v-for="item in hotLIst" :key="item.id"@click="toDetail">
				<view class="left">
					<image :src="item.img" mode=""></image>
				</view>
				<view class="right">
					<view class="right-title">
						<text>{{item.name}}</text>
						<view>
							<text class="iconfont icon-youjiantou"></text>
						</view>
					</view>
					<view class="right-text">
						{{item.details}}
					</view>
					<!-- 评分 -->
					<view class="right-score">
						<!-- 不可点击状态 -->
						<uni-rate disabled="true" :value="item.score" active-color="#FF5D06" size="18"></uni-rate>
						<text>{{item.score}}分</text>
					</view>
					<!-- 时间 -->
					<view class="right-date">
						{{item.createtime}}
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	// 评分组件
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import {
		pushShop,
		getBanner,
		getPush
	} from "@/common/apis.js";
	export default {
		data() {
			return {
				onloadObj: {},
				hotLIst: []
			};
		},
		components: {
			uniRate
		},

		onLoad(e) {
			let locationPoint = uni.getStorageSync('locationPoint')
			let locationArea = uni.getStorageSync('locationArea')
			var obj = {
				// longitude: JSON.parse(locationPoint).longitude,
				// latitude: JSON.parse(locationPoint).latitude,
				// AREA: locationArea,
				// kilometers: '300',
				// NAME: '' // 不填就是综合

				"longitude": "104.031363",
				"latitude": "30.698423",
				"AREA": "金牛区",
				"kilometers": "300",
				"NAME": ""
			}

			console.log(obj)

			this.onloadObj = obj
			this.getCalPreferences()
		},
		methods: {
			// 本地优惠
			getCalPreferences() {
				getPush(this.onloadObj).then(res => {

					this.hotLIst = res.returnMsg.shop
					console.log(this.hotLIst)
				})
			},
			toDetail() { // goodsId 
				uni.navigateTo({
					url: '../goodsDetails/goodsDetails?shopId=' + '126549489'
				})
			},
			// 拨打电话
			callPhone(){
				uni.makePhoneCall({
					phoneNumber: '123456' //仅为示例
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.local-preferences-detail {
		height: 100vh;
		width: 100%;
		

		.warp {
			position: fixed;
			z-index: -1;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			.bg-img{
				width: 100%;
				height: 100%;
			}
		}
	
		.info{
			// height: 300rpx;
			background: rgb(245, 166, 35);
			width: 90%;
			border-radius: 20rpx;
			margin: 80% auto 50rpx auto;
			padding: 20rpx;
			.phone{
				background: rgb(250, 214, 154);
				display: flex;
				align-items: center;
				padding: 15rpx;
				border-radius: 60rpx;
				margin: 30rpx auto;
				image{
					width: 60rpx;
					height: 60rpx;
				}
				view{
					margin-left: 30rpx;
					color: rgb(205, 145, 81);
				}
			}
		}
	}


	.localPreferences-content-hot {
		margin-top: 20rpx;

		.localPreferences-content-hot-title {
			font-size: 32rpx;
			display: flex;
			align-items: center;

			text {
				color: #FF5D06;
				margin-left: 10rpx;
				font-size: 40rpx;
			}
		}

		.localPreferences-content-hot-item {
			display: flex;
			background: #fff;
			padding: 20rpx;
			width: 90%;
			border-radius: 20rpx;
			margin: 20rpx auto 0;
			box-shadow: 0 8rpx 20rpx #999;

			.left {
				width: 213rpx;
				height: 181rpx;
				border-radius: 20rpx;

				image {
					width: 100%;
					height: 100%;
				}

				margin-right: 20rpx;
			}

			.right {
				flex: 1;

				.right-title {
					font-size: 30rpx;
					font-weight: bold;
					display: flex;
					justify-content: space-between;

					view {
						width: 45rpx;
						height: 45rpx;
						border-radius: 50%;
						color: #fff;
						display: flex;
						justify-content: center;
						align-items: center;
						background: linear-gradient(205deg, rgba(251, 151, 72, 1) 0%, rgba(254, 120, 52, 1) 100%);
					}
				}

				.right-text {
					font-size: 24rpx;
					color: #666;
					width: 400rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					margin-top: 10rpx;
				}

				.right-score {
					margin-top: 30rpx;
					display: flex;
					font-size: 24rpx;

					text {
						margin-top: -15rpx;
						margin-left: 15rpx;
					}
				}

				.right-date {
					font-size: 24rpx;
					color: #666;
					margin-top: 10rpx;
				}
			}
		}
	}
</style>
