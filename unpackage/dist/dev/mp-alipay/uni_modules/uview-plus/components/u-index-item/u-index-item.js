"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uviewPlus_components_uIndexItem_props = require("./props.js");
const uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
require("../../libs/config/props/datetimePicker.js");
require("../../libs/config/props/icon.js");
require("../../libs/config/config.js");
require("../../libs/config/props/link.js");
require("../../libs/config/props/loadingIcon.js");
require("../../libs/config/props/navbar.js");
require("../../libs/config/color.js");
const _sfc_main = {
  name: "u-index-item",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_libs_mixin_mixin.mixin, uni_modules_uviewPlus_components_uIndexItem_props.props],
  data() {
    return {
      // 本组件到滚动条顶部的距离
      top: 0,
      height: 0,
      id: ""
    };
  },
  created() {
    this.anchor = {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getParentData("u-index-list");
      if (!this.parent) {
        return common_vendor.index.$u.error("u-index-item必须要搭配u-index-list组件使用");
      }
      common_vendor.index.$u.sleep().then(() => {
        this.getIndexItemRect().then((size) => {
          this.top = Math.ceil(size.top);
          this.height = Math.ceil(size.height);
        });
      });
    },
    getIndexItemRect() {
      return new Promise((resolve) => {
        this.$uGetRect(".u-index-item").then((size) => {
          resolve(size);
        });
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: `u-index-item-${$data.id}`,
    b: common_vendor.n(`u-index-item-${$data.id}`)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-83b92c70"], ["__file", "D:/projects/work/applet/vue3_uview_plus/uni_modules/uview-plus/components/u-index-item/u-index-item.vue"]]);
my.createComponent(Component);
