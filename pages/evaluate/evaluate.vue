<template>
	<view class="evaluate">
		<!-- header -->
		<commonHeader headerTitl="我要评价" xingHide=true lingHide=true fenxiangHide=true></commonHeader>
		<!-- 内容开始 -->
		<view class="evaluate-content">
			<!-- 评价 -->
			<view class="evaluate-content-dianping">
				<view class="item" @tap="selectActive(1)">
					<view>
						差
					</view>
					<text class="iconfont icon-chaping1" :class="active===1?'active':''"></text>
				</view>
				<view class="item" @tap="selectActive(2)">
					<view>
						一般
					</view>
					<text class="iconfont icon-pj_yiban" :class="active===2?'active':''"></text>
				</view>
				<view class="item" @tap="selectActive(3)">
					<view>
						还不错
					</view>
					<text class="iconfont icon-biaoqing-xue" :class="active===3?'active':''"></text>
				</view>
				<view class="item" @tap="selectActive(4)">
					<view>
						很满意
					</view>
					<text class="iconfont icon-xiaolian" :class="active===4?'active':''"></text>
				</view>
				<view class="item" @tap="selectActive(5)">
					<view>
						强烈推荐
					</view>
					<text class="iconfont icon-daxiao" :class="active===5?'active':''"></text>
				</view>
			</view>
			<!-- 评价文字 -->
			<view class="evaluate-content-text">
				<textarea value="" @input="changeInput" v-model="content" placeholder-style="fontSize:24rpx" placeholder="质量如何，服务是否周到，交通是否便利？（写够15字，才是好同志~）" />
				<view :class="tipsHide?'tipsHide':''">
					加油，还差{{inputNum}}个字即可发布！
				</view>
			</view>
			<!-- 上传照片 -->
			<view class="evaluate-content-phone">
				<view @tap="addImg">
                    <view class="item" :class="imgHide?'':'imgHide'">
                        <text class="iconfont icon-tubiaolunkuo-"></text>
                        <view>添加图片</view>
                    </view>
                    <view class="right-img" :class="imgHide?'imgHide':''">
                        <image :src="imgUrl" mode=""></image>
                    </view>
    <!-- 				<view class="item">
                        <text class="iconfont icon-bofang"></text>
                        <view>上传图片</view>
                    </view> -->
                </view>
			</view>
		</view>
		<!-- 内容结束 -->
        <!-- 评价 -->
        <view class="submit-btn" @tap="submit">
        	评价
        </view>
		<!-- tabbar -->
		<tabbar></tabbar>
	</view>
</template>

<script>
	// header
	import commonHeader from "@/components/common-header/common-header";
	// tabbar
	import tabbar from "@/components/common-tabbar/common-tabbar";
    import {addEvaluate} from "@/common/apis.js"
    import { pathToBase64, base64ToPath } from 'image-tools'
	export default {
		data() {
			return {
				active:0,
				inputNum:15,
				tipsHide:false,
                ORDERSUMMARY_ID:'',
                goodsId:'',
                USERINFO_ID:'',
                content:'',
                imgHide: true, // 隐藏/显示图片
                imgUrl: '', // 图片地址
			};
		},
		methods:{
			selectActive(index){
				this.active = index;
			},
			// 文字输入监听
			changeInput(e){
				this.inputNum = 15-e.detail.value.length;
				if(this.inputNum<=0){
					this.tipsHide = true;
				}else{
					this.tipsHide = false;
				}
			},
			// 添加图片
			addImg(){
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album','camera'], //从相册选择
				    success: (res)=> {
                        pathToBase64(res.tempFilePaths[0])
                          .then(base64 => {
                            this.imgUrl = base64
                            this.imgHide = false
                          })
                          .catch(error => {
                            console.error(error)
                          })
				    }
				});
			},
            // 发表评论
            submit(){
                if(this.active<0 || this.content == ''){
                    uni.showToast({
                        title:'请完善信息!',
                        icon:'none'
                    })
                    return false
                }
                if(this.content.length<15){
                    uni.showToast({
                        title:'评价内容不能小于15字!',
                        icon:'none'
                    })
                    return false
                }
                var obj = {
                    "USERINFO_ID": this.USERINFO_ID,
                    "GOODS_ID": this.goodsId,
                    "ORDERSUMMARY_ID": this.ORDERSUMMARY_ID,
                    "SCORE": this.active,
                    "CONTENT": this.content,
                    "img": this.imgUrl
                }
                addEvaluate(obj).then(res => {
                    if(res.returnMsg.status == '00'){
                        uni.showToast({
                            title:"评价成功!",
                            duration:2000,
                            mask:true
                        })
                        setTimeout(()=>{
                            uni.navigateTo({
                                url:"../myEvaluate/myEvaluate"
                            })
                        },2000)
                    }else{
                        uni.showToast({
                            title:"您已评价此订单!",
                            duration:2000,
                            icon:"none",
                            mask:true
                        })
                    }
                })
            }
		},
		components:{
			commonHeader,
			tabbar
		},
        onLoad(e){
            this.ORDERSUMMARY_ID = e.ORDERSUMMARY_ID
            this.goodsId = e.goodsId
            uni.getStorage({
                key:"USERINFO_ID",
                success:(res)=>{
                    this.USERINFO_ID = res.data
                }
            })
        }
	}
</script>

<style lang="less">
	.evaluate{
		background: #f6f7f8;
		height: 100%;
		padding-top: 120rpx;
		color: #999;
		/* #ifdef APP-PLUS */
		padding-top: 160rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		padding-top: 160rpx;
		/* #endif */
		.evaluate-content{
			.evaluate-content-dianping{
				background: #fff;
				width: 95%;
				margin: auto;
				border-radius: 20rpx;
				display: flex;
				justify-content: space-around;
				color: #333;
				text-align: center;
				.item{
					padding: 30rpx 0;
					font-size: 24rpx;
					view{
						margin-bottom: 30rpx;
					}
					text{font-size: 72rpx;color: #999;}
					.active{
						color: #FF7900;
					}
				}
			}
			.evaluate-content-text{
				position: relative;
				width: 95%;
				height: 283rpx;
				margin: auto;
				background: #fff;
				margin-top: 30rpx;
				border-radius: 20rpx;
				textarea{
					height: 243rpx;
					width: 90%;
					padding: 20rpx;
				}
				view{
					font-size: 24rpx;
					text-align: right;
					margin-right: 30rpx;
					position: absolute;
					right: 30rpx;
					bottom: 20rpx;
				}
				.tipsHide{
					display: none;
				}
			}
			.evaluate-content-phone{
				height: 283rpx;
				background: #fff;
				width: 95%;
				margin: 30rpx auto 0;
				border-radius: 20rpx;
				display: flex;
				.item{
					width: 150rpx;
					height: 150rpx;
					border-radius: 20rpx;
					background: #f8f6f9;
					margin: 30rpx 0 0 30rpx;
					font-size: 24rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					text{
						font-size: 60rpx;
					}
					view{
						margin-top: 10rpx;
					}
				}
                .right-img {
                	width: 150rpx;
                	height: 150rpx;
                	border-radius: 20rpx;
                	background: #f8f6f9;
                	margin: 30rpx 0 0 30rpx;
                	font-size: 24rpx;
                	display: flex;
                	align-items: center;
                	justify-content: center;
                	flex-direction: column;
                
                	image {
                		width: 100%;
                		height: 100%;
                	}
                }
                
                .imgHide {
                	display: none !important;
                }
			}
		}
        .submit-btn {
        	width: 95%;
        	background: linear-gradient(243deg, rgba(255, 153, 96, 1) 0%, rgba(255, 90, 44, 1) 100%);
        	height: 88rpx;
        	border-radius: 10rpx;
        	color: #fff;
        	font-size: 40rpx;
        	margin: 100rpx auto 90rpx;
        	text-align: center;
        	line-height: 88rpx;
        	box-shadow: 0 10rpx 20rpx #FF9960;
        }
    }
</style>
