import { memo as q, useState as h, useEffect as p } from "react";
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
  (function(r) {
    e.exports = r();
  })(function() {
    return function() {
      function r(o, t, i) {
        function s(c, d) {
          if (!t[c]) {
            if (!o[c]) {
              var a = typeof H == "function" && H;
              if (!d && a)
                return a(c, !0);
              if (u)
                return u(c, !0);
              var f = new Error("Cannot find module '" + c + "'");
              throw f.code = "MODULE_NOT_FOUND", f;
            }
            var m = t[c] = { exports: {} };
            o[c][0].call(m.exports, function(g) {
              var w = o[c][1][g];
              return s(w || g);
            }, m, m.exports, r, o, t, i);
          }
          return t[c].exports;
        }
        for (var u = typeof H == "function" && H, l = 0; l < i.length; l++)
          s(i[l]);
        return s;
      }
      return r;
    }()({ 1: [function(r, o, t) {
      o.exports = function() {
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
var P = {}, C = {};
Object.defineProperty(C, "__esModule", { value: !0 });
var b = {};
Object.defineProperty(b, "__esModule", { value: !0 });
b.throttle = void 0;
function I(e, n) {
  var r, o;
  return function() {
    var t = arguments, i = this;
    return r || (r = !0, setTimeout(function() {
      return r = !1;
    }, n), o = e.apply(i, t)), o;
  };
}
b.throttle = I;
(function(e) {
  var n = y && y.__createBinding || (Object.create ? function(o, t, i, s) {
    s === void 0 && (s = i), Object.defineProperty(o, s, { enumerable: !0, get: function() {
      return t[i];
    } });
  } : function(o, t, i, s) {
    s === void 0 && (s = i), o[s] = t[i];
  }), r = y && y.__exportStar || function(o, t) {
    for (var i in o)
      i !== "default" && !Object.prototype.hasOwnProperty.call(t, i) && n(t, o, i);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), r(C, e), r(b, e);
})(P);
const j = (e, n) => {
  let r, o;
  return function(...t) {
    const i = this;
    o ? (r && clearTimeout(r), r = setTimeout(() => {
      Date.now() - o >= n && (e.apply(i, t), o = Date.now());
    }, n - (Date.now() - o))) : (e.apply(i, t), o = Date.now());
  };
}, A = () => window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, E = (e) => e.clientHeight;
function N(e) {
  return new Promise((n) => {
    if (document.querySelector(e))
      return n(document.querySelector(e));
    const r = new MutationObserver(() => {
      document.querySelector(e) && (n(document.querySelector(e)), r.disconnect());
    });
    r.observe(document.body, {
      childList: !0,
      subtree: !0
    });
  });
}
const S = (e, n) => {
  if (!e || !n)
    throw "element/container is not defined.";
  const r = e.getBoundingClientRect(), o = n.scrollTop - n.offsetTop;
  return r.top + o;
}, U = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream, O = () => U() ? F() : A(), V = function(e, n, r, o, t) {
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
  if (r) {
    if (r.unit === "px")
      u = r.distance;
    else if (r.unit === "%")
      switch (r.basedOn) {
        case "doc":
          u = n.scrollHeight * (r.distance / 100);
          break;
        case "vp":
          u = n.containerHeight * (r.distance / 100);
          break;
        case "elem":
          u = e.scrollHeight * (r.distance / 100);
          break;
      }
  }
  if (o) {
    if (o.unit === "px")
      l = o.distance;
    else if (o.unit === "%")
      switch (o.basedOn) {
        case "doc":
          l = n.scrollHeight * (o.distance / 100);
          break;
        case "vp":
          l = n.containerHeight * (o.distance / 100);
          break;
        case "elem":
          u = e.scrollHeight * (o.distance / 100);
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
}, x = (e, n = R) => typeof e == "function" ? e({ scrollObject: n, children: e }) : e, B = q(({ scrollData: e, children: n, elem: r, settings: o, onStart: t, onEnd: i }) => {
  const { offsetTop: s, offsetBottom: u, duration: l } = o, [c, d] = h(!1), [a, f] = h(!1), [m, g] = h(!1);
  if (p(() => {
    c && typeof t == "function" && t();
  }, [c]), p(() => {
    a && typeof i == "function" && i();
  }, [a]), p(() => {
    r != null && r.current && g(!0);
  }, [r]), !m)
    return x(n, R);
  const w = V(r.current, e, s, u, l), { progress: v } = w;
  return v > 0 && v < 1 && c === !1 && typeof t == "function" && d(!0), v <= 0 && c === !0 && typeof t == "function" && d(!1), v >= 1 && a === !1 && typeof i == "function" && f(!0), v < 1 && a === !0 && typeof i == "function" && f(!1), x(n, w);
}), T = ({ scrollData: e, children: n }) => typeof n == "function" ? n({
  scrollData: {
    scrollTop: e.scrollTop,
    scrollHeight: e.scrollHeight,
    containerHeight: e.containerHeight,
    percentProgress: e.percentProgress,
    element: e.element
  },
  children: n
}) : n, J = ({
  children: e,
  scrollThrottle: n,
  // = defaultConfig.scrollThrottle,
  resizeThrottle: r = M.resizeThrottle
}) => {
  const o = document == null ? void 0 : document.documentElement;
  if (!o)
    throw new Error("No document.documentElement found.");
  if (typeof window > "u")
    throw new Error("No window found.");
  let t = null;
  const [i, s] = h(O()), [u, l] = h(0), c = () => {
    t && window.cancelAnimationFrame(t), t = window.requestAnimationFrame(() => {
      const { scrollTop: m, scrollHeight: g } = o;
      l(m / (g - i));
    });
  }, d = () => {
    s(O());
  }, a = P.throttle(() => {
    d();
  }, r), f = n ? j(() => {
    console.log("throttle scroll", n), c();
  }, n) : () => {
    console.log("no throttled scroll"), c();
  };
  return p(() => (window.addEventListener("resize", a), s(O()), d(), () => {
    window.removeEventListener("resize", a);
  }), []), p(() => (document.addEventListener("scroll", f, { passive: !0 }), f(), () => {
    document.removeEventListener("scroll", f);
  }), [i]), T({
    scrollData: {
      scrollTop: o.scrollTop,
      scrollHeight: o.scrollHeight,
      containerHeight: i,
      percentProgress: u,
      element: o
    },
    children: e
  });
}, K = ({ children: e, scrollThrottle: n, scrollingElement: r, resizeThrottle: o }) => {
  const [t, i] = h(!1), [s, u] = h(null), l = T({
    scrollData: {
      scrollTop: 0,
      scrollHeight: 0,
      containerHeight: 0,
      percentProgress: 0,
      element: document.documentElement
    },
    children: e
  });
  return N(r).then((c) => {
    s || (u(c), i(!0));
  }), t ? /* @__PURE__ */ k(W, { scrollThrottle: n, resizeThrottle: o, customScrollingElement: s, children: e }) : l;
}, W = ({
  children: e,
  customScrollingElement: n,
  scrollThrottle: r,
  resizeThrottle: o = M.resizeThrottle
}) => {
  const t = n;
  if (!t)
    throw new Error("No custom scrolling element found.");
  if (typeof window > "u")
    throw new Error("No window found.");
  let i = null;
  const [s, u] = h(E(t)), [l, c] = h(0), d = () => {
    i && window.cancelAnimationFrame(i), i = window.requestAnimationFrame(() => {
      const { scrollTop: g, scrollHeight: w } = t;
      c(g / (w - s));
    });
  }, a = () => {
    u(E(t));
  }, f = P.throttle(() => {
    a();
  }, o), m = r ? j(() => {
    console.log("custom throttle scroll", r), d();
  }, r) : () => {
    console.log("custom no throttled scroll"), d();
  };
  return p(() => (window.addEventListener("resize", f), u(E(t)), a(), () => {
    window.removeEventListener("resize", f);
  }), []), p(() => (t.addEventListener("scroll", m, {
    passive: !0
  }), m(), () => {
    t.removeEventListener("scroll", m);
  }), [s]), T({
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
