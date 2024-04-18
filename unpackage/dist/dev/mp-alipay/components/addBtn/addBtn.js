"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "addBtn",
  emits: ["handleEvent"],
  setup(__props, { emit }) {
    const handleEvent = () => emit("handleEvent");
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleEvent)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/projects/work/applet/vue3_uview_plus/components/addBtn/addBtn.vue"]]);
my.createComponent(Component);
