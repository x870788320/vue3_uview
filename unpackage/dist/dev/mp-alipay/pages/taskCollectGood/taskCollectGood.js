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
  __name: "taskCollectGood",
  setup(__props) {
    store_index.useIndexStore();
    const state = common_vendor.reactive({
      goodInfo: []
    });
    const goodItemName = [
      { id: 1, title: "物品名称", key: "name" },
      { id: 2, title: "数量", key: "qty" },
      { id: 3, title: "发放时间", key: "atTime" },
      { id: 4, title: "购入时间", key: "buyTime" },
      { id: 5, title: "发放人", key: "createdUserName" },
      { id: 6, title: "有效期起", key: "prodTime" },
      { id: 7, title: "有效期止", key: "expTime" }
    ];
    const goodForm = [
      { id: 1, title: "物品名称", key: "name", type: "text", ref: "collect_name" },
      { id: 2, title: "拍照", key: "pic", type: "photo", ref: "collect_pic" },
      { id: 3, title: "签字", key: "sign", type: "sign", ref: "collect_sign" }
    ];
    const getPlanInfo = async () => {
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
      const interGoodInfo = await interface_index.requestTaskGoodInfo(params).then((r) => r).catch((e) => {
      });
      if (!interGoodInfo.data || !interGoodInfo.data.t) {
        return;
      }
      state.goodInfo = interGoodInfo.data.t.content || [];
    };
    getPlanInfo();
    const goTaskGood = (obj) => {
      console.log("goTaskGood", obj);
      const formConfig = {};
      formConfig.domList = goodForm.map((item) => {
        item.val = obj.grant[item.key];
        return item;
      });
      formConfig.config = {
        submitFn: "requestTaskGoodSubmit",
        params: { id: obj.id },
        from: "collectGood"
      };
      console.log(formConfig);
      common_vendor.index.$u.route({
        url: "/pages/comForm/comForm",
        params: {
          data: JSON.stringify(formConfig),
          title: "领用"
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(state.goodInfo, (item, k0, i0) => {
          return {
            a: `${common_vendor.unref(interface_constant.BASE_FILE_URL)}${item.grant.file2}`,
            b: common_vendor.f(goodItemName, (lineItem, k1, i1) => {
              return {
                a: common_vendor.t(lineItem.title),
                b: common_vendor.t(item && item.grant[lineItem.key] || "")
              };
            }),
            c: common_vendor.o(($event) => goTaskGood(item))
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/taskCollectGood/taskCollectGood.vue"]]);
my.createPage(MiniProgramPage);
