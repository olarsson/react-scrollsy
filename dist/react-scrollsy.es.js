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
(function(e, n) {
  (function(i) {
    e.exports = i();
  })(function() {
    return function() {
      function i(t, o, r) {
        function s(a, d) {
          if (!o[a]) {
            if (!t[a]) {
              var p = typeof b == "function" && b;
              if (!d && p)
                return p(a, !0);
              if (u)
                return u(a, !0);
              var l = new Error("Cannot find module '" + a + "'");
              throw l.code = "MODULE_NOT_FOUND", l;
            }
            var f = o[a] = { exports: {} };
            t[a][0].call(f.exports, function(h) {
              var g = t[a][1][h];
              return s(g || h);
            }, f, f.exports, i, t, o, r);
          }
          return o[a].exports;
        }
        for (var u = typeof b == "function" && b, c = 0; c < r.length; c++)
          s(r[c]);
        return s;
      }
      return i;
    }()({ 1: [function(i, t, o) {
      t.exports = function() {
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
function N(e, n) {
  var i, t;
  return function() {
    var o = arguments, r = this;
    return i || (i = !0, setTimeout(function() {
      return i = !1;
    }, n), t = e.apply(r, o)), t;
  };
}
H.throttle = N;
(function(e) {
  var n = y && y.__createBinding || (Object.create ? function(t, o, r, s) {
    s === void 0 && (s = r), Object.defineProperty(t, s, { enumerable: !0, get: function() {
      return o[r];
    } });
  } : function(t, o, r, s) {
    s === void 0 && (s = r), t[s] = o[r];
  }), i = y && y.__exportStar || function(t, o) {
    for (var r in t)
      r !== "default" && !Object.prototype.hasOwnProperty.call(o, r) && n(o, t, r);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), i(M, e), i(H, e);
})(S);
const V = (e, n) => {
  let i, t;
  return function(...o) {
    const r = this;
    t ? (i && clearTimeout(i), i = setTimeout(() => {
      Date.now() - t >= n && (e.apply(r, o), t = Date.now());
    }, n - (Date.now() - t))) : (e.apply(r, o), t = Date.now());
  };
}, U = () => window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, O = (e) => e.clientHeight;
function D(e) {
  return new Promise((n) => {
    if (document.querySelector(e))
      return n(document.querySelector(e));
    const i = new MutationObserver(() => {
      document.querySelector(e) && (n(document.querySelector(e)), i.disconnect());
    });
    i.observe(document.body, {
      childList: !0,
      subtree: !0
    });
  });
}
const W = (e, n) => {
  if (!e || !n)
    throw "element/container is not defined.";
  const i = e.getBoundingClientRect(), t = n.scrollTop - n.offsetTop;
  return i.top + t;
}, G = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream, P = () => G() ? k() : U(), x = ({ mode: e, scrollData: n, elementScrollHeight: i, offsetTop: t, offsetBottom: o }) => {
  switch (e) {
    case "top":
      if (!t)
        return 0;
      if (t.unit === "px")
        return t.distance;
      if (t.unit === "%")
        switch (t.basedOn) {
          case "doc":
            return n.scrollHeight * (t.distance / 100);
          case "vp":
            return n.containerHeight * (t.distance / 100);
          case "elem":
            return i * (t.distance / 100);
        }
      break;
    case "bottom":
      if (!o)
        return 0;
      if (o.unit === "px")
        return o.distance;
      if (o.unit === "%")
        switch (o.basedOn) {
          case "doc":
            return n.scrollHeight * (o.distance / 100);
          case "vp":
            return n.containerHeight * (o.distance / 100);
          case "elem":
            return i * (o.distance / 100);
        }
      break;
    default:
      return 0;
  }
  return 0;
}, $ = ({ heightDuration: e, duration: n }) => {
  if (n.unit === "px")
    return n.distance;
  if (n.unit === "%")
    switch (n.basedOn) {
      case "doc":
      case "vp":
      case "elem":
        return e * (n.distance / 100);
    }
  return 0;
}, B = ({
  duration: e,
  elementScrollHeight: n,
  elementOffsetTopRelativeToContainer: i,
  trigger: t,
  scrollData: o
}) => {
  let r = 0, s = 0;
  switch (e.basedOn) {
    case "doc":
      r = o.scrollHeight - o.containerHeight;
      break;
    case "vp":
      r = o.containerHeight, s = i, t === "onEnter" && (s -= o.containerHeight);
      break;
    case "elem":
      s = i, t === "onEnter" ? (r = n, s -= o.containerHeight) : t === "onLeave" && (r = n);
      break;
  }
  return {
    heightDuration: r,
    elementOffset: s
  };
}, J = ({
  elementOffset: e,
  offsetTopVal: n,
  durationInPx: i,
  offsetBottomVal: t,
  scrollData: o
}) => {
  const r = e + n, s = e + i - t, u = (o.scrollTop - r) / (s - r);
  return {
    progress: Math.min(Math.max(u, 0), 1),
    start: r,
    end: s
  };
}, K = function({ el: e, scrollData: n, trigger: i, offsetTop: t, offsetBottom: o, duration: r }) {
  const s = W(e, n.element), { scrollHeight: u } = e, { heightDuration: c, elementOffset: a } = B({
    duration: r,
    elementScrollHeight: u,
    elementOffsetTopRelativeToContainer: s,
    trigger: i,
    scrollData: n
  }), d = x({ mode: "top", scrollData: n, elementScrollHeight: u, offsetTop: t }), p = x({ mode: "bottom", scrollData: n, elementScrollHeight: u, offsetBottom: o }), l = $({ heightDuration: c, duration: r }), { progress: f, start: h, end: g } = J({ elementOffset: a, offsetTopVal: d, durationInPx: l, offsetBottomVal: p, scrollData: n });
  return {
    progress: f,
    scrollData: n,
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
    percentProgress: 0,
    scrollHeight: 0,
    scrollTop: 0
  },
  start: 0,
  end: 0
}, _ = ({ children: e, scrollObject: n = q }) => typeof e == "function" ? e({ scrollObject: n, children: e }) : e, Z = F(({ scrollData: e, children: n, elem: i, settings: t, onStart: o, onEnd: r }) => {
  const { trigger: s = R.trigger, offsetTop: u, offsetBottom: c, duration: a } = t, [d, p] = m(!1), [l, f] = m(!1), [h, g] = m(!1);
  if (w(() => {
    d && o && o();
  }, [d]), w(() => {
    l && r && r();
  }, [l]), w(() => {
    i != null && i.current && e.element && g(!0);
  }, [i]), !h)
    return _({ scrollObject: q, children: n });
  const E = K({ el: i.current, scrollData: e, trigger: s, offsetTop: u, offsetBottom: c, duration: a }), { progress: v } = E;
  return v > 0 && v < 1 && d === !1 && typeof o == "function" && p(!0), v <= 0 && d === !0 && typeof o == "function" && p(!1), v >= 1 && l === !1 && typeof r == "function" && f(!0), v < 1 && l === !0 && typeof r == "function" && f(!1), _({ scrollObject: E, children: n });
}), T = ({ scrollData: e, children: n }) => typeof n == "function" ? n({
  scrollData: {
    scrollTop: e.scrollTop,
    scrollHeight: e.scrollHeight,
    containerHeight: e.containerHeight,
    percentProgress: e.percentProgress,
    element: e.element
  },
  children: n
}) : n, Q = ({ timeout: e, setProgress: n, scrollElement: i, containerHeight: t }) => {
  e && window.cancelAnimationFrame(e), e = window.requestAnimationFrame(() => {
    if (!i)
      return;
    const { scrollTop: o, scrollHeight: r } = i;
    n(o / (r - t));
  });
}, I = ({
  children: e,
  customScrollingElement: n,
  scrollThrottle: i,
  resizeThrottle: t = R.resizeThrottle
}) => {
  const o = !!n, r = o ? n : document == null ? void 0 : document.documentElement;
  if (!r)
    throw new Error("No scrolling element found.");
  if (typeof window > "u")
    throw new Error("No window found.");
  const s = null, [u, c] = m(o ? O(r) : P()), [a, d] = m(0), p = () => {
    c(o ? O(r) : P());
  }, l = S.throttle(() => {
    p();
  }, t), f = L(() => {
    Q({ timeout: s, setProgress: d, scrollElement: r, containerHeight: u });
  }, []), h = i ? V(() => {
    f();
  }, i) : () => {
    f();
  };
  return w(() => (window.addEventListener("resize", l), c(o ? O(r) : P()), p(), () => {
    window.removeEventListener("resize", l);
  }), []), w(() => {
    const g = o ? r : document;
    return g.addEventListener("scroll", h, {
      passive: !0
    }), h(), () => {
      g.removeEventListener("scroll", h);
    };
  }, [u]), T({
    scrollData: {
      scrollTop: r.scrollTop,
      scrollHeight: r.scrollHeight,
      containerHeight: u,
      percentProgress: a,
      element: r
    },
    children: e
  });
}, ee = ({ children: e, scrollThrottle: n, resizeThrottle: i }) => {
  const [t, o] = m(!1);
  return w(() => {
    o(!0);
  }, []), t ? /* @__PURE__ */ j(I, { scrollThrottle: n, resizeThrottle: i, children: e }) : T({
    scrollData: {
      scrollTop: 0,
      scrollHeight: 0,
      containerHeight: 0,
      percentProgress: 0
    },
    children: e
  });
}, te = ({ children: e, scrollThrottle: n, resizeThrottle: i, scrollingElement: t }) => {
  const [o, r] = m(!1), [s, u] = m(void 0);
  return w(() => {
    typeof t == "string" ? D(t).then((c) => {
      s || (u(c), r(!0));
    }) : t != null && t.current && !s && (u(t.current), r(!0));
  }, [t]), o ? /* @__PURE__ */ j(I, { scrollThrottle: n, resizeThrottle: i, customScrollingElement: s, children: e }) : T({
    scrollData: {
      scrollTop: 0,
      scrollHeight: 0,
      containerHeight: 0,
      percentProgress: 0,
      element: s
    },
    children: e
  });
};
export {
  Z as ScrollTracker,
  te as ScrollTrackerCustom,
  ee as ScrollTrackerDocument
};
