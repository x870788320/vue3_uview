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
  const _easycom_treeMenu2 = common_vendor.resolveComponent("treeMenu");
  _easycom_treeMenu2();
}
const _easycom_treeMenu = () => Promise.resolve().then(() => RDovcHJvamVjdHMvd29yay9hcHBsZXQvdnVlM191dmlld19wbHVzL2NvbXBvbmVudHMvdHJlZU1lbnUvdHJlZU1lbnUudnVl);
if (!Math) {
  _easycom_treeMenu();
}
const _sfc_main = {
  __name: "treeMenu",
  props: {
    nodes: "",
    isChild: "",
    parTreeId: "",
    callData: ""
  },
  setup(__props) {
    const props = __props;
    store_index.useIndexStore();
    const state = common_vendor.reactive({
      searchText: ""
    });
    const filterNodesByName = () => {
      if (!props.nodes || !props.nodes.length)
        return [];
      return props.nodes.map((item, index) => {
        item.treeId = props.parTreeId ? `${props.parTreeId}_${index + 1}` : index + 1;
        state[`showChildren_${item.treeId}`] = false;
        return item;
      }).filter((node) => node.name.toLowerCase().includes(state.searchText.toLowerCase()));
    };
    const filteredNodes = common_vendor.computed(() => filterNodesByName());
    const treeItemClick = (node, treeId) => {
      console.log(node);
      console.log(treeId);
      node.expanded = !node.expanded;
      state[`showChildren_${node.treeId}`] = Array.isArray(node.children) && node.children.length > 0 && node.expanded;
      if (Array.isArray(node.children) && node.children.length > 0)
        return;
      let str = JSON.stringify({ node, callData: JSON.parse(props.callData) });
      common_vendor.index.$emit("selectBranch", str);
      common_vendor.index.$u.route({
        type: "back"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !__props.isChild
      }, !__props.isChild ? {
        b: state.searchText,
        c: common_vendor.o(($event) => state.searchText = $event.detail.value)
      } : {}, {
        d: common_vendor.f(common_vendor.unref(filteredNodes), (node, index, i0) => {
          return {
            a: `/static/icon/tree/${Array.isArray(node.children) && node.children.length > 0 ? "tree-expand" : "tree-retract"}.png`,
            b: common_vendor.t(node.name),
            c: common_vendor.o(($event) => treeItemClick(node, index + 1)),
            d: "fff43116-0-" + i0,
            e: common_vendor.p({
              nodes: node.children,
              isChild: true,
              parTreeId: node.treeId,
              callData: __props.callData
            }),
            f: state[`showChildren_${node.treeId}`],
            g: node.id
          };
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/projects/work/applet/vue3_uview_plus/components/treeMenu/treeMenu.vue"]]);
my.createComponent(Component);
const RDovcHJvamVjdHMvd29yay9hcHBsZXQvdnVlM191dmlld19wbHVzL2NvbXBvbmVudHMvdHJlZU1lbnUvdHJlZU1lbnUudnVl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
