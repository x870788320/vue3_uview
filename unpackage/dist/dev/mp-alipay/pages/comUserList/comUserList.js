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
  const _easycom_u_search2 = common_vendor.resolveComponent("u-search");
  const _easycom_u_index_anchor2 = common_vendor.resolveComponent("u-index-anchor");
  const _easycom_u_index_item2 = common_vendor.resolveComponent("u-index-item");
  const _easycom_u_index_list2 = common_vendor.resolveComponent("u-index-list");
  (_easycom_u_search2 + _easycom_u_index_anchor2 + _easycom_u_index_item2 + _easycom_u_index_list2)();
}
const _easycom_u_search = () => "../../uni_modules/uview-plus/components/u-search/u-search.js";
const _easycom_u_index_anchor = () => "../../uni_modules/uview-plus/components/u-index-anchor/u-index-anchor.js";
const _easycom_u_index_item = () => "../../uni_modules/uview-plus/components/u-index-item/u-index-item.js";
const _easycom_u_index_list = () => "../../uni_modules/uview-plus/components/u-index-list/u-index-list.js";
if (!Math) {
  (_easycom_u_search + _easycom_u_index_anchor + _easycom_u_index_item + _easycom_u_index_list)();
}
const _sfc_main = {
  __name: "comUserList",
  props: {
    callData: ""
  },
  emits: ["handleHeaderNav"],
  setup(__props, { emit }) {
    const props = __props;
    const store = store_index.useIndexStore();
    const state = common_vendor.reactive({
      userListShow: false,
      indexList: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ],
      itemArr: [
        [{
          "deptName": "安全环保部",
          "id": 101,
          "job": "安全管理员",
          "name": "李晓鹏",
          "phone": "13306466080",
          "post": "安全环保部",
          "shortName": "L"
        }, {
          "deptName": "安全环保部",
          "id": 101,
          "job": "安全管理员",
          "name": "李晓鹏",
          "phone": "13306466080",
          "post": "安全环保部",
          "shortName": "L"
        }, {
          "deptName": "安全环保部",
          "id": 101,
          "job": "安全管理员",
          "name": "李晓鹏",
          "phone": "13306466080",
          "post": "安全环保部",
          "shortName": "L"
        }],
        [{
          "deptName": "安全环保部",
          "id": 101,
          "job": "安全管理员",
          "name": "李晓鹏",
          "phone": "13306466080",
          "post": "安全环保部",
          "shortName": "B"
        }, {
          "deptName": "安全环保部",
          "id": 101,
          "job": "安全管理员",
          "name": "李晓鹏",
          "phone": "13306466080",
          "post": "安全环保部",
          "shortName": "L"
        }, {
          "deptName": "安全环保部",
          "id": 101,
          "job": "安全管理员",
          "name": "李晓鹏",
          "phone": "13306466080",
          "post": "安全环保部",
          "shortName": "L"
        }]
      ],
      searchUserStr: "",
      nodes: {}
    });
    const getUsersList = async (id) => {
      await store.setAllStaff();
      formatNodes();
    };
    getUsersList();
    const formatNodes = (filterObj = {}) => {
      let nodeObj = {};
      let showStaff = store.allStaff;
      if (filterObj.name) {
        showStaff = showStaff.filter((item) => item.name.includes(filterObj.name));
      }
      if (filterObj.deptName) {
        showStaff = showStaff.filter((item) => item.deptName.includes(filterObj.deptName));
      }
      showStaff.map((item) => {
        nodeObj[item.shortName] ? nodeObj[item.shortName].push(item) : nodeObj[item.shortName] = [item];
      });
      state.indexList = Object.keys(nodeObj).sort();
      state.nodes = state.indexList.map((key) => nodeObj[key]);
    };
    const handleUser = (obj) => {
      obj.callData = JSON.parse(props.callData);
      common_vendor.index.$emit("selectStaff", JSON.stringify(obj));
      common_vendor.index.$u.route({
        type: "back"
      });
    };
    const searchUser = () => {
      formatNodes({ name: state.searchUserStr });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => searchUser()),
        b: common_vendor.o(($event) => state.searchUserStr = $event),
        c: common_vendor.p({
          placeholder: "请输入姓名搜索",
          showAction: false,
          bgColor: "#fff",
          modelValue: state.searchUserStr
        }),
        d: common_vendor.f(state.nodes, (item, index, i0) => {
          return {
            a: "b4ac0d12-3-" + i0 + "," + ("b4ac0d12-2-" + i0),
            b: common_vendor.p({
              text: state.indexList[index],
              bgColor: "#F2F3F8"
            }),
            c: common_vendor.f(item, (cell, index2, i1) => {
              return {
                a: common_vendor.t(cell.name),
                b: common_vendor.t(cell.deptName),
                c: common_vendor.t(cell.post),
                d: common_vendor.t(cell.job),
                e: common_vendor.o(($event) => handleUser(cell))
              };
            }),
            d: "b4ac0d12-2-" + i0 + ",b4ac0d12-1"
          };
        }),
        e: common_vendor.p({
          ["index-list"]: state.indexList
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b4ac0d12"], ["__file", "D:/projects/work/applet/vue3_uview_plus/pages/comUserList/comUserList.vue"]]);
my.createPage(MiniProgramPage);
