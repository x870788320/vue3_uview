"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
const interface_index = require("../../interface/index.js");
const utils_index = require("../../utils/index.js");
const interface_constant = require("../../interface/constant.js");
require("../../interface/request.js");
require("../../store/user.js");
require("../../utils/storage/user_storage.js");
const _sfc_main = {
  __name: "taskCulture",
  props: {
    config: ""
  },
  setup(__props) {
    const props = __props;
    props.config ? JSON.parse(props.config) : {};
    store_index.useIndexStore();
    const state = common_vendor.reactive({
      mainCultrues: [],
      fileShow: false,
      culFileUrl: ""
    });
    const getInterInfo = async (navInfo) => {
      console.log(navInfo);
      let beginTimeN = (/* @__PURE__ */ new Date()).getTime() - 7 * 24 * 60 * 60 * 1e3;
      let beginArr = utils_index.formatDate(beginTimeN);
      let endArr = utils_index.formatDate();
      let params = {
        page: 1,
        rows: 100,
        size: 100,
        endTime: `${endArr[0]}-${endArr[1]}`,
        beginTime: `${beginArr[0]}-${beginArr[1]}`
      };
      let interInfo = interInfo = await interface_index.requestSaftCulInfo(params).then((r) => r).catch((e) => {
      });
      if (!interInfo.data || !interInfo.data.t) {
        return;
      }
      state.mainCultrues = interInfo.data.t.content || [];
      console.log(state.mainCultrues);
    };
    const handleCulture = (obj) => {
      console.log(obj);
      console.log(`${interface_constant.BASE_LINE_PRE}${interface_constant.BASE_FILE_URL}${obj.file1}`);
      state.culFileUrl = `${interface_constant.BASE_LINE_PRE}${interface_constant.BASE_FILE_URL}${obj.file1}`;
      state.fileShow = true;
    };
    common_vendor.onShow(() => {
      getInterInfo();
      state.fileShow = false;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(state.mainCultrues, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.dept1 || ""),
            b: common_vendor.t(item.atTime || ""),
            c: common_vendor.t(item.read == "是" ? "已读" : "未读"),
            d: common_vendor.o(($event) => handleCulture(item))
          };
        }),
        b: state.fileShow
      }, state.fileShow ? {
        c: state.culFileUrl
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/taskCulture/taskCulture.vue"]]);
my.createPage(MiniProgramPage);
