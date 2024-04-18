if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue, shared) {
  "use strict";
  const ON_SHOW = "onShow";
  const ON_HIDE = "onHide";
  const ON_LOAD = "onLoad";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return shared.isString(component) ? easycom : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onShow = /* @__PURE__ */ createHook(ON_SHOW);
  const onHide = /* @__PURE__ */ createHook(ON_HIDE);
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  const icons = {
    "uicon-level": "",
    "uicon-column-line": "",
    "uicon-checkbox-mark": "",
    "uicon-folder": "",
    "uicon-movie": "",
    "uicon-star-fill": "",
    "uicon-star": "",
    "uicon-phone-fill": "",
    "uicon-phone": "",
    "uicon-apple-fill": "",
    "uicon-chrome-circle-fill": "",
    "uicon-backspace": "",
    "uicon-attach": "",
    "uicon-cut": "",
    "uicon-empty-car": "",
    "uicon-empty-coupon": "",
    "uicon-empty-address": "",
    "uicon-empty-favor": "",
    "uicon-empty-permission": "",
    "uicon-empty-news": "",
    "uicon-empty-search": "",
    "uicon-github-circle-fill": "",
    "uicon-rmb": "",
    "uicon-person-delete-fill": "",
    "uicon-reload": "",
    "uicon-order": "",
    "uicon-server-man": "",
    "uicon-search": "",
    "uicon-fingerprint": "",
    "uicon-more-dot-fill": "",
    "uicon-scan": "",
    "uicon-share-square": "",
    "uicon-map": "",
    "uicon-map-fill": "",
    "uicon-tags": "",
    "uicon-tags-fill": "",
    "uicon-bookmark-fill": "",
    "uicon-bookmark": "",
    "uicon-eye": "",
    "uicon-eye-fill": "",
    "uicon-mic": "",
    "uicon-mic-off": "",
    "uicon-calendar": "",
    "uicon-calendar-fill": "",
    "uicon-trash": "",
    "uicon-trash-fill": "",
    "uicon-play-left": "",
    "uicon-play-right": "",
    "uicon-minus": "",
    "uicon-plus": "",
    "uicon-info": "",
    "uicon-info-circle": "",
    "uicon-info-circle-fill": "",
    "uicon-question": "",
    "uicon-error": "",
    "uicon-close": "",
    "uicon-checkmark": "",
    "uicon-android-circle-fill": "",
    "uicon-android-fill": "",
    "uicon-ie": "",
    "uicon-IE-circle-fill": "",
    "uicon-google": "",
    "uicon-google-circle-fill": "",
    "uicon-setting-fill": "",
    "uicon-setting": "",
    "uicon-minus-square-fill": "",
    "uicon-plus-square-fill": "",
    "uicon-heart": "",
    "uicon-heart-fill": "",
    "uicon-camera": "",
    "uicon-camera-fill": "",
    "uicon-more-circle": "",
    "uicon-more-circle-fill": "",
    "uicon-chat": "",
    "uicon-chat-fill": "",
    "uicon-bag-fill": "",
    "uicon-bag": "",
    "uicon-error-circle-fill": "",
    "uicon-error-circle": "",
    "uicon-close-circle": "",
    "uicon-close-circle-fill": "",
    "uicon-checkmark-circle": "",
    "uicon-checkmark-circle-fill": "",
    "uicon-question-circle-fill": "",
    "uicon-question-circle": "",
    "uicon-share": "",
    "uicon-share-fill": "",
    "uicon-shopping-cart": "",
    "uicon-shopping-cart-fill": "",
    "uicon-bell": "",
    "uicon-bell-fill": "",
    "uicon-list": "",
    "uicon-list-dot": "",
    "uicon-zhihu": "",
    "uicon-zhihu-circle-fill": "",
    "uicon-zhifubao": "",
    "uicon-zhifubao-circle-fill": "",
    "uicon-weixin-circle-fill": "",
    "uicon-weixin-fill": "",
    "uicon-twitter-circle-fill": "",
    "uicon-twitter": "",
    "uicon-taobao-circle-fill": "",
    "uicon-taobao": "",
    "uicon-weibo-circle-fill": "",
    "uicon-weibo": "",
    "uicon-qq-fill": "",
    "uicon-qq-circle-fill": "",
    "uicon-moments-circel-fill": "",
    "uicon-moments": "",
    "uicon-qzone": "",
    "uicon-qzone-circle-fill": "",
    "uicon-baidu-circle-fill": "",
    "uicon-baidu": "",
    "uicon-facebook-circle-fill": "",
    "uicon-facebook": "",
    "uicon-car": "",
    "uicon-car-fill": "",
    "uicon-warning-fill": "",
    "uicon-warning": "",
    "uicon-clock-fill": "",
    "uicon-clock": "",
    "uicon-edit-pen": "",
    "uicon-edit-pen-fill": "",
    "uicon-email": "",
    "uicon-email-fill": "",
    "uicon-minus-circle": "",
    "uicon-minus-circle-fill": "",
    "uicon-plus-circle": "",
    "uicon-plus-circle-fill": "",
    "uicon-file-text": "",
    "uicon-file-text-fill": "",
    "uicon-pushpin": "",
    "uicon-pushpin-fill": "",
    "uicon-grid": "",
    "uicon-grid-fill": "",
    "uicon-play-circle": "",
    "uicon-play-circle-fill": "",
    "uicon-pause-circle-fill": "",
    "uicon-pause": "",
    "uicon-pause-circle": "",
    "uicon-eye-off": "",
    "uicon-eye-off-outline": "",
    "uicon-gift-fill": "",
    "uicon-gift": "",
    "uicon-rmb-circle-fill": "",
    "uicon-rmb-circle": "",
    "uicon-kefu-ermai": "",
    "uicon-server-fill": "",
    "uicon-coupon-fill": "",
    "uicon-coupon": "",
    "uicon-integral": "",
    "uicon-integral-fill": "",
    "uicon-home-fill": "",
    "uicon-home": "",
    "uicon-hourglass-half-fill": "",
    "uicon-hourglass": "",
    "uicon-account": "",
    "uicon-plus-people-fill": "",
    "uicon-minus-people-fill": "",
    "uicon-account-fill": "",
    "uicon-thumb-down-fill": "",
    "uicon-thumb-down": "",
    "uicon-thumb-up": "",
    "uicon-thumb-up-fill": "",
    "uicon-lock-fill": "",
    "uicon-lock-open": "",
    "uicon-lock-opened-fill": "",
    "uicon-lock": "",
    "uicon-red-packet-fill": "",
    "uicon-photo-fill": "",
    "uicon-photo": "",
    "uicon-volume-off-fill": "",
    "uicon-volume-off": "",
    "uicon-volume-fill": "",
    "uicon-volume": "",
    "uicon-red-packet": "",
    "uicon-download": "",
    "uicon-arrow-up-fill": "",
    "uicon-arrow-down-fill": "",
    "uicon-play-left-fill": "",
    "uicon-play-right-fill": "",
    "uicon-rewind-left-fill": "",
    "uicon-rewind-right-fill": "",
    "uicon-arrow-downward": "",
    "uicon-arrow-leftward": "",
    "uicon-arrow-rightward": "",
    "uicon-arrow-upward": "",
    "uicon-arrow-down": "",
    "uicon-arrow-right": "",
    "uicon-arrow-left": "",
    "uicon-arrow-up": "",
    "uicon-skip-back-left": "",
    "uicon-skip-forward-right": "",
    "uicon-rewind-right": "",
    "uicon-rewind-left": "",
    "uicon-arrow-right-double": "",
    "uicon-arrow-left-double": "",
    "uicon-wifi-off": "",
    "uicon-wifi": "",
    "uicon-empty-data": "",
    "uicon-empty-history": "",
    "uicon-empty-list": "",
    "uicon-empty-page": "",
    "uicon-empty-order": "",
    "uicon-man": "",
    "uicon-woman": "",
    "uicon-man-add": "",
    "uicon-man-add-fill": "",
    "uicon-man-delete": "",
    "uicon-man-delete-fill": "",
    "uicon-zh": "",
    "uicon-en": ""
  };
  const version = "3";
  const config = {
    v: version,
    version,
    // 主题名称
    type: [
      "primary",
      "success",
      "info",
      "error",
      "warning"
    ],
    // 颜色部分，本来可以通过scss的:export导出供js使用，但是奈何nvue不支持
    color: {
      "u-primary": "#2979ff",
      "u-warning": "#ff9900",
      "u-success": "#19be6b",
      "u-error": "#fa3534",
      "u-info": "#909399",
      "u-main-color": "#303133",
      "u-content-color": "#606266",
      "u-tips-color": "#909399",
      "u-light-color": "#c0c4cc"
    },
    // 默认单位，可以通过配置为rpx，那么在用于传入组件大小参数为数值时，就默认为rpx
    unit: "px"
  };
  const ActionSheet = {
    // action-sheet组件
    actionSheet: {
      show: false,
      title: "",
      description: "",
      actions: () => [],
      index: "",
      cancelText: "",
      closeOnClickAction: true,
      safeAreaInsetBottom: true,
      openType: "",
      closeOnClickOverlay: true,
      round: 0
    }
  };
  const Album = {
    // album 组件
    album: {
      urls: () => [],
      keyName: "",
      singleSize: 180,
      multipleSize: 70,
      space: 6,
      singleMode: "scaleToFill",
      multipleMode: "aspectFill",
      maxCount: 9,
      previewFullImage: true,
      rowCount: 3,
      showMore: true
    }
  };
  const Alert = {
    // alert警告组件
    alert: {
      title: "",
      type: "warning",
      description: "",
      closable: false,
      showIcon: false,
      effect: "light",
      center: false,
      fontSize: 14
    }
  };
  const Avatar = {
    // avatar 组件
    avatar: {
      src: "",
      shape: "circle",
      size: 40,
      mode: "scaleToFill",
      text: "",
      bgColor: "#c0c4cc",
      color: "#ffffff",
      fontSize: 18,
      icon: "",
      mpAvatar: false,
      randomBgColor: false,
      defaultUrl: "",
      colorIndex: "",
      name: ""
    }
  };
  const AvatarGroup = {
    // avatarGroup 组件
    avatarGroup: {
      urls: () => [],
      maxCount: 5,
      shape: "circle",
      mode: "scaleToFill",
      showMore: true,
      size: 40,
      keyName: "",
      gap: 0.5,
      extraValue: 0
    }
  };
  const Backtop = {
    // backtop组件
    backtop: {
      mode: "circle",
      icon: "arrow-upward",
      text: "",
      duration: 100,
      scrollTop: 0,
      top: 400,
      bottom: 100,
      right: 20,
      zIndex: 9,
      iconStyle: () => ({
        color: "#909399",
        fontSize: "19px"
      })
    }
  };
  const Badge = {
    // 徽标数组件
    badge: {
      isDot: false,
      value: "",
      show: true,
      max: 999,
      type: "error",
      showZero: false,
      bgColor: null,
      color: null,
      shape: "circle",
      numberType: "overflow",
      offset: () => [],
      inverted: false,
      absolute: false
    }
  };
  const Button = {
    // button组件
    button: {
      hairline: false,
      type: "info",
      size: "normal",
      shape: "square",
      plain: false,
      disabled: false,
      loading: false,
      loadingText: "",
      loadingMode: "spinner",
      loadingSize: 15,
      openType: "",
      formType: "",
      appParameter: "",
      hoverStopPropagation: true,
      lang: "en",
      sessionFrom: "",
      sendMessageTitle: "",
      sendMessagePath: "",
      sendMessageImg: "",
      showMessageCard: false,
      dataName: "",
      throttleTime: 0,
      hoverStartTime: 0,
      hoverStayTime: 200,
      text: "",
      icon: "",
      iconColor: "",
      color: ""
    }
  };
  const Calendar = {
    // calendar 组件
    calendar: {
      title: "日期选择",
      showTitle: true,
      showSubtitle: true,
      mode: "single",
      startText: "开始",
      endText: "结束",
      customList: () => [],
      color: "#3c9cff",
      minDate: 0,
      maxDate: 0,
      defaultDate: null,
      maxCount: Number.MAX_SAFE_INTEGER,
      // Infinity
      rowHeight: 56,
      formatter: null,
      showLunar: false,
      showMark: true,
      confirmText: "确定",
      confirmDisabledText: "确定",
      show: false,
      closeOnClickOverlay: false,
      readonly: false,
      showConfirm: true,
      maxRange: Number.MAX_SAFE_INTEGER,
      // Infinity
      rangePrompt: "",
      showRangePrompt: true,
      allowSameDay: false,
      round: 0,
      monthNum: 3
    }
  };
  const CarKeyboard = {
    // 车牌号键盘
    carKeyboard: {
      random: false
    }
  };
  const Cell = {
    // cell组件的props
    cell: {
      customClass: "",
      title: "",
      label: "",
      value: "",
      icon: "",
      disabled: false,
      border: true,
      center: false,
      url: "",
      linkType: "navigateTo",
      clickable: false,
      isLink: false,
      required: false,
      arrowDirection: "",
      iconStyle: {},
      rightIconStyle: {},
      rightIcon: "arrow-right",
      titleStyle: {},
      size: "",
      stop: true,
      name: ""
    }
  };
  const CellGroup = {
    // cell-group组件的props
    cellGroup: {
      title: "",
      border: true,
      customStyle: {}
    }
  };
  const Checkbox = {
    // checkbox组件
    checkbox: {
      name: "",
      shape: "",
      size: "",
      checkbox: false,
      disabled: "",
      activeColor: "",
      inactiveColor: "",
      iconSize: "",
      iconColor: "",
      label: "",
      labelSize: "",
      labelColor: "",
      labelDisabled: ""
    }
  };
  const CheckboxGroup = {
    // checkbox-group组件
    checkboxGroup: {
      name: "",
      value: () => [],
      shape: "square",
      disabled: false,
      activeColor: "#2979ff",
      inactiveColor: "#c8c9cc",
      size: 18,
      placement: "row",
      labelSize: 14,
      labelColor: "#303133",
      labelDisabled: false,
      iconColor: "#ffffff",
      iconSize: 12,
      iconPlacement: "left",
      borderBottom: false
    }
  };
  const CircleProgress = {
    // circleProgress 组件
    circleProgress: {
      percentage: 30
    }
  };
  const Code = {
    // code 组件
    code: {
      seconds: 60,
      startText: "获取验证码",
      changeText: "X秒重新获取",
      endText: "重新获取",
      keepRunning: false,
      uniqueKey: ""
    }
  };
  const CodeInput = {
    // codeInput 组件
    codeInput: {
      adjustPosition: true,
      maxlength: 6,
      dot: false,
      mode: "box",
      hairline: false,
      space: 10,
      value: "",
      focus: false,
      bold: false,
      color: "#606266",
      fontSize: 18,
      size: 35,
      disabledKeyboard: false,
      borderColor: "#c9cacc",
      disabledDot: true
    }
  };
  const Col = {
    // col 组件
    col: {
      span: 12,
      offset: 0,
      justify: "start",
      align: "stretch",
      textAlign: "left"
    }
  };
  const Collapse = {
    // collapse 组件
    collapse: {
      value: null,
      accordion: false,
      border: true
    }
  };
  const CollapseItem = {
    // collapseItem 组件
    collapseItem: {
      title: "",
      value: "",
      label: "",
      disabled: false,
      isLink: true,
      clickable: true,
      border: true,
      align: "left",
      name: "",
      icon: "",
      duration: 300
    }
  };
  const ColumnNotice = {
    // columnNotice 组件
    columnNotice: {
      text: "",
      icon: "volume",
      mode: "",
      color: "#f9ae3d",
      bgColor: "#fdf6ec",
      fontSize: 14,
      speed: 80,
      step: false,
      duration: 1500,
      disableTouch: true
    }
  };
  const CountDown = {
    // u-count-down 计时器组件
    countDown: {
      time: 0,
      format: "HH:mm:ss",
      autoStart: true,
      millisecond: false
    }
  };
  const CountTo = {
    // countTo 组件
    countTo: {
      startVal: 0,
      endVal: 0,
      duration: 2e3,
      autoplay: true,
      decimals: 0,
      useEasing: true,
      decimal: ".",
      color: "#606266",
      fontSize: 22,
      bold: false,
      separator: ""
    }
  };
  const DatetimePicker = {
    // datetimePicker 组件
    datetimePicker: {
      show: false,
      showToolbar: true,
      value: "",
      title: "",
      mode: "datetime",
      maxDate: new Date((/* @__PURE__ */ new Date()).getFullYear() + 10, 0, 1).getTime(),
      minDate: new Date((/* @__PURE__ */ new Date()).getFullYear() - 10, 0, 1).getTime(),
      minHour: 0,
      maxHour: 23,
      minMinute: 0,
      maxMinute: 59,
      filter: null,
      formatter: null,
      loading: false,
      itemHeight: 44,
      cancelText: "取消",
      confirmText: "确认",
      cancelColor: "#909193",
      confirmColor: "#3c9cff",
      visibleItemCount: 5,
      closeOnClickOverlay: false,
      defaultIndex: () => []
    }
  };
  const Divider = {
    // divider组件
    divider: {
      dashed: false,
      hairline: true,
      dot: false,
      textPosition: "center",
      text: "",
      textSize: 14,
      textColor: "#909399",
      lineColor: "#dcdfe6"
    }
  };
  const Empty = {
    // empty组件
    empty: {
      icon: "",
      text: "",
      textColor: "#c0c4cc",
      textSize: 14,
      iconColor: "#c0c4cc",
      iconSize: 90,
      mode: "data",
      width: 160,
      height: 160,
      show: true,
      marginTop: 0
    }
  };
  const Form = {
    // form 组件
    form: {
      model: () => ({}),
      rules: () => ({}),
      errorType: "message",
      borderBottom: true,
      labelPosition: "left",
      labelWidth: 45,
      labelAlign: "left",
      labelStyle: () => ({})
    }
  };
  const GormItem = {
    // formItem 组件
    formItem: {
      label: "",
      prop: "",
      borderBottom: "",
      labelWidth: "",
      rightIcon: "",
      leftIcon: "",
      required: false,
      leftIconStyle: ""
    }
  };
  const Gap = {
    // gap组件
    gap: {
      bgColor: "transparent",
      height: 20,
      marginTop: 0,
      marginBottom: 0,
      customStyle: {}
    }
  };
  const Grid = {
    // grid组件
    grid: {
      col: 3,
      border: false,
      align: "left"
    }
  };
  const GridItem = {
    // grid-item组件
    gridItem: {
      name: null,
      bgColor: "transparent"
    }
  };
  const {
    color: color$3
  } = config;
  const Icon = {
    // icon组件
    icon: {
      name: "",
      color: color$3["u-content-color"],
      size: "16px",
      bold: false,
      index: "",
      hoverClass: "",
      customPrefix: "uicon",
      label: "",
      labelPos: "right",
      labelSize: "15px",
      labelColor: color$3["u-content-color"],
      space: "3px",
      imgMode: "",
      width: "",
      height: "",
      top: 0,
      stop: false
    }
  };
  const Image$1 = {
    // image组件
    image: {
      src: "",
      mode: "aspectFill",
      width: "300",
      height: "225",
      shape: "square",
      radius: 0,
      lazyLoad: true,
      showMenuByLongpress: true,
      loadingIcon: "photo",
      errorIcon: "error-circle",
      showLoading: true,
      showError: true,
      fade: true,
      webp: false,
      duration: 500,
      bgColor: "#f3f4f6"
    }
  };
  const IndexAnchor = {
    // indexAnchor 组件
    indexAnchor: {
      text: "",
      color: "#606266",
      size: 14,
      bgColor: "#dedede",
      height: 32
    }
  };
  const IndexList = {
    // indexList 组件
    indexList: {
      inactiveColor: "#606266",
      activeColor: "#5677fc",
      indexList: () => [],
      sticky: true,
      customNavHeight: 0
    }
  };
  const Input = {
    // index 组件
    input: {
      value: "",
      type: "text",
      fixed: false,
      disabled: false,
      disabledColor: "#f5f7fa",
      clearable: false,
      password: false,
      maxlength: -1,
      placeholder: null,
      placeholderClass: "input-placeholder",
      placeholderStyle: "color: #c0c4cc",
      showWordLimit: false,
      confirmType: "done",
      confirmHold: false,
      holdKeyboard: false,
      focus: false,
      autoBlur: false,
      disableDefaultPadding: false,
      cursor: -1,
      cursorSpacing: 30,
      selectionStart: -1,
      selectionEnd: -1,
      adjustPosition: true,
      inputAlign: "left",
      fontSize: "15px",
      color: "#303133",
      prefixIcon: "",
      prefixIconStyle: "",
      suffixIcon: "",
      suffixIconStyle: "",
      border: "surround",
      readonly: false,
      shape: "square",
      formatter: null
    }
  };
  const Keyboard = {
    // 键盘组件
    keyboard: {
      mode: "number",
      dotDisabled: false,
      tooltip: true,
      showTips: true,
      tips: "",
      showCancel: true,
      showConfirm: true,
      random: false,
      safeAreaInsetBottom: true,
      closeOnClickOverlay: true,
      show: false,
      overlay: true,
      zIndex: 10075,
      cancelText: "取消",
      confirmText: "确定",
      autoChange: false
    }
  };
  const Line = {
    // line组件
    line: {
      color: "#d6d7d9",
      length: "100%",
      direction: "row",
      hairline: true,
      margin: 0,
      dashed: false
    }
  };
  const LineProgress = {
    // lineProgress 组件
    lineProgress: {
      activeColor: "#19be6b",
      inactiveColor: "#ececec",
      percentage: 0,
      showText: true,
      height: 12
    }
  };
  const {
    color: color$2
  } = config;
  const Link = {
    // link超链接组件props参数
    link: {
      color: color$2["u-primary"],
      fontSize: 15,
      underLine: false,
      href: "",
      mpTips: "链接已复制，请在浏览器打开",
      lineColor: "",
      text: ""
    }
  };
  const List = {
    // list 组件
    list: {
      showScrollbar: false,
      lowerThreshold: 50,
      upperThreshold: 0,
      scrollTop: 0,
      offsetAccuracy: 10,
      enableFlex: false,
      pagingEnabled: false,
      scrollable: true,
      scrollIntoView: "",
      scrollWithAnimation: false,
      enableBackToTop: false,
      height: 0,
      width: 0,
      preLoadScreen: 1
    }
  };
  const ListItem = {
    // listItem 组件
    listItem: {
      anchor: ""
    }
  };
  const {
    color: color$1
  } = config;
  const LoadingIcon = {
    // loading-icon加载中图标组件
    loadingIcon: {
      show: true,
      color: color$1["u-tips-color"],
      textColor: color$1["u-tips-color"],
      vertical: false,
      mode: "spinner",
      size: 24,
      textSize: 15,
      text: "",
      timingFunction: "ease-in-out",
      duration: 1200,
      inactiveColor: ""
    }
  };
  const LoadingPage = {
    // loading-page组件
    loadingPage: {
      loadingText: "正在加载",
      image: "",
      loadingMode: "circle",
      loading: false,
      bgColor: "#ffffff",
      color: "#C8C8C8",
      fontSize: 19,
      iconSize: 28,
      loadingColor: "#C8C8C8"
    }
  };
  const Loadmore = {
    // loadmore 组件
    loadmore: {
      status: "loadmore",
      bgColor: "transparent",
      icon: true,
      fontSize: 14,
      iconSize: 17,
      color: "#606266",
      loadingIcon: "spinner",
      loadmoreText: "加载更多",
      loadingText: "正在加载...",
      nomoreText: "没有更多了",
      isDot: false,
      iconColor: "#b7b7b7",
      marginTop: 10,
      marginBottom: 10,
      height: "auto",
      line: false,
      lineColor: "#E6E8EB",
      dashed: false
    }
  };
  const Modal = {
    // modal 组件
    modal: {
      show: false,
      title: "",
      content: "",
      confirmText: "确认",
      cancelText: "取消",
      showConfirmButton: true,
      showCancelButton: false,
      confirmColor: "#2979ff",
      cancelColor: "#606266",
      buttonReverse: false,
      zoom: true,
      asyncClose: false,
      closeOnClickOverlay: false,
      negativeTop: 0,
      width: "650rpx",
      confirmButtonShape: ""
    }
  };
  const color = {
    primary: "#3c9cff",
    info: "#909399",
    default: "#909399",
    warning: "#f9ae3d",
    error: "#f56c6c",
    success: "#5ac725",
    mainColor: "#303133",
    contentColor: "#606266",
    tipsColor: "#909399",
    lightColor: "#c0c4cc",
    borderColor: "#e4e7ed"
  };
  const Navbar = {
    // navbar 组件
    navbar: {
      safeAreaInsetTop: true,
      placeholder: false,
      fixed: true,
      border: false,
      leftIcon: "arrow-left",
      leftText: "",
      rightText: "",
      rightIcon: "",
      title: "",
      bgColor: "#ffffff",
      titleWidth: "400rpx",
      height: "44px",
      leftIconSize: 20,
      leftIconColor: color.mainColor,
      autoBack: false,
      titleStyle: ""
    }
  };
  const NoNetwork = {
    // noNetwork
    noNetwork: {
      tips: "哎呀，网络信号丢失",
      zIndex: "",
      image: "data:image/png;base64,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"
    }
  };
  const NoticeBar = {
    // noticeBar
    noticeBar: {
      text: () => [],
      direction: "row",
      step: false,
      icon: "volume",
      mode: "",
      color: "#f9ae3d",
      bgColor: "#fdf6ec",
      speed: 80,
      fontSize: 14,
      duration: 2e3,
      disableTouch: true,
      url: "",
      linkType: "navigateTo"
    }
  };
  const Notify = {
    // notify组件
    notify: {
      top: 0,
      type: "primary",
      color: "#ffffff",
      bgColor: "",
      message: "",
      duration: 3e3,
      fontSize: 15,
      safeAreaInsetTop: false
    }
  };
  const NumberBox = {
    // 步进器组件
    numberBox: {
      name: "",
      value: 0,
      min: 1,
      max: Number.MAX_SAFE_INTEGER,
      step: 1,
      integer: false,
      disabled: false,
      disabledInput: false,
      asyncChange: false,
      inputWidth: 35,
      showMinus: true,
      showPlus: true,
      decimalLength: null,
      longPress: true,
      color: "#323233",
      buttonSize: 30,
      bgColor: "#EBECEE",
      cursorSpacing: 100,
      disableMinus: false,
      disablePlus: false,
      iconStyle: ""
    }
  };
  const NumberKeyboard = {
    // 数字键盘
    numberKeyboard: {
      mode: "number",
      dotDisabled: false,
      random: false
    }
  };
  const Overlay = {
    // overlay组件
    overlay: {
      show: false,
      zIndex: 10070,
      duration: 300,
      opacity: 0.5
    }
  };
  const Parse = {
    // parse
    parse: {
      copyLink: true,
      errorImg: "",
      lazyLoad: false,
      loadingImg: "",
      pauseVideo: true,
      previewImg: true,
      setTitle: true,
      showImgMenu: true
    }
  };
  const Picker = {
    // picker
    picker: {
      show: false,
      showToolbar: true,
      title: "",
      columns: () => [],
      loading: false,
      itemHeight: 44,
      cancelText: "取消",
      confirmText: "确定",
      cancelColor: "#909193",
      confirmColor: "#3c9cff",
      visibleItemCount: 5,
      keyName: "text",
      closeOnClickOverlay: false,
      defaultIndex: () => [],
      immediateChange: false
    }
  };
  const Popup = {
    // popup组件
    popup: {
      show: false,
      overlay: true,
      mode: "bottom",
      duration: 300,
      closeable: false,
      overlayStyle: () => {
      },
      closeOnClickOverlay: true,
      zIndex: 10075,
      safeAreaInsetBottom: true,
      safeAreaInsetTop: false,
      closeIconPos: "top-right",
      round: 0,
      zoom: true,
      bgColor: "",
      overlayOpacity: 0.5
    }
  };
  const Radio = {
    // radio组件
    radio: {
      name: "",
      shape: "",
      disabled: "",
      labelDisabled: "",
      activeColor: "",
      inactiveColor: "",
      iconSize: "",
      labelSize: "",
      label: "",
      labelColor: "",
      size: "",
      iconColor: "",
      placement: ""
    }
  };
  const RadioGroup = {
    // radio-group组件
    radioGroup: {
      value: "",
      disabled: false,
      shape: "circle",
      activeColor: "#2979ff",
      inactiveColor: "#c8c9cc",
      name: "",
      size: 18,
      placement: "row",
      label: "",
      labelColor: "#303133",
      labelSize: 14,
      labelDisabled: false,
      iconColor: "#ffffff",
      iconSize: 12,
      borderBottom: false,
      iconPlacement: "left"
    }
  };
  const Rate = {
    // rate组件
    rate: {
      value: 1,
      count: 5,
      disabled: false,
      size: 18,
      inactiveColor: "#b2b2b2",
      activeColor: "#FA3534",
      gutter: 4,
      minCount: 1,
      allowHalf: false,
      activeIcon: "star-fill",
      inactiveIcon: "star",
      touchable: true
    }
  };
  const ReadMore = {
    // readMore
    readMore: {
      showHeight: 400,
      toggle: false,
      closeText: "展开阅读全文",
      openText: "收起",
      color: "#2979ff",
      fontSize: 14,
      textIndent: "2em",
      name: ""
    }
  };
  const Row = {
    // row
    row: {
      gutter: 0,
      justify: "start",
      align: "center"
    }
  };
  const RowNotice = {
    // rowNotice
    rowNotice: {
      text: "",
      icon: "volume",
      mode: "",
      color: "#f9ae3d",
      bgColor: "#fdf6ec",
      fontSize: 14,
      speed: 80
    }
  };
  const ScrollList = {
    // scrollList
    scrollList: {
      indicatorWidth: 50,
      indicatorBarWidth: 20,
      indicator: true,
      indicatorColor: "#f2f2f2",
      indicatorActiveColor: "#3c9cff",
      indicatorStyle: ""
    }
  };
  const Search = {
    // search
    search: {
      shape: "round",
      bgColor: "#f2f2f2",
      placeholder: "请输入关键字",
      clearabled: true,
      focus: false,
      showAction: true,
      actionStyle: () => ({}),
      actionText: "搜索",
      inputAlign: "left",
      inputStyle: () => ({}),
      disabled: false,
      borderColor: "transparent",
      searchIconColor: "#909399",
      searchIconSize: 22,
      color: "#606266",
      placeholderColor: "#909399",
      searchIcon: "search",
      margin: "0",
      animation: false,
      value: "",
      maxlength: "-1",
      height: 32,
      label: null
    }
  };
  const Section = {
    // u-section组件
    section: {
      title: "",
      subTitle: "更多",
      right: true,
      fontSize: 15,
      bold: true,
      color: "#303133",
      subColor: "#909399",
      showLine: true,
      lineColor: "",
      arrow: true
    }
  };
  const Skeleton = {
    // skeleton
    skeleton: {
      loading: true,
      animate: true,
      rows: 0,
      rowsWidth: "100%",
      rowsHeight: 18,
      title: true,
      titleWidth: "50%",
      titleHeight: 18,
      avatar: false,
      avatarSize: 32,
      avatarShape: "circle"
    }
  };
  const Slider = {
    // slider组件
    slider: {
      value: 0,
      blockSize: 18,
      min: 0,
      max: 100,
      step: 1,
      activeColor: "#2979ff",
      inactiveColor: "#c0c4cc",
      blockColor: "#ffffff",
      showValue: false,
      disabled: false,
      blockStyle: () => {
      }
    }
  };
  const StatusBar = {
    // statusBar
    statusBar: {
      bgColor: "transparent"
    }
  };
  const Steps = {
    // steps组件
    steps: {
      direction: "row",
      current: 0,
      activeColor: "#3c9cff",
      inactiveColor: "#969799",
      activeIcon: "",
      inactiveIcon: "",
      dot: false
    }
  };
  const StepsItem = {
    // steps-item组件
    stepsItem: {
      title: "",
      desc: "",
      iconSize: 17,
      error: false
    }
  };
  const Sticky = {
    // sticky组件
    sticky: {
      offsetTop: 0,
      customNavHeight: 0,
      disabled: false,
      bgColor: "transparent",
      zIndex: "",
      index: ""
    }
  };
  const Subsection = {
    // subsection组件
    subsection: {
      list: [],
      current: 0,
      activeColor: "#3c9cff",
      inactiveColor: "#303133",
      mode: "button",
      fontSize: 12,
      bold: true,
      bgColor: "#eeeeef",
      keyName: "name"
    }
  };
  const SwipeAction = {
    // swipe-action组件
    swipeAction: {
      autoClose: true
    }
  };
  const SwipeActionItem = {
    // swipeActionItem 组件
    swipeActionItem: {
      show: false,
      name: "",
      disabled: false,
      threshold: 20,
      autoClose: true,
      options: [],
      duration: 300
    }
  };
  const Swiper = {
    // swiper 组件
    swiper: {
      list: () => [],
      indicator: false,
      indicatorActiveColor: "#FFFFFF",
      indicatorInactiveColor: "rgba(255, 255, 255, 0.35)",
      indicatorStyle: "",
      indicatorMode: "line",
      autoplay: true,
      current: 0,
      currentItemId: "",
      interval: 3e3,
      duration: 300,
      circular: false,
      previousMargin: 0,
      nextMargin: 0,
      acceleration: false,
      displayMultipleItems: 1,
      easingFunction: "default",
      keyName: "url",
      imgMode: "aspectFill",
      height: 130,
      bgColor: "#f3f4f6",
      radius: 4,
      loading: false,
      showTitle: false
    }
  };
  const SwipterIndicator = {
    // swiperIndicator 组件
    swiperIndicator: {
      length: 0,
      current: 0,
      indicatorActiveColor: "",
      indicatorInactiveColor: "",
      indicatorMode: "line"
    }
  };
  const Switch = {
    // switch
    switch: {
      loading: false,
      disabled: false,
      size: 25,
      activeColor: "#2979ff",
      inactiveColor: "#ffffff",
      value: false,
      activeValue: true,
      inactiveValue: false,
      asyncChange: false,
      space: 0
    }
  };
  const Tabbar = {
    // tabbar
    tabbar: {
      value: null,
      safeAreaInsetBottom: true,
      border: true,
      zIndex: 1,
      activeColor: "#1989fa",
      inactiveColor: "#7d7e80",
      fixed: true,
      placeholder: true
    }
  };
  const TabbarItem = {
    //
    tabbarItem: {
      name: null,
      icon: "",
      badge: null,
      dot: false,
      text: "",
      badgeStyle: "top: 6px;right:2px;"
    }
  };
  const Tabs = {
    //
    tabs: {
      duration: 300,
      list: () => [],
      lineColor: "#3c9cff",
      activeStyle: () => ({
        color: "#303133"
      }),
      inactiveStyle: () => ({
        color: "#606266"
      }),
      lineWidth: 20,
      lineHeight: 3,
      lineBgSize: "cover",
      itemStyle: () => ({
        height: "44px"
      }),
      scrollable: true,
      current: 0,
      keyName: "name"
    }
  };
  const Tag = {
    // tag 组件
    tag: {
      type: "primary",
      disabled: false,
      size: "medium",
      shape: "square",
      text: "",
      bgColor: "",
      color: "",
      borderColor: "",
      closeColor: "#C6C7CB",
      name: "",
      plainFill: false,
      plain: false,
      closable: false,
      show: true,
      icon: ""
    }
  };
  const Text = {
    // text 组件
    text: {
      type: "",
      show: true,
      text: "",
      prefixIcon: "",
      suffixIcon: "",
      mode: "",
      href: "",
      format: "",
      call: false,
      openType: "",
      bold: false,
      block: false,
      lines: "",
      color: "#303133",
      size: 15,
      iconStyle: () => ({
        fontSize: "15px"
      }),
      decoration: "none",
      margin: 0,
      lineHeight: "",
      align: "left",
      wordWrap: "normal"
    }
  };
  const Textarea = {
    // textarea 组件
    textarea: {
      value: "",
      placeholder: "",
      placeholderClass: "textarea-placeholder",
      placeholderStyle: "color: #c0c4cc",
      height: 70,
      confirmType: "done",
      disabled: false,
      count: false,
      focus: false,
      autoHeight: false,
      fixed: false,
      cursorSpacing: 0,
      cursor: "",
      showConfirmBar: true,
      selectionStart: -1,
      selectionEnd: -1,
      adjustPosition: true,
      disableDefaultPadding: false,
      holdKeyboard: false,
      maxlength: 140,
      border: "surround",
      formatter: null
    }
  };
  const Toast = {
    // toast组件
    toast: {
      zIndex: 10090,
      loading: false,
      text: "",
      icon: "",
      type: "",
      loadingMode: "",
      show: "",
      overlay: false,
      position: "center",
      params: () => {
      },
      duration: 2e3,
      isTab: false,
      url: "",
      callback: null,
      back: false
    }
  };
  const Toolbar = {
    // toolbar 组件
    toolbar: {
      show: true,
      cancelText: "取消",
      confirmText: "确认",
      cancelColor: "#909193",
      confirmColor: "#3c9cff",
      title: ""
    }
  };
  const Tooltip = {
    // tooltip 组件
    tooltip: {
      text: "",
      copyText: "",
      size: 14,
      color: "#606266",
      bgColor: "transparent",
      direction: "top",
      zIndex: 10071,
      showCopy: true,
      buttons: () => [],
      overlay: true,
      showToast: true
    }
  };
  const Transition = {
    // transition动画组件的props
    transition: {
      show: false,
      mode: "fade",
      duration: "300",
      timingFunction: "ease-out"
    }
  };
  const Upload = {
    // upload组件
    upload: {
      accept: "image",
      capture: () => ["album", "camera"],
      compressed: true,
      camera: "back",
      maxDuration: 60,
      uploadIcon: "camera-fill",
      uploadIconColor: "#D3D4D6",
      useBeforeRead: false,
      previewFullImage: true,
      maxCount: 52,
      disabled: false,
      imageMode: "aspectFill",
      name: "",
      sizeType: () => ["original", "compressed"],
      multiple: false,
      deletable: true,
      maxSize: Number.MAX_VALUE,
      fileList: () => [],
      uploadText: "",
      width: 80,
      height: 80,
      previewImage: true
    }
  };
  const props$o = {
    ...ActionSheet,
    ...Album,
    ...Alert,
    ...Avatar,
    ...AvatarGroup,
    ...Backtop,
    ...Badge,
    ...Button,
    ...Calendar,
    ...CarKeyboard,
    ...Cell,
    ...CellGroup,
    ...Checkbox,
    ...CheckboxGroup,
    ...CircleProgress,
    ...Code,
    ...CodeInput,
    ...Col,
    ...Collapse,
    ...CollapseItem,
    ...ColumnNotice,
    ...CountDown,
    ...CountTo,
    ...DatetimePicker,
    ...Divider,
    ...Empty,
    ...Form,
    ...GormItem,
    ...Gap,
    ...Grid,
    ...GridItem,
    ...Icon,
    ...Image$1,
    ...IndexAnchor,
    ...IndexList,
    ...Input,
    ...Keyboard,
    ...Line,
    ...LineProgress,
    ...Link,
    ...List,
    ...ListItem,
    ...LoadingIcon,
    ...LoadingPage,
    ...Loadmore,
    ...Modal,
    ...Navbar,
    ...NoNetwork,
    ...NoticeBar,
    ...Notify,
    ...NumberBox,
    ...NumberKeyboard,
    ...Overlay,
    ...Parse,
    ...Picker,
    ...Popup,
    ...Radio,
    ...RadioGroup,
    ...Rate,
    ...ReadMore,
    ...Row,
    ...RowNotice,
    ...ScrollList,
    ...Search,
    ...Section,
    ...Skeleton,
    ...Slider,
    ...StatusBar,
    ...Steps,
    ...StepsItem,
    ...Sticky,
    ...Subsection,
    ...SwipeAction,
    ...SwipeActionItem,
    ...Swiper,
    ...SwipterIndicator,
    ...Switch,
    ...Tabbar,
    ...TabbarItem,
    ...Tabs,
    ...Tag,
    ...Text,
    ...Textarea,
    ...Toast,
    ...Toolbar,
    ...Tooltip,
    ...Transition,
    ...Upload
  };
  const props$n = {
    props: {
      // 图标类名
      name: {
        type: String,
        default: props$o.icon.name
      },
      // 图标颜色，可接受主题色
      color: {
        type: String,
        default: props$o.icon.color
      },
      // 字体大小，单位px
      size: {
        type: [String, Number],
        default: props$o.icon.size
      },
      // 是否显示粗体
      bold: {
        type: Boolean,
        default: props$o.icon.bold
      },
      // 点击图标的时候传递事件出去的index（用于区分点击了哪一个）
      index: {
        type: [String, Number],
        default: props$o.icon.index
      },
      // 触摸图标时的类名
      hoverClass: {
        type: String,
        default: props$o.icon.hoverClass
      },
      // 自定义扩展前缀，方便用户扩展自己的图标库
      customPrefix: {
        type: String,
        default: props$o.icon.customPrefix
      },
      // 图标右边或者下面的文字
      label: {
        type: [String, Number],
        default: props$o.icon.label
      },
      // label的位置，只能右边或者下边
      labelPos: {
        type: String,
        default: props$o.icon.labelPos
      },
      // label的大小
      labelSize: {
        type: [String, Number],
        default: props$o.icon.labelSize
      },
      // label的颜色
      labelColor: {
        type: String,
        default: props$o.icon.labelColor
      },
      // label与图标的距离
      space: {
        type: [String, Number],
        default: props$o.icon.space
      },
      // 图片的mode
      imgMode: {
        type: String,
        default: props$o.icon.imgMode
      },
      // 用于显示图片小图标时，图片的宽度
      width: {
        type: [String, Number],
        default: props$o.icon.width
      },
      // 用于显示图片小图标时，图片的高度
      height: {
        type: [String, Number],
        default: props$o.icon.height
      },
      // 用于解决某些情况下，让图标垂直居中的用途
      top: {
        type: [String, Number],
        default: props$o.icon.top
      },
      // 是否阻止事件传播
      stop: {
        type: Boolean,
        default: props$o.icon.stop
      }
    }
  };
  const mpMixin = {};
  const mixin = {
    // 定义每个组件都可能需要用到的外部样式以及类名
    props: {
      // 每个组件都有的父组件传递的样式，可以为字符串或者对象形式
      customStyle: {
        type: [Object, String],
        default: () => ({})
      },
      customClass: {
        type: String,
        default: ""
      },
      // 跳转的页面路径
      url: {
        type: String,
        default: ""
      },
      // 页面跳转的类型
      linkType: {
        type: String,
        default: "navigateTo"
      }
    },
    data() {
      return {};
    },
    onLoad() {
      this.$u.getRect = this.$uGetRect;
    },
    created() {
      this.$u.getRect = this.$uGetRect;
    },
    computed: {
      // 在2.x版本中，将会把$u挂载到uni对象下，导致在模板中无法使用uni.$u.xxx形式
      // 所以这里通过computed计算属性将其附加到this.$u上，就可以在模板或者js中使用uni.$u.xxx
      // 只在nvue环境通过此方式引入完整的$u，其他平台会出现性能问题，非nvue则按需引入（主要原因是props过大）
      $u() {
        return uni.$u.deepMerge(uni.$u, {
          props: void 0,
          http: void 0,
          mixin: void 0
        });
      },
      /**
       * 生成bem规则类名
       * 由于微信小程序，H5，nvue之间绑定class的差异，无法通过:class="[bem()]"的形式进行同用
       * 故采用如下折中做法，最后返回的是数组（一般平台）或字符串（支付宝和字节跳动平台），类似['a', 'b', 'c']或'a b c'的形式
       * @param {String} name 组件名称
       * @param {Array} fixed 一直会存在的类名
       * @param {Array} change 会根据变量值为true或者false而出现或者隐藏的类名
       * @returns {Array|string}
       */
      bem() {
        return function(name, fixed, change) {
          const prefix = `u-${name}--`;
          const classes = {};
          if (fixed) {
            fixed.map((item) => {
              classes[prefix + this[item]] = true;
            });
          }
          if (change) {
            change.map((item) => {
              this[item] ? classes[prefix + item] = this[item] : delete classes[prefix + item];
            });
          }
          return Object.keys(classes);
        };
      }
    },
    methods: {
      // 跳转某一个页面
      openPage(urlKey = "url") {
        const url2 = this[urlKey];
        if (url2) {
          this.$u.route({ type: this.linkType, url: url2 });
        }
      },
      // 查询节点信息
      // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
      // 解决办法为在组件根部再套一个没有任何作用的view元素
      $uGetRect(selector, all) {
        return new Promise((resolve) => {
          uni.createSelectorQuery().in(this)[all ? "selectAll" : "select"](selector).boundingClientRect((rect) => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }
            if (!all && rect) {
              resolve(rect);
            }
          }).exec();
        });
      },
      getParentData(parentName = "") {
        if (!this.parent)
          this.parent = {};
        this.parent = uni.$u.$parent.call(this, parentName);
        if (this.parent.children) {
          this.parent.children.indexOf(this) === -1 && this.parent.children.push(this);
        }
        if (this.parent && this.parentData) {
          Object.keys(this.parentData).map((key) => {
            this.parentData[key] = this.parent[key];
          });
        }
      },
      // 阻止事件冒泡
      preventEvent(e2) {
        e2 && typeof e2.stopPropagation === "function" && e2.stopPropagation();
      },
      // 空操作
      noop(e2) {
        this.preventEvent(e2);
      }
    },
    onReachBottom() {
      uni.$emit("uOnReachBottom");
    },
    beforeDestroy() {
      if (this.parent && uni.$u.test.array(this.parent.children)) {
        const childrenList = this.parent.children;
        childrenList.map((child, index2) => {
          if (child === this) {
            childrenList.splice(index2, 1);
          }
        });
      }
    }
  };
  const _export_sfc = (sfc, props2) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props2) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$V = {
    name: "u-icon",
    data() {
      return {};
    },
    emits: ["click"],
    mixins: [mpMixin, mixin, props$n],
    computed: {
      uClasses() {
        let classes = [];
        classes.push(this.customPrefix + "-" + this.name);
        if (this.color && uni.$u.config.type.includes(this.color))
          classes.push("u-icon__icon--" + this.color);
        return classes;
      },
      iconStyle() {
        let style = {};
        style = {
          fontSize: uni.$u.addUnit(this.size),
          lineHeight: uni.$u.addUnit(this.size),
          fontWeight: this.bold ? "bold" : "normal",
          // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
          top: uni.$u.addUnit(this.top)
        };
        if (this.color && !uni.$u.config.type.includes(this.color))
          style.color = this.color;
        return style;
      },
      // 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
      isImg() {
        return this.name.indexOf("/") !== -1;
      },
      imgStyle() {
        let style = {};
        style.width = this.width ? uni.$u.addUnit(this.width) : uni.$u.addUnit(this.size);
        style.height = this.height ? uni.$u.addUnit(this.height) : uni.$u.addUnit(this.size);
        return style;
      },
      // 通过图标名，查找对应的图标
      icon() {
        return icons["uicon-" + this.name] || this.name;
      }
    },
    methods: {
      clickHandler(e2) {
        this.$emit("click", this.index);
        this.stop && this.preventEvent(e2);
      }
    }
  };
  function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-icon", ["u-icon--" + _ctx.labelPos]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args))
      },
      [
        $options.isImg ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          class: "u-icon__img",
          src: _ctx.name,
          mode: _ctx.imgMode,
          style: vue.normalizeStyle([$options.imgStyle, _ctx.$u.addStyle(_ctx.customStyle)])
        }, null, 12, ["src", "mode"])) : (vue.openBlock(), vue.createElementBlock("text", {
          key: 1,
          class: vue.normalizeClass(["u-icon__icon", $options.uClasses]),
          style: vue.normalizeStyle([$options.iconStyle, _ctx.$u.addStyle(_ctx.customStyle)]),
          "hover-class": _ctx.hoverClass
        }, vue.toDisplayString($options.icon), 15, ["hover-class"])),
        vue.createCommentVNode(' 这里进行空字符串判断，如果仅仅是v-if="label"，可能会出现传递0的时候，结果也无法显示 '),
        _ctx.label !== "" ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 2,
            class: "u-icon__label",
            style: vue.normalizeStyle({
              color: _ctx.labelColor,
              fontSize: _ctx.$u.addUnit(_ctx.labelSize),
              marginLeft: _ctx.labelPos == "right" ? _ctx.$u.addUnit(_ctx.space) : 0,
              marginTop: _ctx.labelPos == "bottom" ? _ctx.$u.addUnit(_ctx.space) : 0,
              marginRight: _ctx.labelPos == "left" ? _ctx.$u.addUnit(_ctx.space) : 0,
              marginBottom: _ctx.labelPos == "top" ? _ctx.$u.addUnit(_ctx.space) : 0
            })
          },
          vue.toDisplayString(_ctx.label),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_0$b = /* @__PURE__ */ _export_sfc(_sfc_main$V, [["render", _sfc_render$n], ["__scopeId", "data-v-ac70166d"], ["__file", "D:/projects/work/applet/vue3_uview_plus/uni_modules/uview-plus/components/u-icon/u-icon.vue"]]);
  const props$m = {
    props: {
      // 绑定的值
      modelValue: {
        type: [String, Number],
        default: props$o.input.value
      },
      // number-数字输入键盘，app-vue下可以输入浮点数，app-nvue和小程序平台下只能输入整数
      // idcard-身份证输入键盘，微信、支付宝、百度、QQ小程序
      // digit-带小数点的数字键盘，App的nvue页面、微信、支付宝、百度、头条、QQ小程序
      // text-文本输入键盘
      type: {
        type: String,
        default: props$o.input.type
      },
      // 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true，
      // 兼容性：微信小程序、百度小程序、字节跳动小程序、QQ小程序
      fixed: {
        type: Boolean,
        default: props$o.input.fixed
      },
      // 是否禁用输入框
      disabled: {
        type: Boolean,
        default: props$o.input.disabled
      },
      // 禁用状态时的背景色
      disabledColor: {
        type: String,
        default: props$o.input.disabledColor
      },
      // 是否显示清除控件
      clearable: {
        type: Boolean,
        default: props$o.input.clearable
      },
      // 是否密码类型
      password: {
        type: Boolean,
        default: props$o.input.password
      },
      // 最大输入长度，设置为 -1 的时候不限制最大长度
      maxlength: {
        type: [String, Number],
        default: props$o.input.maxlength
      },
      // 	输入框为空时的占位符
      placeholder: {
        type: String,
        default: props$o.input.placeholder
      },
      // 指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/
      placeholderClass: {
        type: String,
        default: props$o.input.placeholderClass
      },
      // 指定placeholder的样式
      placeholderStyle: {
        type: [String, Object],
        default: props$o.input.placeholderStyle
      },
      // 是否显示输入字数统计，只在 type ="text"或type ="textarea"时有效
      showWordLimit: {
        type: Boolean,
        default: props$o.input.showWordLimit
      },
      // 设置右下角按钮的文字，有效值：send|search|next|go|done，兼容性详见uni-app文档
      // https://uniapp.dcloud.io/component/input
      // https://uniapp.dcloud.io/component/textarea
      confirmType: {
        type: String,
        default: props$o.input.confirmType
      },
      // 点击键盘右下角按钮时是否保持键盘不收起，H5无效
      confirmHold: {
        type: Boolean,
        default: props$o.input.confirmHold
      },
      // focus时，点击页面的时候不收起键盘，微信小程序有效
      holdKeyboard: {
        type: Boolean,
        default: props$o.input.holdKeyboard
      },
      // 自动获取焦点
      // 在 H5 平台能否聚焦以及软键盘是否跟随弹出，取决于当前浏览器本身的实现。nvue 页面不支持，需使用组件的 focus()、blur() 方法控制焦点
      focus: {
        type: Boolean,
        default: props$o.input.focus
      },
      // 键盘收起时，是否自动失去焦点，目前仅App3.0.0+有效
      autoBlur: {
        type: Boolean,
        default: props$o.input.autoBlur
      },
      // 是否去掉 iOS 下的默认内边距，仅微信小程序，且type=textarea时有效
      disableDefaultPadding: {
        type: Boolean,
        default: props$o.input.disableDefaultPadding
      },
      // 指定focus时光标的位置
      cursor: {
        type: [String, Number],
        default: props$o.input.cursor
      },
      // 输入框聚焦时底部与键盘的距离
      cursorSpacing: {
        type: [String, Number],
        default: props$o.input.cursorSpacing
      },
      // 光标起始位置，自动聚集时有效，需与selection-end搭配使用
      selectionStart: {
        type: [String, Number],
        default: props$o.input.selectionStart
      },
      // 光标结束位置，自动聚集时有效，需与selection-start搭配使用
      selectionEnd: {
        type: [String, Number],
        default: props$o.input.selectionEnd
      },
      // 键盘弹起时，是否自动上推页面
      adjustPosition: {
        type: Boolean,
        default: props$o.input.adjustPosition
      },
      // 输入框内容对齐方式，可选值为：left|center|right
      inputAlign: {
        type: String,
        default: props$o.input.inputAlign
      },
      // 输入框字体的大小
      fontSize: {
        type: [String, Number],
        default: props$o.input.fontSize
      },
      // 输入框字体颜色
      color: {
        type: String,
        default: props$o.input.color
      },
      // 输入框前置图标
      prefixIcon: {
        type: String,
        default: props$o.input.prefixIcon
      },
      // 前置图标样式，对象或字符串
      prefixIconStyle: {
        type: [String, Object],
        default: props$o.input.prefixIconStyle
      },
      // 输入框后置图标
      suffixIcon: {
        type: String,
        default: props$o.input.suffixIcon
      },
      // 后置图标样式，对象或字符串
      suffixIconStyle: {
        type: [String, Object],
        default: props$o.input.suffixIconStyle
      },
      // 边框类型，surround-四周边框，bottom-底部边框，none-无边框
      border: {
        type: String,
        default: props$o.input.border
      },
      // 是否只读，与disabled不同之处在于disabled会置灰组件，而readonly则不会
      readonly: {
        type: Boolean,
        default: props$o.input.readonly
      },
      // 输入框形状，circle-圆形，square-方形
      shape: {
        type: String,
        default: props$o.input.shape
      },
      // 用于处理或者过滤输入框内容的方法
      formatter: {
        type: [Function, null],
        default: props$o.input.formatter
      },
      // 是否忽略组件内对文本合成系统事件的处理
      ignoreCompositionEvent: {
        type: Boolean,
        default: true
      }
    }
  };
  const _sfc_main$U = {
    name: "u-input",
    mixins: [mpMixin, mixin, props$m],
    data() {
      return {
        // 输入框的值
        innerValue: "",
        // 是否处于获得焦点状态
        focused: false,
        // value是否第一次变化，在watch中，由于加入immediate属性，会在第一次触发，此时不应该认为value发生了变化
        firstChange: true,
        // value绑定值的变化是由内部还是外部引起的
        changeFromInner: false,
        // 过滤处理方法
        innerFormatter: (value) => value
      };
    },
    watch: {
      modelValue: {
        immediate: true,
        handler(newVal, oldVal) {
          this.innerValue = newVal;
          this.firstChange = false;
          this.changeFromInner = false;
        }
      }
    },
    computed: {
      // 是否显示清除控件
      isShowClear() {
        const { clearable, readonly, focused, innerValue } = this;
        return !!clearable && !readonly && !!focused && innerValue !== "";
      },
      // 组件的类名
      inputClass() {
        let classes = [], { border, disabled, shape } = this;
        border === "surround" && (classes = classes.concat(["u-border", "u-input--radius"]));
        classes.push(`u-input--${shape}`);
        border === "bottom" && (classes = classes.concat([
          "u-border-bottom",
          "u-input--no-radius"
        ]));
        return classes.join(" ");
      },
      // 组件的样式
      wrapperStyle() {
        const style = {};
        if (this.disabled) {
          style.backgroundColor = this.disabledColor;
        }
        if (this.border === "none") {
          style.padding = "0";
        } else {
          style.paddingTop = "6px";
          style.paddingBottom = "6px";
          style.paddingLeft = "9px";
          style.paddingRight = "9px";
        }
        return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle));
      },
      // 输入框的样式
      inputStyle() {
        const style = {
          color: this.color,
          fontSize: uni.$u.addUnit(this.fontSize),
          textAlign: this.inputAlign
        };
        return style;
      }
    },
    emits: ["update:modelValue", "focus", "blur", "change", "confirm", "clear", "keyboardheightchange"],
    methods: {
      // 在微信小程序中，不支持将函数当做props参数，故只能通过ref形式调用
      setFormatter(e2) {
        this.innerFormatter = e2;
      },
      // 当键盘输入时，触发input事件
      onInput(e2) {
        let { value = "" } = e2.detail || {};
        const formatter = this.formatter || this.innerFormatter;
        const formatValue = formatter(value);
        this.innerValue = value;
        this.$nextTick(() => {
          this.innerValue = formatValue;
          this.valueChange();
        });
      },
      // 输入框失去焦点时触发
      onBlur(event) {
        this.$emit("blur", event.detail.value);
        uni.$u.sleep(50).then(() => {
          this.focused = false;
        });
        uni.$u.formValidate(this, "blur");
      },
      // 输入框聚焦时触发
      onFocus(event) {
        this.focused = true;
        this.$emit("focus");
      },
      // 点击完成按钮时触发
      onConfirm(event) {
        this.$emit("confirm", this.innerValue);
      },
      // 键盘高度发生变化的时候触发此事件
      // 兼容性：微信小程序2.7.0+、App 3.1.0+
      onkeyboardheightchange() {
        this.$emit("keyboardheightchange");
      },
      // 内容发生变化，进行处理
      valueChange() {
        const value = this.innerValue;
        this.$nextTick(() => {
          this.$emit("update:modelValue", value);
          this.changeFromInner = true;
          this.$emit("change", value);
          uni.$u.formValidate(this, "change");
        });
      },
      // 点击清除控件
      onClear() {
        this.innerValue = "";
        this.$nextTick(() => {
          this.valueChange();
          this.$emit("clear");
        });
      },
      /**
       * 在安卓nvue上，事件无法冒泡
       * 在某些时间，我们希望监听u-from-item的点击事件，此时会导致点击u-form-item内的u-input后
       * 无法触发u-form-item的点击事件，这里通过手动调用u-form-item的方法进行触发
       */
      clickHandler() {
      }
    }
  };
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$b);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-input", $options.inputClass]),
        style: vue.normalizeStyle([$options.wrapperStyle])
      },
      [
        vue.createElementVNode("view", { class: "u-input__content" }, [
          _ctx.prefixIcon || _ctx.$slots.prefix ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "u-input__content__prefix-icon"
          }, [
            vue.renderSlot(_ctx.$slots, "prefix", {}, () => [
              vue.createVNode(_component_u_icon, {
                name: _ctx.prefixIcon,
                size: "18",
                customStyle: _ctx.prefixIconStyle
              }, null, 8, ["name", "customStyle"])
            ], true)
          ])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", {
            class: "u-input__content__field-wrapper",
            onClick: _cache[5] || (_cache[5] = (...args) => $options.clickHandler && $options.clickHandler(...args))
          }, [
            vue.createCommentVNode(" 根据uni-app的input组件文档，H5和APP中只要声明了password参数(无论true还是false)，type均失效，此时\n					为了防止type=number时，又存在password属性，type无效，此时需要设置password为undefined\n				 "),
            vue.createElementVNode("input", {
              class: "u-input__content__field-wrapper__field",
              style: vue.normalizeStyle([$options.inputStyle]),
              type: _ctx.type,
              focus: _ctx.focus,
              cursor: _ctx.cursor,
              value: $data.innerValue,
              "auto-blur": _ctx.autoBlur,
              disabled: _ctx.disabled || _ctx.readonly,
              maxlength: _ctx.maxlength,
              placeholder: _ctx.placeholder,
              "placeholder-style": _ctx.placeholderStyle,
              "placeholder-class": _ctx.placeholderClass,
              "confirm-type": _ctx.confirmType,
              "confirm-hold": _ctx.confirmHold,
              "hold-keyboard": _ctx.holdKeyboard,
              "cursor-spacing": _ctx.cursorSpacing,
              "adjust-position": _ctx.adjustPosition,
              "selection-end": _ctx.selectionEnd,
              "selection-start": _ctx.selectionStart,
              password: _ctx.password || _ctx.type === "password" || void 0,
              ignoreCompositionEvent: _ctx.ignoreCompositionEvent,
              onInput: _cache[0] || (_cache[0] = (...args) => $options.onInput && $options.onInput(...args)),
              onBlur: _cache[1] || (_cache[1] = (...args) => $options.onBlur && $options.onBlur(...args)),
              onFocus: _cache[2] || (_cache[2] = (...args) => $options.onFocus && $options.onFocus(...args)),
              onConfirm: _cache[3] || (_cache[3] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
              onKeyboardheightchange: _cache[4] || (_cache[4] = (...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args))
            }, null, 44, ["type", "focus", "cursor", "value", "auto-blur", "disabled", "maxlength", "placeholder", "placeholder-style", "placeholder-class", "confirm-type", "confirm-hold", "hold-keyboard", "cursor-spacing", "adjust-position", "selection-end", "selection-start", "password", "ignoreCompositionEvent"])
          ]),
          $options.isShowClear ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "u-input__content__clear",
            onClick: _cache[6] || (_cache[6] = (...args) => $options.onClear && $options.onClear(...args))
          }, [
            vue.createVNode(_component_u_icon, {
              name: "close",
              size: "11",
              color: "#ffffff",
              customStyle: "line-height: 12px"
            })
          ])) : vue.createCommentVNode("v-if", true),
          _ctx.suffixIcon || _ctx.$slots.suffix ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 2,
            class: "u-input__content__subfix-icon"
          }, [
            vue.renderSlot(_ctx.$slots, "suffix", {}, () => [
              vue.createVNode(_component_u_icon, {
                name: _ctx.suffixIcon,
                size: "18",
                customStyle: _ctx.suffixIconStyle
              }, null, 8, ["name", "customStyle"])
            ], true)
          ])) : vue.createCommentVNode("v-if", true)
        ])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_1$6 = /* @__PURE__ */ _export_sfc(_sfc_main$U, [["render", _sfc_render$m], ["__scopeId", "data-v-df79975b"], ["__file", "D:/projects/work/applet/vue3_uview_plus/uni_modules/uview-plus/components/u-input/u-input.vue"]]);
  const props$l = {
    props: {
      // 是否显示组件
      show: {
        type: Boolean,
        default: props$o.loadingIcon.show
      },
      // 颜色
      color: {
        type: String,
        default: props$o.loadingIcon.color
      },
      // 提示文字颜色
      textColor: {
        type: String,
        default: props$o.loadingIcon.textColor
      },
      // 文字和图标是否垂直排列
      vertical: {
        type: Boolean,
        default: props$o.loadingIcon.vertical
      },
      // 模式选择，circle-圆形，spinner-花朵形，semicircle-半圆形
      mode: {
        type: String,
        default: props$o.loadingIcon.mode
      },
      // 图标大小，单位默认px
      size: {
        type: [String, Number],
        default: props$o.loadingIcon.size
      },
      // 文字大小
      textSize: {
        type: [String, Number],
        default: props$o.loadingIcon.textSize
      },
      // 文字内容
      text: {
        type: [String, Number],
        default: props$o.loadingIcon.text
      },
      // 动画模式
      timingFunction: {
        type: String,
        default: props$o.loadingIcon.timingFunction
      },
      // 动画执行周期时间
      duration: {
        type: [String, Number],
        default: props$o.loadingIcon.duration
      },
      // mode=circle时的暗边颜色
      inactiveColor: {
        type: String,
        default: props$o.loadingIcon.inactiveColor
      }
    }
  };
  const _sfc_main$T = {
    name: "u-loading-icon",
    mixins: [mpMixin, mixin, props$l],
    data() {
      return {
        // Array.form可以通过一个伪数组对象创建指定长度的数组
        // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from
        array12: Array.from({
          length: 12
        }),
        // 这里需要设置默认值为360，否则在安卓nvue上，会延迟一个duration周期后才执行
        // 在iOS nvue上，则会一开始默认执行两个周期的动画
        aniAngel: 360,
        // 动画旋转角度
        webviewHide: false,
        // 监听webview的状态，如果隐藏了页面，则停止动画，以免性能消耗
        loading: false
        // 是否运行中，针对nvue使用
      };
    },
    computed: {
      // 当为circle类型时，给其另外三边设置一个更轻一些的颜色
      // 之所以需要这么做的原因是，比如父组件传了color为红色，那么需要另外的三个边为浅红色
      // 而不能是固定的某一个其他颜色(因为这个固定的颜色可能浅蓝，导致效果没有那么细腻良好)
      otherBorderColor() {
        const lightColor = uni.$u.colorGradient(this.color, "#ffffff", 100)[80];
        if (this.mode === "circle") {
          return this.inactiveColor ? this.inactiveColor : lightColor;
        } else {
          return "transparent";
        }
      }
    },
    watch: {
      show(n2) {
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        setTimeout(() => {
          this.show && this.addEventListenerToWebview();
        }, 20);
      },
      // 监听webview的显示与隐藏
      addEventListenerToWebview() {
        const pages2 = getCurrentPages();
        const page2 = pages2[pages2.length - 1];
        const currentWebview = page2.$getAppWebview();
        currentWebview.addEventListener("hide", () => {
          this.webviewHide = true;
        });
        currentWebview.addEventListener("show", () => {
          this.webviewHide = false;
        });
      }
    }
  };
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    return _ctx.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["u-loading-icon", [_ctx.vertical && "u-loading-icon--vertical"]]),
        style: vue.normalizeStyle([_ctx.$u.addStyle(_ctx.customStyle)])
      },
      [
        !$data.webviewHide ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: vue.normalizeClass(["u-loading-icon__spinner", [`u-loading-icon__spinner--${_ctx.mode}`]]),
            ref: "ani",
            style: vue.normalizeStyle({
              color: _ctx.color,
              width: _ctx.$u.addUnit(_ctx.size),
              height: _ctx.$u.addUnit(_ctx.size),
              borderTopColor: _ctx.color,
              borderBottomColor: $options.otherBorderColor,
              borderLeftColor: $options.otherBorderColor,
              borderRightColor: $options.otherBorderColor,
              "animation-duration": `${_ctx.duration}ms`,
              "animation-timing-function": _ctx.mode === "semicircle" || _ctx.mode === "circle" ? _ctx.timingFunction : ""
            })
          },
          [
            _ctx.mode === "spinner" ? (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              { key: 0 },
              vue.renderList($data.array12, (item, index2) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index2,
                  class: "u-loading-icon__dot"
                });
              }),
              128
              /* KEYED_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true)
          ],
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true),
        _ctx.text ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 1,
            class: "u-loading-icon__text",
            style: vue.normalizeStyle({
              fontSize: _ctx.$u.addUnit(_ctx.textSize),
              color: _ctx.textColor
            })
          },
          vue.toDisplayString(_ctx.text),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_9 = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["render", _sfc_render$l], ["__scopeId", "data-v-2af81691"], ["__file", "D:/projects/work/applet/vue3_uview_plus/uni_modules/uview-plus/components/u-loading-icon/u-loading-icon.vue"]]);
  const props$k = {
    props: {
      // 是否细边框
      hairline: {
        type: Boolean,
        default: props$o.button.hairline
      },
      // 按钮的预置样式，info，primary，error，warning，success
      type: {
        type: String,
        default: props$o.button.type
      },
      // 按钮尺寸，large，normal，small，mini
      size: {
        type: String,
        default: props$o.button.size
      },
      // 按钮形状，circle（两边为半圆），square（带圆角）
      shape: {
        type: String,
        default: props$o.button.shape
      },
      // 按钮是否镂空
      plain: {
        type: Boolean,
        default: props$o.button.plain
      },
      // 是否禁止状态
      disabled: {
        type: Boolean,
        default: props$o.button.disabled
      },
      // 是否加载中
      loading: {
        type: Boolean,
        default: props$o.button.loading
      },
      // 加载中提示文字
      loadingText: {
        type: [String, Number],
        default: props$o.button.loadingText
      },
      // 加载状态图标类型
      loadingMode: {
        type: String,
        default: props$o.button.loadingMode
      },
      // 加载图标大小
      loadingSize: {
        type: [String, Number],
        default: props$o.button.loadingSize
      },
      // 开放能力，具体请看uniapp稳定关于button组件部分说明
      // https://uniapp.dcloud.io/component/button
      openType: {
        type: String,
        default: props$o.button.openType
      },
      // 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
      // 取值为submit（提交表单），reset（重置表单）
      formType: {
        type: String,
        default: props$o.button.formType
      },
      // 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
      // 只微信小程序、QQ小程序有效
      appParameter: {
        type: String,
        default: props$o.button.appParameter
      },
      // 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效
      hoverStopPropagation: {
        type: Boolean,
        default: props$o.button.hoverStopPropagation
      },
      // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。只微信小程序有效
      lang: {
        type: String,
        default: props$o.button.lang
      },
      // 会话来源，open-type="contact"时有效。只微信小程序有效
      sessionFrom: {
        type: String,
        default: props$o.button.sessionFrom
      },
      // 会话内消息卡片标题，open-type="contact"时有效
      // 默认当前标题，只微信小程序有效
      sendMessageTitle: {
        type: String,
        default: props$o.button.sendMessageTitle
      },
      // 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
      // 默认当前分享路径，只微信小程序有效
      sendMessagePath: {
        type: String,
        default: props$o.button.sendMessagePath
      },
      // 会话内消息卡片图片，open-type="contact"时有效
      // 默认当前页面截图，只微信小程序有效
      sendMessageImg: {
        type: String,
        default: props$o.button.sendMessageImg
      },
      // 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，
      // 用户点击后可以快速发送小程序消息，open-type="contact"时有效
      showMessageCard: {
        type: Boolean,
        default: props$o.button.showMessageCard
      },
      // 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取
      dataName: {
        type: String,
        default: props$o.button.dataName
      },
      // 节流，一定时间内只能触发一次
      throttleTime: {
        type: [String, Number],
        default: props$o.button.throttleTime
      },
      // 按住后多久出现点击态，单位毫秒
      hoverStartTime: {
        type: [String, Number],
        default: props$o.button.hoverStartTime
      },
      // 手指松开后点击态保留时间，单位毫秒
      hoverStayTime: {
        type: [String, Number],
        default: props$o.button.hoverStayTime
      },
      // 按钮文字，之所以通过props传入，是因为slot传入的话
      // nvue中无法控制文字的样式
      text: {
        type: [String, Number],
        default: props$o.button.text
      },
      // 按钮图标
      icon: {
        type: String,
        default: props$o.button.icon
      },
      // 按钮图标
      iconColor: {
        type: String,
        default: props$o.button.icon
      },
      // 按钮颜色，支持传入linear-gradient渐变色
      color: {
        type: String,
        default: props$o.button.color
      }
    }
  };
  const _sfc_main$S = {
    name: "u-button",
    mixins: [mpMixin, mixin, props$k],
    data() {
      return {};
    },
    computed: {
      // 生成bem风格的类名
      bemClass() {
        if (!this.color) {
          return this.bem(
            "button",
            ["type", "shape", "size"],
            ["disabled", "plain", "hairline"]
          );
        } else {
          return this.bem(
            "button",
            ["shape", "size"],
            ["disabled", "plain", "hairline"]
          );
        }
      },
      loadingColor() {
        if (this.plain) {
          return this.color ? this.color : uni.$u.config.color[`u-${this.type}`];
        }
        if (this.type === "info") {
          return "#c9c9c9";
        }
        return "rgb(200, 200, 200)";
      },
      iconColorCom() {
        if (this.iconColor)
          return this.iconColor;
        if (this.plain) {
          return this.color ? this.color : this.type;
        } else {
          return this.type === "info" ? "#000000" : "#ffffff";
        }
      },
      baseColor() {
        let style = {};
        if (this.color) {
          style.color = this.plain ? this.color : "white";
          if (!this.plain) {
            style["background-color"] = this.color;
          }
          if (this.color.indexOf("gradient") !== -1) {
            style.borderTopWidth = 0;
            style.borderRightWidth = 0;
            style.borderBottomWidth = 0;
            style.borderLeftWidth = 0;
            if (!this.plain) {
              style.backgroundImage = this.color;
            }
          } else {
            style.borderColor = this.color;
            style.borderWidth = "1px";
            style.borderStyle = "solid";
          }
        }
        return style;
      },
      // nvue版本按钮的字体不会继承父组件的颜色，需要对每一个text组件进行单独的设置
      nvueTextStyle() {
        let style = {};
        if (this.type === "info") {
          style.color = "#323233";
        }
        if (this.color) {
          style.color = this.plain ? this.color : "white";
        }
        style.fontSize = this.textSize + "px";
        return style;
      },
      // 字体大小
      textSize() {
        let fontSize = 14, { size } = this;
        if (size === "large")
          fontSize = 16;
        if (size === "normal")
          fontSize = 14;
        if (size === "small")
          fontSize = 12;
        if (size === "mini")
          fontSize = 10;
        return fontSize;
      }
    },
    emits: [
      "click",
      "getphonenumber",
      "getuserinfo",
      "error",
      "opensetting",
      "launchapp"
    ],
    methods: {
      clickHandler() {
        if (!this.disabled && !this.loading) {
          uni.$u.throttle(() => {
            this.$emit("click");
          }, this.throttleTime);
        }
      },
      // 下面为对接uniapp官方按钮开放能力事件回调的对接
      getphonenumber(res) {
        this.$emit("getphonenumber", res);
      },
      getuserinfo(res) {
        this.$emit("getuserinfo", res);
      },
      error(res) {
        this.$emit("error", res);
      },
      opensetting(res) {
        this.$emit("opensetting", res);
      },
      launchapp(res) {
        this.$emit("launchapp", res);
      }
    }
  };
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_loading_icon = resolveEasycom(vue.resolveDynamicComponent("u-loading-icon"), __easycom_9);
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$b);
    return vue.openBlock(), vue.createElementBlock("button", {
      "hover-start-time": Number(_ctx.hoverStartTime),
      "hover-stay-time": Number(_ctx.hoverStayTime),
      "form-type": _ctx.formType,
      "open-type": _ctx.openType,
      "app-parameter": _ctx.appParameter,
      "hover-stop-propagation": _ctx.hoverStopPropagation,
      "send-message-title": _ctx.sendMessageTitle,
      "send-message-path": _ctx.sendMessagePath,
      lang: _ctx.lang,
      "data-name": _ctx.dataName,
      "session-from": _ctx.sessionFrom,
      "send-message-img": _ctx.sendMessageImg,
      "show-message-card": _ctx.showMessageCard,
      onGetphonenumber: _cache[0] || (_cache[0] = (...args) => $options.getphonenumber && $options.getphonenumber(...args)),
      onGetuserinfo: _cache[1] || (_cache[1] = (...args) => $options.getuserinfo && $options.getuserinfo(...args)),
      onError: _cache[2] || (_cache[2] = (...args) => $options.error && $options.error(...args)),
      onOpensetting: _cache[3] || (_cache[3] = (...args) => $options.opensetting && $options.opensetting(...args)),
      onLaunchapp: _cache[4] || (_cache[4] = (...args) => $options.launchapp && $options.launchapp(...args)),
      "hover-class": !_ctx.disabled && !_ctx.loading ? "u-button--active" : "",
      class: vue.normalizeClass(["u-button u-reset-button", $options.bemClass]),
      style: vue.normalizeStyle([$options.baseColor, _ctx.$u.addStyle(_ctx.customStyle)]),
      onClick: _cache[5] || (_cache[5] = (...args) => $options.clickHandler && $options.clickHandler(...args))
    }, [
      _ctx.loading ? (vue.openBlock(), vue.createElementBlock(
        vue.Fragment,
        { key: 0 },
        [
          vue.createVNode(_component_u_loading_icon, {
            mode: _ctx.loadingMode,
            size: _ctx.loadingSize * 1.15,
            color: $options.loadingColor
          }, null, 8, ["mode", "size", "color"]),
          vue.createElementVNode(
            "text",
            {
              class: "u-button__loading-text",
              style: vue.normalizeStyle([{ fontSize: $options.textSize + "px" }])
            },
            vue.toDisplayString(_ctx.loadingText || _ctx.text),
            5
            /* TEXT, STYLE */
          )
        ],
        64
        /* STABLE_FRAGMENT */
      )) : (vue.openBlock(), vue.createElementBlock(
        vue.Fragment,
        { key: 1 },
        [
          _ctx.icon ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
            key: 0,
            name: _ctx.icon,
            color: $options.iconColorCom,
            size: $options.textSize * 1.35,
            customStyle: { marginRight: "2px" }
          }, null, 8, ["name", "color", "size"])) : vue.createCommentVNode("v-if", true),
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            vue.createElementVNode(
              "text",
              {
                class: "u-button__text",
                style: vue.normalizeStyle([{ fontSize: $options.textSize + "px" }])
              },
              vue.toDisplayString(_ctx.text),
              5
              /* TEXT, STYLE */
            )
          ], true)
        ],
        64
        /* STABLE_FRAGMENT */
      ))
    ], 46, ["hover-start-time", "hover-stay-time", "form-type", "open-type", "app-parameter", "hover-stop-propagation", "send-message-title", "send-message-path", "lang", "data-name", "session-from", "send-message-img", "show-message-card", "hover-class"]);
  }
  const __easycom_0$a = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["render", _sfc_render$k], ["__scopeId", "data-v-5ce41ee6"], ["__file", "D:/projects/work/applet/vue3_uview_plus/uni_modules/uview-plus/components/u-button/u-button.vue"]]);
  const props$j = {
    props: {
      bgColor: {
        type: String,
        default: props$o.statusBar.bgColor
      }
    }
  };
  const _sfc_main$R = {
    name: "u-status-bar",
    mixins: [mpMixin, mixin, props$j],
    data() {
      return {};
    },
    computed: {
      style() {
        const style = {};
        style.height = uni.$u.addUnit(uni.$u.sys().statusBarHeight, "px");
        style.backgroundColor = this.bgColor;
        return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle));
      }
    }
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        style: vue.normalizeStyle([$options.style]),
        class: "u-status-bar"
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_1$5 = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["render", _sfc_render$j], ["__scopeId", "data-v-eb8e0cdd"], ["__file", "D:/projects/work/applet/vue3_uview_plus/uni_modules/uview-plus/components/u-status-bar/u-status-bar.vue"]]);
  const props$i = {
    props: {
      // 是否展示组件
      show: {
        type: Boolean,
        default: props$o.transition.show
      },
      // 使用的动画模式
      mode: {
        type: String,
        default: props$o.transition.mode
      },
      // 动画的执行时间，单位ms
      duration: {
        type: [String, Number],
        default: props$o.transition.duration
      },
      // 使用的动画过渡函数
      timingFunction: {
        type: String,
        default: props$o.transition.timingFunction
      }
    }
  };
  const getClassNames = (name) => ({
    enter: `u-${name}-enter u-${name}-enter-active`,
    "enter-to": `u-${name}-enter-to u-${name}-enter-active`,
    leave: `u-${name}-leave u-${name}-leave-active`,
    "leave-to": `u-${name}-leave-to u-${name}-leave-active`
  });
  const transition = {
    methods: {
      // 组件被点击发出事件
      clickHandler() {
        this.$emit("click");
      },
      // vue版本的组件进场处理
      async vueEnter() {
        const classNames = getClassNames(this.mode);
        this.status = "enter";
        this.$emit("beforeEnter");
        this.inited = true;
        this.display = true;
        this.classes = classNames.enter;
        await vue.nextTick();
        {
          this.$emit("enter");
          this.transitionEnded = false;
          this.$emit("afterEnter");
          this.classes = classNames["enter-to"];
        }
      },
      // 动画离场处理
      async vueLeave() {
        if (!this.display)
          return;
        const classNames = getClassNames(this.mode);
        this.status = "leave";
        this.$emit("beforeLeave");
        this.classes = classNames.leave;
        await vue.nextTick();
        {
          this.transitionEnded = false;
          this.$emit("leave");
          setTimeout(this.onTransitionEnd, this.duration);
          this.classes = classNames["leave-to"];
        }
      },
      // 完成过渡后触发
      onTransitionEnd() {
        if (this.transitionEnded)
          return;
        this.transitionEnded = true;
        this.$emit(this.status === "leave" ? "afterLeave" : "afterEnter");
        if (!this.show && this.display) {
          this.display = false;
          this.inited = false;
        }
      }
    }
  };
  const _sfc_main$Q = {
    name: "u-transition",
    data() {
      return {
        inited: false,
        // 是否显示/隐藏组件
        viewStyle: {},
        // 组件内部的样式
        status: "",
        // 记录组件动画的状态
        transitionEnded: false,
        // 组件是否结束的标记
        display: false,
        // 组件是否展示
        classes: ""
        // 应用的类名
      };
    },
    emits: ["click", "beforeEnter", "enter", "afterEnter", "beforeLeave", "leave", "afterLeave"],
    computed: {
      mergeStyle() {
        const { viewStyle, customStyle } = this;
        return {
          transitionDuration: `${this.duration}ms`,
          // display: `${this.display ? '' : 'none'}`,
          transitionTimingFunction: this.timingFunction,
          // 避免自定义样式影响到动画属性，所以写在viewStyle前面
          ...uni.$u.addStyle(customStyle),
          ...viewStyle
        };
      }
    },
    // 将mixin挂在到组件中，uni.$u.mixin实际上为一个vue格式对象
    mixins: [mpMixin, mixin, transition, props$i],
    watch: {
      show: {
        handler(newVal) {
          newVal ? this.vueEnter() : this.vueLeave();
        },
        // 表示同时监听初始化时的props的show的意思
        immediate: true
      }
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    return $data.inited ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["u-transition", $data.classes]),
        ref: "u-transition",
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.clickHandler && _ctx.clickHandler(...args)),
        style: vue.normalizeStyle([$options.mergeStyle]),
        onTouchmove: _cache[1] || (_cache[1] = (...args) => _ctx.noop && _ctx.noop(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      38
      /* CLASS, STYLE, HYDRATE_EVENTS */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$9 = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["render", _sfc_render$i], ["__scopeId", "data-v-5cec8177"], ["__file", "D:/projects/work/applet/vue3_uview_plus/uni_modules/uview-plus/components/u-transition/u-transition.vue"]]);
  const props$h = {
    props: {
      // 到顶部的距离
      top: {
        type: [String, Number],
        default: props$o.notify.top
      },
      // 是否展示组件
      // show: {
      // 	type: Boolean,
      // 	default: defprops.notify.show
      // },
      // type主题，primary，success，warning，error
      type: {
        type: String,
        default: props$o.notify.type
      },
      // 字体颜色
      color: {
        type: String,
        default: props$o.notify.color
      },
      // 背景颜色
      bgColor: {
        type: String,
        default: props$o.notify.bgColor
      },
      // 展示的文字内容
      message: {
        type: String,
        default: props$o.notify.message
      },
      // 展示时长，为0时不消失，单位ms
      duration: {
        type: [String, Number],
        default: props$o.notify.duration
      },
      // 字体大小
      fontSize: {
        type: [String, Number],
        default: props$o.notify.fontSize
      },
      // 是否留出顶部安全距离（状态栏高度）
      safeAreaInsetTop: {
        type: Boolean,
        default: props$o.notify.safeAreaInsetTop
      }
    }
  };
  const _sfc_main$P = {
    name: "u-notify",
    mixins: [mpMixin, mixin, props$h],
    data() {
      return {
        // 是否展示组件
        open: false,
        timer: null,
        config: {
          // 到顶部的距离
          top: uni.$u.props.notify.top,
          // type主题，primary，success，warning，error
          type: uni.$u.props.notify.type,
          // 字体颜色
          color: uni.$u.props.notify.color,
          // 背景颜色
          bgColor: uni.$u.props.notify.bgColor,
          // 展示的文字内容
          message: uni.$u.props.notify.message,
          // 展示时长，为0时不消失，单位ms
          duration: uni.$u.props.notify.duration,
          // 字体大小
          fontSize: uni.$u.props.notify.fontSize,
          // 是否留出顶部安全距离（状态栏高度）
          safeAreaInsetTop: uni.$u.props.notify.safeAreaInsetTop
        },
        // 合并后的配置，避免多次调用组件后，可能会复用之前使用的配置参数
        tmpConfig: {}
      };
    },
    computed: {
      containerStyle() {
        let top = 0;
        if (this.tmpConfig.top === 0)
          ;
        const style = {
          top: uni.$u.addUnit(this.tmpConfig.top === 0 ? top : this.tmpConfig.top),
          // 因为组件底层为u-transition组件，必须将其设置为fixed定位
          // 让其出现在导航栏底部
          position: "fixed",
          left: 0,
          right: 0,
          zIndex: 10076
        };
        return style;
      },
      // 组件背景颜色
      backgroundColor() {
        const style = {};
        if (this.tmpConfig.bgColor) {
          style.backgroundColor = this.tmpConfig.bgColor;
        }
        return style;
      },
      // 默认主题下的图标
      icon() {
        let icon;
        if (this.tmpConfig.type === "success") {
          icon = "checkmark-circle";
        } else if (this.tmpConfig.type === "error") {
          icon = "close-circle";
        } else if (this.tmpConfig.type === "warning") {
          icon = "error-circle";
        }
        return icon;
      }
    },
    created() {
      ["primary", "success", "error", "warning"].map((item) => {
        this[item] = (message) => this.show({
          type: item,
          message
        });
      });
    },
    methods: {
      show(options) {
        this.tmpConfig = uni.$u.deepMerge(this.config, options);
        this.clearTimer();
        this.open = true;
        if (this.tmpConfig.duration > 0) {
          this.timer = setTimeout(() => {
            this.open = false;
            this.clearTimer();
            typeof this.tmpConfig.complete === "function" && this.tmpConfig.complete();
          }, this.tmpConfig.duration);
        }
      },
      // 关闭notify
      close() {
        this.clearTimer();
      },
      clearTimer() {
        this.open = false;
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
    beforeDestroy() {
      this.clearTimer();
    }
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_status_bar = resolveEasycom(vue.resolveDynamicComponent("u-status-bar"), __easycom_1$5);
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$b);
    const _component_u_transition = resolveEasycom(vue.resolveDynamicComponent("u-transition"), __easycom_0$9);
    return vue.openBlock(), vue.createBlock(_component_u_transition, {
      mode: "slide-down",
      customStyle: $options.containerStyle,
      show: $data.open
    }, {
      default: vue.withCtx(() => [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["u-notify", [`u-notify--${$data.tmpConfig.type}`]]),
            style: vue.normalizeStyle([$options.backgroundColor, _ctx.$u.addStyle(_ctx.customStyle)])
          },
          [
            $data.tmpConfig.safeAreaInsetTop ? (vue.openBlock(), vue.createBlock(_component_u_status_bar, { key: 0 })) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("view", { class: "u-notify__warpper" }, [
              vue.renderSlot(_ctx.$slots, "icon", {}, () => [
                ["success", "warning", "error"].includes($data.tmpConfig.type) ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
                  key: 0,
                  name: $data.tmpConfig.icon,
                  color: $data.tmpConfig.color,
                  size: 1.3 * $data.tmpConfig.fontSize,
                  customStyle: { marginRight: "4px" }
                }, null, 8, ["name", "color", "size"])) : vue.createCommentVNode("v-if", true)
              ], true),
              vue.createElementVNode(
                "text",
                {
                  class: "u-notify__warpper__text",
                  style: vue.normalizeStyle({
                    fontSize: _ctx.$u.addUnit($data.tmpConfig.fontSize),
                    color: $data.tmpConfig.color
                  })
                },
                vue.toDisplayString($data.tmpConfig.message),
                5
                /* TEXT, STYLE */
              )
            ])
          ],
          6
          /* CLASS, STYLE */
        )
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["customStyle", "show"]);
  }
  const __easycom_2$3 = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["render", _sfc_render$h], ["__scopeId", "data-v-67836363"], ["__file", "D:/projects/work/applet/vue3_uview_plus/uni_modules/uview-plus/components/u-notify/u-notify.vue"]]);
  var isVue2 = false;
  function set(target, key, val) {
    if (Array.isArray(target)) {
      target.length = Math.max(target.length, key);
      target.splice(key, 1, val);
      return val;
    }
    target[key] = val;
    return val;
  }
  function del(target, key) {
    if (Array.isArray(target)) {
      target.splice(key, 1);
      return;
    }
    delete target[key];
  }
  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
  }
  const isProxyAvailable = typeof Proxy === "function";
  const HOOK_SETUP = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
  let supported;
  let perf;
  function isPerformanceSupported() {
    var _a;
    if (supported !== void 0) {
      return supported;
    }
    if (typeof window !== "undefined" && window.performance) {
      supported = true;
      perf = window.performance;
    } else if (typeof global !== "undefined" && ((_a = global.perf_hooks) === null || _a === void 0 ? void 0 : _a.performance)) {
      supported = true;
      perf = global.perf_hooks.performance;
    } else {
      supported = false;
    }
    return supported;
  }
  function now() {
    return isPerformanceSupported() ? perf.now() : Date.now();
  }
  class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = Object.assign({}, defaultSettings);
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e2) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e2) {
          }
          currentSettings = value;
        },
        now() {
          return now();
        }
      };
      if (hook) {
        hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
          if (pluginId === this.plugin.id) {
            this.fallbacks.setSettings(value);
          }
        });
      }
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  }
  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const descriptor = pluginDescriptor;
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor: descriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
    * pinia v2.0.33
    * (c) 2023 Eduardo San Martin Morote
    * @license MIT
    */
  let activePinia;
  const setActivePinia = (pinia) => activePinia = pinia;
  const getActivePinia = () => vue.getCurrentInstance() && vue.inject(piniaSymbol) || activePinia;
  const piniaSymbol = Symbol("pinia");
  function isPlainObject$1(o2) {
    return o2 && typeof o2 === "object" && Object.prototype.toString.call(o2) === "[object Object]" && typeof o2.toJSON !== "function";
  }
  var MutationType;
  (function(MutationType2) {
    MutationType2["direct"] = "direct";
    MutationType2["patchObject"] = "patch object";
    MutationType2["patchFunction"] = "patch function";
  })(MutationType || (MutationType = {}));
  const IS_CLIENT = typeof window !== "undefined";
  const USE_DEVTOOLS = IS_CLIENT;
  const _global = /* @__PURE__ */ (() => typeof window === "object" && window.window === window ? window : typeof self === "object" && self.self === self ? self : typeof global === "object" && global.global === global ? global : typeof globalThis === "object" ? globalThis : { HTMLElement: null })();
  function bom(blob, { autoBom = false } = {}) {
    if (autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
      return new Blob([String.fromCharCode(65279), blob], { type: blob.type });
    }
    return blob;
  }
  function download(url2, name, opts) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url2);
    xhr.responseType = "blob";
    xhr.onload = function() {
      saveAs(xhr.response, name, opts);
    };
    xhr.onerror = function() {
      console.error("could not download file");
    };
    xhr.send();
  }
  function corsEnabled(url2) {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", url2, false);
    try {
      xhr.send();
    } catch (e2) {
    }
    return xhr.status >= 200 && xhr.status <= 299;
  }
  function click(node) {
    try {
      node.dispatchEvent(new MouseEvent("click"));
    } catch (e2) {
      const evt = document.createEvent("MouseEvents");
      evt.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
      node.dispatchEvent(evt);
    }
  }
  const _navigator = typeof navigator === "object" ? navigator : { userAgent: "" };
  const isMacOSWebView = /* @__PURE__ */ (() => /Macintosh/.test(_navigator.userAgent) && /AppleWebKit/.test(_navigator.userAgent) && !/Safari/.test(_navigator.userAgent))();
  const saveAs = !IS_CLIENT ? () => {
  } : (
    // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
    typeof HTMLAnchorElement !== "undefined" && "download" in HTMLAnchorElement.prototype && !isMacOSWebView ? downloadSaveAs : (
      // Use msSaveOrOpenBlob as a second approach
      "msSaveOrOpenBlob" in _navigator ? msSaveAs : (
        // Fallback to using FileReader and a popup
        fileSaverSaveAs
      )
    )
  );
  function downloadSaveAs(blob, name = "download", opts) {
    const a2 = document.createElement("a");
    a2.download = name;
    a2.rel = "noopener";
    if (typeof blob === "string") {
      a2.href = blob;
      if (a2.origin !== location.origin) {
        if (corsEnabled(a2.href)) {
          download(blob, name, opts);
        } else {
          a2.target = "_blank";
          click(a2);
        }
      } else {
        click(a2);
      }
    } else {
      a2.href = URL.createObjectURL(blob);
      setTimeout(function() {
        URL.revokeObjectURL(a2.href);
      }, 4e4);
      setTimeout(function() {
        click(a2);
      }, 0);
    }
  }
  function msSaveAs(blob, name = "download", opts) {
    if (typeof blob === "string") {
      if (corsEnabled(blob)) {
        download(blob, name, opts);
      } else {
        const a2 = document.createElement("a");
        a2.href = blob;
        a2.target = "_blank";
        setTimeout(function() {
          click(a2);
        });
      }
    } else {
      navigator.msSaveOrOpenBlob(bom(blob, opts), name);
    }
  }
  function fileSaverSaveAs(blob, name, opts, popup) {
    popup = popup || open("", "_blank");
    if (popup) {
      popup.document.title = popup.document.body.innerText = "downloading...";
    }
    if (typeof blob === "string")
      return download(blob, name, opts);
    const force = blob.type === "application/octet-stream";
    const isSafari = /constructor/i.test(String(_global.HTMLElement)) || "safari" in _global;
    const isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);
    if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== "undefined") {
      const reader = new FileReader();
      reader.onloadend = function() {
        let url2 = reader.result;
        if (typeof url2 !== "string") {
          popup = null;
          throw new Error("Wrong reader.result type");
        }
        url2 = isChromeIOS ? url2 : url2.replace(/^data:[^;]*;/, "data:attachment/file;");
        if (popup) {
          popup.location.href = url2;
        } else {
          location.assign(url2);
        }
        popup = null;
      };
      reader.readAsDataURL(blob);
    } else {
      const url2 = URL.createObjectURL(blob);
      if (popup)
        popup.location.assign(url2);
      else
        location.href = url2;
      popup = null;
      setTimeout(function() {
        URL.revokeObjectURL(url2);
      }, 4e4);
    }
  }
  function toastMessage(message, type) {
    const piniaMessage = "🍍 " + message;
    if (typeof __VUE_DEVTOOLS_TOAST__ === "function") {
      __VUE_DEVTOOLS_TOAST__(piniaMessage, type);
    } else if (type === "error") {
      console.error(piniaMessage);
    } else if (type === "warn") {
      console.warn(piniaMessage);
    } else {
      console.log(piniaMessage);
    }
  }
  function isPinia(o2) {
    return "_a" in o2 && "install" in o2;
  }
  function checkClipboardAccess() {
    if (!("clipboard" in navigator)) {
      toastMessage(`Your browser doesn't support the Clipboard API`, "error");
      return true;
    }
  }
  function checkNotFocusedError(error2) {
    if (error2 instanceof Error && error2.message.toLowerCase().includes("document is not focused")) {
      toastMessage('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn");
      return true;
    }
    return false;
  }
  async function actionGlobalCopyState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(pinia.state.value));
      toastMessage("Global state copied to clipboard.");
    } catch (error2) {
      if (checkNotFocusedError(error2))
        return;
      toastMessage(`Failed to serialize the state. Check the console for more details.`, "error");
      console.error(error2);
    }
  }
  async function actionGlobalPasteState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      pinia.state.value = JSON.parse(await navigator.clipboard.readText());
      toastMessage("Global state pasted from clipboard.");
    } catch (error2) {
      if (checkNotFocusedError(error2))
        return;
      toastMessage(`Failed to deserialize the state from clipboard. Check the console for more details.`, "error");
      console.error(error2);
    }
  }
  async function actionGlobalSaveState(pinia) {
    try {
      saveAs(new Blob([JSON.stringify(pinia.state.value)], {
        type: "text/plain;charset=utf-8"
      }), "pinia-state.json");
    } catch (error2) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error2);
    }
  }
  let fileInput;
  function getFileOpener() {
    if (!fileInput) {
      fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".json";
    }
    function openFile() {
      return new Promise((resolve, reject) => {
        fileInput.onchange = async () => {
          const files = fileInput.files;
          if (!files)
            return resolve(null);
          const file = files.item(0);
          if (!file)
            return resolve(null);
          return resolve({ text: await file.text(), file });
        };
        fileInput.oncancel = () => resolve(null);
        fileInput.onerror = reject;
        fileInput.click();
      });
    }
    return openFile;
  }
  async function actionGlobalOpenStateFile(pinia) {
    try {
      const open2 = await getFileOpener();
      const result = await open2();
      if (!result)
        return;
      const { text, file } = result;
      pinia.state.value = JSON.parse(text);
      toastMessage(`Global state imported from "${file.name}".`);
    } catch (error2) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error2);
    }
  }
  function formatDisplay(display) {
    return {
      _custom: {
        display
      }
    };
  }
  const PINIA_ROOT_LABEL = "🍍 Pinia (root)";
  const PINIA_ROOT_ID = "_root";
  function formatStoreForInspectorTree(store) {
    return isPinia(store) ? {
      id: PINIA_ROOT_ID,
      label: PINIA_ROOT_LABEL
    } : {
      id: store.$id,
      label: store.$id
    };
  }
  function formatStoreForInspectorState(store) {
    if (isPinia(store)) {
      const storeNames = Array.from(store._s.keys());
      const storeMap = store._s;
      const state2 = {
        state: storeNames.map((storeId) => ({
          editable: true,
          key: storeId,
          value: store.state.value[storeId]
        })),
        getters: storeNames.filter((id) => storeMap.get(id)._getters).map((id) => {
          const store2 = storeMap.get(id);
          return {
            editable: false,
            key: id,
            value: store2._getters.reduce((getters, key) => {
              getters[key] = store2[key];
              return getters;
            }, {})
          };
        })
      };
      return state2;
    }
    const state = {
      state: Object.keys(store.$state).map((key) => ({
        editable: true,
        key,
        value: store.$state[key]
      }))
    };
    if (store._getters && store._getters.length) {
      state.getters = store._getters.map((getterName) => ({
        editable: false,
        key: getterName,
        value: store[getterName]
      }));
    }
    if (store._customProperties.size) {
      state.customProperties = Array.from(store._customProperties).map((key) => ({
        editable: true,
        key,
        value: store[key]
      }));
    }
    return state;
  }
  function formatEventData(events) {
    if (!events)
      return {};
    if (Array.isArray(events)) {
      return events.reduce((data, event) => {
        data.keys.push(event.key);
        data.operations.push(event.type);
        data.oldValue[event.key] = event.oldValue;
        data.newValue[event.key] = event.newValue;
        return data;
      }, {
        oldValue: {},
        keys: [],
        operations: [],
        newValue: {}
      });
    } else {
      return {
        operation: formatDisplay(events.type),
        key: formatDisplay(events.key),
        oldValue: events.oldValue,
        newValue: events.newValue
      };
    }
  }
  function formatMutationType(type) {
    switch (type) {
      case MutationType.direct:
        return "mutation";
      case MutationType.patchFunction:
        return "$patch";
      case MutationType.patchObject:
        return "$patch";
      default:
        return "unknown";
    }
  }
  let isTimelineActive = true;
  const componentStateTypes = [];
  const MUTATIONS_LAYER_ID = "pinia:mutations";
  const INSPECTOR_ID = "pinia";
  const { assign: assign$1 } = Object;
  const getStoreType = (id) => "🍍 " + id;
  function registerPiniaDevtools(app, pinia) {
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app
    }, (api) => {
      if (typeof api.now !== "function") {
        toastMessage("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
      }
      api.addTimelineLayer({
        id: MUTATIONS_LAYER_ID,
        label: `Pinia 🍍`,
        color: 15064968
      });
      api.addInspector({
        id: INSPECTOR_ID,
        label: "Pinia 🍍",
        icon: "storage",
        treeFilterPlaceholder: "Search stores",
        actions: [
          {
            icon: "content_copy",
            action: () => {
              actionGlobalCopyState(pinia);
            },
            tooltip: "Serialize and copy the state"
          },
          {
            icon: "content_paste",
            action: async () => {
              await actionGlobalPasteState(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Replace the state with the content of your clipboard"
          },
          {
            icon: "save",
            action: () => {
              actionGlobalSaveState(pinia);
            },
            tooltip: "Save the state as a JSON file"
          },
          {
            icon: "folder_open",
            action: async () => {
              await actionGlobalOpenStateFile(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Import the state from a JSON file"
          }
        ],
        nodeActions: [
          {
            icon: "restore",
            tooltip: "Reset the state (option store only)",
            action: (nodeId) => {
              const store = pinia._s.get(nodeId);
              if (!store) {
                toastMessage(`Cannot reset "${nodeId}" store because it wasn't found.`, "warn");
              } else if (!store._isOptionsAPI) {
                toastMessage(`Cannot reset "${nodeId}" store because it's a setup store.`, "warn");
              } else {
                store.$reset();
                toastMessage(`Store "${nodeId}" reset.`);
              }
            }
          }
        ]
      });
      api.on.inspectComponent((payload, ctx) => {
        const proxy = payload.componentInstance && payload.componentInstance.proxy;
        if (proxy && proxy._pStores) {
          const piniaStores = payload.componentInstance.proxy._pStores;
          Object.values(piniaStores).forEach((store) => {
            payload.instanceData.state.push({
              type: getStoreType(store.$id),
              key: "state",
              editable: true,
              value: store._isOptionsAPI ? {
                _custom: {
                  value: vue.toRaw(store.$state),
                  actions: [
                    {
                      icon: "restore",
                      tooltip: "Reset the state of this store",
                      action: () => store.$reset()
                    }
                  ]
                }
              } : (
                // NOTE: workaround to unwrap transferred refs
                Object.keys(store.$state).reduce((state, key) => {
                  state[key] = store.$state[key];
                  return state;
                }, {})
              )
            });
            if (store._getters && store._getters.length) {
              payload.instanceData.state.push({
                type: getStoreType(store.$id),
                key: "getters",
                editable: false,
                value: store._getters.reduce((getters, key) => {
                  try {
                    getters[key] = store[key];
                  } catch (error2) {
                    getters[key] = error2;
                  }
                  return getters;
                }, {})
              });
            }
          });
        }
      });
      api.on.getInspectorTree((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          let stores = [pinia];
          stores = stores.concat(Array.from(pinia._s.values()));
          payload.rootNodes = (payload.filter ? stores.filter((store) => "$id" in store ? store.$id.toLowerCase().includes(payload.filter.toLowerCase()) : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase())) : stores).map(formatStoreForInspectorTree);
        }
      });
      api.on.getInspectorState((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return;
          }
          if (inspectedStore) {
            payload.state = formatStoreForInspectorState(inspectedStore);
          }
        }
      });
      api.on.editInspectorState((payload, ctx) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return toastMessage(`store "${payload.nodeId}" not found`, "error");
          }
          const { path } = payload;
          if (!isPinia(inspectedStore)) {
            if (path.length !== 1 || !inspectedStore._customProperties.has(path[0]) || path[0] in inspectedStore.$state) {
              path.unshift("$state");
            }
          } else {
            path.unshift("state");
          }
          isTimelineActive = false;
          payload.set(inspectedStore, path, payload.state.value);
          isTimelineActive = true;
        }
      });
      api.on.editComponentState((payload) => {
        if (payload.type.startsWith("🍍")) {
          const storeId = payload.type.replace(/^🍍\s*/, "");
          const store = pinia._s.get(storeId);
          if (!store) {
            return toastMessage(`store "${storeId}" not found`, "error");
          }
          const { path } = payload;
          if (path[0] !== "state") {
            return toastMessage(`Invalid path for store "${storeId}":
${path}
Only state can be modified.`);
          }
          path[0] = "$state";
          isTimelineActive = false;
          payload.set(store, path, payload.state.value);
          isTimelineActive = true;
        }
      });
    });
  }
  function addStoreToDevtools(app, store) {
    if (!componentStateTypes.includes(getStoreType(store.$id))) {
      componentStateTypes.push(getStoreType(store.$id));
    }
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app,
      settings: {
        logStoreChanges: {
          label: "Notify about new/deleted stores",
          type: "boolean",
          defaultValue: true
        }
        // useEmojis: {
        //   label: 'Use emojis in messages ⚡️',
        //   type: 'boolean',
        //   defaultValue: true,
        // },
      }
    }, (api) => {
      const now2 = typeof api.now === "function" ? api.now.bind(api) : Date.now;
      store.$onAction(({ after, onError, name, args }) => {
        const groupId = runningActionId++;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🛫 " + name,
            subtitle: "start",
            data: {
              store: formatDisplay(store.$id),
              action: formatDisplay(name),
              args
            },
            groupId
          }
        });
        after((result) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              title: "🛬 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                result
              },
              groupId
            }
          });
        });
        onError((error2) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              logType: "error",
              title: "💥 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                error: error2
              },
              groupId
            }
          });
        });
      }, true);
      store._customProperties.forEach((name) => {
        vue.watch(() => vue.unref(store[name]), (newValue, oldValue) => {
          api.notifyComponentUpdate();
          api.sendInspectorState(INSPECTOR_ID);
          if (isTimelineActive) {
            api.addTimelineEvent({
              layerId: MUTATIONS_LAYER_ID,
              event: {
                time: now2(),
                title: "Change",
                subtitle: name,
                data: {
                  newValue,
                  oldValue
                },
                groupId: activeAction
              }
            });
          }
        }, { deep: true });
      });
      store.$subscribe(({ events, type }, state) => {
        api.notifyComponentUpdate();
        api.sendInspectorState(INSPECTOR_ID);
        if (!isTimelineActive)
          return;
        const eventData = {
          time: now2(),
          title: formatMutationType(type),
          data: assign$1({ store: formatDisplay(store.$id) }, formatEventData(events)),
          groupId: activeAction
        };
        activeAction = void 0;
        if (type === MutationType.patchFunction) {
          eventData.subtitle = "⤵️";
        } else if (type === MutationType.patchObject) {
          eventData.subtitle = "🧩";
        } else if (events && !Array.isArray(events)) {
          eventData.subtitle = events.type;
        }
        if (events) {
          eventData.data["rawEvent(s)"] = {
            _custom: {
              display: "DebuggerEvent",
              type: "object",
              tooltip: "raw DebuggerEvent[]",
              value: events
            }
          };
        }
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: eventData
        });
      }, { detached: true, flush: "sync" });
      const hotUpdate = store._hotUpdate;
      store._hotUpdate = vue.markRaw((newStore) => {
        hotUpdate(newStore);
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🔥 " + store.$id,
            subtitle: "HMR update",
            data: {
              store: formatDisplay(store.$id),
              info: formatDisplay(`HMR update`)
            }
          }
        });
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
      });
      const { $dispose } = store;
      store.$dispose = () => {
        $dispose();
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
        api.getSettings().logStoreChanges && toastMessage(`Disposed "${store.$id}" store 🗑`);
      };
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
      api.getSettings().logStoreChanges && toastMessage(`"${store.$id}" store installed 🆕`);
    });
  }
  let runningActionId = 0;
  let activeAction;
  function patchActionForGrouping(store, actionNames) {
    const actions = actionNames.reduce((storeActions, actionName) => {
      storeActions[actionName] = vue.toRaw(store)[actionName];
      return storeActions;
    }, {});
    for (const actionName in actions) {
      store[actionName] = function() {
        const _actionId = runningActionId;
        const trackedStore = new Proxy(store, {
          get(...args) {
            activeAction = _actionId;
            return Reflect.get(...args);
          },
          set(...args) {
            activeAction = _actionId;
            return Reflect.set(...args);
          }
        });
        return actions[actionName].apply(trackedStore, arguments);
      };
    }
  }
  function devtoolsPlugin({ app, store, options }) {
    if (store.$id.startsWith("__hot:")) {
      return;
    }
    if (options.state) {
      store._isOptionsAPI = true;
    }
    if (typeof options.state === "function") {
      patchActionForGrouping(
        // @ts-expect-error: can cast the store...
        store,
        Object.keys(options.actions)
      );
      const originalHotUpdate = store._hotUpdate;
      vue.toRaw(store)._hotUpdate = function(newStore) {
        originalHotUpdate.apply(this, arguments);
        patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions));
      };
    }
    addStoreToDevtools(
      app,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      store
    );
  }
  function createPinia() {
    const scope = vue.effectScope(true);
    const state = scope.run(() => vue.ref({}));
    let _p = [];
    let toBeInstalled = [];
    const pinia = vue.markRaw({
      install(app) {
        setActivePinia(pinia);
        {
          pinia._a = app;
          app.provide(piniaSymbol, pinia);
          app.config.globalProperties.$pinia = pinia;
          if (USE_DEVTOOLS) {
            registerPiniaDevtools(app, pinia);
          }
          toBeInstalled.forEach((plugin) => _p.push(plugin));
          toBeInstalled = [];
        }
      },
      use(plugin) {
        if (!this._a && !isVue2) {
          toBeInstalled.push(plugin);
        } else {
          _p.push(plugin);
        }
        return this;
      },
      _p,
      // it's actually undefined here
      // @ts-expect-error
      _a: null,
      _e: scope,
      _s: /* @__PURE__ */ new Map(),
      state
    });
    if (USE_DEVTOOLS && typeof Proxy !== "undefined") {
      pinia.use(devtoolsPlugin);
    }
    return pinia;
  }
  const isUseStore = (fn) => {
    return typeof fn === "function" && typeof fn.$id === "string";
  };
  function patchObject(newState, oldState) {
    for (const key in oldState) {
      const subPatch = oldState[key];
      if (!(key in newState)) {
        continue;
      }
      const targetValue = newState[key];
      if (isPlainObject$1(targetValue) && isPlainObject$1(subPatch) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        newState[key] = patchObject(targetValue, subPatch);
      } else {
        {
          newState[key] = subPatch;
        }
      }
    }
    return newState;
  }
  function acceptHMRUpdate(initialUseStore, hot) {
    return (newModule) => {
      const pinia = hot.data.pinia || initialUseStore._pinia;
      if (!pinia) {
        return;
      }
      hot.data.pinia = pinia;
      for (const exportName in newModule) {
        const useStore = newModule[exportName];
        if (isUseStore(useStore) && pinia._s.has(useStore.$id)) {
          const id = useStore.$id;
          if (id !== initialUseStore.$id) {
            console.warn(`The id of the store changed from "${initialUseStore.$id}" to "${id}". Reloading.`);
            return hot.invalidate();
          }
          const existingStore = pinia._s.get(id);
          if (!existingStore) {
            console.log(`[Pinia]: skipping hmr because store doesn't exist yet`);
            return;
          }
          useStore(pinia, existingStore);
        }
      }
    };
  }
  const noop = () => {
  };
  function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
    subscriptions.push(callback);
    const removeSubscription = () => {
      const idx = subscriptions.indexOf(callback);
      if (idx > -1) {
        subscriptions.splice(idx, 1);
        onCleanup();
      }
    };
    if (!detached && vue.getCurrentScope()) {
      vue.onScopeDispose(removeSubscription);
    }
    return removeSubscription;
  }
  function triggerSubscriptions(subscriptions, ...args) {
    subscriptions.slice().forEach((callback) => {
      callback(...args);
    });
  }
  function mergeReactiveObjects(target, patchToApply) {
    if (target instanceof Map && patchToApply instanceof Map) {
      patchToApply.forEach((value, key) => target.set(key, value));
    }
    if (target instanceof Set && patchToApply instanceof Set) {
      patchToApply.forEach(target.add, target);
    }
    for (const key in patchToApply) {
      if (!patchToApply.hasOwnProperty(key))
        continue;
      const subPatch = patchToApply[key];
      const targetValue = target[key];
      if (isPlainObject$1(targetValue) && isPlainObject$1(subPatch) && target.hasOwnProperty(key) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        target[key] = mergeReactiveObjects(targetValue, subPatch);
      } else {
        target[key] = subPatch;
      }
    }
    return target;
  }
  const skipHydrateSymbol = Symbol("pinia:skipHydration");
  function skipHydrate(obj) {
    return Object.defineProperty(obj, skipHydrateSymbol, {});
  }
  function shouldHydrate(obj) {
    return !isPlainObject$1(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
  }
  const { assign } = Object;
  function isComputed(o2) {
    return !!(vue.isRef(o2) && o2.effect);
  }
  function createOptionsStore(id, options, pinia, hot) {
    const { state, actions, getters } = options;
    const initialState = pinia.state.value[id];
    let store;
    function setup() {
      if (!initialState && !hot) {
        {
          pinia.state.value[id] = state ? state() : {};
        }
      }
      const localState = hot ? (
        // use ref() to unwrap refs inside state TODO: check if this is still necessary
        vue.toRefs(vue.ref(state ? state() : {}).value)
      ) : vue.toRefs(pinia.state.value[id]);
      return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
        if (name in localState) {
          console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
        }
        computedGetters[name] = vue.markRaw(vue.computed(() => {
          setActivePinia(pinia);
          const store2 = pinia._s.get(id);
          return getters[name].call(store2, store2);
        }));
        return computedGetters;
      }, {}));
    }
    store = createSetupStore(id, setup, options, pinia, hot, true);
    return store;
  }
  function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
    let scope;
    const optionsForPlugin = assign({ actions: {} }, options);
    if (!pinia._e.active) {
      throw new Error("Pinia destroyed");
    }
    const $subscribeOptions = {
      deep: true
      // flush: 'post',
    };
    {
      $subscribeOptions.onTrigger = (event) => {
        if (isListening) {
          debuggerEvents = event;
        } else if (isListening == false && !store._hotUpdating) {
          if (Array.isArray(debuggerEvents)) {
            debuggerEvents.push(event);
          } else {
            console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.");
          }
        }
      };
    }
    let isListening;
    let isSyncListening;
    let subscriptions = vue.markRaw([]);
    let actionSubscriptions = vue.markRaw([]);
    let debuggerEvents;
    const initialState = pinia.state.value[$id];
    if (!isOptionsStore && !initialState && !hot) {
      {
        pinia.state.value[$id] = {};
      }
    }
    const hotState = vue.ref({});
    let activeListener;
    function $patch(partialStateOrMutator) {
      let subscriptionMutation;
      isListening = isSyncListening = false;
      {
        debuggerEvents = [];
      }
      if (typeof partialStateOrMutator === "function") {
        partialStateOrMutator(pinia.state.value[$id]);
        subscriptionMutation = {
          type: MutationType.patchFunction,
          storeId: $id,
          events: debuggerEvents
        };
      } else {
        mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
        subscriptionMutation = {
          type: MutationType.patchObject,
          payload: partialStateOrMutator,
          storeId: $id,
          events: debuggerEvents
        };
      }
      const myListenerId = activeListener = Symbol();
      vue.nextTick().then(() => {
        if (activeListener === myListenerId) {
          isListening = true;
        }
      });
      isSyncListening = true;
      triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
    }
    const $reset = isOptionsStore ? function $reset2() {
      const { state } = options;
      const newState = state ? state() : {};
      this.$patch(($state) => {
        assign($state, newState);
      });
    } : (
      /* istanbul ignore next */
      () => {
        throw new Error(`🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
      }
    );
    function $dispose() {
      scope.stop();
      subscriptions = [];
      actionSubscriptions = [];
      pinia._s.delete($id);
    }
    function wrapAction(name, action) {
      return function() {
        setActivePinia(pinia);
        const args = Array.from(arguments);
        const afterCallbackList = [];
        const onErrorCallbackList = [];
        function after(callback) {
          afterCallbackList.push(callback);
        }
        function onError(callback) {
          onErrorCallbackList.push(callback);
        }
        triggerSubscriptions(actionSubscriptions, {
          args,
          name,
          store,
          after,
          onError
        });
        let ret;
        try {
          ret = action.apply(this && this.$id === $id ? this : store, args);
        } catch (error2) {
          triggerSubscriptions(onErrorCallbackList, error2);
          throw error2;
        }
        if (ret instanceof Promise) {
          return ret.then((value) => {
            triggerSubscriptions(afterCallbackList, value);
            return value;
          }).catch((error2) => {
            triggerSubscriptions(onErrorCallbackList, error2);
            return Promise.reject(error2);
          });
        }
        triggerSubscriptions(afterCallbackList, ret);
        return ret;
      };
    }
    const _hmrPayload = /* @__PURE__ */ vue.markRaw({
      actions: {},
      getters: {},
      state: [],
      hotState
    });
    const partialStore = {
      _p: pinia,
      // _s: scope,
      $id,
      $onAction: addSubscription.bind(null, actionSubscriptions),
      $patch,
      $reset,
      $subscribe(callback, options2 = {}) {
        const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
        const stopWatcher = scope.run(() => vue.watch(() => pinia.state.value[$id], (state) => {
          if (options2.flush === "sync" ? isSyncListening : isListening) {
            callback({
              storeId: $id,
              type: MutationType.direct,
              events: debuggerEvents
            }, state);
          }
        }, assign({}, $subscribeOptions, options2)));
        return removeSubscription;
      },
      $dispose
    };
    const store = vue.reactive(
      assign(
        {
          _hmrPayload,
          _customProperties: vue.markRaw(/* @__PURE__ */ new Set())
          // devtools custom properties
        },
        partialStore
        // must be added later
        // setupStore
      )
    );
    pinia._s.set($id, store);
    const setupStore = pinia._e.run(() => {
      scope = vue.effectScope();
      return scope.run(() => setup());
    });
    for (const key in setupStore) {
      const prop = setupStore[key];
      if (vue.isRef(prop) && !isComputed(prop) || vue.isReactive(prop)) {
        if (hot) {
          set(hotState.value, key, vue.toRef(setupStore, key));
        } else if (!isOptionsStore) {
          if (initialState && shouldHydrate(prop)) {
            if (vue.isRef(prop)) {
              prop.value = initialState[key];
            } else {
              mergeReactiveObjects(prop, initialState[key]);
            }
          }
          {
            pinia.state.value[$id][key] = prop;
          }
        }
        {
          _hmrPayload.state.push(key);
        }
      } else if (typeof prop === "function") {
        const actionValue = hot ? prop : wrapAction(key, prop);
        {
          setupStore[key] = actionValue;
        }
        {
          _hmrPayload.actions[key] = prop;
        }
        optionsForPlugin.actions[key] = prop;
      } else {
        if (isComputed(prop)) {
          _hmrPayload.getters[key] = isOptionsStore ? (
            // @ts-expect-error
            options.getters[key]
          ) : prop;
          if (IS_CLIENT) {
            const getters = setupStore._getters || // @ts-expect-error: same
            (setupStore._getters = vue.markRaw([]));
            getters.push(key);
          }
        }
      }
    }
    {
      assign(store, setupStore);
      assign(vue.toRaw(store), setupStore);
    }
    Object.defineProperty(store, "$state", {
      get: () => hot ? hotState.value : pinia.state.value[$id],
      set: (state) => {
        if (hot) {
          throw new Error("cannot set hotState");
        }
        $patch(($state) => {
          assign($state, state);
        });
      }
    });
    {
      store._hotUpdate = vue.markRaw((newStore) => {
        store._hotUpdating = true;
        newStore._hmrPayload.state.forEach((stateKey) => {
          if (stateKey in store.$state) {
            const newStateTarget = newStore.$state[stateKey];
            const oldStateSource = store.$state[stateKey];
            if (typeof newStateTarget === "object" && isPlainObject$1(newStateTarget) && isPlainObject$1(oldStateSource)) {
              patchObject(newStateTarget, oldStateSource);
            } else {
              newStore.$state[stateKey] = oldStateSource;
            }
          }
          set(store, stateKey, vue.toRef(newStore.$state, stateKey));
        });
        Object.keys(store.$state).forEach((stateKey) => {
          if (!(stateKey in newStore.$state)) {
            del(store, stateKey);
          }
        });
        isListening = false;
        isSyncListening = false;
        pinia.state.value[$id] = vue.toRef(newStore._hmrPayload, "hotState");
        isSyncListening = true;
        vue.nextTick().then(() => {
          isListening = true;
        });
        for (const actionName in newStore._hmrPayload.actions) {
          const action = newStore[actionName];
          set(store, actionName, wrapAction(actionName, action));
        }
        for (const getterName in newStore._hmrPayload.getters) {
          const getter = newStore._hmrPayload.getters[getterName];
          const getterValue = isOptionsStore ? (
            // special handling of options api
            vue.computed(() => {
              setActivePinia(pinia);
              return getter.call(store, store);
            })
          ) : getter;
          set(store, getterName, getterValue);
        }
        Object.keys(store._hmrPayload.getters).forEach((key) => {
          if (!(key in newStore._hmrPayload.getters)) {
            del(store, key);
          }
        });
        Object.keys(store._hmrPayload.actions).forEach((key) => {
          if (!(key in newStore._hmrPayload.actions)) {
            del(store, key);
          }
        });
        store._hmrPayload = newStore._hmrPayload;
        store._getters = newStore._getters;
        store._hotUpdating = false;
      });
    }
    if (USE_DEVTOOLS) {
      const nonEnumerable = {
        writable: true,
        configurable: true,
        // avoid warning on devtools trying to display this property
        enumerable: false
      };
      ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p2) => {
        Object.defineProperty(store, p2, assign({ value: store[p2] }, nonEnumerable));
      });
    }
    pinia._p.forEach((extender) => {
      if (USE_DEVTOOLS) {
        const extensions = scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        }));
        Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
        assign(store, extensions);
      } else {
        assign(store, scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        })));
      }
    });
    if (store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
      console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
    }
    if (initialState && isOptionsStore && options.hydrate) {
      options.hydrate(store.$state, initialState);
    }
    isListening = true;
    isSyncListening = true;
    return store;
  }
  function defineStore(idOrOptions, setup, setupOptions) {
    let id;
    let options;
    const isSetupStore = typeof setup === "function";
    if (typeof idOrOptions === "string") {
      id = idOrOptions;
      options = isSetupStore ? setupOptions : setup;
    } else {
      options = idOrOptions;
      id = idOrOptions.id;
    }
    function useStore(pinia, hot) {
      const currentInstance = vue.getCurrentInstance();
      pinia = // in test mode, ignore the argument provided as we can always retrieve a
      // pinia instance with getActivePinia()
      pinia || currentInstance && vue.inject(piniaSymbol, null);
      if (pinia)
        setActivePinia(pinia);
      if (!activePinia) {
        throw new Error(`[🍍]: getActivePinia was called with no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
      }
      pinia = activePinia;
      if (!pinia._s.has(id)) {
        if (isSetupStore) {
          createSetupStore(id, setup, options, pinia);
        } else {
          createOptionsStore(id, options, pinia);
        }
        {
          useStore._pinia = pinia;
        }
      }
      const store = pinia._s.get(id);
      if (hot) {
        const hotId = "__hot:" + id;
        const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign({}, options), pinia, true);
        hot._hotUpdate(newStore);
        delete pinia.state.value[hotId];
        pinia._s.delete(hotId);
      }
      if (IS_CLIENT && currentInstance && currentInstance.proxy && // avoid adding stores that are just built for hot module replacement
      !hot) {
        const vm = currentInstance.proxy;
        const cache = "_pStores" in vm ? vm._pStores : vm._pStores = {};
        cache[id] = store;
      }
      return store;
    }
    useStore.$id = id;
    return useStore;
  }
  let mapStoreSuffix = "Store";
  function setMapStoreSuffix(suffix) {
    mapStoreSuffix = suffix;
  }
  function mapStores(...stores) {
    if (Array.isArray(stores[0])) {
      console.warn(`[🍍]: Directly pass all stores to "mapStores()" without putting them in an array:
Replace
	mapStores([useAuthStore, useCartStore])
with
	mapStores(useAuthStore, useCartStore)
This will fail in production if not fixed.`);
      stores = stores[0];
    }
    return stores.reduce((reduced, useStore) => {
      reduced[useStore.$id + mapStoreSuffix] = function() {
        return useStore(this.$pinia);
      };
      return reduced;
    }, {});
  }
  function mapState(useStore, keysOrMapper) {
    return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
      reduced[key] = function() {
        return useStore(this.$pinia)[key];
      };
      return reduced;
    }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
      reduced[key] = function() {
        const store = useStore(this.$pinia);
        const storeKey = keysOrMapper[key];
        return typeof storeKey === "function" ? storeKey.call(this, store) : store[storeKey];
      };
      return reduced;
    }, {});
  }
  const mapGetters = mapState;
  function mapActions(useStore, keysOrMapper) {
    return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
      reduced[key] = function(...args) {
        return useStore(this.$pinia)[key](...args);
      };
      return reduced;
    }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
      reduced[key] = function(...args) {
        return useStore(this.$pinia)[keysOrMapper[key]](...args);
      };
      return reduced;
    }, {});
  }
  function mapWritableState(useStore, keysOrMapper) {
    return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
      reduced[key] = {
        get() {
          return useStore(this.$pinia)[key];
        },
        set(value) {
          return useStore(this.$pinia)[key] = value;
        }
      };
      return reduced;
    }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
      reduced[key] = {
        get() {
          return useStore(this.$pinia)[keysOrMapper[key]];
        },
        set(value) {
          return useStore(this.$pinia)[keysOrMapper[key]] = value;
        }
      };
      return reduced;
    }, {});
  }
  function storeToRefs(store) {
    {
      store = vue.toRaw(store);
      const refs = {};
      for (const key in store) {
        const value = store[key];
        if (vue.isRef(value) || vue.isReactive(value)) {
          refs[key] = // ---
          vue.toRef(store, key);
        }
      }
      return refs;
    }
  }
  const PiniaVuePlugin = function(_Vue) {
    _Vue.mixin({
      beforeCreate() {
        const options = this.$options;
        if (options.pinia) {
          const pinia = options.pinia;
          if (!this._provided) {
            const provideCache = {};
            Object.defineProperty(this, "_provided", {
              get: () => provideCache,
              set: (v2) => Object.assign(provideCache, v2)
            });
          }
          this._provided[piniaSymbol] = pinia;
          if (!this.$pinia) {
            this.$pinia = pinia;
          }
          pinia._a = this;
          if (IS_CLIENT) {
            setActivePinia(pinia);
          }
          if (USE_DEVTOOLS) {
            registerPiniaDevtools(pinia._a, pinia);
          }
        } else if (!this.$pinia && options.parent && options.parent.$pinia) {
          this.$pinia = options.parent.$pinia;
        }
      },
      destroyed() {
        delete this._pStores;
      }
    });
  };
  const Pinia = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    get MutationType() {
      return MutationType;
    },
    PiniaVuePlugin,
    acceptHMRUpdate,
    createPinia,
    defineStore,
    getActivePinia,
    mapActions,
    mapGetters,
    mapState,
    mapStores,
    mapWritableState,
    setActivePinia,
    setMapStoreSuffix,
    skipHydrate,
    storeToRefs
  }, Symbol.toStringTag, { value: "Module" }));
  const BASE_URL = "http://192.168.1.199:18880/";
  const BASE_FILE_URL = "http://58.58.47.142:9080/";
  const BASE_LINE_PRE = "http://221.214.164.186:18880/open_office/?src=";
  const _toString = Object.prototype.toString;
  const toRawType = (value) => _toString.call(value).slice(8, -1);
  const formatParams = (params) => {
    if (params) {
      let url2 = "?";
      for (const propName of Object.keys(params)) {
        const value = params[propName];
        let part = encodeURIComponent(propName) + "=";
        if (value !== null && typeof value !== "undefined") {
          if (typeof value === "object") {
            for (const key of Object.keys(value)) {
              if (value[key] !== null && typeof value[key] !== "undefined") {
                let params2 = propName + "[" + key + "]";
                let subPart = encodeURIComponent(params2) + "=";
                url2 += subPart + encodeURIComponent(value[key]) + "&";
              }
            }
          } else {
            url2 += part + encodeURIComponent(value) + "&";
          }
        }
      }
      return url2.slice(0, -1);
    } else {
      return "";
    }
  };
  const formatNum = (n2) => n2.toString()[1] ? n2 : "0" + n2;
  const weekDays = ["Mon.", "Tues.", "Wed.", "Thur.", "Fri.", "Sat.", "Sun."];
  const formatDate = (time) => {
    let date2 = time ? new Date(time) : /* @__PURE__ */ new Date();
    let year = date2.getFullYear();
    let month = date2.getMonth() + 1;
    let day = date2.getDate();
    let weekDay = weekDays[date2.getDay() - 1];
    let hour = date2.getHours();
    let minute = date2.getMinutes();
    let second = date2.getSeconds();
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
    let url2 = `${BASE_FILE_URL}${path}`;
    let fileType = url2.split(".").pop();
    uni.downloadFile({
      url: url2,
      success: function(res) {
        let filePath = res.tempFilePath;
        setTimeout(
          () => {
            formatAppLog("log", "at utils/index.js:77", 33333);
            uni.openDocument({
              filePath: encodeURI(filePath),
              fileType,
              showMenu: false,
              success: function() {
                formatAppLog("log", "at utils/index.js:83", "打开文档成功");
              },
              fail: function(e2) {
                formatAppLog("log", "at utils/index.js:86", e2);
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
    for (let i2 = 0; i2 < fileTypeList.length; i2++) {
      const fileTypeItem = fileTypeList[i2];
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
  const SET_STORAGE = (key, val) => {
    let type = toRawType(val);
    if (type == "Object" || type == "Array") {
      val = "ISJSON_" + JSON.stringify(val);
    }
    uni.setStorageSync(key, val);
  };
  const GET_STORAGE = (key) => {
    let val = uni.getStorageSync(key);
    if (!val)
      return null;
    let isJsonStr = val.slice(0, 7);
    if (isJsonStr === "ISJSON_") {
      val = JSON.parse(val.slice(7, val.length));
    }
    return val;
  };
  const useUserStore = defineStore("User", {
    state: () => {
      return {
        token: GET_STORAGE("TOKEN") || "",
        user: GET_STORAGE("USER") || "{}"
      };
    },
    actions: {
      //获取用户信息
      updateUserInfo(info) {
        if (info) {
          SET_STORAGE("USER", info);
        }
      },
      //获取token
      updateToken(token) {
        if (token) {
          SET_STORAGE("TOKEN", token);
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
  const notFormParams = ["morningMeeting"];
  const setRequestConfig = () => {
	  console.log(uni.$u)
    uni.$u.http.setConfig((config2) => {
      config2.baseURL = BASE_URL;
      return config2;
    });
    uni.$u.http.interceptors.request.use(
      (config2) => {
        formatAppLog("log", "at interface/request.js:74", config2);
        let token = GET_STORAGE("TOKEN");
        if (token) {
          config2.header.Authorization = `Bearer ${token}`;
          config2.header.token = `${token}`;
        }
        if (config2.method == "POST" && !notFormParams.some((str) => config2.url.includes(str))) {
          config2.header["Content-Type"] = "application/x-www-form-urlencoded";
        }
        return config2;
      },
      (error2) => {
        return Promise.reject(error2);
      }
    );
    uni.$u.http.interceptors.response.use(
      (response) => {
        if (response.data.code == 401) {
          uni.$showMsg("请登录");
          useUserStore().userLogout();
          setTimeout(() => {
            uni.switchTab({
              url: "/pages/my/my"
            });
          }, 1e3);
        }
        return response;
      },
      (error2) => {
        return Promise.reject(error2);
      }
    );
  };
  const uploadForm = (url2, data = {}) => new Promise((resolve, reject) => {
    url2 = `${BASE_URL}${url2}`;
    formatAppLog("log", "at interface/request.js:128", getFileType(data.filePath));
    let header = {};
    let token = GET_STORAGE("TOKEN");
    header["Authorization"] = `Bearer ${token}`;
    header["token"] = `${token}`;
    header["Content-Type"] = "multipart/form-data";
    uni.uploadFile({
      url: url2,
      //仅为示例，非真实的接口地址
      filePath: data.filePath,
      fileType: getFileType(data.filePath),
      name: "file",
      header,
      success: (res) => {
        resolve(res);
      }
    });
  });
  setRequestConfig();
  const http = uni.$u.http;
  const requestFileAdd = (filePath) => uploadForm("api/sys/file/add", { filePath });
  const requestDeptList = (params) => http.get(`/api/sys/dept/list`);
  const requestUserList = (params) => http.get(`/api/sys/user/list`);
  const requestClappingInfo = (params) => http.get(`/api/v1/danger/simple/list${formatParams(params)}`);
  const requestClapConfirmInfo = (params) => http.get(`/api/v1/danger/simple/confirm${formatParams(params)}`);
  const requestClapSubmit = (params) => http.post(`/api/v1/danger/simple`, params);
  const requestClapReSubmit = (params) => http.post(`/api/v1/danger/simple/confirm`, params);
  const requestAcciReportInfo = (params) => http.get(`/api/acc/accident/report${formatParams(params)}`);
  const requestAcciConfirmInfo = (params) => http.get(`/api/acc/simple/confirm${formatParams(params)}`);
  const requestAcciPageInfo = (params) => http.get(`/api/acc/simple/page${formatParams(params)}`);
  const requestAcciHandleInfo = (params) => http.get(`/api/acc/accident/handle${formatParams(params)}`);
  const requestAddAcciSub = (params) => http.post(`/api/acc/simple`, params);
  const requestAcciReSubmit = (params) => http.post(`/api/acc/simple/confirm`, params);
  const requestAcciReportSubmit = (params) => http.post(`/api/acc/accident/report`, params);
  const requestAcciHandleSubmit = (params) => http.post(`/api/acc/accident/handle`, params);
  const requestAcciReplyInfo = (params) => http.get(`/api/acc/accident/reply${formatParams(params)}`);
  const requestWorkPendingInfo = (params) => http.get(`/api/act/pending${formatParams(params)}`);
  const requestWorkMyActInfo = (params) => http.get(`/api/act/my${formatParams(params)}`);
  const requestWorkdoHisInfo = (params) => http.get(`/api/doc/pending/his${formatParams(params)}`);
  const requestWorkStaysInfo = (params) => http.get(`/api/doc/stays${formatParams(params)}`);
  const requestWorkDocMyInfo = (params) => http.get(`/api/doc/my${formatParams(params)}`);
  const requestWorkDocPendInfo = (params) => http.get(`/api/doc/pending${formatParams(params)}`);
  const requestTaskInfo = (params) => http.get(`/api/sys/tabbar/task${formatParams(params)}`);
  const requestTaskCheckInfo = (params) => http.get(`/api/v1/danger/check/task/list${formatParams(params)}`);
  const requestTaskCheckById = (params) => http.get(`/api/v2/danger/check/task/submit/record${formatParams(params)}`);
  const requestTaskCheckSub = (params) => http.post(`/api/v1/danger/check/task/submit`, params);
  const requestTaskEnd = (params) => http.post(`/api/v1/danger/check/task/end`, params);
  const requestTaskPlanInfo = (params) => http.get(`/api/train/plan/list${formatParams(params)}`);
  const requestTaskPlanContent = (id) => http.get(`/api/train/plan/content/${id}`);
  const requestTrainLearnSubmit = (params) => http.post(`/api/train/plan/learn`, params);
  const requestPlanPaperInfo = (id) => http.get(`/api/train/plan/paper/${id}`);
  const requestPlanPaper2Info = (id) => http.get(`/api/train/plan/detail/${id}`);
  const requestPlancollectAdd = (params) => http.post(`/api/train/collect/add/${params.type}/${params.id}`);
  const requestPlancollectDel = (id) => http.post(`/api/train/collect/del/${id}`);
  const requestPlanPaperIbank = (params) => http.post(`/api/v2/train/ibank/paper`, params);
  const requestPlanExtraPaper = (params) => http.post(`/api/v2/train/ibank/extraPaper`, params);
  const requestTaskMyDanInfo = (params) => http.get(`/api/danger/my${formatParams(params)}`);
  const requestTaskZGDanInfo = (params) => http.get(`/api/danger/zg/list${formatParams(params)}`);
  const requestTaskFHDanInfo = (params) => http.get(`/api/danger/fh/list${formatParams(params)}`);
  const requestDangerSubmit = (params) => http.post(`/api/danger/submit`, params);
  const requestDangerZGSubmit = (params) => http.post(`/api/danger/zg/submit`, params);
  const requestDangerFHSubmit = (params) => http.post(`/api/danger/fh/submit`, params);
  const requestTaskGoodInfo = (params) => http.get(`/api/labor/get/page${formatParams(params)}`);
  const requestTaskGoodSubmit = (params) => http.post(`/api/labor/get${formatParams(params)}`);
  const requestRespSystemsInfo = (params) => http.get(`/api/resp/systems${formatParams(params)}`);
  const requestRespCreatersInfo = (params) => http.get(`/api/resp/letter/creaters${formatParams(params)}`);
  const requestRespSignersInfo = (params) => http.get(`/api/resp/letter/signers${formatParams(params)}`);
  const requestCreatersInfo = (params, id) => http.get(`/api/resp/letter/creatersById/${id}${formatParams(params)}`);
  const requestLetterSignSubmit = (params) => http.post(`/api/resp/letter/signSign`, params);
  const requestCreatSignSubmit = (params) => http.post(`/api/resp/letter/creatSign`, params);
  const requestSaftCulInfo = (params) => http.get(`/api/culture/publicity/page${formatParams(params)}`);
  const requestMorningMeetingInfo = (params) => http.get(`/api/morningMeeting/get/${params.bizId || ""}`);
  const requestMorningMeetingSubmit = (params) => http.post(`/api/morningMeeting/put`, params);
  const requestKnowPostInfo = (params) => http.get(`/api/culture/now/page${formatParams(params)}`);
  const requestKnowLawInfo = (params) => http.get(`/api/laws/regulations/page${formatParams(params)}`);
  const requestKnowRuleInfo = (params) => http.get(`/api/laws/rulesFile/page${formatParams(params)}`);
  const requestKnowFactorInfo = (params) => http.get(`/api/oh/harmFactorItem/page${formatParams(params)}`);
  const requestPersonInfo = (params) => http.get(`/api/sys/user/detail`);
  const requestRespCteat = (params) => http.get(`/api/resp/letter/creaters${formatParams(params)}`);
  const requestRespSign = (params) => http.get(`/api/resp/letter/signers${formatParams(params)}`);
  const requestResps = (params) => http.get(`/api/resp/systems${formatParams(params)}`);
  const useIndexStore = defineStore("Index", {
    state: () => {
      return {
        activeTab: 1,
        // 底部tabbar的id,默认选中的索引
        // userArchives:{}, // 个人档案
        allDept: [],
        allStaff: [],
        staffById: []
      };
    },
    actions: {
      //设置active的值
      setActive(active) {
        this.activeTab = active;
      },
      // 获取所有部门
      async setAllDept() {
        if (this.allDept.length)
          return;
        const interDeptList = await requestDeptList().then((r2) => r2).catch((e2) => {
        });
        if (!interDeptList.data || !interDeptList.data.t) {
          return;
        }
        this.allDept = interDeptList.data.t || [];
      },
      // 获取所有员工，没有部门时获取部门
      async setAllStaff(pyload) {
        if (this.allStaff.length)
          return;
        const interStaffList = await requestUserList().then((r2) => r2).catch((e2) => {
        });
        if (!interStaffList.data || !interStaffList.data.t) {
          return;
        }
        this.allStaff = interStaffList.data.t || [];
      },
      // 获取部门的id
      async getDeptId(dept) {
        if (!this.allDept.length) {
          await this.setAllDept();
        }
        formatAppLog("log", "at store/index.js:53", dept);
        formatAppLog("log", "at store/index.js:54", this.allDept);
      }
      // 获取用户档案
      // async getUserArchives(){
      // 	const archives = await requestPersonInfo().then(r => r).catch( e => e )
      // 	if(!archives.data || !archives.data.t) {
      // 		this.userArchives = archives.data.t.user || {}
      // 		this.userArchives.suwList = archives.data.t.suwList || []	
      // 	}
      // },
    }
  });
  const _sfc_main$O = {
    __name: "task",
    setup(__props) {
      const interfaces = { requestMorningMeetingInfo };
      const uToast = vue.ref();
      useIndexStore();
      const state = vue.reactive({
        taskType: 1,
        taskTime: "day",
        taskSearch: "",
        tastInfo: []
      });
      const getTaskInfo = async () => {
        let params = {
          state: state.taskType,
          type: state.taskTime,
          title: state.taskSearch
        };
        let taskInfoInter = await requestTaskInfo(params).then((res) => res).catch((e2) => e2);
        formatAppLog("log", "at pages/task/task.vue:85", taskInfoInter);
        if (!taskInfoInter.data || !taskInfoInter.data.t) {
          return;
        }
        state.tastInfo = taskInfoInter.data.t;
      };
      const taskTypes = [
        { id: 1, title: "未完成任务" },
        { id: 2, title: "已完成任务" },
        { id: 3, title: "我的任务" }
      ];
      const taskTimes = [
        { id: 1, title: "本日任务", key: "day" },
        { id: 2, title: "本周任务", key: "week" },
        { id: 3, title: "本月任务", key: "month" }
      ];
      const childFormDoms = {
        // 晨会
        morningMeeting: [
          { id: 1, title: "晨会主题内容", key: "content", type: "text", ref: "Meeting_content" },
          { id: 2, title: "发起人", key: "userName", type: "text", ref: "Meeting_userName" },
          { id: 3, title: "文件", key: "file1", type: "file", ref: "Meeting_file1" },
          { id: 4, title: "建议", key: "remark", type: "input", ref: "Meeting_remark" },
          { id: 5, title: "参与人签字", key: "sign", type: "sign", ref: "Meeting_sign" }
        ]
      };
      const handleTaskType = (id) => {
        state.taskType = id;
        getTaskInfo();
      };
      const handleTaskTime = (key) => {
        state.taskTime = key;
        getTaskInfo();
      };
      const handleTaskItem = async (obj) => {
        formatAppLog("log", "at pages/task/task.vue:135", obj);
        let types = {
          danger: { name: "taskHideRule" },
          // 隐患
          dangerCheck: { name: "taskDanCheck" },
          // 隐患检查
          dangerSimple: { name: "T_A_clapping", navId: 2 },
          //随手拍审核
          "trainPlan": { name: "taskTrainPlan" },
          // 培训
          culturePublicity: { name: "taskCulture" },
          // 文化安全
          "oh": { name: "taskCollectGood" },
          // 领用劳保用品
          accHandle: { name: "T_A_acciUp", navId: 4 },
          //事故上报
          acc: { name: "T_A_acciUp", navId: 3 },
          accSimple: { name: "T_A_acciUp", navId: 2 },
          // 事故报告
          accReply: { name: "applyAcciReply" },
          // 事故批复
          riskHdCheck: { name: "" },
          //隐患排查清单
          workAct: { name: "T_A_work" },
          // 特殊作业
          morningMeeting: { name: "comForm", sourceInter: "requestMorningMeetingInfo", submitFn: "requestMorningMeetingSubmit", title: "晨会" },
          //晨会
          respkpiAuditor: { name: "taskRespkp" },
          // 责任考核
          riskHdRecties: { name: "" },
          // 隐患整改
          riskHdRvals: { name: "" },
          // 隐患评估
          "respkpiAssessee": { name: "" },
          // 责任制考评
          letter: { name: "taskLetter" },
          //钉钉责任书
          letterSigner: { name: "taskLetter", navId: 3 }
          //钉钉责任书确认
        };
        let urlObj = types[obj.type];
        if (!urlObj) {
          uToast.value.show({
            top: 10,
            type: "primary",
            message: "该部分内容即将上线",
            duration: 1e3 * 3,
            safeAreaInsetTop: false
          });
          return;
        }
        let toUrl = urlObj.name;
        if (toUrl == "comForm") {
          const formConfig = {};
          formConfig.domList = childFormDoms[obj.type] || [];
          formConfig.config = {
            submitFn: urlObj.submitFn,
            from: obj.type
          };
          if (urlObj.sourceInter) {
            let interParams = {};
            if (obj.type == "morningMeeting" && obj.data) {
              interParams = JSON.parse(obj.data) || {};
              formConfig.config.params = { id: interParams.bizId };
            }
            let interInfo = await interfaces[urlObj.sourceInter](interParams).then((r2) => r2);
            formatAppLog("log", "at pages/task/task.vue:193", interInfo);
            if (interInfo.data && interInfo.data.t) {
              let info = interInfo.data.t;
              formConfig.domList = formConfig.domList.map((item) => {
                item.val = info[item.key];
                return item;
              });
            }
          }
          obj = formConfig;
          formatAppLog("log", "at pages/task/task.vue:203", obj);
        }
        formatAppLog("log", "at pages/task/task.vue:206", 32323232);
        if (urlObj.navId) {
          obj.navId = urlObj.navId;
        }
        let params = {
          config: JSON.stringify(obj),
          data: JSON.stringify(obj)
        };
        if (urlObj.title) {
          params.title = urlObj.title;
        }
        uni.$u.route({
          url: `/pages/${toUrl}/${toUrl}`,
          params
        });
      };
      onShow(() => {
        if (GET_STORAGE("TOKEN")) {
          getTaskInfo();
        } else {
          setTimeout(() => getTaskInfo(), 600);
        }
      });
      return (_ctx, _cache) => {
        const _component_u_input = resolveEasycom(vue.resolveDynamicComponent("u-input"), __easycom_1$6);
        const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$b);
        const _component_u_button = resolveEasycom(vue.resolveDynamicComponent("u-button"), __easycom_0$a);
        const _component_u_notify = resolveEasycom(vue.resolveDynamicComponent("u-notify"), __easycom_2$3);
        return vue.openBlock(), vue.createElementBlock("view", { class: "task" }, [
          vue.createCommentVNode(" 任务类型 "),
          vue.createElementVNode("view", { class: "taskFir" }, [
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(taskTypes, (item) => {
                return vue.createElementVNode("view", {
                  key: item.id,
                  class: vue.normalizeClass({ taskFirBtn: true, taskFirBtnSe: state.taskType == item.id }),
                  onClick: ($event) => handleTaskType(item.id)
                }, vue.toDisplayString(item.title), 11, ["onClick"]);
              }),
              64
              /* STABLE_FRAGMENT */
            ))
          ]),
          vue.createCommentVNode(" 搜索 "),
          vue.createElementVNode("view", { class: "taskSearch" }, [
            vue.createElementVNode("view", { class: "taskSearchInput" }, [
              vue.createVNode(_component_u_input, {
                modelValue: state.taskSearch,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => state.taskSearch = $event),
                type: "text",
                border: "true",
                placeholder: "请输入任务关键词搜索",
                "custom-style": "background: #F2F3F8"
              }, null, 8, ["modelValue"])
            ]),
            vue.createElementVNode("view", {
              class: "taskSearchBtn",
              onClick: _cache[1] || (_cache[1] = ($event) => getTaskInfo())
            }, [
              vue.createVNode(_component_u_button, { type: "primary" }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_u_icon, {
                    name: "search",
                    color: "#fff",
                    size: "28"
                  }),
                  vue.createTextVNode(" 搜索 ")
                ]),
                _: 1
                /* STABLE */
              })
            ])
          ]),
          vue.createCommentVNode(" mainNav "),
          vue.createElementVNode("view", { class: "mainNav" }, [
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(taskTimes, (item) => {
                return vue.createElementVNode("view", {
                  key: item.id,
                  class: vue.normalizeClass({ mainNavNtn: true, mainNavNtnSe: state.taskTime == item.key }),
                  onClick: ($event) => handleTaskTime(item.key)
                }, [
                  vue.createTextVNode(
                    vue.toDisplayString(item.title) + " ",
                    1
                    /* TEXT */
                  ),
                  vue.withDirectives(vue.createElementVNode(
                    "view",
                    { class: "mainNavHorn" },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vShow, state.taskTime == item.key]
                  ])
                ], 10, ["onClick"]);
              }),
              64
              /* STABLE_FRAGMENT */
            ))
          ]),
          vue.createCommentVNode(" mainContent "),
          vue.createElementVNode("view", { class: "taskContent" }, [
            vue.createElementVNode(
              "view",
              { class: "taskContentMsg" },
              " 共查询到" + vue.toDisplayString(state.tastInfo.length) + "条 ",
              1
              /* TEXT */
            ),
            vue.createElementVNode("view", { class: "taskContentCon" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(state.tastInfo, (item) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "taskContentItem",
                    onClick: ($event) => handleTaskItem(item)
                  }, [
                    vue.createElementVNode("img", {
                      class: "taskContentItemImg",
                      src: "/static/icon/icon-task-day.png",
                      alt: ""
                    }),
                    vue.createElementVNode(
                      "text",
                      { class: "box_ellipsis taskContentItemMsg" },
                      vue.toDisplayString(item.title),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      { class: "taskContentItemTime" },
                      vue.toDisplayString(item.time),
                      1
                      /* TEXT */
                    )
                  ], 8, ["onClick"]);
                }),
                256
                /* UNKEYED_FRAGMENT */
              ))
            ])
          ]),
          vue.createVNode(
            _component_u_notify,
            {
              ref_key: "uToast",
              ref: uToast
            },
            null,
            512
            /* NEED_PATCH */
          )
        ]);
      };
    }
  };
  const PagesTaskTask = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/task/task.vue"]]);
  const props$g = {
    props: {
      // 是否显示遮罩
      show: {
        type: Boolean,
        default: props$o.overlay.show
      },
      // 层级z-index
      zIndex: {
        type: [String, Number],
        default: props$o.overlay.zIndex
      },
      // 遮罩的过渡时间，单位为ms
      duration: {
        type: [String, Number],
        default: props$o.overlay.duration
      },
      // 不透明度值，当做rgba的第四个参数
      opacity: {
        type: [String, Number],
        default: props$o.overlay.opacity
      }
    }
  };
  const _sfc_main$N = {
    name: "u-overlay",
    mixins: [mpMixin, mixin, props$g],
    computed: {
      overlayStyle() {
        const style = {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: this.zIndex,
          bottom: 0,
          "background-color": `rgba(0, 0, 0, ${this.opacity})`
        };
        return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle));
      }
    },
    methods: {
      clickHandler() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_transition = resolveEasycom(vue.resolveDynamicComponent("u-transition"), __easycom_0$9);
    return vue.openBlock(), vue.createBlock(_component_u_transition, {
      show: _ctx.show,
      "custom-class": "u-overlay",
      duration: _ctx.duration,
      "custom-style": $options.overlayStyle,
      onClick: $options.clickHandler
    }, {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["show", "duration", "custom-style", "onClick"]);
  }
  const __easycom_0$8 = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["render", _sfc_render$g], ["__scopeId", "data-v-9112bed9"], ["__file", "D:/projects/work/applet/vue3_uview_plus/uni_modules/uview-plus/components/u-overlay/u-overlay.vue"]]);
  const props$f = {
    props: {}
  };
  const _sfc_main$M = {
    name: "u-safe-bottom",
    mixins: [mpMixin, mixin, props$f],
    data() {
      return {
        safeAreaBottomHeight: 0,
        isNvue: false
      };
    },
    computed: {
      style() {
        const style = {};
        return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle));
      }
    },
    mounted() {
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-safe-bottom", [!$data.isNvue && "u-safe-area-inset-bottom"]]),
        style: vue.normalizeStyle([$options.style])
      },
      null,
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_3$2 = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["render", _sfc_render$f], ["__scopeId", "data-v-f3d22cfe"], ["__file", "D:/projects/work/applet/vue3_uview_plus/uni_modules/uview-plus/components/u-safe-bottom/u-safe-bottom.vue"]]);
  const props$e = {
    props: {
      // 是否展示弹窗
      show: {
        type: Boolean,
        default: props$o.popup.show
      },
      // 是否显示遮罩
      overlay: {
        type: Boolean,
        default: props$o.popup.overlay
      },
      // 弹出的方向，可选值为 top bottom right left center
      mode: {
        type: String,
        default: props$o.popup.mode
      },
      // 动画时长，单位ms
      duration: {
        type: [String, Number],
        default: props$o.popup.duration
      },
      // 是否显示关闭图标
      closeable: {
        type: Boolean,
        default: props$o.popup.closeable
      },
      // 自定义遮罩的样式
      overlayStyle: {
        type: [Object, String],
        default: props$o.popup.overlayStyle
      },
      // 点击遮罩是否关闭弹窗
      closeOnClickOverlay: {
        type: Boolean,
        default: props$o.popup.closeOnClickOverlay
      },
      // 层级
      zIndex: {
        type: [String, Number],
        default: props$o.popup.zIndex
      },
      // 是否为iPhoneX留出底部安全距离
      safeAreaInsetBottom: {
        type: Boolean,
        default: props$o.popup.safeAreaInsetBottom
      },
      // 是否留出顶部安全距离（状态栏高度）
      safeAreaInsetTop: {
        type: Boolean,
        default: props$o.popup.safeAreaInsetTop
      },
      // 自定义关闭图标位置，top-left为左上角，top-right为右上角，bottom-left为左下角，bottom-right为右下角
      closeIconPos: {
        type: String,
        default: props$o.popup.closeIconPos
      },
      // 是否显示圆角
      round: {
        type: [Boolean, String, Number],
        default: props$o.popup.round
      },
      // mode=center，也即中部弹出时，是否使用缩放模式
      zoom: {
        type: Boolean,
        default: props$o.popup.zoom
      },
      // 弹窗背景色，设置为transparent可去除白色背景
      bgColor: {
        type: String,
        default: props$o.popup.bgColor
      },
      // 遮罩的透明度，0-1之间
      overlayOpacity: {
        type: [Number, String],
        default: props$o.popup.overlayOpacity
      }
    }
  };
  const _sfc_main$L = {
    name: "u-popup",
    mixins: [mpMixin, mixin, props$e],
    data() {
      return {
        overlayDuration: this.duration + 50
      };
    },
    watch: {
      show(newValue, oldValue) {
      }
    },
    computed: {
      transitionStyle() {
        const style = {
          zIndex: this.zIndex,
          position: "fixed",
          display: "flex"
        };
        style[this.mode] = 0;
        if (this.mode === "left") {
          return uni.$u.deepMerge(style, {
            bottom: 0,
            top: 0
          });
        } else if (this.mode === "right") {
          return uni.$u.deepMerge(style, {
            bottom: 0,
            top: 0
          });
        } else if (this.mode === "top") {
          return uni.$u.deepMerge(style, {
            left: 0,
            right: 0
          });
        } else if (this.mode === "bottom") {
          return uni.$u.deepMerge(style, {
            left: 0,
            right: 0
          });
        } else if (this.mode === "center") {
          return uni.$u.deepMerge(style, {
            alignItems: "center",
            "justify-content": "center",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          });
        }
      },
      contentStyle() {
        const style = {};
        uni.$u.sys();
        if (this.mode !== "center") {
          style.flex = 1;
        }
        if (this.bgColor) {
          style.backgroundColor = this.bgColor;
        }
        if (this.round) {
          const value = uni.$u.addUnit(this.round);
          if (this.mode === "top") {
            style.borderBottomLeftRadius = value;
            style.borderBottomRightRadius = value;
          } else if (this.mode === "bottom") {
            style.borderTopLeftRadius = value;
            style.borderTopRightRadius = value;
          } else if (this.mode === "center") {
            style.borderRadius = value;
          }
        }
        return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle));
      },
      position() {
        if (this.mode === "center") {
          return this.zoom ? "fade-zoom" : "fade";
        }
        if (this.mode === "left") {
          return "slide-left";
        }
        if (this.mode === "right") {
          return "slide-right";
        }
        if (this.mode === "bottom") {
          return "slide-up";
        }
        if (this.mode === "top") {
          return "slide-down";
        }
      }
    },
    methods: {
      // 点击遮罩
      overlayClick() {
        if (this.closeOnClickOverlay) {
          this.$emit("close");
        }
      },
      close(e2) {
        this.$emit("close");
      },
      afterEnter() {
        this.$emit("open");
      },
      clickHandler() {
        if (this.mode === "center") {
          this.overlayClick();
        }
        this.$emit("click");
      }
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_overlay = resolveEasycom(vue.resolveDynamicComponent("u-overlay"), __easycom_0$8);
    const _component_u_status_bar = resolveEasycom(vue.resolveDynamicComponent("u-status-bar"), __easycom_1$5);
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$b);
    const _component_u_safe_bottom = resolveEasycom(vue.resolveDynamicComponent("u-safe-bottom"), __easycom_3$2);
    const _component_u_transition = resolveEasycom(vue.resolveDynamicComponent("u-transition"), __easycom_0$9);
    return vue.openBlock(), vue.createElementBlock("view", { class: "u-popup" }, [
      _ctx.overlay ? (vue.openBlock(), vue.createBlock(_component_u_overlay, {
        key: 0,
        show: _ctx.show,
        onClick: $options.overlayClick,
        duration: $data.overlayDuration,
        customStyle: _ctx.overlayStyle,
        opacity: _ctx.overlayOpacity
      }, null, 8, ["show", "onClick", "duration", "customStyle", "opacity"])) : vue.createCommentVNode("v-if", true),
      vue.createVNode(_component_u_transition, {
        show: _ctx.show,
        customStyle: $options.transitionStyle,
        mode: $options.position,
        duration: _ctx.duration,
        onAfterEnter: $options.afterEnter,
        onClick: $options.clickHandler
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode(
            "view",
            {
              class: "u-popup__content",
              style: vue.normalizeStyle([$options.contentStyle]),
              onClick: _cache[1] || (_cache[1] = vue.withModifiers((...args) => _ctx.noop && _ctx.noop(...args), ["stop"]))
            },
            [
              _ctx.safeAreaInsetTop ? (vue.openBlock(), vue.createBlock(_component_u_status_bar, { key: 0 })) : vue.createCommentVNode("v-if", true),
              vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
              _ctx.closeable ? (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 1,
                  onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.close && $options.close(...args), ["stop"])),
                  class: vue.normalizeClass(["u-popup__content__close", ["u-popup__content__close--" + _ctx.closeIconPos]]),
                  "hover-class": "u-popup__content__close--hover",
                  "hover-stay-time": "150"
                },
                [
                  vue.createVNode(_component_u_icon, {
                    name: "close",
                    color: "#909399",
                    size: "18",
                    bold: ""
                  })
                ],
                2
                /* CLASS */
              )) : vue.createCommentVNode("v-if", true),
              _ctx.safeAreaInsetBottom ? (vue.openBlock(), vue.createBlock(_component_u_safe_bottom, { key: 2 })) : vue.createCommentVNode("v-if", true)
            ],
            4
            /* STYLE */
          )
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["show", "customStyle", "mode", "duration", "onAfterEnter", "onClick"])
    ]);
  }
  const __easycom_1$4 = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["render", _sfc_render$e], ["__scopeId", "data-v-05c24e9b"], ["__file", "D:/projects/work/applet/vue3_uview_plus/uni_modules/uview-plus/components/u-popup/u-popup.vue"]]);
  const _sfc_main$K = {
    __name: "cell1",
    props: {
      cellRNames: "",
      cellLImg: ""
    },
    emits: ["handleEvent"],
    setup(__props, { emit }) {
      const props2 = __props;
      const cellRNamesArr = JSON.parse(props2.cellRNames);
      const state = vue.reactive({
        imgPopShow: false
        // cellRNames:[],
        // cellLImg: '/static/icon/top-bg.png',
      });
      const handleEvent = () => emit("handleEvent");
      return (_ctx, _cache) => {
        const _component_u_popup = resolveEasycom(vue.resolveDynamicComponent("u-popup"), __easycom_1$4);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode("view", {
              class: "com_cell",
              onClick: _cache[1] || (_cache[1] = ($event) => handleEvent())
            }, [
              vue.createElementVNode("view", { class: "com_cellL" }, [
                __props.cellLImg ? (vue.openBlock(), vue.createElementBlock("img", {
                  key: 0,
                  class: "com_cellLImg",
                  src: `${vue.unref(BASE_FILE_URL)}${__props.cellLImg}`,
                  alt: "",
                  onClick: _cache[0] || (_cache[0] = vue.withModifiers(($event) => state.imgPopShow = true, ["stop"]))
                }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true)
              ]),
              vue.createElementVNode("view", { class: "com_cellR" }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(vue.unref(cellRNamesArr), (item) => {
                    return vue.openBlock(), vue.createElementBlock("view", { class: "box_ellipsis" }, [
                      vue.createElementVNode(
                        "text",
                        null,
                        vue.toDisplayString(item.title) + "：",
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "text",
                        null,
                        vue.toDisplayString(item.val),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  256
                  /* UNKEYED_FRAGMENT */
                ))
              ]),
              vue.withDirectives(vue.createElementVNode(
                "view",
                { class: "com_cell_step" },
                vue.toDisplayString(props2.step),
                513
                /* TEXT, NEED_PATCH */
              ), [
                [vue.vShow, props2.step]
              ])
            ]),
            vue.createElementVNode("view", null, [
              vue.createVNode(_component_u_popup, {
                show: state.imgPopShow,
                onClose: _cache[3] || (_cache[3] = ($event) => state.imgPopShow = false),
                mode: "center",
                customStyle: { width: "100%", height: "133vw" }
              }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("img", {
                    class: "pop_img_con_img",
                    src: `${vue.unref(BASE_FILE_URL)}${__props.cellLImg}`,
                    alt: "",
                    onClick: _cache[2] || (_cache[2] = ($event) => state.imgPopShow = false)
                  }, null, 8, ["src"])
                ]),
                _: 1
                /* STABLE */
              }, 8, ["show"])
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const __easycom_0$7 = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["__scopeId", "data-v-7325b980"], ["__file", "D:/projects/work/applet/vue3_uview_plus/components/cell1/cell1.vue"]]);
  const _sfc_main$J = {
    __name: "taskHideRule",
    props: {
      config: {}
    },
    setup(__props) {
      useIndexStore();
      const state = vue.reactive({
        hideStatus: 1,
        taskDangerInfo: []
      });
      const hide_status = [
        { id: 1, title: "隐患上传" },
        { id: 2, title: "隐患整改" },
        { id: 3, title: "隐患复核" }
      ];
      const hide_item_name = [
        { id: 1, title: "检查活动名称", key: "field2" },
        { id: 2, title: "受检单位", key: "field" },
        { id: 3, title: "隐患描述", key: "field3" },
        { id: 4, title: "上传时间", key: "addDate" }
      ];
      const getClappingInfo = async (id) => {
        let params = {
          page: 1,
          rows: 100
        };
        let info = [];
        if (id == 1) {
          const interTaskMyInfo = await requestTaskMyDanInfo(params).then((r2) => r2).catch((e2) => {
          });
          if (!interTaskMyInfo.data || !interTaskMyInfo.data.t) {
            return;
          }
          info = interTaskMyInfo.data.t.content || [];
          if (hide_item_name.length == 5) {
            hide_item_name.pop();
          }
        }
        if (id == 2) {
          const interTaskZGInfo = await requestTaskZGDanInfo(params).then((r2) => r2).catch((e2) => {
          });
          if (!interTaskZGInfo.data || !interTaskZGInfo.data.t) {
            return;
          }
          hide_item_name.push({ id: 5, title: "复核人", key: "field10.ushow" });
          info = interTaskZGInfo.data.t.content || [];
        }
        if (id == 3) {
          const interTaskFHInfo = await requestTaskFHDanInfo(params).then((r2) => r2).catch((e2) => {
          });
          if (!interTaskFHInfo.data || !interTaskFHInfo.data.t) {
            return;
          }
          info = interTaskFHInfo.data.t.content || [];
          if (hide_item_name.length == 5) {
            hide_item_name.pop();
          }
        }
        state.mainDangerInfo = info;
        state.taskDangerInfo = info.map((clap) => {
          let obj = {};
          let cellRNames = hide_item_name.map((item) => {
            item.val = clap[item.key];
            if (item.key.includes("addDate")) {
              let arr = formatDate(item.val);
              item.val = `${arr[0]}-${arr[1]} ${arr[3]}`;
            }
            if (item.key.includes(".")) {
              let keys = item.key.split(".");
              item.val = clap[keys[0]][keys[1]];
            }
            return item;
          });
          obj.cellRNames = JSON.stringify(cellRNames);
          obj.dangerLImg = clap.imgs;
          obj.dangerId = clap.id;
          obj.field6 = clap.field6;
          obj.hdNo = clap.hdNo;
          return obj;
        });
        formatAppLog("log", "at pages/taskHideRule/taskHideRule.vue:120", "taskDangerInfo", state.taskDangerInfo);
      };
      const handleHideStatus = (obj) => {
        state.hideStatus = obj.id;
        getClappingInfo(obj.id);
        formatAppLog("log", "at pages/taskHideRule/taskHideRule.vue:128", obj);
      };
      const dangerItemClick = (obj, index2) => {
        formatAppLog("log", "at pages/taskHideRule/taskHideRule.vue:133", obj);
        const data = state.mainDangerInfo[index2];
        formatAppLog("log", "at pages/taskHideRule/taskHideRule.vue:136", data);
        const formConfig = getFormConfig(obj, data);
        uni.$u.route({
          url: "/pages/comForm/comForm",
          params: {
            data: JSON.stringify(formConfig),
            title: "隐患上传"
          }
        });
      };
      const dangerTypes = [["一般隐患(现场整改)", "一般隐患(非现场整改)", "重大隐患"]];
      const dangerLevels = [["人员", "设备", "管理"]];
      const getFormConfig = (obj, data) => {
        const formConfig = {};
        if (state.hideStatus == 1) {
          formConfig.domList = [
            { id: 1, title: "隐患编号", key: "hdNo", type: "text", ref: "danger_up_hdNo", val: data["hdNo"] || "" },
            { id: 2, title: "受检单位(责任单位)", key: "field", type: "text", ref: "danger_up_field", val: data["field"] || "" },
            { id: 3, title: "检查活动名称(检查内容)", key: "field2", type: "text", ref: "danger_up_field2", val: data["field2"] || "" },
            { id: 4, title: "隐患地点", key: "field1", type: "text", ref: "danger_up_field1", val: data["field1"] || "" },
            { id: 5, title: "隐患描述", key: "field3", type: "text", ref: "danger_up_field3", val: data["field3"] || "" },
            { id: 6, title: " 隐患照片", key: "imgs", type: "picture", ref: "danger_up_imgs", val: data["imgs"] || "" },
            { id: 7, title: "整改要求", key: "field4", type: "input", ref: "danger_up_field4", val: data["field4"] || "" },
            { id: 8, title: "规定时间(整改截止时间)", key: "field5", type: "timeYMD", ref: "danger_up_field5", val: data["field5"] || "" },
            { id: 9, title: "隐患类型", key: "field8", type: "picker", ref: "danger_up_field8", options: dangerTypes },
            { id: 10, title: "隐患等级", key: "field9", type: "picker", ref: "danger_up_field9", options: dangerLevels },
            { id: 11, title: "整改责任人", key: "field10.id", type: "user", ref: "danger_up_field10" }
            // field10.id
          ];
          formConfig.config = {
            submitFn: "requestDangerSubmit",
            from: "danger_up",
            params: { id: obj.dangerId, field6: obj.dangerId }
          };
        }
        if (state.hideStatus == 2) {
          let field5arr = formatDate(data["field5"] - 0);
          let field5Val = `${field5arr[0]}-${field5arr[1]} ${field5arr[3]}`;
          formConfig.domList = [
            { id: 1, title: "隐患编号", key: "hdNo", type: "text", ref: "danger_up_hdNo", val: data["hdNo"] || "" },
            { id: 2, title: "受检单位(责任单位)", key: "field", type: "text", ref: "danger_up_field", val: data["field"] || "" },
            { id: 3, title: "检查活动名称(检查内容)", key: "field2", type: "text", ref: "danger_up_field2", val: data["field2"] || "" },
            { id: 4, title: "隐患地点", key: "field1", type: "text", ref: "danger_up_field1", val: data["field1"] || "" },
            { id: 5, title: "隐患描述", key: "field3", type: "text", ref: "danger_up_field3", val: data["field3"] || "" },
            { id: 6, title: " 隐患照片", key: "imgs", type: "picture", ref: "danger_up_imgs", val: data["imgs"] || "" },
            { id: 7, title: "整改要求", key: "field4", type: "text", ref: "danger_up_field4", val: data["field4"] || "" },
            { id: 8, title: "规定时间(整改截止时间)", key: "field5", type: "text", ref: "danger_up_field5", val: field5Val || "" },
            { id: 9, title: "隐患类型", key: "field8", type: "text", ref: "danger_up_field8", val: data["field8"] || "" },
            { id: 10, title: "隐患等级", key: "field9", type: "text", ref: "danger_up_field9", val: data["field9"] || "" },
            { id: 11, title: "整改责任人", key: "field10.ushow", type: "text", ref: "danger_up_field10", val: data["field10"]["ushow"] || "" },
            // field10.id
            { id: 12, title: "整改保障措施", key: "field13", type: "input", ref: "danger_up_field13" },
            // field10.id
            { id: 13, title: "整改完成情况", key: "field14", type: "input", ref: "danger_up_field14" },
            // field10.id
            { id: 14, title: "整改完成情况照片", key: "field15", type: "photo", ref: "danger_up_field15" },
            // field10.id
            { id: 15, title: "投入资金", key: "field16", type: "input", ref: "danger_up_field16" },
            // field10.id
            { id: 16, title: "实际整改完成时间", key: "field17", type: "time", ref: "danger_up_field17" }
            // field10.id
          ];
          formConfig.config = {
            submitFn: "requestDangerZGSubmit",
            from: "danger_zg",
            params: { id: obj.dangerId, field11: "否" }
          };
        }
        if (state.hideStatus == 3) {
          let field5arr = formatDate(data["field5"] - 0);
          let field5Val = `${field5arr[0]}-${field5arr[1]}`;
          let field17arr = formatDate(data["field5"] - 0);
          let field17Val = `${field17arr[0]}-${field17arr[1]}`;
          let field18Option = [
            { label: "复核驳回", key: "3" },
            { label: "结束", key: "4" }
          ];
          formConfig.domList = [
            { id: 1, title: "隐患编号", key: "hdNo", type: "text", ref: "danger_up_hdNo", val: data["hdNo"] || "" },
            { id: 2, title: "受检单位(责任单位)", key: "field", type: "text", ref: "danger_up_field", val: data["field"] || "" },
            { id: 3, title: "检查活动名称(检查内容)", key: "field2", type: "text", ref: "danger_up_field2", val: data["field2"] || "" },
            { id: 4, title: "隐患地点", key: "field1", type: "text", ref: "danger_up_field1", val: data["field1"] || "" },
            { id: 5, title: "隐患描述", key: "field3", type: "text", ref: "danger_up_field3", val: data["field3"] || "" },
            { id: 6, title: " 隐患照片", key: "imgs", type: "picture", ref: "danger_up_imgs", val: data["imgs"] || "" },
            { id: 7, title: "整改要求", key: "field4", type: "text", ref: "danger_up_field4", val: data["field4"] || "" },
            { id: 8, title: "规定时间(整改截止时间)", key: "field5", type: "text", ref: "danger_up_field5", val: field5Val || "" },
            { id: 9, title: "隐患类型", key: "field8", type: "text", ref: "danger_up_field8", val: data["field8"] || "" },
            { id: 10, title: "隐患等级", key: "field9", type: "text", ref: "danger_up_field9", val: data["field9"] || "" },
            { id: 11, title: "整改责任人", key: "field10.ushow", type: "text", ref: "danger_up_field10", val: data["field10"]["ushow"] || "" },
            // field10.id
            { id: 12, title: "整改保障措施", key: "field13", type: "text", ref: "danger_up_field13", val: data["field13"] || "" },
            // field10.id
            { id: 13, title: "整改完成情况", key: "field14", type: "text", ref: "danger_up_field14", val: data["field14"] || "" },
            // field10.id
            { id: 14, title: "整改完成情况照片", key: "field15", type: "picture", ref: "danger_up_field15", val: data["field15"] || "" },
            // field10.id
            { id: 15, title: "投入资金", key: "field16", type: "text", ref: "danger_up_field16", val: data["field16"] || "" },
            // field10.id
            { id: 16, title: "实际整改完成时间", key: "field17", type: "text", ref: "danger_up_field17", val: field17Val },
            // field10.id
            { id: 17, title: "是否委派复核人", key: "field18", type: "text", ref: "danger_up_field18", val: "否" },
            // field10.id
            { id: 18, title: "是否合格", key: "status", type: "radio", ref: "danger_up_status", val: field18Option[1], options: field18Option },
            // field10.id
            { id: 19, title: "情况描述", key: "field21", type: "input", ref: "danger_up_field21", val: "否" },
            // field10.id
            { id: 20, title: "情况描述图片", key: "field22", type: "photo", ref: "danger_up_field22", val: "否" },
            // field10.id
            { id: 21, title: "复核时间", key: "field20", type: "time", ref: "danger_up_field20", val: "否" }
            // field10.id
          ];
          formConfig.config = {
            submitFn: "requestDangerFHSubmit",
            from: "danger_fh",
            params: { id: obj.dangerId }
          };
        }
        return formConfig;
      };
      onShow(() => {
        getClappingInfo(state.hideStatus);
      });
      return (_ctx, _cache) => {
        const _component_cell1 = resolveEasycom(vue.resolveDynamicComponent("cell1"), __easycom_0$7);
        return vue.openBlock(), vue.createElementBlock("view", { class: "task_hide" }, [
          vue.createCommentVNode(" 隐患状态 "),
          vue.createElementVNode("view", { class: "task_hide_status" }, [
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(hide_status, (item) => {
                return vue.createElementVNode("view", {
                  key: item.id,
                  class: vue.normalizeClass({ taskHideBtn: true, taskHideSe: state.hideStatus == item.id }),
                  onClick: ($event) => handleHideStatus(item)
                }, [
                  vue.createTextVNode(
                    vue.toDisplayString(item.title) + " ",
                    1
                    /* TEXT */
                  ),
                  vue.createCommentVNode(" <view v-show = 'item.id == 1' class = 'taskHideBtnNum'>4</view> "),
                  vue.withDirectives(vue.createElementVNode(
                    "view",
                    { class: "taskHideBtnLine" },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vShow, state.hideStatus == item.id]
                  ])
                ], 10, ["onClick"]);
              }),
              64
              /* STABLE_FRAGMENT */
            ))
          ]),
          vue.createElementVNode("view", { class: "task_hide_main" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(state.taskDangerInfo, (item, index2) => {
                return vue.openBlock(), vue.createBlock(_component_cell1, {
                  cellRNames: item.cellRNames,
                  cellLImg: item.dangerLImg,
                  onHandleEvent: ($event) => dangerItemClick(item, index2)
                }, null, 8, ["cellRNames", "cellLImg", "onHandleEvent"]);
              }),
              256
              /* UNKEYED_FRAGMENT */
            ))
          ])
        ]);
      };
    }
  };
  const PagesTaskHideRuleTaskHideRule = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/taskHideRule/taskHideRule.vue"]]);
  const props$d = {
    props: {
      // 是否展示工具条
      show: {
        type: Boolean,
        default: props$o.toolbar.show
      },
      // 取消按钮的文字
      cancelText: {
        type: String,
        default: props$o.toolbar.cancelText
      },
      // 确认按钮的文字
      confirmText: {
        type: String,
        default: props$o.toolbar.confirmText
      },
      // 取消按钮的颜色
      cancelColor: {
        type: String,
        default: props$o.toolbar.cancelColor
      },
      // 确认按钮的颜色
      confirmColor: {
        type: String,
        default: props$o.toolbar.confirmColor
      },
      // 标题文字
      title: {
        type: String,
        default: props$o.toolbar.title
      }
    }
  };
  const _sfc_main$I = {
    name: "u-toolbar",
    mixins: [mpMixin, mixin, props$d],
    methods: {
      // 点击取消按钮
      cancel() {
        this.$emit("cancel");
      },
      // 点击确定按钮
      confirm() {
        this.$emit("confirm");
      }
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    return _ctx.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: "u-toolbar",
        onTouchmove: _cache[2] || (_cache[2] = vue.withModifiers((...args) => _ctx.noop && _ctx.noop(...args), ["stop", "prevent"]))
      },
      [
        vue.createElementVNode("view", {
          class: "u-toolbar__cancel__wrapper",
          "hover-class": "u-hover-class"
        }, [
          vue.createElementVNode(
            "text",
            {
              class: "u-toolbar__wrapper__cancel",
              onClick: _cache[0] || (_cache[0] = (...args) => $options.cancel && $options.cancel(...args)),
              style: vue.normalizeStyle({
                color: _ctx.cancelColor
              })
            },
            vue.toDisplayString(_ctx.cancelText),
            5
            /* TEXT, STYLE */
          )
        ]),
        _ctx.title ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 0,
            class: "u-toolbar__title u-line-1"
          },
          vue.toDisplayString(_ctx.title),
          1
          /* TEXT */
        )) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", {
          class: "u-toolbar__confirm__wrapper",
          "hover-class": "u-hover-class"
        }, [
          vue.createElementVNode(
            "text",
            {
              class: "u-toolbar__wrapper__confirm",
              onClick: _cache[1] || (_cache[1] = (...args) => $options.confirm && $options.confirm(...args)),
              style: vue.normalizeStyle({
                color: _ctx.confirmColor
              })
            },
            vue.toDisplayString(_ctx.confirmText),
            5
            /* TEXT, STYLE */
          )
        ])
      ],
      32
      /* HYDRATE_EVENTS */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$6 = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["render", _sfc_render$d], ["__scopeId", "data-v-eadae74e"], ["__file", "D:/projects/work/applet/vue3_uview_plus/uni_modules/uview-plus/components/u-toolbar/u-toolbar.vue"]]);
  const props$c = {
    props: {
      // 是否展示picker弹窗
      show: {
        type: Boolean,
        default: props$o.picker.show
      },
      // 是否展示顶部的操作栏
      showToolbar: {
        type: Boolean,
        default: props$o.picker.showToolbar
      },
      // 顶部标题
      title: {
        type: String,
        default: props$o.picker.title
      },
      // 对象数组，设置每一列的数据
      columns: {
        type: Array,
        default: props$o.picker.columns
      },
      // 是否显示加载中状态
      loading: {
        type: Boolean,
        default: props$o.picker.loading
      },
      // 各列中，单个选项的高度
      itemHeight: {
        type: [String, Number],
        default: props$o.picker.itemHeight
      },
      // 取消按钮的文字
      cancelText: {
        type: String,
        default: props$o.picker.cancelText
      },
      // 确认按钮的文字
      confirmText: {
        type: String,
        default: props$o.picker.confirmText
      },
      // 取消按钮的颜色
      cancelColor: {
        type: String,
        default: props$o.picker.cancelColor
      },
      // 确认按钮的颜色
      confirmColor: {
        type: String,
        default: props$o.picker.confirmColor
      },
      // 每列中可见选项的数量
      visibleItemCount: {
        type: [String, Number],
        default: props$o.picker.visibleItemCount
      },
      // 选项对象中，需要展示的属性键名
      keyName: {
        type: String,
        default: props$o.picker.keyName
      },
      // 是否允许点击遮罩关闭选择器
      closeOnClickOverlay: {
        type: Boolean,
        default: props$o.picker.closeOnClickOverlay
      },
      // 各列的默认索引
      defaultIndex: {
        type: Array,
        default: props$o.picker.defaultIndex
      },
      // 是否在手指松开时立即触发 change 事件。若不开启则会在滚动动画结束后触发 change 事件，只在微信2.21.1及以上有效
      immediateChange: {
        type: Boolean,
        default: props$o.picker.immediateChange
      }
    }
  };
  const _sfc_main$H = {
    name: "u-picker",
    mixins: [mpMixin, mixin, props$c],
    data() {
      return {
        // 上一次选择的列索引
        lastIndex: [],
        // 索引值 ，对应picker-view的value
        innerIndex: [],
        // 各列的值
        innerColumns: [],
        // 上一次的变化列索引
        columnIndex: 0
      };
    },
    watch: {
      // 监听默认索引的变化，重新设置对应的值
      defaultIndex: {
        immediate: true,
        handler(n2) {
          this.setIndexs(n2, true);
        }
      },
      // 监听columns参数的变化
      columns: {
        immediate: true,
        deep: true,
        handler(n2) {
          this.setColumns(n2);
        }
      }
    },
    emits: ["close", "cancel", "confirm", "change"],
    methods: {
      // 获取item需要显示的文字，判别为对象还是文本
      getItemText(item) {
        if (uni.$u.test.object(item)) {
          return item[this.keyName];
        } else {
          return item;
        }
      },
      // 关闭选择器
      closeHandler() {
        if (this.closeOnClickOverlay) {
          this.$emit("close");
        }
      },
      // 点击工具栏的取消按钮
      cancel() {
        this.$emit("cancel");
      },
      // 点击工具栏的确定按钮
      confirm() {
        this.$emit("confirm", {
          indexs: this.innerIndex,
          value: this.innerColumns.map((item, index2) => item[this.innerIndex[index2]]),
          values: this.innerColumns
        });
      },
      // 选择器某一列的数据发生变化时触发
      changeHandler(e2) {
        const {
          value
        } = e2.detail;
        let index2 = 0, columnIndex = 0;
        for (let i2 = 0; i2 < value.length; i2++) {
          let item = value[i2];
          if (item !== (this.lastIndex[i2] || 0)) {
            columnIndex = i2;
            index2 = item;
            break;
          }
        }
        this.columnIndex = columnIndex;
        const values = this.innerColumns;
        this.setLastIndex(value);
        this.setIndexs(value);
        this.$emit("change", {
          // 微信小程序不能传递this，会因为循环引用而报错
          picker: this,
          value: this.innerColumns.map((item, index3) => item[value[index3]]),
          index: index2,
          indexs: value,
          // values为当前变化列的数组内容
          values,
          columnIndex
        });
      },
      // 设置index索引，此方法可被外部调用设置
      setIndexs(index2, setLastIndex) {
        this.innerIndex = uni.$u.deepClone(index2);
        if (setLastIndex) {
          this.setLastIndex(index2);
        }
      },
      // 记录上一次的各列索引位置
      setLastIndex(index2) {
        this.lastIndex = uni.$u.deepClone(index2);
      },
      // 设置对应列选项的所有值
      setColumnValues(columnIndex, values) {
        this.innerColumns.splice(columnIndex, 1, values);
        let tmpIndex = uni.$u.deepClone(this.innerIndex);
        for (let i2 = 0; i2 < this.innerColumns.length; i2++) {
          if (i2 > this.columnIndex) {
            tmpIndex[i2] = 0;
          }
        }
        this.setIndexs(tmpIndex);
      },
      // 获取对应列的所有选项
      getColumnValues(columnIndex) {
        (async () => {
          await uni.$u.sleep();
        })();
        return this.innerColumns[columnIndex];
      },
      // 设置整体各列的columns的值
      setColumns(columns) {
        formatAppLog("log", "at uni_modules/uview-plus/components/u-picker/u-picker.vue:217", columns);
        this.innerColumns = uni.$u.deepClone(columns);
        if (this.innerIndex.length === 0) {
          this.innerIndex = new Array(columns.length).fill(0);
        }
      },
      // 获取各列选中值对应的索引
      getIndexs() {
        return this.innerIndex;
      },
      // 获取各列选中的值
      getValues() {
        (async () => {
          await uni.$u.sleep();
        })();
        return this.innerColumns.map((item, index2) => item[this.innerIndex[index2]]);
      }
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_toolbar = resolveEasycom(vue.resolveDynamicComponent("u-toolbar"), __easycom_0$6);
    const _component_u_loading_icon = resolveEasycom(vue.resolveDynamicComponent("u-loading-icon"), __easycom_9);
    const _component_u_popup = resolveEasycom(vue.resolveDynamicComponent("u-popup"), __easycom_1$4);
    return vue.openBlock(), vue.createBlock(_component_u_popup, {
      show: _ctx.show,
      onClose: $options.closeHandler
    }, {
      default: vue.withCtx(() => [
        vue.createElementVNode("view", { class: "u-picker" }, [
          _ctx.showToolbar ? (vue.openBlock(), vue.createBlock(_component_u_toolbar, {
            key: 0,
            cancelColor: _ctx.cancelColor,
            confirmColor: _ctx.confirmColor,
            cancelText: _ctx.cancelText,
            confirmText: _ctx.confirmText,
            title: _ctx.title,
            onCancel: $options.cancel,
            onConfirm: $options.confirm
          }, null, 8, ["cancelColor", "confirmColor", "cancelText", "confirmText", "title", "onCancel", "onConfirm"])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("picker-view", {
            class: "u-picker__view",
            indicatorStyle: `height: ${_ctx.$u.addUnit(_ctx.itemHeight)}`,
            value: $data.innerIndex,
            immediateChange: _ctx.immediateChange,
            style: vue.normalizeStyle({
              height: `${_ctx.$u.addUnit(_ctx.visibleItemCount * _ctx.itemHeight)}`
            }),
            onChange: _cache[0] || (_cache[0] = (...args) => $options.changeHandler && $options.changeHandler(...args))
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.innerColumns, (item, index2) => {
                return vue.openBlock(), vue.createElementBlock("picker-view-column", {
                  key: index2,
                  class: "u-picker__view__column"
                }, [
                  _ctx.$u.test.array(item) ? (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    { key: 0 },
                    vue.renderList(item, (item1, index1) => {
                      return vue.openBlock(), vue.createElementBlock(
                        "text",
                        {
                          class: "u-picker__view__column__item u-line-1",
                          key: index1,
                          style: vue.normalizeStyle({
                            height: _ctx.$u.addUnit(_ctx.itemHeight),
                            lineHeight: _ctx.$u.addUnit(_ctx.itemHeight),
                            fontWeight: index1 === $data.innerIndex[index2] ? "bold" : "normal"
                          })
                        },
                        vue.toDisplayString($options.getItemText(item1)),
                        5
                        /* TEXT, STYLE */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  )) : vue.createCommentVNode("v-if", true)
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ], 44, ["indicatorStyle", "value", "immediateChange"]),
          _ctx.loading ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "u-picker--loading"
          }, [
            vue.createVNode(_component_u_loading_icon, { mode: "circle" })
          ])) : vue.createCommentVNode("v-if", true)
        ])
      ]),
      _: 1
      /* STABLE */
    }, 8, ["show", "onClose"]);
  }
  const __easycom_6 = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["render", _sfc_render$c], ["__scopeId", "data-v-91b05052"], ["__file", "D:/projects/work/applet/vue3_uview_plus/uni_modules/uview-plus/components/u-picker/u-picker.vue"]]);
  const props$b = {
    props: {
      // 是否打开组件
      show: {
        type: Boolean,
        default: props$o.datetimePicker.show
      },
      // 是否展示顶部的操作栏
      showToolbar: {
        type: Boolean,
        default: props$o.datetimePicker.showToolbar
      },
      // 绑定值
      modelValue: {
        type: [String, Number],
        default: props$o.datetimePicker.value
      },
      // 顶部标题
      title: {
        type: String,
        default: props$o.datetimePicker.title
      },
      // 展示格式，mode=date为日期选择，mode=time为时间选择，mode=year-month为年月选择，mode=datetime为日期时间选择
      mode: {
        type: String,
        default: props$o.datetimePicker.mode
      },
      // 可选的最大时间
      maxDate: {
        type: Number,
        // 最大默认值为后10年
        default: props$o.datetimePicker.maxDate
      },
      // 可选的最小时间
      minDate: {
        type: Number,
        // 最小默认值为前10年
        default: props$o.datetimePicker.minDate
      },
      // 可选的最小小时，仅mode=time有效
      minHour: {
        type: Number,
        default: props$o.datetimePicker.minHour
      },
      // 可选的最大小时，仅mode=time有效
      maxHour: {
        type: Number,
        default: props$o.datetimePicker.maxHour
      },
      // 可选的最小分钟，仅mode=time有效
      minMinute: {
        type: Number,
        default: props$o.datetimePicker.minMinute
      },
      // 可选的最大分钟，仅mode=time有效
      maxMinute: {
        type: Number,
        default: props$o.datetimePicker.maxMinute
      },
      // 选项过滤函数
      filter: {
        type: [Function, null],
        default: props$o.datetimePicker.filter
      },
      // 选项格式化函数
      formatter: {
        type: [Function, null],
        default: props$o.datetimePicker.formatter
      },
      // 是否显示加载中状态
      loading: {
        type: Boolean,
        default: props$o.datetimePicker.loading
      },
      // 各列中，单个选项的高度
      itemHeight: {
        type: [String, Number],
        default: props$o.datetimePicker.itemHeight
      },
      // 取消按钮的文字
      cancelText: {
        type: String,
        default: props$o.datetimePicker.cancelText
      },
      // 确认按钮的文字
      confirmText: {
        type: String,
        default: props$o.datetimePicker.confirmText
      },
      // 取消按钮的颜色
      cancelColor: {
        type: String,
        default: props$o.datetimePicker.cancelColor
      },
      // 确认按钮的颜色
      confirmColor: {
        type: String,
        default: props$o.datetimePicker.confirmColor
      },
      // 每列中可见选项的数量
      visibleItemCount: {
        type: [String, Number],
        default: props$o.datetimePicker.visibleItemCount
      },
      // 是否允许点击遮罩关闭选择器
      closeOnClickOverlay: {
        type: Boolean,
        default: props$o.datetimePicker.closeOnClickOverlay
      },
      // 各列的默认索引
      defaultIndex: {
        type: Array,
        default: props$o.datetimePicker.defaultIndex
      }
    }
  };
  var SECONDS_A_MINUTE = 60;
  var SECONDS_A_HOUR = SECONDS_A_MINUTE * 60;
  var SECONDS_A_DAY = SECONDS_A_HOUR * 24;
  var SECONDS_A_WEEK = SECONDS_A_DAY * 7;
  var MILLISECONDS_A_SECOND = 1e3;
  var MILLISECONDS_A_MINUTE = SECONDS_A_MINUTE * MILLISECONDS_A_SECOND;
  var MILLISECONDS_A_HOUR = SECONDS_A_HOUR * MILLISECONDS_A_SECOND;
  var MILLISECONDS_A_DAY = SECONDS_A_DAY * MILLISECONDS_A_SECOND;
  var MILLISECONDS_A_WEEK = SECONDS_A_WEEK * MILLISECONDS_A_SECOND;
  var MS = "millisecond";
  var S$1 = "second";
  var MIN = "minute";
  var H = "hour";
  var D$1 = "day";
  var W = "week";
  var M$1 = "month";
  var Q = "quarter";
  var Y = "year";
  var DATE = "date";
  var FORMAT_DEFAULT = "YYYY-MM-DDTHH:mm:ssZ";
  var INVALID_DATE_STRING = "Invalid Date";
  var REGEX_PARSE = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/;
  var REGEX_FORMAT = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
  const en = {
    name: "en",
    weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
    months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
    ordinal: function ordinal(n2) {
      var s2 = ["th", "st", "nd", "rd"];
      var v2 = n2 % 100;
      return "[" + n2 + (s2[(v2 - 20) % 10] || s2[v2] || s2[0]) + "]";
    }
  };
  var padStart = function padStart2(string2, length, pad) {
    var s2 = String(string2);
    if (!s2 || s2.length >= length)
      return string2;
    return "" + Array(length + 1 - s2.length).join(pad) + string2;
  };
  var padZoneStr = function padZoneStr2(instance) {
    var negMinutes = -instance.utcOffset();
    var minutes = Math.abs(negMinutes);
    var hourOffset = Math.floor(minutes / 60);
    var minuteOffset = minutes % 60;
    return (negMinutes <= 0 ? "+" : "-") + padStart(hourOffset, 2, "0") + ":" + padStart(minuteOffset, 2, "0");
  };
  var monthDiff = function monthDiff2(a2, b2) {
    if (a2.date() < b2.date())
      return -monthDiff2(b2, a2);
    var wholeMonthDiff = (b2.year() - a2.year()) * 12 + (b2.month() - a2.month());
    var anchor = a2.clone().add(wholeMonthDiff, M$1);
    var c2 = b2 - anchor < 0;
    var anchor2 = a2.clone().add(wholeMonthDiff + (c2 ? -1 : 1), M$1);
    return +(-(wholeMonthDiff + (b2 - anchor) / (c2 ? anchor - anchor2 : anchor2 - anchor)) || 0);
  };
  var absFloor = function absFloor2(n2) {
    return n2 < 0 ? Math.ceil(n2) || 0 : Math.floor(n2);
  };
  var prettyUnit = function prettyUnit2(u2) {
    var special = {
      M: M$1,
      y: Y,
      w: W,
      d: D$1,
      D: DATE,
      h: H,
      m: MIN,
      s: S$1,
      ms: MS,
      Q
    };
    return special[u2] || String(u2 || "").toLowerCase().replace(/s$/, "");
  };
  var isUndefined$1 = function isUndefined2(s2) {
    return s2 === void 0;
  };
  const U = {
    s: padStart,
    z: padZoneStr,
    m: monthDiff,
    a: absFloor,
    p: prettyUnit,
    u: isUndefined$1
  };
  var L$1 = "en";
  var Ls = {};
  Ls[L$1] = en;
  var IS_DAYJS = "$isDayjsObject";
  var isDayjs = function isDayjs2(d2) {
    return d2 instanceof Dayjs || !!(d2 && d2[IS_DAYJS]);
  };
  var parseLocale = function parseLocale2(preset, object2, isLocal) {
    var l2;
    if (!preset)
      return L$1;
    if (typeof preset === "string") {
      var presetLower = preset.toLowerCase();
      if (Ls[presetLower]) {
        l2 = presetLower;
      }
      if (object2) {
        Ls[presetLower] = object2;
        l2 = presetLower;
      }
      var presetSplit = preset.split("-");
      if (!l2 && presetSplit.length > 1) {
        return parseLocale2(presetSplit[0]);
      }
    } else {
      var name = preset.name;
      Ls[name] = preset;
      l2 = name;
    }
    if (!isLocal && l2)
      L$1 = l2;
    return l2 || !isLocal && L$1;
  };
  var dayjs$1 = function dayjs2(date2, c2) {
    if (isDayjs(date2)) {
      return date2.clone();
    }
    var cfg = typeof c2 === "object" ? c2 : {};
    cfg.date = date2;
    cfg.args = arguments;
    return new Dayjs(cfg);
  };
  var wrapper = function wrapper2(date2, instance) {
    return dayjs$1(date2, {
      locale: instance.$L,
      utc: instance.$u,
      x: instance.$x,
      $offset: instance.$offset
      // todo: refactor; do not use this.$offset in you code
    });
  };
  var Utils = U;
  Utils.l = parseLocale;
  Utils.i = isDayjs;
  Utils.w = wrapper;
  var parseDate = function parseDate2(cfg) {
    var date2 = cfg.date, utc = cfg.utc;
    if (date2 === null)
      return /* @__PURE__ */ new Date(NaN);
    if (Utils.u(date2))
      return /* @__PURE__ */ new Date();
    if (date2 instanceof Date)
      return new Date(date2);
    if (typeof date2 === "string" && !/Z$/i.test(date2)) {
      var d2 = date2.match(REGEX_PARSE);
      if (d2) {
        var m2 = d2[2] - 1 || 0;
        var ms = (d2[7] || "0").substring(0, 3);
        if (utc) {
          return new Date(Date.UTC(d2[1], m2, d2[3] || 1, d2[4] || 0, d2[5] || 0, d2[6] || 0, ms));
        }
        return new Date(d2[1], m2, d2[3] || 1, d2[4] || 0, d2[5] || 0, d2[6] || 0, ms);
      }
    }
    return new Date(date2);
  };
  var Dayjs = /* @__PURE__ */ function() {
    function Dayjs2(cfg) {
      this.$L = parseLocale(cfg.locale, null, true);
      this.parse(cfg);
      this.$x = this.$x || cfg.x || {};
      this[IS_DAYJS] = true;
    }
    var _proto = Dayjs2.prototype;
    _proto.parse = function parse(cfg) {
      this.$d = parseDate(cfg);
      this.init();
    };
    _proto.init = function init() {
      var $d = this.$d;
      this.$y = $d.getFullYear();
      this.$M = $d.getMonth();
      this.$D = $d.getDate();
      this.$W = $d.getDay();
      this.$H = $d.getHours();
      this.$m = $d.getMinutes();
      this.$s = $d.getSeconds();
      this.$ms = $d.getMilliseconds();
    };
    _proto.$utils = function $utils() {
      return Utils;
    };
    _proto.isValid = function isValid() {
      return !(this.$d.toString() === INVALID_DATE_STRING);
    };
    _proto.isSame = function isSame(that, units) {
      var other = dayjs$1(that);
      return this.startOf(units) <= other && other <= this.endOf(units);
    };
    _proto.isAfter = function isAfter(that, units) {
      return dayjs$1(that) < this.startOf(units);
    };
    _proto.isBefore = function isBefore(that, units) {
      return this.endOf(units) < dayjs$1(that);
    };
    _proto.$g = function $g(input, get, set2) {
      if (Utils.u(input))
        return this[get];
      return this.set(set2, input);
    };
    _proto.unix = function unix() {
      return Math.floor(this.valueOf() / 1e3);
    };
    _proto.valueOf = function valueOf() {
      return this.$d.getTime();
    };
    _proto.startOf = function startOf(units, _startOf) {
      var _this = this;
      var isStartOf = !Utils.u(_startOf) ? _startOf : true;
      var unit = Utils.p(units);
      var instanceFactory = function instanceFactory2(d2, m2) {
        var ins = Utils.w(_this.$u ? Date.UTC(_this.$y, m2, d2) : new Date(_this.$y, m2, d2), _this);
        return isStartOf ? ins : ins.endOf(D$1);
      };
      var instanceFactorySet = function instanceFactorySet2(method, slice) {
        var argumentStart = [0, 0, 0, 0];
        var argumentEnd = [23, 59, 59, 999];
        return Utils.w(_this.toDate()[method].apply(
          // eslint-disable-line prefer-spread
          _this.toDate("s"),
          (isStartOf ? argumentStart : argumentEnd).slice(slice)
        ), _this);
      };
      var $W = this.$W, $M = this.$M, $D = this.$D;
      var utcPad = "set" + (this.$u ? "UTC" : "");
      switch (unit) {
        case Y:
          return isStartOf ? instanceFactory(1, 0) : instanceFactory(31, 11);
        case M$1:
          return isStartOf ? instanceFactory(1, $M) : instanceFactory(0, $M + 1);
        case W: {
          var weekStart = this.$locale().weekStart || 0;
          var gap = ($W < weekStart ? $W + 7 : $W) - weekStart;
          return instanceFactory(isStartOf ? $D - gap : $D + (6 - gap), $M);
        }
        case D$1:
        case DATE:
          return instanceFactorySet(utcPad + "Hours", 0);
        case H:
          return instanceFactorySet(utcPad + "Minutes", 1);
        case MIN:
          return instanceFactorySet(utcPad + "Seconds", 2);
        case S$1:
          return instanceFactorySet(utcPad + "Milliseconds", 3);
        default:
          return this.clone();
      }
    };
    _proto.endOf = function endOf(arg) {
      return this.startOf(arg, false);
    };
    _proto.$set = function $set(units, _int) {
      var _C$D$C$DATE$C$M$C$Y$C;
      var unit = Utils.p(units);
      var utcPad = "set" + (this.$u ? "UTC" : "");
      var name = (_C$D$C$DATE$C$M$C$Y$C = {}, _C$D$C$DATE$C$M$C$Y$C[D$1] = utcPad + "Date", _C$D$C$DATE$C$M$C$Y$C[DATE] = utcPad + "Date", _C$D$C$DATE$C$M$C$Y$C[M$1] = utcPad + "Month", _C$D$C$DATE$C$M$C$Y$C[Y] = utcPad + "FullYear", _C$D$C$DATE$C$M$C$Y$C[H] = utcPad + "Hours", _C$D$C$DATE$C$M$C$Y$C[MIN] = utcPad + "Minutes", _C$D$C$DATE$C$M$C$Y$C[S$1] = utcPad + "Seconds", _C$D$C$DATE$C$M$C$Y$C[MS] = utcPad + "Milliseconds", _C$D$C$DATE$C$M$C$Y$C)[unit];
      var arg = unit === D$1 ? this.$D + (_int - this.$W) : _int;
      if (unit === M$1 || unit === Y) {
        var date2 = this.clone().set(DATE, 1);
        date2.$d[name](arg);
        date2.init();
        this.$d = date2.set(DATE, Math.min(this.$D, date2.daysInMonth())).$d;
      } else if (name)
        this.$d[name](arg);
      this.init();
      return this;
    };
    _proto.set = function set2(string2, _int2) {
      return this.clone().$set(string2, _int2);
    };
    _proto.get = function get(unit) {
      return this[Utils.p(unit)]();
    };
    _proto.add = function add(number2, units) {
      var _this2 = this, _C$MIN$C$H$C$S$unit;
      number2 = Number(number2);
      var unit = Utils.p(units);
      var instanceFactorySet = function instanceFactorySet2(n2) {
        var d2 = dayjs$1(_this2);
        return Utils.w(d2.date(d2.date() + Math.round(n2 * number2)), _this2);
      };
      if (unit === M$1) {
        return this.set(M$1, this.$M + number2);
      }
      if (unit === Y) {
        return this.set(Y, this.$y + number2);
      }
      if (unit === D$1) {
        return instanceFactorySet(1);
      }
      if (unit === W) {
        return instanceFactorySet(7);
      }
      var step = (_C$MIN$C$H$C$S$unit = {}, _C$MIN$C$H$C$S$unit[MIN] = MILLISECONDS_A_MINUTE, _C$MIN$C$H$C$S$unit[H] = MILLISECONDS_A_HOUR, _C$MIN$C$H$C$S$unit[S$1] = MILLISECONDS_A_SECOND, _C$MIN$C$H$C$S$unit)[unit] || 1;
      var nextTimeStamp = this.$d.getTime() + number2 * step;
      return Utils.w(nextTimeStamp, this);
    };
    _proto.subtract = function subtract(number2, string2) {
      return this.add(number2 * -1, string2);
    };
    _proto.format = function format(formatStr) {
      var _this3 = this;
      var locale = this.$locale();
      if (!this.isValid())
        return locale.invalidDate || INVALID_DATE_STRING;
      var str = formatStr || FORMAT_DEFAULT;
      var zoneStr = Utils.z(this);
      var $H = this.$H, $m = this.$m, $M = this.$M;
      var weekdays = locale.weekdays, months = locale.months, meridiem = locale.meridiem;
      var getShort = function getShort2(arr, index2, full, length) {
        return arr && (arr[index2] || arr(_this3, str)) || full[index2].slice(0, length);
      };
      var get$H = function get$H2(num) {
        return Utils.s($H % 12 || 12, num, "0");
      };
      var meridiemFunc = meridiem || function(hour, minute, isLowercase) {
        var m2 = hour < 12 ? "AM" : "PM";
        return isLowercase ? m2.toLowerCase() : m2;
      };
      var matches = function matches2(match) {
        switch (match) {
          case "YY":
            return String(_this3.$y).slice(-2);
          case "YYYY":
            return Utils.s(_this3.$y, 4, "0");
          case "M":
            return $M + 1;
          case "MM":
            return Utils.s($M + 1, 2, "0");
          case "MMM":
            return getShort(locale.monthsShort, $M, months, 3);
          case "MMMM":
            return getShort(months, $M);
          case "D":
            return _this3.$D;
          case "DD":
            return Utils.s(_this3.$D, 2, "0");
          case "d":
            return String(_this3.$W);
          case "dd":
            return getShort(locale.weekdaysMin, _this3.$W, weekdays, 2);
          case "ddd":
            return getShort(locale.weekdaysShort, _this3.$W, weekdays, 3);
          case "dddd":
            return weekdays[_this3.$W];
          case "H":
            return String($H);
          case "HH":
            return Utils.s($H, 2, "0");
          case "h":
            return get$H(1);
          case "hh":
            return get$H(2);
          case "a":
            return meridiemFunc($H, $m, true);
          case "A":
            return meridiemFunc($H, $m, false);
          case "m":
            return String($m);
          case "mm":
            return Utils.s($m, 2, "0");
          case "s":
            return String(_this3.$s);
          case "ss":
            return Utils.s(_this3.$s, 2, "0");
          case "SSS":
            return Utils.s(_this3.$ms, 3, "0");
          case "Z":
            return zoneStr;
        }
        return null;
      };
      return str.replace(REGEX_FORMAT, function(match, $1) {
        return $1 || matches(match) || zoneStr.replace(":", "");
      });
    };
    _proto.utcOffset = function utcOffset() {
      return -Math.round(this.$d.getTimezoneOffset() / 15) * 15;
    };
    _proto.diff = function diff(input, units, _float) {
      var _this4 = this;
      var unit = Utils.p(units);
      var that = dayjs$1(input);
      var zoneDelta = (that.utcOffset() - this.utcOffset()) * MILLISECONDS_A_MINUTE;
      var diff2 = this - that;
      var getMonth = function getMonth2() {
        return Utils.m(_this4, that);
      };
      var result;
      switch (unit) {
        case Y:
          result = getMonth() / 12;
          break;
        case M$1:
          result = getMonth();
          break;
        case Q:
          result = getMonth() / 3;
          break;
        case W:
          result = (diff2 - zoneDelta) / MILLISECONDS_A_WEEK;
          break;
        case D$1:
          result = (diff2 - zoneDelta) / MILLISECONDS_A_DAY;
          break;
        case H:
          result = diff2 / MILLISECONDS_A_HOUR;
          break;
        case MIN:
          result = diff2 / MILLISECONDS_A_MINUTE;
          break;
        case S$1:
          result = diff2 / MILLISECONDS_A_SECOND;
          break;
        default:
          result = diff2;
          break;
      }
      return _float ? result : Utils.a(result);
    };
    _proto.daysInMonth = function daysInMonth() {
      return this.endOf(M$1).$D;
    };
    _proto.$locale = function $locale() {
      return Ls[this.$L];
    };
    _proto.locale = function locale(preset, object2) {
      if (!preset)
        return this.$L;
      var that = this.clone();
      var nextLocaleName = parseLocale(preset, object2, true);
      if (nextLocaleName)
        that.$L = nextLocaleName;
      return that;
    };
    _proto.clone = function clone2() {
      return Utils.w(this.$d, this);
    };
    _proto.toDate = function toDate() {
      return new Date(this.valueOf());
    };
    _proto.toJSON = function toJSON() {
      return this.isValid() ? this.toISOString() : null;
    };
    _proto.toISOString = function toISOString() {
      return this.$d.toISOString();
    };
    _proto.toString = function toString2() {
      return this.$d.toUTCString();
    };
    return Dayjs2;
  }();
  var proto = Dayjs.prototype;
  dayjs$1.prototype = proto;
  [["$ms", MS], ["$s", S$1], ["$m", MIN], ["$H", H], ["$W", D$1], ["$M", M$1], ["$y", Y], ["$D", DATE]].forEach(function(g2) {
    proto[g2[1]] = function(input) {
      return this.$g(input, g2[0], g2[1]);
    };
  });
  dayjs$1.extend = function(plugin, option) {
    if (!plugin.$i) {
      plugin(option, Dayjs, dayjs$1);
      plugin.$i = true;
    }
    return dayjs$1;
  };
  dayjs$1.locale = parseLocale;
  dayjs$1.isDayjs = isDayjs;
  dayjs$1.unix = function(timestamp) {
    return dayjs$1(timestamp * 1e3);
  };
  dayjs$1.en = Ls[L$1];
  dayjs$1.Ls = Ls;
  dayjs$1.p = {};
  function times$1(n2, iteratee) {
    let index2 = -1;
    const result = Array(n2 < 0 ? 0 : n2);
    while (++index2 < n2) {
      result[index2] = iteratee(index2);
    }
    return result;
  }
  const _sfc_main$G = {
    name: "datetime-picker",
    mixins: [mpMixin, mixin, props$b],
    data() {
      return {
        columns: [],
        innerDefaultIndex: [],
        innerFormatter: (type, value) => value
      };
    },
    watch: {
      show(newValue, oldValue) {
        if (newValue) {
          this.updateColumnValue(this.innerValue);
        }
      },
      propsChange() {
        this.init();
      }
    },
    computed: {
      // 如果以下这些变量发生了变化，意味着需要重新初始化各列的值
      propsChange() {
        return [this.mode, this.maxDate, this.minDate, this.minHour, this.maxHour, this.minMinute, this.maxMinute, this.filter];
      }
    },
    mounted() {
      this.init();
    },
    emits: ["close", "cancel", "confirm", "change", "update:modelValue"],
    methods: {
      init() {
        this.innerValue = this.correctValue(this.modelValue);
        this.updateColumnValue(this.innerValue);
      },
      // 在微信小程序中，不支持将函数当做props参数，故只能通过ref形式调用
      setFormatter(e2) {
        this.innerFormatter = e2;
      },
      // 关闭选择器
      close() {
        if (this.closeOnClickOverlay) {
          this.$emit("close");
        }
      },
      // 点击工具栏的取消按钮
      cancel() {
        this.$emit("cancel");
      },
      // 点击工具栏的确定按钮
      confirm() {
        this.$emit("confirm", {
          value: this.innerValue,
          mode: this.mode
        });
        this.$emit("update:modelValue", this.innerValue);
      },
      //用正则截取输出值,当出现多组数字时,抛出错误
      intercept(e2, type) {
        let judge = e2.match(/\d+/g);
        if (judge.length > 1) {
          uni.$u.error("请勿在过滤或格式化函数时添加数字");
          return 0;
        } else if (type && judge[0].length == 4) {
          return judge[0];
        } else if (judge[0].length > 2) {
          uni.$u.error("请勿在过滤或格式化函数时添加数字");
          return 0;
        } else {
          return judge[0];
        }
      },
      // 列发生变化时触发
      change(e2) {
        const { indexs, values } = e2;
        let selectValue = "";
        if (this.mode === "time") {
          selectValue = `${this.intercept(values[0][indexs[0]])}:${this.intercept(values[1][indexs[1]])}`;
        } else {
          const year = parseInt(this.intercept(values[0][indexs[0]], "year"));
          const month = parseInt(this.intercept(values[1][indexs[1]]));
          let date2 = parseInt(values[2] ? this.intercept(values[2][indexs[2]]) : 1);
          let hour = 0, minute = 0;
          const maxDate = dayjs$1(`${year}-${month}`).daysInMonth();
          if (this.mode === "year-month") {
            date2 = 1;
          }
          date2 = Math.min(maxDate, date2);
          if (this.mode === "datetime") {
            hour = parseInt(this.intercept(values[3][indexs[3]]));
            minute = parseInt(this.intercept(values[4][indexs[4]]));
          }
          selectValue = Number(new Date(year, month - 1, date2, hour, minute));
        }
        selectValue = this.correctValue(selectValue);
        this.innerValue = selectValue;
        this.updateColumnValue(selectValue);
        this.$emit("change", {
          value: selectValue,
          // 微信小程序不能传递this实例，会因为循环引用而报错
          picker: this.$refs.picker,
          mode: this.mode
        });
      },
      // 更新各列的值，进行补0、格式化等操作
      updateColumnValue(value) {
        this.innerValue = value;
        this.updateColumns();
        this.updateIndexs(value);
      },
      // 更新索引
      updateIndexs(value) {
        let values = [];
        const formatter = this.formatter || this.innerFormatter;
        const padZero2 = uni.$u.padZero;
        if (this.mode === "time") {
          const timeArr = value.split(":");
          values = [formatter("hour", timeArr[0]), formatter("minute", timeArr[1])];
        } else {
          values = [
            formatter("year", `${dayjs$1(value).year()}`),
            // 月份补0
            formatter("month", padZero2(dayjs$1(value).month() + 1))
          ];
          if (this.mode === "date") {
            values.push(formatter("day", padZero2(dayjs$1(value).date())));
          }
          if (this.mode === "datetime") {
            values.push(formatter("day", padZero2(dayjs$1(value).date())), formatter("hour", padZero2(dayjs$1(value).hour())), formatter("minute", padZero2(dayjs$1(value).minute())));
          }
        }
        const indexs = this.columns.map((column, index2) => {
          return Math.max(0, column.findIndex((item) => item === values[index2]));
        });
        this.innerDefaultIndex = indexs;
      },
      // 更新各列的值
      updateColumns() {
        const formatter = this.formatter || this.innerFormatter;
        const results = this.getOriginColumns().map((column) => column.values.map((value) => formatter(column.type, value)));
        this.columns = results;
      },
      getOriginColumns() {
        const results = this.getRanges().map(({ type, range: range2 }) => {
          let values = times$1(range2[1] - range2[0] + 1, (index2) => {
            let value = range2[0] + index2;
            value = type === "year" ? `${value}` : uni.$u.padZero(value);
            return value;
          });
          if (this.filter) {
            values = this.filter(type, values);
          }
          return { type, values };
        });
        return results;
      },
      // 通过最大值和最小值生成数组
      generateArray(start, end) {
        return Array.from(new Array(end + 1).keys()).slice(start);
      },
      // 得出合法的时间
      correctValue(value) {
        const isDateMode = this.mode !== "time";
        if (isDateMode && !uni.$u.test.date(value)) {
          value = this.minDate;
        } else if (!isDateMode && !value) {
          value = `${uni.$u.padZero(this.minHour)}:${uni.$u.padZero(this.minMinute)}`;
        }
        if (!isDateMode) {
          if (String(value).indexOf(":") === -1)
            return uni.$u.error("时间错误，请传递如12:24的格式");
          let [hour, minute] = value.split(":");
          hour = uni.$u.padZero(uni.$u.range(this.minHour, this.maxHour, Number(hour)));
          minute = uni.$u.padZero(uni.$u.range(this.minMinute, this.maxMinute, Number(minute)));
          return `${hour}:${minute}`;
        } else {
          value = dayjs$1(value).isBefore(dayjs$1(this.minDate)) ? this.minDate : value;
          value = dayjs$1(value).isAfter(dayjs$1(this.maxDate)) ? this.maxDate : value;
          return value;
        }
      },
      // 获取每列的最大和最小值
      getRanges() {
        if (this.mode === "time") {
          return [
            {
              type: "hour",
              range: [this.minHour, this.maxHour]
            },
            {
              type: "minute",
              range: [this.minMinute, this.maxMinute]
            }
          ];
        }
        const { maxYear, maxDate, maxMonth, maxHour, maxMinute } = this.getBoundary("max", this.innerValue);
        const { minYear, minDate, minMonth, minHour, minMinute } = this.getBoundary("min", this.innerValue);
        const result = [
          {
            type: "year",
            range: [minYear, maxYear]
          },
          {
            type: "month",
            range: [minMonth, maxMonth]
          },
          {
            type: "day",
            range: [minDate, maxDate]
          },
          {
            type: "hour",
            range: [minHour, maxHour]
          },
          {
            type: "minute",
            range: [minMinute, maxMinute]
          }
        ];
        if (this.mode === "date")
          result.splice(3, 2);
        if (this.mode === "year-month")
          result.splice(2, 3);
        return result;
      },
      // 根据minDate、maxDate、minHour、maxHour等边界值，判断各列的开始和结束边界值
      getBoundary(type, innerValue) {
        const value = new Date(innerValue);
        const boundary = new Date(this[`${type}Date`]);
        const year = dayjs$1(boundary).year();
        let month = 1;
        let date2 = 1;
        let hour = 0;
        let minute = 0;
        if (type === "max") {
          month = 12;
          date2 = dayjs$1(value).daysInMonth();
          hour = 23;
          minute = 59;
        }
        if (dayjs$1(value).year() === year) {
          month = dayjs$1(boundary).month() + 1;
          if (dayjs$1(value).month() + 1 === month) {
            date2 = dayjs$1(boundary).date();
            if (dayjs$1(value).date() === date2) {
              hour = dayjs$1(boundary).hour();
              if (dayjs$1(value).hour() === hour) {
                minute = dayjs$1(boundary).minute();
              }
            }
          }
        }
        return {
          [`${type}Year`]: year,
          [`${type}Month`]: month,
          [`${type}Date`]: date2,
          [`${type}Hour`]: hour,
          [`${type}Minute`]: minute
        };
      }
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_picker = resolveEasycom(vue.resolveDynamicComponent("u-picker"), __easycom_6);
    return vue.openBlock(), vue.createBlock(_component_u_picker, {
      ref: "picker",
      show: _ctx.show,
      closeOnClickOverlay: _ctx.closeOnClickOverlay,
      columns: $data.columns,
      title: _ctx.title,
      itemHeight: _ctx.itemHeight,
      showToolbar: _ctx.showToolbar,
      visibleItemCount: _ctx.visibleItemCount,
      defaultIndex: $data.innerDefaultIndex,
      cancelText: _ctx.cancelText,
      confirmText: _ctx.confirmText,
      cancelColor: _ctx.cancelColor,
      confirmColor: _ctx.confirmColor,
      onClose: $options.close,
      onCancel: $options.cancel,
      onConfirm: $options.confirm,
      onChange: $options.change
    }, null, 8, ["show", "closeOnClickOverlay", "columns", "title", "itemHeight", "showToolbar", "visibleItemCount", "defaultIndex", "cancelText", "confirmText", "cancelColor", "confirmColor", "onClose", "onCancel", "onConfirm", "onChange"]);
  }
  const __easycom_5 = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["render", _sfc_render$b], ["__scopeId", "data-v-e7a0f1eb"], ["__file", "D:/projects/work/applet/vue3_uview_plus/uni_modules/uview-plus/components/u-datetime-picker/u-datetime-picker.vue"]]);
  const props$a = {
    props: {
      // 列表锚点文本内容
      text: {
        type: [String, Number],
        default: props$o.indexAnchor.text
      },
      // 列表锚点文字颜色
      color: {
        type: String,
        default: props$o.indexAnchor.color
      },
      // 列表锚点文字大小，单位默认px
      size: {
        type: [String, Number],
        default: props$o.indexAnchor.size
      },
      // 列表锚点背景颜色
      bgColor: {
        type: String,
        default: props$o.indexAnchor.bgColor
      },
      // 列表锚点高度，单位默认px
      height: {
        type: [String, Number],
        default: props$o.indexAnchor.height
      }
    }
  };
  const _sfc_main$F = {
    name: "u-index-anchor",
    mixins: [mpMixin, mixin, props$a],
    data() {
      return {};
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        const indexList2 = uni.$u.$parent.call(this, "u-index-list");
        if (!indexList2) {
          return uni.$u.error("u-index-anchor必须要搭配u-index-list组件使用");
        }
        indexList2.anchors.push(this);
        const indexListItem = uni.$u.$parent.call(this, "u-index-item");
        if (!indexListItem) {
          return uni.$u.error("u-index-anchor必须要搭配u-index-item组件使用");
        }
        indexListItem.id = this.text.charCodeAt(0);
      }
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "u-index-anchor u-border-bottom",
        ref: `u-index-anchor-${_ctx.text}`,
        style: vue.normalizeStyle({
          height: _ctx.$u.addUnit(_ctx.height),
          backgroundColor: _ctx.bgColor
        })
      },
      [
        vue.createElementVNode(
          "text",
          {
            class: "u-index-anchor__text",
            style: vue.normalizeStyle({
              fontSize: _ctx.$u.addUnit(_ctx.size),
              color: _ctx.color
            })
          },
          vue.toDisplayString(_ctx.text),
          5
          /* TEXT, STYLE */
        )
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["render", _sfc_render$a], ["__scopeId", "data-v-20d39374"], ["__file", "D:/projects/work/applet/vue3_uview_plus/uni_modules/uview-plus/components/u-index-anchor/u-index-anchor.vue"]]);
  const props$9 = {
    props: {}
  };
  const _sfc_main$E = {
    name: "u-index-item",
    mixins: [mpMixin, mixin, props$9],
    data() {
      return {
        // 本组件到滚动条顶部的距离
        top: 0,
        height: 0,
        id: ""
      };
    },
    created() {
      this.anchor = {};
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.getParentData("u-index-list");
        if (!this.parent) {
          return uni.$u.error("u-index-item必须要搭配u-index-list组件使用");
        }
        uni.$u.sleep().then(() => {
          this.getIndexItemRect().then((size) => {
            this.top = Math.ceil(size.top);
            this.height = Math.ceil(size.height);
          });
        });
      },
      getIndexItemRect() {
        return new Promise((resolve) => {
          this.$uGetRect(".u-index-item").then((size) => {
            resolve(size);
          });
        });
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["u-index-item", [`u-index-item-${$data.id}`]]),
      id: `u-index-item-${$data.id}`
    }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ], 10, ["id"]);
  }
  const __easycom_2$2 = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["render", _sfc_render$9], ["__scopeId", "data-v-83b92c70"], ["__file", "D:/projects/work/applet/vue3_uview_plus/uni_modules/uview-plus/components/u-index-item/u-index-item.vue"]]);
  const props$8 = {
    props: {
      // 右边锚点非激活的颜色
      inactiveColor: {
        type: String,
        default: props$o.indexList.inactiveColor
      },
      // 右边锚点激活的颜色
      activeColor: {
        type: String,
        default: props$o.indexList.activeColor
      },
      // 索引字符列表，数组形式
      indexList: {
        type: Array,
        default: props$o.indexList.indexList
      },
      // 是否开启锚点自动吸顶
      sticky: {
        type: Boolean,
        default: props$o.indexList.sticky
      },
      // 自定义导航栏的高度
      customNavHeight: {
        type: [String, Number],
        default: props$o.indexList.customNavHeight
      }
    }
  };
  const indexList = () => {
    const indexList2 = [];
    const charCodeOfA = "A".charCodeAt(0);
    for (let i2 = 0; i2 < 26; i2++) {
      indexList2.push(String.fromCharCode(charCodeOfA + i2));
    }
    return indexList2;
  };
  const _sfc_main$D = {
    name: "u-index-list",
    mixins: [mpMixin, mixin, props$8],
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
        sys: uni.$u.sys(),
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
          uni.$u.sleep().then(() => {
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
      touchStart(e2) {
        const touchStart = e2.changedTouches[0];
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
      touchMove(e2) {
        let touchMove = e2.changedTouches[0];
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
      touchEnd(e2) {
        uni.$u.sleep(300).then(() => {
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
          const sys2 = uni.$u.sys();
          const windowHeight = sys2.windowHeight;
          let customNavHeight = 0;
          if (this.customNavHeight == 0) {
            customNavHeight = -(sys2.statusBarHeight + 44);
          } else {
            customNavHeight = uni.$u.getPx(this.customNavHeight);
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
      async scrollHandler(e2) {
        if (this.touching || this.scrolling)
          return;
        this.scrolling = true;
        uni.$u.sleep(10).then(() => {
          this.scrolling = false;
        });
        let scrollTop = 0;
        const len = this.children.length;
        let children = this.children;
        this.anchors;
        scrollTop = e2.detail.scrollTop;
        for (let i2 = 0; i2 < len; i2++) {
          const item = children[i2], nextItem = children[i2 + 1];
          if (scrollTop <= children[0].top || scrollTop >= children[len - 1].top + children[len - 1].height) {
            this.activeIndex = -1;
            break;
          } else if (!nextItem) {
            this.activeIndex = len - 1;
            break;
          } else if (scrollTop > item.top && scrollTop < nextItem.top) {
            this.activeIndex = i2;
            break;
          }
        }
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_transition = resolveEasycom(vue.resolveDynamicComponent("u-transition"), __easycom_0$9);
    return vue.openBlock(), vue.createElementBlock("view", { class: "u-index-list" }, [
      vue.createElementVNode("scroll-view", {
        scrollTop: $data.scrollTop,
        scrollIntoView: $data.scrollIntoView,
        "offset-accuracy": 1,
        style: vue.normalizeStyle({
          maxHeight: _ctx.$u.addUnit($data.scrollViewHeight)
        }),
        "scroll-y": "",
        onScroll: _cache[0] || (_cache[0] = (...args) => $options.scrollHandler && $options.scrollHandler(...args)),
        ref: "uList"
      }, [
        _ctx.$slots.header ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
          vue.renderSlot(_ctx.$slots, "header", {}, void 0, true)
        ])) : vue.createCommentVNode("v-if", true),
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
        _ctx.$slots.footer ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
          vue.renderSlot(_ctx.$slots, "footer", {}, void 0, true)
        ])) : vue.createCommentVNode("v-if", true)
      ], 44, ["scrollTop", "scrollIntoView"]),
      vue.createElementVNode(
        "view",
        {
          class: "u-index-list__letter",
          ref: "u-index-list__letter",
          style: vue.normalizeStyle({ top: _ctx.$u.addUnit($data.letterInfo.top || 100) }),
          onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.touchStart && $options.touchStart(...args)),
          onTouchmove: _cache[2] || (_cache[2] = vue.withModifiers((...args) => $options.touchMove && $options.touchMove(...args), ["stop", "prevent"])),
          onTouchend: _cache[3] || (_cache[3] = vue.withModifiers((...args) => $options.touchEnd && $options.touchEnd(...args), ["stop", "prevent"])),
          onTouchcancel: _cache[4] || (_cache[4] = vue.withModifiers((...args) => $options.touchEnd && $options.touchEnd(...args), ["stop", "prevent"]))
        },
        [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($options.uIndexList, (item, index2) => {
              return vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  class: "u-index-list__letter__item",
                  key: index2,
                  style: vue.normalizeStyle({
                    backgroundColor: $data.activeIndex === index2 ? _ctx.activeColor : "transparent"
                  })
                },
                [
                  vue.createElementVNode(
                    "text",
                    {
                      class: "u-index-list__letter__item__index",
                      style: vue.normalizeStyle({ color: $data.activeIndex === index2 ? "#fff" : _ctx.inactiveColor })
                    },
                    vue.toDisplayString(item),
                    5
                    /* TEXT, STYLE */
                  )
                ],
                4
                /* STYLE */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        36
        /* STYLE, HYDRATE_EVENTS */
      ),
      vue.createVNode(_component_u_transition, {
        mode: "fade",
        show: $data.touching,
        customStyle: {
          position: "fixed",
          right: "50px",
          top: _ctx.$u.addUnit($options.indicatorTop),
          zIndex: 2
        }
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["u-index-list__indicator", ["u-index-list__indicator--show"]]),
              style: vue.normalizeStyle({
                height: _ctx.$u.addUnit($data.indicatorHeight),
                width: _ctx.$u.addUnit($data.indicatorHeight)
              })
            },
            [
              vue.createElementVNode(
                "text",
                { class: "u-index-list__indicator__text" },
                vue.toDisplayString($options.uIndexList[$data.activeIndex]),
                1
                /* TEXT */
              )
            ],
            4
            /* STYLE */
          )
        ]),
        _: 1
        /* STABLE */
      }, 8, ["show", "customStyle"])
    ]);
  }
  const __easycom_3$1 = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["render", _sfc_render$8], ["__scopeId", "data-v-dfefaad1"], ["__file", "D:/projects/work/applet/vue3_uview_plus/uni_modules/uview-plus/components/u-index-list/u-index-list.vue"]]);
  const _sfc_main$C = {
    __name: "userList",
    setup(__props, { expose }) {
      useIndexStore();
      const state = vue.reactive({
        userListShow: false,
        indexList: ["A", "B", "C"],
        itemArr: [
          ["列表A1", "列表A2", "列表A3"],
          ["列表B1", "列表B2", "列表B3"],
          ["列表C1", "列表C2", "列表C3"]
        ]
        // indexList: ["A", "B", "C", "D", "E", "F","G", "H", "I","J", "K", "L","M", "N", "O",],
        // itemArr: [
        // 	['列表A1','列表A2','列表A3'],
        // 	['列表B1','列表B2','列表B3'],
        // 	['列表C1','列表C2','列表C3'],
        // 	['列表C1','列表C2','列表C3'],
        // 	['列表C1','列表C2','列表C3'],
        // 	['列表C1','列表C2','列表C3'],
        // 	['列表C1','列表C2','列表C3'],
        // 	['列表C1','列表C2','列表C3'],
        // 	['列表C1','列表C2','列表C3'],
        // 	['列表C1','列表C2','列表C3'],
        // 	['列表C1','列表C2','列表C3'],
        // 	['列表C1','列表C2','列表C3'],
        // 	['列表C1','列表C2','列表C3'],
        // 	['列表C1','列表C2','列表C3'],
        // 	['列表C1','列表C2','列表C3'],
        // ]
      });
      const handleUserList = (config2) => {
        formatAppLog("log", "at components/userList/userList.vue:81", config2);
        formatAppLog("log", "at components/userList/userList.vue:82", 1111111);
        state.userListShow = !state.userListShow;
      };
      const handleUser = (obj) => {
        state.userListShow = false;
      };
      const open2 = () => {
        formatAppLog("log", "at components/userList/userList.vue:92", 222211);
      };
      expose({ handleUserList });
      return (_ctx, _cache) => {
        const _component_u_index_anchor = resolveEasycom(vue.resolveDynamicComponent("u-index-anchor"), __easycom_1$3);
        const _component_u_index_item = resolveEasycom(vue.resolveDynamicComponent("u-index-item"), __easycom_2$2);
        const _component_u_index_list = resolveEasycom(vue.resolveDynamicComponent("u-index-list"), __easycom_3$1);
        const _component_u_popup = resolveEasycom(vue.resolveDynamicComponent("u-popup"), __easycom_1$4);
        return vue.openBlock(), vue.createBlock(_component_u_popup, {
          show: state.userListShow,
          onClose: _cache[0] || (_cache[0] = ($event) => state.userListShow = false),
          onOpen: open2
        }, {
          default: vue.withCtx(() => [
            vue.createCommentVNode(` <view class="custom-navbar" style="border-bottom: 1rpx solid #E5E5E5;padding:24rpx 0 32rpx; text-align: center;">\r
				<view class = 'title'></view>\r
				\r
			</view>\r
			<view class="userListTop"></view> `),
            vue.withDirectives(vue.createElementVNode(
              "view",
              {
                class: "userList",
                id: "userList"
              },
              [
                vue.createElementVNode("view", { class: "userListTop" }),
                vue.createVNode(_component_u_index_list, {
                  "index-list": state.indexList,
                  customNavHeight: 200
                }, {
                  default: vue.withCtx(() => [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(state.itemArr, (item, index2) => {
                        return vue.openBlock(), vue.createBlock(
                          _component_u_index_item,
                          null,
                          {
                            default: vue.withCtx(() => [
                              vue.createVNode(_component_u_index_anchor, {
                                text: state.indexList[index2]
                              }, null, 8, ["text"]),
                              (vue.openBlock(true), vue.createElementBlock(
                                vue.Fragment,
                                null,
                                vue.renderList(item, (cell, index3) => {
                                  return vue.openBlock(), vue.createElementBlock("view", {
                                    class: "list-cell",
                                    onClick: ($event) => handleUser()
                                  }, vue.toDisplayString(cell), 9, ["onClick"]);
                                }),
                                256
                                /* UNKEYED_FRAGMENT */
                              ))
                            ]),
                            _: 2
                            /* DYNAMIC */
                          },
                          1024
                          /* DYNAMIC_SLOTS */
                        );
                      }),
                      256
                      /* UNKEYED_FRAGMENT */
                    ))
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["index-list"])
              ],
              512
              /* NEED_PATCH */
            ), [
              [vue.vShow, state.userListShow]
            ])
          ]),
          _: 1
          /* STABLE */
        }, 8, ["show"]);
      };
    }
  };
  const __easycom_7 = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["__scopeId", "data-v-c37ecce9"], ["__file", "D:/projects/work/applet/vue3_uview_plus/components/userList/userList.vue"]]);
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  var dayjs_minExports = {};
  var dayjs_min = {
    get exports() {
      return dayjs_minExports;
    },
    set exports(v2) {
      dayjs_minExports = v2;
    }
  };
  (function(module, exports) {
    !function(t2, e2) {
      module.exports = e2();
    }(commonjsGlobal, function() {
      var t2 = 1e3, e2 = 6e4, n2 = 36e5, r2 = "millisecond", i2 = "second", s2 = "minute", u2 = "hour", a2 = "day", o2 = "week", c2 = "month", f2 = "quarter", h2 = "year", d2 = "date", l2 = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y2 = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M2 = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t3) {
        var e3 = ["th", "st", "nd", "rd"], n3 = t3 % 100;
        return "[" + t3 + (e3[(n3 - 20) % 10] || e3[n3] || e3[0]) + "]";
      } }, m2 = function(t3, e3, n3) {
        var r3 = String(t3);
        return !r3 || r3.length >= e3 ? t3 : "" + Array(e3 + 1 - r3.length).join(n3) + t3;
      }, v2 = { s: m2, z: function(t3) {
        var e3 = -t3.utcOffset(), n3 = Math.abs(e3), r3 = Math.floor(n3 / 60), i3 = n3 % 60;
        return (e3 <= 0 ? "+" : "-") + m2(r3, 2, "0") + ":" + m2(i3, 2, "0");
      }, m: function t3(e3, n3) {
        if (e3.date() < n3.date())
          return -t3(n3, e3);
        var r3 = 12 * (n3.year() - e3.year()) + (n3.month() - e3.month()), i3 = e3.clone().add(r3, c2), s3 = n3 - i3 < 0, u3 = e3.clone().add(r3 + (s3 ? -1 : 1), c2);
        return +(-(r3 + (n3 - i3) / (s3 ? i3 - u3 : u3 - i3)) || 0);
      }, a: function(t3) {
        return t3 < 0 ? Math.ceil(t3) || 0 : Math.floor(t3);
      }, p: function(t3) {
        return { M: c2, y: h2, w: o2, d: a2, D: d2, h: u2, m: s2, s: i2, ms: r2, Q: f2 }[t3] || String(t3 || "").toLowerCase().replace(/s$/, "");
      }, u: function(t3) {
        return void 0 === t3;
      } }, g2 = "en", D2 = {};
      D2[g2] = M2;
      var p2 = "$isDayjsObject", S2 = function(t3) {
        return t3 instanceof _2 || !(!t3 || !t3[p2]);
      }, w2 = function t3(e3, n3, r3) {
        var i3;
        if (!e3)
          return g2;
        if ("string" == typeof e3) {
          var s3 = e3.toLowerCase();
          D2[s3] && (i3 = s3), n3 && (D2[s3] = n3, i3 = s3);
          var u3 = e3.split("-");
          if (!i3 && u3.length > 1)
            return t3(u3[0]);
        } else {
          var a3 = e3.name;
          D2[a3] = e3, i3 = a3;
        }
        return !r3 && i3 && (g2 = i3), i3 || !r3 && g2;
      }, O2 = function(t3, e3) {
        if (S2(t3))
          return t3.clone();
        var n3 = "object" == typeof e3 ? e3 : {};
        return n3.date = t3, n3.args = arguments, new _2(n3);
      }, b2 = v2;
      b2.l = w2, b2.i = S2, b2.w = function(t3, e3) {
        return O2(t3, { locale: e3.$L, utc: e3.$u, x: e3.$x, $offset: e3.$offset });
      };
      var _2 = function() {
        function M3(t3) {
          this.$L = w2(t3.locale, null, true), this.parse(t3), this.$x = this.$x || t3.x || {}, this[p2] = true;
        }
        var m3 = M3.prototype;
        return m3.parse = function(t3) {
          this.$d = function(t4) {
            var e3 = t4.date, n3 = t4.utc;
            if (null === e3)
              return /* @__PURE__ */ new Date(NaN);
            if (b2.u(e3))
              return /* @__PURE__ */ new Date();
            if (e3 instanceof Date)
              return new Date(e3);
            if ("string" == typeof e3 && !/Z$/i.test(e3)) {
              var r3 = e3.match($);
              if (r3) {
                var i3 = r3[2] - 1 || 0, s3 = (r3[7] || "0").substring(0, 3);
                return n3 ? new Date(Date.UTC(r3[1], i3, r3[3] || 1, r3[4] || 0, r3[5] || 0, r3[6] || 0, s3)) : new Date(r3[1], i3, r3[3] || 1, r3[4] || 0, r3[5] || 0, r3[6] || 0, s3);
              }
            }
            return new Date(e3);
          }(t3), this.init();
        }, m3.init = function() {
          var t3 = this.$d;
          this.$y = t3.getFullYear(), this.$M = t3.getMonth(), this.$D = t3.getDate(), this.$W = t3.getDay(), this.$H = t3.getHours(), this.$m = t3.getMinutes(), this.$s = t3.getSeconds(), this.$ms = t3.getMilliseconds();
        }, m3.$utils = function() {
          return b2;
        }, m3.isValid = function() {
          return !(this.$d.toString() === l2);
        }, m3.isSame = function(t3, e3) {
          var n3 = O2(t3);
          return this.startOf(e3) <= n3 && n3 <= this.endOf(e3);
        }, m3.isAfter = function(t3, e3) {
          return O2(t3) < this.startOf(e3);
        }, m3.isBefore = function(t3, e3) {
          return this.endOf(e3) < O2(t3);
        }, m3.$g = function(t3, e3, n3) {
          return b2.u(t3) ? this[e3] : this.set(n3, t3);
        }, m3.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, m3.valueOf = function() {
          return this.$d.getTime();
        }, m3.startOf = function(t3, e3) {
          var n3 = this, r3 = !!b2.u(e3) || e3, f3 = b2.p(t3), l3 = function(t4, e4) {
            var i3 = b2.w(n3.$u ? Date.UTC(n3.$y, e4, t4) : new Date(n3.$y, e4, t4), n3);
            return r3 ? i3 : i3.endOf(a2);
          }, $2 = function(t4, e4) {
            return b2.w(n3.toDate()[t4].apply(n3.toDate("s"), (r3 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e4)), n3);
          }, y3 = this.$W, M4 = this.$M, m4 = this.$D, v3 = "set" + (this.$u ? "UTC" : "");
          switch (f3) {
            case h2:
              return r3 ? l3(1, 0) : l3(31, 11);
            case c2:
              return r3 ? l3(1, M4) : l3(0, M4 + 1);
            case o2:
              var g3 = this.$locale().weekStart || 0, D3 = (y3 < g3 ? y3 + 7 : y3) - g3;
              return l3(r3 ? m4 - D3 : m4 + (6 - D3), M4);
            case a2:
            case d2:
              return $2(v3 + "Hours", 0);
            case u2:
              return $2(v3 + "Minutes", 1);
            case s2:
              return $2(v3 + "Seconds", 2);
            case i2:
              return $2(v3 + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, m3.endOf = function(t3) {
          return this.startOf(t3, false);
        }, m3.$set = function(t3, e3) {
          var n3, o3 = b2.p(t3), f3 = "set" + (this.$u ? "UTC" : ""), l3 = (n3 = {}, n3[a2] = f3 + "Date", n3[d2] = f3 + "Date", n3[c2] = f3 + "Month", n3[h2] = f3 + "FullYear", n3[u2] = f3 + "Hours", n3[s2] = f3 + "Minutes", n3[i2] = f3 + "Seconds", n3[r2] = f3 + "Milliseconds", n3)[o3], $2 = o3 === a2 ? this.$D + (e3 - this.$W) : e3;
          if (o3 === c2 || o3 === h2) {
            var y3 = this.clone().set(d2, 1);
            y3.$d[l3]($2), y3.init(), this.$d = y3.set(d2, Math.min(this.$D, y3.daysInMonth())).$d;
          } else
            l3 && this.$d[l3]($2);
          return this.init(), this;
        }, m3.set = function(t3, e3) {
          return this.clone().$set(t3, e3);
        }, m3.get = function(t3) {
          return this[b2.p(t3)]();
        }, m3.add = function(r3, f3) {
          var d3, l3 = this;
          r3 = Number(r3);
          var $2 = b2.p(f3), y3 = function(t3) {
            var e3 = O2(l3);
            return b2.w(e3.date(e3.date() + Math.round(t3 * r3)), l3);
          };
          if ($2 === c2)
            return this.set(c2, this.$M + r3);
          if ($2 === h2)
            return this.set(h2, this.$y + r3);
          if ($2 === a2)
            return y3(1);
          if ($2 === o2)
            return y3(7);
          var M4 = (d3 = {}, d3[s2] = e2, d3[u2] = n2, d3[i2] = t2, d3)[$2] || 1, m4 = this.$d.getTime() + r3 * M4;
          return b2.w(m4, this);
        }, m3.subtract = function(t3, e3) {
          return this.add(-1 * t3, e3);
        }, m3.format = function(t3) {
          var e3 = this, n3 = this.$locale();
          if (!this.isValid())
            return n3.invalidDate || l2;
          var r3 = t3 || "YYYY-MM-DDTHH:mm:ssZ", i3 = b2.z(this), s3 = this.$H, u3 = this.$m, a3 = this.$M, o3 = n3.weekdays, c3 = n3.months, f3 = n3.meridiem, h3 = function(t4, n4, i4, s4) {
            return t4 && (t4[n4] || t4(e3, r3)) || i4[n4].slice(0, s4);
          }, d3 = function(t4) {
            return b2.s(s3 % 12 || 12, t4, "0");
          }, $2 = f3 || function(t4, e4, n4) {
            var r4 = t4 < 12 ? "AM" : "PM";
            return n4 ? r4.toLowerCase() : r4;
          };
          return r3.replace(y2, function(t4, r4) {
            return r4 || function(t5) {
              switch (t5) {
                case "YY":
                  return String(e3.$y).slice(-2);
                case "YYYY":
                  return b2.s(e3.$y, 4, "0");
                case "M":
                  return a3 + 1;
                case "MM":
                  return b2.s(a3 + 1, 2, "0");
                case "MMM":
                  return h3(n3.monthsShort, a3, c3, 3);
                case "MMMM":
                  return h3(c3, a3);
                case "D":
                  return e3.$D;
                case "DD":
                  return b2.s(e3.$D, 2, "0");
                case "d":
                  return String(e3.$W);
                case "dd":
                  return h3(n3.weekdaysMin, e3.$W, o3, 2);
                case "ddd":
                  return h3(n3.weekdaysShort, e3.$W, o3, 3);
                case "dddd":
                  return o3[e3.$W];
                case "H":
                  return String(s3);
                case "HH":
                  return b2.s(s3, 2, "0");
                case "h":
                  return d3(1);
                case "hh":
                  return d3(2);
                case "a":
                  return $2(s3, u3, true);
                case "A":
                  return $2(s3, u3, false);
                case "m":
                  return String(u3);
                case "mm":
                  return b2.s(u3, 2, "0");
                case "s":
                  return String(e3.$s);
                case "ss":
                  return b2.s(e3.$s, 2, "0");
                case "SSS":
                  return b2.s(e3.$ms, 3, "0");
                case "Z":
                  return i3;
              }
              return null;
            }(t4) || i3.replace(":", "");
          });
        }, m3.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, m3.diff = function(r3, d3, l3) {
          var $2, y3 = this, M4 = b2.p(d3), m4 = O2(r3), v3 = (m4.utcOffset() - this.utcOffset()) * e2, g3 = this - m4, D3 = function() {
            return b2.m(y3, m4);
          };
          switch (M4) {
            case h2:
              $2 = D3() / 12;
              break;
            case c2:
              $2 = D3();
              break;
            case f2:
              $2 = D3() / 3;
              break;
            case o2:
              $2 = (g3 - v3) / 6048e5;
              break;
            case a2:
              $2 = (g3 - v3) / 864e5;
              break;
            case u2:
              $2 = g3 / n2;
              break;
            case s2:
              $2 = g3 / e2;
              break;
            case i2:
              $2 = g3 / t2;
              break;
            default:
              $2 = g3;
          }
          return l3 ? $2 : b2.a($2);
        }, m3.daysInMonth = function() {
          return this.endOf(c2).$D;
        }, m3.$locale = function() {
          return D2[this.$L];
        }, m3.locale = function(t3, e3) {
          if (!t3)
            return this.$L;
          var n3 = this.clone(), r3 = w2(t3, e3, true);
          return r3 && (n3.$L = r3), n3;
        }, m3.clone = function() {
          return b2.w(this.$d, this);
        }, m3.toDate = function() {
          return new Date(this.valueOf());
        }, m3.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, m3.toISOString = function() {
          return this.$d.toISOString();
        }, m3.toString = function() {
          return this.$d.toUTCString();
        }, M3;
      }(), k2 = _2.prototype;
      return O2.prototype = k2, [["$ms", r2], ["$s", i2], ["$m", s2], ["$H", u2], ["$W", a2], ["$M", c2], ["$y", h2], ["$D", d2]].forEach(function(t3) {
        k2[t3[1]] = function(e3) {
          return this.$g(e3, t3[0], t3[1]);
        };
      }), O2.extend = function(t3, e3) {
        return t3.$i || (t3(e3, _2, O2), t3.$i = true), O2;
      }, O2.locale = w2, O2.isDayjs = S2, O2.unix = function(t3) {
        return O2(1e3 * t3);
      }, O2.en = D2[g2], O2.Ls = D2, O2.p = {}, O2;
    });
  })(dayjs_min);
  const dayjs = dayjs_minExports;
  const _sfc_main$B = {
    __name: "taskHideUp",
    setup(__props) {
      const mainHideUpList = [
        { id: 1, title: "隐患编号", key: "", type: "text" },
        { id: 2, title: "受检单位(责任单位)", key: "", type: "text" },
        { id: 3, title: "检查活动名称(检查内容)", key: "", type: "text" },
        { id: 4, title: "隐患地点", key: "", type: "input" },
        { id: 5, title: "隐患描述", key: "", type: "input" },
        { id: 6, title: "隐患照片", key: "", type: "photo" },
        { id: 7, title: "整改要求", key: "", type: "input" },
        { id: 8, title: "规定时间(整改截止事件)", key: "", type: "time", name: "correctEnd" },
        { id: 9, title: "隐患类型", key: "", type: "picker", name: "hideType" },
        { id: 10, title: "隐患等级", key: "", type: "picker", name: "hideLevel" },
        { id: 11, title: "整改责任人", key: "", type: "user", name: "" }
      ];
      const userListCom = vue.ref();
      useIndexStore();
      const state = vue.reactive({
        photoSrc: "/static/icon/camera.png",
        datetimeShowr: false,
        datetimeVal: Date.now(),
        correctEndShow: false,
        correctEndVal: Date.now(),
        hideTypeShow: false,
        hideTypeVal: "请选择隐患类型",
        hideTypeColumns: [
          ["中国", "美国", "日本"]
        ],
        hideLevelShow: false,
        hideLevelVal: "请选择隐患等级",
        hideLevelColumns: [
          ["深圳", "厦门", "上海", "拉萨"]
        ],
        selectUser: "请选择责任人"
      });
      const getPhoto = () => {
        uni.chooseImage({
          count: 1,
          // 最多选择一张图片
          sourceType: ["album", "camera"],
          // 只允许从相机选择  'album'相册
          success: (res) => {
            const tempFilePaths = res.tempFilePaths;
            formatAppLog("log", "at pages/taskHideUp/taskHideUp.vue:122", tempFilePaths);
            state.photoSrc = tempFilePaths[0];
          }
        });
      };
      const handlePicker = (e2, obj) => {
        state[`${obj.name}show`] = false;
        state[`${obj.name}Val`] = e2.value[0];
      };
      const handleUserList = () => {
        formatAppLog("log", "at pages/taskHideUp/taskHideUp.vue:140", userListCom);
        formatAppLog("log", "at pages/taskHideUp/taskHideUp.vue:141", 444444444);
        uni.$u.route({
          url: "/pages/comUserList/comUserList",
          animationDuration: 300,
          animationType: "slide-in-bottom"
        });
      };
      const handleSubmit = () => {
        formatAppLog("log", "at pages/taskHideUp/taskHideUp.vue:155", 11111);
      };
      onShow(() => {
        uni.$once("selectStaff", function(data) {
          formatAppLog("log", "at pages/taskHideUp/taskHideUp.vue:169", "监听到事件来自返回的参数：" + data);
          state.selectUser = data;
        });
      });
      return (_ctx, _cache) => {
        const _component_u_datetime_picker = resolveEasycom(vue.resolveDynamicComponent("u-datetime-picker"), __easycom_5);
        const _component_u_picker = resolveEasycom(vue.resolveDynamicComponent("u-picker"), __easycom_6);
        const _component_u_button = resolveEasycom(vue.resolveDynamicComponent("u-button"), __easycom_0$a);
        const _component_userList = resolveEasycom(vue.resolveDynamicComponent("userList"), __easycom_7);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode("view", { class: "taskHideUp" }, [
              (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(mainHideUpList, (item) => {
                  return vue.createElementVNode("view", { class: "taskHideUpItem" }, [
                    vue.createElementVNode(
                      "view",
                      { class: "taskHideUpItemT" },
                      vue.toDisplayString(item.title),
                      1
                      /* TEXT */
                    ),
                    vue.createCommentVNode(" 文字 "),
                    item.type == "text" ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "taskHideUpItemV"
                    }, "是方式方法")) : vue.createCommentVNode("v-if", true),
                    vue.createCommentVNode(" 输入框 "),
                    item.type == "input" ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 1,
                      class: "taskHideUpItemV"
                    }, [
                      vue.createElementVNode("input", {
                        type: "text",
                        placeholder: `请填写${item.title}`
                      }, null, 8, ["placeholder"])
                    ])) : vue.createCommentVNode("v-if", true),
                    vue.createCommentVNode(" 照相 "),
                    item.type == "photo" ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 2,
                      class: "taskHideUpItemV",
                      onClick: _cache[0] || (_cache[0] = ($event) => getPhoto())
                    }, [
                      vue.createCommentVNode(" <view>撒打发士大夫</view> "),
                      vue.createCommentVNode(` <img class = 'taskHideUpItemVImg' src="/static/icon/camera.png" alt=""> `),
                      state.photoSrc ? (vue.openBlock(), vue.createElementBlock("img", {
                        key: 0,
                        class: "taskHideUpItemVImg",
                        src: state.photoSrc,
                        alt: ""
                      }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true)
                    ])) : vue.createCommentVNode("v-if", true),
                    vue.createCommentVNode(" 时间选择器 "),
                    item.type == "time" ? (vue.openBlock(), vue.createElementBlock(
                      "view",
                      {
                        key: 3,
                        class: "taskHideUpItemV",
                        onTouchmove: _cache[6] || (_cache[6] = vue.withModifiers(() => {
                        }, ["stop", "prevent"]))
                      },
                      [
                        vue.createVNode(_component_u_datetime_picker, {
                          show: state.datetimeShowr,
                          modelValue: state.datetimeVal,
                          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => state.datetimeVal = $event),
                          mode: "datetime",
                          closeOnClickOverlay: true,
                          onClose: _cache[2] || (_cache[2] = ($event) => state.datetimeShowr = false),
                          onCancel: _cache[3] || (_cache[3] = ($event) => state.datetimeShowr = false),
                          onConfirm: _cache[4] || (_cache[4] = ($event) => state.datetimeShowr = false)
                        }, null, 8, ["show", "modelValue"]),
                        vue.createElementVNode(
                          "view",
                          {
                            class: "taskHideUpItemTip",
                            onClick: _cache[5] || (_cache[5] = ($event) => state.datetimeShowr = true)
                          },
                          vue.toDisplayString(vue.unref(dayjs)(state.datetimeVal).format("YYYY-MM-DD HH:mm:ss")),
                          1
                          /* TEXT */
                        )
                      ],
                      32
                      /* HYDRATE_EVENTS */
                    )) : vue.createCommentVNode("v-if", true),
                    vue.createCommentVNode(" 选择器 "),
                    item.type == "picker" ? (vue.openBlock(), vue.createElementBlock(
                      "view",
                      {
                        key: 4,
                        class: "taskHideUpItemV",
                        onTouchmove: _cache[7] || (_cache[7] = vue.withModifiers(() => {
                        }, ["stop", "prevent"]))
                      },
                      [
                        vue.createVNode(_component_u_picker, {
                          show: state[`${item.name}show`],
                          columns: state[`${item.name}Columns`],
                          closeOnClickOverlay: true,
                          onClose: ($event) => state[`${item.name}show`] = false,
                          onCancel: ($event) => state[`${item.name}show`] = false,
                          onConfirm: ($event) => handlePicker($event, item)
                        }, null, 8, ["show", "columns", "onClose", "onCancel", "onConfirm"]),
                        vue.createElementVNode("view", {
                          class: "taskHideUpItemTip",
                          onClick: ($event) => state[`${item.name}show`] = true
                        }, vue.toDisplayString(state[`${item.name}Val`]), 9, ["onClick"])
                      ],
                      32
                      /* HYDRATE_EVENTS */
                    )) : vue.createCommentVNode("v-if", true),
                    vue.createCommentVNode(" 打开用户列表 "),
                    item.type == "user" ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 5,
                      class: "taskHideUpItemV",
                      onClick: _cache[8] || (_cache[8] = ($event) => handleUserList())
                    }, [
                      vue.createElementVNode(
                        "view",
                        { class: "taskHideUpItemTip" },
                        vue.toDisplayString(state.selectUser || ""),
                        1
                        /* TEXT */
                      )
                    ])) : vue.createCommentVNode("v-if", true)
                  ]);
                }),
                64
                /* STABLE_FRAGMENT */
              ))
            ]),
            vue.createElementVNode("view", {
              class: "taskHideBtn",
              onClick: _cache[9] || (_cache[9] = ($event) => handleSubmit())
            }, [
              vue.createVNode(_component_u_button, {
                type: "primary",
                shape: "circle",
                ripple: true,
                size: "medium "
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("提交")
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            vue.createVNode(
              _component_userList,
              {
                ref_key: "userListCom",
                ref: userListCom
              },
              null,
              512
              /* NEED_PATCH */
            )
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const PagesTaskHideUpTaskHideUp = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/taskHideUp/taskHideUp.vue"]]);
  const _sfc_main$A = {
    __name: "taskTrainPlan",
    setup(__props) {
      useIndexStore();
      const state = vue.reactive({
        // taskType: 1,
        planSearch: "",
        planInfo: [],
        planShowInfo: []
      });
      const planItemConfig = [
        { name: "培训时间", key: "time" },
        { name: "计划类型", key: "planType" },
        { name: "培训方式", key: "fieldStr" },
        { name: "培训类型", key: "field1Str" },
        { name: "发起部门", key: "sysDeptName" },
        { name: "授课人", key: "field3" },
        { name: "培训进度", key: "status" }
      ];
      const getPlanInfo = async () => {
        let params = {
          page: 1,
          size: 100,
          // name:state.traninSearch
          name: ""
        };
        const interPlanInfo = await requestTaskPlanInfo(params).then((r2) => r2).catch((e2) => {
        });
        if (!interPlanInfo.data || !interPlanInfo.data.t) {
          return;
        }
        let content = interPlanInfo.data.t.content || [];
        state.planInfo = content.map((item) => {
          let startTArr = formatDate(item.startTime);
          let startTStr = `${startTArr[0]}-${startTArr[1]} ${startTArr[3]}`;
          let endTArr = formatDate(item.startTime);
          let endTStr = `${endTArr[0]}-${endTArr[1]} ${endTArr[3]}`;
          item.time = `${startTStr}~${endTStr}`;
          return item;
        });
        state.planShowInfo = state.planInfo;
      };
      getPlanInfo();
      const trainChange = (e2) => {
        formatAppLog("log", "at pages/taskTrainPlan/taskTrainPlan.vue:86", "planSearch", state.planSearch);
        state.planShowInfo = state.planInfo.filter((item) => item.name.includes(state.planSearch));
      };
      const openPlanContent = async (obj) => {
        formatAppLog("log", "at pages/taskTrainPlan/taskTrainPlan.vue:91", obj);
        if (!obj.id)
          return;
        obj.from = "taskPlan";
        obj.title = "培训文件";
        obj.interface = "requestPlanPaperInfo";
        uni.$u.route({
          url: "/pages/comDocLearn/comDocLearn",
          params: {
            config: JSON.stringify(obj)
          }
        });
      };
      return (_ctx, _cache) => {
        const _component_u_input = resolveEasycom(vue.resolveDynamicComponent("u-input"), __easycom_1$6);
        return vue.openBlock(), vue.createElementBlock("view", { class: "taskTranin" }, [
          vue.createElementVNode("view", { class: "taskTraninTop" }, [
            vue.createVNode(_component_u_input, {
              modelValue: state.planSearch,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => state.planSearch = $event),
              type: "text",
              border: "true",
              placeholder: "请输入关键词搜索",
              "custom-style": "background: #F2F3F8",
              onChange: trainChange
            }, null, 8, ["modelValue"])
          ]),
          vue.createElementVNode("view", { class: "taskTrainList" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(state.planShowInfo, (item) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "taskTrainItem",
                  onClick: ($event) => openPlanContent(item)
                }, [
                  vue.createElementVNode("view", { class: "taskTrainItemTitle" }, [
                    vue.createElementVNode("img", {
                      class: "taskTrainItemTitleImg",
                      src: "/static/icon/file.png",
                      alt: ""
                    }),
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString(item.name),
                      1
                      /* TEXT */
                    )
                  ]),
                  (vue.openBlock(), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(planItemConfig, (lineItem) => {
                      return vue.createElementVNode("view", { class: "taskTrainItemLine box_ellipsis" }, [
                        vue.createElementVNode(
                          "view",
                          { class: "taskTrainItemLineL" },
                          vue.toDisplayString(lineItem.name) + ":",
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "view",
                          null,
                          vue.toDisplayString(item[lineItem.key]),
                          1
                          /* TEXT */
                        )
                      ]);
                    }),
                    64
                    /* STABLE_FRAGMENT */
                  ))
                ], 8, ["onClick"]);
              }),
              256
              /* UNKEYED_FRAGMENT */
            ))
          ])
        ]);
      };
    }
  };
  const PagesTaskTrainPlanTaskTrainPlan = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/taskTrainPlan/taskTrainPlan.vue"]]);
  const _sfc_main$z = {
    __name: "taskRespkp",
    setup(__props) {
      useIndexStore();
      const state = vue.reactive({
        // taskType: 1,
        respkpSearch: ""
      });
      const respkpChange = (e2) => {
        formatAppLog("log", "at pages/taskRespkp/taskRespkp.vue:30", e2);
        formatAppLog("log", "at pages/taskRespkp/taskRespkp.vue:31", state.traninSearch);
      };
      return (_ctx, _cache) => {
        const _component_u_input = resolveEasycom(vue.resolveDynamicComponent("u-input"), __easycom_1$6);
        return vue.openBlock(), vue.createElementBlock("view", { class: "taskRespkp" }, [
          vue.createElementVNode("view", { class: "taskRespkpTop" }, [
            vue.createVNode(_component_u_input, {
              modelValue: state.respkpSearch,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => state.respkpSearch = $event),
              type: "text",
              border: "true",
              placeholder: "请输入关键字搜索",
              "custom-style": "background: #F2F3F8",
              onChange: respkpChange
            }, null, 8, ["modelValue"])
          ])
        ]);
      };
    }
  };
  const PagesTaskRespkpTaskRespkp = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/taskRespkp/taskRespkp.vue"]]);
  const _sfc_main$y = {
    __name: "taskCulture",
    props: {
      config: ""
    },
    setup(__props) {
      const props2 = __props;
      props2.config ? JSON.parse(props2.config) : {};
      useIndexStore();
      const state = vue.reactive({
        mainCultrues: [],
        fileShow: false,
        culFileUrl: ""
      });
      const getInterInfo = async (navInfo) => {
        formatAppLog("log", "at pages/taskCulture/taskCulture.vue:44", navInfo);
        let beginTimeN = (/* @__PURE__ */ new Date()).getTime() - 7 * 24 * 60 * 60 * 1e3;
        let beginArr = formatDate(beginTimeN);
        let endArr = formatDate();
        let params = {
          page: 1,
          rows: 100,
          size: 100,
          endTime: `${endArr[0]}-${endArr[1]}`,
          beginTime: `${beginArr[0]}-${beginArr[1]}`
        };
        let interInfo = interInfo = await requestSaftCulInfo(params).then((r2) => r2).catch((e2) => {
        });
        if (!interInfo.data || !interInfo.data.t) {
          return;
        }
        state.mainCultrues = interInfo.data.t.content || [];
        formatAppLog("log", "at pages/taskCulture/taskCulture.vue:64", state.mainCultrues);
      };
      const handleCulture = (obj) => {
        formatAppLog("log", "at pages/taskCulture/taskCulture.vue:70", obj);
        formatAppLog("log", "at pages/taskCulture/taskCulture.vue:71", `${BASE_LINE_PRE}${BASE_FILE_URL}${obj.file1}`);
        state.culFileUrl = `${BASE_LINE_PRE}${BASE_FILE_URL}${obj.file1}`;
        state.fileShow = true;
      };
      onShow(() => {
        getInterInfo();
        state.fileShow = false;
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "taskCulture" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(state.mainCultrues, (item) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "taskCulItem",
                onClick: ($event) => handleCulture(item)
              }, [
                vue.createElementVNode("view", { class: "taskCulItemRow" }, [
                  vue.createElementVNode("view", null, "发布单位："),
                  vue.createElementVNode(
                    "view",
                    null,
                    vue.toDisplayString(item.dept1 || ""),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "taskCulItemRow" }, [
                  vue.createElementVNode("view", null, "发布时间："),
                  vue.createElementVNode(
                    "view",
                    null,
                    vue.toDisplayString(item.atTime || ""),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode(
                  "view",
                  { class: "taskCulItemStatus" },
                  vue.toDisplayString(item.read == "是" ? "已读" : "未读"),
                  1
                  /* TEXT */
                )
              ], 8, ["onClick"]);
            }),
            256
            /* UNKEYED_FRAGMENT */
          )),
          state.fileShow ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "comDocShow"
          }, [
            vue.createElementVNode("web-view", {
              ref: "fileShowWeb",
              src: state.culFileUrl
            }, null, 8, ["src"])
          ])) : vue.createCommentVNode("v-if", true)
        ]);
      };
    }
  };
  const PagesTaskCultureTaskCulture = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/taskCulture/taskCulture.vue"]]);
  const _sfc_main$x = {
    __name: "taskDanCheck",
    setup(__props) {
      useIndexStore();
      const state = vue.reactive({
        checkStatus: 1,
        checkInfo: [],
        checkShowInfo: [],
        showChildId: -1
      });
      const checkDomList = [
        { id: 1, title: "检查内容", key: "content", type: "text", ref: "task_check_content" },
        { id: 2, title: "检查标准", key: "norm", type: "text", ref: "task_check_norm" },
        { id: 3, title: "是否存在问题", key: "danger", type: "radio", ref: "task_check_danger", val: "否", options: ["是", "否"] },
        { id: 4, title: "责任单位", key: "deptId", type: "branch", ref: "task_check_deptId", show: { ref: "task_check_danger", val: "是" } },
        { id: 5, title: "隐患描述", key: "remark", type: "input", ref: "task_check_remark", show: { ref: "task_check_danger", val: "是" } },
        { id: 6, title: "隐患照片", key: "imgs", type: "photo", ref: "task_check_imgs", show: { ref: "task_check_danger", val: "是" } },
        { id: 7, title: "整改要求", key: "request", type: "input", ref: "task_check_request", show: { ref: "task_check_danger", val: "是" } }
      ];
      let checkDownDomList = [
        { id: 1, title: "检查内容", key: "checkItemContent", type: "text", ref: "task_check_checkItemContent" },
        { id: 2, title: "检查标准", key: "checkItemNorm", type: "text", ref: "task_check_norm" },
        { id: 3, title: "检查信息", key: "checkInfo", type: "text", ref: "task_check_checkInfo" },
        { id: 4, title: "责任单位", key: "dangerDeptName", type: "text", ref: "task_check_dept" },
        { id: 5, title: "隐患描述", key: "dangerRemark", type: "text", ref: "task_check_dangerRemark" },
        { id: 6, title: "隐患照片", key: "dangerImgs", type: "picture", ref: "task_check_dangerImgs" },
        { id: 7, title: "整改要求", key: "dangerRequest", type: "text", ref: "task_check_dangerRequest" }
      ];
      const getCheckInfo = async () => {
        const interCheckInfo = await requestTaskCheckInfo().then((r2) => r2).catch((e2) => {
        });
        formatAppLog("log", "at pages/taskDanCheck/taskDanCheck.vue:95", interCheckInfo);
        if (!interCheckInfo.data || !interCheckInfo.data.t) {
          return;
        }
        state.checkInfo = interCheckInfo.data.t;
        handleDanCheck(1);
      };
      const handleDanCheck = (id) => {
        formatAppLog("log", "at pages/taskDanCheck/taskDanCheck.vue:109", id);
        state.checkStatus = id;
        let statuss = ["未完成", "已完成"];
        state.checkShowInfo = state.checkInfo.filter((item) => item.status == statuss[id - 1]);
        state.showChildId = -1;
      };
      let notDownChecks = [];
      const handleCheckItem = async (obj, taskId, index2, isAdd) => {
        formatAppLog("log", "at pages/taskDanCheck/taskDanCheck.vue:119", obj);
        if (obj.items) {
          notDownChecks = obj.items.filter((item) => item.status == "未完成");
          if (notDownChecks.length == 0) {
            state.showChildId = state.showChildId == index2 ? -1 : index2;
            return;
          }
          obj = notDownChecks.shift();
        } else {
          notDownChecks = [];
        }
        if (!obj)
          return;
        formatAppLog("log", "at pages/taskDanCheck/taskDanCheck.vue:133", obj);
        const formConfig = {};
        if (obj.status == "已完成" && !isAdd) {
          let objIntemInfoInter = await requestTaskCheckById({ taskId, checkItemId: obj.checkItemId }).then((r2) => r2).catch((e2) => {
          });
          if (!objIntemInfoInter.data || !objIntemInfoInter.data.t || !objIntemInfoInter.data.t.length) {
            return;
          }
          let objIntemInfo = objIntemInfoInter.data.t[0];
          let domListLength = objIntemInfo.danger == "否" ? 3 : checkDownDomList.length;
          formConfig.domList = checkDownDomList.filter((item) => item.id <= domListLength).map((item) => {
            if (objIntemInfo[item.key] && !item.val) {
              item.val = objIntemInfo[item.key];
            }
            if (item.id == 3) {
              item.val = `${objIntemInfo.checkUserName},${objIntemInfo.checkTime}`;
            }
            return item;
          });
          formConfig.config = {
            from: "task_check_item"
          };
        } else {
          notDownChecks = notDownChecks.map((info) => {
            let noCheckObj = {};
            noCheckObj.domList = checkDomList.map((item) => {
              if (info[item.key] && !item.val) {
                item.val = info[item.key];
              }
              return item;
            });
            noCheckObj.config = {
              submitFn: "requestTaskCheckSub",
              from: "task_check",
              params: {
                taskId,
                checkItemId: info.checkItemId
              }
            };
            return noCheckObj;
          });
          formConfig.domList = checkDomList.map((item) => {
            if (obj[item.key] && !item.val) {
              item.val = obj[item.key];
              formatAppLog("log", "at pages/taskDanCheck/taskDanCheck.vue:185", item.val);
            }
            return item;
          });
          formConfig.config = {
            submitFn: "requestTaskCheckSub",
            from: "task_check",
            params: {
              taskId,
              checkItemId: obj.checkItemId
            },
            handleOthers: notDownChecks
          };
        }
        formatAppLog("log", "at pages/taskDanCheck/taskDanCheck.vue:200", formConfig);
        uni.$u.route({
          url: "/pages/comForm/comForm",
          params: {
            data: JSON.stringify(formConfig),
            title: "检查"
          }
        });
      };
      const handleAllChecked = (obj) => {
        formatAppLog("log", "at pages/taskDanCheck/taskDanCheck.vue:212", obj);
        let formConfig = {};
        formConfig.domList = [
          { id: 1, title: "检查名称", key: "checkName", type: "text", ref: "task_check_end_checkName", val: obj.checkName },
          { id: 2, title: "拍照", key: "imgs", type: "photo", ref: "task_check_end_imgs" },
          { id: 3, title: "签字", key: "sign", type: "sign", ref: "task_check_end_sign" }
        ];
        formConfig.config = {
          submitFn: "requestTaskEnd",
          from: "task_check_end",
          params: {
            id: obj.taskId
          }
        };
        uni.$u.route({
          url: "/pages/comForm/comForm",
          params: {
            data: JSON.stringify(formConfig),
            title: "完成"
          }
        });
      };
      onShow(() => {
        getCheckInfo();
      });
      return (_ctx, _cache) => {
        const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$b);
        return vue.openBlock(), vue.createElementBlock("view", { class: "taskDanCheck" }, [
          vue.createElementVNode("view", { class: "taskDanCheckNav" }, [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass({ taskDanCheckNavItem: true, CheckNavSe: state.checkStatus == 1 }),
                onClick: _cache[0] || (_cache[0] = ($event) => handleDanCheck(1))
              },
              [
                vue.createTextVNode(" 未完成 "),
                vue.withDirectives(vue.createElementVNode(
                  "view",
                  { class: "CheckNavSeHorn" },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vShow, state.checkStatus == 1]
                ])
              ],
              2
              /* CLASS */
            ),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass({ taskDanCheckNavItem: true, CheckNavSe: state.checkStatus == 2 }),
                onClick: _cache[1] || (_cache[1] = ($event) => handleDanCheck(2))
              },
              [
                vue.createTextVNode(" 已完成 "),
                vue.withDirectives(vue.createElementVNode(
                  "view",
                  { class: "CheckNavSeHorn" },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vShow, state.checkStatus == 2]
                ])
              ],
              2
              /* CLASS */
            )
          ]),
          vue.createElementVNode("view", { class: "taskDanCheckMain" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(state.checkShowInfo, (item, index2) => {
                return vue.openBlock(), vue.createElementBlock("view", { class: "taskDanCheckItem" }, [
                  vue.createElementVNode(
                    "view",
                    { class: "taskCheckItemTime" },
                    vue.toDisplayString(item.startDate) + "~" + vue.toDisplayString(item.endDate),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", { class: "taskCheckItemB" }, [
                    vue.createElementVNode("view", {
                      class: "taskCheckItemBL",
                      onClick: ($event) => handleCheckItem(item, item.taskId, index2)
                    }, [
                      vue.createElementVNode(
                        "view",
                        { class: "taskCheckItemBLTitle" },
                        vue.toDisplayString(item.checkName),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "view",
                        { class: "taskCheckItemBLName" },
                        "检查人：" + vue.toDisplayString(item.checkUserNames),
                        1
                        /* TEXT */
                      ),
                      item.items.every((item2) => item2.status == "已完成") && state.checkStatus == 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "taskCheckItemBtn",
                        onClick: vue.withModifiers(($event) => handleAllChecked(item), ["stop"])
                      }, " 完成 ", 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
                    ], 8, ["onClick"]),
                    vue.createElementVNode("view", {
                      class: "taskCheckItemBR",
                      onClick: ($event) => state.showChildId = state.showChildId == index2 ? -1 : index2
                    }, [
                      vue.createCommentVNode(` <view class="taskCheckItemBLTitle">{{item.status || '未完成'}}</view> `),
                      vue.createElementVNode(
                        "view",
                        { class: "taskCheckItemBLTitle" },
                        vue.toDisplayString(item.items.every((item2) => item2.status == "已完成") ? "已完成" : "未完成"),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode("view", { class: "taskCheckItemBRIcon" }, [
                        vue.createVNode(_component_u_icon, {
                          name: `${state.showChildId == index2 ? "arrow-up" : "arrow-down"}`,
                          color: "#2979ff",
                          size: "12"
                        }, null, 8, ["name"])
                      ])
                    ], 8, ["onClick"])
                  ]),
                  vue.withDirectives(vue.createElementVNode(
                    "view",
                    { class: "taskCheckItemChild" },
                    [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList(item.items, (child) => {
                          return vue.openBlock(), vue.createElementBlock("view", {
                            class: "taskCheckItemChildItem",
                            onClick: ($event) => handleCheckItem(child, item.taskId)
                          }, [
                            vue.createElementVNode("view", { class: "taskCheckItemChildItemT" }, [
                              vue.createElementVNode(
                                "text",
                                null,
                                vue.toDisplayString(child.content),
                                1
                                /* TEXT */
                              ),
                              vue.createElementVNode(
                                "text",
                                { class: "taskCheckItemChildItemTS" },
                                vue.toDisplayString(child.status || "未完成"),
                                1
                                /* TEXT */
                              )
                            ]),
                            vue.createElementVNode(
                              "view",
                              null,
                              vue.toDisplayString(child.norm),
                              1
                              /* TEXT */
                            ),
                            child.status == "已完成" && state.checkStatus == 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                              key: 0,
                              class: "taskCheckItemBtn",
                              onClick: vue.withModifiers(($event) => handleCheckItem(child, item.taskId, 0, true), ["stop"])
                            }, " 增加检查 ", 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
                          ], 8, ["onClick"]);
                        }),
                        256
                        /* UNKEYED_FRAGMENT */
                      ))
                    ],
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vShow, state.showChildId == index2]
                  ])
                ]);
              }),
              256
              /* UNKEYED_FRAGMENT */
            ))
          ])
        ]);
      };
    }
  };
  const PagesTaskDanCheckTaskDanCheck = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/taskDanCheck/taskDanCheck.vue"]]);
  const _sfc_main$w = {
    __name: "taskCollectGood",
    setup(__props) {
      useIndexStore();
      const state = vue.reactive({
        goodInfo: []
      });
      const goodItemName = [
        { id: 1, title: "物品名称", key: "name" },
        { id: 2, title: "数量", key: "qty" },
        { id: 3, title: "发放时间", key: "atTime" },
        { id: 4, title: "购入时间", key: "buyTime" },
        { id: 5, title: "发放人", key: "createdUserName" },
        { id: 6, title: "有效期起", key: "prodTime" },
        { id: 7, title: "有效期止", key: "expTime" }
      ];
      const goodForm = [
        { id: 1, title: "物品名称", key: "name", type: "text", ref: "collect_name" },
        { id: 2, title: "拍照", key: "pic", type: "photo", ref: "collect_pic" },
        { id: 3, title: "签字", key: "sign", type: "sign", ref: "collect_sign" }
      ];
      const getPlanInfo = async () => {
        let beginTimeN = (/* @__PURE__ */ new Date()).getTime() - 7 * 24 * 60 * 60 * 1e3;
        let beginArr = formatDate(beginTimeN);
        let endArr = formatDate();
        let params = {
          page: 1,
          rows: 100,
          size: 100,
          endTime: `${endArr[0]}-${endArr[1]}`,
          beginTime: `${beginArr[0]}-${beginArr[1]}`
        };
        const interGoodInfo = await requestTaskGoodInfo(params).then((r2) => r2).catch((e2) => {
        });
        if (!interGoodInfo.data || !interGoodInfo.data.t) {
          return;
        }
        state.goodInfo = interGoodInfo.data.t.content || [];
      };
      getPlanInfo();
      const goTaskGood = (obj) => {
        formatAppLog("log", "at pages/taskCollectGood/taskCollectGood.vue:81", "goTaskGood", obj);
        const formConfig = {};
        formConfig.domList = goodForm.map((item) => {
          item.val = obj.grant[item.key];
          return item;
        });
        formConfig.config = {
          submitFn: "requestTaskGoodSubmit",
          params: { id: obj.id },
          from: "collectGood"
        };
        formatAppLog("log", "at pages/taskCollectGood/taskCollectGood.vue:92", formConfig);
        uni.$u.route({
          url: "/pages/comForm/comForm",
          params: {
            data: JSON.stringify(formConfig),
            title: "领用"
          }
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "taskGood" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(state.goodInfo, (item) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "taskGoodItem",
                onClick: ($event) => goTaskGood(item)
              }, [
                vue.createElementVNode("view", { class: "taskGoodItemL" }, [
                  vue.createElementVNode("img", {
                    class: "taskGoodItemLImg",
                    src: `${vue.unref(BASE_FILE_URL)}${item.grant.file2}`,
                    alt: ""
                  }, null, 8, ["src"])
                ]),
                vue.createElementVNode("view", { class: "taskGoodItemR" }, [
                  (vue.openBlock(), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(goodItemName, (lineItem) => {
                      return vue.createElementVNode("view", { class: "box_ellipsis" }, [
                        vue.createElementVNode(
                          "text",
                          null,
                          vue.toDisplayString(lineItem.title) + "：",
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "text",
                          null,
                          vue.toDisplayString(item && item.grant[lineItem.key] || ""),
                          1
                          /* TEXT */
                        )
                      ]);
                    }),
                    64
                    /* STABLE_FRAGMENT */
                  ))
                ])
              ], 8, ["onClick"]);
            }),
            256
            /* UNKEYED_FRAGMENT */
          ))
        ]);
      };
    }
  };
  const PagesTaskCollectGoodTaskCollectGood = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/taskCollectGood/taskCollectGood.vue"]]);
  const props$7 = {
    props: {
      // 是否显示圆点
      isDot: {
        type: Boolean,
        default: props$o.badge.isDot
      },
      // 显示的内容
      value: {
        type: [Number, String],
        default: props$o.badge.value
      },
      // 显示的内容
      modelValue: {
        type: [Number, String],
        default: props$o.badge.modelValue
      },
      // 是否显示
      show: {
        type: Boolean,
        default: props$o.badge.show
      },
      // 最大值，超过最大值会显示 '{max}+'
      max: {
        type: [Number, String],
        default: props$o.badge.max
      },
      // 主题类型，error|warning|success|primary
      type: {
        type: String,
        default: props$o.badge.type
      },
      // 当数值为 0 时，是否展示 Badge
      showZero: {
        type: Boolean,
        default: props$o.badge.showZero
      },
      // 背景颜色，优先级比type高，如设置，type参数会失效
      bgColor: {
        type: [String, null],
        default: props$o.badge.bgColor
      },
      // 字体颜色
      color: {
        type: [String, null],
        default: props$o.badge.color
      },
      // 徽标形状，circle-四角均为圆角，horn-左下角为直角
      shape: {
        type: String,
        default: props$o.badge.shape
      },
      // 设置数字的显示方式，overflow|ellipsis|limit
      // overflow会根据max字段判断，超出显示`${max}+`
      // ellipsis会根据max判断，超出显示`${max}...`
      // limit会依据1000作为判断条件，超出1000，显示`${value/1000}K`，比如2.2k、3.34w，最多保留2位小数
      numberType: {
        type: String,
        default: props$o.badge.numberType
      },
      // 设置badge的位置偏移，格式为 [x, y]，也即设置的为top和right的值，absolute为true时有效
      offset: {
        type: Array,
        default: props$o.badge.offset
      },
      // 是否反转背景和字体颜色
      inverted: {
        type: Boolean,
        default: props$o.badge.inverted
      },
      // 是否绝对定位
      absolute: {
        type: Boolean,
        default: props$o.badge.absolute
      }
    }
  };
  const _sfc_main$v = {
    name: "u-badge",
    mixins: [mpMixin, props$7, mixin],
    computed: {
      // 是否将badge中心与父组件右上角重合
      boxStyle() {
        let style = {};
        return style;
      },
      // 整个组件的样式
      badgeStyle() {
        const style = {};
        if (this.color) {
          style.color = this.color;
        }
        if (this.bgColor && !this.inverted) {
          style.backgroundColor = this.bgColor;
        }
        if (this.absolute) {
          style.position = "absolute";
          if (this.offset.length) {
            const top = this.offset[0];
            const right = this.offset[1] || top;
            style.top = uni.$u.addUnit(top);
            style.right = uni.$u.addUnit(right);
          }
        }
        return style;
      },
      showValue() {
        switch (this.numberType) {
          case "overflow":
            return Number(this.value) > Number(this.max) ? this.max + "+" : this.value;
          case "ellipsis":
            return Number(this.value) > Number(this.max) ? "..." : this.value;
          case "limit":
            return Number(this.value) > 999 ? Number(this.value) >= 9999 ? Math.floor(this.value / 1e4 * 100) / 100 + "w" : Math.floor(this.value / 1e3 * 100) / 100 + "k" : this.value;
          default:
            return Number(this.value);
        }
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return _ctx.show && ((Number(_ctx.value) === 0 ? _ctx.showZero : true) || _ctx.isDot) ? (vue.openBlock(), vue.createElementBlock(
      "text",
      {
        key: 0,
        class: vue.normalizeClass([[_ctx.isDot ? "u-badge--dot" : "u-badge--not-dot", _ctx.inverted && "u-badge--inverted", _ctx.shape === "horn" && "u-badge--horn", `u-badge--${_ctx.type}${_ctx.inverted ? "--inverted" : ""}`], "u-badge"]),
        style: vue.normalizeStyle([_ctx.$u.addStyle(_ctx.customStyle), $options.badgeStyle])
      },
      vue.toDisplayString(_ctx.isDot ? "" : $options.showValue),
      7
      /* TEXT, CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$5 = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$7], ["__scopeId", "data-v-06cca9b7"], ["__file", "D:/projects/work/applet/vue3_uview_plus/uni_modules/uview-plus/components/u-badge/u-badge.vue"]]);
  const props$6 = {
    props: {
      // 滑块的移动过渡时间，单位ms
      duration: {
        type: Number,
        default: props$o.tabs.duration
      },
      // tabs标签数组
      list: {
        type: Array,
        default: props$o.tabs.list
      },
      // 滑块颜色
      lineColor: {
        type: String,
        default: props$o.tabs.lineColor
      },
      // 菜单选择中时的样式
      activeStyle: {
        type: [String, Object],
        default: props$o.tabs.activeStyle
      },
      // 菜单非选中时的样式
      inactiveStyle: {
        type: [String, Object],
        default: props$o.tabs.inactiveStyle
      },
      // 滑块长度
      lineWidth: {
        type: [String, Number],
        default: props$o.tabs.lineWidth
      },
      // 滑块高度
      lineHeight: {
        type: [String, Number],
        default: props$o.tabs.lineHeight
      },
      // 滑块背景显示大小，当滑块背景设置为图片时使用
      lineBgSize: {
        type: String,
        default: props$o.tabs.lineBgSize
      },
      // 菜单item的样式
      itemStyle: {
        type: [String, Object],
        default: props$o.tabs.itemStyle
      },
      // 菜单是否可滚动
      scrollable: {
        type: Boolean,
        default: props$o.tabs.scrollable
      },
      // 当前选中标签的索引
      current: {
        type: [Number, String],
        default: props$o.tabs.current
      },
      // 默认读取的键名
      keyName: {
        type: String,
        default: props$o.tabs.keyName
      }
    }
  };
  const _sfc_main$u = {
    name: "u-tabs",
    mixins: [mpMixin, mixin, props$6],
    data() {
      return {
        firstTime: true,
        scrollLeft: 0,
        scrollViewWidth: 0,
        lineOffsetLeft: 0,
        tabsRect: {
          left: 0
        },
        innerCurrent: 0,
        moving: false
      };
    },
    watch: {
      current: {
        immediate: true,
        handler(newValue, oldValue) {
          if (newValue !== this.innerCurrent) {
            this.innerCurrent = newValue;
            this.$nextTick(() => {
              this.resize();
            });
          }
        }
      },
      // list变化时，重新渲染list各项信息
      list() {
        this.$nextTick(() => {
          this.resize();
        });
      }
    },
    computed: {
      textStyle() {
        return (index2) => {
          const style = {};
          const customeStyle = index2 === this.innerCurrent ? uni.$u.addStyle(this.activeStyle) : uni.$u.addStyle(
            this.inactiveStyle
          );
          if (this.list[index2].disabled) {
            style.color = "#c8c9cc";
          }
          return uni.$u.deepMerge(customeStyle, style);
        };
      },
      propsBadge() {
        return uni.$u.props.badge;
      }
    },
    async mounted() {
      this.init();
    },
    emits: ["click", "change"],
    methods: {
      setLineLeft() {
        const tabItem = this.list[this.innerCurrent];
        if (!tabItem) {
          return;
        }
        let lineOffsetLeft = this.list.slice(0, this.innerCurrent).reduce((total, curr) => total + curr.rect.width, 0);
        const lineWidth = uni.$u.getPx(this.lineWidth);
        this.lineOffsetLeft = lineOffsetLeft + (tabItem.rect.width - lineWidth) / 2;
        if (this.firstTime) {
          setTimeout(() => {
            this.firstTime = false;
          }, 10);
        }
      },
      // nvue下设置滑块的位置
      animation(x2, duration = 0) {
      },
      // 点击某一个标签
      clickHandler(item, index2) {
        this.$emit("click", {
          ...item,
          index: index2
        });
        if (item.disabled)
          return;
        this.innerCurrent = index2;
        this.resize();
        this.$emit("change", {
          ...item,
          index: index2
        });
      },
      init() {
        uni.$u.sleep().then(() => {
          this.resize();
        });
      },
      setScrollLeft() {
        const tabRect = this.list[this.innerCurrent];
        const offsetLeft = this.list.slice(0, this.innerCurrent).reduce((total, curr) => {
          return total + curr.rect.width;
        }, 0);
        const windowWidth = uni.$u.sys().windowWidth;
        let scrollLeft = offsetLeft - (this.tabsRect.width - tabRect.rect.width) / 2 - (windowWidth - this.tabsRect.right) / 2 + this.tabsRect.left / 2;
        scrollLeft = Math.min(scrollLeft, this.scrollViewWidth - this.tabsRect.width);
        this.scrollLeft = Math.max(0, scrollLeft);
      },
      // 获取所有标签的尺寸
      resize() {
        if (this.list.length === 0) {
          return;
        }
        Promise.all([this.getTabsRect(), this.getAllItemRect()]).then(([tabsRect, itemRect = []]) => {
          this.tabsRect = tabsRect;
          this.scrollViewWidth = 0;
          itemRect.map((item, index2) => {
            this.scrollViewWidth += item.width;
            this.list[index2].rect = item;
          });
          this.setLineLeft();
          this.setScrollLeft();
        });
      },
      // 获取导航菜单的尺寸
      getTabsRect() {
        return new Promise((resolve) => {
          this.queryRect("u-tabs__wrapper__scroll-view").then((size) => resolve(size));
        });
      },
      // 获取所有标签的尺寸
      getAllItemRect() {
        return new Promise((resolve) => {
          const promiseAllArr = this.list.map((item, index2) => this.queryRect(
            `u-tabs__wrapper__nav__item-${index2}`,
            true
          ));
          Promise.all(promiseAllArr).then((sizes) => resolve(sizes));
        });
      },
      // 获取各个标签的尺寸
      queryRect(el, item) {
        return new Promise((resolve) => {
          this.$uGetRect(`.${el}`).then((size) => {
            resolve(size);
          });
        });
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_badge = resolveEasycom(vue.resolveDynamicComponent("u-badge"), __easycom_0$5);
    return vue.openBlock(), vue.createElementBlock("view", { class: "u-tabs" }, [
      vue.createElementVNode("view", { class: "u-tabs__wrapper" }, [
        vue.renderSlot(_ctx.$slots, "left", {}, void 0, true),
        vue.createElementVNode("view", { class: "u-tabs__wrapper__scroll-view-wrapper" }, [
          vue.createElementVNode("scroll-view", {
            "scroll-x": _ctx.scrollable,
            "scroll-left": $data.scrollLeft,
            "scroll-with-animation": "",
            class: "u-tabs__wrapper__scroll-view",
            "show-scrollbar": false,
            ref: "u-tabs__wrapper__scroll-view"
          }, [
            vue.createElementVNode(
              "view",
              {
                class: "u-tabs__wrapper__nav",
                ref: "u-tabs__wrapper__nav"
              },
              [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(_ctx.list, (item, index2) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: vue.normalizeClass(["u-tabs__wrapper__nav__item", [`u-tabs__wrapper__nav__item-${index2}`, item.disabled && "u-tabs__wrapper__nav__item--disabled"]]),
                      key: index2,
                      onClick: ($event) => $options.clickHandler(item, index2),
                      ref_for: true,
                      ref: `u-tabs__wrapper__nav__item-${index2}`,
                      style: vue.normalizeStyle([_ctx.$u.addStyle(_ctx.itemStyle), { flex: _ctx.scrollable ? "" : 1 }])
                    }, [
                      vue.createElementVNode(
                        "text",
                        {
                          class: vue.normalizeClass([[item.disabled && "u-tabs__wrapper__nav__item__text--disabled"], "u-tabs__wrapper__nav__item__text"]),
                          style: vue.normalizeStyle([$options.textStyle(index2)])
                        },
                        vue.toDisplayString(item[_ctx.keyName]),
                        7
                        /* TEXT, CLASS, STYLE */
                      ),
                      vue.createVNode(_component_u_badge, {
                        show: !!(item.badge && (item.badge.show || item.badge.isDot || item.badge.value)),
                        isDot: item.badge && item.badge.isDot || $options.propsBadge.isDot,
                        value: item.badge && item.badge.value || $options.propsBadge.value,
                        max: item.badge && item.badge.max || $options.propsBadge.max,
                        type: item.badge && item.badge.type || $options.propsBadge.type,
                        showZero: item.badge && item.badge.showZero || $options.propsBadge.showZero,
                        bgColor: item.badge && item.badge.bgColor || $options.propsBadge.bgColor,
                        color: item.badge && item.badge.color || $options.propsBadge.color,
                        shape: item.badge && item.badge.shape || $options.propsBadge.shape,
                        numberType: item.badge && item.badge.numberType || $options.propsBadge.numberType,
                        inverted: item.badge && item.badge.inverted || $options.propsBadge.inverted,
                        customStyle: "margin-left: 4px;"
                      }, null, 8, ["show", "isDot", "value", "max", "type", "showZero", "bgColor", "color", "shape", "numberType", "inverted"])
                    ], 14, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )),
                vue.createElementVNode(
                  "view",
                  {
                    class: "u-tabs__wrapper__nav__line",
                    ref: "u-tabs__wrapper__nav__line",
                    style: vue.normalizeStyle([{
                      width: _ctx.$u.addUnit(_ctx.lineWidth),
                      transform: `translate(${$data.lineOffsetLeft}px)`,
                      transitionDuration: `${$data.firstTime ? 0 : _ctx.duration}ms`,
                      height: _ctx.$u.addUnit(_ctx.lineHeight),
                      background: _ctx.lineColor,
                      backgroundSize: _ctx.lineBgSize
                    }])
                  },
                  null,
                  4
                  /* STYLE */
                )
              ],
              512
              /* NEED_PATCH */
            )
          ], 8, ["scroll-x", "scroll-left"])
        ]),
        vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
      ])
    ]);
  }
  const __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$6], ["__scopeId", "data-v-02b0c54f"], ["__file", "D:/projects/work/applet/vue3_uview_plus/uni_modules/uview-plus/components/u-tabs/u-tabs.vue"]]);
  const _sfc_main$t = {
    __name: "cell_file",
    props: {
      cellConfig: {}
    },
    emits: ["handleEvent"],
    setup(__props, { emit }) {
      const props2 = __props;
      const cellRNamesArr = props2.cellConfig && props2.cellConfig.cellRNames ? JSON.parse(props2.cellConfig.cellRNames) : [];
      const cellFileType = props2.cellConfig && props2.cellConfig.cellFile ? getFileType(props2.cellConfig.cellFile) : "word";
      vue.reactive({
        imgPopShow: false
        // cellRNames:[],
        // cellLImg: '/static/icon/top-bg.png',
      });
      const handleEvent = () => {
        emit("handleEvent");
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          class: "com_file",
          onClick: _cache[0] || (_cache[0] = ($event) => handleEvent())
        }, [
          vue.createElementVNode("view", { class: "com_fileL" }, [
            vue.createElementVNode("img", {
              class: "com_fileLImg",
              src: `/static/office/${vue.unref(cellFileType)}.png`,
              alt: ""
            }, null, 8, ["src"])
          ]),
          vue.createElementVNode("view", { class: "com_fileR" }, [
            vue.createElementVNode("view", { class: "com_fileRT" }, [
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(props2.cellConfig.cellTitle || ""),
                1
                /* TEXT */
              )
            ]),
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(vue.unref(cellRNamesArr), (item) => {
                return vue.openBlock(), vue.createElementBlock("view", { class: "cell2RItem" }, [
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString(item.title) + "：",
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString(item.val),
                    1
                    /* TEXT */
                  )
                ]);
              }),
              256
              /* UNKEYED_FRAGMENT */
            ))
          ])
        ]);
      };
    }
  };
  const __easycom_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__scopeId", "data-v-36fb61e5"], ["__file", "D:/projects/work/applet/vue3_uview_plus/components/cell_file/cell_file.vue"]]);
  const _sfc_main$s = {
    __name: "taskLetter",
    props: {
      config: ""
    },
    setup(__props) {
      const props2 = __props;
      const porpsObj = props2.config ? JSON.parse(props2.config) : {};
      useIndexStore();
      const state = vue.reactive({
        navSept: porpsObj.navId || 2,
        mainInfo: [],
        fileShow: false,
        posFileSrc: ""
      });
      const mainLetterList = [
        { id: 1, name: "安全生产责任制", key: "system" },
        { id: 2, name: "目标责任书-发起人", key: "creater" },
        { id: 3, name: "目标责任书-签订人", key: "signer" }
      ];
      const letterItemNames = [
        { id: 1, title: "状态", key: "status", defval: "发起人已签字" },
        { id: 2, title: "安全生产目标", key: "aim" },
        { id: 3, title: "发布日期", key: "createDate" }
      ];
      const safeItemNames = [
        { id: 1, title: "适用岗位", key: "post" },
        { id: 2, title: "发布日期", key: "createDate" }
      ];
      const fileUrl = vue.computed(() => {
        formatAppLog("log", "at pages/taskLetter/taskLetter.vue:84", BASE_LINE_PRE + state.posFileSrc);
        return state.posFileSrc ? BASE_LINE_PRE + encodeURIComponent(BASE_FILE_URL + state.posFileSrc) : "";
      });
      const getInterInfo = async (navInfo = mainLetterList[state.navSept - 1]) => {
        formatAppLog("log", "at pages/taskLetter/taskLetter.vue:91", navInfo);
        let beginTimeN = (/* @__PURE__ */ new Date()).getTime() - 7 * 24 * 60 * 60 * 1e3;
        formatDate(beginTimeN);
        formatDate();
        let params = {
          page: 1,
          rows: 100,
          size: 100
          // endTime:`${endArr[0]}-${endArr[1]}`,
          // beginTime:`${beginArr[0]}-${beginArr[1]}`
        };
        let interInfo = {};
        let acciItemList = JSON.parse(JSON.stringify(letterItemNames));
        if (navInfo.id == 1) {
          interInfo = await requestRespSystemsInfo(params).then((r2) => r2).catch((e2) => {
          });
          acciItemList = JSON.parse(JSON.stringify(safeItemNames));
        }
        if (navInfo.id == 2) {
          interInfo = await requestRespCreatersInfo(params).then((r2) => r2).catch((e2) => {
          });
        }
        if (navInfo.id == 3) {
          interInfo = await requestRespSignersInfo(params).then((r2) => r2).catch((e2) => {
          });
        }
        if (!interInfo.data || !interInfo.data.t) {
          return;
        }
        let info = interInfo.data.t.content || [];
        state["mainInfo" + navInfo.key] = info.map((clap) => {
          let obj = { ...clap };
          if (clap.letter) {
            clap = clap.letter;
          }
          let cellRNames = acciItemList.map((item) => {
            item.val = clap[item.key] || item.defval || "";
            if (item.key.includes("Time") || item.key.includes("Date")) {
              let arr = formatDate(item.val);
              item.val = `${arr[0]}-${arr[1]} ${arr[3]}`;
            }
            if (navInfo.id == 3 && item.key.includes("status")) {
              item.val = clap.signed == "否" ? "签订人未签字" : "签订人已签字";
            }
            return item;
          });
          obj.cellRNames = JSON.stringify(cellRNames);
          obj.cellTitle = clap.name;
          obj.cellFile = clap.file;
          return obj;
        });
        formatAppLog("log", "at pages/taskLetter/taskLetter.vue:143", state["mainInfo" + navInfo.key]);
      };
      const changeNavSept = (obj) => {
        state.navSept = obj.id;
        getInterInfo(obj);
      };
      const handleCellFile = async (obj) => {
        formatAppLog("log", "at pages/taskLetter/taskLetter.vue:179", obj);
        if (state.navSept == 1) {
          state.posFileSrc = obj.file;
          state.fileShow = true;
          return;
        }
        const formConfig = {};
        let domList = [];
        let toFormConfig = {};
        let title = "";
        if (state.navSept == 2) {
          let params = {
            page: 1,
            rows: 100,
            size: 100
          };
          const interCreaters = await requestCreatersInfo(params, obj.id).then((r2) => r2);
          if (!interCreaters.data || !interCreaters.data.t) {
            return;
          }
          let creaters = interCreaters.data.t.content || [];
          let options = creaters.map((item) => {
            let obj2 = item.sign ? { imgSrc: item.sign, cellType: "img" } : { name: "未签字", cellType: "text" };
            return [{ name: item.signer.ushow, cellType: "text" }, obj2];
          });
          domList = [
            { id: 1, title: "安全生产目标", key: "name", type: "text", ref: "resp_creat_name" },
            { id: 2, title: "文件", key: "file", type: "file", ref: "resp_creat_file" },
            { id: 3, title: "创建时间", key: "createDate", type: "text", ref: "resp_creat_createDate", val: obj.cellLImg },
            { id: 4, title: "发起人签字", key: "sign", type: "sign", ref: "resp_creat_sign" },
            { id: 5, title: "发起人签字时间", key: "signDate", type: "text", ref: "resp_creat_signDate" },
            { id: 6, title: "签订人员列表", key: "list", type: "table", ref: "resp_creat_list", options }
          ];
          toFormConfig = {
            submitFn: "requestCreatSignSubmit",
            params: { id: obj.id },
            from: "resp_creat"
          };
          title = "安全责任制-发起人";
        }
        if (state.navSept == 3) {
          domList = [
            { id: 1, title: "安全生产目标", key: "cellTitle", type: "text", ref: "resp_sign_cellTitle" },
            { id: 2, title: "文件", key: "cellFile", type: "file", ref: "resp_sign_file" },
            { id: 3, title: "创建时间", key: "createDate", type: "text", ref: "resp_sign_createDate", val: obj.letter.createDate },
            { id: 4, title: "发起人", key: "ushow", type: "text", ref: "resp_sign_ushow", val: obj.letter.creater.ushow || "" },
            { id: 5, title: "签订人签字", key: "sign", type: "sign", ref: "resp_sign_sign" }
          ];
          toFormConfig = {
            submitFn: "requestLetterSignSubmit",
            params: { id: obj.id },
            from: "resp_sign"
          };
          title = "安全责任制-签订人";
        }
        domList.map((item) => {
          if (obj[item.key]) {
            item.val = obj[item.key];
          }
          if (item.key.includes("Time") || item.key.includes("Date")) {
            let arr = formatDate(item.val);
            item.val = `${arr[0]}-${arr[1]} ${arr[3]}`;
          }
          return item;
        });
        formConfig.domList = domList;
        formConfig.config = toFormConfig;
        formatAppLog("log", "at pages/taskLetter/taskLetter.vue:266", formConfig);
        uni.$u.route({
          url: "/pages/comForm/comForm",
          params: {
            data: JSON.stringify(formConfig),
            title
          }
        });
      };
      onShow(() => {
        getInterInfo();
        state.fileShow = false;
      });
      return (_ctx, _cache) => {
        const _component_u_tabs = resolveEasycom(vue.resolveDynamicComponent("u-tabs"), __easycom_0$4);
        const _component_cell_file = resolveEasycom(vue.resolveDynamicComponent("cell_file"), __easycom_1$2);
        return vue.openBlock(), vue.createElementBlock("view", { class: "taskLetter" }, [
          vue.createElementVNode("view", { class: "taskLetterTop" }, [
            vue.createVNode(_component_u_tabs, {
              list: mainLetterList,
              lineWidth: "40",
              lineHeight: "4",
              activeStyle: {
                color: "#303133",
                fontWeight: "bold",
                transform: "scale(1.05)"
              },
              inactiveStyle: {
                color: "#606266",
                transform: "scale(1)"
              },
              itemStyle: "padding-left: 30rpx; padding-right: 30rpx; height: 96rpx;",
              current: state.navSept - 1,
              onClick: changeNavSept
            }, null, 8, ["activeStyle", "inactiveStyle", "current"])
          ]),
          state.navSept == 1 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "applyAcciUpItem applyAcciUp1"
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(state["mainInfosystem"], (item) => {
                return vue.openBlock(), vue.createBlock(_component_cell_file, {
                  cellConfig: item,
                  onHandleEvent: ($event) => handleCellFile(item)
                }, null, 8, ["cellConfig", "onHandleEvent"]);
              }),
              256
              /* UNKEYED_FRAGMENT */
            ))
          ])) : vue.createCommentVNode("v-if", true),
          state.navSept == 2 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "applyAcciUpItem applyAcciUp2"
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(state["mainInfocreater"], (item) => {
                return vue.openBlock(), vue.createBlock(_component_cell_file, {
                  cellConfig: item,
                  onHandleEvent: ($event) => handleCellFile(item)
                }, null, 8, ["cellConfig", "onHandleEvent"]);
              }),
              256
              /* UNKEYED_FRAGMENT */
            ))
          ])) : vue.createCommentVNode("v-if", true),
          state.navSept == 3 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 2,
            class: "applyAcciUpItem applyAcciUp3"
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(state["mainInfosigner"], (item) => {
                return vue.openBlock(), vue.createBlock(_component_cell_file, {
                  cellConfig: item,
                  onHandleEvent: ($event) => handleCellFile(item)
                }, null, 8, ["cellConfig", "onHandleEvent"]);
              }),
              256
              /* UNKEYED_FRAGMENT */
            ))
          ])) : vue.createCommentVNode("v-if", true),
          state.fileShow ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 3,
            class: "comDocShow"
          }, [
            vue.createElementVNode("web-view", {
              ref: "fileShowWeb",
              src: vue.unref(fileUrl)
            }, null, 8, ["src"])
          ])) : vue.createCommentVNode("v-if", true)
        ]);
      };
    }
  };
  const PagesTaskLetterTaskLetter = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/taskLetter/taskLetter.vue"]]);
  const useKnowStore = defineStore("Know", {
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
        const archives = await requestPersonInfo().then((r2) => r2).catch((e2) => e2);
        if (archives.data || archives.data.t) {
          this.userArchives = archives.data.t.user || {};
          this.userArchives.suwList = archives.data.t.suwList || [];
        }
      },
      // 获取安全责任体系数据
      async getSafeRespsData(params) {
        const resps = await requestResps(params).then((r2) => r2).catch((e2) => e2);
        formatAppLog("log", "at store/know.js:29", resps);
        if (resps.data || resps.data.t) {
          this.resps = resps.data.t.content || [];
        }
      },
      // 获取安全责任体系发起人
      async getRespCteatData(params) {
        const respCteat = await requestRespCteat(params).then((r2) => r2).catch((e2) => e2);
        formatAppLog("log", "at store/know.js:38", respCteat);
        if (respCteat.data || respCteat.data.t) {
          this.respsCreat = respCteat.data.t.content || [];
        }
      },
      // 获取安全责任体系签订人
      async getRespSignData(params) {
        const respSign = await requestRespSign(params).then((r2) => r2).catch((e2) => e2);
        formatAppLog("log", "at store/know.js:47", respSign);
        if (respSign.data || respSign.data.t) {
          this.respsSign = respSign.data.t.content || [];
        }
      }
    }
  });
  const _sfc_main$r = {
    __name: "know",
    setup(__props) {
      useIndexStore();
      const userStore = useUserStore();
      const konwStore = useKnowStore();
      formatAppLog("log", "at pages/know/know.vue:45", GET_STORAGE("USER"));
      const user = GET_STORAGE("USER") || {};
      vue.reactive({
        // postId: 1,
      });
      formatAppLog("log", "at pages/know/know.vue:54", userStore.user.job);
      formatAppLog("log", "at pages/know/know.vue:55", userStore.user);
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
        formatAppLog("log", "at pages/know/know.vue:112", obj);
        obj.from = "know";
        if (obj.title == "个人档案") {
          await konwStore.getUserArchives();
          formatAppLog("log", "at pages/know/know.vue:117", konwStore.userArchives);
          const archives = konwStore.userArchives || {};
          const formConfig = personForm.map((item) => {
            item.val = archives[item.key];
            if (item.title == "工作简历") {
              item.val = item.val.map(formatSuw);
            }
            return item;
          });
          uni.$u.route({
            url: "/pages/comForm/comForm",
            params: {
              data: JSON.stringify(formConfig),
              title: "个人档案"
            }
          });
          return;
        }
        if (obj.title == "安全生产目标责任书") {
          uni.$u.route({
            url: "/pages/knowSign/knowSign",
            params: {
              // config: JSON.stringify(obj)
            }
          });
          return;
        }
        uni.$u.route({
          url: "/pages/comDocLearn/comDocLearn",
          params: {
            config: JSON.stringify(obj)
          }
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "know" }, [
          vue.createCommentVNode(" 用户信息 "),
          vue.createElementVNode("view", { class: "konwFir" }, [
            vue.createElementVNode("view", { class: "knowName" }, [
              vue.createElementVNode(
                "view",
                { class: "knowNameTop" },
                vue.toDisplayString(vue.unref(user).ushow || ""),
                1
                /* TEXT */
              ),
              vue.createCommentVNode(" <view><text class = 'knowNameBIcon'>#</text><text>{{user.sign1Pa}}</text></view> ")
            ]),
            vue.createElementVNode("view", { class: "knowAvatar" }, [
              vue.createCommentVNode(` <img class = 'knowAvatarImg' src="/static/icon/a-Group1308.png" alt=""> `),
              vue.createElementVNode("img", {
                class: "knowAvatarImg",
                src: `${vue.unref(BASE_FILE_URL)}${vue.unref(user).portrait}`,
                alt: ""
              }, null, 8, ["src"])
            ])
          ]),
          vue.createCommentVNode(" 岗位信息 "),
          vue.createElementVNode("view", { class: "knowPost" }, [
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(postList, (item) => {
                return vue.createElementVNode("view", { class: "knowPostItem" }, [
                  vue.createElementVNode(
                    "view",
                    null,
                    vue.toDisplayString(item.title),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "view",
                    { class: "knowPostItemV" },
                    vue.toDisplayString(vue.unref(user)[item.key] || "恒通股份"),
                    1
                    /* TEXT */
                  )
                ]);
              }),
              64
              /* STABLE_FRAGMENT */
            ))
          ]),
          vue.createCommentVNode(" 主要列表 "),
          vue.createElementVNode("view", { class: "knowMain" }, [
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(mainKnowList, (item) => {
                return vue.createElementVNode("view", {
                  class: "knowMainItem",
                  onClick: ($event) => handleMainKnow(item)
                }, [
                  vue.createElementVNode(
                    "view",
                    null,
                    vue.toDisplayString(item.title),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("img", {
                    class: "knowMainImg",
                    src: `/static/icon/${item.icon}.png`,
                    alt: ""
                  }, null, 8, ["src"])
                ], 8, ["onClick"]);
              }),
              64
              /* STABLE_FRAGMENT */
            ))
          ])
        ]);
      };
    }
  };
  const PagesKnowKnow = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/know/know.vue"]]);
  const _sfc_main$q = {
    __name: "knowSign",
    setup(__props) {
      const knowStore = useKnowStore();
      const state = vue.reactive({
        signType: 1,
        SignSearch: ""
      });
      const signStatusNav = [
        { id: 1, name: "安全生产责任制" },
        { id: 2, name: "目标责任书-发起人" },
        { id: 3, name: "目标责任书-签订人" }
      ];
      const changeSignStatus = async (obj) => {
        formatAppLog("log", "at pages/knowSign/knowSign.vue:97", obj);
        const params = {
          page: 1,
          rows: 60,
          name: state.SignSearch || "",
          post: ""
        };
        state.signType = obj.id;
        if (obj.id == 1) {
          await knowStore.getSafeRespsData(params);
          formatAppLog("log", "at pages/knowSign/knowSign.vue:108", knowStore.resps);
        }
        if (obj.id == 2) {
          await knowStore.getRespCteatData(params);
          formatAppLog("log", "at pages/knowSign/knowSign.vue:113", knowStore.respsCreat);
        }
        if (obj.id == 3) {
          await knowStore.getRespSignData(params);
          formatAppLog("log", "at pages/knowSign/knowSign.vue:118", knowStore.respsSign);
        }
      };
      changeSignStatus(signStatusNav[0]);
      const knowSignChange = (obj) => {
        formatAppLog("log", "at pages/knowSign/knowSign.vue:131", obj);
      };
      const openResps = (obj) => {
        formatAppLog("log", "at pages/knowSign/knowSign.vue:135", obj);
        openDocment(obj.letter.file);
      };
      return (_ctx, _cache) => {
        const _component_u_tabs = resolveEasycom(vue.resolveDynamicComponent("u-tabs"), __easycom_0$4);
        const _component_u_input = resolveEasycom(vue.resolveDynamicComponent("u-input"), __easycom_1$6);
        return vue.openBlock(), vue.createElementBlock("view", { class: "knowSign" }, [
          vue.createElementVNode("view", { class: "knowSignTop" }, [
            vue.createVNode(_component_u_tabs, {
              list: signStatusNav,
              lineWidth: "40",
              lineHeight: "4",
              activeStyle: {
                color: "#303133",
                fontWeight: "bold",
                transform: "scale(1.05)"
              },
              inactiveStyle: {
                color: "#606266",
                transform: "scale(1)"
              },
              itemStyle: "padding-left: 30rpx; padding-right: 30rpx; height: 96rpx;",
              onClick: changeSignStatus
            }, null, 8, ["activeStyle", "inactiveStyle"]),
            vue.createElementVNode("view", { class: "knowSignSearch" }, [
              vue.createVNode(_component_u_input, {
                modelValue: state.SignSearch,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => state.SignSearch = $event),
                type: "text",
                border: "true",
                placeholder: "请输入关键词搜索",
                "custom-style": "background: #F2F3F8",
                onChange: knowSignChange
              }, null, 8, ["modelValue"])
            ])
          ]),
          vue.createElementVNode("view", { class: "knowSignMain" }, [
            vue.withDirectives(vue.createElementVNode(
              "view",
              null,
              [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(vue.unref(knowStore).resps, (item) => {
                    return vue.openBlock(), vue.createElementBlock(
                      "view",
                      null,
                      vue.toDisplayString(item.name),
                      1
                      /* TEXT */
                    );
                  }),
                  256
                  /* UNKEYED_FRAGMENT */
                ))
              ],
              512
              /* NEED_PATCH */
            ), [
              [vue.vShow, state.signType == 1]
            ]),
            vue.withDirectives(vue.createElementVNode(
              "view",
              null,
              [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(vue.unref(knowStore).respsCreat, (item) => {
                    return vue.openBlock(), vue.createElementBlock(
                      "view",
                      null,
                      vue.toDisplayString(item.name),
                      1
                      /* TEXT */
                    );
                  }),
                  256
                  /* UNKEYED_FRAGMENT */
                ))
              ],
              512
              /* NEED_PATCH */
            ), [
              [vue.vShow, state.signType == 2]
            ]),
            vue.withDirectives(vue.createElementVNode(
              "view",
              { class: "knowSignMainPage" },
              [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(vue.unref(knowStore).respsSign, (item) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "knowSignMainItem",
                      onClick: ($event) => openResps(item)
                    }, [
                      vue.createElementVNode("view", { class: "knowSignMainItemL" }, [
                        vue.createElementVNode("img", {
                          class: "knowSignImg",
                          src: "/static/office/word.png",
                          alt: ""
                        })
                      ]),
                      vue.createElementVNode("view", { class: "knowSignMainItemR" }, [
                        vue.createElementVNode(
                          "view",
                          { class: "knowSignItemRT" },
                          vue.toDisplayString(item.letter.name),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode("view", { class: "knowSignItemRLine" }, [
                          vue.createElementVNode("view", null, "状态："),
                          vue.createElementVNode(
                            "view",
                            null,
                            vue.toDisplayString(item.signed == "是" ? "签订人已签字" : "签订人未签字"),
                            1
                            /* TEXT */
                          )
                        ]),
                        vue.createElementVNode("view", { class: "knowSignItemRLine" }, [
                          vue.createElementVNode("view", null, "安全生产日期："),
                          vue.createElementVNode(
                            "view",
                            null,
                            vue.toDisplayString(item.letter.aim || "见附件"),
                            1
                            /* TEXT */
                          )
                        ]),
                        vue.createElementVNode("view", { class: "knowSignItemRLine" }, [
                          vue.createElementVNode("view", null, "发布日期："),
                          vue.createCommentVNode(' <view>{{formatDate(item.signDate) || ""}}</view> ')
                        ])
                      ])
                    ], 8, ["onClick"]);
                  }),
                  256
                  /* UNKEYED_FRAGMENT */
                ))
              ],
              512
              /* NEED_PATCH */
            ), [
              [vue.vShow, state.signType == 3]
            ])
          ])
        ]);
      };
    }
  };
  const PagesKnowSignKnowSign = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/knowSign/knowSign.vue"]]);
  const _sfc_main$p = {
    __name: "apply",
    setup(__props) {
      useIndexStore();
      vue.reactive({
        taskType: 1
      });
      const accidentChild = [
        { id: 1, title: "事故上报", icon: "accidentUp", page: "/pages/T_A_acciUp/T_A_acciUp" },
        { id: 2, title: "事故批复", icon: "accidentReply", page: "/pages/applyAcciReply/applyAcciReply" }
      ];
      const riskChild = [
        { id: 1, title: "隐患排查清单", icon: "accidentUp", page: "/pages/applyRisk/applyRisk" },
        { id: 2, title: "日常性隐患排查", icon: "accidentReply", page: "/pages/applyAcciReply/applyAcciReply" }
      ];
      const mainApplyList = [
        { id: 1, title: "随手拍", icon: "ill-ssp", page: "/pages/T_A_clapping/T_A_clapping" },
        { id: 2, title: "事故管理", icon: "ill-sggl", page: "/pages/comModelList/comModelList", childList: accidentChild },
        { id: 3, title: "特殊作业管理", icon: "ill-work", page: "/pages/T_A_work/T_A_work" },
        { id: 4, title: "风险管理", icon: "ill-risk", page: "/pages/comModelList/comModelList", childList: riskChild }
      ];
      const handleMainApply = (obj) => {
        formatAppLog("log", "at pages/apply/apply.vue:42", obj);
        if (obj.id > 2)
          return;
        uni.$u.route({
          url: obj.page,
          params: {
            config: JSON.stringify(obj)
          }
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "apply" }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(mainApplyList, (item) => {
              return vue.createElementVNode("view", {
                class: "applyItem",
                onClick: ($event) => handleMainApply(item)
              }, [
                vue.createElementVNode("img", {
                  class: "applyItemImg",
                  src: `/static/icon/${item.icon}.png`,
                  alt: ""
                }, null, 8, ["src"]),
                vue.createElementVNode(
                  "view",
                  { class: "applyItemText" },
                  vue.toDisplayString(item.title),
                  1
                  /* TEXT */
                )
              ], 8, ["onClick"]);
            }),
            64
            /* STABLE_FRAGMENT */
          ))
        ]);
      };
    }
  };
  const PagesApplyApply = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/apply/apply.vue"]]);
  const _sfc_main$o = {
    __name: "applyAcciReply",
    props: {
      config: ""
    },
    setup(__props) {
      useIndexStore();
      const state = vue.reactive({
        // acciUpSept: porpsObj.navId || 1,
        replyMain: []
      });
      const accidReplyName = [
        { id: 1, title: "事故描述", key: "remark" },
        { id: 2, title: "发生时间", key: "atTime" },
        { id: 3, title: "上报人", key: "createdUserName" },
        { id: 4, title: "上报时间", key: "createdDate" },
        { id: 5, title: "事故处理员", key: "handler" }
      ];
      const getAcciInfo = async () => {
        let beginTimeN = (/* @__PURE__ */ new Date()).getTime() - 7 * 24 * 60 * 60 * 1e3;
        let beginArr = formatDate(beginTimeN);
        let endArr = formatDate();
        let params = {
          page: 1,
          rows: 100,
          size: 100,
          endTime: `${endArr[0]}-${endArr[1]}`,
          beginTime: `${beginArr[0]}-${beginArr[1]}`
        };
        let interInfo = await requestAcciReplyInfo(params).then((r2) => r2).catch((e2) => {
        });
        if (!interInfo.data || !interInfo.data.t) {
          return;
        }
        let info = interInfo.data.t.content || [];
        state.replyMain = info.map((clap) => {
          let obj = {};
          let cellRNames = accidReplyName.map((item) => {
            item.val = clap[item.key];
            return item;
          });
          obj.cellRNames = JSON.stringify(cellRNames);
          obj.cellLImg = clap.file1;
          obj.step = clap.step || "";
          obj.acciId = clap.id || "";
          return obj;
        });
        formatAppLog("log", "at pages/applyAcciReply/applyAcciReply.vue:73", info);
      };
      const handleReply = (obj) => {
        formatAppLog("log", "at pages/applyAcciReply/applyAcciReply.vue:88", obj);
      };
      onShow(() => {
        getAcciInfo();
      });
      return (_ctx, _cache) => {
        const _component_cell1 = resolveEasycom(vue.resolveDynamicComponent("cell1"), __easycom_0$7);
        return vue.openBlock(), vue.createElementBlock("view", { class: "acciReply" }, [
          vue.createElementVNode("view", { class: "applyAcciUpItem applyAcciUp4" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(state.replyMain, (item) => {
                return vue.openBlock(), vue.createBlock(_component_cell1, {
                  cellRNames: item.cellRNames,
                  cellLImg: item.cellLImg,
                  step: item.step,
                  onHandleEvent: ($event) => handleReply(item)
                }, null, 8, ["cellRNames", "cellLImg", "step", "onHandleEvent"]);
              }),
              256
              /* UNKEYED_FRAGMENT */
            ))
          ])
        ]);
      };
    }
  };
  const PagesApplyAcciReplyApplyAcciReply = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/applyAcciReply/applyAcciReply.vue"]]);
  const _sfc_main$n = {
    __name: "applyRisk",
    setup(__props) {
      useIndexStore();
      const state = vue.reactive({
        riskLevelShow: false,
        riskTypeShow: false,
        riskPickerShow: false,
        riskLevelVal: "全部",
        riskTypeVal: "全部",
        riskBranchVal: "职能部门"
      });
      const riskLevelS = [
        ["全部", "一级", "二级", "三级", "四级", "五级"]
      ];
      const riskTypeS = [
        ["全部", "作业活动类", "设备设施类"]
      ];
      let currentList = riskLevelS;
      let curentItem = "riskLevelVal";
      const handlePicker = (str) => {
        formatAppLog("log", "at pages/applyRisk/applyRisk.vue:56", str);
        if (str == "level") {
          currentList = riskLevelS;
          curentItem = "riskLevelVal";
        }
        if (str == "type") {
          currentList = riskTypeS;
          curentItem = "riskTypeVal";
        }
        state.riskPickerShow = true;
      };
      const riskPickerConfirm = (e2, obj) => {
        formatAppLog("log", "at pages/applyRisk/applyRisk.vue:71", e2);
        formatAppLog("log", "at pages/applyRisk/applyRisk.vue:72", obj);
        state.riskPickerShow = false;
        state[curentItem] = e2.value[0];
      };
      const handleBranchList = () => {
        uni.$u.route({
          url: "pages/comBranchList/comBranchList",
          animationDuration: 300,
          animationType: "slide-in-bottom"
        });
      };
      onShow(() => {
        uni.$once("selectBranch", function(data) {
          formatAppLog("log", "at pages/applyRisk/applyRisk.vue:94", "监听到事件来自返回的参数：" + data);
          state.riskBranchVal = data.name;
        });
      });
      return (_ctx, _cache) => {
        const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$b);
        const _component_u_picker = resolveEasycom(vue.resolveDynamicComponent("u-picker"), __easycom_6);
        return vue.openBlock(), vue.createElementBlock("view", { class: "applyRisk" }, [
          vue.createElementVNode("view", { class: "applyRiskTop" }, [
            vue.createElementVNode("view", {
              onClick: _cache[0] || (_cache[0] = ($event) => handlePicker("level")),
              class: "applyRiskTopItem"
            }, [
              vue.createElementVNode(
                "text",
                { class: "applyRiskTopItemT" },
                vue.toDisplayString(state.riskLevelVal),
                1
                /* TEXT */
              ),
              vue.createVNode(_component_u_icon, {
                name: "arrow-down",
                color: "#999",
                size: "16"
              })
            ]),
            vue.createElementVNode("view", {
              onClick: _cache[1] || (_cache[1] = ($event) => handleBranchList()),
              class: "applyRiskTopItem"
            }, [
              vue.createElementVNode(
                "view",
                { class: "applyRiskTopItemT" },
                vue.toDisplayString(state.riskBranchVal || ""),
                1
                /* TEXT */
              ),
              vue.createVNode(_component_u_icon, {
                name: "arrow-down",
                color: "#999",
                size: "16"
              })
            ]),
            vue.createElementVNode("view", {
              onClick: _cache[2] || (_cache[2] = ($event) => handlePicker("type")),
              class: "applyRiskTopItem"
            }, [
              vue.createElementVNode(
                "text",
                { class: "applyRiskTopItemT" },
                vue.toDisplayString(state.riskTypeVal),
                1
                /* TEXT */
              ),
              vue.createVNode(_component_u_icon, {
                name: "arrow-down",
                color: "#999",
                size: "16"
              })
            ])
          ]),
          vue.createVNode(_component_u_picker, {
            show: state.riskPickerShow,
            columns: vue.unref(currentList),
            closeOnClickOverlay: true,
            onClose: _cache[3] || (_cache[3] = ($event) => state[`riskPickerShow`] = false),
            onCancel: _cache[4] || (_cache[4] = ($event) => state[`riskPickerShow`] = false),
            onConfirm: riskPickerConfirm
          }, null, 8, ["show", "columns"])
        ]);
      };
    }
  };
  const PagesApplyRiskApplyRisk = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/applyRisk/applyRisk.vue"]]);
  const _sfc_main$m = {
    __name: "my_sign",
    setup(__props) {
      useIndexStore();
      const state = vue.reactive({
        width: "",
        height: "",
        ctx: null,
        path: "",
        //绘图图像
        points: []
        //路径点集合
      });
      const canvasInit = () => {
        state.ctx = uni.createCanvasContext("mycanvas");
        formatAppLog("log", "at components/my_sign/my_sign.vue:40", 33333333);
        let width = uni.getSystemInfoSync().screenWidth;
        let height = uni.getSystemInfoSync().screenHeight;
        state.width = width - 80;
        state.height = height * 0.8;
        state.ctx.setLineWidth(5);
        state.ctx.setLineCap("round");
        state.ctx.setLineJoin("round");
      };
      const touchstart = (e2) => {
        if (!state.ctx) {
          canvasInit();
        }
        let startX = e2.changedTouches[0].x;
        let startY = e2.changedTouches[0].y;
        let startPoint = {
          X: startX,
          Y: startY
        };
        state.points.push(startPoint);
        state.ctx.beginPath();
      };
      const touchmove = (e2) => {
        let moveX = e2.changedTouches[0].x;
        let moveY = e2.changedTouches[0].y;
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
        formatAppLog("log", "at components/my_sign/my_sign.vue:98", "画");
        let point1 = state.points[0];
        let point2 = state.points[1];
        state.points.shift();
        state.ctx.moveTo(point1.X, point1.Y);
        state.ctx.lineTo(point2.X, point2.Y);
        state.ctx.stroke();
        state.ctx.draw(true);
      };
      const clear = () => {
        formatAppLog("log", "at components/my_sign/my_sign.vue:111", "清空");
        state.ctx.clearRect(0, 0, state.width, state.height);
        state.ctx.draw(true);
      };
      const done = () => {
        uni.canvasToTempFilePath({
          canvasId: "mycanvas",
          success: async (res) => {
            state.path = res.tempFilePath;
            formatAppLog("log", "at components/my_sign/my_sign.vue:122", state.path);
            await requestFileAdd(res.tempFilePath).then((res2) => {
              if (res2.data) {
                formatAppLog("log", "at components/my_sign/my_sign.vue:126", res2.data);
                let resObj = JSON.parse(res2.data);
                formatAppLog("log", "at components/my_sign/my_sign.vue:129", resObj);
              }
            });
          }
        });
      };
      onLoad(() => {
        formatAppLog("log", "at components/my_sign/my_sign.vue:137", 333322);
        canvasInit();
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "mySign",
            onTouchstart: _cache[0] || (_cache[0] = vue.withModifiers(() => {
            }, ["stop"])),
            onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers(() => {
            }, ["stop"])),
            onTouchend: _cache[2] || (_cache[2] = vue.withModifiers(() => {
            }, ["stop"])),
            onClick: _cache[3] || (_cache[3] = () => {
            }),
            "disable-scroll": "true"
          },
          [
            vue.createElementVNode("view", { class: "signContainer" }, [
              vue.createElementVNode("view", { class: "title" }, "请在下面输入签名："),
              vue.createCommentVNode(" 在钉钉小程序中,要将canvas-id改为id "),
              vue.createCommentVNode(` <canvas class="mycanvas" canvas-id="mycanvas" :style="{width: width+'px', height: height+'px'}" `),
              vue.createElementVNode("canvas", {
                class: "mycanvas",
                canvasId: "mycanvas",
                id: "mycanvas",
                style: vue.normalizeStyle({ width: state.width + "px", height: state.height + "px" }),
                disableScroll: "true",
                onTouchstart: vue.withModifiers(touchstart, ["stop"]),
                onTouchmove: vue.withModifiers(touchmove, ["stop"]),
                onTouchend: vue.withModifiers(touchend, ["stop"])
              }, null, 44, ["onTouchstart", "onTouchmove", "onTouchend"]),
              vue.createElementVNode("view", { class: "footer" }, [
                vue.createElementVNode("view", {
                  class: "left",
                  onClick: done
                }, "完成"),
                vue.createElementVNode("view", {
                  class: "right",
                  onClick: clear
                }, "清除")
              ])
            ])
          ],
          32
          /* HYDRATE_EVENTS */
        );
      };
    }
  };
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-09d1b2ea"], ["__file", "D:/projects/work/applet/vue3_uview_plus/components/my_sign/my_sign.vue"]]);
  const _sfc_main$l = {
    __name: "setting",
    setup(__props) {
      const store = useUserStore();
      const state = vue.reactive({
        settingType: 1,
        preFileSrc: "http://mowenxiaosheng.com.cn/open_office/?src="
      });
      const mainApplyList = [
        // {id: 1, title: '版本升级', icon: 'icon-setting-up'},
        // {id: 2, title: '密码管理', icon: 'icon-setting-pwd'},
        { id: 3, title: "修改人脸", icon: "icon-setting-face" },
        { id: 4, title: "二维码", icon: "icon-setting-scan" },
        { id: 5, title: "签名设置", icon: "icon-setting-sign" },
        { id: 6, title: "操作手册", icon: "icon-setting-pwd" }
      ];
      let pdfUrl = "http://221.214.164.186:18880/%E6%81%92%E9%80%9A%E7%89%A9%E6%B5%81%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E5%AE%89%E5%85%A8%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0%E7%94%A8%E6%88%B7%E6%93%8D%E4%BD%9C%E6%89%8B%E5%86%8C.pdf";
      const handleMainSet = (obj) => {
        formatAppLog("log", "at pages/setting/setting.vue:43", obj);
        state.settingType = obj.id;
        if (obj.id == 6)
          ;
      };
      store.updateUserInfo();
      return (_ctx, _cache) => {
        const _component_my_sign = resolveEasycom(vue.resolveDynamicComponent("my_sign"), __easycom_0$3);
        return vue.openBlock(), vue.createElementBlock("view", { class: "setting" }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(mainApplyList, (item) => {
              return vue.createElementVNode("view", {
                class: "settingItem",
                onClick: ($event) => handleMainSet(item)
              }, [
                vue.createElementVNode("img", {
                  class: "settingItemImg",
                  src: `/static/icon/${item.icon}.png`,
                  alt: ""
                }, null, 8, ["src"]),
                vue.createElementVNode(
                  "text",
                  { class: "settingItemMsg" },
                  vue.toDisplayString(item.title),
                  1
                  /* TEXT */
                )
              ], 8, ["onClick"]);
            }),
            64
            /* STABLE_FRAGMENT */
          )),
          vue.createCommentVNode(' <uni-web-view :src="pdfUrl"></uni-web-view> '),
          state.settingType == 6 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
            vue.createElementVNode("web-view", { src: vue.unref(pdfUrl) }, null, 8, ["src"]),
            vue.createCommentVNode(" <showFile :posFileSrc = 'pdfUrl'></showFile>> ")
          ])) : vue.createCommentVNode("v-if", true),
          vue.createVNode(_component_my_sign),
          vue.createTextVNode("> ")
        ]);
      };
    }
  };
  const PagesSettingSetting = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/setting/setting.vue"]]);
  const _sfc_main$k = {
    __name: "addBtn",
    emits: ["handleEvent"],
    setup(__props, { emit }) {
      const handleEvent = () => emit("handleEvent");
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          class: "addBtn",
          onClick: handleEvent
        });
      };
    }
  };
  const __easycom_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-87dd6bc8"], ["__file", "D:/projects/work/applet/vue3_uview_plus/components/addBtn/addBtn.vue"]]);
  const _sfc_main$j = {
    __name: "T_A_clapping",
    props: {
      config: ""
    },
    setup(__props) {
      const props2 = __props;
      const porpsObj = props2.config ? JSON.parse(props2.config) : {};
      useIndexStore();
      const state = vue.reactive({
        randomStatus: porpsObj.navId || 1,
        clappingInfo: [],
        clapConfirmInfo: []
      });
      vue.ref();
      const random_status = [
        { id: 1, title: "随手拍" },
        { id: 2, title: "待审核" }
      ];
      const hide_item_name = [
        { id: 1, title: "隐患描述", key: "remark" },
        { id: 2, title: "隐患地点", key: "field1" },
        { id: 3, title: "隐患单位", key: "deptName" },
        { id: 4, title: "上传人员", key: "createdUserName" },
        { id: 5, title: "上传单位", key: "createdDeptName" },
        { id: 6, title: "审核人", key: "confirmUserName" }
      ];
      const getClappingInfo = async (id) => {
        let beginTimeN = (/* @__PURE__ */ new Date()).getTime() - 7 * 24 * 60 * 60 * 1e3;
        let beginArr = formatDate(beginTimeN);
        let endArr = formatDate();
        let params = {
          page: 1,
          rows: 100,
          size: 100,
          endTime: `${endArr[0]}-${endArr[1]}`,
          beginTime: `${beginArr[0]}-${beginArr[1]}`
        };
        let info = [];
        if (id == 1) {
          const interClappingInfo = await requestClappingInfo(params).then((r2) => r2).catch((e2) => {
          });
          if (!interClappingInfo.data || !interClappingInfo.data.t) {
            return;
          }
          info = interClappingInfo.data.t.content || [];
        }
        if (id == 2) {
          const interClapConfirmInfo = await requestClapConfirmInfo(params).then((r2) => r2).catch((e2) => {
          });
          if (!interClapConfirmInfo.data || !interClapConfirmInfo.data.t) {
            return;
          }
          info = interClapConfirmInfo.data.t.content || [];
        }
        state.clappingInfo = info.map((clap) => {
          let obj = {};
          let cellRNames = hide_item_name.map((item) => {
            item.val = clap[item.key];
            return item;
          });
          obj.cellRNames = JSON.stringify(cellRNames);
          obj.cellLImg = clap.imgs;
          obj.clapId = clap.id;
          return obj;
        });
        formatAppLog("log", "at pages/T_A_clapping/T_A_clapping.vue:105", state.clappingInfo);
        formatAppLog("log", "at pages/T_A_clapping/T_A_clapping.vue:106", state.clapConfirmInfo);
      };
      const handleRandomStatus = (obj) => {
        formatAppLog("log", "at pages/T_A_clapping/T_A_clapping.vue:118", obj);
        state.randomStatus = obj.id;
        getClappingInfo(obj.id);
      };
      const addRander = () => {
        const formConfig = {};
        formConfig.domList = [
          { id: 1, title: "隐患描述", key: "remark", type: "input", ref: "clapping_remark" },
          { id: 2, title: "隐患地点", key: "field1", type: "input", ref: "clapping_field1" },
          { id: 3, title: "隐患照片", key: "imgs", type: "photo", ref: "clapping_imgs" },
          { id: 4, title: "隐患单位", key: "deptId", type: "branch", ref: "clapping_deptId" }
        ];
        formConfig.config = {
          submitFn: "requestClapSubmit",
          from: "clapping"
        };
        uni.$u.route({
          url: "/pages/comForm/comForm",
          params: {
            data: JSON.stringify(formConfig),
            title: "随手拍"
          }
        });
      };
      const clapItemClick = (obj) => {
        formatAppLog("log", "at pages/T_A_clapping/T_A_clapping.vue:153", obj);
        if (state.randomStatus == 1)
          return;
        let cellArr = JSON.parse(obj.cellRNames);
        let cellTitles = cellArr.map((item) => item.title);
        const formConfig = {};
        let domList = [
          { id: 1, title: "隐患描述", key: "remark", type: "text", ref: "clapping_review_remark" },
          { id: 2, title: "隐患地点", key: "field1", type: "text", ref: "clapping_review_field1" },
          { id: 3, title: "隐患照片", key: "imgs", type: "picture", ref: "clapping_review_imgs", val: obj.cellLImg },
          // todo
          { id: 4, title: "隐患单位", key: "deptName", type: "text", ref: "clapping_review_deptId" },
          { id: 5, title: "是否为隐患", key: "danger", type: "radio", ref: "clapping_review_danger", options: ["是", "否"] },
          { id: 6, title: "原因", key: "reason", type: "input", ref: "clapping_review_reason", show: { ref: "clapping_review_danger", val: "否" } }
          // 条件
        ];
        domList.map((item) => {
          let cellIndex = cellTitles.indexOf(item.title);
          if (cellIndex > -1) {
            item.val = cellArr[cellIndex].val;
          }
          return item;
        });
        formConfig.domList = domList;
        formConfig.config = {
          submitFn: "requestClapReSubmit",
          params: { id: obj.clapId },
          from: "clapping_review"
        };
        formatAppLog("log", "at pages/T_A_clapping/T_A_clapping.vue:185", formConfig);
        uni.$u.route({
          url: "/pages/comForm/comForm",
          params: {
            data: JSON.stringify(formConfig),
            title: "随手拍审核"
          }
        });
      };
      onShow(() => {
        getClappingInfo(state.randomStatus);
      });
      return (_ctx, _cache) => {
        const _component_cell1 = resolveEasycom(vue.resolveDynamicComponent("cell1"), __easycom_0$7);
        const _component_addBtn = resolveEasycom(vue.resolveDynamicComponent("addBtn"), __easycom_2$1);
        return vue.openBlock(), vue.createElementBlock("view", { class: "clapping" }, [
          vue.createElementVNode("view", { class: "random_status" }, [
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(random_status, (item) => {
                return vue.createElementVNode("view", {
                  key: item.id,
                  class: vue.normalizeClass({ randomBtn: true, randomBtnSe: state.hideStatus == item.id }),
                  onClick: ($event) => handleRandomStatus(item)
                }, [
                  vue.createTextVNode(
                    vue.toDisplayString(item.title) + " ",
                    1
                    /* TEXT */
                  ),
                  vue.createCommentVNode(" <view v-show = 'item.id == 1' class = 'taskHideBtnNum'>4</view> "),
                  vue.withDirectives(vue.createElementVNode(
                    "view",
                    { class: "randomBtnLine" },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vShow, state.randomStatus == item.id]
                  ])
                ], 10, ["onClick"]);
              }),
              64
              /* STABLE_FRAGMENT */
            ))
          ]),
          vue.createElementVNode("view", { class: "task_hide_main" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(state.clappingInfo, (item) => {
                return vue.openBlock(), vue.createBlock(_component_cell1, {
                  cellRNames: item.cellRNames,
                  cellLImg: item.cellLImg,
                  onHandleEvent: ($event) => clapItemClick(item)
                }, null, 8, ["cellRNames", "cellLImg", "onHandleEvent"]);
              }),
              256
              /* UNKEYED_FRAGMENT */
            ))
          ]),
          state.randomStatus == 1 ? (vue.openBlock(), vue.createBlock(_component_addBtn, {
            key: 0,
            onHandleEvent: _cache[0] || (_cache[0] = ($event) => addRander())
          })) : vue.createCommentVNode("v-if", true)
        ]);
      };
    }
  };
  const PagesT_A_clappingT_A_clapping = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/T_A_clapping/T_A_clapping.vue"]]);
  const _sfc_main$i = {
    __name: "T_A_acciUp",
    props: {
      config: ""
    },
    setup(__props) {
      const props2 = __props;
      const porpsObj = props2.config ? JSON.parse(props2.config) : {};
      useIndexStore();
      const state = vue.reactive({
        acciUpSept: porpsObj.navId || 1
      });
      const mainUpList = [
        { id: 1, title: "事故报告", key: "acciPage" },
        { id: 2, title: "待确认", key: "acciConfirm" },
        { id: 3, title: "事故上报", key: "acciUp" },
        { id: 4, title: "事故处理", key: "acciHandle" }
      ];
      const accidHandleame = [
        { id: 1, title: "事故描述", key: "remark" },
        { id: 2, title: "发生时间", key: "atTime" },
        { id: 3, title: "上报人", key: "createdUserName" },
        { id: 4, title: "上报时间", key: "createdDate" }
      ];
      const getAcciInfo = async (navInfo = mainUpList[0]) => {
        formatAppLog("log", "at pages/T_A_acciUp/T_A_acciUp.vue:70", navInfo);
        let beginTimeN = (/* @__PURE__ */ new Date()).getTime() - 7 * 24 * 60 * 60 * 1e3;
        let beginArr = formatDate(beginTimeN);
        let endArr = formatDate();
        let params = {
          page: 1,
          rows: 100,
          size: 100,
          endTime: `${endArr[0]}-${endArr[1]}`,
          beginTime: `${beginArr[0]}-${beginArr[1]}`
        };
        let interInfo = {};
        let acciItemList = accidHandleame;
        if (navInfo.id == 1) {
          interInfo = await requestAcciPageInfo(params).then((r2) => r2).catch((e2) => {
          });
          acciItemList.push({ id: 5, title: "确认人", key: "assignee" });
        }
        if (navInfo.id == 2) {
          interInfo = await requestAcciConfirmInfo(params).then((r2) => r2).catch((e2) => {
          });
        }
        if (navInfo.id == 3) {
          interInfo = await requestAcciReportInfo(params).then((r2) => r2).catch((e2) => {
          });
        }
        if (navInfo.id == 4) {
          interInfo = await requestAcciHandleInfo(params).then((r2) => r2).catch((e2) => {
          });
        }
        if (!interInfo.data || !interInfo.data.t) {
          return;
        }
        let info = interInfo.data.t.content || [];
        state[navInfo.key] = info.map((clap) => {
          let obj = {};
          let cellRNames = acciItemList.map((item) => {
            item.val = clap[item.key];
            return item;
          });
          obj.cellRNames = JSON.stringify(cellRNames);
          obj.cellLImg = clap.file1;
          obj.step = clap.step || "";
          obj.acciId = clap.id || "";
          return obj;
        });
        formatAppLog("log", "at pages/T_A_acciUp/T_A_acciUp.vue:115", info);
      };
      const handleAcciUpSept = (obj) => {
        state.acciUpSept = obj.id;
        getAcciInfo(obj);
      };
      const addAccident = () => {
        formatAppLog("log", "at pages/T_A_acciUp/T_A_acciUp.vue:134", 3333);
        const formConfig = {};
        formConfig.domList = [
          { id: 1, title: "发生时间", key: "atTime", type: "time", ref: "add_acci_time" },
          { id: 2, title: "事故描述", key: "remarm", type: "input", ref: "add_acci_msg" },
          { id: 3, title: "事故照片", key: "file1", type: "photo", ref: "add_acci_pic" },
          { id: 4, title: "语音录入", key: "file2", type: "record", ref: "add_acci_record" }
          //
        ];
        formConfig.config = {
          submitFn: "requestAddAcciSub",
          from: "add_acci"
        };
        uni.$u.route({
          url: "/pages/comForm/comForm",
          params: {
            data: JSON.stringify(formConfig),
            title: "事故上报"
          }
        });
      };
      const handleConfirm = (obj) => {
        formatAppLog("log", "at pages/T_A_acciUp/T_A_acciUp.vue:158", obj);
        const formConfig = {};
        let cellArr = JSON.parse(obj.cellRNames);
        let cellTitles = cellArr.map((item) => item.title);
        let domList = [];
        let toFormConfig = {};
        let title = "";
        if (state.acciUpSept == 2) {
          domList = [
            { id: 1, title: "发生时间", key: "atTime", type: "text", ref: "acci_at_time" },
            { id: 2, title: "事故描述", key: "remark", type: "text", ref: "acci_at_remark" },
            { id: 3, title: "事故照片", key: "imgs", type: "picture", ref: "acci_at_imgs", val: obj.cellLImg },
            // {id: 4, title: '语音', key: 'deptId', type: 'text',ref: "clapping_review_deptId"},
            { id: 5, title: "责任单位", key: "deptId", type: "branch", ref: "acci_createdDeptName" },
            { id: 6, title: "是否有效", key: "isOk", type: "radio", ref: "acci_isUse", options: ["是", "否"] },
            { id: 7, title: "是否上报", key: "isReport", type: "radio", ref: "acci_isRes", options: ["是", "否"] }
          ];
          toFormConfig = {
            submitFn: "requestAcciReSubmit",
            params: { id: obj.acciId },
            from: "acci_confirm"
          };
          title = "事故报告确认";
        }
        if (state.acciUpSept == 3) {
          domList = [
            { id: 1, title: "发生时间", key: "atTime", type: "text", ref: "acci_report_time" },
            { id: 2, title: "事故描述", key: "remark", type: "input", ref: "acci_report_remark" },
            { id: 3, title: "事故照片", key: "file1", type: "picture", ref: "acci_report_imgs", val: obj.cellLImg },
            { id: 4, title: "语音录入", key: "file2", type: "record", ref: "acci_report_record" },
            { id: 5, title: "事故处理员", key: "handlerId", type: "user", ref: "acci_report_handlerId" }
          ];
          toFormConfig = {
            submitFn: "requestAcciReportSubmit",
            params: { id: obj.acciId },
            from: "acci_report"
          };
          title = "事故上报";
        }
        if (state.acciUpSept == 4) {
          domList = [
            { id: 1, title: "发生时间", key: "atTime", type: "text", ref: "acci_handle_time" },
            { id: 2, title: "事故描述", key: "remark", type: "text", ref: "acci_handle_remark" },
            { id: 3, title: "事故照片", key: "file1", type: "picture", ref: "acci_handle_imgs", val: obj.cellLImg },
            { id: 4, title: "语音录入", key: "file2", type: "record", ref: "acci_handle_record" },
            { id: 5, title: "是否为事故", key: "isOk", type: "radio", ref: "acci_handle_handlerId", options: ["是", "否"] }
          ];
          toFormConfig = {
            submitFn: "requestAcciHandleSubmit",
            params: { id: obj.acciId },
            from: "acci_handle"
          };
          title = "事故处理";
        }
        domList.map((item) => {
          let cellIndex = cellTitles.indexOf(item.title);
          if (cellIndex > -1) {
            item.val = cellArr[cellIndex].val;
          }
          return item;
        });
        formConfig.domList = domList;
        formConfig.config = toFormConfig;
        formatAppLog("log", "at pages/T_A_acciUp/T_A_acciUp.vue:239", formConfig);
        uni.$u.route({
          url: "/pages/comForm/comForm",
          params: {
            data: JSON.stringify(formConfig),
            title
          }
        });
      };
      onShow(() => {
        getAcciInfo(mainUpList[state.acciUpSept - 1]);
      });
      return (_ctx, _cache) => {
        const _component_cell1 = resolveEasycom(vue.resolveDynamicComponent("cell1"), __easycom_0$7);
        const _component_addBtn = resolveEasycom(vue.resolveDynamicComponent("addBtn"), __easycom_2$1);
        return vue.openBlock(), vue.createElementBlock("view", { class: "applyAcciUp" }, [
          vue.createElementVNode("view", { class: "applyAcciUpTop" }, [
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(mainUpList, (item) => {
                return vue.createElementVNode("view", {
                  key: item.id,
                  class: vue.normalizeClass({ acciUpBtn: true, acciUpBtnSe: state.acciUpSept == item.id }),
                  onClick: ($event) => handleAcciUpSept(item)
                }, [
                  vue.createTextVNode(
                    vue.toDisplayString(item.title) + " ",
                    1
                    /* TEXT */
                  ),
                  vue.withDirectives(vue.createElementVNode(
                    "view",
                    { class: "acciUpBtnLine" },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vShow, state.acciUpSept == item.id]
                  ])
                ], 10, ["onClick"]);
              }),
              64
              /* STABLE_FRAGMENT */
            ))
          ]),
          vue.withDirectives(vue.createElementVNode(
            "view",
            { class: "applyAcciUpItem applyAcciUp1" },
            [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(state.acciPage, (item) => {
                  return vue.openBlock(), vue.createBlock(_component_cell1, {
                    cellRNames: item.cellRNames,
                    cellLImg: item.cellLImg,
                    step: item.step
                  }, null, 8, ["cellRNames", "cellLImg", "step"]);
                }),
                256
                /* UNKEYED_FRAGMENT */
              )),
              vue.createVNode(_component_addBtn, {
                onHandleEvent: _cache[0] || (_cache[0] = ($event) => addAccident())
              })
            ],
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, state.acciUpSept == 1]
          ]),
          vue.withDirectives(vue.createElementVNode(
            "view",
            { class: "applyAcciUpItem applyAcciUp2" },
            [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(state.acciConfirm, (item) => {
                  return vue.openBlock(), vue.createBlock(_component_cell1, {
                    cellRNames: item.cellRNames,
                    cellLImg: item.cellLImg,
                    step: item.step,
                    onHandleEvent: ($event) => handleConfirm(item)
                  }, null, 8, ["cellRNames", "cellLImg", "step", "onHandleEvent"]);
                }),
                256
                /* UNKEYED_FRAGMENT */
              ))
            ],
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, state.acciUpSept == 2]
          ]),
          vue.withDirectives(vue.createElementVNode(
            "view",
            { class: "applyAcciUpItem applyAcciUp3" },
            [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(state.acciUp, (item) => {
                  return vue.openBlock(), vue.createBlock(_component_cell1, {
                    cellRNames: item.cellRNames,
                    cellLImg: item.cellLImg,
                    step: item.step,
                    onHandleEvent: ($event) => handleConfirm(item)
                  }, null, 8, ["cellRNames", "cellLImg", "step", "onHandleEvent"]);
                }),
                256
                /* UNKEYED_FRAGMENT */
              ))
            ],
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, state.acciUpSept == 3]
          ]),
          vue.withDirectives(vue.createElementVNode(
            "view",
            { class: "applyAcciUpItem applyAcciUp4" },
            [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(state.acciHandle, (item) => {
                  return vue.openBlock(), vue.createBlock(_component_cell1, {
                    cellRNames: item.cellRNames,
                    cellLImg: item.cellLImg,
                    step: item.step,
                    onHandleEvent: ($event) => handleConfirm(item)
                  }, null, 8, ["cellRNames", "cellLImg", "step", "onHandleEvent"]);
                }),
                256
                /* UNKEYED_FRAGMENT */
              ))
            ],
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, state.acciUpSept == 4]
          ])
        ]);
      };
    }
  };
  const PagesT_A_acciUpT_A_acciUp = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/T_A_acciUp/T_A_acciUp.vue"]]);
  const _sfc_main$h = {
    __name: "cell2",
    props: {
      cellConfig: {}
    },
    emits: ["handleEvent"],
    setup(__props, { emit }) {
      const props2 = __props;
      const cellRNamesArr = props2.cellConfig && props2.cellConfig.cellRNames ? JSON.parse(props2.cellConfig.cellRNames) : [];
      vue.reactive({
        imgPopShow: false
        // cellRNames:[],
        // cellLImg: '/static/icon/top-bg.png',
      });
      const handleEvent = () => {
        formatAppLog("log", "at components/cell2/cell2.vue:44", 2222222);
        emit("handleEvent");
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          class: "com_cell2",
          onClick: _cache[0] || (_cache[0] = ($event) => handleEvent())
        }, [
          vue.createElementVNode("view", { class: "cell2L" }, [
            vue.createElementVNode(
              "view",
              { class: "cell2LItem" },
              vue.toDisplayString(props2.cellConfig.cellLT || ""),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "view",
              { class: "cell2LItem" },
              vue.toDisplayString(props2.cellConfig.cellLB || ""),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "cell2R" }, [
            vue.createElementVNode("view", { class: "cell2RT" }, [
              vue.createElementVNode("text", null, "审核人："),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(props2.cellConfig.clapRT || ""),
                1
                /* TEXT */
              )
            ]),
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(vue.unref(cellRNamesArr), (item) => {
                return vue.openBlock(), vue.createElementBlock("view", { class: "cell2RItem" }, [
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString(item.title) + ":",
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString(item.val),
                    1
                    /* TEXT */
                  )
                ]);
              }),
              256
              /* UNKEYED_FRAGMENT */
            ))
          ]),
          vue.createElementVNode(
            "view",
            { class: "cell2RBlock" },
            vue.toDisplayString(props2.cellConfig.status || ""),
            1
            /* TEXT */
          )
        ]);
      };
    }
  };
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-2f830902"], ["__file", "D:/projects/work/applet/vue3_uview_plus/components/cell2/cell2.vue"]]);
  const docTypes = [
    { name: "动火安全作业证", key: "DH" },
    { name: "临电安全作业证", key: "LD" },
    { name: "受限空间安全作业证", key: "SX" },
    { name: "高处安全作业证", key: "GC" },
    { name: "盲板安全作业证", key: "MB" },
    { name: "动土安全作业证", key: "DT" },
    { name: "吊装安全作业证", key: "DZ" },
    { name: "断路安全作业证", key: "DL" }
  ];
  const _sfc_main$g = {
    __name: "T_A_work",
    setup(__props) {
      useIndexStore();
      const state = vue.reactive({
        // taskType: 1,
        workStatusId: 1,
        mainInfo: []
      });
      const workStatusNav = [
        { id: 1, name: "我的活动" },
        {
          id: 2,
          name: "活动审核",
          badge: {
            // isDot: true,
            // value: 5,
          }
        },
        { id: 3, name: "待建作业" },
        { id: 4, name: "我的作业" },
        { id: 5, name: "待审作业" },
        { id: 6, name: "审核历史" }
      ];
      const inters = [
        requestWorkMyActInfo,
        requestWorkPendingInfo,
        requestWorkStaysInfo,
        requestWorkDocMyInfo,
        requestWorkDocPendInfo,
        requestWorkdoHisInfo
      ];
      const actCellItems = [
        { id: 1, title: "作业内容", key: "content" },
        { id: 2, title: "作业地点", key: "place" },
        { id: 3, title: "预计开始时间", key: "beginTime" },
        { id: 4, title: "预计结束时间", key: "endTime" }
      ];
      const getClappingInfo = async (id = 1) => {
        let beginTimeN = (/* @__PURE__ */ new Date()).getTime() - 7 * 24 * 60 * 60 * 1e3;
        let beginArr = formatDate(beginTimeN);
        let endArr = formatDate();
        let params = {
          page: 1,
          rows: 20,
          size: 100,
          endTime: `${endArr[0]}-${endArr[1]}`,
          beginTime: `${beginArr[0]}-${beginArr[1]}`
        };
        formatAppLog("log", "at pages/T_A_work/T_A_work.vue:128", params);
        let interFn = inters[id - 1];
        const interClapConfirmInfo = await interFn(params).then((r2) => r2).catch((e2) => {
        });
        if (!interClapConfirmInfo.data || !interClapConfirmInfo.data.t) {
          return;
        }
        let info = interClapConfirmInfo.data.t.content || [];
        formatAppLog("log", "at pages/T_A_work/T_A_work.vue:135", info);
        formatAppLog("log", "at pages/T_A_work/T_A_work.vue:136", 323232);
        state.mainInfo = info.map((clap) => {
          let obj = {};
          let cellRNames = actCellItems.map((item) => {
            item.val = clap[item.key];
            if (item.key.includes("Time")) {
              let arr = formatDate(item.val);
              item.val = `${arr[0]}-${arr[1]} ${arr[3]}`;
            }
            return item;
          });
          obj.cellRNames = JSON.stringify(cellRNames);
          obj.cellLT = clap.dept.name;
          obj.cellLB = clap.user.ushow;
          obj.clapRT = clap.checker.ushow;
          obj.docs = clap.docs;
          obj.status = clap.status;
          return obj;
        });
      };
      getClappingInfo();
      const changeWorkStatus = (obj) => {
        formatAppLog("log", "at pages/T_A_work/T_A_work.vue:160", obj);
        state.workStatusId = obj.id;
        getClappingInfo(obj.id);
      };
      const handleCell2 = (obj) => {
        formatAppLog("log", "at pages/T_A_work/T_A_work.vue:173", obj);
      };
      const addRander = () => {
        const user = GET_STORAGE("USER");
        formatAppLog("log", "at pages/T_A_work/T_A_work.vue:179", user);
        const myDept = { name: user.deptName, id: user.deptId };
        const myName = { name: user.ushow, id: user.id };
        const formConfig = {};
        formConfig.domList = [
          { id: 1, title: "申请单位", key: "actDeptId", type: "branch", ref: "work_creat_act_dept", val: myDept },
          { id: 2, title: "申请人", key: "actUserId", type: "userById", ref: "work_creat_act_user", val: myName },
          { id: 3, title: "作业内容", key: "content", type: "input", ref: "work_creat_content" },
          { id: 4, title: "作业地点", key: "place", type: "input", ref: "work_creat_place" },
          { id: 5, title: "作业票办理人", key: "userId", type: "userById", ref: "work_creat_handle" },
          { id: 6, title: " 审核人", key: "checkerId", type: "userById", ref: "work_creat_checker" },
          { id: 7, title: "作业类型", key: "docs", type: "checkBox", ref: "work_creat_docs", options: docTypes },
          { id: 8, title: "预计开始时间", key: "beginTime", type: "time", ref: "work_creat_begin" },
          { id: 9, title: "预计完成时间", key: "endTime", type: "time", ref: "work_creat_end" }
        ];
        formConfig.config = {
          submitFn: "requestWorkCreat",
          from: "work_creat"
        };
        uni.$u.route({
          url: "/pages/comForm/comForm",
          params: {
            data: JSON.stringify(formConfig),
            title: "新增作业活动"
          }
        });
      };
      return (_ctx, _cache) => {
        const _component_u_tabs = resolveEasycom(vue.resolveDynamicComponent("u-tabs"), __easycom_0$4);
        const _component_cell2 = resolveEasycom(vue.resolveDynamicComponent("cell2"), __easycom_1$1);
        const _component_addBtn = resolveEasycom(vue.resolveDynamicComponent("addBtn"), __easycom_2$1);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode("view", { class: "applyWork" }, [
              vue.createElementVNode("view", { class: "applyWorkTop" }, [
                vue.createCommentVNode(' <u-sticky bgColor="#fff"> '),
                vue.createVNode(_component_u_tabs, {
                  list: workStatusNav,
                  lineWidth: "40",
                  lineHeight: "4",
                  activeStyle: {
                    color: "#303133",
                    fontWeight: "bold",
                    transform: "scale(1.05)"
                  },
                  inactiveStyle: {
                    color: "#606266",
                    transform: "scale(1)"
                  },
                  itemStyle: "padding-left: 30rpx; padding-right: 30rpx; height: 96rpx;",
                  onClick: changeWorkStatus
                }, null, 8, ["activeStyle", "inactiveStyle"]),
                vue.createCommentVNode(" </u-sticky> ")
              ]),
              vue.withDirectives(vue.createElementVNode(
                "view",
                { class: "applyWorkBase applyWorkStatus1" },
                [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(state.mainInfo, (item) => {
                      return vue.openBlock(), vue.createBlock(_component_cell2, {
                        cellConfig: item,
                        onHandleEvent: ($event) => handleCell2(item)
                      }, null, 8, ["cellConfig", "onHandleEvent"]);
                    }),
                    256
                    /* UNKEYED_FRAGMENT */
                  )),
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(state.mainInfo, (item) => {
                      return vue.openBlock(), vue.createBlock(_component_cell2, {
                        cellConfig: item,
                        onHandleEvent: ($event) => handleCell2(item)
                      }, null, 8, ["cellConfig", "onHandleEvent"]);
                    }),
                    256
                    /* UNKEYED_FRAGMENT */
                  ))
                ],
                512
                /* NEED_PATCH */
              ), [
                [vue.vShow, state.workStatusId == 1]
              ]),
              vue.withDirectives(vue.createElementVNode(
                "view",
                null,
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vShow, state.workStatusId == 2]
              ]),
              vue.withDirectives(vue.createElementVNode(
                "view",
                null,
                [
                  vue.createCommentVNode(" 333 ")
                ],
                512
                /* NEED_PATCH */
              ), [
                [vue.vShow, state.workStatusId == 3]
              ]),
              vue.withDirectives(vue.createElementVNode(
                "view",
                null,
                [
                  vue.createCommentVNode(" 444 ")
                ],
                512
                /* NEED_PATCH */
              ), [
                [vue.vShow, state.workStatusId == 4]
              ]),
              vue.withDirectives(vue.createElementVNode(
                "view",
                null,
                [
                  vue.createCommentVNode(" 555 ")
                ],
                512
                /* NEED_PATCH */
              ), [
                [vue.vShow, state.workStatusId == 5]
              ]),
              vue.withDirectives(vue.createElementVNode(
                "view",
                null,
                [
                  vue.createCommentVNode(" 6666 ")
                ],
                512
                /* NEED_PATCH */
              ), [
                [vue.vShow, state.workStatusId == 6]
              ])
            ]),
            state.workStatusId == 1 ? (vue.openBlock(), vue.createBlock(_component_addBtn, {
              key: 0,
              onHandleEvent: _cache[0] || (_cache[0] = ($event) => addRander())
            })) : vue.createCommentVNode("v-if", true)
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const PagesT_A_workT_A_work = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/T_A_work/T_A_work.vue"]]);
  const props$5 = {
    props: {
      // 搜索框形状，round-圆形，square-方形
      shape: {
        type: String,
        default: props$o.search.shape
      },
      // 搜索框背景色，默认值#f2f2f2
      bgColor: {
        type: String,
        default: props$o.search.bgColor
      },
      // 占位提示文字
      placeholder: {
        type: String,
        default: props$o.search.placeholder
      },
      // 是否启用清除控件
      clearabled: {
        type: Boolean,
        default: props$o.search.clearabled
      },
      // 是否自动聚焦
      focus: {
        type: Boolean,
        default: props$o.search.focus
      },
      // 是否在搜索框右侧显示取消按钮
      showAction: {
        type: Boolean,
        default: props$o.search.showAction
      },
      // 右边控件的样式
      actionStyle: {
        type: Object,
        default: props$o.search.actionStyle
      },
      // 取消按钮文字
      actionText: {
        type: String,
        default: props$o.search.actionText
      },
      // 输入框内容对齐方式，可选值为 left|center|right
      inputAlign: {
        type: String,
        default: props$o.search.inputAlign
      },
      // input输入框的样式，可以定义文字颜色，大小等，对象形式
      inputStyle: {
        type: Object,
        default: props$o.search.inputStyle
      },
      // 是否启用输入框
      disabled: {
        type: Boolean,
        default: props$o.search.disabled
      },
      // 边框颜色
      borderColor: {
        type: String,
        default: props$o.search.borderColor
      },
      // 搜索图标的颜色，默认同输入框字体颜色
      searchIconColor: {
        type: String,
        default: props$o.search.searchIconColor
      },
      // 输入框字体颜色
      color: {
        type: String,
        default: props$o.search.color
      },
      // placeholder的颜色
      placeholderColor: {
        type: String,
        default: props$o.search.placeholderColor
      },
      // 左边输入框的图标，可以为uView图标名称或图片路径
      searchIcon: {
        type: String,
        default: props$o.search.searchIcon
      },
      searchIconSize: {
        type: [Number, String],
        default: props$o.search.searchIconSize
      },
      // 组件与其他上下左右元素之间的距离，带单位的字符串形式，如"30px"、"30px 20px"等写法
      margin: {
        type: String,
        default: props$o.search.margin
      },
      // 开启showAction时，是否在input获取焦点时才显示
      animation: {
        type: Boolean,
        default: props$o.search.animation
      },
      // 输入框的初始化内容
      modelValue: {
        type: String,
        default: props$o.search.value
      },
      value: {
        type: String,
        default: props$o.search.value
      },
      // 输入框最大能输入的长度，-1为不限制长度(来自uniapp文档)
      maxlength: {
        type: [String, Number],
        default: props$o.search.maxlength
      },
      // 搜索框高度，单位px
      height: {
        type: [String, Number],
        default: props$o.search.height
      },
      // 搜索框左侧文本
      label: {
        type: [String, Number, null],
        default: props$o.search.label
      }
    }
  };
  const _sfc_main$f = {
    name: "u-search",
    mixins: [mpMixin, mixin, props$5],
    data() {
      return {
        keyword: "",
        showClear: false,
        // 是否显示右边的清除图标
        show: false,
        // 标记input当前状态是否处于聚焦中，如果是，才会显示右侧的清除控件
        focused: this.focus
        // 绑定输入框的值
        // inputValue: this.value
      };
    },
    watch: {
      keyword(nVal) {
        this.$emit("update:modelValue", nVal);
        this.$emit("change", nVal);
      },
      modelValue: {
        immediate: true,
        handler(nVal) {
          this.keyword = nVal;
        }
      }
    },
    computed: {
      showActionBtn() {
        return !this.animation && this.showAction;
      }
    },
    emits: ["clear", "search", "custom", "focus", "blur", "click", "clickIcon", "update:modelValue", "change"],
    methods: {
      // 目前HX2.6.9 v-model双向绑定无效，故监听input事件获取输入框内容的变化
      inputChange(e2) {
        this.keyword = e2.detail.value;
      },
      // 清空输入
      // 也可以作为用户通过this.$refs形式调用清空输入框内容
      clear() {
        this.keyword = "";
        this.$nextTick(() => {
          this.$emit("clear");
        });
      },
      // 确定搜索
      search(e2) {
        this.$emit("search", e2.detail.value);
        try {
          uni.hideKeyboard();
        } catch (e3) {
        }
      },
      // 点击右边自定义按钮的事件
      custom() {
        this.$emit("custom", this.keyword);
        try {
          uni.hideKeyboard();
        } catch (e2) {
        }
      },
      // 获取焦点
      getFocus() {
        this.focused = true;
        if (this.animation && this.showAction)
          this.show = true;
        this.$emit("focus", this.keyword);
      },
      // 失去焦点
      blur() {
        setTimeout(() => {
          this.focused = false;
        }, 100);
        this.show = false;
        this.$emit("blur", this.keyword);
      },
      // 点击搜索框，只有disabled=true时才发出事件，因为禁止了输入，意味着是想跳转真正的搜索页
      clickHandler() {
        if (this.disabled)
          this.$emit("click");
      },
      // 点击左边图标
      clickIcon() {
        this.$emit("clickIcon");
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$b);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "u-search",
        onClick: _cache[6] || (_cache[6] = (...args) => $options.clickHandler && $options.clickHandler(...args)),
        style: vue.normalizeStyle([{
          margin: _ctx.margin
        }, _ctx.$u.addStyle(_ctx.customStyle)])
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: "u-search__content",
            style: vue.normalizeStyle({
              backgroundColor: _ctx.bgColor,
              borderRadius: _ctx.shape == "round" ? "100px" : "4px",
              borderColor: _ctx.borderColor
            })
          },
          [
            _ctx.$slots.label || _ctx.label !== null ? vue.renderSlot(_ctx.$slots, "label", { key: 0 }, () => [
              vue.createElementVNode(
                "text",
                { class: "u-search__content__label" },
                vue.toDisplayString(_ctx.label),
                1
                /* TEXT */
              )
            ], true) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("view", { class: "u-search__content__icon" }, [
              vue.createVNode(_component_u_icon, {
                onClick: $options.clickIcon,
                size: _ctx.searchIconSize,
                name: _ctx.searchIcon,
                color: _ctx.searchIconColor ? _ctx.searchIconColor : _ctx.color
              }, null, 8, ["onClick", "size", "name", "color"])
            ]),
            vue.createElementVNode("input", {
              "confirm-type": "search",
              onBlur: _cache[0] || (_cache[0] = (...args) => $options.blur && $options.blur(...args)),
              value: $data.keyword,
              onConfirm: _cache[1] || (_cache[1] = (...args) => $options.search && $options.search(...args)),
              onInput: _cache[2] || (_cache[2] = (...args) => $options.inputChange && $options.inputChange(...args)),
              disabled: _ctx.disabled,
              onFocus: _cache[3] || (_cache[3] = (...args) => $options.getFocus && $options.getFocus(...args)),
              focus: _ctx.focus,
              maxlength: _ctx.maxlength,
              "placeholder-class": "u-search__content__input--placeholder",
              placeholder: _ctx.placeholder,
              "placeholder-style": `color: ${_ctx.placeholderColor}`,
              class: "u-search__content__input",
              type: "text",
              style: vue.normalizeStyle([{
                textAlign: _ctx.inputAlign,
                color: _ctx.color,
                backgroundColor: _ctx.bgColor,
                height: _ctx.$u.addUnit(_ctx.height)
              }, _ctx.inputStyle])
            }, null, 44, ["value", "disabled", "focus", "maxlength", "placeholder", "placeholder-style"]),
            $data.keyword && _ctx.clearabled && $data.focused ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "u-search__content__icon u-search__content__close",
              onClick: _cache[4] || (_cache[4] = (...args) => $options.clear && $options.clear(...args))
            }, [
              vue.createVNode(_component_u_icon, {
                name: "close",
                size: "11",
                color: "#ffffff",
                customStyle: "line-height: 12px"
              })
            ])) : vue.createCommentVNode("v-if", true)
          ],
          4
          /* STYLE */
        ),
        vue.createElementVNode(
          "text",
          {
            style: vue.normalizeStyle([_ctx.actionStyle]),
            class: vue.normalizeClass(["u-search__action", [($options.showActionBtn || $data.show) && "u-search__action--active"]]),
            onClick: _cache[5] || (_cache[5] = vue.withModifiers((...args) => $options.custom && $options.custom(...args), ["stop", "prevent"]))
          },
          vue.toDisplayString(_ctx.actionText),
          7
          /* TEXT, CLASS, STYLE */
        )
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$5], ["__scopeId", "data-v-e082a34a"], ["__file", "D:/projects/work/applet/vue3_uview_plus/uni_modules/uview-plus/components/u-search/u-search.vue"]]);
  const _sfc_main$e = {
    __name: "comUserList",
    props: {
      callData: ""
    },
    emits: ["handleHeaderNav"],
    setup(__props, { emit }) {
      const props2 = __props;
      const store = useIndexStore();
      const state = vue.reactive({
        userListShow: false,
        indexList: [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z"
        ],
        itemArr: [
          [{
            "deptName": "安全环保部",
            "id": 101,
            "job": "安全管理员",
            "name": "李晓鹏",
            "phone": "13306466080",
            "post": "安全环保部",
            "shortName": "L"
          }, {
            "deptName": "安全环保部",
            "id": 101,
            "job": "安全管理员",
            "name": "李晓鹏",
            "phone": "13306466080",
            "post": "安全环保部",
            "shortName": "L"
          }, {
            "deptName": "安全环保部",
            "id": 101,
            "job": "安全管理员",
            "name": "李晓鹏",
            "phone": "13306466080",
            "post": "安全环保部",
            "shortName": "L"
          }],
          [{
            "deptName": "安全环保部",
            "id": 101,
            "job": "安全管理员",
            "name": "李晓鹏",
            "phone": "13306466080",
            "post": "安全环保部",
            "shortName": "B"
          }, {
            "deptName": "安全环保部",
            "id": 101,
            "job": "安全管理员",
            "name": "李晓鹏",
            "phone": "13306466080",
            "post": "安全环保部",
            "shortName": "L"
          }, {
            "deptName": "安全环保部",
            "id": 101,
            "job": "安全管理员",
            "name": "李晓鹏",
            "phone": "13306466080",
            "post": "安全环保部",
            "shortName": "L"
          }]
        ],
        searchUserStr: "",
        nodes: {}
      });
      const getUsersList = async (id) => {
        await store.setAllStaff();
        formatNodes();
      };
      getUsersList();
      const formatNodes = (filterObj = {}) => {
        let nodeObj = {};
        let showStaff = store.allStaff;
        if (filterObj.name) {
          showStaff = showStaff.filter((item) => item.name.includes(filterObj.name));
        }
        if (filterObj.deptName) {
          showStaff = showStaff.filter((item) => item.deptName.includes(filterObj.deptName));
        }
        showStaff.map((item) => {
          nodeObj[item.shortName] ? nodeObj[item.shortName].push(item) : nodeObj[item.shortName] = [item];
        });
        state.indexList = Object.keys(nodeObj).sort();
        state.nodes = state.indexList.map((key) => nodeObj[key]);
      };
      const handleUser = (obj) => {
        obj.callData = JSON.parse(props2.callData);
        uni.$emit("selectStaff", JSON.stringify(obj));
        uni.$u.route({
          type: "back"
        });
      };
      const searchUser = () => {
        formatNodes({ name: state.searchUserStr });
      };
      return (_ctx, _cache) => {
        const _component_u_search = resolveEasycom(vue.resolveDynamicComponent("u-search"), __easycom_0$2);
        const _component_u_index_anchor = resolveEasycom(vue.resolveDynamicComponent("u-index-anchor"), __easycom_1$3);
        const _component_u_index_item = resolveEasycom(vue.resolveDynamicComponent("u-index-item"), __easycom_2$2);
        const _component_u_index_list = resolveEasycom(vue.resolveDynamicComponent("u-index-list"), __easycom_3$1);
        return vue.openBlock(), vue.createElementBlock("view", {
          class: "userList",
          id: "userList"
        }, [
          vue.createElementVNode("view", { class: "userListTop" }, [
            vue.createVNode(_component_u_search, {
              placeholder: "请输入姓名搜索",
              modelValue: state.searchUserStr,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => state.searchUserStr = $event),
              showAction: false,
              bgColor: "#fff",
              onChange: _cache[1] || (_cache[1] = ($event) => searchUser())
            }, null, 8, ["modelValue"])
          ]),
          vue.createVNode(_component_u_index_list, {
            "index-list": state.indexList
          }, {
            default: vue.withCtx(() => [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(state.nodes, (item, index2) => {
                  return vue.openBlock(), vue.createBlock(
                    _component_u_index_item,
                    null,
                    {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_u_index_anchor, {
                          text: state.indexList[index2],
                          bgColor: "#F2F3F8"
                        }, null, 8, ["text"]),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList(item, (cell, index3) => {
                            return vue.openBlock(), vue.createElementBlock("view", {
                              class: "list_cell",
                              onClick: ($event) => handleUser(cell)
                            }, [
                              vue.createCommentVNode(" {{cell}} "),
                              vue.createElementVNode(
                                "view",
                                { class: "list_cell_name" },
                                vue.toDisplayString(cell.name),
                                1
                                /* TEXT */
                              ),
                              vue.createElementVNode("view", { class: "list_cell_dept" }, [
                                vue.createElementVNode(
                                  "text",
                                  { class: "list_cell_dept_item" },
                                  vue.toDisplayString(cell.deptName),
                                  1
                                  /* TEXT */
                                ),
                                vue.createElementVNode(
                                  "text",
                                  { class: "list_cell_dept_item" },
                                  vue.toDisplayString(cell.post),
                                  1
                                  /* TEXT */
                                ),
                                vue.createElementVNode(
                                  "text",
                                  { class: "list_cell_dept_item" },
                                  vue.toDisplayString(cell.job),
                                  1
                                  /* TEXT */
                                )
                              ])
                            ], 8, ["onClick"]);
                          }),
                          256
                          /* UNKEYED_FRAGMENT */
                        ))
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  );
                }),
                256
                /* UNKEYED_FRAGMENT */
              ))
            ]),
            _: 1
            /* STABLE */
          }, 8, ["index-list"])
        ]);
      };
    }
  };
  const PagesComUserListComUserList = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-b4ac0d12"], ["__file", "D:/projects/work/applet/vue3_uview_plus/pages/comUserList/comUserList.vue"]]);
  const _sfc_main$d = {
    __name: "index",
    setup(__props) {
      useIndexStore();
      vue.reactive({
        // taskType: 1,
      });
      const mainApplyList = [
        { id: 1, title: "版本升级", icon: "icon-setting-up" },
        { id: 2, title: "密码管理", icon: "icon-setting-pwd" },
        { id: 3, title: "修改人脸", icon: "icon-setting-face" },
        { id: 4, title: "二维码", icon: "icon-setting-scan" },
        { id: 5, title: "签名设置", icon: "icon-setting-sign" }
      ];
      const handleMainSet = (obj) => {
        formatAppLog("log", "at pages/index/index.vue:32", obj);
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "setting" }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(mainApplyList, (item) => {
              return vue.createElementVNode("view", {
                class: "settingItem",
                onClick: ($event) => handleMainSet(item)
              }, [
                vue.createElementVNode("img", {
                  class: "settingItemImg",
                  src: `/static/icon/${item.icon}.png`,
                  alt: ""
                }, null, 8, ["src"]),
                vue.createElementVNode(
                  "text",
                  { class: "settingItemMsg" },
                  vue.toDisplayString(item.title),
                  1
                  /* TEXT */
                )
              ], 8, ["onClick"]);
            }),
            64
            /* STABLE_FRAGMENT */
          ))
        ]);
      };
    }
  };
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/index/index.vue"]]);
  const props$4 = {
    props: {
      // radio的名称
      name: {
        type: [String, Number, Boolean],
        default: props$o.radio.name
      },
      // 形状，square为方形，circle为圆型
      shape: {
        type: String,
        default: props$o.radio.shape
      },
      // 是否禁用
      disabled: {
        type: [String, Boolean],
        default: props$o.radio.disabled
      },
      // 是否禁止点击提示语选中单选框
      labelDisabled: {
        type: [String, Boolean],
        default: props$o.radio.labelDisabled
      },
      // 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
      activeColor: {
        type: String,
        default: props$o.radio.activeColor
      },
      // 未选中的颜色
      inactiveColor: {
        type: String,
        default: props$o.radio.inactiveColor
      },
      // 图标的大小，单位px
      iconSize: {
        type: [String, Number],
        default: props$o.radio.iconSize
      },
      // label的字体大小，px单位
      labelSize: {
        type: [String, Number],
        default: props$o.radio.labelSize
      },
      // label提示文字，因为nvue下，直接slot进来的文字，由于特殊的结构，无法修改样式
      label: {
        type: [String, Number],
        default: props$o.radio.label
      },
      // 整体的大小
      size: {
        type: [String, Number],
        default: props$o.radio.size
      },
      // 图标颜色
      color: {
        type: String,
        default: props$o.radio.color
      },
      // label的颜色
      labelColor: {
        type: String,
        default: props$o.radio.labelColor
      },
      // 图标颜色
      iconColor: {
        type: String,
        default: props$o.radio.iconColor
      }
    }
  };
  const _sfc_main$c = {
    name: "u-radio",
    mixins: [mpMixin, mixin, props$4],
    data() {
      return {
        checked: false,
        // 当你看到这段代码的时候，
        // 父组件的默认值，因为头条小程序不支持在computed中使用this.parent.shape的形式
        // 故只能使用如此方法
        parentData: {
          iconSize: 12,
          labelDisabled: null,
          disabled: null,
          shape: null,
          activeColor: null,
          inactiveColor: null,
          size: 18,
          value: null,
          modelValue: null,
          iconColor: null,
          placement: "row",
          borderBottom: false,
          iconPlacement: "left"
        }
      };
    },
    computed: {
      // 是否禁用，如果父组件u-raios-group禁用的话，将会忽略子组件的配置
      elDisabled() {
        return this.disabled !== "" ? this.disabled : this.parentData.disabled !== null ? this.parentData.disabled : false;
      },
      // 是否禁用label点击
      elLabelDisabled() {
        return this.labelDisabled !== "" ? this.labelDisabled : this.parentData.labelDisabled !== null ? this.parentData.labelDisabled : false;
      },
      // 组件尺寸，对应size的值，默认值为21px
      elSize() {
        return this.size ? this.size : this.parentData.size ? this.parentData.size : 21;
      },
      // 组件的勾选图标的尺寸，默认12px
      elIconSize() {
        return this.iconSize ? this.iconSize : this.parentData.iconSize ? this.parentData.iconSize : 12;
      },
      // 组件选中激活时的颜色
      elActiveColor() {
        return this.activeColor ? this.activeColor : this.parentData.activeColor ? this.parentData.activeColor : "#2979ff";
      },
      // 组件选未中激活时的颜色
      elInactiveColor() {
        return this.inactiveColor ? this.inactiveColor : this.parentData.inactiveColor ? this.parentData.inactiveColor : "#c8c9cc";
      },
      // label的颜色
      elLabelColor() {
        return this.labelColor ? this.labelColor : this.parentData.labelColor ? this.parentData.labelColor : "#606266";
      },
      // 组件的形状
      elShape() {
        return this.shape ? this.shape : this.parentData.shape ? this.parentData.shape : "circle";
      },
      // label大小
      elLabelSize() {
        return uni.$u.addUnit(this.labelSize ? this.labelSize : this.parentData.labelSize ? this.parentData.labelSize : "15");
      },
      elIconColor() {
        const iconColor = this.iconColor ? this.iconColor : this.parentData.iconColor ? this.parentData.iconColor : "#ffffff";
        if (this.elDisabled) {
          return this.checked ? this.elInactiveColor : "transparent";
        } else {
          return this.checked ? iconColor : "transparent";
        }
      },
      iconClasses() {
        let classes = [];
        classes.push("u-radio__icon-wrap--" + this.elShape);
        if (this.elDisabled) {
          classes.push("u-radio__icon-wrap--disabled");
        }
        if (this.checked && this.elDisabled) {
          classes.push("u-radio__icon-wrap--disabled--checked");
        }
        return classes;
      },
      iconWrapStyle() {
        const style = {};
        style.backgroundColor = this.checked && !this.elDisabled ? this.elActiveColor : "#ffffff";
        style.borderColor = this.checked && !this.elDisabled ? this.elActiveColor : this.elInactiveColor;
        style.width = uni.$u.addUnit(this.elSize);
        style.height = uni.$u.addUnit(this.elSize);
        if (this.parentData.iconPlacement === "right") {
          style.marginRight = 0;
        }
        return style;
      },
      radioStyle() {
        const style = {};
        if (this.parentData.borderBottom && this.parentData.placement === "row") {
          uni.$u.error("检测到您将borderBottom设置为true，需要同时将u-radio-group的placement设置为column才有效");
        }
        if (this.parentData.borderBottom && this.parentData.placement === "column") {
          style.paddingBottom = uni.$u.os() === "ios" ? "12px" : "8px";
        }
        return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle));
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.updateParentData();
        if (!this.parent) {
          uni.$u.error("u-radio必须搭配u-radio-group组件使用");
        }
        this.checked = this.name === this.parentData.modelValue;
      },
      updateParentData() {
        this.getParentData("u-radio-group");
      },
      // 点击图标
      iconClickHandler(e2) {
        this.preventEvent(e2);
        if (!this.elDisabled) {
          this.setRadioCheckedStatus();
        }
      },
      // 横向两端排列时，点击组件即可触发选中事件
      wrapperClickHandler(e2) {
        this.parentData.iconPlacement === "right" && this.iconClickHandler(e2);
      },
      // 点击label
      labelClickHandler(e2) {
        this.preventEvent(e2);
        if (!this.elLabelDisabled && !this.elDisabled) {
          this.setRadioCheckedStatus();
        }
      },
      emitEvent() {
        if (!this.checked) {
          this.$emit("change", this.name);
          this.$nextTick(() => {
            uni.$u.formValidate(this, "change");
          });
        }
      },
      // 改变组件选中状态
      // 这里的改变的依据是，更改本组件的checked值为true，同时通过父组件遍历所有u-radio实例
      // 将本组件外的其他u-radio的checked都设置为false(都被取消选中状态)，因而只剩下一个为选中状态
      setRadioCheckedStatus() {
        this.emitEvent();
        this.checked = true;
        typeof this.parent.unCheckedOther === "function" && this.parent.unCheckedOther(this);
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$b);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-radio", [`u-radio-label--${$data.parentData.iconPlacement}`, $data.parentData.borderBottom && $data.parentData.placement === "column" && "u-border-bottom"]]),
        onClick: _cache[2] || (_cache[2] = vue.withModifiers((...args) => $options.wrapperClickHandler && $options.wrapperClickHandler(...args), ["stop"])),
        style: vue.normalizeStyle([$options.radioStyle])
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["u-radio__icon-wrap", $options.iconClasses]),
            onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.iconClickHandler && $options.iconClickHandler(...args), ["stop"])),
            style: vue.normalizeStyle([$options.iconWrapStyle])
          },
          [
            vue.renderSlot(_ctx.$slots, "icon", {}, () => [
              vue.createVNode(_component_u_icon, {
                class: "u-radio__icon-wrap__icon",
                name: "checkbox-mark",
                size: $options.elIconSize,
                color: $options.elIconColor
              }, null, 8, ["size", "color"])
            ], true)
          ],
          6
          /* CLASS, STYLE */
        ),
        vue.createElementVNode(
          "text",
          {
            class: "u-radio__text",
            onClick: _cache[1] || (_cache[1] = vue.withModifiers((...args) => $options.labelClickHandler && $options.labelClickHandler(...args), ["stop"])),
            style: vue.normalizeStyle({
              color: $options.elDisabled ? $options.elInactiveColor : $options.elLabelColor,
              fontSize: $options.elLabelSize,
              lineHeight: $options.elLabelSize
            })
          },
          vue.toDisplayString(_ctx.label),
          5
          /* TEXT, STYLE */
        )
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$4], ["__scopeId", "data-v-83036558"], ["__file", "D:/projects/work/applet/vue3_uview_plus/uni_modules/uview-plus/components/u-radio/u-radio.vue"]]);
  const props$3 = {
    props: {
      // 绑定的值
      modelValue: {
        type: [String, Number, Boolean],
        default: props$o.radioGroup.value
      },
      // 是否禁用全部radio
      disabled: {
        type: Boolean,
        default: props$o.radioGroup.disabled
      },
      // 形状，circle-圆形，square-方形
      shape: {
        type: String,
        default: props$o.radioGroup.shape
      },
      // 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
      activeColor: {
        type: String,
        default: props$o.radioGroup.activeColor
      },
      // 未选中的颜色
      inactiveColor: {
        type: String,
        default: props$o.radioGroup.inactiveColor
      },
      // 标识符
      name: {
        type: String,
        default: props$o.radioGroup.name
      },
      // 整个组件的尺寸，默认px
      size: {
        type: [String, Number],
        default: props$o.radioGroup.size
      },
      // 布局方式，row-横向，column-纵向
      placement: {
        type: String,
        default: props$o.radioGroup.placement
      },
      // label的文本
      label: {
        type: [String],
        default: props$o.radioGroup.label
      },
      // label的颜色 （默认 '#303133' ）
      labelColor: {
        type: [String],
        default: props$o.radioGroup.labelColor
      },
      // label的字体大小，px单位
      labelSize: {
        type: [String, Number],
        default: props$o.radioGroup.labelSize
      },
      // 是否禁止点击文本操作checkbox(默认 false )
      labelDisabled: {
        type: Boolean,
        default: props$o.radioGroup.labelDisabled
      },
      // 图标颜色
      iconColor: {
        type: String,
        default: props$o.radioGroup.iconColor
      },
      // 图标的大小，单位px
      iconSize: {
        type: [String, Number],
        default: props$o.radioGroup.iconSize
      },
      // 竖向配列时，是否显示下划线
      borderBottom: {
        type: Boolean,
        default: props$o.radioGroup.borderBottom
      },
      // 图标与文字的对齐方式
      iconPlacement: {
        type: String,
        default: props$o.radio.iconPlacement
      }
    }
  };
  const _sfc_main$b = {
    name: "u-radio-group",
    mixins: [mpMixin, mixin, props$3],
    computed: {
      // 这里computed的变量，都是子组件u-radio需要用到的，由于头条小程序的兼容性差异，子组件无法实时监听父组件参数的变化
      // 所以需要手动通知子组件，这里返回一个parentData变量，供watch监听，在其中去通知每一个子组件重新从父组件(u-radio-group)
      // 拉取父组件新的变化后的参数
      parentData() {
        return [
          this.modelValue,
          this.disabled,
          this.inactiveColor,
          this.activeColor,
          this.size,
          this.labelDisabled,
          this.shape,
          this.iconSize,
          this.borderBottom,
          this.placement
        ];
      },
      bemClass() {
        return this.bem("radio-group", ["placement"]);
      }
    },
    watch: {
      // 当父组件需要子组件需要共享的参数发生了变化，手动通知子组件
      parentData() {
        if (this.children.length) {
          this.children.map((child) => {
            typeof child.init === "function" && child.init();
          });
        }
      }
    },
    data() {
      return {};
    },
    created() {
      this.children = [];
    },
    emits: ["update:modelValue", "change"],
    methods: {
      // 将其他的radio设置为未选中的状态
      unCheckedOther(childInstance) {
        this.children.map((child) => {
          if (childInstance !== child) {
            child.checked = false;
          }
        });
        const {
          name
        } = childInstance;
        this.$emit("update:modelValue", name);
        this.$emit("change", name);
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-radio-group", $options.bemClass])
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$3], ["__scopeId", "data-v-cbc8bf70"], ["__file", "D:/projects/work/applet/vue3_uview_plus/uni_modules/uview-plus/components/u-radio-group/u-radio-group.vue"]]);
  const props$2 = {
    props: {
      // checkbox的名称
      name: {
        type: [String, Number, Boolean],
        default: props$o.checkbox.name
      },
      // 形状，square为方形，circle为圆型
      shape: {
        type: String,
        default: props$o.checkbox.shape
      },
      // 整体的大小
      size: {
        type: [String, Number],
        default: props$o.checkbox.size
      },
      // 是否默认选中
      checked: {
        type: Boolean,
        default: props$o.checkbox.checked
      },
      // 是否禁用
      disabled: {
        type: [String, Boolean],
        default: props$o.checkbox.disabled
      },
      // 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
      activeColor: {
        type: String,
        default: props$o.checkbox.activeColor
      },
      // 未选中的颜色
      inactiveColor: {
        type: String,
        default: props$o.checkbox.inactiveColor
      },
      // 图标的大小，单位px
      iconSize: {
        type: [String, Number],
        default: props$o.checkbox.iconSize
      },
      // 图标颜色
      iconColor: {
        type: String,
        default: props$o.checkbox.iconColor
      },
      // label提示文字，因为nvue下，直接slot进来的文字，由于特殊的结构，无法修改样式
      label: {
        type: [String, Number],
        default: props$o.checkbox.label
      },
      // label的字体大小，px单位
      labelSize: {
        type: [String, Number],
        default: props$o.checkbox.labelSize
      },
      // label的颜色
      labelColor: {
        type: String,
        default: props$o.checkbox.labelColor
      },
      // 是否禁止点击提示语选中复选框
      labelDisabled: {
        type: [String, Boolean],
        default: props$o.checkbox.labelDisabled
      }
    }
  };
  const _sfc_main$a = {
    name: "u-checkbox",
    mixins: [mpMixin, mixin, props$2],
    data() {
      return {
        isChecked: false,
        // 父组件的默认值，因为头条小程序不支持在computed中使用this.parent.shape的形式
        // 故只能使用如此方法
        parentData: {
          iconSize: 12,
          labelDisabled: null,
          disabled: null,
          shape: "square",
          activeColor: null,
          inactiveColor: null,
          size: 18,
          modelValue: null,
          iconColor: null,
          placement: "row",
          borderBottom: false,
          iconPlacement: "left"
        }
      };
    },
    computed: {
      // 是否禁用，如果父组件u-raios-group禁用的话，将会忽略子组件的配置
      elDisabled() {
        return this.disabled !== "" ? this.disabled : this.parentData.disabled !== null ? this.parentData.disabled : false;
      },
      // 是否禁用label点击
      elLabelDisabled() {
        return this.labelDisabled !== "" ? this.labelDisabled : this.parentData.labelDisabled !== null ? this.parentData.labelDisabled : false;
      },
      // 组件尺寸，对应size的值，默认值为21px
      elSize() {
        return this.size ? this.size : this.parentData.size ? this.parentData.size : 21;
      },
      // 组件的勾选图标的尺寸，默认12px
      elIconSize() {
        return this.iconSize ? this.iconSize : this.parentData.iconSize ? this.parentData.iconSize : 12;
      },
      // 组件选中激活时的颜色
      elActiveColor() {
        return this.activeColor ? this.activeColor : this.parentData.activeColor ? this.parentData.activeColor : "#2979ff";
      },
      // 组件选未中激活时的颜色
      elInactiveColor() {
        return this.inactiveColor ? this.inactiveColor : this.parentData.inactiveColor ? this.parentData.inactiveColor : "#c8c9cc";
      },
      // label的颜色
      elLabelColor() {
        return this.labelColor ? this.labelColor : this.parentData.labelColor ? this.parentData.labelColor : "#606266";
      },
      // 组件的形状
      elShape() {
        return this.shape ? this.shape : this.parentData.shape ? this.parentData.shape : "circle";
      },
      // label大小
      elLabelSize() {
        return uni.$u.addUnit(this.labelSize ? this.labelSize : this.parentData.labelSize ? this.parentData.labelSize : "15");
      },
      elIconColor() {
        const iconColor = this.iconColor ? this.iconColor : this.parentData.iconColor ? this.parentData.iconColor : "#ffffff";
        if (this.elDisabled) {
          return this.isChecked ? this.elInactiveColor : "transparent";
        } else {
          return this.isChecked ? iconColor : "transparent";
        }
      },
      iconClasses() {
        let classes = [];
        classes.push("u-checkbox__icon-wrap--" + this.elShape);
        if (this.elDisabled) {
          classes.push("u-checkbox__icon-wrap--disabled");
        }
        if (this.isChecked && this.elDisabled) {
          classes.push("u-checkbox__icon-wrap--disabled--checked");
        }
        return classes;
      },
      iconWrapStyle() {
        const style = {};
        style.backgroundColor = this.isChecked && !this.elDisabled ? this.elActiveColor : "#ffffff";
        style.borderColor = this.isChecked && !this.elDisabled ? this.elActiveColor : this.elInactiveColor;
        style.width = uni.$u.addUnit(this.elSize);
        style.height = uni.$u.addUnit(this.elSize);
        if (this.parentData.iconPlacement === "right") {
          style.marginRight = 0;
        }
        return style;
      },
      checkboxStyle() {
        const style = {};
        if (this.parentData.borderBottom && this.parentData.placement === "row") {
          uni.$u.error("检测到您将borderBottom设置为true，需要同时将u-checkbox-group的placement设置为column才有效");
        }
        if (this.parentData.borderBottom && this.parentData.placement === "column") {
          style.paddingBottom = "8px";
        }
        return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle));
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.updateParentData();
        if (!this.parent) {
          uni.$u.error("u-checkbox必须搭配u-checkbox-group组件使用");
        }
        const value = this.parentData.modelValue;
        if (this.checked) {
          this.isChecked = true;
        } else if (uni.$u.test.array(value)) {
          this.isChecked = value.some((item) => {
            return item === this.name;
          });
        }
      },
      updateParentData() {
        this.getParentData("u-checkbox-group");
      },
      // 横向两端排列时，点击组件即可触发选中事件
      wrapperClickHandler(e2) {
        this.parentData.iconPlacement === "right" && this.iconClickHandler(e2);
      },
      // 点击图标
      iconClickHandler(e2) {
        this.preventEvent(e2);
        if (!this.elDisabled) {
          this.setRadioCheckedStatus();
        }
      },
      // 点击label
      labelClickHandler(e2) {
        this.preventEvent(e2);
        if (!this.elLabelDisabled && !this.elDisabled) {
          this.setRadioCheckedStatus();
        }
      },
      emitEvent() {
        this.$emit("change", this.isChecked);
        this.$nextTick(() => {
          uni.$u.formValidate(this, "change");
        });
      },
      // 改变组件选中状态
      // 这里的改变的依据是，更改本组件的checked值为true，同时通过父组件遍历所有u-checkbox实例
      // 将本组件外的其他u-checkbox的checked都设置为false(都被取消选中状态)，因而只剩下一个为选中状态
      setRadioCheckedStatus() {
        this.isChecked = !this.isChecked;
        this.emitEvent();
        typeof this.parent.unCheckedOther === "function" && this.parent.unCheckedOther(this);
      }
    },
    watch: {
      checked() {
        this.isChecked = this.checked;
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$b);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-checkbox", [`u-checkbox-label--${$data.parentData.iconPlacement}`, $data.parentData.borderBottom && $data.parentData.placement === "column" && "u-border-bottom"]]),
        style: vue.normalizeStyle([$options.checkboxStyle]),
        onClick: _cache[2] || (_cache[2] = vue.withModifiers((...args) => $options.wrapperClickHandler && $options.wrapperClickHandler(...args), ["stop"]))
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["u-checkbox__icon-wrap", $options.iconClasses]),
            onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.iconClickHandler && $options.iconClickHandler(...args), ["stop"])),
            style: vue.normalizeStyle([$options.iconWrapStyle])
          },
          [
            vue.renderSlot(_ctx.$slots, "icon", {}, () => [
              vue.createVNode(_component_u_icon, {
                class: "u-checkbox__icon-wrap__icon",
                name: "checkbox-mark",
                size: $options.elIconSize,
                color: $options.elIconColor
              }, null, 8, ["size", "color"])
            ], true)
          ],
          6
          /* CLASS, STYLE */
        ),
        vue.createElementVNode(
          "text",
          {
            onClick: _cache[1] || (_cache[1] = vue.withModifiers((...args) => $options.labelClickHandler && $options.labelClickHandler(...args), ["stop"])),
            style: vue.normalizeStyle({
              color: $options.elDisabled ? $options.elInactiveColor : $options.elLabelColor,
              fontSize: $options.elLabelSize,
              lineHeight: $options.elLabelSize
            })
          },
          vue.toDisplayString(_ctx.label),
          5
          /* TEXT, STYLE */
        )
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$2], ["__scopeId", "data-v-41713600"], ["__file", "D:/projects/work/applet/vue3_uview_plus/uni_modules/uview-plus/components/u-checkbox/u-checkbox.vue"]]);
  const props$1 = {
    props: {
      // 标识符
      name: {
        type: String,
        default: props$o.checkboxGroup.name
      },
      // 绑定的值
      modelValue: {
        type: Array,
        default: props$o.checkboxGroup.value
      },
      // 形状，circle-圆形，square-方形
      shape: {
        type: String,
        default: props$o.checkboxGroup.shape
      },
      // 是否禁用全部checkbox
      disabled: {
        type: Boolean,
        default: props$o.checkboxGroup.disabled
      },
      // 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
      activeColor: {
        type: String,
        default: props$o.checkboxGroup.activeColor
      },
      // 未选中的颜色
      inactiveColor: {
        type: String,
        default: props$o.checkboxGroup.inactiveColor
      },
      // 整个组件的尺寸，默认px
      size: {
        type: [String, Number],
        default: props$o.checkboxGroup.size
      },
      // 布局方式，row-横向，column-纵向
      placement: {
        type: String,
        default: props$o.checkboxGroup.placement
      },
      // label的字体大小，px单位
      labelSize: {
        type: [String, Number],
        default: props$o.checkboxGroup.labelSize
      },
      // label的字体颜色
      labelColor: {
        type: [String],
        default: props$o.checkboxGroup.labelColor
      },
      // 是否禁止点击文本操作
      labelDisabled: {
        type: Boolean,
        default: props$o.checkboxGroup.labelDisabled
      },
      // 图标颜色
      iconColor: {
        type: String,
        default: props$o.checkboxGroup.iconColor
      },
      // 图标的大小，单位px
      iconSize: {
        type: [String, Number],
        default: props$o.checkboxGroup.iconSize
      },
      // 勾选图标的对齐方式，left-左边，right-右边
      iconPlacement: {
        type: String,
        default: props$o.checkboxGroup.iconPlacement
      },
      // 竖向配列时，是否显示下划线
      borderBottom: {
        type: Boolean,
        default: props$o.checkboxGroup.borderBottom
      }
    }
  };
  const _sfc_main$9 = {
    name: "u-checkbox-group",
    mixins: [mpMixin, mixin, props$1],
    computed: {
      // 这里computed的变量，都是子组件u-checkbox需要用到的，由于头条小程序的兼容性差异，子组件无法实时监听父组件参数的变化
      // 所以需要手动通知子组件，这里返回一个parentData变量，供watch监听，在其中去通知每一个子组件重新从父组件(u-checkbox-group)
      // 拉取父组件新的变化后的参数
      parentData() {
        return [
          this.modelValue,
          this.disabled,
          this.inactiveColor,
          this.activeColor,
          this.size,
          this.labelDisabled,
          this.shape,
          this.iconSize,
          this.borderBottom,
          this.placement
        ];
      },
      bemClass() {
        return this.bem("checkbox-group", ["placement"]);
      }
    },
    watch: {
      // 当父组件需要子组件需要共享的参数发生了变化，手动通知子组件
      parentData: {
        handler() {
          if (this.children.length) {
            this.children.map((child) => {
              typeof child.init === "function" && child.init();
            });
          }
        },
        deep: true
      }
    },
    data() {
      return {};
    },
    created() {
      this.children = [];
    },
    emits: ["update:modelValue", "change"],
    methods: {
      // 将其他的checkbox设置为未选中的状态
      unCheckedOther(childInstance) {
        const values = [];
        this.children.map((child) => {
          if (child.isChecked) {
            values.push(child.name);
          }
        });
        this.$emit("change", values);
        this.$emit("update:modelValue", values);
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-checkbox-group", $options.bemClass])
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$1], ["__scopeId", "data-v-ff0492f0"], ["__file", "D:/projects/work/applet/vue3_uview_plus/uni_modules/uview-plus/components/u-checkbox-group/u-checkbox-group.vue"]]);
  uni.getSystemInfoSync();
  function base64ToPath(base64) {
    const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64) || [];
    return new Promise((resolve, reject) => {
      const bitmap = new plus.nativeObj.Bitmap("bitmap" + Date.now());
      bitmap.loadBase64Data(base64, () => {
        if (!format) {
          reject(new Error("ERROR_BASE64SRC_PARSE"));
        }
        const time = (/* @__PURE__ */ new Date()).getTime();
        const filePath = `_doc/uniapp_temp/${time}.${format}`;
        bitmap.save(
          filePath,
          {},
          () => {
            bitmap.clear();
            resolve(filePath);
          },
          (error2) => {
            bitmap.clear();
            reject(error2);
          }
        );
      }, (error2) => {
        bitmap.clear();
        reject(error2);
      });
    });
  }
  function t(t2, e2) {
    var n2 = Object.keys(t2);
    if (Object.getOwnPropertySymbols) {
      var i2 = Object.getOwnPropertySymbols(t2);
      e2 && (i2 = i2.filter(function(e3) {
        return Object.getOwnPropertyDescriptor(t2, e3).enumerable;
      })), n2.push.apply(n2, i2);
    }
    return n2;
  }
  function e(e2) {
    for (var n2 = 1; arguments.length > n2; n2++) {
      var i2 = null != arguments[n2] ? arguments[n2] : {};
      n2 % 2 ? t(Object(i2), true).forEach(function(t2) {
        a(e2, t2, i2[t2]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(i2)) : t(Object(i2)).forEach(function(t2) {
        Object.defineProperty(e2, t2, Object.getOwnPropertyDescriptor(i2, t2));
      });
    }
    return e2;
  }
  function n(t2) {
    return n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
      return typeof t3;
    } : function(t3) {
      return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
    }, n(t2);
  }
  function i(t2, e2) {
    if (!(t2 instanceof e2))
      throw new TypeError("Cannot call a class as a function");
  }
  function o(t2, e2) {
    for (var n2 = 0; e2.length > n2; n2++) {
      var i2 = e2[n2];
      i2.enumerable = i2.enumerable || false, i2.configurable = true, "value" in i2 && (i2.writable = true), Object.defineProperty(t2, i2.key, i2);
    }
  }
  function r(t2, e2, n2) {
    return e2 && o(t2.prototype, e2), n2 && o(t2, n2), Object.defineProperty(t2, "prototype", { writable: false }), t2;
  }
  function a(t2, e2, n2) {
    return e2 in t2 ? Object.defineProperty(t2, e2, { value: n2, enumerable: true, configurable: true, writable: true }) : t2[e2] = n2, t2;
  }
  function s(t2, e2) {
    if ("function" != typeof e2 && null !== e2)
      throw new TypeError("Super expression must either be null or a function");
    t2.prototype = Object.create(e2 && e2.prototype, { constructor: { value: t2, writable: true, configurable: true } }), Object.defineProperty(t2, "prototype", { writable: false }), e2 && h(t2, e2);
  }
  function u(t2) {
    return u = Object.setPrototypeOf ? Object.getPrototypeOf : function(t3) {
      return t3.__proto__ || Object.getPrototypeOf(t3);
    }, u(t2);
  }
  function h(t2, e2) {
    return h = Object.setPrototypeOf || function(t3, e3) {
      return t3.__proto__ = e3, t3;
    }, h(t2, e2);
  }
  function c(t2, e2) {
    if (e2 && ("object" == typeof e2 || "function" == typeof e2))
      return e2;
    if (void 0 !== e2)
      throw new TypeError("Derived constructors may only return object or undefined");
    return function(t3) {
      if (void 0 === t3)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return t3;
    }(t2);
  }
  function l(t2) {
    var e2 = function() {
      if ("undefined" == typeof Reflect || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if ("function" == typeof Proxy)
        return true;
      try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
        })), true;
      } catch (t3) {
        return false;
      }
    }();
    return function() {
      var n2, i2 = u(t2);
      if (e2) {
        var o2 = u(this).constructor;
        n2 = Reflect.construct(i2, arguments, o2);
      } else
        n2 = i2.apply(this, arguments);
      return c(this, n2);
    };
  }
  var v = function(t2) {
    var e2 = n(t2);
    return null !== t2 && "object" === e2 || "function" === e2;
  }, f = {}.toString, d = function(t2, e2) {
    return f.call(t2) === "[object " + e2 + "]";
  }, y = function(t2) {
    return d(t2, "String");
  }, p = function(t2) {
    return d(t2, "Number");
  }, g = function(t2) {
    return d(t2, "Function");
  }, m = function() {
    function t2() {
      i(this, t2), this.__events = void 0, this.__events = {};
    }
    return r(t2, [{ key: "on", value: function(t3, e2) {
      if (t3 && e2) {
        var n2 = this.__events[t3] || [];
        n2.push(e2), this.__events[t3] = n2;
      }
    } }, { key: "emit", value: function(t3, e2) {
      var n2 = this;
      if (v(t3) && (t3 = (e2 = t3) && e2.type), t3) {
        var i2 = this.__events[t3];
        i2 && i2.length && i2.forEach(function(t4) {
          t4.call(n2, e2);
        });
      }
    } }, { key: "off", value: function(t3, e2) {
      var n2 = this.__events, i2 = n2[t3];
      if (i2 && i2.length)
        if (e2)
          for (var o2 = 0, r2 = i2.length; r2 > o2; o2++)
            i2[o2] === e2 && (i2.splice(o2, 1), o2--);
        else
          delete n2[t3];
    } }, { key: "getEvents", value: function() {
      return this.__events;
    } }]), t2;
  }(), x = function(t2) {
    s(n2, m);
    var e2 = l(n2);
    function n2(t3, o2) {
      var r2;
      return i(this, n2), (r2 = e2.call(this)).context = void 0, r2.canvas = void 0, r2.attrs = void 0, r2.isCanvasElement = void 0, r2.context = t3, r2.canvas = o2.canvas || t3.canvas || { width: o2.width || 0, height: o2.height || 0 }, r2.attrs = o2 || {}, r2.isCanvasElement = true, r2;
    }
    return r(n2, [{ key: "width", get: function() {
      return this.canvas.width;
    }, set: function(t3) {
      this.canvas.width = t3;
    } }, { key: "height", get: function() {
      return this.canvas.height;
    }, set: function(t3) {
      this.canvas.height = t3;
    } }, { key: "getContext", value: function() {
      return this.context;
    } }, { key: "getBoundingClientRect", value: function() {
      var t3 = this.attrs || {}, e3 = t3.top, n3 = t3.right, i2 = t3.width, o2 = t3.height, r2 = t3.left, a2 = t3.bottom;
      return { top: void 0 === e3 ? 0 : e3, width: void 0 === i2 ? 0 : i2, right: void 0 === n3 ? 0 : n3, height: void 0 === o2 ? 0 : o2, bottom: void 0 === a2 ? 0 : a2, left: void 0 === r2 ? 0 : r2 };
    } }, { key: "setAttribute", value: function(t3, e3) {
      this.attrs[t3] = e3;
    } }, { key: "addEventListener", value: function(t3, e3) {
      this.on(t3, e3);
    } }, { key: "removeEventListener", value: function(t3, e3) {
      this.off(t3, e3);
    } }, { key: "dispatchEvent", value: function(t3, e3) {
      this.emit(t3, e3);
    } }]), n2;
  }();
  var w = function(t2, e2) {
    return t2 ? function(t3) {
      if (!t3)
        return false;
      if (1 !== t3.nodeType || !t3.nodeName || "canvas" !== t3.nodeName.toLowerCase())
        return false;
      var e3 = false;
      try {
        t3.addEventListener("eventTest", function() {
          e3 = true;
        }), t3.dispatchEvent(new Event("eventTest"));
      } catch (t4) {
        e3 = false;
      }
      return e3;
    }(t2.canvas) ? t2.canvas : new x(t2, e2) : null;
  };
  function b(t2, e2) {
    try {
      return t2.currentStyle ? t2.currentStyle[e2] : document.defaultView && document.defaultView.getComputedStyle(t2, null).getPropertyValue(e2);
    } catch (t3) {
      return { width: 300, height: 150 }[e2];
    }
  }
  function k(t2, e2) {
    var n2 = e2.get("el");
    if (!n2)
      return t2;
    var i2 = n2.getBoundingClientRect(), o2 = i2.top, r2 = void 0 === o2 ? 0 : o2, a2 = i2.left, s2 = void 0 === a2 ? 0 : a2, u2 = parseFloat(b(n2, "padding-left")) || 0, h2 = parseFloat(b(n2, "padding-top")) || 0;
    return { x: t2.x - s2 - u2, y: t2.y - r2 - h2 };
  }
  function _(t2, e2) {
    var n2 = e2.get("landscape");
    if (!n2)
      return t2;
    if (g(n2))
      return n2(t2, e2);
    var i2 = e2.get("height");
    return { x: t2.y, y: i2 - t2.x };
  }
  var E = function(t2, e2) {
    var n2 = t2.touches;
    if (!n2 || !n2.length)
      return [_(k({ x: t2.clientX, y: t2.clientY }, e2), e2)];
    n2.length || (n2 = t2.changedTouches || []);
    for (var i2 = [], o2 = 0, r2 = n2.length; r2 > o2; o2++) {
      var a2 = n2[o2], s2 = a2.x, u2 = a2.y, h2 = a2.clientX, c2 = a2.clientY, l2 = void 0;
      l2 = p(s2) || p(u2) ? { x: s2, y: u2 } : k({ x: h2, y: c2 }, e2), i2.push(_(l2, e2));
    }
    return i2;
  }, L = function(t2, e2) {
    var n2 = e2.x - t2.x, i2 = e2.y - t2.y;
    return Math.abs(n2) > Math.abs(i2) ? n2 > 0 ? "right" : "left" : i2 > 0 ? "down" : "up";
  }, M = function(t2, e2) {
    var n2 = Math.abs(e2.x - t2.x), i2 = Math.abs(e2.y - t2.y);
    return Math.sqrt(n2 * n2 + i2 * i2);
  }, P = function() {
    function t2(e2) {
      var n2 = this, o2 = e2.canvas, r2 = e2.el;
      i(this, t2), this.processEvent = void 0, this.canvas = void 0, this.startTime = 0, this.endTime = 0, this.startPoints = null, this.startDistance = 0, this.center = null, this.pressTimeout = void 0, this.eventType = null, this.direction = null, this.lastMoveTime = 0, this.prevMovePoints = null, this.prevMoveTime = 0, this.lastMovePoints = null, this.pinch = false, this._click = function(t3) {
        var e3 = E(t3, n2.canvas);
        t3.points = e3, n2.emitEvent("click", t3);
      }, this._start = function(t3) {
        var e3, i2, o3 = E(t3, n2.canvas);
        o3 && (t3.points = o3, n2.emitEvent("touchstart", t3), n2.reset(), n2.startTime = Date.now(), n2.startPoints = o3, o3.length > 1 ? (n2.startDistance = M(o3[0], o3[1]), n2.center = { x: (e3 = o3[0]).x + ((i2 = o3[1]).x - e3.x) / 2, y: e3.y + (i2.y - e3.y) / 2 }) : n2.pressTimeout = setTimeout(function() {
          var e4 = "press", i3 = "none";
          t3.direction = i3, n2.emitStart(e4, t3), n2.emitEvent(e4, t3), n2.eventType = e4, n2.direction = i3;
        }, 250));
      }, this._move = function(t3) {
        var e3 = E(t3, n2.canvas);
        if (e3) {
          t3.points = e3, n2.emitEvent("touchmove", t3);
          var i2 = n2.startPoints;
          if (i2)
            if (e3.length > 1) {
              var o3 = n2.startDistance, r3 = M(e3[0], e3[1]);
              t3.zoom = r3 / o3, t3.center = n2.center, n2.emitStart("pinch", t3), n2.emitEvent("pinch", t3);
            } else {
              var a2 = e3[0].x - i2[0].x, s2 = e3[0].y - i2[0].y, u2 = n2.direction || L(i2[0], e3[0]);
              n2.direction = u2;
              var h2 = n2.getEventType(e3);
              t3.direction = u2, t3.deltaX = a2, t3.deltaY = s2, n2.emitStart(h2, t3), n2.emitEvent(h2, t3);
              var c2 = n2.lastMoveTime, l2 = Date.now();
              l2 - c2 > 0 && (n2.prevMoveTime = c2, n2.prevMovePoints = n2.lastMovePoints, n2.lastMoveTime = l2, n2.lastMovePoints = e3);
            }
        }
      }, this._end = function(t3) {
        var e3 = E(t3, n2.canvas);
        t3.points = e3, n2.emitEnd(t3), n2.emitEvent("touchend", t3);
        var i2 = n2.lastMoveTime;
        if (100 > Date.now() - i2) {
          var o3 = i2 - (n2.prevMoveTime || n2.startTime);
          if (o3 > 0) {
            var r3 = n2.prevMovePoints || n2.startPoints, a2 = n2.lastMovePoints;
            if (!r3 || !a2)
              return;
            var s2 = M(r3[0], a2[0]) / o3;
            s2 > 0.3 && (t3.velocity = s2, t3.direction = L(r3[0], a2[0]), n2.emitEvent("swipe", t3));
          }
        }
        n2.reset();
        var u2 = t3.touches;
        u2 && u2.length > 0 && n2._start(t3);
      }, this._cancel = function(t3) {
        n2.emitEvent("touchcancel", t3), n2.reset();
      }, this.canvas = o2, this.delegateEvent(r2), this.processEvent = {};
    }
    return r(t2, [{ key: "delegateEvent", value: function(t3) {
      t3.addEventListener("click", this._click), t3.addEventListener("touchstart", this._start), t3.addEventListener("touchmove", this._move), t3.addEventListener("touchend", this._end), t3.addEventListener("touchcancel", this._cancel);
    } }, { key: "emitEvent", value: function(t3, e2) {
      this.canvas.emit(t3, e2);
    } }, { key: "getEventType", value: function(t3) {
      var e2, n2 = this.eventType, i2 = this.startTime, o2 = this.startPoints;
      if (n2)
        return n2;
      var r2 = this.canvas.__events.pan;
      if (r2 && r2.length) {
        var a2 = Date.now();
        if (!o2)
          return;
        e2 = a2 - i2 > 250 && 10 > M(o2[0], t3[0]) ? "press" : "pan";
      } else
        e2 = "press";
      return this.eventType = e2, e2;
    } }, { key: "enable", value: function(t3) {
      this.processEvent[t3] = true;
    } }, { key: "isProcess", value: function(t3) {
      return this.processEvent[t3];
    } }, { key: "emitStart", value: function(t3, e2) {
      this.isProcess(t3) || (this.enable(t3), this.emitEvent("".concat(t3, "start"), e2));
    } }, { key: "emitEnd", value: function(t3) {
    } }, { key: "clearPressTimeout", value: function() {
      this.pressTimeout && (clearTimeout(this.pressTimeout), this.pressTimeout = null);
    } }, { key: "reset", value: function() {
      this.clearPressTimeout(), this.startTime = 0, this.startPoints = null, this.startDistance = 0, this.direction = null, this.eventType = null, this.pinch = false, this.prevMoveTime = 0, this.prevMovePoints = null, this.lastMoveTime = 0, this.lastMovePoints = null;
    } }]), t2;
  }(), T = function(t2) {
    s(o2, m);
    var e2 = l(o2);
    function o2(t3) {
      var n2;
      i(this, o2), (n2 = e2.call(this))._attrs = {}, n2._isWindow = void 0, n2._attrs = Object.assign({}, t3), n2._isWindow = "undefined" != typeof window, n2._initPixelRatio(), n2._initCanvas();
      return ["createImage", "toDataURL", "requestAnimationFrame"].forEach(function(e3) {
        n2._initAttrs(e3, t3.canvas || n2.get("el"));
      }), n2;
    }
    return r(o2, [{ key: "get", value: function(t3) {
      return this._attrs[t3];
    } }, { key: "set", value: function(t3, e3) {
      this._attrs[t3] = e3;
    } }, { key: "_initAttrs", value: function(t3, e3) {
      var n2 = this;
      if (!this.get(t3)) {
        this.set(t3, function() {
          return e3[t3] ? e3[t3].apply(e3, arguments) : n2._isWindow ? window[t3] ? (i2 = window)[t3].apply(i2, arguments) : "createImage" == t3 ? new Image() : null : void 0;
          var i2;
        });
      }
    } }, { key: "_initCanvas", value: function() {
      var t3, e3, n2 = this.get("el"), i2 = this.get("context");
      if (!n2 && !i2)
        throw Error("请指定 id、el 或 context!");
      t3 = n2 ? y(n2) ? (e3 = n2) ? document.getElementById(e3) : null : n2 : w(i2, this._attrs), i2 && t3 && !t3.getContext && (t3.getContext = function() {
        return i2;
      });
      var o3 = this.get("width") || function(t4) {
        var e4 = b(t4, "width");
        return "auto" === e4 && (e4 = t4.offsetWidth), parseFloat(e4);
      }(t3) || t3.width, r2 = this.get("height") || function(t4) {
        var e4 = b(t4, "height");
        return "auto" === e4 && (e4 = t4.offsetHeight), parseFloat(e4);
      }(t3) || t3.height;
      this.set("canvas", this), this.set("el", t3), this.set("context", i2 || t3.getContext("2d")), this.changeSize(o3, r2);
      var a2 = new P({ canvas: this, el: t3, parent: this.get("parent") });
      this.set("eventController", a2);
    } }, { key: "_initPixelRatio", value: function() {
      this.get("pixelRatio") || this.set("pixelRatio", window && window.devicePixelRatio || 1);
    } }, { key: "changeSize", value: function(t3, e3) {
      var i2, o3 = this.get("pixelRatio"), r2 = this.get("el");
      (r2.style && (r2.style.width = t3 + "px", r2.style.height = e3 + "px"), (i2 = r2) && "object" === n(i2) && (1 === i2.nodeType && i2.nodeName || i2.isCanvasElement)) && (r2.width = t3 * o3, r2.height = e3 * o3, 1 !== o3 && this.get("context").scale(o3, o3));
      this.set("width", t3), this.set("height", e3);
    } }, { key: "destroy", value: function() {
      if (!this.get("destroyed")) {
        var t3 = this.get("el");
        t3.width = 0, t3.height = 0, this.clear(), this._attrs = {}, this.set("destroyed", true);
      }
    } }, { key: "clear", value: function() {
    } }, { key: "isDestroyed", value: function() {
      return this.get("destroyed");
    } }]), o2;
  }();
  var S = { penColor: "black", backgroundColor: "", openSmooth: true, penSize: 2, minLineWidth: 2, maxLineWidth: 6, minSpeed: 1.5, maxWidthDiffRate: 20, maxHistoryLength: 20 }, D = null, O = function() {
    function t2(e2) {
      var n2 = this;
      i(this, t2), this.canAddHistory = true, this.points = [], this.historyList = [], this.canvas = void 0, this._isEmpty = true, this.active = false, this.getLineWidth = function(t3) {
        var e3 = n2.get("options"), i2 = e3.minSpeed, o2 = e3.minLineWidth, r2 = n2.getMaxLineWidth();
        return Math.min(Math.max(r2 - (r2 - o2) * t3 / Math.max(Math.min(i2, 10), 1), o2), r2);
      }, this.drawTrapezoid = function(t3, e3, i2, o2) {
        var r2 = n2.get("context");
        r2.beginPath(), r2.moveTo(Number(t3.x.toFixed(1)), Number(t3.y.toFixed(1))), r2.lineTo(Number(e3.x.toFixed(1)), Number(e3.y.toFixed(1))), r2.lineTo(Number(i2.x.toFixed(1)), Number(i2.y.toFixed(1))), r2.lineTo(Number(o2.x.toFixed(1)), Number(o2.y.toFixed(1))), r2.fillStyle = n2.get("options").penColor, r2.fill(), r2.draw && r2.draw(true);
      }, this.drawNoSmoothLine = function(t3, e3) {
        e3.lastX = t3.x + 0.5 * (e3.x - t3.x), e3.lastY = t3.y + 0.5 * (e3.y - t3.y), "number" == typeof t3.lastX && n2.drawCurveLine(t3.lastX, t3.lastY, t3.x, t3.y, e3.lastX, e3.lastY, n2.getMaxLineWidth());
      }, this.drawCurveLine = function(t3, e3, i2, o2, r2, a2, s2) {
        s2 = Number(s2.toFixed(1));
        var u2 = n2.get("context");
        u2.lineWidth = s2, u2.beginPath(), u2.moveTo(Number(t3.toFixed(1)), Number(e3.toFixed(1))), u2.quadraticCurveTo(Number(i2.toFixed(1)), Number(o2.toFixed(1)), Number(r2.toFixed(1)), Number(a2.toFixed(1))), u2.stroke(), u2.draw && u2.draw(true);
      }, this.getRadianData = function(t3, e3, n3, i2) {
        var o2 = n3 - t3, r2 = i2 - e3;
        if (0 === o2)
          return { val: 0, pos: -1 };
        if (0 === r2)
          return { val: 0, pos: 1 };
        var a2 = Math.abs(Math.atan(r2 / o2));
        return n3 > t3 && e3 > i2 || t3 > n3 && i2 > e3 ? { val: a2, pos: 1 } : { val: a2, pos: -1 };
      }, this.getRadianPoints = function(t3, e3, n3, i2) {
        if (0 === t3.val)
          return 1 === t3.pos ? [{ x: e3, y: n3 + i2 }, { x: e3, y: n3 - i2 }] : [{ y: n3, x: e3 + i2 }, { y: n3, x: e3 - i2 }];
        var o2 = Math.sin(t3.val) * i2, r2 = Math.cos(t3.val) * i2;
        return 1 === t3.pos ? [{ x: e3 + o2, y: n3 + r2 }, { x: e3 - o2, y: n3 - r2 }] : [{ x: e3 + o2, y: n3 - r2 }, { x: e3 - o2, y: n3 + r2 }];
      }, this.drawSmoothLine = function(t3, e3) {
        var i2 = e3.x - t3.x, o2 = e3.y - t3.y;
        if (Math.abs(i2) + Math.abs(o2) > 2 ? (e3.lastX1 = t3.x + 0.3 * i2, e3.lastY1 = t3.y + 0.3 * o2, e3.lastX2 = t3.x + 0.7 * i2, e3.lastY2 = t3.y + 0.7 * o2) : (e3.lastX1 = e3.lastX2 = t3.x + 0.5 * i2, e3.lastY1 = e3.lastY2 = t3.y + 0.5 * o2), e3.perLineWidth = (t3.lineWidth + e3.lineWidth) / 2, "number" == typeof t3.lastX1) {
          if (n2.drawCurveLine(t3.lastX2, t3.lastY2, t3.x, t3.y, e3.lastX1, e3.lastY1, e3.perLineWidth), t3.isFirstPoint)
            return;
          if (t3.lastX1 === t3.lastX2 && t3.lastY1 === t3.lastY2)
            return;
          var r2 = n2.getRadianData(t3.lastX1, t3.lastY1, t3.lastX2, t3.lastY2), a2 = n2.getRadianPoints(r2, t3.lastX1, t3.lastY1, t3.perLineWidth / 2), s2 = n2.getRadianPoints(r2, t3.lastX2, t3.lastY2, e3.perLineWidth / 2);
          n2.drawTrapezoid(a2[0], s2[0], s2[1], a2[1]);
        } else
          e3.isFirstPoint = true;
      }, this.addHistory = function() {
        var t3 = n2.get("options").maxHistoryLength;
        if (t3 && n2.canAddHistory)
          if (n2.canAddHistory = false, n2.get("createImage")) {
            var e3 = null;
            e3 = n2.get("createImage")();
            var i2 = n2.get("toDataURL") && n2.get("toDataURL")();
            y(i2) ? e3.src = i2 : i2.then(function(t4) {
              e3.src = t4;
            }), e3.onload = function() {
              var i3 = D;
              D = e3, n2.historyList.push(i3), n2.historyList = n2.historyList.slice(-t3);
            };
          } else
            n2.historyList.length++;
      }, this.drawByImage = function(t3) {
        var e3 = n2.get("context"), i2 = n2.get("width"), o2 = n2.get("height");
        e3.clearRect(0, 0, i2, o2);
        try {
          t3 && e3.drawImage(t3, 0, 0, i2, o2), e3.draw && e3.draw(true);
        } catch (t4) {
          n2.historyList.length = 0;
        }
      }, this.isEmpty = function() {
        return n2.get("options").maxHistoryLength > 0 ? 0 === n2.historyList.length : n2._isEmpty;
      }, this.clear = function() {
        var t3 = n2.get("context");
        t3.clearRect(0, 0, n2.get("width"), n2.get("height")), t3.draw && t3.draw(), n2._isEmpty = true, D = null, n2.historyList.length = 0;
      }, this.undo = function() {
        if (0 === n2.get("options").maxHistoryLength && n2.clear(), n2.get("createImage") && n2.historyList.length) {
          var t3 = n2.historyList.splice(-1)[0];
          n2.drawByImage(t3), 0 === n2.historyList.length && n2.clear();
        }
      }, this.canvas = e2, this.canvas.set("pen", S), this.init();
    }
    return r(t2, [{ key: "getOption", value: function() {
    } }, { key: "setOption", value: function() {
      var t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n2 = e({}, t3), i2 = n2.maxLineWidth;
      if (i2 && t3.penSize && i2 == S.maxLineWidth) {
        var o2 = Math.max(i2, t3.penSize);
        n2.maxLineWidth = o2;
      }
      this.canvas.set("pen", Object.assign({}, S, n2));
    } }, { key: "get", value: function(t3) {
      return this.canvas.get("options" == t3 ? "pen" : t3);
    } }, { key: "init", value: function() {
      var t3 = this;
      this.get("context").lineCap = "round", this.canvas.on("touchstart", function(e2) {
        return t3.onDrawStart(e2);
      }), this.canvas.on("touchmove", function(e2) {
        return t3.onDrawMove(e2);
      }), this.canvas.on("touchend", function(e2) {
        return t3.onDrawEnd(e2);
      });
    } }, { key: "drawBackground", value: function() {
      var t3 = this.get("context"), e2 = this.get("width"), n2 = this.get("height"), i2 = this.get("options"), o2 = i2.backgroundColor, r2 = i2.backgroundImage;
      o2 && (t3.fillStyle = o2, t3.fillRect(0, 0, e2, n2), t3.draw && t3.draw(true)), r2 && this.drawByImage(r2);
    } }, { key: "getContentBoundingBox", value: function(t3) {
      var e2 = this.get("pixelRatio"), n2 = this.get("width"), i2 = this.get("height"), o2 = this.get("el"), r2 = "CANVAS" === o2.nodeName, a2 = r2 ? n2 : o2.width, s2 = r2 ? i2 : o2.height;
      e2 = r2 ? 1 : e2;
      var u2 = function(n3) {
        for (var i3 = a2, o3 = s2, r3 = 0, u3 = 0, h3 = 0; n3.length > h3; h3 += 4) {
          if (n3[h3 + 3] > 0) {
            var c3 = h3 / 4 % a2, l3 = Math.floor(h3 / 4 / a2);
            i3 = Math.min(i3, c3), o3 = Math.min(o3, l3), r3 = Math.max(r3, c3), u3 = Math.max(u3, l3);
          }
        }
        var v2 = { width: (r3 - i3 + 1) / e2, height: (u3 - o3 + 1) / e2, startX: i3 / e2, startY: o3 / e2 };
        return t3 && t3(v2), v2;
      };
      if ("CANVAS" === o2.nodeName) {
        var h2 = document.createElement("canvas");
        h2.width = n2, h2.height = i2;
        var c2 = h2.getContext("2d");
        c2.drawImage(o2, 0, 0, n2, i2);
        var l2 = c2.getImageData(0, 0, n2, i2).data;
        return u2(l2);
      }
      var f2, d2 = this.get("context").getImageData(0, 0, a2, s2);
      return v(f2 = d2) && g(f2.then) && g(f2.catch) ? (d2.then(function(t4) {
        return u2(t4.data);
      }), null) : u2(d2.data);
    } }, { key: "remove", value: function() {
      var t3 = this;
      this.canvas.off("touchstart", function(e2) {
        return t3.onDrawStart(e2);
      }), this.canvas.off("touchmove", function(e2) {
        return t3.onDrawMove(e2);
      }), this.canvas.off("touchend", function(e2) {
        return t3.onDrawEnd(e2);
      });
    } }, { key: "disableScroll", value: function(t3) {
      t3.preventDefault && this.get("options").disableScroll && t3.preventDefault();
    } }, { key: "onDrawStart", value: function(t3) {
      this.disableScroll(t3);
      var e2 = t3.points;
      if (this.active) {
        this.canAddHistory = true, this.get("context").strokeStyle = this.get("options").penColor;
        var n2 = e2[0];
        this.initPoint(n2.x, n2.y);
      }
    } }, { key: "onDrawMove", value: function(t3) {
      if (this.disableScroll(t3), this.active) {
        var e2 = t3.points[0];
        this.initPoint(e2.x, e2.y), this.onDraw();
      }
    } }, { key: "onDrawEnd", value: function(t3) {
      this.active && (this.addHistory(), this.canAddHistory = true, this.points = []);
    } }, { key: "onDraw", value: function() {
      var t3 = this, e2 = this.get("context");
      if (this.points.length >= 2) {
        e2.lineWidth = this.get("options").penSize || 2;
        var n2 = this.points.slice(-1)[0], i2 = this.points.slice(-2, -1)[0], o2 = function() {
          t3._isEmpty = false, t3.get("options").openSmooth ? t3.drawSmoothLine(i2, n2) : t3.drawNoSmoothLine(i2, n2);
        }, r2 = this.get("el").canvas;
        r2 && r2.requestAnimationFrame ? r2.requestAnimationFrame(function() {
          return o2();
        }) : "function" == typeof requestAnimationFrame ? requestAnimationFrame(function() {
          return o2();
        }) : o2();
      }
    } }, { key: "getMaxLineWidth", value: function() {
      var t3 = this.get("options");
      return Math.min(t3.penSize, t3.maxLineWidth);
    } }, { key: "initPoint", value: function(t3, e2) {
      var n2 = { x: t3, y: e2, t: Date.now() }, i2 = this.points.slice(-1)[0];
      if (!i2 || i2.t !== n2.t && (i2.x !== t3 || i2.y !== e2)) {
        if (this.get("options").openSmooth && i2) {
          var o2 = this.points.slice(-2, -1)[0];
          if (n2.distance = Math.sqrt(Math.pow(n2.x - i2.x, 2) + Math.pow(n2.y - i2.y, 2)), n2.speed = n2.distance / (n2.t - i2.t || 0.1), n2.lineWidth = this.getLineWidth(n2.speed), o2 && o2.lineWidth && i2.lineWidth) {
            var r2 = (n2.lineWidth - i2.lineWidth) / i2.lineWidth, a2 = this.get("options").maxWidthDiffRate / 100;
            if (a2 = a2 > 1 ? 1 : 0.01 > a2 ? 0.01 : a2, Math.abs(r2) > a2)
              n2.lineWidth = i2.lineWidth * (1 + (r2 > 0 ? a2 : -a2));
          }
        }
        this.points.push(n2), this.points = this.points.slice(-3);
      }
    } }]), t2;
  }();
  (function() {
    function t2(e2) {
      i(this, t2), this.canvas = void 0, this._ee = void 0, this.pen = void 0;
      var n2 = new T(e2);
      n2.set("parent", this), this.canvas = n2, this._ee = new m(), this.pen = new O(n2), this.init();
    }
    return r(t2, [{ key: "init", value: function() {
      this.pen.active = true;
    } }, { key: "destroy", value: function() {
      this.canvas.destroy();
    } }, { key: "clear", value: function() {
      this.pen.clear();
    } }, { key: "undo", value: function() {
      this.pen.undo();
    } }, { key: "save", value: function() {
    } }, { key: "getContentBoundingBox", value: function(t3) {
      return this.pen.getContentBoundingBox(t3);
    } }, { key: "isEmpty", value: function() {
      return this.pen.isEmpty();
    } }, { key: "on", value: function(t3, e2) {
      this._ee.on(t3, e2);
    } }, { key: "emit", value: function(t3, e2) {
      this._ee.emit(t3, e2);
    } }, { key: "off", value: function(t3, e2) {
      this._ee.off(t3, e2);
    } }]), t2;
  })();
  const props = {
    styles: String,
    disableScroll: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: "2d"
    },
    // 画笔颜色
    penColor: {
      type: String,
      default: "black"
    },
    penSize: {
      type: Number,
      default: 2
    },
    // 画板背景颜色
    backgroundColor: String,
    // 笔锋
    openSmooth: Boolean,
    // 画笔最小值
    minLineWidth: {
      type: Number,
      default: 2
    },
    // 画笔最大值
    maxLineWidth: {
      type: Number,
      default: 6
    },
    // 画笔达到最小宽度所需最小速度(px/ms)，取值范围1.0-10.0，值越小，画笔越容易变细，笔锋效果会比较明显，可以自行调整查看效果，选出自己满意的值。
    minSpeed: {
      type: Number,
      default: 1.5
    },
    // 相邻两线宽度增(减)量最大百分比，取值范围1-100，为了达到笔锋效果，画笔宽度会随画笔速度而改变，如果相邻两线宽度差太大，过渡效果就会很突兀，使用maxWidthDiffRate限制宽度差，让过渡效果更自然。可以自行调整查看效果，选出自己满意的值。
    maxWidthDiffRate: {
      type: Number,
      default: 20
    },
    // 限制历史记录数，即最大可撤销数，传入0则关闭历史记录功能
    maxHistoryLength: {
      type: Number,
      default: 20
    },
    beforeDelay: {
      type: Number,
      default: 10
    },
    landscape: {
      type: Boolean
    },
    boundingBox: {
      type: Boolean
    }
  };
  const block0 = (Comp) => {
    (Comp.$renderjs || (Comp.$renderjs = [])).push("sign");
    (Comp.$renderjsModules || (Comp.$renderjsModules = {}))["sign"] = "2e28d683";
  };
  const _sfc_main$8 = {
    props,
    data() {
      return {
        canvasWidth: null,
        canvasHeight: null,
        offscreenWidth: null,
        offscreenHeight: null,
        useCanvas2d: true,
        show: true,
        offscreenStyles: "",
        showMask: false,
        rclear: 0,
        rundo: 0,
        rsave: JSON.stringify({
          n: 0,
          fileType: "png",
          quality: 1
        }),
        rempty: 0,
        risEmpty: true,
        toDataURL: null,
        tempFilePath: []
      };
    },
    computed: {
      canvasId() {
        return `lime-signature${this._.uid}`;
      },
      offscreenId() {
        return this.canvasId + "offscreen";
      },
      offscreenSize() {
        const { offscreenWidth, offscreenHeight } = this;
        return this.landscape ? [offscreenHeight, offscreenWidth] : [offscreenWidth, offscreenHeight];
      },
      canvasStyle() {
        const { canvasWidth, canvasHeight, backgroundColor } = this;
        return {
          width: canvasWidth && canvasWidth + "px",
          height: canvasHeight && canvasHeight + "px",
          background: backgroundColor
        };
      },
      param() {
        const {
          penColor,
          penSize,
          backgroundColor,
          landscape,
          boundingBox,
          openSmooth,
          minLineWidth,
          maxLineWidth,
          minSpeed,
          maxWidthDiffRate,
          maxHistoryLength,
          disableScroll
        } = this;
        return JSON.parse(JSON.stringify({
          penColor,
          penSize,
          backgroundColor,
          landscape,
          boundingBox,
          openSmooth,
          minLineWidth,
          maxLineWidth,
          minSpeed,
          maxWidthDiffRate,
          maxHistoryLength,
          disableScroll
        }));
      }
    },
    methods: {
      onPageFinish() {
        this.$refs.webview.evalJS(`update(${JSON.stringify(this.param)})`);
      },
      onMessage(e2 = {}) {
        var _a, _b, _c, _d;
        const {
          detail: {
            data: [res]
          }
        } = e2;
        if ((_a = res.event) == null ? void 0 : _a.save) {
          this.toDataURL = res.event.save;
        }
        if ((_b = res.event) == null ? void 0 : _b.changeSize) {
          res.event.changeSize;
        }
        if (res.event.hasOwnProperty("isEmpty")) {
          this.risEmpty = res.event.isEmpty;
        }
        if ((_c = res.event) == null ? void 0 : _c.file) {
          this.tempFilePath.push(res.event.file);
          if (this.tempFilePath.length > 7) {
            this.tempFilePath.shift();
          }
          return;
        }
        if ((_d = res.event) == null ? void 0 : _d.success) {
          if (res.event.success) {
            this.tempFilePath.push(res.event.success);
            if (this.tempFilePath.length > 8) {
              this.tempFilePath.shift();
            }
            this.toDataURL = this.tempFilePath.join("");
            this.tempFilePath = [];
          } else {
            this.$emit("fail", "canvas no data");
          }
          return;
        }
      },
      undo() {
        this.rundo += 1;
      },
      clear() {
        this.rclear += 1;
      },
      isEmpty() {
        this.rempty += 1;
      },
      canvasToTempFilePath(param) {
        this.isEmpty();
        const stopURLWatch = this.$watch("toDataURL", (v2, n2) => {
          if (v2 && v2 !== n2) {
            base64ToPath(v2).then((res) => {
              param.success({
                tempFilePath: res,
                isEmpty: this.risEmpty
              });
            });
            this.toDataURL = "";
          }
          stopURLWatch && stopURLWatch();
        });
        const {
          fileType,
          quality
        } = param;
        const rsave = JSON.parse(this.rsave);
        rsave.n++;
        rsave.fileType = fileType;
        rsave.quality = quality;
        this.rsave = JSON.stringify(rsave);
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return $data.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: "lime-signature",
        style: vue.normalizeStyle([$options.canvasStyle, _ctx.styles]),
        ref: "limeSignature"
      },
      [
        vue.createElementVNode("view", {
          id: $options.canvasId,
          disableScroll: _ctx.disableScroll,
          rparam: vue.wp($options.param),
          "change:rparam": _ctx.sign.update,
          rclear: vue.wp($data.rclear),
          "change:rclear": _ctx.sign.clear,
          rundo: vue.wp($data.rundo),
          "change:rundo": _ctx.sign.undo,
          rsave: vue.wp($data.rsave),
          "change:rsave": _ctx.sign.save,
          rempty: vue.wp($data.rempty),
          "change:rempty": _ctx.sign.isEmpty
        }, null, 8, ["id", "disableScroll", "rparam", "change:rparam", "rclear", "change:rclear", "rundo", "change:rundo", "rsave", "change:rsave", "rempty", "change:rempty"])
      ],
      4
      /* STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  if (typeof block0 === "function")
    block0(_sfc_main$8);
  const signature = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render], ["__scopeId", "data-v-0c3d094e"], ["__file", "D:/projects/work/applet/vue3_uview_plus/uni_modules/jp-signature/components/jp-signature/jp-signature.vue"]]);
  const _sfc_main$7 = {
    __name: "comForm",
    props: {
      config: "",
      title: "",
      data: "",
      imgurl: ""
    },
    setup(__props) {
      const props2 = __props;
      const interfaces = {
        requestTaskGoodSubmit,
        //劳保提交
        requestCreatSignSubmit,
        // 安全责任制发起人签字
        requestLetterSignSubmit,
        // 安全责任制签字
        requestMorningMeetingSubmit,
        // 晨会
        requestTaskCheckSub,
        //安全检查
        requestTaskEnd,
        //安全检查完成
        requestClapSubmit,
        //随手拍提交
        requestClapReSubmit,
        //随手怕审核
        requestDangerSubmit,
        // 随手拍上传  任务
        requestDangerZGSubmit,
        // 随手拍 整改
        requestDangerFHSubmit,
        // 随手拍 复核
        requestAddAcciSub,
        // 事故新增
        requestAcciReSubmit,
        // 事故确认
        requestAcciReportSubmit,
        // 事故上报
        requestAcciHandleSubmit
        // 事故处理
      };
      const userListCom = vue.ref();
      const uToast = vue.ref();
      const itemRefs = vue.ref({});
      const setItemRef = (item) => {
        return (el) => {
          if (el) {
            itemRefs.value[item.ref] = el;
          }
        };
      };
      useIndexStore();
      const state = vue.reactive({
        formInfo: props2.data ? JSON.parse(props2.data) : {},
        isSubmitIng: false,
        defPhotoSrc: "/static/icon/camera.png",
        photoSrc: {},
        datetimeShowr: false,
        recordStatus: 0,
        // 录音状态
        recorderManager: null,
        // 录音实例
        canUseRecord: true,
        //录音功能是否可用
        recordDuration: 0,
        recordPlaying: false,
        selectUser: "请选择责任人",
        signShow: false,
        submitParams: {},
        formFileShow: false,
        formFileUrl: ""
      });
      const formConfig = vue.computed(() => state.formInfo.config || {});
      const mainHideUpList = vue.computed(() => {
        if (state.formInfo && state.formInfo.domList)
          return state.formInfo.domList;
        if (state.formInfo)
          return state.formInfo;
        return [];
      });
      const dataInit = () => {
        mainHideUpList.value.map((item) => {
          if (["input"].includes(item.type)) {
            state[item.ref] = "";
          }
          if (item.type == "branch") {
            state[item.ref] = item.val || { name: "请选择部门" };
          }
          if (item.type == "user" || item.type == "userById") {
            state[item.ref] = item.val || { name: `请选择${item.title}` };
          }
          if (item.type == "radio") {
            if (item.val) {
              state[item.ref] = item.val;
            } else {
              state[item.ref] = item.options[0];
            }
          }
          if (["timeYMD", "time"].includes(item.type)) {
            state[item.ref] = Date.now();
          }
          if (item.type == "picker") {
            state[item.ref] = `请选择${item.title}`;
          }
          if (item.type == "sign") {
            state[`${item.ref}_img`] = item.val ? BASE_FILE_URL + item.val : "/static/icon/sign.png";
          }
          if (item.type == "table") {
            formatAppLog("log", "at pages/comForm/comForm.vue:303", item.options);
          }
          formatAppLog("log", "at pages/comForm/comForm.vue:306", item.ref, state[item.ref]);
        });
      };
      dataInit();
      const getPhoto = (obj) => {
        uni.chooseImage({
          count: 1,
          // 最多选择一张图片
          sourceType: ["album", "camera"],
          // 只允许从相机选择  'album'相册
          success: (res) => {
            const tempFilePaths = res.tempFilePaths;
            formatAppLog("log", "at pages/comForm/comForm.vue:320", tempFilePaths);
            state.photoSrc[obj.ref] = tempFilePaths[0];
          }
        });
      };
      const recordInit = () => {
        if (dd.canIUse("getRecorderManager")) {
          state.recorderManager = dd.getRecorderManager();
          state.recorderManager.onstart = () => {
            formatAppLog("log", "at pages/comForm/comForm.vue:331", "开始录音");
          };
          state.recorderManager.onstop = (res) => {
            formatAppLog("log", "at pages/comForm/comForm.vue:334", "结束录音");
            state.voidPath = res.tempFilePath;
            formatAppLog("log", "at pages/comForm/comForm.vue:341", res.tempFilePath);
          };
          state.recorderManager.onerror = (err) => {
            dd.showToast({ content: JSON.stringify(err) });
          };
        } else {
          state.canUseRecord = false;
          dd.showToast({ content: "请升级钉钉版本至4.5.18以支持录音功能" });
        }
      };
      const bgmInit = () => {
        state.audioManager = dd.getBackgroundAudioManager();
        state.audioManager.onError = (err) => {
          dd.showToast({ content: JSON.stringify(err) });
        };
      };
      let timerSecond = null;
      const getRecord = () => {
        if (!state.recorderManager)
          recordInit();
        if (!state.canUseRecord)
          return;
        if (state.recordStatus == 0) {
          state.recordStatus = 1;
          state.recorderManager.start({ duration: 60 });
          timerSecond = setInterval(() => {
            if (state.recordDuration < 60) {
              state.recordDuration++;
            } else {
              clearInterval(timerSecond);
              timerSecond = null;
            }
          }, 1e3);
          return;
        }
        if (state.recordStatus == 1) {
          clearInterval(timerSecond);
          timerSecond = null;
          state.recordStatus = 2;
          state.recorderManager.stop();
          return;
        }
      };
      const recordPlay = (e2) => {
        if (!state.audioManager)
          bgmInit();
        state.recordPlaying = true;
        state.audioManager.src = state.voidPath;
        state.audioManager.title = "";
        state.audioManager.play();
      };
      const recordStop = (e2) => {
        state.audioManager.src = state.voidPath;
        state.audioManager.title = "";
        state.audioManager.stop();
        state.recordPlaying = false;
      };
      const recordDelete = (e2) => {
        if (!state.audioManager)
          return;
        recordStop();
        state.recordStatus = 0;
        state.voidPath = "";
      };
      const handlePicker = (e2, obj) => {
        state[`${obj.ref}show`] = false;
        state[`${obj.ref}`] = e2.value[0];
        formatAppLog("log", "at pages/comForm/comForm.vue:418", state[`${obj.ref}`]);
      };
      const handleUserList = (obj) => {
        if (obj.type == "userById") {
          handleBranchList(obj);
          return;
        }
        uni.$u.route({
          url: "/pages/comUserList/comUserList",
          animationDuration: 300,
          animationType: "slide-in-bottom",
          params: {
            callData: JSON.stringify(obj)
          }
        });
      };
      const handleBranchList = (obj) => {
        uni.$u.route({
          url: "pages/comBranchList/comBranchList",
          animationDuration: 300,
          animationType: "slide-in-bottom",
          params: {
            callData: JSON.stringify(obj)
          }
        });
      };
      const comFormOpenFile = (obj) => {
        state.formFileShow = true;
        formatAppLog("log", "at pages/comForm/comForm.vue:459", `${BASE_LINE_PRE}${obj.val}`);
        state.formFileUrl = `${BASE_LINE_PRE}${BASE_FILE_URL}${obj.val}`;
      };
      const showToast = (text) => {
        uToast.value.show({
          top: 10,
          type: "primary",
          message: text || "请填写完整",
          duration: 1e3 * 3,
          safeAreaInsetTop: false
        });
      };
      const checkboxChange = (obj) => {
        formatAppLog("log", "at pages/comForm/comForm.vue:475", obj);
      };
      const uploadFile = (obj, path) => Promise.all(mainHideUpList.value.map(async (item) => {
        if (item.type == "photo" && (!item.show || item.show && state[item.show.ref] == item.show.val)) {
          let filePath = state.photoSrc[item.ref];
          await requestFileAdd(filePath).then((res) => {
            if (res.data) {
              let resObj = JSON.parse(res.data);
              formatAppLog("log", "at pages/comForm/comForm.vue:489", resObj);
              state.submitParams[item.key] = resObj.message;
            }
          });
        }
        if (item.type == "record" && (!item.show || item.show && state[item.show.ref] == item.show.val)) {
          let filePath = state.voidPath;
          formatAppLog("log", "at pages/comForm/comForm.vue:497", filePath);
          if (!filePath)
            return;
          await requestFileAdd(filePath).then((res) => {
            formatAppLog("log", "at pages/comForm/comForm.vue:505", res);
            if (res.data) {
              let resObj = JSON.parse(res.data);
              state.submitParams[item.key] = resObj.message;
            }
          });
        }
        if (item.type == "sign" && (!item.show || item.show && state[item.show.ref] == item.show.val)) {
          let dom2 = itemRefs.value[item.ref];
          const fn = () => new Promise(async (resolve, rej) => {
            await dom2.canvasToTempFilePath({
              success: (res) => {
                resolve(res.tempFilePath);
              }
            });
          });
          let signFilePath = await fn().then((r2) => r2).catch((e2) => e2);
          await requestFileAdd(signFilePath).then((res) => {
            if (res.data) {
              let resObj = JSON.parse(res.data);
              state.submitParams[item.key] = resObj.message;
            }
          });
        }
      }));
      const handleSubmit = async () => {
        if (state.isSubmitIng) {
          showToast("正在提交，请稍后操作！");
          return;
        }
        state.isSubmitIng = true;
        state.submitParams = {};
        await uploadFile();
        mainHideUpList.value.map((item) => {
          if (["input", "radio", "picker"].includes(item.type)) {
            state.submitParams[item.key] = state[item.ref];
          }
          if (["text", "picture"].includes(item.type)) {
            state.submitParams[item.key] = item.val;
          }
          if (["branch", "user"].includes(item.type)) {
            state.submitParams[item.key] = state[item.ref].id;
          }
          if (item.type == "time") {
            state.submitParams[item.key] = dayjs(state[item.ref]).format("YYYY-MM-DD HH:mm:ss");
          }
          if (item.type == "timeYMD") {
            state.submitParams[item.key] = dayjs(state[item.ref]).format("YYYY-MM-DD");
          }
        });
        formatAppLog("log", "at pages/comForm/comForm.vue:568", formConfig);
        if (formConfig.value.params) {
          state.submitParams = { ...formConfig.value.params, ...state.submitParams };
        }
        formatAppLog("log", "at pages/comForm/comForm.vue:574", "submitParams", state.submitParams);
        const result = await interfaces[formConfig.value.submitFn](state.submitParams);
        showToast(result.data.message);
        setTimeout(() => {
          state.isSubmitIng = false;
          if (formConfig.value.handleOthers && formConfig.value.handleOthers.length) {
            formatAppLog("log", "at pages/comForm/comForm.vue:584", formConfig.value.handleOthers);
            let nextPro = formConfig.value.handleOthers.shift();
            if (formConfig.value.handleOthers.length) {
              nextPro.config.handleOthers = formConfig.value.handleOthers;
            }
            state.formInfo = nextPro;
            dataInit();
            return;
          } else {
            uni.$u.route({
              type: "back",
              success: function() {
                beforePage.dasabi();
              }
            });
          }
        }, 1500);
      };
      onShow(() => {
        uni.$once("selectStaff", function(data) {
          let obj = JSON.parse(data);
          state[obj.callData.ref] = obj;
          formatAppLog("log", "at pages/comForm/comForm.vue:612", state[obj.callData.ref]);
        });
        uni.$once("selectBranch", function(data) {
          const obj = JSON.parse(data);
          state[obj.callData.ref] = obj.node;
          formatAppLog("log", "at pages/comForm/comForm.vue:623", state[obj.callData.ref]);
        });
        uni.setNavigationBarTitle({
          title: props2.title || ""
        });
        state.formFileShow = false;
        state.isSubmitIng = false;
      });
      vue.onBeforeUnmount(() => {
        clearInterval(timerSecond);
        timerSecond = null;
      });
      return (_ctx, _cache) => {
        const _component_u_radio = resolveEasycom(vue.resolveDynamicComponent("u-radio"), __easycom_0$1);
        const _component_u_radio_group = resolveEasycom(vue.resolveDynamicComponent("u-radio-group"), __easycom_1);
        const _component_u_checkbox = resolveEasycom(vue.resolveDynamicComponent("u-checkbox"), __easycom_2);
        const _component_u_checkbox_group = resolveEasycom(vue.resolveDynamicComponent("u-checkbox-group"), __easycom_3);
        const _component_u_button = resolveEasycom(vue.resolveDynamicComponent("u-button"), __easycom_0$a);
        const _component_u_datetime_picker = resolveEasycom(vue.resolveDynamicComponent("u-datetime-picker"), __easycom_5);
        const _component_u_picker = resolveEasycom(vue.resolveDynamicComponent("u-picker"), __easycom_6);
        const _component_userList = resolveEasycom(vue.resolveDynamicComponent("userList"), __easycom_7);
        const _component_u_notify = resolveEasycom(vue.resolveDynamicComponent("u-notify"), __easycom_2$3);
        const _component_u_loading_icon = resolveEasycom(vue.resolveDynamicComponent("u-loading-icon"), __easycom_9);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode("view", { class: "comForm" }, [
              vue.createCommentVNode(` <view class = 'comFormItem' v-for="item in mainHideUpList"  v-show = 'item.show && (state[item.show.ref] == item.show.val)'> `),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(vue.unref(mainHideUpList), (item) => {
                  var _a;
                  return vue.withDirectives((vue.openBlock(), vue.createElementBlock(
                    "view",
                    { class: "comFormItem" },
                    [
                      vue.createElementVNode(
                        "view",
                        { class: "comFormItemT" },
                        vue.toDisplayString(item.title),
                        1
                        /* TEXT */
                      ),
                      vue.createCommentVNode(" 文字 "),
                      item.type == "text" ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "comFormItemV",
                        id: `${(_a = vue.unref(formConfig)) == null ? void 0 : _a.from}_${item.key}`
                      }, vue.toDisplayString(item.val || ""), 9, ["id"])) : vue.createCommentVNode("v-if", true),
                      vue.createCommentVNode(" 输入框 "),
                      item.type == "input" ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 1,
                        class: "comFormItemV"
                      }, [
                        vue.withDirectives(vue.createElementVNode("input", {
                          type: "text",
                          placeholder: `请填写${item.title}`,
                          "onUpdate:modelValue": ($event) => state[item.ref] = $event
                        }, null, 8, ["placeholder", "onUpdate:modelValue"]), [
                          [vue.vModelText, state[item.ref]]
                        ])
                      ])) : vue.createCommentVNode("v-if", true),
                      vue.createCommentVNode(" 单选框"),
                      item.type == "radio" ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 2,
                        class: "comFormItemV"
                      }, [
                        vue.createVNode(_component_u_radio_group, {
                          modelValue: state[item.ref],
                          "onUpdate:modelValue": ($event) => state[item.ref] = $event,
                          placement: "row"
                        }, {
                          default: vue.withCtx(() => [
                            (vue.openBlock(true), vue.createElementBlock(
                              vue.Fragment,
                              null,
                              vue.renderList(item.options, (item2) => {
                                return vue.openBlock(), vue.createBlock(_component_u_radio, {
                                  customStyle: { margin: "16rpx" },
                                  key: item2,
                                  name: item2.key || item2,
                                  label: item2.label || item2
                                }, null, 8, ["name", "label"]);
                              }),
                              128
                              /* KEYED_FRAGMENT */
                            )),
                            vue.createCommentVNode(' <u-radio activeColor="#2979FF" label="恨悠悠"></u-radio> ')
                          ]),
                          _: 2
                          /* DYNAMIC */
                        }, 1032, ["modelValue", "onUpdate:modelValue"])
                      ])) : vue.createCommentVNode("v-if", true),
                      vue.createCommentVNode(" 复选框"),
                      item.type == "checkBox" ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 3,
                        class: "comFormItemV"
                      }, [
                        vue.createVNode(
                          _component_u_checkbox_group,
                          {
                            placement: "column",
                            onChange: checkboxChange
                          },
                          {
                            default: vue.withCtx(() => [
                              (vue.openBlock(true), vue.createElementBlock(
                                vue.Fragment,
                                null,
                                vue.renderList(item.options, (item2, index2) => {
                                  return vue.openBlock(), vue.createBlock(_component_u_checkbox, {
                                    customStyle: { marginBottom: "8px" },
                                    key: index2,
                                    label: item2.name,
                                    name: item2.key
                                  }, null, 8, ["label", "name"]);
                                }),
                                128
                                /* KEYED_FRAGMENT */
                              ))
                            ]),
                            _: 2
                            /* DYNAMIC */
                          },
                          1024
                          /* DYNAMIC_SLOTS */
                        )
                      ])) : vue.createCommentVNode("v-if", true),
                      vue.createCommentVNode(" 图片"),
                      item.type == "picture" ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 4,
                        class: "comFormItemV"
                      }, [
                        item.val ? (vue.openBlock(), vue.createElementBlock("img", {
                          key: 0,
                          class: "comFormItemVImg",
                          src: `${vue.unref(BASE_FILE_URL)}${item.val}`,
                          alt: ""
                        }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true)
                      ])) : vue.createCommentVNode("v-if", true),
                      vue.createCommentVNode(" 照相 "),
                      item.type == "photo" ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 5,
                        class: "comFormItemV",
                        onClick: ($event) => getPhoto(item)
                      }, [
                        state.photoSrc ? (vue.openBlock(), vue.createElementBlock("img", {
                          key: 0,
                          class: "comFormItemVImg",
                          src: state.photoSrc[item.ref] || state.defPhotoSrc,
                          alt: ""
                        }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true)
                      ], 8, ["onClick"])) : vue.createCommentVNode("v-if", true),
                      vue.createCommentVNode(" 录音 "),
                      item.type == "record" ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 6,
                        class: "comFormItemV"
                      }, [
                        vue.createCommentVNode(` <img v-if = 'state.photoSrc' class = 'comFormItemVImg' :src="state.photoSrc" alt=""> `),
                        vue.withDirectives(vue.createElementVNode(
                          "view",
                          {
                            class: "comFormItemTip",
                            onClick: _cache[0] || (_cache[0] = ($event) => getRecord())
                          },
                          " 开始录音(最长60s) ",
                          512
                          /* NEED_PATCH */
                        ), [
                          [vue.vShow, state.recordStatus == 0]
                        ]),
                        vue.withDirectives(vue.createElementVNode(
                          "view",
                          {
                            class: "comFormItemTip",
                            onClick: _cache[1] || (_cache[1] = ($event) => getRecord())
                          },
                          [
                            vue.createElementVNode("text", null, "点击结束   "),
                            vue.createElementVNode(
                              "text",
                              { class: "comFormItemTipTime" },
                              vue.toDisplayString(`00:${state.recordDuration < 10 ? "0" : ""}${state.recordDuration}`),
                              1
                              /* TEXT */
                            )
                          ],
                          512
                          /* NEED_PATCH */
                        ), [
                          [vue.vShow, state.recordStatus == 1]
                        ]),
                        vue.withDirectives(vue.createElementVNode(
                          "view",
                          { class: "comFormItemVBtns" },
                          [
                            vue.createElementVNode("view", { class: "comFormItemVBtn" }, [
                              vue.createTextVNode(
                                vue.toDisplayString(state.recordPlaying) + " ",
                                1
                                /* TEXT */
                              ),
                              !state.recordPlaying ? (vue.openBlock(), vue.createBlock(_component_u_button, {
                                key: 0,
                                type: "primary",
                                shape: "circle",
                                ripple: true,
                                size: "small",
                                onClick: _cache[2] || (_cache[2] = ($event) => recordPlay())
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createTextVNode("播放")
                                ]),
                                _: 1
                                /* STABLE */
                              })) : (vue.openBlock(), vue.createBlock(_component_u_button, {
                                key: 1,
                                type: "primary",
                                shape: "circle",
                                ripple: true,
                                size: "small",
                                onClick: _cache[3] || (_cache[3] = ($event) => recordStop())
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createTextVNode("停止")
                                ]),
                                _: 1
                                /* STABLE */
                              }))
                            ]),
                            vue.createElementVNode("view", { class: "comFormItemVBtn" }, [
                              vue.createVNode(_component_u_button, {
                                type: "primary",
                                shape: "circle",
                                ripple: true,
                                size: "small",
                                onClick: _cache[4] || (_cache[4] = ($event) => recordDelete())
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createTextVNode("删除")
                                ]),
                                _: 1
                                /* STABLE */
                              })
                            ])
                          ],
                          512
                          /* NEED_PATCH */
                        ), [
                          [vue.vShow, state.recordStatus == 2]
                        ])
                      ])) : vue.createCommentVNode("v-if", true),
                      vue.createCommentVNode(" 时间选择器 "),
                      ["time", "timeYMD"].includes(item.type) ? (vue.openBlock(), vue.createElementBlock(
                        "view",
                        {
                          key: 7,
                          class: "comFormItemV",
                          onTouchmove: _cache[9] || (_cache[9] = vue.withModifiers(() => {
                          }, ["stop", "prevent"]))
                        },
                        [
                          vue.createVNode(_component_u_datetime_picker, {
                            show: state.datetimeShowr,
                            modelValue: state[item.ref],
                            "onUpdate:modelValue": ($event) => state[item.ref] = $event,
                            mode: "datetime",
                            closeOnClickOverlay: true,
                            onClose: _cache[5] || (_cache[5] = ($event) => state.datetimeShowr = false),
                            onCancel: _cache[6] || (_cache[6] = ($event) => state.datetimeShowr = false),
                            onConfirm: _cache[7] || (_cache[7] = ($event) => state.datetimeShowr = false)
                          }, null, 8, ["show", "modelValue", "onUpdate:modelValue"]),
                          vue.createElementVNode(
                            "view",
                            {
                              class: "comFormItemTip",
                              onClick: _cache[8] || (_cache[8] = ($event) => state.datetimeShowr = true)
                            },
                            vue.toDisplayString(vue.unref(dayjs)(state[item.ref]).format("YYYY-MM-DD HH:mm:ss")),
                            1
                            /* TEXT */
                          )
                        ],
                        32
                        /* HYDRATE_EVENTS */
                      )) : vue.createCommentVNode("v-if", true),
                      vue.createCommentVNode(" 选择器 "),
                      item.type == "picker" ? (vue.openBlock(), vue.createElementBlock(
                        "view",
                        {
                          key: 8,
                          class: "comFormItemV",
                          onTouchmove: _cache[10] || (_cache[10] = vue.withModifiers(() => {
                          }, ["stop", "prevent"]))
                        },
                        [
                          vue.createVNode(_component_u_picker, {
                            show: state[`${item.ref}show`],
                            columns: item.options,
                            closeOnClickOverlay: true,
                            onClose: ($event) => state[`${item.ref}show`] = false,
                            onCancel: ($event) => state[`${item.ref}show`] = false,
                            onConfirm: ($event) => handlePicker($event, item)
                          }, null, 8, ["show", "columns", "onClose", "onCancel", "onConfirm"]),
                          vue.createElementVNode("view", {
                            class: "comFormItemTip",
                            onClick: ($event) => state[`${item.ref}show`] = true
                          }, vue.toDisplayString(state[`${item.ref}`]), 9, ["onClick"])
                        ],
                        32
                        /* HYDRATE_EVENTS */
                      )) : vue.createCommentVNode("v-if", true),
                      vue.createCommentVNode(" 打开用户列表 "),
                      ["user", "userById"].includes(item.type) ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 9,
                        class: "comFormItemV",
                        onClick: ($event) => handleUserList(item)
                      }, [
                        vue.createElementVNode(
                          "view",
                          { class: "comFormItemTip" },
                          vue.toDisplayString(state[item.ref].name || ""),
                          1
                          /* TEXT */
                        )
                      ], 8, ["onClick"])) : vue.createCommentVNode("v-if", true),
                      vue.createCommentVNode(" 打开部门列表 "),
                      item.type == "branch" ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 10,
                        class: "comFormItemV",
                        onClick: ($event) => handleBranchList(item)
                      }, [
                        vue.createElementVNode(
                          "view",
                          { class: "comFormItemTip" },
                          vue.toDisplayString(state[item.ref].name || ""),
                          1
                          /* TEXT */
                        )
                      ], 8, ["onClick"])) : vue.createCommentVNode("v-if", true),
                      vue.createCommentVNode(" 工作简历 "),
                      item.type == "list" ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 11,
                        class: "comFormItemV"
                      }, [
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList(item.val, (listItem) => {
                            return vue.openBlock(), vue.createElementBlock("view", { class: "comFormListItem" }, [
                              (vue.openBlock(true), vue.createElementBlock(
                                vue.Fragment,
                                null,
                                vue.renderList(listItem, (listItemVal, listItemKey) => {
                                  return vue.openBlock(), vue.createElementBlock("view", { class: "comFormListItemObj" }, [
                                    vue.createElementVNode(
                                      "view",
                                      { class: "comFormListItemObjL" },
                                      vue.toDisplayString(listItemKey) + ": ",
                                      1
                                      /* TEXT */
                                    ),
                                    vue.createElementVNode(
                                      "view",
                                      null,
                                      vue.toDisplayString(listItemVal),
                                      1
                                      /* TEXT */
                                    )
                                  ]);
                                }),
                                256
                                /* UNKEYED_FRAGMENT */
                              ))
                            ]);
                          }),
                          256
                          /* UNKEYED_FRAGMENT */
                        ))
                      ])) : vue.createCommentVNode("v-if", true),
                      vue.createCommentVNode(" 电子签字 "),
                      item.type == "sign" ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 12,
                        class: "comFormItemV"
                      }, [
                        vue.withDirectives(vue.createElementVNode(
                          "view",
                          { class: "comFormItemVSign" },
                          [
                            vue.createVNode(
                              signature,
                              {
                                ref_for: true,
                                ref: setItemRef(item)
                              },
                              null,
                              512
                              /* NEED_PATCH */
                            )
                          ],
                          512
                          /* NEED_PATCH */
                        ), [
                          [vue.vShow, state.signShow]
                        ]),
                        vue.withDirectives(vue.createElementVNode(
                          "view",
                          {
                            class: "comFormItemSign",
                            onClick: _cache[11] || (_cache[11] = ($event) => state.signShow = !state.signShow)
                          },
                          [
                            vue.createElementVNode("img", {
                              class: "comFormItemSignImg",
                              src: state[`${item.ref}_img`],
                              alt: ""
                            }, null, 8, ["src"])
                          ],
                          512
                          /* NEED_PATCH */
                        ), [
                          [vue.vShow, !state.signShow]
                        ])
                      ])) : vue.createCommentVNode("v-if", true),
                      vue.createCommentVNode(" 表格 "),
                      item.type == "table" ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 13,
                        class: "comFormItemV"
                      }, [
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList(item.options, (row) => {
                            return vue.openBlock(), vue.createElementBlock("view", { class: "comFormItemVRow" }, [
                              (vue.openBlock(true), vue.createElementBlock(
                                vue.Fragment,
                                null,
                                vue.renderList(row, (cell) => {
                                  return vue.openBlock(), vue.createElementBlock("view", { class: "comFormItemVRowCell" }, [
                                    cell.cellType == "img" ? (vue.openBlock(), vue.createElementBlock("img", {
                                      key: 0,
                                      src: vue.unref(BASE_FILE_URL) + cell.imgSrc,
                                      alt: "",
                                      class: "comFormItemVRowCellImg"
                                    }, null, 8, ["src"])) : (vue.openBlock(), vue.createElementBlock(
                                      "view",
                                      { key: 1 },
                                      vue.toDisplayString(cell.name || ""),
                                      1
                                      /* TEXT */
                                    ))
                                  ]);
                                }),
                                256
                                /* UNKEYED_FRAGMENT */
                              ))
                            ]);
                          }),
                          256
                          /* UNKEYED_FRAGMENT */
                        ))
                      ])) : vue.createCommentVNode("v-if", true),
                      vue.createCommentVNode(" 文件 "),
                      item.type == "file" ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 14,
                        class: "comFormItemV",
                        onClick: ($event) => comFormOpenFile(item)
                      }, [
                        vue.createTextVNode(" 点击查看文件>> "),
                        state.formFileShow ? (vue.openBlock(), vue.createElementBlock("view", {
                          key: 0,
                          class: "comDocShow"
                        }, [
                          vue.createElementVNode("web-view", {
                            ref_for: true,
                            ref: "fileShowWeb",
                            src: state.formFileUrl
                          }, null, 8, ["src"])
                        ])) : vue.createCommentVNode("v-if", true)
                      ], 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
                    ],
                    512
                    /* NEED_PATCH */
                  )), [
                    [vue.vShow, !item.show || item.show && state[item.show.ref] == item.show.val]
                  ]);
                }),
                256
                /* UNKEYED_FRAGMENT */
              ))
            ]),
            vue.withDirectives(vue.createElementVNode(
              "view",
              {
                class: "taskHideBtn",
                onClick: _cache[12] || (_cache[12] = ($event) => handleSubmit())
              },
              [
                vue.createVNode(_component_u_button, {
                  type: "primary",
                  shape: "circle",
                  ripple: true,
                  size: "medium "
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode("提交")
                  ]),
                  _: 1
                  /* STABLE */
                })
              ],
              512
              /* NEED_PATCH */
            ), [
              [vue.vShow, vue.unref(formConfig).submitFn]
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("img", {
                src: state.imgurl,
                alt: ""
              }, null, 8, ["src"])
            ]),
            vue.createVNode(
              _component_userList,
              {
                ref_key: "userListCom",
                ref: userListCom
              },
              null,
              512
              /* NEED_PATCH */
            ),
            vue.createVNode(
              _component_u_notify,
              {
                ref_key: "uToast",
                ref: uToast
              },
              null,
              512
              /* NEED_PATCH */
            ),
            vue.createCommentVNode(' <u-loadmore :show="state.isSubmitIng" mode="flower"></u-loadmore> '),
            vue.createCommentVNode(' <u-loading mode="circle"></u-loading> '),
            vue.createCommentVNode(' <u-modal v-model="state.isSubmitIng">\r\n		\r\n	</u-modal> '),
            vue.withDirectives(vue.createElementVNode(
              "view",
              { class: "comFormLoading" },
              [
                vue.createVNode(_component_u_loading_icon, { text: "" })
              ],
              512
              /* NEED_PATCH */
            ), [
              [vue.vShow, state.isSubmitIng]
            ]),
            vue.createCommentVNode(' <u-loading-icon text="花朵形"></u-loading-icon> ')
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const PagesComFormComForm = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/comForm/comForm.vue"]]);
  const _sfc_main$6 = {
    __name: "comDocLearn",
    props: {
      config: ""
    },
    setup(__props) {
      const props2 = __props;
      const user = GET_STORAGE("USER") || {};
      useIndexStore();
      const state = vue.reactive({
        // taskType: 1,
        title: "",
        configObj: JSON.parse(props2.config),
        docList: [],
        // preFileSrc: 'http://221.214.164.186:18880/open_office/?src=',
        posFileSrc: "",
        fileShow: false,
        fileSrc: "",
        fileType: "word",
        taskPlanPhone: "",
        curentDocInfo: {},
        docBtn: false,
        docBtnText: ""
      });
      const fileShowWeb = vue.ref();
      const fileUrl = vue.computed(() => {
        formatAppLog("log", "at pages/comDocLearn/comDocLearn.vue:68", BASE_LINE_PRE + state.posFileSrc);
        return state.posFileSrc ? BASE_LINE_PRE + encodeURIComponent(state.posFileSrc) : "";
      });
      const getDocData = async () => {
        let params = {};
        let docInterData = null;
        if (state.configObj.from == "taskPlan") {
          let docInterData2 = await requestTaskPlanContent(state.configObj.id).then((res) => res).catch((e2) => e2);
          if (!docInterData2 || !docInterData2.data || !docInterData2.data.t) {
            return;
          }
          state.paperInfo = docInterData2.data.t.paper;
          let dataObj = docInterData2.data.t.eduList || [];
          state.docList = dataObj.map((item) => {
            return {
              ...item,
              rightVal: item.status == 2 ? "已完成" : `需学习：${item.setTime || 0}学时`
              // secName: item.status == 2? '已完成': '点击开始'
            };
          });
          state.docBtn = state.docList.every((item) => item.status == 2);
          state.docBtnText = "已完成培训";
          formatAppLog("log", "at pages/comDocLearn/comDocLearn.vue:108", "docInterData", state.docList);
          return;
        }
        if (state.configObj.from == "know") {
          params.page = 1;
          if (state.configObj.inter == "Post") {
            params.type = state.configObj.key;
            docInterData = await requestKnowPostInfo(params).then((res) => res).catch((e2) => e2);
          }
          if (state.configObj.inter == "Law") {
            params.type = "法律法规";
            docInterData = await requestKnowLawInfo(params).then((res) => res).catch((e2) => e2);
          }
          if (state.configObj.inter == "Rule") {
            docInterData = await requestKnowRuleInfo(params).then((res) => res).catch((e2) => e2);
          }
          if (state.configObj.inter == "Factor") {
            docInterData = await requestKnowFactorInfo(params).then((res) => res).catch((e2) => e2);
          }
          formatAppLog("log", "at pages/comDocLearn/comDocLearn.vue:133", "docInterData", docInterData);
          if (!docInterData || !docInterData.data || !docInterData.data.t) {
            return;
          }
          state.docList = docInterData.data.t.content || [];
        }
      };
      function openDocment2(obj) {
        formatAppLog("log", "at pages/comDocLearn/comDocLearn.vue:146", obj);
        state.curentDocInfo = obj;
        let time = "";
        if (obj.status != 2 && obj.setTime) {
          time = `&time=${obj.setTime * 60 * 45}`;
        }
        if (state.configObj.from == "taskPlan") {
          uni.showToast({
            title: "请切换至前置摄像头",
            duration: 1e3 * 2
          });
          uni.chooseImage({
            count: 1,
            // 最多选择一张图片
            sourceType: ["camera"],
            // 只允许从相机选择  'album'相册
            success: async (res) => {
              formatAppLog("log", "at pages/comDocLearn/comDocLearn.vue:161", res);
              const tempFilePaths = res.tempFilePaths;
              formatAppLog("log", "at pages/comDocLearn/comDocLearn.vue:164", tempFilePaths);
              await requestFileAdd(tempFilePaths[0]).then((res2) => {
                if (res2.data) {
                  let resObj = JSON.parse(res2.data);
                  formatAppLog("log", "at pages/comDocLearn/comDocLearn.vue:170", resObj);
                  state.taskPlanPhoto = resObj.message;
                  state.startTime = (/* @__PURE__ */ new Date()).getTime();
                  state.posFileSrc = `${obj.file1.slice(0, 4) == "http" ? "" : BASE_FILE_URL}${obj.file1}${time}`;
                  state.fileShow = true;
                }
              });
            }
          });
          return;
        }
        formatAppLog("log", "at pages/comDocLearn/comDocLearn.vue:183", `${obj.file1.slice(0, 4) == "http" ? "" : BASE_FILE_URL}${obj.file1}`);
        state.posFileSrc = `${obj.file1.slice(0, 4) == "http" ? "" : BASE_FILE_URL}${obj.file1}`;
        state.fileShow = true;
        return;
      }
      const webCallback = async (e2) => {
        formatAppLog("log", "at pages/comDocLearn/comDocLearn.vue:191", e2);
        if (e2.detail.status) {
          formatAppLog("log", "at pages/comDocLearn/comDocLearn.vue:193", "学习完成");
          let startArr = formatDate(state.startTime);
          let endArr = formatDate();
          if (state.configObj.from == "taskPlan") {
            const params = {
              peId: state.curentDocInfo.id,
              startTime: `${startArr[0]}-${startArr[1]} ${startArr[3]}:${startArr[4]}`,
              endTime: `${endArr[0]}-${endArr[1]} ${endArr[3]}:${endArr[4]}`,
              status: 2,
              avatar: state.taskPlanPhoto || "",
              imgs: user.portrait
            };
            requestTrainLearnSubmit(params).then((res) => {
              formatAppLog("log", "at pages/comDocLearn/comDocLearn.vue:208", res);
              uni.showToast({
                title: res.data.message || "学习完成",
                duration: 1e3 * 2
              });
            });
          }
        }
      };
      const handleDocBtn = () => {
        formatAppLog("log", "at pages/comDocLearn/comDocLearn.vue:219", 3333);
        let obj = state.configObj;
        formatAppLog("log", "at pages/comDocLearn/comDocLearn.vue:222", obj);
        obj.title = "培训考试";
        obj.from = "taskPlan";
        obj.paper = state.paperInfo;
        uni.$u.route({
          url: "/pages/comExam/comExam",
          params: {
            config: JSON.stringify(obj)
          }
        });
      };
      onShow(() => {
        getDocData();
        uni.setNavigationBarTitle({
          title: state.configObj.title || ""
        });
      });
      vue.onMounted(() => {
        formatAppLog("log", "at pages/comDocLearn/comDocLearn.vue:242", props2.configObj);
      });
      return (_ctx, _cache) => {
        const _component_u_button = resolveEasycom(vue.resolveDynamicComponent("u-button"), __easycom_0$a);
        return vue.openBlock(), vue.createElementBlock("view", { class: "comDoc" }, [
          vue.createCommentVNode(" <view class = 'uni-title'>{{state.title}}</view> "),
          vue.createElementVNode("view", { class: "comDocContainer" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(state.docList, (item) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "comDocItem",
                  onClick: ($event) => openDocment2(item)
                }, [
                  vue.createElementVNode("img", {
                    class: "comDocItemImg",
                    src: `/static/office/${vue.unref(getFileType)(item.file1) || "link"}.png`,
                    alt: ""
                  }, null, 8, ["src"]),
                  vue.createElementVNode("view", { class: "comDocItemMsg" }, [
                    vue.createElementVNode(
                      "view",
                      null,
                      vue.toDisplayString(item.name || item.title || ""),
                      1
                      /* TEXT */
                    ),
                    item.secName ? (vue.openBlock(), vue.createElementBlock(
                      "view",
                      {
                        key: 0,
                        class: "comDocItemMsgSec"
                      },
                      vue.toDisplayString(item.secName),
                      1
                      /* TEXT */
                    )) : vue.createCommentVNode("v-if", true),
                    vue.createCommentVNode(` <text class = 'comDocItemMsg'>{{item.name || item.title || ""}}</text> `)
                  ]),
                  item.rightVal ? (vue.openBlock(), vue.createElementBlock(
                    "text",
                    {
                      key: 0,
                      class: "comDocItemTime"
                    },
                    vue.toDisplayString(item.rightVal || ""),
                    1
                    /* TEXT */
                  )) : vue.createCommentVNode("v-if", true)
                ], 8, ["onClick"]);
              }),
              256
              /* UNKEYED_FRAGMENT */
            ))
          ]),
          state.docBtn ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "comFormBtnCon"
          }, [
            vue.createVNode(_component_u_button, {
              type: "primary",
              shape: "circle",
              ripple: true,
              onClick: _cache[0] || (_cache[0] = ($event) => handleDocBtn())
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode(
                  vue.toDisplayString(state.docBtnText || ""),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            })
          ])) : vue.createCommentVNode("v-if", true),
          state.fileShow ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "comDocShow"
          }, [
            vue.createElementVNode("web-view", {
              ref_key: "fileShowWeb",
              ref: fileShowWeb,
              src: vue.unref(fileUrl),
              onMessage: webCallback
            }, null, 40, ["src"])
          ])) : vue.createCommentVNode("v-if", true)
        ]);
      };
    }
  };
  const PagesComDocLearnComDocLearn = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/comDocLearn/comDocLearn.vue"]]);
  const _sfc_main$5 = {
    __name: "treeMenu",
    props: {
      nodes: "",
      isChild: "",
      parTreeId: "",
      callData: ""
    },
    setup(__props) {
      const props2 = __props;
      useIndexStore();
      const state = vue.reactive({
        searchText: ""
      });
      const filterNodesByName = () => {
        if (!props2.nodes || !props2.nodes.length)
          return [];
        return props2.nodes.map((item, index2) => {
          item.treeId = props2.parTreeId ? `${props2.parTreeId}_${index2 + 1}` : index2 + 1;
          state[`showChildren_${item.treeId}`] = false;
          return item;
        }).filter((node) => node.name.toLowerCase().includes(state.searchText.toLowerCase()));
      };
      const filteredNodes = vue.computed(() => filterNodesByName());
      const treeItemClick = (node, treeId) => {
        formatAppLog("log", "at components/treeMenu/treeMenu.vue:64", node);
        formatAppLog("log", "at components/treeMenu/treeMenu.vue:65", treeId);
        node.expanded = !node.expanded;
        state[`showChildren_${node.treeId}`] = Array.isArray(node.children) && node.children.length > 0 && node.expanded;
        if (Array.isArray(node.children) && node.children.length > 0)
          return;
        let str = JSON.stringify({ node, callData: JSON.parse(props2.callData) });
        uni.$emit("selectBranch", str);
        uni.$u.route({
          type: "back"
        });
      };
      return (_ctx, _cache) => {
        const _component_treeMenu = resolveEasycom(vue.resolveDynamicComponent("treeMenu", true), __easycom_0);
        return vue.openBlock(), vue.createElementBlock("view", { class: "treeMenu" }, [
          vue.createCommentVNode(" 输入框 "),
          !__props.isChild ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "treeMenuInput"
          }, [
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                class: "treeMenuInputIn",
                type: "text",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => state.searchText = $event),
                placeholder: "搜索.."
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, state.searchText]
            ])
          ])) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" 根节点 "),
          vue.createElementVNode("view", { class: "treeMenuCon" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(vue.unref(filteredNodes), (node, index2) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: node.id,
                  class: "treeMenuItem"
                }, [
                  vue.createElementVNode("view", {
                    class: "treeMenuTitle",
                    onClick: ($event) => treeItemClick(node, index2 + 1)
                  }, [
                    vue.createElementVNode("img", {
                      class: "treeMenuItemIcon",
                      src: `/static/icon/tree/${Array.isArray(node.children) && node.children.length > 0 ? "tree-expand" : "tree-retract"}.png`,
                      alt: ""
                    }, null, 8, ["src"]),
                    vue.createElementVNode(
                      "text",
                      { class: "treeMenuItemMsg" },
                      vue.toDisplayString(node.name),
                      1
                      /* TEXT */
                    )
                  ], 8, ["onClick"]),
                  vue.createCommentVNode(" 子节点 "),
                  vue.withDirectives(vue.createElementVNode(
                    "view",
                    { class: "treeMenuItemCon" },
                    [
                      vue.createVNode(_component_treeMenu, {
                        nodes: node.children,
                        isChild: true,
                        parTreeId: node.treeId,
                        callData: __props.callData
                      }, null, 8, ["nodes", "parTreeId", "callData"])
                    ],
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vShow, state[`showChildren_${node.treeId}`]]
                  ])
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ]);
      };
    }
  };
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-c5451143"], ["__file", "D:/projects/work/applet/vue3_uview_plus/components/treeMenu/treeMenu.vue"]]);
  const _sfc_main$4 = {
    __name: "comBranchList",
    props: {
      callData: ""
    },
    setup(__props) {
      const props2 = __props;
      const store = useIndexStore();
      const state = vue.reactive({
        // taskType: 1,
      });
      formatAppLog("log", "at pages/comBranchList/comBranchList.vue:24", 111, props2.callData);
      const getDeptList = async (id) => {
        await store.setAllDept();
        state.nodes = store.allDept;
      };
      getDeptList();
      return (_ctx, _cache) => {
        const _component_treeMenu = resolveEasycom(vue.resolveDynamicComponent("treeMenu"), __easycom_0);
        return vue.openBlock(), vue.createElementBlock("view", { class: "branchList" }, [
          vue.createVNode(_component_treeMenu, {
            nodes: state.nodes,
            callData: __props.callData
          }, null, 8, ["nodes", "callData"])
        ]);
      };
    }
  };
  const PagesComBranchListComBranchList = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/comBranchList/comBranchList.vue"]]);
  const _sfc_main$3 = {
    __name: "comModelList",
    props: {
      config: ""
    },
    setup(__props) {
      const props2 = __props;
      const modelListObj = props2.config ? JSON.parse(props2.config) : {};
      const childList = modelListObj.childList || [];
      formatAppLog("log", "at pages/comModelList/comModelList.vue:24", modelListObj);
      formatAppLog("log", "at pages/comModelList/comModelList.vue:25", 3333);
      useIndexStore();
      vue.reactive({
        // taskType: 1,
      });
      const handleAccident = (obj) => {
        formatAppLog("log", "at pages/comModelList/comModelList.vue:42", obj);
        uni.$u.route({
          url: obj.page
        });
      };
      onShow(() => {
        uni.setNavigationBarTitle({
          title: modelListObj.title || ""
        });
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "applyAccident" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(vue.unref(childList), (item) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "applyAccidentItem",
                onClick: ($event) => handleAccident(item)
              }, [
                vue.createElementVNode("img", {
                  class: "applyAccidentItemImg",
                  src: `/static/icon/${item.icon}.png`,
                  alt: ""
                }, null, 8, ["src"]),
                vue.createTextVNode(
                  " " + vue.toDisplayString(item.title),
                  1
                  /* TEXT */
                )
              ], 8, ["onClick"]);
            }),
            256
            /* UNKEYED_FRAGMENT */
          ))
        ]);
      };
    }
  };
  const PagesComModelListComModelList = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/comModelList/comModelList.vue"]]);
  const _sfc_main$2 = {
    __name: "comExam",
    props: {
      config: ""
    },
    setup(__props) {
      const props2 = __props;
      const user = GET_STORAGE("USER") || {};
      const popupSign = vue.ref();
      const uToast = vue.ref();
      const configObj = JSON.parse(props2.config);
      const examPreList = [
        "考试限时，请在规定时间内答完题目。",
        "考试不满80分，请重新考试。",
        "需学习完成全部课件后才可进行本次考试。"
      ];
      useIndexStore();
      const state = vue.reactive({
        examPrepare: true,
        taskExamPhoto: "",
        popupShow: false,
        popTexts: { texts: [] },
        // paperList: [],
        timer: null,
        paperList: [],
        curentSubId: 1,
        curentSub: { options: "" },
        subjectAnswer: [{ answer: "" }],
        examPreList,
        isExtra: false,
        isColl: false,
        overTime: false
      });
      const codeList = ["A", "B", "C", "D", "E", "F", "G"];
      if (configObj && configObj.paper) {
        if (configObj.paper.score != void 0) {
          state.examPreList.push(`本次考试成绩为：${configObj.paper.score}`);
        }
        if (configObj.paper.extraScore != void 0) {
          state.examPreList.push(`本次补考成绩为：${configObj.paper.extraScore}`);
        }
        if (configObj.paper.score < 80) {
          state.isExtra = true;
        }
      }
      const isIncludesAns = vue.computed((_2) => (answer) => {
        let is = false;
        if (state.subjectAnswer && state.subjectAnswer[state.curentSubId - 1] && state.subjectAnswer[state.curentSubId - 1].answer) {
          is = state.subjectAnswer[state.curentSubId - 1].answer.includes(answer);
        }
        return is;
      });
      const examBtnShow = vue.computed(() => {
        let isShow = true;
        if (configObj.paper.extraScore != void 0) {
          isShow = false;
        }
        if (configObj.paper.score && configObj.paper.score - 0 >= 80) {
          isShow = false;
        }
        return isShow;
      });
      const startExam = (e2) => {
        state.examPrepare = !state.examPrepare;
        if (configObj.from == "taskPlan") {
          uni.showToast({
            title: "请切换至前置摄像头",
            duration: 1e3 * 2
          });
          uni.chooseImage({
            count: 1,
            // 最多选择一张图片
            sourceType: ["camera"],
            // 只允许从相机选择  'album'相册
            success: async (res) => {
              formatAppLog("log", "at pages/comExam/comExam.vue:184", res);
              const tempFilePaths = res.tempFilePaths;
              formatAppLog("log", "at pages/comExam/comExam.vue:187", tempFilePaths);
              await requestFileAdd(tempFilePaths[0]).then((res2) => {
                if (res2.data) {
                  let resObj = JSON.parse(res2.data);
                  formatAppLog("log", "at pages/comExam/comExam.vue:193", resObj);
                  state.taskExamPhoto = resObj.message;
                  state.startExamTime = (/* @__PURE__ */ new Date()).getTime();
                  state.popupShow = true;
                  state.popTexts = {
                    type: "start",
                    texts: ["是否开始考试?", "开始答题后不能退出!"]
                  };
                }
              });
            }
          });
          return;
        }
      };
      const popupClose = () => {
        const type = state.popTexts.type;
        if (state.overTime) {
          return;
        }
        if (type == "submit") {
          state.popupShow = false;
          return;
        }
        state.popupShow = false;
        state.popTexts = { texts: [] };
        uni.$u.route({
          type: "back"
        });
      };
      const popupOpen = () => {
        formatAppLog("log", "at pages/comExam/comExam.vue:228", "popupOpen");
      };
      const popupConfirm = () => {
        state.popupShow = false;
        const type = state.popTexts.type;
        if (type == "start") {
          state.popTexts = {
            type: "sign",
            texts: ["请先签字后进行考试!"]
          };
          state.popupShow = true;
        }
        if (type == "sign") {
          state.popTexts = { texts: [] };
          saveSign();
          randerPaper();
        }
        if (type == "submit") {
          let startTArr = formatDate(state.startExamTime);
          let endTArr = formatDate();
          let tpId = state.isExtra ? configObj.paper.extraTpId : configObj.paper.tpId;
          formatAppLog("log", "at pages/comExam/comExam.vue:252", 333333);
          let params = {
            tpId,
            startTime: `${startTArr[0]}-${startTArr[1]} ${startTArr[3]}:${startTArr[4]}`,
            endTime: `${endTArr[0]}-${endTArr[1]} ${endTArr[3]}:${startTArr[4]}`,
            // sign:state.signImgUrl,
            imgs: user.portrait || "",
            avatar: state.taskExamPhoto || ""
          };
          params.sign = state.signImgUrl || "";
          state.subjectAnswer.map((obj, i2) => {
            Object.keys(obj).map((item) => {
              params[`items[${i2}].${item}`] = obj[item];
            });
          });
          let Corrects = state.subjectAnswer.filter((item) => item.correct);
          let score = (Corrects.length / state.subjectAnswer.length * 100).toFixed(1);
          const fn = state.isExtra ? requestPlanExtraPaper : requestPlanPaperIbank;
          formatAppLog("log", "at pages/comExam/comExam.vue:275", params);
          fn(params).then((r2) => {
            formatAppLog("log", "at pages/comExam/comExam.vue:283", r2);
            if (r2.data.success) {
              state.popTexts = {
                type: "result",
                texts: [`考试成绩: ${score}`, "如未达到80分需参加补考！"]
              };
              state.popupShow = true;
            } else {
              uToast.value.show({
                top: 10,
                type: "primary",
                message: "网络原因请稍后再试",
                duration: 1e3 * 3,
                safeAreaInsetTop: false
              });
            }
          });
        }
        if (type == "result") {
          state.popupShow = false;
          state.popTexts = { texts: [] };
          uni.$u.route({
            type: "back"
          });
        }
      };
      const handleCanvas = () => new Promise(async (resolve, rej) => {
        await popupSign.value.canvasToTempFilePath({
          success: (res) => {
            resolve(res.tempFilePath);
          }
        });
      });
      const saveSign = async () => {
        let signFilePath = await handleCanvas().then((r2) => r2).catch((e2) => e2);
        await requestFileAdd(signFilePath).then((res) => {
          formatAppLog("log", "at pages/comExam/comExam.vue:336", res);
          if (res.data) {
            let resObj = JSON.parse(res.data);
            state.signImgUrl = resObj.message;
          }
        });
      };
      const randerPaper = async () => {
        let id = state.isExtra ? configObj.paper.extraTpId : configObj.paper.tpId;
        const paperInfoInter = await requestPlanPaperInfo(id);
        if (!paperInfoInter.data || !paperInfoInter.data.t) {
          return;
        }
        state.paperList = paperInfoInter.data.t;
        state.subjectAnswer = state.paperList.map((item) => ({
          id: item.id,
          tpiId: item.tpiId,
          correct: false,
          answer: "",
          answerOld: item.answer,
          type: item.type
        }));
        state.curentSub = state.paperList[0];
        clearTimeout(state.timer);
        timeRander();
        formatAppLog("log", "at pages/comExam/comExam.vue:368", state.paperList);
      };
      const timeRander = (time) => {
        time = time || configObj.paper.time * 60 || 0;
        state.showTime = getTiming(time);
        if (time <= 0) {
          state.popTexts = {
            type: "submit",
            texts: ["您的答题结束,是否提交试卷?!"]
          };
          state.overTime = true;
          clearTimeout(state.timer);
          state.timer = null;
        }
        time--;
        clearTimeout(state.timer);
        state.timer = setTimeout(() => timeRander(time), 1e3);
      };
      const changeSubject = (isLast) => {
        state.curentSubId = isLast ? state.curentSubId - 1 : state.curentSubId + 1;
        if (state.curentSubId > state.paperList.length) {
          state.popTexts = {
            type: "submit",
            texts: ["您的答题结束,是否提交试卷?!"]
          };
          state.popupShow = true;
          state.curentSubId = state.paperList.length;
          return;
        }
        if (state.curentSubId <= 1) {
          state.curentSubId = 1;
        }
        if (state.curentSubId == state.paperList.length) {
          state.curentSubId = state.paperList.length;
        }
        state.curentSub = state.paperList[state.curentSubId - 1];
        state.isColl = Boolean(state.curentSub.collectId);
      };
      const selectAnswer = (answer, code2) => {
        formatAppLog("log", "at pages/comExam/comExam.vue:434", answer);
        formatAppLog("log", "at pages/comExam/comExam.vue:441", 33232);
        formatAppLog("log", "at pages/comExam/comExam.vue:442", state.subjectAnswer);
        const curSubAnswer = state.subjectAnswer[state.curentSubId - 1];
        if (curSubAnswer.type == 3) {
          if (curSubAnswer.answer.includes(code2)) {
            curSubAnswer.answer = curSubAnswer.answer.replace(code2, "");
          } else {
            curSubAnswer.answer = orderCode(curSubAnswer.answer + code2);
          }
        } else {
          curSubAnswer.answer = code2;
        }
        curSubAnswer.correct = curSubAnswer.answer == curSubAnswer.answerOld;
        state.subjectAnswer[state.curentSubId - 1] = curSubAnswer;
        let arr = state.subjectAnswer;
        arr[state.curentSubId - 1] = curSubAnswer;
        state.subjectAnswer = arr;
        formatAppLog("log", "at pages/comExam/comExam.vue:459", curSubAnswer);
        formatAppLog("log", "at pages/comExam/comExam.vue:460", state.subjectAnswer);
      };
      const lookSubJect = (str) => {
        formatAppLog("log", "at pages/comExam/comExam.vue:465", str);
        formatAppLog("log", "at pages/comExam/comExam.vue:466", configObj);
        let seExtra = str.includes("补考");
        let paperId = seExtra ? configObj.paper.extraTpId : configObj.paper.tpId;
        uni.$u.route({
          url: "/pages/comExamLook/comExamLook",
          params: {
            config: JSON.stringify({ ...configObj, paperId })
          }
        });
      };
      const subIsColl = () => {
        state.isColl = !state.isColl;
        formatAppLog("log", "at pages/comExam/comExam.vue:480", state.curentSub);
        if (state.isColl) {
          requestPlancollectAdd({ type: 1, id: state.curentSub.id }).then((r2) => {
            formatAppLog("log", "at pages/comExam/comExam.vue:483", r2);
            if (r2.data.t) {
              state.paperList[state.curentSubId].collectId = r2.data.t;
              uToast.value.show({
                top: 10,
                type: "primary",
                message: "收藏成功",
                duration: 1e3 * 2,
                safeAreaInsetTop: false
              });
            }
          });
        } else {
          if (state.curentSub.collectId) {
            requestPlancollectDel(state.curentSub.collectId);
          }
        }
      };
      onHide(() => {
        clearInterval(state.timer);
        state.timer = null;
      });
      return (_ctx, _cache) => {
        const _component_u_button = resolveEasycom(vue.resolveDynamicComponent("u-button"), __easycom_0$a);
        const _component_u_popup = resolveEasycom(vue.resolveDynamicComponent("u-popup"), __easycom_1$4);
        const _component_u_notify = resolveEasycom(vue.resolveDynamicComponent("u-notify"), __easycom_2$3);
        return vue.openBlock(), vue.createElementBlock("view", { class: "comExam" }, [
          vue.withDirectives(vue.createElementVNode(
            "view",
            { class: "comExamPre" },
            [
              vue.createElementVNode("view", { class: "comExamPreT" }, "考试须知"),
              (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(examPreList, (str) => {
                  return vue.createElementVNode("view", { class: "comExamPreLine" }, [
                    vue.createElementVNode("img", {
                      class: "comExamPrePoint",
                      src: "/static/icon/point.png",
                      alt: ""
                    }),
                    vue.createElementVNode(
                      "text",
                      { class: "comExamPreText" },
                      vue.toDisplayString(str),
                      1
                      /* TEXT */
                    ),
                    str.includes("成绩为") ? (vue.openBlock(), vue.createElementBlock("text", {
                      key: 0,
                      class: "comExamPreLook",
                      onClick: ($event) => lookSubJect(str)
                    }, "查看试卷", 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
                  ]);
                }),
                64
                /* STABLE_FRAGMENT */
              )),
              vue.unref(examBtnShow) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "comExamBtnCon"
              }, [
                vue.createCommentVNode(" <view class = 'comExamBtnCon' v-if = 'true'> "),
                vue.createVNode(_component_u_button, {
                  type: "primary",
                  shape: "circle",
                  ripple: true,
                  onClick: _cache[0] || (_cache[0] = ($event) => startExam())
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(
                      vue.toDisplayString(state.isExtra ? "补考答题" : "开始考试"),
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 1
                  /* STABLE */
                })
              ])) : vue.createCommentVNode("v-if", true)
            ],
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, state.examPrepare]
          ]),
          vue.createCommentVNode(" 考试题 "),
          !state.examPrepare ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "comExamMain"
          }, [
            vue.createElementVNode(
              "view",
              { class: "comExamMainTime" },
              vue.toDisplayString(state.showTime),
              1
              /* TEXT */
            ),
            vue.createElementVNode("view", { class: "comExamPtypeLine" }, [
              vue.createElementVNode(
                "view",
                { class: "comExamPtype" },
                vue.toDisplayString(["判断题", "单选题", "多选题"][state.curentSub.type - 1]),
                1
                /* TEXT */
              ),
              vue.createCommentVNode(" <view> "),
              vue.createElementVNode("img", {
                class: "comExamPImg",
                src: `/static/icon/${state.isColl ? "collectDel" : "collectAdd"}.png`,
                alt: "",
                onClick: _cache[1] || (_cache[1] = ($event) => subIsColl())
              }, null, 8, ["src"]),
              vue.createCommentVNode(" </view> ")
            ]),
            vue.createElementVNode(
              "view",
              { class: "comExamPTitle" },
              vue.toDisplayString(state.curentSub.title),
              1
              /* TEXT */
            ),
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(state.curentSub.options.split("|"), (item, index2) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: vue.normalizeClass(["comExamPItem", { comExamPItemSe: vue.unref(isIncludesAns)(codeList[index2]) }]),
                  onClick: ($event) => selectAnswer(item, codeList[index2])
                }, [
                  vue.createElementVNode(
                    "text",
                    { class: "comExamPItemLeft" },
                    vue.toDisplayString(codeList[index2]) + ".",
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString(item),
                    1
                    /* TEXT */
                  )
                ], 10, ["onClick"]);
              }),
              256
              /* UNKEYED_FRAGMENT */
            )),
            vue.createElementVNode("view", { class: "comExamPBottom" }, [
              vue.createElementVNode("view", {
                onClick: _cache[2] || (_cache[2] = ($event) => changeSubject(true))
              }, "上一题"),
              vue.createElementVNode(
                "view",
                null,
                vue.toDisplayString(state.curentSubId) + "/" + vue.toDisplayString(state.paperList.length),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                {
                  onClick: _cache[3] || (_cache[3] = ($event) => changeSubject())
                },
                vue.toDisplayString(state.paperList.length == state.curentSubId ? "提交" : "下一题"),
                1
                /* TEXT */
              )
            ])
          ])) : vue.createCommentVNode("v-if", true),
          vue.createVNode(_component_u_popup, {
            show: state.popupShow,
            round: 10,
            mode: "center",
            safeAreaInsetBottom: false,
            onClose: popupClose,
            onOpen: popupOpen
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "popupContainer" }, [
                vue.withDirectives(vue.createElementVNode(
                  "view",
                  { class: "popupMainText" },
                  [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(state.popTexts.texts, (text) => {
                        return vue.openBlock(), vue.createElementBlock(
                          "view",
                          null,
                          vue.toDisplayString(text),
                          1
                          /* TEXT */
                        );
                      }),
                      256
                      /* UNKEYED_FRAGMENT */
                    ))
                  ],
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vShow, state.popTexts.texts.length]
                ]),
                vue.withDirectives(vue.createElementVNode(
                  "view",
                  { class: "comFormItemVSign" },
                  [
                    vue.createVNode(
                      signature,
                      {
                        ref_key: "popupSign",
                        ref: popupSign
                      },
                      null,
                      512
                      /* NEED_PATCH */
                    )
                  ],
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vShow, state.popTexts.type == "sign"]
                ]),
                vue.createElementVNode("view", { class: "popupMainBtns" }, [
                  vue.createElementVNode("view", {
                    class: "popupMainBtnItem",
                    onClick: _cache[4] || (_cache[4] = ($event) => popupClose())
                  }, "取消"),
                  vue.createElementVNode("view", {
                    class: "popupMainBtnItem popupMainBtnsConfirm",
                    onClick: _cache[5] || (_cache[5] = ($event) => popupConfirm())
                  }, "确定")
                ])
              ])
            ]),
            _: 1
            /* STABLE */
          }, 8, ["show"]),
          vue.createVNode(
            _component_u_notify,
            {
              ref_key: "uToast",
              ref: uToast
            },
            null,
            512
            /* NEED_PATCH */
          )
        ]);
      };
    }
  };
  const PagesComExamComExam = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/comExam/comExam.vue"]]);
  const _sfc_main$1 = {
    __name: "comExamLook",
    props: {
      config: ""
    },
    setup(__props) {
      const props2 = __props;
      const codeList = ["A", "B", "C", "D", "E", "F", "G"];
      const configObj = JSON.parse(props2.config) || {};
      const paper = configObj.paper || {};
      useIndexStore();
      const state = vue.reactive({
        paperInfo: []
      });
      const getPlanInfo = async () => {
        formatAppLog("log", "at pages/comExamLook/comExamLook.vue:45", configObj);
        const paperInfoInter = await requestPlanPaper2Info(configObj.paperId).then((r2) => r2).catch((e2) => {
        });
        formatAppLog("log", "at pages/comExamLook/comExamLook.vue:48", paperInfoInter);
        if (!paperInfoInter.data || !paperInfoInter.data.t) {
          return;
        }
        state.paperInfo = paperInfoInter.data.t || [];
        formatAppLog("log", "at pages/comExamLook/comExamLook.vue:53", state.paperInfo);
        formatAppLog("log", "at pages/comExamLook/comExamLook.vue:54", 22222);
      };
      onShow(() => {
        getPlanInfo();
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "comExamL" }, [
          vue.createElementVNode(
            "view",
            { class: "comExamLPName" },
            vue.toDisplayString(vue.unref(paper).tpName),
            1
            /* TEXT */
          ),
          vue.createCommentVNode(' <view class="comExamLScore">得分：{{paper.extraScore}}</view> '),
          vue.createElementVNode("view", { class: "comExamLScore" }, [
            vue.createElementVNode(
              "view",
              { class: "comExamLScore2" },
              vue.toDisplayString(vue.unref(paper).score || vue.unref(paper).extraScore),
              1
              /* TEXT */
            )
          ]),
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(state.paperInfo, (item, i2) => {
              return vue.openBlock(), vue.createElementBlock("view", null, [
                vue.createElementVNode(
                  "view",
                  { class: "comExamLTitle" },
                  vue.toDisplayString(i2 + 1) + ". " + vue.toDisplayString(item.title),
                  1
                  /* TEXT */
                ),
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(item.options.split("|"), (option, index2) => {
                    return vue.openBlock(), vue.createElementBlock(
                      "view",
                      {
                        class: vue.normalizeClass(["comExamLItem", { comExamLItemSe: item.answerOld.includes(codeList[index2]) }])
                      },
                      [
                        vue.createElementVNode(
                          "text",
                          { class: "comExamLItemSeLeft" },
                          vue.toDisplayString(codeList[index2]) + ".",
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "text",
                          null,
                          vue.toDisplayString(option),
                          1
                          /* TEXT */
                        )
                      ],
                      2
                      /* CLASS */
                    );
                  }),
                  256
                  /* UNKEYED_FRAGMENT */
                ))
              ]);
            }),
            256
            /* UNKEYED_FRAGMENT */
          ))
        ]);
      };
    }
  };
  const PagesComExamLookComExamLook = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "D:/projects/work/applet/vue3_uview_plus/pages/comExamLook/comExamLook.vue"]]);
  __definePage("pages/task/task", PagesTaskTask);
  __definePage("pages/taskHideRule/taskHideRule", PagesTaskHideRuleTaskHideRule);
  __definePage("pages/taskHideUp/taskHideUp", PagesTaskHideUpTaskHideUp);
  __definePage("pages/taskTrainPlan/taskTrainPlan", PagesTaskTrainPlanTaskTrainPlan);
  __definePage("pages/taskRespkp/taskRespkp", PagesTaskRespkpTaskRespkp);
  __definePage("pages/taskCulture/taskCulture", PagesTaskCultureTaskCulture);
  __definePage("pages/taskDanCheck/taskDanCheck", PagesTaskDanCheckTaskDanCheck);
  __definePage("pages/taskCollectGood/taskCollectGood", PagesTaskCollectGoodTaskCollectGood);
  __definePage("pages/taskLetter/taskLetter", PagesTaskLetterTaskLetter);
  __definePage("pages/know/know", PagesKnowKnow);
  __definePage("pages/knowSign/knowSign", PagesKnowSignKnowSign);
  __definePage("pages/apply/apply", PagesApplyApply);
  __definePage("pages/applyAcciReply/applyAcciReply", PagesApplyAcciReplyApplyAcciReply);
  __definePage("pages/applyRisk/applyRisk", PagesApplyRiskApplyRisk);
  __definePage("pages/setting/setting", PagesSettingSetting);
  __definePage("pages/T_A_clapping/T_A_clapping", PagesT_A_clappingT_A_clapping);
  __definePage("pages/T_A_acciUp/T_A_acciUp", PagesT_A_acciUpT_A_acciUp);
  __definePage("pages/T_A_work/T_A_work", PagesT_A_workT_A_work);
  __definePage("pages/comUserList/comUserList", PagesComUserListComUserList);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/comForm/comForm", PagesComFormComForm);
  __definePage("pages/comDocLearn/comDocLearn", PagesComDocLearnComDocLearn);
  __definePage("pages/comBranchList/comBranchList", PagesComBranchListComBranchList);
  __definePage("pages/comModelList/comModelList", PagesComModelListComModelList);
  __definePage("pages/comExam/comExam", PagesComExamComExam);
  __definePage("pages/comExamLook/comExamLook", PagesComExamLookComExamLook);
  const _sfc_main = {
    onLaunch: function() {
    },
    onShow: async function() {
      formatAppLog("log", "at App.vue:53", "App Show");
      const store = useUserStore();
      let data = {
        // "uname": "371325198708147329",
        "uname": "32031119810806461X",
        // 碧万顷
        // "uname": "37142719940307001X",  // 张斌
        // "uname": "370681199904162236",
        "upass": "ht123456"
      };
      const requestLogin = (data2) => uni.$u.http.post("/api/sys/user/login", data2);
      const userInfo = await requestLogin(data).then((res) => res).catch((e2) => e2);
      if (!userInfo || userInfo.statusCode != 200 || !userInfo.data.t) {
        formatAppLog("log", "at App.vue:99", "未获取用户信息,请联系管理员!");
        uni.showToast({
          title: userInfo.data.message,
          icon: "fail",
          duration: 1500
        });
      }
      const info = userInfo.data.t || {};
      store.updateToken(info.token);
      store.updateUserInfo(info.user);
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:134", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/projects/work/applet/vue3_uview_plus/App.vue"]]);
  const { toString } = Object.prototype;
  function isArray(val) {
    return toString.call(val) === "[object Array]";
  }
  function isObject(val) {
    return val !== null && typeof val === "object";
  }
  function isDate(val) {
    return toString.call(val) === "[object Date]";
  }
  function isURLSearchParams(val) {
    return typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams;
  }
  function forEach(obj, fn) {
    if (obj === null || typeof obj === "undefined") {
      return;
    }
    if (typeof obj !== "object") {
      obj = [obj];
    }
    if (isArray(obj)) {
      for (let i2 = 0, l2 = obj.length; i2 < l2; i2++) {
        fn.call(null, obj[i2], i2, obj);
      }
    } else {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj);
        }
      }
    }
  }
  function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
  }
  function deepMerge$1() {
    const result = {};
    function assignValue(val, key) {
      if (typeof result[key] === "object" && typeof val === "object") {
        result[key] = deepMerge$1(result[key], val);
      } else if (typeof val === "object") {
        result[key] = deepMerge$1({}, val);
      } else {
        result[key] = val;
      }
    }
    for (let i2 = 0, l2 = arguments.length; i2 < l2; i2++) {
      forEach(arguments[i2], assignValue);
    }
    return result;
  }
  function isUndefined(val) {
    return typeof val === "undefined";
  }
  function encode(val) {
    return encodeURIComponent(val).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  }
  function buildURL(url2, params) {
    if (!params) {
      return url2;
    }
    let serializedParams;
    if (isURLSearchParams(params)) {
      serializedParams = params.toString();
    } else {
      const parts = [];
      forEach(params, (val, key) => {
        if (val === null || typeof val === "undefined") {
          return;
        }
        if (isArray(val)) {
          key = `${key}[]`;
        } else {
          val = [val];
        }
        forEach(val, (v2) => {
          if (isDate(v2)) {
            v2 = v2.toISOString();
          } else if (isObject(v2)) {
            v2 = JSON.stringify(v2);
          }
          parts.push(`${encode(key)}=${encode(v2)}`);
        });
      });
      serializedParams = parts.join("&");
    }
    if (serializedParams) {
      const hashmarkIndex = url2.indexOf("#");
      if (hashmarkIndex !== -1) {
        url2 = url2.slice(0, hashmarkIndex);
      }
      url2 += (url2.indexOf("?") === -1 ? "?" : "&") + serializedParams;
    }
    return url2;
  }
  function isAbsoluteURL(url2) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url2);
  }
  function combineURLs(baseURL, relativeURL) {
    return relativeURL ? `${baseURL.replace(/\/+$/, "")}/${relativeURL.replace(/^\/+/, "")}` : baseURL;
  }
  function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  }
  function settle(resolve, reject, response) {
    const { validateStatus } = response.config;
    const status = response.statusCode;
    if (status && (!validateStatus || validateStatus(status))) {
      resolve(response);
    } else {
      reject(response);
    }
  }
  const mergeKeys$1 = (keys, config2) => {
    const config3 = {};
    keys.forEach((prop) => {
      if (!isUndefined(config2[prop])) {
        config3[prop] = config2[prop];
      }
    });
    return config3;
  };
  const adapter = (config2) => new Promise((resolve, reject) => {
    const fullPath = buildURL(buildFullPath(config2.baseURL, config2.url), config2.params);
    const _config = {
      url: fullPath,
      header: config2.header,
      complete: (response) => {
        config2.fullPath = fullPath;
        response.config = config2;
        try {
          if (typeof response.data === "string") {
            response.data = JSON.parse(response.data);
          }
        } catch (e2) {
        }
        settle(resolve, reject, response);
      }
    };
    let requestTask;
    if (config2.method === "UPLOAD") {
      delete _config.header["content-type"];
      delete _config.header["Content-Type"];
      const otherConfig = {
        filePath: config2.filePath,
        name: config2.name
      };
      const optionalKeys = [
        "files",
        "timeout",
        "formData"
      ];
      requestTask = uni.uploadFile({ ..._config, ...otherConfig, ...mergeKeys$1(optionalKeys, config2) });
    } else if (config2.method === "DOWNLOAD") {
      if (!isUndefined(config2.timeout)) {
        _config.timeout = config2.timeout;
      }
      requestTask = uni.downloadFile(_config);
    } else {
      const optionalKeys = [
        "data",
        "method",
        "timeout",
        "dataType",
        "responseType",
        "sslVerify",
        "firstIpv4"
      ];
      requestTask = uni.request({ ..._config, ...mergeKeys$1(optionalKeys, config2) });
    }
    if (config2.getTask) {
      config2.getTask(requestTask, config2);
    }
  });
  const dispatchRequest = (config2) => adapter(config2);
  function InterceptorManager() {
    this.handlers = [];
  }
  InterceptorManager.prototype.use = function use(fulfilled, rejected) {
    this.handlers.push({
      fulfilled,
      rejected
    });
    return this.handlers.length - 1;
  };
  InterceptorManager.prototype.eject = function eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  };
  InterceptorManager.prototype.forEach = function forEach2(fn) {
    this.handlers.forEach((h2) => {
      if (h2 !== null) {
        fn(h2);
      }
    });
  };
  const mergeKeys = (keys, globalsConfig, config2) => {
    const config3 = {};
    keys.forEach((prop) => {
      if (!isUndefined(config2[prop])) {
        config3[prop] = config2[prop];
      } else if (!isUndefined(globalsConfig[prop])) {
        config3[prop] = globalsConfig[prop];
      }
    });
    return config3;
  };
  const mergeConfig = (globalsConfig, config2 = {}) => {
    const method = config2.method || globalsConfig.method || "GET";
    let config3 = {
      baseURL: globalsConfig.baseURL || "",
      method,
      url: config2.url || "",
      params: config2.params || {},
      custom: { ...globalsConfig.custom || {}, ...config2.custom || {} },
      header: deepMerge$1(globalsConfig.header || {}, config2.header || {})
    };
    const defaultToConfig2Keys = ["getTask", "validateStatus"];
    config3 = { ...config3, ...mergeKeys(defaultToConfig2Keys, globalsConfig, config2) };
    if (method === "DOWNLOAD") {
      if (!isUndefined(config2.timeout)) {
        config3.timeout = config2.timeout;
      } else if (!isUndefined(globalsConfig.timeout)) {
        config3.timeout = globalsConfig.timeout;
      }
    } else if (method === "UPLOAD") {
      delete config3.header["content-type"];
      delete config3.header["Content-Type"];
      const uploadKeys = [
        "files",
        "filePath",
        "name",
        "timeout",
        "formData"
      ];
      uploadKeys.forEach((prop) => {
        if (!isUndefined(config2[prop])) {
          config3[prop] = config2[prop];
        }
      });
      if (isUndefined(config3.timeout) && !isUndefined(globalsConfig.timeout)) {
        config3.timeout = globalsConfig.timeout;
      }
    } else {
      const defaultsKeys = [
        "data",
        "timeout",
        "dataType",
        "responseType",
        "sslVerify",
        "firstIpv4"
      ];
      config3 = { ...config3, ...mergeKeys(defaultsKeys, globalsConfig, config2) };
    }
    return config3;
  };
  const defaults = {
    baseURL: "",
    header: {},
    method: "GET",
    dataType: "json",
    responseType: "text",
    custom: {},
    timeout: 6e4,
    sslVerify: true,
    firstIpv4: false,
    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    }
  };
  var clone = function() {
    function _instanceof(obj, type) {
      return type != null && obj instanceof type;
    }
    var nativeMap;
    try {
      nativeMap = Map;
    } catch (_2) {
      nativeMap = function() {
      };
    }
    var nativeSet;
    try {
      nativeSet = Set;
    } catch (_2) {
      nativeSet = function() {
      };
    }
    var nativePromise;
    try {
      nativePromise = Promise;
    } catch (_2) {
      nativePromise = function() {
      };
    }
    function clone2(parent, circular, depth, prototype, includeNonEnumerable) {
      if (typeof circular === "object") {
        depth = circular.depth;
        prototype = circular.prototype;
        includeNonEnumerable = circular.includeNonEnumerable;
        circular = circular.circular;
      }
      var allParents = [];
      var allChildren = [];
      var useBuffer = typeof Buffer != "undefined";
      if (typeof circular == "undefined")
        circular = true;
      if (typeof depth == "undefined")
        depth = Infinity;
      function _clone(parent2, depth2) {
        if (parent2 === null)
          return null;
        if (depth2 === 0)
          return parent2;
        var child;
        var proto2;
        if (typeof parent2 != "object") {
          return parent2;
        }
        if (_instanceof(parent2, nativeMap)) {
          child = new nativeMap();
        } else if (_instanceof(parent2, nativeSet)) {
          child = new nativeSet();
        } else if (_instanceof(parent2, nativePromise)) {
          child = new nativePromise(function(resolve, reject) {
            parent2.then(function(value) {
              resolve(_clone(value, depth2 - 1));
            }, function(err) {
              reject(_clone(err, depth2 - 1));
            });
          });
        } else if (clone2.__isArray(parent2)) {
          child = [];
        } else if (clone2.__isRegExp(parent2)) {
          child = new RegExp(parent2.source, __getRegExpFlags(parent2));
          if (parent2.lastIndex)
            child.lastIndex = parent2.lastIndex;
        } else if (clone2.__isDate(parent2)) {
          child = new Date(parent2.getTime());
        } else if (useBuffer && Buffer.isBuffer(parent2)) {
          if (Buffer.from) {
            child = Buffer.from(parent2);
          } else {
            child = new Buffer(parent2.length);
            parent2.copy(child);
          }
          return child;
        } else if (_instanceof(parent2, Error)) {
          child = Object.create(parent2);
        } else {
          if (typeof prototype == "undefined") {
            proto2 = Object.getPrototypeOf(parent2);
            child = Object.create(proto2);
          } else {
            child = Object.create(prototype);
            proto2 = prototype;
          }
        }
        if (circular) {
          var index2 = allParents.indexOf(parent2);
          if (index2 != -1) {
            return allChildren[index2];
          }
          allParents.push(parent2);
          allChildren.push(child);
        }
        if (_instanceof(parent2, nativeMap)) {
          parent2.forEach(function(value, key) {
            var keyChild = _clone(key, depth2 - 1);
            var valueChild = _clone(value, depth2 - 1);
            child.set(keyChild, valueChild);
          });
        }
        if (_instanceof(parent2, nativeSet)) {
          parent2.forEach(function(value) {
            var entryChild = _clone(value, depth2 - 1);
            child.add(entryChild);
          });
        }
        for (var i2 in parent2) {
          var attrs = Object.getOwnPropertyDescriptor(parent2, i2);
          if (attrs) {
            child[i2] = _clone(parent2[i2], depth2 - 1);
          }
          try {
            var objProperty = Object.getOwnPropertyDescriptor(parent2, i2);
            if (objProperty.set === "undefined") {
              continue;
            }
            child[i2] = _clone(parent2[i2], depth2 - 1);
          } catch (e2) {
            if (e2 instanceof TypeError) {
              continue;
            } else if (e2 instanceof ReferenceError) {
              continue;
            }
          }
        }
        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(parent2);
          for (var i2 = 0; i2 < symbols.length; i2++) {
            var symbol = symbols[i2];
            var descriptor = Object.getOwnPropertyDescriptor(parent2, symbol);
            if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
              continue;
            }
            child[symbol] = _clone(parent2[symbol], depth2 - 1);
            Object.defineProperty(child, symbol, descriptor);
          }
        }
        if (includeNonEnumerable) {
          var allPropertyNames = Object.getOwnPropertyNames(parent2);
          for (var i2 = 0; i2 < allPropertyNames.length; i2++) {
            var propertyName = allPropertyNames[i2];
            var descriptor = Object.getOwnPropertyDescriptor(parent2, propertyName);
            if (descriptor && descriptor.enumerable) {
              continue;
            }
            child[propertyName] = _clone(parent2[propertyName], depth2 - 1);
            Object.defineProperty(child, propertyName, descriptor);
          }
        }
        return child;
      }
      return _clone(parent, depth);
    }
    clone2.clonePrototype = function clonePrototype(parent) {
      if (parent === null)
        return null;
      var c2 = function() {
      };
      c2.prototype = parent;
      return new c2();
    };
    function __objToStr(o2) {
      return Object.prototype.toString.call(o2);
    }
    clone2.__objToStr = __objToStr;
    function __isDate(o2) {
      return typeof o2 === "object" && __objToStr(o2) === "[object Date]";
    }
    clone2.__isDate = __isDate;
    function __isArray(o2) {
      return typeof o2 === "object" && __objToStr(o2) === "[object Array]";
    }
    clone2.__isArray = __isArray;
    function __isRegExp(o2) {
      return typeof o2 === "object" && __objToStr(o2) === "[object RegExp]";
    }
    clone2.__isRegExp = __isRegExp;
    function __getRegExpFlags(re) {
      var flags = "";
      if (re.global)
        flags += "g";
      if (re.ignoreCase)
        flags += "i";
      if (re.multiline)
        flags += "m";
      return flags;
    }
    clone2.__getRegExpFlags = __getRegExpFlags;
    return clone2;
  }();
  class Request {
    /**
    * @param {Object} arg - 全局配置
    * @param {String} arg.baseURL - 全局根路径
    * @param {Object} arg.header - 全局header
    * @param {String} arg.method = [GET|POST|PUT|DELETE|CONNECT|HEAD|OPTIONS|TRACE] - 全局默认请求方式
    * @param {String} arg.dataType = [json] - 全局默认的dataType
    * @param {String} arg.responseType = [text|arraybuffer] - 全局默认的responseType。支付宝小程序不支持
    * @param {Object} arg.custom - 全局默认的自定义参数
    * @param {Number} arg.timeout - 全局默认的超时时间，单位 ms。默认60000。H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)、微信小程序（2.10.0）、支付宝小程序
    * @param {Boolean} arg.sslVerify - 全局默认的是否验证 ssl 证书。默认true.仅App安卓端支持（HBuilderX 2.3.3+）
    * @param {Boolean} arg.withCredentials - 全局默认的跨域请求时是否携带凭证（cookies）。默认false。仅H5支持（HBuilderX 2.6.15+）
    * @param {Boolean} arg.firstIpv4 - 全DNS解析时优先使用ipv4。默认false。仅 App-Android 支持 (HBuilderX 2.8.0+)
    * @param {Function(statusCode):Boolean} arg.validateStatus - 全局默认的自定义验证器。默认statusCode >= 200 && statusCode < 300
    */
    constructor(arg = {}) {
      if (!isPlainObject(arg)) {
        arg = {};
        formatAppLog("warn", "at uni_modules/uview-plus/libs/luch-request/core/Request.js:39", "设置全局参数必须接收一个Object");
      }
      this.config = clone({ ...defaults, ...arg });
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    /**
    * @Function
    * @param {Request~setConfigCallback} f - 设置全局默认配置
    */
    setConfig(f2) {
      this.config = f2(this.config);
    }
    middleware(config2) {
      config2 = mergeConfig(this.config, config2);
      const chain = [dispatchRequest, void 0];
      let promise2 = Promise.resolve(config2);
      this.interceptors.request.forEach((interceptor) => {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      this.interceptors.response.forEach((interceptor) => {
        chain.push(interceptor.fulfilled, interceptor.rejected);
      });
      while (chain.length) {
        promise2 = promise2.then(chain.shift(), chain.shift());
      }
      return promise2;
    }
    /**
    * @Function
    * @param {Object} config - 请求配置项
    * @prop {String} options.url - 请求路径
    * @prop {Object} options.data - 请求参数
    * @prop {Object} [options.responseType = config.responseType] [text|arraybuffer] - 响应的数据类型
    * @prop {Object} [options.dataType = config.dataType] - 如果设为 json，会尝试对返回的数据做一次 JSON.parse
    * @prop {Object} [options.header = config.header] - 请求header
    * @prop {Object} [options.method = config.method] - 请求方法
    * @returns {Promise<unknown>}
    */
    request(config2 = {}) {
      return this.middleware(config2);
    }
    get(url2, options = {}) {
      return this.middleware({
        url: url2,
        method: "GET",
        ...options
      });
    }
    post(url2, data, options = {}) {
      return this.middleware({
        url: url2,
        data,
        method: "POST",
        ...options
      });
    }
    put(url2, data, options = {}) {
      return this.middleware({
        url: url2,
        data,
        method: "PUT",
        ...options
      });
    }
    delete(url2, data, options = {}) {
      return this.middleware({
        url: url2,
        data,
        method: "DELETE",
        ...options
      });
    }
    options(url2, data, options = {}) {
      return this.middleware({
        url: url2,
        data,
        method: "OPTIONS",
        ...options
      });
    }
    upload(url2, config2 = {}) {
      config2.url = url2;
      config2.method = "UPLOAD";
      return this.middleware(config2);
    }
    download(url2, config2 = {}) {
      config2.url = url2;
      config2.method = "DOWNLOAD";
      return this.middleware(config2);
    }
  }
  class Router {
    constructor() {
      this.config = {
        type: "navigateTo",
        url: "",
        delta: 1,
        // navigateBack页面后退时,回退的层数
        params: {},
        // 传递的参数
        animationType: "pop-in",
        // 窗口动画,只在APP有效
        animationDuration: 300,
        // 窗口动画持续时间,单位毫秒,只在APP有效
        intercept: false
        // 是否需要拦截
      };
      this.route = this.route.bind(this);
    }
    // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
    addRootPath(url2) {
      return url2[0] === "/" ? url2 : `/${url2}`;
    }
    // 整合路由参数
    mixinParam(url2, params) {
      url2 = url2 && this.addRootPath(url2);
      let query = "";
      if (/.*\/.*\?.*=.*/.test(url2)) {
        query = uni.$u.queryParams(params, false);
        return url2 += `&${query}`;
      }
      query = uni.$u.queryParams(params);
      return url2 += query;
    }
    // 对外的方法名称
    async route(options = {}, params = {}) {
      let mergeConfig2 = {};
      if (typeof options === "string") {
        mergeConfig2.url = this.mixinParam(options, params);
        mergeConfig2.type = "navigateTo";
      } else {
        mergeConfig2 = uni.$u.deepMerge(this.config, options);
        mergeConfig2.url = this.mixinParam(options.url, options.params);
      }
      if (mergeConfig2.url === uni.$u.page())
        return;
      if (params.intercept) {
        this.config.intercept = params.intercept;
      }
      mergeConfig2.params = params;
      mergeConfig2 = uni.$u.deepMerge(this.config, mergeConfig2);
      if (typeof uni.$u.routeIntercept === "function") {
        const isNext = await new Promise((resolve, reject) => {
          uni.$u.routeIntercept(mergeConfig2, resolve);
        });
        isNext && this.openPage(mergeConfig2);
      } else {
        this.openPage(mergeConfig2);
      }
    }
    // 执行路由跳转
    openPage(config2) {
      const {
        url: url2,
        type,
        delta,
        animationType,
        animationDuration
      } = config2;
      if (config2.type == "navigateTo" || config2.type == "to") {
        uni.navigateTo({
          url: url2,
          animationType,
          animationDuration
        });
      }
      if (config2.type == "redirectTo" || config2.type == "redirect") {
        uni.redirectTo({
          url: url2
        });
      }
      if (config2.type == "switchTab" || config2.type == "tab") {
        uni.switchTab({
          url: url2
        });
      }
      if (config2.type == "reLaunch" || config2.type == "launch") {
        uni.reLaunch({
          url: url2
        });
      }
      if (config2.type == "navigateBack" || config2.type == "back") {
        uni.navigateBack({
          delta
        });
      }
    }
  }
  const route = new Router().route;
  function colorGradient(startColor = "rgb(0, 0, 0)", endColor = "rgb(255, 255, 255)", step = 10) {
    const startRGB = hexToRgb(startColor, false);
    const startR = startRGB[0];
    const startG = startRGB[1];
    const startB = startRGB[2];
    const endRGB = hexToRgb(endColor, false);
    const endR = endRGB[0];
    const endG = endRGB[1];
    const endB = endRGB[2];
    const sR = (endR - startR) / step;
    const sG = (endG - startG) / step;
    const sB = (endB - startB) / step;
    const colorArr = [];
    for (let i2 = 0; i2 < step; i2++) {
      let hex = rgbToHex(`rgb(${Math.round(sR * i2 + startR)},${Math.round(sG * i2 + startG)},${Math.round(sB * i2 + startB)})`);
      if (i2 === 0)
        hex = rgbToHex(startColor);
      if (i2 === step - 1)
        hex = rgbToHex(endColor);
      colorArr.push(hex);
    }
    return colorArr;
  }
  function hexToRgb(sColor, str = true) {
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    sColor = String(sColor).toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = "#";
        for (let i2 = 1; i2 < 4; i2 += 1) {
          sColorNew += sColor.slice(i2, i2 + 1).concat(sColor.slice(i2, i2 + 1));
        }
        sColor = sColorNew;
      }
      const sColorChange = [];
      for (let i2 = 1; i2 < 7; i2 += 2) {
        sColorChange.push(parseInt(`0x${sColor.slice(i2, i2 + 2)}`));
      }
      if (!str) {
        return sColorChange;
      }
      return `rgb(${sColorChange[0]},${sColorChange[1]},${sColorChange[2]})`;
    }
    if (/^(rgb|RGB)/.test(sColor)) {
      const arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      return arr.map((val) => Number(val));
    }
    return sColor;
  }
  function rgbToHex(rgb) {
    const _this = rgb;
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
      const aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      let strHex = "#";
      for (let i2 = 0; i2 < aColor.length; i2++) {
        let hex = Number(aColor[i2]).toString(16);
        hex = String(hex).length == 1 ? `${0}${hex}` : hex;
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = _this;
      }
      return strHex;
    }
    if (reg.test(_this)) {
      const aNum = _this.replace(/#/, "").split("");
      if (aNum.length === 6) {
        return _this;
      }
      if (aNum.length === 3) {
        let numHex = "#";
        for (let i2 = 0; i2 < aNum.length; i2 += 1) {
          numHex += aNum[i2] + aNum[i2];
        }
        return numHex;
      }
    } else {
      return _this;
    }
  }
  function colorToRgba(color2, alpha) {
    color2 = rgbToHex(color2);
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    let sColor = String(color2).toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = "#";
        for (let i2 = 1; i2 < 4; i2 += 1) {
          sColorNew += sColor.slice(i2, i2 + 1).concat(sColor.slice(i2, i2 + 1));
        }
        sColor = sColorNew;
      }
      const sColorChange = [];
      for (let i2 = 1; i2 < 7; i2 += 2) {
        sColorChange.push(parseInt(`0x${sColor.slice(i2, i2 + 2)}`));
      }
      return `rgba(${sColorChange.join(",")},${alpha})`;
    }
    return sColor;
  }
  const colorGradient$1 = {
    colorGradient,
    hexToRgb,
    rgbToHex,
    colorToRgba
  };
  function email(value) {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
  }
  function mobile(value) {
    return /^1[23456789]\d{9}$/.test(value);
  }
  function url(value) {
    return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(value);
  }
  function date(value) {
    if (!value)
      return false;
    if (number(value))
      value = +value;
    return !/Invalid|NaN/.test(new Date(value).toString());
  }
  function dateISO(value) {
    return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
  }
  function number(value) {
    return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value);
  }
  function string(value) {
    return typeof value === "string";
  }
  function digits(value) {
    return /^\d+$/.test(value);
  }
  function idCard(value) {
    return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
      value
    );
  }
  function carNo(value) {
    const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
    const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    if (value.length === 7) {
      return creg.test(value);
    }
    if (value.length === 8) {
      return xreg.test(value);
    }
    return false;
  }
  function amount(value) {
    return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
  }
  function chinese(value) {
    const reg = /^[\u4e00-\u9fa5]+$/gi;
    return reg.test(value);
  }
  function letter(value) {
    return /^[a-zA-Z]*$/.test(value);
  }
  function enOrNum(value) {
    const reg = /^[0-9a-zA-Z]*$/g;
    return reg.test(value);
  }
  function contains(value, param) {
    return value.indexOf(param) >= 0;
  }
  function range$1(value, param) {
    return value >= param[0] && value <= param[1];
  }
  function rangeLength(value, param) {
    return value.length >= param[0] && value.length <= param[1];
  }
  function landline(value) {
    const reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
    return reg.test(value);
  }
  function empty(value) {
    switch (typeof value) {
      case "undefined":
        return true;
      case "string":
        if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
          return true;
        break;
      case "boolean":
        if (!value)
          return true;
        break;
      case "number":
        if (value === 0 || isNaN(value))
          return true;
        break;
      case "object":
        if (value === null || value.length === 0)
          return true;
        for (const i2 in value) {
          return false;
        }
        return true;
    }
    return false;
  }
  function jsonString(value) {
    if (typeof value === "string") {
      try {
        const obj = JSON.parse(value);
        if (typeof obj === "object" && obj) {
          return true;
        }
        return false;
      } catch (e2) {
        return false;
      }
    }
    return false;
  }
  function array(value) {
    if (typeof Array.isArray === "function") {
      return Array.isArray(value);
    }
    return Object.prototype.toString.call(value) === "[object Array]";
  }
  function object(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
  }
  function code(value, len = 6) {
    return new RegExp(`^\\d{${len}}$`).test(value);
  }
  function func(value) {
    return typeof value === "function";
  }
  function promise(value) {
    return object(value) && func(value.then) && func(value.catch);
  }
  function image(value) {
    const newValue = value.split("?")[0];
    const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
    return IMAGE_REGEXP.test(newValue);
  }
  function video(value) {
    const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i;
    return VIDEO_REGEXP.test(value);
  }
  function regExp(o2) {
    return o2 && Object.prototype.toString.call(o2) === "[object RegExp]";
  }
  const test = {
    email,
    mobile,
    url,
    date,
    dateISO,
    number,
    digits,
    idCard,
    carNo,
    amount,
    chinese,
    letter,
    enOrNum,
    contains,
    range: range$1,
    rangeLength,
    empty,
    isEmpty: empty,
    jsonString,
    landline,
    object,
    array,
    code,
    func,
    promise,
    video,
    image,
    regExp,
    string
  };
  let timeout = null;
  function debounce(func2, wait = 500, immediate = false) {
    if (timeout !== null)
      clearTimeout(timeout);
    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow)
        typeof func2 === "function" && func2();
    } else {
      timeout = setTimeout(() => {
        typeof func2 === "function" && func2();
      }, wait);
    }
  }
  let flag;
  function throttle(func2, wait = 500, immediate = true) {
    if (immediate) {
      if (!flag) {
        flag = true;
        typeof func2 === "function" && func2();
        setTimeout(() => {
          flag = false;
        }, wait);
      }
    } else if (!flag) {
      flag = true;
      setTimeout(() => {
        flag = false;
        typeof func2 === "function" && func2();
      }, wait);
    }
  }
  function strip(num, precision = 15) {
    return +parseFloat(Number(num).toPrecision(precision));
  }
  function digitLength(num) {
    const eSplit = num.toString().split(/[eE]/);
    const len = (eSplit[0].split(".")[1] || "").length - +(eSplit[1] || 0);
    return len > 0 ? len : 0;
  }
  function float2Fixed(num) {
    if (num.toString().indexOf("e") === -1) {
      return Number(num.toString().replace(".", ""));
    }
    const dLen = digitLength(num);
    return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num);
  }
  function checkBoundary(num) {
    {
      if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
        formatAppLog("warn", "at uni_modules/uview-plus/libs/function/digit.js:45", `${num} 超出了精度限制，结果可能不正确`);
      }
    }
  }
  function iteratorOperation(arr, operation) {
    const [num1, num2, ...others] = arr;
    let res = operation(num1, num2);
    others.forEach((num) => {
      res = operation(res, num);
    });
    return res;
  }
  function times(...nums) {
    if (nums.length > 2) {
      return iteratorOperation(nums, times);
    }
    const [num1, num2] = nums;
    const num1Changed = float2Fixed(num1);
    const num2Changed = float2Fixed(num2);
    const baseNum = digitLength(num1) + digitLength(num2);
    const leftValue = num1Changed * num2Changed;
    checkBoundary(leftValue);
    return leftValue / Math.pow(10, baseNum);
  }
  function divide(...nums) {
    if (nums.length > 2) {
      return iteratorOperation(nums, divide);
    }
    const [num1, num2] = nums;
    const num1Changed = float2Fixed(num1);
    const num2Changed = float2Fixed(num2);
    checkBoundary(num1Changed);
    checkBoundary(num2Changed);
    return times(num1Changed / num2Changed, strip(Math.pow(10, digitLength(num2) - digitLength(num1))));
  }
  function round(num, ratio) {
    const base = Math.pow(10, ratio);
    let result = divide(Math.round(Math.abs(times(num, base))), base);
    if (num < 0 && result !== 0) {
      result = times(result, -1);
    }
    return result;
  }
  function range(min = 0, max = 0, value = 0) {
    return Math.max(min, Math.min(max, Number(value)));
  }
  function getPx(value, unit = false) {
    if (test.number(value)) {
      return unit ? `${value}px` : Number(value);
    }
    if (/(rpx|upx)$/.test(value)) {
      return unit ? `${uni.upx2px(parseInt(value))}px` : Number(uni.upx2px(parseInt(value)));
    }
    return unit ? `${parseInt(value)}px` : parseInt(value);
  }
  function sleep(value = 30) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, value);
    });
  }
  function os() {
    return uni.getSystemInfoSync().platform.toLowerCase();
  }
  function sys() {
    return uni.getSystemInfoSync();
  }
  function random(min, max) {
    if (min >= 0 && max > 0 && max >= min) {
      const gab = max - min + 1;
      return Math.floor(Math.random() * gab + min);
    }
    return 0;
  }
  function guid(len = 32, firstU = true, radix = null) {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    const uuid = [];
    radix = radix || chars.length;
    if (len) {
      for (let i2 = 0; i2 < len; i2++)
        uuid[i2] = chars[0 | Math.random() * radix];
    } else {
      let r2;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      uuid[14] = "4";
      for (let i2 = 0; i2 < 36; i2++) {
        if (!uuid[i2]) {
          r2 = 0 | Math.random() * 16;
          uuid[i2] = chars[i2 == 19 ? r2 & 3 | 8 : r2];
        }
      }
    }
    if (firstU) {
      uuid.shift();
      return `u${uuid.join("")}`;
    }
    return uuid.join("");
  }
  function $parent(name = void 0) {
    let parent = this.$parent;
    while (parent) {
      if (parent.$options && parent.$options.name !== name) {
        parent = parent.$parent;
      } else {
        return parent;
      }
    }
    return false;
  }
  function addStyle(customStyle, target = "object") {
    if (test.empty(customStyle) || typeof customStyle === "object" && target === "object" || target === "string" && typeof customStyle === "string") {
      return customStyle;
    }
    if (target === "object") {
      customStyle = trim(customStyle);
      const styleArray = customStyle.split(";");
      const style = {};
      for (let i2 = 0; i2 < styleArray.length; i2++) {
        if (styleArray[i2]) {
          const item = styleArray[i2].split(":");
          style[trim(item[0])] = trim(item[1]);
        }
      }
      return style;
    }
    let string2 = "";
    for (const i2 in customStyle) {
      const key = i2.replace(/([A-Z])/g, "-$1").toLowerCase();
      string2 += `${key}:${customStyle[i2]};`;
    }
    return trim(string2);
  }
  function addUnit(value = "auto", unit = "") {
    if (!unit) {
      unit = uni.$u.config.unit || "px";
    }
    value = String(value);
    return test.number(value) ? `${value}${unit}` : value;
  }
  function deepClone(obj) {
    if ([null, void 0, NaN, false].includes(obj))
      return obj;
    if (typeof obj !== "object" && typeof obj !== "function") {
      return obj;
    }
    const o2 = test.array(obj) ? [] : {};
    for (const i2 in obj) {
      if (obj.hasOwnProperty(i2)) {
        o2[i2] = typeof obj[i2] === "object" ? deepClone(obj[i2]) : obj[i2];
      }
    }
    return o2;
  }
  function deepMerge(target = {}, source = {}) {
    target = deepClone(target);
    if (typeof target !== "object" || typeof source !== "object")
      return false;
    for (const prop in source) {
      if (!source.hasOwnProperty(prop))
        continue;
      if (prop in target) {
        if (typeof target[prop] !== "object") {
          target[prop] = source[prop];
        } else if (typeof source[prop] !== "object") {
          target[prop] = source[prop];
        } else if (target[prop].concat && source[prop].concat) {
          target[prop] = target[prop].concat(source[prop]);
        } else {
          target[prop] = deepMerge(target[prop], source[prop]);
        }
      } else {
        target[prop] = source[prop];
      }
    }
    return target;
  }
  function error(err) {
    {
      formatAppLog("error", "at uni_modules/uview-plus/libs/function/index.js:238", `uView提示：${err}`);
    }
  }
  function randomArray(array2 = []) {
    return array2.sort(() => Math.random() - 0.5);
  }
  if (!String.prototype.padStart) {
    String.prototype.padStart = function(maxLength, fillString = " ") {
      if (Object.prototype.toString.call(fillString) !== "[object String]") {
        throw new TypeError(
          "fillString must be String"
        );
      }
      const str = this;
      if (str.length >= maxLength)
        return String(str);
      const fillLength = maxLength - str.length;
      let times2 = Math.ceil(fillLength / fillString.length);
      while (times2 >>= 1) {
        fillString += fillString;
        if (times2 === 1) {
          fillString += fillString;
        }
      }
      return fillString.slice(0, fillLength) + str;
    };
  }
  function timeFormat(dateTime = null, formatStr = "yyyy-mm-dd") {
    let date2;
    if (!dateTime) {
      date2 = /* @__PURE__ */ new Date();
    } else if (/^\d{10}$/.test(dateTime.toString().trim())) {
      date2 = new Date(dateTime * 1e3);
    } else if (typeof dateTime === "string" && /^\d+$/.test(dateTime.trim())) {
      date2 = new Date(Number(dateTime));
    } else {
      date2 = new Date(
        typeof dateTime === "string" ? dateTime.replace(/-/g, "/") : dateTime
      );
    }
    const timeSource = {
      "y": date2.getFullYear().toString(),
      // 年
      "m": (date2.getMonth() + 1).toString().padStart(2, "0"),
      // 月
      "d": date2.getDate().toString().padStart(2, "0"),
      // 日
      "h": date2.getHours().toString().padStart(2, "0"),
      // 时
      "M": date2.getMinutes().toString().padStart(2, "0"),
      // 分
      "s": date2.getSeconds().toString().padStart(2, "0")
      // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (const key in timeSource) {
      const [ret] = new RegExp(`${key}+`).exec(formatStr) || [];
      if (ret) {
        const beginIndex = key === "y" && ret.length === 2 ? 2 : 0;
        formatStr = formatStr.replace(ret, timeSource[key].slice(beginIndex));
      }
    }
    return formatStr;
  }
  function timeFrom(timestamp = null, format = "yyyy-mm-dd") {
    if (timestamp == null)
      timestamp = Number(/* @__PURE__ */ new Date());
    timestamp = parseInt(timestamp);
    if (timestamp.toString().length == 10)
      timestamp *= 1e3;
    let timer = (/* @__PURE__ */ new Date()).getTime() - timestamp;
    timer = parseInt(timer / 1e3);
    let tips = "";
    switch (true) {
      case timer < 300:
        tips = "刚刚";
        break;
      case (timer >= 300 && timer < 3600):
        tips = `${parseInt(timer / 60)}分钟前`;
        break;
      case (timer >= 3600 && timer < 86400):
        tips = `${parseInt(timer / 3600)}小时前`;
        break;
      case (timer >= 86400 && timer < 2592e3):
        tips = `${parseInt(timer / 86400)}天前`;
        break;
      default:
        if (format === false) {
          if (timer >= 2592e3 && timer < 365 * 86400) {
            tips = `${parseInt(timer / (86400 * 30))}个月前`;
          } else {
            tips = `${parseInt(timer / (86400 * 365))}年前`;
          }
        } else {
          tips = timeFormat(timestamp, format);
        }
    }
    return tips;
  }
  function trim(str, pos = "both") {
    str = String(str);
    if (pos == "both") {
      return str.replace(/^\s+|\s+$/g, "");
    }
    if (pos == "left") {
      return str.replace(/^\s*/, "");
    }
    if (pos == "right") {
      return str.replace(/(\s*$)/g, "");
    }
    if (pos == "all") {
      return str.replace(/\s+/g, "");
    }
    return str;
  }
  function queryParams(data = {}, isPrefix = true, arrayFormat = "brackets") {
    const prefix = isPrefix ? "?" : "";
    const _result = [];
    if (["indices", "brackets", "repeat", "comma"].indexOf(arrayFormat) == -1)
      arrayFormat = "brackets";
    for (const key in data) {
      const value = data[key];
      if (["", void 0, null].indexOf(value) >= 0) {
        continue;
      }
      if (value.constructor === Array) {
        switch (arrayFormat) {
          case "indices":
            for (let i2 = 0; i2 < value.length; i2++) {
              _result.push(`${key}[${i2}]=${value[i2]}`);
            }
            break;
          case "brackets":
            value.forEach((_value) => {
              _result.push(`${key}[]=${_value}`);
            });
            break;
          case "repeat":
            value.forEach((_value) => {
              _result.push(`${key}=${_value}`);
            });
            break;
          case "comma":
            let commaStr = "";
            value.forEach((_value) => {
              commaStr += (commaStr ? "," : "") + _value;
            });
            _result.push(`${key}=${commaStr}`);
            break;
          default:
            value.forEach((_value) => {
              _result.push(`${key}[]=${_value}`);
            });
        }
      } else {
        _result.push(`${key}=${value}`);
      }
    }
    return _result.length ? prefix + _result.join("&") : "";
  }
  function toast(title, duration = 2e3) {
    uni.showToast({
      title: String(title),
      icon: "none",
      duration
    });
  }
  function type2icon(type = "success", fill = false) {
    if (["primary", "info", "error", "warning", "success"].indexOf(type) == -1)
      type = "success";
    let iconName = "";
    switch (type) {
      case "primary":
        iconName = "info-circle";
        break;
      case "info":
        iconName = "info-circle";
        break;
      case "error":
        iconName = "close-circle";
        break;
      case "warning":
        iconName = "error-circle";
        break;
      case "success":
        iconName = "checkmark-circle";
        break;
      default:
        iconName = "checkmark-circle";
    }
    if (fill)
      iconName += "-fill";
    return iconName;
  }
  function priceFormat(number2, decimals = 0, decimalPoint = ".", thousandsSeparator = ",") {
    number2 = `${number2}`.replace(/[^0-9+-Ee.]/g, "");
    const n2 = !isFinite(+number2) ? 0 : +number2;
    const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
    const sep = typeof thousandsSeparator === "undefined" ? "," : thousandsSeparator;
    const dec = typeof decimalPoint === "undefined" ? "." : decimalPoint;
    let s2 = "";
    s2 = (prec ? round(n2, prec) + "" : `${Math.round(n2)}`).split(".");
    const re = /(-?\d+)(\d{3})/;
    while (re.test(s2[0])) {
      s2[0] = s2[0].replace(re, `$1${sep}$2`);
    }
    if ((s2[1] || "").length < prec) {
      s2[1] = s2[1] || "";
      s2[1] += new Array(prec - s2[1].length + 1).join("0");
    }
    return s2.join(dec);
  }
  function getDuration(value, unit = true) {
    const valueNum = parseInt(value);
    if (unit) {
      if (/s$/.test(value))
        return value;
      return value > 30 ? `${value}ms` : `${value}s`;
    }
    if (/ms$/.test(value))
      return valueNum;
    if (/s$/.test(value))
      return valueNum > 30 ? valueNum : valueNum * 1e3;
    return valueNum;
  }
  function padZero(value) {
    return `00${value}`.slice(-2);
  }
  function formValidate(instance, event) {
    const formItem = uni.$u.$parent.call(instance, "u-form-item");
    const form = uni.$u.$parent.call(instance, "u-form");
    if (formItem && form) {
      form.validateField(formItem.prop, () => {
      }, event);
    }
  }
  function getProperty(obj, key) {
    if (!obj) {
      return;
    }
    if (typeof key !== "string" || key === "") {
      return "";
    }
    if (key.indexOf(".") !== -1) {
      const keys = key.split(".");
      let firstObj = obj[keys[0]] || {};
      for (let i2 = 1; i2 < keys.length; i2++) {
        if (firstObj) {
          firstObj = firstObj[keys[i2]];
        }
      }
      return firstObj;
    }
    return obj[key];
  }
  function setProperty(obj, key, value) {
    if (!obj) {
      return;
    }
    const inFn = function(_obj, keys, v2) {
      if (keys.length === 1) {
        _obj[keys[0]] = v2;
        return;
      }
      while (keys.length > 1) {
        const k2 = keys[0];
        if (!_obj[k2] || typeof _obj[k2] !== "object") {
          _obj[k2] = {};
        }
        keys.shift();
        inFn(_obj[k2], keys, v2);
      }
    };
    if (typeof key !== "string" || key === "")
      ;
    else if (key.indexOf(".") !== -1) {
      const keys = key.split(".");
      inFn(obj, keys, value);
    } else {
      obj[key] = value;
    }
  }
  function page() {
    const pages2 = getCurrentPages();
    return `/${pages2[pages2.length - 1].route || ""}`;
  }
  function pages() {
    const pages2 = getCurrentPages();
    return pages2;
  }
  function setConfig({
    props: props2 = {},
    config: config2 = {},
    color: color2 = {},
    zIndex: zIndex2 = {}
  }) {
    const {
      deepMerge: deepMerge2
    } = uni.$u;
    uni.$u.config = deepMerge2(uni.$u.config, config2);
    uni.$u.props = deepMerge2(uni.$u.props, props2);
    uni.$u.color = deepMerge2(uni.$u.color, color2);
    uni.$u.zIndex = deepMerge2(uni.$u.zIndex, zIndex2);
  }
  const index = {
    range,
    getPx,
    sleep,
    os,
    sys,
    random,
    guid,
    $parent,
    addStyle,
    addUnit,
    deepClone,
    deepMerge,
    error,
    randomArray,
    timeFormat,
    timeFrom,
    trim,
    queryParams,
    toast,
    type2icon,
    priceFormat,
    getDuration,
    padZero,
    formValidate,
    getProperty,
    setProperty,
    page,
    pages,
    setConfig
  };
  const zIndex = {
    toast: 10090,
    noNetwork: 10080,
    // popup包含popup，actionsheet，keyboard，picker的值
    popup: 10075,
    mask: 10070,
    navbar: 980,
    topTips: 975,
    sticky: 970,
    indexListSticky: 965
  };
  let platform = "none";
  platform = "vue3";
  platform = "plus";
  const platform$1 = platform;
  const $u = {
    route,
    date: index.timeFormat,
    // 另名date
    colorGradient: colorGradient$1.colorGradient,
    hexToRgb: colorGradient$1.hexToRgb,
    rgbToHex: colorGradient$1.rgbToHex,
    colorToRgba: colorGradient$1.colorToRgba,
    test,
    type: ["primary", "success", "error", "warning", "info"],
    http: new Request(),
    config,
    // uView配置信息相关，比如版本号
    zIndex,
    debounce,
    throttle,
    mixin,
    mpMixin,
    props: props$o,
    ...index,
    color,
    platform: platform$1
  };
  uni.$u = $u;
  const install = (Vue2) => {
    Vue2.config.globalProperties.$u = $u;
    Vue2.config.globalProperties.$nextTick = (cb) => {
      cb();
    };
    Vue2.mixin(mixin);
  };
  const uviewPlus = {
    install
  };
  function createApp() {
    const app = vue.createVueApp(App);
    app.use(uviewPlus);
    app.use(createPinia());
    return {
      app,
      Pinia
    };
  }
  uni.$u.config.unit = "px";
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue, uni.VueShared);
