"use strict";
const common_vendor = require("../../common/vendor.js");
const store_user = require("../../store/user.js");
require("../../utils/storage/user_storage.js");
require("../../utils/index.js");
require("../../interface/constant.js");
if (!Array) {
  const _easycom_my_sign2 = common_vendor.resolveComponent("my_sign");
  _easycom_my_sign2();
}
const _easycom_my_sign = () => "../../components/my_sign/my_sign.js";
if (!Math) {
  _easycom_my_sign();
}
const _sfc_main = {
  __name: "setting",
  setup(__props) {
    const store = store_user.useUserStore();
    const state = common_vendor.reactive({
      settingType: 1,
      preFileSrc: "http://mowenxiaosheng.com.cn/open_office/?src="
    });
    const mySign = common_vendor.ref();
    const mainApplyList = [
      // {id: 1, title: '版本升级', icon: 'icon-setting-up'},
      // {id: 2, title: '密码管理', icon: 'icon-setting-pwd'},
      { id: 3, title: "修改人脸", icon: "icon-setting-face" },
      { id: 4, title: "二维码", icon: "icon-setting-scan" },
      { id: 5, title: "签名设置", icon: "icon-setting-sign" },
      { id: 6, title: "操作手册", icon: "icon-setting-pwd" }
    ];
    let pdfUrl = "http://221.214.164.186:18880/%E6%81%92%E9%80%9A%E7%89%A9%E6%B5%81%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E5%AE%89%E5%85%A8%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0%E7%94%A8%E6%88%B7%E6%93%8D%E4%BD%9C%E6%89%8B%E5%86%8C.pdf";
    const handleMainSet = async (obj) => {
      console.log(obj);
      state.settingType = obj.id;
      if (obj.id == 5) {
        console.log(mySign);
        console.log(mySign.value.signDown);
        await mySign.value.signDown().then((res) => res);
      }
      if (obj.id == 6)
        ;
    };
    store.updateUserInfo();
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(mainApplyList, (item, k0, i0) => {
          return {
            a: `/static/icon/${item.icon}.png`,
            b: common_vendor.t(item.title),
            c: common_vendor.o(($event) => handleMainSet(item))
          };
        }),
        b: state.settingType == 6
      }, state.settingType == 6 ? {
        c: common_vendor.unref(pdfUrl)
      } : {}, {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/setting/setting.vue"]]);
my.createPage(MiniProgramPage);
