import { memo as F, useState as m, useEffect as w, useCallback as L } from "react";
import { jsx as C } from "react/jsx-runtime";
var y = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function A(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function H(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var S = { exports: {} };
(function(e, t) {
  (function(i) {
    e.exports = i();
  })(function() {
    return function() {
      function i(o, n, r) {
        function s(a, d) {
          if (!n[a]) {
            if (!o[a]) {
              var p = typeof H == "function" && H;
              if (!d && p)
                return p(a, !0);
              if (u)
                return u(a, !0);
              var l = new Error("Cannot find module '" + a + "'");
              throw l.code = "MODULE_NOT_FOUND", l;
            }
            var f = n[a] = { exports: {} };
            o[a][0].call(f.exports, function(h) {
              var g = o[a][1][h];
              return s(g || h);
            }, f, f.exports, i, o, n, r);
          }
          return n[a].exports;
        }
        for (var u = typeof H == "function" && H, c = 0; c < r.length; c++)
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
})(S);
var z = S.exports;
const k = /* @__PURE__ */ A(z);
var j = {}, M = {};
Object.defineProperty(M, "__esModule", { value: !0 });
var b = {};
Object.defineProperty(b, "__esModule", { value: !0 });
b.throttle = void 0;
function N(e, t) {
  var i, o;
  return function() {
    var n = arguments, r = this;
    return i || (i = !0, setTimeout(function() {
      return i = !1;
    }, t), o = e.apply(r, n)), o;
  };
}
b.throttle = N;
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
  Object.defineProperty(e, "__esModule", { value: !0 }), i(M, e), i(b, e);
})(j);
const V = (e, t) => {
  let i, o;
  return function(...n) {
    const r = this;
    o ? (i && clearTimeout(i), i = setTimeout(() => {
      Date.now() - o >= t && (e.apply(r, n), o = Date.now());
    }, t - (Date.now() - o))) : (e.apply(r, n), o = Date.now());
  };
}, U = () => window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, E = (e) => e.clientHeight;
function D(e) {
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
}, $ = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream, O = () => $() ? k() : U(), x = ({
  mode: e,
  scrollData: t,
  elementScrollHeight: i,
  offsetTop: o,
  offsetBottom: n
}) => {
  switch (console.log({ mode: e, scrollData: t, elementScrollHeight: i, offsetTop: o, offsetBottom: n }), e) {
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
}, G = ({ heightDuration: e, duration: t }) => {
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
}, J = ({
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
}, K = ({
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
}, Q = function(e, t, i, o, n, r) {
  const s = W(e, t.element), { scrollHeight: u } = e, { heightDuration: c, elementOffset: a } = J({
    duration: r,
    elementScrollHeight: u,
    elementOffsetTopRelativeToContainer: s,
    trigger: i,
    scrollData: t
  }), d = x({ mode: "top", scrollData: t, elementScrollHeight: u, offsetTop: o }), p = x({ mode: "bottom", scrollData: t, elementScrollHeight: u, offsetBottom: n }), l = G({ heightDuration: c, duration: r }), { progress: f, start: h, end: g } = K({ elementOffset: a, offsetTopVal: d, durationInPx: l, offsetBottomVal: p, scrollData: t });
  return {
    progress: f,
    scrollData: t,
    start: h,
    end: g
  };
}, R = {
  resizeThrottle: 150,
  trigger: "onEnter"
}, q = {
  progress: 0,
  scrollData: {
    containerHeight: 0,
    element: void 0,
    percentProgress: 0,
    scrollHeight: 0,
    scrollTop: 0
  },
  start: 0,
  end: 0
}, _ = (e, t = q) => typeof e == "function" ? e && e({ scrollObject: t, children: e }) : e, B = F(({ scrollData: e, children: t, elem: i, settings: o, onStart: n, onEnd: r }) => {
  const { trigger: s = R.trigger, offsetTop: u, offsetBottom: c, duration: a } = o, [d, p] = m(!1), [l, f] = m(!1), [h, g] = m(!1);
  if (w(() => {
    d && typeof n == "function" && n();
  }, [d]), w(() => {
    l && typeof r == "function" && r();
  }, [l]), w(() => {
    i != null && i.current && g(!0);
  }, [i]), !h)
    return _(t, q);
  const T = Q(i.current, e, s, u, c, a), { progress: v } = T;
  return v > 0 && v < 1 && d === !1 && typeof n == "function" && p(!0), v <= 0 && d === !0 && typeof n == "function" && p(!1), v >= 1 && l === !1 && typeof r == "function" && f(!0), v < 1 && l === !0 && typeof r == "function" && f(!1), _(t, T);
}), P = ({ scrollData: e, children: t }) => typeof t == "function" ? t && t({
  scrollData: {
    scrollTop: e.scrollTop,
    scrollHeight: e.scrollHeight,
    containerHeight: e.containerHeight,
    percentProgress: e.percentProgress,
    element: e.element
  },
  children: t
}) : t, X = ({
  timeout: e,
  setProgress: t,
  scrollElement: i,
  containerHeight: o
}) => {
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
  const s = null, [u, c] = m(n ? E(r) : O()), [a, d] = m(0), p = () => {
    c(n ? E(r) : O());
  }, l = j.throttle(() => {
    p();
  }, o), f = L(() => {
    X({ timeout: s, setProgress: d, scrollElement: r, containerHeight: u });
  }, []), h = i ? V(() => {
    f();
  }, i) : () => {
    f();
  };
  return w(() => (window.addEventListener("resize", l), c(n ? E(r) : O()), p(), () => {
    window.removeEventListener("resize", l);
  }), []), w(() => {
    const g = n ? r : document;
    return g.addEventListener("scroll", h, {
      passive: !0
    }), h(), () => {
      g.removeEventListener("scroll", h);
    };
  }, [u]), P({
    scrollData: {
      scrollTop: r.scrollTop,
      scrollHeight: r.scrollHeight,
      containerHeight: u,
      percentProgress: a,
      element: r
    },
    children: e
  });
}, ee = ({ children: e, scrollThrottle: t, resizeThrottle: i }) => {
  const [o, n] = m(!1);
  return w(() => {
    n(!0);
  }, []), o ? /* @__PURE__ */ C(I, { scrollThrottle: t, resizeThrottle: i, children: e }) : P({
    scrollData: {
      scrollTop: 0,
      scrollHeight: 0,
      containerHeight: 0,
      percentProgress: 0,
      element: void 0
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
  return D(i).then((a) => {
    s || (u(a), r(!0));
  }), n ? /* @__PURE__ */ C(I, { scrollThrottle: t, resizeThrottle: o, customScrollingElement: s, children: e }) : c;
};
export {
  B as ScrollTracker,
  te as ScrollTrackerCustom,
  ee as ScrollTrackerDocument
};
