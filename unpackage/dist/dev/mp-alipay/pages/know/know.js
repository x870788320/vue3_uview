"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
const store_user = require("../../store/user.js");
const store_know = require("../../store/know.js");
const interface_constant = require("../../interface/constant.js");
const utils_storage_user_storage = require("../../utils/storage/user_storage.js");
require("../../interface/index.js");
require("../../interface/request.js");
require("../../utils/index.js");
const _sfc_main = {
  __name: "know",
  setup(__props) {
    store_index.useIndexStore();
    const userStore = store_user.useUserStore();
    const konwStore = store_know.useKnowStore();
    console.log(utils_storage_user_storage.GET_STORAGE("USER"));
    const user = utils_storage_user_storage.GET_STORAGE("USER") || {};
    common_vendor.reactive({
      // postId: 1,
    });
    console.log(userStore.user.job);
    console.log(userStore.user);
    const postList = [
      { id: 1, title: "公司", key: "company" },
      { id: 2, title: "部门", key: "deptName" },
      { id: 3, title: "班组", key: "post" },
      { id: 4, title: "岗位", key: "job" }
    ];
    const mainKnowList = [
      { id: 1, title: "岗位职责", icon: "a-Group1308", key: "岗位职责", inter: "Post" },
      { id: 2, title: "法律法规", icon: "lishijilu", key: "法律法规", inter: "Law" },
      { id: 3, title: "规章制度", icon: "a-Group1288", key: "", inter: "Rule" },
      { id: 4, title: "操作流程", icon: "a-Group1306", key: "操作流程", inter: "Post" },
      { id: 5, title: "安全知识", icon: "a-Group1300", key: "安全知识", inter: "Post" },
      { id: 6, title: "安全目标", icon: "a-Group1288-2", key: "", inter: "" },
      { id: 7, title: "岗位风险告知", icon: "a-Group1313", key: "岗位风险告知", inter: "Post" },
      { id: 8, title: "职业病风险告知", icon: "dianzan", key: "", inter: "Factor" },
      { id: 9, title: "安全生产目标责任书", icon: "shuomingwendang", key: "", inter: "" },
      { id: 10, title: "个人档案", icon: "renyuanxinxi", key: "", inter: "form" }
    ];
    const personForm = [
      { id: 1, title: "姓名", key: "ushow", type: "text" },
      { id: 2, title: "照片", key: "field7", type: "picture" },
      { id: 3, title: "性别", key: "sex", type: "text" },
      { id: 4, title: "民族", key: "field", type: "text" },
      { id: 5, title: "文化程度", key: "education", type: "text" },
      { id: 6, title: "所学专业", key: "typeWork", type: "text" },
      { id: 7, title: "毕业时间", key: "field1", type: "text" },
      { id: 8, title: "毕业学校", key: "field2", type: "text" },
      { id: 9, title: "政治面貌", key: "field3", type: "text" },
      { id: 10, title: "身份证号", key: "field8", type: "text" },
      { id: 11, title: "家庭住址", key: "field4", type: "text" },
      { id: 12, title: "毕业参加工作时间", key: "field5", type: "text" },
      { id: 13, title: "进入本单位时间", key: "field6", type: "text" },
      { id: 14, title: "工作简历", key: "suwList", type: "list" }
    ];
    const suwListOPtion = {
      "工作单位": "field1",
      "起止时间": "field",
      "工作岗位": "field2",
      "职务": "field3"
    };
    const formatSuw = (suwObj) => Object.keys(suwListOPtion).reduce((pre, name) => {
      pre[name] = suwObj[suwListOPtion[name]];
      return pre;
    }, {});
    const handleMainKnow = async (obj) => {
      console.log(obj);
      obj.from = "know";
      if (obj.title == "个人档案") {
        await konwStore.getUserArchives();
        console.log(konwStore.userArchives);
        const archives = konwStore.userArchives || {};
        const formConfig = personForm.map((item) => {
          item.val = archives[item.key];
          if (item.title == "工作简历") {
            item.val = item.val.map(formatSuw);
          }
          return item;
        });
        common_vendor.index.$u.route({
          url: "/pages/comForm/comForm",
          params: {
            data: JSON.stringify(formConfig),
            title: "个人档案"
          }
        });
        return;
      }
      if (obj.title == "安全生产目标责任书") {
        common_vendor.index.$u.route({
          url: "/pages/knowSign/knowSign",
          params: {
            // config: JSON.stringify(obj)
          }
        });
        return;
      }
      common_vendor.index.$u.route({
        url: "/pages/comDocLearn/comDocLearn",
        params: {
          config: JSON.stringify(obj)
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(user).ushow || ""),
        b: `${common_vendor.unref(interface_constant.BASE_FILE_URL)}${common_vendor.unref(user).portrait}`,
        c: common_vendor.f(postList, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(common_vendor.unref(user)[item.key] || "恒通股份")
          };
        }),
        d: common_vendor.f(mainKnowList, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: `/static/icon/${item.icon}.png`,
            c: common_vendor.o(($event) => handleMainKnow(item))
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/know/know.vue"]]);
my.createPage(MiniProgramPage);
