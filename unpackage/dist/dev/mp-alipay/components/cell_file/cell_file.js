"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_index = require("../../utils/index.js");
require("../../interface/constant.js");
const _sfc_main = {
  __name: "cell_file",
  props: {
    cellConfig: {}
  },
  emits: ["handleEvent"],
  setup(__props, { emit }) {
    const props = __props;
    const cellRNamesArr = props.cellConfig && props.cellConfig.cellRNames ? JSON.parse(props.cellConfig.cellRNames) : [];
    const cellFileType = props.cellConfig && props.cellConfig.cellFile ? utils_index.getFileType(props.cellConfig.cellFile) : "word";
    common_vendor.reactive({
      imgPopShow: false
      // cellRNames:[],
      // cellLImg: '/static/icon/top-bg.png',
    });
    const handleEvent = () => {
      emit("handleEvent");
    };
    return (_ctx, _cache) => {
      return {
        a: `/static/office/${common_vendor.unref(cellFileType)}.png`,
        b: common_vendor.t(props.cellConfig.cellTitle || ""),
        c: common_vendor.f(common_vendor.unref(cellRNamesArr), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.val)
          };
        }),
        d: common_vendor.o(($event) => handleEvent())
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/projects/work/applet/vue3_uview_plus/components/cell_file/cell_file.vue"]]);
my.createComponent(Component);
