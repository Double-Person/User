<template>
	<view class="myOrder">
		<!-- header -->
		<commonHeader headerTitl="我的订单" xingHide=true lingHide=true></commonHeader>
		<!-- tab切换 -->
		<view class="myOrder-title">
			<text :class="active===1?'active':''" @tap="changeTitle(1)">已付款</text>
			<text :class="active===0?'active':''" @tap="changeTitle(0)">未付款</text>
			<text :class="active===2?'active':''" @tap="changeTitle(2)">退款/售后</text>
		</view>
		<view class="myOrder-content">
			<!-- 已付款 -->
			<view class="myOrder-content-complete commonStyle" :class="active===1?'show':''">
				<view class="item" v-for="item in orderList" :key="item.id">
					<view class="item-title">
						<view class="left">
							<image :src="item.faceicon && item.faceicon.length>10? (imgBaseUrl + item.faceicon):'/static/images/cartLOGO.png'" mode=""></image>
							<text>{{item.shopName}}</text>
						</view>
						<view class="right">
							{{item.shopPhone}}
						</view>
					</view>
                    <view class="item-code" >
                        收货地址：<text>{{item.address}}</text>
                    </view>
					<view class="item-content" >
						<view class="left">
							<image :src="imgBaseUrl + item.goodsImg" mode=""></image>
							<view>
								<text class="left-title">
									{{item.goodsName}}
								</text>
								<view class="left-date">
									下单时间：{{item.createTime}}
								</view>
								<view class="left-price">
									单价：￥{{item.price}}
								</view>
							</view>
						</view>
						<view class="right">
							X{{item.counts}}
						</view>
					</view>
					<view class="item-code">
						订单编号：<text>{{item.ORDERSUMMARY_ID}}</text>
					</view>
					<view class="item-pay">
						付款方式：<text>{{item.PAYTYPEY==0&&'微信'||item.PAYTYPEY==1&&'支付宝'||item.PAYTYPEY==3&&'银行卡'||item.PAYTYPEY==2&&'余额支付'}}</text>
					</view>
					<view class="item-total">
						<text></text>
						<view>
							共计 {{item.counts}} 商品
							<text>合计 ￥<text>{{item.amount}}</text></text>
						</view>
					</view>
					<view class="item-btn">
						<text v-if="item.takeStatus == 'N'" @click="goOrderDetail(item.ORDERSUMMARY_ID)">申请退款</text>
						<text v-if="item.takeStatus == 'N'" @click="subOrder(item.ORDERSUMMARY_ID)">确认收货</text>
						<text v-if="item.takeStatus != 'N'" @click="evaluation(item.ORDERSUMMARY_ID)">立即评价</text>
						<text v-if="item.address!='线下支付'" @click="again(item.shopId)">再来一单</text>
					</view>
				</view>
			</view>
			<!-- 未付款 -->
			<view class="myOrder-content-uncomplete commonStyle" :class="active===0?'show':''">
				<view class="item" v-for="item in orderList" :key="item.id">
										
					<view v-for="(shopItem,indey) in item.shop" :key="indey">
						<view class="item-title">
							<view class="left">
								<image :src="imgBaseUrl + shopItem.FACEICON" mode=""></image>
								<text>{{shopItem.SHOP_NAME}}</text>
							</view>
							<view class="right">
								{{shopItem.PHONE}}
							</view>
						</view>
						<view class="item-content">
							<view v-for="(good,indez) in shopItem.goodes" 
								  :key="indez" 
								  style="width:100%;display: flex;justify-content: space-between;margin-bottom: 30rpx;">
								<view class="left">
									<image :src="imgBaseUrl + good.IMG" mode=""></image>
									<view>
										<text class="left-title">
											商品名称：{{good.GOODSNAME}}
										</text>
									
										<view class="left-price">
											单价：￥{{good.PRICE}}
										</view>
									</view>
								</view>
								<view class="right">
									X{{good.COUTNS}}
								</view>
							</view>
						</view>
						
					</view>
					
					<view class="item-total" style="align-items: center;">
						
						<view style="font-size: 24rpx;">订单编号：{{item.ORDERNO}}</view>
						<view style="font-size: 28rpx;">
							共计 <text style="color: red;margin-left: 0;"> {{item.number}} </text> 商品
							<text>合计 ￥<text>{{item.PAYABLE}}</text></text>
						</view>
					</view>
					<view class="item-btn" style="display: flex;justify-content: space-between;align-items: center;">
						
						<view style="font-size: 24rpx;">下单时间：{{item.CREATETIME }}</view>
						<text @click="toPay(item)">待付款</text>
					</view>
				</view>
			</view>
			<!-- 退款售后 -->
			<view class="myOrder-content-refund commonStyle" :class="active===2?'show':''">
				<view class="item" v-for="item in orderList" :key="item.id">
					<view class="item-title">
						<view class="left">
							<image :src="item.goodsImg ? (imgBaseUrl + item.goodsImg) : '/static/images/cartLOGO.png'" mode=""></image>
							<text>{{item.shopName}}</text>
						</view>
						<view class="right">
							{{item.shopPhone}}
						</view>
					</view>
					<view url="../oraderDetails/oraderDetails" class="item-content">
						<view class="left">
							<image :src="item.goodsImg ? (imgBaseUrl + item.goodsImg) : '/static/images/cartLOGO.png'" mode=""></image>
							<view>
								<text class="left-title">
									{{item.goodsName}}
								</text>
								<view class="left-date">
									下单时间：{{item.createTime}}
								</view>
								<view class="left-price">
									单价：￥{{item.price}}
								</view>
							</view>
						</view>
						<view class="right">
							X{{item.counts}}
						</view>
					</view>
					<view class="item-code">
						订单编号：<text>{{item.ORDERSUMMARY_ID}}</text>
					</view>
					<view class="item-pay">
						付款方式：<text>{{item.PAYTYPEY==0&&'微信'||item.PAYTYPEY==1&&'支付宝'||item.PAYTYPEY==3&&'银行卡'||item.PAYTYPEY==2&&'余额支付'}}</text>
					</view>
					<view class="item-total">
						<text></text>
						<view>
							共计{{item.counts}}商品
							<text>合计 ￥<text>{{item.amount}}</text></text>
						</view>
					</view>
					<view class="item-btn">
						<text @click="again(item.shopId)">进入店铺</text>
						<text @click="cancelRefund(item)">撤销退款</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 暂无提示 -->
		<view class="myOrder-content-tips" v-if="orderList.length == 0" style="textAlign: center;color: #666;paddingTop: 50rpx;">
			暂无订单！
		</view>
		<!-- tabbar -->
		<tabbar></tabbar>
	</view>
</template>

<script>
	import commonHeader from"@/components/common-header/common-header";
	import tabbar from"@/components/common-tabbar/common-tabbar";
	
	import {myOrder,submitOrder, orderRepeal, alipay, wxpay, imgBaseUrl} from "@/common/apis.js";
	export default {
		data() {
			return {
				imgBaseUrl: imgBaseUrl,
				active:1,
				orderList:[],
                USERINFO_ID:''
			};
		},
		components:{
			commonHeader,
			tabbar
		},
		mounted() {
		    this.getOrderList(1)
		},
		methods:{
			// 去支付
			toPay(item){
				let { BALANCE } = uni.getStorageSync('userInfo');
				console.log(BALANCE)
				console.log(item)
				uni.showActionSheet({
				    itemList: [`余额支付 (${BALANCE})`, '微信支付', '支付宝支付', '银行卡支付支付'],
				    success: function (res) {
				        console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						if(res.tapIndex === 3 ) {
							return uni.showToast({ title: '暂不支持银行卡支付',icon: 'none' })
						}
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			},
			
			pay(index) {
						
				// 0 余额支付   1 微信支付   2 支付宝支付    3 银行卡支付	
				
				let obj = {
					payAmount: '216.0',// this.payAmount,  // 
					orderSummaryId:  'D1601279104958'// this.orderID //
				};
				
			
				// 微信支付
				if (this.payMode === 1) {
					wxpay(obj).then(res => {
						uni.requestPayment({// 现在都没进这个
							provider: 'wxpay',
							orderInfo: res.returnMsg, 
							success :( res) =>{  
								uni.showToast({
									title: '支付成功!',
									duration: 2000,
									mask: true
								});
								setTimeout(() => {
									uni.navigateTo({
										url: '../index/index'
									});
								}, 2000);
								console.log('success:' + JSON.stringify(res));
							},
							
							fail :(err) =>{
								uni.showToast({
									title: '支付失败!',
									icon: 'none',
									duration: 2000,
									mask: true
								});
								console.log('fail:' + JSON.stringify(err));
							}
						});
					});
				}
				
				// 支付宝支付
				if (this.payMode === 2) {
					alipay(obj).then(res1 => {
						console.log('支付宝订单信息', JSON.stringify(res1.returnMsg));
						uni.requestPayment({
							provider: 'alipay',
							orderInfo: res1.returnMsg,
							// orderInfo: mockOrderInfo.returnMsg,
							success: res => {
								console.log('success支付宝:' + JSON.stringify(res));
								// 隐藏当前支付方式选择
							
								uni.showToast({
									title: '支付成功!',
									duration: 2000,
									mask: true
								});
								setTimeout(() => {
									uni.navigateTo({
										url: '../index/index'
									});
								}, 2000);
							},
							fail: err => {
								uni.showToast({
									title: '支付失败!',
									icon: 'none',
									duration: 2000,
									mask: true
								});
								console.log('fail支付宝:' + JSON.stringify(err));
							},
						});
					});
				}
				
				// 餘額支付
				
				if(this.payMode === 0) {
					
				}
				
				
				if (this.payMode === 3) {
					uni.showToast({
						title: '暂未开通此功能!',
						duration: 2000,
						// mask: true
					})
				}
				// 显示密码输入
				
			},
			
			evaluation(orderId) {  // ORDERSUMMARY_ID
				uni.navigateTo({
					url: '../evaluate/evaluate?ORDERSUMMARY_ID=' + orderId + '&from=order'
				})
			},
			changeTitle(index){
				this.active = index;
                this.getOrderList(index)
			},
            // 申请退款
            goOrderDetail(id){
                uni.navigateTo({
                    url:"../oraderDetails/oraderDetails?orderID="+id
                })
            },
            // 确认收货
            subOrder(orderId){
                submitOrder({ORDERSUMMARY_ID:orderId}).then(res => {
                    console.log(res)
                    if (res.returnMsg.status == '00') {
                        uni.showToast({
                            title:'确认收货成功！'
                        })
                        this.getOrderList(1)
                    }else if(res.returnMsg.status == '01'){
                        uni.showToast({
                            title:'订单号不存在！'
                        })
                    }else if(res.returnMsg.status == '03'){
                        uni.showToast({
                            title:'退款中，不能确认收货！'
                        })
                    }else{
                        uni.showToast({
                            title:'确认失败！'
                        })
                    }
                })
            },
            // 请求订单
            getOrderList(STATE){
                uni.getStorage({
                    key:'USERINFO_ID',
                    success:res => {
						uni.showLoading({ title: '加载中', mask: true })
                        myOrder({STATE,USERINFO_ID: res.data}).then(res=>{
                        	if (res.returnMsg.status == '00') {
                        		this.orderList = res.returnMsg.list
                        	}else{
                        		uni.showToast({
                        		    title:'数据获取失败!',
                                    icon:'none'
                        		})
                        	}
                        }).catch(err=>{
                        	uni.showToast({
                        		title:'获取失败！'
                        	})
                        }).finally(() => uni.hideLoading())
                    }
                })
            },
            // 再来一单
            again(shopId){
				console.log(shopId)
                uni.navigateTo({
                    url:"../shopPage/shopPage?shopId="+shopId
                })
            },
			cancelRefund(item) {
				console.log(item)
				orderRepeal({ORDERSUMMARY_ID: item.ORDERSUMMARY_ID}).then(res => {
					if(res.msgType == 0) {
						uni.showToast({
							title:'取消退款成功',
							icon: "none"
						})
						this.active = 2
						this.getOrderList(2)
					}else{
						uni.showToast({
							title:'取消退款失败',
							icon: "none"
						})
					}
					
				})
			}
		},
		
	}
</script>

<style lang="less">
	.myOrder-content-uncomplete{
		.item-content{
			display: block !important;
			padding: 15px 0 0 0 !important;
		}
	}
	.myOrder{
		min-height: 100%;
		background: #f6f7f8;
		padding: 210rpx 0;
		color: #333;
		/* #ifdef APP-PLUS */
		padding-top: 250rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		padding-top: 250rpx;
		/* #endif */
		.myOrder-title{
			font-size: 32rpx;
			display: flex;
			justify-content: space-around;
			background: #fff;
			border-bottom: 1px solid #e0e0e0;
			position: fixed;
			top: 90rpx;
			/* #ifdef APP-PLUS */
			top: 130rpx;
			/* #endif */
			/* #ifdef MP-WEIXIN */
			top: 130rpx;
			/* #endif */
			width: 100%;
			z-index: 9999;
			text{
				padding:35rpx 0;
			}
			.active{
				border-bottom: 8rpx solid #FF5904;
				font-weight: bold;
			}
		}
		.myOrder-content{
			.show{
				display: block;
			}
			>view{
				display: none;
				
			}
			.commonStyle{
				width: 95%;
				margin: auto;
				font-size: 30rpx;
				.item{
					background: #fff;
					margin-top: 20rpx;
					border-radius: 20rpx;
					padding: 0 20rpx 30rpx 20rpx;
					.item-title{
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 30rpx 0;
						border-bottom: 1px solid #e0e0e0;
						.left{
							font-size: 32rpx;
							font-weight: bold;
							display: flex;
							align-items: center;
							image{
								width: 50rpx;
								height: 50rpx;
								border-radius: 50%;
								margin-right: 20rpx;
							}
						}
						.right{
							font-size: 38rpx;
							color: #999;
						}
					}
					.item-content{
						display: flex;
						padding: 30rpx 0;
						justify-content: space-between;
						.left{
							display: flex;
							image{
								width: 180rpx;
								height: 152rpx;
								border-radius: 20rpx;
								margin-right: 20rpx;
							}
							>view{
								.left-title{
									font-size: 32rpx;
								}
								view{
									font-size: 28rpx;
									color: #666;
									margin-top: 10rpx;
								}
							}
						}
						.right{
							font-size: 28rpx;
							color: #666;
						}
					}
					.item-code,.item-pay{
						padding: 20rpx 0;
						text{
							color: #666;
							margin-left: 30rpx;
						}
					}
					.item-pay{
						border-bottom: 1px solid #e0e0e0;
					}
					.item-total{
						display: flex;
						justify-content: space-between;
						padding: 30rpx 0;
						border-top: 1rpx solid #e0e0e0;
						view{
							>text{
								color: #666;
								margin-left: 40rpx;
								text{color: #FF5904;}
							}
						}
					}
					.item-btn{
						display: flex;
						justify-content: flex-end;
						text{
							padding: 8rpx 30rpx;
							border: 1px solid #FF6504;
							border-radius: 40rpx;
							color: #FF6504;
							margin-right: 30rpx;
						}
						text:last-child{
							background:linear-gradient(231deg,rgba(255,178,10,1) 0%,rgba(255,127,4,1) 60%,rgba(255,89,4,1) 100%);
							color: #fff;
							border: 0;
							margin-right: 10rpx;
						}
					}
				}
			}
		}
	}
</style>
