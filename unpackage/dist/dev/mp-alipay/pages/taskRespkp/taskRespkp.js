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
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  _easycom_u_input2();
}
const _easycom_u_input = () => "../../uni_modules/uview-plus/components/u-input/u-input.js";
if (!Math) {
  _easycom_u_input();
}
const _sfc_main = {
  __name: "taskRespkp",
  setup(__props) {
    store_index.useIndexStore();
    const state = common_vendor.reactive({
      // taskType: 1,
      respkpSearch: ""
    });
    const respkpChange = (e) => {
      console.log(e);
      console.log(state.traninSearch);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(respkpChange),
        b: common_vendor.o(($event) => state.respkpSearch = $event),
        c: common_vendor.p({
          type: "text",
          border: "true",
          placeholder: "请输入关键字搜索",
          ["custom-style"]: "background: #F2F3F8",
          modelValue: state.respkpSearch
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/taskRespkp/taskRespkp.vue"]]);
my.createPage(MiniProgramPage);
