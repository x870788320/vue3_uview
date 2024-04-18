"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uviewPlus_components_uNotify_props = require("./props.js");
const uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
require("../../libs/config/props.js");
require("../../libs/config/props/actionSheet.js");
require("../../libs/config/props/album.js");
require("../../libs/config/props/alert.js");
require("../../libs/config/props/avatar.js");
require("../../libs/config/props/avatarGroup.js");
require("../../libs/config/props/backtop.js");
require("../../libs/config/props/badge.js");
require("../../libs/config/props/button.js");
require("../../libs/config/props/calendar.js");
require("../../libs/config/props/carKeyboard.js");
require("../../libs/config/props/cell.js");
require("../../libs/config/props/cellGroup.js");
require("../../libs/config/props/checkbox.js");
require("../../libs/config/props/checkboxGroup.js");
require("../../libs/config/props/circleProgress.js");
require("../../libs/config/props/code.js");
require("../../libs/config/props/codeInput.js");
require("../../libs/config/props/col.js");
require("../../libs/config/props/collapse.js");
require("../../libs/config/props/collapseItem.js");
require("../../libs/config/props/columnNotice.js");
require("../../libs/config/props/countDown.js");
require("../../libs/config/props/countTo.js");
require("../../libs/config/props/datetimePicker.js");
require("../../libs/config/props/divider.js");
require("../../libs/config/props/empty.js");
require("../../libs/config/props/form.js");
require("../../libs/config/props/formItem.js");
require("../../libs/config/props/gap.js");
require("../../libs/config/props/grid.js");
require("../../libs/config/props/gridItem.js");
require("../../libs/config/props/icon.js");
require("../../libs/config/config.js");
require("../../libs/config/props/image.js");
require("../../libs/config/props/indexAnchor.js");
require("../../libs/config/props/indexList.js");
require("../../libs/config/props/input.js");
require("../../libs/config/props/keyboard.js");
require("../../libs/config/props/line.js");
require("../../libs/config/props/lineProgress.js");
require("../../libs/config/props/link.js");
require("../../libs/config/props/list.js");
require("../../libs/config/props/listItem.js");
require("../../libs/config/props/loadingIcon.js");
require("../../libs/config/props/loadingPage.js");
require("../../libs/config/props/loadmore.js");
require("../../libs/config/props/modal.js");
require("../../libs/config/props/navbar.js");
require("../../libs/config/color.js");
require("../../libs/config/props/noNetwork.js");
require("../../libs/config/props/noticeBar.js");
require("../../libs/config/props/notify.js");
require("../../libs/config/props/numberBox.js");
require("../../libs/config/props/numberKeyboard.js");
require("../../libs/config/props/overlay.js");
require("../../libs/config/props/parse.js");
require("../../libs/config/props/picker.js");
require("../../libs/config/props/popup.js");
require("../../libs/config/props/radio.js");
require("../../libs/config/props/radioGroup.js");
require("../../libs/config/props/rate.js");
require("../../libs/config/props/readMore.js");
require("../../libs/config/props/row.js");
require("../../libs/config/props/rowNotice.js");
require("../../libs/config/props/scrollList.js");
require("../../libs/config/props/search.js");
require("../../libs/config/props/section.js");
require("../../libs/config/props/skeleton.js");
require("../../libs/config/props/slider.js");
require("../../libs/config/props/statusBar.js");
require("../../libs/config/props/steps.js");
require("../../libs/config/props/stepsItem.js");
require("../../libs/config/props/sticky.js");
require("../../libs/config/props/subsection.js");
require("../../libs/config/props/swipeAction.js");
require("../../libs/config/props/swipeActionItem.js");
require("../../libs/config/props/swiper.js");
require("../../libs/config/props/swipterIndicator.js");
require("../../libs/config/props/switch.js");
require("../../libs/config/props/tabbar.js");
require("../../libs/config/props/tabbarItem.js");
require("../../libs/config/props/tabs.js");
require("../../libs/config/props/tag.js");
require("../../libs/config/props/text.js");
require("../../libs/config/props/textarea.js");
require("../../libs/config/props/toast.js");
require("../../libs/config/props/toolbar.js");
require("../../libs/config/props/tooltip.js");
require("../../libs/config/props/transition.js");
require("../../libs/config/props/upload.js");
const _sfc_main = {
  name: "u-notify",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_libs_mixin_mixin.mixin, uni_modules_uviewPlus_components_uNotify_props.props],
  data() {
    return {
      // 是否展示组件
      open: false,
      timer: null,
      config: {
        // 到顶部的距离
        top: common_vendor.index.$u.props.notify.top,
        // type主题，primary，success，warning，error
        type: common_vendor.index.$u.props.notify.type,
        // 字体颜色
        color: common_vendor.index.$u.props.notify.color,
        // 背景颜色
        bgColor: common_vendor.index.$u.props.notify.bgColor,
        // 展示的文字内容
        message: common_vendor.index.$u.props.notify.message,
        // 展示时长，为0时不消失，单位ms
        duration: common_vendor.index.$u.props.notify.duration,
        // 字体大小
        fontSize: common_vendor.index.$u.props.notify.fontSize,
        // 是否留出顶部安全距离（状态栏高度）
        safeAreaInsetTop: common_vendor.index.$u.props.notify.safeAreaInsetTop
      },
      // 合并后的配置，避免多次调用组件后，可能会复用之前使用的配置参数
      tmpConfig: {}
    };
  },
  computed: {
    containerStyle() {
      let top = 0;
      if (this.tmpConfig.top === 0)
        ;
      const style = {
        top: common_vendor.index.$u.addUnit(this.tmpConfig.top === 0 ? top : this.tmpConfig.top),
        // 因为组件底层为u-transition组件，必须将其设置为fixed定位
        // 让其出现在导航栏底部
        position: "fixed",
        left: 0,
        right: 0,
        zIndex: 10076
      };
      return style;
    },
    // 组件背景颜色
    backgroundColor() {
      const style = {};
      if (this.tmpConfig.bgColor) {
        style.backgroundColor = this.tmpConfig.bgColor;
      }
      return style;
    },
    // 默认主题下的图标
    icon() {
      let icon;
      if (this.tmpConfig.type === "success") {
        icon = "checkmark-circle";
      } else if (this.tmpConfig.type === "error") {
        icon = "close-circle";
      } else if (this.tmpConfig.type === "warning") {
        icon = "error-circle";
      }
      return icon;
    }
  },
  created() {
    ["primary", "success", "error", "warning"].map((item) => {
      this[item] = (message) => this.show({
        type: item,
        message
      });
    });
  },
  methods: {
    show(options) {
      this.tmpConfig = common_vendor.index.$u.deepMerge(this.config, options);
      this.clearTimer();
      this.open = true;
      if (this.tmpConfig.duration > 0) {
        this.timer = setTimeout(() => {
          this.open = false;
          this.clearTimer();
          typeof this.tmpConfig.complete === "function" && this.tmpConfig.complete();
        }, this.tmpConfig.duration);
      }
    },
    // 关闭notify
    close() {
      this.clearTimer();
    },
    clearTimer() {
      this.open = false;
      clearTimeout(this.timer);
      this.timer = null;
    }
  },
  beforeDestroy() {
    this.clearTimer();
  }
};
if (!Array) {
  const _easycom_u_status_bar2 = common_vendor.resolveComponent("u-status-bar");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_transition2 = common_vendor.resolveComponent("u-transition");
  (_easycom_u_status_bar2 + _easycom_u_icon2 + _easycom_u_transition2)();
}
const _easycom_u_status_bar = () => "../u-status-bar/u-status-bar.js";
const _easycom_u_icon = () => "../u-icon/u-icon.js";
const _easycom_u_transition = () => "../u-transition/u-transition.js";
if (!Math) {
  (_easycom_u_status_bar + _easycom_u_icon + _easycom_u_transition)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.tmpConfig.safeAreaInsetTop
  }, $data.tmpConfig.safeAreaInsetTop ? {} : {}, {
    b: ["success", "warning", "error"].includes($data.tmpConfig.type)
  }, ["success", "warning", "error"].includes($data.tmpConfig.type) ? {
    c: common_vendor.p({
      name: $data.tmpConfig.icon,
      color: $data.tmpConfig.color,
      size: 1.3 * $data.tmpConfig.fontSize,
      customStyle: {
        marginRight: "4px"
      }
    })
  } : {}, {
    d: common_vendor.t($data.tmpConfig.message),
    e: _ctx.$u.addUnit($data.tmpConfig.fontSize),
    f: $data.tmpConfig.color,
    g: common_vendor.n(`u-notify--${$data.tmpConfig.type}`),
    h: common_vendor.s($options.backgroundColor),
    i: common_vendor.s(_ctx.$u.addStyle(_ctx.customStyle)),
    j: common_vendor.p({
      mode: "slide-down",
      customStyle: $options.containerStyle,
      show: $data.open
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-67836363"], ["__file", "D:/projects/work/applet/vue3_uview_plus/uni_modules/uview-plus/components/u-notify/u-notify.vue"]]);
my.createComponent(Component);
