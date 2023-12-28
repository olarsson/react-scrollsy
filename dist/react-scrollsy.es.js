import { memo as F, useState as m, useEffect as w, useCallback as L } from "react";
import { jsx as j } from "react/jsx-runtime";
var y = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function A(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function b(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var C = { exports: {} };
(function(e, t) {
  (function(i) {
    e.exports = i();
  })(function() {
    return function() {
      function i(o, n, r) {
        function s(l, f) {
          if (!n[l]) {
            if (!o[l]) {
              var h = typeof b == "function" && b;
              if (!f && h)
                return h(l, !0);
              if (u)
                return u(l, !0);
              var a = new Error("Cannot find module '" + l + "'");
              throw a.code = "MODULE_NOT_FOUND", a;
            }
            var d = n[l] = { exports: {} };
            o[l][0].call(d.exports, function(p) {
              var g = o[l][1][p];
              return s(g || p);
            }, d, d.exports, i, o, n, r);
          }
          return n[l].exports;
        }
        for (var u = typeof b == "function" && b, c = 0; c < r.length; c++)
          s(r[c]);
        return s;
      }
      return i;
    }()({ 1: [function(i, o, n) {
      o.exports = function() {
        if (typeof window > "u" || typeof navigator > "u")
          return function() {
            return 0;
          };
        if (!navigator.userAgent.match(/iphone|ipod|ipad/i))
          return function() {
            return window.innerHeight;
          };
        var r = Math.abs(window.orientation), s = { w: 0, h: 0 }, u = function() {
          var c = document.createElement("div");
          c.style.position = "fixed", c.style.height = "100vh", c.style.width = 0, c.style.top = 0, document.documentElement.appendChild(c), s.w = r === 90 ? c.offsetHeight : window.innerWidth, s.h = r === 90 ? window.innerWidth : c.offsetHeight, document.documentElement.removeChild(c), c = null;
        };
        return u(), function() {
          return Math.abs(window.orientation) !== 90 ? s.h : s.w;
        };
      }();
    }, {}] }, {}, [1])(1);
  });
})(C);
var z = C.exports;
const k = /* @__PURE__ */ A(z);
var S = {}, M = {};
Object.defineProperty(M, "__esModule", { value: !0 });
var H = {};
Object.defineProperty(H, "__esModule", { value: !0 });
H.throttle = void 0;
function N(e, t) {
  var i, o;
  return function() {
    var n = arguments, r = this;
    return i || (i = !0, setTimeout(function() {
      return i = !1;
    }, t), o = e.apply(r, n)), o;
  };
}
H.throttle = N;
(function(e) {
  var t = y && y.__createBinding || (Object.create ? function(o, n, r, s) {
    s === void 0 && (s = r), Object.defineProperty(o, s, { enumerable: !0, get: function() {
      return n[r];
    } });
  } : function(o, n, r, s) {
    s === void 0 && (s = r), o[s] = n[r];
  }), i = y && y.__exportStar || function(o, n) {
    for (var r in o)
      r !== "default" && !Object.prototype.hasOwnProperty.call(n, r) && t(n, o, r);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), i(M, e), i(H, e);
})(S);
const V = (e, t) => {
  let i, o;
  return function(...n) {
    const r = this;
    o ? (i && clearTimeout(i), i = setTimeout(() => {
      Date.now() - o >= t && (e.apply(r, n), o = Date.now());
    }, t - (Date.now() - o))) : (e.apply(r, n), o = Date.now());
  };
}, D = () => window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, E = (e) => e.clientHeight;
function U(e) {
  return new Promise((t) => {
    if (document.querySelector(e))
      return t(document.querySelector(e));
    const i = new MutationObserver(() => {
      document.querySelector(e) && (t(document.querySelector(e)), i.disconnect());
    });
    i.observe(document.body, {
      childList: !0,
      subtree: !0
    });
  });
}
const W = (e, t) => {
  if (!e || !t)
    throw "element/container is not defined.";
  const i = e.getBoundingClientRect(), o = t.scrollTop - t.offsetTop;
  return i.top + o;
}, G = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream, O = () => G() ? k() : D(), x = ({ mode: e, scrollData: t, elementScrollHeight: i, offsetTop: o, offsetBottom: n }) => {
  switch (e) {
    case "top":
      if (!o)
        return 0;
      if (o.unit === "px")
        return o.distance;
      if (o.unit === "%")
        switch (o.basedOn) {
          case "doc":
            return t.scrollHeight * (o.distance / 100);
          case "vp":
            return t.containerHeight * (o.distance / 100);
          case "elem":
            return i * (o.distance / 100);
        }
      break;
    case "bottom":
      if (!n)
        return 0;
      if (n.unit === "px")
        return n.distance;
      if (n.unit === "%")
        switch (n.basedOn) {
          case "doc":
            return t.scrollHeight * (n.distance / 100);
          case "vp":
            return t.containerHeight * (n.distance / 100);
          case "elem":
            return i * (n.distance / 100);
        }
      break;
    default:
      return 0;
  }
  return 0;
}, $ = ({ heightDuration: e, duration: t }) => {
  if (t.unit === "px")
    return t.distance;
  if (t.unit === "%")
    switch (t.basedOn) {
      case "doc":
      case "vp":
      case "elem":
        return e * (t.distance / 100);
    }
  return 0;
}, B = ({
  duration: e,
  elementScrollHeight: t,
  elementOffsetTopRelativeToContainer: i,
  trigger: o,
  scrollData: n
}) => {
  let r = 0, s = 0;
  switch (e.basedOn) {
    case "doc":
      r = n.scrollHeight - n.containerHeight;
      break;
    case "vp":
      r = n.containerHeight, s = i, o === "onEnter" && (s -= n.containerHeight);
      break;
    case "elem":
      s = i, o === "onEnter" ? (r = t, s -= n.containerHeight) : o === "onLeave" && (r = t);
      break;
  }
  return {
    heightDuration: r,
    elementOffset: s
  };
}, J = ({
  elementOffset: e,
  offsetTopVal: t,
  durationInPx: i,
  offsetBottomVal: o,
  scrollData: n
}) => {
  const r = e + t, s = e + i - o, u = (n.scrollTop - r) / (s - r);
  return {
    progress: Math.min(Math.max(u, 0), 1),
    start: r,
    end: s
  };
}, K = function({ el: e, scrollData: t, trigger: i, offsetTop: o, offsetBottom: n, duration: r }) {
  const s = W(e, t.element), { scrollHeight: u } = e, { heightDuration: c, elementOffset: l } = B({
    duration: r,
    elementScrollHeight: u,
    elementOffsetTopRelativeToContainer: s,
    trigger: i,
    scrollData: t
  }), f = x({ mode: "top", scrollData: t, elementScrollHeight: u, offsetTop: o }), h = x({ mode: "bottom", scrollData: t, elementScrollHeight: u, offsetBottom: n }), a = $({ heightDuration: c, duration: r }), { progress: d, start: p, end: g } = J({ elementOffset: l, offsetTopVal: f, durationInPx: a, offsetBottomVal: h, scrollData: t });
  return {
    progress: d,
    scrollData: t,
    start: p,
    end: g
  };
}, R = {
  resizeThrottle: 150,
  trigger: "onEnter"
}, q = {
  progress: 0,
  scrollData: {
    containerHeight: 0,
    percentProgress: 0,
    scrollHeight: 0,
    scrollTop: 0
  },
  start: 0,
  end: 0
}, _ = ({ children: e, scrollObject: t = q }) => typeof e == "function" ? e({ scrollObject: t, children: e }) : e, Z = F(({ scrollData: e, children: t, elem: i, settings: o, onStart: n, onEnd: r }) => {
  const { trigger: s = R.trigger, offsetTop: u, offsetBottom: c, duration: l } = o, [f, h] = m(!1), [a, d] = m(!1), [p, g] = m(!1);
  if (w(() => {
    f && n && n();
  }, [f]), w(() => {
    a && r && r();
  }, [a]), w(() => {
    i != null && i.current && g(!0);
  }, [i]), !p)
    return _({ scrollObject: q, children: t });
  const T = K({ el: i.current, scrollData: e, trigger: s, offsetTop: u, offsetBottom: c, duration: l }), { progress: v } = T;
  return v > 0 && v < 1 && f === !1 && typeof n == "function" && h(!0), v <= 0 && f === !0 && typeof n == "function" && h(!1), v >= 1 && a === !1 && typeof r == "function" && d(!0), v < 1 && a === !0 && typeof r == "function" && d(!1), _({ scrollObject: T, children: t });
}), P = ({ scrollData: e, children: t }) => typeof t == "function" ? t({
  scrollData: {
    scrollTop: e.scrollTop,
    scrollHeight: e.scrollHeight,
    containerHeight: e.containerHeight,
    percentProgress: e.percentProgress,
    element: e.element
  },
  children: t
}) : t, Q = ({ timeout: e, setProgress: t, scrollElement: i, containerHeight: o }) => {
  e && window.cancelAnimationFrame(e), e = window.requestAnimationFrame(() => {
    if (!i)
      return;
    const { scrollTop: n, scrollHeight: r } = i;
    t(n / (r - o));
  });
}, I = ({
  children: e,
  customScrollingElement: t,
  scrollThrottle: i,
  resizeThrottle: o = R.resizeThrottle
}) => {
  const n = !!t, r = n ? t : document == null ? void 0 : document.documentElement;
  if (!r)
    throw new Error("No scrolling element found.");
  if (typeof window > "u")
    throw new Error("No window found.");
  const s = null, [u, c] = m(n ? E(r) : O()), [l, f] = m(0), h = () => {
    c(n ? E(r) : O());
  }, a = S.throttle(() => {
    h();
  }, o), d = L(() => {
    Q({ timeout: s, setProgress: f, scrollElement: r, containerHeight: u });
  }, []), p = i ? V(() => {
    d();
  }, i) : () => {
    d();
  };
  return w(() => (window.addEventListener("resize", a), c(n ? E(r) : O()), h(), () => {
    window.removeEventListener("resize", a);
  }), []), w(() => {
    const g = n ? r : document;
    return g.addEventListener("scroll", p, {
      passive: !0
    }), p(), () => {
      g.removeEventListener("scroll", p);
    };
  }, [u]), P({
    scrollData: {
      scrollTop: r.scrollTop,
      scrollHeight: r.scrollHeight,
      containerHeight: u,
      percentProgress: l,
      element: r
    },
    children: e
  });
}, ee = ({ children: e, scrollThrottle: t, resizeThrottle: i }) => {
  const [o, n] = m(!1);
  return w(() => {
    n(!0);
  }, []), o ? /* @__PURE__ */ j(I, { scrollThrottle: t, resizeThrottle: i, children: e }) : P({
    scrollData: {
      scrollTop: 0,
      scrollHeight: 0,
      containerHeight: 0,
      percentProgress: 0
    },
    children: e
  });
}, te = ({ children: e, scrollThrottle: t, scrollingElement: i, resizeThrottle: o }) => {
  const [n, r] = m(!1), [s, u] = m(void 0), c = P({
    scrollData: {
      scrollTop: 0,
      scrollHeight: 0,
      containerHeight: 0,
      percentProgress: 0,
      element: s
    },
    children: e
  });
  return U(i).then((l) => {
    s || (u(l), r(!0));
  }), n ? /* @__PURE__ */ j(I, { scrollThrottle: t, resizeThrottle: o, customScrollingElement: s, children: e }) : c;
};
export {
  Z as ScrollTracker,
  te as ScrollTrackerCustom,
  ee as ScrollTrackerDocument
};
