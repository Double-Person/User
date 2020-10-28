<template>
	<view class="personal">
		<view class="personal-bg">
			<!-- header -->
			<view class="personal-header">
				<view class="position">
					<text class="iconfont icon-dingwei"></text>
					{{ newCity }}
					<text class="iconfont icon-jiantou-xia"></text>
				</view>
				<text class="title">个人中心</text>
				<text class="iconfont icon-saomiao" @tap="scanCode"></text>
			</view>
			<!-- 顶部 -->
			<view class="personal-top">
				<view class="personal-top-left">
					<image 
						:src="userInfo1.userInfo.FACEICON ? userInfo1.userInfo.FACEICON : '/static/images/cartLOGO.png'" 
						mode="" @tap="goSetting">
					</image>
					<view class="title">
						<text class="name">{{ userInfo1.userInfo.USERNAME ? userInfo1.userInfo.USERNAME : 'admin' }}</text>
						<view class="dengji" @tap="goGrade">
							<text class="iconfont icon-w_dengji"></text>
							V{{ userInfo1.userInfo.LEVEL }}
						</view>
					</view>
				</view>
				<view class="personal-top-right"><navigator url="../setting/setting" class="iconfont icon-shezhi"></navigator></view>
			</view>
		</view>
		<!-- 个人信息 -->
		<view class="personal-msg">
			<view class="personal-msg-top">
				<view>
					<text>{{ userInfo1.dividend }}</text>
					<view>上一天分利</view>
				</view>
				<view>
					<text>{{ userInfo1.order }}</text>
					<view>总消费金</view>
				</view>
				<view @tap="goMyConsume">
					<text>{{ userInfo1.userOrder }}</text>
					<view>我的消费金</view>
				</view>
			</view>
			<view class="personal-msg-bottom">
				<view class="text">
					<text @tap="goMyPentacle">{{(userInfo1.userInfo.STARCOINS || 0) }}</text>
					<view class="xingbi" @tap="goMyPentacle">我的星币</view>
					<view class="duihuan" @tap="goXbExchange">兑换</view>
				</view>
				<view class="text">
					<text @tap="goMyBalance">{{ userInfo1.userInfo.BALANCE }}</text>
					<view class="xingbi" @tap="goMyBalance">账户余额</view>
					<navigator url="../withdrawal/withdrawal" class="duihuan">提现</navigator>
			
				</view>
			</view>
		</view>
		<!-- 标题列表 -->
		<view class="personal-titleList">
			<view class="item" v-for="item in menuList" :key="item.id" @tap="goPage(item.id)">
				<view class="left">
					<text class="iconfont" :class="item.icon" :style="{ color: item.color }"></text>
					<text>{{ item.text }}</text>
				</view>
				<text class="iconfont icon-youjiantou"></text>
			</view>
		</view>
		<!-- tabbar -->
		<tabbar active="4"></tabbar>
	</view>
</template>

<script>
// 引入tabbar
import tabbar from '@/components/common-tabbar/common-tabbar';
// 引入高德地图
import amapPlugin from '@/components/initMap.js';

import { personal } from '@/common/apis.js';
export default {
	data() {
		return {
			menuList: [
				{
					id: '01',
					icon: 'icon-dingdanmian',
					color: '#ff808d',
					text: '我的订单'
				},
				{
					id: '02',
					icon: 'icon-pingjia-tianchong',
					color: '#367feb',
					text: '评价管理'
				},
				{
					id: '03',
					icon: 'icon-aixin',
					color: '#fa5d6a',
					text: '收藏店铺'
				},
				{
					id: '04',
					icon: 'icon-shangpu',
					color: '#fca71e',
					text: '商家入驻'
				},
				{
					id: '05',
					icon: 'icon-dingwei',
					color: '#367feb',
					text: '收货地址'
				},
				{
					id: '06',
					icon: 'icon-weibiaoti--',
					color: '#fca71e',
					text: '我的卡券'
				},
				{
					id: '07',
					icon: 'icon-zhinanzhen',
					color: '#367feb',
					text: '新手指南'
				}
			],
			newCity: '',
			userInfo1: {
				userInfo: {
					FACEICON:''
				}
			},
			USERINFO_ID: ''
		};
	},
	components: {
		tabbar
	},
	methods: {
		goPage(index) {
			if (index == 1) {
				uni.navigateTo({
					url: '../myOrder/myOrder'
				});
			}
			if (index == 2) {
				uni.navigateTo({
					url: '../myEvaluate/myEvaluate'
				});
			}
			if (index == 3) {
				uni.navigateTo({
					url: '../collectShop/collectShop'
				});
			}
			if (index == 4) {
				uni.navigateTo({
					url: '../merchantEntry/merchantEntry'
				});
			}
			if (index == 5) {
				uni.navigateTo({
					url: '../myAddress/myAddress'
				});
			}
			if (index == 6) {
				uni.navigateTo({
					url: '../myCard/myCard'
				});
			}
			if (index == 7) {
				uni.navigateTo({
					url: '../newUserRules/newUserRules'
				})
			}
		},
		// 进入设置
		goSetting() {
			uni.navigateTo({
				url: '../setting/setting'
			});
		},
		// 进入我的消费金
		goMyConsume() {
			uni.navigateTo({
				url: '../myConsume/myConsume'
			});
		},
		// 进入我的余额
		goMyBalance() {
			uni.navigateTo({
				url: '../myBalance/myBalance'
			});
		},
		// 进入我的星币
		goMyPentacle() {
			uni.navigateTo({
				url: '../myPentacle/myPentacle'
			});
		},
		// 扫描二维码
		scanCode() {
			// 允许从相机和相册扫码
			// #ifdef APP-PLUS
			uni.scanCode({
				success: res => {
					var shopId = res.result;
					getShopPay({ SHOP_ID: res.result }).then(res => {
						if (res.returnMsg.status == '00') {
							uni.navigateTo({
								url: '../scanPay/scanPay?shopName=' + res.returnMsg.shop.SHOP_NAME + '&shopId=' + shopId
							});
						} else {
							uni.showToast({
								title: '条码错误!',
								icon: 'none',
								duration: 2000,
								mask: true
							});
						}
					});
				}
			});
			// #endif
			// #ifdef H5
			this.jweixin.read(() => {
				this.jweixin.scanQRCode({
					needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
					scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
					success: function(res) {
						var shopId = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
						getShopPay({ SHOP_ID: res.result }).then(res => {
							if (res.returnMsg.status == '00') {
								uni.navigateTo({
									url: '../scanPay/scanPay?shopName=' + res.returnMsg.shop.SHOP_NAME + '&shopId=' + shopId
								});
							} else {
								uni.showToast({
									title: '条码错误!',
									icon: 'none',
									duration: 2000,
									mask: true
								});
							}
						});
					}
				});
			});
			// #endif
		},
		// 等级
		goGrade() {
			uni.navigateTo({
				url: '../grade/grade'
			});
		},
		// 星币兑换
		goXbExchange() {
			uni.navigateTo({
				url: '../xbExchange/xbExchange'
			});
		}
	},
	onLoad() {
		// 获取全局城市地址
		this.newCity = getApp().globalData.city[1];
		uni.getStorage({
			key: 'USERINFO_ID',
			success: res => {
				personal({ USERINFO_ID: res.data }).then(res => {
					uni.setStorageSync('userInfo', res.returnMsg.userInfo)   // kbalance
					uni.setStorageSync('kbalance', res.returnMsg.kbalance)   // kbalance
			
					if (res.msgType == 0) {
						this.userInfo1 = JSON.parse(JSON.stringify(res.returnMsg));
						// 判断交易密码是否存在
						if (this.userInfo1.userInfo.TRADRPASS && this.userInfo1.userInfo.TRADRPASS.length > 0) {
							getApp().globalData.isPwd = true;
							getApp().globalData.pwd = this.userInfo1.userInfo.TRADRPASS;
						}
					} else {
						uni.showToast({
							title: '网络出小差了！',
							icon: 'none'
						});
					}
				});
			}
		});
	},
	mounted() {}
};
</script>

<style lang="less">
.personal {
	height: 100%;
	background: #f5f6f7;
	padding-bottom: 400rpx;

	.personal-bg {
		background: url(../../static/images/bg2.jpg) no-repeat;
		background-size: cover;
		padding-top: 90rpx;
	}

	.personal-header {
		padding: 20rpx;
		font-size: 40rpx;
		/* #ifdef APP-PLUS */
		padding-top: 60rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		padding-top: 60rpx;
		/* #endif */
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #fff;
		position: fixed;
		width: 95%;
		z-index: 99999;
		top: 0;
		background: url(../../static/images/bg2.jpg) no-repeat;
		background-size: 100%;
		.position {
			font-size: 30rpx;

			text:first-child {
				font-size: 33rpx;
				margin-right: 10rpx;
			}

			text:last-child {
				font-size: 18rpx;
				margin-left: 10rpx;
			}
		}

		.title {
			margin-left: -80rpx;
		}

		> .iconfont {
			font-size: 48rpx;
		}
	}

	.personal-top {
		color: #fff;
		display: flex;
		justify-content: space-between;
		padding: 30rpx 20rpx 100rpx;
		/* #ifdef APP-PLUS */
		padding-top: 70rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		padding-top: 70rpx;
		/* #endif */
		.personal-top-left {
			display: flex;

			image {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}

			.title {
				margin-top: -5rpx;

				.name {
					font-size: 38rpx;
				}

				.dengji {
					margin-top: 15rpx;
					width: 108rpx;
					height: 42rpx;
					border-radius: 21rpx;
					background: #fff;
					color: #ff7900;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 28rpx;

					text {
						font-size: 50rpx;
					}
				}
			}
		}

		.personal-top-right {
			.iconfont {
				font-size: 50rpx;
			}
		}
	}

	// 个人信息
	.personal-msg {
		position: relative;
		top: -70rpx;
		background: #fff;
		width: 95%;
		margin: auto;
		border-radius: 20rpx;

		> view {
			display: flex;
		}

		.personal-msg-top {
			border-bottom: 1px solid #ccc;

			> view {
				width: 33%;
				padding: 30rpx 0;
				text-align: center;

				text {
					// font-size: 38rpx;
					font-size: 24rpx;
					color: #ff5a32;
					font-weight: bold;
				}

				view {
					margin-top: 25rpx;
					font-size: 30rpx;
				}
			}

			> view:not(:last-child) {
				border-right: 1px solid #ccc;
			}
		}

		.personal-msg-bottom {
			padding: 30rpx 0;

			.text:first-child {
				border-right: 1px solid #ccc;
			}

			.text {
				width: 50%;
				text-align: center;

				text {
					font-weight: bold;
					font-size: 24rpx;
					color: #ff5a32;
				}

				.xingbi {
					// font-size: 30rpx;
					font-size: 24rpx;
					margin: 20rpx 0;
				}

				.duihuan {
					width: 156rpx;
					height: 50rpx;
					border-radius: 25rpx;
					background: #f2e1db;
					color: #ff5904;
					font-size: 24rpx;
					font-weight: bold;
					line-height: 50rpx;
					margin: auto;
				}
			}
		}
	}

	// 标题列表
	.personal-titleList {
		background: #fff;
		padding-left: 30rpx;
		width: 91%;
		margin: -40rpx auto 0;
		border-radius: 20rpx;

		.item {
			display: flex;
			justify-content: space-between;
			font-size: 30rpx;
			padding: 30rpx 0;

			.iconfont {
				font-size: 40rpx;
				margin-right: 20rpx;
				color: #999;
			}
		}

		.item:not(:last-child) {
			border-bottom: 1px solid #ccc;
		}
	}
}
</style>
