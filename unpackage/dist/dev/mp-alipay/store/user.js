"use strict";
const common_vendor = require("../common/vendor.js");
const utils_storage_user_storage = require("../utils/storage/user_storage.js");
const useUserStore = common_vendor.defineStore("User", {
  state: () => {
    return {
      token: utils_storage_user_storage.GET_STORAGE("TOKEN") || "",
      user: utils_storage_user_storage.GET_STORAGE("USER") || "{}"
    };
  },
  actions: {
    //获取用户信息
    updateUserInfo(info) {
      if (info) {
        utils_storage_user_storage.SET_STORAGE("USER", info);
      }
    },
    //获取token
    updateToken(token) {
      if (token) {
        utils_storage_user_storage.SET_STORAGE("TOKEN", token);
      }
    },
    //退出登录
    userLogout() {
      this.token = "";
      this.info = {};
      REMOVE_TOKEN();
      REMOVE_INFO();
    }
    //设置active的值
    // setActive(active) {
    //   this.activeTab = active;
    // },
  }
});
exports.useUserStore = useUserStore;
