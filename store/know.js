import { defineStore } from 'pinia'
import { requestPersonInfo, requestResps, requestRespCteat, requestRespSign } from '@/interface/index.js'
//创建用户小仓库
const useKnowStore = defineStore('Know', {
	state: () => {
		return {
			userArchives:{}, // 个人档案
			resps: [],  // 安全责任制
			respsCreat: [],  // 安全责任制 发起人
			respsSign: [],  // 安全责任制 签订人
		}
	},
	actions: {
		// 获取用户档案
		async getUserArchives(){
			const archives = await requestPersonInfo().then(r => r).catch( e => e )
			// console.log(archives)
			
			if(archives.data || archives.data.t) {
				this.userArchives = archives.data.t.user || {}
				this.userArchives.suwList = archives.data.t.suwList || []	
			}
		},
		
		// 获取安全责任体系数据
		async getSafeRespsData(params){
			
			const resps = await requestResps(params).then(r => r).catch( e => e )
			console.log(resps)
			
			if(resps.data || resps.data.t) {
				this.resps = resps.data.t.content || []	
			}
		},
		// 获取安全责任体系发起人
		async getRespCteatData(params){
			const respCteat = await requestRespCteat(params).then(r => r).catch( e => e )
			console.log(respCteat)
			
			if(respCteat.data || respCteat.data.t) {
				this.respsCreat = respCteat.data.t.content || []
			}
		},
		// 获取安全责任体系签订人
		async getRespSignData(params){
			const respSign = await requestRespSign(params).then(r => r).catch( e => e )
			console.log(respSign)
			
			if(respSign.data || respSign.data.t) {
				this.respsSign = respSign.data.t.content || []
			}
		},
	  }

})

//暴露用户小仓库
export default useKnowStore