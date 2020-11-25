/*
	request封装
	2020-03-09   by   张登
*/
import uniRequest from 'uni-request';

// 判断请求环境   http://192.168.0.111:8081/
if(process.env.NODE_ENV === 'development'){
	console.log('开发环境')
    // 开发环境
   // #ifdef H5   
   // /qfl
   uniRequest.defaults.baseURL = '/qfl'
 
   // #endif
   // #ifdef APP-PLUS
	uniRequest.defaults.baseURL = 'https://yflh.hkzhtech.com/qufl'
   // #endif
}else{
	console.log('生产环境')	
    // 生产环境
	// #ifdef H5
	// yflh.hkzhtech.com/qufl/
	uniRequest.defaults.baseURL = 'yflh.hkzhtech.com/qufl/'
	// #endif
	// #ifdef APP-PLUS
	// yflh.hkzhtech.com/qufl/
	uniRequest.defaults.baseURL = 'yflh.hkzhtech.com/qufl/'
	// #endif
}
// 跨域请求设置
 uniRequest.defaults.withCredentials = true;

// 请求拦截	
uniRequest.interceptors.request.use(
    request => {
		// 所有请求在请求发送之前获取本地token,带上token
		console.log('请求拦截', request)
		let token =	'';
		uni.getStorage({
			key:'token',
			success:(res)=>{
				token = res.data;
			}
		})
        uni.showLoading({
            title: '加载中...',
            mask:true
        })
		
		request.headers.Authorization = 'Bearer ' + token;
        // request.headers.USERINFO_ID = getApp().globalData.USERINFO_ID;
        //配置基本信息    
        return request;
    },
    err => {
        console.log('请求失败');
        return Promise.reject(err);
    });

// 响应拦截
uniRequest.interceptors.response.use(response=> {
    uni.hideLoading();
    // console.log('返回进入拦截成功')
    return Promise.resolve(response);
}, error=> {
    // console.log('返回进入拦截失败')
    uni.hideLoading();
    return Promise.reject(error);
});



// 导出两个方法
export default{
	get(url, params = {}) {
		return new Promise((resolve, reject) => {
			uniRequest.get(url, {
					params
				})
				.then(res => {
					resolve(res.data)
				})
				.catch(err => {
					reject(err)
				})
		})
	},
	post(url, params = {}) {
		return new Promise((resolve, reject) => {
			uniRequest.post(url, params)
				.then(res => {
					resolve(res.data)
				})
				.catch(err => {
					reject(err)
				})
		})
	}
}