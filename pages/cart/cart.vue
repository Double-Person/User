<template>
	<view class="cart">
		<!-- 顶部 -->
		<commonHeader :headerTitl="headerTitl" xingHide=true lingHide=true></commonHeader>
		<!-- 购物内容 -->
		<view class="cart-content" v-if="cartList.length>0">
			<view class="cart-content-item" v-for="(item,index) in cartList" :key="index">
				<!-- 标题 -->
				<view class="cart-content-item-title">
					<label class="radio">
						<radio value="" :checked="item.checked" @tap="changeQuan(item,index)" />
						<image :src="imgBaseUrl + item.shopImg " mode=""></image>
						<text>{{item.shopName}}</text>
					</label>
				</view>
				<!-- 内容 -->
				<view class="cart-content-item-content" v-for="(goods, $goods) in item.goodsList" :key="$goods">
					<label class="radio">
						<radio value="" :checked="goods.checked" @tap="changeRadio(goods,index)" />
						<image :src="imgBaseUrl + goods.SHOP_IMG" mode="" @tap="goShopDetails(goods)"></image>
						<view class="text" @tap="goShopDetails(goods)">
							<text class="title">{{goods.GOODS_NAME}}</text>
							<view class="num">
								<text>数量: {{ goods.COUNTS }}</text>
								<text>好评率: {{ goods.BETTER * 100 }}%</text>
							</view>
							<text class="price">
								¥{{goods.PRICE}}
							</text>
						</view>
					</label>
					<!-- 数量加减 -->
					<view class="changeNum">
						<view class="left">
		
						</view>
						<view class="right">
							<text class="iconfont icon-jian" @tap="changeNun(-1,index,$goods)"></text>
							{{goods.COUNTS}}
							<text class="iconfont icon-jia" @tap="changeNun(1,index,$goods)"></text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else style="text-align: center;color: #999;padding-top: 130rpx;">暂无数据！</view>
		<!-- 底部结算 -->
		<view class="cart-footer">
			<label class="radio">
				<radio value="" :checked="allChecked" @tap="changeAllChecked" /><text>全选</text>
			</label>
			<view class="right">
				<view class="price">
					合计：<text>{{allTotal}}</text>
				</view>
				<div class="total" @tap="settlement">去结算</div>
			</view>
		</view>
		<!-- tabbar -->
		<tabbar active="3"></tabbar>
	</view>
</template>

<script>
	// 引入tabbar
	import tabbar from "@/components/common-tabbar/common-tabbar";
	// 引入公用头部
	import commonHeader from "@/components/common-header/common-header";
	import {
		cartList, imgBaseUrl
	} from "@/common/apis.js"
	export default {
		name: 'ShopCart',
		data() {
			return {
				imgBaseUrl: imgBaseUrl,
				headerTitl: "购物车",
				cartList: [],
				allChecked: false,
				userId: '',
				quancheckde: false,
				goodsindex: 0,
				
			};
		},
		components: {
			commonHeader,
			tabbar
		},
		mounted() {
			// this.loopState();
			this.goodCarts()
		},
		methods: {
			goodCarts() {
				uni.getStorage({
					key: 'USERINFO_ID',
					success: res => {
						cartList({
							userId: res.data
						}).then(res => {
							console.log('购物车', res.returnMsg)
							if (res.returnMsg.status == '00') {
								// res.returnMsg.carts.map(item => {
								// 	item.num = item.num
								// 	item.price = item.price
								// 	item.checked = false
								// })
								this.cartList = res.returnMsg.carts
								console.log(this.cartList)
							}
						}).catch()
					}
				})
			},
			// 循环遍历选中状态
			loopState() {
				var state = this.cartList.every(item => {
					return item.checked
				})
				if (state) {
					this.allChecked = true;
				} else {
					this.allChecked = false;
				}
			},
			// 单个商品全选按钮
			changeQuan(shop, index) {
				shop.checked = !shop.checked
				if (shop.checked == true) {
					shop.goodsList.forEach((item) => {
						item.checked = true;
					})
				} else {
					shop.goodsList.forEach((item) => {
						item.checked = false;
					})
				}

			},
			// // 改变单选状态
			changeRadio(goods, i) {
				this.goodsindex = i
				goods.checked = !goods.checked;
				let index = this.cartList[i].goodsList.findIndex(item => {
					return item.checked == false;
				});
				if (index != -1) {
					this.allChecked = false;
					this.cartList[i].checked = false;
				} else {
					this.allChecked = true;
					this.cartList[i].checked = true;
				}
				// console.log(index)
			},

			// 全选改变状态
			changeAllChecked() {
				this.allChecked = !this.allChecked
				// this.allChecked ? this.allChecked = false : this.allChecked = true;
				this.cartList.map(item => {
					item.goodsList.forEach((item) => {

						item.checked = this.allChecked;
					})
					item.checked = this.allChecked;
					return item
				})
			},
			// 改变数量
			changeNun(num, index1, index2) {
				console.log(this.cartList)
				this.cartList.forEach((item, index) => {
					if (index === index1) {
						// item.num += num;
						// if(item.num<1){
						// 	this.cartList.splice(index,1)
						// }
						item.goodsList.forEach((goods, $goods) => {
							if ($goods == index2) {
								goods.COUNTS = Number(goods.COUNTS) + num
								if (goods.COUNTS < 1) {
									item.goodsList.splice($goods, 1)
								}
							}
						})
					}
				})
			},
			// 结算
			settlement() {
				
				if (!this.cartList.length) {
					uni.showToast({
						title: '没有商品!',
						icon: 'none'
					});
					return false
				}
				
				var arr=this.cartList[this.goodsindex].goodsList.filter(item => {
					return item.checked==true
				})
				if (arr.length==0) {
					uni.showToast({
						title: '请先选择商品!',
						icon: 'none'
					});
				} else {
					let stringifyArr = JSON.stringify(arr);
					console.log(this.allTotal, arr)
					uni.navigateTo({
						url: "../settlement/settlement?item=" + stringifyArr + "&allNum=" + this.allTotal + '&page=cart'
					})
				}
				
			},
			// 前往商品详情
			goShopDetails(item) {
				uni.navigateTo({
					url: "../goodsDetails/goodsDetails?shopId=" + item.GOODS_ID
				})
			}
		},
		computed: {
			allTotal() {
				// 总价
				let countMoney = 0;
				//  总数量
				let countMum = 0;
				//  单个数量
				var tabbarNum = 0;
				// 没转换的数字
				let newMoney = 0;
				this.cartList && this.cartList[0] && this.cartList[0].goodsList.forEach(item => {
					if (item.checked == true) {
						newMoney += item.COUNTS *item.PRICE;
						countMoney = newMoney.toFixed(2);
						countMum++;
					}
				});
				return countMoney;
			}
			
		}
	}
</script>

<style lang="less" scoped>
	.cart {
		color: #333;
		min-height: 100%;
		background: #f7f7f7;
		padding-bottom: 100rpx;
		/* #ifdef MP-WEIXIN */
		padding-top: 40rpx;
		/* #endif */
		/* #ifdef APP-PLUS */
		padding-top: 40rpx;

		/* #endif */
		// 购物内容
		.cart-content {
			margin-top: 100rpx;
			background: #f8f6f9;
			padding: 20rpx 0;
			margin-bottom: 100rpx;

			.cart-content-item {
				width: 90%;
				margin: auto;
				padding: 20rpx;
				background: #fff;
				border-radius: 20rpx;
				margin-bottom: 20rpx;

				.cart-content-item-title {
					display: flex;
					border-bottom: 1px solid #ccc;
					padding-bottom: 30rpx;
					font-size: 32rpx;
					font-weight: 600;

					.radio {
						display: flex;
						align-items: center;

						image {
							width: 50rpx;
							height: 50rpx;
							margin: 0 15rpx;
						}
					}
				}

				.cart-content-item-content {
					padding-top: 40rpx;

					.radio {
						display: flex;
						align-items: center;

						image {
							width: 180rpx;
							height: 152rpx;
							border-radius: 20rpx;
							margin: 0 20rpx;
						}

						.text {
							margin-top: -20rpx;
							height: 152rpx;

							.title {
								font-size: 28rpx;
								font-weight: 600;
							}

							.num {
								margin: 20rpx 0;
								font-size: 24rpx;
								color: #999;

								text {
									margin-right: 40rpx;
								}
							}

							.price {
								color: #FF5A32;
							}
						}
					}

					.changeNum {
						display: flex;
						align-items: center;
						justify-content: space-between;

						text {
							font-size: 60rpx;
							color: #FF5A32;
							margin-left: 30rpx;
						}

						text:not(:last-child) {
							margin-right: 30rpx;
						}
					}
				}
			}
		}

		// 底部结算
		.cart-footer {
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: #f8f8f8;
			height: 100rpx;
			position: fixed;
			width: 100%;
			font-size: 28rpx;
			bottom: 90rpx;

			.radio {
				margin-left: 30rpx;
			}

			.right {
				display: flex;

				.price {
					line-height: 100rpx;
					margin-right: 30rpx;

					text {
						color: #FF6B37;
					}
				}

				.total {
					background: #FF6B37;
					height: 100rpx;
					width: 220rpx;
					color: #fff;
					font-size: 32rpx;
					line-height: 100rpx;
					text-align: center;
				}
			}
		}
	}
</style>
