"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
require("../../interface/index.js");
require("../../interface/request.js");
require("../../interface/constant.js");
require("../../store/user.js");
require("../../utils/storage/user_storage.js");
require("../../utils/index.js");
if (!Array) {
  const _easycom_treeMenu2 = common_vendor.resolveComponent("treeMenu");
  _easycom_treeMenu2();
}
const _easycom_treeMenu = () => "../../components/treeMenu/treeMenu.js";
if (!Math) {
  _easycom_treeMenu();
}
const _sfc_main = {
  __name: "comBranchList",
  props: {
    callData: ""
  },
  setup(__props) {
    const props = __props;
    const store = store_index.useIndexStore();
    const state = common_vendor.reactive({
      // taskType: 1,
    });
    console.log(111, props.callData);
    const getDeptList = async (id) => {
      await store.setAllDept();
      state.nodes = store.allDept;
    };
    getDeptList();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          nodes: state.nodes,
          callData: __props.callData
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/comBranchList/comBranchList.vue"]]);
my.createPage(MiniProgramPage);
