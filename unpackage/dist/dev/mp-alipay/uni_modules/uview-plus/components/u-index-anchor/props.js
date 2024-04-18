"use strict";
const uni_modules_uviewPlus_libs_config_props = require("../../libs/config/props.js");
const props = {
  props: {
    // 列表锚点文本内容
    text: {
      type: [String, Number],
      default: uni_modules_uviewPlus_libs_config_props.defprops.indexAnchor.text
    },
    // 列表锚点文字颜色
    color: {
      type: String,
      default: uni_modules_uviewPlus_libs_config_props.defprops.indexAnchor.color
    },
    // 列表锚点文字大小，单位默认px
    size: {
      type: [String, Number],
      default: uni_modules_uviewPlus_libs_config_props.defprops.indexAnchor.size
    },
    // 列表锚点背景颜色
    bgColor: {
      type: String,
      default: uni_modules_uviewPlus_libs_config_props.defprops.indexAnchor.bgColor
    },
    // 列表锚点高度，单位默认px
    height: {
      type: [String, Number],
      default: uni_modules_uviewPlus_libs_config_props.defprops.indexAnchor.height
    }
  }
};
exports.props = props;
