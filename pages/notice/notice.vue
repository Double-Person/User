<template>
	<view class="notice">
		<!-- header -->
		<commonHeader headerTitl="公告"></commonHeader>
		
		<!-- 内容开始 -->
		<view class="notice-content">
			
			<view class="text">
				<view class="">
					{{info.TITLE}}
				</view>
				<view class="text-item">
					{{info.COUNTENT}}
				</view>
				
			</view>
		</view>
		<!-- 内容结束 -->
		
		<!-- tabbar -->
		<tabbar></tabbar>
	</view>
</template>

<script>
	// header
	import commonHeader from "@/components/common-header/common-header";
	// 引入tabbar
	import tabbar from "@/components/common-tabbar/common-tabbar";
	import { getMessageDetail } from '@/common/apis.js'
	export default {
		data() {
			return {
				info: {}
			};
		},
		components:{
			commonHeader,
			tabbar
		},
		onLoad(option) {
			let {id} = option
			console.log(option.id)
			this.getMessageInfo(id)
		},
		methods : {
			getMessageInfo(id) {
				getMessageDetail({MESSAGE_ID:id}).then(res=> {
					this.info = res.returnMsg
				})
			}
		}
	}
</script>

<style lang="less">
	.notice{
		background: #F7F7F7;
		height: 90%;
		padding-top: 130rpx;
		/* #ifdef APP-PLUS */
		padding-top: 170rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		padding-top: 170rpx;
		/* #endif */
		font-size: 30rpx;
		color: #333;
		.notice-content{
			width: 85%;
			background: #fff;
			border-radius: 20rpx;
			margin: auto;
			height: 100%;
			padding: 20rpx;
			image{
				width: 100%;
				height: 269rpx;
			}
			.text{
				margin-top: 30rpx;
				.text-item{
					line-height: 1.5em;
				}
			}
		}
	}
</style>
