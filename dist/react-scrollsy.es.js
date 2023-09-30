import { memo as L, useState as p, useEffect as g } from "react";
import { jsx as k } from "react/jsx-runtime";
var y = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function z(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function H(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var C = { exports: {} };
(function(e, n) {
  (function(i) {
    e.exports = i();
  })(function() {
    return function() {
      function i(r, t, o) {
        function s(l, a) {
          if (!t[l]) {
            if (!r[l]) {
              var f = typeof H == "function" && H;
              if (!a && f)
                return f(l, !0);
              if (u)
                return u(l, !0);
              var d = new Error("Cannot find module '" + l + "'");
              throw d.code = "MODULE_NOT_FOUND", d;
            }
            var m = t[l] = { exports: {} };
            r[l][0].call(m.exports, function(h) {
              var w = r[l][1][h];
              return s(w || h);
            }, m, m.exports, i, r, t, o);
          }
          return t[l].exports;
        }
        for (var u = typeof H == "function" && H, c = 0; c < o.length; c++)
          s(o[c]);
        return s;
      }
      return i;
    }()({ 1: [function(i, r, t) {
      r.exports = function() {
        if (typeof window > "u" || typeof navigator > "u")
          return function() {
            return 0;
          };
        if (!navigator.userAgent.match(/iphone|ipod|ipad/i))
          return function() {
            return window.innerHeight;
          };
        var o = Math.abs(window.orientation), s = { w: 0, h: 0 }, u = function() {
          var c = document.createElement("div");
          c.style.position = "fixed", c.style.height = "100vh", c.style.width = 0, c.style.top = 0, document.documentElement.appendChild(c), s.w = o === 90 ? c.offsetHeight : window.innerWidth, s.h = o === 90 ? window.innerWidth : c.offsetHeight, document.documentElement.removeChild(c), c = null;
        };
        return u(), function() {
          return Math.abs(window.orientation) !== 90 ? s.h : s.w;
        };
      }();
    }, {}] }, {}, [1])(1);
  });
})(C);
var F = C.exports;
const I = /* @__PURE__ */ z(F);
var O = {}, j = {};
Object.defineProperty(j, "__esModule", { value: !0 });
var b = {};
Object.defineProperty(b, "__esModule", { value: !0 });
b.throttle = void 0;
function A(e, n) {
  var i, r;
  return function() {
    var t = arguments, o = this;
    return i || (i = !0, setTimeout(function() {
      return i = !1;
    }, n), r = e.apply(o, t)), r;
  };
}
b.throttle = A;
(function(e) {
  var n = y && y.__createBinding || (Object.create ? function(r, t, o, s) {
    s === void 0 && (s = o), Object.defineProperty(r, s, { enumerable: !0, get: function() {
      return t[o];
    } });
  } : function(r, t, o, s) {
    s === void 0 && (s = o), r[s] = t[o];
  }), i = y && y.__exportStar || function(r, t) {
    for (var o in r)
      o !== "default" && !Object.prototype.hasOwnProperty.call(t, o) && n(t, r, o);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), i(j, e), i(b, e);
})(O);
const M = (e, n) => {
  let i, r;
  return function(...t) {
    const o = this;
    r ? (i && clearTimeout(i), i = setTimeout(() => {
      Date.now() - r >= n && (e.apply(o, t), r = Date.now());
    }, n - (Date.now() - r))) : (e.apply(o, t), r = Date.now());
  };
}, N = () => window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, E = (e) => e.clientHeight;
function U(e) {
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
const x = (e, n) => {
  if (!e || !n)
    throw "element/container is not defined.";
  const i = e.getBoundingClientRect(), r = n.scrollTop - n.offsetTop;
  return i.top + r;
}, V = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream, T = () => V() ? I() : N(), W = function(e, n, i, r, t, o) {
  let s = 0, u = 0, c = 0, l = 0, a = 0;
  switch (o.basedOn) {
    case "doc":
      s = n.scrollHeight - n.containerHeight;
      break;
    case "vp":
      s = n.containerHeight, u = x(e, n.element), i === "onEnter" && (u -= n.containerHeight);
      break;
    case "elem":
      u = x(e, n.element), i === "onEnter" ? (s = e.getBoundingClientRect().bottom, u -= n.containerHeight) : i === "onLeave" && (s = e.scrollHeight);
      break;
  }
  if (r) {
    if (r.unit === "px")
      c = r.distance;
    else if (r.unit === "%")
      switch (r.basedOn) {
        case "doc":
          c = n.scrollHeight * (r.distance / 100);
          break;
        case "vp":
          c = n.containerHeight * (r.distance / 100);
          break;
        case "elem":
          c = e.scrollHeight * (r.distance / 100);
          break;
      }
  }
  if (t) {
    if (t.unit === "px")
      l = t.distance;
    else if (t.unit === "%")
      switch (t.basedOn) {
        case "doc":
          l = n.scrollHeight * (t.distance / 100);
          break;
        case "vp":
          l = n.containerHeight * (t.distance / 100);
          break;
        case "elem":
          c = e.scrollHeight * (t.distance / 100);
          break;
      }
  }
  if (o.unit === "px" && (a = o.distance), o.unit === "%")
    switch (o.basedOn) {
      case "doc":
        a = s * (o.distance / 100);
        break;
      case "vp":
        a = s * (o.distance / 100);
        break;
      case "elem":
        a = s * (o.distance / 100);
        break;
    }
  const f = u + c, d = u + a - l, m = (n.scrollTop - f) / (d - f);
  return {
    progress: Math.min(Math.max(m, 0), 1),
    scrollData: n,
    start: f,
    end: d
  };
}, R = {
  resizeThrottle: 150
  // scrollThrottle: 200
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
}, _ = (e, n = q) => typeof e == "function" ? e({ scrollObject: n, children: e }) : e, J = L(({ scrollData: e, children: n, elem: i, settings: r, onStart: t, onEnd: o }) => {
  const { trigger: s = "onEnter", offsetTop: u, offsetBottom: c, duration: l } = r, [a, f] = p(!1), [d, m] = p(!1), [h, w] = p(!1);
  if (g(() => {
    a && typeof t == "function" && t();
  }, [a]), g(() => {
    d && typeof o == "function" && o();
  }, [d]), g(() => {
    i != null && i.current && w(!0);
  }, [i]), !h)
    return _(n, q);
  const S = W(i.current, e, s, u, c, l), { progress: v } = S;
  return v > 0 && v < 1 && a === !1 && typeof t == "function" && f(!0), v <= 0 && a === !0 && typeof t == "function" && f(!1), v >= 1 && d === !1 && typeof o == "function" && m(!0), v < 1 && d === !0 && typeof o == "function" && m(!1), _(n, S);
}), P = ({ scrollData: e, children: n }) => typeof n == "function" ? n({
  scrollData: {
    scrollTop: e.scrollTop,
    scrollHeight: e.scrollHeight,
    containerHeight: e.containerHeight,
    percentProgress: e.percentProgress,
    element: e.element
  },
  children: n
}) : n, K = ({ children: e, scrollThrottle: n, resizeThrottle: i = R.resizeThrottle }) => {
  const r = document == null ? void 0 : document.documentElement;
  if (!r)
    throw new Error("No document.documentElement found.");
  if (typeof window > "u")
    throw new Error("No window found.");
  let t = null;
  const [o, s] = p(T()), [u, c] = p(0), l = () => {
    t && window.cancelAnimationFrame(t), t = window.requestAnimationFrame(() => {
      const { scrollTop: m, scrollHeight: h } = r;
      c(m / (h - o));
    });
  }, a = () => {
    s(T());
  }, f = O.throttle(() => {
    a();
  }, i), d = n ? M(() => {
    l();
  }, n) : () => {
    l();
  };
  return g(() => (window.addEventListener("resize", f), s(T()), a(), () => {
    window.removeEventListener("resize", f);
  }), []), g(() => (document.addEventListener("scroll", d, { passive: !0 }), d(), () => {
    document.removeEventListener("scroll", d);
  }), [o]), P({
    scrollData: {
      scrollTop: r.scrollTop,
      scrollHeight: r.scrollHeight,
      containerHeight: o,
      percentProgress: u,
      element: r
    },
    children: e
  });
}, Q = ({ children: e, scrollThrottle: n, scrollingElement: i, resizeThrottle: r }) => {
  const [t, o] = p(!1), [s, u] = p(null), c = P({
    scrollData: {
      scrollTop: 0,
      scrollHeight: 0,
      containerHeight: 0,
      percentProgress: 0,
      element: document.documentElement
    },
    children: e
  });
  return U(i).then((l) => {
    s || (u(l), o(!0));
  }), t ? /* @__PURE__ */ k($, { scrollThrottle: n, resizeThrottle: r, customScrollingElement: s, children: e }) : c;
}, $ = ({
  children: e,
  customScrollingElement: n,
  scrollThrottle: i,
  resizeThrottle: r = R.resizeThrottle
}) => {
  const t = n;
  if (!t)
    throw new Error("No custom scrolling element found.");
  if (typeof window > "u")
    throw new Error("No window found.");
  let o = null;
  const [s, u] = p(E(t)), [c, l] = p(0), a = () => {
    o && window.cancelAnimationFrame(o), o = window.requestAnimationFrame(() => {
      const { scrollTop: h, scrollHeight: w } = t;
      l(h / (w - s));
    });
  }, f = () => {
    u(E(t));
  }, d = O.throttle(() => {
    f();
  }, r), m = i ? M(() => {
    a();
  }, i) : () => {
    a();
  };
  return g(() => (window.addEventListener("resize", d), u(E(t)), f(), () => {
    window.removeEventListener("resize", d);
  }), []), g(() => (t.addEventListener("scroll", m, {
    passive: !0
  }), m(), () => {
    t.removeEventListener("scroll", m);
  }), [s]), P({
    scrollData: {
      scrollTop: t.scrollTop,
      scrollHeight: t.scrollHeight,
      containerHeight: s,
      percentProgress: c,
      element: t
    },
    children: e
  });
};
export {
  J as ScrollTracker,
  Q as ScrollTrackerCustom,
  K as ScrollTrackerDocument
};
