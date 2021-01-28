// 查看详情地址导航到店铺
export const KEY = '363f73cc6d1cd03f815332fc5ed430e9';

// 地址转换为经纬度
export const CONVERSION_KEY = '60ca6302ddbfc1545c05fed7e8fff834';

// 首页Key
export const INDEX_KEY = 'f0d8604522a34fea7af419d353f98e8f';



export const COMMON_URL = 'https://yflh.hkzhtech.com/qufl';
// export const COMMON_URL = 'http://192.168.0.103:8081';

// 分享文件配置
export const SHARE_CONFIG = {
	href: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI0ODY3NzQ3MQ==&scene=124#wechat_redirect",
	title: "趣分利",
	summary: "我正在使用趣分利，赶紧跟我一起来体验！",
	imageUrl: require('@/static/images/logo.png'),
	miniProgram: {
		id: 'wx9a062afb3e6ff487',
		path: '/pages/index/index',
		webUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI0ODY3NzQ3MQ==&scene=124#wechat_redirect",//'http://uniapp.dcloud.io'
	},
	link: 'http://www.qfl168.cn/static/#/pages/news/news',  // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致  h5分享 
}