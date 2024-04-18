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
  const _easycom_u_index_anchor2 = common_vendor.resolveComponent("u-index-anchor");
  const _easycom_u_index_item2 = common_vendor.resolveComponent("u-index-item");
  const _easycom_u_index_list2 = common_vendor.resolveComponent("u-index-list");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_easycom_u_index_anchor2 + _easycom_u_index_item2 + _easycom_u_index_list2 + _easycom_u_popup2)();
}
const _easycom_u_index_anchor = () => "../../uni_modules/uview-plus/components/u-index-anchor/u-index-anchor.js";
const _easycom_u_index_item = () => "../../uni_modules/uview-plus/components/u-index-item/u-index-item.js";
const _easycom_u_index_list = () => "../../uni_modules/uview-plus/components/u-index-list/u-index-list.js";
const _easycom_u_popup = () => "../../uni_modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_u_index_anchor + _easycom_u_index_item + _easycom_u_index_list + _easycom_u_popup)();
}
const _sfc_main = {
  __name: "userList",
  setup(__props, { expose }) {
    store_index.useIndexStore();
    const state = common_vendor.reactive({
      userListShow: false,
      indexList: ["A", "B", "C"],
      itemArr: [
        ["列表A1", "列表A2", "列表A3"],
        ["列表B1", "列表B2", "列表B3"],
        ["列表C1", "列表C2", "列表C3"]
      ]
      // indexList: ["A", "B", "C", "D", "E", "F","G", "H", "I","J", "K", "L","M", "N", "O",],
      // itemArr: [
      // 	['列表A1','列表A2','列表A3'],
      // 	['列表B1','列表B2','列表B3'],
      // 	['列表C1','列表C2','列表C3'],
      // 	['列表C1','列表C2','列表C3'],
      // 	['列表C1','列表C2','列表C3'],
      // 	['列表C1','列表C2','列表C3'],
      // 	['列表C1','列表C2','列表C3'],
      // 	['列表C1','列表C2','列表C3'],
      // 	['列表C1','列表C2','列表C3'],
      // 	['列表C1','列表C2','列表C3'],
      // 	['列表C1','列表C2','列表C3'],
      // 	['列表C1','列表C2','列表C3'],
      // 	['列表C1','列表C2','列表C3'],
      // 	['列表C1','列表C2','列表C3'],
      // 	['列表C1','列表C2','列表C3'],
      // ]
    });
    const handleUserList = (config) => {
      console.log(config);
      console.log(1111111);
      state.userListShow = !state.userListShow;
    };
    const handleUser = (obj) => {
      state.userListShow = false;
    };
    const open = () => {
      console.log(222211);
    };
    expose({ handleUserList });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(state.itemArr, (item, index, i0) => {
          return {
            a: "c37ecce9-3-" + i0 + "," + ("c37ecce9-2-" + i0),
            b: common_vendor.p({
              text: state.indexList[index]
            }),
            c: common_vendor.f(item, (cell, index2, i1) => {
              return {
                a: common_vendor.t(cell),
                b: common_vendor.o(($event) => handleUser())
              };
            }),
            d: "c37ecce9-2-" + i0 + ",c37ecce9-1"
          };
        }),
        b: common_vendor.p({
          ["index-list"]: state.indexList,
          customNavHeight: 200
        }),
        c: state.userListShow,
        d: common_vendor.o(($event) => state.userListShow = false),
        e: common_vendor.o(open),
        f: common_vendor.p({
          show: state.userListShow
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c37ecce9"], ["__file", "D:/projects/work/applet/vue3_uview_plus/components/userList/userList.vue"]]);
my.createComponent(Component);
