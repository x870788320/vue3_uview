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
  const _easycom_addBtn2 = common_vendor.resolveComponent("addBtn");
  (_easycom_cell12 + _easycom_addBtn2)();
}
const _easycom_cell1 = () => "../../components/cell1/cell1.js";
const _easycom_addBtn = () => "../../components/addBtn/addBtn.js";
if (!Math) {
  (_easycom_cell1 + _easycom_addBtn)();
}
const _sfc_main = {
  __name: "T_A_clapping",
  props: {
    config: ""
  },
  setup(__props) {
    const props = __props;
    const porpsObj = props.config ? JSON.parse(props.config) : {};
    store_index.useIndexStore();
    const state = common_vendor.reactive({
      randomStatus: porpsObj.navId || 1,
      clappingInfo: [],
      clapConfirmInfo: []
    });
    common_vendor.ref();
    const random_status = [
      { id: 1, title: "随手拍" },
      { id: 2, title: "待审核" }
    ];
    const hide_item_name = [
      { id: 1, title: "隐患描述", key: "remark" },
      { id: 2, title: "隐患地点", key: "field1" },
      { id: 3, title: "隐患单位", key: "deptName" },
      { id: 4, title: "上传人员", key: "createdUserName" },
      { id: 5, title: "上传单位", key: "createdDeptName" },
      { id: 6, title: "审核人", key: "confirmUserName" }
    ];
    const getClappingInfo = async (id) => {
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
      let info = [];
      if (id == 1) {
        const interClappingInfo = await interface_index.requestClappingInfo(params).then((r) => r).catch((e) => {
        });
        if (!interClappingInfo.data || !interClappingInfo.data.t) {
          return;
        }
        info = interClappingInfo.data.t.content || [];
      }
      if (id == 2) {
        const interClapConfirmInfo = await interface_index.requestClapConfirmInfo(params).then((r) => r).catch((e) => {
        });
        if (!interClapConfirmInfo.data || !interClapConfirmInfo.data.t) {
          return;
        }
        info = interClapConfirmInfo.data.t.content || [];
      }
      state.clappingInfo = info.map((clap) => {
        let obj = {};
        let cellRNames = hide_item_name.map((item) => {
          item.val = clap[item.key];
          return item;
        });
        obj.cellRNames = JSON.stringify(cellRNames);
        obj.cellLImg = clap.imgs;
        obj.clapId = clap.id;
        return obj;
      });
      console.log(state.clappingInfo);
      console.log(state.clapConfirmInfo);
    };
    const handleRandomStatus = (obj) => {
      console.log(obj);
      state.randomStatus = obj.id;
      getClappingInfo(obj.id);
    };
    const addRander = () => {
      const formConfig = {};
      formConfig.domList = [
        { id: 1, title: "隐患描述", key: "remark", type: "input", ref: "clapping_remark" },
        { id: 2, title: "隐患地点", key: "field1", type: "input", ref: "clapping_field1" },
        { id: 3, title: "隐患照片", key: "imgs", type: "photo", ref: "clapping_imgs" },
        { id: 4, title: "隐患单位", key: "deptId", type: "branch", ref: "clapping_deptId" }
      ];
      formConfig.config = {
        submitFn: "requestClapSubmit",
        from: "clapping"
      };
      common_vendor.index.$u.route({
        url: "/pages/comForm/comForm",
        params: {
          data: JSON.stringify(formConfig),
          title: "随手拍"
        }
      });
    };
    const clapItemClick = (obj) => {
      console.log(obj);
      if (state.randomStatus == 1)
        return;
      let cellArr = JSON.parse(obj.cellRNames);
      let cellTitles = cellArr.map((item) => item.title);
      const formConfig = {};
      let domList = [
        { id: 1, title: "隐患描述", key: "remark", type: "text", ref: "clapping_review_remark" },
        { id: 2, title: "隐患地点", key: "field1", type: "text", ref: "clapping_review_field1" },
        { id: 3, title: "隐患照片", key: "imgs", type: "picture", ref: "clapping_review_imgs", val: obj.cellLImg },
        // todo
        { id: 4, title: "隐患单位", key: "deptName", type: "text", ref: "clapping_review_deptId" },
        { id: 5, title: "是否为隐患", key: "danger", type: "radio", ref: "clapping_review_danger", options: ["是", "否"] },
        { id: 6, title: "原因", key: "reason", type: "input", ref: "clapping_review_reason", show: { ref: "clapping_review_danger", val: "否" } }
        // 条件
      ];
      domList.map((item) => {
        let cellIndex = cellTitles.indexOf(item.title);
        if (cellIndex > -1) {
          item.val = cellArr[cellIndex].val;
        }
        return item;
      });
      formConfig.domList = domList;
      formConfig.config = {
        submitFn: "requestClapReSubmit",
        params: { id: obj.clapId },
        from: "clapping_review"
      };
      console.log(formConfig);
      common_vendor.index.$u.route({
        url: "/pages/comForm/comForm",
        params: {
          data: JSON.stringify(formConfig),
          title: "随手拍审核"
        }
      });
    };
    common_vendor.onShow(() => {
      getClappingInfo(state.randomStatus);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(random_status, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: state.randomStatus == item.id,
            c: item.id,
            d: state.hideStatus == item.id ? 1 : "",
            e: common_vendor.o(($event) => handleRandomStatus(item))
          };
        }),
        b: common_vendor.f(state.clappingInfo, (item, k0, i0) => {
          return {
            a: common_vendor.o(($event) => clapItemClick(item)),
            b: "561e5c75-0-" + i0,
            c: common_vendor.p({
              cellRNames: item.cellRNames,
              cellLImg: item.cellLImg
            })
          };
        }),
        c: state.randomStatus == 1
      }, state.randomStatus == 1 ? {
        d: common_vendor.o(($event) => addRander())
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/T_A_clapping/T_A_clapping.vue"]]);
my.createPage(MiniProgramPage);
