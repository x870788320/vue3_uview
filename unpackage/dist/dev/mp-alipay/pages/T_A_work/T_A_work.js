"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
const utils_index = require("../../utils/index.js");
const resource_work = require("../../resource/work.js");
const utils_storage_user_storage = require("../../utils/storage/user_storage.js");
const interface_index = require("../../interface/index.js");
require("../../interface/constant.js");
require("../../interface/request.js");
require("../../store/user.js");
if (!Array) {
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _easycom_cell22 = common_vendor.resolveComponent("cell2");
  const _easycom_addBtn2 = common_vendor.resolveComponent("addBtn");
  (_easycom_u_tabs2 + _easycom_cell22 + _easycom_addBtn2)();
}
const _easycom_u_tabs = () => "../../uni_modules/uview-plus/components/u-tabs/u-tabs.js";
const _easycom_cell2 = () => "../../components/cell2/cell2.js";
const _easycom_addBtn = () => "../../components/addBtn/addBtn.js";
if (!Math) {
  (_easycom_u_tabs + _easycom_cell2 + _easycom_addBtn)();
}
const _sfc_main = {
  __name: "T_A_work",
  setup(__props) {
    store_index.useIndexStore();
    const state = common_vendor.reactive({
      // taskType: 1,
      workStatusId: 1,
      mainInfo: []
    });
    const workStatusNav = [
      { id: 1, name: "我的活动" },
      {
        id: 2,
        name: "活动审核",
        badge: {
          // isDot: true,
          // value: 5,
        }
      },
      { id: 3, name: "待建作业" },
      { id: 4, name: "我的作业" },
      { id: 5, name: "待审作业" },
      { id: 6, name: "审核历史" }
    ];
    const inters = [
      interface_index.requestWorkMyActInfo,
      interface_index.requestWorkPendingInfo,
      interface_index.requestWorkStaysInfo,
      interface_index.requestWorkDocMyInfo,
      interface_index.requestWorkDocPendInfo,
      interface_index.requestWorkdoHisInfo
    ];
    const actCellItems = [
      { id: 1, title: "作业内容", key: "content" },
      { id: 2, title: "作业地点", key: "place" },
      { id: 3, title: "预计开始时间", key: "beginTime" },
      { id: 4, title: "预计结束时间", key: "endTime" }
    ];
    const getClappingInfo = async (id = 1) => {
      let beginTimeN = (/* @__PURE__ */ new Date()).getTime() - 7 * 24 * 60 * 60 * 1e3;
      let beginArr = utils_index.formatDate(beginTimeN);
      let endArr = utils_index.formatDate();
      let params = {
        page: 1,
        rows: 20,
        size: 100,
        endTime: `${endArr[0]}-${endArr[1]}`,
        beginTime: `${beginArr[0]}-${beginArr[1]}`
      };
      console.log(params);
      let interFn = inters[id - 1];
      const interClapConfirmInfo = await interFn(params).then((r) => r).catch((e) => {
      });
      if (!interClapConfirmInfo.data || !interClapConfirmInfo.data.t) {
        return;
      }
      let info = interClapConfirmInfo.data.t.content || [];
      console.log(info);
      console.log(323232);
      state.mainInfo = info.map((clap) => {
        let obj = {};
        let cellRNames = actCellItems.map((item) => {
          item.val = clap[item.key];
          if (item.key.includes("Time")) {
            let arr = utils_index.formatDate(item.val);
            item.val = `${arr[0]}-${arr[1]} ${arr[3]}`;
          }
          return item;
        });
        obj.cellRNames = JSON.stringify(cellRNames);
        obj.cellLT = clap.dept.name;
        obj.cellLB = clap.user.ushow;
        obj.clapRT = clap.checker.ushow;
        obj.docs = clap.docs;
        obj.status = clap.status;
        return obj;
      });
    };
    getClappingInfo();
    const changeWorkStatus = (obj) => {
      console.log(obj);
      state.workStatusId = obj.id;
      getClappingInfo(obj.id);
    };
    const handleCell2 = (obj) => {
      console.log(obj);
    };
    const addRander = () => {
      const user = utils_storage_user_storage.GET_STORAGE("USER");
      console.log(user);
      const myDept = { name: user.deptName, id: user.deptId };
      const myName = { name: user.ushow, id: user.id };
      const formConfig = {};
      formConfig.domList = [
        { id: 1, title: "申请单位", key: "actDeptId", type: "branch", ref: "work_creat_act_dept", val: myDept },
        { id: 2, title: "申请人", key: "actUserId", type: "userById", ref: "work_creat_act_user", val: myName },
        { id: 3, title: "作业内容", key: "content", type: "input", ref: "work_creat_content" },
        { id: 4, title: "作业地点", key: "place", type: "input", ref: "work_creat_place" },
        { id: 5, title: "作业票办理人", key: "userId", type: "userById", ref: "work_creat_handle" },
        { id: 6, title: " 审核人", key: "checkerId", type: "userById", ref: "work_creat_checker" },
        { id: 7, title: "作业类型", key: "docs", type: "checkBox", ref: "work_creat_docs", options: resource_work.docTypes },
        { id: 8, title: "预计开始时间", key: "beginTime", type: "time", ref: "work_creat_begin" },
        { id: 9, title: "预计完成时间", key: "endTime", type: "time", ref: "work_creat_end" }
      ];
      formConfig.config = {
        submitFn: "requestWorkCreat",
        from: "work_creat"
      };
      common_vendor.index.$u.route({
        url: "/pages/comForm/comForm",
        params: {
          data: JSON.stringify(formConfig),
          title: "新增作业活动"
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(changeWorkStatus),
        b: common_vendor.p({
          list: workStatusNav,
          lineWidth: "40",
          lineHeight: "4",
          activeStyle: {
            color: "#303133",
            fontWeight: "bold",
            transform: "scale(1.05)"
          },
          inactiveStyle: {
            color: "#606266",
            transform: "scale(1)"
          },
          itemStyle: "padding-left: 30rpx; padding-right: 30rpx; height: 96rpx;"
        }),
        c: common_vendor.f(state.mainInfo, (item, k0, i0) => {
          return {
            a: common_vendor.o(($event) => handleCell2(item)),
            b: "2a2aaf56-1-" + i0,
            c: common_vendor.p({
              cellConfig: item
            })
          };
        }),
        d: common_vendor.f(state.mainInfo, (item, k0, i0) => {
          return {
            a: common_vendor.o(($event) => handleCell2(item)),
            b: "2a2aaf56-2-" + i0,
            c: common_vendor.p({
              cellConfig: item
            })
          };
        }),
        e: state.workStatusId == 1,
        f: state.workStatusId == 2,
        g: state.workStatusId == 3,
        h: state.workStatusId == 4,
        i: state.workStatusId == 5,
        j: state.workStatusId == 6,
        k: state.workStatusId == 1
      }, state.workStatusId == 1 ? {
        l: common_vendor.o(($event) => addRander())
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/T_A_work/T_A_work.vue"]]);
my.createPage(MiniProgramPage);
