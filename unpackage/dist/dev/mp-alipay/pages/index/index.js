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
  __name: "index",
  setup(__props) {
    store_index.useIndexStore();
    common_vendor.reactive({
      // taskType: 1,
    });
    const mainApplyList = [
      { id: 1, title: "版本升级", icon: "icon-setting-up" },
      { id: 2, title: "密码管理", icon: "icon-setting-pwd" },
      { id: 3, title: "修改人脸", icon: "icon-setting-face" },
      { id: 4, title: "二维码", icon: "icon-setting-scan" },
      { id: 5, title: "签名设置", icon: "icon-setting-sign" }
    ];
    const handleMainSet = (obj) => {
      console.log(obj);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(mainApplyList, (item, k0, i0) => {
          return {
            a: `/static/icon/${item.icon}.png`,
            b: common_vendor.t(item.title),
            c: common_vendor.o(($event) => handleMainSet(item))
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/index/index.vue"]]);
my.createPage(MiniProgramPage);
