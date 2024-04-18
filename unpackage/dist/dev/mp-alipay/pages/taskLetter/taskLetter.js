"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
const interface_index = require("../../interface/index.js");
const utils_index = require("../../utils/index.js");
const interface_constant = require("../../interface/constant.js");
require("../../interface/request.js");
require("../../store/user.js");
require("../../utils/storage/user_storage.js");
if (!Array) {
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _easycom_cell_file2 = common_vendor.resolveComponent("cell_file");
  (_easycom_u_tabs2 + _easycom_cell_file2)();
}
const _easycom_u_tabs = () => "../../uni_modules/uview-plus/components/u-tabs/u-tabs.js";
const _easycom_cell_file = () => "../../components/cell_file/cell_file.js";
if (!Math) {
  (_easycom_u_tabs + _easycom_cell_file)();
}
const _sfc_main = {
  __name: "taskLetter",
  props: {
    config: ""
  },
  setup(__props) {
    const props = __props;
    const porpsObj = props.config ? JSON.parse(props.config) : {};
    store_index.useIndexStore();
    const state = common_vendor.reactive({
      navSept: porpsObj.navId || 2,
      mainInfo: [],
      fileShow: false,
      posFileSrc: ""
    });
    const mainLetterList = [
      { id: 1, name: "安全生产责任制", key: "system" },
      { id: 2, name: "目标责任书-发起人", key: "creater" },
      { id: 3, name: "目标责任书-签订人", key: "signer" }
    ];
    const letterItemNames = [
      { id: 1, title: "状态", key: "status", defval: "发起人已签字" },
      { id: 2, title: "安全生产目标", key: "aim" },
      { id: 3, title: "发布日期", key: "createDate" }
    ];
    const safeItemNames = [
      { id: 1, title: "适用岗位", key: "post" },
      { id: 2, title: "发布日期", key: "createDate" }
    ];
    const fileUrl = common_vendor.computed(() => {
      console.log(interface_constant.BASE_LINE_PRE + state.posFileSrc);
      return state.posFileSrc ? interface_constant.BASE_LINE_PRE + encodeURIComponent(interface_constant.BASE_FILE_URL + state.posFileSrc) : "";
    });
    const getInterInfo = async (navInfo = mainLetterList[state.navSept - 1]) => {
      console.log(navInfo);
      let beginTimeN = (/* @__PURE__ */ new Date()).getTime() - 7 * 24 * 60 * 60 * 1e3;
      utils_index.formatDate(beginTimeN);
      utils_index.formatDate();
      let params = {
        page: 1,
        rows: 100,
        size: 100
        // endTime:`${endArr[0]}-${endArr[1]}`,
        // beginTime:`${beginArr[0]}-${beginArr[1]}`
      };
      let interInfo = {};
      let acciItemList = JSON.parse(JSON.stringify(letterItemNames));
      if (navInfo.id == 1) {
        interInfo = await interface_index.requestRespSystemsInfo(params).then((r) => r).catch((e) => {
        });
        acciItemList = JSON.parse(JSON.stringify(safeItemNames));
      }
      if (navInfo.id == 2) {
        interInfo = await interface_index.requestRespCreatersInfo(params).then((r) => r).catch((e) => {
        });
      }
      if (navInfo.id == 3) {
        interInfo = await interface_index.requestRespSignersInfo(params).then((r) => r).catch((e) => {
        });
      }
      if (!interInfo.data || !interInfo.data.t) {
        return;
      }
      let info = interInfo.data.t.content || [];
      state["mainInfo" + navInfo.key] = info.map((clap) => {
        let obj = { ...clap };
        if (clap.letter) {
          clap = clap.letter;
        }
        let cellRNames = acciItemList.map((item) => {
          item.val = clap[item.key] || item.defval || "";
          if (item.key.includes("Time") || item.key.includes("Date")) {
            let arr = utils_index.formatDate(item.val);
            item.val = `${arr[0]}-${arr[1]} ${arr[3]}`;
          }
          if (navInfo.id == 3 && item.key.includes("status")) {
            item.val = clap.signed == "否" ? "签订人未签字" : "签订人已签字";
          }
          return item;
        });
        obj.cellRNames = JSON.stringify(cellRNames);
        obj.cellTitle = clap.name;
        obj.cellFile = clap.file;
        return obj;
      });
      console.log(state["mainInfo" + navInfo.key]);
    };
    const changeNavSept = (obj) => {
      state.navSept = obj.id;
      getInterInfo(obj);
    };
    const handleCellFile = async (obj) => {
      console.log(obj);
      if (state.navSept == 1) {
        state.posFileSrc = obj.file;
        state.fileShow = true;
        return;
      }
      const formConfig = {};
      let domList = [];
      let toFormConfig = {};
      let title = "";
      if (state.navSept == 2) {
        let params = {
          page: 1,
          rows: 100,
          size: 100
        };
        const interCreaters = await interface_index.requestCreatersInfo(params, obj.id).then((r) => r);
        if (!interCreaters.data || !interCreaters.data.t) {
          return;
        }
        let creaters = interCreaters.data.t.content || [];
        let options = creaters.map((item) => {
          let obj2 = item.sign ? { imgSrc: item.sign, cellType: "img" } : { name: "未签字", cellType: "text" };
          return [{ name: item.signer.ushow, cellType: "text" }, obj2];
        });
        domList = [
          { id: 1, title: "安全生产目标", key: "name", type: "text", ref: "resp_creat_name" },
          { id: 2, title: "文件", key: "file", type: "file", ref: "resp_creat_file" },
          { id: 3, title: "创建时间", key: "createDate", type: "text", ref: "resp_creat_createDate", val: obj.cellLImg },
          { id: 4, title: "发起人签字", key: "sign", type: "sign", ref: "resp_creat_sign" },
          { id: 5, title: "发起人签字时间", key: "signDate", type: "text", ref: "resp_creat_signDate" },
          { id: 6, title: "签订人员列表", key: "list", type: "table", ref: "resp_creat_list", options }
        ];
        toFormConfig = {
          submitFn: "requestCreatSignSubmit",
          params: { id: obj.id },
          from: "resp_creat"
        };
        title = "安全责任制-发起人";
      }
      if (state.navSept == 3) {
        domList = [
          { id: 1, title: "安全生产目标", key: "cellTitle", type: "text", ref: "resp_sign_cellTitle" },
          { id: 2, title: "文件", key: "cellFile", type: "file", ref: "resp_sign_file" },
          { id: 3, title: "创建时间", key: "createDate", type: "text", ref: "resp_sign_createDate", val: obj.letter.createDate },
          { id: 4, title: "发起人", key: "ushow", type: "text", ref: "resp_sign_ushow", val: obj.letter.creater.ushow || "" },
          { id: 5, title: "签订人签字", key: "sign", type: "sign", ref: "resp_sign_sign" }
        ];
        toFormConfig = {
          submitFn: "requestLetterSignSubmit",
          params: { id: obj.id },
          from: "resp_sign"
        };
        title = "安全责任制-签订人";
      }
      domList.map((item) => {
        if (obj[item.key]) {
          item.val = obj[item.key];
        }
        if (item.key.includes("Time") || item.key.includes("Date")) {
          let arr = utils_index.formatDate(item.val);
          item.val = `${arr[0]}-${arr[1]} ${arr[3]}`;
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
      getInterInfo();
      state.fileShow = false;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(changeNavSept),
        b: common_vendor.p({
          list: mainLetterList,
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
          itemStyle: "padding-left: 30rpx; padding-right: 30rpx; height: 96rpx;",
          current: state.navSept - 1
        }),
        c: state.navSept == 1
      }, state.navSept == 1 ? {
        d: common_vendor.f(state["mainInfosystem"], (item, k0, i0) => {
          return {
            a: common_vendor.o(($event) => handleCellFile(item)),
            b: "78e17f75-1-" + i0,
            c: common_vendor.p({
              cellConfig: item
            })
          };
        })
      } : {}, {
        e: state.navSept == 2
      }, state.navSept == 2 ? {
        f: common_vendor.f(state["mainInfocreater"], (item, k0, i0) => {
          return {
            a: common_vendor.o(($event) => handleCellFile(item)),
            b: "78e17f75-2-" + i0,
            c: common_vendor.p({
              cellConfig: item
            })
          };
        })
      } : {}, {
        g: state.navSept == 3
      }, state.navSept == 3 ? {
        h: common_vendor.f(state["mainInfosigner"], (item, k0, i0) => {
          return {
            a: common_vendor.o(($event) => handleCellFile(item)),
            b: "78e17f75-3-" + i0,
            c: common_vendor.p({
              cellConfig: item
            })
          };
        })
      } : {}, {
        i: state.fileShow
      }, state.fileShow ? {
        j: common_vendor.unref(fileUrl)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/taskLetter/taskLetter.vue"]]);
my.createPage(MiniProgramPage);
