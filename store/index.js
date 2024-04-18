import { defineStore } from 'pinia'
import { requestPersonInfo, requestDeptList, requestUserList, requestUserListById } from '@/interface/index.js'
//创建用户小仓库
const useIndexStore = defineStore('Index', {
	state: () => {
		return {
			activeTab: 1, // 底部tabbar的id,默认选中的索引
			// userArchives:{}, // 个人档案
			allDept: [],
			allStaff: [],
			staffById:[],
		}
	},
	actions: {
	    //设置active的值
	    setActive(active) {
	      this.activeTab = active
	    },
		// 获取所有部门
		async setAllDept(){
			if(this.allDept.length) return
			const interDeptList = await requestDeptList().then(r => r).catch(e => {})
			if(!interDeptList.data || !interDeptList.data.t) {
				return
			}
			this.allDept = interDeptList.data.t || []
		},
		// 获取所有员工，没有部门时获取部门
		async setAllStaff(pyload){
			if(this.allStaff.length) return
			const interStaffList = await requestUserList().then(r => r).catch(e => {})
			if(!interStaffList.data || !interStaffList.data.t) {
				return
			}
			this.allStaff = interStaffList.data.t || []
			// if(this.allStaff.length) return
			// const interFn = pyload? requestUserListById: requestUserList
			// const interStaffList = await interFn(pyload).then(r => r).catch(e => {})
			// if(!interStaffList.data || !interStaffList.data.t) {
			// 	return
			// }
			// if(pyload) {
			// 	this.staffById = interStaffList.data.t || []
			// } else {
			// 	this.allStaff = interStaffList.data.t || []
			// }
		},
		// 获取部门的id
		async getDeptId(dept){
			if(!this.allDept.length){
				await this.setAllDept()
			}
			console.log(dept)
			console.log(this.allDept)
		},
		// 获取用户档案
		// async getUserArchives(){
		// 	const archives = await requestPersonInfo().then(r => r).catch( e => e )
		// 	if(!archives.data || !archives.data.t) {
		// 		this.userArchives = archives.data.t.user || {}
		// 		this.userArchives.suwList = archives.data.t.suwList || []	
		// 	}
		// },
	  }

})

//暴露用户小仓库
export default useIndexStore