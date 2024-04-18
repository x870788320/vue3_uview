"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uviewPlus_components_uIndexList_props = require("./props.js");
const uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
require("../../libs/config/props.js");
require("../../libs/config/props/actionSheet.js");
require("../../libs/config/props/album.js");
require("../../libs/config/props/alert.js");
require("../../libs/config/props/avatar.js");
require("../../libs/config/props/avatarGroup.js");
require("../../libs/config/props/backtop.js");
require("../../libs/config/props/badge.js");
require("../../libs/config/props/button.js");
require("../../libs/config/props/calendar.js");
require("../../libs/config/props/carKeyboard.js");
require("../../libs/config/props/cell.js");
require("../../libs/config/props/cellGroup.js");
require("../../libs/config/props/checkbox.js");
require("../../libs/config/props/checkboxGroup.js");
require("../../libs/config/props/circleProgress.js");
require("../../libs/config/props/code.js");
require("../../libs/config/props/codeInput.js");
require("../../libs/config/props/col.js");
require("../../libs/config/props/collapse.js");
require("../../libs/config/props/collapseItem.js");
require("../../libs/config/props/columnNotice.js");
require("../../libs/config/props/countDown.js");
require("../../libs/config/props/countTo.js");
require("../../libs/config/props/datetimePicker.js");
require("../../libs/config/props/divider.js");
require("../../libs/config/props/empty.js");
require("../../libs/config/props/form.js");
require("../../libs/config/props/formItem.js");
require("../../libs/config/props/gap.js");
require("../../libs/config/props/grid.js");
require("../../libs/config/props/gridItem.js");
require("../../libs/config/props/icon.js");
require("../../libs/config/config.js");
require("../../libs/config/props/image.js");
require("../../libs/config/props/indexAnchor.js");
require("../../libs/config/props/indexList.js");
require("../../libs/config/props/input.js");
require("../../libs/config/props/keyboard.js");
require("../../libs/config/props/line.js");
require("../../libs/config/props/lineProgress.js");
require("../../libs/config/props/link.js");
require("../../libs/config/props/list.js");
require("../../libs/config/props/listItem.js");
require("../../libs/config/props/loadingIcon.js");
require("../../libs/config/props/loadingPage.js");
require("../../libs/config/props/loadmore.js");
require("../../libs/config/props/modal.js");
require("../../libs/config/props/navbar.js");
require("../../libs/config/color.js");
require("../../libs/config/props/noNetwork.js");
require("../../libs/config/props/noticeBar.js");
require("../../libs/config/props/notify.js");
require("../../libs/config/props/numberBox.js");
require("../../libs/config/props/numberKeyboard.js");
require("../../libs/config/props/overlay.js");
require("../../libs/config/props/parse.js");
require("../../libs/config/props/picker.js");
require("../../libs/config/props/popup.js");
require("../../libs/config/props/radio.js");
require("../../libs/config/props/radioGroup.js");
require("../../libs/config/props/rate.js");
require("../../libs/config/props/readMore.js");
require("../../libs/config/props/row.js");
require("../../libs/config/props/rowNotice.js");
require("../../libs/config/props/scrollList.js");
require("../../libs/config/props/search.js");
require("../../libs/config/props/section.js");
require("../../libs/config/props/skeleton.js");
require("../../libs/config/props/slider.js");
require("../../libs/config/props/statusBar.js");
require("../../libs/config/props/steps.js");
require("../../libs/config/props/stepsItem.js");
require("../../libs/config/props/sticky.js");
require("../../libs/config/props/subsection.js");
require("../../libs/config/props/swipeAction.js");
require("../../libs/config/props/swipeActionItem.js");
require("../../libs/config/props/swiper.js");
require("../../libs/config/props/swipterIndicator.js");
require("../../libs/config/props/switch.js");
require("../../libs/config/props/tabbar.js");
require("../../libs/config/props/tabbarItem.js");
require("../../libs/config/props/tabs.js");
require("../../libs/config/props/tag.js");
require("../../libs/config/props/text.js");
require("../../libs/config/props/textarea.js");
require("../../libs/config/props/toast.js");
require("../../libs/config/props/toolbar.js");
require("../../libs/config/props/tooltip.js");
require("../../libs/config/props/transition.js");
require("../../libs/config/props/upload.js");
const indexList = () => {
  const indexList2 = [];
  const charCodeOfA = "A".charCodeAt(0);
  for (let i = 0; i < 26; i++) {
    indexList2.push(String.fromCharCode(charCodeOfA + i));
  }
  return indexList2;
};
const _sfc_main = {
  name: "u-index-list",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_libs_mixin_mixin.mixin, uni_modules_uviewPlus_components_uIndexList_props.props],
  data() {
    return {
      // 当前正在被选中的字母索引
      activeIndex: -1,
      touchmoveIndex: 1,
      // 索引字母的信息
      letterInfo: {
        height: 0,
        itemHeight: 0,
        top: 0
      },
      // 设置字母指示器的高度，后面为了让指示器跟随字母，并将尖角部分指向字母的中部，需要依赖此值
      indicatorHeight: 50,
      // 字母放大指示器的top值，为了让其指向当前激活的字母
      // indicatorTop: 0
      // 当前是否正在被触摸状态
      touching: false,
      // 滚动条顶部top值
      scrollTop: 0,
      // scroll-view的高度
      scrollViewHeight: 0,
      // 系统信息
      sys: common_vendor.index.$u.sys(),
      scrolling: false,
      scrollIntoView: ""
    };
  },
  computed: {
    // 如果有传入外部的indexList锚点数组则使用，否则使用内部生成A-Z字母
    uIndexList() {
      return this.indexList.length ? this.indexList : indexList();
    },
    // 字母放大指示器的top值，为了让其指向当前激活的字母
    indicatorTop() {
      const {
        top,
        itemHeight
      } = this.letterInfo;
      return Math.floor(top + itemHeight * this.activeIndex + itemHeight / 2 - this.indicatorHeight / 2);
    }
  },
  watch: {
    // 监听字母索引的变化，重新设置尺寸
    uIndexList: {
      immediate: true,
      handler() {
        common_vendor.index.$u.sleep().then(() => {
          this.setIndexListLetterInfo();
        });
      }
    }
  },
  created() {
    this.children = [];
    this.anchors = [];
    this.init();
  },
  mounted() {
    this.setIndexListLetterInfo();
  },
  methods: {
    init() {
      this.scrollViewHeight = this.sys.windowHeight - this.customNavHeight;
    },
    // 索引列表被触摸
    touchStart(e) {
      const touchStart = e.changedTouches[0];
      if (!touchStart)
        return;
      this.touching = true;
      const {
        pageY
      } = touchStart;
      const currentIndex = this.getIndexListLetter(pageY);
      this.setValueForTouch(currentIndex);
    },
    // 索引字母列表被触摸滑动中
    touchMove(e) {
      let touchMove = e.changedTouches[0];
      if (!touchMove)
        return;
      if (!this.touching) {
        this.touching = true;
      }
      const {
        pageY
      } = touchMove;
      const currentIndex = this.getIndexListLetter(pageY);
      this.setValueForTouch(currentIndex);
    },
    // 触摸结束
    touchEnd(e) {
      common_vendor.index.$u.sleep(300).then(() => {
        this.touching = false;
      });
    },
    // 获取索引列表的尺寸以及单个字符的尺寸信息
    getIndexListLetterRect() {
      return new Promise((resolve) => {
        this.$uGetRect(".u-index-list__letter").then((size) => {
          resolve(size);
        });
      });
    },
    // 设置indexList索引的尺寸信息
    setIndexListLetterInfo() {
      this.getIndexListLetterRect().then((size) => {
        const {
          height
        } = size;
        const sys = common_vendor.index.$u.sys();
        const windowHeight = sys.windowHeight;
        let customNavHeight = 0;
        if (this.customNavHeight == 0) {
          customNavHeight = -(sys.statusBarHeight + 44);
        } else {
          customNavHeight = common_vendor.index.$u.getPx(this.customNavHeight);
        }
        this.letterInfo = {
          height,
          // 为了让字母列表对屏幕绝对居中，让其对导航栏进行修正，也即往上偏移导航栏的一半高度
          top: (windowHeight - height) / 2 + customNavHeight / 2,
          itemHeight: Math.floor(height / this.uIndexList.length)
        };
      });
    },
    // 获取当前被触摸的索引字母
    getIndexListLetter(pageY) {
      const {
        top,
        height,
        itemHeight
      } = this.letterInfo;
      if (pageY < top) {
        return 0;
      } else if (pageY >= top + height) {
        return this.uIndexList.length - 1;
      } else {
        return Math.floor((pageY - top) / itemHeight);
      }
    },
    // 设置各项由触摸而导致变化的值
    setValueForTouch(currentIndex) {
      if (currentIndex === this.activeIndex)
        return;
      this.activeIndex = currentIndex;
      this.scrollIntoView = `u-index-item-${this.uIndexList[currentIndex].charCodeAt(0)}`;
    },
    getHeaderRect() {
      return new Promise((resolve) => {
        dom.getComponentRect(this.$refs.header, (res) => {
          resolve(res.size);
        });
      });
    },
    // scroll-view的滚动事件
    async scrollHandler(e) {
      if (this.touching || this.scrolling)
        return;
      this.scrolling = true;
      common_vendor.index.$u.sleep(10).then(() => {
        this.scrolling = false;
      });
      let scrollTop = 0;
      const len = this.children.length;
      let children = this.children;
      this.anchors;
      scrollTop = e.detail.scrollTop;
      for (let i = 0; i < len; i++) {
        const item = children[i], nextItem = children[i + 1];
        if (scrollTop <= children[0].top || scrollTop >= children[len - 1].top + children[len - 1].height) {
          this.activeIndex = -1;
          break;
        } else if (!nextItem) {
          this.activeIndex = len - 1;
          break;
        } else if (scrollTop > item.top && scrollTop < nextItem.top) {
          this.activeIndex = i;
          break;
        }
      }
    }
  }
};
if (!Array) {
  const _easycom_u_transition2 = common_vendor.resolveComponent("u-transition");
  _easycom_u_transition2();
}
const _easycom_u_transition = () => "../u-transition/u-transition.js";
if (!Math) {
  _easycom_u_transition();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.$slots.header
  }, _ctx.$slots.header ? {} : {}, {
    b: _ctx.$slots.footer
  }, _ctx.$slots.footer ? {} : {}, {
    c: $data.scrollTop,
    d: $data.scrollIntoView,
    e: _ctx.$u.addUnit($data.scrollViewHeight),
    f: common_vendor.o((...args) => $options.scrollHandler && $options.scrollHandler(...args)),
    g: common_vendor.f($options.uIndexList, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: $data.activeIndex === index ? "#fff" : _ctx.inactiveColor,
        c: index,
        d: $data.activeIndex === index ? _ctx.activeColor : "transparent"
      };
    }),
    h: _ctx.$u.addUnit($data.letterInfo.top || 100),
    i: common_vendor.o((...args) => $options.touchStart && $options.touchStart(...args)),
    j: common_vendor.o((...args) => $options.touchMove && $options.touchMove(...args)),
    k: common_vendor.o((...args) => $options.touchEnd && $options.touchEnd(...args)),
    l: common_vendor.o((...args) => $options.touchEnd && $options.touchEnd(...args)),
    m: common_vendor.t($options.uIndexList[$data.activeIndex]),
    n: _ctx.$u.addUnit($data.indicatorHeight),
    o: _ctx.$u.addUnit($data.indicatorHeight),
    p: common_vendor.p({
      mode: "fade",
      show: $data.touching,
      customStyle: {
        position: "fixed",
        right: "50px",
        top: _ctx.$u.addUnit($options.indicatorTop),
        zIndex: 2
      }
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-dfefaad1"], ["__file", "D:/projects/work/applet/vue3_uview_plus/uni_modules/uview-plus/components/u-index-list/u-index-list.vue"]]);
my.createComponent(Component);
