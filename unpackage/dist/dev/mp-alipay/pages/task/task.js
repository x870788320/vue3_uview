"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
const interface_index = require("../../interface/index.js");
const utils_storage_user_storage = require("../../utils/storage/user_storage.js");
require("../../interface/request.js");
require("../../interface/constant.js");
require("../../store/user.js");
require("../../utils/index.js");
if (!Array) {
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_notify2 = common_vendor.resolveComponent("u-notify");
  (_easycom_u_input2 + _easycom_u_icon2 + _easycom_u_button2 + _easycom_u_notify2)();
}
const _easycom_u_input = () => "../../uni_modules/uview-plus/components/u-input/u-input.js";
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_notify = () => "../../uni_modules/uview-plus/components/u-notify/u-notify.js";
if (!Math) {
  (_easycom_u_input + _easycom_u_icon + _easycom_u_button + _easycom_u_notify)();
}
const _sfc_main = {
  __name: "task",
  setup(__props) {
    const interfaces = { requestMorningMeetingInfo: interface_index.requestMorningMeetingInfo };
    const uToast = common_vendor.ref();
    store_index.useIndexStore();
    const state = common_vendor.reactive({
      taskType: 1,
      taskTime: "day",
      taskSearch: "",
      tastInfo: []
    });
    const getTaskInfo = async () => {
      let params = {
        state: state.taskType,
        type: state.taskTime,
        title: state.taskSearch
      };
      let taskInfoInter = await interface_index.requestTaskInfo(params).then((res) => res).catch((e) => e);
      console.log(taskInfoInter);
      if (!taskInfoInter.data || !taskInfoInter.data.t) {
        return;
      }
      state.tastInfo = taskInfoInter.data.t;
    };
    const taskTypes = [
      { id: 1, title: "未完成任务" },
      { id: 2, title: "已完成任务" },
      { id: 3, title: "我的任务" }
    ];
    const taskTimes = [
      { id: 1, title: "本日任务", key: "day" },
      { id: 2, title: "本周任务", key: "week" },
      { id: 3, title: "本月任务", key: "month" }
    ];
    const childFormDoms = {
      // 晨会
      morningMeeting: [
        { id: 1, title: "晨会主题内容", key: "content", type: "text", ref: "Meeting_content" },
        { id: 2, title: "发起人", key: "userName", type: "text", ref: "Meeting_userName" },
        { id: 3, title: "文件", key: "file1", type: "file", ref: "Meeting_file1" },
        { id: 4, title: "建议", key: "remark", type: "input", ref: "Meeting_remark" },
        { id: 5, title: "参与人签字", key: "sign", type: "sign", ref: "Meeting_sign" }
      ]
    };
    const handleTaskType = (id) => {
      state.taskType = id;
      getTaskInfo();
    };
    const handleTaskTime = (key) => {
      state.taskTime = key;
      getTaskInfo();
    };
    const handleTaskItem = async (obj) => {
      console.log(obj);
      let types = {
        danger: { name: "taskHideRule" },
        // 隐患
        dangerCheck: { name: "taskDanCheck" },
        // 隐患检查
        dangerSimple: { name: "T_A_clapping", navId: 2 },
        //随手拍审核
        "trainPlan": { name: "taskTrainPlan" },
        // 培训
        culturePublicity: { name: "taskCulture" },
        // 文化安全
        "oh": { name: "taskCollectGood" },
        // 领用劳保用品
        accHandle: { name: "T_A_acciUp", navId: 4 },
        //事故上报
        acc: { name: "T_A_acciUp", navId: 3 },
        accSimple: { name: "T_A_acciUp", navId: 2 },
        // 事故报告
        accReply: { name: "applyAcciReply" },
        // 事故批复
        riskHdCheck: { name: "" },
        //隐患排查清单
        workAct: { name: "T_A_work" },
        // 特殊作业
        morningMeeting: { name: "comForm", sourceInter: "requestMorningMeetingInfo", submitFn: "requestMorningMeetingSubmit", title: "晨会" },
        //晨会
        respkpiAuditor: { name: "taskRespkp" },
        // 责任考核
        riskHdRecties: { name: "" },
        // 隐患整改
        riskHdRvals: { name: "" },
        // 隐患评估
        "respkpiAssessee": { name: "" },
        // 责任制考评
        letter: { name: "taskLetter" },
        //钉钉责任书
        letterSigner: { name: "taskLetter", navId: 3 }
        //钉钉责任书确认
      };
      let urlObj = types[obj.type];
      if (!urlObj) {
        uToast.value.show({
          top: 10,
          type: "primary",
          message: "该部分内容即将上线",
          duration: 1e3 * 3,
          safeAreaInsetTop: false
        });
        return;
      }
      let toUrl = urlObj.name;
      if (toUrl == "comForm") {
        const formConfig = {};
        formConfig.domList = childFormDoms[obj.type] || [];
        formConfig.config = {
          submitFn: urlObj.submitFn,
          from: obj.type
        };
        if (urlObj.sourceInter) {
          let interParams = {};
          if (obj.type == "morningMeeting" && obj.data) {
            interParams = JSON.parse(obj.data) || {};
            formConfig.config.params = { id: interParams.bizId };
          }
          let interInfo = await interfaces[urlObj.sourceInter](interParams).then((r) => r);
          console.log(interInfo);
          if (interInfo.data && interInfo.data.t) {
            let info = interInfo.data.t;
            formConfig.domList = formConfig.domList.map((item) => {
              item.val = info[item.key];
              return item;
            });
          }
        }
        obj = formConfig;
        console.log(obj);
      }
      console.log(32323232);
      if (urlObj.navId) {
        obj.navId = urlObj.navId;
      }
      let params = {
        config: JSON.stringify(obj),
        data: JSON.stringify(obj)
      };
      if (urlObj.title) {
        params.title = urlObj.title;
      }
      common_vendor.index.$u.route({
        url: `/pages/${toUrl}/${toUrl}`,
        params
      });
    };
    common_vendor.onShow(() => {
      if (utils_storage_user_storage.GET_STORAGE("TOKEN")) {
        getTaskInfo();
      } else {
        setTimeout(() => getTaskInfo(), 600);
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(taskTypes, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: item.id,
            c: state.taskType == item.id ? 1 : "",
            d: common_vendor.o(($event) => handleTaskType(item.id))
          };
        }),
        b: common_vendor.o(($event) => state.taskSearch = $event),
        c: common_vendor.p({
          type: "text",
          border: "true",
          placeholder: "请输入任务关键词搜索",
          ["custom-style"]: "background: #F2F3F8",
          modelValue: state.taskSearch
        }),
        d: common_vendor.p({
          name: "search",
          color: "#fff",
          size: "28"
        }),
        e: common_vendor.p({
          type: "primary"
        }),
        f: common_vendor.o(($event) => getTaskInfo()),
        g: common_vendor.f(taskTimes, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: state.taskTime == item.key,
            c: item.id,
            d: state.taskTime == item.key ? 1 : "",
            e: common_vendor.o(($event) => handleTaskTime(item.key))
          };
        }),
        h: common_vendor.t(state.tastInfo.length),
        i: common_vendor.f(state.tastInfo, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.time),
            c: common_vendor.o(($event) => handleTaskItem(item))
          };
        }),
        j: () => ({
          r: uToast,
          k: "uToast"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/task/task.vue"]]);
my.createPage(MiniProgramPage);
