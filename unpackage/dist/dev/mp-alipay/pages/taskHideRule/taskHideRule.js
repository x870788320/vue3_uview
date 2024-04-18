"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
const utils_index = require("../../utils/index.js");
const interface_index = require("../../interface/index.js");
require("../../interface/constant.js");
require("../../interface/request.js");
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
  __name: "taskHideRule",
  props: {
    config: {}
  },
  setup(__props) {
    store_index.useIndexStore();
    const state = common_vendor.reactive({
      hideStatus: 1,
      taskDangerInfo: []
    });
    const hide_status = [
      { id: 1, title: "隐患上传" },
      { id: 2, title: "隐患整改" },
      { id: 3, title: "隐患复核" }
    ];
    const hide_item_name = [
      { id: 1, title: "检查活动名称", key: "field2" },
      { id: 2, title: "受检单位", key: "field" },
      { id: 3, title: "隐患描述", key: "field3" },
      { id: 4, title: "上传时间", key: "addDate" }
    ];
    const getClappingInfo = async (id) => {
      let params = {
        page: 1,
        rows: 100
      };
      let info = [];
      if (id == 1) {
        const interTaskMyInfo = await interface_index.requestTaskMyDanInfo(params).then((r) => r).catch((e) => {
        });
        if (!interTaskMyInfo.data || !interTaskMyInfo.data.t) {
          return;
        }
        info = interTaskMyInfo.data.t.content || [];
        if (hide_item_name.length == 5) {
          hide_item_name.pop();
        }
      }
      if (id == 2) {
        const interTaskZGInfo = await interface_index.requestTaskZGDanInfo(params).then((r) => r).catch((e) => {
        });
        if (!interTaskZGInfo.data || !interTaskZGInfo.data.t) {
          return;
        }
        hide_item_name.push({ id: 5, title: "复核人", key: "field10.ushow" });
        info = interTaskZGInfo.data.t.content || [];
      }
      if (id == 3) {
        const interTaskFHInfo = await interface_index.requestTaskFHDanInfo(params).then((r) => r).catch((e) => {
        });
        if (!interTaskFHInfo.data || !interTaskFHInfo.data.t) {
          return;
        }
        info = interTaskFHInfo.data.t.content || [];
        if (hide_item_name.length == 5) {
          hide_item_name.pop();
        }
      }
      state.mainDangerInfo = info;
      state.taskDangerInfo = info.map((clap) => {
        let obj = {};
        let cellRNames = hide_item_name.map((item) => {
          item.val = clap[item.key];
          if (item.key.includes("addDate")) {
            let arr = utils_index.formatDate(item.val);
            item.val = `${arr[0]}-${arr[1]} ${arr[3]}`;
          }
          if (item.key.includes(".")) {
            let keys = item.key.split(".");
            item.val = clap[keys[0]][keys[1]];
          }
          return item;
        });
        obj.cellRNames = JSON.stringify(cellRNames);
        obj.dangerLImg = clap.imgs;
        obj.dangerId = clap.id;
        obj.field6 = clap.field6;
        obj.hdNo = clap.hdNo;
        return obj;
      });
      console.log("taskDangerInfo", state.taskDangerInfo);
    };
    const handleHideStatus = (obj) => {
      state.hideStatus = obj.id;
      getClappingInfo(obj.id);
      console.log(obj);
    };
    const dangerItemClick = (obj, index) => {
      console.log(obj);
      const data = state.mainDangerInfo[index];
      console.log(data);
      const formConfig = getFormConfig(obj, data);
      common_vendor.index.$u.route({
        url: "/pages/comForm/comForm",
        params: {
          data: JSON.stringify(formConfig),
          title: "隐患上传"
        }
      });
    };
    const dangerTypes = [["一般隐患(现场整改)", "一般隐患(非现场整改)", "重大隐患"]];
    const dangerLevels = [["人员", "设备", "管理"]];
    const getFormConfig = (obj, data) => {
      const formConfig = {};
      if (state.hideStatus == 1) {
        formConfig.domList = [
          { id: 1, title: "隐患编号", key: "hdNo", type: "text", ref: "danger_up_hdNo", val: data["hdNo"] || "" },
          { id: 2, title: "受检单位(责任单位)", key: "field", type: "text", ref: "danger_up_field", val: data["field"] || "" },
          { id: 3, title: "检查活动名称(检查内容)", key: "field2", type: "text", ref: "danger_up_field2", val: data["field2"] || "" },
          { id: 4, title: "隐患地点", key: "field1", type: "text", ref: "danger_up_field1", val: data["field1"] || "" },
          { id: 5, title: "隐患描述", key: "field3", type: "text", ref: "danger_up_field3", val: data["field3"] || "" },
          { id: 6, title: " 隐患照片", key: "imgs", type: "picture", ref: "danger_up_imgs", val: data["imgs"] || "" },
          { id: 7, title: "整改要求", key: "field4", type: "input", ref: "danger_up_field4", val: data["field4"] || "" },
          { id: 8, title: "规定时间(整改截止时间)", key: "field5", type: "timeYMD", ref: "danger_up_field5", val: data["field5"] || "" },
          { id: 9, title: "隐患类型", key: "field8", type: "picker", ref: "danger_up_field8", options: dangerTypes },
          { id: 10, title: "隐患等级", key: "field9", type: "picker", ref: "danger_up_field9", options: dangerLevels },
          { id: 11, title: "整改责任人", key: "field10.id", type: "user", ref: "danger_up_field10" }
          // field10.id
        ];
        formConfig.config = {
          submitFn: "requestDangerSubmit",
          from: "danger_up",
          params: { id: obj.dangerId, field6: obj.dangerId }
        };
      }
      if (state.hideStatus == 2) {
        let field5arr = utils_index.formatDate(data["field5"] - 0);
        let field5Val = `${field5arr[0]}-${field5arr[1]} ${field5arr[3]}`;
        formConfig.domList = [
          { id: 1, title: "隐患编号", key: "hdNo", type: "text", ref: "danger_up_hdNo", val: data["hdNo"] || "" },
          { id: 2, title: "受检单位(责任单位)", key: "field", type: "text", ref: "danger_up_field", val: data["field"] || "" },
          { id: 3, title: "检查活动名称(检查内容)", key: "field2", type: "text", ref: "danger_up_field2", val: data["field2"] || "" },
          { id: 4, title: "隐患地点", key: "field1", type: "text", ref: "danger_up_field1", val: data["field1"] || "" },
          { id: 5, title: "隐患描述", key: "field3", type: "text", ref: "danger_up_field3", val: data["field3"] || "" },
          { id: 6, title: " 隐患照片", key: "imgs", type: "picture", ref: "danger_up_imgs", val: data["imgs"] || "" },
          { id: 7, title: "整改要求", key: "field4", type: "text", ref: "danger_up_field4", val: data["field4"] || "" },
          { id: 8, title: "规定时间(整改截止时间)", key: "field5", type: "text", ref: "danger_up_field5", val: field5Val || "" },
          { id: 9, title: "隐患类型", key: "field8", type: "text", ref: "danger_up_field8", val: data["field8"] || "" },
          { id: 10, title: "隐患等级", key: "field9", type: "text", ref: "danger_up_field9", val: data["field9"] || "" },
          { id: 11, title: "整改责任人", key: "field10.ushow", type: "text", ref: "danger_up_field10", val: data["field10"]["ushow"] || "" },
          // field10.id
          { id: 12, title: "整改保障措施", key: "field13", type: "input", ref: "danger_up_field13" },
          // field10.id
          { id: 13, title: "整改完成情况", key: "field14", type: "input", ref: "danger_up_field14" },
          // field10.id
          { id: 14, title: "整改完成情况照片", key: "field15", type: "photo", ref: "danger_up_field15" },
          // field10.id
          { id: 15, title: "投入资金", key: "field16", type: "input", ref: "danger_up_field16" },
          // field10.id
          { id: 16, title: "实际整改完成时间", key: "field17", type: "time", ref: "danger_up_field17" }
          // field10.id
        ];
        formConfig.config = {
          submitFn: "requestDangerZGSubmit",
          from: "danger_zg",
          params: { id: obj.dangerId, field11: "否" }
        };
      }
      if (state.hideStatus == 3) {
        let field5arr = utils_index.formatDate(data["field5"] - 0);
        let field5Val = `${field5arr[0]}-${field5arr[1]}`;
        let field17arr = utils_index.formatDate(data["field5"] - 0);
        let field17Val = `${field17arr[0]}-${field17arr[1]}`;
        let field18Option = [
          { label: "复核驳回", key: "3" },
          { label: "结束", key: "4" }
        ];
        formConfig.domList = [
          { id: 1, title: "隐患编号", key: "hdNo", type: "text", ref: "danger_up_hdNo", val: data["hdNo"] || "" },
          { id: 2, title: "受检单位(责任单位)", key: "field", type: "text", ref: "danger_up_field", val: data["field"] || "" },
          { id: 3, title: "检查活动名称(检查内容)", key: "field2", type: "text", ref: "danger_up_field2", val: data["field2"] || "" },
          { id: 4, title: "隐患地点", key: "field1", type: "text", ref: "danger_up_field1", val: data["field1"] || "" },
          { id: 5, title: "隐患描述", key: "field3", type: "text", ref: "danger_up_field3", val: data["field3"] || "" },
          { id: 6, title: " 隐患照片", key: "imgs", type: "picture", ref: "danger_up_imgs", val: data["imgs"] || "" },
          { id: 7, title: "整改要求", key: "field4", type: "text", ref: "danger_up_field4", val: data["field4"] || "" },
          { id: 8, title: "规定时间(整改截止时间)", key: "field5", type: "text", ref: "danger_up_field5", val: field5Val || "" },
          { id: 9, title: "隐患类型", key: "field8", type: "text", ref: "danger_up_field8", val: data["field8"] || "" },
          { id: 10, title: "隐患等级", key: "field9", type: "text", ref: "danger_up_field9", val: data["field9"] || "" },
          { id: 11, title: "整改责任人", key: "field10.ushow", type: "text", ref: "danger_up_field10", val: data["field10"]["ushow"] || "" },
          // field10.id
          { id: 12, title: "整改保障措施", key: "field13", type: "text", ref: "danger_up_field13", val: data["field13"] || "" },
          // field10.id
          { id: 13, title: "整改完成情况", key: "field14", type: "text", ref: "danger_up_field14", val: data["field14"] || "" },
          // field10.id
          { id: 14, title: "整改完成情况照片", key: "field15", type: "picture", ref: "danger_up_field15", val: data["field15"] || "" },
          // field10.id
          { id: 15, title: "投入资金", key: "field16", type: "text", ref: "danger_up_field16", val: data["field16"] || "" },
          // field10.id
          { id: 16, title: "实际整改完成时间", key: "field17", type: "text", ref: "danger_up_field17", val: field17Val },
          // field10.id
          { id: 17, title: "是否委派复核人", key: "field18", type: "text", ref: "danger_up_field18", val: "否" },
          // field10.id
          { id: 18, title: "是否合格", key: "status", type: "radio", ref: "danger_up_status", val: field18Option[1], options: field18Option },
          // field10.id
          { id: 19, title: "情况描述", key: "field21", type: "input", ref: "danger_up_field21", val: "否" },
          // field10.id
          { id: 20, title: "情况描述图片", key: "field22", type: "photo", ref: "danger_up_field22", val: "否" },
          // field10.id
          { id: 21, title: "复核时间", key: "field20", type: "time", ref: "danger_up_field20", val: "否" }
          // field10.id
        ];
        formConfig.config = {
          submitFn: "requestDangerFHSubmit",
          from: "danger_fh",
          params: { id: obj.dangerId }
        };
      }
      return formConfig;
    };
    common_vendor.onShow(() => {
      getClappingInfo(state.hideStatus);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(hide_status, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: state.hideStatus == item.id,
            c: item.id,
            d: state.hideStatus == item.id ? 1 : "",
            e: common_vendor.o(($event) => handleHideStatus(item))
          };
        }),
        b: common_vendor.f(state.taskDangerInfo, (item, index, i0) => {
          return {
            a: common_vendor.o(($event) => dangerItemClick(item, index)),
            b: "f7126b16-0-" + i0,
            c: common_vendor.p({
              cellRNames: item.cellRNames,
              cellLImg: item.dangerLImg
            })
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/taskHideRule/taskHideRule.vue"]]);
my.createPage(MiniProgramPage);
