import { memo as q, useState as m, useEffect as g } from "react";
import { jsx as z } from "react/jsx-runtime";
var y = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function R(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function H(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var C = { exports: {} };
(function(e, r) {
  (function(n) {
    e.exports = n();
  })(function() {
    return function() {
      function n(t, i, o) {
        function s(l, d) {
          if (!i[l]) {
            if (!t[l]) {
              var a = typeof H == "function" && H;
              if (!d && a)
                return a(l, !0);
              if (u)
                return u(l, !0);
              var f = new Error("Cannot find module '" + l + "'");
              throw f.code = "MODULE_NOT_FOUND", f;
            }
            var h = i[l] = { exports: {} };
            t[l][0].call(h.exports, function(w) {
              var v = t[l][1][w];
              return s(v || w);
            }, h, h.exports, n, t, i, o);
          }
          return i[l].exports;
        }
        for (var u = typeof H == "function" && H, c = 0; c < o.length; c++)
          s(o[c]);
        return s;
      }
      return n;
    }()({ 1: [function(n, t, i) {
      t.exports = function() {
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
var k = C.exports;
const L = /* @__PURE__ */ R(k);
var O = {}, j = {};
Object.defineProperty(j, "__esModule", { value: !0 });
var b = {};
Object.defineProperty(b, "__esModule", { value: !0 });
b.throttle = void 0;
function F(e, r) {
  var n, t;
  return function() {
    var i = arguments, o = this;
    return n || (n = !0, setTimeout(function() {
      return n = !1;
    }, r), t = e.apply(o, i)), t;
  };
}
b.throttle = F;
(function(e) {
  var r = y && y.__createBinding || (Object.create ? function(t, i, o, s) {
    s === void 0 && (s = o), Object.defineProperty(t, s, { enumerable: !0, get: function() {
      return i[o];
    } });
  } : function(t, i, o, s) {
    s === void 0 && (s = o), t[s] = i[o];
  }), n = y && y.__exportStar || function(t, i) {
    for (var o in t)
      o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && r(i, t, o);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), n(j, e), n(b, e);
})(O);
const I = () => window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, E = (e) => e.clientHeight;
function A(e) {
  return new Promise((r) => {
    if (document.querySelector(e))
      return r(document.querySelector(e));
    const n = new MutationObserver(() => {
      document.querySelector(e) && (r(document.querySelector(e)), n.disconnect());
    });
    n.observe(document.body, {
      childList: !0,
      subtree: !0
    });
  });
}
const _ = (e, r) => {
  if (!e || !r)
    throw "element/container is not defined.";
  const n = e.getBoundingClientRect(), t = r.scrollTop - r.offsetTop;
  return n.top + t;
}, N = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream, T = () => N() ? L() : I(), U = function(e, r, n, t, i) {
  let o = 0, s = 0, u = 0, c = 0, l = 0;
  switch (i.basedOn) {
    case "doc":
      o = r.scrollHeight - r.containerHeight;
      break;
    case "vp":
      o = r.containerHeight, s = _(e, r.element) - r.containerHeight;
      break;
    case "elem":
      o = e.getBoundingClientRect().bottom, s = _(e, r.element) - r.containerHeight;
      break;
  }
  if (n) {
    if (n.unit === "px")
      u = n.distance;
    else if (n.unit === "%")
      switch (n.basedOn) {
        case "doc":
          u = r.scrollHeight * (n.distance / 100);
          break;
        case "vp":
          u = r.containerHeight * (n.distance / 100);
          break;
        case "elem":
          u = e.scrollHeight * (n.distance / 100);
          break;
      }
  }
  if (t) {
    if (t.unit === "px")
      c = t.distance;
    else if (t.unit === "%")
      switch (t.basedOn) {
        case "doc":
          c = r.scrollHeight * (t.distance / 100);
          break;
        case "vp":
          c = r.containerHeight * (t.distance / 100);
          break;
        case "elem":
          u = e.scrollHeight * (t.distance / 100);
          break;
      }
  }
  if (i.unit === "px" && (l = i.distance), i.unit === "%")
    switch (i.basedOn) {
      case "doc":
        l = o * (i.distance / 100);
        break;
      case "vp":
        l = o * (i.distance / 100);
        break;
      case "elem":
        l = e.scrollHeight * (i.distance / 100);
        break;
    }
  const d = s + u, a = s + l - c, f = (r.scrollTop - d) / (a - d);
  return {
    progress: Math.min(Math.max(f, 0), 1),
    scrollData: r,
    start: d,
    end: a
  };
}, P = {
  resizeThrottle: 150
}, M = {
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
}, x = (e, r = M) => typeof e == "function" ? e({ scrollObject: r, children: e }) : e, G = q(({ scrollData: e, children: r, elem: n, settings: t, onStart: i, onEnd: o }) => {
  const { offsetTop: s, offsetBottom: u, duration: c } = t, [l, d] = m(!1), [a, f] = m(!1), [h, w] = m(!1);
  if (g(() => {
    l && typeof i == "function" && i();
  }, [l]), g(() => {
    a && typeof o == "function" && o();
  }, [a]), g(() => {
    n != null && n.current && w(!0);
  }, [n]), !h)
    return x(r, M);
  const v = U(n.current, e, s, u, c), { progress: p } = v;
  return p > 0 && p < 1 && l === !1 && typeof i == "function" && d(!0), p <= 0 && l === !0 && typeof i == "function" && d(!1), p >= 1 && a === !1 && typeof o == "function" && f(!0), p < 1 && a === !0 && typeof o == "function" && f(!1), x(r, v);
}), S = ({ scrollData: e, children: r }) => typeof r == "function" ? r({
  scrollData: {
    scrollTop: e.scrollTop,
    scrollHeight: e.scrollHeight,
    containerHeight: e.containerHeight,
    percentProgress: e.percentProgress,
    element: e.element
  },
  children: r
}) : r, B = ({ children: e, resizeThrottle: r = P.resizeThrottle }) => {
  const n = document == null ? void 0 : document.documentElement;
  if (!n)
    throw new Error("No document.documentElement found.");
  if (typeof window > "u")
    throw new Error("No window found.");
  let t = null;
  const [i, o] = m(T()), [s, u] = m(0), c = () => {
    t && window.cancelAnimationFrame(t), t = window.requestAnimationFrame(() => {
      const { scrollTop: a, scrollHeight: f } = n;
      u(a / (f - i));
    });
  }, l = () => {
    o(T());
  }, d = O.throttle(() => {
    l();
  }, r);
  return g(() => (window.addEventListener("resize", d), o(T()), l(), () => {
    window.removeEventListener("resize", d);
  }), []), g(() => (document.addEventListener("scroll", c, { passive: !0 }), c(), () => {
    document.removeEventListener("scroll", c);
  }), [i]), S({
    scrollData: {
      scrollTop: n.scrollTop,
      scrollHeight: n.scrollHeight,
      containerHeight: i,
      percentProgress: s,
      element: n
    },
    children: e
  });
}, J = ({ children: e, scrollingElement: r, resizeThrottle: n = P.resizeThrottle }) => {
  const [t, i] = m(!1), [o, s] = m(null), u = S({
    scrollData: {
      scrollTop: 0,
      scrollHeight: 0,
      containerHeight: 0,
      percentProgress: 0,
      element: document.documentElement
    },
    children: e
  });
  return A(r).then((c) => {
    o || (s(c), i(!0));
  }), t ? /* @__PURE__ */ z(V, { resizeThrottle: n, customScrollingElement: o, children: e }) : u;
}, V = ({ children: e, customScrollingElement: r, resizeThrottle: n = P.resizeThrottle }) => {
  const t = r;
  if (!t)
    throw new Error("No custom scrolling element found.");
  if (typeof window > "u")
    throw new Error("No window found.");
  let i = null;
  const [o, s] = m(E(t)), [u, c] = m(0), l = () => {
    i && window.cancelAnimationFrame(i), i = window.requestAnimationFrame(() => {
      const { scrollTop: f, scrollHeight: h } = t;
      c(f / (h - o));
    });
  }, d = () => {
    s(E(t));
  }, a = O.throttle(() => {
    d();
  }, n);
  return g(() => (window.addEventListener("resize", a), s(E(t)), d(), () => {
    window.removeEventListener("resize", a);
  }), []), g(() => (t.addEventListener("scroll", l, {
    passive: !0
  }), l(), () => {
    t.removeEventListener("scroll", l);
  }), [o]), S({
    scrollData: {
      scrollTop: t.scrollTop,
      scrollHeight: t.scrollHeight,
      containerHeight: o,
      percentProgress: u,
      element: t
    },
    children: e
  });
};
export {
  G as ScrollTracker,
  J as ScrollTrackerCustom,
  B as ScrollTrackerDocument
};
