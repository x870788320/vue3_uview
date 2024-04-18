"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
require("../../interface/index.js");
require("../../interface/request.js");
require("../../interface/constant.js");
require("../../store/user.js");
require("../../utils/storage/user_storage.js");
require("../../utils/index.js");
if (!Array) {
  const _easycom_u_datetime_picker2 = common_vendor.resolveComponent("u-datetime-picker");
  const _easycom_u_picker2 = common_vendor.resolveComponent("u-picker");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_userList2 = common_vendor.resolveComponent("userList");
  (_easycom_u_datetime_picker2 + _easycom_u_picker2 + _easycom_u_button2 + _easycom_userList2)();
}
const _easycom_u_datetime_picker = () => "../../uni_modules/uview-plus/components/u-datetime-picker/u-datetime-picker.js";
const _easycom_u_picker = () => "../../uni_modules/uview-plus/components/u-picker/u-picker.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_userList = () => "../../components/userList/userList.js";
if (!Math) {
  (_easycom_u_datetime_picker + _easycom_u_picker + _easycom_u_button + _easycom_userList)();
}
const _sfc_main = {
  __name: "taskHideUp",
  setup(__props) {
    const mainHideUpList = [
      { id: 1, title: "隐患编号", key: "", type: "text" },
      { id: 2, title: "受检单位(责任单位)", key: "", type: "text" },
      { id: 3, title: "检查活动名称(检查内容)", key: "", type: "text" },
      { id: 4, title: "隐患地点", key: "", type: "input" },
      { id: 5, title: "隐患描述", key: "", type: "input" },
      { id: 6, title: "隐患照片", key: "", type: "photo" },
      { id: 7, title: "整改要求", key: "", type: "input" },
      { id: 8, title: "规定时间(整改截止事件)", key: "", type: "time", name: "correctEnd" },
      { id: 9, title: "隐患类型", key: "", type: "picker", name: "hideType" },
      { id: 10, title: "隐患等级", key: "", type: "picker", name: "hideLevel" },
      { id: 11, title: "整改责任人", key: "", type: "user", name: "" }
    ];
    const userListCom = common_vendor.ref();
    store_index.useIndexStore();
    const state = common_vendor.reactive({
      photoSrc: "/static/icon/camera.png",
      datetimeShowr: false,
      datetimeVal: Date.now(),
      correctEndShow: false,
      correctEndVal: Date.now(),
      hideTypeShow: false,
      hideTypeVal: "请选择隐患类型",
      hideTypeColumns: [
        ["中国", "美国", "日本"]
      ],
      hideLevelShow: false,
      hideLevelVal: "请选择隐患等级",
      hideLevelColumns: [
        ["深圳", "厦门", "上海", "拉萨"]
      ],
      selectUser: "请选择责任人"
    });
    const getPhoto = () => {
      common_vendor.index.chooseImage({
        count: 1,
        // 最多选择一张图片
        sourceType: ["album", "camera"],
        // 只允许从相机选择  'album'相册
        success: (res) => {
          const tempFilePaths = res.tempFilePaths;
          console.log(tempFilePaths);
          state.photoSrc = tempFilePaths[0];
        }
      });
    };
    const handlePicker = (e, obj) => {
      state[`${obj.name}show`] = false;
      state[`${obj.name}Val`] = e.value[0];
    };
    const handleUserList = () => {
      console.log(userListCom);
      console.log(444444444);
      common_vendor.index.$u.route({
        url: "/pages/comUserList/comUserList",
        animationDuration: 300,
        animationType: "slide-in-bottom"
      });
    };
    const handleSubmit = () => {
      console.log(11111);
    };
    common_vendor.onShow(() => {
      common_vendor.index.$once("selectStaff", function(data) {
        console.log("监听到事件来自返回的参数：" + data);
        state.selectUser = data;
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(mainHideUpList, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.title),
            b: item.type == "text"
          }, item.type == "text" ? {} : {}, {
            c: item.type == "input"
          }, item.type == "input" ? {
            d: `请填写${item.title}`
          } : {}, {
            e: item.type == "photo"
          }, item.type == "photo" ? common_vendor.e({
            f: state.photoSrc
          }, state.photoSrc ? {
            g: state.photoSrc
          } : {}, {
            h: common_vendor.o(($event) => getPhoto())
          }) : {}, {
            i: item.type == "time"
          }, item.type == "time" ? {
            j: common_vendor.o(($event) => state.datetimeShowr = false),
            k: common_vendor.o(($event) => state.datetimeShowr = false),
            l: common_vendor.o(($event) => state.datetimeShowr = false),
            m: "f5f9f9d6-0-" + i0,
            n: common_vendor.o(($event) => state.datetimeVal = $event),
            o: common_vendor.p({
              show: state.datetimeShowr,
              mode: "datetime",
              closeOnClickOverlay: true,
              modelValue: state.datetimeVal
            }),
            p: common_vendor.t(common_vendor.unref(common_vendor.dayjs)(state.datetimeVal).format("YYYY-MM-DD HH:mm:ss")),
            q: common_vendor.o(($event) => state.datetimeShowr = true),
            r: common_vendor.o(() => {
            })
          } : {}, {
            s: item.type == "picker"
          }, item.type == "picker" ? {
            t: common_vendor.o(($event) => state[`${item.name}show`] = false),
            v: common_vendor.o(($event) => state[`${item.name}show`] = false),
            w: common_vendor.o(($event) => handlePicker($event, item)),
            x: "f5f9f9d6-1-" + i0,
            y: common_vendor.p({
              show: state[`${item.name}show`],
              columns: state[`${item.name}Columns`],
              closeOnClickOverlay: true
            }),
            z: common_vendor.t(state[`${item.name}Val`]),
            A: common_vendor.o(($event) => state[`${item.name}show`] = true),
            B: common_vendor.o(() => {
            })
          } : {}, {
            C: item.type == "user"
          }, item.type == "user" ? {
            D: common_vendor.t(state.selectUser || ""),
            E: common_vendor.o(($event) => handleUserList())
          } : {});
        }),
        b: common_vendor.p({
          type: "primary",
          shape: "circle",
          ripple: true,
          size: "medium "
        }),
        c: common_vendor.o(($event) => handleSubmit()),
        d: () => ({
          r: userListCom,
          k: "userListCom"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/taskHideUp/taskHideUp.vue"]]);
my.createPage(MiniProgramPage);
