

<script>
	import useStore from '@/store/user.js'
	// import { requestLogin } from '@/interface/index.js'
	import {GET_STORAGE} from '@/utils/storage/user_storage.js'
	
	export default {
		onLaunch: function() {
			//注册逻辑
			// const getRegister = () => {
			//   uni.getUserProfile({
			// 	desc: '用于完善会员信息',
			// 	lang: 'zh_CN',
			// 	success(res) {
			// 	  useStore.updateUserInfo(res.userInfo)
			// 	  SET_INFO(res.userInfo)
			// 	  let userInfo = res.userInfo
			// 	  uni.login({
			// 		provider: 'weixin',
			// 		success(res) {
			// 		  let regisCode = res.code
			// 		  //整理参数
			// 		  let params = {
			// 			code: regisCode,
			// 			nickname: userInfo.nickName,
			// 			avatarUrl: userInfo.avatarUrl,
			// 			gender: userInfo.gender
			// 		  }
			// 		  //发起注册请求
			// 		  requestRegister(params)
			// 			.then((res) => {
			// 			  if (res.data.code == 0) {
			// 				//存储token
			// 				useStore.updateToken(res.data.data.token)
			// 				getLogin()
			// 			  } else {
			// 				// uni.$showMsg(res.data.message)
			// 			  }
			// 			})
			// 			.catch((err) => {
			// 			  console.error(err)
			// 			  uni.$showMsg('服务器出错，请稍后再试')
			// 			})
			// 		}
			// 	  })
			// 	}
			//   })
			// }
		},
		
		onShow: async function() {
			console.log('App Show')
			
			const store = useStore()
			// if(!GET_STORAGE('TOKEN') || !GET_STORAGE('USER')) {
				// dd.getAuthCode({
				//   // corpId 小程序可为空,H5应用必填  亨通
				//   corpId: 'dinge0c49d88d84f8ca035c2f4657eb6378f',
				//   success: async (res) => {
				// 	  console.log(res)
				// 	// const requestLogin = (data) => uni.$u.http.post('http://221.214.164.186:18888/open/dingtalk/v1/login', data);
				// 	// const requestLogin = (data) => uni.$u.http.post('http://58.58.47.142:18880/open/dingtalk/v1/login', data);
				// 	const requestLogin = (data) => uni.$u.http.post('http://221.214.164.186:18888/open/dingtalk/v1/login', data);
				// 	const userInfo = await requestLogin({code: res.authCode}).then(r => r).catch(e => e)
				// 	if(!userInfo || userInfo.statusCode != 200 || !userInfo.data.t) {
				// 		console.log('未获取用户信息,请联系管理员!')
				// 		uni.showToast({
				// 			title: userInfo.data.message,
				// 			icon:'fail',
				// 			duration:1000 * 3
				// 		});
				// 	}
				// 	console.log(userInfo)
				// 	// console.log(6666)
				// 	const info = userInfo.data.t || {}
				// 	// console.log('userinfo': info)
				// 	store.updateToken(info.token)
				// 	store.updateUserInfo(info.user)
				//   }
				//   //fail 和 complete 可省略
				// });
				
				// 开发测试号
				 let data = {
				 	// "uname": "371325198708147329",
				 	"uname": "32031119810806461X",  // 碧万顷
				 	// "uname": "37142719940307001X",  // 张斌
					  

				 	// "uname": "370681199904162236",
				 	"upass": "ht123456"
				 }
				 
				 
				const requestLogin = (data) => uni.$u.http.post('/api/sys/user/login', data);
				const userInfo = await requestLogin(data).then(res => res).catch(e => e)
				if(!userInfo || userInfo.statusCode != 200 || !userInfo.data.t) {
					console.log('未获取用户信息,请联系管理员!')
					uni.showToast({
						title: userInfo.data.message,
						icon:'fail',
						duration:1500
					});

				}
				const info = userInfo.data.t || {}
				
				store.updateToken(info.token)
				store.updateUserInfo(info.user)
			// }
			
			//  let data = {
			//  	"uname": "371325198708147329",
			//  	"upass": "ht123456"
			//  }
			 
			 
			// const requestLogin = (data) => uni.$u.http.post('/api/sys/user/login', data);
			// const userInfo = await requestLogin(data).then(res => res).catch(e => e)
			// if(!userInfo || userInfo.statusCode != 200 || !userInfo.data.t) {
			// 	console.log('未获取用户信息,请联系管理员!')
			// }
			// const info = userInfo.data.t || {}
			// // console.log(info)
			
			// store.updateToken(info.token)
			// store.updateUserInfo(info.user)
			
			

		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
    /* 需要给style标签加入lang="scss"属性 */
    @import "@/uni_modules/uview-plus/index.scss";
</style>
