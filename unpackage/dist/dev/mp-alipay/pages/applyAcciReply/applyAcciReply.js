"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
const interface_index = require("../../interface/index.js");
const utils_index = require("../../utils/index.js");
require("../../interface/request.js");
require("../../interface/constant.js");
require("../../store/user.js");
require("../../utils/storage/user_storage.js");
if (!Array) {
  const _easycom_cell12 = common_vendor.resolveComponent("cell1");
  _easycom_cell12();
}
const _easycom_cell1 = () => "../../components/cell1/cell1.js";
if (!Math) {
  _easycom_cell1();
}
const _sfc_main = {
  __name: "applyAcciReply",
  props: {
    config: ""
  },
  setup(__props) {
    store_index.useIndexStore();
    const state = common_vendor.reactive({
      // acciUpSept: porpsObj.navId || 1,
      replyMain: []
    });
    const accidReplyName = [
      { id: 1, title: "事故描述", key: "remark" },
      { id: 2, title: "发生时间", key: "atTime" },
      { id: 3, title: "上报人", key: "createdUserName" },
      { id: 4, title: "上报时间", key: "createdDate" },
      { id: 5, title: "事故处理员", key: "handler" }
    ];
    const getAcciInfo = async () => {
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
      let interInfo = await interface_index.requestAcciReplyInfo(params).then((r) => r).catch((e) => {
      });
      if (!interInfo.data || !interInfo.data.t) {
        return;
      }
      let info = interInfo.data.t.content || [];
      state.replyMain = info.map((clap) => {
        let obj = {};
        let cellRNames = accidReplyName.map((item) => {
          item.val = clap[item.key];
          return item;
        });
        obj.cellRNames = JSON.stringify(cellRNames);
        obj.cellLImg = clap.file1;
        obj.step = clap.step || "";
        obj.acciId = clap.id || "";
        return obj;
      });
      console.log(info);
    };
    const handleReply = (obj) => {
      console.log(obj);
    };
    common_vendor.onShow(() => {
      getAcciInfo();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(state.replyMain, (item, k0, i0) => {
          return {
            a: common_vendor.o(($event) => handleReply(item)),
            b: "99175f56-0-" + i0,
            c: common_vendor.p({
              cellRNames: item.cellRNames,
              cellLImg: item.cellLImg,
              step: item.step
            })
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/applyAcciReply/applyAcciReply.vue"]]);
my.createPage(MiniProgramPage);
