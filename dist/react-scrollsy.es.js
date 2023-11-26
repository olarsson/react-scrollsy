import { memo as I, useState as g, useEffect as w, useCallback as F } from "react";
import { jsx as S } from "react/jsx-runtime";
var y = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function L(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function H(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var C = { exports: {} };
(function(e, t) {
  (function(i) {
    e.exports = i();
  })(function() {
    return function() {
      function i(r, o, n) {
        function s(u, a) {
          if (!o[u]) {
            if (!r[u]) {
              var d = typeof H == "function" && H;
              if (!a && d)
                return d(u, !0);
              if (l)
                return l(u, !0);
              var f = new Error("Cannot find module '" + u + "'");
              throw f.code = "MODULE_NOT_FOUND", f;
            }
            var p = o[u] = { exports: {} };
            r[u][0].call(p.exports, function(h) {
              var m = r[u][1][h];
              return s(m || h);
            }, p, p.exports, i, r, o, n);
          }
          return o[u].exports;
        }
        for (var l = typeof H == "function" && H, c = 0; c < n.length; c++)
          s(n[c]);
        return s;
      }
      return i;
    }()({ 1: [function(i, r, o) {
      r.exports = function() {
        if (typeof window > "u" || typeof navigator > "u")
          return function() {
            return 0;
          };
        if (!navigator.userAgent.match(/iphone|ipod|ipad/i))
          return function() {
            return window.innerHeight;
          };
        var n = Math.abs(window.orientation), s = { w: 0, h: 0 }, l = function() {
          var c = document.createElement("div");
          c.style.position = "fixed", c.style.height = "100vh", c.style.width = 0, c.style.top = 0, document.documentElement.appendChild(c), s.w = n === 90 ? c.offsetHeight : window.innerWidth, s.h = n === 90 ? window.innerWidth : c.offsetHeight, document.documentElement.removeChild(c), c = null;
        };
        return l(), function() {
          return Math.abs(window.orientation) !== 90 ? s.h : s.w;
        };
      }();
    }, {}] }, {}, [1])(1);
  });
})(C);
var z = C.exports;
const A = /* @__PURE__ */ L(z);
var j = {}, M = {};
Object.defineProperty(M, "__esModule", { value: !0 });
var b = {};
Object.defineProperty(b, "__esModule", { value: !0 });
b.throttle = void 0;
function N(e, t) {
  var i, r;
  return function() {
    var o = arguments, n = this;
    return i || (i = !0, setTimeout(function() {
      return i = !1;
    }, t), r = e.apply(n, o)), r;
  };
}
b.throttle = N;
(function(e) {
  var t = y && y.__createBinding || (Object.create ? function(r, o, n, s) {
    s === void 0 && (s = n), Object.defineProperty(r, s, { enumerable: !0, get: function() {
      return o[n];
    } });
  } : function(r, o, n, s) {
    s === void 0 && (s = n), r[s] = o[n];
  }), i = y && y.__exportStar || function(r, o) {
    for (var n in r)
      n !== "default" && !Object.prototype.hasOwnProperty.call(o, n) && t(o, r, n);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), i(M, e), i(b, e);
})(j);
const U = (e, t) => {
  let i, r;
  return function(...o) {
    const n = this;
    r ? (i && clearTimeout(i), i = setTimeout(() => {
      Date.now() - r >= t && (e.apply(n, o), r = Date.now());
    }, t - (Date.now() - r))) : (e.apply(n, o), r = Date.now());
  };
}, V = () => window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, E = (e) => e.clientHeight;
function W(e) {
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
const x = (e, t) => {
  if (!e || !t)
    throw "element/container is not defined.";
  const i = e.getBoundingClientRect(), r = t.scrollTop - t.offsetTop;
  return i.top + r;
}, $ = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream, O = () => $() ? A() : V(), G = function(e, t, i, r, o, n) {
  let s = 0, l = 0, c = 0, u = 0, a = 0;
  switch (n.basedOn) {
    case "doc":
      s = t.scrollHeight - t.containerHeight;
      break;
    case "vp":
      s = t.containerHeight, l = x(e, t.element), i === "onEnter" && (l -= t.containerHeight);
      break;
    case "elem":
      l = x(e, t.element), i === "onEnter" ? (s = e.scrollHeight, l -= t.containerHeight) : i === "onLeave" && (s = e.scrollHeight);
      break;
  }
  if (r) {
    if (r.unit === "px")
      c = r.distance;
    else if (r.unit === "%")
      switch (r.basedOn) {
        case "doc":
          c = t.scrollHeight * (r.distance / 100);
          break;
        case "vp":
          c = t.containerHeight * (r.distance / 100);
          break;
        case "elem":
          c = e.scrollHeight * (r.distance / 100);
          break;
      }
  }
  if (o) {
    if (o.unit === "px")
      u = o.distance;
    else if (o.unit === "%")
      switch (o.basedOn) {
        case "doc":
          u = t.scrollHeight * (o.distance / 100);
          break;
        case "vp":
          u = t.containerHeight * (o.distance / 100);
          break;
        case "elem":
          c = e.scrollHeight * (o.distance / 100);
          break;
      }
  }
  if (n.unit === "px" && (a = n.distance), n.unit === "%")
    switch (n.basedOn) {
      case "doc":
        a = s * (n.distance / 100);
        break;
      case "vp":
        a = s * (n.distance / 100);
        break;
      case "elem":
        a = s * (n.distance / 100);
        break;
    }
  const d = l + c, f = l + a - u, p = (t.scrollTop - d) / (f - d);
  return {
    progress: Math.min(Math.max(p, 0), 1),
    scrollData: t,
    start: d,
    end: f
  };
}, R = {
  resizeThrottle: 150,
  trigger: "onEnter"
}, k = {
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
}, _ = (e, t = k) => typeof e == "function" ? e && e({ scrollObject: t, children: e }) : e, K = I(({ scrollData: e, children: t, elem: i, settings: r, onStart: o, onEnd: n }) => {
  const { trigger: s = R.trigger, offsetTop: l, offsetBottom: c, duration: u } = r, [a, d] = g(!1), [f, p] = g(!1), [h, m] = g(!1);
  if (w(() => {
    a && typeof o == "function" && o();
  }, [a]), w(() => {
    f && typeof n == "function" && n();
  }, [f]), w(() => {
    i != null && i.current && m(!0);
  }, [i]), !h)
    return _(t, k);
  const P = G(i.current, e, s, l, c, u), { progress: v } = P;
  return v > 0 && v < 1 && a === !1 && typeof o == "function" && d(!0), v <= 0 && a === !0 && typeof o == "function" && d(!1), v >= 1 && f === !1 && typeof n == "function" && p(!0), v < 1 && f === !0 && typeof n == "function" && p(!1), _(t, P);
}), T = ({ scrollData: e, children: t }) => typeof t == "function" ? t && t({
  scrollData: {
    scrollTop: e.scrollTop,
    scrollHeight: e.scrollHeight,
    containerHeight: e.containerHeight,
    percentProgress: e.percentProgress,
    element: e.element
  },
  children: t
}) : t, B = ({ timeout: e, setProgress: t, scrollElement: i, containerHeight: r }) => {
  e && window.cancelAnimationFrame(e), e = window.requestAnimationFrame(() => {
    if (!i)
      return;
    const { scrollTop: o, scrollHeight: n } = i;
    t(o / (n - r));
  });
}, q = ({
  children: e,
  customScrollingElement: t,
  scrollThrottle: i,
  resizeThrottle: r = R.resizeThrottle
}) => {
  const o = !!t, n = o ? t : document == null ? void 0 : document.documentElement;
  if (!n)
    throw new Error("No scrolling element found.");
  if (typeof window > "u")
    throw new Error("No window found.");
  const s = null, [l, c] = g(
    o ? E(n) : O()
  ), [u, a] = g(0), d = () => {
    c(o ? E(n) : O());
  }, f = j.throttle(() => {
    d();
  }, r), p = F(() => {
    B({ timeout: s, setProgress: a, scrollElement: n, containerHeight: l });
  }, []), h = i ? U(() => {
    p();
  }, i) : () => {
    p();
  };
  return w(() => (window.addEventListener("resize", f), c(o ? E(n) : O()), d(), () => {
    window.removeEventListener("resize", f);
  }), []), w(() => {
    const m = o ? n : document;
    return m.addEventListener("scroll", h, {
      passive: !0
    }), h(), () => {
      m.removeEventListener("scroll", h);
    };
  }, [l]), T({
    scrollData: {
      scrollTop: n.scrollTop,
      scrollHeight: n.scrollHeight,
      containerHeight: l,
      percentProgress: u,
      element: n
    },
    children: e
  });
}, Q = ({ children: e, scrollThrottle: t, resizeThrottle: i }) => {
  const [r, o] = g(!1);
  return w(() => {
    o(!0);
  }, []), r ? /* @__PURE__ */ S(q, { scrollThrottle: t, resizeThrottle: i, children: e }) : T({
    scrollData: {
      scrollTop: 0,
      scrollHeight: 0,
      containerHeight: 0,
      percentProgress: 0,
      element: void 0
    },
    children: e
  });
}, X = ({ children: e, scrollThrottle: t, scrollingElement: i, resizeThrottle: r }) => {
  const [o, n] = g(!1), [s, l] = g(void 0), c = T({
    scrollData: {
      scrollTop: 0,
      scrollHeight: 0,
      containerHeight: 0,
      percentProgress: 0,
      element: s
    },
    children: e
  });
  return W(i).then((u) => {
    s || (l(u), n(!0));
  }), o ? /* @__PURE__ */ S(q, { scrollThrottle: t, resizeThrottle: r, customScrollingElement: s, children: e }) : c;
};
export {
  K as ScrollTracker,
  X as ScrollTrackerCustom,
  Q as ScrollTrackerDocument
};
