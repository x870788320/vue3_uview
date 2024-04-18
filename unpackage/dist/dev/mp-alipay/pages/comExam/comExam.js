"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
const interface_index = require("../../interface/index.js");
const utils_index = require("../../utils/index.js");
const utils_storage_user_storage = require("../../utils/storage/user_storage.js");
require("../../interface/request.js");
require("../../interface/constant.js");
require("../../store/user.js");
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_my_sign2 = common_vendor.resolveComponent("my_sign");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  const _easycom_u_notify2 = common_vendor.resolveComponent("u-notify");
  (_easycom_u_button2 + _easycom_my_sign2 + _easycom_u_popup2 + _easycom_u_notify2)();
}
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_my_sign = () => "../../components/my_sign/my_sign.js";
const _easycom_u_popup = () => "../../uni_modules/uview-plus/components/u-popup/u-popup.js";
const _easycom_u_notify = () => "../../uni_modules/uview-plus/components/u-notify/u-notify.js";
if (!Math) {
  (_easycom_u_button + _easycom_my_sign + _easycom_u_popup + _easycom_u_notify)();
}
const _sfc_main = {
  __name: "comExam",
  props: {
    config: ""
  },
  setup(__props) {
    const props = __props;
    const user = utils_storage_user_storage.GET_STORAGE("USER") || {};
    const popupSign = common_vendor.ref();
    const uToast = common_vendor.ref();
    const configObj = JSON.parse(props.config);
    const examPreList = [
      "考试限时，请在规定时间内答完题目。",
      "考试不满80分，请重新考试。",
      "需学习完成全部课件后才可进行本次考试。"
    ];
    store_index.useIndexStore();
    const state = common_vendor.reactive({
      examPrepare: true,
      taskExamPhoto: "",
      popupShow: false,
      popTexts: { texts: [] },
      // paperList: [],
      timer: null,
      paperList: [],
      curentSubId: 1,
      curentSub: { options: "" },
      subjectAnswer: [{ answer: "" }],
      examPreList,
      isExtra: false,
      isColl: false,
      overTime: false
    });
    const codeList = ["A", "B", "C", "D", "E", "F", "G"];
    if (configObj && configObj.paper) {
      if (configObj.paper.score != void 0) {
        state.examPreList.push(`本次考试成绩为：${configObj.paper.score}`);
      }
      if (configObj.paper.extraScore != void 0) {
        state.examPreList.push(`本次补考成绩为：${configObj.paper.extraScore}`);
      }
      if (configObj.paper.score < 80) {
        state.isExtra = true;
      }
    }
    const isIncludesAns = common_vendor.computed((_) => (answer) => {
      let is = false;
      if (state.subjectAnswer && state.subjectAnswer[state.curentSubId - 1] && state.subjectAnswer[state.curentSubId - 1].answer) {
        is = state.subjectAnswer[state.curentSubId - 1].answer.includes(answer);
      }
      return is;
    });
    const examBtnShow = common_vendor.computed(() => {
      let isShow = true;
      if (configObj.paper.extraScore != void 0) {
        isShow = false;
      }
      if (configObj.paper.score && configObj.paper.score - 0 >= 80) {
        isShow = false;
      }
      return isShow;
    });
    const startExam = (e) => {
      state.examPrepare = !state.examPrepare;
      if (configObj.from == "taskPlan") {
        common_vendor.index.showToast({
          title: "请切换至前置摄像头",
          duration: 1e3 * 2
        });
        common_vendor.index.chooseImage({
          count: 1,
          // 最多选择一张图片
          sourceType: ["camera"],
          // 只允许从相机选择  'album'相册
          success: async (res) => {
            console.log(res);
            const tempFilePaths = res.tempFilePaths;
            console.log(tempFilePaths);
            await interface_index.requestFileAdd(tempFilePaths[0]).then((res2) => {
              if (res2.data) {
                let resObj = JSON.parse(res2.data);
                console.log(resObj);
                state.taskExamPhoto = resObj.message;
                state.startExamTime = (/* @__PURE__ */ new Date()).getTime();
                state.popupShow = true;
                state.popTexts = {
                  type: "start",
                  texts: ["是否开始考试?", "开始答题后不能退出!"]
                };
              }
            });
          }
        });
        return;
      }
    };
    const popupClose = () => {
      const type = state.popTexts.type;
      if (state.overTime) {
        return;
      }
      if (type == "submit") {
        state.popupShow = false;
        return;
      }
      state.popupShow = false;
      state.popTexts = { texts: [] };
      common_vendor.index.$u.route({
        type: "back"
      });
    };
    const popupOpen = () => {
      console.log("popupOpen");
    };
    const popupConfirm = () => {
      state.popupShow = false;
      const type = state.popTexts.type;
      if (type == "start") {
        state.popTexts = {
          type: "sign",
          texts: ["请先签字后进行考试!"]
        };
        state.popupShow = true;
      }
      if (type == "sign") {
        state.popTexts = { texts: [] };
        saveSign();
        randerPaper();
      }
      if (type == "submit") {
        let startTArr = utils_index.formatDate(state.startExamTime);
        let endTArr = utils_index.formatDate();
        let tpId = state.isExtra ? configObj.paper.extraTpId : configObj.paper.tpId;
        console.log(333333);
        let params = {
          tpId,
          startTime: `${startTArr[0]}-${startTArr[1]} ${startTArr[3]}:${startTArr[4]}`,
          endTime: `${endTArr[0]}-${endTArr[1]} ${endTArr[3]}:${startTArr[4]}`,
          // sign:state.signImgUrl,
          imgs: user.portrait || "",
          avatar: state.taskExamPhoto || ""
        };
        params.sign = state.signImgUrl || "";
        state.subjectAnswer.map((obj, i) => {
          Object.keys(obj).map((item) => {
            params[`items[${i}].${item}`] = obj[item];
          });
        });
        let Corrects = state.subjectAnswer.filter((item) => item.correct);
        let score = (Corrects.length / state.subjectAnswer.length * 100).toFixed(1);
        const fn = state.isExtra ? interface_index.requestPlanExtraPaper : interface_index.requestPlanPaperIbank;
        console.log(params);
        fn(params).then((r) => {
          console.log(r);
          if (r.data.success) {
            state.popTexts = {
              type: "result",
              texts: [`考试成绩: ${score}`, "如未达到80分需参加补考！"]
            };
            state.popupShow = true;
          } else {
            uToast.value.show({
              top: 10,
              type: "primary",
              message: "网络原因请稍后再试",
              duration: 1e3 * 3,
              safeAreaInsetTop: false
            });
          }
        });
      }
      if (type == "result") {
        state.popupShow = false;
        state.popTexts = { texts: [] };
        common_vendor.index.$u.route({
          type: "back"
        });
      }
    };
    const saveSign = async () => {
      let signFilePath = await popupSign.value.signDown().then((res) => res);
      await interface_index.requestFileAdd(signFilePath).then((res) => {
        console.log(res);
        if (res.data) {
          let resObj = JSON.parse(res.data);
          state.signImgUrl = resObj.message;
        }
      });
    };
    const randerPaper = async () => {
      let id = state.isExtra ? configObj.paper.extraTpId : configObj.paper.tpId;
      const paperInfoInter = await interface_index.requestPlanPaperInfo(id);
      if (!paperInfoInter.data || !paperInfoInter.data.t) {
        return;
      }
      state.paperList = paperInfoInter.data.t;
      state.subjectAnswer = state.paperList.map((item) => ({
        id: item.id,
        tpiId: item.tpiId,
        correct: false,
        answer: "",
        answerOld: item.answer,
        type: item.type
      }));
      state.curentSub = state.paperList[0];
      clearTimeout(state.timer);
      timeRander();
      console.log(state.paperList);
    };
    const timeRander = (time) => {
      time = time || configObj.paper.time * 60 || 0;
      state.showTime = utils_index.getTiming(time);
      if (time <= 0) {
        state.popTexts = {
          type: "submit",
          texts: ["您的答题结束,是否提交试卷?!"]
        };
        state.overTime = true;
        clearTimeout(state.timer);
        state.timer = null;
      }
      time--;
      clearTimeout(state.timer);
      state.timer = setTimeout(() => timeRander(time), 1e3);
    };
    const changeSubject = (isLast) => {
      state.curentSubId = isLast ? state.curentSubId - 1 : state.curentSubId + 1;
      if (state.curentSubId > state.paperList.length) {
        state.popTexts = {
          type: "submit",
          texts: ["您的答题结束,是否提交试卷?!"]
        };
        state.popupShow = true;
        state.curentSubId = state.paperList.length;
        return;
      }
      if (state.curentSubId <= 1) {
        state.curentSubId = 1;
      }
      if (state.curentSubId == state.paperList.length) {
        state.curentSubId = state.paperList.length;
      }
      state.curentSub = state.paperList[state.curentSubId - 1];
      state.isColl = Boolean(state.curentSub.collectId);
    };
    const selectAnswer = (answer, code) => {
      console.log(answer);
      console.log(33232);
      console.log(state.subjectAnswer);
      const curSubAnswer = state.subjectAnswer[state.curentSubId - 1];
      if (curSubAnswer.type == 3) {
        if (curSubAnswer.answer.includes(code)) {
          curSubAnswer.answer = curSubAnswer.answer.replace(code, "");
        } else {
          curSubAnswer.answer = utils_index.orderCode(curSubAnswer.answer + code);
        }
      } else {
        curSubAnswer.answer = code;
      }
      curSubAnswer.correct = curSubAnswer.answer == curSubAnswer.answerOld;
      state.subjectAnswer[state.curentSubId - 1] = curSubAnswer;
      let arr = state.subjectAnswer;
      arr[state.curentSubId - 1] = curSubAnswer;
      state.subjectAnswer = arr;
      console.log(curSubAnswer);
      console.log(state.subjectAnswer);
    };
    const lookSubJect = (str) => {
      console.log(str);
      console.log(configObj);
      let seExtra = str.includes("补考");
      let paperId = seExtra ? configObj.paper.extraTpId : configObj.paper.tpId;
      common_vendor.index.$u.route({
        url: "/pages/comExamLook/comExamLook",
        params: {
          config: JSON.stringify({ ...configObj, paperId })
        }
      });
    };
    const subIsColl = () => {
      state.isColl = !state.isColl;
      console.log(state.curentSub);
      if (state.isColl) {
        interface_index.requestPlancollectAdd({ type: 1, id: state.curentSub.id }).then((r) => {
          console.log(r);
          if (r.data.t) {
            state.paperList[state.curentSubId].collectId = r.data.t;
            uToast.value.show({
              top: 10,
              type: "primary",
              message: "收藏成功",
              duration: 1e3 * 2,
              safeAreaInsetTop: false
            });
          }
        });
      } else {
        if (state.curentSub.collectId) {
          interface_index.requestPlancollectDel(state.curentSub.collectId);
        }
      }
    };
    common_vendor.onHide(() => {
      clearInterval(state.timer);
      state.timer = null;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(examPreList, (str, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(str),
            b: str.includes("成绩为")
          }, str.includes("成绩为") ? {
            c: common_vendor.o(($event) => lookSubJect(str))
          } : {});
        }),
        b: common_vendor.unref(examBtnShow)
      }, common_vendor.unref(examBtnShow) ? {
        c: common_vendor.t(state.isExtra ? "补考答题" : "开始考试"),
        d: common_vendor.o(($event) => startExam()),
        e: common_vendor.p({
          type: "primary",
          shape: "circle",
          ripple: true
        })
      } : {}, {
        f: state.examPrepare,
        g: !state.examPrepare
      }, !state.examPrepare ? {
        h: common_vendor.t(state.showTime),
        i: common_vendor.t(["判断题", "单选题", "多选题"][state.curentSub.type - 1]),
        j: `/static/icon/${state.isColl ? "collectDel" : "collectAdd"}.png`,
        k: common_vendor.o(($event) => subIsColl()),
        l: common_vendor.t(state.curentSub.title),
        m: common_vendor.f(state.curentSub.options.split("|"), (item, index, i0) => {
          return {
            a: common_vendor.t(codeList[index]),
            b: common_vendor.t(item),
            c: common_vendor.o(($event) => selectAnswer(item, codeList[index])),
            d: common_vendor.unref(isIncludesAns)(codeList[index]) ? 1 : ""
          };
        }),
        n: common_vendor.o(($event) => changeSubject(true)),
        o: common_vendor.t(state.curentSubId),
        p: common_vendor.t(state.paperList.length),
        q: common_vendor.t(state.paperList.length == state.curentSubId ? "提交" : "下一题"),
        r: common_vendor.o(($event) => changeSubject())
      } : {}, {
        s: common_vendor.f(state.popTexts.texts, (text, k0, i0) => {
          return {
            a: common_vendor.t(text)
          };
        }),
        t: state.popTexts.texts.length,
        v: state.popTexts.type == "sign"
      }, state.popTexts.type == "sign" ? {
        w: () => ({
          r: popupSign,
          k: "popupSign"
        })
      } : {}, {
        x: common_vendor.o(($event) => popupClose()),
        y: common_vendor.o(($event) => popupConfirm()),
        z: common_vendor.o(popupClose),
        A: common_vendor.o(popupOpen),
        B: common_vendor.p({
          show: state.popupShow,
          round: 10,
          mode: "center",
          safeAreaInsetBottom: false
        }),
        C: () => ({
          r: uToast,
          k: "uToast"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/comExam/comExam.vue"]]);
my.createPage(MiniProgramPage);
