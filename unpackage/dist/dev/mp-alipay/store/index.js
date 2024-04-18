"use strict";
const common_vendor = require("../common/vendor.js");
const interface_index = require("../interface/index.js");
const useIndexStore = common_vendor.defineStore("Index", {
  state: () => {
    return {
      activeTab: 1,
      // 底部tabbar的id,默认选中的索引
      // userArchives:{}, // 个人档案
      allDept: [],
      allStaff: [],
      staffById: []
    };
  },
  actions: {
    //设置active的值
    setActive(active) {
      this.activeTab = active;
    },
    // 获取所有部门
    async setAllDept() {
      if (this.allDept.length)
        return;
      const interDeptList = await interface_index.requestDeptList().then((r) => r).catch((e) => {
      });
      if (!interDeptList.data || !interDeptList.data.t) {
        return;
      }
      this.allDept = interDeptList.data.t || [];
    },
    // 获取所有员工，没有部门时获取部门
    async setAllStaff(pyload) {
      if (this.allStaff.length)
        return;
      const interStaffList = await interface_index.requestUserList().then((r) => r).catch((e) => {
      });
      if (!interStaffList.data || !interStaffList.data.t) {
        return;
      }
      this.allStaff = interStaffList.data.t || [];
    },
    // 获取部门的id
    async getDeptId(dept) {
      if (!this.allDept.length) {
        await this.setAllDept();
      }
      console.log(dept);
      console.log(this.allDept);
    }
    // 获取用户档案
    // async getUserArchives(){
    // 	const archives = await requestPersonInfo().then(r => r).catch( e => e )
    // 	if(!archives.data || !archives.data.t) {
    // 		this.userArchives = archives.data.t.user || {}
    // 		this.userArchives.suwList = archives.data.t.suwList || []	
    // 	}
    // },
  }
});
exports.useIndexStore = useIndexStore;
