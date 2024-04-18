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
  __name: "apply",
  setup(__props) {
    store_index.useIndexStore();
    common_vendor.reactive({
      taskType: 1
    });
    const accidentChild = [
      { id: 1, title: "事故上报", icon: "accidentUp", page: "/pages/T_A_acciUp/T_A_acciUp" },
      { id: 2, title: "事故批复", icon: "accidentReply", page: "/pages/applyAcciReply/applyAcciReply" }
    ];
    const riskChild = [
      { id: 1, title: "隐患排查清单", icon: "accidentUp", page: "/pages/applyRisk/applyRisk" },
      { id: 2, title: "日常性隐患排查", icon: "accidentReply", page: "/pages/applyAcciReply/applyAcciReply" }
    ];
    const mainApplyList = [
      { id: 1, title: "随手拍", icon: "ill-ssp", page: "/pages/T_A_clapping/T_A_clapping" },
      { id: 2, title: "事故管理", icon: "ill-sggl", page: "/pages/comModelList/comModelList", childList: accidentChild },
      { id: 3, title: "特殊作业管理", icon: "ill-work", page: "/pages/T_A_work/T_A_work" },
      { id: 4, title: "风险管理", icon: "ill-risk", page: "/pages/comModelList/comModelList", childList: riskChild }
    ];
    const handleMainApply = (obj) => {
      console.log(obj);
      if (obj.id > 2)
        return;
      common_vendor.index.$u.route({
        url: obj.page,
        params: {
          config: JSON.stringify(obj)
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(mainApplyList, (item, k0, i0) => {
          return {
            a: `/static/icon/${item.icon}.png`,
            b: common_vendor.t(item.title),
            c: common_vendor.o(($event) => handleMainApply(item))
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/apply/apply.vue"]]);
my.createPage(MiniProgramPage);
