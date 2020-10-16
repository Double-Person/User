<template>
	<view class="login">
		<view class="login-header">
			手机号登录
		</view>
		<view class="login-title">
			请输入手机号登录
		</view>
		<view class="login-content">
			<view class="login-content-item">
				<text>+86</text>
				<input type="text" :value="phone" @input="inputPhone" :maxlength="11" placeholder="请输入手机号" placeholder-style="color:#999" />
			</view>
			<view class="login-content-item password">
				<text>密码</text>
				<input type="password" :value="pwd" @input="inputPwd" maxlength="6" placeholder="请输入6位数密码" placeholder-style="color:#999" />
			</view>
			<view class="tips">
				<text @tap="forgetPwd">忘记密码</text>
				<text @tap="register">立即注册</text>
			</view>
		</view>
		<button class="login-content-btn" :disabled="btnState" :class="btnState?'btnState':''" @tap="goIndex" >登录</button>
		<view class="login-tipsText">
			根据国家网络实名的相关规定，自2017年10月1日起，
			您需要绑定手机才能享受正常服务。
			<view class="" style="text-align: center;margin-top: 30rpx;">
				登录或注册即代表已同意
				<navigator url="../userAgreement/userAgreement" style="color:#FF5904;display: inline-block;">《用户使用与隐私协议》</navigator>
			</view>
		</view>
		<!-- 记住密码提示 -->
		<view class="rememberPwd" :class="rememberPwdHide?'rememberPwdHide':''">
			<view class="rememberPwd-content">
				<view class="title">
					是否记住账号密码？
				</view>
				<view class="btn">
					<text @tap="cancelSave">取消</text>
					<text @tap="savePwd">确认</text>
				</view>
			</view>
		</view>

		<!-- 其它登录方式 -->
		<!-- #ifdef APP-PLUS -->
		<view class="otherLogin">
			快捷登录方式 <text class="iconfont icon-weixin" @tap="weixinLogin"></text>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	// 引入api接口
	import {
		login,
		wxLogin
	} from "@/common/apis.js";

	export default {
		data() {
			return {
		
				codeText: "获取验证码",
				btnState: true,
				phone: "13258188656", // 13258188656
				pwd: "", /// 123456
				phoneState: false,
				pwdState: false,
				rememberPwdHide: true,
				saveObj: '',
			}
		},
	
		
		onLoad() {
			// uni.clearStorageSync()
			// 获取本地存储登录信息
			uni.getStorage({
				key: 'name',
				success: (data) => {
					var data = JSON.parse(data.data);
					this.phone = data.phone;
					this.pwd = data.pwd;
					this.phoneState = true;
					this.pwdState = true;
					this.loginState();
				}
			})
		},
		methods: {
			// 获取输入手机号
			inputPhone(e) {
				if (e.detail.value.length === 11) {
					this.phoneState = true;
					this.phone = e.detail.value;
					this.loginState()
				} else {
					this.phoneState = false;
				}
				
			},
			// 获取登录密码
			inputPwd(e) {
				if (e.detail.value.length === 6) {
					this.pwdState = true;
					this.pwd = e.detail.value;
					this.loginState()
				} else {
					this.pwdState = false;
				}
				
				
			},
			// 判断登录按钮状态
			loginState() {
				// if (this.phoneState && this.pwdState) {
				if (this.pwd.length === 6 && this.phone.length === 11) {
					this.btnState = false;
					this.$forceUpdate()
				} else {
					this.btnState = true;
				}
			},

			// 前往首页
			goIndex() {
				let that = this;
				uni.showLoading({
					title: '登录中...'
				})
				that.saveObj = {
					PHONE: that.phone,
					PASSWORD: that.pwd
				}

				try {
					that.saveObj.openId = getApp().globalData.openid ? getApp().globalData.openid : '';
					that.saveObj.nickName = getApp().globalData.nickName ? getApp().globalData.nickName : '';
				} catch (err) {
					console.log(err)
				}


				// 登录请求
				login(that.saveObj).then(res => {

					console.log('登录响应', JSON.stringify(res));
					uni.showToast({
						title: res.errMsg,
						duration: 2000
					})
					if (res.returnMsg.status == '00') {
						// 用户ID存入全局
						uni.setStorage({
							key: 'USERINFO_ID',
							data: res.returnMsg.USERINFO_ID
						});
						that.rememberPwdHide = false;
						uni.redirectTo({
							url: '/pages/index/index'
						})
						// alert('登录-')
						uni.getStorage({
							key: 'saveStata',
							success: (res) => {
								console.log('缓存', res)
								if (res.data == "true") {
									
									// uni.redirectTo({
									// 	url:'/pages/index/index'
									// })
									uni.redirectTo({
										url: '/pages/index/index'
									})

								} else {
									// 提示保存密码
									that.rememberPwdHide = false;
								}
							},
							fail: () => {
								// 提示保存密码
								that.rememberPwdHide = false;
							}
						})
					} else if (res.returnMsg.status == '01') {
						uni.showToast({
							title: '账号不存在!',
							icon: 'none'
						})
					} else if (res.returnMsg.status == '02') {
						uni.showToast({
							title: '密码错误!',
							icon: 'none'
						})
					} else if (res.returnMsg.status == '03') {
						uni.showToast({
							title: '不合法注册!',
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: '系统错误!',
							icon: 'none'
						})
					}
				}).catch(err =>{
					console.log(JSON.stringify('登录错误--',JSON.stringify(err)))
				})





			},


			// 忘记密码
			forgetPwd() {
				uni.navigateTo({
					url: "../forgetPwd/forgetPwd"
				})
			},
			// 立即注册
			register() {
				uni.navigateTo({
					url: '../register/register'
				})
			},
			// 保存密码
			savePwd() {
				this.rememberPwdHide = true;
				// 保存状态到本地
				uni.setStorage({
					key: 'saveStata',
					data: true
				})
				// 账号密码保存
				uni.setStorage({
					key: 'name',
					data: JSON.stringify(this.saveObj),
					success() {
						uni.redirectTo({
							url: '/pages/index/index'
						})
					},
					fail() {
						uni.showToast({
							title: '保存失败',
							icon: 'none'

						})
					}
				})
			},
			// 取消保存
			cancelSave() {
				// 保存状态到本地
				uni.setStorage({
					key: 'saveStata',
					data: false
				})
				// 移出本地数据
				uni.removeStorage({
					key: 'name',
					success: () => {
						this.rememberPwdHide = true;

						uni.redirectTo({
							url: '/pages/index/index'
						})
					}
				})
			},
			// 微信登录
			// #ifdef APP-PLUS
			weixinLogin() {
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						console.log(JSON.stringify(res.provider))
						// if (res.provider.indexOf('weixin')) {
							// uni.showLoading({
							// 	title: '登录中...'
							// })
							uni.login({
								provider: 'weixin',
								success: (loginRes) => {
									console.log(JSON.stringify(loginRes))
									getApp().globalData.openid = loginRes.authResult.openid;
									uni.hideLoading()
									wxLogin({
										"openId": loginRes.authResult.openid,
										"code": '',
										"accessToken": loginRes.authResult.access_token
									}).then(res => {
										console.log('WDX', res)
										getApp().globalData.nickName = res.returnMsg.nickName;
										if (res.returnMsg.status == '00') {
											uni.setStorage({
												key: 'USERINFO_ID',
												data: res.returnMsg.USERINFO_ID
											});
											// 如果已绑定手机跳转至首页
											uni.reLaunch({
												url: '../index/index'
											})
										} else if (res.returnMsg.status == '01') {
											// 否则跳转注册
											uni.navigateTo({
												url: '../register/register'
											})
										}
									}).catch(err => {
										uni.showToast({
											title: '登录失败！',
											icon: 'none'
										})
									})
								},
								fail: (err) => {
									uni.showToast({
										title: '您还未安装或登录！',
										icon: 'none'
									})
									console.log(JSON.stringify(err))
								}
							});
						// }
					}
				});
			},
			// #endif

		},

	}
</script>

<style lang="less">
	.login {
		height: 100%;
		background: #fffeff;
		color: #333;
		font-family: PingFangSC-Regular, PingFang SC;
		position: relative;

		.login-header {
			padding: 20rpx;
			font-size: 40rpx;
			/* #ifdef APP-PLUS */
			padding-top: 60rpx;
			/* #endif */
			/* #ifdef MP-WEIXIN */
			padding-top: 60rpx;
			/* #endif */
			background: linear-gradient(117deg, rgba(255, 90, 43, 1) 0%, rgba(255, 89, 52, 1) 36%, rgba(255, 156, 31, 1) 100%);
			color: #fff;
			text-align: center;
		}

		.login-title {
			padding: 40rpx 30rpx 0;
			font-size: 44rpx;
			font-weight: bold;
		}

		.login-content {
			padding-left: 30rpx;

			.login-content-item {
				padding: 30rpx 0;
				display: flex;
				border-bottom: 1px solid #e0e0e0;
				margin-top: 40rpx;
				position: relative;

				text:first-child {
					width: 150rpx;
					border-right: 1px solid #999;
					font-size: 36rpx;
				}

				input {
					margin-left: 30rpx;
				}

				.testCode {
					position: absolute;
					right: 30rpx;
					bottom: 30rpx;
					font-size: 30rpx;
					color: #FF5904;
					padding: 15rpx 25rpx;
					background: #f1f1f1;
					border-radius: 40rpx;
					opacity: 0.5;
				}

				/deep/ uni-button {
					line-height: 1em;
				}

				.selectCode {
					opacity: 1;
				}
			}

			.password {
				justify-content: space-between;

				input {
					flex: 1;
				}
			}

			.login-content-userTreaty {
				padding-right: 30rpx;
				font-size: 24rpx;
				padding-top: 20rpx;
				position: relative;

				/deep/ uni-radio .uni-radio-input {
					width: 30rpx;
					height: 30rpx;
				}

				.radio {
					display: flex;
					align-items: center;
					color: #666;
					position: absolute;
					left: 0;

					image {
						width: 30rpx;
						height: 30rpx;
						margin-right: 10rpx;
					}
				}

				>text {
					color: #FF5904;
					position: absolute;
					right: 30rpx;
				}

				.treatyHide {
					display: none;
				}

				.codeHide {
					display: none;
				}
			}

			.tips {
				display: flex;
				justify-content: space-between;
				font-size: 30rpx;
				padding: 20rpx 0;
				padding-right: 20rpx;
				color: #FF5904;
			}
		}

		.login-content-btn {
			width: 95%;
			background: linear-gradient(243deg, rgba(255, 153, 96, 1) 0%, rgba(255, 90, 44, 1) 100%);
			height: 88rpx;
			border-radius: 10rpx;
			color: #fff;
			font-size: 40rpx;
			text-align: center;
			margin: 150rpx auto 0;
			line-height: 88rpx;
			box-shadow: 0 10rpx 20rpx #FF9960;
		}

		.btnState {
			opacity: 0.5;
			color: #fff !important;
		}

		.login-tipsText {
			font-size: 28rpx;
			color: #999999;
			width: 88%;
			margin: 100rpx auto 0;
		}


		// 记住密码蒙层
		.rememberPwdHide {
			display: none !important;
		}

		.rememberPwd {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(1, 1, 1, 0.3);

			.rememberPwd-content {
				padding: 30rpx;
				width: 50%;
				height: 200rpx;
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				border-radius: 20rpx;
				font-size: 30rpx;
				text-align: center;
				margin: auto;
				background: #fff;
				overflow: hidden;

				.btn {
					position: absolute;
					bottom: 0;
					width: 100%;
					display: flex;
					margin-left: -30rpx;
					justify-content: space-between;
					color: #fff;

					text {
						width: 50%;
						padding: 20rpx 0;
						background: #ccc;
					}

					text:last-child {
						background: #4CD964;
					}
				}
			}
		}

		// 其它登录方式
		.otherLogin {
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 30rpx;
			margin-top: 30rpx;

			.icon-weixin {
				font-size: 80rpx;
				color: #1bac19;
				margin-left: 20rpx;
			}
		}

	}
</style>
