import { memo as q, useState as h, useEffect as g } from "react";
import { jsx as k } from "react/jsx-runtime";
var y = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function z(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function H(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var _ = { exports: {} };
(function(e, n) {
  (function(o) {
    e.exports = o();
  })(function() {
    return function() {
      function o(r, t, i) {
        function s(c, d) {
          if (!t[c]) {
            if (!r[c]) {
              var a = typeof H == "function" && H;
              if (!d && a)
                return a(c, !0);
              if (u)
                return u(c, !0);
              var f = new Error("Cannot find module '" + c + "'");
              throw f.code = "MODULE_NOT_FOUND", f;
            }
            var m = t[c] = { exports: {} };
            r[c][0].call(m.exports, function(p) {
              var w = r[c][1][p];
              return s(w || p);
            }, m, m.exports, o, r, t, i);
          }
          return t[c].exports;
        }
        for (var u = typeof H == "function" && H, l = 0; l < i.length; l++)
          s(i[l]);
        return s;
      }
      return o;
    }()({ 1: [function(o, r, t) {
      r.exports = function() {
        if (typeof window > "u" || typeof navigator > "u")
          return function() {
            return 0;
          };
        if (!navigator.userAgent.match(/iphone|ipod|ipad/i))
          return function() {
            return window.innerHeight;
          };
        var i = Math.abs(window.orientation), s = { w: 0, h: 0 }, u = function() {
          var l = document.createElement("div");
          l.style.position = "fixed", l.style.height = "100vh", l.style.width = 0, l.style.top = 0, document.documentElement.appendChild(l), s.w = i === 90 ? l.offsetHeight : window.innerWidth, s.h = i === 90 ? window.innerWidth : l.offsetHeight, document.documentElement.removeChild(l), l = null;
        };
        return u(), function() {
          return Math.abs(window.orientation) !== 90 ? s.h : s.w;
        };
      }();
    }, {}] }, {}, [1])(1);
  });
})(_);
var L = _.exports;
const F = /* @__PURE__ */ z(L);
var O = {}, C = {};
Object.defineProperty(C, "__esModule", { value: !0 });
var b = {};
Object.defineProperty(b, "__esModule", { value: !0 });
b.throttle = void 0;
function I(e, n) {
  var o, r;
  return function() {
    var t = arguments, i = this;
    return o || (o = !0, setTimeout(function() {
      return o = !1;
    }, n), r = e.apply(i, t)), r;
  };
}
b.throttle = I;
(function(e) {
  var n = y && y.__createBinding || (Object.create ? function(r, t, i, s) {
    s === void 0 && (s = i), Object.defineProperty(r, s, { enumerable: !0, get: function() {
      return t[i];
    } });
  } : function(r, t, i, s) {
    s === void 0 && (s = i), r[s] = t[i];
  }), o = y && y.__exportStar || function(r, t) {
    for (var i in r)
      i !== "default" && !Object.prototype.hasOwnProperty.call(t, i) && n(t, r, i);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), o(C, e), o(b, e);
})(O);
const j = (e, n) => {
  let o, r;
  return function(...t) {
    const i = this;
    r ? (o && clearTimeout(o), o = setTimeout(() => {
      Date.now() - r >= n && (e.apply(i, t), r = Date.now());
    }, n - (Date.now() - r))) : (e.apply(i, t), r = Date.now());
  };
}, A = () => window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, E = (e) => e.clientHeight;
function N(e) {
  return new Promise((n) => {
    if (document.querySelector(e))
      return n(document.querySelector(e));
    const o = new MutationObserver(() => {
      document.querySelector(e) && (n(document.querySelector(e)), o.disconnect());
    });
    o.observe(document.body, {
      childList: !0,
      subtree: !0
    });
  });
}
const S = (e, n) => {
  if (!e || !n)
    throw "element/container is not defined.";
  const o = e.getBoundingClientRect(), r = n.scrollTop - n.offsetTop;
  return o.top + r;
}, U = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream, T = () => U() ? F() : A(), V = function(e, n, o, r, t) {
  let i = 0, s = 0, u = 0, l = 0, c = 0;
  switch (t.basedOn) {
    case "doc":
      i = n.scrollHeight - n.containerHeight;
      break;
    case "vp":
      i = n.containerHeight, s = S(e, n.element) - n.containerHeight;
      break;
    case "elem":
      i = e.getBoundingClientRect().bottom, s = S(e, n.element) - n.containerHeight;
      break;
  }
  if (o) {
    if (o.unit === "px")
      u = o.distance;
    else if (o.unit === "%")
      switch (o.basedOn) {
        case "doc":
          u = n.scrollHeight * (o.distance / 100);
          break;
        case "vp":
          u = n.containerHeight * (o.distance / 100);
          break;
        case "elem":
          u = e.scrollHeight * (o.distance / 100);
          break;
      }
  }
  if (r) {
    if (r.unit === "px")
      l = r.distance;
    else if (r.unit === "%")
      switch (r.basedOn) {
        case "doc":
          l = n.scrollHeight * (r.distance / 100);
          break;
        case "vp":
          l = n.containerHeight * (r.distance / 100);
          break;
        case "elem":
          u = e.scrollHeight * (r.distance / 100);
          break;
      }
  }
  if (t.unit === "px" && (c = t.distance), t.unit === "%")
    switch (t.basedOn) {
      case "doc":
        c = i * (t.distance / 100);
        break;
      case "vp":
        c = i * (t.distance / 100);
        break;
      case "elem":
        c = e.scrollHeight * (t.distance / 100);
        break;
    }
  const d = s + u, a = s + c - l, f = (n.scrollTop - d) / (a - d);
  return {
    progress: Math.min(Math.max(f, 0), 1),
    scrollData: n,
    start: d,
    end: a
  };
}, M = {
  resizeThrottle: 150
  // scrollThrottle: 200
}, R = {
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
}, x = (e, n = R) => typeof e == "function" ? e({ scrollObject: n, children: e }) : e, B = q(({ scrollData: e, children: n, elem: o, settings: r, onStart: t, onEnd: i }) => {
  const { offsetTop: s, offsetBottom: u, duration: l } = r, [c, d] = h(!1), [a, f] = h(!1), [m, p] = h(!1);
  if (g(() => {
    c && typeof t == "function" && t();
  }, [c]), g(() => {
    a && typeof i == "function" && i();
  }, [a]), g(() => {
    o != null && o.current && p(!0);
  }, [o]), !m)
    return x(n, R);
  const w = V(o.current, e, s, u, l), { progress: v } = w;
  return v > 0 && v < 1 && c === !1 && typeof t == "function" && d(!0), v <= 0 && c === !0 && typeof t == "function" && d(!1), v >= 1 && a === !1 && typeof i == "function" && f(!0), v < 1 && a === !0 && typeof i == "function" && f(!1), x(n, w);
}), P = ({ scrollData: e, children: n }) => typeof n == "function" ? n({
  scrollData: {
    scrollTop: e.scrollTop,
    scrollHeight: e.scrollHeight,
    containerHeight: e.containerHeight,
    percentProgress: e.percentProgress,
    element: e.element
  },
  children: n
}) : n, J = ({ children: e, scrollThrottle: n, resizeThrottle: o = M.resizeThrottle }) => {
  const r = document == null ? void 0 : document.documentElement;
  if (!r)
    throw new Error("No document.documentElement found.");
  if (typeof window > "u")
    throw new Error("No window found.");
  let t = null;
  const [i, s] = h(T()), [u, l] = h(0), c = () => {
    t && window.cancelAnimationFrame(t), t = window.requestAnimationFrame(() => {
      const { scrollTop: m, scrollHeight: p } = r;
      l(m / (p - i));
    });
  }, d = () => {
    s(T());
  }, a = O.throttle(() => {
    d();
  }, o), f = n ? j(() => {
    c();
  }, n) : () => {
    c();
  };
  return g(() => (window.addEventListener("resize", a), s(T()), d(), () => {
    window.removeEventListener("resize", a);
  }), []), g(() => (document.addEventListener("scroll", f, { passive: !0 }), f(), () => {
    document.removeEventListener("scroll", f);
  }), [i]), P({
    scrollData: {
      scrollTop: r.scrollTop,
      scrollHeight: r.scrollHeight,
      containerHeight: i,
      percentProgress: u,
      element: r
    },
    children: e
  });
}, K = ({ children: e, scrollThrottle: n, scrollingElement: o, resizeThrottle: r }) => {
  const [t, i] = h(!1), [s, u] = h(null), l = P({
    scrollData: {
      scrollTop: 0,
      scrollHeight: 0,
      containerHeight: 0,
      percentProgress: 0,
      element: document.documentElement
    },
    children: e
  });
  return N(o).then((c) => {
    s || (u(c), i(!0));
  }), t ? /* @__PURE__ */ k(W, { scrollThrottle: n, resizeThrottle: r, customScrollingElement: s, children: e }) : l;
}, W = ({
  children: e,
  customScrollingElement: n,
  scrollThrottle: o,
  resizeThrottle: r = M.resizeThrottle
}) => {
  const t = n;
  if (!t)
    throw new Error("No custom scrolling element found.");
  if (typeof window > "u")
    throw new Error("No window found.");
  let i = null;
  const [s, u] = h(E(t)), [l, c] = h(0), d = () => {
    i && window.cancelAnimationFrame(i), i = window.requestAnimationFrame(() => {
      const { scrollTop: p, scrollHeight: w } = t;
      c(p / (w - s));
    });
  }, a = () => {
    u(E(t));
  }, f = O.throttle(() => {
    a();
  }, r), m = o ? j(() => {
    d();
  }, o) : () => {
    d();
  };
  return g(() => (window.addEventListener("resize", f), u(E(t)), a(), () => {
    window.removeEventListener("resize", f);
  }), []), g(() => (t.addEventListener("scroll", m, {
    passive: !0
  }), m(), () => {
    t.removeEventListener("scroll", m);
  }), [s]), P({
    scrollData: {
      scrollTop: t.scrollTop,
      scrollHeight: t.scrollHeight,
      containerHeight: s,
      percentProgress: l,
      element: t
    },
    children: e
  });
};
export {
  B as ScrollTracker,
  K as ScrollTrackerCustom,
  J as ScrollTrackerDocument
};
