"use strict";
const uni_modules_uviewPlus_libs_config_props = require("../../libs/config/props.js");
const props = {
  props: {
    // 到顶部的距离
    top: {
      type: [String, Number],
      default: uni_modules_uviewPlus_libs_config_props.defprops.notify.top
    },
    // 是否展示组件
    // show: {
    // 	type: Boolean,
    // 	default: defprops.notify.show
    // },
    // type主题，primary，success，warning，error
    type: {
      type: String,
      default: uni_modules_uviewPlus_libs_config_props.defprops.notify.type
    },
    // 字体颜色
    color: {
      type: String,
      default: uni_modules_uviewPlus_libs_config_props.defprops.notify.color
    },
    // 背景颜色
    bgColor: {
      type: String,
      default: uni_modules_uviewPlus_libs_config_props.defprops.notify.bgColor
    },
    // 展示的文字内容
    message: {
      type: String,
      default: uni_modules_uviewPlus_libs_config_props.defprops.notify.message
    },
    // 展示时长，为0时不消失，单位ms
    duration: {
      type: [String, Number],
      default: uni_modules_uviewPlus_libs_config_props.defprops.notify.duration
    },
    // 字体大小
    fontSize: {
      type: [String, Number],
      default: uni_modules_uviewPlus_libs_config_props.defprops.notify.fontSize
    },
    // 是否留出顶部安全距离（状态栏高度）
    safeAreaInsetTop: {
      type: Boolean,
      default: uni_modules_uviewPlus_libs_config_props.defprops.notify.safeAreaInsetTop
    }
  }
};
exports.props = props;
