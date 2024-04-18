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
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_picker2 = common_vendor.resolveComponent("u-picker");
  (_easycom_u_icon2 + _easycom_u_picker2)();
}
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_picker = () => "../../uni_modules/uview-plus/components/u-picker/u-picker.js";
if (!Math) {
  (_easycom_u_icon + _easycom_u_picker)();
}
const _sfc_main = {
  __name: "applyRisk",
  setup(__props) {
    store_index.useIndexStore();
    const state = common_vendor.reactive({
      riskLevelShow: false,
      riskTypeShow: false,
      riskPickerShow: false,
      riskLevelVal: "全部",
      riskTypeVal: "全部",
      riskBranchVal: "职能部门"
    });
    const riskLevelS = [
      ["全部", "一级", "二级", "三级", "四级", "五级"]
    ];
    const riskTypeS = [
      ["全部", "作业活动类", "设备设施类"]
    ];
    let currentList = riskLevelS;
    let curentItem = "riskLevelVal";
    const handlePicker = (str) => {
      console.log(str);
      if (str == "level") {
        currentList = riskLevelS;
        curentItem = "riskLevelVal";
      }
      if (str == "type") {
        currentList = riskTypeS;
        curentItem = "riskTypeVal";
      }
      state.riskPickerShow = true;
    };
    const riskPickerConfirm = (e, obj) => {
      console.log(e);
      console.log(obj);
      state.riskPickerShow = false;
      state[curentItem] = e.value[0];
    };
    const handleBranchList = () => {
      common_vendor.index.$u.route({
        url: "pages/comBranchList/comBranchList",
        animationDuration: 300,
        animationType: "slide-in-bottom"
      });
    };
    common_vendor.onShow(() => {
      common_vendor.index.$once("selectBranch", function(data) {
        console.log("监听到事件来自返回的参数：" + data);
        state.riskBranchVal = data.name;
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(state.riskLevelVal),
        b: common_vendor.p({
          name: "arrow-down",
          color: "#999",
          size: "16"
        }),
        c: common_vendor.o(($event) => handlePicker("level")),
        d: common_vendor.t(state.riskBranchVal || ""),
        e: common_vendor.p({
          name: "arrow-down",
          color: "#999",
          size: "16"
        }),
        f: common_vendor.o(($event) => handleBranchList()),
        g: common_vendor.t(state.riskTypeVal),
        h: common_vendor.p({
          name: "arrow-down",
          color: "#999",
          size: "16"
        }),
        i: common_vendor.o(($event) => handlePicker("type")),
        j: common_vendor.o(($event) => state[`riskPickerShow`] = false),
        k: common_vendor.o(($event) => state[`riskPickerShow`] = false),
        l: common_vendor.o(riskPickerConfirm),
        m: common_vendor.p({
          show: state.riskPickerShow,
          columns: common_vendor.unref(currentList),
          closeOnClickOverlay: true
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/applyRisk/applyRisk.vue"]]);
my.createPage(MiniProgramPage);
