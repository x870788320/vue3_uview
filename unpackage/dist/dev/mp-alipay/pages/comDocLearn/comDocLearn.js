"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
const interface_index = require("../../interface/index.js");
const interface_constant = require("../../interface/constant.js");
const utils_storage_user_storage = require("../../utils/storage/user_storage.js");
const utils_index = require("../../utils/index.js");
require("../../interface/request.js");
require("../../store/user.js");
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  _easycom_u_button2();
}
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  _easycom_u_button();
}
const _sfc_main = {
  __name: "comDocLearn",
  props: {
    config: ""
  },
  setup(__props) {
    const props = __props;
    const user = utils_storage_user_storage.GET_STORAGE("USER") || {};
    store_index.useIndexStore();
    const state = common_vendor.reactive({
      // taskType: 1,
      title: "",
      configObj: JSON.parse(props.config),
      docList: [],
      complateTimer: null,
      posFileSrc: "",
      fileShow: false,
      fileSrc: "",
      fileType: "word",
      taskPlanPhone: "",
      curentDocInfo: {},
      docBtn: false,
      docBtnText: ""
    });
    common_vendor.ref();
    common_vendor.computed(() => {
      console.log(interface_constant.BASE_LINE_PRE + state.posFileSrc);
      let url = "";
      if (state.posFileSrc) {
        let type = utils_index.getFileType(state.posFileSrc) || "other";
        console.log(type);
        url = ["other", "link"].includes(type) ? state.posFileSrc : interface_constant.BASE_LINE_PRE + encodeURIComponent(state.posFileSrc);
      } else {
        common_vendor.index.showToast({
          title: "未发现文件，请联系管理员！",
          duration: 1e3 * 2
        });
      }
      console.log(url);
      return url;
    });
    const getDocData = async () => {
      let params = {};
      let docInterData = null;
      if (state.configObj.from == "taskPlan") {
        let docInterData2 = await interface_index.requestTaskPlanContent(state.configObj.id).then((res) => res).catch((e) => e);
        if (!docInterData2 || !docInterData2.data || !docInterData2.data.t) {
          return;
        }
        state.paperInfo = docInterData2.data.t.paper;
        let dataObj = docInterData2.data.t.eduList || [];
        state.docList = dataObj.map((item) => {
          return {
            ...item,
            rightVal: item.status == 2 ? "已完成" : `需学习：${item.setTime || 0}学时`
            // secName: item.status == 2? '已完成': '点击开始'
          };
        });
        state.docBtn = state.docList.every((item) => item.status == 2);
        state.docBtnText = "已完成培训";
        console.log("docInterData", state.docList);
        return;
      }
      if (state.configObj.from == "know") {
        params.page = 1;
        if (state.configObj.inter == "Post") {
          params.type = state.configObj.key;
          docInterData = await interface_index.requestKnowPostInfo(params).then((res) => res).catch((e) => e);
        }
        if (state.configObj.inter == "Law") {
          params.type = "法律法规";
          docInterData = await interface_index.requestKnowLawInfo(params).then((res) => res).catch((e) => e);
        }
        if (state.configObj.inter == "Rule") {
          docInterData = await interface_index.requestKnowRuleInfo(params).then((res) => res).catch((e) => e);
        }
        if (state.configObj.inter == "Factor") {
          docInterData = await interface_index.requestKnowFactorInfo(params).then((res) => res).catch((e) => e);
        }
        console.log("docInterData", docInterData);
        if (!docInterData || !docInterData.data || !docInterData.data.t) {
          return;
        }
        state.docList = docInterData.data.t.content || [];
      }
    };
    function openDocment(obj) {
      console.log(obj);
      state.curentDocInfo = obj;
      let time = "";
      if (obj.status != 2 && obj.setTime) {
        time = `&time=${obj.setTime * 60 * 45}`;
      }
      let file = obj.file1 || obj.file2 || "";
      handleFileUrl({ file, time });
      return;
    }
    const handleFileUrl = (obj) => {
      console.log(obj);
      if (obj.file) {
        let type = utils_index.getFileType(obj.file) || "other";
        console.log(type);
        let allSrc = `${obj.file.slice(0, 4) == "http" ? "" : interface_constant.BASE_FILE_URL}${obj.file}`;
        state.posFileSrc = ["other", "link"].includes(type) ? allSrc : interface_constant.BASE_LINE_PRE + encodeURIComponent(allSrc + obj.time);
        console.log(state.posFileSrc);
        common_vendor.index.showToast({
          title: state.posFileSrc,
          duration: 1e3 * 2
        });
        let timeNum = obj.time.split("=")[1] - 0;
        if (timeNum > 0) {
          console.log(timeNum);
          clearTimeout(state.complateTimer);
          state.complateTimer = setTimeout(() => {
            complateLearn();
          }, timeNum * 1e3);
        }
        setTimeout(() => {
          state.fileShow = true;
        }, 2e3);
      } else {
        common_vendor.index.showToast({
          title: "未发现文件，请联系管理员！",
          duration: 1e3 * 2
        });
      }
    };
    const webCallback = () => {
      console.log("变更出发方式");
    };
    const complateLearn = async () => {
      console.log("学习完成");
      let startArr = utils_index.formatDate(state.startTime);
      let endArr = utils_index.formatDate();
      if (state.configObj.from == "taskPlan") {
        const params = {
          peId: state.curentDocInfo.id,
          startTime: `${startArr[0]}-${startArr[1]} ${startArr[3]}:${startArr[4]}`,
          endTime: `${endArr[0]}-${endArr[1]} ${endArr[3]}:${endArr[4]}`,
          status: 2,
          avatar: state.taskPlanPhoto || "",
          imgs: user.portrait
        };
        interface_index.requestTrainLearnSubmit(params).then((res) => {
          console.log(res);
          common_vendor.index.showToast({
            title: "学习完成!",
            duration: 1e3 * 2
          });
        });
      }
    };
    const handleDocBtn = () => {
      console.log(3333);
      let obj = state.configObj;
      console.log(obj);
      obj.title = "培训考试";
      obj.from = "taskPlan";
      obj.paper = state.paperInfo;
      common_vendor.index.$u.route({
        url: "/pages/comExam/comExam",
        params: {
          config: JSON.stringify(obj)
        }
      });
    };
    common_vendor.onShow(() => {
      getDocData();
      common_vendor.index.setNavigationBarTitle({
        title: state.configObj.title || ""
      });
      clearTimeout(state.complateTimer);
    });
    common_vendor.onMounted(() => {
      console.log(props.configObj);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(state.docList, (item, k0, i0) => {
          return common_vendor.e({
            a: `/static/office/${common_vendor.unref(utils_index.getFileType)(item.file1) || "link"}.png`,
            b: common_vendor.t(item.name || item.title || ""),
            c: item.secName
          }, item.secName ? {
            d: common_vendor.t(item.secName)
          } : {}, {
            e: item.rightVal
          }, item.rightVal ? {
            f: common_vendor.t(item.rightVal || "")
          } : {}, {
            g: common_vendor.o(($event) => openDocment(item))
          });
        }),
        b: state.docBtn
      }, state.docBtn ? {
        c: common_vendor.t(state.docBtnText || ""),
        d: common_vendor.o(($event) => handleDocBtn()),
        e: common_vendor.p({
          type: "primary",
          shape: "circle",
          ripple: true
        })
      } : {}, {
        f: state.fileShow
      }, state.fileShow ? {
        g: state.posFileSrc,
        h: common_vendor.o(webCallback)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/comDocLearn/comDocLearn.vue"]]);
my.createPage(MiniProgramPage);
