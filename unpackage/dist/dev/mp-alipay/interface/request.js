"use strict";
const common_vendor = require("../common/vendor.js");
const interface_constant = require("./constant.js");
const store_user = require("../store/user.js");
const utils_index = require("../utils/index.js");
const utils_storage_user_storage = require("../utils/storage/user_storage.js");
const notFormParams = ["morningMeeting"];
const setRequestConfig = () => {
  common_vendor.index.$u.http.setConfig((config) => {
    config.baseURL = interface_constant.BASE_URL;
    return config;
  });
  common_vendor.index.$u.http.interceptors.request.use(
    (config) => {
      console.log(config);
      let token = utils_storage_user_storage.GET_STORAGE("TOKEN");
      if (token) {
        config.header.Authorization = `Bearer ${token}`;
        config.header.token = `${token}`;
      }
      if (config.method == "POST" && !notFormParams.some((str) => config.url.includes(str))) {
        config.header["Content-Type"] = "application/x-www-form-urlencoded";
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  common_vendor.index.$u.http.interceptors.response.use(
    (response) => {
      if (response.data.code == 401) {
        common_vendor.index.$showMsg("请登录");
        store_user.useUserStore().userLogout();
        setTimeout(() => {
          common_vendor.index.switchTab({
            url: "/pages/my/my"
          });
        }, 1e3);
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
const uploadForm = (url, data = {}) => new Promise((resolve, reject) => {
  url = `${interface_constant.BASE_URL}${url}`;
  console.log(utils_index.getFileType(data.filePath));
  let header = {};
  let token = utils_storage_user_storage.GET_STORAGE("TOKEN");
  header["Authorization"] = `Bearer ${token}`;
  header["token"] = `${token}`;
  header["Content-Type"] = "multipart/form-data";
  common_vendor.index.uploadFile({
    url,
    //仅为示例，非真实的接口地址
    filePath: data.filePath,
    fileType: utils_index.getFileType(data.filePath),
    name: "file",
    header,
    success: (res) => {
      resolve(res);
    }
  });
});
exports.setRequestConfig = setRequestConfig;
exports.uploadForm = uploadForm;
