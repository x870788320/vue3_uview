"use strict";
const uni_modules_uviewPlus_libs_config_props = require("../../libs/config/props.js");
const props = {
  props: {
    // radio的名称
    name: {
      type: [String, Number, Boolean],
      default: uni_modules_uviewPlus_libs_config_props.defprops.radio.name
    },
    // 形状，square为方形，circle为圆型
    shape: {
      type: String,
      default: uni_modules_uviewPlus_libs_config_props.defprops.radio.shape
    },
    // 是否禁用
    disabled: {
      type: [String, Boolean],
      default: uni_modules_uviewPlus_libs_config_props.defprops.radio.disabled
    },
    // 是否禁止点击提示语选中单选框
    labelDisabled: {
      type: [String, Boolean],
      default: uni_modules_uviewPlus_libs_config_props.defprops.radio.labelDisabled
    },
    // 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
    activeColor: {
      type: String,
      default: uni_modules_uviewPlus_libs_config_props.defprops.radio.activeColor
    },
    // 未选中的颜色
    inactiveColor: {
      type: String,
      default: uni_modules_uviewPlus_libs_config_props.defprops.radio.inactiveColor
    },
    // 图标的大小，单位px
    iconSize: {
      type: [String, Number],
      default: uni_modules_uviewPlus_libs_config_props.defprops.radio.iconSize
    },
    // label的字体大小，px单位
    labelSize: {
      type: [String, Number],
      default: uni_modules_uviewPlus_libs_config_props.defprops.radio.labelSize
    },
    // label提示文字，因为nvue下，直接slot进来的文字，由于特殊的结构，无法修改样式
    label: {
      type: [String, Number],
      default: uni_modules_uviewPlus_libs_config_props.defprops.radio.label
    },
    // 整体的大小
    size: {
      type: [String, Number],
      default: uni_modules_uviewPlus_libs_config_props.defprops.radio.size
    },
    // 图标颜色
    color: {
      type: String,
      default: uni_modules_uviewPlus_libs_config_props.defprops.radio.color
    },
    // label的颜色
    labelColor: {
      type: String,
      default: uni_modules_uviewPlus_libs_config_props.defprops.radio.labelColor
    },
    // 图标颜色
    iconColor: {
      type: String,
      default: uni_modules_uviewPlus_libs_config_props.defprops.radio.iconColor
    }
  }
};
exports.props = props;
