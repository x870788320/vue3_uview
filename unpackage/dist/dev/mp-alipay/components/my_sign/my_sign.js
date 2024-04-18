"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
require("../../interface/index.js");
require("../../interface/request.js");
require("../../interface/constant.js");
require("../../store/user.js");
require("../../utils/storage/user_storage.js");
require("../../utils/index.js");
const _sfc_main = {
  __name: "my_sign",
  setup(__props, { expose }) {
    const instance = common_vendor.getCurrentInstance();
    store_index.useIndexStore();
    const state = common_vendor.reactive({
      width: "",
      height: "",
      ctx: null,
      path: "",
      //绘图图像
      points: []
      //路径点集合
    });
    const canvasInit = () => {
      state.ctx = common_vendor.index.createCanvasContext("mycanvas");
      state.ctx.setLineWidth(1);
      state.ctx.setLineCap("round");
      state.ctx.setLineJoin("round");
      const query = common_vendor.index.createSelectorQuery();
      query.select("#mycanvas").fields({
        size: true
      }, (res) => {
        state.width = res.width;
        state.height = res.height;
        console.log(res);
      }).exec();
    };
    const touchstart = (e) => {
      if (!state.ctx) {
        canvasInit();
      }
      let startX = e.changedTouches[0].x;
      let startY = e.changedTouches[0].y;
      let startPoint = {
        X: startX,
        Y: startY
      };
      state.points.push(startPoint);
      state.ctx.beginPath();
    };
    const touchmove = (e) => {
      let moveX = e.changedTouches[0].x;
      let moveY = e.changedTouches[0].y;
      let movePoint = {
        X: moveX,
        Y: moveY
      };
      state.points.push(movePoint);
      let len = state.points.length;
      if (len >= 2) {
        draw();
      }
    };
    const touchend = () => {
      state.points = [];
    };
    const draw = () => {
      console.log("draw");
      let point1 = state.points[0];
      let point2 = state.points[1];
      state.points.shift();
      console.log(state.points);
      console.log(point1);
      console.log(point2);
      console.log(state.ctx);
      state.ctx.moveTo(point1.X, point1.Y);
      state.ctx.lineTo(point2.X, point2.Y);
      state.ctx.stroke();
      state.ctx.draw(true);
    };
    const signClear = () => {
      console.log("清空");
      state.ctx.clearRect(0, 0, state.width, state.height);
      state.ctx.draw(true);
    };
    const signDown = () => new Promise((res, rej) => {
      common_vendor.index.canvasToTempFilePath({
        canvasId: "mycanvas",
        success: async (obj) => {
          let path = obj.tempFilePath || obj.filePath;
          res(path);
        },
        fail: (err) => {
          rej(err);
        }
      }, instance);
    });
    expose({ signDown, signClear });
    common_vendor.onLoad(() => {
      canvasInit();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(touchstart),
        b: common_vendor.o(touchmove),
        c: common_vendor.o(touchend)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-09d1b2ea"], ["__file", "D:/projects/work/applet/vue3_uview_plus/components/my_sign/my_sign.vue"]]);
my.createComponent(Component);
