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
  __name: "T_A_acciUp",
  props: {
    config: ""
  },
  setup(__props) {
    const props = __props;
    const porpsObj = props.config ? JSON.parse(props.config) : {};
    store_index.useIndexStore();
    const state = common_vendor.reactive({
      acciUpSept: porpsObj.navId || 1
    });
    const mainUpList = [
      { id: 1, title: "事故报告", key: "acciPage" },
      { id: 2, title: "待确认", key: "acciConfirm" },
      { id: 3, title: "事故上报", key: "acciUp" },
      { id: 4, title: "事故处理", key: "acciHandle" }
    ];
    const accidHandleame = [
      { id: 1, title: "事故描述", key: "remark" },
      { id: 2, title: "发生时间", key: "atTime" },
      { id: 3, title: "上报人", key: "createdUserName" },
      { id: 4, title: "上报时间", key: "createdDate" }
    ];
    const getAcciInfo = async (navInfo = mainUpList[0]) => {
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
      let interInfo = {};
      let acciItemList = accidHandleame;
      if (navInfo.id == 1) {
        interInfo = await interface_index.requestAcciPageInfo(params).then((r) => r).catch((e) => {
        });
        acciItemList.push({ id: 5, title: "确认人", key: "assignee" });
      }
      if (navInfo.id == 2) {
        interInfo = await interface_index.requestAcciConfirmInfo(params).then((r) => r).catch((e) => {
        });
      }
      if (navInfo.id == 3) {
        interInfo = await interface_index.requestAcciReportInfo(params).then((r) => r).catch((e) => {
        });
      }
      if (navInfo.id == 4) {
        interInfo = await interface_index.requestAcciHandleInfo(params).then((r) => r).catch((e) => {
        });
      }
      if (!interInfo.data || !interInfo.data.t) {
        return;
      }
      let info = interInfo.data.t.content || [];
      state[navInfo.key] = info.map((clap) => {
        let obj = {};
        let cellRNames = acciItemList.map((item) => {
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
    const handleAcciUpSept = (obj) => {
      state.acciUpSept = obj.id;
      getAcciInfo(obj);
    };
    const addAccident = () => {
      console.log(3333);
      const formConfig = {};
      formConfig.domList = [
        { id: 1, title: "发生时间", key: "atTime", type: "time", ref: "add_acci_time" },
        { id: 2, title: "事故描述", key: "remarm", type: "input", ref: "add_acci_msg" },
        { id: 3, title: "事故照片", key: "file1", type: "photo", ref: "add_acci_pic" },
        { id: 4, title: "语音录入", key: "file2", type: "record", ref: "add_acci_record" }
        //
      ];
      formConfig.config = {
        submitFn: "requestAddAcciSub",
        from: "add_acci"
      };
      common_vendor.index.$u.route({
        url: "/pages/comForm/comForm",
        params: {
          data: JSON.stringify(formConfig),
          title: "事故上报"
        }
      });
    };
    const handleConfirm = (obj) => {
      console.log(obj);
      const formConfig = {};
      let cellArr = JSON.parse(obj.cellRNames);
      let cellTitles = cellArr.map((item) => item.title);
      let domList = [];
      let toFormConfig = {};
      let title = "";
      if (state.acciUpSept == 2) {
        domList = [
          { id: 1, title: "发生时间", key: "atTime", type: "text", ref: "acci_at_time" },
          { id: 2, title: "事故描述", key: "remark", type: "text", ref: "acci_at_remark" },
          { id: 3, title: "事故照片", key: "imgs", type: "picture", ref: "acci_at_imgs", val: obj.cellLImg },
          // {id: 4, title: '语音', key: 'deptId', type: 'text',ref: "clapping_review_deptId"},
          { id: 5, title: "责任单位", key: "deptId", type: "branch", ref: "acci_createdDeptName" },
          { id: 6, title: "是否有效", key: "isOk", type: "radio", ref: "acci_isUse", options: ["是", "否"] },
          { id: 7, title: "是否上报", key: "isReport", type: "radio", ref: "acci_isRes", options: ["是", "否"] }
        ];
        toFormConfig = {
          submitFn: "requestAcciReSubmit",
          params: { id: obj.acciId },
          from: "acci_confirm"
        };
        title = "事故报告确认";
      }
      if (state.acciUpSept == 3) {
        domList = [
          { id: 1, title: "发生时间", key: "atTime", type: "text", ref: "acci_report_time" },
          { id: 2, title: "事故描述", key: "remark", type: "input", ref: "acci_report_remark" },
          { id: 3, title: "事故照片", key: "file1", type: "picture", ref: "acci_report_imgs", val: obj.cellLImg },
          { id: 4, title: "语音录入", key: "file2", type: "record", ref: "acci_report_record" },
          { id: 5, title: "事故处理员", key: "handlerId", type: "user", ref: "acci_report_handlerId" }
        ];
        toFormConfig = {
          submitFn: "requestAcciReportSubmit",
          params: { id: obj.acciId },
          from: "acci_report"
        };
        title = "事故上报";
      }
      if (state.acciUpSept == 4) {
        domList = [
          { id: 1, title: "发生时间", key: "atTime", type: "text", ref: "acci_handle_time" },
          { id: 2, title: "事故描述", key: "remark", type: "text", ref: "acci_handle_remark" },
          { id: 3, title: "事故照片", key: "file1", type: "picture", ref: "acci_handle_imgs", val: obj.cellLImg },
          { id: 4, title: "语音录入", key: "file2", type: "record", ref: "acci_handle_record" },
          { id: 5, title: "是否为事故", key: "isOk", type: "radio", ref: "acci_handle_handlerId", options: ["是", "否"] }
        ];
        toFormConfig = {
          submitFn: "requestAcciHandleSubmit",
          params: { id: obj.acciId },
          from: "acci_handle"
        };
        title = "事故处理";
      }
      domList.map((item) => {
        let cellIndex = cellTitles.indexOf(item.title);
        if (cellIndex > -1) {
          item.val = cellArr[cellIndex].val;
        }
        return item;
      });
      formConfig.domList = domList;
      formConfig.config = toFormConfig;
      console.log(formConfig);
      common_vendor.index.$u.route({
        url: "/pages/comForm/comForm",
        params: {
          data: JSON.stringify(formConfig),
          title
        }
      });
    };
    common_vendor.onShow(() => {
      getAcciInfo(mainUpList[state.acciUpSept - 1]);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(mainUpList, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: state.acciUpSept == item.id,
            c: item.id,
            d: state.acciUpSept == item.id ? 1 : "",
            e: common_vendor.o(($event) => handleAcciUpSept(item))
          };
        }),
        b: common_vendor.f(state.acciPage, (item, k0, i0) => {
          return {
            a: "f43a1656-0-" + i0,
            b: common_vendor.p({
              cellRNames: item.cellRNames,
              cellLImg: item.cellLImg,
              step: item.step
            })
          };
        }),
        c: common_vendor.o(($event) => addAccident()),
        d: state.acciUpSept == 1,
        e: common_vendor.f(state.acciConfirm, (item, k0, i0) => {
          return {
            a: common_vendor.o(($event) => handleConfirm(item)),
            b: "f43a1656-2-" + i0,
            c: common_vendor.p({
              cellRNames: item.cellRNames,
              cellLImg: item.cellLImg,
              step: item.step
            })
          };
        }),
        f: state.acciUpSept == 2,
        g: common_vendor.f(state.acciUp, (item, k0, i0) => {
          return {
            a: common_vendor.o(($event) => handleConfirm(item)),
            b: "f43a1656-3-" + i0,
            c: common_vendor.p({
              cellRNames: item.cellRNames,
              cellLImg: item.cellLImg,
              step: item.step
            })
          };
        }),
        h: state.acciUpSept == 3,
        i: common_vendor.f(state.acciHandle, (item, k0, i0) => {
          return {
            a: common_vendor.o(($event) => handleConfirm(item)),
            b: "f43a1656-4-" + i0,
            c: common_vendor.p({
              cellRNames: item.cellRNames,
              cellLImg: item.cellLImg,
              step: item.step
            })
          };
        }),
        j: state.acciUpSept == 4
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/T_A_acciUp/T_A_acciUp.vue"]]);
my.createPage(MiniProgramPage);
