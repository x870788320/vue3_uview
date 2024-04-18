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
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  _easycom_u_input2();
}
const _easycom_u_input = () => "../../uni_modules/uview-plus/components/u-input/u-input.js";
if (!Math) {
  _easycom_u_input();
}
const _sfc_main = {
  __name: "taskTrainPlan",
  setup(__props) {
    store_index.useIndexStore();
    const state = common_vendor.reactive({
      // taskType: 1,
      planSearch: "",
      planInfo: [],
      planShowInfo: []
    });
    const planItemConfig = [
      { name: "培训时间", key: "time" },
      { name: "计划类型", key: "planType" },
      { name: "培训方式", key: "fieldStr" },
      { name: "培训类型", key: "field1Str" },
      { name: "发起部门", key: "sysDeptName" },
      { name: "授课人", key: "field3" },
      { name: "培训进度", key: "status" }
    ];
    const getPlanInfo = async () => {
      let params = {
        page: 1,
        size: 100,
        // name:state.traninSearch
        name: ""
      };
      const interPlanInfo = await interface_index.requestTaskPlanInfo(params).then((r) => r).catch((e) => {
      });
      if (!interPlanInfo.data || !interPlanInfo.data.t) {
        return;
      }
      let content = interPlanInfo.data.t.content || [];
      state.planInfo = content.map((item) => {
        let startTArr = utils_index.formatDate(item.startTime);
        let startTStr = `${startTArr[0]}-${startTArr[1]} ${startTArr[3]}`;
        let endTArr = utils_index.formatDate(item.startTime);
        let endTStr = `${endTArr[0]}-${endTArr[1]} ${endTArr[3]}`;
        item.time = `${startTStr}~${endTStr}`;
        return item;
      });
      state.planShowInfo = state.planInfo;
    };
    getPlanInfo();
    const trainChange = (e) => {
      console.log("planSearch", state.planSearch);
      state.planShowInfo = state.planInfo.filter((item) => item.name.includes(state.planSearch));
    };
    const openPlanContent = async (obj) => {
      console.log(obj);
      if (!obj.id)
        return;
      obj.from = "taskPlan";
      obj.title = "培训文件";
      obj.interface = "requestPlanPaperInfo";
      common_vendor.index.$u.route({
        url: "/pages/comDocLearn/comDocLearn",
        params: {
          config: JSON.stringify(obj)
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(trainChange),
        b: common_vendor.o(($event) => state.planSearch = $event),
        c: common_vendor.p({
          type: "text",
          border: "true",
          placeholder: "请输入关键词搜索",
          ["custom-style"]: "background: #F2F3F8",
          modelValue: state.planSearch
        }),
        d: common_vendor.f(state.planShowInfo, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.f(planItemConfig, (lineItem, k1, i1) => {
              return {
                a: common_vendor.t(lineItem.name),
                b: common_vendor.t(item[lineItem.key])
              };
            }),
            c: common_vendor.o(($event) => openPlanContent(item))
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/taskTrainPlan/taskTrainPlan.vue"]]);
my.createPage(MiniProgramPage);
