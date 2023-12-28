(function(h,u){typeof exports=="object"&&typeof module<"u"?u(exports,require("react"),require("react/jsx-runtime")):typeof define=="function"&&define.amd?define(["exports","react","react/jsx-runtime"],u):(h=typeof globalThis<"u"?globalThis:h||self,u(h["react-scrollsy"]={},h.React,h.jsxRuntime))})(this,function(h,u,O){"use strict";var y=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function k(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function b(e){throw new Error('Could not dynamically require "'+e+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var P={exports:{}};(function(e,t){(function(i){e.exports=i()})(function(){return function(){function i(o,n,r){function s(a,p){if(!n[a]){if(!o[a]){var m=typeof b=="function"&&b;if(!p&&m)return m(a,!0);if(l)return l(a,!0);var f=new Error("Cannot find module '"+a+"'");throw f.code="MODULE_NOT_FOUND",f}var d=n[a]={exports:{}};o[a][0].call(d.exports,function(g){var w=o[a][1][g];return s(w||g)},d,d.exports,i,o,n,r)}return n[a].exports}for(var l=typeof b=="function"&&b,c=0;c<r.length;c++)s(r[c]);return s}return i}()({1:[function(i,o,n){o.exports=function(){if(typeof window>"u"||typeof navigator>"u")return function(){return 0};if(!navigator.userAgent.match(/iphone|ipod|ipad/i))return function(){return window.innerHeight};var r=Math.abs(window.orientation),s={w:0,h:0},l=function(){var c=document.createElement("div");c.style.position="fixed",c.style.height="100vh",c.style.width=0,c.style.top=0,document.documentElement.appendChild(c),s.w=r===90?c.offsetHeight:window.innerWidth,s.h=r===90?window.innerWidth:c.offsetHeight,document.documentElement.removeChild(c),c=null};return l(),function(){return Math.abs(window.orientation)!==90?s.h:s.w}}()},{}]},{},[1])(1)})})(P);var F=P.exports;const L=k(F);var j={},x={};Object.defineProperty(x,"__esModule",{value:!0});var H={};Object.defineProperty(H,"__esModule",{value:!0}),H.throttle=void 0;function A(e,t){var i,o;return function(){var n=arguments,r=this;return i||(i=!0,setTimeout(function(){return i=!1},t),o=e.apply(r,n)),o}}H.throttle=A,function(e){var t=y&&y.__createBinding||(Object.create?function(o,n,r,s){s===void 0&&(s=r),Object.defineProperty(o,s,{enumerable:!0,get:function(){return n[r]}})}:function(o,n,r,s){s===void 0&&(s=r),o[s]=n[r]}),i=y&&y.__exportStar||function(o,n){for(var r in o)r!=="default"&&!Object.prototype.hasOwnProperty.call(n,r)&&t(n,o,r)};Object.defineProperty(e,"__esModule",{value:!0}),i(x,e),i(H,e)}(j);const z=(e,t)=>{let i,o;return function(...n){const r=this;o?(i&&clearTimeout(i),i=setTimeout(()=>{Date.now()-o>=t&&(e.apply(r,n),o=Date.now())},t-(Date.now()-o))):(e.apply(r,n),o=Date.now())}},D=()=>window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,E=e=>e.clientHeight;function N(e){return new Promise(t=>{if(document.querySelector(e))return t(document.querySelector(e));const i=new MutationObserver(()=>{document.querySelector(e)&&(t(document.querySelector(e)),i.disconnect())});i.observe(document.body,{childList:!0,subtree:!0})})}const V=(e,t)=>{if(!e||!t)throw"element/container is not defined.";const i=e.getBoundingClientRect(),o=t.scrollTop-t.offsetTop;return i.top+o},U=()=>/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream,S=()=>U()?L():D(),_=({mode:e,scrollData:t,elementScrollHeight:i,offsetTop:o,offsetBottom:n})=>{switch(e){case"top":if(!o)return 0;if(o.unit==="px")return o.distance;if(o.unit==="%")switch(o.basedOn){case"doc":return t.scrollHeight*(o.distance/100);case"vp":return t.containerHeight*(o.distance/100);case"elem":return i*(o.distance/100)}break;case"bottom":if(!n)return 0;if(n.unit==="px")return n.distance;if(n.unit==="%")switch(n.basedOn){case"doc":return t.scrollHeight*(n.distance/100);case"vp":return t.containerHeight*(n.distance/100);case"elem":return i*(n.distance/100)}break;default:return 0}return 0},W=({heightDuration:e,duration:t})=>{if(t.unit==="px")return t.distance;if(t.unit==="%")switch(t.basedOn){case"doc":case"vp":case"elem":return e*(t.distance/100)}return 0},G=({duration:e,elementScrollHeight:t,elementOffsetTopRelativeToContainer:i,trigger:o,scrollData:n})=>{let r=0,s=0;switch(e.basedOn){case"doc":r=n.scrollHeight-n.containerHeight;break;case"vp":r=n.containerHeight,s=i,o==="onEnter"&&(s-=n.containerHeight);break;case"elem":s=i,o==="onEnter"?(r=t,s-=n.containerHeight):o==="onLeave"&&(r=t);break}return{heightDuration:r,elementOffset:s}},$=({elementOffset:e,offsetTopVal:t,durationInPx:i,offsetBottomVal:o,scrollData:n})=>{const r=e+t,s=e+i-o,l=(n.scrollTop-r)/(s-r);return{progress:Math.min(Math.max(l,0),1),start:r,end:s}},B=function({el:e,scrollData:t,trigger:i,offsetTop:o,offsetBottom:n,duration:r}){const s=V(e,t.element),{scrollHeight:l}=e,{heightDuration:c,elementOffset:a}=G({duration:r,elementScrollHeight:l,elementOffsetTopRelativeToContainer:s,trigger:i,scrollData:t}),p=_({mode:"top",scrollData:t,elementScrollHeight:l,offsetTop:o}),m=_({mode:"bottom",scrollData:t,elementScrollHeight:l,offsetBottom:n}),f=W({heightDuration:c,duration:r}),{progress:d,start:g,end:w}=$({elementOffset:a,offsetTopVal:p,durationInPx:f,offsetBottomVal:m,scrollData:t});return{progress:d,scrollData:t,start:g,end:w}},C={resizeThrottle:150,trigger:"onEnter"},M={progress:0,scrollData:{containerHeight:0,percentProgress:0,scrollHeight:0,scrollTop:0},start:0,end:0},R=({children:e,scrollObject:t=M})=>typeof e=="function"?e({scrollObject:t,children:e}):e,J=u.memo(({scrollData:e,children:t,elem:i,settings:o,onStart:n,onEnd:r})=>{const{trigger:s=C.trigger,offsetTop:l,offsetBottom:c,duration:a}=o,[p,m]=u.useState(!1),[f,d]=u.useState(!1),[g,w]=u.useState(!1);if(u.useEffect(()=>{p&&n&&n()},[p]),u.useEffect(()=>{f&&r&&r()},[f]),u.useEffect(()=>{i!=null&&i.current&&w(!0)},[i]),!g)return R({scrollObject:M,children:t});const I=B({el:i.current,scrollData:e,trigger:s,offsetTop:l,offsetBottom:c,duration:a}),{progress:v}=I;return v>0&&v<1&&p===!1&&typeof n=="function"&&m(!0),v<=0&&p===!0&&typeof n=="function"&&m(!1),v>=1&&f===!1&&typeof r=="function"&&d(!0),v<1&&f===!0&&typeof r=="function"&&d(!1),R({scrollObject:I,children:t})}),T=({scrollData:e,children:t})=>typeof t=="function"?t({scrollData:{scrollTop:e.scrollTop,scrollHeight:e.scrollHeight,containerHeight:e.containerHeight,percentProgress:e.percentProgress,element:e.element},children:t}):t,K=({timeout:e,setProgress:t,scrollElement:i,containerHeight:o})=>{e&&window.cancelAnimationFrame(e),e=window.requestAnimationFrame(()=>{if(!i)return;const{scrollTop:n,scrollHeight:r}=i;t(n/(r-o))})},q=({children:e,customScrollingElement:t,scrollThrottle:i,resizeThrottle:o=C.resizeThrottle})=>{const n=!!t,r=n?t:document==null?void 0:document.documentElement;if(!r)throw new Error("No scrolling element found.");if(typeof window>"u")throw new Error("No window found.");const s=null,[l,c]=u.useState(n?E(r):S()),[a,p]=u.useState(0),m=()=>{c(n?E(r):S())},f=j.throttle(()=>{m()},o),d=u.useCallback(()=>{K({timeout:s,setProgress:p,scrollElement:r,containerHeight:l})},[]),g=i?z(()=>{d()},i):()=>{d()};return u.useEffect(()=>(window.addEventListener("resize",f),c(n?E(r):S()),m(),()=>{window.removeEventListener("resize",f)}),[]),u.useEffect(()=>{const w=n?r:document;return w.addEventListener("scroll",g,{passive:!0}),g(),()=>{w.removeEventListener("scroll",g)}},[l]),T({scrollData:{scrollTop:r.scrollTop,scrollHeight:r.scrollHeight,containerHeight:l,percentProgress:a,element:r},children:e})},Q=({children:e,scrollThrottle:t,resizeThrottle:i})=>{const[o,n]=u.useState(!1);return u.useEffect(()=>{n(!0)},[]),o?O.jsx(q,{scrollThrottle:t,resizeThrottle:i,children:e}):T({scrollData:{scrollTop:0,scrollHeight:0,containerHeight:0,percentProgress:0},children:e})},X=({children:e,scrollThrottle:t,scrollingElement:i,resizeThrottle:o})=>{const[n,r]=u.useState(!1),[s,l]=u.useState(void 0),c=T({scrollData:{scrollTop:0,scrollHeight:0,containerHeight:0,percentProgress:0,element:s},children:e});return N(i).then(a=>{s||(l(a),r(!0))}),n?O.jsx(q,{scrollThrottle:t,resizeThrottle:o,customScrollingElement:s,children:e}):c};h.ScrollTracker=J,h.ScrollTrackerCustom=X,h.ScrollTrackerDocument=Q,Object.defineProperty(h,Symbol.toStringTag,{value:"Module"})});
