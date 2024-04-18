"use strict";
const common_vendor = require("../common/vendor.js");
const interface_index = require("../interface/index.js");
const useKnowStore = common_vendor.defineStore("Know", {
  state: () => {
    return {
      userArchives: {},
      // 个人档案
      resps: [],
      // 安全责任制
      respsCreat: [],
      // 安全责任制 发起人
      respsSign: []
      // 安全责任制 签订人
    };
  },
  actions: {
    // 获取用户档案
    async getUserArchives() {
      const archives = await interface_index.requestPersonInfo().then((r) => r).catch((e) => e);
      if (archives.data || archives.data.t) {
        this.userArchives = archives.data.t.user || {};
        this.userArchives.suwList = archives.data.t.suwList || [];
      }
    },
    // 获取安全责任体系数据
    async getSafeRespsData(params) {
      const resps = await interface_index.requestResps(params).then((r) => r).catch((e) => e);
      console.log(resps);
      if (resps.data || resps.data.t) {
        this.resps = resps.data.t.content || [];
      }
    },
    // 获取安全责任体系发起人
    async getRespCteatData(params) {
      const respCteat = await interface_index.requestRespCteat(params).then((r) => r).catch((e) => e);
      console.log(respCteat);
      if (respCteat.data || respCteat.data.t) {
        this.respsCreat = respCteat.data.t.content || [];
      }
    },
    // 获取安全责任体系签订人
    async getRespSignData(params) {
      const respSign = await interface_index.requestRespSign(params).then((r) => r).catch((e) => e);
      console.log(respSign);
      if (respSign.data || respSign.data.t) {
        this.respsSign = respSign.data.t.content || [];
      }
    }
  }
});
exports.useKnowStore = useKnowStore;
