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
				<input @blur="getPhone" :maxlength="11" type="text" value="" placeholder-style="color:#999;fontSize:28rpx;textAlign:right;"
				 placeholder="注册手机号已读取" />
			</view>
			<view class="merchantEntry-content-item" style="text-align: right;">
				<text>选择入驻城市/区</text>
				<!-- <input @blur="getCity" type="text" value="" placeholder-style="color:#999;fontSize:28rpx;textAlign:right;"
				 placeholder="填写入驻城市/区" /> -->
				 {{ addressObj.city }} {{ addressObj.district }} 
				 <pickerAddress class="index-top-address" @change="getCity">
				 	<text class="iconfont icon-dingwei"></text>
				 </pickerAddress>
			</view>
			
			<view class="merchantEntry-content-item">
				<text>详细地址</text>
				<input @blur="getEmail" type="text" v-model="city"  placeholder-style="color:#999;fontSize:28rpx;textAlign:right;"
				 placeholder="填写入详细地址" />
			</view>
			
			<view class="merchantEntry-content-item">
				<text>负责人邮箱</text>
				<input @blur="getEmail" type="text"  placeholder-style="color:#999;fontSize:28rpx;textAlign:right;"
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
					<image src="/static/images/renzheng01.png" mode=""></image>
					<view>
						请上传身份证正面
					</view>
					<text>注：请上传jpg/png格式图片</text>
				</view>
				<view class="item-img" :class="imgHide?'imgHide':''">
					<image :src="imgBaseUrl + imgUrl" mode=""></image>
				</view>
			</view>
			<view class="item" @tap="fan">
				<view class="item-top" :class="imgHide1?'':'imgHide'">
					<image src="/static/images/renzheng02.png" mode=""></image>
					<view>
						请上传身份证反面
					</view>
					<text>注：请上传jpg/png格式图片</text>
				</view>
				<view class="item-img" :class="imgHide1?'imgHide':''">
					<image :src="imgBaseUrl + imgUrl1" mode=""></image>
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
					<image src="/static/images/yingye.png" mode=""></image>
					<view>
						请上传营业执照
					</view>
					<text>注：请上传jpg/png格式图片</text>
				</view>
				<view class="item-img" :class="imgHide2?'imgHide':''">
					<image :src="imgBaseUrl + imgUrl2" mode=""></image>
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
		shopAuth,
		baseUrl,
		imgBaseUrl
	} from '@/common/apis.js';
	import {
		pathToBase64,
		base64ToPath
	} from 'image-tools';
	export default {
		data() {
			return {
				imgBaseUrl: imgBaseUrl,
				addressObj: {},
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
						const tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
							url: baseUrl + '/uploadFile/file', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							success: (uploadFileRes) => {
								this.imgUrl = JSON.parse(uploadFileRes.data).data
								this.imgHide = false
							}
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
						const tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
							url: baseUrl + '/uploadFile/file', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							success: (uploadFileRes) => {
								this.imgUrl1 = JSON.parse(uploadFileRes.data).data
								this.imgHide1 = false
							}
						});

					}
				});
			},
			huzhao() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
							url: baseUrl + '/uploadFile/file', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							success: (uploadFileRes) => {
								this.imgUrl2 = JSON.parse(uploadFileRes.data).data
								this.imgHide2 = false;
							}
						});
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
			getCity(data) {
				// this.city = e.detail.value;
				this.city = data.data.slice(0, 3).join('');
			},
			// 邮箱
			getEmail(e) {
				this.email = e.detail.value;
			},
			// 提交
			async submit() {
				if(!this.username) { return uni.showToast({ title: '请输入用户名', icon: 'none' }) }
				if(!this.phone) { return uni.showToast({ title: '请输入手机号', icon: 'none' }) }
				if(!(this.addressObj && this.addressObj.district)) { return uni.showToast({ title: '定位失败请手动选择', icon: 'none' }) }
				if(!this.email) { return uni.showToast({ title: '请输入负责人邮箱', icon: 'none' }) }
				if(!this.city) { return uni.showToast({ title: '请输入详细地址', icon: 'none' }) }
				
				if(!this.imgUrl) { return uni.showToast({ title: '请上传身份证正面', icon: 'none' }) }
				if(!this.imgUrl1) { return uni.showToast({ title: '请上传身份证反面', icon: 'none' }) }
				if(!this.imgUrl2) { return uni.showToast({ title: '请上传营业执照', icon: 'none' }) }
				let obj = {
					name: this.username, // 用户名
					phone: this.phone, //  手机号
					eamil: this.eamil,
					city: this.addressObj.city || '',
					area: this.addressObj.district || '',
					fulladd: this.city,
					longitude: this.longitude || 0,
					latitude: this.latitude || 0,
					idcarddfront: this.imgUrl, // 身份证真反面
					idcardback: this.imgUrl1, // 身份证真反面
					certificate: this.imgUrl2 //营业执照
				}
				 
				let res = await shopAuth(obj)

				if(res.msgType == 0) {
					uni.showToast({
						title: '申请提交成功',
						icon: 'none'
					})
				}else{
					uni.showToast({
						title: res.errMsg,
						icon: 'none'
					})
				}
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
						try{
							this.addressObj = data.data.regeocode.addressComponent;
							let addStr = data.data.regeocode.formatted_address.split(this.addressObj.district);
							this.city = addStr[1];
						}catch(e){
							//TODO handle the exception
						}
						
					},
					fail(err) {

						uni.showToast({
							title: "定位失败请手动选择",
							icon: 'none'
						})
					}
				})
			},

			getPoint() {
				uni.getLocation({
					type: 'wgs84',
					success: (res) => {
	
						this.longitude = res.longitude
						this.latitude = res.latitude
						this.conversionPoint(res)
					}
				})
			},




		}
	}
</script>

<style lang="less" scoped>
	.index-top-address{
		margin-right: 30rpx;
	}
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
					width: 380rpx;
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
