<template>
	<view class="mybalance">
		<!-- hader -->
		<commonHeader :headerTitl="headerTitl" xingHide=true></commonHeader>
		<view class="mybalance-date">
			<!-- 日期选择 -->
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-db">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
			</view>
			<text class="iconfont icon-zuishao"></text>
		</view>
		<view class="mybalance-content" v-if="listData">
			<view class="mybalance-content-item" v-for="item in listData" :key="item.id">
				<view class="left">
					<text class="icon">
						<text class="iconfont icon-shouzhimingxicaifuhongbaoyue"></text>
					</text>
					<view class="text">
						<text>{{item.TYPES==1&&'购物'||item.TYPES==2&&'提现'||item.TYPES==3&&'星币兑换'}}</text>
						<view v-if="item.CHARGE">
							手续费{{item.CHARGE}}%
						</view>
						<view>
							{{item.TRADETIME}}
						</view>
					</view>
				</view>
				<view class="right">
					{{item.TYPES==1&&'-'||item.TYPES==2&&'-'||item.TYPES==3&&'+'}}￥{{item.MONEY}}
				</view>
			</view>
		</view>
		<view v-else style="text-align: center;color: #999;padding-top: 150rpx;">改天没有记录哦！</view>
		<!-- tabbar -->
		<tabbar></tabbar>
	</view>
</template>

<script>
	// header
	import commonHeader from "@/components/common-header/common-header";
	// tabbar
	import tabbar from "@/components/common-tabbar/common-tabbar";
	import {
		myBalance
	} from '@/common/apis.js';
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				headerTitl: "我的余额",
				listData: [],
				// 日期选择
				date: currentDate,
				timeStamp: ''
			}
		},
		methods: {
			// 日期选择
			bindDateChange: function(e) {
				var arr = e.detail.value.split('-');
				this.date = `${arr[0]}年${arr[1]}月${arr[2]}日`;
				// this.timeStamp = new Date(`${arr[0]}-${arr[1]}-${arr[2]}`).getTime()
				this.timeStamp = `${arr[0]}-${arr[1]}-${arr[2]}`
				this.getData(this.timeStamp)
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					// year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				this.timeStamp = new Date(`${year}-${month}-${day}`).getTime()
				// return `${year}年${month}月${day}日`;
				return `${year}-${month}-${day}`;
			},
			getData(timeStamp) {
				uni.getStorage({
					key: 'USERINFO_ID',
					success: res => {
						var obj = {
							"USERINFO_ID": res.data,
							"TRADETIME": timeStamp ? timeStamp : ''
						}
						// 暂时未传参,展示全部数据 obj
						myBalance(obj).then(res => {
							console.log(res)
							this.listData = res.returnMsg.varList
						}).catch(err => {
							uni.showToast({
								title: '请求失败',
								icon: 'none'
							})
						})
					}
				})
			}
		},
		components: {
			commonHeader,
			tabbar
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		mounted() {
			this.getData()
		}
	}
</script>

<style lang="less" scoped>
	.mybalance {
		color: #333;
		padding-top: 95rpx;
		padding-bottom: 150rpx;

		.mybalance-date {
			height: 100rpx;
			background: #f8f6f9;
			padding-left: 30rpx;
			line-height: 100rpx;
			font-size: 36rpx;
			display: flex;
			position: fixed;
			top: 90rpx;
			/* #ifdef APP-PLUS */
			top: 130rpx;
			/* #endif */
			/* #ifdef MP-WEIXIN */
			top: 130rpx;
			/* #endif */
			width: 100%;

			text {
				font-size: 20rpx;
				color: #999;
				margin-left: 15rpx;
			}
		}

		.mybalance-content {
			padding-left: 30rpx;
			padding-top: 90rpx;
			/* #ifdef APP-PLUS */
			padding-top: 130rpx;
			/* #endif */
			/* #ifdef MP-WEIXIN */
			padding-top: 130rpx;

			/* #endif */
			.mybalance-content-item {
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid #E0E0E0;
				padding: 30rpx;
				padding-left: 0;

				.left {
					display: flex;
					align-items: center;

					.icon {
						width: 60rpx;
						height: 60rpx;
						background: #f8f5f8;
						border-radius: 50%;
						border: 1px solid #E0E0E0;
						display: flex;
						justify-content: center;
						align-items: center;

						text {
							font-size: 40rpx;
							color: #FF5A32;
						}
					}

					.text {
						margin-left: 20rpx;
						font-size: 30rpx;

						view {
							font-size: 26rpx;
							color: #999;
							margin-top: 10rpx;
						}
					}
				}

				.right {
					font-weight: bold;
					font-size: 36rpx;
				}
			}
		}
	}
</style>
