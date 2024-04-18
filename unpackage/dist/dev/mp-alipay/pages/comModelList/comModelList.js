"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
require("../../interface/index.js");
require("../../interface/request.js");
require("../../interface/constant.js");
require("../../store/user.js");
require("../../utils/storage/user_storage.js");
require("../../utils/index.js");
const _sfc_main = {
  __name: "comModelList",
  props: {
    config: ""
  },
  setup(__props) {
    const props = __props;
    const modelListObj = props.config ? JSON.parse(props.config) : {};
    const childList = modelListObj.childList || [];
    console.log(modelListObj);
    console.log(3333);
    store_index.useIndexStore();
    common_vendor.reactive({
      // taskType: 1,
    });
    const handleAccident = (obj) => {
      console.log(obj);
      common_vendor.index.$u.route({
        url: obj.page
      });
    };
    common_vendor.onShow(() => {
      common_vendor.index.setNavigationBarTitle({
        title: modelListObj.title || ""
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(childList), (item, k0, i0) => {
          return {
            a: `/static/icon/${item.icon}.png`,
            b: common_vendor.t(item.title),
            c: common_vendor.o(($event) => handleAccident(item))
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/comModelList/comModelList.vue"]]);
my.createPage(MiniProgramPage);
