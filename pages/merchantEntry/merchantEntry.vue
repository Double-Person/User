<template>
	<view class="merchantEntry">
		<!-- header -->
		<commonHeader headerTitl="商家入驻" xingHide=true lingHide=true></commonHeader>
		<!-- 内容开始 -->
		<view class="merchantEntry-content">
			<view class="merchantEntry-content-item">
				<text>姓名</text>
				<input @blur="getUsername" type="text" value="" placeholder-style="color:#999;fontSize:28rpx;textAlign:right;"
				 placeholder="注册姓名已读取" />
			</view>
			<view class="merchantEntry-content-item">
				<text>手机号码认证注册</text>
				<input @blur="getPhone" type="text" value="" placeholder-style="color:#999;fontSize:28rpx;textAlign:right;"
				 placeholder="注册手机号已读取" />
			</view>
			<view class="merchantEntry-content-item">
				<text>选择入驻城市/区</text>
				<input @blur="getCity" type="text" value="" placeholder-style="color:#999;fontSize:28rpx;textAlign:right;"
				 placeholder="填写入驻城市/区" />
			</view>
			<view class="merchantEntry-content-item">
				<text>负责人邮箱</text>
				<input @blur="getEmail" type="text" value="" placeholder-style="color:#999;fontSize:28rpx;textAlign:right;"
				 placeholder="填写入负责人邮箱" />
			</view>
			<view class="merchantEntry-content-item">
				<text>上传 营业执照身份证照</text>
			</view>
		</view>
		<!-- 身份证 -->
		<view class="merchantEntry-idCard">
			<view class="item" @tap="zheng">
				<view class="item-top" :class="imgHide?'':'imgHide'">
					<image src="../../static/images/renzheng01.png" mode=""></image>
					<view>
						请上传身份证正面
					</view>
					<text>注：请上传jpg/png格式图片</text>
				</view>
				<view class="item-img" :class="imgHide?'imgHide':''">
					<image :src="imgUrl" mode=""></image>
				</view>
			</view>
			<view class="item" @tap="fan">
				<view class="item-top" :class="imgHide1?'':'imgHide'">
					<image src="../../static/images/renzheng02.png" mode=""></image>
					<view>
						请上传身份证反面
					</view>
					<text>注：请上传jpg/png格式图片</text>
				</view>
				<view class="item-img" :class="imgHide1?'imgHide':''">
					<image :src="imgUrl1" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 上传营业执照 -->
		<view class="merchantEntry-yengye">
			<text>上传营业执照</text>
		</view>
		<view class="merchantEntry-item">
			<view class="item" @tap="huzhao">
				<view class="item-top" :class="imgHide2?'':'imgHide'">
					<image src="../../static/images/yingye.png" mode=""></image>
					<view>
						请上传营业执照
					</view>
					<text>注：请上传jpg/png格式图片</text>
				</view>
				<view class="item-img" :class="imgHide2?'imgHide':''">
					<image :src="imgUrl2" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 保存 -->
		<view class="merchantEntry-saveBtn" @tap="submit">
			提交审核
		</view>
		<!-- 内容结束 -->
		<!-- tabbar -->
		<tabbar></tabbar>
	</view>
</template>

<script>
	// header  
	import commonHeader from "@/components/common-header/common-header";
	// tabbar
	import tabbar from "@/components/common-tabbar/common-tabbar";
	//引入高德地图
	import amap from '@/components/amap-wx.js';
	import amapPlugin from '@/components/initMap.js';
	// 引入请求接口
	import {
		shopAuth
	} from '@/common/apis.js';
	import {
		pathToBase64,
		base64ToPath
	} from 'image-tools';
	export default {
		data() {
			return {
				addressObj:{},
				username: '',
				phone: '',
				email: "",
				city: "",
				imgHide: true,
				imgHide1: true,
				imgHide2: true,
				imgUrl: '',
				imgUrl1: '',
				imgUrl2: '',
				newCity: '', //当前城市
				area: '', //当前地区
				itemType: 1,
				// 定位信息        
				longitude: '',
				latitude: '',
			};
		},
		components: {
			commonHeader,
			tabbar
		},
		created() {
			this.getPoint()
		},
		methods: {
			// 添加图片
			zheng() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: (res) => {
						pathToBase64(res.tempFilePaths[0])
							.then(base64 => {
								this.imgUrl = base64; //
								this.imgHide = false;
							})
							.catch(error => {
								console.error(error);
							});
			

					}
				});
			},
			fan() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: (res) => {
						pathToBase64(res.tempFilePaths[0])
							.then(base64 => {
								this.imgUrl1 = base64; //
								this.imgHide1 = false
							})
							.catch(error => {
								console.error(error);
							});
				
						;
						console.log(JSON.stringify(res.tempFilePaths));
					}
				});
			},
			huzhao() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: (res) => {
						
						pathToBase64(res.tempFilePaths[0])
							.then(base64 => {
								this.imgUrl2 = base64; //
								this.imgHide2 = false;
							})
							.catch(error => {
								console.error(error);
							});
						console.log(JSON.stringify(res.tempFilePaths));
					}
				});
			},
			// 姓名
			getUsername(e) {
				this.username = e.detail.value;
			},
			// 电话
			getPhone(e) {
				this.phone = e.detail.value;
			},
			// 城市
			getCity(e) {
				this.city = e.detail.value;
			},
			// 邮箱
			getEmail(e) {
				this.email = e.detail.value;
			},
			// 提交
			async submit() {
				let obj = {
					name: this.username, // 用户名
					phone: this.phone, //  手机号
					eamil: this.eamil,
					city: this.addressObj.city||'1',
					area: this.addressObj.district||'2',
					fulladd: this.city,
					longitude: this.longitude||0,
					latitude: this.latitude|| 0,
					idcarddfront: this.imgUrl, // 身份证真反面
					idcardback: this.imgUrl1, // 身份证真反面
					certificate: this.imgUrl2 //营业执照
				}
				let res = await shopAuth(obj)
				console.log(JSON.stringify(res))
			},
			//   金纬度转位置
			conversionPoint(res) {
				uni.request({
					url: "https://restapi.amap.com/v3/geocode/regeo?parameters",
					method: 'GET',
					data: {
						key: 'f0d8604522a34fea7af419d353f98e8f',
						location: `${res.longitude}, ${res.latitude}`
					},
					success: (data) => {
						this.addressObj = data.data.regeocode.addressComponent
					},
					fail(err) {
					
						uni.showToast({
							title: "定位不成功",
							icon: 'none'
						})
					}
				})
			},
			
			getPoint(){
				uni.getLocation({
				    type: 'wgs84',
				    success: (res)=> {
				        
						this.longitude = res.longitude
						this.latitude = res.latitude
						this.conversionPoint(res)
						uni.request({
							url: 'https://yflh.hkzhtech.com/qufl/api/ordersummary/push/newvendor',
							header: {
								'Content-Type': 'application/x-www-form-urlencoded',
							},
							data: { 
								LONGITUDE: this.longitude, // '103.980318', //
								LATITUDE: this.latitude,  // '30.759185', //
								// kilometers: '300',
								showCount: 10,
								currentPage: 1,
								AREA: this.area, // '金牛区', //
								NAME: this.itemType // 不填就是综合
							},
							method: 'POST',
							success: (res) => {
							
								if (res.data.status != '00') {
									uni.showToast({
										title: '请手动设置地区!',
										icon: 'none',
										duration: 2000
									});
								} else {
								
									res.data.varList.map(item => {
										item.distance = Math.round(item.distance);
									});
									this.menuList = res.data.varList;
						
								}
							},
							fail: () => {
								uni.showToast({
									title: '获取数据失败！',
									icon: 'none'
								});
							}
						})
				    }
				})
			},
			
		

			
		}
	}
</script>

<style lang="less">
	.merchantEntry {
		min-height: 100%;
		background: #f6f7f8;
		padding: 90rpx 0;
		/* #ifdef APP-PLUS */
		padding-top: 130rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		padding-top: 130rpx;

		/* #endif */
		.merchantEntry-content {
			background: #fff;
			width: 100%;
			padding-left: 30rpx;
			font-size: 30rpx;

			.merchantEntry-content-item {
				padding-right: 30rpx;
				height: 90rpx;
				line-height: 90rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				input {
					width: 280rpx;
					margin-right: 30rpx;
					text-align: right;
				}
			}

			.merchantEntry-content-item:not(:last-child) {
				border-bottom: 1px solid #e0e0e0;
			}
		}

		.merchantEntry-idCard {
			.item {
				border: 20rpx solid #fff;
				border-radius: 20rpx;
				background: #F6F6F6;
				margin: 30rpx auto 0;
				color: #999;
				text-align: center;
				font-size: 24rpx;
				width: 500rpx;
				height: 302rpx;

				.item-top {
					padding-top: 30rpx;

					image {
						width: 180rpx;
						height: 105rpx;
					}

					view {
						color: #333;
						margin-top: 40rpx;
						margin-bottom: 10rpx;
					}
				}

				.item-img {
					width: 100%;
					height: 100%;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.imgHide {
					display: none;
				}
			}
		}

		.merchantEntry-yengye {
			height: 90rpx;
			line-height: 90rpx;
			font-size: 30rpx;
			background: #fff;
			padding-left: 30rpx;
			margin-top: 30rpx;
		}

		.merchantEntry-item {
			.item {
				border: 20rpx solid #fff;
				border-radius: 20rpx;
				background: #f6f6f6;
				width: 421rpx;
				height: 460rpx;
				margin: 40rpx auto 80rpx;
				text-align: center;
				font-size: 24rpx;

				.item-top {
					padding-top: 110rpx;

					image {
						width: 140rpx;
						height: 161rpx;
					}

					view {
						margin-top: 40rpx;
						margin-bottom: 10rpx;
					}

					text {
						color: #999;
					}
				}

				.item-img {
					width: 100%;
					height: 100%;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.imgHide {
					display: none;
				}

			}
		}

		.merchantEntry-saveBtn {
			width: 95%;
			background: linear-gradient(243deg, rgba(255, 153, 96, 1) 0%, rgba(255, 90, 44, 1) 100%);
			height: 88rpx;
			border-radius: 10rpx;
			color: #fff;
			font-size: 40rpx;
			margin: 0 auto 90rpx;
			text-align: center;
			line-height: 88rpx;
			box-shadow: 0 10rpx 20rpx #FF9960;
		}
	}
</style>
