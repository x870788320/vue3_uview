"use strict";
const common_vendor = require("../../common/vendor.js");
const interface_constant = require("../../interface/constant.js");
if (!Array) {
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  _easycom_u_popup2();
}
const _easycom_u_popup = () => "../../uni_modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  _easycom_u_popup();
}
const _sfc_main = {
  __name: "cell1",
  props: {
    cellRNames: "",
    cellLImg: ""
  },
  emits: ["handleEvent"],
  setup(__props, { emit }) {
    const props = __props;
    const cellRNamesArr = JSON.parse(props.cellRNames);
    const state = common_vendor.reactive({
      imgPopShow: false
      // cellRNames:[],
      // cellLImg: '/static/icon/top-bg.png',
    });
    const handleEvent = () => emit("handleEvent");
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.cellLImg
      }, __props.cellLImg ? {
        b: `${common_vendor.unref(interface_constant.BASE_FILE_URL)}${__props.cellLImg}`,
        c: common_vendor.o(($event) => state.imgPopShow = true)
      } : {}, {
        d: common_vendor.f(common_vendor.unref(cellRNamesArr), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.val)
          };
        }),
        e: common_vendor.t(props.step),
        f: props.step,
        g: common_vendor.o(($event) => handleEvent()),
        h: `${common_vendor.unref(interface_constant.BASE_FILE_URL)}${__props.cellLImg}`,
        i: common_vendor.o(($event) => state.imgPopShow = false),
        j: common_vendor.o(($event) => state.imgPopShow = false),
        k: common_vendor.p({
          show: state.imgPopShow,
          mode: "center",
          customStyle: {
            width: "100%",
            height: "133vw"
          }
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/projects/work/applet/vue3_uview_plus/components/cell1/cell1.vue"]]);
my.createComponent(Component);
