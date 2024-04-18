"use strict";
const uni_modules_uviewPlus_libs_config_props = require("../../libs/config/props.js");
const props = {
  props: {
    // 右边锚点非激活的颜色
    inactiveColor: {
      type: String,
      default: uni_modules_uviewPlus_libs_config_props.defprops.indexList.inactiveColor
    },
    // 右边锚点激活的颜色
    activeColor: {
      type: String,
      default: uni_modules_uviewPlus_libs_config_props.defprops.indexList.activeColor
    },
    // 索引字符列表，数组形式
    indexList: {
      type: Array,
      default: uni_modules_uviewPlus_libs_config_props.defprops.indexList.indexList
    },
    // 是否开启锚点自动吸顶
    sticky: {
      type: Boolean,
      default: uni_modules_uviewPlus_libs_config_props.defprops.indexList.sticky
    },
    // 自定义导航栏的高度
    customNavHeight: {
      type: [String, Number],
      default: uni_modules_uviewPlus_libs_config_props.defprops.indexList.customNavHeight
    }
  }
};
exports.props = props;
