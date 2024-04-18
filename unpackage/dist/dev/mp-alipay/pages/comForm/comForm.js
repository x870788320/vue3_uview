"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
const interface_constant = require("../../interface/constant.js");
const interface_index = require("../../interface/index.js");
require("../../interface/request.js");
require("../../store/user.js");
require("../../utils/storage/user_storage.js");
require("../../utils/index.js");
if (!Array) {
  const _easycom_u_radio2 = common_vendor.resolveComponent("u-radio");
  const _easycom_u_radio_group2 = common_vendor.resolveComponent("u-radio-group");
  const _easycom_u_checkbox2 = common_vendor.resolveComponent("u-checkbox");
  const _easycom_u_checkbox_group2 = common_vendor.resolveComponent("u-checkbox-group");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_datetime_picker2 = common_vendor.resolveComponent("u-datetime-picker");
  const _easycom_u_picker2 = common_vendor.resolveComponent("u-picker");
  const _easycom_my_sign2 = common_vendor.resolveComponent("my_sign");
  const _easycom_userList2 = common_vendor.resolveComponent("userList");
  const _easycom_u_notify2 = common_vendor.resolveComponent("u-notify");
  const _easycom_u_loading_icon2 = common_vendor.resolveComponent("u-loading-icon");
  (_easycom_u_radio2 + _easycom_u_radio_group2 + _easycom_u_checkbox2 + _easycom_u_checkbox_group2 + _easycom_u_button2 + _easycom_u_datetime_picker2 + _easycom_u_picker2 + _easycom_my_sign2 + _easycom_userList2 + _easycom_u_notify2 + _easycom_u_loading_icon2)();
}
const _easycom_u_radio = () => "../../uni_modules/uview-plus/components/u-radio/u-radio.js";
const _easycom_u_radio_group = () => "../../uni_modules/uview-plus/components/u-radio-group/u-radio-group.js";
const _easycom_u_checkbox = () => "../../uni_modules/uview-plus/components/u-checkbox/u-checkbox.js";
const _easycom_u_checkbox_group = () => "../../uni_modules/uview-plus/components/u-checkbox-group/u-checkbox-group.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_datetime_picker = () => "../../uni_modules/uview-plus/components/u-datetime-picker/u-datetime-picker.js";
const _easycom_u_picker = () => "../../uni_modules/uview-plus/components/u-picker/u-picker.js";
const _easycom_my_sign = () => "../../components/my_sign/my_sign.js";
const _easycom_userList = () => "../../components/userList/userList.js";
const _easycom_u_notify = () => "../../uni_modules/uview-plus/components/u-notify/u-notify.js";
const _easycom_u_loading_icon = () => "../../uni_modules/uview-plus/components/u-loading-icon/u-loading-icon.js";
if (!Math) {
  (_easycom_u_radio + _easycom_u_radio_group + _easycom_u_checkbox + _easycom_u_checkbox_group + _easycom_u_button + _easycom_u_datetime_picker + _easycom_u_picker + _easycom_my_sign + _easycom_userList + _easycom_u_notify + _easycom_u_loading_icon)();
}
const _sfc_main = {
  __name: "comForm",
  props: {
    config: "",
    title: "",
    data: "",
    imgurl: ""
  },
  setup(__props) {
    const props = __props;
    const interfaces = {
      requestTaskGoodSubmit: interface_index.requestTaskGoodSubmit,
      //劳保提交
      requestCreatSignSubmit: interface_index.requestCreatSignSubmit,
      // 安全责任制发起人签字
      requestLetterSignSubmit: interface_index.requestLetterSignSubmit,
      // 安全责任制签字
      requestMorningMeetingSubmit: interface_index.requestMorningMeetingSubmit,
      // 晨会
      requestTaskCheckSub: interface_index.requestTaskCheckSub,
      //安全检查
      requestTaskEnd: interface_index.requestTaskEnd,
      //安全检查完成
      requestClapSubmit: interface_index.requestClapSubmit,
      //随手拍提交
      requestClapReSubmit: interface_index.requestClapReSubmit,
      //随手怕审核
      requestDangerSubmit: interface_index.requestDangerSubmit,
      // 随手拍上传  任务
      requestDangerZGSubmit: interface_index.requestDangerZGSubmit,
      // 随手拍 整改
      requestDangerFHSubmit: interface_index.requestDangerFHSubmit,
      // 随手拍 复核
      requestAddAcciSub: interface_index.requestAddAcciSub,
      // 事故新增
      requestAcciReSubmit: interface_index.requestAcciReSubmit,
      // 事故确认
      requestAcciReportSubmit: interface_index.requestAcciReportSubmit,
      // 事故上报
      requestAcciHandleSubmit: interface_index.requestAcciHandleSubmit
      // 事故处理
    };
    const userListCom = common_vendor.ref();
    const uToast = common_vendor.ref();
    const itemRefs = common_vendor.ref({});
    const setItemRef = (item) => {
      return (el) => {
        if (el) {
          itemRefs.value[item.ref] = el;
        }
      };
    };
    store_index.useIndexStore();
    const state = common_vendor.reactive({
      formInfo: props.data ? JSON.parse(props.data) : {},
      isSubmitIng: false,
      defPhotoSrc: "/static/icon/camera.png",
      photoSrc: {},
      datetimeShowr: false,
      recordStatus: 0,
      // 录音状态
      recorderManager: null,
      // 录音实例
      canUseRecord: true,
      //录音功能是否可用
      recordDuration: 0,
      recordPlaying: false,
      selectUser: "请选择责任人",
      signShow: false,
      submitParams: {},
      formFileShow: false,
      formFileUrl: ""
    });
    const formConfig = common_vendor.computed(() => state.formInfo.config || {});
    const mainHideUpList = common_vendor.computed(() => {
      if (state.formInfo && state.formInfo.domList)
        return state.formInfo.domList;
      if (state.formInfo)
        return state.formInfo;
      return [];
    });
    const dataInit = () => {
      mainHideUpList.value.map((item) => {
        if (["input"].includes(item.type)) {
          state[item.ref] = "";
        }
        if (item.type == "branch") {
          state[item.ref] = item.val || { name: "请选择部门" };
        }
        if (item.type == "user" || item.type == "userById") {
          state[item.ref] = item.val || { name: `请选择${item.title}` };
        }
        if (item.type == "radio") {
          if (item.val) {
            state[item.ref] = item.val;
          } else {
            state[item.ref] = item.options[0];
          }
        }
        if (["timeYMD", "time"].includes(item.type)) {
          state[item.ref] = Date.now();
        }
        if (item.type == "picker") {
          state[item.ref] = `请选择${item.title}`;
        }
        if (item.type == "sign") {
          state[`${item.ref}_img`] = item.val ? interface_constant.BASE_FILE_URL + item.val : "/static/icon/sign.png";
        }
        if (item.type == "table") {
          console.log(item.options);
        }
        console.log(item.ref, state[item.ref]);
      });
    };
    dataInit();
    const getPhoto = (obj) => {
      common_vendor.index.chooseImage({
        count: 1,
        // 最多选择一张图片
        sourceType: ["album", "camera"],
        // 只允许从相机选择  'album'相册
        success: (res) => {
          const tempFilePaths = res.tempFilePaths;
          console.log(tempFilePaths);
          state.photoSrc[obj.ref] = tempFilePaths[0];
        }
      });
    };
    const recordInit = () => {
      if (dd.canIUse("getRecorderManager")) {
        state.recorderManager = dd.getRecorderManager();
        state.recorderManager.onstart = () => {
          console.log("开始录音");
        };
        state.recorderManager.onstop = (res) => {
          console.log("结束录音");
          state.voidPath = res.tempFilePath;
          console.log(res.tempFilePath);
        };
        state.recorderManager.onerror = (err) => {
          dd.showToast({ content: JSON.stringify(err) });
        };
      } else {
        state.canUseRecord = false;
        dd.showToast({ content: "请升级钉钉版本至4.5.18以支持录音功能" });
      }
    };
    const bgmInit = () => {
      state.audioManager = dd.getBackgroundAudioManager();
      state.audioManager.onError = (err) => {
        dd.showToast({ content: JSON.stringify(err) });
      };
    };
    let timerSecond = null;
    const getRecord = () => {
      if (!state.recorderManager)
        recordInit();
      if (!state.canUseRecord)
        return;
      if (state.recordStatus == 0) {
        state.recordStatus = 1;
        state.recorderManager.start({ duration: 60 });
        timerSecond = setInterval(() => {
          if (state.recordDuration < 60) {
            state.recordDuration++;
          } else {
            clearInterval(timerSecond);
            timerSecond = null;
          }
        }, 1e3);
        return;
      }
      if (state.recordStatus == 1) {
        clearInterval(timerSecond);
        timerSecond = null;
        state.recordStatus = 2;
        state.recorderManager.stop();
        return;
      }
    };
    const recordPlay = (e) => {
      if (!state.audioManager)
        bgmInit();
      state.recordPlaying = true;
      state.audioManager.src = state.voidPath;
      state.audioManager.title = "";
      state.audioManager.play();
    };
    const recordStop = (e) => {
      state.audioManager.src = state.voidPath;
      state.audioManager.title = "";
      state.audioManager.stop();
      state.recordPlaying = false;
    };
    const recordDelete = (e) => {
      if (!state.audioManager)
        return;
      recordStop();
      state.recordStatus = 0;
      state.voidPath = "";
    };
    const handlePicker = (e, obj) => {
      state[`${obj.ref}show`] = false;
      state[`${obj.ref}`] = e.value[0];
      console.log(state[`${obj.ref}`]);
    };
    const handleUserList = (obj) => {
      if (obj.type == "userById") {
        handleBranchList(obj);
        return;
      }
      common_vendor.index.$u.route({
        url: "/pages/comUserList/comUserList",
        animationDuration: 300,
        animationType: "slide-in-bottom",
        params: {
          callData: JSON.stringify(obj)
        }
      });
    };
    const handleBranchList = (obj) => {
      common_vendor.index.$u.route({
        url: "pages/comBranchList/comBranchList",
        animationDuration: 300,
        animationType: "slide-in-bottom",
        params: {
          callData: JSON.stringify(obj)
        }
      });
    };
    const comFormOpenFile = (obj) => {
      state.formFileShow = true;
      console.log(`${interface_constant.BASE_LINE_PRE}${obj.val}`);
      state.formFileUrl = `${interface_constant.BASE_LINE_PRE}${interface_constant.BASE_FILE_URL}${obj.val}`;
    };
    const showToast = (text) => {
      uToast.value.show({
        top: 10,
        type: "primary",
        message: text || "请填写完整",
        duration: 1e3 * 3,
        safeAreaInsetTop: false
      });
    };
    const checkboxChange = (obj) => {
      console.log(obj);
    };
    const uploadFile = (obj, path) => Promise.all(mainHideUpList.value.map(async (item) => {
      if (item.type == "photo" && (!item.show || item.show && state[item.show.ref] == item.show.val)) {
        let filePath = state.photoSrc[item.ref];
        await interface_index.requestFileAdd(filePath).then((res) => {
          if (res.data) {
            let resObj = JSON.parse(res.data);
            console.log(resObj);
            state.submitParams[item.key] = resObj.message;
          }
        });
      }
      if (item.type == "record" && (!item.show || item.show && state[item.show.ref] == item.show.val)) {
        let filePath = state.voidPath;
        console.log(filePath);
        if (!filePath)
          return;
        await interface_index.requestFileAdd(filePath).then((res) => {
          console.log(res);
          if (res.data) {
            let resObj = JSON.parse(res.data);
            state.submitParams[item.key] = resObj.message;
          }
        });
      }
      if (item.type == "sign" && (!item.show || item.show && state[item.show.ref] == item.show.val)) {
        let dom = itemRefs.value[item.ref];
        let signFilePath = await dom.signDown().then((res) => res);
        console.log(signFilePath);
        await interface_index.requestFileAdd(signFilePath).then((res) => {
          if (res.data) {
            let resObj = JSON.parse(res.data);
            state.submitParams[item.key] = resObj.message;
          }
        });
      }
    }));
    const handleSubmit = async () => {
      if (state.isSubmitIng) {
        showToast("正在提交，请稍后操作！");
        return;
      }
      state.isSubmitIng = true;
      state.submitParams = {};
      await uploadFile();
      mainHideUpList.value.map((item) => {
        if (["input", "radio", "picker"].includes(item.type)) {
          state.submitParams[item.key] = state[item.ref];
        }
        if (["text", "picture"].includes(item.type)) {
          state.submitParams[item.key] = item.val;
        }
        if (["branch", "user"].includes(item.type)) {
          state.submitParams[item.key] = state[item.ref].id;
        }
        if (item.type == "time") {
          state.submitParams[item.key] = common_vendor.dayjs(state[item.ref]).format("YYYY-MM-DD HH:mm:ss");
        }
        if (item.type == "timeYMD") {
          state.submitParams[item.key] = common_vendor.dayjs(state[item.ref]).format("YYYY-MM-DD");
        }
      });
      console.log(formConfig);
      if (formConfig.value.params) {
        state.submitParams = { ...formConfig.value.params, ...state.submitParams };
      }
      console.log("submitParams", state.submitParams);
      const result = await interfaces[formConfig.value.submitFn](state.submitParams);
      showToast(result.data.message);
      setTimeout(() => {
        state.isSubmitIng = false;
        if (formConfig.value.handleOthers && formConfig.value.handleOthers.length) {
          console.log(formConfig.value.handleOthers);
          let nextPro = formConfig.value.handleOthers.shift();
          if (formConfig.value.handleOthers.length) {
            nextPro.config.handleOthers = formConfig.value.handleOthers;
          }
          state.formInfo = nextPro;
          dataInit();
          return;
        } else {
          common_vendor.index.$u.route({
            type: "back",
            success: function() {
              beforePage.dasabi();
            }
          });
        }
      }, 1500);
    };
    common_vendor.onShow(() => {
      common_vendor.index.$once("selectStaff", function(data) {
        let obj = JSON.parse(data);
        state[obj.callData.ref] = obj;
        console.log(state[obj.callData.ref]);
      });
      common_vendor.index.$once("selectBranch", function(data) {
        const obj = JSON.parse(data);
        state[obj.callData.ref] = obj.node;
        console.log(state[obj.callData.ref]);
      });
      common_vendor.index.setNavigationBarTitle({
        title: props.title || ""
      });
      state.formFileShow = false;
      state.isSubmitIng = false;
    });
    common_vendor.onBeforeUnmount(() => {
      clearInterval(timerSecond);
      timerSecond = null;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(mainHideUpList), (item, k0, i0) => {
          var _a;
          return common_vendor.e({
            a: common_vendor.t(item.title),
            b: item.type == "text"
          }, item.type == "text" ? {
            c: common_vendor.t(item.val || ""),
            d: `${(_a = common_vendor.unref(formConfig)) == null ? void 0 : _a.from}_${item.key}`
          } : {}, {
            e: item.type == "input"
          }, item.type == "input" ? {
            f: `请填写${item.title}`,
            g: state[item.ref],
            h: common_vendor.o(($event) => state[item.ref] = $event.detail.value)
          } : {}, {
            i: item.type == "radio"
          }, item.type == "radio" ? {
            j: common_vendor.f(item.options, (item2, k1, i1) => {
              return {
                a: item2,
                b: "4d1ce9be-1-" + i0 + "-" + i1 + "," + ("4d1ce9be-0-" + i0),
                c: common_vendor.p({
                  customStyle: {
                    margin: "16rpx"
                  },
                  name: item2.key || item2,
                  label: item2.label || item2
                })
              };
            }),
            k: "4d1ce9be-0-" + i0,
            l: common_vendor.o(($event) => state[item.ref] = $event),
            m: common_vendor.p({
              placement: "row",
              modelValue: state[item.ref]
            })
          } : {}, {
            n: item.type == "checkBox"
          }, item.type == "checkBox" ? {
            o: common_vendor.f(item.options, (item2, index, i1) => {
              return {
                a: index,
                b: "4d1ce9be-3-" + i0 + "-" + i1 + "," + ("4d1ce9be-2-" + i0),
                c: common_vendor.p({
                  customStyle: {
                    marginBottom: "8px"
                  },
                  label: item2.name,
                  name: item2.key
                })
              };
            }),
            p: common_vendor.o(checkboxChange),
            q: "4d1ce9be-2-" + i0,
            r: common_vendor.p({
              placement: "column"
            })
          } : {}, {
            s: item.type == "picture"
          }, item.type == "picture" ? common_vendor.e({
            t: item.val
          }, item.val ? {
            v: `${common_vendor.unref(interface_constant.BASE_FILE_URL)}${item.val}`
          } : {}) : {}, {
            w: item.type == "photo"
          }, item.type == "photo" ? common_vendor.e({
            x: state.photoSrc
          }, state.photoSrc ? {
            y: state.photoSrc[item.ref] || state.defPhotoSrc
          } : {}, {
            z: common_vendor.o(($event) => getPhoto(item))
          }) : {}, {
            A: item.type == "record"
          }, item.type == "record" ? common_vendor.e({
            B: state.recordStatus == 0,
            C: common_vendor.o(($event) => getRecord()),
            D: common_vendor.t(`00:${state.recordDuration < 10 ? "0" : ""}${state.recordDuration}`),
            E: state.recordStatus == 1,
            F: common_vendor.o(($event) => getRecord()),
            G: common_vendor.t(state.recordPlaying),
            H: !state.recordPlaying
          }, !state.recordPlaying ? {
            I: common_vendor.o(($event) => recordPlay()),
            J: "4d1ce9be-4-" + i0,
            K: common_vendor.p({
              type: "primary",
              shape: "circle",
              ripple: true,
              size: "small"
            })
          } : {
            L: common_vendor.o(($event) => recordStop()),
            M: "4d1ce9be-5-" + i0,
            N: common_vendor.p({
              type: "primary",
              shape: "circle",
              ripple: true,
              size: "small"
            })
          }, {
            O: common_vendor.o(($event) => recordDelete()),
            P: "4d1ce9be-6-" + i0,
            Q: common_vendor.p({
              type: "primary",
              shape: "circle",
              ripple: true,
              size: "small"
            }),
            R: state.recordStatus == 2
          }) : {}, {
            S: ["time", "timeYMD"].includes(item.type)
          }, ["time", "timeYMD"].includes(item.type) ? {
            T: common_vendor.o(($event) => state.datetimeShowr = false),
            U: common_vendor.o(($event) => state.datetimeShowr = false),
            V: common_vendor.o(($event) => state.datetimeShowr = false),
            W: "4d1ce9be-7-" + i0,
            X: common_vendor.o(($event) => state[item.ref] = $event),
            Y: common_vendor.p({
              show: state.datetimeShowr,
              mode: "datetime",
              closeOnClickOverlay: true,
              modelValue: state[item.ref]
            }),
            Z: common_vendor.t(common_vendor.unref(common_vendor.dayjs)(state[item.ref]).format("YYYY-MM-DD HH:mm:ss")),
            aa: common_vendor.o(($event) => state.datetimeShowr = true),
            ab: common_vendor.o(() => {
            })
          } : {}, {
            ac: item.type == "picker"
          }, item.type == "picker" ? {
            ad: common_vendor.o(($event) => state[`${item.ref}show`] = false),
            ae: common_vendor.o(($event) => state[`${item.ref}show`] = false),
            af: common_vendor.o(($event) => handlePicker($event, item)),
            ag: "4d1ce9be-8-" + i0,
            ah: common_vendor.p({
              show: state[`${item.ref}show`],
              columns: item.options,
              closeOnClickOverlay: true
            }),
            ai: common_vendor.t(state[`${item.ref}`]),
            aj: common_vendor.o(($event) => state[`${item.ref}show`] = true),
            ak: common_vendor.o(() => {
            })
          } : {}, {
            al: ["user", "userById"].includes(item.type)
          }, ["user", "userById"].includes(item.type) ? {
            am: common_vendor.t(state[item.ref].name || ""),
            an: common_vendor.o(($event) => handleUserList(item))
          } : {}, {
            ao: item.type == "branch"
          }, item.type == "branch" ? {
            ap: common_vendor.t(state[item.ref].name || ""),
            aq: common_vendor.o(($event) => handleBranchList(item))
          } : {}, {
            ar: item.type == "list"
          }, item.type == "list" ? {
            as: common_vendor.f(item.val, (listItem, k1, i1) => {
              return {
                a: common_vendor.f(listItem, (listItemVal, listItemKey, i2) => {
                  return {
                    a: common_vendor.t(listItemKey),
                    b: common_vendor.t(listItemVal)
                  };
                })
              };
            })
          } : {}, {
            at: item.type == "sign"
          }, item.type == "sign" ? common_vendor.e({
            av: state.signShow
          }, state.signShow ? {
            aw: setItemRef(item),
            ax: "4d1ce9be-9-" + i0
          } : {
            ay: state[`${item.ref}_img`],
            az: common_vendor.o(($event) => state.signShow = !state.signShow)
          }) : {}, {
            aA: item.type == "table"
          }, item.type == "table" ? {
            aB: common_vendor.f(item.options, (row, k1, i1) => {
              return {
                a: common_vendor.f(row, (cell, k2, i2) => {
                  return common_vendor.e({
                    a: cell.cellType == "img"
                  }, cell.cellType == "img" ? {
                    b: common_vendor.unref(interface_constant.BASE_FILE_URL) + cell.imgSrc
                  } : {
                    c: common_vendor.t(cell.name || "")
                  });
                })
              };
            })
          } : {}, {
            aC: item.type == "file"
          }, item.type == "file" ? common_vendor.e({
            aD: state.formFileShow
          }, state.formFileShow ? {
            aE: state.formFileUrl
          } : {}, {
            aF: common_vendor.o(($event) => comFormOpenFile(item))
          }) : {}, {
            aG: !item.show || item.show && state[item.show.ref] == item.show.val
          });
        }),
        b: common_vendor.p({
          type: "primary",
          shape: "circle",
          ripple: true,
          size: "medium "
        }),
        c: common_vendor.o(($event) => handleSubmit()),
        d: common_vendor.unref(formConfig).submitFn,
        e: state.imgurl,
        f: () => ({
          r: userListCom,
          k: "userListCom"
        }),
        g: () => ({
          r: uToast,
          k: "uToast"
        }),
        h: common_vendor.p({
          text: ""
        }),
        i: state.isSubmitIng
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/comForm/comForm.vue"]]);
my.createPage(MiniProgramPage);
