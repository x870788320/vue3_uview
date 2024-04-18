"use strict";
const common_vendor = require("../../common/vendor.js");
const store_know = require("../../store/know.js");
const utils_index = require("../../utils/index.js");
require("../../interface/index.js");
require("../../interface/request.js");
require("../../interface/constant.js");
require("../../store/user.js");
require("../../utils/storage/user_storage.js");
if (!Array) {
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  (_easycom_u_tabs2 + _easycom_u_input2)();
}
const _easycom_u_tabs = () => "../../uni_modules/uview-plus/components/u-tabs/u-tabs.js";
const _easycom_u_input = () => "../../uni_modules/uview-plus/components/u-input/u-input.js";
if (!Math) {
  (_easycom_u_tabs + _easycom_u_input)();
}
const _sfc_main = {
  __name: "knowSign",
  setup(__props) {
    const knowStore = store_know.useKnowStore();
    const state = common_vendor.reactive({
      signType: 1,
      SignSearch: ""
    });
    const signStatusNav = [
      { id: 1, name: "安全生产责任制" },
      { id: 2, name: "目标责任书-发起人" },
      { id: 3, name: "目标责任书-签订人" }
    ];
    const changeSignStatus = async (obj) => {
      console.log(obj);
      const params = {
        page: 1,
        rows: 60,
        name: state.SignSearch || "",
        post: ""
      };
      state.signType = obj.id;
      if (obj.id == 1) {
        await knowStore.getSafeRespsData(params);
        console.log(knowStore.resps);
      }
      if (obj.id == 2) {
        await knowStore.getRespCteatData(params);
        console.log(knowStore.respsCreat);
      }
      if (obj.id == 3) {
        await knowStore.getRespSignData(params);
        console.log(knowStore.respsSign);
      }
    };
    changeSignStatus(signStatusNav[0]);
    const knowSignChange = (obj) => {
      console.log(obj);
    };
    const openResps = (obj) => {
      console.log(obj);
      utils_index.openDocment(obj.letter.file);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(changeSignStatus),
        b: common_vendor.p({
          list: signStatusNav,
          lineWidth: "40",
          lineHeight: "4",
          activeStyle: {
            color: "#303133",
            fontWeight: "bold",
            transform: "scale(1.05)"
          },
          inactiveStyle: {
            color: "#606266",
            transform: "scale(1)"
          },
          itemStyle: "padding-left: 30rpx; padding-right: 30rpx; height: 96rpx;"
        }),
        c: common_vendor.o(knowSignChange),
        d: common_vendor.o(($event) => state.SignSearch = $event),
        e: common_vendor.p({
          type: "text",
          border: "true",
          placeholder: "请输入关键词搜索",
          ["custom-style"]: "background: #F2F3F8",
          modelValue: state.SignSearch
        }),
        f: common_vendor.f(common_vendor.unref(knowStore).resps, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name)
          };
        }),
        g: state.signType == 1,
        h: common_vendor.f(common_vendor.unref(knowStore).respsCreat, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name)
          };
        }),
        i: state.signType == 2,
        j: common_vendor.f(common_vendor.unref(knowStore).respsSign, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.letter.name),
            b: common_vendor.t(item.signed == "是" ? "签订人已签字" : "签订人未签字"),
            c: common_vendor.t(item.letter.aim || "见附件"),
            d: common_vendor.o(($event) => openResps(item))
          };
        }),
        k: state.signType == 3
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/knowSign/knowSign.vue"]]);
my.createPage(MiniProgramPage);
