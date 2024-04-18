"use strict";
const common_vendor = require("../common/vendor.js");
const interface_constant = require("../interface/constant.js");
const _toString = Object.prototype.toString;
const toRawType = (value) => _toString.call(value).slice(8, -1);
const formatParams = (params) => {
  if (params) {
    let url = "?";
    for (const propName of Object.keys(params)) {
      const value = params[propName];
      let part = encodeURIComponent(propName) + "=";
      if (value !== null && typeof value !== "undefined") {
        if (typeof value === "object") {
          for (const key of Object.keys(value)) {
            if (value[key] !== null && typeof value[key] !== "undefined") {
              let params2 = propName + "[" + key + "]";
              let subPart = encodeURIComponent(params2) + "=";
              url += subPart + encodeURIComponent(value[key]) + "&";
            }
          }
        } else {
          url += part + encodeURIComponent(value) + "&";
        }
      }
    }
    return url.slice(0, -1);
  } else {
    return "";
  }
};
const formatNum = (n) => n.toString()[1] ? n : "0" + n;
const weekDays = ["Mon.", "Tues.", "Wed.", "Thur.", "Fri.", "Sat.", "Sun."];
const formatDate = (time) => {
  let date = time ? new Date(time) : /* @__PURE__ */ new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let weekDay = weekDays[date.getDay() - 1];
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  return [year, [month, day].map(formatNum).join("-"), weekDay, [hour, minute].map(formatNum).join(":"), formatNum(second)];
};
const getTiming = (num) => {
  let minute = Math.floor(num / 60);
  let sec = num % 60;
  return `${formatNum(minute)}:${formatNum(sec)}`;
};
const openDocment = (path) => {
  if (!path)
    return;
  let url = `${interface_constant.BASE_FILE_URL}${path}`;
  let fileType = url.split(".").pop();
  common_vendor.index.downloadFile({
    url,
    success: function(res) {
      let filePath = res.tempFilePath;
      setTimeout(
        () => {
          console.log(33333);
          common_vendor.index.openDocument({
            filePath: encodeURI(filePath),
            fileType,
            showMenu: false,
            success: function() {
              console.log("打开文档成功");
            },
            fail: function(e) {
              console.log(e);
            }
          });
        },
        1e3
      );
    }
  });
};
const getFileType = (fileName) => {
  let suffix = "";
  let result = "";
  if (!fileName)
    return false;
  try {
    suffix = fileName.substr(fileName.lastIndexOf(".") + 1, fileName.length);
    suffix = suffix.toLowerCase();
  } catch (err) {
    suffix = "";
  }
  if (!suffix) {
    return false;
  }
  const fileTypeList = [
    // 图片类型
    { typeName: "image", types: ["png", "jpg", "jpeg", "bmp", "gif"] },
    // 文本类型
    { typeName: "txt", types: ["txt"] },
    // excel类型
    { typeName: "excel", types: ["xls", "xlsx"] },
    { typeName: "word", types: ["doc", "docx"] },
    { typeName: "pdf", types: ["pdf"] },
    { typeName: "ppt", types: ["ppt", "pptx"] },
    // 视频类型
    { typeName: "video", types: ["mp4", "m2v", "mkv", "rmvb", "wmv", "avi", "flv", "mov", "m4v"] },
    // 音频
    { typeName: "radio", types: ["mp3", "wav", "wmv"] },
    // 链接
    { typeName: "link", types: ["html"] }
  ];
  for (let i = 0; i < fileTypeList.length; i++) {
    const fileTypeItem = fileTypeList[i];
    const typeName = fileTypeItem.typeName;
    const types = fileTypeItem.types;
    result = types.some(function(item) {
      return item === suffix;
    });
    if (result) {
      return typeName;
    }
  }
  return "other";
};
const orderCode = (str) => {
  let arr = str.split("");
  let sortArr = arr.sort((v1, v2) => v1.charCodeAt() - v2.charCodeAt());
  return sortArr.join("");
};
exports.formatDate = formatDate;
exports.formatParams = formatParams;
exports.getFileType = getFileType;
exports.getTiming = getTiming;
exports.openDocment = openDocment;
exports.orderCode = orderCode;
exports.toRawType = toRawType;
