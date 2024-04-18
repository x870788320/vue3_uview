"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
const interface_index = require("../../interface/index.js");
require("../../interface/request.js");
require("../../interface/constant.js");
require("../../store/user.js");
require("../../utils/storage/user_storage.js");
require("../../utils/index.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
const _sfc_main = {
  __name: "taskDanCheck",
  setup(__props) {
    store_index.useIndexStore();
    const state = common_vendor.reactive({
      checkStatus: 1,
      checkInfo: [],
      checkShowInfo: [],
      showChildId: -1
    });
    const checkDomList = () => [
      { id: 1, title: "检查内容", key: "content", type: "text", ref: "task_check_content" },
      { id: 2, title: "检查标准", key: "norm", type: "text", ref: "task_check_norm" },
      { id: 3, title: "是否存在问题", key: "danger", type: "radio", ref: "task_check_danger", val: "否", options: ["是", "否"] },
      { id: 4, title: "责任单位", key: "deptId", type: "branch", ref: "task_check_deptId", show: { ref: "task_check_danger", val: "是" } },
      { id: 5, title: "隐患描述", key: "remark", type: "input", ref: "task_check_remark", show: { ref: "task_check_danger", val: "是" } },
      { id: 6, title: "隐患照片", key: "imgs", type: "photo", ref: "task_check_imgs", show: { ref: "task_check_danger", val: "是" } },
      { id: 7, title: "整改要求", key: "request", type: "input", ref: "task_check_request", show: { ref: "task_check_danger", val: "是" } }
    ];
    let checkDownDomList = () => [
      { id: 1, title: "检查内容", key: "checkItemContent", type: "text", ref: "task_check_checkItemContent" },
      { id: 2, title: "检查标准", key: "checkItemNorm", type: "text", ref: "task_check_norm" },
      { id: 3, title: "检查信息", key: "checkInfo", type: "text", ref: "task_check_checkInfo" },
      { id: 4, title: "责任单位", key: "dangerDeptName", type: "text", ref: "task_check_dept" },
      { id: 5, title: "隐患描述", key: "dangerRemark", type: "text", ref: "task_check_dangerRemark" },
      { id: 6, title: "隐患照片", key: "dangerImgs", type: "picture", ref: "task_check_dangerImgs" },
      { id: 7, title: "整改要求", key: "dangerRequest", type: "text", ref: "task_check_dangerRequest" }
    ];
    const getCheckInfo = async () => {
      const interCheckInfo = await interface_index.requestTaskCheckInfo().then((r) => r).catch((e) => {
      });
      console.log(interCheckInfo);
      if (!interCheckInfo.data || !interCheckInfo.data.t) {
        return;
      }
      state.checkInfo = interCheckInfo.data.t;
      handleDanCheck(1);
    };
    const handleDanCheck = (id) => {
      console.log(id);
      state.checkStatus = id;
      let statuss = ["未完成", "已完成"];
      state.checkShowInfo = state.checkInfo.filter((item) => item.status == statuss[id - 1]);
      state.showChildId = -1;
    };
    let notDownChecks = [];
    const handleCheckItem = async (obj, taskId, index, isAdd) => {
      console.log(obj);
      if (obj.items) {
        notDownChecks = obj.items.filter((item) => item.status == "未完成");
        if (notDownChecks.length == 0) {
          state.showChildId = state.showChildId == index ? -1 : index;
          return;
        }
        obj = notDownChecks.shift();
      } else {
        notDownChecks = [];
      }
      if (!obj)
        return;
      console.log(obj);
      const formConfig = JSON.parse(JSON.stringify({}));
      if (obj.status == "已完成" && !isAdd) {
        let objIntemInfoInter = await interface_index.requestTaskCheckById({ taskId, checkItemId: obj.checkItemId }).then((r) => r).catch((e) => {
        });
        if (!objIntemInfoInter.data || !objIntemInfoInter.data.t || !objIntemInfoInter.data.t.length) {
          return;
        }
        let objIntemInfo = objIntemInfoInter.data.t[0];
        let domListLength = objIntemInfo.danger == "否" ? 3 : checkDownDomList().length;
        formConfig.domList = checkDownDomList().filter((item) => item.id <= domListLength).map((item) => {
          if (objIntemInfo[item.key] && !item.val) {
            item.val = objIntemInfo[item.key];
          }
          if (item.id == 3) {
            item.val = `${objIntemInfo.checkUserName},${objIntemInfo.checkTime}`;
          }
          return item;
        });
        formConfig.config = {
          from: "task_check_item"
        };
      } else {
        console.log(notDownChecks);
        notDownChecks = notDownChecks.map((info) => {
          let noCheckObj = {};
          noCheckObj.domList = checkDomList().map((item) => {
            if (info[item.key] && !item.val) {
              item.val = info[item.key];
            }
            return item;
          });
          noCheckObj.config = {
            submitFn: "requestTaskCheckSub",
            from: "task_check",
            params: {
              taskId,
              checkItemId: info.checkItemId
            }
          };
          return noCheckObj;
        });
        formConfig.domList = checkDomList().map((item) => {
          if (obj[item.key] && !item.val) {
            item.val = obj[item.key];
            console.log(item.val);
          }
          return item;
        });
        formConfig.config = {
          submitFn: "requestTaskCheckSub",
          from: "task_check",
          params: {
            taskId,
            checkItemId: obj.checkItemId
          },
          handleOthers: notDownChecks
        };
      }
      console.log(formConfig);
      common_vendor.index.$u.route({
        url: "/pages/comForm/comForm",
        params: {
          data: JSON.stringify(formConfig),
          title: "检查"
        }
      });
    };
    const handleAllChecked = (obj) => {
      console.log(obj);
      let formConfig = {};
      formConfig.domList = [
        { id: 1, title: "检查名称", key: "checkName", type: "text", ref: "task_check_end_checkName", val: obj.checkName },
        { id: 2, title: "拍照", key: "imgs", type: "photo", ref: "task_check_end_imgs" },
        { id: 3, title: "签字", key: "sign", type: "sign", ref: "task_check_end_sign" }
      ];
      formConfig.config = {
        submitFn: "requestTaskEnd",
        from: "task_check_end",
        params: {
          id: obj.taskId
        }
      };
      common_vendor.index.$u.route({
        url: "/pages/comForm/comForm",
        params: {
          data: JSON.stringify(formConfig),
          title: "完成"
        }
      });
    };
    common_vendor.onShow(() => {
      getCheckInfo();
    });
    return (_ctx, _cache) => {
      return {
        a: state.checkStatus == 1,
        b: state.checkStatus == 1 ? 1 : "",
        c: common_vendor.o(($event) => handleDanCheck(1)),
        d: state.checkStatus == 2,
        e: state.checkStatus == 2 ? 1 : "",
        f: common_vendor.o(($event) => handleDanCheck(2)),
        g: common_vendor.f(state.checkShowInfo, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.startDate),
            b: common_vendor.t(item.endDate),
            c: common_vendor.t(item.checkName),
            d: common_vendor.t(item.checkUserNames),
            e: item.items.every((item2) => item2.status == "已完成") && state.checkStatus == 1
          }, item.items.every((item2) => item2.status == "已完成") && state.checkStatus == 1 ? {
            f: common_vendor.o(($event) => handleAllChecked(item))
          } : {}, {
            g: common_vendor.o(($event) => handleCheckItem(item, item.taskId, index)),
            h: common_vendor.t(item.items.every((item2) => item2.status == "已完成") ? "已完成" : "未完成"),
            i: "3b167b15-0-" + i0,
            j: common_vendor.p({
              name: `${state.showChildId == index ? "arrow-up" : "arrow-down"}`,
              color: "#2979ff",
              size: "12"
            }),
            k: common_vendor.o(($event) => state.showChildId = state.showChildId == index ? -1 : index),
            l: common_vendor.f(item.items, (child, k1, i1) => {
              return common_vendor.e({
                a: common_vendor.t(child.content),
                b: common_vendor.t(child.status || "未完成"),
                c: common_vendor.t(child.norm),
                d: child.status == "已完成" && state.checkStatus == 1
              }, child.status == "已完成" && state.checkStatus == 1 ? {
                e: common_vendor.o(($event) => handleCheckItem(child, item.taskId, 0, true))
              } : {}, {
                f: common_vendor.o(($event) => handleCheckItem(child, item.taskId))
              });
            }),
            m: state.showChildId == index
          });
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/taskDanCheck/taskDanCheck.vue"]]);
my.createPage(MiniProgramPage);
