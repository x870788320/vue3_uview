"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
const interface_index = require("../../interface/index.js");
require("../../interface/request.js");
require("../../interface/constant.js");
require("../../store/user.js");
require("../../utils/storage/user_storage.js");
require("../../utils/index.js");
const _sfc_main = {
  __name: "comExamLook",
  props: {
    config: ""
  },
  setup(__props) {
    const props = __props;
    const codeList = ["A", "B", "C", "D", "E", "F", "G"];
    const configObj = JSON.parse(props.config) || {};
    const paper = configObj.paper || {};
    store_index.useIndexStore();
    const state = common_vendor.reactive({
      paperInfo: []
    });
    const getPlanInfo = async () => {
      console.log(configObj);
      const paperInfoInter = await interface_index.requestPlanPaper2Info(configObj.paperId).then((r) => r).catch((e) => {
      });
      console.log(paperInfoInter);
      if (!paperInfoInter.data || !paperInfoInter.data.t) {
        return;
      }
      state.paperInfo = paperInfoInter.data.t || [];
      console.log(state.paperInfo);
      console.log(22222);
    };
    common_vendor.onShow(() => {
      getPlanInfo();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(paper).tpName),
        b: common_vendor.t(common_vendor.unref(paper).score || common_vendor.unref(paper).extraScore),
        c: common_vendor.f(state.paperInfo, (item, i, i0) => {
          return {
            a: common_vendor.t(i + 1),
            b: common_vendor.t(item.title),
            c: common_vendor.f(item.options.split("|"), (option, index, i1) => {
              return {
                a: common_vendor.t(codeList[index]),
                b: common_vendor.t(option),
                c: item.answerOld.includes(codeList[index]) ? 1 : ""
              };
            })
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/comExamLook/comExamLook.vue"]]);
my.createPage(MiniProgramPage);
