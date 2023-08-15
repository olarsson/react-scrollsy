import { memo as M, useState as g, useEffect as p } from "react";
import { jsx as q } from "react/jsx-runtime";
var w = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function z(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function v(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var _ = { exports: {} };
(function(e, n) {
  (function(r) {
    e.exports = r();
  })(function() {
    return function() {
      function r(t, i, o) {
        function c(l, d) {
          if (!i[l]) {
            if (!t[l]) {
              var a = typeof v == "function" && v;
              if (!d && a)
                return a(l, !0);
              if (u)
                return u(l, !0);
              var f = new Error("Cannot find module '" + l + "'");
              throw f.code = "MODULE_NOT_FOUND", f;
            }
            var m = i[l] = { exports: {} };
            t[l][0].call(m.exports, function(h) {
              var j = t[l][1][h];
              return c(j || h);
            }, m, m.exports, r, t, i, o);
          }
          return i[l].exports;
        }
        for (var u = typeof v == "function" && v, s = 0; s < o.length; s++)
          c(o[s]);
        return c;
      }
      return r;
    }()({ 1: [function(r, t, i) {
      t.exports = function() {
        if (typeof window > "u" || typeof navigator > "u")
          return function() {
            return 0;
          };
        if (!navigator.userAgent.match(/iphone|ipod|ipad/i))
          return function() {
            return window.innerHeight;
          };
        var o = Math.abs(window.orientation), c = { w: 0, h: 0 }, u = function() {
          var s = document.createElement("div");
          s.style.position = "fixed", s.style.height = "100vh", s.style.width = 0, s.style.top = 0, document.documentElement.appendChild(s), c.w = o === 90 ? s.offsetHeight : window.innerWidth, c.h = o === 90 ? window.innerWidth : s.offsetHeight, document.documentElement.removeChild(s), s = null;
        };
        return u(), function() {
          return Math.abs(window.orientation) !== 90 ? c.h : c.w;
        };
      }();
    }, {}] }, {}, [1])(1);
  });
})(_);
var k = _.exports;
const L = /* @__PURE__ */ z(k);
var E = {}, x = {};
Object.defineProperty(x, "__esModule", { value: !0 });
var H = {};
Object.defineProperty(H, "__esModule", { value: !0 });
H.throttle = void 0;
function R(e, n) {
  var r, t;
  return function() {
    var i = arguments, o = this;
    return r || (r = !0, setTimeout(function() {
      return r = !1;
    }, n), t = e.apply(o, i)), t;
  };
}
H.throttle = R;
(function(e) {
  var n = w && w.__createBinding || (Object.create ? function(t, i, o, c) {
    c === void 0 && (c = o), Object.defineProperty(t, c, { enumerable: !0, get: function() {
      return i[o];
    } });
  } : function(t, i, o, c) {
    c === void 0 && (c = o), t[c] = i[o];
  }), r = w && w.__exportStar || function(t, i) {
    for (var o in t)
      o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, t, o);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), r(x, e), r(H, e);
})(E);
const F = () => window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, b = (e) => e.clientHeight;
function A(e) {
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
const P = (e, n) => {
  if (!e || !n)
    throw "element/container is not defined.";
  const r = e.getBoundingClientRect(), t = n.scrollTop - n.offsetTop;
  return r.top + t;
}, I = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream, y = () => I() ? L() : F(), N = function(e, n, r, t, i) {
  let o = 0, c = 0, u = 0, s = 0, l = 0;
  switch (i.basedOn) {
    case "doc":
      o = n.scrollHeight - n.containerHeight;
      break;
    case "vp":
      o = n.containerHeight, c = P(e, n.element) - n.containerHeight;
      break;
    case "elem":
      o = e.getBoundingClientRect().bottom, c = P(e, n.element) - n.containerHeight;
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
  if (t) {
    if (t.unit === "px")
      s = t.distance;
    else if (t.unit === "%")
      switch (t.basedOn) {
        case "doc":
          s = n.scrollHeight * (t.distance / 100);
          break;
        case "vp":
          s = n.containerHeight * (t.distance / 100);
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
  const d = c + u, a = c + l - s, f = (n.scrollTop - d) / (a - d);
  return {
    progress: Math.min(Math.max(f, 0), 1),
    scrollData: n,
    start: d,
    end: a
  };
}, T = {
  resizeThrottle: 150
}, C = {
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
}, S = (e, n = C) => typeof e == "function" ? e({ scrollObject: n, children: e }) : e, $ = M(({ scrollData: e, children: n, elem: r, settings: t, onStart: i, onEnd: o }) => {
  const { offsetTop: c, offsetBottom: u, duration: s } = t, [l, d] = g(!1), [a, f] = g(!1);
  if (p(() => {
    l && typeof i == "function" && i();
  }, [l]), p(() => {
    a && typeof o == "function" && o();
  }, [a]), !(r != null && r.current))
    return S(n, C);
  const m = N(r.current, e, c, u, s), { progress: h } = m;
  return h > 0 && h < 1 && l === !1 && typeof i == "function" && d(!0), h <= 0 && l === !0 && typeof i == "function" && d(!1), h >= 1 && a === !1 && typeof o == "function" && f(!0), h < 1 && a === !0 && typeof o == "function" && f(!1), S(n, m);
}), O = ({ scrollData: e, children: n }) => typeof n == "function" ? n({
  scrollData: {
    scrollTop: e.scrollTop,
    scrollHeight: e.scrollHeight,
    containerHeight: e.containerHeight,
    percentProgress: e.percentProgress,
    element: e.element
  },
  children: n
}) : n, G = ({ children: e, resizeThrottle: n = T.resizeThrottle }) => {
  const r = document.documentElement;
  if (!r)
    throw new Error("No document.documentElement found.");
  let t = null;
  const [i, o] = g(y()), [c, u] = g(0), s = () => {
    t && window.cancelAnimationFrame(t), t = window.requestAnimationFrame(() => {
      const { scrollTop: a, scrollHeight: f } = r;
      u(a / (f - i));
    });
  }, l = () => {
    o(y());
  }, d = E.throttle(() => {
    l();
  }, n);
  return p(() => (window.addEventListener("resize", d), o(y()), l(), () => {
    window.removeEventListener("resize", d);
  }), []), p(() => (document.addEventListener("scroll", s, { passive: !0 }), s(), () => {
    document.removeEventListener("scroll", s);
  }), [i]), O({
    scrollData: {
      scrollTop: r.scrollTop,
      scrollHeight: r.scrollHeight,
      containerHeight: i,
      percentProgress: c,
      element: r
    },
    children: e
  });
}, B = ({ children: e, scrollingElement: n, resizeThrottle: r = T.resizeThrottle }) => {
  const [t, i] = g(!1), [o, c] = g(null), u = O({
    scrollData: {
      scrollTop: 0,
      scrollHeight: 0,
      containerHeight: 0,
      percentProgress: 0,
      element: document.documentElement
    },
    children: e
  });
  return A(n).then((s) => {
    o || (c(s), i(!0));
  }), t ? /* @__PURE__ */ q(U, { resizeThrottle: r, customScrollingElement: o, children: e }) : u;
}, U = ({ children: e, customScrollingElement: n, resizeThrottle: r = T.resizeThrottle }) => {
  const t = n;
  if (!t)
    throw new Error("No custom scrolling element found.");
  let i = null;
  const [o, c] = g(b(t)), [u, s] = g(0), l = () => {
    i && window.cancelAnimationFrame(i), i = window.requestAnimationFrame(() => {
      const { scrollTop: f, scrollHeight: m } = t;
      s(f / (m - o));
    });
  }, d = () => {
    c(b(t));
  }, a = E.throttle(() => {
    d();
  }, r);
  return p(() => (window.addEventListener("resize", a), c(b(t)), d(), () => {
    window.removeEventListener("resize", a);
  }), []), p(() => (t.addEventListener("scroll", l, {
    passive: !0
  }), l(), () => {
    t.removeEventListener("scroll", l);
  }), [o]), O({
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
  $ as ScrollTracker,
  B as ScrollTrackerCustom,
  G as ScrollTrackerDocument
};
