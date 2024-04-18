"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "cell2",
  props: {
    cellConfig: {}
  },
  emits: ["handleEvent"],
  setup(__props, { emit }) {
    const props = __props;
    const cellRNamesArr = props.cellConfig && props.cellConfig.cellRNames ? JSON.parse(props.cellConfig.cellRNames) : [];
    common_vendor.reactive({
      imgPopShow: false
      // cellRNames:[],
      // cellLImg: '/static/icon/top-bg.png',
    });
    const handleEvent = () => {
      console.log(2222222);
      emit("handleEvent");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(props.cellConfig.cellLT || ""),
        b: common_vendor.t(props.cellConfig.cellLB || ""),
        c: common_vendor.t(props.cellConfig.clapRT || ""),
        d: common_vendor.f(common_vendor.unref(cellRNamesArr), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.val)
          };
        }),
        e: common_vendor.t(props.cellConfig.status || ""),
        f: common_vendor.o(($event) => handleEvent())
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/projects/work/applet/vue3_uview_plus/components/cell2/cell2.vue"]]);
my.createComponent(Component);
