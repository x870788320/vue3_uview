var __renderjsModules={};

__renderjsModules["2e28d683"] = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // <stdin>
  var stdin_exports = {};
  __export(stdin_exports, {
    default: () => stdin_default
  });

  // ../../../../../projects/work/applet/vue3_uview_plus/uni_modules/jp-signature/components/jp-signature/signature.js
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
  };
  var f = {}.toString;
  var d = function(t2, e2) {
    return f.call(t2) === "[object " + e2 + "]";
  };
  var y = function(t2) {
    return d(t2, "String");
  };
  var p = function(t2) {
    return d(t2, "Number");
  };
  var g = function(t2) {
    return d(t2, "Function");
  };
  var m = function() {
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
  }();
  var x = function(t2) {
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
  };
  var L = function(t2, e2) {
    var n2 = e2.x - t2.x, i2 = e2.y - t2.y;
    return Math.abs(n2) > Math.abs(i2) ? n2 > 0 ? "right" : "left" : i2 > 0 ? "down" : "up";
  };
  var M = function(t2, e2) {
    var n2 = Math.abs(e2.x - t2.x), i2 = Math.abs(e2.y - t2.y);
    return Math.sqrt(n2 * n2 + i2 * i2);
  };
  var P = function() {
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
  }();
  var T = function(t2) {
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
        throw Error("\u8BF7\u6307\u5B9A id\u3001el \u6216 context!");
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
  var S = { penColor: "black", backgroundColor: "", openSmooth: true, penSize: 2, minLineWidth: 2, maxLineWidth: 6, minSpeed: 1.5, maxWidthDiffRate: 20, maxHistoryLength: 20 };
  var D = null;
  var O = function() {
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
  var W = function() {
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
  }();

  // ../../../../../projects/work/applet/vue3_uview_plus/uni_modules/jp-signature/components/jp-signature/render.js
  var render_default = {
    data() {
      return {
        canvasid: null,
        signature: null,
        observer: null,
        options: {},
        saveCount: 0
      };
    },
    mounted() {
      this.$nextTick(this.init);
    },
    methods: {
      init() {
        const el = this.$refs.limeSignature || this.$ownerInstance.$el;
        const canvas = document.createElement("canvas");
        canvas.style = "width: 100%; height: 100%;";
        el.appendChild(canvas);
        this.signature = new W({
          el: canvas
        });
        this.signature.pen.setOption(this.options);
        const width = this.signature.canvas.get("width");
        const height = this.signature.canvas.get("height");
        this.emit({
          changeSize: {
            width,
            height
          }
        });
      },
      undo(v2) {
        if (v2 && this.signature) {
          this.signature.undo();
        }
      },
      clear(v2) {
        if (v2 && this.signature) {
          this.signature.clear();
        }
      },
      save(param) {
        let { fileType = "png", quality = 1, n: n2 } = JSON.parse(param);
        const type = `image/${fileType}`.replace(/jpg/, "jpeg");
        if (n2 !== this.saveCount) {
          this.saveCount = n2;
          const { backgroundColor, landscape, boundingBox } = this.options;
          const flag = landscape || backgroundColor || boundingBox;
          console.log("type", type);
          console.log("flag", flag);
          const image = this.signature.canvas.get("el").toDataURL(!flag && type, !flag && quality);
          console.log("image", image.length);
          if (flag) {
            const canvas = document.createElement("canvas");
            const pixelRatio = this.signature.canvas.get("pixelRatio");
            let width = this.signature.canvas.get("width");
            let height = this.signature.canvas.get("height");
            let x2 = 0;
            let y2 = 0;
            const next = () => {
              const size = [width, height];
              console.log("size width", width);
              console.log("size height", height);
              console.log("size pixelRatio", pixelRatio);
              if (landscape) {
                size.reverse();
              }
              canvas.width = size[0] * pixelRatio;
              canvas.height = size[1] * pixelRatio;
              const param2 = [x2, y2, width, height, 0, 0, width, height].map((item) => item * pixelRatio);
              const context = canvas.getContext("2d");
              if (landscape) {
                context.translate(0, width * pixelRatio);
                context.rotate(-Math.PI / 2);
              }
              console.log("backgroundColor", backgroundColor);
              if (backgroundColor) {
                context.fillStyle = backgroundColor;
                context.fillRect(0, 0, width * pixelRatio, height * pixelRatio);
              }
              context.drawImage(this.signature.canvas.get("el"), ...param2);
              this.emit({
                save: canvas.toDataURL(type, quality)
              });
              canvas.remove();
            };
            if (boundingBox) {
              const res = this.signature.getContentBoundingBox();
              width = res.width;
              height = res.height;
              x2 = res.startX;
              y2 = res.startY;
              next();
            } else {
              next();
            }
          } else {
            this.emit({
              save: image
            });
          }
        }
      },
      isEmpty(v2) {
        if (v2 && this.signature) {
          const isEmpty = this.signature.isEmpty();
          this.emit({
            isEmpty
          });
        }
      },
      emit(event) {
        this.$ownerInstance.callMethod("onMessage", {
          detail: {
            data: [{
              event
            }]
          }
        });
      },
      update(v2) {
        if (v2) {
          if (this.signature) {
            this.options = v2;
            this.signature.pen.setOption(v2);
          } else {
            this.options = v2;
          }
        }
      }
    }
  };

  // <stdin>
  var stdin_default = render_default;
  return __toCommonJS(stdin_exports);
})();
