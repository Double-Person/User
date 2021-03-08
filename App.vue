<script>
	import {autograph} from '@/common/apis.js';
	// #ifdef H5
	var jweixin = require('jweixin-module');
	// #endif
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData:{
			city:[],
			isPwd:false,
			pwd:'',
			cardStata:true,
			openid:'',
			USERINFO_ID:'',
			longitude:'',
			latitude:'',
			nickName:'',
			address:{},
			addressState:false
		},
		
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./common/fonts/iconfont.css");
	uni-page-head{
		display: none;
	}
	page{
		height: 100%;
		font-family: PingFangSC-Semibold, PingFang SC;
	}
</style>
