"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_index = require("../index.js");
const SET_STORAGE = (key, val) => {
  let type = utils_index.toRawType(val);
  if (type == "Object" || type == "Array") {
    val = "ISJSON_" + JSON.stringify(val);
  }
  common_vendor.index.setStorageSync(key, val);
};
const GET_STORAGE = (key) => {
  let val = common_vendor.index.getStorageSync(key);
  if (!val)
    return null;
  let isJsonStr = val.slice(0, 7);
  if (isJsonStr === "ISJSON_") {
    val = JSON.parse(val.slice(7, val.length));
  }
  return val;
};
exports.GET_STORAGE = GET_STORAGE;
exports.SET_STORAGE = SET_STORAGE;
