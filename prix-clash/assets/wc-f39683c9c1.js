var lg = Object.defineProperty;
var hg = (t, e, s) => e in t ? lg(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var G = (t, e, s) => hg(t, typeof e != "symbol" ? e + "" : e, s);
function su(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function ug(t) {
  if (t.__esModule) return t;
  var e = t.default;
  if (typeof e == "function") {
    var s = function r() {
      return this instanceof r ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    s.prototype = e.prototype;
  } else s = {};
  return Object.defineProperty(s, "__esModule", { value: !0 }), Object.keys(t).forEach(function(r) {
    var n = Object.getOwnPropertyDescriptor(t, r);
    Object.defineProperty(s, r, n.get ? n : {
      enumerable: !0,
      get: function() {
        return t[r];
      }
    });
  }), s;
}
var ya = { exports: {} }, or = typeof Reflect == "object" ? Reflect : null, Ec = or && typeof or.apply == "function" ? or.apply : function(e, s, r) {
  return Function.prototype.apply.call(e, s, r);
}, Rn;
or && typeof or.ownKeys == "function" ? Rn = or.ownKeys : Object.getOwnPropertySymbols ? Rn = function(e) {
  return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
} : Rn = function(e) {
  return Object.getOwnPropertyNames(e);
};
function fg(t) {
  console && console.warn && console.warn(t);
}
var ru = Number.isNaN || function(e) {
  return e !== e;
};
function re() {
  re.init.call(this);
}
ya.exports = re;
ya.exports.once = yg;
re.EventEmitter = re;
re.prototype._events = void 0;
re.prototype._eventsCount = 0;
re.prototype._maxListeners = void 0;
var xc = 10;
function pi(t) {
  if (typeof t != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t);
}
Object.defineProperty(re, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return xc;
  },
  set: function(t) {
    if (typeof t != "number" || t < 0 || ru(t))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + t + ".");
    xc = t;
  }
});
re.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
re.prototype.setMaxListeners = function(e) {
  if (typeof e != "number" || e < 0 || ru(e))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
  return this._maxListeners = e, this;
};
function nu(t) {
  return t._maxListeners === void 0 ? re.defaultMaxListeners : t._maxListeners;
}
re.prototype.getMaxListeners = function() {
  return nu(this);
};
re.prototype.emit = function(e) {
  for (var s = [], r = 1; r < arguments.length; r++) s.push(arguments[r]);
  var n = e === "error", i = this._events;
  if (i !== void 0)
    n = n && i.error === void 0;
  else if (!n)
    return !1;
  if (n) {
    var o;
    if (s.length > 0 && (o = s[0]), o instanceof Error)
      throw o;
    var a = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
    throw a.context = o, a;
  }
  var c = i[e];
  if (c === void 0)
    return !1;
  if (typeof c == "function")
    Ec(c, this, s);
  else
    for (var l = c.length, u = lu(c, l), r = 0; r < l; ++r)
      Ec(u[r], this, s);
  return !0;
};
function iu(t, e, s, r) {
  var n, i, o;
  if (pi(s), i = t._events, i === void 0 ? (i = t._events = /* @__PURE__ */ Object.create(null), t._eventsCount = 0) : (i.newListener !== void 0 && (t.emit(
    "newListener",
    e,
    s.listener ? s.listener : s
  ), i = t._events), o = i[e]), o === void 0)
    o = i[e] = s, ++t._eventsCount;
  else if (typeof o == "function" ? o = i[e] = r ? [s, o] : [o, s] : r ? o.unshift(s) : o.push(s), n = nu(t), n > 0 && o.length > n && !o.warned) {
    o.warned = !0;
    var a = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    a.name = "MaxListenersExceededWarning", a.emitter = t, a.type = e, a.count = o.length, fg(a);
  }
  return t;
}
re.prototype.addListener = function(e, s) {
  return iu(this, e, s, !1);
};
re.prototype.on = re.prototype.addListener;
re.prototype.prependListener = function(e, s) {
  return iu(this, e, s, !0);
};
function dg() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function ou(t, e, s) {
  var r = { fired: !1, wrapFn: void 0, target: t, type: e, listener: s }, n = dg.bind(r);
  return n.listener = s, r.wrapFn = n, n;
}
re.prototype.once = function(e, s) {
  return pi(s), this.on(e, ou(this, e, s)), this;
};
re.prototype.prependOnceListener = function(e, s) {
  return pi(s), this.prependListener(e, ou(this, e, s)), this;
};
re.prototype.removeListener = function(e, s) {
  var r, n, i, o, a;
  if (pi(s), n = this._events, n === void 0)
    return this;
  if (r = n[e], r === void 0)
    return this;
  if (r === s || r.listener === s)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete n[e], n.removeListener && this.emit("removeListener", e, r.listener || s));
  else if (typeof r != "function") {
    for (i = -1, o = r.length - 1; o >= 0; o--)
      if (r[o] === s || r[o].listener === s) {
        a = r[o].listener, i = o;
        break;
      }
    if (i < 0)
      return this;
    i === 0 ? r.shift() : pg(r, i), r.length === 1 && (n[e] = r[0]), n.removeListener !== void 0 && this.emit("removeListener", e, a || s);
  }
  return this;
};
re.prototype.off = re.prototype.removeListener;
re.prototype.removeAllListeners = function(e) {
  var s, r, n;
  if (r = this._events, r === void 0)
    return this;
  if (r.removeListener === void 0)
    return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : r[e] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete r[e]), this;
  if (arguments.length === 0) {
    var i = Object.keys(r), o;
    for (n = 0; n < i.length; ++n)
      o = i[n], o !== "removeListener" && this.removeAllListeners(o);
    return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
  }
  if (s = r[e], typeof s == "function")
    this.removeListener(e, s);
  else if (s !== void 0)
    for (n = s.length - 1; n >= 0; n--)
      this.removeListener(e, s[n]);
  return this;
};
function au(t, e, s) {
  var r = t._events;
  if (r === void 0)
    return [];
  var n = r[e];
  return n === void 0 ? [] : typeof n == "function" ? s ? [n.listener || n] : [n] : s ? gg(n) : lu(n, n.length);
}
re.prototype.listeners = function(e) {
  return au(this, e, !0);
};
re.prototype.rawListeners = function(e) {
  return au(this, e, !1);
};
re.listenerCount = function(t, e) {
  return typeof t.listenerCount == "function" ? t.listenerCount(e) : cu.call(t, e);
};
re.prototype.listenerCount = cu;
function cu(t) {
  var e = this._events;
  if (e !== void 0) {
    var s = e[t];
    if (typeof s == "function")
      return 1;
    if (s !== void 0)
      return s.length;
  }
  return 0;
}
re.prototype.eventNames = function() {
  return this._eventsCount > 0 ? Rn(this._events) : [];
};
function lu(t, e) {
  for (var s = new Array(e), r = 0; r < e; ++r)
    s[r] = t[r];
  return s;
}
function pg(t, e) {
  for (; e + 1 < t.length; e++)
    t[e] = t[e + 1];
  t.pop();
}
function gg(t) {
  for (var e = new Array(t.length), s = 0; s < e.length; ++s)
    e[s] = t[s].listener || t[s];
  return e;
}
function yg(t, e) {
  return new Promise(function(s, r) {
    function n(o) {
      t.removeListener(e, i), r(o);
    }
    function i() {
      typeof t.removeListener == "function" && t.removeListener("error", n), s([].slice.call(arguments));
    }
    hu(t, e, i, { once: !0 }), e !== "error" && wg(t, n, { once: !0 });
  });
}
function wg(t, e, s) {
  typeof t.on == "function" && hu(t, "error", e, s);
}
function hu(t, e, s, r) {
  if (typeof t.on == "function")
    r.once ? t.once(e, s) : t.on(e, s);
  else if (typeof t.addEventListener == "function")
    t.addEventListener(e, function n(i) {
      r.once && t.removeEventListener(e, n), s(i);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof t);
}
var Ge = ya.exports;
const wa = /* @__PURE__ */ su(Ge);
var _c = function(t, e, s) {
  if (s || arguments.length === 2) for (var r = 0, n = e.length, i; r < n; r++)
    (i || !(r in e)) && (i || (i = Array.prototype.slice.call(e, 0, r)), i[r] = e[r]);
  return t.concat(i || Array.prototype.slice.call(e));
}, mg = (
  /** @class */
  /* @__PURE__ */ function() {
    function t(e, s, r) {
      this.name = e, this.version = s, this.os = r, this.type = "browser";
    }
    return t;
  }()
), bg = (
  /** @class */
  /* @__PURE__ */ function() {
    function t(e) {
      this.version = e, this.type = "node", this.name = "node", this.os = process.platform;
    }
    return t;
  }()
), vg = (
  /** @class */
  /* @__PURE__ */ function() {
    function t(e, s, r, n) {
      this.name = e, this.version = s, this.os = r, this.bot = n, this.type = "bot-device";
    }
    return t;
  }()
), Eg = (
  /** @class */
  /* @__PURE__ */ function() {
    function t() {
      this.type = "bot", this.bot = !0, this.name = "bot", this.version = null, this.os = null;
    }
    return t;
  }()
), xg = (
  /** @class */
  /* @__PURE__ */ function() {
    function t() {
      this.type = "react-native", this.name = "react-native", this.version = null, this.os = null;
    }
    return t;
  }()
), _g = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/, Ig = /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/, Ic = 3, Sg = [
  ["aol", /AOLShield\/([0-9\._]+)/],
  ["edge", /Edge\/([0-9\._]+)/],
  ["edge-ios", /EdgiOS\/([0-9\._]+)/],
  ["yandexbrowser", /YaBrowser\/([0-9\._]+)/],
  ["kakaotalk", /KAKAOTALK\s([0-9\.]+)/],
  ["samsung", /SamsungBrowser\/([0-9\.]+)/],
  ["silk", /\bSilk\/([0-9._-]+)\b/],
  ["miui", /MiuiBrowser\/([0-9\.]+)$/],
  ["beaker", /BeakerBrowser\/([0-9\.]+)/],
  ["edge-chromium", /EdgA?\/([0-9\.]+)/],
  [
    "chromium-webview",
    /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/
  ],
  ["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
  ["phantomjs", /PhantomJS\/([0-9\.]+)(:?\s|$)/],
  ["crios", /CriOS\/([0-9\.]+)(:?\s|$)/],
  ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/],
  ["fxios", /FxiOS\/([0-9\.]+)/],
  ["opera-mini", /Opera Mini.*Version\/([0-9\.]+)/],
  ["opera", /Opera\/([0-9\.]+)(?:\s|$)/],
  ["opera", /OPR\/([0-9\.]+)(:?\s|$)/],
  ["pie", /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],
  ["pie", /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],
  ["netfront", /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],
  ["ie", /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
  ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
  ["ie", /MSIE\s(7\.0)/],
  ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/],
  ["android", /Android\s([0-9\.]+)/],
  ["ios", /Version\/([0-9\._]+).*Mobile.*Safari.*/],
  ["safari", /Version\/([0-9\._]+).*Safari/],
  ["facebook", /FB[AS]V\/([0-9\.]+)/],
  ["instagram", /Instagram\s([0-9\.]+)/],
  ["ios-webview", /AppleWebKit\/([0-9\.]+).*Mobile/],
  ["ios-webview", /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
  ["curl", /^curl\/([0-9\.]+)$/],
  ["searchbot", _g]
], Sc = [
  ["iOS", /iP(hone|od|ad)/],
  ["Android OS", /Android/],
  ["BlackBerry OS", /BlackBerry|BB10/],
  ["Windows Mobile", /IEMobile/],
  ["Amazon OS", /Kindle/],
  ["Windows 3.11", /Win16/],
  ["Windows 95", /(Windows 95)|(Win95)|(Windows_95)/],
  ["Windows 98", /(Windows 98)|(Win98)/],
  ["Windows 2000", /(Windows NT 5.0)|(Windows 2000)/],
  ["Windows XP", /(Windows NT 5.1)|(Windows XP)/],
  ["Windows Server 2003", /(Windows NT 5.2)/],
  ["Windows Vista", /(Windows NT 6.0)/],
  ["Windows 7", /(Windows NT 6.1)/],
  ["Windows 8", /(Windows NT 6.2)/],
  ["Windows 8.1", /(Windows NT 6.3)/],
  ["Windows 10", /(Windows NT 10.0)/],
  ["Windows ME", /Windows ME/],
  ["Windows CE", /Windows CE|WinCE|Microsoft Pocket Internet Explorer/],
  ["Open BSD", /OpenBSD/],
  ["Sun OS", /SunOS/],
  ["Chrome OS", /CrOS/],
  ["Linux", /(Linux)|(X11)/],
  ["Mac OS", /(Mac_PowerPC)|(Macintosh)/],
  ["QNX", /QNX/],
  ["BeOS", /BeOS/],
  ["OS/2", /OS\/2/]
];
function Dg(t) {
  return typeof document > "u" && typeof navigator < "u" && navigator.product === "ReactNative" ? new xg() : typeof navigator < "u" ? $g(navigator.userAgent) : Pg();
}
function Ag(t) {
  return t !== "" && Sg.reduce(function(e, s) {
    var r = s[0], n = s[1];
    if (e)
      return e;
    var i = n.exec(t);
    return !!i && [r, i];
  }, !1);
}
function $g(t) {
  var e = Ag(t);
  if (!e)
    return null;
  var s = e[0], r = e[1];
  if (s === "searchbot")
    return new Eg();
  var n = r[1] && r[1].split(".").join("_").split("_").slice(0, 3);
  n ? n.length < Ic && (n = _c(_c([], n, !0), Tg(Ic - n.length), !0)) : n = [];
  var i = n.join("."), o = Og(t), a = Ig.exec(t);
  return a && a[1] ? new vg(s, i, o, a[1]) : new mg(s, i, o);
}
function Og(t) {
  for (var e = 0, s = Sc.length; e < s; e++) {
    var r = Sc[e], n = r[0], i = r[1], o = i.exec(t);
    if (o)
      return n;
  }
  return null;
}
function Pg() {
  var t = typeof process < "u" && process.version;
  return t ? new bg(process.version.slice(1)) : null;
}
function Tg(t) {
  for (var e = [], s = 0; s < t; s++)
    e.push("0");
  return e;
}
var k = {};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var To = function(t, e) {
  return To = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(s, r) {
    s.__proto__ = r;
  } || function(s, r) {
    for (var n in r) r.hasOwnProperty(n) && (s[n] = r[n]);
  }, To(t, e);
};
function Bg(t, e) {
  To(t, e);
  function s() {
    this.constructor = t;
  }
  t.prototype = e === null ? Object.create(e) : (s.prototype = e.prototype, new s());
}
var Bo = function() {
  return Bo = Object.assign || function(e) {
    for (var s, r = 1, n = arguments.length; r < n; r++) {
      s = arguments[r];
      for (var i in s) Object.prototype.hasOwnProperty.call(s, i) && (e[i] = s[i]);
    }
    return e;
  }, Bo.apply(this, arguments);
};
function Rg(t, e) {
  var s = {};
  for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && e.indexOf(r) < 0 && (s[r] = t[r]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function")
    for (var n = 0, r = Object.getOwnPropertySymbols(t); n < r.length; n++)
      e.indexOf(r[n]) < 0 && Object.prototype.propertyIsEnumerable.call(t, r[n]) && (s[r[n]] = t[r[n]]);
  return s;
}
function Cg(t, e, s, r) {
  var n = arguments.length, i = n < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, s) : r, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(t, e, s, r);
  else for (var a = t.length - 1; a >= 0; a--) (o = t[a]) && (i = (n < 3 ? o(i) : n > 3 ? o(e, s, i) : o(e, s)) || i);
  return n > 3 && i && Object.defineProperty(e, s, i), i;
}
function Ng(t, e) {
  return function(s, r) {
    e(s, r, t);
  };
}
function Ug(t, e) {
  if (typeof Reflect == "object" && typeof Reflect.metadata == "function") return Reflect.metadata(t, e);
}
function Mg(t, e, s, r) {
  function n(i) {
    return i instanceof s ? i : new s(function(o) {
      o(i);
    });
  }
  return new (s || (s = Promise))(function(i, o) {
    function a(u) {
      try {
        l(r.next(u));
      } catch (h) {
        o(h);
      }
    }
    function c(u) {
      try {
        l(r.throw(u));
      } catch (h) {
        o(h);
      }
    }
    function l(u) {
      u.done ? i(u.value) : n(u.value).then(a, c);
    }
    l((r = r.apply(t, e || [])).next());
  });
}
function Lg(t, e) {
  var s = { label: 0, sent: function() {
    if (i[0] & 1) throw i[1];
    return i[1];
  }, trys: [], ops: [] }, r, n, i, o;
  return o = { next: a(0), throw: a(1), return: a(2) }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
    return this;
  }), o;
  function a(l) {
    return function(u) {
      return c([l, u]);
    };
  }
  function c(l) {
    if (r) throw new TypeError("Generator is already executing.");
    for (; s; ) try {
      if (r = 1, n && (i = l[0] & 2 ? n.return : l[0] ? n.throw || ((i = n.return) && i.call(n), 0) : n.next) && !(i = i.call(n, l[1])).done) return i;
      switch (n = 0, i && (l = [l[0] & 2, i.value]), l[0]) {
        case 0:
        case 1:
          i = l;
          break;
        case 4:
          return s.label++, { value: l[1], done: !1 };
        case 5:
          s.label++, n = l[1], l = [0];
          continue;
        case 7:
          l = s.ops.pop(), s.trys.pop();
          continue;
        default:
          if (i = s.trys, !(i = i.length > 0 && i[i.length - 1]) && (l[0] === 6 || l[0] === 2)) {
            s = 0;
            continue;
          }
          if (l[0] === 3 && (!i || l[1] > i[0] && l[1] < i[3])) {
            s.label = l[1];
            break;
          }
          if (l[0] === 6 && s.label < i[1]) {
            s.label = i[1], i = l;
            break;
          }
          if (i && s.label < i[2]) {
            s.label = i[2], s.ops.push(l);
            break;
          }
          i[2] && s.ops.pop(), s.trys.pop();
          continue;
      }
      l = e.call(t, s);
    } catch (u) {
      l = [6, u], n = 0;
    } finally {
      r = i = 0;
    }
    if (l[0] & 5) throw l[1];
    return { value: l[0] ? l[1] : void 0, done: !0 };
  }
}
function kg(t, e, s, r) {
  r === void 0 && (r = s), t[r] = e[s];
}
function qg(t, e) {
  for (var s in t) s !== "default" && !e.hasOwnProperty(s) && (e[s] = t[s]);
}
function Ro(t) {
  var e = typeof Symbol == "function" && Symbol.iterator, s = e && t[e], r = 0;
  if (s) return s.call(t);
  if (t && typeof t.length == "number") return {
    next: function() {
      return t && r >= t.length && (t = void 0), { value: t && t[r++], done: !t };
    }
  };
  throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function uu(t, e) {
  var s = typeof Symbol == "function" && t[Symbol.iterator];
  if (!s) return t;
  var r = s.call(t), n, i = [], o;
  try {
    for (; (e === void 0 || e-- > 0) && !(n = r.next()).done; ) i.push(n.value);
  } catch (a) {
    o = { error: a };
  } finally {
    try {
      n && !n.done && (s = r.return) && s.call(r);
    } finally {
      if (o) throw o.error;
    }
  }
  return i;
}
function zg() {
  for (var t = [], e = 0; e < arguments.length; e++)
    t = t.concat(uu(arguments[e]));
  return t;
}
function jg() {
  for (var t = 0, e = 0, s = arguments.length; e < s; e++) t += arguments[e].length;
  for (var r = Array(t), n = 0, e = 0; e < s; e++)
    for (var i = arguments[e], o = 0, a = i.length; o < a; o++, n++)
      r[n] = i[o];
  return r;
}
function zr(t) {
  return this instanceof zr ? (this.v = t, this) : new zr(t);
}
function Fg(t, e, s) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = s.apply(t, e || []), n, i = [];
  return n = {}, o("next"), o("throw"), o("return"), n[Symbol.asyncIterator] = function() {
    return this;
  }, n;
  function o(f) {
    r[f] && (n[f] = function(d) {
      return new Promise(function(g, w) {
        i.push([f, d, g, w]) > 1 || a(f, d);
      });
    });
  }
  function a(f, d) {
    try {
      c(r[f](d));
    } catch (g) {
      h(i[0][3], g);
    }
  }
  function c(f) {
    f.value instanceof zr ? Promise.resolve(f.value.v).then(l, u) : h(i[0][2], f);
  }
  function l(f) {
    a("next", f);
  }
  function u(f) {
    a("throw", f);
  }
  function h(f, d) {
    f(d), i.shift(), i.length && a(i[0][0], i[0][1]);
  }
}
function Hg(t) {
  var e, s;
  return e = {}, r("next"), r("throw", function(n) {
    throw n;
  }), r("return"), e[Symbol.iterator] = function() {
    return this;
  }, e;
  function r(n, i) {
    e[n] = t[n] ? function(o) {
      return (s = !s) ? { value: zr(t[n](o)), done: n === "return" } : i ? i(o) : o;
    } : i;
  }
}
function Kg(t) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var e = t[Symbol.asyncIterator], s;
  return e ? e.call(t) : (t = typeof Ro == "function" ? Ro(t) : t[Symbol.iterator](), s = {}, r("next"), r("throw"), r("return"), s[Symbol.asyncIterator] = function() {
    return this;
  }, s);
  function r(i) {
    s[i] = t[i] && function(o) {
      return new Promise(function(a, c) {
        o = t[i](o), n(a, c, o.done, o.value);
      });
    };
  }
  function n(i, o, a, c) {
    Promise.resolve(c).then(function(l) {
      i({ value: l, done: a });
    }, o);
  }
}
function Vg(t, e) {
  return Object.defineProperty ? Object.defineProperty(t, "raw", { value: e }) : t.raw = e, t;
}
function Wg(t) {
  if (t && t.__esModule) return t;
  var e = {};
  if (t != null)
    for (var s in t) Object.hasOwnProperty.call(t, s) && (e[s] = t[s]);
  return e.default = t, e;
}
function Gg(t) {
  return t && t.__esModule ? t : { default: t };
}
function Yg(t, e) {
  if (!e.has(t))
    throw new TypeError("attempted to get private field on non-instance");
  return e.get(t);
}
function Zg(t, e, s) {
  if (!e.has(t))
    throw new TypeError("attempted to set private field on non-instance");
  return e.set(t, s), s;
}
const Xg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get __assign() {
    return Bo;
  },
  __asyncDelegator: Hg,
  __asyncGenerator: Fg,
  __asyncValues: Kg,
  __await: zr,
  __awaiter: Mg,
  __classPrivateFieldGet: Yg,
  __classPrivateFieldSet: Zg,
  __createBinding: kg,
  __decorate: Cg,
  __exportStar: qg,
  __extends: Bg,
  __generator: Lg,
  __importDefault: Gg,
  __importStar: Wg,
  __makeTemplateObject: Vg,
  __metadata: Ug,
  __param: Ng,
  __read: uu,
  __rest: Rg,
  __spread: zg,
  __spreadArrays: jg,
  __values: Ro
}, Symbol.toStringTag, { value: "Module" })), Zr = /* @__PURE__ */ ug(Xg);
var Ci = {}, br = {}, Dc;
function Jg() {
  if (Dc) return br;
  Dc = 1, Object.defineProperty(br, "__esModule", { value: !0 }), br.delay = void 0;
  function t(e) {
    return new Promise((s) => {
      setTimeout(() => {
        s(!0);
      }, e);
    });
  }
  return br.delay = t, br;
}
var xs = {}, Ni = {}, _s = {}, Ac;
function Qg() {
  return Ac || (Ac = 1, Object.defineProperty(_s, "__esModule", { value: !0 }), _s.ONE_THOUSAND = _s.ONE_HUNDRED = void 0, _s.ONE_HUNDRED = 100, _s.ONE_THOUSAND = 1e3), _s;
}
var Ui = {}, $c;
function ey() {
  return $c || ($c = 1, function(t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.ONE_YEAR = t.FOUR_WEEKS = t.THREE_WEEKS = t.TWO_WEEKS = t.ONE_WEEK = t.THIRTY_DAYS = t.SEVEN_DAYS = t.FIVE_DAYS = t.THREE_DAYS = t.ONE_DAY = t.TWENTY_FOUR_HOURS = t.TWELVE_HOURS = t.SIX_HOURS = t.THREE_HOURS = t.ONE_HOUR = t.SIXTY_MINUTES = t.THIRTY_MINUTES = t.TEN_MINUTES = t.FIVE_MINUTES = t.ONE_MINUTE = t.SIXTY_SECONDS = t.THIRTY_SECONDS = t.TEN_SECONDS = t.FIVE_SECONDS = t.ONE_SECOND = void 0, t.ONE_SECOND = 1, t.FIVE_SECONDS = 5, t.TEN_SECONDS = 10, t.THIRTY_SECONDS = 30, t.SIXTY_SECONDS = 60, t.ONE_MINUTE = t.SIXTY_SECONDS, t.FIVE_MINUTES = t.ONE_MINUTE * 5, t.TEN_MINUTES = t.ONE_MINUTE * 10, t.THIRTY_MINUTES = t.ONE_MINUTE * 30, t.SIXTY_MINUTES = t.ONE_MINUTE * 60, t.ONE_HOUR = t.SIXTY_MINUTES, t.THREE_HOURS = t.ONE_HOUR * 3, t.SIX_HOURS = t.ONE_HOUR * 6, t.TWELVE_HOURS = t.ONE_HOUR * 12, t.TWENTY_FOUR_HOURS = t.ONE_HOUR * 24, t.ONE_DAY = t.TWENTY_FOUR_HOURS, t.THREE_DAYS = t.ONE_DAY * 3, t.FIVE_DAYS = t.ONE_DAY * 5, t.SEVEN_DAYS = t.ONE_DAY * 7, t.THIRTY_DAYS = t.ONE_DAY * 30, t.ONE_WEEK = t.SEVEN_DAYS, t.TWO_WEEKS = t.ONE_WEEK * 2, t.THREE_WEEKS = t.ONE_WEEK * 3, t.FOUR_WEEKS = t.ONE_WEEK * 4, t.ONE_YEAR = t.ONE_DAY * 365;
  }(Ui)), Ui;
}
var Oc;
function fu() {
  return Oc || (Oc = 1, function(t) {
    Object.defineProperty(t, "__esModule", { value: !0 });
    const e = Zr;
    e.__exportStar(Qg(), t), e.__exportStar(ey(), t);
  }(Ni)), Ni;
}
var Pc;
function ty() {
  if (Pc) return xs;
  Pc = 1, Object.defineProperty(xs, "__esModule", { value: !0 }), xs.fromMiliseconds = xs.toMiliseconds = void 0;
  const t = fu();
  function e(r) {
    return r * t.ONE_THOUSAND;
  }
  xs.toMiliseconds = e;
  function s(r) {
    return Math.floor(r / t.ONE_THOUSAND);
  }
  return xs.fromMiliseconds = s, xs;
}
var Tc;
function sy() {
  return Tc || (Tc = 1, function(t) {
    Object.defineProperty(t, "__esModule", { value: !0 });
    const e = Zr;
    e.__exportStar(Jg(), t), e.__exportStar(ty(), t);
  }(Ci)), Ci;
}
var Xs = {}, Bc;
function ry() {
  if (Bc) return Xs;
  Bc = 1, Object.defineProperty(Xs, "__esModule", { value: !0 }), Xs.Watch = void 0;
  class t {
    constructor() {
      this.timestamps = /* @__PURE__ */ new Map();
    }
    start(s) {
      if (this.timestamps.has(s))
        throw new Error(`Watch already started for label: ${s}`);
      this.timestamps.set(s, { started: Date.now() });
    }
    stop(s) {
      const r = this.get(s);
      if (typeof r.elapsed < "u")
        throw new Error(`Watch already stopped for label: ${s}`);
      const n = Date.now() - r.started;
      this.timestamps.set(s, { started: r.started, elapsed: n });
    }
    get(s) {
      const r = this.timestamps.get(s);
      if (typeof r > "u")
        throw new Error(`No timestamp found for label: ${s}`);
      return r;
    }
    elapsed(s) {
      const r = this.get(s);
      return r.elapsed || Date.now() - r.started;
    }
  }
  return Xs.Watch = t, Xs.default = t, Xs;
}
var Mi = {}, vr = {}, Rc;
function ny() {
  if (Rc) return vr;
  Rc = 1, Object.defineProperty(vr, "__esModule", { value: !0 }), vr.IWatch = void 0;
  class t {
  }
  return vr.IWatch = t, vr;
}
var Cc;
function iy() {
  return Cc || (Cc = 1, function(t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), Zr.__exportStar(ny(), t);
  }(Mi)), Mi;
}
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const e = Zr;
  e.__exportStar(sy(), t), e.__exportStar(ry(), t), e.__exportStar(iy(), t), e.__exportStar(fu(), t);
})(k);
var ie = {};
Object.defineProperty(ie, "__esModule", { value: !0 });
ie.getLocalStorage = ie.getLocalStorageOrThrow = ie.getCrypto = ie.getCryptoOrThrow = du = ie.getLocation = ie.getLocationOrThrow = ma = ie.getNavigator = ie.getNavigatorOrThrow = ks = ie.getDocument = ie.getDocumentOrThrow = ie.getFromWindowOrThrow = ie.getFromWindow = void 0;
function Vs(t) {
  let e;
  return typeof window < "u" && typeof window[t] < "u" && (e = window[t]), e;
}
ie.getFromWindow = Vs;
function gr(t) {
  const e = Vs(t);
  if (!e)
    throw new Error(`${t} is not defined in Window`);
  return e;
}
ie.getFromWindowOrThrow = gr;
function oy() {
  return gr("document");
}
ie.getDocumentOrThrow = oy;
function ay() {
  return Vs("document");
}
var ks = ie.getDocument = ay;
function cy() {
  return gr("navigator");
}
ie.getNavigatorOrThrow = cy;
function ly() {
  return Vs("navigator");
}
var ma = ie.getNavigator = ly;
function hy() {
  return gr("location");
}
ie.getLocationOrThrow = hy;
function uy() {
  return Vs("location");
}
var du = ie.getLocation = uy;
function fy() {
  return gr("crypto");
}
ie.getCryptoOrThrow = fy;
function dy() {
  return Vs("crypto");
}
ie.getCrypto = dy;
function py() {
  return gr("localStorage");
}
ie.getLocalStorageOrThrow = py;
function gy() {
  return Vs("localStorage");
}
ie.getLocalStorage = gy;
var ba = {};
Object.defineProperty(ba, "__esModule", { value: !0 });
var pu = ba.getWindowMetadata = void 0;
const Nc = ie;
function yy() {
  let t, e;
  try {
    t = Nc.getDocumentOrThrow(), e = Nc.getLocationOrThrow();
  } catch {
    return null;
  }
  function s() {
    const h = t.getElementsByTagName("link"), f = [];
    for (let d = 0; d < h.length; d++) {
      const g = h[d], w = g.getAttribute("rel");
      if (w && w.toLowerCase().indexOf("icon") > -1) {
        const m = g.getAttribute("href");
        if (m)
          if (m.toLowerCase().indexOf("https:") === -1 && m.toLowerCase().indexOf("http:") === -1 && m.indexOf("//") !== 0) {
            let S = e.protocol + "//" + e.host;
            if (m.indexOf("/") === 0)
              S += m;
            else {
              const T = e.pathname.split("/");
              T.pop();
              const E = T.join("/");
              S += E + "/" + m;
            }
            f.push(S);
          } else if (m.indexOf("//") === 0) {
            const S = e.protocol + m;
            f.push(S);
          } else
            f.push(m);
      }
    }
    return f;
  }
  function r(...h) {
    const f = t.getElementsByTagName("meta");
    for (let d = 0; d < f.length; d++) {
      const g = f[d], w = ["itemprop", "property", "name"].map((m) => g.getAttribute(m)).filter((m) => m ? h.includes(m) : !1);
      if (w.length && w) {
        const m = g.getAttribute("content");
        if (m)
          return m;
      }
    }
    return "";
  }
  function n() {
    let h = r("name", "og:site_name", "og:title", "twitter:title");
    return h || (h = t.title), h;
  }
  function i() {
    return r("description", "og:description", "twitter:description", "keywords");
  }
  const o = n(), a = i(), c = e.origin, l = s();
  return {
    description: a,
    url: c,
    icons: l,
    name: o
  };
}
pu = ba.getWindowMetadata = yy;
const un = /* @__PURE__ */ BigInt(2 ** 32 - 1), Uc = /* @__PURE__ */ BigInt(32);
function gu(t, e = !1) {
  return e ? { h: Number(t & un), l: Number(t >> Uc & un) } : { h: Number(t >> Uc & un) | 0, l: Number(t & un) | 0 };
}
function yu(t, e = !1) {
  const s = t.length;
  let r = new Uint32Array(s), n = new Uint32Array(s);
  for (let i = 0; i < s; i++) {
    const { h: o, l: a } = gu(t[i], e);
    [r[i], n[i]] = [o, a];
  }
  return [r, n];
}
const Mc = (t, e, s) => t >>> s, Lc = (t, e, s) => t << 32 - s | e >>> s, cs = (t, e, s) => t >>> s | e << 32 - s, ls = (t, e, s) => t << 32 - s | e >>> s, Tr = (t, e, s) => t << 64 - s | e >>> s - 32, Br = (t, e, s) => t >>> s - 32 | e << 64 - s, wy = (t, e) => e, my = (t, e) => t, by = (t, e, s) => t << s | e >>> 32 - s, vy = (t, e, s) => e << s | t >>> 32 - s, Ey = (t, e, s) => e << s - 32 | t >>> 64 - s, xy = (t, e, s) => t << s - 32 | e >>> 64 - s;
function ht(t, e, s, r) {
  const n = (e >>> 0) + (r >>> 0);
  return { h: t + s + (n / 2 ** 32 | 0) | 0, l: n | 0 };
}
const va = (t, e, s) => (t >>> 0) + (e >>> 0) + (s >>> 0), Ea = (t, e, s, r) => e + s + r + (t / 2 ** 32 | 0) | 0, _y = (t, e, s, r) => (t >>> 0) + (e >>> 0) + (s >>> 0) + (r >>> 0), Iy = (t, e, s, r, n) => e + s + r + n + (t / 2 ** 32 | 0) | 0, Sy = (t, e, s, r, n) => (t >>> 0) + (e >>> 0) + (s >>> 0) + (r >>> 0) + (n >>> 0), Dy = (t, e, s, r, n, i) => e + s + r + n + i + (t / 2 ** 32 | 0) | 0, Js = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function gi(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function At(t) {
  if (!Number.isSafeInteger(t) || t < 0)
    throw new Error("positive integer expected, got " + t);
}
function gt(t, ...e) {
  if (!gi(t))
    throw new Error("Uint8Array expected");
  if (e.length > 0 && !e.includes(t.length))
    throw new Error("Uint8Array expected of length " + e + ", got length=" + t.length);
}
function yi(t) {
  if (typeof t != "function" || typeof t.create != "function")
    throw new Error("Hash should be wrapped by utils.createHasher");
  At(t.outputLen), At(t.blockLen);
}
function ws(t, e = !0) {
  if (t.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (e && t.finished)
    throw new Error("Hash#digest() has already been called");
}
function xa(t, e) {
  gt(t);
  const s = e.outputLen;
  if (t.length < s)
    throw new Error("digestInto() expects output buffer of length at least " + s);
}
function jr(t) {
  return new Uint32Array(t.buffer, t.byteOffset, Math.floor(t.byteLength / 4));
}
function rt(...t) {
  for (let e = 0; e < t.length; e++)
    t[e].fill(0);
}
function Li(t) {
  return new DataView(t.buffer, t.byteOffset, t.byteLength);
}
function yt(t, e) {
  return t << 32 - e | t >>> e;
}
const wu = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function mu(t) {
  return t << 24 & 4278190080 | t << 8 & 16711680 | t >>> 8 & 65280 | t >>> 24 & 255;
}
const Mt = wu ? (t) => t : (t) => mu(t);
function Ay(t) {
  for (let e = 0; e < t.length; e++)
    t[e] = mu(t[e]);
  return t;
}
const hs = wu ? (t) => t : Ay, bu = /* @ts-ignore */ typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function", $y = /* @__PURE__ */ Array.from({ length: 256 }, (t, e) => e.toString(16).padStart(2, "0"));
function ar(t) {
  if (gt(t), bu)
    return t.toHex();
  let e = "";
  for (let s = 0; s < t.length; s++)
    e += $y[t[s]];
  return e;
}
const Ot = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function kc(t) {
  if (t >= Ot._0 && t <= Ot._9)
    return t - Ot._0;
  if (t >= Ot.A && t <= Ot.F)
    return t - (Ot.A - 10);
  if (t >= Ot.a && t <= Ot.f)
    return t - (Ot.a - 10);
}
function Fn(t) {
  if (typeof t != "string")
    throw new Error("hex string expected, got " + typeof t);
  if (bu)
    return Uint8Array.fromHex(t);
  const e = t.length, s = e / 2;
  if (e % 2)
    throw new Error("hex string expected, got unpadded hex of length " + e);
  const r = new Uint8Array(s);
  for (let n = 0, i = 0; n < s; n++, i += 2) {
    const o = kc(t.charCodeAt(i)), a = kc(t.charCodeAt(i + 1));
    if (o === void 0 || a === void 0) {
      const c = t[i] + t[i + 1];
      throw new Error('hex string expected, got non-hex character "' + c + '" at index ' + i);
    }
    r[n] = o * 16 + a;
  }
  return r;
}
function Oy(t) {
  if (typeof t != "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(t));
}
function pt(t) {
  return typeof t == "string" && (t = Oy(t)), gt(t), t;
}
function jt(...t) {
  let e = 0;
  for (let r = 0; r < t.length; r++) {
    const n = t[r];
    gt(n), e += n.length;
  }
  const s = new Uint8Array(e);
  for (let r = 0, n = 0; r < t.length; r++) {
    const i = t[r];
    s.set(i, n), n += i.length;
  }
  return s;
}
class wi {
}
function Xr(t) {
  const e = (r) => t().update(pt(r)).digest(), s = t();
  return e.outputLen = s.outputLen, e.blockLen = s.blockLen, e.create = () => t(), e;
}
function Py(t) {
  const e = (r, n) => t(n).update(pt(r)).digest(), s = t({});
  return e.outputLen = s.outputLen, e.blockLen = s.blockLen, e.create = (r) => t(r), e;
}
function bs(t = 32) {
  if (Js && typeof Js.getRandomValues == "function")
    return Js.getRandomValues(new Uint8Array(t));
  if (Js && typeof Js.randomBytes == "function")
    return Uint8Array.from(Js.randomBytes(t));
  throw new Error("crypto.getRandomValues must be defined");
}
const Ty = BigInt(0), Er = BigInt(1), By = BigInt(2), Ry = BigInt(7), Cy = BigInt(256), Ny = BigInt(113), vu = [], Eu = [], xu = [];
for (let t = 0, e = Er, s = 1, r = 0; t < 24; t++) {
  [s, r] = [r, (2 * s + 3 * r) % 5], vu.push(2 * (5 * r + s)), Eu.push((t + 1) * (t + 2) / 2 % 64);
  let n = Ty;
  for (let i = 0; i < 7; i++)
    e = (e << Er ^ (e >> Ry) * Ny) % Cy, e & By && (n ^= Er << (Er << /* @__PURE__ */ BigInt(i)) - Er);
  xu.push(n);
}
const _u = yu(xu, !0), Uy = _u[0], My = _u[1], qc = (t, e, s) => s > 32 ? Ey(t, e, s) : by(t, e, s), zc = (t, e, s) => s > 32 ? xy(t, e, s) : vy(t, e, s);
function Ly(t, e = 24) {
  const s = new Uint32Array(10);
  for (let r = 24 - e; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      s[o] = t[o] ^ t[o + 10] ^ t[o + 20] ^ t[o + 30] ^ t[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const a = (o + 8) % 10, c = (o + 2) % 10, l = s[c], u = s[c + 1], h = qc(l, u, 1) ^ s[a], f = zc(l, u, 1) ^ s[a + 1];
      for (let d = 0; d < 50; d += 10)
        t[o + d] ^= h, t[o + d + 1] ^= f;
    }
    let n = t[2], i = t[3];
    for (let o = 0; o < 24; o++) {
      const a = Eu[o], c = qc(n, i, a), l = zc(n, i, a), u = vu[o];
      n = t[u], i = t[u + 1], t[u] = c, t[u + 1] = l;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let a = 0; a < 10; a++)
        s[a] = t[o + a];
      for (let a = 0; a < 10; a++)
        t[o + a] ^= ~s[(a + 2) % 10] & s[(a + 4) % 10];
    }
    t[0] ^= Uy[r], t[1] ^= My[r];
  }
  rt(s);
}
class _a extends wi {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(e, s, r, n = !1, i = 24) {
    if (super(), this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, this.enableXOF = !1, this.blockLen = e, this.suffix = s, this.outputLen = r, this.enableXOF = n, this.rounds = i, At(r), !(0 < e && e < 200))
      throw new Error("only keccak-f1600 function is supported");
    this.state = new Uint8Array(200), this.state32 = jr(this.state);
  }
  clone() {
    return this._cloneInto();
  }
  keccak() {
    hs(this.state32), Ly(this.state32, this.rounds), hs(this.state32), this.posOut = 0, this.pos = 0;
  }
  update(e) {
    ws(this), e = pt(e), gt(e);
    const { blockLen: s, state: r } = this, n = e.length;
    for (let i = 0; i < n; ) {
      const o = Math.min(s - this.pos, n - i);
      for (let a = 0; a < o; a++)
        r[this.pos++] ^= e[i++];
      this.pos === s && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = !0;
    const { state: e, suffix: s, pos: r, blockLen: n } = this;
    e[r] ^= s, s & 128 && r === n - 1 && this.keccak(), e[n - 1] ^= 128, this.keccak();
  }
  writeInto(e) {
    ws(this, !1), gt(e), this.finish();
    const s = this.state, { blockLen: r } = this;
    for (let n = 0, i = e.length; n < i; ) {
      this.posOut >= r && this.keccak();
      const o = Math.min(r - this.posOut, i - n);
      e.set(s.subarray(this.posOut, this.posOut + o), n), this.posOut += o, n += o;
    }
    return e;
  }
  xofInto(e) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(e);
  }
  xof(e) {
    return At(e), this.xofInto(new Uint8Array(e));
  }
  digestInto(e) {
    if (xa(e, this), this.finished)
      throw new Error("digest() was already called");
    return this.writeInto(e), this.destroy(), e;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = !0, rt(this.state);
  }
  _cloneInto(e) {
    const { blockLen: s, suffix: r, outputLen: n, rounds: i, enableXOF: o } = this;
    return e || (e = new _a(s, r, n, o, i)), e.state32.set(this.state32), e.pos = this.pos, e.posOut = this.posOut, e.finished = this.finished, e.rounds = i, e.suffix = r, e.outputLen = n, e.enableXOF = o, e.destroyed = this.destroyed, e;
  }
}
const ky = (t, e, s) => Xr(() => new _a(e, t, s)), Iu = ky(1, 136, 256 / 8), qy = "0.1.1";
function zy() {
  return qy;
}
class oe extends Error {
  constructor(e, s = {}) {
    const r = (() => {
      if (s.cause instanceof oe) {
        if (s.cause.details)
          return s.cause.details;
        if (s.cause.shortMessage)
          return s.cause.shortMessage;
      }
      return s.cause && "details" in s.cause && typeof s.cause.details == "string" ? s.cause.details : s.cause?.message ? s.cause.message : s.details;
    })(), n = s.cause instanceof oe && s.cause.docsPath || s.docsPath, o = `https://oxlib.sh${n ?? ""}`, a = [
      e || "An error occurred.",
      ...s.metaMessages ? ["", ...s.metaMessages] : [],
      ...r || n ? [
        "",
        r ? `Details: ${r}` : void 0,
        n ? `See: ${o}` : void 0
      ] : []
    ].filter((c) => typeof c == "string").join(`
`);
    super(a, s.cause ? { cause: s.cause } : void 0), Object.defineProperty(this, "details", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "docs", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "docsPath", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "shortMessage", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "cause", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "BaseError"
    }), Object.defineProperty(this, "version", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: `ox@${zy()}`
    }), this.cause = s.cause, this.details = r, this.docs = o, this.docsPath = n, this.shortMessage = e;
  }
  walk(e) {
    return Su(this, e);
  }
}
function Su(t, e) {
  return e?.(t) ? t : t && typeof t == "object" && "cause" in t && t.cause ? Su(t.cause, e) : e ? null : t;
}
function jy(t, e, s, r) {
  if (typeof t.setBigUint64 == "function")
    return t.setBigUint64(e, s, r);
  const n = BigInt(32), i = BigInt(4294967295), o = Number(s >> n & i), a = Number(s & i), c = r ? 4 : 0, l = r ? 0 : 4;
  t.setUint32(e + c, o, r), t.setUint32(e + l, a, r);
}
function Fy(t, e, s) {
  return t & e ^ ~t & s;
}
function Hy(t, e, s) {
  return t & e ^ t & s ^ e & s;
}
class Du extends wi {
  constructor(e, s, r, n) {
    super(), this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.blockLen = e, this.outputLen = s, this.padOffset = r, this.isLE = n, this.buffer = new Uint8Array(e), this.view = Li(this.buffer);
  }
  update(e) {
    ws(this), e = pt(e), gt(e);
    const { view: s, buffer: r, blockLen: n } = this, i = e.length;
    for (let o = 0; o < i; ) {
      const a = Math.min(n - this.pos, i - o);
      if (a === n) {
        const c = Li(e);
        for (; n <= i - o; o += n)
          this.process(c, o);
        continue;
      }
      r.set(e.subarray(o, o + a), this.pos), this.pos += a, o += a, this.pos === n && (this.process(s, 0), this.pos = 0);
    }
    return this.length += e.length, this.roundClean(), this;
  }
  digestInto(e) {
    ws(this), xa(e, this), this.finished = !0;
    const { buffer: s, view: r, blockLen: n, isLE: i } = this;
    let { pos: o } = this;
    s[o++] = 128, rt(this.buffer.subarray(o)), this.padOffset > n - o && (this.process(r, 0), o = 0);
    for (let h = o; h < n; h++)
      s[h] = 0;
    jy(r, n - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const a = Li(e), c = this.outputLen;
    if (c % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const l = c / 4, u = this.get();
    if (l > u.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let h = 0; h < l; h++)
      a.setUint32(4 * h, u[h], i);
  }
  digest() {
    const { buffer: e, outputLen: s } = this;
    this.digestInto(e);
    const r = e.slice(0, s);
    return this.destroy(), r;
  }
  _cloneInto(e) {
    e || (e = new this.constructor()), e.set(...this.get());
    const { blockLen: s, buffer: r, length: n, finished: i, destroyed: o, pos: a } = this;
    return e.destroyed = o, e.finished = i, e.length = n, e.pos = a, n % s && e.buffer.set(r), e;
  }
  clone() {
    return this._cloneInto();
  }
}
const Zt = /* @__PURE__ */ Uint32Array.from([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), Ae = /* @__PURE__ */ Uint32Array.from([
  3418070365,
  3238371032,
  1654270250,
  914150663,
  2438529370,
  812702999,
  355462360,
  4144912697,
  1731405415,
  4290775857,
  2394180231,
  1750603025,
  3675008525,
  1694076839,
  1203062813,
  3204075428
]), $e = /* @__PURE__ */ Uint32Array.from([
  1779033703,
  4089235720,
  3144134277,
  2227873595,
  1013904242,
  4271175723,
  2773480762,
  1595750129,
  1359893119,
  2917565137,
  2600822924,
  725511199,
  528734635,
  4215389547,
  1541459225,
  327033209
]), Ky = /* @__PURE__ */ Uint32Array.from([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]), Xt = /* @__PURE__ */ new Uint32Array(64);
class Vy extends Du {
  constructor(e = 32) {
    super(64, e, 8, !1), this.A = Zt[0] | 0, this.B = Zt[1] | 0, this.C = Zt[2] | 0, this.D = Zt[3] | 0, this.E = Zt[4] | 0, this.F = Zt[5] | 0, this.G = Zt[6] | 0, this.H = Zt[7] | 0;
  }
  get() {
    const { A: e, B: s, C: r, D: n, E: i, F: o, G: a, H: c } = this;
    return [e, s, r, n, i, o, a, c];
  }
  // prettier-ignore
  set(e, s, r, n, i, o, a, c) {
    this.A = e | 0, this.B = s | 0, this.C = r | 0, this.D = n | 0, this.E = i | 0, this.F = o | 0, this.G = a | 0, this.H = c | 0;
  }
  process(e, s) {
    for (let h = 0; h < 16; h++, s += 4)
      Xt[h] = e.getUint32(s, !1);
    for (let h = 16; h < 64; h++) {
      const f = Xt[h - 15], d = Xt[h - 2], g = yt(f, 7) ^ yt(f, 18) ^ f >>> 3, w = yt(d, 17) ^ yt(d, 19) ^ d >>> 10;
      Xt[h] = w + Xt[h - 7] + g + Xt[h - 16] | 0;
    }
    let { A: r, B: n, C: i, D: o, E: a, F: c, G: l, H: u } = this;
    for (let h = 0; h < 64; h++) {
      const f = yt(a, 6) ^ yt(a, 11) ^ yt(a, 25), d = u + f + Fy(a, c, l) + Ky[h] + Xt[h] | 0, w = (yt(r, 2) ^ yt(r, 13) ^ yt(r, 22)) + Hy(r, n, i) | 0;
      u = l, l = c, c = a, a = o + d | 0, o = i, i = n, n = r, r = d + w | 0;
    }
    r = r + this.A | 0, n = n + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, a = a + this.E | 0, c = c + this.F | 0, l = l + this.G | 0, u = u + this.H | 0, this.set(r, n, i, o, a, c, l, u);
  }
  roundClean() {
    rt(Xt);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), rt(this.buffer);
  }
}
const Au = yu([
  "0x428a2f98d728ae22",
  "0x7137449123ef65cd",
  "0xb5c0fbcfec4d3b2f",
  "0xe9b5dba58189dbbc",
  "0x3956c25bf348b538",
  "0x59f111f1b605d019",
  "0x923f82a4af194f9b",
  "0xab1c5ed5da6d8118",
  "0xd807aa98a3030242",
  "0x12835b0145706fbe",
  "0x243185be4ee4b28c",
  "0x550c7dc3d5ffb4e2",
  "0x72be5d74f27b896f",
  "0x80deb1fe3b1696b1",
  "0x9bdc06a725c71235",
  "0xc19bf174cf692694",
  "0xe49b69c19ef14ad2",
  "0xefbe4786384f25e3",
  "0x0fc19dc68b8cd5b5",
  "0x240ca1cc77ac9c65",
  "0x2de92c6f592b0275",
  "0x4a7484aa6ea6e483",
  "0x5cb0a9dcbd41fbd4",
  "0x76f988da831153b5",
  "0x983e5152ee66dfab",
  "0xa831c66d2db43210",
  "0xb00327c898fb213f",
  "0xbf597fc7beef0ee4",
  "0xc6e00bf33da88fc2",
  "0xd5a79147930aa725",
  "0x06ca6351e003826f",
  "0x142929670a0e6e70",
  "0x27b70a8546d22ffc",
  "0x2e1b21385c26c926",
  "0x4d2c6dfc5ac42aed",
  "0x53380d139d95b3df",
  "0x650a73548baf63de",
  "0x766a0abb3c77b2a8",
  "0x81c2c92e47edaee6",
  "0x92722c851482353b",
  "0xa2bfe8a14cf10364",
  "0xa81a664bbc423001",
  "0xc24b8b70d0f89791",
  "0xc76c51a30654be30",
  "0xd192e819d6ef5218",
  "0xd69906245565a910",
  "0xf40e35855771202a",
  "0x106aa07032bbd1b8",
  "0x19a4c116b8d2d0c8",
  "0x1e376c085141ab53",
  "0x2748774cdf8eeb99",
  "0x34b0bcb5e19b48a8",
  "0x391c0cb3c5c95a63",
  "0x4ed8aa4ae3418acb",
  "0x5b9cca4f7763e373",
  "0x682e6ff3d6b2b8a3",
  "0x748f82ee5defb2fc",
  "0x78a5636f43172f60",
  "0x84c87814a1f0ab72",
  "0x8cc702081a6439ec",
  "0x90befffa23631e28",
  "0xa4506cebde82bde9",
  "0xbef9a3f7b2c67915",
  "0xc67178f2e372532b",
  "0xca273eceea26619c",
  "0xd186b8c721c0c207",
  "0xeada7dd6cde0eb1e",
  "0xf57d4f7fee6ed178",
  "0x06f067aa72176fba",
  "0x0a637dc5a2c898a6",
  "0x113f9804bef90dae",
  "0x1b710b35131c471b",
  "0x28db77f523047d84",
  "0x32caab7b40c72493",
  "0x3c9ebe0a15c9bebc",
  "0x431d67c49c100d4c",
  "0x4cc5d4becb3e42b6",
  "0x597f299cfc657e2a",
  "0x5fcb6fab3ad6faec",
  "0x6c44198c4a475817"
].map((t) => BigInt(t))), Wy = Au[0], Gy = Au[1], Jt = /* @__PURE__ */ new Uint32Array(80), Qt = /* @__PURE__ */ new Uint32Array(80);
class Ia extends Du {
  constructor(e = 64) {
    super(128, e, 16, !1), this.Ah = $e[0] | 0, this.Al = $e[1] | 0, this.Bh = $e[2] | 0, this.Bl = $e[3] | 0, this.Ch = $e[4] | 0, this.Cl = $e[5] | 0, this.Dh = $e[6] | 0, this.Dl = $e[7] | 0, this.Eh = $e[8] | 0, this.El = $e[9] | 0, this.Fh = $e[10] | 0, this.Fl = $e[11] | 0, this.Gh = $e[12] | 0, this.Gl = $e[13] | 0, this.Hh = $e[14] | 0, this.Hl = $e[15] | 0;
  }
  // prettier-ignore
  get() {
    const { Ah: e, Al: s, Bh: r, Bl: n, Ch: i, Cl: o, Dh: a, Dl: c, Eh: l, El: u, Fh: h, Fl: f, Gh: d, Gl: g, Hh: w, Hl: m } = this;
    return [e, s, r, n, i, o, a, c, l, u, h, f, d, g, w, m];
  }
  // prettier-ignore
  set(e, s, r, n, i, o, a, c, l, u, h, f, d, g, w, m) {
    this.Ah = e | 0, this.Al = s | 0, this.Bh = r | 0, this.Bl = n | 0, this.Ch = i | 0, this.Cl = o | 0, this.Dh = a | 0, this.Dl = c | 0, this.Eh = l | 0, this.El = u | 0, this.Fh = h | 0, this.Fl = f | 0, this.Gh = d | 0, this.Gl = g | 0, this.Hh = w | 0, this.Hl = m | 0;
  }
  process(e, s) {
    for (let E = 0; E < 16; E++, s += 4)
      Jt[E] = e.getUint32(s), Qt[E] = e.getUint32(s += 4);
    for (let E = 16; E < 80; E++) {
      const D = Jt[E - 15] | 0, $ = Qt[E - 15] | 0, R = cs(D, $, 1) ^ cs(D, $, 8) ^ Mc(D, $, 7), B = ls(D, $, 1) ^ ls(D, $, 8) ^ Lc(D, $, 7), C = Jt[E - 2] | 0, O = Qt[E - 2] | 0, z = cs(C, O, 19) ^ Tr(C, O, 61) ^ Mc(C, O, 6), M = ls(C, O, 19) ^ Br(C, O, 61) ^ Lc(C, O, 6), N = _y(B, M, Qt[E - 7], Qt[E - 16]), _ = Iy(N, R, z, Jt[E - 7], Jt[E - 16]);
      Jt[E] = _ | 0, Qt[E] = N | 0;
    }
    let { Ah: r, Al: n, Bh: i, Bl: o, Ch: a, Cl: c, Dh: l, Dl: u, Eh: h, El: f, Fh: d, Fl: g, Gh: w, Gl: m, Hh: S, Hl: T } = this;
    for (let E = 0; E < 80; E++) {
      const D = cs(h, f, 14) ^ cs(h, f, 18) ^ Tr(h, f, 41), $ = ls(h, f, 14) ^ ls(h, f, 18) ^ Br(h, f, 41), R = h & d ^ ~h & w, B = f & g ^ ~f & m, C = Sy(T, $, B, Gy[E], Qt[E]), O = Dy(C, S, D, R, Wy[E], Jt[E]), z = C | 0, M = cs(r, n, 28) ^ Tr(r, n, 34) ^ Tr(r, n, 39), N = ls(r, n, 28) ^ Br(r, n, 34) ^ Br(r, n, 39), _ = r & i ^ r & a ^ i & a, A = n & o ^ n & c ^ o & c;
      S = w | 0, T = m | 0, w = d | 0, m = g | 0, d = h | 0, g = f | 0, { h, l: f } = ht(l | 0, u | 0, O | 0, z | 0), l = a | 0, u = c | 0, a = i | 0, c = o | 0, i = r | 0, o = n | 0;
      const p = va(z, N, A);
      r = Ea(p, O, M, _), n = p | 0;
    }
    ({ h: r, l: n } = ht(this.Ah | 0, this.Al | 0, r | 0, n | 0)), { h: i, l: o } = ht(this.Bh | 0, this.Bl | 0, i | 0, o | 0), { h: a, l: c } = ht(this.Ch | 0, this.Cl | 0, a | 0, c | 0), { h: l, l: u } = ht(this.Dh | 0, this.Dl | 0, l | 0, u | 0), { h, l: f } = ht(this.Eh | 0, this.El | 0, h | 0, f | 0), { h: d, l: g } = ht(this.Fh | 0, this.Fl | 0, d | 0, g | 0), { h: w, l: m } = ht(this.Gh | 0, this.Gl | 0, w | 0, m | 0), { h: S, l: T } = ht(this.Hh | 0, this.Hl | 0, S | 0, T | 0), this.set(r, n, i, o, a, c, l, u, h, f, d, g, w, m, S, T);
  }
  roundClean() {
    rt(Jt, Qt);
  }
  destroy() {
    rt(this.buffer), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
class Yy extends Ia {
  constructor() {
    super(48), this.Ah = Ae[0] | 0, this.Al = Ae[1] | 0, this.Bh = Ae[2] | 0, this.Bl = Ae[3] | 0, this.Ch = Ae[4] | 0, this.Cl = Ae[5] | 0, this.Dh = Ae[6] | 0, this.Dl = Ae[7] | 0, this.Eh = Ae[8] | 0, this.El = Ae[9] | 0, this.Fh = Ae[10] | 0, this.Fl = Ae[11] | 0, this.Gh = Ae[12] | 0, this.Gl = Ae[13] | 0, this.Hh = Ae[14] | 0, this.Hl = Ae[15] | 0;
  }
}
const Oe = /* @__PURE__ */ Uint32Array.from([
  573645204,
  4230739756,
  2673172387,
  3360449730,
  596883563,
  1867755857,
  2520282905,
  1497426621,
  2519219938,
  2827943907,
  3193839141,
  1401305490,
  721525244,
  746961066,
  246885852,
  2177182882
]);
class Zy extends Ia {
  constructor() {
    super(32), this.Ah = Oe[0] | 0, this.Al = Oe[1] | 0, this.Bh = Oe[2] | 0, this.Bl = Oe[3] | 0, this.Ch = Oe[4] | 0, this.Cl = Oe[5] | 0, this.Dh = Oe[6] | 0, this.Dl = Oe[7] | 0, this.Eh = Oe[8] | 0, this.El = Oe[9] | 0, this.Fh = Oe[10] | 0, this.Fl = Oe[11] | 0, this.Gh = Oe[12] | 0, this.Gl = Oe[13] | 0, this.Hh = Oe[14] | 0, this.Hl = Oe[15] | 0;
  }
}
const qs = /* @__PURE__ */ Xr(() => new Vy()), Xy = /* @__PURE__ */ Xr(() => new Ia()), Jy = /* @__PURE__ */ Xr(() => new Yy()), Qy = /* @__PURE__ */ Xr(() => new Zy()), mi = qs;
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Sa = /* @__PURE__ */ BigInt(0), Co = /* @__PURE__ */ BigInt(1);
function Jr(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function Da(t) {
  if (!Jr(t))
    throw new Error("Uint8Array expected");
}
function Fr(t, e) {
  if (typeof e != "boolean")
    throw new Error(t + " boolean expected, got " + e);
}
function fn(t) {
  const e = t.toString(16);
  return e.length & 1 ? "0" + e : e;
}
function $u(t) {
  if (typeof t != "string")
    throw new Error("hex string expected, got " + typeof t);
  return t === "" ? Sa : BigInt("0x" + t);
}
const Ou = (
  // @ts-ignore
  typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function"
), ew = /* @__PURE__ */ Array.from({ length: 256 }, (t, e) => e.toString(16).padStart(2, "0"));
function Hr(t) {
  if (Da(t), Ou)
    return t.toHex();
  let e = "";
  for (let s = 0; s < t.length; s++)
    e += ew[t[s]];
  return e;
}
const Pt = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function jc(t) {
  if (t >= Pt._0 && t <= Pt._9)
    return t - Pt._0;
  if (t >= Pt.A && t <= Pt.F)
    return t - (Pt.A - 10);
  if (t >= Pt.a && t <= Pt.f)
    return t - (Pt.a - 10);
}
function Hn(t) {
  if (typeof t != "string")
    throw new Error("hex string expected, got " + typeof t);
  if (Ou)
    return Uint8Array.fromHex(t);
  const e = t.length, s = e / 2;
  if (e % 2)
    throw new Error("hex string expected, got unpadded hex of length " + e);
  const r = new Uint8Array(s);
  for (let n = 0, i = 0; n < s; n++, i += 2) {
    const o = jc(t.charCodeAt(i)), a = jc(t.charCodeAt(i + 1));
    if (o === void 0 || a === void 0) {
      const c = t[i] + t[i + 1];
      throw new Error('hex string expected, got non-hex character "' + c + '" at index ' + i);
    }
    r[n] = o * 16 + a;
  }
  return r;
}
function Ms(t) {
  return $u(Hr(t));
}
function Pu(t) {
  return Da(t), $u(Hr(Uint8Array.from(t).reverse()));
}
function Qr(t, e) {
  return Hn(t.toString(16).padStart(e * 2, "0"));
}
function Tu(t, e) {
  return Qr(t, e).reverse();
}
function Qe(t, e, s) {
  let r;
  if (typeof e == "string")
    try {
      r = Hn(e);
    } catch (i) {
      throw new Error(t + " must be hex string or Uint8Array, cause: " + i);
    }
  else if (Jr(e))
    r = Uint8Array.from(e);
  else
    throw new Error(t + " must be hex string or Uint8Array");
  const n = r.length;
  if (typeof s == "number" && n !== s)
    throw new Error(t + " of length " + s + " expected, got " + n);
  return r;
}
function Kn(...t) {
  let e = 0;
  for (let r = 0; r < t.length; r++) {
    const n = t[r];
    Da(n), e += n.length;
  }
  const s = new Uint8Array(e);
  for (let r = 0, n = 0; r < t.length; r++) {
    const i = t[r];
    s.set(i, n), n += i.length;
  }
  return s;
}
const ki = (t) => typeof t == "bigint" && Sa <= t;
function Aa(t, e, s) {
  return ki(t) && ki(e) && ki(s) && e <= t && t < s;
}
function cr(t, e, s, r) {
  if (!Aa(e, s, r))
    throw new Error("expected valid " + t + ": " + s + " <= n < " + r + ", got " + e);
}
function tw(t) {
  let e;
  for (e = 0; t > Sa; t >>= Co, e += 1)
    ;
  return e;
}
const bi = (t) => (Co << BigInt(t)) - Co, qi = (t) => new Uint8Array(t), Fc = (t) => Uint8Array.from(t);
function sw(t, e, s) {
  if (typeof t != "number" || t < 2)
    throw new Error("hashLen must be a number");
  if (typeof e != "number" || e < 2)
    throw new Error("qByteLen must be a number");
  if (typeof s != "function")
    throw new Error("hmacFn must be a function");
  let r = qi(t), n = qi(t), i = 0;
  const o = () => {
    r.fill(1), n.fill(0), i = 0;
  }, a = (...h) => s(n, r, ...h), c = (h = qi(0)) => {
    n = a(Fc([0]), h), r = a(), h.length !== 0 && (n = a(Fc([1]), h), r = a());
  }, l = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let h = 0;
    const f = [];
    for (; h < e; ) {
      r = a();
      const d = r.slice();
      f.push(d), h += r.length;
    }
    return Kn(...f);
  };
  return (h, f) => {
    o(), c(h);
    let d;
    for (; !(d = f(l())); )
      c();
    return o(), d;
  };
}
const rw = {
  bigint: (t) => typeof t == "bigint",
  function: (t) => typeof t == "function",
  boolean: (t) => typeof t == "boolean",
  string: (t) => typeof t == "string",
  stringOrUint8Array: (t) => typeof t == "string" || Jr(t),
  isSafeInteger: (t) => Number.isSafeInteger(t),
  array: (t) => Array.isArray(t),
  field: (t, e) => e.Fp.isValid(t),
  hash: (t) => typeof t == "function" && Number.isSafeInteger(t.outputLen)
};
function vi(t, e, s = {}) {
  const r = (n, i, o) => {
    const a = rw[i];
    if (typeof a != "function")
      throw new Error("invalid validator function");
    const c = t[n];
    if (!(o && c === void 0) && !a(c, t))
      throw new Error("param " + String(n) + " is invalid. Expected " + i + ", got " + c);
  };
  for (const [n, i] of Object.entries(e))
    r(n, i, !1);
  for (const [n, i] of Object.entries(s))
    r(n, i, !0);
  return t;
}
function Hc(t) {
  const e = /* @__PURE__ */ new WeakMap();
  return (s, ...r) => {
    const n = e.get(s);
    if (n !== void 0)
      return n;
    const i = t(s, ...r);
    return e.set(s, i), i;
  };
}
function nw(t, e) {
  if (Gc(t) > e)
    throw new Sw({
      givenSize: Gc(t),
      maxSize: e
    });
}
const Tt = {
  zero: 48,
  nine: 57,
  A: 65,
  F: 70,
  a: 97,
  f: 102
};
function Kc(t) {
  if (t >= Tt.zero && t <= Tt.nine)
    return t - Tt.zero;
  if (t >= Tt.A && t <= Tt.F)
    return t - (Tt.A - 10);
  if (t >= Tt.a && t <= Tt.f)
    return t - (Tt.a - 10);
}
function iw(t, e = {}) {
  const { dir: s, size: r = 32 } = e;
  if (r === 0)
    return t;
  if (t.length > r)
    throw new Dw({
      size: t.length,
      targetSize: r,
      type: "Bytes"
    });
  const n = new Uint8Array(r);
  for (let i = 0; i < r; i++) {
    const o = s === "right";
    n[o ? i : r - i - 1] = t[o ? i : t.length - i - 1];
  }
  return n;
}
function Bu(t, e) {
  if (ms(t) > e)
    throw new gw({
      givenSize: ms(t),
      maxSize: e
    });
}
function ow(t, e) {
  if (typeof e == "number" && e > 0 && e > ms(t) - 1)
    throw new Nu({
      offset: e,
      position: "start",
      size: ms(t)
    });
}
function aw(t, e, s) {
  if (typeof e == "number" && typeof s == "number" && ms(t) !== s - e)
    throw new Nu({
      offset: s,
      position: "end",
      size: ms(t)
    });
}
function Ru(t, e = {}) {
  const { dir: s, size: r = 32 } = e;
  if (r === 0)
    return t;
  const n = t.replace("0x", "");
  if (n.length > r * 2)
    throw new yw({
      size: Math.ceil(n.length / 2),
      targetSize: r,
      type: "Hex"
    });
  return `0x${n[s === "right" ? "padEnd" : "padStart"](r * 2, "0")}`;
}
const cw = "#__bigint";
function $a(t, e, s) {
  return JSON.stringify(t, (r, n) => typeof n == "bigint" ? n.toString() + cw : n, s);
}
const lw = /* @__PURE__ */ Array.from({ length: 256 }, (t, e) => e.toString(16).padStart(2, "0"));
function hw(t, e = {}) {
  const { strict: s = !1 } = e;
  if (!t)
    throw new Vc(t);
  if (typeof t != "string")
    throw new Vc(t);
  if (s && !/^0x[0-9a-fA-F]*$/.test(t))
    throw new Wc(t);
  if (!t.startsWith("0x"))
    throw new Wc(t);
}
function uw(...t) {
  return `0x${t.reduce((e, s) => e + s.replace("0x", ""), "")}`;
}
function Oa(t) {
  return t instanceof Uint8Array ? Vn(t) : Array.isArray(t) ? Vn(new Uint8Array(t)) : t;
}
function Vn(t, e = {}) {
  let s = "";
  for (let n = 0; n < t.length; n++)
    s += lw[t[n]];
  const r = `0x${s}`;
  return typeof e.size == "number" ? (Bu(r, e.size), Cu(r, e.size)) : r;
}
function zi(t, e = {}) {
  const { signed: s, size: r } = e, n = BigInt(t);
  let i;
  r ? s ? i = (1n << BigInt(r) * 8n - 1n) - 1n : i = 2n ** (BigInt(r) * 8n) - 1n : typeof t == "number" && (i = BigInt(Number.MAX_SAFE_INTEGER));
  const o = typeof i == "bigint" && s ? -i - 1n : 0;
  if (i && n > i || n < o) {
    const l = typeof t == "bigint" ? "n" : "";
    throw new pw({
      max: i ? `${i}${l}` : void 0,
      min: `${o}${l}`,
      signed: s,
      size: r,
      value: `${t}${l}`
    });
  }
  const c = `0x${(s && n < 0 ? (1n << BigInt(r * 8)) + BigInt(n) : n).toString(16)}`;
  return r ? fw(c, r) : c;
}
function fw(t, e) {
  return Ru(t, { dir: "left", size: e });
}
function Cu(t, e) {
  return Ru(t, { dir: "right", size: e });
}
function kt(t, e, s, r = {}) {
  const { strict: n } = r;
  ow(t, e);
  const i = `0x${t.replace("0x", "").slice((e ?? 0) * 2, (s ?? t.length) * 2)}`;
  return n && aw(i, e, s), i;
}
function ms(t) {
  return Math.ceil((t.length - 2) / 2);
}
function dw(t, e = {}) {
  const { strict: s = !1 } = e;
  try {
    return hw(t, { strict: s }), !0;
  } catch {
    return !1;
  }
}
class pw extends oe {
  constructor({ max: e, min: s, signed: r, size: n, value: i }) {
    super(`Number \`${i}\` is not in safe${n ? ` ${n * 8}-bit` : ""}${r ? " signed" : " unsigned"} integer range ${e ? `(\`${s}\` to \`${e}\`)` : `(above \`${s}\`)`}`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "Hex.IntegerOutOfRangeError"
    });
  }
}
class Vc extends oe {
  constructor(e) {
    super(`Value \`${typeof e == "object" ? $a(e) : e}\` of type \`${typeof e}\` is an invalid hex type.`, {
      metaMessages: ['Hex types must be represented as `"0x${string}"`.']
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "Hex.InvalidHexTypeError"
    });
  }
}
class Wc extends oe {
  constructor(e) {
    super(`Value \`${e}\` is an invalid hex value.`, {
      metaMessages: [
        'Hex values must start with `"0x"` and contain only hexadecimal characters (0-9, a-f, A-F).'
      ]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "Hex.InvalidHexValueError"
    });
  }
}
let gw = class extends oe {
  constructor({ givenSize: e, maxSize: s }) {
    super(`Size cannot exceed \`${s}\` bytes. Given size: \`${e}\` bytes.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "Hex.SizeOverflowError"
    });
  }
};
class Nu extends oe {
  constructor({ offset: e, position: s, size: r }) {
    super(`Slice ${s === "start" ? "starting" : "ending"} at offset \`${e}\` is out-of-bounds (size: \`${r}\`).`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "Hex.SliceOffsetOutOfBoundsError"
    });
  }
}
let yw = class extends oe {
  constructor({ size: e, targetSize: s, type: r }) {
    super(`${r.charAt(0).toUpperCase()}${r.slice(1).toLowerCase()} size (\`${e}\`) exceeds padding size (\`${s}\`).`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "Hex.SizeExceedsPaddingSizeError"
    });
  }
};
const ww = /* @__PURE__ */ new TextEncoder();
function mw(t) {
  if (!(t instanceof Uint8Array)) {
    if (!t)
      throw new dn(t);
    if (typeof t != "object")
      throw new dn(t);
    if (!("BYTES_PER_ELEMENT" in t))
      throw new dn(t);
    if (t.BYTES_PER_ELEMENT !== 1 || t.constructor.name !== "Uint8Array")
      throw new dn(t);
  }
}
function bw(t) {
  return t instanceof Uint8Array ? t : typeof t == "string" ? Ew(t) : vw(t);
}
function vw(t) {
  return t instanceof Uint8Array ? t : new Uint8Array(t);
}
function Ew(t, e = {}) {
  const { size: s } = e;
  let r = t;
  s && (Bu(t, s), r = Cu(t, s));
  let n = r.slice(2);
  n.length % 2 && (n = `0${n}`);
  const i = n.length / 2, o = new Uint8Array(i);
  for (let a = 0, c = 0; a < i; a++) {
    const l = Kc(n.charCodeAt(c++)), u = Kc(n.charCodeAt(c++));
    if (l === void 0 || u === void 0)
      throw new oe(`Invalid byte sequence ("${n[c - 2]}${n[c - 1]}" in "${n}").`);
    o[a] = l * 16 + u;
  }
  return o;
}
function xw(t, e = {}) {
  const { size: s } = e, r = ww.encode(t);
  return typeof s == "number" ? (nw(r, s), _w(r, s)) : r;
}
function _w(t, e) {
  return iw(t, { dir: "right", size: e });
}
function Gc(t) {
  return t.length;
}
function Iw(t) {
  try {
    return mw(t), !0;
  } catch {
    return !1;
  }
}
class dn extends oe {
  constructor(e) {
    super(`Value \`${typeof e == "object" ? $a(e) : e}\` of type \`${typeof e}\` is an invalid Bytes value.`, {
      metaMessages: ["Bytes values must be of type `Bytes`."]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "Bytes.InvalidBytesTypeError"
    });
  }
}
class Sw extends oe {
  constructor({ givenSize: e, maxSize: s }) {
    super(`Size cannot exceed \`${s}\` bytes. Given size: \`${e}\` bytes.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "Bytes.SizeOverflowError"
    });
  }
}
class Dw extends oe {
  constructor({ size: e, targetSize: s, type: r }) {
    super(`${r.charAt(0).toUpperCase()}${r.slice(1).toLowerCase()} size (\`${e}\`) exceeds padding size (\`${s}\`).`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "Bytes.SizeExceedsPaddingSizeError"
    });
  }
}
function Uu(t, e = {}) {
  const { as: s = typeof t == "string" ? "Hex" : "Bytes" } = e, r = Iu(bw(t));
  return s === "Bytes" ? r : Vn(r);
}
class Aw extends Map {
  constructor(e) {
    super(), Object.defineProperty(this, "maxSize", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.maxSize = e;
  }
  get(e) {
    const s = super.get(e);
    return super.has(e) && s !== void 0 && (this.delete(e), super.set(e, s)), s;
  }
  set(e, s) {
    if (super.set(e, s), this.maxSize && this.size > this.maxSize) {
      const r = this.keys().next().value;
      r && this.delete(r);
    }
    return this;
  }
}
const $w = {
  checksum: /* @__PURE__ */ new Aw(8192)
}, ji = $w.checksum;
function Mu(t, e = {}) {
  const { compressed: s } = e, { prefix: r, x: n, y: i } = t;
  if (s === !1 || typeof n == "bigint" && typeof i == "bigint") {
    if (r !== 4)
      throw new Yc({
        prefix: r,
        cause: new Cw()
      });
    return;
  }
  if (s === !0 || typeof n == "bigint" && typeof i > "u") {
    if (r !== 3 && r !== 2)
      throw new Yc({
        prefix: r,
        cause: new Rw()
      });
    return;
  }
  throw new Bw({ publicKey: t });
}
function Ow(t) {
  const e = (() => {
    if (dw(t))
      return Lu(t);
    if (Iw(t))
      return Pw(t);
    const { prefix: s, x: r, y: n } = t;
    return typeof r == "bigint" && typeof n == "bigint" ? { prefix: s ?? 4, x: r, y: n } : { prefix: s, x: r };
  })();
  return Mu(e), e;
}
function Pw(t) {
  return Lu(Vn(t));
}
function Lu(t) {
  if (t.length !== 132 && t.length !== 130 && t.length !== 68)
    throw new Nw({ publicKey: t });
  if (t.length === 130) {
    const r = BigInt(kt(t, 0, 32)), n = BigInt(kt(t, 32, 64));
    return {
      prefix: 4,
      x: r,
      y: n
    };
  }
  if (t.length === 132) {
    const r = Number(kt(t, 0, 1)), n = BigInt(kt(t, 1, 33)), i = BigInt(kt(t, 33, 65));
    return {
      prefix: r,
      x: n,
      y: i
    };
  }
  const e = Number(kt(t, 0, 1)), s = BigInt(kt(t, 1, 33));
  return {
    prefix: e,
    x: s
  };
}
function Tw(t, e = {}) {
  Mu(t);
  const { prefix: s, x: r, y: n } = t, { includePrefix: i = !0 } = e;
  return uw(
    i ? zi(s, { size: 1 }) : "0x",
    zi(r, { size: 32 }),
    // If the public key is not compressed, add the y coordinate.
    typeof n == "bigint" ? zi(n, { size: 32 }) : "0x"
  );
}
class Bw extends oe {
  constructor({ publicKey: e }) {
    super(`Value \`${$a(e)}\` is not a valid public key.`, {
      metaMessages: [
        "Public key must contain:",
        "- an `x` and `prefix` value (compressed)",
        "- an `x`, `y`, and `prefix` value (uncompressed)"
      ]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "PublicKey.InvalidError"
    });
  }
}
class Yc extends oe {
  constructor({ prefix: e, cause: s }) {
    super(`Prefix "${e}" is invalid.`, {
      cause: s
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "PublicKey.InvalidPrefixError"
    });
  }
}
class Rw extends oe {
  constructor() {
    super("Prefix must be 2 or 3 for compressed public keys."), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "PublicKey.InvalidCompressedPrefixError"
    });
  }
}
class Cw extends oe {
  constructor() {
    super("Prefix must be 4 for uncompressed public keys."), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "PublicKey.InvalidUncompressedPrefixError"
    });
  }
}
let Nw = class extends oe {
  constructor({ publicKey: e }) {
    super(`Value \`${e}\` is an invalid public key size.`, {
      metaMessages: [
        "Expected: 33 bytes (compressed + prefix), 64 bytes (uncompressed) or 65 bytes (uncompressed + prefix).",
        `Received ${ms(Oa(e))} bytes.`
      ]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "PublicKey.InvalidSerializedSizeError"
    });
  }
};
const Uw = /^0x[a-fA-F0-9]{40}$/;
function ku(t, e = {}) {
  const { strict: s = !0 } = e;
  if (!Uw.test(t))
    throw new Zc({
      address: t,
      cause: new kw()
    });
  if (s) {
    if (t.toLowerCase() === t)
      return;
    if (qu(t) !== t)
      throw new Zc({
        address: t,
        cause: new qw()
      });
  }
}
function qu(t) {
  if (ji.has(t))
    return ji.get(t);
  ku(t, { strict: !1 });
  const e = t.substring(2).toLowerCase(), s = Uu(xw(e), { as: "Bytes" }), r = e.split("");
  for (let i = 0; i < 40; i += 2)
    s[i >> 1] >> 4 >= 8 && r[i] && (r[i] = r[i].toUpperCase()), (s[i >> 1] & 15) >= 8 && r[i + 1] && (r[i + 1] = r[i + 1].toUpperCase());
  const n = `0x${r.join("")}`;
  return ji.set(t, n), n;
}
function Mw(t, e = {}) {
  const { checksum: s = !1 } = e;
  return ku(t), s ? qu(t) : t;
}
function Lw(t, e = {}) {
  const s = Uu(`0x${Tw(t).slice(4)}`).substring(26);
  return Mw(`0x${s}`, e);
}
class Zc extends oe {
  constructor({ address: e, cause: s }) {
    super(`Address "${e}" is invalid.`, {
      cause: s
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "Address.InvalidAddressError"
    });
  }
}
class kw extends oe {
  constructor() {
    super("Address is not a 20 byte (40 hexadecimal character) value."), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "Address.InvalidInputError"
    });
  }
}
class qw extends oe {
  constructor() {
    super("Address does not match its checksum counterpart."), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "Address.InvalidChecksumError"
    });
  }
}
class zu extends wi {
  constructor(e, s) {
    super(), this.finished = !1, this.destroyed = !1, yi(e);
    const r = pt(s);
    if (this.iHash = e.create(), typeof this.iHash.update != "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const n = this.blockLen, i = new Uint8Array(n);
    i.set(r.length > n ? e.create().update(r).digest() : r);
    for (let o = 0; o < i.length; o++)
      i[o] ^= 54;
    this.iHash.update(i), this.oHash = e.create();
    for (let o = 0; o < i.length; o++)
      i[o] ^= 106;
    this.oHash.update(i), rt(i);
  }
  update(e) {
    return ws(this), this.iHash.update(e), this;
  }
  digestInto(e) {
    ws(this), gt(e, this.outputLen), this.finished = !0, this.iHash.digestInto(e), this.oHash.update(e), this.oHash.digestInto(e), this.destroy();
  }
  digest() {
    const e = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(e), e;
  }
  _cloneInto(e) {
    e || (e = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: s, iHash: r, finished: n, destroyed: i, blockLen: o, outputLen: a } = this;
    return e = e, e.finished = n, e.destroyed = i, e.blockLen = o, e.outputLen = a, e.oHash = s._cloneInto(e.oHash), e.iHash = r._cloneInto(e.iHash), e;
  }
  clone() {
    return this._cloneInto();
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
}
const en = (t, e, s) => new zu(t, e).update(s).digest();
en.create = (t, e) => new zu(t, e);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const ze = BigInt(0), Ce = BigInt(1), Bs = /* @__PURE__ */ BigInt(2), zw = /* @__PURE__ */ BigInt(3), ju = /* @__PURE__ */ BigInt(4), Fu = /* @__PURE__ */ BigInt(5), Hu = /* @__PURE__ */ BigInt(8);
function ke(t, e) {
  const s = t % e;
  return s >= ze ? s : e + s;
}
function Ze(t, e, s) {
  let r = t;
  for (; e-- > ze; )
    r *= r, r %= s;
  return r;
}
function No(t, e) {
  if (t === ze)
    throw new Error("invert: expected non-zero number");
  if (e <= ze)
    throw new Error("invert: expected positive modulus, got " + e);
  let s = ke(t, e), r = e, n = ze, i = Ce;
  for (; s !== ze; ) {
    const a = r / s, c = r % s, l = n - i * a;
    r = s, s = c, n = i, i = l;
  }
  if (r !== Ce)
    throw new Error("invert: does not exist");
  return ke(n, e);
}
function Ku(t, e) {
  const s = (t.ORDER + Ce) / ju, r = t.pow(e, s);
  if (!t.eql(t.sqr(r), e))
    throw new Error("Cannot find square root");
  return r;
}
function jw(t, e) {
  const s = (t.ORDER - Fu) / Hu, r = t.mul(e, Bs), n = t.pow(r, s), i = t.mul(e, n), o = t.mul(t.mul(i, Bs), n), a = t.mul(i, t.sub(o, t.ONE));
  if (!t.eql(t.sqr(a), e))
    throw new Error("Cannot find square root");
  return a;
}
function Fw(t) {
  if (t < BigInt(3))
    throw new Error("sqrt is not defined for small field");
  let e = t - Ce, s = 0;
  for (; e % Bs === ze; )
    e /= Bs, s++;
  let r = Bs;
  const n = Pa(t);
  for (; Xc(n, r) === 1; )
    if (r++ > 1e3)
      throw new Error("Cannot find square root: probably non-prime P");
  if (s === 1)
    return Ku;
  let i = n.pow(r, e);
  const o = (e + Ce) / Bs;
  return function(c, l) {
    if (c.is0(l))
      return l;
    if (Xc(c, l) !== 1)
      throw new Error("Cannot find square root");
    let u = s, h = c.mul(c.ONE, i), f = c.pow(l, e), d = c.pow(l, o);
    for (; !c.eql(f, c.ONE); ) {
      if (c.is0(f))
        return c.ZERO;
      let g = 1, w = c.sqr(f);
      for (; !c.eql(w, c.ONE); )
        if (g++, w = c.sqr(w), g === u)
          throw new Error("Cannot find square root");
      const m = Ce << BigInt(u - g - 1), S = c.pow(h, m);
      u = g, h = c.sqr(S), f = c.mul(f, h), d = c.mul(d, S);
    }
    return d;
  };
}
function Hw(t) {
  return t % ju === zw ? Ku : t % Hu === Fu ? jw : Fw(t);
}
const Kw = [
  "create",
  "isValid",
  "is0",
  "neg",
  "inv",
  "sqrt",
  "sqr",
  "eql",
  "add",
  "sub",
  "mul",
  "pow",
  "div",
  "addN",
  "subN",
  "mulN",
  "sqrN"
];
function Vw(t) {
  const e = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, s = Kw.reduce((r, n) => (r[n] = "function", r), e);
  return vi(t, s);
}
function Ww(t, e, s) {
  if (s < ze)
    throw new Error("invalid exponent, negatives unsupported");
  if (s === ze)
    return t.ONE;
  if (s === Ce)
    return e;
  let r = t.ONE, n = e;
  for (; s > ze; )
    s & Ce && (r = t.mul(r, n)), n = t.sqr(n), s >>= Ce;
  return r;
}
function Vu(t, e, s = !1) {
  const r = new Array(e.length).fill(s ? t.ZERO : void 0), n = e.reduce((o, a, c) => t.is0(a) ? o : (r[c] = o, t.mul(o, a)), t.ONE), i = t.inv(n);
  return e.reduceRight((o, a, c) => t.is0(a) ? o : (r[c] = t.mul(o, r[c]), t.mul(o, a)), i), r;
}
function Xc(t, e) {
  const s = (t.ORDER - Ce) / Bs, r = t.pow(e, s), n = t.eql(r, t.ONE), i = t.eql(r, t.ZERO), o = t.eql(r, t.neg(t.ONE));
  if (!n && !i && !o)
    throw new Error("invalid Legendre symbol result");
  return n ? 1 : i ? 0 : -1;
}
function Wu(t, e) {
  e !== void 0 && At(e);
  const s = e !== void 0 ? e : t.toString(2).length, r = Math.ceil(s / 8);
  return { nBitLength: s, nByteLength: r };
}
function Pa(t, e, s = !1, r = {}) {
  if (t <= ze)
    throw new Error("invalid field: expected ORDER > 0, got " + t);
  const { nBitLength: n, nByteLength: i } = Wu(t, e);
  if (i > 2048)
    throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let o;
  const a = Object.freeze({
    ORDER: t,
    isLE: s,
    BITS: n,
    BYTES: i,
    MASK: bi(n),
    ZERO: ze,
    ONE: Ce,
    create: (c) => ke(c, t),
    isValid: (c) => {
      if (typeof c != "bigint")
        throw new Error("invalid field element: expected bigint, got " + typeof c);
      return ze <= c && c < t;
    },
    is0: (c) => c === ze,
    isOdd: (c) => (c & Ce) === Ce,
    neg: (c) => ke(-c, t),
    eql: (c, l) => c === l,
    sqr: (c) => ke(c * c, t),
    add: (c, l) => ke(c + l, t),
    sub: (c, l) => ke(c - l, t),
    mul: (c, l) => ke(c * l, t),
    pow: (c, l) => Ww(a, c, l),
    div: (c, l) => ke(c * No(l, t), t),
    // Same as above, but doesn't normalize
    sqrN: (c) => c * c,
    addN: (c, l) => c + l,
    subN: (c, l) => c - l,
    mulN: (c, l) => c * l,
    inv: (c) => No(c, t),
    sqrt: r.sqrt || ((c) => (o || (o = Hw(t)), o(a, c))),
    toBytes: (c) => s ? Tu(c, i) : Qr(c, i),
    fromBytes: (c) => {
      if (c.length !== i)
        throw new Error("Field.fromBytes: expected " + i + " bytes, got " + c.length);
      return s ? Pu(c) : Ms(c);
    },
    // TODO: we don't need it here, move out to separate fn
    invertBatch: (c) => Vu(a, c),
    // We can't move this out because Fp6, Fp12 implement it
    // and it's unclear what to return in there.
    cmov: (c, l, u) => u ? l : c
  });
  return Object.freeze(a);
}
function Gu(t) {
  if (typeof t != "bigint")
    throw new Error("field order must be bigint");
  const e = t.toString(2).length;
  return Math.ceil(e / 8);
}
function Yu(t) {
  const e = Gu(t);
  return e + Math.ceil(e / 2);
}
function Gw(t, e, s = !1) {
  const r = t.length, n = Gu(e), i = Yu(e);
  if (r < 16 || r < i || r > 1024)
    throw new Error("expected " + i + "-1024 bytes of input, got " + r);
  const o = s ? Pu(t) : Ms(t), a = ke(o, e - Ce) + Ce;
  return s ? Tu(a, n) : Qr(a, n);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Jc = BigInt(0), Uo = BigInt(1);
function Fi(t, e) {
  const s = e.negate();
  return t ? s : e;
}
function Zu(t, e) {
  if (!Number.isSafeInteger(t) || t <= 0 || t > e)
    throw new Error("invalid window size, expected [1.." + e + "], got W=" + t);
}
function Hi(t, e) {
  Zu(t, e);
  const s = Math.ceil(e / t) + 1, r = 2 ** (t - 1), n = 2 ** t, i = bi(t), o = BigInt(t);
  return { windows: s, windowSize: r, mask: i, maxNumber: n, shiftBy: o };
}
function Qc(t, e, s) {
  const { windowSize: r, mask: n, maxNumber: i, shiftBy: o } = s;
  let a = Number(t & n), c = t >> o;
  a > r && (a -= i, c += Uo);
  const l = e * r, u = l + Math.abs(a) - 1, h = a === 0, f = a < 0, d = e % 2 !== 0;
  return { nextN: c, offset: u, isZero: h, isNeg: f, isNegF: d, offsetF: l };
}
function Yw(t, e) {
  if (!Array.isArray(t))
    throw new Error("array expected");
  t.forEach((s, r) => {
    if (!(s instanceof e))
      throw new Error("invalid point at index " + r);
  });
}
function Zw(t, e) {
  if (!Array.isArray(t))
    throw new Error("array of scalars expected");
  t.forEach((s, r) => {
    if (!e.isValid(s))
      throw new Error("invalid scalar at index " + r);
  });
}
const Ki = /* @__PURE__ */ new WeakMap(), Xu = /* @__PURE__ */ new WeakMap();
function Vi(t) {
  return Xu.get(t) || 1;
}
function Xw(t, e) {
  return {
    constTimeNegate: Fi,
    hasPrecomputes(s) {
      return Vi(s) !== 1;
    },
    // non-const time multiplication ladder
    unsafeLadder(s, r, n = t.ZERO) {
      let i = s;
      for (; r > Jc; )
        r & Uo && (n = n.add(i)), i = i.double(), r >>= Uo;
      return n;
    },
    /**
     * Creates a wNAF precomputation window. Used for caching.
     * Default window size is set by `utils.precompute()` and is equal to 8.
     * Number of precomputed points depends on the curve size:
     * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
     * - 𝑊 is the window size
     * - 𝑛 is the bitlength of the curve order.
     * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
     * @param elm Point instance
     * @param W window size
     * @returns precomputed point tables flattened to a single array
     */
    precomputeWindow(s, r) {
      const { windows: n, windowSize: i } = Hi(r, e), o = [];
      let a = s, c = a;
      for (let l = 0; l < n; l++) {
        c = a, o.push(c);
        for (let u = 1; u < i; u++)
          c = c.add(a), o.push(c);
        a = c.double();
      }
      return o;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(s, r, n) {
      let i = t.ZERO, o = t.BASE;
      const a = Hi(s, e);
      for (let c = 0; c < a.windows; c++) {
        const { nextN: l, offset: u, isZero: h, isNeg: f, isNegF: d, offsetF: g } = Qc(n, c, a);
        n = l, h ? o = o.add(Fi(d, r[g])) : i = i.add(Fi(f, r[u]));
      }
      return { p: i, f: o };
    },
    /**
     * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @param acc accumulator point to add result of multiplication
     * @returns point
     */
    wNAFUnsafe(s, r, n, i = t.ZERO) {
      const o = Hi(s, e);
      for (let a = 0; a < o.windows && n !== Jc; a++) {
        const { nextN: c, offset: l, isZero: u, isNeg: h } = Qc(n, a, o);
        if (n = c, !u) {
          const f = r[l];
          i = i.add(h ? f.negate() : f);
        }
      }
      return i;
    },
    getPrecomputes(s, r, n) {
      let i = Ki.get(r);
      return i || (i = this.precomputeWindow(r, s), s !== 1 && Ki.set(r, n(i))), i;
    },
    wNAFCached(s, r, n) {
      const i = Vi(s);
      return this.wNAF(i, this.getPrecomputes(i, s, n), r);
    },
    wNAFCachedUnsafe(s, r, n, i) {
      const o = Vi(s);
      return o === 1 ? this.unsafeLadder(s, r, i) : this.wNAFUnsafe(o, this.getPrecomputes(o, s, n), r, i);
    },
    // We calculate precomputes for elliptic curve point multiplication
    // using windowed method. This specifies window size and
    // stores precomputed values. Usually only base point would be precomputed.
    setWindowSize(s, r) {
      Zu(r, e), Xu.set(s, r), Ki.delete(s);
    }
  };
}
function Jw(t, e, s, r) {
  Yw(s, t), Zw(r, e);
  const n = s.length, i = r.length;
  if (n !== i)
    throw new Error("arrays of points and scalars must have equal length");
  const o = t.ZERO, a = tw(BigInt(n));
  let c = 1;
  a > 12 ? c = a - 3 : a > 4 ? c = a - 2 : a > 0 && (c = 2);
  const l = bi(c), u = new Array(Number(l) + 1).fill(o), h = Math.floor((e.BITS - 1) / c) * c;
  let f = o;
  for (let d = h; d >= 0; d -= c) {
    u.fill(o);
    for (let w = 0; w < i; w++) {
      const m = r[w], S = Number(m >> BigInt(d) & l);
      u[S] = u[S].add(s[w]);
    }
    let g = o;
    for (let w = u.length - 1, m = o; w > 0; w--)
      m = m.add(u[w]), g = g.add(m);
    if (f = f.add(g), d !== 0)
      for (let w = 0; w < c; w++)
        f = f.double();
  }
  return f;
}
function Ju(t) {
  return Vw(t.Fp), vi(t, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...Wu(t.n, t.nBitLength),
    ...t,
    p: t.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function el(t) {
  t.lowS !== void 0 && Fr("lowS", t.lowS), t.prehash !== void 0 && Fr("prehash", t.prehash);
}
function Qw(t) {
  const e = Ju(t);
  vi(e, {
    a: "field",
    b: "field"
  }, {
    allowInfinityPoint: "boolean",
    allowedPrivateKeyLengths: "array",
    clearCofactor: "function",
    fromBytes: "function",
    isTorsionFree: "function",
    toBytes: "function",
    wrapPrivateKey: "boolean"
  });
  const { endo: s, Fp: r, a: n } = e;
  if (s) {
    if (!r.eql(n, r.ZERO))
      throw new Error("invalid endo: CURVE.a must be 0");
    if (typeof s != "object" || typeof s.beta != "bigint" || typeof s.splitScalar != "function")
      throw new Error('invalid endo: expected "beta": bigint and "splitScalar": function');
  }
  return Object.freeze({ ...e });
}
let e0 = class extends Error {
  constructor(e = "") {
    super(e);
  }
};
const qt = {
  // asn.1 DER encoding utils
  Err: e0,
  // Basic building block is TLV (Tag-Length-Value)
  _tlv: {
    encode: (t, e) => {
      const { Err: s } = qt;
      if (t < 0 || t > 256)
        throw new s("tlv.encode: wrong tag");
      if (e.length & 1)
        throw new s("tlv.encode: unpadded data");
      const r = e.length / 2, n = fn(r);
      if (n.length / 2 & 128)
        throw new s("tlv.encode: long form length too big");
      const i = r > 127 ? fn(n.length / 2 | 128) : "";
      return fn(t) + i + n + e;
    },
    // v - value, l - left bytes (unparsed)
    decode(t, e) {
      const { Err: s } = qt;
      let r = 0;
      if (t < 0 || t > 256)
        throw new s("tlv.encode: wrong tag");
      if (e.length < 2 || e[r++] !== t)
        throw new s("tlv.decode: wrong tlv");
      const n = e[r++], i = !!(n & 128);
      let o = 0;
      if (!i)
        o = n;
      else {
        const c = n & 127;
        if (!c)
          throw new s("tlv.decode(long): indefinite length not supported");
        if (c > 4)
          throw new s("tlv.decode(long): byte length is too big");
        const l = e.subarray(r, r + c);
        if (l.length !== c)
          throw new s("tlv.decode: length bytes not complete");
        if (l[0] === 0)
          throw new s("tlv.decode(long): zero leftmost byte");
        for (const u of l)
          o = o << 8 | u;
        if (r += c, o < 128)
          throw new s("tlv.decode(long): not minimal encoding");
      }
      const a = e.subarray(r, r + o);
      if (a.length !== o)
        throw new s("tlv.decode: wrong value length");
      return { v: a, l: e.subarray(r + o) };
    }
  },
  // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
  // since we always use positive integers here. It must always be empty:
  // - add zero byte if exists
  // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
  _int: {
    encode(t) {
      const { Err: e } = qt;
      if (t < Ft)
        throw new e("integer: negative integers are not allowed");
      let s = fn(t);
      if (Number.parseInt(s[0], 16) & 8 && (s = "00" + s), s.length & 1)
        throw new e("unexpected DER parsing assertion: unpadded hex");
      return s;
    },
    decode(t) {
      const { Err: e } = qt;
      if (t[0] & 128)
        throw new e("invalid signature integer: negative");
      if (t[0] === 0 && !(t[1] & 128))
        throw new e("invalid signature integer: unnecessary leading zero");
      return Ms(t);
    }
  },
  toSig(t) {
    const { Err: e, _int: s, _tlv: r } = qt, n = Qe("signature", t), { v: i, l: o } = r.decode(48, n);
    if (o.length)
      throw new e("invalid signature: left bytes after parsing");
    const { v: a, l: c } = r.decode(2, i), { v: l, l: u } = r.decode(2, c);
    if (u.length)
      throw new e("invalid signature: left bytes after parsing");
    return { r: s.decode(a), s: s.decode(l) };
  },
  hexFromSig(t) {
    const { _tlv: e, _int: s } = qt, r = e.encode(2, s.encode(t.r)), n = e.encode(2, s.encode(t.s)), i = r + n;
    return e.encode(48, i);
  }
};
function Wi(t, e) {
  return Hr(Qr(t, e));
}
const Ft = BigInt(0), be = BigInt(1);
BigInt(2);
const Gi = BigInt(3), t0 = BigInt(4);
function s0(t) {
  const e = Qw(t), { Fp: s } = e, r = Pa(e.n, e.nBitLength), n = e.toBytes || ((E, D, $) => {
    const R = D.toAffine();
    return Kn(Uint8Array.from([4]), s.toBytes(R.x), s.toBytes(R.y));
  }), i = e.fromBytes || ((E) => {
    const D = E.subarray(1), $ = s.fromBytes(D.subarray(0, s.BYTES)), R = s.fromBytes(D.subarray(s.BYTES, 2 * s.BYTES));
    return { x: $, y: R };
  });
  function o(E) {
    const { a: D, b: $ } = e, R = s.sqr(E), B = s.mul(R, E);
    return s.add(s.add(B, s.mul(E, D)), $);
  }
  function a(E, D) {
    const $ = s.sqr(D), R = o(E);
    return s.eql($, R);
  }
  if (!a(e.Gx, e.Gy))
    throw new Error("bad curve params: generator point");
  const c = s.mul(s.pow(e.a, Gi), t0), l = s.mul(s.sqr(e.b), BigInt(27));
  if (s.is0(s.add(c, l)))
    throw new Error("bad curve params: a or b");
  function u(E) {
    return Aa(E, be, e.n);
  }
  function h(E) {
    const { allowedPrivateKeyLengths: D, nByteLength: $, wrapPrivateKey: R, n: B } = e;
    if (D && typeof E != "bigint") {
      if (Jr(E) && (E = Hr(E)), typeof E != "string" || !D.includes(E.length))
        throw new Error("invalid private key");
      E = E.padStart($ * 2, "0");
    }
    let C;
    try {
      C = typeof E == "bigint" ? E : Ms(Qe("private key", E, $));
    } catch {
      throw new Error("invalid private key, expected hex or " + $ + " bytes, got " + typeof E);
    }
    return R && (C = ke(C, B)), cr("private key", C, be, B), C;
  }
  function f(E) {
    if (!(E instanceof w))
      throw new Error("ProjectivePoint expected");
  }
  const d = Hc((E, D) => {
    const { px: $, py: R, pz: B } = E;
    if (s.eql(B, s.ONE))
      return { x: $, y: R };
    const C = E.is0();
    D == null && (D = C ? s.ONE : s.inv(B));
    const O = s.mul($, D), z = s.mul(R, D), M = s.mul(B, D);
    if (C)
      return { x: s.ZERO, y: s.ZERO };
    if (!s.eql(M, s.ONE))
      throw new Error("invZ was invalid");
    return { x: O, y: z };
  }), g = Hc((E) => {
    if (E.is0()) {
      if (e.allowInfinityPoint && !s.is0(E.py))
        return;
      throw new Error("bad point: ZERO");
    }
    const { x: D, y: $ } = E.toAffine();
    if (!s.isValid(D) || !s.isValid($))
      throw new Error("bad point: x or y not FE");
    if (!a(D, $))
      throw new Error("bad point: equation left != right");
    if (!E.isTorsionFree())
      throw new Error("bad point: not in prime-order subgroup");
    return !0;
  });
  class w {
    constructor(D, $, R) {
      if (D == null || !s.isValid(D))
        throw new Error("x required");
      if ($ == null || !s.isValid($) || s.is0($))
        throw new Error("y required");
      if (R == null || !s.isValid(R))
        throw new Error("z required");
      this.px = D, this.py = $, this.pz = R, Object.freeze(this);
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(D) {
      const { x: $, y: R } = D || {};
      if (!D || !s.isValid($) || !s.isValid(R))
        throw new Error("invalid affine point");
      if (D instanceof w)
        throw new Error("projective point not allowed");
      const B = (C) => s.eql(C, s.ZERO);
      return B($) && B(R) ? w.ZERO : new w($, R, s.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    /**
     * Takes a bunch of Projective Points but executes only one
     * inversion on all of them. Inversion is very slow operation,
     * so this improves performance massively.
     * Optimization: converts a list of projective points to a list of identical points with Z=1.
     */
    static normalizeZ(D) {
      const $ = Vu(s, D.map((R) => R.pz));
      return D.map((R, B) => R.toAffine($[B])).map(w.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(D) {
      const $ = w.fromAffine(i(Qe("pointHex", D)));
      return $.assertValidity(), $;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(D) {
      return w.BASE.multiply(h(D));
    }
    // Multiscalar Multiplication
    static msm(D, $) {
      return Jw(w, r, D, $);
    }
    // "Private method", don't use it directly
    _setWindowSize(D) {
      T.setWindowSize(this, D);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      g(this);
    }
    hasEvenY() {
      const { y: D } = this.toAffine();
      if (s.isOdd)
        return !s.isOdd(D);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(D) {
      f(D);
      const { px: $, py: R, pz: B } = this, { px: C, py: O, pz: z } = D, M = s.eql(s.mul($, z), s.mul(C, B)), N = s.eql(s.mul(R, z), s.mul(O, B));
      return M && N;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new w(this.px, s.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: D, b: $ } = e, R = s.mul($, Gi), { px: B, py: C, pz: O } = this;
      let z = s.ZERO, M = s.ZERO, N = s.ZERO, _ = s.mul(B, B), A = s.mul(C, C), p = s.mul(O, O), y = s.mul(B, C);
      return y = s.add(y, y), N = s.mul(B, O), N = s.add(N, N), z = s.mul(D, N), M = s.mul(R, p), M = s.add(z, M), z = s.sub(A, M), M = s.add(A, M), M = s.mul(z, M), z = s.mul(y, z), N = s.mul(R, N), p = s.mul(D, p), y = s.sub(_, p), y = s.mul(D, y), y = s.add(y, N), N = s.add(_, _), _ = s.add(N, _), _ = s.add(_, p), _ = s.mul(_, y), M = s.add(M, _), p = s.mul(C, O), p = s.add(p, p), _ = s.mul(p, y), z = s.sub(z, _), N = s.mul(p, A), N = s.add(N, N), N = s.add(N, N), new w(z, M, N);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(D) {
      f(D);
      const { px: $, py: R, pz: B } = this, { px: C, py: O, pz: z } = D;
      let M = s.ZERO, N = s.ZERO, _ = s.ZERO;
      const A = e.a, p = s.mul(e.b, Gi);
      let y = s.mul($, C), b = s.mul(R, O), I = s.mul(B, z), v = s.add($, R), x = s.add(C, O);
      v = s.mul(v, x), x = s.add(y, b), v = s.sub(v, x), x = s.add($, B);
      let P = s.add(C, z);
      return x = s.mul(x, P), P = s.add(y, I), x = s.sub(x, P), P = s.add(R, B), M = s.add(O, z), P = s.mul(P, M), M = s.add(b, I), P = s.sub(P, M), _ = s.mul(A, x), M = s.mul(p, I), _ = s.add(M, _), M = s.sub(b, _), _ = s.add(b, _), N = s.mul(M, _), b = s.add(y, y), b = s.add(b, y), I = s.mul(A, I), x = s.mul(p, x), b = s.add(b, I), I = s.sub(y, I), I = s.mul(A, I), x = s.add(x, I), y = s.mul(b, x), N = s.add(N, y), y = s.mul(P, x), M = s.mul(v, M), M = s.sub(M, y), y = s.mul(v, b), _ = s.mul(P, _), _ = s.add(_, y), new w(M, N, _);
    }
    subtract(D) {
      return this.add(D.negate());
    }
    is0() {
      return this.equals(w.ZERO);
    }
    wNAF(D) {
      return T.wNAFCached(this, D, w.normalizeZ);
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(D) {
      const { endo: $, n: R } = e;
      cr("scalar", D, Ft, R);
      const B = w.ZERO;
      if (D === Ft)
        return B;
      if (this.is0() || D === be)
        return this;
      if (!$ || T.hasPrecomputes(this))
        return T.wNAFCachedUnsafe(this, D, w.normalizeZ);
      let { k1neg: C, k1: O, k2neg: z, k2: M } = $.splitScalar(D), N = B, _ = B, A = this;
      for (; O > Ft || M > Ft; )
        O & be && (N = N.add(A)), M & be && (_ = _.add(A)), A = A.double(), O >>= be, M >>= be;
      return C && (N = N.negate()), z && (_ = _.negate()), _ = new w(s.mul(_.px, $.beta), _.py, _.pz), N.add(_);
    }
    /**
     * Constant time multiplication.
     * Uses wNAF method. Windowed method may be 10% faster,
     * but takes 2x longer to generate and consumes 2x memory.
     * Uses precomputes when available.
     * Uses endomorphism for Koblitz curves.
     * @param scalar by which the point would be multiplied
     * @returns New point
     */
    multiply(D) {
      const { endo: $, n: R } = e;
      cr("scalar", D, be, R);
      let B, C;
      if ($) {
        const { k1neg: O, k1: z, k2neg: M, k2: N } = $.splitScalar(D);
        let { p: _, f: A } = this.wNAF(z), { p, f: y } = this.wNAF(N);
        _ = T.constTimeNegate(O, _), p = T.constTimeNegate(M, p), p = new w(s.mul(p.px, $.beta), p.py, p.pz), B = _.add(p), C = A.add(y);
      } else {
        const { p: O, f: z } = this.wNAF(D);
        B = O, C = z;
      }
      return w.normalizeZ([B, C])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(D, $, R) {
      const B = w.BASE, C = (z, M) => M === Ft || M === be || !z.equals(B) ? z.multiplyUnsafe(M) : z.multiply(M), O = C(this, $).add(C(D, R));
      return O.is0() ? void 0 : O;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(D) {
      return d(this, D);
    }
    isTorsionFree() {
      const { h: D, isTorsionFree: $ } = e;
      if (D === be)
        return !0;
      if ($)
        return $(w, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: D, clearCofactor: $ } = e;
      return D === be ? this : $ ? $(w, this) : this.multiplyUnsafe(e.h);
    }
    toRawBytes(D = !0) {
      return Fr("isCompressed", D), this.assertValidity(), n(w, this, D);
    }
    toHex(D = !0) {
      return Fr("isCompressed", D), Hr(this.toRawBytes(D));
    }
  }
  w.BASE = new w(e.Gx, e.Gy, s.ONE), w.ZERO = new w(s.ZERO, s.ONE, s.ZERO);
  const { endo: m, nBitLength: S } = e, T = Xw(w, m ? Math.ceil(S / 2) : S);
  return {
    CURVE: e,
    ProjectivePoint: w,
    normPrivateKeyToScalar: h,
    weierstrassEquation: o,
    isWithinCurveOrder: u
  };
}
function r0(t) {
  const e = Ju(t);
  return vi(e, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...e });
}
function n0(t) {
  const e = r0(t), { Fp: s, n: r, nByteLength: n, nBitLength: i } = e, o = s.BYTES + 1, a = 2 * s.BYTES + 1;
  function c(p) {
    return ke(p, r);
  }
  function l(p) {
    return No(p, r);
  }
  const { ProjectivePoint: u, normPrivateKeyToScalar: h, weierstrassEquation: f, isWithinCurveOrder: d } = s0({
    ...e,
    toBytes(p, y, b) {
      const I = y.toAffine(), v = s.toBytes(I.x), x = Kn;
      return Fr("isCompressed", b), b ? x(Uint8Array.from([y.hasEvenY() ? 2 : 3]), v) : x(Uint8Array.from([4]), v, s.toBytes(I.y));
    },
    fromBytes(p) {
      const y = p.length, b = p[0], I = p.subarray(1);
      if (y === o && (b === 2 || b === 3)) {
        const v = Ms(I);
        if (!Aa(v, be, s.ORDER))
          throw new Error("Point is not on curve");
        const x = f(v);
        let P;
        try {
          P = s.sqrt(x);
        } catch (L) {
          const q = L instanceof Error ? ": " + L.message : "";
          throw new Error("Point is not on curve" + q);
        }
        const U = (P & be) === be;
        return (b & 1) === 1 !== U && (P = s.neg(P)), { x: v, y: P };
      } else if (y === a && b === 4) {
        const v = s.fromBytes(I.subarray(0, s.BYTES)), x = s.fromBytes(I.subarray(s.BYTES, 2 * s.BYTES));
        return { x: v, y: x };
      } else {
        const v = o, x = a;
        throw new Error("invalid Point, expected length of " + v + ", or uncompressed " + x + ", got " + y);
      }
    }
  });
  function g(p) {
    const y = r >> be;
    return p > y;
  }
  function w(p) {
    return g(p) ? c(-p) : p;
  }
  const m = (p, y, b) => Ms(p.slice(y, b));
  class S {
    constructor(y, b, I) {
      cr("r", y, be, r), cr("s", b, be, r), this.r = y, this.s = b, I != null && (this.recovery = I), Object.freeze(this);
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(y) {
      const b = n;
      return y = Qe("compactSignature", y, b * 2), new S(m(y, 0, b), m(y, b, 2 * b));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(y) {
      const { r: b, s: I } = qt.toSig(Qe("DER", y));
      return new S(b, I);
    }
    /**
     * @todo remove
     * @deprecated
     */
    assertValidity() {
    }
    addRecoveryBit(y) {
      return new S(this.r, this.s, y);
    }
    recoverPublicKey(y) {
      const { r: b, s: I, recovery: v } = this, x = B(Qe("msgHash", y));
      if (v == null || ![0, 1, 2, 3].includes(v))
        throw new Error("recovery id invalid");
      const P = v === 2 || v === 3 ? b + e.n : b;
      if (P >= s.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const U = v & 1 ? "03" : "02", F = u.fromHex(U + Wi(P, s.BYTES)), L = l(P), q = c(-x * L), K = c(I * L), W = u.BASE.multiplyAndAddUnsafe(F, q, K);
      if (!W)
        throw new Error("point at infinify");
      return W.assertValidity(), W;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return g(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new S(this.r, c(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return Hn(this.toDERHex());
    }
    toDERHex() {
      return qt.hexFromSig(this);
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return Hn(this.toCompactHex());
    }
    toCompactHex() {
      const y = n;
      return Wi(this.r, y) + Wi(this.s, y);
    }
  }
  const T = {
    isValidPrivateKey(p) {
      try {
        return h(p), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: h,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const p = Yu(e.n);
      return Gw(e.randomBytes(p), e.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(p = 8, y = u.BASE) {
      return y._setWindowSize(p), y.multiply(BigInt(3)), y;
    }
  };
  function E(p, y = !0) {
    return u.fromPrivateKey(p).toRawBytes(y);
  }
  function D(p) {
    if (typeof p == "bigint")
      return !1;
    if (p instanceof u)
      return !0;
    const b = Qe("key", p).length, I = s.BYTES, v = I + 1, x = 2 * I + 1;
    if (!(e.allowedPrivateKeyLengths || n === v))
      return b === v || b === x;
  }
  function $(p, y, b = !0) {
    if (D(p) === !0)
      throw new Error("first arg must be private key");
    if (D(y) === !1)
      throw new Error("second arg must be public key");
    return u.fromHex(y).multiply(h(p)).toRawBytes(b);
  }
  const R = e.bits2int || function(p) {
    if (p.length > 8192)
      throw new Error("input is too large");
    const y = Ms(p), b = p.length * 8 - i;
    return b > 0 ? y >> BigInt(b) : y;
  }, B = e.bits2int_modN || function(p) {
    return c(R(p));
  }, C = bi(i);
  function O(p) {
    return cr("num < 2^" + i, p, Ft, C), Qr(p, n);
  }
  function z(p, y, b = M) {
    if (["recovered", "canonical"].some((V) => V in b))
      throw new Error("sign() legacy options not supported");
    const { hash: I, randomBytes: v } = e;
    let { lowS: x, prehash: P, extraEntropy: U } = b;
    x == null && (x = !0), p = Qe("msgHash", p), el(b), P && (p = Qe("prehashed msgHash", I(p)));
    const F = B(p), L = h(y), q = [O(L), O(F)];
    if (U != null && U !== !1) {
      const V = U === !0 ? v(s.BYTES) : U;
      q.push(Qe("extraEntropy", V));
    }
    const K = Kn(...q), W = F;
    function Y(V) {
      const J = R(V);
      if (!d(J))
        return;
      const le = l(J), he = u.BASE.multiply(J).toAffine(), we = c(he.x);
      if (we === Ft)
        return;
      const nt = c(le * c(W + we * L));
      if (nt === Ft)
        return;
      let it = (he.x === we ? 0 : 2) | Number(he.y & be), hn = nt;
      return x && g(nt) && (hn = w(nt), it ^= 1), new S(we, hn, it);
    }
    return { seed: K, k2sig: Y };
  }
  const M = { lowS: e.lowS, prehash: !1 }, N = { lowS: e.lowS, prehash: !1 };
  function _(p, y, b = M) {
    const { seed: I, k2sig: v } = z(p, y, b), x = e;
    return sw(x.hash.outputLen, x.nByteLength, x.hmac)(I, v);
  }
  u.BASE._setWindowSize(8);
  function A(p, y, b, I = N) {
    const v = p;
    y = Qe("msgHash", y), b = Qe("publicKey", b);
    const { lowS: x, prehash: P, format: U } = I;
    if (el(I), "strict" in I)
      throw new Error("options.strict was renamed to lowS");
    if (U !== void 0 && U !== "compact" && U !== "der")
      throw new Error("format must be compact or der");
    const F = typeof v == "string" || Jr(v), L = !F && !U && typeof v == "object" && v !== null && typeof v.r == "bigint" && typeof v.s == "bigint";
    if (!F && !L)
      throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
    let q, K;
    try {
      if (L && (q = new S(v.r, v.s)), F) {
        try {
          U !== "compact" && (q = S.fromDER(v));
        } catch (it) {
          if (!(it instanceof qt.Err))
            throw it;
        }
        !q && U !== "der" && (q = S.fromCompact(v));
      }
      K = u.fromHex(b);
    } catch {
      return !1;
    }
    if (!q || x && q.hasHighS())
      return !1;
    P && (y = e.hash(y));
    const { r: W, s: Y } = q, V = B(y), J = l(Y), le = c(V * J), he = c(W * J), we = u.BASE.multiplyAndAddUnsafe(K, le, he)?.toAffine();
    return we ? c(we.x) === W : !1;
  }
  return {
    CURVE: e,
    getPublicKey: E,
    getSharedSecret: $,
    sign: _,
    verify: A,
    ProjectivePoint: u,
    Signature: S,
    utils: T
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function i0(t) {
  return {
    hash: t,
    hmac: (e, ...s) => en(t, e, jt(...s)),
    randomBytes: bs
  };
}
function o0(t, e) {
  const s = (r) => n0({ ...t, ...i0(r) });
  return { ...s(e), create: s };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Qu = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), tl = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), a0 = BigInt(0), c0 = BigInt(1), Mo = BigInt(2), sl = (t, e) => (t + e / Mo) / e;
function l0(t) {
  const e = Qu, s = BigInt(3), r = BigInt(6), n = BigInt(11), i = BigInt(22), o = BigInt(23), a = BigInt(44), c = BigInt(88), l = t * t * t % e, u = l * l * t % e, h = Ze(u, s, e) * u % e, f = Ze(h, s, e) * u % e, d = Ze(f, Mo, e) * l % e, g = Ze(d, n, e) * d % e, w = Ze(g, i, e) * g % e, m = Ze(w, a, e) * w % e, S = Ze(m, c, e) * m % e, T = Ze(S, a, e) * w % e, E = Ze(T, s, e) * u % e, D = Ze(E, o, e) * g % e, $ = Ze(D, r, e) * l % e, R = Ze($, Mo, e);
  if (!Lo.eql(Lo.sqr(R), t))
    throw new Error("Cannot find square root");
  return R;
}
const Lo = Pa(Qu, void 0, void 0, { sqrt: l0 }), h0 = o0({
  a: a0,
  b: BigInt(7),
  Fp: Lo,
  n: tl,
  Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
  Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
  h: BigInt(1),
  lowS: !0,
  // Allow only low-S signatures by default in sign() and verify()
  endo: {
    // Endomorphism, see above
    beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
    splitScalar: (t) => {
      const e = tl, s = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), r = -c0 * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), n = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = s, o = BigInt("0x100000000000000000000000000000000"), a = sl(i * t, e), c = sl(-r * t, e);
      let l = ke(t - a * s - c * n, e), u = ke(-a * r - c * i, e);
      const h = l > o, f = u > o;
      if (h && (l = e - l), f && (u = e - u), l > o || u > o)
        throw new Error("splitScalar: Endomorphism failed, k=" + t);
      return { k1neg: h, k1: l, k2neg: f, k2: u };
    }
  }
}, qs);
function u0(t) {
  if (t.length !== 130 && t.length !== 132)
    throw new d0({ signature: t });
  const e = BigInt(kt(t, 0, 32)), s = BigInt(kt(t, 32, 64)), r = (() => {
    const n = +`0x${t.slice(130)}`;
    if (!Number.isNaN(n))
      try {
        return f0(n);
      } catch {
        throw new p0({ value: n });
      }
  })();
  return typeof r > "u" ? {
    r: e,
    s
  } : {
    r: e,
    s,
    yParity: r
  };
}
function f0(t) {
  if (t === 0 || t === 27)
    return 0;
  if (t === 1 || t === 28)
    return 1;
  if (t >= 35)
    return t % 2 === 0 ? 1 : 0;
  throw new g0({ value: t });
}
class d0 extends oe {
  constructor({ signature: e }) {
    super(`Value \`${e}\` is an invalid signature size.`, {
      metaMessages: [
        "Expected: 64 bytes or 65 bytes.",
        `Received ${ms(Oa(e))} bytes.`
      ]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "Signature.InvalidSerializedSizeError"
    });
  }
}
class p0 extends oe {
  constructor({ value: e }) {
    super(`Value \`${e}\` is an invalid y-parity value. Y-parity must be 0 or 1.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "Signature.InvalidYParityError"
    });
  }
}
class g0 extends oe {
  constructor({ value: e }) {
    super(`Value \`${e}\` is an invalid v value. v must be 27, 28 or >=35.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "Signature.InvalidVError"
    });
  }
}
const y0 = /* @__PURE__ */ Uint8Array.from([
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  14,
  10,
  4,
  8,
  9,
  15,
  13,
  6,
  1,
  12,
  0,
  2,
  11,
  7,
  5,
  3,
  11,
  8,
  12,
  0,
  5,
  2,
  15,
  13,
  10,
  14,
  3,
  6,
  7,
  1,
  9,
  4,
  7,
  9,
  3,
  1,
  13,
  12,
  11,
  14,
  2,
  6,
  5,
  10,
  4,
  0,
  15,
  8,
  9,
  0,
  5,
  7,
  2,
  4,
  10,
  15,
  14,
  1,
  11,
  12,
  6,
  8,
  3,
  13,
  2,
  12,
  6,
  10,
  0,
  11,
  8,
  3,
  4,
  13,
  7,
  5,
  15,
  14,
  1,
  9,
  12,
  5,
  1,
  15,
  14,
  13,
  4,
  10,
  0,
  7,
  6,
  3,
  9,
  2,
  8,
  11,
  13,
  11,
  7,
  14,
  12,
  1,
  3,
  9,
  5,
  0,
  15,
  4,
  8,
  6,
  2,
  10,
  6,
  15,
  14,
  9,
  11,
  3,
  0,
  8,
  12,
  2,
  13,
  7,
  1,
  4,
  10,
  5,
  10,
  2,
  8,
  4,
  7,
  6,
  1,
  5,
  15,
  11,
  9,
  14,
  3,
  12,
  13,
  0,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  14,
  10,
  4,
  8,
  9,
  15,
  13,
  6,
  1,
  12,
  0,
  2,
  11,
  7,
  5,
  3,
  // Blake1, unused in others
  11,
  8,
  12,
  0,
  5,
  2,
  15,
  13,
  10,
  14,
  3,
  6,
  7,
  1,
  9,
  4,
  7,
  9,
  3,
  1,
  13,
  12,
  11,
  14,
  2,
  6,
  5,
  10,
  4,
  0,
  15,
  8,
  9,
  0,
  5,
  7,
  2,
  4,
  10,
  15,
  14,
  1,
  11,
  12,
  6,
  8,
  3,
  13,
  2,
  12,
  6,
  10,
  0,
  11,
  8,
  3,
  4,
  13,
  7,
  5,
  15,
  14,
  1,
  9
]), de = /* @__PURE__ */ Uint32Array.from([
  4089235720,
  1779033703,
  2227873595,
  3144134277,
  4271175723,
  1013904242,
  1595750129,
  2773480762,
  2917565137,
  1359893119,
  725511199,
  2600822924,
  4215389547,
  528734635,
  327033209,
  1541459225
]), H = /* @__PURE__ */ new Uint32Array(32);
function es(t, e, s, r, n, i) {
  const o = n[i], a = n[i + 1];
  let c = H[2 * t], l = H[2 * t + 1], u = H[2 * e], h = H[2 * e + 1], f = H[2 * s], d = H[2 * s + 1], g = H[2 * r], w = H[2 * r + 1], m = va(c, u, o);
  l = Ea(m, l, h, a), c = m | 0, { Dh: w, Dl: g } = { Dh: w ^ l, Dl: g ^ c }, { Dh: w, Dl: g } = { Dh: wy(w, g), Dl: my(w) }, { h: d, l: f } = ht(d, f, w, g), { Bh: h, Bl: u } = { Bh: h ^ d, Bl: u ^ f }, { Bh: h, Bl: u } = { Bh: cs(h, u, 24), Bl: ls(h, u, 24) }, H[2 * t] = c, H[2 * t + 1] = l, H[2 * e] = u, H[2 * e + 1] = h, H[2 * s] = f, H[2 * s + 1] = d, H[2 * r] = g, H[2 * r + 1] = w;
}
function ts(t, e, s, r, n, i) {
  const o = n[i], a = n[i + 1];
  let c = H[2 * t], l = H[2 * t + 1], u = H[2 * e], h = H[2 * e + 1], f = H[2 * s], d = H[2 * s + 1], g = H[2 * r], w = H[2 * r + 1], m = va(c, u, o);
  l = Ea(m, l, h, a), c = m | 0, { Dh: w, Dl: g } = { Dh: w ^ l, Dl: g ^ c }, { Dh: w, Dl: g } = { Dh: cs(w, g, 16), Dl: ls(w, g, 16) }, { h: d, l: f } = ht(d, f, w, g), { Bh: h, Bl: u } = { Bh: h ^ d, Bl: u ^ f }, { Bh: h, Bl: u } = { Bh: Tr(h, u, 63), Bl: Br(h, u, 63) }, H[2 * t] = c, H[2 * t + 1] = l, H[2 * e] = u, H[2 * e + 1] = h, H[2 * s] = f, H[2 * s + 1] = d, H[2 * r] = g, H[2 * r + 1] = w;
}
function w0(t, e = {}, s, r, n) {
  if (At(s), t < 0 || t > s)
    throw new Error("outputLen bigger than keyLen");
  const { key: i, salt: o, personalization: a } = e;
  if (i !== void 0 && (i.length < 1 || i.length > s))
    throw new Error("key length must be undefined or 1.." + s);
  if (o !== void 0 && o.length !== r)
    throw new Error("salt must be undefined or " + r);
  if (a !== void 0 && a.length !== n)
    throw new Error("personalization must be undefined or " + n);
}
class m0 extends wi {
  constructor(e, s) {
    super(), this.finished = !1, this.destroyed = !1, this.length = 0, this.pos = 0, At(e), At(s), this.blockLen = e, this.outputLen = s, this.buffer = new Uint8Array(e), this.buffer32 = jr(this.buffer);
  }
  update(e) {
    ws(this), e = pt(e), gt(e);
    const { blockLen: s, buffer: r, buffer32: n } = this, i = e.length, o = e.byteOffset, a = e.buffer;
    for (let c = 0; c < i; ) {
      this.pos === s && (hs(n), this.compress(n, 0, !1), hs(n), this.pos = 0);
      const l = Math.min(s - this.pos, i - c), u = o + c;
      if (l === s && !(u % 4) && c + l < i) {
        const h = new Uint32Array(a, u, Math.floor((i - c) / 4));
        hs(h);
        for (let f = 0; c + s < i; f += n.length, c += s)
          this.length += s, this.compress(h, f, !1);
        hs(h);
        continue;
      }
      r.set(e.subarray(c, c + l), this.pos), this.pos += l, this.length += l, c += l;
    }
    return this;
  }
  digestInto(e) {
    ws(this), xa(e, this);
    const { pos: s, buffer32: r } = this;
    this.finished = !0, rt(this.buffer.subarray(s)), hs(r), this.compress(r, 0, !0), hs(r);
    const n = jr(e);
    this.get().forEach((i, o) => n[o] = Mt(i));
  }
  digest() {
    const { buffer: e, outputLen: s } = this;
    this.digestInto(e);
    const r = e.slice(0, s);
    return this.destroy(), r;
  }
  _cloneInto(e) {
    const { buffer: s, length: r, finished: n, destroyed: i, outputLen: o, pos: a } = this;
    return e || (e = new this.constructor({ dkLen: o })), e.set(...this.get()), e.buffer.set(s), e.destroyed = i, e.finished = n, e.length = r, e.pos = a, e.outputLen = o, e;
  }
  clone() {
    return this._cloneInto();
  }
}
class b0 extends m0 {
  constructor(e = {}) {
    const s = e.dkLen === void 0 ? 64 : e.dkLen;
    super(128, s), this.v0l = de[0] | 0, this.v0h = de[1] | 0, this.v1l = de[2] | 0, this.v1h = de[3] | 0, this.v2l = de[4] | 0, this.v2h = de[5] | 0, this.v3l = de[6] | 0, this.v3h = de[7] | 0, this.v4l = de[8] | 0, this.v4h = de[9] | 0, this.v5l = de[10] | 0, this.v5h = de[11] | 0, this.v6l = de[12] | 0, this.v6h = de[13] | 0, this.v7l = de[14] | 0, this.v7h = de[15] | 0, w0(s, e, 64, 16, 16);
    let { key: r, personalization: n, salt: i } = e, o = 0;
    if (r !== void 0 && (r = pt(r), o = r.length), this.v0l ^= this.outputLen | o << 8 | 65536 | 1 << 24, i !== void 0) {
      i = pt(i);
      const a = jr(i);
      this.v4l ^= Mt(a[0]), this.v4h ^= Mt(a[1]), this.v5l ^= Mt(a[2]), this.v5h ^= Mt(a[3]);
    }
    if (n !== void 0) {
      n = pt(n);
      const a = jr(n);
      this.v6l ^= Mt(a[0]), this.v6h ^= Mt(a[1]), this.v7l ^= Mt(a[2]), this.v7h ^= Mt(a[3]);
    }
    if (r !== void 0) {
      const a = new Uint8Array(this.blockLen);
      a.set(r), this.update(a);
    }
  }
  // prettier-ignore
  get() {
    let { v0l: e, v0h: s, v1l: r, v1h: n, v2l: i, v2h: o, v3l: a, v3h: c, v4l: l, v4h: u, v5l: h, v5h: f, v6l: d, v6h: g, v7l: w, v7h: m } = this;
    return [e, s, r, n, i, o, a, c, l, u, h, f, d, g, w, m];
  }
  // prettier-ignore
  set(e, s, r, n, i, o, a, c, l, u, h, f, d, g, w, m) {
    this.v0l = e | 0, this.v0h = s | 0, this.v1l = r | 0, this.v1h = n | 0, this.v2l = i | 0, this.v2h = o | 0, this.v3l = a | 0, this.v3h = c | 0, this.v4l = l | 0, this.v4h = u | 0, this.v5l = h | 0, this.v5h = f | 0, this.v6l = d | 0, this.v6h = g | 0, this.v7l = w | 0, this.v7h = m | 0;
  }
  compress(e, s, r) {
    this.get().forEach((c, l) => H[l] = c), H.set(de, 16);
    let { h: n, l: i } = gu(BigInt(this.length));
    H[24] = de[8] ^ i, H[25] = de[9] ^ n, r && (H[28] = ~H[28], H[29] = ~H[29]);
    let o = 0;
    const a = y0;
    for (let c = 0; c < 12; c++)
      es(0, 4, 8, 12, e, s + 2 * a[o++]), ts(0, 4, 8, 12, e, s + 2 * a[o++]), es(1, 5, 9, 13, e, s + 2 * a[o++]), ts(1, 5, 9, 13, e, s + 2 * a[o++]), es(2, 6, 10, 14, e, s + 2 * a[o++]), ts(2, 6, 10, 14, e, s + 2 * a[o++]), es(3, 7, 11, 15, e, s + 2 * a[o++]), ts(3, 7, 11, 15, e, s + 2 * a[o++]), es(0, 5, 10, 15, e, s + 2 * a[o++]), ts(0, 5, 10, 15, e, s + 2 * a[o++]), es(1, 6, 11, 12, e, s + 2 * a[o++]), ts(1, 6, 11, 12, e, s + 2 * a[o++]), es(2, 7, 8, 13, e, s + 2 * a[o++]), ts(2, 7, 8, 13, e, s + 2 * a[o++]), es(3, 4, 9, 14, e, s + 2 * a[o++]), ts(3, 4, 9, 14, e, s + 2 * a[o++]);
    this.v0l ^= H[0] ^ H[16], this.v0h ^= H[1] ^ H[17], this.v1l ^= H[2] ^ H[18], this.v1h ^= H[3] ^ H[19], this.v2l ^= H[4] ^ H[20], this.v2h ^= H[5] ^ H[21], this.v3l ^= H[6] ^ H[22], this.v3h ^= H[7] ^ H[23], this.v4l ^= H[8] ^ H[24], this.v4h ^= H[9] ^ H[25], this.v5l ^= H[10] ^ H[26], this.v5h ^= H[11] ^ H[27], this.v6l ^= H[12] ^ H[28], this.v6h ^= H[13] ^ H[29], this.v7l ^= H[14] ^ H[30], this.v7h ^= H[15] ^ H[31], rt(H);
  }
  destroy() {
    this.destroyed = !0, rt(this.buffer32), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const v0 = /* @__PURE__ */ Py((t) => new b0(t));
/*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function ef(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function tf(t, e) {
  return Array.isArray(e) ? e.length === 0 ? !0 : t ? e.every((s) => typeof s == "string") : e.every((s) => Number.isSafeInteger(s)) : !1;
}
function Wn(t, e) {
  if (typeof e != "string")
    throw new Error(`${t}: string expected`);
  return !0;
}
function tn(t) {
  if (!Number.isSafeInteger(t))
    throw new Error(`invalid integer: ${t}`);
}
function Gn(t) {
  if (!Array.isArray(t))
    throw new Error("array expected");
}
function Yn(t, e) {
  if (!tf(!0, e))
    throw new Error(`${t}: array of strings expected`);
}
function sf(t, e) {
  if (!tf(!1, e))
    throw new Error(`${t}: array of numbers expected`);
}
// @__NO_SIDE_EFFECTS__
function rf(...t) {
  const e = (i) => i, s = (i, o) => (a) => i(o(a)), r = t.map((i) => i.encode).reduceRight(s, e), n = t.map((i) => i.decode).reduce(s, e);
  return { encode: r, decode: n };
}
// @__NO_SIDE_EFFECTS__
function nf(t) {
  const e = typeof t == "string" ? t.split("") : t, s = e.length;
  Yn("alphabet", e);
  const r = new Map(e.map((n, i) => [n, i]));
  return {
    encode: (n) => (Gn(n), n.map((i) => {
      if (!Number.isSafeInteger(i) || i < 0 || i >= s)
        throw new Error(`alphabet.encode: digit index outside alphabet "${i}". Allowed: ${t}`);
      return e[i];
    })),
    decode: (n) => (Gn(n), n.map((i) => {
      Wn("alphabet.decode", i);
      const o = r.get(i);
      if (o === void 0)
        throw new Error(`Unknown letter: "${i}". Allowed: ${t}`);
      return o;
    }))
  };
}
// @__NO_SIDE_EFFECTS__
function of(t = "") {
  return Wn("join", t), {
    encode: (e) => (Yn("join.decode", e), e.join(t)),
    decode: (e) => (Wn("join.decode", e), e.split(t))
  };
}
// @__NO_SIDE_EFFECTS__
function E0(t, e = "=") {
  return tn(t), Wn("padding", e), {
    encode(s) {
      for (Yn("padding.encode", s); s.length * t % 8; )
        s.push(e);
      return s;
    },
    decode(s) {
      Yn("padding.decode", s);
      let r = s.length;
      if (r * t % 8)
        throw new Error("padding: invalid, string should have whole number of bytes");
      for (; r > 0 && s[r - 1] === e; r--)
        if ((r - 1) * t % 8 === 0)
          throw new Error("padding: invalid, string has too much padding");
      return s.slice(0, r);
    }
  };
}
function rl(t, e, s) {
  if (e < 2)
    throw new Error(`convertRadix: invalid from=${e}, base cannot be less than 2`);
  if (s < 2)
    throw new Error(`convertRadix: invalid to=${s}, base cannot be less than 2`);
  if (Gn(t), !t.length)
    return [];
  let r = 0;
  const n = [], i = Array.from(t, (a) => {
    if (tn(a), a < 0 || a >= e)
      throw new Error(`invalid integer: ${a}`);
    return a;
  }), o = i.length;
  for (; ; ) {
    let a = 0, c = !0;
    for (let l = r; l < o; l++) {
      const u = i[l], h = e * a, f = h + u;
      if (!Number.isSafeInteger(f) || h / e !== a || f - u !== h)
        throw new Error("convertRadix: carry overflow");
      const d = f / s;
      a = f % s;
      const g = Math.floor(d);
      if (i[l] = g, !Number.isSafeInteger(g) || g * s + a !== f)
        throw new Error("convertRadix: carry overflow");
      if (c)
        g ? c = !1 : r = l;
      else continue;
    }
    if (n.push(a), c)
      break;
  }
  for (let a = 0; a < t.length - 1 && t[a] === 0; a++)
    n.push(0);
  return n.reverse();
}
const af = (t, e) => e === 0 ? t : af(e, t % e), Zn = /* @__NO_SIDE_EFFECTS__ */ (t, e) => t + (e - af(t, e)), Yi = /* @__PURE__ */ (() => {
  let t = [];
  for (let e = 0; e < 40; e++)
    t.push(2 ** e);
  return t;
})();
function nl(t, e, s, r) {
  if (Gn(t), e <= 0 || e > 32)
    throw new Error(`convertRadix2: wrong from=${e}`);
  if (s <= 0 || s > 32)
    throw new Error(`convertRadix2: wrong to=${s}`);
  if (/* @__PURE__ */ Zn(e, s) > 32)
    throw new Error(`convertRadix2: carry overflow from=${e} to=${s} carryBits=${/* @__PURE__ */ Zn(e, s)}`);
  let n = 0, i = 0;
  const o = Yi[e], a = Yi[s] - 1, c = [];
  for (const l of t) {
    if (tn(l), l >= o)
      throw new Error(`convertRadix2: invalid data word=${l} from=${e}`);
    if (n = n << e | l, i + e > 32)
      throw new Error(`convertRadix2: carry overflow pos=${i} from=${e}`);
    for (i += e; i >= s; i -= s)
      c.push((n >> i - s & a) >>> 0);
    const u = Yi[i];
    if (u === void 0)
      throw new Error("invalid carry");
    n &= u - 1;
  }
  if (n = n << s - i & a, !r && i >= e)
    throw new Error("Excess padding");
  if (!r && n > 0)
    throw new Error(`Non-zero padding: ${n}`);
  return r && i > 0 && c.push(n >>> 0), c;
}
// @__NO_SIDE_EFFECTS__
function x0(t) {
  tn(t);
  const e = 2 ** 8;
  return {
    encode: (s) => {
      if (!ef(s))
        throw new Error("radix.encode input should be Uint8Array");
      return rl(Array.from(s), e, t);
    },
    decode: (s) => (sf("radix.decode", s), Uint8Array.from(rl(s, t, e)))
  };
}
// @__NO_SIDE_EFFECTS__
function _0(t, e = !1) {
  if (tn(t), t <= 0 || t > 32)
    throw new Error("radix2: bits should be in (0..32]");
  if (/* @__PURE__ */ Zn(8, t) > 32 || /* @__PURE__ */ Zn(t, 8) > 32)
    throw new Error("radix2: carry overflow");
  return {
    encode: (s) => {
      if (!ef(s))
        throw new Error("radix2.encode input should be Uint8Array");
      return nl(Array.from(s), 8, t, !e);
    },
    decode: (s) => (sf("radix2.decode", s), Uint8Array.from(nl(s, t, 8, e)))
  };
}
const I0 = /* @__PURE__ */ rf(/* @__PURE__ */ _0(5), /* @__PURE__ */ nf("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), /* @__PURE__ */ E0(5), /* @__PURE__ */ of("")), S0 = /* @__NO_SIDE_EFFECTS__ */ (t) => /* @__PURE__ */ rf(/* @__PURE__ */ x0(58), /* @__PURE__ */ nf(t), /* @__PURE__ */ of("")), sn = /* @__PURE__ */ S0("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
function D0(t) {
  return Lw(A0(t));
}
function A0(t) {
  const { payload: e, signature: s } = t, { r, s: n, yParity: i } = s, a = new h0.Signature(BigInt(r), BigInt(n)).addRecoveryBit(i).recoverPublicKey(Oa(e).substring(2));
  return Ow(a);
}
/*! noble-ciphers - MIT License (c) 2023 Paul Miller (paulmillr.com) */
function cf(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function ko(t) {
  if (typeof t != "boolean")
    throw new Error(`boolean expected, not ${t}`);
}
function Zi(t) {
  if (!Number.isSafeInteger(t) || t < 0)
    throw new Error("positive integer expected, got " + t);
}
function qe(t, ...e) {
  if (!cf(t))
    throw new Error("Uint8Array expected");
  if (e.length > 0 && !e.includes(t.length))
    throw new Error("Uint8Array expected of length " + e + ", got length=" + t.length);
}
function il(t, e = !0) {
  if (t.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (e && t.finished)
    throw new Error("Hash#digest() has already been called");
}
function $0(t, e) {
  qe(t);
  const s = e.outputLen;
  if (t.length < s)
    throw new Error("digestInto() expects output buffer of length at least " + s);
}
function ps(t) {
  return new Uint32Array(t.buffer, t.byteOffset, Math.floor(t.byteLength / 4));
}
function dr(...t) {
  for (let e = 0; e < t.length; e++)
    t[e].fill(0);
}
function O0(t) {
  return new DataView(t.buffer, t.byteOffset, t.byteLength);
}
const P0 = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function T0(t) {
  if (typeof t != "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(t));
}
function qo(t) {
  if (typeof t == "string")
    t = T0(t);
  else if (cf(t))
    t = zo(t);
  else
    throw new Error("Uint8Array expected, got " + typeof t);
  return t;
}
function B0(t, e) {
  if (e == null || typeof e != "object")
    throw new Error("options must be defined");
  return Object.assign(t, e);
}
function R0(t, e) {
  if (t.length !== e.length)
    return !1;
  let s = 0;
  for (let r = 0; r < t.length; r++)
    s |= t[r] ^ e[r];
  return s === 0;
}
const C0 = /* @__NO_SIDE_EFFECTS__ */ (t, e) => {
  function s(r, ...n) {
    if (qe(r), !P0)
      throw new Error("Non little-endian hardware is not yet supported");
    if (t.nonceLength !== void 0) {
      const u = n[0];
      if (!u)
        throw new Error("nonce / iv required");
      t.varSizeNonce ? qe(u) : qe(u, t.nonceLength);
    }
    const i = t.tagLength;
    i && n[1] !== void 0 && qe(n[1]);
    const o = e(r, ...n), a = (u, h) => {
      if (h !== void 0) {
        if (u !== 2)
          throw new Error("cipher output not supported");
        qe(h);
      }
    };
    let c = !1;
    return {
      encrypt(u, h) {
        if (c)
          throw new Error("cannot encrypt() twice with same key + nonce");
        return c = !0, qe(u), a(o.encrypt.length, h), o.encrypt(u, h);
      },
      decrypt(u, h) {
        if (qe(u), i && u.length < i)
          throw new Error("invalid ciphertext length: smaller than tagLength=" + i);
        return a(o.decrypt.length, h), o.decrypt(u, h);
      }
    };
  }
  return Object.assign(s, t), s;
};
function ol(t, e, s = !0) {
  if (e === void 0)
    return new Uint8Array(t);
  if (e.length !== t)
    throw new Error("invalid output length, expected " + t + ", got: " + e.length);
  if (s && !U0(e))
    throw new Error("invalid output, must be aligned");
  return e;
}
function al(t, e, s, r) {
  if (typeof t.setBigUint64 == "function")
    return t.setBigUint64(e, s, r);
  const n = BigInt(32), i = BigInt(4294967295), o = Number(s >> n & i), a = Number(s & i), c = 4, l = 0;
  t.setUint32(e + c, o, r), t.setUint32(e + l, a, r);
}
function N0(t, e, s) {
  ko(s);
  const r = new Uint8Array(16), n = O0(r);
  return al(n, 0, BigInt(e), s), al(n, 8, BigInt(t), s), r;
}
function U0(t) {
  return t.byteOffset % 4 === 0;
}
function zo(t) {
  return Uint8Array.from(t);
}
function M0(t) {
  const e = t.length;
  let s = 0, r = 0;
  for (; r < e; ) {
    let n = t.charCodeAt(r++);
    if (n & 4294967168)
      if (!(n & 4294965248))
        s += 2;
      else {
        if (n >= 55296 && n <= 56319 && r < e) {
          const i = t.charCodeAt(r);
          (i & 64512) === 56320 && (++r, n = ((n & 1023) << 10) + (i & 1023) + 65536);
        }
        n & 4294901760 ? s += 4 : s += 3;
      }
    else {
      s++;
      continue;
    }
  }
  return s;
}
function L0(t, e, s) {
  const r = t.length;
  let n = s, i = 0;
  for (; i < r; ) {
    let o = t.charCodeAt(i++);
    if (o & 4294967168)
      if (!(o & 4294965248))
        e[n++] = o >> 6 & 31 | 192;
      else {
        if (o >= 55296 && o <= 56319 && i < r) {
          const a = t.charCodeAt(i);
          (a & 64512) === 56320 && (++i, o = ((o & 1023) << 10) + (a & 1023) + 65536);
        }
        o & 4294901760 ? (e[n++] = o >> 18 & 7 | 240, e[n++] = o >> 12 & 63 | 128, e[n++] = o >> 6 & 63 | 128) : (e[n++] = o >> 12 & 15 | 224, e[n++] = o >> 6 & 63 | 128);
      }
    else {
      e[n++] = o;
      continue;
    }
    e[n++] = o & 63 | 128;
  }
}
const k0 = new TextEncoder(), q0 = 50;
function z0(t, e, s) {
  k0.encodeInto(t, e.subarray(s));
}
function j0(t, e, s) {
  t.length > q0 ? z0(t, e, s) : L0(t, e, s);
}
const F0 = 4096;
function lf(t, e, s) {
  let r = e;
  const n = r + s, i = [];
  let o = "";
  for (; r < n; ) {
    const a = t[r++];
    if (!(a & 128))
      i.push(a);
    else if ((a & 224) === 192) {
      const c = t[r++] & 63;
      i.push((a & 31) << 6 | c);
    } else if ((a & 240) === 224) {
      const c = t[r++] & 63, l = t[r++] & 63;
      i.push((a & 31) << 12 | c << 6 | l);
    } else if ((a & 248) === 240) {
      const c = t[r++] & 63, l = t[r++] & 63, u = t[r++] & 63;
      let h = (a & 7) << 18 | c << 12 | l << 6 | u;
      h > 65535 && (h -= 65536, i.push(h >>> 10 & 1023 | 55296), h = 56320 | h & 1023), i.push(h);
    } else
      i.push(a);
    i.length >= F0 && (o += String.fromCharCode(...i), i.length = 0);
  }
  return i.length > 0 && (o += String.fromCharCode(...i)), o;
}
const H0 = new TextDecoder(), K0 = 200;
function V0(t, e, s) {
  const r = t.subarray(e, e + s);
  return H0.decode(r);
}
function W0(t, e, s) {
  return s > K0 ? V0(t, e, s) : lf(t, e, s);
}
class pn {
  constructor(e, s) {
    G(this, "type");
    G(this, "data");
    this.type = e, this.data = s;
  }
}
class Ke extends Error {
  constructor(e) {
    super(e);
    const s = Object.create(Ke.prototype);
    Object.setPrototypeOf(this, s), Object.defineProperty(this, "name", {
      configurable: !0,
      enumerable: !1,
      value: Ke.name
    });
  }
}
const xr = 4294967295;
function G0(t, e, s) {
  const r = s / 4294967296, n = s;
  t.setUint32(e, r), t.setUint32(e + 4, n);
}
function hf(t, e, s) {
  const r = Math.floor(s / 4294967296), n = s;
  t.setUint32(e, r), t.setUint32(e + 4, n);
}
function uf(t, e) {
  const s = t.getInt32(e), r = t.getUint32(e + 4);
  return s * 4294967296 + r;
}
function Y0(t, e) {
  const s = t.getUint32(e), r = t.getUint32(e + 4);
  return s * 4294967296 + r;
}
const Z0 = -1, X0 = 4294967296 - 1, J0 = 17179869184 - 1;
function Q0({ sec: t, nsec: e }) {
  if (t >= 0 && e >= 0 && t <= J0)
    if (e === 0 && t <= X0) {
      const s = new Uint8Array(4);
      return new DataView(s.buffer).setUint32(0, t), s;
    } else {
      const s = t / 4294967296, r = t & 4294967295, n = new Uint8Array(8), i = new DataView(n.buffer);
      return i.setUint32(0, e << 2 | s & 3), i.setUint32(4, r), n;
    }
  else {
    const s = new Uint8Array(12), r = new DataView(s.buffer);
    return r.setUint32(0, e), hf(r, 4, t), s;
  }
}
function em(t) {
  const e = t.getTime(), s = Math.floor(e / 1e3), r = (e - s * 1e3) * 1e6, n = Math.floor(r / 1e9);
  return {
    sec: s + n,
    nsec: r - n * 1e9
  };
}
function tm(t) {
  if (t instanceof Date) {
    const e = em(t);
    return Q0(e);
  } else
    return null;
}
function sm(t) {
  const e = new DataView(t.buffer, t.byteOffset, t.byteLength);
  switch (t.byteLength) {
    case 4:
      return { sec: e.getUint32(0), nsec: 0 };
    case 8: {
      const s = e.getUint32(0), r = e.getUint32(4), n = (s & 3) * 4294967296 + r, i = s >>> 2;
      return { sec: n, nsec: i };
    }
    case 12: {
      const s = uf(e, 4), r = e.getUint32(0);
      return { sec: s, nsec: r };
    }
    default:
      throw new Ke(`Unrecognized data size for timestamp (expected 4, 8, or 12): ${t.length}`);
  }
}
function rm(t) {
  const e = sm(t);
  return new Date(e.sec * 1e3 + e.nsec / 1e6);
}
const nm = {
  type: Z0,
  encode: tm,
  decode: rm
}, di = class di {
  constructor() {
    // ensures ExtensionCodecType<X> matches ExtensionCodec<X>
    // this will make type errors a lot more clear
    // eslint-disable-next-line @typescript-eslint/naming-convention
    G(this, "__brand");
    // built-in extensions
    G(this, "builtInEncoders", []);
    G(this, "builtInDecoders", []);
    // custom extensions
    G(this, "encoders", []);
    G(this, "decoders", []);
    this.register(nm);
  }
  register({ type: e, encode: s, decode: r }) {
    if (e >= 0)
      this.encoders[e] = s, this.decoders[e] = r;
    else {
      const n = -1 - e;
      this.builtInEncoders[n] = s, this.builtInDecoders[n] = r;
    }
  }
  tryToEncode(e, s) {
    for (let r = 0; r < this.builtInEncoders.length; r++) {
      const n = this.builtInEncoders[r];
      if (n != null) {
        const i = n(e, s);
        if (i != null) {
          const o = -1 - r;
          return new pn(o, i);
        }
      }
    }
    for (let r = 0; r < this.encoders.length; r++) {
      const n = this.encoders[r];
      if (n != null) {
        const i = n(e, s);
        if (i != null) {
          const o = r;
          return new pn(o, i);
        }
      }
    }
    return e instanceof pn ? e : null;
  }
  decode(e, s, r) {
    const n = s < 0 ? this.builtInDecoders[-1 - s] : this.decoders[s];
    return n ? n(e, s, r) : new pn(s, e);
  }
};
G(di, "defaultCodec", new di());
let Xn = di;
function im(t) {
  return t instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && t instanceof SharedArrayBuffer;
}
function jo(t) {
  return t instanceof Uint8Array ? t : ArrayBuffer.isView(t) ? new Uint8Array(t.buffer, t.byteOffset, t.byteLength) : im(t) ? new Uint8Array(t) : Uint8Array.from(t);
}
const om = 100, am = 2048;
let cm = class ff {
  constructor(e) {
    G(this, "extensionCodec");
    G(this, "context");
    G(this, "useBigInt64");
    G(this, "maxDepth");
    G(this, "initialBufferSize");
    G(this, "sortKeys");
    G(this, "forceFloat32");
    G(this, "ignoreUndefined");
    G(this, "forceIntegerToFloat");
    G(this, "pos");
    G(this, "view");
    G(this, "bytes");
    G(this, "entered", !1);
    this.extensionCodec = e?.extensionCodec ?? Xn.defaultCodec, this.context = e?.context, this.useBigInt64 = e?.useBigInt64 ?? !1, this.maxDepth = e?.maxDepth ?? om, this.initialBufferSize = e?.initialBufferSize ?? am, this.sortKeys = e?.sortKeys ?? !1, this.forceFloat32 = e?.forceFloat32 ?? !1, this.ignoreUndefined = e?.ignoreUndefined ?? !1, this.forceIntegerToFloat = e?.forceIntegerToFloat ?? !1, this.pos = 0, this.view = new DataView(new ArrayBuffer(this.initialBufferSize)), this.bytes = new Uint8Array(this.view.buffer);
  }
  clone() {
    return new ff({
      extensionCodec: this.extensionCodec,
      context: this.context,
      useBigInt64: this.useBigInt64,
      maxDepth: this.maxDepth,
      initialBufferSize: this.initialBufferSize,
      sortKeys: this.sortKeys,
      forceFloat32: this.forceFloat32,
      ignoreUndefined: this.ignoreUndefined,
      forceIntegerToFloat: this.forceIntegerToFloat
    });
  }
  reinitializeState() {
    this.pos = 0;
  }
  /**
   * This is almost equivalent to {@link Encoder#encode}, but it returns an reference of the encoder's internal buffer and thus much faster than {@link Encoder#encode}.
   *
   * @returns Encodes the object and returns a shared reference the encoder's internal buffer.
   */
  encodeSharedRef(e) {
    if (this.entered)
      return this.clone().encodeSharedRef(e);
    try {
      return this.entered = !0, this.reinitializeState(), this.doEncode(e, 1), this.bytes.subarray(0, this.pos);
    } finally {
      this.entered = !1;
    }
  }
  /**
   * @returns Encodes the object and returns a copy of the encoder's internal buffer.
   */
  encode(e) {
    if (this.entered)
      return this.clone().encode(e);
    try {
      return this.entered = !0, this.reinitializeState(), this.doEncode(e, 1), this.bytes.slice(0, this.pos);
    } finally {
      this.entered = !1;
    }
  }
  doEncode(e, s) {
    if (s > this.maxDepth)
      throw new Error(`Too deep objects in depth ${s}`);
    e == null ? this.encodeNil() : typeof e == "boolean" ? this.encodeBoolean(e) : typeof e == "number" ? this.forceIntegerToFloat ? this.encodeNumberAsFloat(e) : this.encodeNumber(e) : typeof e == "string" ? this.encodeString(e) : this.useBigInt64 && typeof e == "bigint" ? this.encodeBigInt64(e) : this.encodeObject(e, s);
  }
  ensureBufferSizeToWrite(e) {
    const s = this.pos + e;
    this.view.byteLength < s && this.resizeBuffer(s * 2);
  }
  resizeBuffer(e) {
    const s = new ArrayBuffer(e), r = new Uint8Array(s), n = new DataView(s);
    r.set(this.bytes), this.view = n, this.bytes = r;
  }
  encodeNil() {
    this.writeU8(192);
  }
  encodeBoolean(e) {
    e === !1 ? this.writeU8(194) : this.writeU8(195);
  }
  encodeNumber(e) {
    !this.forceIntegerToFloat && Number.isSafeInteger(e) ? e >= 0 ? e < 128 ? this.writeU8(e) : e < 256 ? (this.writeU8(204), this.writeU8(e)) : e < 65536 ? (this.writeU8(205), this.writeU16(e)) : e < 4294967296 ? (this.writeU8(206), this.writeU32(e)) : this.useBigInt64 ? this.encodeNumberAsFloat(e) : (this.writeU8(207), this.writeU64(e)) : e >= -32 ? this.writeU8(224 | e + 32) : e >= -128 ? (this.writeU8(208), this.writeI8(e)) : e >= -32768 ? (this.writeU8(209), this.writeI16(e)) : e >= -2147483648 ? (this.writeU8(210), this.writeI32(e)) : this.useBigInt64 ? this.encodeNumberAsFloat(e) : (this.writeU8(211), this.writeI64(e)) : this.encodeNumberAsFloat(e);
  }
  encodeNumberAsFloat(e) {
    this.forceFloat32 ? (this.writeU8(202), this.writeF32(e)) : (this.writeU8(203), this.writeF64(e));
  }
  encodeBigInt64(e) {
    e >= BigInt(0) ? (this.writeU8(207), this.writeBigUint64(e)) : (this.writeU8(211), this.writeBigInt64(e));
  }
  writeStringHeader(e) {
    if (e < 32)
      this.writeU8(160 + e);
    else if (e < 256)
      this.writeU8(217), this.writeU8(e);
    else if (e < 65536)
      this.writeU8(218), this.writeU16(e);
    else if (e < 4294967296)
      this.writeU8(219), this.writeU32(e);
    else
      throw new Error(`Too long string: ${e} bytes in UTF-8`);
  }
  encodeString(e) {
    const r = M0(e);
    this.ensureBufferSizeToWrite(5 + r), this.writeStringHeader(r), j0(e, this.bytes, this.pos), this.pos += r;
  }
  encodeObject(e, s) {
    const r = this.extensionCodec.tryToEncode(e, this.context);
    if (r != null)
      this.encodeExtension(r);
    else if (Array.isArray(e))
      this.encodeArray(e, s);
    else if (ArrayBuffer.isView(e))
      this.encodeBinary(e);
    else if (typeof e == "object")
      this.encodeMap(e, s);
    else
      throw new Error(`Unrecognized object: ${Object.prototype.toString.apply(e)}`);
  }
  encodeBinary(e) {
    const s = e.byteLength;
    if (s < 256)
      this.writeU8(196), this.writeU8(s);
    else if (s < 65536)
      this.writeU8(197), this.writeU16(s);
    else if (s < 4294967296)
      this.writeU8(198), this.writeU32(s);
    else
      throw new Error(`Too large binary: ${s}`);
    const r = jo(e);
    this.writeU8a(r);
  }
  encodeArray(e, s) {
    const r = e.length;
    if (r < 16)
      this.writeU8(144 + r);
    else if (r < 65536)
      this.writeU8(220), this.writeU16(r);
    else if (r < 4294967296)
      this.writeU8(221), this.writeU32(r);
    else
      throw new Error(`Too large array: ${r}`);
    for (const n of e)
      this.doEncode(n, s + 1);
  }
  countWithoutUndefined(e, s) {
    let r = 0;
    for (const n of s)
      e[n] !== void 0 && r++;
    return r;
  }
  encodeMap(e, s) {
    const r = Object.keys(e);
    this.sortKeys && r.sort();
    const n = this.ignoreUndefined ? this.countWithoutUndefined(e, r) : r.length;
    if (n < 16)
      this.writeU8(128 + n);
    else if (n < 65536)
      this.writeU8(222), this.writeU16(n);
    else if (n < 4294967296)
      this.writeU8(223), this.writeU32(n);
    else
      throw new Error(`Too large map object: ${n}`);
    for (const i of r) {
      const o = e[i];
      this.ignoreUndefined && o === void 0 || (this.encodeString(i), this.doEncode(o, s + 1));
    }
  }
  encodeExtension(e) {
    if (typeof e.data == "function") {
      const r = e.data(this.pos + 6), n = r.length;
      if (n >= 4294967296)
        throw new Error(`Too large extension object: ${n}`);
      this.writeU8(201), this.writeU32(n), this.writeI8(e.type), this.writeU8a(r);
      return;
    }
    const s = e.data.length;
    if (s === 1)
      this.writeU8(212);
    else if (s === 2)
      this.writeU8(213);
    else if (s === 4)
      this.writeU8(214);
    else if (s === 8)
      this.writeU8(215);
    else if (s === 16)
      this.writeU8(216);
    else if (s < 256)
      this.writeU8(199), this.writeU8(s);
    else if (s < 65536)
      this.writeU8(200), this.writeU16(s);
    else if (s < 4294967296)
      this.writeU8(201), this.writeU32(s);
    else
      throw new Error(`Too large extension object: ${s}`);
    this.writeI8(e.type), this.writeU8a(e.data);
  }
  writeU8(e) {
    this.ensureBufferSizeToWrite(1), this.view.setUint8(this.pos, e), this.pos++;
  }
  writeU8a(e) {
    const s = e.length;
    this.ensureBufferSizeToWrite(s), this.bytes.set(e, this.pos), this.pos += s;
  }
  writeI8(e) {
    this.ensureBufferSizeToWrite(1), this.view.setInt8(this.pos, e), this.pos++;
  }
  writeU16(e) {
    this.ensureBufferSizeToWrite(2), this.view.setUint16(this.pos, e), this.pos += 2;
  }
  writeI16(e) {
    this.ensureBufferSizeToWrite(2), this.view.setInt16(this.pos, e), this.pos += 2;
  }
  writeU32(e) {
    this.ensureBufferSizeToWrite(4), this.view.setUint32(this.pos, e), this.pos += 4;
  }
  writeI32(e) {
    this.ensureBufferSizeToWrite(4), this.view.setInt32(this.pos, e), this.pos += 4;
  }
  writeF32(e) {
    this.ensureBufferSizeToWrite(4), this.view.setFloat32(this.pos, e), this.pos += 4;
  }
  writeF64(e) {
    this.ensureBufferSizeToWrite(8), this.view.setFloat64(this.pos, e), this.pos += 8;
  }
  writeU64(e) {
    this.ensureBufferSizeToWrite(8), G0(this.view, this.pos, e), this.pos += 8;
  }
  writeI64(e) {
    this.ensureBufferSizeToWrite(8), hf(this.view, this.pos, e), this.pos += 8;
  }
  writeBigUint64(e) {
    this.ensureBufferSizeToWrite(8), this.view.setBigUint64(this.pos, e), this.pos += 8;
  }
  writeBigInt64(e) {
    this.ensureBufferSizeToWrite(8), this.view.setBigInt64(this.pos, e), this.pos += 8;
  }
};
function lm(t, e) {
  return new cm(e).encodeSharedRef(t);
}
function Xi(t) {
  return `${t < 0 ? "-" : ""}0x${Math.abs(t).toString(16).padStart(2, "0")}`;
}
const hm = 16, um = 16;
class fm {
  constructor(e = hm, s = um) {
    G(this, "hit", 0);
    G(this, "miss", 0);
    G(this, "caches");
    G(this, "maxKeyLength");
    G(this, "maxLengthPerKey");
    this.maxKeyLength = e, this.maxLengthPerKey = s, this.caches = [];
    for (let r = 0; r < this.maxKeyLength; r++)
      this.caches.push([]);
  }
  canBeCached(e) {
    return e > 0 && e <= this.maxKeyLength;
  }
  find(e, s, r) {
    const n = this.caches[r - 1];
    e: for (const i of n) {
      const o = i.bytes;
      for (let a = 0; a < r; a++)
        if (o[a] !== e[s + a])
          continue e;
      return i.str;
    }
    return null;
  }
  store(e, s) {
    const r = this.caches[e.length - 1], n = { bytes: e, str: s };
    r.length >= this.maxLengthPerKey ? r[Math.random() * r.length | 0] = n : r.push(n);
  }
  decode(e, s, r) {
    const n = this.find(e, s, r);
    if (n != null)
      return this.hit++, n;
    this.miss++;
    const i = lf(e, s, r), o = Uint8Array.prototype.slice.call(e, s, s + r);
    return this.store(o, i), i;
  }
}
const Fo = "array", Nr = "map_key", df = "map_value", dm = (t) => {
  if (typeof t == "string" || typeof t == "number")
    return t;
  throw new Ke("The type of key must be string or number but " + typeof t);
};
class pm {
  constructor() {
    G(this, "stack", []);
    G(this, "stackHeadPosition", -1);
  }
  get length() {
    return this.stackHeadPosition + 1;
  }
  top() {
    return this.stack[this.stackHeadPosition];
  }
  pushArrayState(e) {
    const s = this.getUninitializedStateFromPool();
    s.type = Fo, s.position = 0, s.size = e, s.array = new Array(e);
  }
  pushMapState(e) {
    const s = this.getUninitializedStateFromPool();
    s.type = Nr, s.readCount = 0, s.size = e, s.map = {};
  }
  getUninitializedStateFromPool() {
    if (this.stackHeadPosition++, this.stackHeadPosition === this.stack.length) {
      const e = {
        type: void 0,
        size: 0,
        array: void 0,
        position: 0,
        readCount: 0,
        map: void 0,
        key: null
      };
      this.stack.push(e);
    }
    return this.stack[this.stackHeadPosition];
  }
  release(e) {
    if (this.stack[this.stackHeadPosition] !== e)
      throw new Error("Invalid stack state. Released state is not on top of the stack.");
    if (e.type === Fo) {
      const r = e;
      r.size = 0, r.array = void 0, r.position = 0, r.type = void 0;
    }
    if (e.type === Nr || e.type === df) {
      const r = e;
      r.size = 0, r.map = void 0, r.readCount = 0, r.type = void 0;
    }
    this.stackHeadPosition--;
  }
  reset() {
    this.stack.length = 0, this.stackHeadPosition = -1;
  }
}
const _r = -1, Ta = new DataView(new ArrayBuffer(0)), gm = new Uint8Array(Ta.buffer);
try {
  Ta.getInt8(0);
} catch (t) {
  if (!(t instanceof RangeError))
    throw new Error("This module is not supported in the current JavaScript engine because DataView does not throw RangeError on out-of-bounds access");
}
const cl = new RangeError("Insufficient data"), ym = new fm();
let wm = class pf {
  constructor(e) {
    G(this, "extensionCodec");
    G(this, "context");
    G(this, "useBigInt64");
    G(this, "rawStrings");
    G(this, "maxStrLength");
    G(this, "maxBinLength");
    G(this, "maxArrayLength");
    G(this, "maxMapLength");
    G(this, "maxExtLength");
    G(this, "keyDecoder");
    G(this, "mapKeyConverter");
    G(this, "totalPos", 0);
    G(this, "pos", 0);
    G(this, "view", Ta);
    G(this, "bytes", gm);
    G(this, "headByte", _r);
    G(this, "stack", new pm());
    G(this, "entered", !1);
    this.extensionCodec = e?.extensionCodec ?? Xn.defaultCodec, this.context = e?.context, this.useBigInt64 = e?.useBigInt64 ?? !1, this.rawStrings = e?.rawStrings ?? !1, this.maxStrLength = e?.maxStrLength ?? xr, this.maxBinLength = e?.maxBinLength ?? xr, this.maxArrayLength = e?.maxArrayLength ?? xr, this.maxMapLength = e?.maxMapLength ?? xr, this.maxExtLength = e?.maxExtLength ?? xr, this.keyDecoder = e?.keyDecoder !== void 0 ? e.keyDecoder : ym, this.mapKeyConverter = e?.mapKeyConverter ?? dm;
  }
  clone() {
    return new pf({
      extensionCodec: this.extensionCodec,
      context: this.context,
      useBigInt64: this.useBigInt64,
      rawStrings: this.rawStrings,
      maxStrLength: this.maxStrLength,
      maxBinLength: this.maxBinLength,
      maxArrayLength: this.maxArrayLength,
      maxMapLength: this.maxMapLength,
      maxExtLength: this.maxExtLength,
      keyDecoder: this.keyDecoder
    });
  }
  reinitializeState() {
    this.totalPos = 0, this.headByte = _r, this.stack.reset();
  }
  setBuffer(e) {
    const s = jo(e);
    this.bytes = s, this.view = new DataView(s.buffer, s.byteOffset, s.byteLength), this.pos = 0;
  }
  appendBuffer(e) {
    if (this.headByte === _r && !this.hasRemaining(1))
      this.setBuffer(e);
    else {
      const s = this.bytes.subarray(this.pos), r = jo(e), n = new Uint8Array(s.length + r.length);
      n.set(s), n.set(r, s.length), this.setBuffer(n);
    }
  }
  hasRemaining(e) {
    return this.view.byteLength - this.pos >= e;
  }
  createExtraByteError(e) {
    const { view: s, pos: r } = this;
    return new RangeError(`Extra ${s.byteLength - r} of ${s.byteLength} byte(s) found at buffer[${e}]`);
  }
  /**
   * @throws {@link DecodeError}
   * @throws {@link RangeError}
   */
  decode(e) {
    if (this.entered)
      return this.clone().decode(e);
    try {
      this.entered = !0, this.reinitializeState(), this.setBuffer(e);
      const s = this.doDecodeSync();
      if (this.hasRemaining(1))
        throw this.createExtraByteError(this.pos);
      return s;
    } finally {
      this.entered = !1;
    }
  }
  *decodeMulti(e) {
    if (this.entered) {
      yield* this.clone().decodeMulti(e);
      return;
    }
    try {
      for (this.entered = !0, this.reinitializeState(), this.setBuffer(e); this.hasRemaining(1); )
        yield this.doDecodeSync();
    } finally {
      this.entered = !1;
    }
  }
  async decodeAsync(e) {
    if (this.entered)
      return this.clone().decodeAsync(e);
    try {
      this.entered = !0;
      let s = !1, r;
      for await (const a of e) {
        if (s)
          throw this.entered = !1, this.createExtraByteError(this.totalPos);
        this.appendBuffer(a);
        try {
          r = this.doDecodeSync(), s = !0;
        } catch (c) {
          if (!(c instanceof RangeError))
            throw c;
        }
        this.totalPos += this.pos;
      }
      if (s) {
        if (this.hasRemaining(1))
          throw this.createExtraByteError(this.totalPos);
        return r;
      }
      const { headByte: n, pos: i, totalPos: o } = this;
      throw new RangeError(`Insufficient data in parsing ${Xi(n)} at ${o} (${i} in the current buffer)`);
    } finally {
      this.entered = !1;
    }
  }
  decodeArrayStream(e) {
    return this.decodeMultiAsync(e, !0);
  }
  decodeStream(e) {
    return this.decodeMultiAsync(e, !1);
  }
  async *decodeMultiAsync(e, s) {
    if (this.entered) {
      yield* this.clone().decodeMultiAsync(e, s);
      return;
    }
    try {
      this.entered = !0;
      let r = s, n = -1;
      for await (const i of e) {
        if (s && n === 0)
          throw this.createExtraByteError(this.totalPos);
        this.appendBuffer(i), r && (n = this.readArraySize(), r = !1, this.complete());
        try {
          for (; yield this.doDecodeSync(), --n !== 0; )
            ;
        } catch (o) {
          if (!(o instanceof RangeError))
            throw o;
        }
        this.totalPos += this.pos;
      }
    } finally {
      this.entered = !1;
    }
  }
  doDecodeSync() {
    e: for (; ; ) {
      const e = this.readHeadByte();
      let s;
      if (e >= 224)
        s = e - 256;
      else if (e < 192)
        if (e < 128)
          s = e;
        else if (e < 144) {
          const n = e - 128;
          if (n !== 0) {
            this.pushMapState(n), this.complete();
            continue e;
          } else
            s = {};
        } else if (e < 160) {
          const n = e - 144;
          if (n !== 0) {
            this.pushArrayState(n), this.complete();
            continue e;
          } else
            s = [];
        } else {
          const n = e - 160;
          s = this.decodeString(n, 0);
        }
      else if (e === 192)
        s = null;
      else if (e === 194)
        s = !1;
      else if (e === 195)
        s = !0;
      else if (e === 202)
        s = this.readF32();
      else if (e === 203)
        s = this.readF64();
      else if (e === 204)
        s = this.readU8();
      else if (e === 205)
        s = this.readU16();
      else if (e === 206)
        s = this.readU32();
      else if (e === 207)
        this.useBigInt64 ? s = this.readU64AsBigInt() : s = this.readU64();
      else if (e === 208)
        s = this.readI8();
      else if (e === 209)
        s = this.readI16();
      else if (e === 210)
        s = this.readI32();
      else if (e === 211)
        this.useBigInt64 ? s = this.readI64AsBigInt() : s = this.readI64();
      else if (e === 217) {
        const n = this.lookU8();
        s = this.decodeString(n, 1);
      } else if (e === 218) {
        const n = this.lookU16();
        s = this.decodeString(n, 2);
      } else if (e === 219) {
        const n = this.lookU32();
        s = this.decodeString(n, 4);
      } else if (e === 220) {
        const n = this.readU16();
        if (n !== 0) {
          this.pushArrayState(n), this.complete();
          continue e;
        } else
          s = [];
      } else if (e === 221) {
        const n = this.readU32();
        if (n !== 0) {
          this.pushArrayState(n), this.complete();
          continue e;
        } else
          s = [];
      } else if (e === 222) {
        const n = this.readU16();
        if (n !== 0) {
          this.pushMapState(n), this.complete();
          continue e;
        } else
          s = {};
      } else if (e === 223) {
        const n = this.readU32();
        if (n !== 0) {
          this.pushMapState(n), this.complete();
          continue e;
        } else
          s = {};
      } else if (e === 196) {
        const n = this.lookU8();
        s = this.decodeBinary(n, 1);
      } else if (e === 197) {
        const n = this.lookU16();
        s = this.decodeBinary(n, 2);
      } else if (e === 198) {
        const n = this.lookU32();
        s = this.decodeBinary(n, 4);
      } else if (e === 212)
        s = this.decodeExtension(1, 0);
      else if (e === 213)
        s = this.decodeExtension(2, 0);
      else if (e === 214)
        s = this.decodeExtension(4, 0);
      else if (e === 215)
        s = this.decodeExtension(8, 0);
      else if (e === 216)
        s = this.decodeExtension(16, 0);
      else if (e === 199) {
        const n = this.lookU8();
        s = this.decodeExtension(n, 1);
      } else if (e === 200) {
        const n = this.lookU16();
        s = this.decodeExtension(n, 2);
      } else if (e === 201) {
        const n = this.lookU32();
        s = this.decodeExtension(n, 4);
      } else
        throw new Ke(`Unrecognized type byte: ${Xi(e)}`);
      this.complete();
      const r = this.stack;
      for (; r.length > 0; ) {
        const n = r.top();
        if (n.type === Fo)
          if (n.array[n.position] = s, n.position++, n.position === n.size)
            s = n.array, r.release(n);
          else
            continue e;
        else if (n.type === Nr) {
          if (s === "__proto__")
            throw new Ke("The key __proto__ is not allowed");
          n.key = this.mapKeyConverter(s), n.type = df;
          continue e;
        } else if (n.map[n.key] = s, n.readCount++, n.readCount === n.size)
          s = n.map, r.release(n);
        else {
          n.key = null, n.type = Nr;
          continue e;
        }
      }
      return s;
    }
  }
  readHeadByte() {
    return this.headByte === _r && (this.headByte = this.readU8()), this.headByte;
  }
  complete() {
    this.headByte = _r;
  }
  readArraySize() {
    const e = this.readHeadByte();
    switch (e) {
      case 220:
        return this.readU16();
      case 221:
        return this.readU32();
      default: {
        if (e < 160)
          return e - 144;
        throw new Ke(`Unrecognized array type byte: ${Xi(e)}`);
      }
    }
  }
  pushMapState(e) {
    if (e > this.maxMapLength)
      throw new Ke(`Max length exceeded: map length (${e}) > maxMapLengthLength (${this.maxMapLength})`);
    this.stack.pushMapState(e);
  }
  pushArrayState(e) {
    if (e > this.maxArrayLength)
      throw new Ke(`Max length exceeded: array length (${e}) > maxArrayLength (${this.maxArrayLength})`);
    this.stack.pushArrayState(e);
  }
  decodeString(e, s) {
    return !this.rawStrings || this.stateIsMapKey() ? this.decodeUtf8String(e, s) : this.decodeBinary(e, s);
  }
  /**
   * @throws {@link RangeError}
   */
  decodeUtf8String(e, s) {
    if (e > this.maxStrLength)
      throw new Ke(`Max length exceeded: UTF-8 byte length (${e}) > maxStrLength (${this.maxStrLength})`);
    if (this.bytes.byteLength < this.pos + s + e)
      throw cl;
    const r = this.pos + s;
    let n;
    return this.stateIsMapKey() && this.keyDecoder?.canBeCached(e) ? n = this.keyDecoder.decode(this.bytes, r, e) : n = W0(this.bytes, r, e), this.pos += s + e, n;
  }
  stateIsMapKey() {
    return this.stack.length > 0 ? this.stack.top().type === Nr : !1;
  }
  /**
   * @throws {@link RangeError}
   */
  decodeBinary(e, s) {
    if (e > this.maxBinLength)
      throw new Ke(`Max length exceeded: bin length (${e}) > maxBinLength (${this.maxBinLength})`);
    if (!this.hasRemaining(e + s))
      throw cl;
    const r = this.pos + s, n = this.bytes.subarray(r, r + e);
    return this.pos += s + e, n;
  }
  decodeExtension(e, s) {
    if (e > this.maxExtLength)
      throw new Ke(`Max length exceeded: ext length (${e}) > maxExtLength (${this.maxExtLength})`);
    const r = this.view.getInt8(this.pos + s), n = this.decodeBinary(
      e,
      s + 1
      /* extType */
    );
    return this.extensionCodec.decode(n, r, this.context);
  }
  lookU8() {
    return this.view.getUint8(this.pos);
  }
  lookU16() {
    return this.view.getUint16(this.pos);
  }
  lookU32() {
    return this.view.getUint32(this.pos);
  }
  readU8() {
    const e = this.view.getUint8(this.pos);
    return this.pos++, e;
  }
  readI8() {
    const e = this.view.getInt8(this.pos);
    return this.pos++, e;
  }
  readU16() {
    const e = this.view.getUint16(this.pos);
    return this.pos += 2, e;
  }
  readI16() {
    const e = this.view.getInt16(this.pos);
    return this.pos += 2, e;
  }
  readU32() {
    const e = this.view.getUint32(this.pos);
    return this.pos += 4, e;
  }
  readI32() {
    const e = this.view.getInt32(this.pos);
    return this.pos += 4, e;
  }
  readU64() {
    const e = Y0(this.view, this.pos);
    return this.pos += 8, e;
  }
  readI64() {
    const e = uf(this.view, this.pos);
    return this.pos += 8, e;
  }
  readU64AsBigInt() {
    const e = this.view.getBigUint64(this.pos);
    return this.pos += 8, e;
  }
  readI64AsBigInt() {
    const e = this.view.getBigInt64(this.pos);
    return this.pos += 8, e;
  }
  readF32() {
    const e = this.view.getFloat32(this.pos);
    return this.pos += 4, e;
  }
  readF64() {
    const e = this.view.getFloat64(this.pos);
    return this.pos += 8, e;
  }
};
function mm(t, e) {
  return new wm(e).decode(t);
}
function Ba(t) {
  return globalThis.Buffer != null ? new Uint8Array(t.buffer, t.byteOffset, t.byteLength) : t;
}
function gf(t = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? Ba(globalThis.Buffer.allocUnsafe(t)) : new Uint8Array(t);
}
function Vt(t, e) {
  e || (e = t.reduce((n, i) => n + i.length, 0));
  const s = gf(e);
  let r = 0;
  for (const n of t)
    s.set(n, r), r += n.length;
  return Ba(s);
}
function bm(t, e) {
  if (t.length >= 255)
    throw new TypeError("Alphabet too long");
  for (var s = new Uint8Array(256), r = 0; r < s.length; r++)
    s[r] = 255;
  for (var n = 0; n < t.length; n++) {
    var i = t.charAt(n), o = i.charCodeAt(0);
    if (s[o] !== 255)
      throw new TypeError(i + " is ambiguous");
    s[o] = n;
  }
  var a = t.length, c = t.charAt(0), l = Math.log(a) / Math.log(256), u = Math.log(256) / Math.log(a);
  function h(g) {
    if (g instanceof Uint8Array || (ArrayBuffer.isView(g) ? g = new Uint8Array(g.buffer, g.byteOffset, g.byteLength) : Array.isArray(g) && (g = Uint8Array.from(g))), !(g instanceof Uint8Array))
      throw new TypeError("Expected Uint8Array");
    if (g.length === 0)
      return "";
    for (var w = 0, m = 0, S = 0, T = g.length; S !== T && g[S] === 0; )
      S++, w++;
    for (var E = (T - S) * u + 1 >>> 0, D = new Uint8Array(E); S !== T; ) {
      for (var $ = g[S], R = 0, B = E - 1; ($ !== 0 || R < m) && B !== -1; B--, R++)
        $ += 256 * D[B] >>> 0, D[B] = $ % a >>> 0, $ = $ / a >>> 0;
      if ($ !== 0)
        throw new Error("Non-zero carry");
      m = R, S++;
    }
    for (var C = E - m; C !== E && D[C] === 0; )
      C++;
    for (var O = c.repeat(w); C < E; ++C)
      O += t.charAt(D[C]);
    return O;
  }
  function f(g) {
    if (typeof g != "string")
      throw new TypeError("Expected String");
    if (g.length === 0)
      return new Uint8Array();
    var w = 0;
    if (g[w] !== " ") {
      for (var m = 0, S = 0; g[w] === c; )
        m++, w++;
      for (var T = (g.length - w) * l + 1 >>> 0, E = new Uint8Array(T); g[w]; ) {
        var D = s[g.charCodeAt(w)];
        if (D === 255)
          return;
        for (var $ = 0, R = T - 1; (D !== 0 || $ < S) && R !== -1; R--, $++)
          D += a * E[R] >>> 0, E[R] = D % 256 >>> 0, D = D / 256 >>> 0;
        if (D !== 0)
          throw new Error("Non-zero carry");
        S = $, w++;
      }
      if (g[w] !== " ") {
        for (var B = T - S; B !== T && E[B] === 0; )
          B++;
        for (var C = new Uint8Array(m + (T - B)), O = m; B !== T; )
          C[O++] = E[B++];
        return C;
      }
    }
  }
  function d(g) {
    var w = f(g);
    if (w)
      return w;
    throw new Error(`Non-${e} character`);
  }
  return {
    encode: h,
    decodeUnsafe: f,
    decode: d
  };
}
var vm = bm, Em = vm;
const xm = (t) => {
  if (t instanceof Uint8Array && t.constructor.name === "Uint8Array")
    return t;
  if (t instanceof ArrayBuffer)
    return new Uint8Array(t);
  if (ArrayBuffer.isView(t))
    return new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
  throw new Error("Unknown type, must be binary type");
}, _m = (t) => new TextEncoder().encode(t), Im = (t) => new TextDecoder().decode(t);
class Sm {
  constructor(e, s, r) {
    this.name = e, this.prefix = s, this.baseEncode = r;
  }
  encode(e) {
    if (e instanceof Uint8Array)
      return `${this.prefix}${this.baseEncode(e)}`;
    throw Error("Unknown type, must be binary type");
  }
}
class Dm {
  constructor(e, s, r) {
    if (this.name = e, this.prefix = s, s.codePointAt(0) === void 0)
      throw new Error("Invalid prefix character");
    this.prefixCodePoint = s.codePointAt(0), this.baseDecode = r;
  }
  decode(e) {
    if (typeof e == "string") {
      if (e.codePointAt(0) !== this.prefixCodePoint)
        throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(e.slice(this.prefix.length));
    } else
      throw Error("Can only multibase decode strings");
  }
  or(e) {
    return yf(this, e);
  }
}
class Am {
  constructor(e) {
    this.decoders = e;
  }
  or(e) {
    return yf(this, e);
  }
  decode(e) {
    const s = e[0], r = this.decoders[s];
    if (r)
      return r.decode(e);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
}
const yf = (t, e) => new Am({
  ...t.decoders || { [t.prefix]: t },
  ...e.decoders || { [e.prefix]: e }
});
class $m {
  constructor(e, s, r, n) {
    this.name = e, this.prefix = s, this.baseEncode = r, this.baseDecode = n, this.encoder = new Sm(e, s, r), this.decoder = new Dm(e, s, n);
  }
  encode(e) {
    return this.encoder.encode(e);
  }
  decode(e) {
    return this.decoder.decode(e);
  }
}
const Ei = ({ name: t, prefix: e, encode: s, decode: r }) => new $m(t, e, s, r), rn = ({ prefix: t, name: e, alphabet: s }) => {
  const { encode: r, decode: n } = Em(s, e);
  return Ei({
    prefix: t,
    name: e,
    encode: r,
    decode: (i) => xm(n(i))
  });
}, Om = (t, e, s, r) => {
  const n = {};
  for (let u = 0; u < e.length; ++u)
    n[e[u]] = u;
  let i = t.length;
  for (; t[i - 1] === "="; )
    --i;
  const o = new Uint8Array(i * s / 8 | 0);
  let a = 0, c = 0, l = 0;
  for (let u = 0; u < i; ++u) {
    const h = n[t[u]];
    if (h === void 0)
      throw new SyntaxError(`Non-${r} character`);
    c = c << s | h, a += s, a >= 8 && (a -= 8, o[l++] = 255 & c >> a);
  }
  if (a >= s || 255 & c << 8 - a)
    throw new SyntaxError("Unexpected end of data");
  return o;
}, Pm = (t, e, s) => {
  const r = e[e.length - 1] === "=", n = (1 << s) - 1;
  let i = "", o = 0, a = 0;
  for (let c = 0; c < t.length; ++c)
    for (a = a << 8 | t[c], o += 8; o > s; )
      o -= s, i += e[n & a >> o];
  if (o && (i += e[n & a << s - o]), r)
    for (; i.length * s & 7; )
      i += "=";
  return i;
}, Se = ({ name: t, prefix: e, bitsPerChar: s, alphabet: r }) => Ei({
  prefix: e,
  name: t,
  encode(n) {
    return Pm(n, r, s);
  },
  decode(n) {
    return Om(n, r, s, t);
  }
}), Tm = Ei({
  prefix: "\0",
  name: "identity",
  encode: (t) => Im(t),
  decode: (t) => _m(t)
}), Bm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  identity: Tm
}, Symbol.toStringTag, { value: "Module" })), Rm = Se({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
}), Cm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base2: Rm
}, Symbol.toStringTag, { value: "Module" })), Nm = Se({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
}), Um = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base8: Nm
}, Symbol.toStringTag, { value: "Module" })), Mm = rn({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
}), Lm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base10: Mm
}, Symbol.toStringTag, { value: "Module" })), km = Se({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
}), qm = Se({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
}), zm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base16: km,
  base16upper: qm
}, Symbol.toStringTag, { value: "Module" })), jm = Se({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
}), Fm = Se({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
}), Hm = Se({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
}), Km = Se({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
}), Vm = Se({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
}), Wm = Se({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
}), Gm = Se({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
}), Ym = Se({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
}), Zm = Se({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
}), Xm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base32: jm,
  base32hex: Vm,
  base32hexpad: Gm,
  base32hexpadupper: Ym,
  base32hexupper: Wm,
  base32pad: Hm,
  base32padupper: Km,
  base32upper: Fm,
  base32z: Zm
}, Symbol.toStringTag, { value: "Module" })), Jm = rn({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
}), Qm = rn({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
}), eb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base36: Jm,
  base36upper: Qm
}, Symbol.toStringTag, { value: "Module" })), tb = rn({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
}), sb = rn({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
}), rb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base58btc: tb,
  base58flickr: sb
}, Symbol.toStringTag, { value: "Module" })), nb = Se({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
}), ib = Se({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
}), ob = Se({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
}), ab = Se({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
}), cb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base64: nb,
  base64pad: ib,
  base64url: ob,
  base64urlpad: ab
}, Symbol.toStringTag, { value: "Module" })), wf = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂"), lb = wf.reduce((t, e, s) => (t[s] = e, t), []), hb = wf.reduce((t, e, s) => (t[e.codePointAt(0)] = s, t), []);
function ub(t) {
  return t.reduce((e, s) => (e += lb[s], e), "");
}
function fb(t) {
  const e = [];
  for (const s of t) {
    const r = hb[s.codePointAt(0)];
    if (r === void 0)
      throw new Error(`Non-base256emoji character: ${s}`);
    e.push(r);
  }
  return new Uint8Array(e);
}
const db = Ei({
  prefix: "🚀",
  name: "base256emoji",
  encode: ub,
  decode: fb
}), pb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base256emoji: db
}, Symbol.toStringTag, { value: "Module" }));
new TextEncoder();
new TextDecoder();
const ll = {
  ...Bm,
  ...Cm,
  ...Um,
  ...Lm,
  ...zm,
  ...Xm,
  ...eb,
  ...rb,
  ...cb,
  ...pb
};
function mf(t, e, s, r) {
  return {
    name: t,
    prefix: e,
    encoder: {
      name: t,
      prefix: e,
      encode: s
    },
    decoder: { decode: r }
  };
}
const hl = mf("utf8", "u", (t) => "u" + new TextDecoder("utf8").decode(t), (t) => new TextEncoder().encode(t.substring(1))), Ji = mf("ascii", "a", (t) => {
  let e = "a";
  for (let s = 0; s < t.length; s++)
    e += String.fromCharCode(t[s]);
  return e;
}, (t) => {
  t = t.substring(1);
  const e = gf(t.length);
  for (let s = 0; s < t.length; s++)
    e[s] = t.charCodeAt(s);
  return e;
}), bf = {
  utf8: hl,
  "utf-8": hl,
  hex: ll.base16,
  latin1: Ji,
  ascii: Ji,
  binary: Ji,
  ...ll
};
function Re(t, e = "utf8") {
  const s = bf[e];
  if (!s)
    throw new Error(`Unsupported encoding "${e}"`);
  return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? Ba(globalThis.Buffer.from(t, "utf-8")) : s.decoder.decode(`${s.prefix}${t}`);
}
function ye(t, e = "utf8") {
  const s = bf[e];
  if (!s)
    throw new Error(`Unsupported encoding "${e}"`);
  return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(t.buffer, t.byteOffset, t.byteLength).toString("utf8") : s.encoder.encode(t).substring(1);
}
const vf = (t) => Uint8Array.from(t.split("").map((e) => e.charCodeAt(0))), gb = vf("expand 16-byte k"), yb = vf("expand 32-byte k"), wb = ps(gb), mb = ps(yb);
function Q(t, e) {
  return t << e | t >>> 32 - e;
}
function Ho(t) {
  return t.byteOffset % 4 === 0;
}
const gn = 64, bb = 16, Ef = 2 ** 32 - 1, ul = new Uint32Array();
function vb(t, e, s, r, n, i, o, a) {
  const c = n.length, l = new Uint8Array(gn), u = ps(l), h = Ho(n) && Ho(i), f = h ? ps(n) : ul, d = h ? ps(i) : ul;
  for (let g = 0; g < c; o++) {
    if (t(e, s, r, u, o, a), o >= Ef)
      throw new Error("arx: counter overflow");
    const w = Math.min(gn, c - g);
    if (h && w === gn) {
      const m = g / 4;
      if (g % 4 !== 0)
        throw new Error("arx: invalid block position");
      for (let S = 0, T; S < bb; S++)
        T = m + S, d[T] = f[T] ^ u[S];
      g += gn;
      continue;
    }
    for (let m = 0, S; m < w; m++)
      S = g + m, i[S] = n[S] ^ l[m];
    g += w;
  }
}
function Eb(t, e) {
  const { allowShortKeys: s, extendNonceFn: r, counterLength: n, counterRight: i, rounds: o } = B0({ allowShortKeys: !1, counterLength: 8, counterRight: !1, rounds: 20 }, e);
  if (typeof t != "function")
    throw new Error("core must be a function");
  return Zi(n), Zi(o), ko(i), ko(s), (a, c, l, u, h = 0) => {
    qe(a), qe(c), qe(l);
    const f = l.length;
    if (u === void 0 && (u = new Uint8Array(f)), qe(u), Zi(h), h < 0 || h >= Ef)
      throw new Error("arx: counter overflow");
    if (u.length < f)
      throw new Error(`arx: output (${u.length}) is shorter than data (${f})`);
    const d = [];
    let g = a.length, w, m;
    if (g === 32)
      d.push(w = zo(a)), m = mb;
    else if (g === 16 && s)
      w = new Uint8Array(32), w.set(a), w.set(a, 16), m = wb, d.push(w);
    else
      throw new Error(`arx: invalid 32-byte key, got length=${g}`);
    Ho(c) || d.push(c = zo(c));
    const S = ps(w);
    if (r) {
      if (c.length !== 24)
        throw new Error("arx: extended nonce must be 24 bytes");
      r(m, S, ps(c.subarray(0, 16)), S), c = c.subarray(16);
    }
    const T = 16 - n;
    if (T !== c.length)
      throw new Error(`arx: nonce must be ${T} or 16 bytes`);
    if (T !== 12) {
      const D = new Uint8Array(12);
      D.set(c, i ? 0 : 12 - c.length), c = D, d.push(c);
    }
    const E = ps(c);
    return vb(t, m, S, E, l, u, h, o), dr(...d), u;
  };
}
const Ee = (t, e) => t[e++] & 255 | (t[e++] & 255) << 8;
class xb {
  constructor(e) {
    this.blockLen = 16, this.outputLen = 16, this.buffer = new Uint8Array(16), this.r = new Uint16Array(10), this.h = new Uint16Array(10), this.pad = new Uint16Array(8), this.pos = 0, this.finished = !1, e = qo(e), qe(e, 32);
    const s = Ee(e, 0), r = Ee(e, 2), n = Ee(e, 4), i = Ee(e, 6), o = Ee(e, 8), a = Ee(e, 10), c = Ee(e, 12), l = Ee(e, 14);
    this.r[0] = s & 8191, this.r[1] = (s >>> 13 | r << 3) & 8191, this.r[2] = (r >>> 10 | n << 6) & 7939, this.r[3] = (n >>> 7 | i << 9) & 8191, this.r[4] = (i >>> 4 | o << 12) & 255, this.r[5] = o >>> 1 & 8190, this.r[6] = (o >>> 14 | a << 2) & 8191, this.r[7] = (a >>> 11 | c << 5) & 8065, this.r[8] = (c >>> 8 | l << 8) & 8191, this.r[9] = l >>> 5 & 127;
    for (let u = 0; u < 8; u++)
      this.pad[u] = Ee(e, 16 + 2 * u);
  }
  process(e, s, r = !1) {
    const n = r ? 0 : 2048, { h: i, r: o } = this, a = o[0], c = o[1], l = o[2], u = o[3], h = o[4], f = o[5], d = o[6], g = o[7], w = o[8], m = o[9], S = Ee(e, s + 0), T = Ee(e, s + 2), E = Ee(e, s + 4), D = Ee(e, s + 6), $ = Ee(e, s + 8), R = Ee(e, s + 10), B = Ee(e, s + 12), C = Ee(e, s + 14);
    let O = i[0] + (S & 8191), z = i[1] + ((S >>> 13 | T << 3) & 8191), M = i[2] + ((T >>> 10 | E << 6) & 8191), N = i[3] + ((E >>> 7 | D << 9) & 8191), _ = i[4] + ((D >>> 4 | $ << 12) & 8191), A = i[5] + ($ >>> 1 & 8191), p = i[6] + (($ >>> 14 | R << 2) & 8191), y = i[7] + ((R >>> 11 | B << 5) & 8191), b = i[8] + ((B >>> 8 | C << 8) & 8191), I = i[9] + (C >>> 5 | n), v = 0, x = v + O * a + z * (5 * m) + M * (5 * w) + N * (5 * g) + _ * (5 * d);
    v = x >>> 13, x &= 8191, x += A * (5 * f) + p * (5 * h) + y * (5 * u) + b * (5 * l) + I * (5 * c), v += x >>> 13, x &= 8191;
    let P = v + O * c + z * a + M * (5 * m) + N * (5 * w) + _ * (5 * g);
    v = P >>> 13, P &= 8191, P += A * (5 * d) + p * (5 * f) + y * (5 * h) + b * (5 * u) + I * (5 * l), v += P >>> 13, P &= 8191;
    let U = v + O * l + z * c + M * a + N * (5 * m) + _ * (5 * w);
    v = U >>> 13, U &= 8191, U += A * (5 * g) + p * (5 * d) + y * (5 * f) + b * (5 * h) + I * (5 * u), v += U >>> 13, U &= 8191;
    let F = v + O * u + z * l + M * c + N * a + _ * (5 * m);
    v = F >>> 13, F &= 8191, F += A * (5 * w) + p * (5 * g) + y * (5 * d) + b * (5 * f) + I * (5 * h), v += F >>> 13, F &= 8191;
    let L = v + O * h + z * u + M * l + N * c + _ * a;
    v = L >>> 13, L &= 8191, L += A * (5 * m) + p * (5 * w) + y * (5 * g) + b * (5 * d) + I * (5 * f), v += L >>> 13, L &= 8191;
    let q = v + O * f + z * h + M * u + N * l + _ * c;
    v = q >>> 13, q &= 8191, q += A * a + p * (5 * m) + y * (5 * w) + b * (5 * g) + I * (5 * d), v += q >>> 13, q &= 8191;
    let K = v + O * d + z * f + M * h + N * u + _ * l;
    v = K >>> 13, K &= 8191, K += A * c + p * a + y * (5 * m) + b * (5 * w) + I * (5 * g), v += K >>> 13, K &= 8191;
    let W = v + O * g + z * d + M * f + N * h + _ * u;
    v = W >>> 13, W &= 8191, W += A * l + p * c + y * a + b * (5 * m) + I * (5 * w), v += W >>> 13, W &= 8191;
    let Y = v + O * w + z * g + M * d + N * f + _ * h;
    v = Y >>> 13, Y &= 8191, Y += A * u + p * l + y * c + b * a + I * (5 * m), v += Y >>> 13, Y &= 8191;
    let V = v + O * m + z * w + M * g + N * d + _ * f;
    v = V >>> 13, V &= 8191, V += A * h + p * u + y * l + b * c + I * a, v += V >>> 13, V &= 8191, v = (v << 2) + v | 0, v = v + x | 0, x = v & 8191, v = v >>> 13, P += v, i[0] = x, i[1] = P, i[2] = U, i[3] = F, i[4] = L, i[5] = q, i[6] = K, i[7] = W, i[8] = Y, i[9] = V;
  }
  finalize() {
    const { h: e, pad: s } = this, r = new Uint16Array(10);
    let n = e[1] >>> 13;
    e[1] &= 8191;
    for (let a = 2; a < 10; a++)
      e[a] += n, n = e[a] >>> 13, e[a] &= 8191;
    e[0] += n * 5, n = e[0] >>> 13, e[0] &= 8191, e[1] += n, n = e[1] >>> 13, e[1] &= 8191, e[2] += n, r[0] = e[0] + 5, n = r[0] >>> 13, r[0] &= 8191;
    for (let a = 1; a < 10; a++)
      r[a] = e[a] + n, n = r[a] >>> 13, r[a] &= 8191;
    r[9] -= 8192;
    let i = (n ^ 1) - 1;
    for (let a = 0; a < 10; a++)
      r[a] &= i;
    i = ~i;
    for (let a = 0; a < 10; a++)
      e[a] = e[a] & i | r[a];
    e[0] = (e[0] | e[1] << 13) & 65535, e[1] = (e[1] >>> 3 | e[2] << 10) & 65535, e[2] = (e[2] >>> 6 | e[3] << 7) & 65535, e[3] = (e[3] >>> 9 | e[4] << 4) & 65535, e[4] = (e[4] >>> 12 | e[5] << 1 | e[6] << 14) & 65535, e[5] = (e[6] >>> 2 | e[7] << 11) & 65535, e[6] = (e[7] >>> 5 | e[8] << 8) & 65535, e[7] = (e[8] >>> 8 | e[9] << 5) & 65535;
    let o = e[0] + s[0];
    e[0] = o & 65535;
    for (let a = 1; a < 8; a++)
      o = (e[a] + s[a] | 0) + (o >>> 16) | 0, e[a] = o & 65535;
    dr(r);
  }
  update(e) {
    il(this), e = qo(e), qe(e);
    const { buffer: s, blockLen: r } = this, n = e.length;
    for (let i = 0; i < n; ) {
      const o = Math.min(r - this.pos, n - i);
      if (o === r) {
        for (; r <= n - i; i += r)
          this.process(e, i);
        continue;
      }
      s.set(e.subarray(i, i + o), this.pos), this.pos += o, i += o, this.pos === r && (this.process(s, 0, !1), this.pos = 0);
    }
    return this;
  }
  destroy() {
    dr(this.h, this.r, this.buffer, this.pad);
  }
  digestInto(e) {
    il(this), $0(e, this), this.finished = !0;
    const { buffer: s, h: r } = this;
    let { pos: n } = this;
    if (n) {
      for (s[n++] = 1; n < 16; n++)
        s[n] = 0;
      this.process(s, 0, !0);
    }
    this.finalize();
    let i = 0;
    for (let o = 0; o < 8; o++)
      e[i++] = r[o] >>> 0, e[i++] = r[o] >>> 8;
    return e;
  }
  digest() {
    const { buffer: e, outputLen: s } = this;
    this.digestInto(e);
    const r = e.slice(0, s);
    return this.destroy(), r;
  }
}
function _b(t) {
  const e = (r, n) => t(n).update(qo(r)).digest(), s = t(new Uint8Array(32));
  return e.outputLen = s.outputLen, e.blockLen = s.blockLen, e.create = (r) => t(r), e;
}
const Ib = _b((t) => new xb(t));
function Sb(t, e, s, r, n, i = 20) {
  let o = t[0], a = t[1], c = t[2], l = t[3], u = e[0], h = e[1], f = e[2], d = e[3], g = e[4], w = e[5], m = e[6], S = e[7], T = n, E = s[0], D = s[1], $ = s[2], R = o, B = a, C = c, O = l, z = u, M = h, N = f, _ = d, A = g, p = w, y = m, b = S, I = T, v = E, x = D, P = $;
  for (let F = 0; F < i; F += 2)
    R = R + z | 0, I = Q(I ^ R, 16), A = A + I | 0, z = Q(z ^ A, 12), R = R + z | 0, I = Q(I ^ R, 8), A = A + I | 0, z = Q(z ^ A, 7), B = B + M | 0, v = Q(v ^ B, 16), p = p + v | 0, M = Q(M ^ p, 12), B = B + M | 0, v = Q(v ^ B, 8), p = p + v | 0, M = Q(M ^ p, 7), C = C + N | 0, x = Q(x ^ C, 16), y = y + x | 0, N = Q(N ^ y, 12), C = C + N | 0, x = Q(x ^ C, 8), y = y + x | 0, N = Q(N ^ y, 7), O = O + _ | 0, P = Q(P ^ O, 16), b = b + P | 0, _ = Q(_ ^ b, 12), O = O + _ | 0, P = Q(P ^ O, 8), b = b + P | 0, _ = Q(_ ^ b, 7), R = R + M | 0, P = Q(P ^ R, 16), y = y + P | 0, M = Q(M ^ y, 12), R = R + M | 0, P = Q(P ^ R, 8), y = y + P | 0, M = Q(M ^ y, 7), B = B + N | 0, I = Q(I ^ B, 16), b = b + I | 0, N = Q(N ^ b, 12), B = B + N | 0, I = Q(I ^ B, 8), b = b + I | 0, N = Q(N ^ b, 7), C = C + _ | 0, v = Q(v ^ C, 16), A = A + v | 0, _ = Q(_ ^ A, 12), C = C + _ | 0, v = Q(v ^ C, 8), A = A + v | 0, _ = Q(_ ^ A, 7), O = O + z | 0, x = Q(x ^ O, 16), p = p + x | 0, z = Q(z ^ p, 12), O = O + z | 0, x = Q(x ^ O, 8), p = p + x | 0, z = Q(z ^ p, 7);
  let U = 0;
  r[U++] = o + R | 0, r[U++] = a + B | 0, r[U++] = c + C | 0, r[U++] = l + O | 0, r[U++] = u + z | 0, r[U++] = h + M | 0, r[U++] = f + N | 0, r[U++] = d + _ | 0, r[U++] = g + A | 0, r[U++] = w + p | 0, r[U++] = m + y | 0, r[U++] = S + b | 0, r[U++] = T + I | 0, r[U++] = E + v | 0, r[U++] = D + x | 0, r[U++] = $ + P | 0;
}
const Db = /* @__PURE__ */ Eb(Sb, {
  counterRight: !1,
  counterLength: 4,
  allowShortKeys: !1
}), Ab = /* @__PURE__ */ new Uint8Array(16), fl = (t, e) => {
  t.update(e);
  const s = e.length % 16;
  s && t.update(Ab.subarray(s));
}, $b = /* @__PURE__ */ new Uint8Array(32);
function dl(t, e, s, r, n) {
  const i = t(e, s, $b), o = Ib.create(i);
  n && fl(o, n), fl(o, r);
  const a = N0(r.length, n ? n.length : 0, !0);
  o.update(a);
  const c = o.digest();
  return dr(i, a), c;
}
const Ob = (t) => (e, s, r) => ({
  encrypt(i, o) {
    const a = i.length;
    o = ol(a + 16, o, !1), o.set(i);
    const c = o.subarray(0, -16);
    t(e, s, c, c, 1);
    const l = dl(t, e, s, c, r);
    return o.set(l, a), dr(l), o;
  },
  decrypt(i, o) {
    o = ol(i.length - 16, o, !1);
    const a = i.subarray(0, -16), c = i.subarray(-16), l = dl(t, e, s, a, r);
    if (!R0(c, l))
      throw new Error("invalid tag");
    return o.set(i.subarray(0, -16)), t(e, s, o, o, 1), dr(l), o;
  }
}), xf = /* @__PURE__ */ C0({ blockSize: 64, nonceLength: 12, tagLength: 16 }, Ob(Db));
function Pb(t, e, s) {
  return yi(t), s === void 0 && (s = new Uint8Array(t.outputLen)), en(t, pt(s), pt(e));
}
const Qi = /* @__PURE__ */ Uint8Array.from([0]), pl = /* @__PURE__ */ Uint8Array.of();
function Tb(t, e, s, r = 32) {
  yi(t), At(r);
  const n = t.outputLen;
  if (r > 255 * n)
    throw new Error("Length should be <= 255*HashLen");
  const i = Math.ceil(r / n);
  s === void 0 && (s = pl);
  const o = new Uint8Array(i * n), a = en.create(t, e), c = a._cloneInto(), l = new Uint8Array(a.outputLen);
  for (let u = 0; u < i; u++)
    Qi[0] = u + 1, c.update(u === 0 ? pl : l).update(s).update(Qi).digestInto(l), o.set(l, n * u), a._cloneInto(c);
  return a.destroy(), c.destroy(), rt(l, Qi), o.slice(0, r);
}
const Bb = (t, e, s, r, n) => Tb(t, Pb(t, e, s), r, n);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Ra = /* @__PURE__ */ BigInt(0), Ko = /* @__PURE__ */ BigInt(1);
function Jn(t, e = "") {
  if (typeof t != "boolean") {
    const s = e && `"${e}"`;
    throw new Error(s + "expected boolean, got type=" + typeof t);
  }
  return t;
}
function Rs(t, e, s = "") {
  const r = gi(t), n = t?.length, i = e !== void 0;
  if (!r || i && n !== e) {
    const o = s && `"${s}" `, a = i ? ` of length ${e}` : "", c = r ? `length=${n}` : `type=${typeof t}`;
    throw new Error(o + "expected Uint8Array" + a + ", got " + c);
  }
  return t;
}
function yn(t) {
  const e = t.toString(16);
  return e.length & 1 ? "0" + e : e;
}
function _f(t) {
  if (typeof t != "string")
    throw new Error("hex string expected, got " + typeof t);
  return t === "" ? Ra : BigInt("0x" + t);
}
function xi(t) {
  return _f(ar(t));
}
function Qn(t) {
  return gt(t), _f(ar(Uint8Array.from(t).reverse()));
}
function Ca(t, e) {
  return Fn(t.toString(16).padStart(e * 2, "0"));
}
function Na(t, e) {
  return Ca(t, e).reverse();
}
function Be(t, e, s) {
  let r;
  if (typeof e == "string")
    try {
      r = Fn(e);
    } catch (i) {
      throw new Error(t + " must be hex string or Uint8Array, cause: " + i);
    }
  else if (gi(e))
    r = Uint8Array.from(e);
  else
    throw new Error(t + " must be hex string or Uint8Array");
  const n = r.length;
  if (typeof s == "number" && n !== s)
    throw new Error(t + " of length " + s + " expected, got " + n);
  return r;
}
const eo = (t) => typeof t == "bigint" && Ra <= t;
function Rb(t, e, s) {
  return eo(t) && eo(e) && eo(s) && e <= t && t < s;
}
function Vo(t, e, s, r) {
  if (!Rb(e, s, r))
    throw new Error("expected valid " + t + ": " + s + " <= n < " + r + ", got " + e);
}
function If(t) {
  let e;
  for (e = 0; t > Ra; t >>= Ko, e += 1)
    ;
  return e;
}
const nn = (t) => (Ko << BigInt(t)) - Ko;
function Cb(t, e, s) {
  if (typeof t != "number" || t < 2)
    throw new Error("hashLen must be a number");
  if (typeof e != "number" || e < 2)
    throw new Error("qByteLen must be a number");
  if (typeof s != "function")
    throw new Error("hmacFn must be a function");
  const r = (d) => new Uint8Array(d), n = (d) => Uint8Array.of(d);
  let i = r(t), o = r(t), a = 0;
  const c = () => {
    i.fill(1), o.fill(0), a = 0;
  }, l = (...d) => s(o, i, ...d), u = (d = r(0)) => {
    o = l(n(0), d), i = l(), d.length !== 0 && (o = l(n(1), d), i = l());
  }, h = () => {
    if (a++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let d = 0;
    const g = [];
    for (; d < e; ) {
      i = l();
      const w = i.slice();
      g.push(w), d += i.length;
    }
    return jt(...g);
  };
  return (d, g) => {
    c(), u(d);
    let w;
    for (; !(w = g(h())); )
      u();
    return c(), w;
  };
}
function _i(t, e, s = {}) {
  if (!t || typeof t != "object")
    throw new Error("expected valid options object");
  function r(n, i, o) {
    const a = t[n];
    if (o && a === void 0)
      return;
    const c = typeof a;
    if (c !== i || a === null)
      throw new Error(`param "${n}" is invalid: expected ${i}, got ${c}`);
  }
  Object.entries(e).forEach(([n, i]) => r(n, i, !1)), Object.entries(s).forEach(([n, i]) => r(n, i, !0));
}
function gl(t) {
  const e = /* @__PURE__ */ new WeakMap();
  return (s, ...r) => {
    const n = e.get(s);
    if (n !== void 0)
      return n;
    const i = t(s, ...r);
    return e.set(s, i), i;
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const je = BigInt(0), Ne = BigInt(1), Cs = /* @__PURE__ */ BigInt(2), Sf = /* @__PURE__ */ BigInt(3), Df = /* @__PURE__ */ BigInt(4), Af = /* @__PURE__ */ BigInt(5), Nb = /* @__PURE__ */ BigInt(7), $f = /* @__PURE__ */ BigInt(8), Ub = /* @__PURE__ */ BigInt(9), Of = /* @__PURE__ */ BigInt(16);
function Ve(t, e) {
  const s = t % e;
  return s >= je ? s : e + s;
}
function lt(t, e, s) {
  let r = t;
  for (; e-- > je; )
    r *= r, r %= s;
  return r;
}
function yl(t, e) {
  if (t === je)
    throw new Error("invert: expected non-zero number");
  if (e <= je)
    throw new Error("invert: expected positive modulus, got " + e);
  let s = Ve(t, e), r = e, n = je, i = Ne;
  for (; s !== je; ) {
    const a = r / s, c = r % s, l = n - i * a;
    r = s, s = c, n = i, i = l;
  }
  if (r !== Ne)
    throw new Error("invert: does not exist");
  return Ve(n, e);
}
function Ua(t, e, s) {
  if (!t.eql(t.sqr(e), s))
    throw new Error("Cannot find square root");
}
function Pf(t, e) {
  const s = (t.ORDER + Ne) / Df, r = t.pow(e, s);
  return Ua(t, r, e), r;
}
function Mb(t, e) {
  const s = (t.ORDER - Af) / $f, r = t.mul(e, Cs), n = t.pow(r, s), i = t.mul(e, n), o = t.mul(t.mul(i, Cs), n), a = t.mul(i, t.sub(o, t.ONE));
  return Ua(t, a, e), a;
}
function Lb(t) {
  const e = vs(t), s = Tf(t), r = s(e, e.neg(e.ONE)), n = s(e, r), i = s(e, e.neg(r)), o = (t + Nb) / Of;
  return (a, c) => {
    let l = a.pow(c, o), u = a.mul(l, r);
    const h = a.mul(l, n), f = a.mul(l, i), d = a.eql(a.sqr(u), c), g = a.eql(a.sqr(h), c);
    l = a.cmov(l, u, d), u = a.cmov(f, h, g);
    const w = a.eql(a.sqr(u), c), m = a.cmov(l, u, w);
    return Ua(a, m, c), m;
  };
}
function Tf(t) {
  if (t < Sf)
    throw new Error("sqrt is not defined for small field");
  let e = t - Ne, s = 0;
  for (; e % Cs === je; )
    e /= Cs, s++;
  let r = Cs;
  const n = vs(t);
  for (; wl(n, r) === 1; )
    if (r++ > 1e3)
      throw new Error("Cannot find square root: probably non-prime P");
  if (s === 1)
    return Pf;
  let i = n.pow(r, e);
  const o = (e + Ne) / Cs;
  return function(c, l) {
    if (c.is0(l))
      return l;
    if (wl(c, l) !== 1)
      throw new Error("Cannot find square root");
    let u = s, h = c.mul(c.ONE, i), f = c.pow(l, e), d = c.pow(l, o);
    for (; !c.eql(f, c.ONE); ) {
      if (c.is0(f))
        return c.ZERO;
      let g = 1, w = c.sqr(f);
      for (; !c.eql(w, c.ONE); )
        if (g++, w = c.sqr(w), g === u)
          throw new Error("Cannot find square root");
      const m = Ne << BigInt(u - g - 1), S = c.pow(h, m);
      u = g, h = c.sqr(S), f = c.mul(f, h), d = c.mul(d, S);
    }
    return d;
  };
}
function kb(t) {
  return t % Df === Sf ? Pf : t % $f === Af ? Mb : t % Of === Ub ? Lb(t) : Tf(t);
}
const qb = [
  "create",
  "isValid",
  "is0",
  "neg",
  "inv",
  "sqrt",
  "sqr",
  "eql",
  "add",
  "sub",
  "mul",
  "pow",
  "div",
  "addN",
  "subN",
  "mulN",
  "sqrN"
];
function zb(t) {
  const e = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "number",
    BITS: "number"
  }, s = qb.reduce((r, n) => (r[n] = "function", r), e);
  return _i(t, s), t;
}
function jb(t, e, s) {
  if (s < je)
    throw new Error("invalid exponent, negatives unsupported");
  if (s === je)
    return t.ONE;
  if (s === Ne)
    return e;
  let r = t.ONE, n = e;
  for (; s > je; )
    s & Ne && (r = t.mul(r, n)), n = t.sqr(n), s >>= Ne;
  return r;
}
function Bf(t, e, s = !1) {
  const r = new Array(e.length).fill(s ? t.ZERO : void 0), n = e.reduce((o, a, c) => t.is0(a) ? o : (r[c] = o, t.mul(o, a)), t.ONE), i = t.inv(n);
  return e.reduceRight((o, a, c) => t.is0(a) ? o : (r[c] = t.mul(o, r[c]), t.mul(o, a)), i), r;
}
function wl(t, e) {
  const s = (t.ORDER - Ne) / Cs, r = t.pow(e, s), n = t.eql(r, t.ONE), i = t.eql(r, t.ZERO), o = t.eql(r, t.neg(t.ONE));
  if (!n && !i && !o)
    throw new Error("invalid Legendre symbol result");
  return n ? 1 : i ? 0 : -1;
}
function Rf(t, e) {
  e !== void 0 && At(e);
  const s = e !== void 0 ? e : t.toString(2).length, r = Math.ceil(s / 8);
  return { nBitLength: s, nByteLength: r };
}
function vs(t, e, s = !1, r = {}) {
  if (t <= je)
    throw new Error("invalid field: expected ORDER > 0, got " + t);
  let n, i, o = !1, a;
  if (typeof e == "object" && e != null) {
    if (r.sqrt || s)
      throw new Error("cannot specify opts in two arguments");
    const f = e;
    f.BITS && (n = f.BITS), f.sqrt && (i = f.sqrt), typeof f.isLE == "boolean" && (s = f.isLE), typeof f.modFromBytes == "boolean" && (o = f.modFromBytes), a = f.allowedLengths;
  } else
    typeof e == "number" && (n = e), r.sqrt && (i = r.sqrt);
  const { nBitLength: c, nByteLength: l } = Rf(t, n);
  if (l > 2048)
    throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let u;
  const h = Object.freeze({
    ORDER: t,
    isLE: s,
    BITS: c,
    BYTES: l,
    MASK: nn(c),
    ZERO: je,
    ONE: Ne,
    allowedLengths: a,
    create: (f) => Ve(f, t),
    isValid: (f) => {
      if (typeof f != "bigint")
        throw new Error("invalid field element: expected bigint, got " + typeof f);
      return je <= f && f < t;
    },
    is0: (f) => f === je,
    // is valid and invertible
    isValidNot0: (f) => !h.is0(f) && h.isValid(f),
    isOdd: (f) => (f & Ne) === Ne,
    neg: (f) => Ve(-f, t),
    eql: (f, d) => f === d,
    sqr: (f) => Ve(f * f, t),
    add: (f, d) => Ve(f + d, t),
    sub: (f, d) => Ve(f - d, t),
    mul: (f, d) => Ve(f * d, t),
    pow: (f, d) => jb(h, f, d),
    div: (f, d) => Ve(f * yl(d, t), t),
    // Same as above, but doesn't normalize
    sqrN: (f) => f * f,
    addN: (f, d) => f + d,
    subN: (f, d) => f - d,
    mulN: (f, d) => f * d,
    inv: (f) => yl(f, t),
    sqrt: i || ((f) => (u || (u = kb(t)), u(h, f))),
    toBytes: (f) => s ? Na(f, l) : Ca(f, l),
    fromBytes: (f, d = !0) => {
      if (a) {
        if (!a.includes(f.length) || f.length > l)
          throw new Error("Field.fromBytes: expected " + a + " bytes, got " + f.length);
        const w = new Uint8Array(l);
        w.set(f, s ? 0 : w.length - f.length), f = w;
      }
      if (f.length !== l)
        throw new Error("Field.fromBytes: expected " + l + " bytes, got " + f.length);
      let g = s ? Qn(f) : xi(f);
      if (o && (g = Ve(g, t)), !d && !h.isValid(g))
        throw new Error("invalid field element: outside of range 0..ORDER");
      return g;
    },
    // TODO: we don't need it here, move out to separate fn
    invertBatch: (f) => Bf(h, f),
    // We can't move this out because Fp6, Fp12 implement it
    // and it's unclear what to return in there.
    cmov: (f, d, g) => g ? d : f
  });
  return Object.freeze(h);
}
function Cf(t) {
  if (typeof t != "bigint")
    throw new Error("field order must be bigint");
  const e = t.toString(2).length;
  return Math.ceil(e / 8);
}
function Nf(t) {
  const e = Cf(t);
  return e + Math.ceil(e / 2);
}
function Fb(t, e, s = !1) {
  const r = t.length, n = Cf(e), i = Nf(e);
  if (r < 16 || r < i || r > 1024)
    throw new Error("expected " + i + "-1024 bytes of input, got " + r);
  const o = s ? Qn(t) : xi(t), a = Ve(o, e - Ne) + Ne;
  return s ? Na(a, n) : Ca(a, n);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const pr = BigInt(0), Ns = BigInt(1);
function ei(t, e) {
  const s = e.negate();
  return t ? s : e;
}
function to(t, e) {
  const s = Bf(t.Fp, e.map((r) => r.Z));
  return e.map((r, n) => t.fromAffine(r.toAffine(s[n])));
}
function Uf(t, e) {
  if (!Number.isSafeInteger(t) || t <= 0 || t > e)
    throw new Error("invalid window size, expected [1.." + e + "], got W=" + t);
}
function so(t, e) {
  Uf(t, e);
  const s = Math.ceil(e / t) + 1, r = 2 ** (t - 1), n = 2 ** t, i = nn(t), o = BigInt(t);
  return { windows: s, windowSize: r, mask: i, maxNumber: n, shiftBy: o };
}
function ml(t, e, s) {
  const { windowSize: r, mask: n, maxNumber: i, shiftBy: o } = s;
  let a = Number(t & n), c = t >> o;
  a > r && (a -= i, c += Ns);
  const l = e * r, u = l + Math.abs(a) - 1, h = a === 0, f = a < 0, d = e % 2 !== 0;
  return { nextN: c, offset: u, isZero: h, isNeg: f, isNegF: d, offsetF: l };
}
function Hb(t, e) {
  if (!Array.isArray(t))
    throw new Error("array expected");
  t.forEach((s, r) => {
    if (!(s instanceof e))
      throw new Error("invalid point at index " + r);
  });
}
function Kb(t, e) {
  if (!Array.isArray(t))
    throw new Error("array of scalars expected");
  t.forEach((s, r) => {
    if (!e.isValid(s))
      throw new Error("invalid scalar at index " + r);
  });
}
const ro = /* @__PURE__ */ new WeakMap(), Mf = /* @__PURE__ */ new WeakMap();
function no(t) {
  return Mf.get(t) || 1;
}
function bl(t) {
  if (t !== pr)
    throw new Error("invalid wNAF");
}
class Vb {
  // Parametrized with a given Point class (not individual point)
  constructor(e, s) {
    this.BASE = e.BASE, this.ZERO = e.ZERO, this.Fn = e.Fn, this.bits = s;
  }
  // non-const time multiplication ladder
  _unsafeLadder(e, s, r = this.ZERO) {
    let n = e;
    for (; s > pr; )
      s & Ns && (r = r.add(n)), n = n.double(), s >>= Ns;
    return r;
  }
  /**
   * Creates a wNAF precomputation window. Used for caching.
   * Default window size is set by `utils.precompute()` and is equal to 8.
   * Number of precomputed points depends on the curve size:
   * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
   * - 𝑊 is the window size
   * - 𝑛 is the bitlength of the curve order.
   * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
   * @param point Point instance
   * @param W window size
   * @returns precomputed point tables flattened to a single array
   */
  precomputeWindow(e, s) {
    const { windows: r, windowSize: n } = so(s, this.bits), i = [];
    let o = e, a = o;
    for (let c = 0; c < r; c++) {
      a = o, i.push(a);
      for (let l = 1; l < n; l++)
        a = a.add(o), i.push(a);
      o = a.double();
    }
    return i;
  }
  /**
   * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
   * More compact implementation:
   * https://github.com/paulmillr/noble-secp256k1/blob/47cb1669b6e506ad66b35fe7d76132ae97465da2/index.ts#L502-L541
   * @returns real and fake (for const-time) points
   */
  wNAF(e, s, r) {
    if (!this.Fn.isValid(r))
      throw new Error("invalid scalar");
    let n = this.ZERO, i = this.BASE;
    const o = so(e, this.bits);
    for (let a = 0; a < o.windows; a++) {
      const { nextN: c, offset: l, isZero: u, isNeg: h, isNegF: f, offsetF: d } = ml(r, a, o);
      r = c, u ? i = i.add(ei(f, s[d])) : n = n.add(ei(h, s[l]));
    }
    return bl(r), { p: n, f: i };
  }
  /**
   * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
   * @param acc accumulator point to add result of multiplication
   * @returns point
   */
  wNAFUnsafe(e, s, r, n = this.ZERO) {
    const i = so(e, this.bits);
    for (let o = 0; o < i.windows && r !== pr; o++) {
      const { nextN: a, offset: c, isZero: l, isNeg: u } = ml(r, o, i);
      if (r = a, !l) {
        const h = s[c];
        n = n.add(u ? h.negate() : h);
      }
    }
    return bl(r), n;
  }
  getPrecomputes(e, s, r) {
    let n = ro.get(s);
    return n || (n = this.precomputeWindow(s, e), e !== 1 && (typeof r == "function" && (n = r(n)), ro.set(s, n))), n;
  }
  cached(e, s, r) {
    const n = no(e);
    return this.wNAF(n, this.getPrecomputes(n, e, r), s);
  }
  unsafe(e, s, r, n) {
    const i = no(e);
    return i === 1 ? this._unsafeLadder(e, s, n) : this.wNAFUnsafe(i, this.getPrecomputes(i, e, r), s, n);
  }
  // We calculate precomputes for elliptic curve point multiplication
  // using windowed method. This specifies window size and
  // stores precomputed values. Usually only base point would be precomputed.
  createCache(e, s) {
    Uf(s, this.bits), Mf.set(e, s), ro.delete(e);
  }
  hasCache(e) {
    return no(e) !== 1;
  }
}
function Wb(t, e, s, r) {
  let n = e, i = t.ZERO, o = t.ZERO;
  for (; s > pr || r > pr; )
    s & Ns && (i = i.add(n)), r & Ns && (o = o.add(n)), n = n.double(), s >>= Ns, r >>= Ns;
  return { p1: i, p2: o };
}
function Gb(t, e, s, r) {
  Hb(s, t), Kb(r, e);
  const n = s.length, i = r.length;
  if (n !== i)
    throw new Error("arrays of points and scalars must have equal length");
  const o = t.ZERO, a = If(BigInt(n));
  let c = 1;
  a > 12 ? c = a - 3 : a > 4 ? c = a - 2 : a > 0 && (c = 2);
  const l = nn(c), u = new Array(Number(l) + 1).fill(o), h = Math.floor((e.BITS - 1) / c) * c;
  let f = o;
  for (let d = h; d >= 0; d -= c) {
    u.fill(o);
    for (let w = 0; w < i; w++) {
      const m = r[w], S = Number(m >> BigInt(d) & l);
      u[S] = u[S].add(s[w]);
    }
    let g = o;
    for (let w = u.length - 1, m = o; w > 0; w--)
      m = m.add(u[w]), g = g.add(m);
    if (f = f.add(g), d !== 0)
      for (let w = 0; w < c; w++)
        f = f.double();
  }
  return f;
}
function vl(t, e, s) {
  if (e) {
    if (e.ORDER !== t)
      throw new Error("Field.ORDER must match order: Fp == p, Fn == n");
    return zb(e), e;
  } else
    return vs(t, { isLE: s });
}
function Yb(t, e, s = {}, r) {
  if (r === void 0 && (r = t === "edwards"), !e || typeof e != "object")
    throw new Error(`expected valid ${t} CURVE object`);
  for (const c of ["p", "n", "h"]) {
    const l = e[c];
    if (!(typeof l == "bigint" && l > pr))
      throw new Error(`CURVE.${c} must be positive bigint`);
  }
  const n = vl(e.p, s.Fp, r), i = vl(e.n, s.Fn, r), a = ["Gx", "Gy", "a", "b"];
  for (const c of a)
    if (!n.isValid(e[c]))
      throw new Error(`CURVE.${c} must be valid field element of CURVE.Fp`);
  return e = Object.freeze(Object.assign({}, e)), { CURVE: e, Fp: n, Fn: i };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
BigInt(0);
BigInt(1);
BigInt(2);
BigInt(8);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Ir = BigInt(0), Qs = BigInt(1), wn = BigInt(2);
function Zb(t) {
  return _i(t, {
    adjustScalarBytes: "function",
    powPminus2: "function"
  }), Object.freeze({ ...t });
}
function Xb(t) {
  const e = Zb(t), { P: s, type: r, adjustScalarBytes: n, powPminus2: i, randomBytes: o } = e, a = r === "x25519";
  if (!a && r !== "x448")
    throw new Error("invalid type");
  const c = o || bs, l = a ? 255 : 448, u = a ? 32 : 56, h = BigInt(a ? 9 : 5), f = BigInt(a ? 121665 : 39081), d = a ? wn ** BigInt(254) : wn ** BigInt(447), g = a ? BigInt(8) * wn ** BigInt(251) - Qs : BigInt(4) * wn ** BigInt(445) - Qs, w = d + g + Qs, m = (_) => Ve(_, s), S = T(h);
  function T(_) {
    return Na(m(_), u);
  }
  function E(_) {
    const A = Be("u coordinate", _, u);
    return a && (A[31] &= 127), m(Qn(A));
  }
  function D(_) {
    return Qn(n(Be("scalar", _, u)));
  }
  function $(_, A) {
    const p = C(E(A), D(_));
    if (p === Ir)
      throw new Error("invalid private or public key received");
    return T(p);
  }
  function R(_) {
    return $(_, S);
  }
  function B(_, A, p) {
    const y = m(_ * (A - p));
    return A = m(A - y), p = m(p + y), { x_2: A, x_3: p };
  }
  function C(_, A) {
    Vo("u", _, Ir, s), Vo("scalar", A, d, w);
    const p = A, y = _;
    let b = Qs, I = Ir, v = _, x = Qs, P = Ir;
    for (let F = BigInt(l - 1); F >= Ir; F--) {
      const L = p >> F & Qs;
      P ^= L, { x_2: b, x_3: v } = B(P, b, v), { x_2: I, x_3: x } = B(P, I, x), P = L;
      const q = b + I, K = m(q * q), W = b - I, Y = m(W * W), V = K - Y, J = v + x, le = v - x, he = m(le * q), we = m(J * W), nt = he + we, it = he - we;
      v = m(nt * nt), x = m(y * m(it * it)), b = m(K * Y), I = m(V * (K + m(f * V)));
    }
    ({ x_2: b, x_3: v } = B(P, b, v)), { x_2: I, x_3: x } = B(P, I, x);
    const U = i(I);
    return m(b * U);
  }
  const O = {
    secretKey: u,
    publicKey: u,
    seed: u
  }, z = (_ = c(u)) => (gt(_, O.seed), _);
  function M(_) {
    const A = z(_);
    return { secretKey: A, publicKey: R(A) };
  }
  return {
    keygen: M,
    getSharedSecret: (_, A) => $(_, A),
    getPublicKey: (_) => R(_),
    scalarMult: $,
    scalarMultBase: R,
    utils: {
      randomSecretKey: z,
      randomPrivateKey: z
    },
    GuBytes: S.slice(),
    lengths: O
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Jb = BigInt(1), El = BigInt(2), Qb = BigInt(3), e1 = BigInt(5), t1 = BigInt(8), Lf = BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed"), s1 = {
  p: Lf,
  n: BigInt("0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed"),
  h: t1,
  a: BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffec"),
  d: BigInt("0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3"),
  Gx: BigInt("0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a"),
  Gy: BigInt("0x6666666666666666666666666666666666666666666666666666666666666658")
};
function r1(t) {
  const e = BigInt(10), s = BigInt(20), r = BigInt(40), n = BigInt(80), i = Lf, a = t * t % i * t % i, c = lt(a, El, i) * a % i, l = lt(c, Jb, i) * t % i, u = lt(l, e1, i) * l % i, h = lt(u, e, i) * u % i, f = lt(h, s, i) * h % i, d = lt(f, r, i) * f % i, g = lt(d, n, i) * d % i, w = lt(g, n, i) * d % i, m = lt(w, e, i) * u % i;
  return { pow_p_5_8: lt(m, El, i) * t % i, b2: a };
}
function n1(t) {
  return t[0] &= 248, t[31] &= 127, t[31] |= 64, t;
}
const i1 = vs(s1.p, { isLE: !0 }), Wo = /* @__PURE__ */ (() => {
  const t = i1.ORDER;
  return Xb({
    P: t,
    type: "x25519",
    powPminus2: (e) => {
      const { pow_p_5_8: s, b2: r } = r1(e);
      return Ve(lt(s, Qb, t) * r, t);
    },
    adjustScalarBytes: n1
  });
})();
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const xl = (t, e) => (t + (t >= 0 ? e : -e) / kf) / e;
function o1(t, e, s) {
  const [[r, n], [i, o]] = e, a = xl(o * t, s), c = xl(-n * t, s);
  let l = t - a * r - c * i, u = -a * n - c * o;
  const h = l < Kt, f = u < Kt;
  h && (l = -l), f && (u = -u);
  const d = nn(Math.ceil(If(s) / 2)) + lr;
  if (l < Kt || l >= d || u < Kt || u >= d)
    throw new Error("splitScalar (endomorphism): failed, k=" + t);
  return { k1neg: h, k1: l, k2neg: f, k2: u };
}
function Go(t) {
  if (!["compact", "recovered", "der"].includes(t))
    throw new Error('Signature format must be "compact", "recovered", or "der"');
  return t;
}
function io(t, e) {
  const s = {};
  for (let r of Object.keys(e))
    s[r] = t[r] === void 0 ? e[r] : t[r];
  return Jn(s.lowS, "lowS"), Jn(s.prehash, "prehash"), s.format !== void 0 && Go(s.format), s;
}
class a1 extends Error {
  constructor(e = "") {
    super(e);
  }
}
const zt = {
  // asn.1 DER encoding utils
  Err: a1,
  // Basic building block is TLV (Tag-Length-Value)
  _tlv: {
    encode: (t, e) => {
      const { Err: s } = zt;
      if (t < 0 || t > 256)
        throw new s("tlv.encode: wrong tag");
      if (e.length & 1)
        throw new s("tlv.encode: unpadded data");
      const r = e.length / 2, n = yn(r);
      if (n.length / 2 & 128)
        throw new s("tlv.encode: long form length too big");
      const i = r > 127 ? yn(n.length / 2 | 128) : "";
      return yn(t) + i + n + e;
    },
    // v - value, l - left bytes (unparsed)
    decode(t, e) {
      const { Err: s } = zt;
      let r = 0;
      if (t < 0 || t > 256)
        throw new s("tlv.encode: wrong tag");
      if (e.length < 2 || e[r++] !== t)
        throw new s("tlv.decode: wrong tlv");
      const n = e[r++], i = !!(n & 128);
      let o = 0;
      if (!i)
        o = n;
      else {
        const c = n & 127;
        if (!c)
          throw new s("tlv.decode(long): indefinite length not supported");
        if (c > 4)
          throw new s("tlv.decode(long): byte length is too big");
        const l = e.subarray(r, r + c);
        if (l.length !== c)
          throw new s("tlv.decode: length bytes not complete");
        if (l[0] === 0)
          throw new s("tlv.decode(long): zero leftmost byte");
        for (const u of l)
          o = o << 8 | u;
        if (r += c, o < 128)
          throw new s("tlv.decode(long): not minimal encoding");
      }
      const a = e.subarray(r, r + o);
      if (a.length !== o)
        throw new s("tlv.decode: wrong value length");
      return { v: a, l: e.subarray(r + o) };
    }
  },
  // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
  // since we always use positive integers here. It must always be empty:
  // - add zero byte if exists
  // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
  _int: {
    encode(t) {
      const { Err: e } = zt;
      if (t < Kt)
        throw new e("integer: negative integers are not allowed");
      let s = yn(t);
      if (Number.parseInt(s[0], 16) & 8 && (s = "00" + s), s.length & 1)
        throw new e("unexpected DER parsing assertion: unpadded hex");
      return s;
    },
    decode(t) {
      const { Err: e } = zt;
      if (t[0] & 128)
        throw new e("invalid signature integer: negative");
      if (t[0] === 0 && !(t[1] & 128))
        throw new e("invalid signature integer: unnecessary leading zero");
      return xi(t);
    }
  },
  toSig(t) {
    const { Err: e, _int: s, _tlv: r } = zt, n = Be("signature", t), { v: i, l: o } = r.decode(48, n);
    if (o.length)
      throw new e("invalid signature: left bytes after parsing");
    const { v: a, l: c } = r.decode(2, i), { v: l, l: u } = r.decode(2, c);
    if (u.length)
      throw new e("invalid signature: left bytes after parsing");
    return { r: s.decode(a), s: s.decode(l) };
  },
  hexFromSig(t) {
    const { _tlv: e, _int: s } = zt, r = e.encode(2, s.encode(t.r)), n = e.encode(2, s.encode(t.s)), i = r + n;
    return e.encode(48, i);
  }
}, Kt = BigInt(0), lr = BigInt(1), kf = BigInt(2), mn = BigInt(3), c1 = BigInt(4);
function sr(t, e) {
  const { BYTES: s } = t;
  let r;
  if (typeof e == "bigint")
    r = e;
  else {
    let n = Be("private key", e);
    try {
      r = t.fromBytes(n);
    } catch {
      throw new Error(`invalid private key: expected ui8a of size ${s}, got ${typeof e}`);
    }
  }
  if (!t.isValidNot0(r))
    throw new Error("invalid private key: out of range [1..N-1]");
  return r;
}
function l1(t, e = {}) {
  const s = Yb("weierstrass", t, e), { Fp: r, Fn: n } = s;
  let i = s.CURVE;
  const { h: o, n: a } = i;
  _i(e, {}, {
    allowInfinityPoint: "boolean",
    clearCofactor: "function",
    isTorsionFree: "function",
    fromBytes: "function",
    toBytes: "function",
    endo: "object",
    wrapPrivateKey: "boolean"
  });
  const { endo: c } = e;
  if (c && (!r.is0(i.a) || typeof c.beta != "bigint" || !Array.isArray(c.basises)))
    throw new Error('invalid endo: expected "beta": bigint and "basises": array');
  const l = zf(r, n);
  function u() {
    if (!r.isOdd)
      throw new Error("compression is not supported: Field does not have .isOdd()");
  }
  function h(N, _, A) {
    const { x: p, y } = _.toAffine(), b = r.toBytes(p);
    if (Jn(A, "isCompressed"), A) {
      u();
      const I = !r.isOdd(y);
      return jt(qf(I), b);
    } else
      return jt(Uint8Array.of(4), b, r.toBytes(y));
  }
  function f(N) {
    Rs(N, void 0, "Point");
    const { publicKey: _, publicKeyUncompressed: A } = l, p = N.length, y = N[0], b = N.subarray(1);
    if (p === _ && (y === 2 || y === 3)) {
      const I = r.fromBytes(b);
      if (!r.isValid(I))
        throw new Error("bad point: is not on curve, wrong x");
      const v = w(I);
      let x;
      try {
        x = r.sqrt(v);
      } catch (F) {
        const L = F instanceof Error ? ": " + F.message : "";
        throw new Error("bad point: is not on curve, sqrt error" + L);
      }
      u();
      const P = r.isOdd(x);
      return (y & 1) === 1 !== P && (x = r.neg(x)), { x: I, y: x };
    } else if (p === A && y === 4) {
      const I = r.BYTES, v = r.fromBytes(b.subarray(0, I)), x = r.fromBytes(b.subarray(I, I * 2));
      if (!m(v, x))
        throw new Error("bad point: is not on curve");
      return { x: v, y: x };
    } else
      throw new Error(`bad point: got length ${p}, expected compressed=${_} or uncompressed=${A}`);
  }
  const d = e.toBytes || h, g = e.fromBytes || f;
  function w(N) {
    const _ = r.sqr(N), A = r.mul(_, N);
    return r.add(r.add(A, r.mul(N, i.a)), i.b);
  }
  function m(N, _) {
    const A = r.sqr(_), p = w(N);
    return r.eql(A, p);
  }
  if (!m(i.Gx, i.Gy))
    throw new Error("bad curve params: generator point");
  const S = r.mul(r.pow(i.a, mn), c1), T = r.mul(r.sqr(i.b), BigInt(27));
  if (r.is0(r.add(S, T)))
    throw new Error("bad curve params: a or b");
  function E(N, _, A = !1) {
    if (!r.isValid(_) || A && r.is0(_))
      throw new Error(`bad point coordinate ${N}`);
    return _;
  }
  function D(N) {
    if (!(N instanceof O))
      throw new Error("ProjectivePoint expected");
  }
  function $(N) {
    if (!c || !c.basises)
      throw new Error("no endo");
    return o1(N, c.basises, n.ORDER);
  }
  const R = gl((N, _) => {
    const { X: A, Y: p, Z: y } = N;
    if (r.eql(y, r.ONE))
      return { x: A, y: p };
    const b = N.is0();
    _ == null && (_ = b ? r.ONE : r.inv(y));
    const I = r.mul(A, _), v = r.mul(p, _), x = r.mul(y, _);
    if (b)
      return { x: r.ZERO, y: r.ZERO };
    if (!r.eql(x, r.ONE))
      throw new Error("invZ was invalid");
    return { x: I, y: v };
  }), B = gl((N) => {
    if (N.is0()) {
      if (e.allowInfinityPoint && !r.is0(N.Y))
        return;
      throw new Error("bad point: ZERO");
    }
    const { x: _, y: A } = N.toAffine();
    if (!r.isValid(_) || !r.isValid(A))
      throw new Error("bad point: x or y not field elements");
    if (!m(_, A))
      throw new Error("bad point: equation left != right");
    if (!N.isTorsionFree())
      throw new Error("bad point: not in prime-order subgroup");
    return !0;
  });
  function C(N, _, A, p, y) {
    return A = new O(r.mul(A.X, N), A.Y, A.Z), _ = ei(p, _), A = ei(y, A), _.add(A);
  }
  class O {
    /** Does NOT validate if the point is valid. Use `.assertValidity()`. */
    constructor(_, A, p) {
      this.X = E("x", _), this.Y = E("y", A, !0), this.Z = E("z", p), Object.freeze(this);
    }
    static CURVE() {
      return i;
    }
    /** Does NOT validate if the point is valid. Use `.assertValidity()`. */
    static fromAffine(_) {
      const { x: A, y: p } = _ || {};
      if (!_ || !r.isValid(A) || !r.isValid(p))
        throw new Error("invalid affine point");
      if (_ instanceof O)
        throw new Error("projective point not allowed");
      return r.is0(A) && r.is0(p) ? O.ZERO : new O(A, p, r.ONE);
    }
    static fromBytes(_) {
      const A = O.fromAffine(g(Rs(_, void 0, "point")));
      return A.assertValidity(), A;
    }
    static fromHex(_) {
      return O.fromBytes(Be("pointHex", _));
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    /**
     *
     * @param windowSize
     * @param isLazy true will defer table computation until the first multiplication
     * @returns
     */
    precompute(_ = 8, A = !0) {
      return M.createCache(this, _), A || this.multiply(mn), this;
    }
    // TODO: return `this`
    /** A point on curve is valid if it conforms to equation. */
    assertValidity() {
      B(this);
    }
    hasEvenY() {
      const { y: _ } = this.toAffine();
      if (!r.isOdd)
        throw new Error("Field doesn't support isOdd");
      return !r.isOdd(_);
    }
    /** Compare one point to another. */
    equals(_) {
      D(_);
      const { X: A, Y: p, Z: y } = this, { X: b, Y: I, Z: v } = _, x = r.eql(r.mul(A, v), r.mul(b, y)), P = r.eql(r.mul(p, v), r.mul(I, y));
      return x && P;
    }
    /** Flips point to one corresponding to (x, -y) in Affine coordinates. */
    negate() {
      return new O(this.X, r.neg(this.Y), this.Z);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: _, b: A } = i, p = r.mul(A, mn), { X: y, Y: b, Z: I } = this;
      let v = r.ZERO, x = r.ZERO, P = r.ZERO, U = r.mul(y, y), F = r.mul(b, b), L = r.mul(I, I), q = r.mul(y, b);
      return q = r.add(q, q), P = r.mul(y, I), P = r.add(P, P), v = r.mul(_, P), x = r.mul(p, L), x = r.add(v, x), v = r.sub(F, x), x = r.add(F, x), x = r.mul(v, x), v = r.mul(q, v), P = r.mul(p, P), L = r.mul(_, L), q = r.sub(U, L), q = r.mul(_, q), q = r.add(q, P), P = r.add(U, U), U = r.add(P, U), U = r.add(U, L), U = r.mul(U, q), x = r.add(x, U), L = r.mul(b, I), L = r.add(L, L), U = r.mul(L, q), v = r.sub(v, U), P = r.mul(L, F), P = r.add(P, P), P = r.add(P, P), new O(v, x, P);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(_) {
      D(_);
      const { X: A, Y: p, Z: y } = this, { X: b, Y: I, Z: v } = _;
      let x = r.ZERO, P = r.ZERO, U = r.ZERO;
      const F = i.a, L = r.mul(i.b, mn);
      let q = r.mul(A, b), K = r.mul(p, I), W = r.mul(y, v), Y = r.add(A, p), V = r.add(b, I);
      Y = r.mul(Y, V), V = r.add(q, K), Y = r.sub(Y, V), V = r.add(A, y);
      let J = r.add(b, v);
      return V = r.mul(V, J), J = r.add(q, W), V = r.sub(V, J), J = r.add(p, y), x = r.add(I, v), J = r.mul(J, x), x = r.add(K, W), J = r.sub(J, x), U = r.mul(F, V), x = r.mul(L, W), U = r.add(x, U), x = r.sub(K, U), U = r.add(K, U), P = r.mul(x, U), K = r.add(q, q), K = r.add(K, q), W = r.mul(F, W), V = r.mul(L, V), K = r.add(K, W), W = r.sub(q, W), W = r.mul(F, W), V = r.add(V, W), q = r.mul(K, V), P = r.add(P, q), q = r.mul(J, V), x = r.mul(Y, x), x = r.sub(x, q), q = r.mul(Y, K), U = r.mul(J, U), U = r.add(U, q), new O(x, P, U);
    }
    subtract(_) {
      return this.add(_.negate());
    }
    is0() {
      return this.equals(O.ZERO);
    }
    /**
     * Constant time multiplication.
     * Uses wNAF method. Windowed method may be 10% faster,
     * but takes 2x longer to generate and consumes 2x memory.
     * Uses precomputes when available.
     * Uses endomorphism for Koblitz curves.
     * @param scalar by which the point would be multiplied
     * @returns New point
     */
    multiply(_) {
      const { endo: A } = e;
      if (!n.isValidNot0(_))
        throw new Error("invalid scalar: out of range");
      let p, y;
      const b = (I) => M.cached(this, I, (v) => to(O, v));
      if (A) {
        const { k1neg: I, k1: v, k2neg: x, k2: P } = $(_), { p: U, f: F } = b(v), { p: L, f: q } = b(P);
        y = F.add(q), p = C(A.beta, U, L, I, x);
      } else {
        const { p: I, f: v } = b(_);
        p = I, y = v;
      }
      return to(O, [p, y])[0];
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed secret key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(_) {
      const { endo: A } = e, p = this;
      if (!n.isValid(_))
        throw new Error("invalid scalar: out of range");
      if (_ === Kt || p.is0())
        return O.ZERO;
      if (_ === lr)
        return p;
      if (M.hasCache(this))
        return this.multiply(_);
      if (A) {
        const { k1neg: y, k1: b, k2neg: I, k2: v } = $(_), { p1: x, p2: P } = Wb(O, p, b, v);
        return C(A.beta, x, P, y, I);
      } else
        return M.unsafe(p, _);
    }
    multiplyAndAddUnsafe(_, A, p) {
      const y = this.multiplyUnsafe(A).add(_.multiplyUnsafe(p));
      return y.is0() ? void 0 : y;
    }
    /**
     * Converts Projective point to affine (x, y) coordinates.
     * @param invertedZ Z^-1 (inverted zero) - optional, precomputation is useful for invertBatch
     */
    toAffine(_) {
      return R(this, _);
    }
    /**
     * Checks whether Point is free of torsion elements (is in prime subgroup).
     * Always torsion-free for cofactor=1 curves.
     */
    isTorsionFree() {
      const { isTorsionFree: _ } = e;
      return o === lr ? !0 : _ ? _(O, this) : M.unsafe(this, a).is0();
    }
    clearCofactor() {
      const { clearCofactor: _ } = e;
      return o === lr ? this : _ ? _(O, this) : this.multiplyUnsafe(o);
    }
    isSmallOrder() {
      return this.multiplyUnsafe(o).is0();
    }
    toBytes(_ = !0) {
      return Jn(_, "isCompressed"), this.assertValidity(), d(O, this, _);
    }
    toHex(_ = !0) {
      return ar(this.toBytes(_));
    }
    toString() {
      return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
    }
    // TODO: remove
    get px() {
      return this.X;
    }
    get py() {
      return this.X;
    }
    get pz() {
      return this.Z;
    }
    toRawBytes(_ = !0) {
      return this.toBytes(_);
    }
    _setWindowSize(_) {
      this.precompute(_);
    }
    static normalizeZ(_) {
      return to(O, _);
    }
    static msm(_, A) {
      return Gb(O, n, _, A);
    }
    static fromPrivateKey(_) {
      return O.BASE.multiply(sr(n, _));
    }
  }
  O.BASE = new O(i.Gx, i.Gy, r.ONE), O.ZERO = new O(r.ZERO, r.ONE, r.ZERO), O.Fp = r, O.Fn = n;
  const z = n.BITS, M = new Vb(O, e.endo ? Math.ceil(z / 2) : z);
  return O.BASE.precompute(8), O;
}
function qf(t) {
  return Uint8Array.of(t ? 2 : 3);
}
function zf(t, e) {
  return {
    secretKey: e.BYTES,
    publicKey: 1 + t.BYTES,
    publicKeyUncompressed: 1 + 2 * t.BYTES,
    publicKeyHasPrefix: !0,
    signature: 2 * e.BYTES
  };
}
function h1(t, e = {}) {
  const { Fn: s } = t, r = e.randomBytes || bs, n = Object.assign(zf(t.Fp, s), { seed: Nf(s.ORDER) });
  function i(d) {
    try {
      return !!sr(s, d);
    } catch {
      return !1;
    }
  }
  function o(d, g) {
    const { publicKey: w, publicKeyUncompressed: m } = n;
    try {
      const S = d.length;
      return g === !0 && S !== w || g === !1 && S !== m ? !1 : !!t.fromBytes(d);
    } catch {
      return !1;
    }
  }
  function a(d = r(n.seed)) {
    return Fb(Rs(d, n.seed, "seed"), s.ORDER);
  }
  function c(d, g = !0) {
    return t.BASE.multiply(sr(s, d)).toBytes(g);
  }
  function l(d) {
    const g = a(d);
    return { secretKey: g, publicKey: c(g) };
  }
  function u(d) {
    if (typeof d == "bigint")
      return !1;
    if (d instanceof t)
      return !0;
    const { secretKey: g, publicKey: w, publicKeyUncompressed: m } = n;
    if (s.allowedLengths || g === w)
      return;
    const S = Be("key", d).length;
    return S === w || S === m;
  }
  function h(d, g, w = !0) {
    if (u(d) === !0)
      throw new Error("first arg must be private key");
    if (u(g) === !1)
      throw new Error("second arg must be public key");
    const m = sr(s, d);
    return t.fromHex(g).multiply(m).toBytes(w);
  }
  return Object.freeze({ getPublicKey: c, getSharedSecret: h, keygen: l, Point: t, utils: {
    isValidSecretKey: i,
    isValidPublicKey: o,
    randomSecretKey: a,
    // TODO: remove
    isValidPrivateKey: i,
    randomPrivateKey: a,
    normPrivateKeyToScalar: (d) => sr(s, d),
    precompute(d = 8, g = t.BASE) {
      return g.precompute(d, !1);
    }
  }, lengths: n });
}
function u1(t, e, s = {}) {
  yi(e), _i(s, {}, {
    hmac: "function",
    lowS: "boolean",
    randomBytes: "function",
    bits2int: "function",
    bits2int_modN: "function"
  });
  const r = s.randomBytes || bs, n = s.hmac || ((A, ...p) => en(e, A, jt(...p))), { Fp: i, Fn: o } = t, { ORDER: a, BITS: c } = o, { keygen: l, getPublicKey: u, getSharedSecret: h, utils: f, lengths: d } = h1(t, s), g = {
    prehash: !1,
    lowS: typeof s.lowS == "boolean" ? s.lowS : !1,
    format: void 0,
    //'compact' as ECDSASigFormat,
    extraEntropy: !1
  }, w = "compact";
  function m(A) {
    const p = a >> lr;
    return A > p;
  }
  function S(A, p) {
    if (!o.isValidNot0(p))
      throw new Error(`invalid signature ${A}: out of range 1..Point.Fn.ORDER`);
    return p;
  }
  function T(A, p) {
    Go(p);
    const y = d.signature, b = p === "compact" ? y : p === "recovered" ? y + 1 : void 0;
    return Rs(A, b, `${p} signature`);
  }
  class E {
    constructor(p, y, b) {
      this.r = S("r", p), this.s = S("s", y), b != null && (this.recovery = b), Object.freeze(this);
    }
    static fromBytes(p, y = w) {
      T(p, y);
      let b;
      if (y === "der") {
        const { r: P, s: U } = zt.toSig(Rs(p));
        return new E(P, U);
      }
      y === "recovered" && (b = p[0], y = "compact", p = p.subarray(1));
      const I = o.BYTES, v = p.subarray(0, I), x = p.subarray(I, I * 2);
      return new E(o.fromBytes(v), o.fromBytes(x), b);
    }
    static fromHex(p, y) {
      return this.fromBytes(Fn(p), y);
    }
    addRecoveryBit(p) {
      return new E(this.r, this.s, p);
    }
    recoverPublicKey(p) {
      const y = i.ORDER, { r: b, s: I, recovery: v } = this;
      if (v == null || ![0, 1, 2, 3].includes(v))
        throw new Error("recovery id invalid");
      if (a * kf < y && v > 1)
        throw new Error("recovery id is ambiguous for h>1 curve");
      const P = v === 2 || v === 3 ? b + a : b;
      if (!i.isValid(P))
        throw new Error("recovery id 2 or 3 invalid");
      const U = i.toBytes(P), F = t.fromBytes(jt(qf((v & 1) === 0), U)), L = o.inv(P), q = $(Be("msgHash", p)), K = o.create(-q * L), W = o.create(I * L), Y = t.BASE.multiplyUnsafe(K).add(F.multiplyUnsafe(W));
      if (Y.is0())
        throw new Error("point at infinify");
      return Y.assertValidity(), Y;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return m(this.s);
    }
    toBytes(p = w) {
      if (Go(p), p === "der")
        return Fn(zt.hexFromSig(this));
      const y = o.toBytes(this.r), b = o.toBytes(this.s);
      if (p === "recovered") {
        if (this.recovery == null)
          throw new Error("recovery bit must be present");
        return jt(Uint8Array.of(this.recovery), y, b);
      }
      return jt(y, b);
    }
    toHex(p) {
      return ar(this.toBytes(p));
    }
    // TODO: remove
    assertValidity() {
    }
    static fromCompact(p) {
      return E.fromBytes(Be("sig", p), "compact");
    }
    static fromDER(p) {
      return E.fromBytes(Be("sig", p), "der");
    }
    normalizeS() {
      return this.hasHighS() ? new E(this.r, o.neg(this.s), this.recovery) : this;
    }
    toDERRawBytes() {
      return this.toBytes("der");
    }
    toDERHex() {
      return ar(this.toBytes("der"));
    }
    toCompactRawBytes() {
      return this.toBytes("compact");
    }
    toCompactHex() {
      return ar(this.toBytes("compact"));
    }
  }
  const D = s.bits2int || function(p) {
    if (p.length > 8192)
      throw new Error("input is too large");
    const y = xi(p), b = p.length * 8 - c;
    return b > 0 ? y >> BigInt(b) : y;
  }, $ = s.bits2int_modN || function(p) {
    return o.create(D(p));
  }, R = nn(c);
  function B(A) {
    return Vo("num < 2^" + c, A, Kt, R), o.toBytes(A);
  }
  function C(A, p) {
    return Rs(A, void 0, "message"), p ? Rs(e(A), void 0, "prehashed message") : A;
  }
  function O(A, p, y) {
    if (["recovered", "canonical"].some((K) => K in y))
      throw new Error("sign() legacy options not supported");
    const { lowS: b, prehash: I, extraEntropy: v } = io(y, g);
    A = C(A, I);
    const x = $(A), P = sr(o, p), U = [B(P), B(x)];
    if (v != null && v !== !1) {
      const K = v === !0 ? r(d.secretKey) : v;
      U.push(Be("extraEntropy", K));
    }
    const F = jt(...U), L = x;
    function q(K) {
      const W = D(K);
      if (!o.isValidNot0(W))
        return;
      const Y = o.inv(W), V = t.BASE.multiply(W).toAffine(), J = o.create(V.x);
      if (J === Kt)
        return;
      const le = o.create(Y * o.create(L + J * P));
      if (le === Kt)
        return;
      let he = (V.x === J ? 0 : 2) | Number(V.y & lr), we = le;
      return b && m(le) && (we = o.neg(le), he ^= 1), new E(J, we, he);
    }
    return { seed: F, k2sig: q };
  }
  function z(A, p, y = {}) {
    A = Be("message", A);
    const { seed: b, k2sig: I } = O(A, p, y);
    return Cb(e.outputLen, o.BYTES, n)(b, I);
  }
  function M(A) {
    let p;
    const y = typeof A == "string" || gi(A), b = !y && A !== null && typeof A == "object" && typeof A.r == "bigint" && typeof A.s == "bigint";
    if (!y && !b)
      throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
    if (b)
      p = new E(A.r, A.s);
    else if (y) {
      try {
        p = E.fromBytes(Be("sig", A), "der");
      } catch (I) {
        if (!(I instanceof zt.Err))
          throw I;
      }
      if (!p)
        try {
          p = E.fromBytes(Be("sig", A), "compact");
        } catch {
          return !1;
        }
    }
    return p || !1;
  }
  function N(A, p, y, b = {}) {
    const { lowS: I, prehash: v, format: x } = io(b, g);
    if (y = Be("publicKey", y), p = C(Be("message", p), v), "strict" in b)
      throw new Error("options.strict was renamed to lowS");
    const P = x === void 0 ? M(A) : E.fromBytes(Be("sig", A), x);
    if (P === !1)
      return !1;
    try {
      const U = t.fromBytes(y);
      if (I && P.hasHighS())
        return !1;
      const { r: F, s: L } = P, q = $(p), K = o.inv(L), W = o.create(q * K), Y = o.create(F * K), V = t.BASE.multiplyUnsafe(W).add(U.multiplyUnsafe(Y));
      return V.is0() ? !1 : o.create(V.x) === F;
    } catch {
      return !1;
    }
  }
  function _(A, p, y = {}) {
    const { prehash: b } = io(y, g);
    return p = C(p, b), E.fromBytes(A, "recovered").recoverPublicKey(p).toBytes();
  }
  return Object.freeze({
    keygen: l,
    getPublicKey: u,
    getSharedSecret: h,
    utils: f,
    lengths: d,
    Point: t,
    sign: z,
    verify: N,
    recoverPublicKey: _,
    Signature: E,
    hash: e
  });
}
function f1(t) {
  const e = {
    a: t.a,
    b: t.b,
    p: t.Fp.ORDER,
    n: t.n,
    h: t.h,
    Gx: t.Gx,
    Gy: t.Gy
  }, s = t.Fp;
  let r = t.allowedPrivateKeyLengths ? Array.from(new Set(t.allowedPrivateKeyLengths.map((o) => Math.ceil(o / 2)))) : void 0;
  const n = vs(e.n, {
    BITS: t.nBitLength,
    allowedLengths: r,
    modFromBytes: t.wrapPrivateKey
  }), i = {
    Fp: s,
    Fn: n,
    allowInfinityPoint: t.allowInfinityPoint,
    endo: t.endo,
    isTorsionFree: t.isTorsionFree,
    clearCofactor: t.clearCofactor,
    fromBytes: t.fromBytes,
    toBytes: t.toBytes
  };
  return { CURVE: e, curveOpts: i };
}
function d1(t) {
  const { CURVE: e, curveOpts: s } = f1(t), r = {
    hmac: t.hmac,
    randomBytes: t.randomBytes,
    lowS: t.lowS,
    bits2int: t.bits2int,
    bits2int_modN: t.bits2int_modN
  };
  return { CURVE: e, curveOpts: s, hash: t.hash, ecdsaOpts: r };
}
function p1(t, e) {
  const s = e.Point;
  return Object.assign({}, e, {
    ProjectivePoint: s,
    CURVE: Object.assign({}, t, Rf(s.Fn.ORDER, s.Fn.BITS))
  });
}
function g1(t) {
  const { CURVE: e, curveOpts: s, hash: r, ecdsaOpts: n } = d1(t), i = l1(e, s), o = u1(i, r, n);
  return p1(t, o);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Ma(t, e) {
  const s = (r) => g1({ ...t, hash: r });
  return { ...s(e), create: s };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const jf = {
  p: BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff"),
  n: BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"),
  h: BigInt(1),
  a: BigInt("0xffffffff00000001000000000000000000000000fffffffffffffffffffffffc"),
  b: BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b"),
  Gx: BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"),
  Gy: BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5")
}, Ff = {
  p: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000ffffffff"),
  n: BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffc7634d81f4372ddf581a0db248b0a77aecec196accc52973"),
  h: BigInt(1),
  a: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000fffffffc"),
  b: BigInt("0xb3312fa7e23ee7e4988e056be3f82d19181d9c6efe8141120314088f5013875ac656398d8a2ed19d2a85c8edd3ec2aef"),
  Gx: BigInt("0xaa87ca22be8b05378eb1c71ef320ad746e1d3b628ba79b9859f741e082542a385502f25dbf55296c3a545e3872760ab7"),
  Gy: BigInt("0x3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f")
}, Hf = {
  p: BigInt("0x1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"),
  n: BigInt("0x01fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa51868783bf2f966b7fcc0148f709a5d03bb5c9b8899c47aebb6fb71e91386409"),
  h: BigInt(1),
  a: BigInt("0x1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc"),
  b: BigInt("0x0051953eb9618e1c9a1f929a21a0b68540eea2da725b99b315f3b8b489918ef109e156193951ec7e937b1652c0bd3bb1bf073573df883d2c34f1ef451fd46b503f00"),
  Gx: BigInt("0x00c6858e06b70404e9cd9e3ecb662395b4429c648139053fb521f828af606b4d3dbaa14b5e77efe75928fe1dc127a2ffa8de3348b3c1856a429bf97e7e31c2e5bd66"),
  Gy: BigInt("0x011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650")
}, y1 = vs(jf.p), w1 = vs(Ff.p), m1 = vs(Hf.p), b1 = Ma({ ...jf, Fp: y1, lowS: !1 }, qs);
Ma({ ...Ff, Fp: w1, lowS: !1 }, Jy);
Ma({ ...Hf, Fp: m1, lowS: !1, allowedPrivateKeyLengths: [130, 131, 132] }, Xy);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const v1 = b1, E1 = (t) => JSON.stringify(t, (e, s) => typeof s == "bigint" ? s.toString() + "n" : s), x1 = (t) => {
  const e = /([\[:])?(\d{17,}|(?:[9](?:[1-9]07199254740991|0[1-9]7199254740991|00[8-9]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[8-9]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9])))([,\}\]])/g, s = t.replace(e, '$1"$2n"$3');
  return JSON.parse(s, (r, n) => typeof n == "string" && n.match(/^\d+n$/) ? BigInt(n.substring(0, n.length - 1)) : n);
};
function zs(t) {
  if (typeof t != "string")
    throw new Error(`Cannot safe json parse value of type ${typeof t}`);
  try {
    return x1(t);
  } catch {
    return t;
  }
}
function js(t) {
  return typeof t == "string" ? t : E1(t) || "";
}
function _1(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function Kf(t, ...e) {
  if (!_1(t)) throw new Error("Uint8Array expected");
  if (e.length > 0 && !e.includes(t.length)) throw new Error("Uint8Array expected of length " + e + ", got length=" + t.length);
}
function _l(t, e = !0) {
  if (t.destroyed) throw new Error("Hash instance has been destroyed");
  if (e && t.finished) throw new Error("Hash#digest() has already been called");
}
function I1(t, e) {
  Kf(t);
  const s = e.outputLen;
  if (t.length < s) throw new Error("digestInto() expects output buffer of length at least " + s);
}
const er = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const oo = (t) => new DataView(t.buffer, t.byteOffset, t.byteLength);
function S1(t) {
  if (typeof t != "string") throw new Error("utf8ToBytes expected string, got " + typeof t);
  return new Uint8Array(new TextEncoder().encode(t));
}
function Vf(t) {
  return typeof t == "string" && (t = S1(t)), Kf(t), t;
}
let D1 = class {
  clone() {
    return this._cloneInto();
  }
};
function A1(t) {
  const e = (r) => t().update(Vf(r)).digest(), s = t();
  return e.outputLen = s.outputLen, e.blockLen = s.blockLen, e.create = () => t(), e;
}
function Wf(t = 32) {
  if (er && typeof er.getRandomValues == "function") return er.getRandomValues(new Uint8Array(t));
  if (er && typeof er.randomBytes == "function") return er.randomBytes(t);
  throw new Error("crypto.getRandomValues must be defined");
}
function $1(t, e, s, r) {
  if (typeof t.setBigUint64 == "function") return t.setBigUint64(e, s, r);
  const n = BigInt(32), i = BigInt(4294967295), o = Number(s >> n & i), a = Number(s & i), c = r ? 4 : 0, l = r ? 0 : 4;
  t.setUint32(e + c, o, r), t.setUint32(e + l, a, r);
}
class O1 extends D1 {
  constructor(e, s, r, n) {
    super(), this.blockLen = e, this.outputLen = s, this.padOffset = r, this.isLE = n, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(e), this.view = oo(this.buffer);
  }
  update(e) {
    _l(this);
    const { view: s, buffer: r, blockLen: n } = this;
    e = Vf(e);
    const i = e.length;
    for (let o = 0; o < i; ) {
      const a = Math.min(n - this.pos, i - o);
      if (a === n) {
        const c = oo(e);
        for (; n <= i - o; o += n) this.process(c, o);
        continue;
      }
      r.set(e.subarray(o, o + a), this.pos), this.pos += a, o += a, this.pos === n && (this.process(s, 0), this.pos = 0);
    }
    return this.length += e.length, this.roundClean(), this;
  }
  digestInto(e) {
    _l(this), I1(e, this), this.finished = !0;
    const { buffer: s, view: r, blockLen: n, isLE: i } = this;
    let { pos: o } = this;
    s[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > n - o && (this.process(r, 0), o = 0);
    for (let h = o; h < n; h++) s[h] = 0;
    $1(r, n - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const a = oo(e), c = this.outputLen;
    if (c % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
    const l = c / 4, u = this.get();
    if (l > u.length) throw new Error("_sha2: outputLen bigger than state");
    for (let h = 0; h < l; h++) a.setUint32(4 * h, u[h], i);
  }
  digest() {
    const { buffer: e, outputLen: s } = this;
    this.digestInto(e);
    const r = e.slice(0, s);
    return this.destroy(), r;
  }
  _cloneInto(e) {
    e || (e = new this.constructor()), e.set(...this.get());
    const { blockLen: s, buffer: r, length: n, finished: i, destroyed: o, pos: a } = this;
    return e.length = n, e.pos = a, e.finished = i, e.destroyed = o, n % s && e.buffer.set(r), e;
  }
}
const bn = BigInt(2 ** 32 - 1), Yo = BigInt(32);
function Gf(t, e = !1) {
  return e ? { h: Number(t & bn), l: Number(t >> Yo & bn) } : { h: Number(t >> Yo & bn) | 0, l: Number(t & bn) | 0 };
}
function P1(t, e = !1) {
  let s = new Uint32Array(t.length), r = new Uint32Array(t.length);
  for (let n = 0; n < t.length; n++) {
    const { h: i, l: o } = Gf(t[n], e);
    [s[n], r[n]] = [i, o];
  }
  return [s, r];
}
const T1 = (t, e) => BigInt(t >>> 0) << Yo | BigInt(e >>> 0), B1 = (t, e, s) => t >>> s, R1 = (t, e, s) => t << 32 - s | e >>> s, C1 = (t, e, s) => t >>> s | e << 32 - s, N1 = (t, e, s) => t << 32 - s | e >>> s, U1 = (t, e, s) => t << 64 - s | e >>> s - 32, M1 = (t, e, s) => t >>> s - 32 | e << 64 - s, L1 = (t, e) => e, k1 = (t, e) => t, q1 = (t, e, s) => t << s | e >>> 32 - s, z1 = (t, e, s) => e << s | t >>> 32 - s, j1 = (t, e, s) => e << s - 32 | t >>> 64 - s, F1 = (t, e, s) => t << s - 32 | e >>> 64 - s;
function H1(t, e, s, r) {
  const n = (e >>> 0) + (r >>> 0);
  return { h: t + s + (n / 2 ** 32 | 0) | 0, l: n | 0 };
}
const K1 = (t, e, s) => (t >>> 0) + (e >>> 0) + (s >>> 0), V1 = (t, e, s, r) => e + s + r + (t / 2 ** 32 | 0) | 0, W1 = (t, e, s, r) => (t >>> 0) + (e >>> 0) + (s >>> 0) + (r >>> 0), G1 = (t, e, s, r, n) => e + s + r + n + (t / 2 ** 32 | 0) | 0, Y1 = (t, e, s, r, n) => (t >>> 0) + (e >>> 0) + (s >>> 0) + (r >>> 0) + (n >>> 0), Z1 = (t, e, s, r, n, i) => e + s + r + n + i + (t / 2 ** 32 | 0) | 0, X = { fromBig: Gf, split: P1, toBig: T1, shrSH: B1, shrSL: R1, rotrSH: C1, rotrSL: N1, rotrBH: U1, rotrBL: M1, rotr32H: L1, rotr32L: k1, rotlSH: q1, rotlSL: z1, rotlBH: j1, rotlBL: F1, add: H1, add3L: K1, add3H: V1, add4L: W1, add4H: G1, add5H: Z1, add5L: Y1 }, [X1, J1] = X.split(["0x428a2f98d728ae22", "0x7137449123ef65cd", "0xb5c0fbcfec4d3b2f", "0xe9b5dba58189dbbc", "0x3956c25bf348b538", "0x59f111f1b605d019", "0x923f82a4af194f9b", "0xab1c5ed5da6d8118", "0xd807aa98a3030242", "0x12835b0145706fbe", "0x243185be4ee4b28c", "0x550c7dc3d5ffb4e2", "0x72be5d74f27b896f", "0x80deb1fe3b1696b1", "0x9bdc06a725c71235", "0xc19bf174cf692694", "0xe49b69c19ef14ad2", "0xefbe4786384f25e3", "0x0fc19dc68b8cd5b5", "0x240ca1cc77ac9c65", "0x2de92c6f592b0275", "0x4a7484aa6ea6e483", "0x5cb0a9dcbd41fbd4", "0x76f988da831153b5", "0x983e5152ee66dfab", "0xa831c66d2db43210", "0xb00327c898fb213f", "0xbf597fc7beef0ee4", "0xc6e00bf33da88fc2", "0xd5a79147930aa725", "0x06ca6351e003826f", "0x142929670a0e6e70", "0x27b70a8546d22ffc", "0x2e1b21385c26c926", "0x4d2c6dfc5ac42aed", "0x53380d139d95b3df", "0x650a73548baf63de", "0x766a0abb3c77b2a8", "0x81c2c92e47edaee6", "0x92722c851482353b", "0xa2bfe8a14cf10364", "0xa81a664bbc423001", "0xc24b8b70d0f89791", "0xc76c51a30654be30", "0xd192e819d6ef5218", "0xd69906245565a910", "0xf40e35855771202a", "0x106aa07032bbd1b8", "0x19a4c116b8d2d0c8", "0x1e376c085141ab53", "0x2748774cdf8eeb99", "0x34b0bcb5e19b48a8", "0x391c0cb3c5c95a63", "0x4ed8aa4ae3418acb", "0x5b9cca4f7763e373", "0x682e6ff3d6b2b8a3", "0x748f82ee5defb2fc", "0x78a5636f43172f60", "0x84c87814a1f0ab72", "0x8cc702081a6439ec", "0x90befffa23631e28", "0xa4506cebde82bde9", "0xbef9a3f7b2c67915", "0xc67178f2e372532b", "0xca273eceea26619c", "0xd186b8c721c0c207", "0xeada7dd6cde0eb1e", "0xf57d4f7fee6ed178", "0x06f067aa72176fba", "0x0a637dc5a2c898a6", "0x113f9804bef90dae", "0x1b710b35131c471b", "0x28db77f523047d84", "0x32caab7b40c72493", "0x3c9ebe0a15c9bebc", "0x431d67c49c100d4c", "0x4cc5d4becb3e42b6", "0x597f299cfc657e2a", "0x5fcb6fab3ad6faec", "0x6c44198c4a475817"].map((t) => BigInt(t))), ss = new Uint32Array(80), rs = new Uint32Array(80);
let Q1 = class extends O1 {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  get() {
    const { Ah: e, Al: s, Bh: r, Bl: n, Ch: i, Cl: o, Dh: a, Dl: c, Eh: l, El: u, Fh: h, Fl: f, Gh: d, Gl: g, Hh: w, Hl: m } = this;
    return [e, s, r, n, i, o, a, c, l, u, h, f, d, g, w, m];
  }
  set(e, s, r, n, i, o, a, c, l, u, h, f, d, g, w, m) {
    this.Ah = e | 0, this.Al = s | 0, this.Bh = r | 0, this.Bl = n | 0, this.Ch = i | 0, this.Cl = o | 0, this.Dh = a | 0, this.Dl = c | 0, this.Eh = l | 0, this.El = u | 0, this.Fh = h | 0, this.Fl = f | 0, this.Gh = d | 0, this.Gl = g | 0, this.Hh = w | 0, this.Hl = m | 0;
  }
  process(e, s) {
    for (let E = 0; E < 16; E++, s += 4) ss[E] = e.getUint32(s), rs[E] = e.getUint32(s += 4);
    for (let E = 16; E < 80; E++) {
      const D = ss[E - 15] | 0, $ = rs[E - 15] | 0, R = X.rotrSH(D, $, 1) ^ X.rotrSH(D, $, 8) ^ X.shrSH(D, $, 7), B = X.rotrSL(D, $, 1) ^ X.rotrSL(D, $, 8) ^ X.shrSL(D, $, 7), C = ss[E - 2] | 0, O = rs[E - 2] | 0, z = X.rotrSH(C, O, 19) ^ X.rotrBH(C, O, 61) ^ X.shrSH(C, O, 6), M = X.rotrSL(C, O, 19) ^ X.rotrBL(C, O, 61) ^ X.shrSL(C, O, 6), N = X.add4L(B, M, rs[E - 7], rs[E - 16]), _ = X.add4H(N, R, z, ss[E - 7], ss[E - 16]);
      ss[E] = _ | 0, rs[E] = N | 0;
    }
    let { Ah: r, Al: n, Bh: i, Bl: o, Ch: a, Cl: c, Dh: l, Dl: u, Eh: h, El: f, Fh: d, Fl: g, Gh: w, Gl: m, Hh: S, Hl: T } = this;
    for (let E = 0; E < 80; E++) {
      const D = X.rotrSH(h, f, 14) ^ X.rotrSH(h, f, 18) ^ X.rotrBH(h, f, 41), $ = X.rotrSL(h, f, 14) ^ X.rotrSL(h, f, 18) ^ X.rotrBL(h, f, 41), R = h & d ^ ~h & w, B = f & g ^ ~f & m, C = X.add5L(T, $, B, J1[E], rs[E]), O = X.add5H(C, S, D, R, X1[E], ss[E]), z = C | 0, M = X.rotrSH(r, n, 28) ^ X.rotrBH(r, n, 34) ^ X.rotrBH(r, n, 39), N = X.rotrSL(r, n, 28) ^ X.rotrBL(r, n, 34) ^ X.rotrBL(r, n, 39), _ = r & i ^ r & a ^ i & a, A = n & o ^ n & c ^ o & c;
      S = w | 0, T = m | 0, w = d | 0, m = g | 0, d = h | 0, g = f | 0, { h, l: f } = X.add(l | 0, u | 0, O | 0, z | 0), l = a | 0, u = c | 0, a = i | 0, c = o | 0, i = r | 0, o = n | 0;
      const p = X.add3L(z, N, A);
      r = X.add3H(p, O, M, _), n = p | 0;
    }
    ({ h: r, l: n } = X.add(this.Ah | 0, this.Al | 0, r | 0, n | 0)), { h: i, l: o } = X.add(this.Bh | 0, this.Bl | 0, i | 0, o | 0), { h: a, l: c } = X.add(this.Ch | 0, this.Cl | 0, a | 0, c | 0), { h: l, l: u } = X.add(this.Dh | 0, this.Dl | 0, l | 0, u | 0), { h, l: f } = X.add(this.Eh | 0, this.El | 0, h | 0, f | 0), { h: d, l: g } = X.add(this.Fh | 0, this.Fl | 0, d | 0, g | 0), { h: w, l: m } = X.add(this.Gh | 0, this.Gl | 0, w | 0, m | 0), { h: S, l: T } = X.add(this.Hh | 0, this.Hl | 0, S | 0, T | 0), this.set(r, n, i, o, a, c, l, u, h, f, d, g, w, m, S, T);
  }
  roundClean() {
    ss.fill(0), rs.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
};
const ev = A1(() => new Q1());
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const La = BigInt(0), Yf = BigInt(1), tv = BigInt(2);
function ka(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function qa(t) {
  if (!ka(t)) throw new Error("Uint8Array expected");
}
function ao(t, e) {
  if (typeof e != "boolean") throw new Error(t + " boolean expected, got " + e);
}
const sv = Array.from({ length: 256 }, (t, e) => e.toString(16).padStart(2, "0"));
function za(t) {
  qa(t);
  let e = "";
  for (let s = 0; s < t.length; s++) e += sv[t[s]];
  return e;
}
function Zf(t) {
  if (typeof t != "string") throw new Error("hex string expected, got " + typeof t);
  return t === "" ? La : BigInt("0x" + t);
}
const Bt = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function Il(t) {
  if (t >= Bt._0 && t <= Bt._9) return t - Bt._0;
  if (t >= Bt.A && t <= Bt.F) return t - (Bt.A - 10);
  if (t >= Bt.a && t <= Bt.f) return t - (Bt.a - 10);
}
function Xf(t) {
  if (typeof t != "string") throw new Error("hex string expected, got " + typeof t);
  const e = t.length, s = e / 2;
  if (e % 2) throw new Error("hex string expected, got unpadded hex of length " + e);
  const r = new Uint8Array(s);
  for (let n = 0, i = 0; n < s; n++, i += 2) {
    const o = Il(t.charCodeAt(i)), a = Il(t.charCodeAt(i + 1));
    if (o === void 0 || a === void 0) {
      const c = t[i] + t[i + 1];
      throw new Error('hex string expected, got non-hex character "' + c + '" at index ' + i);
    }
    r[n] = o * 16 + a;
  }
  return r;
}
function rv(t) {
  return Zf(za(t));
}
function Cn(t) {
  return qa(t), Zf(za(Uint8Array.from(t).reverse()));
}
function Jf(t, e) {
  return Xf(t.toString(16).padStart(e * 2, "0"));
}
function Zo(t, e) {
  return Jf(t, e).reverse();
}
function Rt(t, e, s) {
  let r;
  if (typeof e == "string") try {
    r = Xf(e);
  } catch (i) {
    throw new Error(t + " must be hex string or Uint8Array, cause: " + i);
  }
  else if (ka(e)) r = Uint8Array.from(e);
  else throw new Error(t + " must be hex string or Uint8Array");
  const n = r.length;
  if (typeof s == "number" && n !== s) throw new Error(t + " of length " + s + " expected, got " + n);
  return r;
}
function Sl(...t) {
  let e = 0;
  for (let r = 0; r < t.length; r++) {
    const n = t[r];
    qa(n), e += n.length;
  }
  const s = new Uint8Array(e);
  for (let r = 0, n = 0; r < t.length; r++) {
    const i = t[r];
    s.set(i, n), n += i.length;
  }
  return s;
}
const co = (t) => typeof t == "bigint" && La <= t;
function nv(t, e, s) {
  return co(t) && co(e) && co(s) && e <= t && t < s;
}
function Sr(t, e, s, r) {
  if (!nv(e, s, r)) throw new Error("expected valid " + t + ": " + s + " <= n < " + r + ", got " + e);
}
function iv(t) {
  let e;
  for (e = 0; t > La; t >>= Yf, e += 1) ;
  return e;
}
const ov = (t) => (tv << BigInt(t - 1)) - Yf, av = { bigint: (t) => typeof t == "bigint", function: (t) => typeof t == "function", boolean: (t) => typeof t == "boolean", string: (t) => typeof t == "string", stringOrUint8Array: (t) => typeof t == "string" || ka(t), isSafeInteger: (t) => Number.isSafeInteger(t), array: (t) => Array.isArray(t), field: (t, e) => e.Fp.isValid(t), hash: (t) => typeof t == "function" && Number.isSafeInteger(t.outputLen) };
function ja(t, e, s = {}) {
  const r = (n, i, o) => {
    const a = av[i];
    if (typeof a != "function") throw new Error("invalid validator function");
    const c = t[n];
    if (!(o && c === void 0) && !a(c, t)) throw new Error("param " + String(n) + " is invalid. Expected " + i + ", got " + c);
  };
  for (const [n, i] of Object.entries(e)) r(n, i, !1);
  for (const [n, i] of Object.entries(s)) r(n, i, !0);
  return t;
}
function Dl(t) {
  const e = /* @__PURE__ */ new WeakMap();
  return (s, ...r) => {
    const n = e.get(s);
    if (n !== void 0) return n;
    const i = t(s, ...r);
    return e.set(s, i), i;
  };
}
const ve = BigInt(0), ce = BigInt(1), $s = BigInt(2), cv = BigInt(3), Xo = BigInt(4), Al = BigInt(5), $l = BigInt(8);
function pe(t, e) {
  const s = t % e;
  return s >= ve ? s : e + s;
}
function lv(t, e, s) {
  if (e < ve) throw new Error("invalid exponent, negatives unsupported");
  if (s <= ve) throw new Error("invalid modulus");
  if (s === ce) return ve;
  let r = ce;
  for (; e > ve; ) e & ce && (r = r * t % s), t = t * t % s, e >>= ce;
  return r;
}
function wt(t, e, s) {
  let r = t;
  for (; e-- > ve; ) r *= r, r %= s;
  return r;
}
function Ol(t, e) {
  if (t === ve) throw new Error("invert: expected non-zero number");
  if (e <= ve) throw new Error("invert: expected positive modulus, got " + e);
  let s = pe(t, e), r = e, n = ve, i = ce;
  for (; s !== ve; ) {
    const o = r / s, a = r % s, c = n - i * o;
    r = s, s = a, n = i, i = c;
  }
  if (r !== ce) throw new Error("invert: does not exist");
  return pe(n, e);
}
function hv(t) {
  const e = (t - ce) / $s;
  let s, r, n;
  for (s = t - ce, r = 0; s % $s === ve; s /= $s, r++) ;
  for (n = $s; n < t && lv(n, e, t) !== t - ce; n++) if (n > 1e3) throw new Error("Cannot find square root: likely non-prime P");
  if (r === 1) {
    const o = (t + ce) / Xo;
    return function(a, c) {
      const l = a.pow(c, o);
      if (!a.eql(a.sqr(l), c)) throw new Error("Cannot find square root");
      return l;
    };
  }
  const i = (s + ce) / $s;
  return function(o, a) {
    if (o.pow(a, e) === o.neg(o.ONE)) throw new Error("Cannot find square root");
    let c = r, l = o.pow(o.mul(o.ONE, n), s), u = o.pow(a, i), h = o.pow(a, s);
    for (; !o.eql(h, o.ONE); ) {
      if (o.eql(h, o.ZERO)) return o.ZERO;
      let f = 1;
      for (let g = o.sqr(h); f < c && !o.eql(g, o.ONE); f++) g = o.sqr(g);
      const d = o.pow(l, ce << BigInt(c - f - 1));
      l = o.sqr(d), u = o.mul(u, d), h = o.mul(h, l), c = f;
    }
    return u;
  };
}
function uv(t) {
  if (t % Xo === cv) {
    const e = (t + ce) / Xo;
    return function(s, r) {
      const n = s.pow(r, e);
      if (!s.eql(s.sqr(n), r)) throw new Error("Cannot find square root");
      return n;
    };
  }
  if (t % $l === Al) {
    const e = (t - Al) / $l;
    return function(s, r) {
      const n = s.mul(r, $s), i = s.pow(n, e), o = s.mul(r, i), a = s.mul(s.mul(o, $s), i), c = s.mul(o, s.sub(a, s.ONE));
      if (!s.eql(s.sqr(c), r)) throw new Error("Cannot find square root");
      return c;
    };
  }
  return hv(t);
}
const fv = (t, e) => (pe(t, e) & ce) === ce, dv = ["create", "isValid", "is0", "neg", "inv", "sqrt", "sqr", "eql", "add", "sub", "mul", "pow", "div", "addN", "subN", "mulN", "sqrN"];
function pv(t) {
  const e = { ORDER: "bigint", MASK: "bigint", BYTES: "isSafeInteger", BITS: "isSafeInteger" }, s = dv.reduce((r, n) => (r[n] = "function", r), e);
  return ja(t, s);
}
function gv(t, e, s) {
  if (s < ve) throw new Error("invalid exponent, negatives unsupported");
  if (s === ve) return t.ONE;
  if (s === ce) return e;
  let r = t.ONE, n = e;
  for (; s > ve; ) s & ce && (r = t.mul(r, n)), n = t.sqr(n), s >>= ce;
  return r;
}
function yv(t, e) {
  const s = new Array(e.length), r = e.reduce((i, o, a) => t.is0(o) ? i : (s[a] = i, t.mul(i, o)), t.ONE), n = t.inv(r);
  return e.reduceRight((i, o, a) => t.is0(o) ? i : (s[a] = t.mul(i, s[a]), t.mul(i, o)), n), s;
}
function Qf(t, e) {
  const s = e !== void 0 ? e : t.toString(2).length, r = Math.ceil(s / 8);
  return { nBitLength: s, nByteLength: r };
}
function ed(t, e, s = !1, r = {}) {
  if (t <= ve) throw new Error("invalid field: expected ORDER > 0, got " + t);
  const { nBitLength: n, nByteLength: i } = Qf(t, e);
  if (i > 2048) throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let o;
  const a = Object.freeze({ ORDER: t, isLE: s, BITS: n, BYTES: i, MASK: ov(n), ZERO: ve, ONE: ce, create: (c) => pe(c, t), isValid: (c) => {
    if (typeof c != "bigint") throw new Error("invalid field element: expected bigint, got " + typeof c);
    return ve <= c && c < t;
  }, is0: (c) => c === ve, isOdd: (c) => (c & ce) === ce, neg: (c) => pe(-c, t), eql: (c, l) => c === l, sqr: (c) => pe(c * c, t), add: (c, l) => pe(c + l, t), sub: (c, l) => pe(c - l, t), mul: (c, l) => pe(c * l, t), pow: (c, l) => gv(a, c, l), div: (c, l) => pe(c * Ol(l, t), t), sqrN: (c) => c * c, addN: (c, l) => c + l, subN: (c, l) => c - l, mulN: (c, l) => c * l, inv: (c) => Ol(c, t), sqrt: r.sqrt || ((c) => (o || (o = uv(t)), o(a, c))), invertBatch: (c) => yv(a, c), cmov: (c, l, u) => u ? l : c, toBytes: (c) => s ? Zo(c, i) : Jf(c, i), fromBytes: (c) => {
    if (c.length !== i) throw new Error("Field.fromBytes: expected " + i + " bytes, got " + c.length);
    return s ? Cn(c) : rv(c);
  } });
  return Object.freeze(a);
}
const Pl = BigInt(0), vn = BigInt(1);
function lo(t, e) {
  const s = e.negate();
  return t ? s : e;
}
function td(t, e) {
  if (!Number.isSafeInteger(t) || t <= 0 || t > e) throw new Error("invalid window size, expected [1.." + e + "], got W=" + t);
}
function ho(t, e) {
  td(t, e);
  const s = Math.ceil(e / t) + 1, r = 2 ** (t - 1);
  return { windows: s, windowSize: r };
}
function wv(t, e) {
  if (!Array.isArray(t)) throw new Error("array expected");
  t.forEach((s, r) => {
    if (!(s instanceof e)) throw new Error("invalid point at index " + r);
  });
}
function mv(t, e) {
  if (!Array.isArray(t)) throw new Error("array of scalars expected");
  t.forEach((s, r) => {
    if (!e.isValid(s)) throw new Error("invalid scalar at index " + r);
  });
}
const uo = /* @__PURE__ */ new WeakMap(), sd = /* @__PURE__ */ new WeakMap();
function fo(t) {
  return sd.get(t) || 1;
}
function bv(t, e) {
  return { constTimeNegate: lo, hasPrecomputes(s) {
    return fo(s) !== 1;
  }, unsafeLadder(s, r, n = t.ZERO) {
    let i = s;
    for (; r > Pl; ) r & vn && (n = n.add(i)), i = i.double(), r >>= vn;
    return n;
  }, precomputeWindow(s, r) {
    const { windows: n, windowSize: i } = ho(r, e), o = [];
    let a = s, c = a;
    for (let l = 0; l < n; l++) {
      c = a, o.push(c);
      for (let u = 1; u < i; u++) c = c.add(a), o.push(c);
      a = c.double();
    }
    return o;
  }, wNAF(s, r, n) {
    const { windows: i, windowSize: o } = ho(s, e);
    let a = t.ZERO, c = t.BASE;
    const l = BigInt(2 ** s - 1), u = 2 ** s, h = BigInt(s);
    for (let f = 0; f < i; f++) {
      const d = f * o;
      let g = Number(n & l);
      n >>= h, g > o && (g -= u, n += vn);
      const w = d, m = d + Math.abs(g) - 1, S = f % 2 !== 0, T = g < 0;
      g === 0 ? c = c.add(lo(S, r[w])) : a = a.add(lo(T, r[m]));
    }
    return { p: a, f: c };
  }, wNAFUnsafe(s, r, n, i = t.ZERO) {
    const { windows: o, windowSize: a } = ho(s, e), c = BigInt(2 ** s - 1), l = 2 ** s, u = BigInt(s);
    for (let h = 0; h < o; h++) {
      const f = h * a;
      if (n === Pl) break;
      let d = Number(n & c);
      if (n >>= u, d > a && (d -= l, n += vn), d === 0) continue;
      let g = r[f + Math.abs(d) - 1];
      d < 0 && (g = g.negate()), i = i.add(g);
    }
    return i;
  }, getPrecomputes(s, r, n) {
    let i = uo.get(r);
    return i || (i = this.precomputeWindow(r, s), s !== 1 && uo.set(r, n(i))), i;
  }, wNAFCached(s, r, n) {
    const i = fo(s);
    return this.wNAF(i, this.getPrecomputes(i, s, n), r);
  }, wNAFCachedUnsafe(s, r, n, i) {
    const o = fo(s);
    return o === 1 ? this.unsafeLadder(s, r, i) : this.wNAFUnsafe(o, this.getPrecomputes(o, s, n), r, i);
  }, setWindowSize(s, r) {
    td(r, e), sd.set(s, r), uo.delete(s);
  } };
}
function vv(t, e, s, r) {
  if (wv(s, t), mv(r, e), s.length !== r.length) throw new Error("arrays of points and scalars must have equal length");
  const n = t.ZERO, i = iv(BigInt(s.length)), o = i > 12 ? i - 3 : i > 4 ? i - 2 : i ? 2 : 1, a = (1 << o) - 1, c = new Array(a + 1).fill(n), l = Math.floor((e.BITS - 1) / o) * o;
  let u = n;
  for (let h = l; h >= 0; h -= o) {
    c.fill(n);
    for (let d = 0; d < r.length; d++) {
      const g = r[d], w = Number(g >> BigInt(h) & BigInt(a));
      c[w] = c[w].add(s[d]);
    }
    let f = n;
    for (let d = c.length - 1, g = n; d > 0; d--) g = g.add(c[d]), f = f.add(g);
    if (u = u.add(f), h !== 0) for (let d = 0; d < o; d++) u = u.double();
  }
  return u;
}
function Ev(t) {
  return pv(t.Fp), ja(t, { n: "bigint", h: "bigint", Gx: "field", Gy: "field" }, { nBitLength: "isSafeInteger", nByteLength: "isSafeInteger" }), Object.freeze({ ...Qf(t.n, t.nBitLength), ...t, p: t.Fp.ORDER });
}
const ot = BigInt(0), Me = BigInt(1), En = BigInt(2), xv = BigInt(8), _v = { zip215: !0 };
function Iv(t) {
  const e = Ev(t);
  return ja(t, { hash: "function", a: "bigint", d: "bigint", randomBytes: "function" }, { adjustScalarBytes: "function", domain: "function", uvRatio: "function", mapToCurve: "function" }), Object.freeze({ ...e });
}
function Sv(t) {
  const e = Iv(t), { Fp: s, n: r, prehash: n, hash: i, randomBytes: o, nByteLength: a, h: c } = e, l = En << BigInt(a * 8) - Me, u = s.create, h = ed(e.n, e.nBitLength), f = e.uvRatio || ((p, y) => {
    try {
      return { isValid: !0, value: s.sqrt(p * s.inv(y)) };
    } catch {
      return { isValid: !1, value: ot };
    }
  }), d = e.adjustScalarBytes || ((p) => p), g = e.domain || ((p, y, b) => {
    if (ao("phflag", b), y.length || b) throw new Error("Contexts/pre-hash are not supported");
    return p;
  });
  function w(p, y) {
    Sr("coordinate " + p, y, ot, l);
  }
  function m(p) {
    if (!(p instanceof E)) throw new Error("ExtendedPoint expected");
  }
  const S = Dl((p, y) => {
    const { ex: b, ey: I, ez: v } = p, x = p.is0();
    y == null && (y = x ? xv : s.inv(v));
    const P = u(b * y), U = u(I * y), F = u(v * y);
    if (x) return { x: ot, y: Me };
    if (F !== Me) throw new Error("invZ was invalid");
    return { x: P, y: U };
  }), T = Dl((p) => {
    const { a: y, d: b } = e;
    if (p.is0()) throw new Error("bad point: ZERO");
    const { ex: I, ey: v, ez: x, et: P } = p, U = u(I * I), F = u(v * v), L = u(x * x), q = u(L * L), K = u(U * y), W = u(L * u(K + F)), Y = u(q + u(b * u(U * F)));
    if (W !== Y) throw new Error("bad point: equation left != right (1)");
    const V = u(I * v), J = u(x * P);
    if (V !== J) throw new Error("bad point: equation left != right (2)");
    return !0;
  });
  class E {
    constructor(y, b, I, v) {
      this.ex = y, this.ey = b, this.ez = I, this.et = v, w("x", y), w("y", b), w("z", I), w("t", v), Object.freeze(this);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static fromAffine(y) {
      if (y instanceof E) throw new Error("extended point not allowed");
      const { x: b, y: I } = y || {};
      return w("x", b), w("y", I), new E(b, I, Me, u(b * I));
    }
    static normalizeZ(y) {
      const b = s.invertBatch(y.map((I) => I.ez));
      return y.map((I, v) => I.toAffine(b[v])).map(E.fromAffine);
    }
    static msm(y, b) {
      return vv(E, h, y, b);
    }
    _setWindowSize(y) {
      R.setWindowSize(this, y);
    }
    assertValidity() {
      T(this);
    }
    equals(y) {
      m(y);
      const { ex: b, ey: I, ez: v } = this, { ex: x, ey: P, ez: U } = y, F = u(b * U), L = u(x * v), q = u(I * U), K = u(P * v);
      return F === L && q === K;
    }
    is0() {
      return this.equals(E.ZERO);
    }
    negate() {
      return new E(u(-this.ex), this.ey, this.ez, u(-this.et));
    }
    double() {
      const { a: y } = e, { ex: b, ey: I, ez: v } = this, x = u(b * b), P = u(I * I), U = u(En * u(v * v)), F = u(y * x), L = b + I, q = u(u(L * L) - x - P), K = F + P, W = K - U, Y = F - P, V = u(q * W), J = u(K * Y), le = u(q * Y), he = u(W * K);
      return new E(V, J, he, le);
    }
    add(y) {
      m(y);
      const { a: b, d: I } = e, { ex: v, ey: x, ez: P, et: U } = this, { ex: F, ey: L, ez: q, et: K } = y;
      if (b === BigInt(-1)) {
        const pc = u((x - v) * (L + F)), gc = u((x + v) * (L - F)), Ri = u(gc - pc);
        if (Ri === ot) return this.double();
        const yc = u(P * En * K), wc = u(U * En * q), mc = wc + yc, bc = gc + pc, vc = wc - yc, ig = u(mc * Ri), og = u(bc * vc), ag = u(mc * vc), cg = u(Ri * bc);
        return new E(ig, og, cg, ag);
      }
      const W = u(v * F), Y = u(x * L), V = u(U * I * K), J = u(P * q), le = u((v + x) * (F + L) - W - Y), he = J - V, we = J + V, nt = u(Y - b * W), it = u(le * he), hn = u(we * nt), rg = u(le * nt), ng = u(he * we);
      return new E(it, hn, ng, rg);
    }
    subtract(y) {
      return this.add(y.negate());
    }
    wNAF(y) {
      return R.wNAFCached(this, y, E.normalizeZ);
    }
    multiply(y) {
      const b = y;
      Sr("scalar", b, Me, r);
      const { p: I, f: v } = this.wNAF(b);
      return E.normalizeZ([I, v])[0];
    }
    multiplyUnsafe(y, b = E.ZERO) {
      const I = y;
      return Sr("scalar", I, ot, r), I === ot ? $ : this.is0() || I === Me ? this : R.wNAFCachedUnsafe(this, I, E.normalizeZ, b);
    }
    isSmallOrder() {
      return this.multiplyUnsafe(c).is0();
    }
    isTorsionFree() {
      return R.unsafeLadder(this, r).is0();
    }
    toAffine(y) {
      return S(this, y);
    }
    clearCofactor() {
      const { h: y } = e;
      return y === Me ? this : this.multiplyUnsafe(y);
    }
    static fromHex(y, b = !1) {
      const { d: I, a: v } = e, x = s.BYTES;
      y = Rt("pointHex", y, x), ao("zip215", b);
      const P = y.slice(), U = y[x - 1];
      P[x - 1] = U & -129;
      const F = Cn(P), L = b ? l : s.ORDER;
      Sr("pointHex.y", F, ot, L);
      const q = u(F * F), K = u(q - Me), W = u(I * q - v);
      let { isValid: Y, value: V } = f(K, W);
      if (!Y) throw new Error("Point.fromHex: invalid y coordinate");
      const J = (V & Me) === Me, le = (U & 128) !== 0;
      if (!b && V === ot && le) throw new Error("Point.fromHex: x=0 and x_0=1");
      return le !== J && (V = u(-V)), E.fromAffine({ x: V, y: F });
    }
    static fromPrivateKey(y) {
      return O(y).point;
    }
    toRawBytes() {
      const { x: y, y: b } = this.toAffine(), I = Zo(b, s.BYTES);
      return I[I.length - 1] |= y & Me ? 128 : 0, I;
    }
    toHex() {
      return za(this.toRawBytes());
    }
  }
  E.BASE = new E(e.Gx, e.Gy, Me, u(e.Gx * e.Gy)), E.ZERO = new E(ot, Me, Me, ot);
  const { BASE: D, ZERO: $ } = E, R = bv(E, a * 8);
  function B(p) {
    return pe(p, r);
  }
  function C(p) {
    return B(Cn(p));
  }
  function O(p) {
    const y = s.BYTES;
    p = Rt("private key", p, y);
    const b = Rt("hashed private key", i(p), 2 * y), I = d(b.slice(0, y)), v = b.slice(y, 2 * y), x = C(I), P = D.multiply(x), U = P.toRawBytes();
    return { head: I, prefix: v, scalar: x, point: P, pointBytes: U };
  }
  function z(p) {
    return O(p).pointBytes;
  }
  function M(p = new Uint8Array(), ...y) {
    const b = Sl(...y);
    return C(i(g(b, Rt("context", p), !!n)));
  }
  function N(p, y, b = {}) {
    p = Rt("message", p), n && (p = n(p));
    const { prefix: I, scalar: v, pointBytes: x } = O(y), P = M(b.context, I, p), U = D.multiply(P).toRawBytes(), F = M(b.context, U, x, p), L = B(P + F * v);
    Sr("signature.s", L, ot, r);
    const q = Sl(U, Zo(L, s.BYTES));
    return Rt("result", q, s.BYTES * 2);
  }
  const _ = _v;
  function A(p, y, b, I = _) {
    const { context: v, zip215: x } = I, P = s.BYTES;
    p = Rt("signature", p, 2 * P), y = Rt("message", y), b = Rt("publicKey", b, P), x !== void 0 && ao("zip215", x), n && (y = n(y));
    const U = Cn(p.slice(P, 2 * P));
    let F, L, q;
    try {
      F = E.fromHex(b, x), L = E.fromHex(p.slice(0, P), x), q = D.multiplyUnsafe(U);
    } catch {
      return !1;
    }
    if (!x && F.isSmallOrder()) return !1;
    const K = M(v, L.toRawBytes(), F.toRawBytes(), y);
    return L.add(F.multiplyUnsafe(K)).subtract(q).clearCofactor().equals(E.ZERO);
  }
  return D._setWindowSize(8), { CURVE: e, getPublicKey: z, sign: N, verify: A, ExtendedPoint: E, utils: { getExtendedPublicKey: O, randomPrivateKey: () => o(s.BYTES), precompute(p = 8, y = E.BASE) {
    return y._setWindowSize(p), y.multiply(BigInt(3)), y;
  } } };
}
BigInt(0), BigInt(1);
const Fa = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949"), Tl = BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
BigInt(0);
const Dv = BigInt(1), Bl = BigInt(2);
BigInt(3);
const Av = BigInt(5), $v = BigInt(8);
function Ov(t) {
  const e = BigInt(10), s = BigInt(20), r = BigInt(40), n = BigInt(80), i = Fa, o = t * t % i * t % i, a = wt(o, Bl, i) * o % i, c = wt(a, Dv, i) * t % i, l = wt(c, Av, i) * c % i, u = wt(l, e, i) * l % i, h = wt(u, s, i) * u % i, f = wt(h, r, i) * h % i, d = wt(f, n, i) * f % i, g = wt(d, n, i) * f % i, w = wt(g, e, i) * l % i;
  return { pow_p_5_8: wt(w, Bl, i) * t % i, b2: o };
}
function Pv(t) {
  return t[0] &= 248, t[31] &= 127, t[31] |= 64, t;
}
function Tv(t, e) {
  const s = Fa, r = pe(e * e * e, s), n = pe(r * r * e, s), i = Ov(t * n).pow_p_5_8;
  let o = pe(t * r * i, s);
  const a = pe(e * o * o, s), c = o, l = pe(o * Tl, s), u = a === t, h = a === pe(-t, s), f = a === pe(-t * Tl, s);
  return u && (o = c), (h || f) && (o = l), fv(o, s) && (o = pe(-o, s)), { isValid: u || h, value: o };
}
const Bv = ed(Fa, void 0, !0), Rv = { a: BigInt(-1), d: BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"), Fp: Bv, n: BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989"), h: $v, Gx: BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"), Gy: BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960"), hash: ev, randomBytes: Wf, adjustScalarBytes: Pv, uvRatio: Tv }, rd = Sv(Rv), Cv = "EdDSA", Nv = "JWT", ti = ".", Ii = "base64url", nd = "utf8", id = "utf8", Uv = ":", Mv = "did", Lv = "key", Rl = "base58btc", kv = "z", qv = "K36", zv = 32;
function Ha(t) {
  return globalThis.Buffer != null ? new Uint8Array(t.buffer, t.byteOffset, t.byteLength) : t;
}
function od(t = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? Ha(globalThis.Buffer.allocUnsafe(t)) : new Uint8Array(t);
}
function ad(t, e) {
  e || (e = t.reduce((n, i) => n + i.length, 0));
  const s = od(e);
  let r = 0;
  for (const n of t) s.set(n, r), r += n.length;
  return Ha(s);
}
function jv(t, e) {
  if (t.length >= 255) throw new TypeError("Alphabet too long");
  for (var s = new Uint8Array(256), r = 0; r < s.length; r++) s[r] = 255;
  for (var n = 0; n < t.length; n++) {
    var i = t.charAt(n), o = i.charCodeAt(0);
    if (s[o] !== 255) throw new TypeError(i + " is ambiguous");
    s[o] = n;
  }
  var a = t.length, c = t.charAt(0), l = Math.log(a) / Math.log(256), u = Math.log(256) / Math.log(a);
  function h(g) {
    if (g instanceof Uint8Array || (ArrayBuffer.isView(g) ? g = new Uint8Array(g.buffer, g.byteOffset, g.byteLength) : Array.isArray(g) && (g = Uint8Array.from(g))), !(g instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
    if (g.length === 0) return "";
    for (var w = 0, m = 0, S = 0, T = g.length; S !== T && g[S] === 0; ) S++, w++;
    for (var E = (T - S) * u + 1 >>> 0, D = new Uint8Array(E); S !== T; ) {
      for (var $ = g[S], R = 0, B = E - 1; ($ !== 0 || R < m) && B !== -1; B--, R++) $ += 256 * D[B] >>> 0, D[B] = $ % a >>> 0, $ = $ / a >>> 0;
      if ($ !== 0) throw new Error("Non-zero carry");
      m = R, S++;
    }
    for (var C = E - m; C !== E && D[C] === 0; ) C++;
    for (var O = c.repeat(w); C < E; ++C) O += t.charAt(D[C]);
    return O;
  }
  function f(g) {
    if (typeof g != "string") throw new TypeError("Expected String");
    if (g.length === 0) return new Uint8Array();
    var w = 0;
    if (g[w] !== " ") {
      for (var m = 0, S = 0; g[w] === c; ) m++, w++;
      for (var T = (g.length - w) * l + 1 >>> 0, E = new Uint8Array(T); g[w]; ) {
        var D = s[g.charCodeAt(w)];
        if (D === 255) return;
        for (var $ = 0, R = T - 1; (D !== 0 || $ < S) && R !== -1; R--, $++) D += a * E[R] >>> 0, E[R] = D % 256 >>> 0, D = D / 256 >>> 0;
        if (D !== 0) throw new Error("Non-zero carry");
        S = $, w++;
      }
      if (g[w] !== " ") {
        for (var B = T - S; B !== T && E[B] === 0; ) B++;
        for (var C = new Uint8Array(m + (T - B)), O = m; B !== T; ) C[O++] = E[B++];
        return C;
      }
    }
  }
  function d(g) {
    var w = f(g);
    if (w) return w;
    throw new Error(`Non-${e} character`);
  }
  return { encode: h, decodeUnsafe: f, decode: d };
}
var Fv = jv, Hv = Fv;
const cd = (t) => {
  if (t instanceof Uint8Array && t.constructor.name === "Uint8Array") return t;
  if (t instanceof ArrayBuffer) return new Uint8Array(t);
  if (ArrayBuffer.isView(t)) return new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
  throw new Error("Unknown type, must be binary type");
}, Kv = (t) => new TextEncoder().encode(t), Vv = (t) => new TextDecoder().decode(t);
let Wv = class {
  constructor(e, s, r) {
    this.name = e, this.prefix = s, this.baseEncode = r;
  }
  encode(e) {
    if (e instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e)}`;
    throw Error("Unknown type, must be binary type");
  }
}, Gv = class {
  constructor(e, s, r) {
    if (this.name = e, this.prefix = s, s.codePointAt(0) === void 0) throw new Error("Invalid prefix character");
    this.prefixCodePoint = s.codePointAt(0), this.baseDecode = r;
  }
  decode(e) {
    if (typeof e == "string") {
      if (e.codePointAt(0) !== this.prefixCodePoint) throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(e.slice(this.prefix.length));
    } else throw Error("Can only multibase decode strings");
  }
  or(e) {
    return ld(this, e);
  }
}, Yv = class {
  constructor(e) {
    this.decoders = e;
  }
  or(e) {
    return ld(this, e);
  }
  decode(e) {
    const s = e[0], r = this.decoders[s];
    if (r) return r.decode(e);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
};
const ld = (t, e) => new Yv({ ...t.decoders || { [t.prefix]: t }, ...e.decoders || { [e.prefix]: e } });
let Zv = class {
  constructor(e, s, r, n) {
    this.name = e, this.prefix = s, this.baseEncode = r, this.baseDecode = n, this.encoder = new Wv(e, s, r), this.decoder = new Gv(e, s, n);
  }
  encode(e) {
    return this.encoder.encode(e);
  }
  decode(e) {
    return this.decoder.decode(e);
  }
};
const Si = ({ name: t, prefix: e, encode: s, decode: r }) => new Zv(t, e, s, r), on = ({ prefix: t, name: e, alphabet: s }) => {
  const { encode: r, decode: n } = Hv(s, e);
  return Si({ prefix: t, name: e, encode: r, decode: (i) => cd(n(i)) });
}, Xv = (t, e, s, r) => {
  const n = {};
  for (let u = 0; u < e.length; ++u) n[e[u]] = u;
  let i = t.length;
  for (; t[i - 1] === "="; ) --i;
  const o = new Uint8Array(i * s / 8 | 0);
  let a = 0, c = 0, l = 0;
  for (let u = 0; u < i; ++u) {
    const h = n[t[u]];
    if (h === void 0) throw new SyntaxError(`Non-${r} character`);
    c = c << s | h, a += s, a >= 8 && (a -= 8, o[l++] = 255 & c >> a);
  }
  if (a >= s || 255 & c << 8 - a) throw new SyntaxError("Unexpected end of data");
  return o;
}, Jv = (t, e, s) => {
  const r = e[e.length - 1] === "=", n = (1 << s) - 1;
  let i = "", o = 0, a = 0;
  for (let c = 0; c < t.length; ++c) for (a = a << 8 | t[c], o += 8; o > s; ) o -= s, i += e[n & a >> o];
  if (o && (i += e[n & a << s - o]), r) for (; i.length * s & 7; ) i += "=";
  return i;
}, De = ({ name: t, prefix: e, bitsPerChar: s, alphabet: r }) => Si({ prefix: e, name: t, encode(n) {
  return Jv(n, r, s);
}, decode(n) {
  return Xv(n, r, s, t);
} }), Qv = Si({ prefix: "\0", name: "identity", encode: (t) => Vv(t), decode: (t) => Kv(t) });
var eE = Object.freeze({ __proto__: null, identity: Qv });
const tE = De({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
var sE = Object.freeze({ __proto__: null, base2: tE });
const rE = De({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 });
var nE = Object.freeze({ __proto__: null, base8: rE });
const iE = on({ prefix: "9", name: "base10", alphabet: "0123456789" });
var oE = Object.freeze({ __proto__: null, base10: iE });
const aE = De({ prefix: "f", name: "base16", alphabet: "0123456789abcdef", bitsPerChar: 4 }), cE = De({ prefix: "F", name: "base16upper", alphabet: "0123456789ABCDEF", bitsPerChar: 4 });
var lE = Object.freeze({ __proto__: null, base16: aE, base16upper: cE });
const hE = De({ prefix: "b", name: "base32", alphabet: "abcdefghijklmnopqrstuvwxyz234567", bitsPerChar: 5 }), uE = De({ prefix: "B", name: "base32upper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bitsPerChar: 5 }), fE = De({ prefix: "c", name: "base32pad", alphabet: "abcdefghijklmnopqrstuvwxyz234567=", bitsPerChar: 5 }), dE = De({ prefix: "C", name: "base32padupper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=", bitsPerChar: 5 }), pE = De({ prefix: "v", name: "base32hex", alphabet: "0123456789abcdefghijklmnopqrstuv", bitsPerChar: 5 }), gE = De({ prefix: "V", name: "base32hexupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV", bitsPerChar: 5 }), yE = De({ prefix: "t", name: "base32hexpad", alphabet: "0123456789abcdefghijklmnopqrstuv=", bitsPerChar: 5 }), wE = De({ prefix: "T", name: "base32hexpadupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=", bitsPerChar: 5 }), mE = De({ prefix: "h", name: "base32z", alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769", bitsPerChar: 5 });
var bE = Object.freeze({ __proto__: null, base32: hE, base32upper: uE, base32pad: fE, base32padupper: dE, base32hex: pE, base32hexupper: gE, base32hexpad: yE, base32hexpadupper: wE, base32z: mE });
const vE = on({ prefix: "k", name: "base36", alphabet: "0123456789abcdefghijklmnopqrstuvwxyz" }), EE = on({ prefix: "K", name: "base36upper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" });
var xE = Object.freeze({ __proto__: null, base36: vE, base36upper: EE });
const _E = on({ name: "base58btc", prefix: "z", alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" }), IE = on({ name: "base58flickr", prefix: "Z", alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" });
var SE = Object.freeze({ __proto__: null, base58btc: _E, base58flickr: IE });
const DE = De({ prefix: "m", name: "base64", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", bitsPerChar: 6 }), AE = De({ prefix: "M", name: "base64pad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bitsPerChar: 6 }), $E = De({ prefix: "u", name: "base64url", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bitsPerChar: 6 }), OE = De({ prefix: "U", name: "base64urlpad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=", bitsPerChar: 6 });
var PE = Object.freeze({ __proto__: null, base64: DE, base64pad: AE, base64url: $E, base64urlpad: OE });
const hd = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂"), TE = hd.reduce((t, e, s) => (t[s] = e, t), []), BE = hd.reduce((t, e, s) => (t[e.codePointAt(0)] = s, t), []);
function RE(t) {
  return t.reduce((e, s) => (e += TE[s], e), "");
}
function CE(t) {
  const e = [];
  for (const s of t) {
    const r = BE[s.codePointAt(0)];
    if (r === void 0) throw new Error(`Non-base256emoji character: ${s}`);
    e.push(r);
  }
  return new Uint8Array(e);
}
const NE = Si({ prefix: "🚀", name: "base256emoji", encode: RE, decode: CE });
var UE = Object.freeze({ __proto__: null, base256emoji: NE }), ME = ud, Cl = 128, LE = -128, kE = Math.pow(2, 31);
function ud(t, e, s) {
  e = e || [], s = s || 0;
  for (var r = s; t >= kE; ) e[s++] = t & 255 | Cl, t /= 128;
  for (; t & LE; ) e[s++] = t & 255 | Cl, t >>>= 7;
  return e[s] = t | 0, ud.bytes = s - r + 1, e;
}
var qE = Jo, zE = 128, Nl = 127;
function Jo(t, r) {
  var s = 0, r = r || 0, n = 0, i = r, o, a = t.length;
  do {
    if (i >= a) throw Jo.bytes = 0, new RangeError("Could not decode varint");
    o = t[i++], s += n < 28 ? (o & Nl) << n : (o & Nl) * Math.pow(2, n), n += 7;
  } while (o >= zE);
  return Jo.bytes = i - r, s;
}
var jE = Math.pow(2, 7), FE = Math.pow(2, 14), HE = Math.pow(2, 21), KE = Math.pow(2, 28), VE = Math.pow(2, 35), WE = Math.pow(2, 42), GE = Math.pow(2, 49), YE = Math.pow(2, 56), ZE = Math.pow(2, 63), XE = function(t) {
  return t < jE ? 1 : t < FE ? 2 : t < HE ? 3 : t < KE ? 4 : t < VE ? 5 : t < WE ? 6 : t < GE ? 7 : t < YE ? 8 : t < ZE ? 9 : 10;
}, JE = { encode: ME, decode: qE, encodingLength: XE }, fd = JE;
const Ul = (t, e, s = 0) => (fd.encode(t, e, s), e), Ml = (t) => fd.encodingLength(t), Qo = (t, e) => {
  const s = e.byteLength, r = Ml(t), n = r + Ml(s), i = new Uint8Array(n + s);
  return Ul(t, i, 0), Ul(s, i, r), i.set(e, n), new QE(t, s, e, i);
};
let QE = class {
  constructor(e, s, r, n) {
    this.code = e, this.size = s, this.digest = r, this.bytes = n;
  }
};
const dd = ({ name: t, code: e, encode: s }) => new e2(t, e, s);
let e2 = class {
  constructor(e, s, r) {
    this.name = e, this.code = s, this.encode = r;
  }
  digest(e) {
    if (e instanceof Uint8Array) {
      const s = this.encode(e);
      return s instanceof Uint8Array ? Qo(this.code, s) : s.then((r) => Qo(this.code, r));
    } else throw Error("Unknown type, must be binary type");
  }
};
const pd = (t) => async (e) => new Uint8Array(await crypto.subtle.digest(t, e)), t2 = dd({ name: "sha2-256", code: 18, encode: pd("SHA-256") }), s2 = dd({ name: "sha2-512", code: 19, encode: pd("SHA-512") });
var r2 = Object.freeze({ __proto__: null, sha256: t2, sha512: s2 });
const gd = 0, n2 = "identity", yd = cd, i2 = (t) => Qo(gd, yd(t)), o2 = { code: gd, name: n2, encode: yd, digest: i2 };
var a2 = Object.freeze({ __proto__: null, identity: o2 });
new TextEncoder(), new TextDecoder();
const Ll = { ...eE, ...sE, ...nE, ...oE, ...lE, ...bE, ...xE, ...SE, ...PE, ...UE };
({ ...r2, ...a2 });
function wd(t, e, s, r) {
  return { name: t, prefix: e, encoder: { name: t, prefix: e, encode: s }, decoder: { decode: r } };
}
const kl = wd("utf8", "u", (t) => "u" + new TextDecoder("utf8").decode(t), (t) => new TextEncoder().encode(t.substring(1))), po = wd("ascii", "a", (t) => {
  let e = "a";
  for (let s = 0; s < t.length; s++) e += String.fromCharCode(t[s]);
  return e;
}, (t) => {
  t = t.substring(1);
  const e = od(t.length);
  for (let s = 0; s < t.length; s++) e[s] = t.charCodeAt(s);
  return e;
}), md = { utf8: kl, "utf-8": kl, hex: Ll.base16, latin1: po, ascii: po, binary: po, ...Ll };
function Di(t, e = "utf8") {
  const s = md[e];
  if (!s) throw new Error(`Unsupported encoding "${e}"`);
  return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(t.buffer, t.byteOffset, t.byteLength).toString("utf8") : s.encoder.encode(t).substring(1);
}
function yr(t, e = "utf8") {
  const s = md[e];
  if (!s) throw new Error(`Unsupported encoding "${e}"`);
  return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? Ha(globalThis.Buffer.from(t, "utf-8")) : s.decoder.decode(`${s.prefix}${t}`);
}
function ql(t) {
  return zs(Di(yr(t, Ii), nd));
}
function si(t) {
  return Di(yr(js(t), nd), Ii);
}
function bd(t) {
  const e = yr(qv, Rl), s = kv + Di(ad([e, t]), Rl);
  return [Mv, Lv, s].join(Uv);
}
function c2(t) {
  return Di(t, Ii);
}
function l2(t) {
  return yr(t, Ii);
}
function h2(t) {
  return yr([si(t.header), si(t.payload)].join(ti), id);
}
function u2(t) {
  return [si(t.header), si(t.payload), c2(t.signature)].join(ti);
}
function ea(t) {
  const e = t.split(ti), s = ql(e[0]), r = ql(e[1]), n = l2(e[2]), i = yr(e.slice(0, 2).join(ti), id);
  return { header: s, payload: r, signature: n, data: i };
}
function zl(t = Wf(zv)) {
  const e = rd.getPublicKey(t);
  return { secretKey: ad([t, e]), publicKey: e };
}
async function f2(t, e, s, r, n = k.fromMiliseconds(Date.now())) {
  const i = { alg: Cv, typ: Nv }, o = bd(r.publicKey), a = n + s, c = { iss: o, sub: t, aud: e, iat: n, exp: a }, l = h2({ header: i, payload: c }), u = rd.sign(l, r.secretKey.slice(0, 32));
  return u2({ header: i, payload: c, signature: u });
}
const d2 = { waku: { publish: "waku_publish", batchPublish: "waku_batchPublish", subscribe: "waku_subscribe", batchSubscribe: "waku_batchSubscribe", subscription: "waku_subscription", unsubscribe: "waku_unsubscribe", batchUnsubscribe: "waku_batchUnsubscribe", batchFetchMessages: "waku_batchFetchMessages" }, irn: { publish: "irn_publish", batchPublish: "irn_batchPublish", subscribe: "irn_subscribe", batchSubscribe: "irn_batchSubscribe", subscription: "irn_subscription", unsubscribe: "irn_unsubscribe", batchUnsubscribe: "irn_batchUnsubscribe", batchFetchMessages: "irn_batchFetchMessages" }, iridium: { publish: "iridium_publish", batchPublish: "iridium_batchPublish", subscribe: "iridium_subscribe", batchSubscribe: "iridium_batchSubscribe", subscription: "iridium_subscription", unsubscribe: "iridium_unsubscribe", batchUnsubscribe: "iridium_batchUnsubscribe", batchFetchMessages: "iridium_batchFetchMessages" } }, p2 = "Input must be an string, Buffer or Uint8Array";
function g2(t) {
  let e;
  if (t instanceof Uint8Array)
    e = t;
  else if (typeof t == "string")
    e = new TextEncoder().encode(t);
  else
    throw new Error(p2);
  return e;
}
function y2(t) {
  return Array.prototype.map.call(t, function(e) {
    return (e < 16 ? "0" : "") + e.toString(16);
  }).join("");
}
function xn(t) {
  return (4294967296 + t).toString(16).substring(1);
}
function w2(t, e, s) {
  let r = `
` + t + " = ";
  for (let n = 0; n < e.length; n += 2) {
    if (s === 32)
      r += xn(e[n]).toUpperCase(), r += " ", r += xn(e[n + 1]).toUpperCase();
    else if (s === 64)
      r += xn(e[n + 1]).toUpperCase(), r += xn(e[n]).toUpperCase();
    else throw new Error("Invalid size " + s);
    n % 6 === 4 ? r += `
` + new Array(t.length + 4).join(" ") : n < e.length - 2 && (r += " ");
  }
  console.log(r);
}
function m2(t, e, s) {
  let r = (/* @__PURE__ */ new Date()).getTime();
  const n = new Uint8Array(e);
  for (let o = 0; o < e; o++)
    n[o] = o % 256;
  const i = (/* @__PURE__ */ new Date()).getTime();
  console.log("Generated random input in " + (i - r) + "ms"), r = i;
  for (let o = 0; o < s; o++) {
    const a = t(n), c = (/* @__PURE__ */ new Date()).getTime(), l = c - r;
    r = c, console.log("Hashed in " + l + "ms: " + a.substring(0, 20) + "..."), console.log(
      Math.round(e / (1 << 20) / (l / 1e3) * 100) / 100 + " MB PER SECOND"
    );
  }
}
var vd = {
  normalizeInput: g2,
  toHex: y2,
  debugPrint: w2,
  testSpeed: m2
};
const Nn = vd;
function _n(t, e, s) {
  const r = t[e] + t[s];
  let n = t[e + 1] + t[s + 1];
  r >= 4294967296 && n++, t[e] = r, t[e + 1] = n;
}
function jl(t, e, s, r) {
  let n = t[e] + s;
  s < 0 && (n += 4294967296);
  let i = t[e + 1] + r;
  n >= 4294967296 && i++, t[e] = n, t[e + 1] = i;
}
function Ed(t, e) {
  return t[e] ^ t[e + 1] << 8 ^ t[e + 2] << 16 ^ t[e + 3] << 24;
}
function ns(t, e, s, r, n, i) {
  const o = Rr[n], a = Rr[n + 1], c = Rr[i], l = Rr[i + 1];
  _n(Z, t, e), jl(Z, t, o, a);
  let u = Z[r] ^ Z[t], h = Z[r + 1] ^ Z[t + 1];
  Z[r] = h, Z[r + 1] = u, _n(Z, s, r), u = Z[e] ^ Z[s], h = Z[e + 1] ^ Z[s + 1], Z[e] = u >>> 24 ^ h << 8, Z[e + 1] = h >>> 24 ^ u << 8, _n(Z, t, e), jl(Z, t, c, l), u = Z[r] ^ Z[t], h = Z[r + 1] ^ Z[t + 1], Z[r] = u >>> 16 ^ h << 16, Z[r + 1] = h >>> 16 ^ u << 16, _n(Z, s, r), u = Z[e] ^ Z[s], h = Z[e + 1] ^ Z[s + 1], Z[e] = h >>> 31 ^ u << 1, Z[e + 1] = u >>> 31 ^ h << 1;
}
const xd = new Uint32Array([
  4089235720,
  1779033703,
  2227873595,
  3144134277,
  4271175723,
  1013904242,
  1595750129,
  2773480762,
  2917565137,
  1359893119,
  725511199,
  2600822924,
  4215389547,
  528734635,
  327033209,
  1541459225
]), b2 = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  14,
  10,
  4,
  8,
  9,
  15,
  13,
  6,
  1,
  12,
  0,
  2,
  11,
  7,
  5,
  3,
  11,
  8,
  12,
  0,
  5,
  2,
  15,
  13,
  10,
  14,
  3,
  6,
  7,
  1,
  9,
  4,
  7,
  9,
  3,
  1,
  13,
  12,
  11,
  14,
  2,
  6,
  5,
  10,
  4,
  0,
  15,
  8,
  9,
  0,
  5,
  7,
  2,
  4,
  10,
  15,
  14,
  1,
  11,
  12,
  6,
  8,
  3,
  13,
  2,
  12,
  6,
  10,
  0,
  11,
  8,
  3,
  4,
  13,
  7,
  5,
  15,
  14,
  1,
  9,
  12,
  5,
  1,
  15,
  14,
  13,
  4,
  10,
  0,
  7,
  6,
  3,
  9,
  2,
  8,
  11,
  13,
  11,
  7,
  14,
  12,
  1,
  3,
  9,
  5,
  0,
  15,
  4,
  8,
  6,
  2,
  10,
  6,
  15,
  14,
  9,
  11,
  3,
  0,
  8,
  12,
  2,
  13,
  7,
  1,
  4,
  10,
  5,
  10,
  2,
  8,
  4,
  7,
  6,
  1,
  5,
  15,
  11,
  9,
  14,
  3,
  12,
  13,
  0,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  14,
  10,
  4,
  8,
  9,
  15,
  13,
  6,
  1,
  12,
  0,
  2,
  11,
  7,
  5,
  3
], Pe = new Uint8Array(
  b2.map(function(t) {
    return t * 2;
  })
), Z = new Uint32Array(32), Rr = new Uint32Array(32);
function _d(t, e) {
  let s = 0;
  for (s = 0; s < 16; s++)
    Z[s] = t.h[s], Z[s + 16] = xd[s];
  for (Z[24] = Z[24] ^ t.t, Z[25] = Z[25] ^ t.t / 4294967296, e && (Z[28] = ~Z[28], Z[29] = ~Z[29]), s = 0; s < 32; s++)
    Rr[s] = Ed(t.b, 4 * s);
  for (s = 0; s < 12; s++)
    ns(0, 8, 16, 24, Pe[s * 16 + 0], Pe[s * 16 + 1]), ns(2, 10, 18, 26, Pe[s * 16 + 2], Pe[s * 16 + 3]), ns(4, 12, 20, 28, Pe[s * 16 + 4], Pe[s * 16 + 5]), ns(6, 14, 22, 30, Pe[s * 16 + 6], Pe[s * 16 + 7]), ns(0, 10, 20, 30, Pe[s * 16 + 8], Pe[s * 16 + 9]), ns(2, 12, 22, 24, Pe[s * 16 + 10], Pe[s * 16 + 11]), ns(4, 14, 16, 26, Pe[s * 16 + 12], Pe[s * 16 + 13]), ns(6, 8, 18, 28, Pe[s * 16 + 14], Pe[s * 16 + 15]);
  for (s = 0; s < 16; s++)
    t.h[s] = t.h[s] ^ Z[s] ^ Z[s + 16];
}
const is = new Uint8Array([
  0,
  0,
  0,
  0,
  //  0: outlen, keylen, fanout, depth
  0,
  0,
  0,
  0,
  //  4: leaf length, sequential mode
  0,
  0,
  0,
  0,
  //  8: node offset
  0,
  0,
  0,
  0,
  // 12: node offset
  0,
  0,
  0,
  0,
  // 16: node depth, inner length, rfu
  0,
  0,
  0,
  0,
  // 20: rfu
  0,
  0,
  0,
  0,
  // 24: rfu
  0,
  0,
  0,
  0,
  // 28: rfu
  0,
  0,
  0,
  0,
  // 32: salt
  0,
  0,
  0,
  0,
  // 36: salt
  0,
  0,
  0,
  0,
  // 40: salt
  0,
  0,
  0,
  0,
  // 44: salt
  0,
  0,
  0,
  0,
  // 48: personal
  0,
  0,
  0,
  0,
  // 52: personal
  0,
  0,
  0,
  0,
  // 56: personal
  0,
  0,
  0,
  0
  // 60: personal
]);
function Id(t, e, s, r) {
  if (t === 0 || t > 64)
    throw new Error("Illegal output length, expected 0 < length <= 64");
  if (e && e.length > 64)
    throw new Error("Illegal key, expected Uint8Array with 0 < length <= 64");
  if (s && s.length !== 16)
    throw new Error("Illegal salt, expected Uint8Array with length is 16");
  if (r && r.length !== 16)
    throw new Error("Illegal personal, expected Uint8Array with length is 16");
  const n = {
    b: new Uint8Array(128),
    h: new Uint32Array(16),
    t: 0,
    // input count
    c: 0,
    // pointer within buffer
    outlen: t
    // output length in bytes
  };
  is.fill(0), is[0] = t, e && (is[1] = e.length), is[2] = 1, is[3] = 1, s && is.set(s, 32), r && is.set(r, 48);
  for (let i = 0; i < 16; i++)
    n.h[i] = xd[i] ^ Ed(is, i * 4);
  return e && (Ka(n, e), n.c = 128), n;
}
function Ka(t, e) {
  for (let s = 0; s < e.length; s++)
    t.c === 128 && (t.t += t.c, _d(t, !1), t.c = 0), t.b[t.c++] = e[s];
}
function Sd(t) {
  for (t.t += t.c; t.c < 128; )
    t.b[t.c++] = 0;
  _d(t, !0);
  const e = new Uint8Array(t.outlen);
  for (let s = 0; s < t.outlen; s++)
    e[s] = t.h[s >> 2] >> 8 * (s & 3);
  return e;
}
function Dd(t, e, s, r, n) {
  s = s || 64, t = Nn.normalizeInput(t), r && (r = Nn.normalizeInput(r)), n && (n = Nn.normalizeInput(n));
  const i = Id(s, e, r, n);
  return Ka(i, t), Sd(i);
}
function v2(t, e, s, r, n) {
  const i = Dd(t, e, s, r, n);
  return Nn.toHex(i);
}
var E2 = {
  blake2b: Dd,
  blake2bHex: v2,
  blake2bInit: Id,
  blake2bUpdate: Ka,
  blake2bFinal: Sd
};
const Ad = vd;
function x2(t, e) {
  return t[e] ^ t[e + 1] << 8 ^ t[e + 2] << 16 ^ t[e + 3] << 24;
}
function os(t, e, s, r, n, i) {
  ee[t] = ee[t] + ee[e] + n, ee[r] = In(ee[r] ^ ee[t], 16), ee[s] = ee[s] + ee[r], ee[e] = In(ee[e] ^ ee[s], 12), ee[t] = ee[t] + ee[e] + i, ee[r] = In(ee[r] ^ ee[t], 8), ee[s] = ee[s] + ee[r], ee[e] = In(ee[e] ^ ee[s], 7);
}
function In(t, e) {
  return t >>> e ^ t << 32 - e;
}
const $d = new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), Te = new Uint8Array([
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  14,
  10,
  4,
  8,
  9,
  15,
  13,
  6,
  1,
  12,
  0,
  2,
  11,
  7,
  5,
  3,
  11,
  8,
  12,
  0,
  5,
  2,
  15,
  13,
  10,
  14,
  3,
  6,
  7,
  1,
  9,
  4,
  7,
  9,
  3,
  1,
  13,
  12,
  11,
  14,
  2,
  6,
  5,
  10,
  4,
  0,
  15,
  8,
  9,
  0,
  5,
  7,
  2,
  4,
  10,
  15,
  14,
  1,
  11,
  12,
  6,
  8,
  3,
  13,
  2,
  12,
  6,
  10,
  0,
  11,
  8,
  3,
  4,
  13,
  7,
  5,
  15,
  14,
  1,
  9,
  12,
  5,
  1,
  15,
  14,
  13,
  4,
  10,
  0,
  7,
  6,
  3,
  9,
  2,
  8,
  11,
  13,
  11,
  7,
  14,
  12,
  1,
  3,
  9,
  5,
  0,
  15,
  4,
  8,
  6,
  2,
  10,
  6,
  15,
  14,
  9,
  11,
  3,
  0,
  8,
  12,
  2,
  13,
  7,
  1,
  4,
  10,
  5,
  10,
  2,
  8,
  4,
  7,
  6,
  1,
  5,
  15,
  11,
  9,
  14,
  3,
  12,
  13,
  0
]), ee = new Uint32Array(16), xe = new Uint32Array(16);
function Od(t, e) {
  let s = 0;
  for (s = 0; s < 8; s++)
    ee[s] = t.h[s], ee[s + 8] = $d[s];
  for (ee[12] ^= t.t, ee[13] ^= t.t / 4294967296, e && (ee[14] = ~ee[14]), s = 0; s < 16; s++)
    xe[s] = x2(t.b, 4 * s);
  for (s = 0; s < 10; s++)
    os(0, 4, 8, 12, xe[Te[s * 16 + 0]], xe[Te[s * 16 + 1]]), os(1, 5, 9, 13, xe[Te[s * 16 + 2]], xe[Te[s * 16 + 3]]), os(2, 6, 10, 14, xe[Te[s * 16 + 4]], xe[Te[s * 16 + 5]]), os(3, 7, 11, 15, xe[Te[s * 16 + 6]], xe[Te[s * 16 + 7]]), os(0, 5, 10, 15, xe[Te[s * 16 + 8]], xe[Te[s * 16 + 9]]), os(1, 6, 11, 12, xe[Te[s * 16 + 10]], xe[Te[s * 16 + 11]]), os(2, 7, 8, 13, xe[Te[s * 16 + 12]], xe[Te[s * 16 + 13]]), os(3, 4, 9, 14, xe[Te[s * 16 + 14]], xe[Te[s * 16 + 15]]);
  for (s = 0; s < 8; s++)
    t.h[s] ^= ee[s] ^ ee[s + 8];
}
function Pd(t, e) {
  if (!(t > 0 && t <= 32))
    throw new Error("Incorrect output length, should be in [1, 32]");
  const s = e ? e.length : 0;
  if (e && !(s > 0 && s <= 32))
    throw new Error("Incorrect key length, should be in [1, 32]");
  const r = {
    h: new Uint32Array($d),
    // hash state
    b: new Uint8Array(64),
    // input block
    c: 0,
    // pointer within block
    t: 0,
    // input count
    outlen: t
    // output length in bytes
  };
  return r.h[0] ^= 16842752 ^ s << 8 ^ t, s > 0 && (Va(r, e), r.c = 64), r;
}
function Va(t, e) {
  for (let s = 0; s < e.length; s++)
    t.c === 64 && (t.t += t.c, Od(t, !1), t.c = 0), t.b[t.c++] = e[s];
}
function Td(t) {
  for (t.t += t.c; t.c < 64; )
    t.b[t.c++] = 0;
  Od(t, !0);
  const e = new Uint8Array(t.outlen);
  for (let s = 0; s < t.outlen; s++)
    e[s] = t.h[s >> 2] >> 8 * (s & 3) & 255;
  return e;
}
function Bd(t, e, s) {
  s = s || 32, t = Ad.normalizeInput(t);
  const r = Pd(s, e);
  return Va(r, t), Td(r);
}
function _2(t, e, s) {
  const r = Bd(t, e, s);
  return Ad.toHex(r);
}
var I2 = {
  blake2s: Bd,
  blake2sHex: _2,
  blake2sInit: Pd,
  blake2sUpdate: Va,
  blake2sFinal: Td
};
const Dr = E2, Ar = I2;
var S2 = {
  blake2b: Dr.blake2b,
  blake2bHex: Dr.blake2bHex,
  blake2bInit: Dr.blake2bInit,
  blake2bUpdate: Dr.blake2bUpdate,
  blake2bFinal: Dr.blake2bFinal,
  blake2s: Ar.blake2s,
  blake2sHex: Ar.blake2sHex,
  blake2sInit: Ar.blake2sInit,
  blake2sUpdate: Ar.blake2sUpdate,
  blake2sFinal: Ar.blake2sFinal
}, It = { exports: {} };
function D2(t) {
  try {
    return JSON.stringify(t);
  } catch {
    return '"[Circular]"';
  }
}
var A2 = $2;
function $2(t, e, s) {
  var r = s && s.stringify || D2, n = 1;
  if (typeof t == "object" && t !== null) {
    var i = e.length + n;
    if (i === 1) return t;
    var o = new Array(i);
    o[0] = r(t);
    for (var a = 1; a < i; a++) o[a] = r(e[a]);
    return o.join(" ");
  }
  if (typeof t != "string") return t;
  var c = e.length;
  if (c === 0) return t;
  for (var l = "", u = 1 - n, h = -1, f = t && t.length || 0, d = 0; d < f; ) {
    if (t.charCodeAt(d) === 37 && d + 1 < f) {
      switch (h = h > -1 ? h : 0, t.charCodeAt(d + 1)) {
        case 100:
        case 102:
          if (u >= c || e[u] == null) break;
          h < d && (l += t.slice(h, d)), l += Number(e[u]), h = d + 2, d++;
          break;
        case 105:
          if (u >= c || e[u] == null) break;
          h < d && (l += t.slice(h, d)), l += Math.floor(Number(e[u])), h = d + 2, d++;
          break;
        case 79:
        case 111:
        case 106:
          if (u >= c || e[u] === void 0) break;
          h < d && (l += t.slice(h, d));
          var g = typeof e[u];
          if (g === "string") {
            l += "'" + e[u] + "'", h = d + 2, d++;
            break;
          }
          if (g === "function") {
            l += e[u].name || "<anonymous>", h = d + 2, d++;
            break;
          }
          l += r(e[u]), h = d + 2, d++;
          break;
        case 115:
          if (u >= c) break;
          h < d && (l += t.slice(h, d)), l += String(e[u]), h = d + 2, d++;
          break;
        case 37:
          h < d && (l += t.slice(h, d)), l += "%", h = d + 2, d++, u--;
          break;
      }
      ++u;
    }
    ++d;
  }
  return h === -1 ? t : (h < f && (l += t.slice(h)), l);
}
const Fl = A2;
It.exports = Wt;
const Kr = F2().console || {}, O2 = { mapHttpRequest: Sn, mapHttpResponse: Sn, wrapRequestSerializer: go, wrapResponseSerializer: go, wrapErrorSerializer: go, req: Sn, res: Sn, err: Kl, errWithCause: Kl };
function fs(t, e) {
  return t === "silent" ? 1 / 0 : e.levels.values[t];
}
const Wa = Symbol("pino.logFuncs"), ta = Symbol("pino.hierarchy"), P2 = { error: "log", fatal: "error", warn: "error", info: "log", debug: "log", trace: "log" };
function Hl(t, e) {
  const s = { logger: e, parent: t[ta] };
  e[ta] = s;
}
function T2(t, e, s) {
  const r = {};
  e.forEach((n) => {
    r[n] = s[n] ? s[n] : Kr[n] || Kr[P2[n] || "log"] || hr;
  }), t[Wa] = r;
}
function B2(t, e) {
  return Array.isArray(t) ? t.filter(function(s) {
    return s !== "!stdSerializers.err";
  }) : t === !0 ? Object.keys(e) : !1;
}
function Wt(t) {
  t = t || {}, t.browser = t.browser || {};
  const e = t.browser.transmit;
  if (e && typeof e.send != "function") throw Error("pino: transmit option must have a send function");
  const s = t.browser.write || Kr;
  t.browser.write && (t.browser.asObject = !0);
  const r = t.serializers || {}, n = B2(t.browser.serialize, r);
  let i = t.browser.serialize;
  Array.isArray(t.browser.serialize) && t.browser.serialize.indexOf("!stdSerializers.err") > -1 && (i = !1);
  const o = Object.keys(t.customLevels || {}), a = ["error", "fatal", "warn", "info", "debug", "trace"].concat(o);
  typeof s == "function" && a.forEach(function(w) {
    s[w] = s;
  }), (t.enabled === !1 || t.browser.disabled) && (t.level = "silent");
  const c = t.level || "info", l = Object.create(s);
  l.log || (l.log = hr), T2(l, a, s), Hl({}, l), Object.defineProperty(l, "levelVal", { get: h }), Object.defineProperty(l, "level", { get: f, set: d });
  const u = { transmit: e, serialize: n, asObject: t.browser.asObject, asObjectBindingsOnly: t.browser.asObjectBindingsOnly, formatters: t.browser.formatters, levels: a, timestamp: q2(t), messageKey: t.messageKey || "msg", onChild: t.onChild || hr };
  l.levels = R2(t), l.level = c, l.isLevelEnabled = function(w) {
    return this.levels.values[w] ? this.levels.values[w] >= this.levels.values[this.level] : !1;
  }, l.setMaxListeners = l.getMaxListeners = l.emit = l.addListener = l.on = l.prependListener = l.once = l.prependOnceListener = l.removeListener = l.removeAllListeners = l.listeners = l.listenerCount = l.eventNames = l.write = l.flush = hr, l.serializers = r, l._serialize = n, l._stdErrSerialize = i, l.child = function(...w) {
    return g.call(this, u, ...w);
  }, e && (l._logEvent = sa());
  function h() {
    return fs(this.level, this);
  }
  function f() {
    return this._level;
  }
  function d(w) {
    if (w !== "silent" && !this.levels.values[w]) throw Error("unknown level " + w);
    this._level = w, Is(this, u, l, "error"), Is(this, u, l, "fatal"), Is(this, u, l, "warn"), Is(this, u, l, "info"), Is(this, u, l, "debug"), Is(this, u, l, "trace"), o.forEach((m) => {
      Is(this, u, l, m);
    });
  }
  function g(w, m, S) {
    if (!m) throw new Error("missing bindings for child Pino");
    S = S || {}, n && m.serializers && (S.serializers = m.serializers);
    const T = S.serializers;
    if (n && T) {
      var E = Object.assign({}, r, T), D = t.browser.serialize === !0 ? Object.keys(E) : n;
      delete m.serializers, Ga([m], D, E, this._stdErrSerialize);
    }
    function $(B) {
      this._childLevel = (B._childLevel | 0) + 1, this.bindings = m, E && (this.serializers = E, this._serialize = D), e && (this._logEvent = sa([].concat(B._logEvent.bindings, m)));
    }
    $.prototype = this;
    const R = new $(this);
    return Hl(this, R), R.child = function(...B) {
      return g.call(this, w, ...B);
    }, R.level = S.level || this.level, w.onChild(R), R;
  }
  return l;
}
function R2(t) {
  const e = t.customLevels || {}, s = Object.assign({}, Wt.levels.values, e), r = Object.assign({}, Wt.levels.labels, C2(e));
  return { values: s, labels: r };
}
function C2(t) {
  const e = {};
  return Object.keys(t).forEach(function(s) {
    e[t[s]] = s;
  }), e;
}
Wt.levels = { values: { fatal: 60, error: 50, warn: 40, info: 30, debug: 20, trace: 10 }, labels: { 10: "trace", 20: "debug", 30: "info", 40: "warn", 50: "error", 60: "fatal" } }, Wt.stdSerializers = O2, Wt.stdTimeFunctions = Object.assign({}, { nullTime: Rd, epochTime: Cd, unixTime: z2, isoTime: j2 });
function N2(t) {
  const e = [];
  t.bindings && e.push(t.bindings);
  let s = t[ta];
  for (; s.parent; ) s = s.parent, s.logger.bindings && e.push(s.logger.bindings);
  return e.reverse();
}
function Is(t, e, s, r) {
  if (Object.defineProperty(t, r, { value: fs(t.level, s) > fs(r, s) ? hr : s[Wa][r], writable: !0, enumerable: !0, configurable: !0 }), t[r] === hr) {
    if (!e.transmit) return;
    const i = e.transmit.level || t.level, o = fs(i, s);
    if (fs(r, s) < o) return;
  }
  t[r] = M2(t, e, s, r);
  const n = N2(t);
  n.length !== 0 && (t[r] = U2(n, t[r]));
}
function U2(t, e) {
  return function() {
    return e.apply(this, [...t, ...arguments]);
  };
}
function M2(t, e, s, r) {
  return /* @__PURE__ */ function(n) {
    return function() {
      const i = e.timestamp(), o = new Array(arguments.length), a = Object.getPrototypeOf && Object.getPrototypeOf(this) === Kr ? Kr : this;
      for (var c = 0; c < o.length; c++) o[c] = arguments[c];
      var l = !1;
      if (e.serialize && (Ga(o, this._serialize, this.serializers, this._stdErrSerialize), l = !0), e.asObject || e.formatters ? n.call(a, ...L2(this, r, o, i, e)) : n.apply(a, o), e.transmit) {
        const u = e.transmit.level || t._level, h = fs(u, s), f = fs(r, s);
        if (f < h) return;
        k2(this, { ts: i, methodLevel: r, methodValue: f, transmitValue: s.levels.values[e.transmit.level || t._level], send: e.transmit.send, val: fs(t._level, s) }, o, l);
      }
    };
  }(t[Wa][r]);
}
function L2(t, e, s, r, n) {
  const { level: i, log: o = (h) => h } = n.formatters || {}, a = s.slice();
  let c = a[0];
  const l = {};
  let u = (t._childLevel | 0) + 1;
  if (u < 1 && (u = 1), r && (l.time = r), i) {
    const h = i(e, t.levels.values[e]);
    Object.assign(l, h);
  } else l.level = t.levels.values[e];
  if (n.asObjectBindingsOnly) {
    if (c !== null && typeof c == "object") for (; u-- && typeof a[0] == "object"; ) Object.assign(l, a.shift());
    return [o(l), ...a];
  } else {
    if (c !== null && typeof c == "object") {
      for (; u-- && typeof a[0] == "object"; ) Object.assign(l, a.shift());
      c = a.length ? Fl(a.shift(), a) : void 0;
    } else typeof c == "string" && (c = Fl(a.shift(), a));
    return c !== void 0 && (l[n.messageKey] = c), [o(l)];
  }
}
function Ga(t, e, s, r) {
  for (const n in t) if (r && t[n] instanceof Error) t[n] = Wt.stdSerializers.err(t[n]);
  else if (typeof t[n] == "object" && !Array.isArray(t[n]) && e) for (const i in t[n]) e.indexOf(i) > -1 && i in s && (t[n][i] = s[i](t[n][i]));
}
function k2(t, e, s, r = !1) {
  const n = e.send, i = e.ts, o = e.methodLevel, a = e.methodValue, c = e.val, l = t._logEvent.bindings;
  r || Ga(s, t._serialize || Object.keys(t.serializers), t.serializers, t._stdErrSerialize === void 0 ? !0 : t._stdErrSerialize), t._logEvent.ts = i, t._logEvent.messages = s.filter(function(u) {
    return l.indexOf(u) === -1;
  }), t._logEvent.level.label = o, t._logEvent.level.value = a, n(o, t._logEvent, c), t._logEvent = sa(l);
}
function sa(t) {
  return { ts: 0, messages: [], bindings: t || [], level: { label: "", value: 0 } };
}
function Kl(t) {
  const e = { type: t.constructor.name, msg: t.message, stack: t.stack };
  for (const s in t) e[s] === void 0 && (e[s] = t[s]);
  return e;
}
function q2(t) {
  return typeof t.timestamp == "function" ? t.timestamp : t.timestamp === !1 ? Rd : Cd;
}
function Sn() {
  return {};
}
function go(t) {
  return t;
}
function hr() {
}
function Rd() {
  return !1;
}
function Cd() {
  return Date.now();
}
function z2() {
  return Math.round(Date.now() / 1e3);
}
function j2() {
  return new Date(Date.now()).toISOString();
}
function F2() {
  function t(e) {
    return typeof e < "u" && e;
  }
  try {
    return typeof globalThis < "u" || Object.defineProperty(Object.prototype, "globalThis", { get: function() {
      return delete Object.prototype.globalThis, this.globalThis = this;
    }, configurable: !0 }), globalThis;
  } catch {
    return t(self) || t(window) || t(this) || {};
  }
}
It.exports.default = Wt;
It.exports.pino = Wt;
const H2 = { level: "info" }, Ai = "custom_context", Ya = 1e3 * 1024;
var K2 = Object.defineProperty, V2 = (t, e, s) => e in t ? K2(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, us = (t, e, s) => V2(t, typeof e != "symbol" ? e + "" : e, s);
let W2 = class {
  constructor(e) {
    us(this, "nodeValue"), us(this, "sizeInBytes"), us(this, "next"), this.nodeValue = e, this.sizeInBytes = new TextEncoder().encode(this.nodeValue).length, this.next = null;
  }
  get value() {
    return this.nodeValue;
  }
  get size() {
    return this.sizeInBytes;
  }
}, Vl = class {
  constructor(e) {
    us(this, "lengthInNodes"), us(this, "sizeInBytes"), us(this, "head"), us(this, "tail"), us(this, "maxSizeInBytes"), this.head = null, this.tail = null, this.lengthInNodes = 0, this.maxSizeInBytes = e, this.sizeInBytes = 0;
  }
  append(e) {
    const s = new W2(e);
    if (s.size > this.maxSizeInBytes) throw new Error(`[LinkedList] Value too big to insert into list: ${e} with size ${s.size}`);
    for (; this.size + s.size > this.maxSizeInBytes; ) this.shift();
    this.head ? (this.tail && (this.tail.next = s), this.tail = s) : (this.head = s, this.tail = s), this.lengthInNodes++, this.sizeInBytes += s.size;
  }
  shift() {
    if (!this.head) return;
    const e = this.head;
    this.head = this.head.next, this.head || (this.tail = null), this.lengthInNodes--, this.sizeInBytes -= e.size;
  }
  toArray() {
    const e = [];
    let s = this.head;
    for (; s !== null; ) e.push(s.value), s = s.next;
    return e;
  }
  get length() {
    return this.lengthInNodes;
  }
  get size() {
    return this.sizeInBytes;
  }
  toOrderedArray() {
    return Array.from(this);
  }
  [Symbol.iterator]() {
    let e = this.head;
    return { next: () => {
      if (!e) return { done: !0, value: null };
      const s = e.value;
      return e = e.next, { done: !1, value: s };
    } };
  }
};
const G2 = (t) => JSON.stringify(t, (e, s) => typeof s == "bigint" ? s.toString() + "n" : s);
function Wl(t) {
  return typeof t == "string" ? t : G2(t) || "";
}
var Y2 = Object.defineProperty, Z2 = (t, e, s) => e in t ? Y2(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, Dn = (t, e, s) => Z2(t, typeof e != "symbol" ? e + "" : e, s);
let Nd = class {
  constructor(e, s = Ya) {
    Dn(this, "logs"), Dn(this, "level"), Dn(this, "levelValue"), Dn(this, "MAX_LOG_SIZE_IN_BYTES"), this.level = e ?? "error", this.levelValue = It.exports.levels.values[this.level], this.MAX_LOG_SIZE_IN_BYTES = s, this.logs = new Vl(this.MAX_LOG_SIZE_IN_BYTES);
  }
  forwardToConsole(e, s) {
    s === It.exports.levels.values.error ? console.error(e) : s === It.exports.levels.values.warn ? console.warn(e) : s === It.exports.levels.values.debug ? console.debug(e) : s === It.exports.levels.values.trace ? console.trace(e) : console.log(e);
  }
  appendToLogs(e) {
    this.logs.append(Wl({ timestamp: (/* @__PURE__ */ new Date()).toISOString(), log: e }));
    const s = typeof e == "string" ? JSON.parse(e).level : e.level;
    s >= this.levelValue && this.forwardToConsole(e, s);
  }
  getLogs() {
    return this.logs;
  }
  clearLogs() {
    this.logs = new Vl(this.MAX_LOG_SIZE_IN_BYTES);
  }
  getLogArray() {
    return Array.from(this.logs);
  }
  logsToBlob(e) {
    const s = this.getLogArray();
    return s.push(Wl({ extraMetadata: e })), new Blob(s, { type: "application/json" });
  }
};
var X2 = Object.defineProperty, J2 = (t, e, s) => e in t ? X2(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, Q2 = (t, e, s) => J2(t, e + "", s);
let ex = class {
  constructor(e, s = Ya) {
    Q2(this, "baseChunkLogger"), this.baseChunkLogger = new Nd(e, s);
  }
  write(e) {
    this.baseChunkLogger.appendToLogs(e);
  }
  getLogs() {
    return this.baseChunkLogger.getLogs();
  }
  clearLogs() {
    this.baseChunkLogger.clearLogs();
  }
  getLogArray() {
    return this.baseChunkLogger.getLogArray();
  }
  logsToBlob(e) {
    return this.baseChunkLogger.logsToBlob(e);
  }
  downloadLogsBlobInBrowser(e) {
    const s = URL.createObjectURL(this.logsToBlob(e)), r = document.createElement("a");
    r.href = s, r.download = `walletconnect-logs-${(/* @__PURE__ */ new Date()).toISOString()}.txt`, document.body.appendChild(r), r.click(), document.body.removeChild(r), URL.revokeObjectURL(s);
  }
};
var tx = Object.defineProperty, sx = (t, e, s) => e in t ? tx(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, rx = (t, e, s) => sx(t, e + "", s);
let nx = class {
  constructor(e, s = Ya) {
    rx(this, "baseChunkLogger"), this.baseChunkLogger = new Nd(e, s);
  }
  write(e) {
    this.baseChunkLogger.appendToLogs(e);
  }
  getLogs() {
    return this.baseChunkLogger.getLogs();
  }
  clearLogs() {
    this.baseChunkLogger.clearLogs();
  }
  getLogArray() {
    return this.baseChunkLogger.getLogArray();
  }
  logsToBlob(e) {
    return this.baseChunkLogger.logsToBlob(e);
  }
};
var ix = Object.defineProperty, ox = Object.defineProperties, ax = Object.getOwnPropertyDescriptors, Gl = Object.getOwnPropertySymbols, cx = Object.prototype.hasOwnProperty, lx = Object.prototype.propertyIsEnumerable, Yl = (t, e, s) => e in t ? ix(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, gs = (t, e) => {
  for (var s in e || (e = {})) cx.call(e, s) && Yl(t, s, e[s]);
  if (Gl) for (var s of Gl(e)) lx.call(e, s) && Yl(t, s, e[s]);
  return t;
}, ys = (t, e) => ox(t, ax(e));
function hx(t) {
  return ys(gs({}, t), { level: t?.level || H2.level });
}
function ux(t, e, s = Ai) {
  return t[s] = e, t;
}
function Fe(t, e = Ai) {
  return t[e] || "";
}
function fx(t, e, s = Ai) {
  const r = Fe(t, s);
  return r.trim() ? `${r}/${e}` : e;
}
function Ye(t, e, s = Ai) {
  const r = fx(t, e, s), n = t.child({ context: r });
  return ux(n, r, s);
}
function dx(t) {
  var e, s;
  const r = new ex((e = t.opts) == null ? void 0 : e.level, t.maxSizeInBytes);
  return { logger: It.exports(ys(gs({}, t.opts), { level: "trace", browser: ys(gs({}, (s = t.opts) == null ? void 0 : s.browser), { write: (n) => r.write(n) }) })), chunkLoggerController: r };
}
function px(t) {
  var e, s;
  const r = new nx((e = t.opts) == null ? void 0 : e.level, t.maxSizeInBytes);
  return { logger: It.exports(ys(gs({}, t.opts), { level: "trace", browser: ys(gs({}, (s = t.opts) == null ? void 0 : s.browser), { write: (n) => r.write(n) }) }), r), chunkLoggerController: r };
}
function Ud(t) {
  var e;
  if (typeof t.loggerOverride < "u" && typeof t.loggerOverride != "string") return { logger: t.loggerOverride, chunkLoggerController: null };
  const s = ys(gs({}, t.opts), { level: typeof t.loggerOverride == "string" ? t.loggerOverride : (e = t.opts) == null ? void 0 : e.level });
  return typeof window < "u" ? dx(ys(gs({}, t), { opts: s })) : px(ys(gs({}, t), { opts: s }));
}
const gx = ":";
function Gt(t) {
  const [e, s] = t.split(gx);
  return { namespace: e, reference: s };
}
function Zl(t, e = []) {
  const s = [];
  return Object.keys(t).forEach((r) => {
    if (e.length && !e.includes(r)) return;
    const n = t[r];
    s.push(...n.accounts);
  }), s;
}
function Md(t, e) {
  return t.includes(":") ? [t] : e.chains || [];
}
const yx = { INVALID_METHOD: { message: "Invalid method.", code: 1001 }, INVALID_EVENT: { message: "Invalid event.", code: 1002 }, INVALID_UPDATE_REQUEST: { message: "Invalid update request.", code: 1003 }, INVALID_EXTEND_REQUEST: { message: "Invalid extend request.", code: 1004 }, INVALID_SESSION_SETTLE_REQUEST: { message: "Invalid session settle request.", code: 1005 }, UNAUTHORIZED_METHOD: { message: "Unauthorized method.", code: 3001 }, UNAUTHORIZED_EVENT: { message: "Unauthorized event.", code: 3002 }, UNAUTHORIZED_UPDATE_REQUEST: { message: "Unauthorized update request.", code: 3003 }, UNAUTHORIZED_EXTEND_REQUEST: { message: "Unauthorized extend request.", code: 3004 }, USER_REJECTED: { message: "User rejected.", code: 5e3 }, USER_REJECTED_CHAINS: { message: "User rejected chains.", code: 5001 }, USER_REJECTED_METHODS: { message: "User rejected methods.", code: 5002 }, USER_REJECTED_EVENTS: { message: "User rejected events.", code: 5003 }, UNSUPPORTED_CHAINS: { message: "Unsupported chains.", code: 5100 }, UNSUPPORTED_METHODS: { message: "Unsupported methods.", code: 5101 }, UNSUPPORTED_EVENTS: { message: "Unsupported events.", code: 5102 }, UNSUPPORTED_ACCOUNTS: { message: "Unsupported accounts.", code: 5103 }, UNSUPPORTED_NAMESPACE_KEY: { message: "Unsupported namespace key.", code: 5104 }, USER_DISCONNECTED: { message: "User disconnected.", code: 6e3 }, SESSION_SETTLEMENT_FAILED: { message: "Session settlement failed.", code: 7e3 }, WC_METHOD_UNSUPPORTED: { message: "Unsupported wc_ method.", code: 10001 } }, wx = { NOT_INITIALIZED: { message: "Not initialized.", code: 1 }, NO_MATCHING_KEY: { message: "No matching key.", code: 2 }, RESTORE_WILL_OVERRIDE: { message: "Restore will override.", code: 3 }, RESUBSCRIBED: { message: "Resubscribed.", code: 4 }, MISSING_OR_INVALID: { message: "Missing or invalid.", code: 5 }, EXPIRED: { message: "Expired.", code: 6 }, UNKNOWN_TYPE: { message: "Unknown type.", code: 7 }, MISMATCHED_TOPIC: { message: "Mismatched topic.", code: 8 }, NON_CONFORMING_NAMESPACES: { message: "Non conforming namespaces.", code: 9 } };
function j(t, e) {
  const { message: s, code: r } = wx[t];
  return { message: e ? `${s} ${e}` : s, code: r };
}
function se(t, e) {
  const { message: s, code: r } = yx[t];
  return { message: e ? `${s} ${e}` : s, code: r };
}
const mx = "ReactNative", We = { reactNative: "react-native", node: "node", browser: "browser", unknown: "unknown" }, bx = "js";
function ri() {
  return typeof process < "u" && typeof process.versions < "u" && typeof process.versions.node < "u";
}
function Es() {
  return !ks() && !!ma() && navigator.product === mx;
}
function vx() {
  return Es() && typeof globalThis < "u" && typeof globalThis?.Platform < "u" && globalThis?.Platform.OS === "android";
}
function Ex() {
  return Es() && typeof globalThis < "u" && typeof globalThis?.Platform < "u" && globalThis?.Platform.OS === "ios";
}
function wr() {
  return !ri() && !!ma() && !!ks();
}
function an() {
  return Es() ? We.reactNative : ri() ? We.node : wr() ? We.browser : We.unknown;
}
function Xl() {
  try {
    return Es() && typeof globalThis < "u" && typeof globalThis?.Application < "u" ? globalThis.Application?.applicationId : void 0;
  } catch {
    return;
  }
}
function xx(t, e) {
  const s = new URLSearchParams(t);
  return Object.entries(e).sort(([r], [n]) => r.localeCompare(n)).forEach(([r, n]) => {
    n != null && s.set(r, String(n));
  }), s.toString();
}
function _x(t) {
  const e = Ld();
  try {
    return t?.url && e.url && new URL(t.url).host !== new URL(e.url).host && (console.warn(`The configured WalletConnect 'metadata.url':${t.url} differs from the actual page url:${e.url}. This is probably unintended and can lead to issues.`), t.url = e.url), t?.icons?.length && t.icons.length > 0 && (t.icons = t.icons.filter((s) => s !== "")), { ...e, ...t, url: t?.url || e.url, name: t?.name || e.name, description: t?.description || e.description, icons: t?.icons?.length && t.icons.length > 0 ? t.icons : e.icons };
  } catch (s) {
    return console.warn("Error populating app metadata", s), t || e;
  }
}
function Ld() {
  return pu() || { name: "", description: "", url: "", icons: [""] };
}
function Ix() {
  if (an() === We.reactNative && typeof globalThis < "u" && typeof globalThis?.Platform < "u") {
    const { OS: s, Version: r } = globalThis.Platform;
    return [s, r].join("-");
  }
  const t = Dg();
  if (t === null) return "unknown";
  const e = t.os ? t.os.replace(" ", "").toLowerCase() : "unknown";
  return t.type === "browser" ? [e, t.name, t.version].join("-") : [e, t.version].join("-");
}
function Sx() {
  const t = an();
  return t === We.browser ? [t, du()?.host || "unknown"].join(":") : t;
}
function kd(t, e, s) {
  const r = Ix(), n = Sx();
  return [[t, e].join("-"), [bx, s].join("-"), r, n].join("/");
}
function Dx({ protocol: t, version: e, relayUrl: s, sdkVersion: r, auth: n, projectId: i, useOnCloseEvent: o, bundleId: a, packageName: c }) {
  const l = s.split("?"), u = kd(t, e, r), h = { auth: n, ua: u, projectId: i, useOnCloseEvent: o, packageName: c || void 0, bundleId: a || void 0 }, f = xx(l[1] || "", h);
  return l[0] + "?" + f;
}
function Us(t, e) {
  return t.filter((s) => e.includes(s)).length === t.length;
}
function ra(t) {
  return Object.fromEntries(t.entries());
}
function na(t) {
  return new Map(Object.entries(t));
}
function As(t = k.FIVE_MINUTES, e) {
  const s = k.toMiliseconds(t || k.FIVE_MINUTES);
  let r, n, i, o;
  return { resolve: (a) => {
    i && r && (clearTimeout(i), r(a), o = Promise.resolve(a));
  }, reject: (a) => {
    i && n && (clearTimeout(i), n(a));
  }, done: () => new Promise((a, c) => {
    if (o) return a(o);
    i = setTimeout(() => {
      const l = j("EXPIRED"), u = new Error(e || l.message);
      u.code = l.code, c(u);
    }, s), r = a, n = c;
  }) };
}
function dt(t, e, s) {
  return new Promise(async (r, n) => {
    const i = setTimeout(() => n(new Error(s)), e);
    try {
      const o = await t;
      r(o);
    } catch (o) {
      n(o);
    }
    clearTimeout(i);
  });
}
function qd(t, e) {
  if (typeof e == "string" && e.startsWith(`${t}:`)) return e;
  if (t.toLowerCase() === "topic") {
    if (typeof e != "string") throw new Error('Value must be "string" for expirer target type: topic');
    return `topic:${e}`;
  } else if (t.toLowerCase() === "id") {
    if (typeof e != "number") throw new Error('Value must be "number" for expirer target type: id');
    return `id:${e}`;
  }
  throw new Error(`Unknown expirer target type: ${t}`);
}
function Ax(t) {
  return qd("topic", t);
}
function $x(t) {
  return qd("id", t);
}
function zd(t) {
  const [e, s] = t.split(":"), r = { id: void 0, topic: void 0 };
  if (e === "topic" && typeof s == "string") r.topic = s;
  else if (e === "id" && Number.isInteger(Number(s))) r.id = Number(s);
  else throw new Error(`Invalid target, expected id:number or topic:string, got ${e}:${s}`);
  return r;
}
function ue(t, e) {
  return k.fromMiliseconds(Date.now() + k.toMiliseconds(t));
}
function xt(t) {
  return Date.now() >= k.toMiliseconds(t);
}
function te(t, e) {
  return `${t}${e ? `:${e}` : ""}`;
}
function St(t = [], e = []) {
  return [.../* @__PURE__ */ new Set([...t, ...e])];
}
async function Ox({ id: t, topic: e, wcDeepLink: s }) {
  try {
    if (!s) return;
    const r = (typeof s == "string" ? JSON.parse(s) : s)?.href;
    if (typeof r != "string") return;
    const n = Px(r, t, e), i = an();
    if (i === We.browser) {
      if (!ks()?.hasFocus()) {
        console.warn("Document does not have focus, skipping deeplink.");
        return;
      }
      Tx(n);
    } else i === We.reactNative && typeof globalThis?.Linking < "u" && await globalThis.Linking.openURL(n);
  } catch (r) {
    console.error(r);
  }
}
function Px(t, e, s) {
  const r = `requestId=${e}&sessionTopic=${s}`;
  t.endsWith("/") && (t = t.slice(0, -1));
  let n = `${t}`;
  if (t.startsWith("https://t.me")) {
    const i = t.includes("?") ? "&startapp=" : "?startapp=";
    n = `${n}${i}${Nx(r, !0)}`;
  } else n = `${n}/wc?${r}`;
  return n;
}
function Tx(t) {
  let e = "_self";
  Cx() ? e = "_top" : (Rx() || t.startsWith("https://") || t.startsWith("http://")) && (e = "_blank"), window.open(t, e, "noreferrer noopener");
}
async function Bx(t, e) {
  let s = "";
  try {
    if (wr() && (s = localStorage.getItem(e), s)) return s;
    s = await t.getItem(e);
  } catch (r) {
    console.error(r);
  }
  return s;
}
function Jl(t, e) {
  if (!t.includes(e)) return null;
  const s = t.split(/([&,?,=])/), r = s.indexOf(e);
  return s[r + 2];
}
function Ql() {
  return typeof crypto < "u" && crypto?.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (t) => {
    const e = Math.random() * 16 | 0;
    return (t === "x" ? e : e & 3 | 8).toString(16);
  });
}
function Za() {
  return typeof process < "u" && process.env.IS_VITEST === "true";
}
function Rx() {
  return typeof window < "u" && (!!window.TelegramWebviewProxy || !!window.Telegram || !!window.TelegramWebviewProxyProto);
}
function Cx() {
  try {
    return window.self !== window.top;
  } catch {
    return !1;
  }
}
function Nx(t, e = !1) {
  const s = new TextEncoder().encode(t), r = new Array(s.length);
  for (let i = 0; i < s.length; i++) r[i] = String.fromCharCode(s[i]);
  const n = btoa(r.join(""));
  return e ? n.replace(/[=]/g, "") : n;
}
function jd(t) {
  const e = t + "=".repeat((4 - t.length % 4) % 4), s = atob(e), r = new Uint8Array(s.length);
  for (let n = 0; n < s.length; n++) r[n] = s.charCodeAt(n);
  return new TextDecoder().decode(r);
}
function Ux(t) {
  return new Promise((e) => setTimeout(e, t));
}
class Mx {
  constructor({ limit: e }) {
    this.limit = e, this.set = /* @__PURE__ */ new Set();
  }
  add(e) {
    if (!this.set.has(e)) {
      if (this.set.size >= this.limit) {
        const s = this.set.values().next().value;
        s && this.set.delete(s);
      }
      this.set.add(e);
    }
  }
  has(e) {
    return this.set.has(e);
  }
}
const Lx = "https://rpc.walletconnect.org/v1";
function Ls(t) {
  const e = t + "=".repeat((4 - t.length % 4) % 4), s = atob(e), r = new Uint8Array(s.length);
  for (let n = 0; n < s.length; n++) r[n] = s.charCodeAt(n);
  return r;
}
const kx = /^0x[0-9a-fA-F]{64}$/;
function qx(t) {
  return kx.test(t);
}
function Fd(t) {
  const e = new TextEncoder().encode(t), s = new TextEncoder().encode(`Ethereum Signed Message:
${e.length}`);
  return "0x" + ye(Iu(Vt([s, e])), "base16");
}
async function zx(t, e, s, r, n, i) {
  switch (s.t) {
    case "eip191":
      return await jx(t, e, s.s);
    case "eip1271":
      return await Fx(t, e, s.s, r, n, i);
    default:
      throw new Error(`verifySignature failed: Attempted to verify CacaoSignature with unknown type: ${s.t}`);
  }
}
function jx(t, e, s) {
  const r = u0(s);
  return D0({ payload: Fd(e), signature: r }).toLowerCase() === t.toLowerCase();
}
async function Fx(t, e, s, r, n, i) {
  const o = Gt(r);
  if (!o.namespace || !o.reference) throw new Error(`isValidEip1271Signature failed: chainId must be in CAIP-2 format, received: ${r}`);
  try {
    const a = "0x1626ba7e", c = "0000000000000000000000000000000000000000000000000000000000000040", l = s.substring(2), u = (l.length / 2).toString(16).padStart(64, "0"), h = (qx(e) ? e : Fd(e)).substring(2), f = a + h + c + u + l, d = await fetch(`${i || Lx}/?chainId=${r}&projectId=${n}`, { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify({ id: Hx(), jsonrpc: "2.0", method: "eth_call", params: [{ to: t, data: f }, "latest"] }) }), { result: g } = await d.json();
    return g ? g.slice(0, a.length).toLowerCase() === a.toLowerCase() : !1;
  } catch (a) {
    return console.error("isValidEip1271Signature: ", a), !1;
  }
}
function Hx() {
  return Date.now() + Math.floor(Math.random() * 1e3);
}
function Kx(t) {
  const e = Ls(t), s = e[0];
  if (s === 0) throw new Error("No signatures found");
  const r = 1 + s * 64;
  if (e.length < r) throw new Error("Transaction data too short for claimed signature count");
  if (e.length < 100) throw new Error("Transaction too short");
  const n = e.slice(1, 65);
  return sn.encode(n);
}
function Vx(t) {
  const e = Ls(t), s = new TextEncoder().encode("TransactionData::"), r = new Uint8Array(s.length + e.length);
  r.set(s), r.set(e, s.length);
  const n = v0(r, { dkLen: 32 });
  return sn.encode(n);
}
function eh(t) {
  const e = new Uint8Array(qs(Wx(t)));
  return sn.encode(e);
}
function Wx(t) {
  if (t instanceof Uint8Array) return t;
  if (Array.isArray(t)) return new Uint8Array(t);
  if (typeof t == "object" && t?.data) return new Uint8Array(Object.values(t.data));
  if (typeof t == "object" && t) return new Uint8Array(Object.values(t));
  throw new Error("getNearUint8ArrayFromBytes: Unexpected result type from bytes array");
}
function th(t) {
  const e = Ls(t), s = mm(e).txn;
  if (!s) throw new Error("Invalid signed transaction: missing 'txn' field");
  const r = lm(s), n = new TextEncoder().encode("TX"), i = Vt([n, new Uint8Array(r)]), o = Qy(i);
  return I0.encode(o).replace(/=+$/, "");
}
function yo(t) {
  const e = [];
  let s = BigInt(t);
  for (; s >= 0x80n; ) e.push(Number(s & 0x7fn | 0x80n)), s >>= 7n;
  return e.push(Number(s)), new Uint8Array(e);
}
function Gx(t) {
  const e = Ls(t.signed.bodyBytes), s = Ls(t.signed.authInfoBytes), r = Ls(t.signature.signature), n = [];
  n.push(new Uint8Array([10])), n.push(yo(e.length)), n.push(e), n.push(new Uint8Array([18])), n.push(yo(s.length)), n.push(s), n.push(new Uint8Array([26])), n.push(yo(r.length)), n.push(r);
  const i = Vt(n), o = qs(i);
  return ye(o, "base16").toUpperCase();
}
const Yx = { pubnet: "Public Global Stellar Network ; September 2015", testnet: "Test SDF Network ; September 2015" }, Zx = 0, wo = 2, sh = 5, rh = 72, Xx = 64, Jx = 20;
function ia(t, e) {
  return new DataView(t.buffer, t.byteOffset, t.byteLength).getUint32(e, !1);
}
function Qx(t) {
  for (let e = Jx; e >= 0; e--) {
    const s = t.length - 4 - rh * e;
    if (s < 4 || ia(t, s) !== e) continue;
    let r = !0;
    for (let n = 0; n < e; n++) {
      const i = s + 4 + rh * n;
      if (ia(t, i + 4) !== Xx) {
        r = !1;
        break;
      }
    }
    if (r) return s;
  }
  throw new Error("getStellarTransactionHash: could not locate envelope signature array");
}
function e_(t, e) {
  const s = Ls(t);
  if (s.length < 8) throw new Error("getStellarTransactionHash: envelope too short");
  const r = ia(s, 0);
  let n, i;
  switch (r) {
    case Zx:
      n = wo, i = 0;
      break;
    case wo:
      n = wo, i = 4;
      break;
    case sh:
      n = sh, i = 4;
      break;
    default:
      throw new Error(`getStellarTransactionHash: unsupported envelope type: ${r}`);
  }
  const o = Qx(s), a = e?.split(":").pop() ?? "pubnet", c = Yx[a];
  if (!c) throw new Error(`getStellarTransactionHash: unknown Stellar network: ${a}`);
  const l = qs(new TextEncoder().encode(c)), u = new Uint8Array([0, 0, 0, n]), h = Vt([l, u, s.slice(i, o)]);
  return ye(qs(h), "base16");
}
function t_(t) {
  const e = [];
  try {
    if (typeof t == "string") return e.push(t), e;
    if (typeof t != "object") return e;
    t?.id && e.push(t.id);
    const s = t?.capabilities?.caip345?.transactionHashes;
    s && e.push(...s);
  } catch (s) {
    console.warn("getWalletSendCallsHashes failed: ", s);
  }
  return e;
}
const Hd = "did:pkh:", s_ = { eip155: "Ethereum", solana: "Solana", bip122: "Bitcoin" }, r_ = (t) => t ? s_[t] || t : "", $i = (t) => t?.split(":"), n_ = (t) => {
  const e = t && $i(t);
  if (e) return t.includes(Hd) ? e[3] : e[1];
}, i_ = (t) => {
  const e = t && $i(t);
  if (e) return t.includes(Hd) ? e[2] : e[0];
}, ni = (t) => {
  const e = t && $i(t);
  if (e) return e[2] + ":" + e[3];
}, ii = (t) => {
  const e = t && $i(t);
  if (e) return e.pop();
};
async function nh(t) {
  const { cacao: e, projectId: s } = t, { s: r, p: n } = e;
  let i;
  try {
    i = Kd(n, n.iss);
  } catch {
    return !1;
  }
  const o = ii(n.iss);
  try {
    return await zx(o, i, r, ni(n.iss), s);
  } catch {
    return !1;
  }
}
function o_(t) {
  const { cacao: e, request: s } = t, { p: r } = e;
  if (r.domain !== s.domain) return { valid: !1, reason: `domain mismatch: requested ${s.domain}, got ${r.domain}` };
  if (r.nonce !== s.nonce) return { valid: !1, reason: `nonce mismatch: requested ${s.nonce}, got ${r.nonce}` };
  const n = s.aud || s.uri, i = r.aud || r.uri;
  if (n && i !== n) return { valid: !1, reason: `aud mismatch: requested ${n}, got ${i}` };
  if (s.chains?.length) {
    const a = ni(r.iss);
    if (!a || !s.chains.includes(a)) return { valid: !1, reason: `cacao issued for chain ${a} which was not requested` };
  }
  const o = Date.now();
  if (r.exp) {
    const a = new Date(r.exp).getTime();
    if (isNaN(a)) return { valid: !1, reason: `malformed exp: ${r.exp}` };
    if (a < o) return { valid: !1, reason: "cacao has expired" };
  }
  if (r.nbf) {
    const a = new Date(r.nbf).getTime();
    if (isNaN(a)) return { valid: !1, reason: `malformed nbf: ${r.nbf}` };
    if (a > o) return { valid: !1, reason: "cacao is not yet valid" };
  }
  return { valid: !0 };
}
const Kd = (t, e) => {
  const s = i_(e);
  if (!s) throw new Error("Invalid issuer: " + e);
  const r = `${t.domain} wants you to sign in with your ${r_(s)} account:`, n = ii(e);
  if (!t.aud && !t.uri) throw new Error("Either `aud` or `uri` is required to construct the message");
  let i = t.statement || void 0;
  const o = `URI: ${t.aud || t.uri}`, a = `Version: ${t.version}`, c = `Chain ID: ${n_(e)}`, l = `Nonce: ${t.nonce}`, u = `Issued At: ${t.iat}`, h = t.exp ? `Expiration Time: ${t.exp}` : void 0, f = t.nbf ? `Not Before: ${t.nbf}` : void 0, d = t.requestId ? `Request ID: ${t.requestId}` : void 0, g = t.resources ? `Resources:${t.resources.map((m) => `
- ${m}`).join("")}` : void 0, w = Un(t.resources);
  if (w) {
    const m = Vr(w);
    i = g_(i, m);
  }
  if (i && /\r|\n/.test(i)) throw new Error("Statement must not contain line breaks (`\\r` or `\\n`)");
  return [r, n, "", i, "", o, a, c, l, u, h, f, d, g].filter((m) => m != null).join(`
`);
};
function a_(t) {
  const e = JSON.stringify(t), s = new TextEncoder().encode(e), r = new Array(s.length);
  for (let n = 0; n < s.length; n++) r[n] = String.fromCharCode(s[n]);
  return btoa(r.join(""));
}
function c_(t) {
  const e = t + "=".repeat((4 - t.length % 4) % 4), s = atob(e), r = new Uint8Array(s.length);
  for (let n = 0; n < s.length; n++) r[n] = s.charCodeAt(n);
  return JSON.parse(new TextDecoder().decode(r));
}
function Fs(t) {
  if (!t) throw new Error("No recap provided, value is undefined");
  if (!t.att) throw new Error("No `att` property found");
  const e = Object.keys(t.att);
  if (!e?.length) throw new Error("No resources found in `att` property");
  e.forEach((s) => {
    const r = t.att[s];
    if (Array.isArray(r)) throw new Error(`Resource must be an object: ${s}`);
    if (typeof r != "object") throw new Error(`Resource must be an object: ${s}`);
    if (!Object.keys(r).length) throw new Error(`Resource object is empty: ${s}`);
    Object.keys(r).forEach((n) => {
      const i = r[n];
      if (!Array.isArray(i)) throw new Error(`Ability limits ${n} must be an array of objects, found: ${i}`);
      if (!i.length) throw new Error(`Value of ${n} is empty array, must be an array with objects`);
      i.forEach((o) => {
        if (typeof o != "object") throw new Error(`Ability limits (${n}) must be an array of objects, found: ${o}`);
      });
    });
  });
}
function l_(t, e, s, r = {}) {
  return s?.sort((n, i) => n.localeCompare(i)), { att: { [t]: h_(e, s, r) } };
}
function h_(t, e, s = {}) {
  e = e?.sort((n, i) => n.localeCompare(i));
  const r = e.map((n) => ({ [`${t}/${n}`]: [s] }));
  return Object.assign({}, ...r);
}
function Vd(t) {
  return Fs(t), `urn:recap:${a_(t).replace(/=/g, "")}`;
}
function Vr(t) {
  const e = c_(t.replace("urn:recap:", ""));
  return Fs(e), e;
}
function u_(t, e, s) {
  const r = l_(t, e, s);
  return Vd(r);
}
function f_(t) {
  return t && t.includes("urn:recap:");
}
function d_(t, e) {
  const s = Vr(t), r = Vr(e), n = p_(s, r);
  return Vd(n);
}
function p_(t, e) {
  Fs(t), Fs(e);
  const s = Object.keys(t.att).concat(Object.keys(e.att)).sort((n, i) => n.localeCompare(i)), r = { att: {} };
  return s.forEach((n) => {
    Object.keys(t.att?.[n] || {}).concat(Object.keys(e.att?.[n] || {})).sort((i, o) => i.localeCompare(o)).forEach((i) => {
      r.att[n] = { ...r.att[n], [i]: t.att[n]?.[i] || e.att[n]?.[i] };
    });
  }), r;
}
function g_(t = "", e) {
  Fs(e);
  const s = "I further authorize the stated URI to perform the following actions on my behalf: ";
  if (t.includes(s)) return t;
  const r = [];
  let n = 0;
  Object.keys(e.att).forEach((a) => {
    const c = Object.keys(e.att[a]).map((h) => ({ ability: h.split("/")[0], action: h.split("/")[1] }));
    c.sort((h, f) => h.action.localeCompare(f.action));
    const l = {};
    c.forEach((h) => {
      l[h.ability] || (l[h.ability] = []), l[h.ability].push(h.action);
    });
    const u = Object.keys(l).map((h) => (n++, `(${n}) '${h}': '${l[h].join("', '")}' for '${a}'.`));
    r.push(u.join(", ").replace(".,", "."));
  });
  const i = r.join(" "), o = `${s}${i}`;
  return `${t ? t + " " : ""}${o}`;
}
function ih(t) {
  const e = Vr(t);
  Fs(e);
  const s = e.att?.eip155;
  return s ? Object.keys(s).map((r) => r.split("/")[1]) : [];
}
function oh(t) {
  const e = Vr(t);
  Fs(e);
  const s = [];
  return Object.values(e.att).forEach((r) => {
    Object.values(r).forEach((n) => {
      n?.[0]?.chains && s.push(n[0].chains);
    });
  }), [...new Set(s.flat())];
}
function Un(t) {
  if (!t) return;
  const e = t?.[t.length - 1];
  return f_(e) ? e : void 0;
}
const Wd = "base10", Ue = "base16", Ie = "base64pad", _t = "base64url", cn = "utf8", Gd = 0, Yt = 1, Hs = 2, y_ = 0, ah = 1, Ur = 12, Xa = 32;
function w_() {
  const t = Wo.utils.randomPrivateKey(), e = Wo.getPublicKey(t);
  return { privateKey: ye(t, Ue), publicKey: ye(e, Ue) };
}
function oa() {
  const t = bs(Xa);
  return ye(t, Ue);
}
function m_(t, e) {
  const s = Wo.getSharedSecret(Re(t, Ue), Re(e, Ue)), r = Bb(mi, s, void 0, void 0, Xa);
  return ye(r, Ue);
}
function Mn(t) {
  const e = mi(Re(t, Ue));
  return ye(e, Ue);
}
function et(t) {
  const e = mi(Re(t, cn));
  return ye(e, Ue);
}
function Yd(t) {
  return Re(`${t}`, Wd);
}
function Ks(t) {
  return Number(ye(t, Wd));
}
function Zd(t) {
  return t.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function oi(t) {
  const e = t.replace(/-/g, "+").replace(/_/g, "/"), s = (4 - e.length % 4) % 4;
  return e + "=".repeat(s);
}
function b_(t) {
  const e = Yd(typeof t.type < "u" ? t.type : Gd);
  if (Ks(e) === Yt && typeof t.senderPublicKey > "u") throw new Error("Missing sender public key for type 1 envelope");
  const s = typeof t.senderPublicKey < "u" ? Re(t.senderPublicKey, Ue) : void 0, r = typeof t.iv < "u" ? Re(t.iv, Ue) : bs(Ur), n = Re(t.symKey, Ue), i = xf(n, r).encrypt(Re(t.message, cn)), o = Xd({ type: e, sealed: i, iv: r, senderPublicKey: s });
  return t.encoding === _t ? Zd(o) : o;
}
function v_(t) {
  const e = Re(t.symKey, Ue), { sealed: s, iv: r } = Wr({ encoded: t.encoded, encoding: t.encoding }), n = xf(e, r).decrypt(s);
  if (n === null) throw new Error("Failed to decrypt");
  return ye(n, cn);
}
function E_(t, e) {
  const s = Yd(Hs), r = bs(Ur), n = Re(t, cn), i = Xd({ type: s, sealed: n, iv: r });
  return e === _t ? Zd(i) : i;
}
function x_(t, e) {
  const { sealed: s } = Wr({ encoded: t, encoding: e });
  return ye(s, cn);
}
function Xd(t) {
  if (Ks(t.type) === Hs) return ye(Vt([t.type, t.sealed]), Ie);
  if (Ks(t.type) === Yt) {
    if (typeof t.senderPublicKey > "u") throw new Error("Missing sender public key for type 1 envelope");
    return ye(Vt([t.type, t.senderPublicKey, t.iv, t.sealed]), Ie);
  }
  return ye(Vt([t.type, t.iv, t.sealed]), Ie);
}
function Wr(t) {
  const e = (t.encoding || Ie) === _t ? oi(t.encoded) : t.encoded, s = Re(e, Ie), r = s.slice(y_, ah), n = ah;
  if (Ks(r) === Yt) {
    const c = n + Xa, l = c + Ur, u = s.slice(n, c), h = s.slice(c, l), f = s.slice(l);
    return { type: r, sealed: f, iv: h, senderPublicKey: u };
  }
  if (Ks(r) === Hs) {
    const c = s.slice(n), l = bs(Ur);
    return { type: r, sealed: c, iv: l };
  }
  const i = n + Ur, o = s.slice(n, i), a = s.slice(i);
  return { type: r, sealed: a, iv: o };
}
function __(t, e) {
  const s = Wr({ encoded: t, encoding: e?.encoding });
  return Jd({ type: Ks(s.type), senderPublicKey: typeof s.senderPublicKey < "u" ? ye(s.senderPublicKey, Ue) : void 0, receiverPublicKey: e?.receiverPublicKey });
}
function Jd(t) {
  const e = t?.type || Gd;
  if (e === Yt) {
    if (typeof t?.senderPublicKey > "u") throw new Error("missing sender public key");
    if (typeof t?.receiverPublicKey > "u") throw new Error("missing receiver public key");
  }
  return { type: e, senderPublicKey: t?.senderPublicKey, receiverPublicKey: t?.receiverPublicKey };
}
function ch(t) {
  return t.type === Yt && typeof t.senderPublicKey == "string" && typeof t.receiverPublicKey == "string";
}
function lh(t) {
  return t.type === Hs;
}
function I_(t) {
  const e = Re(oi(t.x), Ie), s = Re(oi(t.y), Ie);
  return Vt([new Uint8Array([4]), e, s]);
}
function S_(t, e) {
  const [s, r, n] = t.split("."), i = Re(oi(n), Ie);
  if (i.length !== 64) throw new Error("Invalid signature length");
  const o = i.slice(0, 32), a = i.slice(32, 64), c = `${s}.${r}`, l = mi(c), u = I_(e);
  if (!v1.verify(Vt([o, a]), l, u)) throw new Error("Invalid signature");
  return ea(t).payload;
}
const D_ = "irn";
function ai(t) {
  return t?.relay || { protocol: D_ };
}
function rr(t) {
  const e = d2[t];
  if (typeof e > "u") throw new Error(`Relay Protocol not supported: ${t}`);
  return e;
}
function A_(t, e = "-") {
  const s = {}, r = "relay" + e;
  return Object.keys(t).forEach((n) => {
    if (n.startsWith(r)) {
      const i = n.replace(r, ""), o = t[n];
      s[i] = o;
    }
  }), s;
}
function hh(t) {
  if (!t.includes("wc:")) {
    const l = jd(t);
    l?.includes("wc:") && (t = l);
  }
  t = t.includes("wc://") ? t.replace("wc://", "") : t, t = t.includes("wc:") ? t.replace("wc:", "") : t;
  const e = t.indexOf(":"), s = t.indexOf("?") !== -1 ? t.indexOf("?") : void 0, r = t.substring(0, e), n = t.substring(e + 1, s).split("@"), i = typeof s < "u" ? t.substring(s) : "", o = new URLSearchParams(i), a = Object.fromEntries(o.entries()), c = typeof a.methods == "string" ? a.methods.split(",") : void 0;
  return { protocol: r, topic: $_(n[0]), version: parseInt(n[1], 10), symKey: a.symKey, relay: A_(a), methods: c, expiryTimestamp: a.expiryTimestamp ? parseInt(a.expiryTimestamp, 10) : void 0 };
}
function $_(t) {
  return t.startsWith("//") ? t.substring(2) : t;
}
function O_(t, e = "-") {
  const s = "relay", r = {};
  return Object.keys(t).forEach((n) => {
    const i = n, o = s + e + i;
    t[i] && (r[o] = t[i]);
  }), r;
}
function uh(t) {
  const e = new URLSearchParams(), s = { ...O_(t.relay), symKey: t.symKey, ...t.expiryTimestamp && { expiryTimestamp: t.expiryTimestamp.toString() }, ...t.methods && { methods: t.methods.join(",") } };
  return Object.entries(s).sort(([r], [n]) => r.localeCompare(n)).forEach(([r, n]) => {
    n !== void 0 && e.append(r, String(n));
  }), `${t.protocol}:${t.topic}@${t.version}?${e}`;
}
function An(t, e, s) {
  return `${t}?wc_ev=${s}&topic=${e}`;
}
function mr(t) {
  const e = [];
  return t.forEach((s) => {
    const [r, n] = s.split(":");
    e.push(`${r}:${n}`);
  }), e;
}
function Qd(t) {
  const e = [];
  return Object.values(t).forEach((s) => {
    e.push(...mr(s.accounts));
  }), [...new Set(e)];
}
function P_(t) {
  const e = [];
  return Object.values(t).forEach((s) => {
    e.push(...s.methods);
  }), [...new Set(e)];
}
function T_(t) {
  const e = [];
  return Object.values(t).forEach((s) => {
    e.push(...s.events);
  }), [...new Set(e)];
}
function B_(t, e) {
  const s = [];
  return Object.values(t).forEach((r) => {
    mr(r.accounts).includes(e) && s.push(...r.methods);
  }), s;
}
function R_(t, e) {
  const s = [];
  return Object.values(t).forEach((r) => {
    mr(r.accounts).includes(e) && s.push(...r.events);
  }), s;
}
function Oi(t) {
  return t.includes(":");
}
function nr(t) {
  return Oi(t) ? t.split(":")[0] : t;
}
function fh(t) {
  const e = {};
  if (!Dt(t)) return e;
  for (const [s, r] of Object.entries(t)) {
    const n = Oi(s) ? [s] : r.chains, i = r.methods || [], o = r.events || [], a = nr(s);
    e[a] = { ...e[a], chains: St(n, e[a]?.chains), methods: St(i, e[a]?.methods), events: St(o, e[a]?.events) };
  }
  return e;
}
function C_(t) {
  const e = {};
  return t?.forEach((s) => {
    const [r, n] = s.split(":");
    e[r] || (e[r] = { accounts: [], chains: [], events: [], methods: [] }), e[r].accounts.push(s), e[r].chains?.push(`${r}:${n}`);
  }), e;
}
function dh(t, e) {
  e = e.map((r) => r.replace("did:pkh:", ""));
  const s = C_(e);
  for (const [r, n] of Object.entries(s)) n.methods ? n.methods = St(n.methods, t) : n.methods = t, n.events = ["chainChanged", "accountsChanged"];
  return s;
}
function N_(t, e) {
  const s = fh(t), r = fh(e), n = {}, i = Object.keys(s).concat(Object.keys(r));
  for (const o of i) n[o] = { chains: St(s[o]?.chains, r[o]?.chains), methods: St(s[o]?.methods, r[o]?.methods), events: St(s[o]?.events, r[o]?.events) };
  return n;
}
function st(t, e) {
  return !!Array.isArray(t);
}
function Dt(t) {
  return Object.getPrototypeOf(t) === Object.prototype && Object.keys(t).length;
}
function ge(t) {
  return typeof t > "u";
}
function fe(t, e) {
  return e && ge(t) ? !0 : typeof t == "string" && !!t.trim().length;
}
function Ja(t, e) {
  return e && ge(t) ? !0 : typeof t == "number" && !isNaN(t);
}
function U_(t, e) {
  const { requiredNamespaces: s } = e, r = Object.keys(t.namespaces), n = Object.keys(s);
  let i = !0;
  return Us(n, r) ? (r.forEach((o) => {
    const { accounts: a, methods: c, events: l } = t.namespaces[o], u = mr(a), h = s[o];
    (!Us(Md(o, h), u) || !Us(h.methods, c) || !Us(h.events, l)) && (i = !1);
  }), i) : !1;
}
function ci(t) {
  return fe(t, !1) && t.includes(":") ? t.split(":").length === 2 : !1;
}
function M_(t) {
  if (fe(t, !1) && t.includes(":")) {
    const e = t.split(":");
    if (e.length === 3) {
      const s = e[0] + ":" + e[1];
      return !!e[2] && ci(s);
    }
  }
  return !1;
}
function L_(t) {
  function e(s) {
    try {
      return typeof new URL(s) < "u";
    } catch {
      return !1;
    }
  }
  try {
    if (fe(t, !1)) {
      if (e(t)) return !0;
      const s = jd(t);
      return e(s);
    }
  } catch {
  }
  return !1;
}
function k_(t) {
  return t?.proposer?.publicKey;
}
function q_(t) {
  return t?.topic;
}
function z_(t, e) {
  let s = null;
  return fe(t?.publicKey, !1) || (s = j("MISSING_OR_INVALID", `${e} controller public key should be a string`)), s;
}
function ph(t) {
  let e = !0;
  return st(t) ? t.length && (e = t.every((s) => fe(s, !1))) : e = !1, e;
}
function j_(t, e, s) {
  let r = null;
  return st(e) && e.length ? e.forEach((n) => {
    r || ci(n) || (r = se("UNSUPPORTED_CHAINS", `${s}, chain ${n} should be a string and conform to "namespace:chainId" format`));
  }) : ci(t) || (r = se("UNSUPPORTED_CHAINS", `${s}, chains must be defined as "namespace:chainId" e.g. "eip155:1": {...} in the namespace key OR as an array of CAIP-2 chainIds e.g. eip155: { chains: ["eip155:1", "eip155:5"] }`)), r;
}
function F_(t, e, s) {
  let r = null;
  return Object.entries(t).forEach(([n, i]) => {
    if (r) return;
    const o = j_(n, Md(n, i), `${e} ${s}`);
    o && (r = o);
  }), r;
}
function H_(t, e) {
  let s = null;
  return st(t) ? t.forEach((r) => {
    s || M_(r) || (s = se("UNSUPPORTED_ACCOUNTS", `${e}, account ${r} should be a string and conform to "namespace:chainId:address" format`));
  }) : s = se("UNSUPPORTED_ACCOUNTS", `${e}, accounts should be an array of strings conforming to "namespace:chainId:address" format`), s;
}
function K_(t, e) {
  let s = null;
  return Object.values(t).forEach((r) => {
    if (s) return;
    const n = H_(r?.accounts, `${e} namespace`);
    n && (s = n);
  }), s;
}
function V_(t, e) {
  let s = null;
  return ph(t?.methods) ? ph(t?.events) || (s = se("UNSUPPORTED_EVENTS", `${e}, events should be an array of strings or empty array for no events`)) : s = se("UNSUPPORTED_METHODS", `${e}, methods should be an array of strings or empty array for no methods`), s;
}
function ep(t, e) {
  let s = null;
  return Object.values(t).forEach((r) => {
    if (s) return;
    const n = V_(r, `${e}, namespace`);
    n && (s = n);
  }), s;
}
function W_(t, e, s) {
  let r = null;
  if (t && Dt(t)) {
    const n = ep(t, e);
    n && (r = n);
    const i = F_(t, e, s);
    i && (r = i);
  } else r = j("MISSING_OR_INVALID", `${e}, ${s} should be an object with data`);
  return r;
}
function mo(t, e) {
  let s = null;
  if (t && Dt(t)) {
    const r = ep(t, e);
    r && (s = r);
    const n = K_(t, e);
    n && (s = n);
  } else s = j("MISSING_OR_INVALID", `${e}, namespaces should be an object with data`);
  return s;
}
function tp(t) {
  return fe(t.protocol, !0);
}
function G_(t, e) {
  let s = !1;
  return t ? t && st(t) && t.length && t.forEach((r) => {
    s = tp(r);
  }) : s = !0, s;
}
function Y_(t) {
  return typeof t == "number";
}
function Le(t) {
  return typeof t < "u" && typeof t !== null;
}
function Z_(t) {
  return !(!t || typeof t != "object" || !t.code || !Ja(t.code, !1) || !t.message || !fe(t.message, !1));
}
function X_(t) {
  return !(ge(t) || !fe(t.method, !1));
}
function J_(t) {
  return !(ge(t) || ge(t.result) && ge(t.error) || !Ja(t.id, !1) || !fe(t.jsonrpc, !1));
}
function Q_(t) {
  return !(ge(t) || !fe(t.name, !1));
}
function gh(t, e) {
  return !(!ci(e) || !Qd(t).includes(e));
}
function eI(t, e, s) {
  return fe(s, !1) ? B_(t, e).includes(s) : !1;
}
function tI(t, e, s) {
  return fe(s, !1) ? R_(t, e).includes(s) : !1;
}
function yh(t, e, s) {
  let r = null;
  const n = sI(t), i = rI(e), o = Object.keys(n), a = Object.keys(i), c = wh(Object.keys(t)), l = wh(Object.keys(e)), u = c.filter((h) => !l.includes(h));
  return u.length && (r = j("NON_CONFORMING_NAMESPACES", `${s} namespaces keys don't satisfy requiredNamespaces.
      Required: ${u.toString()}
      Received: ${Object.keys(e).toString()}`)), Us(o, a) || (r = j("NON_CONFORMING_NAMESPACES", `${s} namespaces chains don't satisfy required namespaces.
      Required: ${o.toString()}
      Approved: ${a.toString()}`)), Object.keys(e).forEach((h) => {
    if (!h.includes(":") || r) return;
    const f = mr(e[h].accounts);
    f.includes(h) || (r = j("NON_CONFORMING_NAMESPACES", `${s} namespaces accounts don't satisfy namespace accounts for ${h}
        Required: ${h}
        Approved: ${f.toString()}`));
  }), o.forEach((h) => {
    r || (Us(n[h].methods, i[h].methods) ? Us(n[h].events, i[h].events) || (r = j("NON_CONFORMING_NAMESPACES", `${s} namespaces events don't satisfy namespace events for ${h}`)) : r = j("NON_CONFORMING_NAMESPACES", `${s} namespaces methods don't satisfy namespace methods for ${h}`));
  }), r;
}
function sI(t) {
  const e = {};
  return Object.keys(t).forEach((s) => {
    s.includes(":") ? e[s] = t[s] : t[s].chains?.forEach((r) => {
      e[r] = { methods: t[s].methods, events: t[s].events };
    });
  }), e;
}
function wh(t) {
  return [...new Set(t.map((e) => e.includes(":") ? e.split(":")[0] : e))];
}
function rI(t) {
  const e = {};
  return Object.keys(t).forEach((s) => {
    s.includes(":") ? e[s] = t[s] : mr(t[s].accounts)?.forEach((r) => {
      e[r] = { accounts: t[s].accounts.filter((n) => n.includes(`${r}:`)), methods: t[s].methods, events: t[s].events };
    });
  }), e;
}
function nI(t, e) {
  return Ja(t, !1) && t <= e.max && t >= e.min;
}
function mh() {
  const t = an();
  return new Promise((e) => {
    switch (t) {
      case We.browser:
        e(iI());
        break;
      case We.reactNative:
        e(oI());
        break;
      case We.node:
        e(aI());
        break;
      default:
        e(!0);
    }
  });
}
function iI() {
  return wr() && navigator?.onLine;
}
async function oI() {
  return Es() && typeof globalThis < "u" && globalThis?.NetInfo ? (await globalThis?.NetInfo.fetch())?.isConnected : !0;
}
function aI() {
  return !0;
}
function cI(t) {
  switch (an()) {
    case We.browser:
      lI(t);
      break;
    case We.reactNative:
      hI(t);
      break;
  }
}
function lI(t) {
  !Es() && wr() && (window.addEventListener("online", () => t(!0)), window.addEventListener("offline", () => t(!1)));
}
function hI(t) {
  Es() && typeof globalThis < "u" && globalThis?.NetInfo && globalThis?.NetInfo.addEventListener((e) => t(e?.isConnected));
}
function uI() {
  return wr() && ks() ? ks()?.visibilityState === "visible" : !0;
}
const bo = {};
class $r {
  static get(e) {
    return bo[e];
  }
  static set(e, s) {
    bo[e] = s;
  }
  static delete(e) {
    delete bo[e];
  }
}
function fI(t) {
  const e = sn.decode(t);
  if (e.length < 33) throw new Error("Too short to contain a public key");
  return e.slice(1, 33);
}
function dI({ publicKey: t, signature: e, payload: s }) {
  const r = li(s.method), n = 128 | parseInt(s.version?.toString() || "4"), i = yI(s.address), o = s.era === "00" ? new Uint8Array([0]) : li(s.era);
  if (o.length !== 1 && o.length !== 2) throw new Error("Invalid era length");
  const a = parseInt(s.nonce, 16), c = new Uint8Array([a & 255, a >> 8 & 255]), l = BigInt(`0x${gI(s.tip)}`), u = mI(l), h = new Uint8Array([0, ...t, i, ...e, ...o, ...c, ...u, ...r]), f = wI(h.length + 1);
  return new Uint8Array([...f, n, ...h]);
}
function pI(t) {
  const e = li(t), s = S2.blake2b(e, void 0, 32);
  return "0x" + ye(s, "base16");
}
function li(t) {
  return new Uint8Array(t.replace(/^0x/, "").match(/.{1,2}/g).map((e) => parseInt(e, 16)));
}
function gI(t) {
  return t.startsWith("0x") ? t.slice(2) : t;
}
function yI(t) {
  const e = sn.decode(t)[0];
  return e === 42 ? 0 : e === 60 ? 2 : 1;
}
function wI(t) {
  if (t < 64) return new Uint8Array([t << 2]);
  if (t < 16384) {
    const e = t << 2 | 1;
    return new Uint8Array([e & 255, e >> 8 & 255]);
  } else if (t < 1 << 30) {
    const e = t << 2 | 2;
    return new Uint8Array([e & 255, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255]);
  } else throw new Error("Compact encoding > 2^30 not supported");
}
function mI(t) {
  if (t < 1n << 6n) return new Uint8Array([Number(t << 2n)]);
  if (t < 1n << 14n) {
    const e = t << 2n | 0x01n;
    return new Uint8Array([Number(e & 0xffn), Number(e >> 8n & 0xffn)]);
  } else if (t < 1n << 30n) {
    const e = t << 2n | 0x02n;
    return new Uint8Array([Number(e & 0xffn), Number(e >> 8n & 0xffn), Number(e >> 16n & 0xffn), Number(e >> 24n & 0xffn)]);
  } else throw new Error("BigInt compact encoding not supported > 2^30");
}
function bI(t) {
  const e = li(t.signature), s = fI(t.transaction.address), r = dI({ publicKey: s, signature: e, payload: t.transaction }), n = ye(r, "base16");
  return pI(n);
}
const vI = /* @__PURE__ */ new Set(["TransferFactory_Transfer", "DelegateProxy_TransferFactory_Transfer"]);
function EI(t) {
  const e = t?.commands;
  if (!Array.isArray(e)) return [];
  const s = [];
  for (const r of e) {
    const n = r?.ExerciseCommand;
    if (!n || !vI.has(n.choice)) continue;
    const i = n.choiceArgument?.transfer;
    !i?.amount || !i?.instrumentId?.id || s.push({ amount: String(i.amount), instrumentId: String(i.instrumentId.id) });
  }
  return s;
}
function xI(t, e) {
  const s = e?.payload?.updateId;
  if (!s) return [];
  const r = EI(t);
  return r.length === 0 ? [String(s)] : r.map((n) => `${s}:${n.amount}:${n.instrumentId}`);
}
function Qa({ logger: t, name: e }) {
  const s = typeof t == "string" ? Ud({ opts: { level: t, name: e } }).logger : t;
  return s.level = typeof t == "string" ? t : t.level, s;
}
class Ws {
}
let _I = class extends Ws {
  constructor(e) {
    super();
  }
};
const bh = k.FIVE_SECONDS, Gs = { pulse: "heartbeat_pulse" };
class ec extends _I {
  constructor(e) {
    super(e), this.events = new Ge.EventEmitter(), this.interval = bh, this.interval = e?.interval || bh;
  }
  static async init(e) {
    const s = new ec(e);
    return await s.init(), s;
  }
  async init() {
    await this.initialize();
  }
  stop() {
    clearInterval(this.intervalRef);
  }
  on(e, s) {
    this.events.on(e, s);
  }
  once(e, s) {
    this.events.once(e, s);
  }
  off(e, s) {
    this.events.off(e, s);
  }
  removeListener(e, s) {
    this.events.removeListener(e, s);
  }
  async initialize() {
    this.intervalRef = setInterval(() => this.pulse(), k.toMiliseconds(this.interval));
  }
  pulse() {
    this.events.emit(Gs.pulse);
  }
}
const II = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/, SI = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/, DI = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function AI(t, e) {
  if (t === "__proto__" || t === "constructor" && e && typeof e == "object" && "prototype" in e) {
    $I(t);
    return;
  }
  return e;
}
function $I(t) {
  console.warn(`[destr] Dropping "${t}" key to prevent prototype pollution.`);
}
function $n(t, e = {}) {
  if (typeof t != "string")
    return t;
  if (t[0] === '"' && t[t.length - 1] === '"' && t.indexOf("\\") === -1)
    return t.slice(1, -1);
  const s = t.trim();
  if (s.length <= 9)
    switch (s.toLowerCase()) {
      case "true":
        return !0;
      case "false":
        return !1;
      case "undefined":
        return;
      case "null":
        return null;
      case "nan":
        return Number.NaN;
      case "infinity":
        return Number.POSITIVE_INFINITY;
      case "-infinity":
        return Number.NEGATIVE_INFINITY;
    }
  if (!DI.test(t)) {
    if (e.strict)
      throw new SyntaxError("[destr] Invalid JSON");
    return t;
  }
  try {
    if (II.test(t) || SI.test(t)) {
      if (e.strict)
        throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(t, AI);
    }
    return JSON.parse(t);
  } catch (r) {
    if (e.strict)
      throw r;
    return t;
  }
}
function OI(t) {
  return !t || typeof t.then != "function" ? Promise.resolve(t) : t;
}
function me(t, ...e) {
  try {
    return OI(t(...e));
  } catch (s) {
    return Promise.reject(s);
  }
}
function PI(t) {
  const e = typeof t;
  return t === null || e !== "object" && e !== "function";
}
function TI(t) {
  const e = Object.getPrototypeOf(t);
  return !e || e.isPrototypeOf(Object);
}
function Ln(t) {
  if (PI(t))
    return String(t);
  if (TI(t) || Array.isArray(t))
    return JSON.stringify(t);
  if (typeof t.toJSON == "function")
    return Ln(t.toJSON());
  throw new Error("[unstorage] Cannot stringify value!");
}
const aa = "base64:";
function BI(t) {
  return typeof t == "string" ? t : aa + NI(t);
}
function RI(t) {
  return typeof t != "string" || !t.startsWith(aa) ? t : CI(t.slice(aa.length));
}
function CI(t) {
  return globalThis.Buffer ? Buffer.from(t, "base64") : Uint8Array.from(
    globalThis.atob(t),
    (e) => e.codePointAt(0)
  );
}
function NI(t) {
  return globalThis.Buffer ? Buffer.from(t).toString("base64") : globalThis.btoa(String.fromCodePoint(...t));
}
function Os(t) {
  return t && t.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function vh(t) {
  return t.split(":").some((e) => e === "." || e === "..");
}
function UI(...t) {
  return Os(t.join(":"));
}
function Eh(t) {
  return t = Os(t), t ? t + ":" : "";
}
function MI(t, e) {
  if (e === void 0)
    return !0;
  let s = 0, r = t.indexOf(":");
  for (; r > -1; )
    s++, r = t.indexOf(":", r + 1);
  return s <= e;
}
function LI(t, e) {
  return e ? t.startsWith(e) && t[t.length - 1] !== "$" : t[t.length - 1] !== "$";
}
const kI = "memory", qI = () => {
  const t = /* @__PURE__ */ new Map();
  return {
    name: kI,
    getInstance: () => t,
    hasItem(e) {
      return t.has(e);
    },
    getItem(e) {
      return t.get(e) ?? null;
    },
    getItemRaw(e) {
      return t.get(e) ?? null;
    },
    setItem(e, s) {
      t.set(e, s);
    },
    setItemRaw(e, s) {
      t.set(e, s);
    },
    removeItem(e) {
      t.delete(e);
    },
    getKeys() {
      return [...t.keys()];
    },
    clear() {
      t.clear();
    },
    dispose() {
      t.clear();
    }
  };
};
function zI(t = {}) {
  const e = {
    mounts: { "": t.driver || qI() },
    mountpoints: [""],
    watching: !1,
    watchListeners: [],
    unwatch: {}
  }, s = (h) => {
    const f = Os(h);
    if (!f || vh(f))
      throw new Error(`[unstorage] Invalid key: ${JSON.stringify(h)}`);
    return f;
  }, r = (h) => {
    const f = Eh(h);
    if (vh(f))
      throw new Error(`[unstorage] Invalid base: ${JSON.stringify(h)}`);
    return f;
  }, n = (h) => {
    for (const f of e.mountpoints)
      if (h.startsWith(f))
        return {
          base: f,
          relativeKey: h.slice(f.length),
          driver: e.mounts[f]
        };
    return {
      base: "",
      relativeKey: h,
      driver: e.mounts[""]
    };
  }, i = (h, f) => e.mountpoints.filter(
    (d) => d.startsWith(h) || f && h.startsWith(d)
  ).map((d) => ({
    relativeBase: h.length > d.length ? h.slice(d.length) : void 0,
    mountpoint: d,
    driver: e.mounts[d]
  })), o = (h, f) => {
    if (e.watching) {
      f = Os(f);
      for (const d of e.watchListeners)
        d(h, f);
    }
  }, a = async () => {
    if (!e.watching) {
      e.watching = !0;
      for (const h in e.mounts)
        e.unwatch[h] = await xh(
          e.mounts[h],
          o,
          h
        );
    }
  }, c = async () => {
    if (e.watching) {
      for (const h in e.unwatch)
        await e.unwatch[h]();
      e.unwatch = {}, e.watching = !1;
    }
  }, l = (h, f, d) => {
    const g = /* @__PURE__ */ new Map(), w = (m) => {
      let S = g.get(m.base);
      return S || (S = {
        driver: m.driver,
        base: m.base,
        items: []
      }, g.set(m.base, S)), S;
    };
    for (const m of h) {
      const S = typeof m == "string", T = s(S ? m : m.key), E = S ? void 0 : m.value, D = S || !m.options ? f : { ...f, ...m.options }, $ = n(T);
      w($).items.push({
        key: T,
        value: E,
        relativeKey: $.relativeKey,
        options: D
      });
    }
    return Promise.all([...g.values()].map((m) => d(m))).then(
      (m) => m.flat()
    );
  }, u = {
    // Item
    async hasItem(h, f = {}) {
      h = s(h);
      const { relativeKey: d, driver: g } = n(h);
      return me(g.hasItem, d, f);
    },
    async getItem(h, f = {}) {
      h = s(h);
      const { relativeKey: d, driver: g } = n(h);
      return me(g.getItem, d, f).then(
        (w) => $n(w)
      );
    },
    async getItems(h, f = {}) {
      return l(h, f, (d) => d.driver.getItems ? me(
        d.driver.getItems,
        d.items.map((g) => ({
          key: g.relativeKey,
          options: g.options
        })),
        f
      ).then(
        (g) => g.map((w) => ({
          key: UI(d.base, w.key),
          value: $n(w.value)
        }))
      ) : Promise.all(
        d.items.map((g) => me(
          d.driver.getItem,
          g.relativeKey,
          g.options
        ).then((w) => ({
          key: g.key,
          value: $n(w)
        })))
      ));
    },
    async getItemRaw(h, f = {}) {
      h = s(h);
      const { relativeKey: d, driver: g } = n(h);
      return g.getItemRaw ? me(g.getItemRaw, d, f) : me(g.getItem, d, f).then(
        (w) => RI(w)
      );
    },
    async setItem(h, f, d = {}) {
      if (f === void 0)
        return u.removeItem(h);
      h = s(h);
      const { relativeKey: g, driver: w } = n(h);
      w.setItem && (await me(w.setItem, g, Ln(f), d), w.watch || o("update", h));
    },
    async setItems(h, f) {
      await l(h, f, async (d) => {
        if (d.driver.setItems)
          return me(
            d.driver.setItems,
            d.items.map((g) => ({
              key: g.relativeKey,
              value: Ln(g.value),
              options: g.options
            })),
            f
          );
        d.driver.setItem && await Promise.all(
          d.items.map((g) => me(
            d.driver.setItem,
            g.relativeKey,
            Ln(g.value),
            g.options
          ))
        );
      });
    },
    async setItemRaw(h, f, d = {}) {
      if (f === void 0)
        return u.removeItem(h, d);
      h = s(h);
      const { relativeKey: g, driver: w } = n(h);
      if (w.setItemRaw)
        await me(w.setItemRaw, g, f, d);
      else if (w.setItem)
        await me(w.setItem, g, BI(f), d);
      else
        return;
      w.watch || o("update", h);
    },
    async removeItem(h, f = {}) {
      typeof f == "boolean" && (f = { removeMeta: f }), h = s(h);
      const { relativeKey: d, driver: g } = n(h);
      g.removeItem && (await me(g.removeItem, d, f), (f.removeMeta || f.removeMata) && await me(g.removeItem, d + "$", f), g.watch || o("remove", h));
    },
    // Meta
    async getMeta(h, f = {}) {
      typeof f == "boolean" && (f = { nativeOnly: f }), h = s(h);
      const { relativeKey: d, driver: g } = n(h), w = /* @__PURE__ */ Object.create(null);
      if (g.getMeta && Object.assign(w, await me(g.getMeta, d, f)), !f.nativeOnly) {
        const m = await me(
          g.getItem,
          d + "$",
          f
        ).then((S) => $n(S));
        m && typeof m == "object" && (typeof m.atime == "string" && (m.atime = new Date(m.atime)), typeof m.mtime == "string" && (m.mtime = new Date(m.mtime)), Object.assign(w, m));
      }
      return w;
    },
    async setMeta(h, f, d = {}) {
      return this.setItem(s(h) + "$", f, d);
    },
    async removeMeta(h, f = {}) {
      return this.removeItem(s(h) + "$", f);
    },
    // Keys
    async getKeys(h, f = {}) {
      h = r(h);
      const d = i(h, !0);
      let g = [];
      const w = [];
      let m = !0;
      for (const T of d) {
        T.driver.flags?.maxDepth || (m = !1);
        const E = await me(
          T.driver.getKeys,
          T.relativeBase,
          f
        );
        for (const D of E) {
          const $ = T.mountpoint + Os(D);
          g.some((R) => $.startsWith(R)) || w.push($);
        }
        g = [
          T.mountpoint,
          ...g.filter((D) => !D.startsWith(T.mountpoint))
        ];
      }
      const S = f.maxDepth !== void 0 && !m;
      return w.filter(
        (T) => (!S || MI(T, f.maxDepth)) && LI(T, h)
      );
    },
    // Utils
    async clear(h, f = {}) {
      h = r(h), await Promise.all(
        i(h, !1).map(async (d) => {
          if (d.driver.clear)
            return me(d.driver.clear, d.relativeBase, f);
          if (d.driver.removeItem) {
            const g = await d.driver.getKeys(d.relativeBase || "", f);
            return Promise.all(
              g.map((w) => d.driver.removeItem(w, f))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(e.mounts).map((h) => _h(h))
      );
    },
    async watch(h) {
      return await a(), e.watchListeners.push(h), async () => {
        e.watchListeners = e.watchListeners.filter(
          (f) => f !== h
        ), e.watchListeners.length === 0 && await c();
      };
    },
    async unwatch() {
      e.watchListeners = [], await c();
    },
    // Mount
    mount(h, f) {
      if (h = r(h), h && e.mounts[h])
        throw new Error(`already mounted at ${h}`);
      return h && (e.mountpoints.push(h), e.mountpoints.sort((d, g) => g.length - d.length)), e.mounts[h] = f, e.watching && Promise.resolve(xh(f, o, h)).then((d) => {
        e.unwatch[h] = d;
      }).catch(console.error), u;
    },
    async unmount(h, f = !0) {
      h = Eh(h), !(!h || !e.mounts[h]) && (e.watching && h in e.unwatch && (e.unwatch[h]?.(), delete e.unwatch[h]), f && await _h(e.mounts[h]), e.mountpoints = e.mountpoints.filter((d) => d !== h), delete e.mounts[h]);
    },
    getMount(h = "") {
      h = Os(h) + ":";
      const f = n(h);
      return {
        driver: f.driver,
        base: f.base
      };
    },
    getMounts(h = "", f = {}) {
      return h = Os(h), i(h, f.parents).map((g) => ({
        driver: g.driver,
        base: g.mountpoint
      }));
    },
    // Aliases
    keys: (h, f = {}) => u.getKeys(h, f),
    get: (h, f = {}) => u.getItem(h, f),
    set: (h, f, d = {}) => u.setItem(h, f, d),
    has: (h, f = {}) => u.hasItem(h, f),
    del: (h, f = {}) => u.removeItem(h, f),
    remove: (h, f = {}) => u.removeItem(h, f)
  };
  return u;
}
function xh(t, e, s) {
  return t.watch ? t.watch((r, n) => e(r, s + n)) : () => {
  };
}
async function _h(t) {
  typeof t.dispose == "function" && await me(t.dispose);
}
function Ys(t) {
  return new Promise((e, s) => {
    t.oncomplete = t.onsuccess = () => e(t.result), t.onabort = t.onerror = () => s(t.error);
  });
}
function sp(t, e) {
  const s = indexedDB.open(t);
  s.onupgradeneeded = () => s.result.createObjectStore(e);
  const r = Ys(s);
  return (n, i) => r.then((o) => i(o.transaction(e, n).objectStore(e)));
}
let vo;
function ln() {
  return vo || (vo = sp("keyval-store", "keyval")), vo;
}
function Ih(t, e = ln()) {
  return e("readonly", (s) => Ys(s.get(t)));
}
function jI(t, e, s = ln()) {
  return s("readwrite", (r) => (r.put(e, t), Ys(r.transaction)));
}
function FI(t, e = ln()) {
  return e("readwrite", (s) => (s.delete(t), Ys(s.transaction)));
}
function HI(t = ln()) {
  return t("readwrite", (e) => (e.clear(), Ys(e.transaction)));
}
function KI(t, e) {
  return t.openCursor().onsuccess = function() {
    this.result && (e(this.result), this.result.continue());
  }, Ys(t.transaction);
}
function VI(t = ln()) {
  return t("readonly", (e) => {
    if (e.getAllKeys)
      return Ys(e.getAllKeys());
    const s = [];
    return KI(e, (r) => s.push(r.key)).then(() => s);
  });
}
const WI = "idb-keyval";
var GI = (t = {}) => {
  const e = t.base && t.base.length > 0 ? `${t.base}:` : "", s = (n) => e + n;
  let r;
  return t.dbName && t.storeName && (r = sp(t.dbName, t.storeName)), { name: WI, options: t, async hasItem(n) {
    return !(typeof await Ih(s(n), r) > "u");
  }, async getItem(n) {
    return await Ih(s(n), r) ?? null;
  }, setItem(n, i) {
    return jI(s(n), i, r);
  }, removeItem(n) {
    return FI(s(n), r);
  }, getKeys() {
    return VI(r);
  }, clear() {
    return HI(r);
  } };
};
const YI = "WALLET_CONNECT_V2_INDEXED_DB", ZI = "keyvaluestorage";
let XI = class {
  constructor() {
    this.indexedDb = zI({ driver: GI({ dbName: YI, storeName: ZI }) });
  }
  async getKeys() {
    return this.indexedDb.getKeys();
  }
  async getEntries() {
    return (await this.indexedDb.getItems(await this.indexedDb.getKeys())).map((e) => [e.key, e.value]);
  }
  async getItem(e) {
    const s = await this.indexedDb.getItem(e);
    if (s !== null) return s;
  }
  async setItem(e, s) {
    await this.indexedDb.setItem(e, js(s));
  }
  async removeItem(e) {
    await this.indexedDb.removeItem(e);
  }
};
var Eo = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, kn = { exports: {} };
(function() {
  let t;
  function e() {
  }
  t = e, t.prototype.getItem = function(s) {
    return this.hasOwnProperty(s) ? String(this[s]) : null;
  }, t.prototype.setItem = function(s, r) {
    this[s] = String(r);
  }, t.prototype.removeItem = function(s) {
    delete this[s];
  }, t.prototype.clear = function() {
    const s = this;
    Object.keys(s).forEach(function(r) {
      s[r] = void 0, delete s[r];
    });
  }, t.prototype.key = function(s) {
    return s = s || 0, Object.keys(this)[s];
  }, t.prototype.__defineGetter__("length", function() {
    return Object.keys(this).length;
  }), typeof Eo < "u" && Eo.localStorage ? kn.exports = Eo.localStorage : typeof window < "u" && window.localStorage ? kn.exports = window.localStorage : kn.exports = new e();
})();
function JI(t) {
  var e;
  return [t[0], zs((e = t[1]) != null ? e : "")];
}
let QI = class {
  constructor() {
    this.localStorage = kn.exports;
  }
  async getKeys() {
    return Object.keys(this.localStorage);
  }
  async getEntries() {
    return Object.entries(this.localStorage).map(JI);
  }
  async getItem(e) {
    const s = this.localStorage.getItem(e);
    if (s !== null) return zs(s);
  }
  async setItem(e, s) {
    this.localStorage.setItem(e, js(s));
  }
  async removeItem(e) {
    this.localStorage.removeItem(e);
  }
};
const eS = "wc_storage_version", Sh = 1, tS = async (t, e, s) => {
  const r = eS, n = await e.getItem(r);
  if (n && n >= Sh) {
    s(e);
    return;
  }
  const i = await t.getKeys();
  if (!i.length) {
    s(e);
    return;
  }
  const o = [];
  for (; i.length; ) {
    const a = i.shift();
    if (!a) continue;
    const c = a.toLowerCase();
    if (c.includes("wc@") || c.includes("walletconnect") || c.includes("wc_") || c.includes("wallet_connect")) {
      const l = await t.getItem(a);
      await e.setItem(a, l), o.push(a);
    }
  }
  await e.setItem(r, Sh), s(e), sS(t, o);
}, sS = async (t, e) => {
  e.length && e.forEach(async (s) => {
    await t.removeItem(s);
  });
};
let rS = class {
  constructor() {
    this.initialized = !1, this.setInitialized = (s) => {
      this.storage = s, this.initialized = !0;
    };
    const e = new QI();
    this.storage = e;
    try {
      const s = new XI();
      tS(e, s, this.setInitialized);
    } catch {
      this.initialized = !0;
    }
  }
  async getKeys() {
    return await this.initialize(), this.storage.getKeys();
  }
  async getEntries() {
    return await this.initialize(), this.storage.getEntries();
  }
  async getItem(e) {
    return await this.initialize(), this.storage.getItem(e);
  }
  async setItem(e, s) {
    return await this.initialize(), this.storage.setItem(e, s);
  }
  async removeItem(e) {
    return await this.initialize(), this.storage.removeItem(e);
  }
  async initialize() {
    this.initialized || await new Promise((e) => {
      const s = setInterval(() => {
        this.initialized && (clearInterval(s), e());
      }, 20);
    });
  }
}, nS = class extends Ws {
  constructor(e) {
    super(), this.opts = e, this.protocol = "wc", this.version = 2;
  }
}, iS = class extends Ws {
  constructor(e, s) {
    super(), this.core = e, this.logger = s, this.records = /* @__PURE__ */ new Map();
  }
};
class oS {
  constructor(e, s) {
    this.logger = e, this.core = s;
  }
}
let aS = class extends Ws {
  constructor(e, s) {
    super(), this.relayer = e, this.logger = s;
  }
}, cS = class extends Ws {
  constructor(e) {
    super();
  }
}, lS = class {
  constructor(e, s, r, n) {
    this.core = e, this.logger = s, this.name = r;
  }
}, hS = class extends Ws {
  constructor(e, s) {
    super(), this.relayer = e, this.logger = s;
  }
}, uS = class extends Ws {
  constructor(e, s) {
    super(), this.core = e, this.logger = s;
  }
}, fS = class {
  constructor(e, s, r) {
    this.core = e, this.logger = s, this.store = r;
  }
}, dS = class {
  constructor(e, s) {
    this.projectId = e, this.logger = s;
  }
};
class pS {
  constructor(e, s, r) {
    this.core = e, this.logger = s, this.telemetryEnabled = r;
  }
}
let gS = class {
  constructor(e) {
    this.opts = e, this.protocol = "wc", this.version = 2;
  }
}, yS = class {
  constructor(e) {
    this.client = e;
  }
};
const wS = "PARSE_ERROR", mS = "INVALID_REQUEST", bS = "METHOD_NOT_FOUND", vS = "INVALID_PARAMS", rp = "INTERNAL_ERROR", tc = "SERVER_ERROR", ES = [-32700, -32600, -32601, -32602, -32603], Mr = {
  [wS]: { code: -32700, message: "Parse error" },
  [mS]: { code: -32600, message: "Invalid Request" },
  [bS]: { code: -32601, message: "Method not found" },
  [vS]: { code: -32602, message: "Invalid params" },
  [rp]: { code: -32603, message: "Internal error" },
  [tc]: { code: -32e3, message: "Server error" }
}, np = tc;
function xS(t) {
  return ES.includes(t);
}
function Dh(t) {
  return Object.keys(Mr).includes(t) ? Mr[t] : Mr[np];
}
function _S(t) {
  const e = Object.values(Mr).find((s) => s.code === t);
  return e || Mr[np];
}
function ip(t, e, s) {
  return t.message.includes("getaddrinfo ENOTFOUND") || t.message.includes("connect ECONNREFUSED") ? new Error(`Unavailable ${s} RPC url at ${e}`) : t;
}
var op = {}, Ct = {}, Ah;
function IS() {
  if (Ah) return Ct;
  Ah = 1, Object.defineProperty(Ct, "__esModule", { value: !0 }), Ct.isBrowserCryptoAvailable = Ct.getSubtleCrypto = Ct.getBrowerCrypto = void 0;
  function t() {
    return globalThis?.crypto || globalThis?.msCrypto || {};
  }
  Ct.getBrowerCrypto = t;
  function e() {
    const r = t();
    return r.subtle || r.webkitSubtle;
  }
  Ct.getSubtleCrypto = e;
  function s() {
    return !!t() && !!e();
  }
  return Ct.isBrowserCryptoAvailable = s, Ct;
}
var Nt = {}, $h;
function SS() {
  if ($h) return Nt;
  $h = 1, Object.defineProperty(Nt, "__esModule", { value: !0 }), Nt.isBrowser = Nt.isNode = Nt.isReactNative = void 0;
  function t() {
    return typeof document > "u" && typeof navigator < "u" && navigator.product === "ReactNative";
  }
  Nt.isReactNative = t;
  function e() {
    return typeof process < "u" && typeof process.versions < "u" && typeof process.versions.node < "u";
  }
  Nt.isNode = e;
  function s() {
    return !t() && !e();
  }
  return Nt.isBrowser = s, Nt;
}
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const e = Zr;
  e.__exportStar(IS(), t), e.__exportStar(SS(), t);
})(op);
function vt(t = 3) {
  const e = Date.now() * Math.pow(10, t), s = Math.floor(Math.random() * Math.pow(10, t));
  return e + s;
}
function ds(t = 6) {
  return BigInt(vt(t));
}
function ft(t, e, s) {
  return {
    id: s || vt(),
    jsonrpc: "2.0",
    method: t,
    params: e
  };
}
function Gr(t, e) {
  return {
    id: t,
    jsonrpc: "2.0",
    result: e
  };
}
function Pi(t, e, s) {
  return {
    id: t,
    jsonrpc: "2.0",
    error: DS(e)
  };
}
function DS(t, e) {
  return typeof t > "u" ? Dh(rp) : (typeof t == "string" && (t = Object.assign(Object.assign({}, Dh(tc)), { message: t })), xS(t.code) && (t = _S(t.code)), t);
}
class AS {
}
class $S extends AS {
  constructor() {
    super();
  }
}
class OS extends $S {
  constructor(e) {
    super();
  }
}
const PS = "^https?:", TS = "^wss?:";
function BS(t) {
  const e = t.match(new RegExp(/^\w+:/, "gi"));
  if (!(!e || !e.length))
    return e[0];
}
function ap(t, e) {
  const s = BS(t);
  return typeof s > "u" ? !1 : new RegExp(e).test(s);
}
function Oh(t) {
  return ap(t, PS);
}
function Ph(t) {
  return ap(t, TS);
}
function RS(t) {
  return new RegExp("wss?://localhost(:d{2,5})?").test(t);
}
function cp(t) {
  return typeof t == "object" && "id" in t && "jsonrpc" in t && t.jsonrpc === "2.0";
}
function sc(t) {
  return cp(t) && "method" in t;
}
function Ti(t) {
  return cp(t) && (Et(t) || tt(t));
}
function Et(t) {
  return "result" in t;
}
function tt(t) {
  return "error" in t;
}
let rc = class extends OS {
  constructor(e) {
    super(e), this.events = new Ge.EventEmitter(), this.hasRegisteredEventListeners = !1, this.connection = this.setConnection(e), this.connection.connected && this.registerEventListeners();
  }
  async connect(e = this.connection) {
    await this.open(e);
  }
  async disconnect() {
    await this.close();
  }
  on(e, s) {
    this.events.on(e, s);
  }
  once(e, s) {
    this.events.once(e, s);
  }
  off(e, s) {
    this.events.off(e, s);
  }
  removeListener(e, s) {
    this.events.removeListener(e, s);
  }
  async request(e, s) {
    return this.requestStrict(ft(e.method, e.params || [], e.id || ds().toString()), s);
  }
  async requestStrict(e, s) {
    return new Promise(async (r, n) => {
      if (!this.connection.connected) try {
        await this.open();
      } catch (i) {
        n(i);
      }
      this.events.on(`${e.id}`, (i) => {
        tt(i) ? n(i.error) : r(i.result);
      });
      try {
        await this.connection.send(e, s);
      } catch (i) {
        n(i);
      }
    });
  }
  setConnection(e = this.connection) {
    return e;
  }
  onPayload(e) {
    this.events.emit("payload", e), Ti(e) ? this.events.emit(`${e.id}`, e) : this.events.emit("message", { type: e.method, data: e.params });
  }
  onClose(e) {
    e && e.code === 3e3 && this.events.emit("error", new Error(`WebSocket connection closed abnormally with code: ${e.code} ${e.reason ? `(${e.reason})` : ""}`)), this.events.emit("disconnect");
  }
  async open(e = this.connection) {
    this.connection === e && this.connection.connected || (this.connection.connected && this.close(), typeof e == "string" && (await this.connection.open(e), e = this.connection), this.connection = this.setConnection(e), await this.connection.open(), this.registerEventListeners(), this.events.emit("connect"));
  }
  async close() {
    await this.connection.close();
  }
  registerEventListeners() {
    this.hasRegisteredEventListeners || (this.connection.on("payload", (e) => this.onPayload(e)), this.connection.on("close", (e) => this.onClose(e)), this.connection.on("error", (e) => this.events.emit("error", e)), this.connection.on("register_error", (e) => this.onClose()), this.hasRegisteredEventListeners = !0);
  }
};
const CS = () => typeof WebSocket < "u" ? WebSocket : typeof globalThis < "u" && typeof globalThis.WebSocket < "u" ? globalThis.WebSocket : typeof window < "u" && typeof window.WebSocket < "u" ? window.WebSocket : typeof self < "u" && typeof self.WebSocket < "u" ? self.WebSocket : require("ws"), NS = () => typeof WebSocket < "u" || typeof globalThis < "u" && typeof globalThis.WebSocket < "u" || typeof window < "u" && typeof window.WebSocket < "u" || typeof self < "u" && typeof self.WebSocket < "u", Th = (t) => t.split("?")[0], Bh = 10, US = CS();
let MS = class {
  constructor(e) {
    if (this.url = e, this.events = new Ge.EventEmitter(), this.registering = !1, !Ph(e)) throw new Error(`Provided URL is not compatible with WebSocket connection: ${e}`);
    this.url = e;
  }
  get connected() {
    return typeof this.socket < "u";
  }
  get connecting() {
    return this.registering;
  }
  on(e, s) {
    this.events.on(e, s);
  }
  once(e, s) {
    this.events.once(e, s);
  }
  off(e, s) {
    this.events.off(e, s);
  }
  removeListener(e, s) {
    this.events.removeListener(e, s);
  }
  async open(e = this.url) {
    await this.register(e);
  }
  async close() {
    return new Promise((e, s) => {
      if (typeof this.socket > "u") {
        s(new Error("Connection already closed"));
        return;
      }
      this.socket.onclose = (r) => {
        this.onClose(r), e();
      }, this.socket.close();
    });
  }
  async send(e) {
    typeof this.socket > "u" && (this.socket = await this.register());
    try {
      this.socket.send(js(e));
    } catch (s) {
      this.onError(e.id, s);
    }
  }
  register(e = this.url) {
    if (!Ph(e)) throw new Error(`Provided URL is not compatible with WebSocket connection: ${e}`);
    if (this.registering) {
      const s = this.events.getMaxListeners();
      return (this.events.listenerCount("register_error") >= s || this.events.listenerCount("open") >= s) && this.events.setMaxListeners(s + 1), new Promise((r, n) => {
        this.events.once("register_error", (i) => {
          this.resetMaxListeners(), n(i);
        }), this.events.once("open", () => {
          if (this.resetMaxListeners(), typeof this.socket > "u") return n(new Error("WebSocket connection is missing or invalid"));
          r(this.socket);
        });
      });
    }
    return this.url = e, this.registering = !0, new Promise((s, r) => {
      const n = op.isReactNative() ? void 0 : { rejectUnauthorized: !RS(e) }, i = new US(e, [], n);
      NS() ? i.onerror = (o) => {
        const a = o;
        r(this.emitError(a.error));
      } : i.on("error", (o) => {
        r(this.emitError(o));
      }), i.onopen = () => {
        this.onOpen(i), s(i);
      };
    });
  }
  onOpen(e) {
    e.onmessage = (s) => this.onPayload(s), e.onclose = (s) => this.onClose(s), this.socket = e, this.registering = !1, this.events.emit("open");
  }
  onClose(e) {
    this.socket = void 0, this.registering = !1, this.events.emit("close", e);
  }
  onPayload(e) {
    if (typeof e.data > "u") return;
    const s = typeof e.data == "string" ? zs(e.data) : e.data;
    this.events.emit("payload", s);
  }
  onError(e, s) {
    const r = this.parseError(s), n = r.message || r.toString(), i = Pi(e, n);
    this.events.emit("payload", i);
  }
  parseError(e, s = this.url) {
    return ip(e, Th(s), "WS");
  }
  resetMaxListeners() {
    this.events.getMaxListeners() > Bh && this.events.setMaxListeners(Bh);
  }
  emitError(e) {
    const s = this.parseError(new Error(e?.message || `WebSocket connection failed for host: ${Th(this.url)}`));
    return this.events.emit("register_error", s), s;
  }
};
function LS(t) {
  return Number.isSafeInteger(t) && t >= 0;
}
function kS(t) {
  return t != null && typeof t != "function" && LS(t.length);
}
function qS(t) {
  return t === "__proto__";
}
function nc(t) {
  return t == null || typeof t != "object" && typeof t != "function";
}
function zS(t, e) {
  return t === e || Number.isNaN(t) && Number.isNaN(e);
}
function hi(t) {
  return Object.getOwnPropertySymbols(t).filter((e) => Object.prototype.propertyIsEnumerable.call(t, e));
}
function Yr(t) {
  return t == null ? t === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(t);
}
const lp = "[object RegExp]", ic = "[object String]", oc = "[object Number]", ac = "[object Boolean]", ui = "[object Arguments]", hp = "[object Symbol]", up = "[object Date]", fp = "[object Map]", dp = "[object Set]", pp = "[object Array]", jS = "[object Function]", gp = "[object ArrayBuffer]", Lr = "[object Object]", FS = "[object Error]", yp = "[object DataView]", wp = "[object Uint8Array]", mp = "[object Uint8ClampedArray]", bp = "[object Uint16Array]", vp = "[object Uint32Array]", HS = "[object BigUint64Array]", Ep = "[object Int8Array]", xp = "[object Int16Array]", _p = "[object Int32Array]", KS = "[object BigInt64Array]", Ip = "[object Float32Array]", Sp = "[object Float64Array]";
function cc(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function VS(t, e) {
  return ir(t, void 0, t, /* @__PURE__ */ new Map(), e);
}
function ir(t, e, s, r = /* @__PURE__ */ new Map(), n = void 0) {
  const i = n?.(t, e, s, r);
  if (i !== void 0)
    return i;
  if (nc(t))
    return t;
  if (r.has(t))
    return r.get(t);
  if (Array.isArray(t)) {
    const o = new Array(t.length);
    r.set(t, o);
    for (let a = 0; a < t.length; a++)
      o[a] = ir(t[a], a, s, r, n);
    return Object.hasOwn(t, "index") && (o.index = t.index), Object.hasOwn(t, "input") && (o.input = t.input), o;
  }
  if (t instanceof Date)
    return new Date(t.getTime());
  if (t instanceof RegExp) {
    const o = new RegExp(t.source, t.flags);
    return o.lastIndex = t.lastIndex, o;
  }
  if (t instanceof Map) {
    const o = /* @__PURE__ */ new Map();
    r.set(t, o);
    for (const [a, c] of t)
      o.set(a, ir(c, a, s, r, n));
    return o;
  }
  if (t instanceof Set) {
    const o = /* @__PURE__ */ new Set();
    r.set(t, o);
    for (const a of t)
      o.add(ir(a, void 0, s, r, n));
    return o;
  }
  if (typeof Buffer < "u" && Buffer.isBuffer(t))
    return t.subarray();
  if (cc(t)) {
    const o = new (Object.getPrototypeOf(t)).constructor(t.length);
    r.set(t, o);
    for (let a = 0; a < t.length; a++)
      o[a] = ir(t[a], a, s, r, n);
    return o;
  }
  if (t instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && t instanceof SharedArrayBuffer)
    return t.slice(0);
  if (t instanceof DataView) {
    const o = new DataView(t.buffer.slice(0), t.byteOffset, t.byteLength);
    return r.set(t, o), ut(o, t, s, r, n), o;
  }
  if (typeof File < "u" && t instanceof File) {
    const o = new File([t], t.name, {
      type: t.type
    });
    return r.set(t, o), ut(o, t, s, r, n), o;
  }
  if (typeof Blob < "u" && t instanceof Blob) {
    const o = new Blob([t], { type: t.type });
    return r.set(t, o), ut(o, t, s, r, n), o;
  }
  if (t instanceof Error) {
    const o = structuredClone(t);
    return r.set(t, o), o.message = t.message, o.name = t.name, o.stack = t.stack, o.cause = t.cause, o.constructor = t.constructor, ut(o, t, s, r, n), o;
  }
  if (t instanceof Boolean) {
    const o = new Boolean(t.valueOf());
    return r.set(t, o), ut(o, t, s, r, n), o;
  }
  if (t instanceof Number) {
    const o = new Number(t.valueOf());
    return r.set(t, o), ut(o, t, s, r, n), o;
  }
  if (t instanceof String) {
    const o = new String(t.valueOf());
    return r.set(t, o), ut(o, t, s, r, n), o;
  }
  if (typeof t == "object" && WS(t)) {
    const o = Object.create(Object.getPrototypeOf(t));
    return r.set(t, o), ut(o, t, s, r, n), o;
  }
  return t;
}
function ut(t, e, s = t, r, n) {
  const i = [...Object.keys(e), ...hi(e)];
  for (let o = 0; o < i.length; o++) {
    const a = i[o], c = Object.getOwnPropertyDescriptor(t, a);
    (c == null || c.writable) && (t[a] = ir(e[a], a, s, r, n));
  }
}
function WS(t) {
  switch (Yr(t)) {
    case ui:
    case pp:
    case gp:
    case yp:
    case ac:
    case up:
    case Ip:
    case Sp:
    case Ep:
    case xp:
    case _p:
    case fp:
    case oc:
    case Lr:
    case lp:
    case dp:
    case ic:
    case hp:
    case wp:
    case mp:
    case bp:
    case vp:
      return !0;
    default:
      return !1;
  }
}
function GS(t, e) {
  return VS(t, (s, r, n, i) => {
    if (typeof t == "object") {
      if (Yr(t) === Lr && typeof t.constructor != "function") {
        const o = {};
        return i.set(t, o), ut(o, t, n, i), o;
      }
      switch (Object.prototype.toString.call(t)) {
        case oc:
        case ic:
        case ac: {
          const o = new t.constructor(t?.valueOf());
          return ut(o, t), o;
        }
        case ui: {
          const o = {};
          return ut(o, t), o.length = t.length, o[Symbol.iterator] = t[Symbol.iterator], o;
        }
        default:
          return;
      }
    }
  });
}
function Rh(t) {
  return GS(t);
}
function Ch(t) {
  return t !== null && typeof t == "object" && Yr(t) === "[object Arguments]";
}
function ca(t) {
  return typeof t == "object" && t !== null;
}
function YS(t) {
  return ca(t) && kS(t);
}
function Nh(t) {
  if (!t || typeof t != "object")
    return !1;
  const e = Object.getPrototypeOf(t);
  return e === null || e === Object.prototype || Object.getPrototypeOf(e) === null ? Object.prototype.toString.call(t) === "[object Object]" : !1;
}
function ZS(t, e, s) {
  return Cr(t, e, void 0, void 0, void 0, void 0, s);
}
function Cr(t, e, s, r, n, i, o) {
  const a = o(t, e, s, r, n, i);
  if (a !== void 0)
    return a;
  if (typeof t == typeof e)
    switch (typeof t) {
      case "bigint":
      case "string":
      case "boolean":
      case "symbol":
      case "undefined":
        return t === e;
      case "number":
        return t === e || Object.is(t, e);
      case "function":
        return t === e;
      case "object":
        return kr(t, e, i, o);
    }
  return kr(t, e, i, o);
}
function kr(t, e, s, r) {
  if (Object.is(t, e))
    return !0;
  let n = Yr(t), i = Yr(e);
  if (n === ui && (n = Lr), i === ui && (i = Lr), n !== i)
    return !1;
  switch (n) {
    case ic:
      return t.toString() === e.toString();
    case oc: {
      const c = t.valueOf(), l = e.valueOf();
      return zS(c, l);
    }
    case ac:
    case up:
    case hp:
      return Object.is(t.valueOf(), e.valueOf());
    case lp:
      return t.source === e.source && t.flags === e.flags;
    case jS:
      return t === e;
  }
  s = s ?? /* @__PURE__ */ new Map();
  const o = s.get(t), a = s.get(e);
  if (o != null && a != null)
    return o === e;
  s.set(t, e), s.set(e, t);
  try {
    switch (n) {
      case fp: {
        if (t.size !== e.size)
          return !1;
        for (const [c, l] of t.entries())
          if (!e.has(c) || !Cr(l, e.get(c), c, t, e, s, r))
            return !1;
        return !0;
      }
      case dp: {
        if (t.size !== e.size)
          return !1;
        const c = Array.from(t.values()), l = Array.from(e.values());
        for (let u = 0; u < c.length; u++) {
          const h = c[u], f = l.findIndex((d) => Cr(h, d, void 0, t, e, s, r));
          if (f === -1)
            return !1;
          l.splice(f, 1);
        }
        return !0;
      }
      case pp:
      case wp:
      case mp:
      case bp:
      case vp:
      case HS:
      case Ep:
      case xp:
      case _p:
      case KS:
      case Ip:
      case Sp: {
        if (typeof Buffer < "u" && Buffer.isBuffer(t) !== Buffer.isBuffer(e) || t.length !== e.length)
          return !1;
        for (let c = 0; c < t.length; c++)
          if (!Cr(t[c], e[c], c, t, e, s, r))
            return !1;
        return !0;
      }
      case gp:
        return t.byteLength !== e.byteLength ? !1 : kr(new Uint8Array(t), new Uint8Array(e), s, r);
      case yp:
        return t.byteLength !== e.byteLength || t.byteOffset !== e.byteOffset ? !1 : kr(new Uint8Array(t), new Uint8Array(e), s, r);
      case FS:
        return t.name === e.name && t.message === e.message;
      case Lr: {
        if (!(kr(t.constructor, e.constructor, s, r) || Nh(t) && Nh(e)))
          return !1;
        const l = [...Object.keys(t), ...hi(t)], u = [...Object.keys(e), ...hi(e)];
        if (l.length !== u.length)
          return !1;
        for (let h = 0; h < l.length; h++) {
          const f = l[h], d = t[f];
          if (!Object.hasOwn(e, f))
            return !1;
          const g = e[f];
          if (!Cr(d, g, f, t, e, s, r))
            return !1;
        }
        return !0;
      }
      default:
        return !1;
    }
  } finally {
    s.delete(t), s.delete(e);
  }
}
function Dp() {
}
function XS(t, e) {
  return ZS(t, e, Dp);
}
function xo(t) {
  return cc(t);
}
function _o(t) {
  if (typeof t != "object" || t == null)
    return !1;
  if (Object.getPrototypeOf(t) === null)
    return !0;
  if (Object.prototype.toString.call(t) !== "[object Object]") {
    const s = t[Symbol.toStringTag];
    return s == null || !Object.getOwnPropertyDescriptor(t, Symbol.toStringTag)?.writable ? !1 : t.toString() === `[object ${s}]`;
  }
  let e = t;
  for (; Object.getPrototypeOf(e) !== null; )
    e = Object.getPrototypeOf(e);
  return Object.getPrototypeOf(t) === e;
}
function JS(t) {
  if (nc(t))
    return t;
  if (Array.isArray(t) || cc(t) || t instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && t instanceof SharedArrayBuffer)
    return t.slice(0);
  const e = Object.getPrototypeOf(t);
  if (e == null)
    return Object.assign(Object.create(e), t);
  const s = e.constructor;
  if (t instanceof Date || t instanceof Map || t instanceof Set)
    return new s(t);
  if (t instanceof RegExp) {
    const r = new s(t);
    return r.lastIndex = t.lastIndex, r;
  }
  if (t instanceof DataView)
    return new s(t.buffer.slice(0));
  if (t instanceof Error) {
    let r;
    return t instanceof AggregateError ? r = new s(t.errors, t.message, { cause: t.cause }) : r = new s(t.message, { cause: t.cause }), r.stack = t.stack, Object.assign(r, t), r;
  }
  if (typeof File < "u" && t instanceof File)
    return new s([t], t.name, { type: t.type, lastModified: t.lastModified });
  if (typeof t == "object") {
    const r = Object.create(e);
    return Object.assign(r, t);
  }
  return t;
}
function QS(t, ...e) {
  const s = e.slice(0, -1), r = e[e.length - 1];
  let n = t;
  for (let i = 0; i < s.length; i++) {
    const o = s[i];
    n = qn(n, o, r, /* @__PURE__ */ new Map());
  }
  return n;
}
function qn(t, e, s, r) {
  if (nc(t) && (t = Object(t)), e == null || typeof e != "object")
    return t;
  if (r.has(e))
    return JS(r.get(e));
  if (r.set(e, t), Array.isArray(e)) {
    e = e.slice();
    for (let i = 0; i < e.length; i++)
      e[i] = e[i] ?? void 0;
  }
  const n = [...Object.keys(e), ...hi(e)];
  for (let i = 0; i < n.length; i++) {
    const o = n[i];
    if (qS(o))
      continue;
    let a = e[o], c = t[o];
    if (Ch(a) && (a = { ...a }), Ch(c) && (c = { ...c }), typeof Buffer < "u" && Buffer.isBuffer(a) && (a = Rh(a)), Array.isArray(a))
      if (Array.isArray(c)) {
        const u = [], h = Reflect.ownKeys(c);
        for (let f = 0; f < h.length; f++) {
          const d = h[f];
          u[d] = c[d];
        }
        c = u;
      } else if (YS(c)) {
        const u = [];
        for (let h = 0; h < c.length; h++)
          u[h] = c[h];
        c = u;
      } else
        c = [];
    const l = s(c, a, o, t, e, r);
    l !== void 0 ? t[o] = l : Array.isArray(a) || ca(c) && ca(a) && (_o(c) || _o(a) || xo(c) || xo(a)) ? t[o] = qn(c, a, s, r) : c == null && _o(a) ? t[o] = qn({}, a, s, r) : c == null && xo(a) ? t[o] = Rh(a) : (c === void 0 || a !== void 0) && (t[o] = a);
  }
  return t;
}
function e3(t, ...e) {
  return QS(t, ...e, Dp);
}
const Ap = "wc", $p = 2, la = "core", $t = `${Ap}@2:${la}:`, t3 = { logger: "error" }, s3 = { database: ":memory:" }, r3 = "crypto", Uh = "client_ed25519_seed", n3 = k.ONE_DAY, i3 = "keychain", o3 = "0.3", a3 = "messages", c3 = "0.3", l3 = k.SIX_HOURS, h3 = "publisher", Op = "irn", u3 = "error", Pp = "wss://relay.walletconnect.org", f3 = "relayer", ae = { message: "relayer_message", message_ack: "relayer_message_ack", connect: "relayer_connect", disconnect: "relayer_disconnect", error: "relayer_error", connection_stalled: "relayer_connection_stalled", transport_closed: "relayer_transport_closed", publish: "relayer_publish" }, d3 = "_subscription", Xe = { payload: "payload", connect: "connect", disconnect: "disconnect", error: "error" }, p3 = 0.1, ha = "2.26.0", ne = { link_mode: "link_mode", relay: "relay" }, zn = { inbound: "inbound", outbound: "outbound" }, g3 = "0.3", y3 = "WALLETCONNECT_CLIENT_ID", Mh = "WALLETCONNECT_LINK_MODE_APPS", He = { created: "subscription_created", deleted: "subscription_deleted", expired: "subscription_expired", disabled: "subscription_disabled", sync: "subscription_sync", resubscribed: "subscription_resubscribed" }, w3 = "subscription", m3 = "0.3", b3 = "pairing", v3 = "0.3", Or = { wc_pairingDelete: { req: { ttl: k.ONE_DAY, prompt: !1, tag: 1e3 }, res: { ttl: k.ONE_DAY, prompt: !1, tag: 1001 } }, wc_pairingPing: { req: { ttl: k.THIRTY_SECONDS, prompt: !1, tag: 1002 }, res: { ttl: k.THIRTY_SECONDS, prompt: !1, tag: 1003 } }, unregistered_method: { req: { ttl: k.ONE_DAY, prompt: !1, tag: 0 }, res: { ttl: k.ONE_DAY, prompt: !1, tag: 0 } } }, Ps = { create: "pairing_create", expire: "pairing_expire", delete: "pairing_delete", ping: "pairing_ping" }, at = { created: "history_created", updated: "history_updated", deleted: "history_deleted", sync: "history_sync" }, E3 = "history", x3 = "0.3", _3 = "expirer", Je = { created: "expirer_created", deleted: "expirer_deleted", expired: "expirer_expired", sync: "expirer_sync" }, I3 = "0.3", S3 = "verify-api", D3 = "https://verify.walletconnect.com", Tp = "https://verify.walletconnect.org", qr = Tp, A3 = `${qr}/v3`, $3 = [D3, Tp], O3 = "echo", P3 = "https://echo.walletconnect.com", bt = { pairing_started: "pairing_started", pairing_uri_validation_success: "pairing_uri_validation_success", pairing_uri_not_expired: "pairing_uri_not_expired", store_new_pairing: "store_new_pairing", subscribing_pairing_topic: "subscribing_pairing_topic", subscribe_pairing_topic_success: "subscribe_pairing_topic_success", existing_pairing: "existing_pairing", pairing_not_expired: "pairing_not_expired", emit_inactive_pairing: "emit_inactive_pairing", emit_session_proposal: "emit_session_proposal", subscribing_to_pairing_topic: "subscribing_to_pairing_topic" }, Lt = { no_wss_connection: "no_wss_connection", no_internet_connection: "no_internet_connection", malformed_pairing_uri: "malformed_pairing_uri", active_pairing_already_exists: "active_pairing_already_exists", subscribe_pairing_topic_failure: "subscribe_pairing_topic_failure", pairing_expired: "pairing_expired", proposal_expired: "proposal_expired", proposal_listener_not_found: "proposal_listener_not_found" }, ct = { session_approve_started: "session_approve_started", proposal_not_expired: "proposal_not_expired", session_namespaces_validation_success: "session_namespaces_validation_success", create_session_topic: "create_session_topic", subscribing_session_topic: "subscribing_session_topic", subscribe_session_topic_success: "subscribe_session_topic_success", publishing_session_approve: "publishing_session_approve", session_approve_publish_success: "session_approve_publish_success", store_session: "store_session", publishing_session_settle: "publishing_session_settle", session_settle_publish_success: "session_settle_publish_success", session_request_response_started: "session_request_response_started", session_request_response_validation_success: "session_request_response_validation_success", session_request_response_publish_started: "session_request_response_publish_started" }, Ss = { no_internet_connection: "no_internet_connection", no_wss_connection: "no_wss_connection", proposal_expired: "proposal_expired", subscribe_session_topic_failure: "subscribe_session_topic_failure", session_approve_publish_failure: "session_approve_publish_failure", session_settle_publish_failure: "session_settle_publish_failure", session_approve_namespace_validation_failure: "session_approve_namespace_validation_failure", proposal_not_found: "proposal_not_found", session_request_response_validation_failure: "session_request_response_validation_failure", session_request_response_publish_failure: "session_request_response_publish_failure" }, Ds = { authenticated_session_approve_started: "authenticated_session_approve_started", create_authenticated_session_topic: "create_authenticated_session_topic", cacaos_verified: "cacaos_verified", store_authenticated_session: "store_authenticated_session", subscribing_authenticated_session_topic: "subscribing_authenticated_session_topic", subscribe_authenticated_session_topic_success: "subscribe_authenticated_session_topic_success", publishing_authenticated_session_approve: "publishing_authenticated_session_approve" }, Pr = { no_internet_connection: "no_internet_connection", invalid_cacao: "invalid_cacao", subscribe_authenticated_session_topic_failure: "subscribe_authenticated_session_topic_failure", authenticated_session_approve_publish_failure: "authenticated_session_approve_publish_failure", authenticated_session_pending_request_not_found: "authenticated_session_pending_request_not_found" }, T3 = 0.1, B3 = "event-client", R3 = 86400, C3 = "https://pulse.walletconnect.org/batch";
let N3 = class {
  constructor(e, s) {
    this.core = e, this.logger = s, this.keychain = /* @__PURE__ */ new Map(), this.name = i3, this.version = o3, this.initialized = !1, this.storagePrefix = $t, this.init = async () => {
      if (!this.initialized) {
        const r = await this.getKeyChain();
        typeof r < "u" && (this.keychain = r), this.initialized = !0;
      }
    }, this.has = (r) => (this.isInitialized(), this.keychain.has(r)), this.set = async (r, n) => {
      this.isInitialized(), this.keychain.set(r, n), await this.persist();
    }, this.get = (r) => {
      this.isInitialized();
      const n = this.keychain.get(r);
      if (typeof n > "u") {
        const { message: i } = j("NO_MATCHING_KEY", `${this.name}: ${r}`);
        throw new Error(i);
      }
      return n;
    }, this.del = async (r) => {
      this.isInitialized(), this.keychain.delete(r), await this.persist();
    }, this.core = e, this.logger = Ye(s, this.name);
  }
  get context() {
    return Fe(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  async setKeyChain(e) {
    await this.core.storage.setItem(this.storageKey, ra(e));
  }
  async getKeyChain() {
    const e = await this.core.storage.getItem(this.storageKey);
    return typeof e < "u" ? na(e) : void 0;
  }
  async persist() {
    await this.setKeyChain(this.keychain);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = j("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}, U3 = class {
  constructor(e, s, r) {
    this.core = e, this.logger = s, this.name = r3, this.randomSessionIdentifier = oa(), this.initialized = !1, this.init = async () => {
      this.initialized || (await this.keychain.init(), this.initialized = !0);
    }, this.hasKeys = (n) => (this.isInitialized(), this.keychain.has(n)), this.getClientId = async () => {
      if (this.isInitialized(), this.clientId) return this.clientId;
      const n = await this.getClientSeed(), i = zl(n), o = bd(i.publicKey);
      return this.clientId = o, o;
    }, this.generateKeyPair = () => {
      this.isInitialized();
      const n = w_();
      return this.setPrivateKey(n.publicKey, n.privateKey);
    }, this.signJWT = async (n) => {
      this.isInitialized();
      const i = await this.getClientSeed(), o = zl(i), a = this.randomSessionIdentifier;
      return await f2(a, n, n3, o);
    }, this.generateSharedKey = (n, i, o) => {
      this.isInitialized();
      const a = this.getPrivateKey(n), c = m_(a, i);
      return this.setSymKey(c, o);
    }, this.setSymKey = async (n, i) => {
      this.isInitialized();
      const o = i || Mn(n);
      return await this.keychain.set(o, n), o;
    }, this.deleteKeyPair = async (n) => {
      this.isInitialized(), await this.keychain.del(n);
    }, this.deleteSymKey = async (n) => {
      this.isInitialized(), await this.keychain.del(n);
    }, this.encode = async (n, i, o) => {
      this.isInitialized();
      const a = Jd(o), c = js(i);
      if (lh(a)) return E_(c, o?.encoding);
      if (ch(a)) {
        const f = a.senderPublicKey, d = a.receiverPublicKey;
        n = await this.generateSharedKey(f, d);
      }
      const l = this.getSymKey(n), { type: u, senderPublicKey: h } = a;
      return b_({ type: u, symKey: l, message: c, senderPublicKey: h, encoding: o?.encoding });
    }, this.decode = async (n, i, o) => {
      this.isInitialized();
      const a = __(i, o);
      if (lh(a)) {
        const c = x_(i, o?.encoding);
        return zs(c);
      }
      if (ch(a)) {
        const c = a.receiverPublicKey, l = a.senderPublicKey;
        n = await this.generateSharedKey(c, l);
      }
      try {
        const c = this.getSymKey(n), l = v_({ symKey: c, encoded: i, encoding: o?.encoding });
        return zs(l);
      } catch (c) {
        this.logger.error(`Failed to decode message from topic: '${n}', clientId: '${await this.getClientId()}'`), this.logger.error(c);
      }
    }, this.getPayloadType = (n, i = Ie) => {
      const o = Wr({ encoded: n, encoding: i });
      return Ks(o.type);
    }, this.getPayloadSenderPublicKey = (n, i = Ie) => {
      const o = Wr({ encoded: n, encoding: i });
      return o.senderPublicKey ? ye(o.senderPublicKey, Ue) : void 0;
    }, this.core = e, this.logger = Ye(s, this.name), this.keychain = r || new N3(this.core, this.logger);
  }
  get context() {
    return Fe(this.logger);
  }
  async setPrivateKey(e, s) {
    return await this.keychain.set(e, s), e;
  }
  getPrivateKey(e) {
    return this.keychain.get(e);
  }
  async getClientSeed() {
    let e = "";
    try {
      e = this.keychain.get(Uh);
    } catch {
      e = oa(), await this.keychain.set(Uh, e);
    }
    return Re(e, "base16");
  }
  getSymKey(e) {
    return this.keychain.get(e);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = j("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
};
class M3 extends oS {
  constructor(e, s) {
    super(e, s), this.logger = e, this.core = s, this.messages = /* @__PURE__ */ new Map(), this.messagesWithoutClientAck = /* @__PURE__ */ new Map(), this.name = a3, this.version = c3, this.initialized = !1, this.storagePrefix = $t, this.init = async () => {
      if (!this.initialized) {
        this.logger.trace("Initialized");
        try {
          const r = await this.getRelayerMessages();
          typeof r < "u" && (this.messages = r);
          const n = await this.getRelayerMessagesWithoutClientAck();
          typeof n < "u" && (this.messagesWithoutClientAck = n), this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", size: this.messages.size });
        } catch (r) {
          this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(r);
        } finally {
          this.initialized = !0;
        }
      }
    }, this.set = async (r, n, i) => {
      this.isInitialized();
      const o = et(n);
      let a = this.messages.get(r);
      if (typeof a > "u" && (a = {}), typeof a[o] < "u") return o;
      if (a[o] = n, this.messages.set(r, a), i === zn.inbound) {
        const c = this.messagesWithoutClientAck.get(r) || {};
        this.messagesWithoutClientAck.set(r, { ...c, [o]: n });
      }
      return await this.persist(), o;
    }, this.get = (r) => {
      this.isInitialized();
      let n = this.messages.get(r);
      return typeof n > "u" && (n = {}), n;
    }, this.getWithoutAck = (r) => {
      this.isInitialized();
      const n = {};
      for (const i of r) {
        const o = this.messagesWithoutClientAck.get(i) || {};
        n[i] = Object.values(o);
      }
      return n;
    }, this.has = (r, n) => {
      this.isInitialized();
      const i = this.get(r), o = et(n);
      return typeof i[o] < "u";
    }, this.ack = async (r, n) => {
      this.isInitialized();
      const i = this.messagesWithoutClientAck.get(r);
      if (typeof i > "u") return;
      const o = et(n);
      delete i[o], Object.keys(i).length === 0 ? this.messagesWithoutClientAck.delete(r) : this.messagesWithoutClientAck.set(r, i), await this.persist();
    }, this.del = async (r) => {
      this.isInitialized(), this.messages.delete(r), this.messagesWithoutClientAck.delete(r), await this.persist();
    }, this.logger = Ye(e, this.name), this.core = s;
  }
  get context() {
    return Fe(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get storageKeyWithoutClientAck() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name + "_withoutClientAck";
  }
  async setRelayerMessages(e) {
    await this.core.storage.setItem(this.storageKey, ra(e));
  }
  async setRelayerMessagesWithoutClientAck(e) {
    await this.core.storage.setItem(this.storageKeyWithoutClientAck, ra(e));
  }
  async getRelayerMessages() {
    const e = await this.core.storage.getItem(this.storageKey);
    return typeof e < "u" ? na(e) : void 0;
  }
  async getRelayerMessagesWithoutClientAck() {
    const e = await this.core.storage.getItem(this.storageKeyWithoutClientAck);
    return typeof e < "u" ? na(e) : void 0;
  }
  async persist() {
    await this.setRelayerMessages(this.messages), await this.setRelayerMessagesWithoutClientAck(this.messagesWithoutClientAck);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = j("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
class L3 extends aS {
  constructor(e, s) {
    super(e, s), this.relayer = e, this.logger = s, this.events = new Ge.EventEmitter(), this.name = h3, this.queue = /* @__PURE__ */ new Map(), this.publishTimeout = k.toMiliseconds(k.ONE_MINUTE), this.initialPublishTimeout = k.toMiliseconds(k.ONE_SECOND * 15), this.needsTransportRestart = !1, this.publish = async (r, n, i) => {
      this.logger.debug("Publishing Payload"), this.logger.trace({ type: "method", method: "publish", params: { topic: r, message: n, opts: i } });
      const o = i?.ttl || l3, a = i?.prompt || !1, c = i?.tag || 0, l = i?.id || ds().toString(), u = rr(ai().protocol), h = { id: l, method: i?.publishMethod || u.publish, params: { topic: r, message: n, ttl: o, prompt: a, tag: c, attestation: i?.attestation, ...i?.tvf } }, f = `Failed to publish payload, please try again. id:${l} tag:${c}`;
      try {
        ge(h.params?.prompt) && delete h.params?.prompt, ge(h.params?.tag) && delete h.params?.tag;
        const d = new Promise(async (g) => {
          const w = ({ id: S }) => {
            h.id?.toString() === S.toString() && (this.removeRequestFromQueue(S), this.relayer.events.removeListener(ae.publish, w), g());
          };
          this.relayer.events.on(ae.publish, w);
          const m = dt(new Promise((S, T) => {
            this.rpcPublish(h, i).then(S).catch((E) => {
              this.logger.warn(E, E?.message), T(E);
            });
          }), this.initialPublishTimeout, `Failed initial publish, retrying.... id:${l} tag:${c}`);
          try {
            await m, this.events.removeListener(ae.publish, w);
          } catch (S) {
            this.queue.set(l, { request: h, opts: i, attempt: 1 }), this.logger.warn(S, S?.message);
          }
        });
        this.logger.trace({ type: "method", method: "publish", params: { id: l, topic: r, message: n, opts: i } }), await dt(d, this.publishTimeout, f);
      } catch (d) {
        if (this.logger.debug("Failed to Publish Payload"), this.logger.error(d), i?.internal?.throwOnFailedPublish) throw d;
      } finally {
        this.queue.delete(l);
      }
    }, this.publishCustom = async (r) => {
      this.logger.debug("Publishing custom payload"), this.logger.trace({ type: "method", method: "publishCustom", params: r });
      const { payload: n, opts: i = {} } = r, { attestation: o, tvf: a, publishMethod: c, prompt: l, tag: u, ttl: h = k.FIVE_MINUTES } = i, f = i.id || ds().toString(), d = rr(ai().protocol), g = c || d.publish, w = { id: f, method: g, params: { ...n, ttl: h, prompt: l, tag: u, attestation: o, ...a } }, m = `Failed to publish custom payload, please try again. id:${f} tag:${u}`;
      try {
        ge(w.params?.prompt) && delete w.params?.prompt, ge(w.params?.tag) && delete w.params?.tag;
        const S = new Promise(async (T) => {
          const E = ({ id: $ }) => {
            w.id?.toString() === $.toString() && (this.removeRequestFromQueue($), this.relayer.events.removeListener(ae.publish, E), T());
          };
          this.relayer.events.on(ae.publish, E);
          const D = dt(new Promise(($, R) => {
            this.rpcPublish(w, i).then($).catch((B) => {
              this.logger.warn(B, B?.message), R(B);
            });
          }), this.initialPublishTimeout, `Failed initial custom payload publish, retrying.... method:${g} id:${f} tag:${u}`);
          try {
            await D, this.events.removeListener(ae.publish, E);
          } catch ($) {
            this.queue.set(f, { request: w, opts: i, attempt: 1 }), this.logger.warn($, $?.message);
          }
        });
        this.logger.trace({ type: "method", method: "publish", params: { id: f, payload: n, opts: i } }), await dt(S, this.publishTimeout, m);
      } catch (S) {
        if (this.logger.debug("Failed to Publish Payload"), this.logger.error(S), i?.internal?.throwOnFailedPublish) throw S;
      } finally {
        this.queue.delete(f);
      }
    }, this.on = (r, n) => {
      this.events.on(r, n);
    }, this.once = (r, n) => {
      this.events.once(r, n);
    }, this.off = (r, n) => {
      this.events.off(r, n);
    }, this.removeListener = (r, n) => {
      this.events.removeListener(r, n);
    }, this.relayer = e, this.logger = Ye(s, this.name), this.registerEventListeners();
  }
  get context() {
    return Fe(this.logger);
  }
  async rpcPublish(e, s) {
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "message", direction: "outgoing", request: e });
    const r = await this.relayer.request(e);
    return this.relayer.events.emit(ae.publish, { ...e, ...s }), this.logger.debug("Successfully Published Payload"), r;
  }
  removeRequestFromQueue(e) {
    this.queue.delete(e);
  }
  checkQueue() {
    this.queue.forEach(async (e, s) => {
      const r = e.attempt + 1;
      this.queue.set(s, { ...e, attempt: r }), this.logger.warn({}, `Publisher: queue->publishing: ${e.request.id}, tag: ${e.request.params?.tag}, attempt: ${r}`), await this.rpcPublish(e.request, e.opts), this.logger.warn({}, `Publisher: queue->published: ${e.request.id}`);
    });
  }
  registerEventListeners() {
    this.relayer.core.heartbeat.on(Gs.pulse, () => {
      if (this.needsTransportRestart) {
        this.needsTransportRestart = !1, this.relayer.events.emit(ae.connection_stalled);
        return;
      }
      this.checkQueue();
    }), this.relayer.on(ae.message_ack, (e) => {
      this.removeRequestFromQueue(e.id.toString());
    });
  }
}
class k3 {
  constructor() {
    this.map = /* @__PURE__ */ new Map(), this.set = (e, s) => {
      const r = this.get(e);
      this.exists(e, s) || this.map.set(e, [...r, s]);
    }, this.get = (e) => this.map.get(e) || [], this.exists = (e, s) => this.get(e).includes(s), this.delete = (e, s) => {
      if (typeof s > "u") {
        this.map.delete(e);
        return;
      }
      if (!this.map.has(e)) return;
      const r = this.get(e);
      if (!this.exists(e, s)) return;
      const n = r.filter((i) => i !== s);
      if (!n.length) {
        this.map.delete(e);
        return;
      }
      this.map.set(e, n);
    }, this.clear = () => {
      this.map.clear();
    };
  }
  get topics() {
    return Array.from(this.map.keys());
  }
}
let q3 = class extends hS {
  constructor(e, s) {
    super(e, s), this.relayer = e, this.logger = s, this.subscriptions = /* @__PURE__ */ new Map(), this.topicMap = new k3(), this.events = new Ge.EventEmitter(), this.name = w3, this.version = m3, this.pending = /* @__PURE__ */ new Map(), this.cached = [], this.initialized = !1, this.storagePrefix = $t, this.subscribeTimeout = k.toMiliseconds(k.ONE_MINUTE), this.initialSubscribeTimeout = k.toMiliseconds(k.ONE_SECOND * 15), this.batchSubscribeTopicsLimit = 500, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), this.registerEventListeners(), await this.restore()), this.initialized = !0;
    }, this.subscribe = async (r, n) => {
      this.isInitialized(), this.logger.debug("Subscribing Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: r, opts: n } });
      try {
        const i = ai(n), o = { topic: r, relay: i, transportType: n?.transportType };
        n?.internal?.skipSubscribe || this.pending.set(r, o);
        const a = await this.rpcSubscribe(r, i, n);
        return typeof a == "string" && (this.onSubscribe(a, o), this.logger.debug("Successfully Subscribed Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: r, opts: n } })), a;
      } catch (i) {
        throw this.logger.debug("Failed to Subscribe Topic"), this.logger.error(i), i;
      }
    }, this.unsubscribe = async (r, n) => {
      this.isInitialized(), typeof n?.id < "u" ? await this.unsubscribeById(r, n.id, n) : await this.unsubscribeByTopic(r, n);
    }, this.isSubscribed = (r) => new Promise((n) => {
      n(this.topicMap.topics.includes(r));
    }), this.isKnownTopic = (r) => new Promise((n) => {
      n(this.topicMap.topics.includes(r) || this.pending.has(r) || this.cached.some((i) => i.topic === r));
    }), this.on = (r, n) => {
      this.events.on(r, n);
    }, this.once = (r, n) => {
      this.events.once(r, n);
    }, this.off = (r, n) => {
      this.events.off(r, n);
    }, this.removeListener = (r, n) => {
      this.events.removeListener(r, n);
    }, this.start = async () => {
      await this.onConnect();
    }, this.stop = async () => {
      await this.onDisconnect();
    }, this.restart = async () => {
      await this.restore(), await this.onRestart();
    }, this.checkPending = async () => {
      if (this.pending.size === 0 && (!this.initialized || !this.relayer.connected)) return;
      const r = [];
      this.pending.forEach((n) => {
        r.push(n);
      }), await this.batchSubscribe(r);
    }, this.registerEventListeners = () => {
      this.relayer.core.heartbeat.on(Gs.pulse, async () => {
        await this.checkPending();
      }), this.events.on(He.created, async (r) => {
        const n = He.created;
        this.logger.info(`Emitting ${n}`), this.logger.debug({ type: "event", event: n, data: r }), await this.persist();
      }), this.events.on(He.deleted, async (r) => {
        const n = He.deleted;
        this.logger.info(`Emitting ${n}`), this.logger.debug({ type: "event", event: n, data: r }), await this.persist();
      });
    }, this.relayer = e, this.logger = Ye(s, this.name), this.clientId = "";
  }
  get context() {
    return Fe(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.relayer.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.subscriptions.size;
  }
  get ids() {
    return Array.from(this.subscriptions.keys());
  }
  get values() {
    return Array.from(this.subscriptions.values());
  }
  get topics() {
    return this.topicMap.topics;
  }
  get hasAnyTopics() {
    return this.topicMap.topics.length > 0 || this.pending.size > 0 || this.cached.length > 0 || this.subscriptions.size > 0;
  }
  hasSubscription(e, s) {
    let r = !1;
    try {
      r = this.getSubscription(e).topic === s;
    } catch {
    }
    return r;
  }
  reset() {
    this.cached = [], this.initialized = !0;
  }
  onDisable() {
    this.values.length > 0 && (this.cached = this.values), this.subscriptions.clear(), this.topicMap.clear();
  }
  async unsubscribeByTopic(e, s) {
    const r = this.topicMap.get(e);
    await Promise.all(r.map(async (n) => await this.unsubscribeById(e, n, s)));
  }
  async unsubscribeById(e, s, r) {
    this.logger.debug("Unsubscribing Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e, id: s, opts: r } });
    try {
      const n = se("USER_DISCONNECTED", `${this.name}, ${e}`);
      await this.onUnsubscribe(e, s, n);
      const i = ai(r);
      await this.restartToComplete({ topic: e, id: s, relay: i }), await this.rpcUnsubscribe(e, s, i), this.logger.debug("Successfully Unsubscribed Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e, id: s, opts: r } });
    } catch (n) {
      throw this.logger.debug("Failed to Unsubscribe Topic"), this.logger.error(n), n;
    }
  }
  async rpcSubscribe(e, s, r) {
    const n = await this.getSubscriptionId(e);
    if (r?.internal?.skipSubscribe) return n;
    (!r || r?.transportType === ne.relay) && await this.restartToComplete({ topic: e, id: e, relay: s });
    const i = { method: rr(s.protocol).subscribe, params: { topic: e } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: i });
    const o = r?.internal?.throwOnFailedPublish;
    try {
      if (r?.transportType === ne.link_mode) return setTimeout(() => {
        (this.relayer.connected || this.relayer.connecting) && this.relayer.request(i).catch((l) => this.logger.warn(l));
      }, k.toMiliseconds(k.ONE_SECOND)), n;
      const a = new Promise(async (l) => {
        const u = (h) => {
          h.topic === e && (this.events.removeListener(He.created, u), l(h.id));
        };
        this.events.on(He.created, u);
        try {
          const h = await dt(new Promise((f, d) => {
            this.relayer.request(i).catch((g) => {
              this.logger.warn(g, g?.message), d(g);
            }).then(f);
          }), this.initialSubscribeTimeout, `Subscribing to ${e} failed, please try again`);
          this.events.removeListener(He.created, u), l(h);
        } catch {
        }
      }), c = await dt(a, this.subscribeTimeout, `Subscribing to ${e} failed, please try again`);
      if (!c && o) throw new Error(`Subscribing to ${e} failed, please try again`);
      return c ? n : null;
    } catch (a) {
      if (this.logger.debug("Outgoing Relay Subscribe Payload stalled"), this.relayer.events.emit(ae.connection_stalled), o) throw a;
    }
    return null;
  }
  async rpcBatchSubscribe(e) {
    if (!e.length) return !0;
    const s = e[0].relay, r = { method: rr(s.protocol).batchSubscribe, params: { topics: e.map((n) => n.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: r });
    try {
      return await dt(new Promise((n, i) => {
        this.relayer.request(r).then(n).catch((o) => {
          this.logger.warn(o), i(o);
        });
      }), this.subscribeTimeout, "rpcBatchSubscribe failed, please try again"), !0;
    } catch {
      return this.relayer.events.emit(ae.connection_stalled), !1;
    }
  }
  async rpcBatchFetchMessages(e) {
    if (!e.length) return;
    const s = e[0].relay, r = { method: rr(s.protocol).batchFetchMessages, params: { topics: e.map((i) => i.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: r });
    let n;
    try {
      n = await await dt(new Promise((i, o) => {
        this.relayer.request(r).catch((a) => {
          this.logger.warn(a), o(a);
        }).then(i);
      }), this.subscribeTimeout, "rpcBatchFetchMessages failed, please try again");
    } catch {
      this.relayer.events.emit(ae.connection_stalled);
    }
    return n;
  }
  rpcUnsubscribe(e, s, r) {
    const n = { method: rr(r.protocol).unsubscribe, params: { topic: e, id: s } };
    return this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: n }), this.relayer.request(n);
  }
  onSubscribe(e, s) {
    this.setSubscription(e, { ...s, id: e }), this.pending.delete(s.topic);
  }
  onBatchSubscribe(e) {
    e.length && e.forEach((s) => {
      this.setSubscription(s.id, { ...s }), this.pending.delete(s.topic);
    });
  }
  async onUnsubscribe(e, s, r) {
    this.events.removeAllListeners(s), this.hasSubscription(s, e) && this.deleteSubscription(s, r), await this.relayer.messages.del(e);
  }
  async setRelayerSubscriptions(e) {
    await this.relayer.core.storage.setItem(this.storageKey, e);
  }
  async getRelayerSubscriptions() {
    return await this.relayer.core.storage.getItem(this.storageKey);
  }
  setSubscription(e, s) {
    this.logger.debug("Setting subscription"), this.logger.trace({ type: "method", method: "setSubscription", id: e, subscription: s }), this.addSubscription(e, s);
  }
  addSubscription(e, s) {
    this.subscriptions.set(e, { ...s }), this.topicMap.set(s.topic, e), this.events.emit(He.created, s);
  }
  getSubscription(e) {
    this.logger.debug("Getting subscription"), this.logger.trace({ type: "method", method: "getSubscription", id: e });
    const s = this.subscriptions.get(e);
    if (!s) {
      const { message: r } = j("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw new Error(r);
    }
    return s;
  }
  deleteSubscription(e, s) {
    this.logger.debug("Deleting subscription"), this.logger.trace({ type: "method", method: "deleteSubscription", id: e, reason: s });
    const r = this.getSubscription(e);
    this.subscriptions.delete(e), this.topicMap.delete(r.topic, e), this.events.emit(He.deleted, { ...r, reason: s });
  }
  async persist() {
    await this.setRelayerSubscriptions(this.values), this.events.emit(He.sync);
  }
  async onRestart() {
    if (this.cached.length) {
      const e = [...this.cached], s = Math.ceil(this.cached.length / this.batchSubscribeTopicsLimit);
      for (let r = 0; r < s; r++) {
        const n = e.splice(0, this.batchSubscribeTopicsLimit);
        await this.batchSubscribe(n);
      }
    }
    this.events.emit(He.resubscribed);
  }
  async restore() {
    try {
      const e = await this.getRelayerSubscriptions();
      if (typeof e > "u" || !e.length) return;
      if (this.subscriptions.size && !e.every((s) => s.topic === this.subscriptions.get(s.id)?.topic)) {
        const { message: s } = j("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(s), this.logger.error(`${this.name}: ${JSON.stringify(this.values)}`), new Error(s);
      }
      this.cached = e, this.logger.debug(`Successfully Restored subscriptions for ${this.name}`), this.logger.trace({ type: "method", method: "restore", subscriptions: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore subscriptions for ${this.name}`), this.logger.error(e);
    }
  }
  async batchSubscribe(e) {
    if (e.length) {
      if (!await this.rpcBatchSubscribe(e)) {
        this.logger.warn(`Batch subscribe failed for ${e.length} topics, adding to pending for retry`), e.forEach((s) => {
          this.pending.set(s.topic, s);
        });
        return;
      }
      this.onBatchSubscribe(await Promise.all(e.map(async (s) => ({ ...s, id: await this.getSubscriptionId(s.topic) }))));
    }
  }
  async batchFetchMessages(e) {
    if (!e.length) return;
    this.logger.trace(`Fetching batch messages for ${e.length} subscriptions`);
    const s = await this.rpcBatchFetchMessages(e);
    s && s.messages && (await Ux(k.toMiliseconds(k.ONE_SECOND)), await this.relayer.handleBatchMessageEvents(s.messages));
  }
  async onConnect() {
    await this.restart(), this.reset();
  }
  onDisconnect() {
    this.onDisable();
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = j("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  async restartToComplete(e) {
    !this.relayer.connected && !this.relayer.connecting && (this.cached.push(e), await this.relayer.transportOpen());
  }
  async getClientId() {
    return this.clientId || (this.clientId = await this.relayer.core.crypto.getClientId()), this.clientId;
  }
  async getSubscriptionId(e) {
    return et(e + await this.getClientId());
  }
}, z3 = class extends cS {
  constructor(e) {
    super(e), this.protocol = "wc", this.version = 2, this.events = new Ge.EventEmitter(), this.name = f3, this.transportExplicitlyClosed = !1, this.initialized = !1, this.connectionAttemptInProgress = !1, this.hasExperiencedNetworkDisruption = !1, this.heartBeatTimeout = k.toMiliseconds(k.THIRTY_SECONDS + k.FIVE_SECONDS), this.reconnectInProgress = !1, this.requestsInFlight = [], this.connectTimeout = k.toMiliseconds(k.ONE_SECOND * 15), this.stalledRestartInProgress = !1, this.stalledRestartBackoff = 0, this.stalledRestartBaseInterval = k.toMiliseconds(k.ONE_SECOND * 2), this.stalledRestartMaxInterval = k.toMiliseconds(k.THIRTY_SECONDS), this.request = async (s) => {
      this.logger.debug("Publishing Request Payload");
      const r = s.id || ds().toString();
      await this.toEstablishConnection();
      try {
        this.logger.trace({ id: r, method: s.method, topic: s.params?.topic }, "relayer.request - publishing...");
        const n = `${r}:${s.params?.tag || ""}`;
        this.requestsInFlight.push(n);
        const i = await this.provider.request(s);
        return this.requestsInFlight = this.requestsInFlight.filter((o) => o !== n), i;
      } catch (n) {
        throw this.logger.debug(`Failed to Publish Request: ${r}`), n;
      }
    }, this.resetPingTimeout = () => {
      ri() && (clearTimeout(this.pingTimeout), this.pingTimeout = setTimeout(() => {
        try {
          this.logger.debug({}, "pingTimeout: Connection stalled, terminating..."), this.provider?.connection?.socket?.terminate?.();
        } catch (s) {
          this.logger.warn(s, s?.message);
        }
      }, this.heartBeatTimeout));
    }, this.onPayloadHandler = (s) => {
      this.onProviderPayload(s), this.resetPingTimeout();
    }, this.onConnectHandler = () => {
      this.logger.warn({}, "Relayer connected 🛜"), this.startPingTimeout(), this.stalledRestartBackoff = 0, this.events.emit(ae.connect);
    }, this.onDisconnectHandler = () => {
      this.logger.warn({}, "Relayer disconnected 🛑"), this.requestsInFlight = [], this.onProviderDisconnect();
    }, this.onProviderErrorHandler = (s) => {
      this.logger.fatal(`Fatal socket error: ${s.message}`), this.events.emit(ae.error, s), this.logger.fatal("Fatal socket error received, closing transport"), this.transportExplicitlyClosed = !0, clearTimeout(this.reconnectTimeout), this.reconnectTimeout = void 0, this.reconnectInProgress = !1, this.transportClose().catch((r) => this.logger.warn(r));
    }, this.registerProviderListeners = () => {
      this.provider.on(Xe.payload, this.onPayloadHandler), this.provider.on(Xe.connect, this.onConnectHandler), this.provider.on(Xe.disconnect, this.onDisconnectHandler), this.provider.on(Xe.error, this.onProviderErrorHandler);
    }, this.core = e.core, this.logger = Qa({ logger: e.logger ?? u3, name: this.name }), this.messages = new M3(this.logger, e.core), this.subscriber = new q3(this, this.logger), this.publisher = new L3(this, this.logger), this.projectId = e.projectId, this.relayUrl = e.relayUrl || Pp, vx() ? this.packageName = Xl() : Ex() && (this.bundleId = Xl()), this.provider = {};
  }
  async init() {
    this.logger.trace("Initialized"), this.registerEventListeners(), await Promise.all([this.messages.init(), this.subscriber.init()]), this.initialized = !0, this.transportOpen().catch((e) => this.logger.warn(e, e?.message));
  }
  get context() {
    return Fe(this.logger);
  }
  get connected() {
    return this.provider?.connection?.socket?.readyState === 1;
  }
  get connecting() {
    return this.provider?.connection?.socket?.readyState === 0 || this.connectPromise !== void 0;
  }
  async publish(e, s, r) {
    this.isInitialized(), await this.publisher.publish(e, s, r), await this.recordMessageEvent({ topic: e, message: s, publishedAt: Date.now(), transportType: ne.relay }, zn.outbound);
  }
  async publishCustom(e) {
    this.isInitialized(), await this.publisher.publishCustom(e);
  }
  async subscribe(e, s) {
    this.isInitialized(), (!s?.transportType || s?.transportType === "relay") && await this.toEstablishConnection();
    const r = s?.internal?.throwOnFailedPublish ?? !0;
    let n = this.subscriber.topicMap.get(e)?.[0] || "", i;
    const o = (a) => {
      a.topic === e && (this.subscriber.off(He.created, o), i());
    };
    return await Promise.all([new Promise((a) => {
      i = a, this.subscriber.on(He.created, o);
    }), new Promise((a, c) => {
      this.subscriber.subscribe(e, { internal: { throwOnFailedPublish: r }, ...s }).then((l) => {
        n = l || n, a();
      }).catch((l) => {
        r ? c(l) : a();
      });
    })]), n;
  }
  async unsubscribe(e, s) {
    this.isInitialized(), await this.subscriber.unsubscribe(e, s);
  }
  on(e, s) {
    this.events.on(e, s);
  }
  once(e, s) {
    this.events.once(e, s);
  }
  off(e, s) {
    this.events.off(e, s);
  }
  removeListener(e, s) {
    this.events.removeListener(e, s);
  }
  async transportDisconnect() {
    this.provider.disconnect && (this.hasExperiencedNetworkDisruption || this.connected) ? await dt(this.provider.disconnect(), 2e3, "provider.disconnect()").catch(() => this.onProviderDisconnect()) : this.onProviderDisconnect();
  }
  async transportClose() {
    this.transportExplicitlyClosed = !0, clearTimeout(this.stalledRestartTimeout), this.stalledRestartInProgress = !1, this.stalledRestartBackoff = 0, await this.resetTransport();
  }
  async transportOpen(e) {
    if (!this.subscriber.hasAnyTopics) {
      this.logger.info("Starting WS connection skipped because the client has no topics to work with.");
      return;
    }
    if (this.connectPromise ? (this.logger.debug({}, "Waiting for existing connection attempt to resolve..."), await this.connectPromise, this.logger.debug({}, "Existing connection attempt resolved")) : (this.connectPromise = this.connect(e).finally(() => {
      this.connectPromise = void 0;
    }), await this.connectPromise), !this.connected) throw new Error(`Couldn't establish socket connection to the relay server: ${this.relayUrl}`);
  }
  async restartTransport(e) {
    this.logger.debug({}, "Restarting transport..."), !this.connectionAttemptInProgress && (this.relayUrl = e || this.relayUrl, await this.confirmOnlineStateOrThrow(), await this.resetTransport(), await this.transportOpen());
  }
  async resetTransport() {
    this.reconnectInProgress = !0, clearTimeout(this.reconnectTimeout), this.reconnectTimeout = void 0, await this.transportDisconnect(), await this.subscriber.stop(), this.reconnectInProgress = !1;
  }
  async confirmOnlineStateOrThrow() {
    if (!await mh()) throw new Error("No internet connection detected. Please restart your network and try again.");
  }
  async handleBatchMessageEvents(e) {
    if (e?.length === 0) {
      this.logger.trace("Batch message events is empty. Ignoring...");
      return;
    }
    const s = e.sort((r, n) => r.publishedAt - n.publishedAt);
    this.logger.debug(`Batch of ${s.length} message events sorted`);
    for (const r of s) try {
      await this.onMessageEvent(r);
    } catch (n) {
      this.logger.warn(n, "Error while processing batch message event: " + n?.message);
    }
    this.logger.trace(`Batch of ${s.length} message events processed`);
  }
  async onLinkMessageEvent(e, s) {
    const { topic: r } = e;
    if (!s.sessionExists) {
      const n = ue(k.FIVE_MINUTES), i = { topic: r, expiry: n, relay: { protocol: "irn" }, active: !1 };
      await this.core.pairing.pairings.set(r, i);
    }
    this.events.emit(ae.message, e), await this.recordMessageEvent(e, zn.inbound);
  }
  async connect(e) {
    await this.confirmOnlineStateOrThrow(), e && e !== this.relayUrl && (this.relayUrl = e, await this.transportDisconnect()), this.transportExplicitlyClosed = !1;
    let s = 1;
    try {
      for (; s < 6; ) {
        this.connectionAttemptInProgress = !0;
        try {
          if (this.transportExplicitlyClosed) break;
          this.logger.debug({}, `Connecting to ${this.relayUrl}, attempt: ${s}...`), await this.createProvider(), await new Promise((r, n) => {
            const i = () => {
              n(new Error("Connection interrupted while trying to connect"));
            };
            this.provider.once(Xe.disconnect, i), dt(this.provider.connect(), this.connectTimeout, `Socket stalled when trying to connect to ${this.relayUrl}`).then(() => r()).catch(n).finally(() => {
              this.provider.off(Xe.disconnect, i), clearTimeout(this.reconnectTimeout);
            });
          }), await new Promise((r, n) => {
            const i = () => {
              n(new Error("Connection interrupted while trying to subscribe"));
            };
            this.provider.once(Xe.disconnect, i), this.subscriber.start().then(r).catch(n).finally(() => {
              this.provider.off(Xe.disconnect, i);
            });
          }), this.hasExperiencedNetworkDisruption = !1;
        } catch (r) {
          await this.subscriber.stop();
          const n = r;
          this.logger.warn({}, n.message), this.hasExperiencedNetworkDisruption = !0;
        }
        if (this.connected) {
          this.logger.debug({}, `Connected to ${this.relayUrl} successfully on attempt: ${s}`);
          break;
        }
        await new Promise((r) => setTimeout(r, k.toMiliseconds(s * 1))), s++;
      }
    } finally {
      this.connectionAttemptInProgress = !1, clearTimeout(this.reconnectTimeout), this.reconnectTimeout = void 0, this.reconnectInProgress = !1;
    }
  }
  startPingTimeout() {
    if (ri()) try {
      this.provider?.connection?.socket?.on("ping", () => {
        this.resetPingTimeout();
      }), this.resetPingTimeout();
    } catch (e) {
      this.logger.warn(e, e?.message);
    }
  }
  async createProvider() {
    if (this.provider.connection && (this.unregisterProviderListeners(), this.connected)) try {
      await dt(this.provider.disconnect(), 1e3, "Closing previous provider");
    } catch {
    }
    const e = await this.core.crypto.signJWT(this.relayUrl);
    this.provider = new rc(new MS(Dx({ sdkVersion: ha, protocol: this.protocol, version: this.version, relayUrl: this.relayUrl, projectId: this.projectId, auth: e, useOnCloseEvent: !0, bundleId: this.bundleId, packageName: this.packageName }))), this.registerProviderListeners();
  }
  async recordMessageEvent(e, s) {
    const { topic: r, message: n } = e;
    await this.messages.set(r, n, s);
  }
  async shouldIgnoreMessageEvent(e) {
    const { topic: s, message: r } = e;
    if (!r || r.length === 0) return this.logger.warn(`Ignoring invalid/empty message: ${r}`), !0;
    if (!await this.subscriber.isKnownTopic(s)) return this.logger.warn(`Ignoring message for unknown topic ${s}`), !0;
    const n = this.messages.has(s, r);
    return n && this.logger.warn(`Ignoring duplicate message: ${r}`), n;
  }
  async onProviderPayload(e) {
    if (this.logger.debug("Incoming Relay Payload"), this.logger.trace({ type: "payload", direction: "incoming", payload: e }), sc(e)) {
      if (!e.method.endsWith(d3)) return;
      const s = e.params, { topic: r, message: n, publishedAt: i, attestation: o } = s.data, a = { topic: r, message: n, publishedAt: i, transportType: ne.relay, attestation: o };
      this.logger.debug("Emitting Relayer Payload"), this.logger.trace({ type: "event", event: s.id, ...a }), this.events.emit(s.id, a), await this.acknowledgePayload(e), await this.onMessageEvent(a);
    } else Ti(e) && this.events.emit(ae.message_ack, e);
  }
  async onMessageEvent(e) {
    await this.shouldIgnoreMessageEvent(e) || (await this.recordMessageEvent(e, zn.inbound), this.events.emit(ae.message, e));
  }
  async acknowledgePayload(e) {
    const s = Gr(e.id, !0);
    await this.provider.connection.send(s);
  }
  unregisterProviderListeners() {
    this.provider.off(Xe.payload, this.onPayloadHandler), this.provider.off(Xe.connect, this.onConnectHandler), this.provider.off(Xe.disconnect, this.onDisconnectHandler), this.provider.off(Xe.error, this.onProviderErrorHandler), clearTimeout(this.pingTimeout);
  }
  async registerEventListeners() {
    let e = await mh();
    cI(async (s) => {
      e !== s && (e = s, s ? await this.transportOpen().catch((r) => this.logger.error(r, r?.message)) : (this.hasExperiencedNetworkDisruption = !0, await this.transportDisconnect(), this.transportExplicitlyClosed = !1));
    }), this.core.heartbeat.on(Gs.pulse, async () => {
      if (!this.transportExplicitlyClosed && !this.connected && uI()) try {
        await this.confirmOnlineStateOrThrow(), await this.transportOpen();
      } catch (s) {
        this.logger.warn(s, s?.message);
      }
    }), this.events.on(ae.connection_stalled, () => {
      if (this.transportExplicitlyClosed || this.stalledRestartInProgress) return;
      this.stalledRestartInProgress = !0;
      const s = this.stalledRestartBackoff === 0 ? 0 : Math.min(Math.pow(2, this.stalledRestartBackoff - 1) * this.stalledRestartBaseInterval, this.stalledRestartMaxInterval);
      this.stalledRestartBackoff++, this.logger.warn(`Connection stalled, restarting transport${s ? ` in ${s}ms` : ""}...`), this.stalledRestartTimeout = setTimeout(async () => {
        try {
          if (this.transportExplicitlyClosed) return;
          await this.restartTransport();
        } catch (r) {
          this.logger.error(r, r?.message);
        } finally {
          this.stalledRestartInProgress = !1;
        }
      }, s);
    });
  }
  async onProviderDisconnect() {
    if (clearTimeout(this.pingTimeout), this.events.emit(ae.disconnect), !this.reconnectInProgress) {
      this.reconnectInProgress = !0;
      try {
        await this.subscriber.stop();
      } catch (e) {
        this.logger.warn(e, "subscriber.stop() failed during disconnect");
      }
      if (!this.subscriber.hasAnyTopics || this.transportExplicitlyClosed) {
        this.reconnectInProgress = !1;
        return;
      }
      this.reconnectTimeout = setTimeout(async () => {
        await this.transportOpen().catch((e) => this.logger.error(e, e?.message)), this.reconnectTimeout = void 0, this.reconnectInProgress = !1;
      }, k.toMiliseconds(p3));
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = j("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  async toEstablishConnection() {
    if (await this.confirmOnlineStateOrThrow(), !this.connected) {
      if (this.connectPromise) {
        await this.connectPromise;
        return;
      }
      this.connectPromise = this.connect().finally(() => {
        this.connectPromise = void 0;
      }), await this.connectPromise;
    }
  }
}, Zs = class extends lS {
  constructor(e, s, r, n = $t, i = void 0) {
    super(e, s, r, n), this.core = e, this.logger = s, this.name = r, this.map = /* @__PURE__ */ new Map(), this.version = g3, this.cached = [], this.initialized = !1, this.storagePrefix = $t, this.recentlyDeleted = [], this.recentlyDeletedLimit = 200, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((o) => {
        this.getKey && o !== null && !ge(o) ? this.map.set(this.getKey(o), o) : k_(o) ? this.map.set(o.id, o) : q_(o) && this.map.set(o.topic, o);
      }), this.cached = [], this.initialized = !0);
    }, this.set = async (o, a) => {
      this.isInitialized(), this.map.has(o) ? await this.update(o, a) : (this.logger.debug("Setting value"), this.logger.trace({ type: "method", method: "set", key: o, value: a }), this.map.set(o, a), await this.persist());
    }, this.get = (o) => (this.isInitialized(), this.logger.debug("Getting value"), this.logger.trace({ type: "method", method: "get", key: o }), this.getData(o)), this.getAll = (o) => (this.isInitialized(), o ? this.values.filter((a) => Object.keys(o).every((c) => XS(a[c], o[c]))) : this.values), this.update = async (o, a) => {
      this.isInitialized(), this.logger.debug("Updating value"), this.logger.trace({ type: "method", method: "update", key: o, update: a });
      const c = { ...this.getData(o), ...a };
      this.map.set(o, c), await this.persist();
    }, this.delete = async (o, a) => {
      this.isInitialized(), this.map.has(o) && (this.logger.debug("Deleting value"), this.logger.trace({ type: "method", method: "delete", key: o, reason: a }), this.map.delete(o), this.addToRecentlyDeleted(o), await this.persist());
    }, this.logger = Ye(s, this.name), this.storagePrefix = n, this.getKey = i;
  }
  get context() {
    return Fe(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.map.size;
  }
  get keys() {
    return Array.from(this.map.keys());
  }
  get values() {
    return Array.from(this.map.values());
  }
  addToRecentlyDeleted(e) {
    this.recentlyDeleted.push(e), this.recentlyDeleted.length >= this.recentlyDeletedLimit && this.recentlyDeleted.splice(0, this.recentlyDeletedLimit / 2);
  }
  async setDataStore(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getDataStore() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getData(e) {
    const s = this.map.get(e);
    if (!s) {
      if (this.recentlyDeleted.includes(e)) {
        const { message: n } = j("MISSING_OR_INVALID", `Record was recently deleted - ${this.name}: ${e}`);
        throw this.logger.error(n), new Error(n);
      }
      const { message: r } = j("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw this.logger.error(r), new Error(r);
    }
    return s;
  }
  async persist() {
    await this.setDataStore(this.values);
  }
  async restore() {
    try {
      const e = await this.getDataStore();
      if (typeof e > "u" || !e.length) return;
      if (this.map.size) {
        const { message: s } = j("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(s), new Error(s);
      }
      this.cached = e, this.logger.debug(`Successfully Restored value for ${this.name}`), this.logger.trace({ type: "method", method: "restore", value: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore value for ${this.name}`), this.logger.error(e);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = j("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
};
class j3 {
  constructor(e, s) {
    this.core = e, this.logger = s, this.name = b3, this.version = v3, this.events = new wa(), this.initialized = !1, this.storagePrefix = $t, this.ignoredPayloadTypes = [Yt], this.registeredMethods = [], this.init = async () => {
      this.initialized || (await this.pairings.init(), await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.initialized = !0, this.logger.trace("Initialized"));
    }, this.register = ({ methods: r }) => {
      this.isInitialized(), this.registeredMethods = [.../* @__PURE__ */ new Set([...this.registeredMethods, ...r])];
    }, this.create = async (r) => {
      this.isInitialized();
      const n = oa(), i = await this.core.crypto.setSymKey(n), o = ue(k.FIVE_MINUTES), a = { protocol: Op }, c = { topic: i, expiry: o, relay: a, active: !1, methods: r?.methods }, l = uh({ protocol: this.core.protocol, version: this.core.version, topic: i, symKey: n, relay: a, expiryTimestamp: o, methods: r?.methods });
      return this.events.emit(Ps.create, c), this.core.expirer.set(i, o), await this.pairings.set(i, c), await this.core.relayer.subscribe(i, { transportType: r?.transportType, internal: r?.internal }), { topic: i, uri: l };
    }, this.pair = async (r) => {
      this.isInitialized();
      const n = this.core.eventClient.createEvent({ properties: { topic: r?.uri, trace: [bt.pairing_started] } });
      this.isValidPair(r, n);
      const { topic: i, symKey: o, relay: a, expiryTimestamp: c, methods: l } = hh(r.uri);
      n.props.properties.topic = i, n.addTrace(bt.pairing_uri_validation_success), n.addTrace(bt.pairing_uri_not_expired);
      let u;
      if (this.pairings.keys.includes(i)) {
        if (u = this.pairings.get(i), n.addTrace(bt.existing_pairing), u.active) throw n.setError(Lt.active_pairing_already_exists), new Error(`Pairing already exists: ${i}. Please try again with a new connection URI.`);
        n.addTrace(bt.pairing_not_expired);
      }
      const h = c || ue(k.FIVE_MINUTES), f = { topic: i, relay: a, expiry: h, active: !1, methods: l };
      this.core.expirer.set(i, h), await this.pairings.set(i, f), n.addTrace(bt.store_new_pairing), r.activatePairing && await this.activate({ topic: i }), this.events.emit(Ps.create, f), n.addTrace(bt.emit_inactive_pairing), this.core.crypto.keychain.has(i) || await this.core.crypto.setSymKey(o, i), n.addTrace(bt.subscribing_pairing_topic);
      try {
        await this.core.relayer.confirmOnlineStateOrThrow();
      } catch {
        n.setError(Lt.no_internet_connection);
      }
      try {
        await this.core.relayer.subscribe(i, { relay: a });
      } catch (d) {
        throw n.setError(Lt.subscribe_pairing_topic_failure), d;
      }
      return n.addTrace(bt.subscribe_pairing_topic_success), f;
    }, this.activate = async ({ topic: r }) => {
      this.isInitialized();
      const n = ue(k.FIVE_MINUTES);
      this.core.expirer.set(r, n), await this.pairings.update(r, { active: !0, expiry: n });
    }, this.ping = async (r) => {
      this.isInitialized(), await this.isValidPing(r), this.logger.warn("ping() is deprecated and will be removed in the next major release.");
      const { topic: n } = r;
      if (this.pairings.keys.includes(n)) {
        const i = await this.sendRequest(n, "wc_pairingPing", {}), { done: o, resolve: a, reject: c } = As();
        this.events.once(te("pairing_ping", i), ({ error: l }) => {
          l ? c(l) : a();
        }), await o();
      }
    }, this.updateExpiry = async ({ topic: r, expiry: n }) => {
      this.isInitialized(), await this.pairings.update(r, { expiry: n });
    }, this.updateMetadata = async ({ topic: r, metadata: n }) => {
      this.isInitialized(), await this.pairings.update(r, { peerMetadata: n });
    }, this.getPairings = () => (this.isInitialized(), this.pairings.values), this.disconnect = async (r) => {
      this.isInitialized(), await this.isValidDisconnect(r);
      const { topic: n } = r;
      this.pairings.keys.includes(n) && (await this.sendRequest(n, "wc_pairingDelete", se("USER_DISCONNECTED")), await this.deletePairing(n));
    }, this.formatUriFromPairing = (r) => {
      this.isInitialized();
      const { topic: n, relay: i, expiry: o, methods: a } = r, c = this.core.crypto.keychain.get(n);
      return uh({ protocol: this.core.protocol, version: this.core.version, topic: n, symKey: c, relay: i, expiryTimestamp: o, methods: a });
    }, this.sendRequest = async (r, n, i) => {
      const o = ft(n, i), a = await this.core.crypto.encode(r, o), c = Or[n].req;
      return this.core.history.set(r, o), this.core.relayer.publish(r, a, c), o.id;
    }, this.sendResult = async (r, n, i) => {
      const o = Gr(r, i), a = await this.core.crypto.encode(n, o), c = (await this.core.history.get(n, r)).request.method, l = Or[c].res;
      await this.core.relayer.publish(n, a, l), await this.core.history.resolve(o);
    }, this.sendError = async (r, n, i) => {
      const o = Pi(r, i), a = await this.core.crypto.encode(n, o), c = (await this.core.history.get(n, r)).request.method, l = Or[c] ? Or[c].res : Or.unregistered_method.res;
      await this.core.relayer.publish(n, a, l), await this.core.history.resolve(o);
    }, this.deletePairing = async (r, n) => {
      await this.core.relayer.unsubscribe(r), await Promise.all([this.pairings.delete(r, se("USER_DISCONNECTED")), this.core.crypto.deleteSymKey(r), n ? Promise.resolve() : this.core.expirer.del(r)]);
    }, this.cleanup = async () => {
      const r = this.pairings.getAll().filter((n) => xt(n.expiry));
      await Promise.all(r.map((n) => this.deletePairing(n.topic)));
    }, this.onRelayEventRequest = async (r) => {
      const { topic: n, payload: i } = r;
      switch (i.method) {
        case "wc_pairingPing":
          return await this.onPairingPingRequest(n, i);
        case "wc_pairingDelete":
          return await this.onPairingDeleteRequest(n, i);
        default:
          return await this.onUnknownRpcMethodRequest(n, i);
      }
    }, this.onRelayEventResponse = async (r) => {
      const { topic: n, payload: i } = r, o = (await this.core.history.get(n, i.id)).request.method;
      switch (o) {
        case "wc_pairingPing":
          return this.onPairingPingResponse(n, i);
        default:
          return this.onUnknownRpcMethodResponse(o);
      }
    }, this.onPairingPingRequest = async (r, n) => {
      const { id: i } = n;
      try {
        this.isValidPing({ topic: r }), await this.sendResult(i, r, !0), this.events.emit(Ps.ping, { id: i, topic: r });
      } catch (o) {
        await this.sendError(i, r, o), this.logger.error(o);
      }
    }, this.onPairingPingResponse = (r, n) => {
      const { id: i } = n;
      setTimeout(() => {
        Et(n) ? this.events.emit(te("pairing_ping", i), {}) : tt(n) && this.events.emit(te("pairing_ping", i), { error: n.error });
      }, 500);
    }, this.onPairingDeleteRequest = async (r, n) => {
      const { id: i } = n;
      try {
        this.isValidDisconnect({ topic: r }), await this.deletePairing(r), this.events.emit(Ps.delete, { id: i, topic: r });
      } catch (o) {
        await this.sendError(i, r, o), this.logger.error(o);
      }
    }, this.onUnknownRpcMethodRequest = async (r, n) => {
      const { id: i, method: o } = n;
      try {
        if (this.registeredMethods.includes(o)) return;
        const a = se("WC_METHOD_UNSUPPORTED", o);
        await this.sendError(i, r, a), this.logger.error(a);
      } catch (a) {
        await this.sendError(i, r, a), this.logger.error(a);
      }
    }, this.onUnknownRpcMethodResponse = (r) => {
      this.registeredMethods.includes(r) || this.logger.error(se("WC_METHOD_UNSUPPORTED", r));
    }, this.isValidPair = (r, n) => {
      if (!Le(r)) {
        const { message: o } = j("MISSING_OR_INVALID", `pair() params: ${r}`);
        throw n.setError(Lt.malformed_pairing_uri), new Error(o);
      }
      if (!L_(r.uri)) {
        const { message: o } = j("MISSING_OR_INVALID", `pair() uri: ${r.uri}`);
        throw n.setError(Lt.malformed_pairing_uri), new Error(o);
      }
      const i = hh(r?.uri);
      if (!i?.relay?.protocol) {
        const { message: o } = j("MISSING_OR_INVALID", "pair() uri#relay-protocol");
        throw n.setError(Lt.malformed_pairing_uri), new Error(o);
      }
      if (!i?.symKey) {
        const { message: o } = j("MISSING_OR_INVALID", "pair() uri#symKey");
        throw n.setError(Lt.malformed_pairing_uri), new Error(o);
      }
      if (i?.expiryTimestamp && k.toMiliseconds(i?.expiryTimestamp) < Date.now()) {
        n.setError(Lt.pairing_expired);
        const { message: o } = j("EXPIRED", "pair() URI has expired. Please try again with a new connection URI.");
        throw new Error(o);
      }
    }, this.isValidPing = async (r) => {
      if (!Le(r)) {
        const { message: i } = j("MISSING_OR_INVALID", `ping() params: ${r}`);
        throw new Error(i);
      }
      const { topic: n } = r;
      await this.isValidPairingTopic(n);
    }, this.isValidDisconnect = async (r) => {
      if (!Le(r)) {
        const { message: i } = j("MISSING_OR_INVALID", `disconnect() params: ${r}`);
        throw new Error(i);
      }
      const { topic: n } = r;
      await this.isValidPairingTopic(n);
    }, this.isValidPairingTopic = async (r) => {
      if (!fe(r, !1)) {
        const { message: n } = j("MISSING_OR_INVALID", `pairing topic should be a string: ${r}`);
        throw new Error(n);
      }
      if (!this.pairings.keys.includes(r)) {
        const { message: n } = j("NO_MATCHING_KEY", `pairing topic doesn't exist: ${r}`);
        throw new Error(n);
      }
      if (xt(this.pairings.get(r).expiry)) {
        await this.deletePairing(r);
        const { message: n } = j("EXPIRED", `pairing topic: ${r}`);
        throw new Error(n);
      }
    }, this.core = e, this.logger = Ye(s, this.name), this.pairings = new Zs(this.core, this.logger, this.name, this.storagePrefix);
  }
  get context() {
    return Fe(this.logger);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = j("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  registerRelayerEvents() {
    this.core.relayer.on(ae.message, async (e) => {
      const { topic: s, message: r, transportType: n } = e;
      if (this.pairings.keys.includes(s) && n !== ne.link_mode) {
        try {
          if (this.core.crypto.getPayloadType(r, _t) === Hs) {
            this.logger.warn(`registerRelayerEvents() -> non-link mode TYPE_2 payload ignored: ${r}`);
            return;
          }
        } catch {
        }
        if (!this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(r))) try {
          const i = await this.core.crypto.decode(s, r);
          sc(i) ? (this.core.history.set(s, i), await this.onRelayEventRequest({ topic: s, payload: i })) : Ti(i) && (await this.core.history.resolve(i), await this.onRelayEventResponse({ topic: s, payload: i }), this.core.history.delete(s, i.id)), await this.core.relayer.messages.ack(s, r);
        } catch (i) {
          this.logger.error(i);
        }
      }
    });
  }
  registerExpirerEvents() {
    this.core.expirer.on(Je.expired, async (e) => {
      const { topic: s } = zd(e.target);
      s && this.pairings.keys.includes(s) && (await this.deletePairing(s, !0), this.events.emit(Ps.expire, { topic: s }));
    });
  }
}
class F3 extends iS {
  constructor(e, s) {
    super(e, s), this.core = e, this.logger = s, this.records = /* @__PURE__ */ new Map(), this.events = new Ge.EventEmitter(), this.name = E3, this.version = x3, this.cached = [], this.initialized = !1, this.storagePrefix = $t, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((r) => this.records.set(r.id, r)), this.cached = [], this.registerEventListeners(), this.initialized = !0);
    }, this.set = (r, n, i) => {
      if (this.isInitialized(), this.logger.debug("Setting JSON-RPC request history record"), this.logger.trace({ type: "method", method: "set", topic: r, request: n, chainId: i }), this.records.has(n.id)) return;
      const o = { id: n.id, topic: r, request: { method: n.method, params: n.params || null }, chainId: i, expiry: ue(k.THIRTY_DAYS) };
      this.records.set(o.id, o), this.persist(), this.events.emit(at.created, o);
    }, this.resolve = async (r) => {
      if (this.isInitialized(), this.logger.debug("Updating JSON-RPC response history record"), this.logger.trace({ type: "method", method: "update", response: r }), !this.records.has(r.id)) return;
      const n = await this.getRecord(r.id);
      typeof n.response < "u" || (n.response = tt(r) ? { error: r.error } : { result: r.result }, this.records.set(n.id, n), this.persist(), this.events.emit(at.updated, n));
    }, this.get = async (r, n) => (this.isInitialized(), this.logger.debug("Getting record"), this.logger.trace({ type: "method", method: "get", topic: r, id: n }), await this.getRecord(n)), this.delete = (r, n) => {
      this.isInitialized(), this.logger.debug("Deleting record"), this.logger.trace({ type: "method", method: "delete", id: n }), this.values.forEach((i) => {
        if (i.topic === r) {
          if (typeof n < "u" && i.id !== n) return;
          this.records.delete(i.id), this.events.emit(at.deleted, i);
        }
      }), this.persist();
    }, this.exists = async (r, n) => (this.isInitialized(), this.records.has(n) ? (await this.getRecord(n)).topic === r : !1), this.on = (r, n) => {
      this.events.on(r, n);
    }, this.once = (r, n) => {
      this.events.once(r, n);
    }, this.off = (r, n) => {
      this.events.off(r, n);
    }, this.removeListener = (r, n) => {
      this.events.removeListener(r, n);
    }, this.logger = Ye(s, this.name);
  }
  get context() {
    return Fe(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get size() {
    return this.records.size;
  }
  get keys() {
    return Array.from(this.records.keys());
  }
  get values() {
    return Array.from(this.records.values());
  }
  get pending() {
    const e = [];
    return this.values.forEach((s) => {
      if (typeof s.response < "u") return;
      const r = { topic: s.topic, request: ft(s.request.method, s.request.params, s.id), chainId: s.chainId };
      return e.push(r);
    }), e;
  }
  async setJsonRpcRecords(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getJsonRpcRecords() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getRecord(e) {
    this.isInitialized();
    const s = this.records.get(e);
    if (!s) {
      const { message: r } = j("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw new Error(r);
    }
    return s;
  }
  async persist() {
    await this.setJsonRpcRecords(this.values), this.events.emit(at.sync);
  }
  async restore() {
    try {
      const e = await this.getJsonRpcRecords();
      if (typeof e > "u" || !e.length) return;
      if (this.records.size) {
        const { message: s } = j("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(s), new Error(s);
      }
      this.cached = e, this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", records: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(e);
    }
  }
  registerEventListeners() {
    this.events.on(at.created, (e) => {
      const s = at.created;
      this.logger.info(`Emitting ${s}`), this.logger.debug({ type: "event", event: s, record: e });
    }), this.events.on(at.updated, (e) => {
      const s = at.updated;
      this.logger.info(`Emitting ${s}`), this.logger.debug({ type: "event", event: s, record: e });
    }), this.events.on(at.deleted, (e) => {
      const s = at.deleted;
      this.logger.info(`Emitting ${s}`), this.logger.debug({ type: "event", event: s, record: e });
    }), this.core.heartbeat.on(Gs.pulse, () => {
      this.cleanup();
    });
  }
  cleanup() {
    try {
      this.isInitialized();
      let e = !1;
      this.records.forEach((s) => {
        k.toMiliseconds(s.expiry || 0) - Date.now() <= 0 && (this.logger.info(`Deleting expired history log: ${s.id}`), this.records.delete(s.id), this.events.emit(at.deleted, s, !1), e = !0);
      }), e && this.persist();
    } catch (e) {
      this.logger.warn(e);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = j("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
class H3 extends uS {
  constructor(e, s) {
    super(e, s), this.core = e, this.logger = s, this.expirations = /* @__PURE__ */ new Map(), this.events = new Ge.EventEmitter(), this.name = _3, this.version = I3, this.cached = [], this.initialized = !1, this.storagePrefix = $t, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((r) => this.expirations.set(r.target, r)), this.cached = [], this.registerEventListeners(), this.initialized = !0);
    }, this.has = (r) => {
      try {
        const n = this.formatTarget(r);
        return typeof this.getExpiration(n) < "u";
      } catch {
        return !1;
      }
    }, this.set = (r, n) => {
      this.isInitialized();
      const i = this.formatTarget(r), o = { target: i, expiry: n };
      this.expirations.set(i, o), this.checkExpiry(i, o), this.events.emit(Je.created, { target: i, expiration: o });
    }, this.get = (r) => {
      this.isInitialized();
      const n = this.formatTarget(r);
      return this.getExpiration(n);
    }, this.del = (r) => {
      if (this.isInitialized(), this.has(r)) {
        const n = this.formatTarget(r), i = this.getExpiration(n);
        this.expirations.delete(n), this.events.emit(Je.deleted, { target: n, expiration: i });
      }
    }, this.on = (r, n) => {
      this.events.on(r, n);
    }, this.once = (r, n) => {
      this.events.once(r, n);
    }, this.off = (r, n) => {
      this.events.off(r, n);
    }, this.removeListener = (r, n) => {
      this.events.removeListener(r, n);
    }, this.logger = Ye(s, this.name);
  }
  get context() {
    return Fe(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.expirations.size;
  }
  get keys() {
    return Array.from(this.expirations.keys());
  }
  get values() {
    return Array.from(this.expirations.values());
  }
  formatTarget(e) {
    if (typeof e == "string") return Ax(e);
    if (typeof e == "number") return $x(e);
    const { message: s } = j("UNKNOWN_TYPE", `Target type: ${typeof e}`);
    throw new Error(s);
  }
  async setExpirations(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getExpirations() {
    return await this.core.storage.getItem(this.storageKey);
  }
  async persist() {
    await this.setExpirations(this.values), this.events.emit(Je.sync);
  }
  async restore() {
    try {
      const e = await this.getExpirations();
      if (typeof e > "u" || !e.length) return;
      if (this.expirations.size) {
        const { message: s } = j("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(s), new Error(s);
      }
      this.cached = e, this.logger.debug(`Successfully Restored expirations for ${this.name}`), this.logger.trace({ type: "method", method: "restore", expirations: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore expirations for ${this.name}`), this.logger.error(e);
    }
  }
  getExpiration(e) {
    const s = this.expirations.get(e);
    if (!s) {
      const { message: r } = j("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw this.logger.warn(r), new Error(r);
    }
    return s;
  }
  checkExpiry(e, s) {
    const { expiry: r } = s;
    k.toMiliseconds(r) - Date.now() <= 0 && this.expire(e, s);
  }
  expire(e, s) {
    this.expirations.delete(e), this.events.emit(Je.expired, { target: e, expiration: s });
  }
  checkExpirations() {
    this.core.relayer.connected && this.expirations.forEach((e, s) => this.checkExpiry(s, e));
  }
  registerEventListeners() {
    this.core.heartbeat.on(Gs.pulse, () => this.checkExpirations()), this.events.on(Je.created, (e) => {
      const s = Je.created;
      this.logger.info(`Emitting ${s}`), this.logger.debug({ type: "event", event: s, data: e }), this.persist();
    }), this.events.on(Je.expired, (e) => {
      const s = Je.expired;
      this.logger.info(`Emitting ${s}`), this.logger.debug({ type: "event", event: s, data: e }), this.persist();
    }), this.events.on(Je.deleted, (e) => {
      const s = Je.deleted;
      this.logger.info(`Emitting ${s}`), this.logger.debug({ type: "event", event: s, data: e }), this.persist();
    });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = j("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
class K3 extends fS {
  constructor(e, s, r) {
    super(e, s, r), this.core = e, this.logger = s, this.store = r, this.name = S3, this.verifyUrlV3 = A3, this.storagePrefix = $t, this.version = $p, this.init = async () => {
      this.isDevEnv || (this.publicKey = await this.store.getItem(this.storeKey), this.publicKey && k.toMiliseconds(this.publicKey?.expiresAt) < Date.now() && (this.logger.debug("verify v2 public key expired"), await this.removePublicKey()));
    }, this.register = async (n) => {
      if (!wr() || this.isDevEnv) return;
      const i = window.location.origin, { id: o, decryptedId: a } = n, c = `${this.verifyUrlV3}/attestation?projectId=${this.core.projectId}&origin=${i}&id=${o}&decryptedId=${a}`;
      try {
        const l = ks(), u = this.startAbortTimer(k.ONE_SECOND * 5), h = await new Promise((f, d) => {
          const g = () => {
            window.removeEventListener("message", m), l.body.removeChild(w), d("attestation aborted");
          };
          this.abortController.signal.addEventListener("abort", g);
          const w = l.createElement("iframe");
          w.src = c, w.style.display = "none", w.addEventListener("error", g, { signal: this.abortController.signal });
          const m = (S) => {
            if (S.data && typeof S.data == "string") try {
              const T = JSON.parse(S.data);
              if (T.type === "verify_attestation") {
                if (ea(T.attestation).payload.id !== o) return;
                clearInterval(u), l.body.removeChild(w), this.abortController.signal.removeEventListener("abort", g), window.removeEventListener("message", m), f(T.attestation === null ? "" : T.attestation);
              }
            } catch (T) {
              this.logger.warn(T);
            }
          };
          l.body.appendChild(w), window.addEventListener("message", m, { signal: this.abortController.signal });
        });
        return this.logger.debug(h, "jwt attestation"), h;
      } catch (l) {
        this.logger.warn(l);
      }
      return "";
    }, this.resolve = async (n) => {
      if (this.isDevEnv) return "";
      const { attestationId: i, hash: o, encryptedId: a } = n;
      if (i === "") {
        this.logger.debug("resolve: attestationId is empty, skipping");
        return;
      }
      if (i) {
        if (ea(i).payload.id !== a) return;
        const l = await this.isValidJwtAttestation(i);
        if (l) {
          if (!l.isVerified) {
            this.logger.warn("resolve: jwt attestation: origin url not verified");
            return;
          }
          return l;
        }
      }
      if (!o) return;
      const c = this.getVerifyUrl(n?.verifyUrl);
      return this.fetchAttestation(o, c);
    }, this.fetchAttestation = async (n, i) => {
      this.logger.debug(`resolving attestation: ${n} from url: ${i}`);
      const o = this.startAbortTimer(k.ONE_SECOND * 5), a = await fetch(`${i}/attestation/${n}?v2Supported=true`, { signal: this.abortController.signal });
      return clearTimeout(o), a.status === 200 ? await a.json() : void 0;
    }, this.getVerifyUrl = (n) => {
      let i = n || qr;
      return $3.includes(i) || (this.logger.info(`verify url: ${i}, not included in trusted list, assigning default: ${qr}`), i = qr), i;
    }, this.fetchPublicKey = async () => {
      try {
        this.logger.debug(`fetching public key from: ${this.verifyUrlV3}`);
        const n = this.startAbortTimer(k.FIVE_SECONDS), i = await fetch(`${this.verifyUrlV3}/public-key`, { signal: this.abortController.signal });
        return clearTimeout(n), await i.json();
      } catch (n) {
        this.logger.warn(n);
      }
    }, this.persistPublicKey = async (n) => {
      this.logger.debug(n, "persisting public key to local storage"), await this.store.setItem(this.storeKey, n), this.publicKey = n;
    }, this.removePublicKey = async () => {
      this.logger.debug("removing verify v2 public key from storage"), await this.store.removeItem(this.storeKey), this.publicKey = void 0;
    }, this.isValidJwtAttestation = async (n) => {
      const i = await this.getPublicKey();
      try {
        if (i) return this.validateAttestation(n, i);
      } catch (a) {
        this.logger.error(a), this.logger.warn("error validating attestation");
      }
      const o = await this.fetchAndPersistPublicKey();
      try {
        if (o) return this.validateAttestation(n, o);
      } catch (a) {
        this.logger.error(a), this.logger.warn("error validating attestation");
      }
    }, this.getPublicKey = async () => this.publicKey ? this.publicKey : await this.fetchAndPersistPublicKey(), this.fetchAndPersistPublicKey = async () => {
      if (this.fetchPromise) return await this.fetchPromise, this.publicKey;
      this.fetchPromise = new Promise(async (i) => {
        const o = await this.fetchPublicKey();
        o && (await this.persistPublicKey(o), i(o));
      });
      const n = await this.fetchPromise;
      return this.fetchPromise = void 0, n;
    }, this.validateAttestation = (n, i) => {
      const o = S_(n, i.publicKey), a = { hasExpired: k.toMiliseconds(o.exp) < Date.now(), payload: o };
      if (a.hasExpired) throw this.logger.warn("resolve: jwt attestation expired"), new Error("JWT attestation expired");
      return { origin: a.payload.origin, isScam: a.payload.isScam, isVerified: a.payload.isVerified };
    }, this.logger = Ye(s, this.name), this.abortController = new AbortController(), this.isDevEnv = Za(), this.init();
  }
  get storeKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//verify:public:key";
  }
  get context() {
    return Fe(this.logger);
  }
  startAbortTimer(e) {
    return this.abortController = new AbortController(), setTimeout(() => this.abortController.abort(), k.toMiliseconds(e));
  }
}
class V3 extends dS {
  constructor(e, s) {
    super(e, s), this.projectId = e, this.logger = s, this.context = O3, this.registerDeviceToken = async (r) => {
      const { clientId: n, token: i, notificationType: o, enableEncrypted: a = !1 } = r, c = `${P3}/${this.projectId}/clients`;
      await fetch(c, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ client_id: n, type: o, token: i, always_raw: a }) });
    }, this.logger = Ye(s, this.context);
  }
}
let W3 = class extends pS {
  constructor(e, s, r = !0) {
    super(e, s, r), this.core = e, this.logger = s, this.context = B3, this.storagePrefix = $t, this.storageVersion = T3, this.events = /* @__PURE__ */ new Map(), this.shouldPersist = !1, this.init = async (n) => {
      if (Za()) return;
      const i = n?.sdk;
      try {
        const o = { eventId: Ql(), timestamp: Date.now(), domain: this.getAppDomain(), props: { event: "INIT", type: "", properties: { client_id: await this.core.crypto.getClientId(), user_agent: kd(this.core.relayer.protocol, this.core.relayer.version, ha), ...i?.name && i.version ? { sdk_name: i.name, sdk_version: i.version } : {} } } };
        await this.sendEvent([o]);
      } catch (o) {
        this.logger.warn(o);
      }
    }, this.createEvent = (n) => {
      const { event: i = "ERROR", type: o = "", properties: { topic: a, trace: c } } = n, l = Ql(), u = this.core.projectId || "", h = Date.now(), f = { eventId: l, timestamp: h, props: { event: i, type: o, properties: { topic: a, trace: c } }, bundleId: u, domain: this.getAppDomain(), ...this.setMethods(l) };
      return this.telemetryEnabled && (this.events.set(l, f), this.shouldPersist = !0), f;
    }, this.getEvent = (n) => {
      const { eventId: i, topic: o } = n;
      if (i) return this.events.get(i);
      const a = Array.from(this.events.values()).find((c) => c.props.properties.topic === o);
      if (a) return { ...a, ...this.setMethods(a.eventId) };
    }, this.deleteEvent = (n) => {
      const { eventId: i } = n;
      this.events.delete(i), this.shouldPersist = !0;
    }, this.setEventListeners = () => {
      this.core.heartbeat.on(Gs.pulse, async () => {
        this.shouldPersist && await this.persist(), this.events.forEach((n) => {
          k.fromMiliseconds(Date.now()) - k.fromMiliseconds(n.timestamp) > R3 && (this.events.delete(n.eventId), this.shouldPersist = !0);
        });
      });
    }, this.setMethods = (n) => ({ addTrace: (i) => this.addTrace(n, i), setError: (i) => this.setError(n, i) }), this.addTrace = (n, i) => {
      const o = this.events.get(n);
      o && (o.props.properties.trace.push(i), this.events.set(n, o), this.shouldPersist = !0);
    }, this.setError = (n, i) => {
      const o = this.events.get(n);
      o && (o.props.type = i, o.timestamp = Date.now(), this.events.set(n, o), this.shouldPersist = !0);
    }, this.persist = async () => {
      await this.core.storage.setItem(this.storageKey, Array.from(this.events.values())), this.shouldPersist = !1;
    }, this.restore = async () => {
      try {
        const n = await this.core.storage.getItem(this.storageKey) || [];
        if (!n.length) return;
        n.forEach((i) => {
          this.events.set(i.eventId, { ...i, ...this.setMethods(i.eventId) });
        });
      } catch (n) {
        this.logger.warn(n);
      }
    }, this.submit = async () => {
      if (!this.telemetryEnabled || this.events.size === 0) return;
      const n = [];
      for (const [i, o] of this.events) o.props.type && n.push(o);
      if (n.length !== 0) try {
        if ((await this.sendEvent(n)).ok) for (const i of n) this.events.delete(i.eventId), this.shouldPersist = !0;
      } catch (i) {
        this.logger.warn(i);
      }
    }, this.sendEvent = async (n) => {
      const i = this.getAppDomain() ? "" : "&sp=desktop";
      return await fetch(`${C3}?projectId=${this.core.projectId}&st=events_sdk&sv=js-${ha}${i}`, { method: "POST", body: JSON.stringify(n) });
    }, this.getAppDomain = () => Ld().url, this.logger = Ye(s, this.context), this.telemetryEnabled = r, r ? this.restore().then(async () => {
      await this.submit(), this.setEventListeners();
    }) : this.persist();
  }
  get storageKey() {
    return this.storagePrefix + this.storageVersion + this.core.customStoragePrefix + "//" + this.context;
  }
}, G3 = class Bp extends nS {
  constructor(e) {
    super(e), this.protocol = Ap, this.version = $p, this.name = la, this.events = new Ge.EventEmitter(), this.initialized = !1, this.on = (o, a) => this.events.on(o, a), this.once = (o, a) => this.events.once(o, a), this.off = (o, a) => this.events.off(o, a), this.removeListener = (o, a) => this.events.removeListener(o, a), this.dispatchEnvelope = ({ topic: o, message: a, sessionExists: c }) => {
      if (!o || !a) return;
      const l = { topic: o, message: a, publishedAt: Date.now(), transportType: ne.link_mode };
      this.relayer.onLinkMessageEvent(l, { sessionExists: c });
    };
    const s = this.getGlobalCore(e?.customStoragePrefix);
    if (s) try {
      return this.customStoragePrefix = s.customStoragePrefix, this.logger = s.logger, this.heartbeat = s.heartbeat, this.crypto = s.crypto, this.history = s.history, this.expirer = s.expirer, this.storage = s.storage, this.relayer = s.relayer, this.pairing = s.pairing, this.verify = s.verify, this.echoClient = s.echoClient, this.linkModeSupportedApps = s.linkModeSupportedApps, this.eventClient = s.eventClient, this.initialized = s.initialized, this.logChunkController = s.logChunkController, s;
    } catch (o) {
      console.warn("Failed to copy global core", o);
    }
    this.projectId = e?.projectId, this.relayUrl = e?.relayUrl || Pp, this.customStoragePrefix = e?.customStoragePrefix ? `:${e.customStoragePrefix}` : "";
    const r = hx({ level: typeof e?.logger == "string" && e.logger ? e.logger : t3.logger, name: la }), { logger: n, chunkLoggerController: i } = Ud({ opts: r, maxSizeInBytes: e?.maxLogBlobSizeInBytes, loggerOverride: e?.logger });
    this.logChunkController = i, this.logChunkController?.downloadLogsBlobInBrowser && (window.downloadLogsBlobInBrowser = async () => {
      this.logChunkController?.downloadLogsBlobInBrowser && this.logChunkController?.downloadLogsBlobInBrowser({ clientId: await this.crypto.getClientId() });
    }), this.logger = Ye(n, this.name), this.heartbeat = new ec(), this.crypto = new U3(this, this.logger, e?.keychain), this.history = new F3(this, this.logger), this.expirer = new H3(this, this.logger), this.storage = e?.storage ? e.storage : new rS({ ...s3, ...e?.storageOptions }), this.relayer = new z3({ core: this, logger: this.logger, relayUrl: this.relayUrl, projectId: this.projectId }), this.pairing = new j3(this, this.logger), this.verify = new K3(this, this.logger, this.storage), this.echoClient = new V3(this.projectId || "", this.logger), this.linkModeSupportedApps = [], this.eventClient = new W3(this, this.logger, e?.telemetryEnabled), this.setGlobalCore(this);
  }
  static async init(e) {
    const s = new Bp(e);
    await s.initialize();
    const r = await s.crypto.getClientId();
    return await s.storage.setItem(y3, r), s;
  }
  get context() {
    return Fe(this.logger);
  }
  async start() {
    this.initialized || await this.initialize();
  }
  async getLogsBlob() {
    return this.logChunkController?.logsToBlob({ clientId: await this.crypto.getClientId() });
  }
  async addLinkModeSupportedApp(e) {
    this.linkModeSupportedApps.includes(e) || (this.linkModeSupportedApps.push(e), await this.storage.setItem(Mh, this.linkModeSupportedApps));
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.crypto.init(), await this.history.init(), await this.expirer.init(), await this.relayer.init(), await this.heartbeat.init(), await this.pairing.init(), this.linkModeSupportedApps = await this.storage.getItem(Mh) || [], this.initialized = !0, this.logger.info("Core Initialization Success");
    } catch (e) {
      throw this.logger.warn(e, `Core Initialization Failure at epoch ${Date.now()}`), this.logger.error(e.message), e;
    }
  }
  getGlobalCore(e = "") {
    try {
      if (this.isGlobalCoreDisabled()) return;
      const s = `_walletConnectCore_${e}`, r = `${s}_count`;
      return globalThis[r] = (globalThis[r] || 0) + 1, globalThis[r] > 1 && console.warn(`WalletConnect Core is already initialized. This is probably a mistake and can lead to unexpected behavior. Init() was called ${globalThis[r]} times.`), globalThis[s];
    } catch (s) {
      console.warn("Failed to get global WalletConnect core", s);
      return;
    }
  }
  setGlobalCore(e) {
    try {
      if (this.isGlobalCoreDisabled()) return;
      const s = `_walletConnectCore_${e.opts?.customStoragePrefix || ""}`;
      globalThis[s] = e;
    } catch (s) {
      console.warn("Failed to set global WalletConnect core", s);
    }
  }
  isGlobalCoreDisabled() {
    try {
      return typeof process < "u" && process.env.DISABLE_GLOBAL_CORE === "true";
    } catch {
      return !0;
    }
  }
};
const Y3 = G3, Rp = "wc", Cp = 2, Np = "client", lc = `${Rp}@${Cp}:${Np}:`, Io = { name: Np, logger: "error" }, Lh = "WALLETCONNECT_DEEPLINK_CHOICE", Z3 = "proposal", kh = "Proposal expired", X3 = "session", tr = k.SEVEN_DAYS, J3 = "engine", _e = { wc_sessionPropose: { req: { ttl: k.FIVE_MINUTES, prompt: !0, tag: 1100 }, res: { ttl: k.FIVE_MINUTES, prompt: !1, tag: 1101 }, reject: { ttl: k.FIVE_MINUTES, prompt: !1, tag: 1120 }, autoReject: { ttl: k.FIVE_MINUTES, prompt: !1, tag: 1121 } }, wc_sessionSettle: { req: { ttl: k.FIVE_MINUTES, prompt: !1, tag: 1102 }, res: { ttl: k.FIVE_MINUTES, prompt: !1, tag: 1103 } }, wc_sessionUpdate: { req: { ttl: k.ONE_DAY, prompt: !1, tag: 1104 }, res: { ttl: k.ONE_DAY, prompt: !1, tag: 1105 } }, wc_sessionExtend: { req: { ttl: k.ONE_DAY, prompt: !1, tag: 1106 }, res: { ttl: k.ONE_DAY, prompt: !1, tag: 1107 } }, wc_sessionRequest: { req: { ttl: k.FIVE_MINUTES * 3, prompt: !0, tag: 1108 }, res: { ttl: k.FIVE_MINUTES * 3, prompt: !1, tag: 1109 } }, wc_sessionEvent: { req: { ttl: k.FIVE_MINUTES, prompt: !0, tag: 1110 }, res: { ttl: k.FIVE_MINUTES, prompt: !1, tag: 1111 } }, wc_sessionDelete: { req: { ttl: k.ONE_DAY, prompt: !1, tag: 1112 }, res: { ttl: k.ONE_DAY, prompt: !1, tag: 1113 } }, wc_sessionPing: { req: { ttl: k.ONE_DAY, prompt: !1, tag: 1114 }, res: { ttl: k.ONE_DAY, prompt: !1, tag: 1115 } }, wc_sessionAuthenticate: { req: { ttl: k.ONE_HOUR, prompt: !0, tag: 1116 }, res: { ttl: k.ONE_HOUR, prompt: !1, tag: 1117 }, reject: { ttl: k.FIVE_MINUTES, prompt: !1, tag: 1118 }, autoReject: { ttl: k.FIVE_MINUTES, prompt: !1, tag: 1119 } } }, So = { min: k.FIVE_MINUTES, max: k.SEVEN_DAYS }, mt = { idle: "IDLE", active: "ACTIVE" }, Q3 = { eth_sendTransaction: { key: "" }, eth_sendRawTransaction: { key: "" }, wallet_sendCalls: { key: "" }, solana_signTransaction: { key: "signature" }, solana_signAllTransactions: { key: "transactions" }, solana_signAndSendTransaction: { key: "signature" }, sui_signAndExecuteTransaction: { key: "digest" }, sui_signTransaction: { key: "" }, hedera_signAndExecuteTransaction: { key: "transactionId" }, hedera_executeTransaction: { key: "transactionId" }, near_signTransaction: { key: "" }, near_signTransactions: { key: "" }, tron_signTransaction: { key: "txID" }, xrpl_signTransaction: { key: "" }, xrpl_signTransactionFor: { key: "" }, algo_signTxn: { key: "" }, sendTransfer: { key: "txid" }, stacks_stxTransfer: { key: "txId" }, polkadot_signTransaction: { key: "" }, cosmos_signDirect: { key: "" }, canton_prepareSignExecute: { key: "" }, stellar_signXDR: { key: "" }, stellar_signAndSubmitXDR: { key: "tx_hash" } }, e8 = "request", t8 = ["wc_sessionPropose", "wc_sessionRequest", "wc_authRequest", "wc_sessionAuthenticate"], s8 = "wc", r8 = "auth", n8 = "authKeys", i8 = "pairingTopics", o8 = "requests", Bi = `${s8}@${1.5}:${r8}:`, as = `${Bi}:PUB_KEY`;
class a8 extends yS {
  constructor(e) {
    super(e), this.name = J3, this.events = new wa(), this.initialized = !1, this.requestQueue = { state: mt.idle, queue: [] }, this.sessionRequestQueue = { state: mt.idle, queue: [] }, this.emittedSessionRequests = new Mx({ limit: 500 }), this.requestQueueDelay = k.ONE_SECOND, this.expectedPairingMethodMap = /* @__PURE__ */ new Map(), this.recentlyDeletedMap = /* @__PURE__ */ new Map(), this.recentlyDeletedLimit = 200, this.relayMessageCache = [], this.pendingSessions = /* @__PURE__ */ new Map(), this.init = async () => {
      this.initialized || (await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.registerPairingEvents(), this.registerSubscriptionCleanup(), await this.registerLinkModeListeners(), this.client.core.pairing.register({ methods: Object.keys(_e) }), this.initialized = !0, setTimeout(async () => {
        await this.processPendingMessageEvents(), this.sessionRequestQueue.queue = this.getPendingSessionRequests(), this.processSessionRequestQueue();
      }, k.toMiliseconds(this.requestQueueDelay)));
    }, this.connect = async (s) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      const r = { ...s, requiredNamespaces: s.requiredNamespaces || {}, optionalNamespaces: s.optionalNamespaces || {} };
      await this.isValidConnect(r), r.optionalNamespaces = N_(r.requiredNamespaces, r.optionalNamespaces), r.requiredNamespaces = {};
      const { pairingTopic: n, requiredNamespaces: i, optionalNamespaces: o, sessionProperties: a, scopedProperties: c, relays: l, authentication: u, walletPay: h } = r, f = u?.[0]?.ttl || _e.wc_sessionPropose.req.ttl || k.FIVE_MINUTES;
      this.validateRequestExpiry(f);
      let d = n, g, w = !1;
      try {
        if (d) {
          const C = this.client.core.pairing.pairings.get(d);
          this.client.logger.warn("connect() with existing pairing topic is deprecated and will be removed in the next major release."), w = C.active;
        }
      } catch (C) {
        throw this.client.logger.error(`connect() -> pairing.get(${d}) failed`), C;
      }
      if (!d || !w) {
        const { topic: C, uri: O } = await this.client.core.pairing.create({ internal: { skipSubscribe: !0 } });
        d = C, g = O;
      }
      if (!d) {
        const { message: C } = j("NO_MATCHING_KEY", `connect() pairing topic: ${d}`);
        throw new Error(C);
      }
      const m = await this.client.core.crypto.generateKeyPair(), S = ue(f), T = { requiredNamespaces: i, optionalNamespaces: o, relays: l ?? [{ protocol: Op }], proposer: { publicKey: m, metadata: this.client.metadata }, expiryTimestamp: S, pairingTopic: d, ...a && { sessionProperties: a }, ...c && { scopedProperties: c }, id: vt(), ...(u || h) && { requests: { authentication: u?.map((C) => {
        const { domain: O, chains: z, nonce: M, uri: N, exp: _, nbf: A, type: p, statement: y, requestId: b, resources: I, signatureTypes: v } = C;
        return { domain: O, chains: z, nonce: M, type: p ?? "caip122", aud: N, version: "1", iat: (/* @__PURE__ */ new Date()).toISOString(), exp: _, nbf: A, statement: y, requestId: b, resources: I, signatureTypes: v };
      }), walletPay: h } } }, E = te("session_connect", T.id), { reject: D, resolve: $, done: R } = As(f, kh), B = ({ id: C }) => {
        if (C === T.id) {
          this.client.events.off("proposal_expire", B);
          const O = this.pendingSessions.get(T.id);
          if (O) {
            const { sessionTopic: z, publicKey: M } = O;
            Promise.all([this.client.core.relayer.unsubscribe(z), this.client.core.crypto.keychain.has(z) ? this.client.core.crypto.deleteSymKey(z) : Promise.resolve(), this.client.core.crypto.keychain.has(M) ? this.client.core.crypto.deleteKeyPair(M) : Promise.resolve()]).catch((N) => this.client.logger.warn(N));
          }
          this.pendingSessions.delete(T.id), this.events.emit(E, { error: { message: kh, code: 0 } });
        }
      };
      return this.client.events.on("proposal_expire", B), this.events.once(E, ({ error: C, session: O }) => {
        this.client.events.off("proposal_expire", B), C ? D(C) : O && $(O);
      }), await this.setProposal(T.id, T), await this.sendProposeSession({ proposal: T, publishOpts: { internal: { throwOnFailedPublish: !0 }, tvf: { correlationId: T.id } } }).catch((C) => {
        throw this.deleteProposal(T.id), C;
      }), { uri: g, approval: R };
    }, this.pair = async (s) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        return await this.client.core.pairing.pair(s);
      } catch (r) {
        throw this.client.logger.error("pair() failed"), r;
      }
    }, this.approve = async (s) => {
      const r = this.client.core.eventClient.createEvent({ properties: { topic: s?.id?.toString(), trace: [ct.session_approve_started] } });
      try {
        this.isInitialized(), await this.confirmOnlineStateOrThrow();
      } catch (B) {
        throw r.setError(Ss.no_internet_connection), B;
      }
      try {
        await this.isValidProposalId(s?.id);
      } catch (B) {
        throw this.client.logger.error(`approve() -> proposal.get(${s?.id}) failed`), r.setError(Ss.proposal_not_found), B;
      }
      try {
        await this.isValidApprove(s);
      } catch (B) {
        throw this.client.logger.error("approve() -> isValidApprove() failed"), r.setError(Ss.session_approve_namespace_validation_failure), B;
      }
      const { id: n, relayProtocol: i, namespaces: o, sessionProperties: a, scopedProperties: c, sessionConfig: l, proposalRequestsResponses: u } = s, h = this.client.proposal.get(n);
      this.client.core.eventClient.deleteEvent({ eventId: r.eventId });
      const { pairingTopic: f, proposer: d, requiredNamespaces: g, optionalNamespaces: w } = h;
      let m = this.client.core.eventClient?.getEvent({ topic: f });
      m || (m = this.client.core.eventClient?.createEvent({ type: ct.session_approve_started, properties: { topic: f, trace: [ct.session_approve_started, ct.session_namespaces_validation_success] } }));
      const S = await this.client.core.crypto.generateKeyPair(), T = d.publicKey, E = await this.client.core.crypto.generateSharedKey(S, T), D = { relay: { protocol: i ?? "irn" }, namespaces: o, controller: { publicKey: S, metadata: this.client.metadata }, expiry: ue(tr), ...a && { sessionProperties: a }, ...c && { scopedProperties: c }, ...l && { sessionConfig: l }, proposalRequestsResponses: u }, $ = ne.relay;
      m.addTrace(ct.subscribing_session_topic);
      try {
        await this.client.core.relayer.subscribe(E, { transportType: $, internal: { skipSubscribe: !0 } });
      } catch (B) {
        throw m.setError(Ss.subscribe_session_topic_failure), B;
      }
      m.addTrace(ct.subscribe_session_topic_success);
      const R = { ...D, topic: E, requiredNamespaces: g, optionalNamespaces: w, pairingTopic: f, acknowledged: !1, self: D.controller, peer: { publicKey: d.publicKey, metadata: d.metadata }, controller: S, transportType: ne.relay, authentication: u?.authentication, walletPayResult: u?.walletPay };
      await this.client.session.set(E, R), m.addTrace(ct.store_session);
      try {
        await this.sendApproveSession({ sessionTopic: E, proposal: h, pairingProposalResponse: { relay: { protocol: i ?? "irn" }, responderPublicKey: S }, sessionSettleRequest: D, publishOpts: { internal: { throwOnFailedPublish: !0 }, tvf: { correlationId: n, ...this.getTVFApproveParams(R) } } }), m.addTrace(ct.session_approve_publish_success);
      } catch (B) {
        throw this.client.logger.error(B), this.client.session.delete(E, se("USER_DISCONNECTED")), await this.client.core.relayer.unsubscribe(E), B;
      }
      return this.client.core.eventClient.deleteEvent({ eventId: m.eventId }), await this.client.core.pairing.updateMetadata({ topic: f, metadata: d.metadata }), await this.deleteProposal(n), await this.client.core.pairing.activate({ topic: f }), await this.setExpiry(E, ue(tr)), { topic: E, acknowledged: () => Promise.resolve(this.client.session.get(E)) };
    }, this.reject = async (s) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidReject(s);
      } catch (o) {
        throw this.client.logger.error("reject() -> isValidReject() failed"), o;
      }
      const { id: r, reason: n } = s;
      let i;
      try {
        i = this.client.proposal.get(r).pairingTopic;
      } catch (o) {
        throw this.client.logger.error(`reject() -> proposal.get(${r}) failed`), o;
      }
      i && await this.sendError({ id: r, topic: i, error: n, rpcOpts: _e.wc_sessionPropose.reject }), await this.deleteProposal(r);
    }, this.update = async (s) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidUpdate(s);
      } catch (f) {
        throw this.client.logger.error("update() -> isValidUpdate() failed"), f;
      }
      const { topic: r, namespaces: n } = s, i = this.client.session.get(r);
      if (i.self.publicKey !== i.controller) {
        const { message: f } = se("UNAUTHORIZED_UPDATE_REQUEST");
        throw new Error(f);
      }
      const { done: o, resolve: a, reject: c } = As(k.FIVE_MINUTES, "Session update request expired without receiving any acknowledgement"), l = vt(), u = ds().toString(), h = this.client.session.get(r).namespaces;
      return this.events.once(te("session_update", l), ({ error: f }) => {
        f ? c(f) : a();
      }), await this.client.session.update(r, { namespaces: n }), await this.sendRequest({ topic: r, method: "wc_sessionUpdate", params: { namespaces: n }, throwOnFailedPublish: !0, clientRpcId: l, relayRpcId: u }).catch((f) => {
        this.client.logger.error(f), this.client.session.update(r, { namespaces: h }), c(f);
      }), { acknowledged: o };
    }, this.extend = async (s) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidExtend(s);
      } catch (c) {
        throw this.client.logger.error("extend() -> isValidExtend() failed"), c;
      }
      const { topic: r } = s, n = vt(), { done: i, resolve: o, reject: a } = As(k.FIVE_MINUTES, "Session extend request expired without receiving any acknowledgement");
      return this.events.once(te("session_extend", n), ({ error: c }) => {
        c ? a(c) : o();
      }), await this.setExpiry(r, ue(tr)), this.sendRequest({ topic: r, method: "wc_sessionExtend", params: {}, clientRpcId: n, throwOnFailedPublish: !0 }).catch((c) => {
        a(c);
      }), { acknowledged: i };
    }, this.request = async (s) => {
      this.isInitialized();
      try {
        await this.isValidRequest(s);
      } catch (m) {
        throw this.client.logger.error("request() -> isValidRequest() failed"), m;
      }
      const { chainId: r, request: n, topic: i, expiry: o = _e.wc_sessionRequest.req.ttl } = s, a = this.client.session.get(i);
      a?.transportType === ne.relay && await this.confirmOnlineStateOrThrow();
      const c = vt(), l = ds().toString(), { done: u, resolve: h, reject: f } = As(o, "Request expired. Please try again.");
      this.events.once(te("session_request", c), ({ error: m, result: S }) => {
        m ? f(m) : h(S);
      });
      const d = "wc_sessionRequest", g = this.getAppLinkIfEnabled(a.peer.metadata, a.transportType);
      if (g) return await this.sendRequest({ clientRpcId: c, relayRpcId: l, topic: i, method: d, params: { request: { ...n, expiryTimestamp: ue(o) }, chainId: r }, expiry: o, throwOnFailedPublish: !0, appLink: g }).catch((m) => f(m)), this.client.events.emit("session_request_sent", { topic: i, request: n, chainId: r, id: c }), await u();
      const w = { request: { ...n, expiryTimestamp: ue(o) }, chainId: r };
      return await Promise.all([new Promise(async (m) => {
        await this.sendRequest({ clientRpcId: c, relayRpcId: l, topic: i, method: d, params: w, expiry: o, throwOnFailedPublish: !0, tvf: this.getTVFParams(c, w) }).catch((S) => f(S)), this.client.events.emit("session_request_sent", { topic: i, request: n, chainId: r, id: c }), m();
      }), new Promise(async (m) => {
        if (!a.sessionConfig?.disableDeepLink) {
          const S = await Bx(this.client.core.storage, Lh);
          await Ox({ id: c, topic: i, wcDeepLink: S });
        }
        m();
      }), u()]).then((m) => m[2]);
    }, this.respond = async (s) => {
      this.isInitialized();
      const r = this.client.core.eventClient.createEvent({ properties: { topic: s?.topic || s?.response?.id?.toString(), trace: [ct.session_request_response_started] } });
      try {
        await this.isValidRespond(s);
      } catch (l) {
        throw r.addTrace(l?.message), r.setError(Ss.session_request_response_validation_failure), l;
      }
      r.addTrace(ct.session_request_response_validation_success);
      const { topic: n, response: i } = s, { id: o } = i, a = this.client.session.get(n);
      a.transportType === ne.relay && await this.confirmOnlineStateOrThrow();
      const c = this.getAppLinkIfEnabled(a.peer.metadata, a.transportType);
      try {
        r.addTrace(ct.session_request_response_publish_started), Et(i) ? await this.sendResult({ id: o, topic: n, result: i.result, throwOnFailedPublish: !0, appLink: c }) : tt(i) && await this.sendError({ id: o, topic: n, error: i.error, appLink: c }), this.cleanupAfterResponse(s);
      } catch (l) {
        throw r.addTrace(l?.message), r.setError(Ss.session_request_response_publish_failure), l;
      }
    }, this.ping = async (s) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidPing(s);
      } catch (n) {
        throw this.client.logger.error("ping() -> isValidPing() failed"), n;
      }
      const { topic: r } = s;
      if (this.client.session.keys.includes(r)) {
        const n = vt(), i = ds().toString(), { done: o, resolve: a, reject: c } = As(k.FIVE_MINUTES, "Ping request expired without receiving any acknowledgement");
        this.events.once(te("session_ping", n), ({ error: l }) => {
          l ? c(l) : a();
        }), await Promise.all([this.sendRequest({ topic: r, method: "wc_sessionPing", params: {}, throwOnFailedPublish: !0, clientRpcId: n, relayRpcId: i }), o()]);
      } else this.client.core.pairing.pairings.keys.includes(r) && (this.client.logger.warn("ping() on pairing topic is deprecated and will be removed in the next major release."), await this.client.core.pairing.ping({ topic: r }));
    }, this.emit = async (s) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidEmit(s);
      const { topic: r, event: n, chainId: i } = s, o = ds().toString(), a = vt();
      await this.sendRequest({ topic: r, method: "wc_sessionEvent", params: { event: n, chainId: i }, throwOnFailedPublish: !0, relayRpcId: o, clientRpcId: a });
    }, this.disconnect = async (s) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidDisconnect(s);
      const { topic: r } = s;
      if (this.client.session.keys.includes(r)) await this.sendRequest({ topic: r, method: "wc_sessionDelete", params: se("USER_DISCONNECTED"), throwOnFailedPublish: !0 }), await this.deleteSession({ topic: r, emitEvent: !1 });
      else if (this.client.core.pairing.pairings.keys.includes(r)) await this.client.core.pairing.disconnect({ topic: r });
      else {
        const { message: n } = j("MISMATCHED_TOPIC", `Session or pairing topic not found: ${r}`);
        throw new Error(n);
      }
    }, this.find = (s) => (this.isInitialized(), this.client.session.getAll().filter((r) => U_(r, s))), this.getPendingSessionRequests = () => this.client.pendingRequest.getAll(), this.authenticate = async (s, r) => {
      this.isInitialized(), this.isValidAuthenticate(s);
      const n = r && this.client.core.linkModeSupportedApps.includes(r) && this.client.metadata.redirect?.linkMode, i = n ? ne.link_mode : ne.relay;
      i === ne.relay && await this.confirmOnlineStateOrThrow();
      const { chains: o, statement: a = "", uri: c, domain: l, nonce: u, type: h, exp: f, nbf: d, methods: g = [], expiry: w } = s, m = [...s.resources || []], { topic: S, uri: T } = await this.client.core.pairing.create({ methods: ["wc_sessionAuthenticate"], transportType: i });
      if (this.client.logger.info({ message: "Generated new pairing", pairing: { topic: S, uri: T } }), this.client.auth.authKeys.keys.includes(as)) {
        const { responseTopic: v, publicKey: x } = this.client.auth.authKeys.get(as);
        v && (await this.client.core.relayer.unsubscribe(v).catch((P) => this.client.logger.warn(P)), await this.client.auth.pairingTopics.delete(v, { message: "replaced", code: 0 }).catch((P) => this.client.logger.warn(P))), x && this.client.core.crypto.keychain.has(x) && await this.client.core.crypto.deleteKeyPair(x);
      }
      const E = await this.client.core.crypto.generateKeyPair(), D = Mn(E);
      if (await Promise.all([this.client.auth.authKeys.set(as, { responseTopic: D, publicKey: E }), this.client.auth.pairingTopics.set(D, { topic: D, pairingTopic: S })]), await this.client.core.relayer.subscribe(D, { transportType: i }), this.client.logger.info(`sending request to new pairing topic: ${S}`), g.length > 0) {
        const { namespace: v } = Gt(o[0]);
        let x = u_(v, "request", g);
        Un(m) && (x = d_(x, m.pop())), m.push(x);
      }
      const $ = w && w > _e.wc_sessionAuthenticate.req.ttl ? w : _e.wc_sessionAuthenticate.req.ttl, R = { authPayload: { type: h ?? "caip122", chains: o, statement: a, aud: c, domain: l, version: "1", nonce: u, iat: (/* @__PURE__ */ new Date()).toISOString(), exp: f, nbf: d, resources: m }, requester: { publicKey: E, metadata: this.client.metadata }, expiryTimestamp: ue($) }, B = { eip155: { chains: o, methods: [.../* @__PURE__ */ new Set(["personal_sign", ...g])], events: ["chainChanged", "accountsChanged"] } }, C = { requiredNamespaces: {}, optionalNamespaces: B, relays: [{ protocol: "irn" }], pairingTopic: S, proposer: { publicKey: E, metadata: this.client.metadata }, expiryTimestamp: ue(_e.wc_sessionPropose.req.ttl), id: vt() }, { done: O, resolve: z, reject: M } = As($, "Request expired"), N = vt(), _ = te("session_connect", C.id), A = te("session_request", N), p = async ({ error: v, session: x }) => {
        this.events.off(A, b), v ? M(v) : x && z({ session: x });
      }, y = async (v) => {
        if (await this.deletePendingAuthRequest(N, { message: "fulfilled", code: 0 }), v.error) {
          const K = se("WC_METHOD_UNSUPPORTED", "wc_sessionAuthenticate");
          return v.error.code === K.code ? void 0 : (this.events.off(_, p), M(v.error.message));
        }
        await this.deleteProposal(C.id), this.events.off(_, p);
        const { cacaos: x, responder: P } = v.result, U = [], F = [];
        for (const K of x) {
          if (!await nh({ cacao: K, projectId: this.client.core.projectId })) return this.client.logger.error(K, "Signature verification failed"), M(se("SESSION_SETTLEMENT_FAILED", "Signature verification failed"));
          const W = o_({ cacao: K, request: R.authPayload });
          if (!W.valid) return this.client.logger.error(K, `Cacao does not match the request: ${W.reason}`), M(se("SESSION_SETTLEMENT_FAILED", `Cacao does not match the request: ${W.reason}`));
          const { p: Y } = K, V = Un(Y.resources), J = [ni(Y.iss)], le = ii(Y.iss);
          if (V) {
            const he = ih(V), we = oh(V);
            U.push(...he), J.push(...we);
          }
          for (const he of J) F.push(`${he}:${le}`);
        }
        const L = await this.client.core.crypto.generateSharedKey(E, P.publicKey);
        let q;
        U.length > 0 && (q = { topic: L, acknowledged: !0, self: { publicKey: E, metadata: this.client.metadata }, peer: P, controller: P.publicKey, expiry: ue(tr), requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: S, namespaces: dh([...new Set(U)], [...new Set(F)]), transportType: i }, await this.client.core.relayer.subscribe(L, { transportType: i }), await this.client.session.set(L, q), S && await this.client.core.pairing.updateMetadata({ topic: S, metadata: P.metadata }), q = this.client.session.get(L)), this.client.metadata.redirect?.linkMode && P.metadata.redirect?.linkMode && P.metadata.redirect?.universal && r && (this.client.core.addLinkModeSupportedApp(P.metadata.redirect.universal), this.client.session.update(L, { transportType: ne.link_mode })), z({ auths: x, session: q });
      }, b = (v) => y(v).catch((x) => {
        this.client.logger.error(x, "Failed to process authenticate response"), M(se("SESSION_SETTLEMENT_FAILED", x?.message || "Failed to process authenticate response"));
      });
      this.events.once(_, p), this.events.once(A, b);
      let I;
      try {
        if (n) {
          const v = ft("wc_sessionAuthenticate", R, N);
          this.client.core.history.set(S, v);
          const x = await this.client.core.crypto.encode("", v, { type: Hs, encoding: _t });
          I = An(r, S, x);
        } else await Promise.all([this.sendRequest({ topic: S, method: "wc_sessionAuthenticate", params: R, expiry: s.expiry, throwOnFailedPublish: !0, clientRpcId: N }), this.sendRequest({ topic: S, method: "wc_sessionPropose", params: C, expiry: _e.wc_sessionPropose.req.ttl, throwOnFailedPublish: !0, clientRpcId: C.id })]);
      } catch (v) {
        throw this.events.off(_, p), this.events.off(A, b), v;
      }
      return await this.setProposal(C.id, C), await this.setAuthRequest(N, { request: { ...R, verifyContext: {} }, pairingTopic: S, transportType: i }), { uri: I ?? T, response: O };
    }, this.approveSessionAuthenticate = async (s) => {
      const { id: r, auths: n } = s, i = this.client.core.eventClient.createEvent({ properties: { topic: r.toString(), trace: [Ds.authenticated_session_approve_started] } });
      try {
        this.isInitialized();
      } catch (m) {
        throw i.setError(Pr.no_internet_connection), m;
      }
      const o = this.getPendingAuthRequest(r);
      if (!o) throw i.setError(Pr.authenticated_session_pending_request_not_found), new Error(`Could not find pending auth request with id ${r}`);
      const a = o.transportType || ne.relay;
      a === ne.relay && await this.confirmOnlineStateOrThrow();
      const c = o.requester.publicKey, l = await this.client.core.crypto.generateKeyPair(), u = Mn(c), h = { type: Yt, receiverPublicKey: c, senderPublicKey: l }, f = [], d = [];
      for (const m of n) {
        if (!await nh({ cacao: m, projectId: this.client.core.projectId })) {
          i.setError(Pr.invalid_cacao);
          const $ = se("SESSION_SETTLEMENT_FAILED", "Signature verification failed");
          throw await this.sendError({ id: r, topic: u, error: $, encodeOpts: h }), new Error($.message);
        }
        i.addTrace(Ds.cacaos_verified);
        const { p: S } = m, T = Un(S.resources), E = [ni(S.iss)], D = ii(S.iss);
        if (T) {
          const $ = ih(T), R = oh(T);
          f.push(...$), E.push(...R);
        }
        for (const $ of E) d.push(`${$}:${D}`);
      }
      const g = await this.client.core.crypto.generateSharedKey(l, c);
      i.addTrace(Ds.create_authenticated_session_topic);
      let w;
      if (f?.length > 0) {
        w = { topic: g, acknowledged: !0, self: { publicKey: l, metadata: this.client.metadata }, peer: { publicKey: c, metadata: o.requester.metadata }, controller: c, expiry: ue(tr), authentication: n, requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: o.pairingTopic, namespaces: dh([...new Set(f)], [...new Set(d)]), transportType: a }, i.addTrace(Ds.subscribing_authenticated_session_topic);
        try {
          await this.client.core.relayer.subscribe(g, { transportType: a });
        } catch (m) {
          throw i.setError(Pr.subscribe_authenticated_session_topic_failure), m;
        }
        i.addTrace(Ds.subscribe_authenticated_session_topic_success), await this.client.session.set(g, w), i.addTrace(Ds.store_authenticated_session), await this.client.core.pairing.updateMetadata({ topic: o.pairingTopic, metadata: o.requester.metadata });
      }
      i.addTrace(Ds.publishing_authenticated_session_approve);
      try {
        await this.sendResult({ topic: u, id: r, result: { cacaos: n, responder: { publicKey: l, metadata: this.client.metadata } }, encodeOpts: h, throwOnFailedPublish: !0, appLink: this.getAppLinkIfEnabled(o.requester.metadata, a) });
      } catch (m) {
        throw i.setError(Pr.authenticated_session_approve_publish_failure), m;
      }
      return await this.client.auth.requests.delete(r, { message: "fulfilled", code: 0 }), await this.client.core.pairing.activate({ topic: o.pairingTopic }), this.client.core.eventClient.deleteEvent({ eventId: i.eventId }), { session: w };
    }, this.rejectSessionAuthenticate = async (s) => {
      this.isInitialized();
      const { id: r, reason: n } = s, i = this.getPendingAuthRequest(r);
      if (!i) throw new Error(`Could not find pending auth request with id ${r}`);
      i.transportType === ne.relay && await this.confirmOnlineStateOrThrow();
      const o = i.requester.publicKey, a = await this.client.core.crypto.generateKeyPair(), c = Mn(o), l = { type: Yt, receiverPublicKey: o, senderPublicKey: a };
      await this.sendError({ id: r, topic: c, error: n, encodeOpts: l, rpcOpts: _e.wc_sessionAuthenticate.reject, appLink: this.getAppLinkIfEnabled(i.requester.metadata, i.transportType) }), await this.client.auth.requests.delete(r, { message: "rejected", code: 0 }), await this.deleteProposal(r);
    }, this.formatAuthMessage = (s) => {
      this.isInitialized();
      const { request: r, iss: n } = s;
      return Kd(r, n);
    }, this.processRelayMessageCache = () => {
      setTimeout(async () => {
        if (this.relayMessageCache.length !== 0) for (; this.relayMessageCache.length > 0; ) try {
          const s = this.relayMessageCache.shift();
          s && await this.onRelayMessage(s);
        } catch (s) {
          this.client.logger.error(s);
        }
      }, 50);
    }, this.cleanupDuplicatePairings = async (s) => {
      if (s.pairingTopic) try {
        const r = this.client.core.pairing.pairings.get(s.pairingTopic), n = this.client.core.pairing.pairings.getAll().filter((i) => i.peerMetadata?.url && i.peerMetadata?.url === s.peer.metadata.url && i.topic && i.topic !== r.topic);
        if (n.length === 0) return;
        this.client.logger.info(`Cleaning up ${n.length} duplicate pairing(s)`), await Promise.all(n.map((i) => this.client.core.pairing.disconnect({ topic: i.topic }))), this.client.logger.info("Duplicate pairings clean up finished");
      } catch (r) {
        this.client.logger.error(r);
      }
    }, this.deleteSession = async (s) => {
      const { topic: r, expirerHasDeleted: n = !1, emitEvent: i = !0, id: o = 0 } = s, { self: a } = this.client.session.get(r);
      await this.client.core.relayer.unsubscribe(r), await this.client.session.delete(r, se("USER_DISCONNECTED")), this.addToRecentlyDeleted(r, "session"), this.client.core.crypto.keychain.has(a.publicKey) && await this.client.core.crypto.deleteKeyPair(a.publicKey), this.client.core.crypto.keychain.has(r) && await this.client.core.crypto.deleteSymKey(r), n || this.client.core.expirer.del(r), this.client.core.storage.removeItem(Lh).catch((c) => this.client.logger.warn(c)), r === this.sessionRequestQueue.queue[0]?.topic && (this.sessionRequestQueue.state = mt.idle), await Promise.all(this.getPendingSessionRequests().filter((c) => c.topic === r).map((c) => this.deletePendingSessionRequest(c.id, se("USER_DISCONNECTED")))), i && this.client.events.emit("session_delete", { id: o, topic: r });
    }, this.deleteProposal = async (s, r) => {
      if (r) try {
        const n = this.client.proposal.get(s);
        this.client.core.eventClient.getEvent({ topic: n.pairingTopic })?.setError(Ss.proposal_expired);
      } catch {
      }
      await Promise.all([this.client.proposal.delete(s, se("USER_DISCONNECTED")), r ? Promise.resolve() : this.client.core.expirer.del(s)]), this.addToRecentlyDeleted(s, "proposal");
    }, this.deletePendingSessionRequest = async (s, r, n = !1) => {
      await Promise.all([this.client.pendingRequest.delete(s, r), n ? Promise.resolve() : this.client.core.expirer.del(s)]), this.addToRecentlyDeleted(s, "request"), this.sessionRequestQueue.queue = this.sessionRequestQueue.queue.filter((i) => i.id !== s), n && (this.sessionRequestQueue.state = mt.idle, this.client.events.emit("session_request_expire", { id: s }));
    }, this.deletePendingAuthRequest = async (s, r, n = !1) => {
      await Promise.all([this.client.auth.requests.delete(s, r), n ? Promise.resolve() : this.client.core.expirer.del(s)]);
    }, this.setExpiry = async (s, r) => {
      this.client.session.keys.includes(s) && (this.client.core.expirer.set(s, r), await this.client.session.update(s, { expiry: r }));
    }, this.setProposal = async (s, r) => {
      this.client.core.expirer.set(s, ue(_e.wc_sessionPropose.req.ttl)), await this.client.proposal.set(s, r);
    }, this.setAuthRequest = async (s, r) => {
      const { request: n, pairingTopic: i, transportType: o = ne.relay } = r;
      this.client.core.expirer.set(s, n.expiryTimestamp), await this.client.auth.requests.set(s, { authPayload: n.authPayload, requester: n.requester, expiryTimestamp: n.expiryTimestamp, id: s, pairingTopic: i, verifyContext: n.verifyContext, transportType: o });
    }, this.setPendingSessionRequest = async (s) => {
      const { id: r, topic: n, params: i, verifyContext: o } = s, a = i.request.expiryTimestamp || ue(_e.wc_sessionRequest.req.ttl);
      this.client.core.expirer.set(r, a), await this.client.pendingRequest.set(r, { id: r, topic: n, params: i, verifyContext: o });
    }, this.sendRequest = async (s) => {
      const { topic: r, method: n, params: i, expiry: o, relayRpcId: a, clientRpcId: c, throwOnFailedPublish: l, appLink: u, tvf: h, publishOpts: f = {} } = s, d = ft(n, i, c);
      let g;
      const w = !!u;
      try {
        const T = w ? _t : Ie;
        g = await this.client.core.crypto.encode(r, d, { encoding: T });
      } catch (T) {
        throw await this.cleanup(), this.client.logger.error(`sendRequest() -> core.crypto.encode() for topic ${r} failed`), T;
      }
      let m;
      if (t8.includes(n)) {
        const T = et(JSON.stringify(d)), E = et(g);
        m = await this.client.core.verify.register({ id: E, decryptedId: T });
      }
      const S = { ..._e[n].req, ...f };
      if (S.attestation = m, o && (S.ttl = o), a && (S.id = a), this.client.core.history.set(r, d), w) {
        const T = An(u, r, g);
        await globalThis.Linking.openURL(T, this.client.name);
      } else S.tvf = { ...h, correlationId: d.id }, l ? (S.internal = { ...S.internal, throwOnFailedPublish: !0 }, await this.client.core.relayer.publish(r, g, S)) : this.client.core.relayer.publish(r, g, S).catch((T) => this.client.logger.error(T));
      return d.id;
    }, this.sendProposeSession = async (s) => {
      const { proposal: r, publishOpts: n } = s, i = ft("wc_sessionPropose", r, r.id);
      this.client.core.history.set(r.pairingTopic, i);
      const o = await this.client.core.crypto.encode(r.pairingTopic, i, { encoding: Ie }), a = et(JSON.stringify(i)), c = et(o), l = await this.client.core.verify.register({ id: c, decryptedId: a });
      await this.client.core.relayer.publishCustom({ payload: { pairingTopic: r.pairingTopic, sessionProposal: o }, opts: { ...n, publishMethod: "wc_proposeSession", attestation: l } });
    }, this.sendApproveSession = async (s) => {
      const { sessionTopic: r, pairingProposalResponse: n, proposal: i, sessionSettleRequest: o, publishOpts: a } = s, c = Gr(i.id, n), l = await this.client.core.crypto.encode(i.pairingTopic, c, { encoding: Ie }), u = ft("wc_sessionSettle", o, a?.id), h = await this.client.core.crypto.encode(r, u, { encoding: Ie });
      this.client.core.history.set(r, u), await this.client.core.relayer.publishCustom({ payload: { sessionTopic: r, pairingTopic: i.pairingTopic, sessionProposalResponse: l, sessionSettlementRequest: h }, opts: { ...a, publishMethod: "wc_approveSession" } });
    }, this.sendResult = async (s) => {
      const { id: r, topic: n, result: i, throwOnFailedPublish: o, encodeOpts: a, appLink: c } = s, l = Gr(r, i);
      let u;
      const h = c && typeof globalThis?.Linking < "u";
      try {
        const g = h ? _t : Ie;
        u = await this.client.core.crypto.encode(n, l, { ...a || {}, encoding: g });
      } catch (g) {
        throw await this.cleanup(), this.client.logger.error(`sendResult() -> core.crypto.encode() for topic ${n} failed`), g;
      }
      let f, d;
      try {
        f = await this.client.core.history.get(n, r);
        const g = f.request;
        try {
          d = this.getTVFParams(r, g.params, i);
        } catch (w) {
          this.client.logger.warn(`sendResult() -> getTVFParams() failed: ${w?.message}`);
        }
      } catch (g) {
        throw this.client.logger.error(`sendResult() -> history.get(${n}, ${r}) failed`), g;
      }
      if (h) {
        const g = An(c, n, u);
        await globalThis.Linking.openURL(g, this.client.name);
      } else {
        const g = f.request.method, w = _e[g].res;
        w.tvf = { ...d, correlationId: r }, o ? (w.internal = { ...w.internal, throwOnFailedPublish: !0 }, await this.client.core.relayer.publish(n, u, w)) : this.client.core.relayer.publish(n, u, w).catch((m) => this.client.logger.error(m));
      }
      await this.client.core.history.resolve(l);
    }, this.sendError = async (s) => {
      const { id: r, topic: n, error: i, encodeOpts: o, rpcOpts: a, appLink: c } = s, l = Pi(r, i);
      let u;
      const h = c && typeof globalThis?.Linking < "u";
      try {
        const d = h ? _t : Ie;
        u = await this.client.core.crypto.encode(n, l, { ...o || {}, encoding: d });
      } catch (d) {
        throw await this.cleanup(), this.client.logger.error(`sendError() -> core.crypto.encode() for topic ${n} failed`), d;
      }
      let f;
      try {
        f = await this.client.core.history.get(n, r);
      } catch (d) {
        throw this.client.logger.error(`sendError() -> history.get(${n}, ${r}) failed`), d;
      }
      if (h) {
        const d = An(c, n, u);
        await globalThis.Linking.openURL(d, this.client.name);
      } else {
        const d = f.request.method, g = a || _e[d].res;
        this.client.core.relayer.publish(n, u, g);
      }
      await this.client.core.history.resolve(l);
    }, this.cleanup = async () => {
      const s = [], r = [];
      this.client.session.getAll().forEach((n) => {
        let i = !1;
        xt(n.expiry) && (i = !0), this.client.core.crypto.keychain.has(n.topic) || (i = !0), i && s.push(n.topic);
      }), this.client.proposal.getAll().forEach((n) => {
        xt(n.expiryTimestamp) && r.push(n.id);
      }), await Promise.all([...s.map((n) => this.deleteSession({ topic: n })), ...r.map((n) => this.deleteProposal(n))]);
    }, this.onProviderMessageEvent = async (s) => {
      !this.initialized || this.relayMessageCache.length > 0 ? this.relayMessageCache.push(s) : await this.onRelayMessage(s);
    }, this.onRelayEventRequest = async (s) => {
      this.requestQueue.queue.push(s), await this.processRequestsQueue();
    }, this.processRequestsQueue = async () => {
      if (this.requestQueue.state === mt.active) {
        this.client.logger.info("Request queue already active, skipping...");
        return;
      }
      for (this.client.logger.info(`Request queue starting with ${this.requestQueue.queue.length} requests`); this.requestQueue.queue.length > 0; ) {
        this.requestQueue.state = mt.active;
        const s = this.requestQueue.queue.shift();
        if (s) try {
          await this.processRequest(s);
        } catch (r) {
          this.client.logger.warn(r);
        }
      }
      this.requestQueue.state = mt.idle;
    }, this.processRequest = async (s) => {
      const { topic: r, payload: n, attestation: i, transportType: o, encryptedId: a } = s, c = n.method;
      if (!this.shouldIgnorePairingRequest({ topic: r, requestMethod: c })) switch (c) {
        case "wc_sessionPropose":
          return await this.onSessionProposeRequest({ topic: r, payload: n, attestation: i, encryptedId: a });
        case "wc_sessionSettle":
          return await this.onSessionSettleRequest(r, n);
        case "wc_sessionUpdate":
          return await this.onSessionUpdateRequest(r, n);
        case "wc_sessionExtend":
          return await this.onSessionExtendRequest(r, n);
        case "wc_sessionPing":
          return await this.onSessionPingRequest(r, n);
        case "wc_sessionDelete":
          return await this.onSessionDeleteRequest(r, n);
        case "wc_sessionRequest":
          return await this.onSessionRequest({ topic: r, payload: n, attestation: i, encryptedId: a, transportType: o });
        case "wc_sessionEvent":
          return await this.onSessionEventRequest(r, n);
        case "wc_sessionAuthenticate":
          return await this.onSessionAuthenticateRequest({ topic: r, payload: n, attestation: i, encryptedId: a, transportType: o });
        default:
          return this.client.logger.info(`Unsupported request method ${c}`);
      }
    }, this.onRelayEventResponse = async (s) => {
      const { topic: r, payload: n, transportType: i } = s, o = (await this.client.core.history.get(r, n.id)).request.method;
      switch (o) {
        case "wc_sessionPropose":
          return this.onSessionProposeResponse(r, n, i);
        case "wc_sessionSettle":
          return this.onSessionSettleResponse(r, n);
        case "wc_sessionUpdate":
          return this.onSessionUpdateResponse(r, n);
        case "wc_sessionExtend":
          return this.onSessionExtendResponse(r, n);
        case "wc_sessionPing":
          return this.onSessionPingResponse(r, n);
        case "wc_sessionRequest":
          return this.onSessionRequestResponse(r, n);
        case "wc_sessionAuthenticate":
          return this.onSessionAuthenticateResponse(r, n);
        default:
          return this.client.logger.info(`Unsupported response method ${o}`);
      }
    }, this.onRelayEventUnknownPayload = (s) => {
      const { topic: r } = s, { message: n } = j("MISSING_OR_INVALID", `Decoded payload on topic ${r} is not identifiable as a JSON-RPC request or a response.`);
      throw new Error(n);
    }, this.shouldIgnorePairingRequest = (s) => {
      const { topic: r, requestMethod: n } = s, i = this.expectedPairingMethodMap.get(r);
      return !i || i.includes(n) ? !1 : !!(i.includes("wc_sessionAuthenticate") && this.client.events.listenerCount("session_authenticate") > 0);
    }, this.onSessionProposeRequest = async (s) => {
      const { topic: r, payload: n, attestation: i, encryptedId: o } = s, { params: a, id: c } = n;
      try {
        const l = this.client.core.eventClient.getEvent({ topic: r });
        this.client.events.listenerCount("session_proposal") === 0 && (console.warn("No listener for session_proposal event"), l?.setError(Lt.proposal_listener_not_found)), this.isValidConnect({ ...n.params });
        const u = a.expiryTimestamp || ue(_e.wc_sessionPropose.req.ttl), h = { id: c, pairingTopic: r, expiryTimestamp: u, attestation: i, encryptedId: o, ...a };
        await this.setProposal(c, h);
        const f = await this.getVerifyContext({ attestationId: i, hash: et(JSON.stringify(n)), encryptedId: o, metadata: h.proposer.metadata });
        l?.addTrace(bt.emit_session_proposal), this.client.events.emit("session_proposal", { id: c, params: h, verifyContext: f });
      } catch (l) {
        await this.sendError({ id: c, topic: r, error: l, rpcOpts: _e.wc_sessionPropose.autoReject }), this.client.logger.error(l);
      }
    }, this.onSessionProposeResponse = async (s, r, n) => {
      const { id: i } = r;
      if (Et(r)) {
        const { result: o } = r;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", result: o });
        const a = this.client.proposal.get(i);
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", proposal: a });
        const c = a.proposer.publicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", selfPublicKey: c });
        const l = o.responderPublicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", peerPublicKey: l });
        const u = await this.client.core.crypto.generateSharedKey(c, l);
        this.pendingSessions.set(i, { sessionTopic: u, pairingTopic: s, proposalId: i, publicKey: c });
        const h = await this.client.core.relayer.subscribe(u, { transportType: n });
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", subscriptionId: h }), await this.client.core.pairing.activate({ topic: s });
      } else if (tt(r)) {
        await this.deleteProposal(i);
        const o = te("session_connect", i);
        if (this.events.listenerCount(o) === 0) throw new Error(`emitting ${o} without any listeners, 954`);
        this.events.emit(o, { error: r.error });
      }
    }, this.onSessionSettleRequest = async (s, r) => {
      const { id: n, params: i } = r;
      try {
        this.isValidSessionSettleRequest(i);
        const { relay: o, controller: a, expiry: c, namespaces: l, sessionProperties: u, scopedProperties: h, sessionConfig: f, proposalRequestsResponses: d } = r.params, g = [...this.pendingSessions.values()].find((S) => S.sessionTopic === s);
        if (!g) return this.client.logger.error(`Pending session not found for topic ${s}`);
        const w = this.client.proposal.get(g.proposalId), m = { topic: s, relay: o, expiry: c, namespaces: l, acknowledged: !0, pairingTopic: g.pairingTopic, requiredNamespaces: w.requiredNamespaces, optionalNamespaces: w.optionalNamespaces, controller: a.publicKey, self: { publicKey: g.publicKey, metadata: this.client.metadata }, peer: { publicKey: a.publicKey, metadata: a.metadata }, ...u && { sessionProperties: u }, ...h && { scopedProperties: h }, ...f && { sessionConfig: f }, transportType: ne.relay, authentication: d?.authentication, walletPayResult: d?.walletPay };
        await this.client.session.set(m.topic, m), await this.setExpiry(m.topic, m.expiry), await this.client.core.pairing.updateMetadata({ topic: g.pairingTopic, metadata: m.peer.metadata }), this.pendingSessions.delete(g.proposalId), this.deleteProposal(g.proposalId, !1), this.cleanupDuplicatePairings(m), await this.sendResult({ id: r.id, topic: s, throwOnFailedPublish: !0, result: !0 }), this.client.events.emit("session_connect", { session: m }), this.events.emit(te("session_connect", g.proposalId), { session: m });
      } catch (o) {
        await this.sendError({ id: n, topic: s, error: o }), this.client.logger.error(o);
      }
    }, this.onSessionSettleResponse = async (s, r) => {
      const { id: n } = r;
      Et(r) ? (await this.client.session.update(s, { acknowledged: !0 }), this.events.emit(te("session_approve", n), {})) : tt(r) && (await this.deleteSession({ topic: s, emitEvent: !1 }), this.events.emit(te("session_approve", n), { error: r.error }));
    }, this.onSessionUpdateRequest = async (s, r) => {
      const { params: n, id: i } = r;
      try {
        const o = `${s}_session_update`, a = $r.get(o);
        if (a && this.isRequestOutOfSync(a, i)) {
          this.client.logger.warn(`Discarding out of sync request - ${i}`), this.sendError({ id: i, topic: s, error: se("INVALID_UPDATE_REQUEST") });
          return;
        }
        await this.isValidUpdate({ topic: s, ...n });
        const c = this.client.session.get(s);
        if (c.peer.publicKey !== c.controller) throw se("UNAUTHORIZED_UPDATE_REQUEST");
        try {
          $r.set(o, i), await this.client.session.update(s, { namespaces: n.namespaces }), await this.sendResult({ id: i, topic: s, result: !0 });
        } catch (l) {
          throw $r.delete(o), l;
        }
        this.client.events.emit("session_update", { id: i, topic: s, params: n });
      } catch (o) {
        await this.sendError({ id: i, topic: s, error: o }), this.client.logger.error(o);
      }
    }, this.isRequestOutOfSync = (s, r) => r.toString().slice(0, -3) < s.toString().slice(0, -3), this.onSessionUpdateResponse = (s, r) => {
      const { id: n } = r, i = te("session_update", n);
      if (this.events.listenerCount(i) === 0) throw new Error(`emitting ${i} without any listeners`);
      Et(r) ? this.events.emit(te("session_update", n), {}) : tt(r) && this.events.emit(te("session_update", n), { error: r.error });
    }, this.onSessionExtendRequest = async (s, r) => {
      const { id: n } = r;
      try {
        await this.isValidExtend({ topic: s }), await this.setExpiry(s, ue(tr)), await this.sendResult({ id: n, topic: s, result: !0 }), this.client.events.emit("session_extend", { id: n, topic: s });
      } catch (i) {
        await this.sendError({ id: n, topic: s, error: i }), this.client.logger.error(i);
      }
    }, this.onSessionExtendResponse = (s, r) => {
      const { id: n } = r, i = te("session_extend", n);
      if (this.events.listenerCount(i) === 0) throw new Error(`emitting ${i} without any listeners`);
      Et(r) ? this.events.emit(te("session_extend", n), {}) : tt(r) && this.events.emit(te("session_extend", n), { error: r.error });
    }, this.onSessionPingRequest = async (s, r) => {
      const { id: n } = r;
      try {
        this.isValidPing({ topic: s }), await this.sendResult({ id: n, topic: s, result: !0, throwOnFailedPublish: !0 }), this.client.events.emit("session_ping", { id: n, topic: s });
      } catch (i) {
        await this.sendError({ id: n, topic: s, error: i }), this.client.logger.error(i);
      }
    }, this.onSessionPingResponse = (s, r) => {
      const { id: n } = r, i = te("session_ping", n);
      setTimeout(() => {
        if (this.events.listenerCount(i) === 0) throw new Error(`emitting ${i} without any listeners 2176`);
        Et(r) ? this.events.emit(te("session_ping", n), {}) : tt(r) && this.events.emit(te("session_ping", n), { error: r.error });
      }, 500);
    }, this.onSessionDeleteRequest = async (s, r) => {
      const { id: n } = r;
      try {
        await this.isValidDisconnect({ topic: s, reason: r.params }), this.cleanupPendingSentRequestsForTopic({ topic: s, error: se("USER_DISCONNECTED") }), await this.deleteSession({ topic: s, id: n });
      } catch (i) {
        this.client.logger.error(i);
      }
    }, this.onSessionRequest = async (s) => {
      const { topic: r, payload: n, attestation: i, encryptedId: o, transportType: a } = s, { id: c, params: l } = n;
      try {
        await this.isValidRequest({ topic: r, ...l });
        const u = this.client.session.get(r), h = await this.getVerifyContext({ attestationId: i, hash: et(JSON.stringify(ft("wc_sessionRequest", l, c))), encryptedId: o, metadata: u.peer.metadata, transportType: a }), f = { id: c, topic: r, params: l, verifyContext: h };
        await this.setPendingSessionRequest(f), a === ne.link_mode && u.peer.metadata.redirect?.universal && this.client.core.addLinkModeSupportedApp(u.peer.metadata.redirect?.universal), this.client.signConfig?.disableRequestQueue ? this.emitSessionRequest(f) : (this.addSessionRequestToSessionRequestQueue(f), this.processSessionRequestQueue());
      } catch (u) {
        await this.sendError({ id: c, topic: r, error: u }), this.client.logger.error(u);
      }
    }, this.onSessionRequestResponse = (s, r) => {
      const { id: n } = r, i = te("session_request", n);
      if (this.events.listenerCount(i) === 0) throw new Error(`emitting ${i} without any listeners`);
      Et(r) ? this.events.emit(te("session_request", n), { result: r.result }) : tt(r) && this.events.emit(te("session_request", n), { error: r.error });
    }, this.onSessionEventRequest = async (s, r) => {
      const { id: n, params: i } = r;
      try {
        const o = `${s}_session_event_${i.event.name}`, a = $r.get(o);
        if (a && this.isRequestOutOfSync(a, n)) {
          this.client.logger.info(`Discarding out of sync request - ${n}`);
          return;
        }
        this.isValidEmit({ topic: s, ...i }), this.client.events.emit("session_event", { id: n, topic: s, params: i }), $r.set(o, n);
      } catch (o) {
        await this.sendError({ id: n, topic: s, error: o }), this.client.logger.error(o);
      }
    }, this.onSessionAuthenticateResponse = (s, r) => {
      const { id: n } = r;
      this.client.logger.trace({ type: "method", method: "onSessionAuthenticateResponse", topic: s, payload: r }), Et(r) ? this.events.emit(te("session_request", n), { result: r.result }) : tt(r) && this.events.emit(te("session_request", n), { error: r.error });
    }, this.onSessionAuthenticateRequest = async (s) => {
      const { topic: r, payload: n, attestation: i, encryptedId: o, transportType: a } = s;
      try {
        const { requester: c, authPayload: l, expiryTimestamp: u } = n.params, h = await this.getVerifyContext({ attestationId: i, hash: et(JSON.stringify(n)), encryptedId: o, metadata: c.metadata, transportType: a }), f = { requester: c, pairingTopic: r, id: n.id, authPayload: l, verifyContext: h, expiryTimestamp: u };
        await this.setAuthRequest(n.id, { request: f, pairingTopic: r, transportType: a }), a === ne.link_mode && c.metadata.redirect?.universal && this.client.core.addLinkModeSupportedApp(c.metadata.redirect.universal), this.client.events.emit("session_authenticate", { topic: r, params: n.params, id: n.id, verifyContext: h });
      } catch (c) {
        this.client.logger.error(c);
        const l = n.params.requester.publicKey, u = await this.client.core.crypto.generateKeyPair(), h = this.getAppLinkIfEnabled(n.params.requester.metadata, a), f = { type: Yt, receiverPublicKey: l, senderPublicKey: u };
        await this.sendError({ id: n.id, topic: r, error: c, encodeOpts: f, rpcOpts: _e.wc_sessionAuthenticate.autoReject, appLink: h });
      }
    }, this.addSessionRequestToSessionRequestQueue = (s) => {
      this.sessionRequestQueue.queue.push(s);
    }, this.cleanupAfterResponse = (s) => {
      this.deletePendingSessionRequest(s.response.id, { message: "fulfilled", code: 0 }), setTimeout(() => {
        this.sessionRequestQueue.state = mt.idle, this.processSessionRequestQueue();
      }, k.toMiliseconds(this.requestQueueDelay));
    }, this.cleanupPendingSentRequestsForTopic = ({ topic: s, error: r }) => {
      const n = this.client.core.history.pending;
      n.length > 0 && n.filter((i) => i.topic === s && i.request.method === "wc_sessionRequest").forEach((i) => {
        this.events.emit(te("session_request", i.request.id), { error: r });
      });
    }, this.processSessionRequestQueue = () => {
      if (this.sessionRequestQueue.state === mt.active) {
        this.client.logger.info("session request queue is already active.");
        return;
      }
      const s = this.sessionRequestQueue.queue[0];
      if (!s) {
        this.client.logger.info("session request queue is empty.");
        return;
      }
      try {
        this.emitSessionRequest(s);
      } catch (r) {
        this.client.logger.error(r);
      }
    }, this.emitSessionRequest = (s) => {
      if (this.emittedSessionRequests.has(s.id)) {
        this.client.logger.warn({ id: s.id }, `Skipping emitting \`session_request\` event for duplicate request. id: ${s.id}`);
        return;
      }
      this.sessionRequestQueue.state = mt.active, this.emittedSessionRequests.add(s.id), this.client.events.emit("session_request", s);
    }, this.cleanupInProgress = !1, this.cleanupOrphanedSubscriptions = async () => {
      const s = this.client.core.relayer.subscriber.topics;
      if (s.length === 0) return;
      const r = new Set(this.client.session.keys), n = new Set(this.client.core.pairing.pairings.keys), i = new Set([...this.pendingSessions.values()].map((a) => a.sessionTopic));
      let o;
      if (this.client.auth.authKeys.keys.includes(as)) {
        const { responseTopic: a } = this.client.auth.authKeys.get(as);
        o = a;
      }
      for (const a of s) if (!r.has(a) && !n.has(a) && !i.has(a) && a !== o) {
        this.client.logger.info(`Cleaning up orphaned subscriber topic: ${a}`);
        try {
          await this.client.core.relayer.subscriber.unsubscribe(a);
        } catch (c) {
          this.client.logger.warn(c, `Failed to clean up orphaned subscription: ${a}`);
        }
      }
    }, this.onPairingCreated = (s) => {
      if (s.methods && this.expectedPairingMethodMap.set(s.topic, s.methods), s.active) return;
      const r = this.client.proposal.getAll().find((n) => n.pairingTopic === s.topic);
      r && this.onSessionProposeRequest({ topic: s.topic, payload: ft("wc_sessionPropose", { ...r, requiredNamespaces: r.requiredNamespaces, optionalNamespaces: r.optionalNamespaces, relays: r.relays, proposer: r.proposer, sessionProperties: r.sessionProperties, scopedProperties: r.scopedProperties }, r.id), attestation: r.attestation, encryptedId: r.encryptedId });
    }, this.isValidConnect = async (s) => {
      if (!Le(s)) {
        const { message: l } = j("MISSING_OR_INVALID", `connect() params: ${JSON.stringify(s)}`);
        throw new Error(l);
      }
      const { pairingTopic: r, requiredNamespaces: n, optionalNamespaces: i, sessionProperties: o, scopedProperties: a, relays: c } = s;
      if (ge(r) || await this.isValidPairingTopic(r), !G_(c)) {
        const { message: l } = j("MISSING_OR_INVALID", `connect() relays: ${c}`);
        throw new Error(l);
      }
      if (n && !ge(n) && Dt(n) !== 0) {
        const l = "requiredNamespaces are deprecated and are automatically assigned to optionalNamespaces";
        ["fatal", "error", "silent"].includes(this.client.logger.level) ? console.warn(l) : this.client.logger.warn(l), this.validateNamespaces(n, "requiredNamespaces");
      }
      if (i && !ge(i) && Dt(i) !== 0 && this.validateNamespaces(i, "optionalNamespaces"), o && !ge(o) && this.validateSessionProps(o, "sessionProperties"), a && !ge(a)) {
        this.validateSessionProps(a, "scopedProperties");
        const l = Object.keys(n || {}).concat(Object.keys(i || {}));
        if (!Object.keys(a).every((u) => l.includes(u.split(":")[0]))) throw new Error(`Scoped properties must be a subset of required/optional namespaces, received: ${JSON.stringify(a)}, required/optional namespaces: ${JSON.stringify(l)}`);
      }
    }, this.validateNamespaces = (s, r) => {
      const n = W_(s, "connect()", r);
      if (n) throw new Error(n.message);
    }, this.isValidApprove = async (s) => {
      if (!Le(s)) throw new Error(j("MISSING_OR_INVALID", `approve() params: ${s}`).message);
      const { id: r, namespaces: n, relayProtocol: i, sessionProperties: o, scopedProperties: a } = s;
      this.checkRecentlyDeleted(r), await this.isValidProposalId(r);
      const c = this.client.proposal.get(r), l = mo(n, "approve()");
      if (l) throw new Error(l.message);
      const u = yh(c.requiredNamespaces, n, "approve()");
      if (u) throw new Error(u.message);
      if (!fe(i, !0)) {
        const { message: h } = j("MISSING_OR_INVALID", `approve() relayProtocol: ${i}`);
        throw new Error(h);
      }
      if (o && !ge(o) && this.validateSessionProps(o, "sessionProperties"), a && !ge(a)) {
        this.validateSessionProps(a, "scopedProperties");
        const h = new Set(Object.keys(n));
        if (!Object.keys(a).every((f) => h.has(f.split(":")[0]))) throw new Error(`Scoped properties must be a subset of approved namespaces, received: ${JSON.stringify(a)}, approved namespaces: ${Array.from(h).join(", ")}`);
      }
    }, this.isValidReject = async (s) => {
      if (!Le(s)) {
        const { message: i } = j("MISSING_OR_INVALID", `reject() params: ${s}`);
        throw new Error(i);
      }
      const { id: r, reason: n } = s;
      if (this.checkRecentlyDeleted(r), await this.isValidProposalId(r), !Z_(n)) {
        const { message: i } = j("MISSING_OR_INVALID", `reject() reason: ${JSON.stringify(n)}`);
        throw new Error(i);
      }
    }, this.isValidSessionSettleRequest = (s) => {
      if (!Le(s)) {
        const { message: l } = j("MISSING_OR_INVALID", `onSessionSettleRequest() params: ${s}`);
        throw new Error(l);
      }
      const { relay: r, controller: n, namespaces: i, expiry: o } = s;
      if (!tp(r)) {
        const { message: l } = j("MISSING_OR_INVALID", "onSessionSettleRequest() relay protocol should be a string");
        throw new Error(l);
      }
      const a = z_(n, "onSessionSettleRequest()");
      if (a) throw new Error(a.message);
      const c = mo(i, "onSessionSettleRequest()");
      if (c) throw new Error(c.message);
      if (xt(o)) {
        const { message: l } = j("EXPIRED", "onSessionSettleRequest()");
        throw new Error(l);
      }
    }, this.isValidUpdate = async (s) => {
      if (!Le(s)) {
        const { message: c } = j("MISSING_OR_INVALID", `update() params: ${s}`);
        throw new Error(c);
      }
      const { topic: r, namespaces: n } = s;
      this.checkRecentlyDeleted(r), await this.isValidSessionTopic(r);
      const i = this.client.session.get(r), o = mo(n, "update()");
      if (o) throw new Error(o.message);
      const a = yh(i.requiredNamespaces, n, "update()");
      if (a) throw new Error(a.message);
    }, this.isValidExtend = async (s) => {
      if (!Le(s)) {
        const { message: n } = j("MISSING_OR_INVALID", `extend() params: ${s}`);
        throw new Error(n);
      }
      const { topic: r } = s;
      this.checkRecentlyDeleted(r), await this.isValidSessionTopic(r);
    }, this.isValidRequest = async (s) => {
      if (!Le(s)) {
        const { message: c } = j("MISSING_OR_INVALID", `request() params: ${s}`);
        throw new Error(c);
      }
      const { topic: r, request: n, chainId: i, expiry: o } = s;
      this.checkRecentlyDeleted(r), await this.isValidSessionTopic(r);
      const { namespaces: a } = this.client.session.get(r);
      if (!gh(a, i)) {
        const { message: c } = j("MISSING_OR_INVALID", `request() chainId: ${i}`);
        throw new Error(c);
      }
      if (!X_(n)) {
        const { message: c } = j("MISSING_OR_INVALID", `request() ${JSON.stringify(n)}`);
        throw new Error(c);
      }
      if (!eI(a, i, n.method)) {
        const { message: c } = j("MISSING_OR_INVALID", `request() method: ${n.method}`);
        throw new Error(c);
      }
      this.validateRequestExpiry(o);
    }, this.isValidRespond = async (s) => {
      if (!Le(s)) {
        const { message: o } = j("MISSING_OR_INVALID", `respond() params: ${s}`);
        throw new Error(o);
      }
      const { topic: r, response: n } = s;
      try {
        await this.isValidSessionTopic(r);
      } catch (o) {
        throw s?.response?.id && this.cleanupAfterResponse(s), o;
      }
      if (!J_(n)) {
        const { message: o } = j("MISSING_OR_INVALID", `respond() response: ${JSON.stringify(n)}`);
        throw new Error(o);
      }
      const i = this.client.pendingRequest.get(n.id);
      if (i.topic !== r) {
        const { message: o } = j("MISMATCHED_TOPIC", `Request response topic mismatch. reqId: ${n.id}, expected topic: ${i.topic}, received topic: ${r}`);
        throw new Error(o);
      }
    }, this.isValidPing = async (s) => {
      if (!Le(s)) {
        const { message: n } = j("MISSING_OR_INVALID", `ping() params: ${s}`);
        throw new Error(n);
      }
      const { topic: r } = s;
      await this.isValidSessionOrPairingTopic(r);
    }, this.isValidEmit = async (s) => {
      if (!Le(s)) {
        const { message: a } = j("MISSING_OR_INVALID", `emit() params: ${s}`);
        throw new Error(a);
      }
      const { topic: r, event: n, chainId: i } = s;
      await this.isValidSessionTopic(r);
      const { namespaces: o } = this.client.session.get(r);
      if (!gh(o, i)) {
        const { message: a } = j("MISSING_OR_INVALID", `emit() chainId: ${i}`);
        throw new Error(a);
      }
      if (!Q_(n)) {
        const { message: a } = j("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(n)}`);
        throw new Error(a);
      }
      if (!tI(o, i, n.name)) {
        const { message: a } = j("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(n)}`);
        throw new Error(a);
      }
    }, this.isValidDisconnect = async (s) => {
      if (!Le(s)) {
        const { message: n } = j("MISSING_OR_INVALID", `disconnect() params: ${s}`);
        throw new Error(n);
      }
      const { topic: r } = s;
      await this.isValidSessionOrPairingTopic(r);
    }, this.isValidAuthenticate = (s) => {
      const { chains: r, uri: n, domain: i, nonce: o } = s;
      if (!Array.isArray(r) || r.length === 0) throw new Error("chains is required and must be a non-empty array");
      if (!fe(n, !1)) throw new Error("uri is required parameter");
      if (!fe(i, !1)) throw new Error("domain is required parameter");
      if (!fe(o, !1)) throw new Error("nonce is required parameter");
      if ([...new Set(r.map((c) => Gt(c).namespace))].length > 1) throw new Error("Multi-namespace requests are not supported. Please request single namespace only.");
      const { namespace: a } = Gt(r[0]);
      if (a !== "eip155") throw new Error("Only eip155 namespace is supported for authenticated sessions. Please use .connect() for non-eip155 chains.");
    }, this.getVerifyContext = async (s) => {
      const { attestationId: r, hash: n, encryptedId: i, metadata: o, transportType: a } = s, c = { verified: { verifyUrl: o.verifyUrl || qr, validation: "UNKNOWN", origin: o.url || "" } };
      try {
        if (a === ne.link_mode) {
          const u = this.getAppLinkIfEnabled(o, a);
          return c.verified.validation = u && new URL(u).origin === new URL(o.url).origin ? "VALID" : "INVALID", c;
        }
        const l = await this.client.core.verify.resolve({ attestationId: r, hash: n, encryptedId: i, verifyUrl: o.verifyUrl });
        l && (c.verified.origin = l.origin, c.verified.isScam = l.isScam, c.verified.validation = l.origin === new URL(o.url).origin ? "VALID" : "INVALID");
      } catch (l) {
        this.client.logger.warn(l);
      }
      return this.client.logger.debug(`Verify context: ${JSON.stringify(c)}`), c;
    }, this.validateSessionProps = (s, r) => {
      Object.values(s).forEach((n, i) => {
        if (n == null) {
          const { message: o } = j("MISSING_OR_INVALID", `${r} must contain an existing value for each key. Received: ${n} for key ${Object.keys(s)[i]}`);
          throw new Error(o);
        }
      });
    }, this.getPendingAuthRequest = (s) => {
      const r = this.client.auth.requests.get(s);
      return typeof r == "object" ? r : void 0;
    }, this.addToRecentlyDeleted = (s, r) => {
      if (this.recentlyDeletedMap.set(s, r), this.recentlyDeletedMap.size >= this.recentlyDeletedLimit) {
        let n = 0;
        const i = this.recentlyDeletedLimit / 2;
        for (const o of this.recentlyDeletedMap.keys()) {
          if (n++ >= i) break;
          this.recentlyDeletedMap.delete(o);
        }
      }
    }, this.checkRecentlyDeleted = (s) => {
      const r = this.recentlyDeletedMap.get(s);
      if (r) {
        const { message: n } = j("MISSING_OR_INVALID", `Record was recently deleted - ${r}: ${s}`);
        throw new Error(n);
      }
    }, this.isLinkModeEnabled = (s, r) => !s || r !== ne.link_mode ? !1 : this.client.metadata?.redirect?.linkMode === !0 && this.client.metadata?.redirect?.universal !== void 0 && this.client.metadata?.redirect?.universal !== "" && s?.redirect?.universal !== void 0 && s?.redirect?.universal !== "" && s?.redirect?.linkMode === !0 && this.client.core.linkModeSupportedApps.includes(s.redirect.universal) && typeof globalThis?.Linking < "u", this.getAppLinkIfEnabled = (s, r) => this.isLinkModeEnabled(s, r) ? s?.redirect?.universal : void 0, this.handleLinkModeMessage = ({ url: s }) => {
      if (!s || !s.includes("wc_ev") || !s.includes("topic")) return;
      const r = Jl(s, "topic") || "", n = decodeURIComponent(Jl(s, "wc_ev") || ""), i = this.client.session.keys.includes(r);
      i && this.client.session.update(r, { transportType: ne.link_mode }), this.client.core.dispatchEnvelope({ topic: r, message: n, sessionExists: i });
    }, this.registerLinkModeListeners = async () => {
      if (Za() || Es() && this.client.metadata.redirect?.linkMode) {
        const s = globalThis?.Linking;
        if (typeof s < "u") {
          s.addEventListener("url", this.handleLinkModeMessage, this.client.name);
          const r = await s.getInitialURL();
          r && setTimeout(() => {
            this.handleLinkModeMessage({ url: r });
          }, 50);
        }
      }
    }, this.getTVFApproveParams = (s) => {
      try {
        const r = Qd(s.namespaces), n = P_(s.namespaces), i = T_(s.namespaces), o = s.sessionProperties, a = s.scopedProperties;
        return { approvedChains: r, approvedMethods: n, approvedEvents: i, sessionProperties: o, scopedProperties: a };
      } catch (r) {
        return this.client.logger.warn(r, "Error getting TVF approve params"), {};
      }
    }, this.getTVFParams = (s, r, n) => {
      if (!r.request?.method) return {};
      const i = { correlationId: s, rpcMethods: [r.request.method], chainId: r.chainId };
      try {
        const o = this.extractTxHashesFromResult(r.request, n);
        i.txHashes = o, i.contractAddresses = this.isValidContractData(r.request.params) ? [r.request.params?.[0]?.to] : [];
      } catch (o) {
        this.client.logger.warn(o, "Error getting TVF params");
      }
      return i;
    }, this.isValidContractData = (s) => {
      if (!s) return !1;
      try {
        const r = s?.data || s?.[0]?.data;
        if (!r.startsWith("0x")) return !1;
        const n = r.slice(2);
        return /^[0-9a-fA-F]*$/.test(n) ? n.length % 2 === 0 : !1;
      } catch {
      }
      return !1;
    }, this.extractTxHashesFromResult = (s, r) => {
      try {
        if (!r) return [];
        const n = s.method, i = Q3[n];
        if (n === "sui_signTransaction") return [Vx(r.transactionBytes)];
        if (n === "near_signTransaction") return [eh(r)];
        if (n === "near_signTransactions") return r.map((a) => eh(a));
        if (n === "xrpl_signTransactionFor" || n === "xrpl_signTransaction") return [r.tx_json?.hash];
        if (n === "polkadot_signTransaction") return [bI({ transaction: s.params.transactionPayload, signature: r.signature })];
        if (n === "algo_signTxn") return st(r) ? r.map((a) => th(a)) : [th(r)];
        if (n === "cosmos_signDirect") return [Gx(r)];
        if (n === "stellar_signXDR") return [e_(r.signedXDR, s.params?.chain)];
        if (n === "wallet_sendCalls") return t_(r);
        if (n === "canton_prepareSignExecute") return xI(s.params, r);
        if (typeof r == "string") return [r];
        const o = r[i.key];
        if (st(o)) return n === "solana_signAllTransactions" ? o.map((a) => Kx(a)) : o;
        if (typeof o == "string") return [o];
      } catch (n) {
        this.client.logger.warn(n, "Error extracting tx hashes from result");
      }
      return [];
    };
  }
  async processPendingMessageEvents() {
    try {
      const e = this.client.session.keys, s = this.client.core.relayer.messages.getWithoutAck(e);
      for (const [r, n] of Object.entries(s)) for (const i of n) try {
        await this.onProviderMessageEvent({ topic: r, message: i, publishedAt: Date.now() });
      } catch {
        this.client.logger.warn(`Error processing pending message event for topic: ${r}, message: ${i}`);
      }
    } catch (e) {
      this.client.logger.warn(e, "processPendingMessageEvents failed");
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = j("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  async confirmOnlineStateOrThrow() {
    await this.client.core.relayer.confirmOnlineStateOrThrow();
  }
  registerRelayerEvents() {
    this.client.core.relayer.on(ae.message, (e) => {
      this.onProviderMessageEvent(e);
    });
  }
  async onRelayMessage(e) {
    const { topic: s, message: r, attestation: n, transportType: i } = e, { publicKey: o } = this.client.auth.authKeys.keys.includes(as) ? this.client.auth.authKeys.get(as) : { publicKey: void 0 };
    try {
      try {
        if (i !== ne.link_mode && this.client.core.crypto.getPayloadType(r, _t) === Hs) {
          this.client.logger.warn(`onRelayMessage() -> non-link mode TYPE_2 payload ignored: ${r}`);
          return;
        }
      } catch {
      }
      const a = await this.client.core.crypto.decode(s, r, { receiverPublicKey: o, encoding: i === ne.link_mode ? _t : Ie });
      sc(a) ? (this.client.core.history.set(s, a), await this.onRelayEventRequest({ topic: s, payload: a, attestation: n, transportType: i, encryptedId: et(r) })) : Ti(a) ? (await this.client.core.history.resolve(a), await this.onRelayEventResponse({ topic: s, payload: a, transportType: i }), this.client.core.history.delete(s, a.id)) : (this.client.logger.error(`onRelayMessage() -> unknown payload: ${JSON.stringify(a)}`), await this.onRelayEventUnknownPayload({ topic: s, payload: a, transportType: i })), await this.client.core.relayer.messages.ack(s, r);
    } catch (a) {
      this.client.logger.error(`onRelayMessage() -> failed to process an inbound message: ${r}`), this.client.logger.error(a?.message);
    }
  }
  registerExpirerEvents() {
    this.client.core.expirer.on(Je.expired, async (e) => {
      const { topic: s, id: r } = zd(e.target);
      if (r && this.client.pendingRequest.keys.includes(r)) return await this.deletePendingSessionRequest(r, j("EXPIRED"), !0);
      if (r && this.client.auth.requests.keys.includes(r)) return await this.deletePendingAuthRequest(r, j("EXPIRED"), !0);
      s ? this.client.session.keys.includes(s) && (await this.deleteSession({ topic: s, expirerHasDeleted: !0 }), this.client.events.emit("session_expire", { topic: s })) : r && (await this.deleteProposal(r, !0), this.client.events.emit("proposal_expire", { id: r }));
    });
  }
  registerSubscriptionCleanup() {
    this.client.core.heartbeat.on("heartbeat_pulse", async () => {
      if (!this.cleanupInProgress) {
        this.cleanupInProgress = !0;
        try {
          await this.cleanupOrphanedSubscriptions();
        } catch (e) {
          this.client.logger.warn(e);
        } finally {
          this.cleanupInProgress = !1;
        }
      }
    });
  }
  registerPairingEvents() {
    this.client.core.pairing.events.on(Ps.create, (e) => this.onPairingCreated(e)), this.client.core.pairing.events.on(Ps.delete, (e) => {
      this.addToRecentlyDeleted(e.topic, "pairing");
    });
  }
  isValidPairingTopic(e) {
    if (!fe(e, !1)) {
      const { message: s } = j("MISSING_OR_INVALID", `pairing topic should be a string: ${e}`);
      throw new Error(s);
    }
    if (!this.client.core.pairing.pairings.keys.includes(e)) {
      const { message: s } = j("NO_MATCHING_KEY", `pairing topic doesn't exist: ${e}`);
      throw new Error(s);
    }
    if (xt(this.client.core.pairing.pairings.get(e).expiry)) {
      const { message: s } = j("EXPIRED", `pairing topic: ${e}`);
      throw new Error(s);
    }
  }
  async isValidSessionTopic(e) {
    if (!fe(e, !1)) {
      const { message: s } = j("MISSING_OR_INVALID", `session topic should be a string: ${e}`);
      throw new Error(s);
    }
    if (this.checkRecentlyDeleted(e), !this.client.session.keys.includes(e)) {
      const { message: s } = j("NO_MATCHING_KEY", `session topic doesn't exist: ${e}`);
      throw new Error(s);
    }
    if (xt(this.client.session.get(e).expiry)) {
      await this.deleteSession({ topic: e });
      const { message: s } = j("EXPIRED", `session topic: ${e}`);
      throw new Error(s);
    }
    if (!this.client.core.crypto.keychain.has(e)) {
      const { message: s } = j("MISSING_OR_INVALID", `session topic does not exist in keychain: ${e}`);
      throw await this.deleteSession({ topic: e }), new Error(s);
    }
  }
  async isValidSessionOrPairingTopic(e) {
    if (this.checkRecentlyDeleted(e), this.client.session.keys.includes(e)) await this.isValidSessionTopic(e);
    else if (this.client.core.pairing.pairings.keys.includes(e)) this.isValidPairingTopic(e);
    else if (fe(e, !1)) {
      const { message: s } = j("NO_MATCHING_KEY", `session or pairing topic doesn't exist: ${e}`);
      throw new Error(s);
    } else {
      const { message: s } = j("MISSING_OR_INVALID", `session or pairing topic should be a string: ${e}`);
      throw new Error(s);
    }
  }
  async isValidProposalId(e) {
    if (!Y_(e)) {
      const { message: s } = j("MISSING_OR_INVALID", `proposal id should be a number: ${e}`);
      throw new Error(s);
    }
    if (!this.client.proposal.keys.includes(e)) {
      const { message: s } = j("NO_MATCHING_KEY", `proposal id doesn't exist: ${e}`);
      throw new Error(s);
    }
    if (xt(this.client.proposal.get(e).expiryTimestamp)) {
      await this.deleteProposal(e);
      const { message: s } = j("EXPIRED", `proposal id: ${e}`);
      throw new Error(s);
    }
  }
  validateRequestExpiry(e) {
    if (e && !nI(e, So)) {
      const { message: s } = j("MISSING_OR_INVALID", `request() expiry: ${e}. Expiry must be a number (in seconds) between ${So.min} and ${So.max}`);
      throw new Error(s);
    }
  }
}
class c8 extends Zs {
  constructor(e, s) {
    super(e, s, Z3, lc), this.core = e, this.logger = s;
  }
}
class l8 extends Zs {
  constructor(e, s) {
    super(e, s, X3, lc), this.core = e, this.logger = s;
  }
}
class h8 extends Zs {
  constructor(e, s) {
    super(e, s, e8, lc, (r) => r.id), this.core = e, this.logger = s;
  }
}
class u8 extends Zs {
  constructor(e, s) {
    super(e, s, n8, Bi, () => as), this.core = e, this.logger = s;
  }
}
class f8 extends Zs {
  constructor(e, s) {
    super(e, s, i8, Bi), this.core = e, this.logger = s;
  }
}
class d8 extends Zs {
  constructor(e, s) {
    super(e, s, o8, Bi, (r) => r.id), this.core = e, this.logger = s;
  }
}
class p8 {
  constructor(e, s) {
    this.core = e, this.logger = s, this.authKeys = new u8(this.core, this.logger), this.pairingTopics = new f8(this.core, this.logger), this.requests = new d8(this.core, this.logger);
  }
  async init() {
    await this.authKeys.init(), await this.pairingTopics.init(), await this.requests.init();
  }
}
let g8 = class Up extends gS {
  constructor(e) {
    super(e), this.protocol = Rp, this.version = Cp, this.name = Io.name, this.events = new Ge.EventEmitter(), this.on = (r, n) => this.events.on(r, n), this.once = (r, n) => this.events.once(r, n), this.off = (r, n) => this.events.off(r, n), this.removeListener = (r, n) => this.events.removeListener(r, n), this.removeAllListeners = (r) => this.events.removeAllListeners(r), this.connect = async (r) => {
      try {
        return await this.engine.connect(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.pair = async (r) => {
      try {
        return await this.engine.pair(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.approve = async (r) => {
      try {
        return await this.engine.approve(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.reject = async (r) => {
      try {
        return await this.engine.reject(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.update = async (r) => {
      try {
        return await this.engine.update(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.extend = async (r) => {
      try {
        return await this.engine.extend(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.request = async (r) => {
      try {
        return await this.engine.request(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.respond = async (r) => {
      try {
        return await this.engine.respond(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.ping = async (r) => {
      try {
        return await this.engine.ping(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.emit = async (r) => {
      try {
        return await this.engine.emit(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.disconnect = async (r) => {
      try {
        return await this.engine.disconnect(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.find = (r) => {
      try {
        return this.engine.find(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.getPendingSessionRequests = () => {
      try {
        return this.engine.getPendingSessionRequests();
      } catch (r) {
        throw this.logger.error(r.message), r;
      }
    }, this.authenticate = async (r, n) => {
      try {
        return console.warn("[WalletConnect] `authenticate` is deprecated and will be removed in a future release. Use `connect()`'s `authentication` instead to establish an authenticated session."), await this.engine.authenticate(r, n);
      } catch (i) {
        throw this.logger.error(i.message), i;
      }
    }, this.formatAuthMessage = (r) => {
      try {
        return this.engine.formatAuthMessage(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.approveSessionAuthenticate = async (r) => {
      try {
        return await this.engine.approveSessionAuthenticate(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.rejectSessionAuthenticate = async (r) => {
      try {
        return await this.engine.rejectSessionAuthenticate(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.name = e?.name || Io.name, this.metadata = _x(e?.metadata), this.signConfig = e?.signConfig;
    const s = Qa({ logger: e?.logger || Io.logger, name: this.name });
    this.logger = s, this.core = e?.core || new Y3(e), this.session = new l8(this.core, this.logger), this.proposal = new c8(this.core, this.logger), this.pendingRequest = new h8(this.core, this.logger), this.engine = new a8(this), this.auth = new p8(this.core, this.logger);
  }
  static async init(e) {
    const s = new Up(e);
    return await s.initialize(), s;
  }
  get context() {
    return Fe(this.logger);
  }
  get pairing() {
    return this.core.pairing.pairings;
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.core.start(), await this.session.init(), await this.proposal.init(), await this.pendingRequest.init(), await this.auth.init(), await this.engine.init(), this.logger.info("SignClient Initialization Success");
    } catch (e) {
      throw this.logger.info("SignClient Initialization Failure"), this.logger.error(e.message), e;
    }
  }
};
const y8 = g8;
var ua = { exports: {} };
(function(t, e) {
  var s = typeof globalThis < "u" && globalThis || typeof self < "u" && self || typeof globalThis < "u" && globalThis, r = function() {
    function i() {
      this.fetch = !1, this.DOMException = s.DOMException;
    }
    return i.prototype = s, new i();
  }();
  (function(i) {
    (function(o) {
      var a = typeof i < "u" && i || typeof self < "u" && self || // eslint-disable-next-line no-undef
      typeof i < "u" && i || {}, c = {
        searchParams: "URLSearchParams" in a,
        iterable: "Symbol" in a && "iterator" in Symbol,
        blob: "FileReader" in a && "Blob" in a && function() {
          try {
            return new Blob(), !0;
          } catch {
            return !1;
          }
        }(),
        formData: "FormData" in a,
        arrayBuffer: "ArrayBuffer" in a
      };
      function l(p) {
        return p && DataView.prototype.isPrototypeOf(p);
      }
      if (c.arrayBuffer)
        var u = [
          "[object Int8Array]",
          "[object Uint8Array]",
          "[object Uint8ClampedArray]",
          "[object Int16Array]",
          "[object Uint16Array]",
          "[object Int32Array]",
          "[object Uint32Array]",
          "[object Float32Array]",
          "[object Float64Array]"
        ], h = ArrayBuffer.isView || function(p) {
          return p && u.indexOf(Object.prototype.toString.call(p)) > -1;
        };
      function f(p) {
        if (typeof p != "string" && (p = String(p)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(p) || p === "")
          throw new TypeError('Invalid character in header field name: "' + p + '"');
        return p.toLowerCase();
      }
      function d(p) {
        return typeof p != "string" && (p = String(p)), p;
      }
      function g(p) {
        var y = {
          next: function() {
            var b = p.shift();
            return { done: b === void 0, value: b };
          }
        };
        return c.iterable && (y[Symbol.iterator] = function() {
          return y;
        }), y;
      }
      function w(p) {
        this.map = {}, p instanceof w ? p.forEach(function(y, b) {
          this.append(b, y);
        }, this) : Array.isArray(p) ? p.forEach(function(y) {
          if (y.length != 2)
            throw new TypeError("Headers constructor: expected name/value pair to be length 2, found" + y.length);
          this.append(y[0], y[1]);
        }, this) : p && Object.getOwnPropertyNames(p).forEach(function(y) {
          this.append(y, p[y]);
        }, this);
      }
      w.prototype.append = function(p, y) {
        p = f(p), y = d(y);
        var b = this.map[p];
        this.map[p] = b ? b + ", " + y : y;
      }, w.prototype.delete = function(p) {
        delete this.map[f(p)];
      }, w.prototype.get = function(p) {
        return p = f(p), this.has(p) ? this.map[p] : null;
      }, w.prototype.has = function(p) {
        return this.map.hasOwnProperty(f(p));
      }, w.prototype.set = function(p, y) {
        this.map[f(p)] = d(y);
      }, w.prototype.forEach = function(p, y) {
        for (var b in this.map)
          this.map.hasOwnProperty(b) && p.call(y, this.map[b], b, this);
      }, w.prototype.keys = function() {
        var p = [];
        return this.forEach(function(y, b) {
          p.push(b);
        }), g(p);
      }, w.prototype.values = function() {
        var p = [];
        return this.forEach(function(y) {
          p.push(y);
        }), g(p);
      }, w.prototype.entries = function() {
        var p = [];
        return this.forEach(function(y, b) {
          p.push([b, y]);
        }), g(p);
      }, c.iterable && (w.prototype[Symbol.iterator] = w.prototype.entries);
      function m(p) {
        if (!p._noBody) {
          if (p.bodyUsed)
            return Promise.reject(new TypeError("Already read"));
          p.bodyUsed = !0;
        }
      }
      function S(p) {
        return new Promise(function(y, b) {
          p.onload = function() {
            y(p.result);
          }, p.onerror = function() {
            b(p.error);
          };
        });
      }
      function T(p) {
        var y = new FileReader(), b = S(y);
        return y.readAsArrayBuffer(p), b;
      }
      function E(p) {
        var y = new FileReader(), b = S(y), I = /charset=([A-Za-z0-9_-]+)/.exec(p.type), v = I ? I[1] : "utf-8";
        return y.readAsText(p, v), b;
      }
      function D(p) {
        for (var y = new Uint8Array(p), b = new Array(y.length), I = 0; I < y.length; I++)
          b[I] = String.fromCharCode(y[I]);
        return b.join("");
      }
      function $(p) {
        if (p.slice)
          return p.slice(0);
        var y = new Uint8Array(p.byteLength);
        return y.set(new Uint8Array(p)), y.buffer;
      }
      function R() {
        return this.bodyUsed = !1, this._initBody = function(p) {
          this.bodyUsed = this.bodyUsed, this._bodyInit = p, p ? typeof p == "string" ? this._bodyText = p : c.blob && Blob.prototype.isPrototypeOf(p) ? this._bodyBlob = p : c.formData && FormData.prototype.isPrototypeOf(p) ? this._bodyFormData = p : c.searchParams && URLSearchParams.prototype.isPrototypeOf(p) ? this._bodyText = p.toString() : c.arrayBuffer && c.blob && l(p) ? (this._bodyArrayBuffer = $(p.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : c.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(p) || h(p)) ? this._bodyArrayBuffer = $(p) : this._bodyText = p = Object.prototype.toString.call(p) : (this._noBody = !0, this._bodyText = ""), this.headers.get("content-type") || (typeof p == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : c.searchParams && URLSearchParams.prototype.isPrototypeOf(p) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
        }, c.blob && (this.blob = function() {
          var p = m(this);
          if (p)
            return p;
          if (this._bodyBlob)
            return Promise.resolve(this._bodyBlob);
          if (this._bodyArrayBuffer)
            return Promise.resolve(new Blob([this._bodyArrayBuffer]));
          if (this._bodyFormData)
            throw new Error("could not read FormData body as blob");
          return Promise.resolve(new Blob([this._bodyText]));
        }), this.arrayBuffer = function() {
          if (this._bodyArrayBuffer) {
            var p = m(this);
            return p || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(
              this._bodyArrayBuffer.buffer.slice(
                this._bodyArrayBuffer.byteOffset,
                this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
              )
            ) : Promise.resolve(this._bodyArrayBuffer));
          } else {
            if (c.blob)
              return this.blob().then(T);
            throw new Error("could not read as ArrayBuffer");
          }
        }, this.text = function() {
          var p = m(this);
          if (p)
            return p;
          if (this._bodyBlob)
            return E(this._bodyBlob);
          if (this._bodyArrayBuffer)
            return Promise.resolve(D(this._bodyArrayBuffer));
          if (this._bodyFormData)
            throw new Error("could not read FormData body as text");
          return Promise.resolve(this._bodyText);
        }, c.formData && (this.formData = function() {
          return this.text().then(z);
        }), this.json = function() {
          return this.text().then(JSON.parse);
        }, this;
      }
      var B = ["CONNECT", "DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT", "TRACE"];
      function C(p) {
        var y = p.toUpperCase();
        return B.indexOf(y) > -1 ? y : p;
      }
      function O(p, y) {
        if (!(this instanceof O))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        y = y || {};
        var b = y.body;
        if (p instanceof O) {
          if (p.bodyUsed)
            throw new TypeError("Already read");
          this.url = p.url, this.credentials = p.credentials, y.headers || (this.headers = new w(p.headers)), this.method = p.method, this.mode = p.mode, this.signal = p.signal, !b && p._bodyInit != null && (b = p._bodyInit, p.bodyUsed = !0);
        } else
          this.url = String(p);
        if (this.credentials = y.credentials || this.credentials || "same-origin", (y.headers || !this.headers) && (this.headers = new w(y.headers)), this.method = C(y.method || this.method || "GET"), this.mode = y.mode || this.mode || null, this.signal = y.signal || this.signal || function() {
          if ("AbortController" in a) {
            var x = new AbortController();
            return x.signal;
          }
        }(), this.referrer = null, (this.method === "GET" || this.method === "HEAD") && b)
          throw new TypeError("Body not allowed for GET or HEAD requests");
        if (this._initBody(b), (this.method === "GET" || this.method === "HEAD") && (y.cache === "no-store" || y.cache === "no-cache")) {
          var I = /([?&])_=[^&]*/;
          if (I.test(this.url))
            this.url = this.url.replace(I, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
          else {
            var v = /\?/;
            this.url += (v.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
          }
        }
      }
      O.prototype.clone = function() {
        return new O(this, { body: this._bodyInit });
      };
      function z(p) {
        var y = new FormData();
        return p.trim().split("&").forEach(function(b) {
          if (b) {
            var I = b.split("="), v = I.shift().replace(/\+/g, " "), x = I.join("=").replace(/\+/g, " ");
            y.append(decodeURIComponent(v), decodeURIComponent(x));
          }
        }), y;
      }
      function M(p) {
        var y = new w(), b = p.replace(/\r?\n[\t ]+/g, " ");
        return b.split("\r").map(function(I) {
          return I.indexOf(`
`) === 0 ? I.substr(1, I.length) : I;
        }).forEach(function(I) {
          var v = I.split(":"), x = v.shift().trim();
          if (x) {
            var P = v.join(":").trim();
            try {
              y.append(x, P);
            } catch (U) {
              console.warn("Response " + U.message);
            }
          }
        }), y;
      }
      R.call(O.prototype);
      function N(p, y) {
        if (!(this instanceof N))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        if (y || (y = {}), this.type = "default", this.status = y.status === void 0 ? 200 : y.status, this.status < 200 || this.status > 599)
          throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].");
        this.ok = this.status >= 200 && this.status < 300, this.statusText = y.statusText === void 0 ? "" : "" + y.statusText, this.headers = new w(y.headers), this.url = y.url || "", this._initBody(p);
      }
      R.call(N.prototype), N.prototype.clone = function() {
        return new N(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new w(this.headers),
          url: this.url
        });
      }, N.error = function() {
        var p = new N(null, { status: 200, statusText: "" });
        return p.ok = !1, p.status = 0, p.type = "error", p;
      };
      var _ = [301, 302, 303, 307, 308];
      N.redirect = function(p, y) {
        if (_.indexOf(y) === -1)
          throw new RangeError("Invalid status code");
        return new N(null, { status: y, headers: { location: p } });
      }, o.DOMException = a.DOMException;
      try {
        new o.DOMException();
      } catch {
        o.DOMException = function(y, b) {
          this.message = y, this.name = b;
          var I = Error(y);
          this.stack = I.stack;
        }, o.DOMException.prototype = Object.create(Error.prototype), o.DOMException.prototype.constructor = o.DOMException;
      }
      function A(p, y) {
        return new Promise(function(b, I) {
          var v = new O(p, y);
          if (v.signal && v.signal.aborted)
            return I(new o.DOMException("Aborted", "AbortError"));
          var x = new XMLHttpRequest();
          function P() {
            x.abort();
          }
          x.onload = function() {
            var L = {
              statusText: x.statusText,
              headers: M(x.getAllResponseHeaders() || "")
            };
            v.url.indexOf("file://") === 0 && (x.status < 200 || x.status > 599) ? L.status = 200 : L.status = x.status, L.url = "responseURL" in x ? x.responseURL : L.headers.get("X-Request-URL");
            var q = "response" in x ? x.response : x.responseText;
            setTimeout(function() {
              b(new N(q, L));
            }, 0);
          }, x.onerror = function() {
            setTimeout(function() {
              I(new TypeError("Network request failed"));
            }, 0);
          }, x.ontimeout = function() {
            setTimeout(function() {
              I(new TypeError("Network request timed out"));
            }, 0);
          }, x.onabort = function() {
            setTimeout(function() {
              I(new o.DOMException("Aborted", "AbortError"));
            }, 0);
          };
          function U(L) {
            try {
              return L === "" && a.location.href ? a.location.href : L;
            } catch {
              return L;
            }
          }
          if (x.open(v.method, U(v.url), !0), v.credentials === "include" ? x.withCredentials = !0 : v.credentials === "omit" && (x.withCredentials = !1), "responseType" in x && (c.blob ? x.responseType = "blob" : c.arrayBuffer && (x.responseType = "arraybuffer")), y && typeof y.headers == "object" && !(y.headers instanceof w || a.Headers && y.headers instanceof a.Headers)) {
            var F = [];
            Object.getOwnPropertyNames(y.headers).forEach(function(L) {
              F.push(f(L)), x.setRequestHeader(L, d(y.headers[L]));
            }), v.headers.forEach(function(L, q) {
              F.indexOf(q) === -1 && x.setRequestHeader(q, L);
            });
          } else
            v.headers.forEach(function(L, q) {
              x.setRequestHeader(q, L);
            });
          v.signal && (v.signal.addEventListener("abort", P), x.onreadystatechange = function() {
            x.readyState === 4 && v.signal.removeEventListener("abort", P);
          }), x.send(typeof v._bodyInit > "u" ? null : v._bodyInit);
        });
      }
      return A.polyfill = !0, a.fetch || (a.fetch = A, a.Headers = w, a.Request = O, a.Response = N), o.Headers = w, o.Request = O, o.Response = N, o.fetch = A, Object.defineProperty(o, "__esModule", { value: !0 }), o;
    })({});
  })(r), r.fetch.ponyfill = !0, delete r.fetch.polyfill;
  var n = s.fetch ? s : r;
  e = n.fetch, e.default = n.fetch, e.fetch = n.fetch, e.Headers = n.Headers, e.Request = n.Request, e.Response = n.Response, t.exports = e;
})(ua, ua.exports);
var w8 = ua.exports;
const qh = /* @__PURE__ */ su(w8);
var m8 = Object.defineProperty, b8 = Object.defineProperties, v8 = Object.getOwnPropertyDescriptors, zh = Object.getOwnPropertySymbols, E8 = Object.prototype.hasOwnProperty, x8 = Object.prototype.propertyIsEnumerable, jh = (t, e, s) => e in t ? m8(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, Fh = (t, e) => {
  for (var s in e || (e = {})) E8.call(e, s) && jh(t, s, e[s]);
  if (zh) for (var s of zh(e)) x8.call(e, s) && jh(t, s, e[s]);
  return t;
}, Hh = (t, e) => b8(t, v8(e));
const _8 = { Accept: "application/json", "Content-Type": "application/json" }, I8 = "POST", Kh = { headers: _8, method: I8 }, Vh = 10;
let Mp = class {
  constructor(e, s = !1) {
    if (this.url = e, this.disableProviderPing = s, this.events = new Ge.EventEmitter(), this.isAvailable = !1, this.registering = !1, !Oh(e)) throw new Error(`Provided URL is not compatible with HTTP connection: ${e}`);
    this.url = e, this.disableProviderPing = s;
  }
  get connected() {
    return this.isAvailable;
  }
  get connecting() {
    return this.registering;
  }
  on(e, s) {
    this.events.on(e, s);
  }
  once(e, s) {
    this.events.once(e, s);
  }
  off(e, s) {
    this.events.off(e, s);
  }
  removeListener(e, s) {
    this.events.removeListener(e, s);
  }
  async open(e = this.url) {
    await this.register(e);
  }
  async close() {
    if (!this.isAvailable) throw new Error("Connection already closed");
    this.onClose();
  }
  async send(e) {
    this.isAvailable || await this.register();
    try {
      const s = js(e), r = await (await qh(this.url, Hh(Fh({}, Kh), { body: s }))).json();
      this.onPayload({ data: r });
    } catch (s) {
      this.onError(e.id, s);
    }
  }
  async register(e = this.url) {
    if (!Oh(e)) throw new Error(`Provided URL is not compatible with HTTP connection: ${e}`);
    if (this.registering) {
      const s = this.events.getMaxListeners();
      return (this.events.listenerCount("register_error") >= s || this.events.listenerCount("open") >= s) && this.events.setMaxListeners(s + 1), new Promise((r, n) => {
        this.events.once("register_error", (i) => {
          this.resetMaxListeners(), n(i);
        }), this.events.once("open", () => {
          if (this.resetMaxListeners(), typeof this.isAvailable > "u") return n(new Error("HTTP connection is missing or invalid"));
          r();
        });
      });
    }
    this.url = e, this.registering = !0;
    try {
      if (!this.disableProviderPing) {
        const s = js({ id: 1, jsonrpc: "2.0", method: "test", params: [] });
        await qh(e, Hh(Fh({}, Kh), { body: s }));
      }
      this.onOpen();
    } catch (s) {
      const r = this.parseError(s);
      throw this.events.emit("register_error", r), this.onClose(), r;
    }
  }
  onOpen() {
    this.isAvailable = !0, this.registering = !1, this.events.emit("open");
  }
  onClose() {
    this.isAvailable = !1, this.registering = !1, this.events.emit("close");
  }
  onPayload(e) {
    if (typeof e.data > "u") return;
    const s = typeof e.data == "string" ? zs(e.data) : e.data;
    this.events.emit("payload", s);
  }
  onError(e, s) {
    const r = this.parseError(s), n = r.message || r.toString(), i = Pi(e, n);
    this.events.emit("payload", i);
  }
  parseError(e, s = this.url) {
    return ip(e, s, "HTTP");
  }
  resetMaxListeners() {
    this.events.getMaxListeners() > Vh && this.events.setMaxListeners(Vh);
  }
};
const Wh = "error", S8 = "wss://relay.walletconnect.org", D8 = "wc", Lp = "universal_provider", On = `${D8}@2:${Lp}:`, kp = "https://rpc.walletconnect.org/v1/", qp = "generic", A8 = `${kp}bundler`, ur = "call_status", $8 = 86400, hc = { DEFAULT_CHAIN_CHANGED: "default_chain_changed" };
function zp(t, e, s) {
  const r = Gt(t);
  return e.rpcMap?.[r.reference] || `${kp}?chainId=${r.namespace}:${r.reference}&projectId=${s}`;
}
function O8(t) {
  return t.includes(":") ? t.split(":")[1] : t;
}
function jp(t) {
  return t.map((e) => `${e.split(":")[0]}:${e.split(":")[1]}`);
}
function P8(t, e) {
  const s = Object.keys(e.namespaces).filter((n) => n.includes(t));
  if (!s.length) return [];
  const r = [];
  return s.forEach((n) => {
    const i = e.namespaces[n].accounts;
    r.push(...i);
  }), r;
}
function Gh(t) {
  return Object.fromEntries(Object.entries(t).filter(([e, s]) => s?.chains?.length && s?.chains?.length > 0));
}
function Pn(t = {}, e = {}) {
  const s = Gh(Yh(t)), r = Gh(Yh(e));
  return e3(s, r);
}
function Yh(t) {
  const e = {};
  if (!Dt(t)) return e;
  for (const [s, r] of Object.entries(t)) {
    const n = Oi(s) ? [s] : r.chains, i = r.methods || [], o = r.events || [], a = r.rpcMap || {}, c = nr(s);
    e[c] = { ...e[c], ...r, chains: St(n, e[c]?.chains), methods: St(i, e[c]?.methods), events: St(o, e[c]?.events) }, (Dt(a) || Dt(e[c]?.rpcMap || {})) && (e[c].rpcMap = { ...a, ...e[c]?.rpcMap });
  }
  return e;
}
function Zh(t) {
  return t.includes(":") ? t.split(":")[2] : t;
}
function Xh(t) {
  const e = {};
  for (const [s, r] of Object.entries(t)) {
    const n = r.methods || [], i = r.events || [], o = r.accounts || [], a = Oi(s) ? [s] : r.chains ? r.chains : jp(r.accounts);
    e[s] = { chains: a, methods: n, events: i, accounts: o };
  }
  return e;
}
function Do(t) {
  return typeof t == "number" ? t : t.includes("0x") ? parseInt(t, 16) : (t = t.includes(":") ? t.split(":")[1] : t, isNaN(Number(t)) ? t : Number(t));
}
function T8(t) {
  try {
    const e = JSON.parse(t);
    return typeof e == "object" && e !== null && !Array.isArray(e);
  } catch {
    return !1;
  }
}
const Fp = {}, fr = (t) => Fp[t], Ao = (t, e) => {
  Fp[t] = e;
}, Jh = "eip155", B8 = ["atomic", "flow-control", "paymasterService", "sessionKeys", "auxiliaryFunds"], R8 = (t) => t && t.startsWith("0x") ? BigInt(t).toString(10) : t, $o = (t) => t && t.startsWith("0x") ? t : `0x${BigInt(t).toString(16)}`, Qh = (t) => Object.keys(t).filter((e) => B8.includes(e)).reduce((e, s) => (e[s] = C8(t[s]), e), {}), C8 = (t) => typeof t == "string" && T8(t) ? JSON.parse(t) : t, N8 = (t, e, s) => {
  const { sessionProperties: r = {}, scopedProperties: n = {} } = t, i = {};
  if (!Dt(n) && !Dt(r)) return;
  const o = Qh(r);
  for (const a of s) {
    const c = R8(a);
    if (!c) continue;
    i[$o(c)] = o;
    const l = n?.[`${Jh}:${c}`];
    if (l) {
      const u = l?.[`${Jh}:${c}:${e}`];
      i[$o(c)] = { ...i[$o(c)], ...Qh(u || l) };
    }
  }
  for (const [a, c] of Object.entries(i)) Object.keys(c).length === 0 && delete i[a];
  return Object.keys(i).length > 0 ? i : void 0;
};
let Oo, U8 = class Hp {
  constructor(e) {
    this.storage = e;
  }
  async getItem(e) {
    return await this.storage.getItem(e);
  }
  async setItem(e, s) {
    return await this.storage.setItem(e, s);
  }
  async removeItem(e) {
    return await this.storage.removeItem(e);
  }
  static getStorage(e) {
    return Oo || (Oo = new Hp(e)), Oo;
  }
};
async function M8(t, e) {
  const s = Gt(t.result.capabilities.caip345.caip2), r = t.result.capabilities.caip345.transactionHashes, n = await Promise.allSettled(r.map((h) => L8(s.reference, h, e))), i = n.filter((h) => h.status === "fulfilled").map((h) => h.value).filter((h) => h);
  n.filter((h) => h.status === "rejected").forEach((h) => console.warn("Failed to fetch transaction receipt:", h.reason));
  const o = !i.length || i.some((h) => !h), a = i.every((h) => h?.status === "0x1"), c = i.every((h) => h?.status === "0x0"), l = i.some((h) => h?.status === "0x0");
  let u;
  return o ? u = 100 : a ? u = 200 : c ? u = 500 : l && (u = 600), { id: t.result.id, version: t.request.version, atomic: t.request.atomicRequired, chainId: t.request.chainId, capabilities: t.result.capabilities, receipts: i, status: u };
}
async function L8(t, e, s) {
  return await s(parseInt(t)).request(ft("eth_getTransactionReceipt", [e]));
}
async function k8({ sendCalls: t, storage: e }) {
  const s = await e.getItem(ur);
  await e.setItem(ur, { ...s, [t.result.id]: { request: t.request, result: t.result, expiry: ue($8) } });
}
async function q8({ resultId: t, storage: e }) {
  const s = await e.getItem(ur);
  if (s) {
    delete s[t], await e.setItem(ur, s);
    for (const r in s) xt(s[r].expiry) && delete s[r];
    await e.setItem(ur, s);
  }
}
async function z8({ resultId: t, storage: e }) {
  const s = (await e.getItem(ur))?.[t];
  if (s && !xt(s.expiry)) return s;
  await q8({ resultId: t, storage: e });
}
class j8 {
  constructor(e) {
    this.name = "eip155", this.namespace = e.namespace, this.events = fr("events"), this.client = fr("client"), this.httpProviders = this.createHttpProviders(), this.chainId = parseInt(this.getDefaultChain()), this.storage = U8.getStorage(this.client.core.storage);
  }
  async request(e) {
    switch (e.request.method) {
      case "eth_requestAccounts":
        return this.getAccounts();
      case "eth_accounts":
        return this.getAccounts();
      case "wallet_switchEthereumChain":
        return await this.handleSwitchChain(e);
      case "eth_chainId":
        return parseInt(this.getDefaultChain());
      case "wallet_getCapabilities":
        return await this.getCapabilities(e);
      case "wallet_getCallsStatus":
        return await this.getCallStatus(e);
      case "wallet_sendCalls":
        return await this.sendCalls(e);
    }
    return this.namespace.methods.includes(e.request.method) ? await this.client.request(e) : this.getHttpProvider().request(e.request);
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  setDefaultChain(e, s) {
    this.httpProviders[e] || this.setHttpProvider(parseInt(e), s);
    const r = this.chainId;
    this.chainId = parseInt(e), this.events.emit(hc.DEFAULT_CHAIN_CHANGED, { currentCaipChainId: `${this.name}:${e}`, previousCaipChainId: `${this.name}:${r}` });
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId.toString();
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  createHttpProvider(e, s) {
    const r = s || zp(`${this.name}:${e}`, this.namespace, this.client.core.projectId);
    if (!r) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new rc(new Mp(r, fr("disableProviderPing")));
  }
  setHttpProvider(e, s) {
    const r = this.createHttpProvider(e, s);
    r && (this.httpProviders[e] = r);
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((s) => {
      const r = parseInt(O8(s));
      e[r] = this.createHttpProvider(r, this.namespace.rpcMap?.[s]);
    }), e;
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? [...new Set(e.filter((s) => s.split(":")[1] === this.chainId.toString()).map((s) => s.split(":")[2]))] : [];
  }
  getHttpProvider(e) {
    const s = e || this.chainId;
    return this.httpProviders[s] || (this.httpProviders = { ...this.httpProviders, [s]: this.createHttpProvider(s) }, this.httpProviders[s]);
  }
  async handleSwitchChain(e) {
    let s = e.request.params ? e.request.params[0]?.chainId : "0x0";
    s = s.startsWith("0x") ? s : `0x${s}`;
    const r = parseInt(s, 16);
    if (this.isChainApproved(r)) this.setDefaultChain(`${r}`);
    else if (this.namespace.methods.includes("wallet_switchEthereumChain")) await this.client.request({ topic: e.topic, request: { method: e.request.method, params: [{ chainId: s }] }, chainId: this.namespace.chains?.[0] }), this.setDefaultChain(`${r}`);
    else throw new Error(`Failed to switch to chain 'eip155:${r}'. The chain is not approved or the wallet does not support 'wallet_switchEthereumChain' method.`);
    return null;
  }
  isChainApproved(e) {
    return this.namespace.chains.includes(`${this.name}:${e}`);
  }
  async getCapabilities(e) {
    const s = e.request?.params?.[0], r = e.request?.params?.[1] || [];
    if (!s) throw new Error("Missing address parameter in `wallet_getCapabilities` request");
    const n = this.client.session.get(e.topic), i = n?.sessionProperties?.capabilities || {}, o = r.length > 0 ? r.join(",") : `0x${this.chainId.toString(16)}`, a = `${s}${o}`, c = i?.[a];
    if (c) return c;
    let l;
    try {
      l = N8(n, s, r);
    } catch (h) {
      console.warn("Failed to extract capabilities from session", h);
    }
    if (l) return l;
    const u = await this.client.request(e);
    try {
      await this.client.session.update(e.topic, { sessionProperties: { ...n.sessionProperties || {}, capabilities: { ...i || {}, [a]: u } } });
    } catch (h) {
      console.warn("Failed to update session with capabilities", h);
    }
    return u;
  }
  async getCallStatus(e) {
    const s = this.client.session.get(e.topic), r = s.sessionProperties?.bundler_name;
    if (r) {
      const o = this.getBundlerUrl(e.chainId, r);
      try {
        return await this.getUserOperationReceipt(o, e);
      } catch (a) {
        console.warn("Failed to fetch call status from bundler", a, o);
      }
    }
    const n = s.sessionProperties?.bundler_url;
    if (n) try {
      return await this.getUserOperationReceipt(n, e);
    } catch (o) {
      console.warn("Failed to fetch call status from custom bundler", o, n);
    }
    const i = await z8({ resultId: e.request.params?.[0], storage: this.storage });
    if (i) try {
      return await M8(i, this.getHttpProvider.bind(this));
    } catch (o) {
      console.warn("Failed to fetch call status from stored send calls", o, i);
    }
    if (this.namespace.methods.includes(e.request.method)) return await this.client.request(e);
    throw new Error("Fetching call status not approved by the wallet.");
  }
  async getUserOperationReceipt(e, s) {
    const r = new URL(e), n = await fetch(r, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(ft("eth_getUserOperationReceipt", [s.request.params?.[0]])) });
    if (!n.ok) throw new Error(`Failed to fetch user operation receipt - ${n.status}`);
    return await n.json();
  }
  getBundlerUrl(e, s) {
    return `${A8}?projectId=${this.client.core.projectId}&chainId=${e}&bundler=${s}`;
  }
  async sendCalls(e) {
    const s = await this.client.request(e), r = e.request.params?.[0], n = s?.id, i = s?.capabilities || {}, o = i?.caip345?.caip2, a = i?.caip345?.transactionHashes;
    return !n || !o || !a?.length || await k8({ sendCalls: { request: r, result: s }, storage: this.storage }), s;
  }
}
class F8 {
  constructor(e) {
    this.name = qp, this.namespace = e.namespace, this.events = fr("events"), this.client = fr("client"), this.chainId = this.getDefaultChain(), this.name = this.getNamespaceName(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(e) {
    this.namespace.chains = [...new Set((this.namespace.chains || []).concat(e.chains || []))], this.namespace.accounts = [...new Set((this.namespace.accounts || []).concat(e.accounts || []))], this.namespace.methods = [...new Set((this.namespace.methods || []).concat(e.methods || []))], this.namespace.events = [...new Set((this.namespace.events || []).concat(e.events || []))], this.httpProviders = this.createHttpProviders();
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider(e.chainId).request(e.request);
  }
  setDefaultChain(e, s) {
    this.httpProviders[e] || this.setHttpProvider(e, s);
    const r = this.chainId;
    this.chainId = e, this.events.emit(hc.DEFAULT_CHAIN_CHANGED, { currentCaipChainId: `${this.name}:${e}`, previousCaipChainId: `${this.name}:${r}` });
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  getNamespaceName() {
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return Gt(e).namespace;
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? [...new Set(e.filter((s) => s.split(":")[1] === this.chainId.toString()).map((s) => s.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace?.accounts?.forEach((s) => {
      const r = Gt(s), n = this.namespace?.rpcMap?.[`${r.namespace}:${r.reference}`];
      e[r.reference] = this.createHttpProvider(s, n);
    }), e;
  }
  getHttpProvider(e) {
    const s = Gt(e).reference, r = this.httpProviders[s];
    if (typeof r > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return r;
  }
  setHttpProvider(e, s) {
    const r = this.createHttpProvider(e, s);
    r && (this.httpProviders[e] = r);
  }
  createHttpProvider(e, s) {
    const r = s || zp(e, this.namespace, this.client.core.projectId);
    if (!r) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new rc(new Mp(r, fr("disableProviderPing")));
  }
}
let H8 = class Kp {
  constructor(e) {
    this.events = new wa(), this.rpcProviders = {}, this.disableProviderPing = !1, this.providerOpts = e, this.logger = Qa({ logger: e.logger ?? Wh, name: this.providerOpts.name ?? Lp }), this.disableProviderPing = e?.disableProviderPing || !1;
  }
  static async init(e) {
    const s = new Kp(e);
    return await s.initialize(), s;
  }
  async request(e, s, r) {
    const [n, i] = this.validateChain(s);
    if (!this.session) throw new Error("Please call connect() before request()");
    return await this.getProvider(n).request({ request: { ...e }, chainId: `${n}:${i}`, topic: this.session.topic, expiry: r });
  }
  sendAsync(e, s, r, n) {
    const i = (/* @__PURE__ */ new Date()).getTime();
    this.request(e, r, n).then((o) => s(null, Gr(i, o))).catch((o) => s(o, void 0));
  }
  async enable() {
    if (!this.client) throw new Error("Sign Client not initialized");
    return this.session || await this.connect({ namespaces: this.namespaces, optionalNamespaces: this.optionalNamespaces, sessionProperties: this.sessionProperties, scopedProperties: this.scopedProperties }), await this.requestAccounts();
  }
  async disconnect() {
    if (!this.session) throw new Error("Please call connect() before enable()");
    await this.client.disconnect({ topic: this.session?.topic, reason: se("USER_DISCONNECTED") }), await this.cleanup();
  }
  async connect(e) {
    if (!this.client) throw new Error("Sign Client not initialized");
    if (this.connectParams = e, this.setNamespaces(e), this.cleanupPendingPairings(), !e.skipPairing) return await this.pair(e.pairingTopic);
  }
  async authenticate(e, s) {
    if (!this.client) throw new Error("Sign Client not initialized");
    this.setNamespaces(e), await this.cleanupPendingPairings();
    const { uri: r, response: n } = await this.client.authenticate(e, s);
    r && (this.uri = r, this.events.emit("display_uri", r));
    const i = await n();
    if (this.session = i.session, this.session) {
      const o = Xh(this.session.namespaces);
      this.namespaces = Pn(this.namespaces, o), await this.persist("namespaces", this.namespaces), this.onConnect();
    }
    return i;
  }
  on(e, s) {
    this.events.on(e, s);
  }
  once(e, s) {
    this.events.once(e, s);
  }
  removeListener(e, s) {
    this.events.removeListener(e, s);
  }
  off(e, s) {
    this.events.off(e, s);
  }
  get isWalletConnect() {
    return !0;
  }
  async pair(e) {
    const { uri: s, approval: r } = await this.client.connect({ pairingTopic: e, requiredNamespaces: this.namespaces, optionalNamespaces: this.optionalNamespaces, sessionProperties: this.sessionProperties, scopedProperties: this.scopedProperties, authentication: this.connectParams?.authentication, walletPay: this.connectParams?.walletPay });
    s && (this.uri = s, this.events.emit("display_uri", s));
    const n = await r();
    this.session = n;
    const i = Xh(n.namespaces);
    return this.namespaces = Pn(this.namespaces, i), await this.persist("namespaces", this.namespaces), await this.persist("optionalNamespaces", this.optionalNamespaces), this.onConnect(), this.session;
  }
  setDefaultChain(e, s) {
    try {
      if (!this.session) return;
      const [r, n] = this.validateChain(e), i = this.getProvider(r);
      i ? i.setDefaultChain(n, s) : this.session && this.logger.warn(`Provider for namespace '${r}' not found in setDefaultChain`);
    } catch (r) {
      if (!/Please call connect/.test(r.message)) throw r;
    }
  }
  async cleanupPendingPairings(e = {}) {
    try {
      this.logger.info("Cleaning up inactive pairings...");
      const s = this.client.pairing.getAll();
      if (!st(s)) return;
      for (const r of s) e.deletePairings ? this.client.core.expirer.set(r.topic, 0) : await this.client.core.relayer.subscriber.unsubscribe(r.topic);
      this.logger.info(`Inactive pairings cleared: ${s.length}`);
    } catch (s) {
      this.logger.warn(s, "Failed to cleanup pending pairings");
    }
  }
  abortPairingAttempt() {
    this.logger.warn("abortPairingAttempt is deprecated. This is now a no-op.");
  }
  async checkStorage() {
    this.namespaces = await this.getFromStore("namespaces") || {}, this.optionalNamespaces = await this.getFromStore("optionalNamespaces") || {}, this.session && this.createProviders();
  }
  async initialize() {
    this.logger.trace("Initialized"), await this.createClient(), await this.checkStorage(), this.registerEventListeners();
  }
  async createClient() {
    if (this.client = this.providerOpts.client || await y8.init({ core: this.providerOpts.core, logger: this.providerOpts.logger || Wh, relayUrl: this.providerOpts.relayUrl || S8, projectId: this.providerOpts.projectId, metadata: this.providerOpts.metadata, storageOptions: this.providerOpts.storageOptions, storage: this.providerOpts.storage, name: this.providerOpts.name, customStoragePrefix: this.providerOpts.customStoragePrefix, telemetryEnabled: this.providerOpts.telemetryEnabled }), this.providerOpts.session) try {
      this.session = this.client.session.get(this.providerOpts.session.topic);
    } catch (e) {
      throw this.logger.error(e, "Failed to get session"), new Error(`The provided session: ${this.providerOpts?.session?.topic} doesn't exist in the Sign client`);
    }
    else {
      const e = this.client.session.getAll();
      this.session = e[0];
    }
    this.logger.trace("SignClient Initialized");
  }
  createProviders() {
    if (!this.client) throw new Error("Sign Client not initialized");
    if (!this.session) throw new Error("Session not initialized. Please call connect() before enable()");
    const e = [...new Set(Object.keys(this.session.namespaces).map((s) => nr(s)))];
    Ao("client", this.client), Ao("events", this.events), Ao("disableProviderPing", this.disableProviderPing), e.forEach((s) => {
      if (!this.session) return;
      const r = P8(s, this.session);
      if (r?.length === 0) return;
      const n = jp(r), i = { ...Pn(this.namespaces, this.optionalNamespaces)[s], accounts: r, chains: n };
      switch (s) {
        case "eip155":
          this.rpcProviders[s] = new j8({ namespace: i });
          break;
        default:
          this.rpcProviders[s] = new F8({ namespace: i });
      }
    });
  }
  registerEventListeners() {
    if (typeof this.client > "u") throw new Error("Sign Client is not initialized");
    this.client.on("session_ping", (e) => {
      const { topic: s } = e;
      s === this.session?.topic && this.events.emit("session_ping", e);
    }), this.client.on("session_event", (e) => {
      const { params: s, topic: r } = e;
      if (r !== this.session?.topic) return;
      const { event: n } = s;
      if (n.name === "accountsChanged") {
        const i = n.data;
        i && st(i) && this.events.emit("accountsChanged", i.map(Zh));
      } else if (n.name === "chainChanged") {
        const i = s.chainId, o = s.event.data, a = nr(i), c = Do(i) !== Do(o) ? `${a}:${Do(o)}` : i;
        this.onChainChanged({ currentCaipChainId: c });
      } else this.events.emit(n.name, n.data);
      this.events.emit("session_event", e);
    }), this.client.on("session_update", ({ topic: e, params: s }) => {
      if (e !== this.session?.topic) return;
      const { namespaces: r } = s, n = this.client?.session.get(e);
      this.session = { ...n, namespaces: r }, this.onSessionUpdate(), this.events.emit("session_update", { topic: e, params: s });
    }), this.client.on("session_delete", async (e) => {
      e.topic === this.session?.topic && (await this.cleanup(), this.events.emit("session_delete", e), this.events.emit("disconnect", { ...se("USER_DISCONNECTED"), data: e.topic }));
    }), this.on(hc.DEFAULT_CHAIN_CHANGED, (e) => {
      this.onChainChanged({ ...e, internal: !0 });
    });
  }
  getProvider(e) {
    return this.rpcProviders[e] || this.rpcProviders[qp];
  }
  onSessionUpdate() {
    Object.keys(this.rpcProviders).forEach((e) => {
      this.getProvider(e).updateNamespace(this.session?.namespaces[e]);
    });
  }
  setNamespaces(e) {
    const { namespaces: s = {}, optionalNamespaces: r = {}, sessionProperties: n, scopedProperties: i } = e;
    this.optionalNamespaces = Pn(s, r), this.sessionProperties = n, this.scopedProperties = i;
  }
  validateChain(e) {
    const [s, r] = e?.split(":") || ["", ""];
    if (!this.namespaces || !Object.keys(this.namespaces).length) return [s, r];
    if (s && !Object.keys(this.namespaces || {}).map((o) => nr(o)).includes(s)) throw new Error(`Namespace '${s}' is not configured. Please call connect() first with namespace config.`);
    if (s && r) return [s, r];
    const n = nr(Object.keys(this.namespaces)[0]), i = this.rpcProviders[n].getDefaultChain();
    return [n, i];
  }
  async requestAccounts() {
    const [e] = this.validateChain();
    return await this.getProvider(e).requestAccounts();
  }
  async onChainChanged({ currentCaipChainId: e, previousCaipChainId: s, internal: r = !1 }) {
    if (!this.namespaces) return;
    const [n, i] = this.validateChain(e);
    if (i) {
      if (this.updateNamespaceChain(n, i), r) this.events.emit("chainChanged", i), this.emitAccountsChangedOnChainChange({ namespace: n, currentCaipChainId: e, previousCaipChainId: s });
      else {
        const o = this.getProvider(n);
        o ? o.setDefaultChain(i) : this.session && this.logger.warn(`Provider for namespace '${n}' not found during chain change`);
      }
      await this.persist("namespaces", this.namespaces);
    }
  }
  emitAccountsChangedOnChainChange({ namespace: e, currentCaipChainId: s, previousCaipChainId: r }) {
    try {
      if (r === s) return;
      const n = this.session?.namespaces[e]?.accounts;
      if (!n) return;
      const i = n.filter((o) => o.includes(`${s}:`)).map(Zh);
      if (!st(i)) return;
      this.events.emit("accountsChanged", i);
    } catch (n) {
      this.logger.warn(n, "Failed to emit accountsChanged on chain change");
    }
  }
  updateNamespaceChain(e, s) {
    if (!this.namespaces) return;
    const r = this.namespaces[e] ? e : `${e}:${s}`, n = { chains: [], methods: [], events: [], defaultChain: s };
    this.namespaces[r] ? this.namespaces[r] && (this.namespaces[r].defaultChain = s) : this.namespaces[r] = n;
  }
  onConnect() {
    this.createProviders(), this.events.emit("connect", { session: this.session });
  }
  async cleanup() {
    this.connectParams = void 0, this.namespaces = void 0, this.optionalNamespaces = void 0, this.sessionProperties = void 0, await this.deleteFromStore("namespaces"), await this.deleteFromStore("optionalNamespaces"), await this.deleteFromStore("sessionProperties"), this.session = void 0, this.cleanupPendingPairings({ deletePairings: !0 }), await this.cleanupStorage();
  }
  async persist(e, s) {
    const r = this.session?.topic || "";
    await this.client.core.storage.setItem(`${On}/${e}${r}`, s);
  }
  async getFromStore(e) {
    const s = this.session?.topic || "";
    return await this.client.core.storage.getItem(`${On}/${e}${s}`);
  }
  async deleteFromStore(e) {
    const s = this.session?.topic || "";
    await this.client.core.storage.removeItem(`${On}/${e}${s}`);
  }
  async cleanupStorage() {
    try {
      if (this.client?.session.length > 0) return;
      const e = await this.client.core.storage.getKeys();
      for (const s of e) s.startsWith(On) && await this.client.core.storage.removeItem(s);
    } catch (e) {
      this.logger.warn(e, "Failed to cleanup storage");
    }
  }
};
const K8 = H8, V8 = "wc", W8 = "ethereum_provider", G8 = `${V8}@2:${W8}:`, Y8 = "https://rpc.walletconnect.org/v1/", fa = ["eth_sendTransaction", "personal_sign"], Z8 = ["eth_accounts", "eth_requestAccounts", "eth_sendRawTransaction", "eth_sign", "eth_signTransaction", "eth_signTypedData", "eth_signTypedData_v3", "eth_signTypedData_v4", "eth_sendTransaction", "personal_sign", "wallet_switchEthereumChain", "wallet_addEthereumChain", "wallet_getPermissions", "wallet_requestPermissions", "wallet_registerOnboarding", "wallet_watchAsset", "wallet_scanQRCode", "wallet_sendCalls", "wallet_getCapabilities", "wallet_getCallsStatus", "wallet_showCallsStatus"], da = ["chainChanged", "accountsChanged"], X8 = ["chainChanged", "accountsChanged", "message", "disconnect", "connect"], J8 = async () => {
  const { createAppKit: t } = await Promise.resolve().then(() => $D);
  return t;
};
function fi(t) {
  return Number(t[0].split(":")[1]);
}
function Tn(t) {
  return `0x${t.toString(16)}`;
}
function Q8(t) {
  const { chains: e, optionalChains: s, methods: r, optionalMethods: n, events: i, optionalEvents: o, rpcMap: a } = t;
  if (!st(e)) throw new Error("Invalid chains");
  const c = { chains: e, methods: r || fa, events: i || da, rpcMap: { ...e.length ? { [fi(e)]: a[fi(e)] } : {} } }, l = i?.filter((d) => !da.includes(d)), u = r?.filter((d) => !fa.includes(d));
  if (!s && !o && !n && !l?.length && !u?.length) return { required: e.length ? c : void 0 };
  const h = l?.length && u?.length || !s, f = { chains: [...new Set(h ? c.chains.concat(s || []) : s)], methods: [...new Set(c.methods.concat(n?.length ? n : Z8))], events: [...new Set(c.events.concat(o?.length ? o : X8))], rpcMap: a };
  return { required: e.length ? c : void 0, optional: s.length ? f : void 0 };
}
let eD = class Vp {
  constructor() {
    this.events = new Ge.EventEmitter(), this.namespace = "eip155", this.accounts = [], this.chainId = 1, this.STORAGE_KEY = G8, this.on = (e, s) => (this.events.on(e, s), this), this.once = (e, s) => (this.events.once(e, s), this), this.removeListener = (e, s) => (this.events.removeListener(e, s), this), this.off = (e, s) => (this.events.off(e, s), this), this.parseAccount = (e) => this.isCompatibleChainId(e) ? this.parseAccountId(e).address : e, this.signer = {}, this.rpc = {};
  }
  static async init(e) {
    const s = new Vp();
    return await s.initialize(e), s;
  }
  async request(e, s) {
    return await this.signer.request(e, this.formatChainId(this.chainId), s);
  }
  sendAsync(e, s, r) {
    this.signer.sendAsync(e, s, this.formatChainId(this.chainId), r);
  }
  get connected() {
    return this.signer.client ? this.signer.client.core.relayer.connected : !1;
  }
  get connecting() {
    return this.signer.client ? this.signer.client.core.relayer.connecting : !1;
  }
  async enable() {
    return this.session || await this.connect(), await this.request({ method: "eth_requestAccounts" });
  }
  async connect(e) {
    if (!this.signer.client) throw new Error("Provider not initialized. Call init() first");
    this.loadConnectOpts(e);
    const { required: s, optional: r } = Q8(this.rpc);
    try {
      const n = await new Promise(async (o, a) => {
        this.rpc.showQrModal && (this.modal?.open(), this.modal?.subscribeState((l) => {
          !l.open && !this.signer.session && (this.signer.abortPairingAttempt(), a(new Error("Connection request reset. Please try again.")));
        }));
        const c = e?.scopedProperties ? { [this.namespace]: e.scopedProperties } : void 0;
        await this.signer.connect({ namespaces: { ...s && { [this.namespace]: s } }, ...r && { optionalNamespaces: { [this.namespace]: r } }, pairingTopic: e?.pairingTopic, scopedProperties: c }).then((l) => {
          o(l);
        }).catch((l) => {
          this.modal?.showErrorMessage("Unable to connect"), a(new Error(l.message));
        });
      });
      if (!n) return;
      const i = Zl(n.namespaces, [this.namespace]);
      this.setChainIds(this.rpc.chains.length ? this.rpc.chains : i), this.setAccounts(i), this.events.emit("connect", { chainId: Tn(this.chainId) });
    } catch (n) {
      throw this.signer.logger.error(n), n;
    } finally {
      this.modal?.close();
    }
  }
  async authenticate(e, s) {
    if (!this.signer.client) throw new Error("Provider not initialized. Call init() first");
    this.loadConnectOpts({ chains: e?.chains });
    try {
      const r = await new Promise(async (i, o) => {
        this.rpc.showQrModal && (this.modal?.open(), this.modal?.subscribeState((a) => {
          !a.open && !this.signer.session && (this.signer.abortPairingAttempt(), o(new Error("Connection request reset. Please try again.")));
        })), await this.signer.authenticate({ ...e, chains: this.rpc.chains }, s).then((a) => {
          i(a);
        }).catch((a) => {
          this.modal?.showErrorMessage("Unable to connect"), o(new Error(a.message));
        });
      }), n = r.session;
      if (n) {
        const i = Zl(n.namespaces, [this.namespace]);
        this.setChainIds(this.rpc.chains.length ? this.rpc.chains : i), this.setAccounts(i), this.events.emit("connect", { chainId: Tn(this.chainId) });
      }
      return r;
    } catch (r) {
      throw this.signer.logger.error(r), r;
    } finally {
      this.modal?.close();
    }
  }
  async disconnect() {
    this.session && await this.signer.disconnect(), this.reset();
  }
  get isWalletConnect() {
    return !0;
  }
  get session() {
    return this.signer.session;
  }
  registerEventListeners() {
    this.signer.on("session_event", (e) => {
      const { params: s } = e, { event: r } = s;
      r.name === "accountsChanged" ? (this.accounts = this.parseAccounts(r.data), this.events.emit("accountsChanged", this.accounts)) : r.name === "chainChanged" ? this.setChainId(this.formatChainId(r.data)) : this.events.emit(r.name, r.data), this.events.emit("session_event", e);
    }), this.signer.on("accountsChanged", (e) => {
      this.accounts = this.parseAccounts(e), this.events.emit("accountsChanged", this.accounts);
    }), this.signer.on("chainChanged", (e) => {
      const s = parseInt(e);
      this.chainId = s, this.events.emit("chainChanged", Tn(this.chainId)), this.persist();
    }), this.signer.on("session_update", (e) => {
      this.events.emit("session_update", e);
    }), this.signer.on("session_delete", (e) => {
      this.reset(), this.events.emit("session_delete", e), this.events.emit("disconnect", { ...se("USER_DISCONNECTED"), data: e.topic, name: "USER_DISCONNECTED" });
    }), this.signer.on("display_uri", (e) => {
      this.events.emit("display_uri", e);
    });
  }
  switchEthereumChain(e) {
    this.request({ method: "wallet_switchEthereumChain", params: [{ chainId: e.toString(16) }] });
  }
  isCompatibleChainId(e) {
    return typeof e == "string" ? e.startsWith(`${this.namespace}:`) : !1;
  }
  formatChainId(e) {
    return `${this.namespace}:${e}`;
  }
  parseChainId(e) {
    return Number(e.split(":")[1]);
  }
  setChainIds(e) {
    const s = e.filter((r) => this.isCompatibleChainId(r)).map((r) => this.parseChainId(r));
    s.length && (this.chainId = s[0], this.events.emit("chainChanged", Tn(this.chainId)), this.persist());
  }
  setChainId(e) {
    if (this.isCompatibleChainId(e)) {
      const s = this.parseChainId(e);
      this.chainId = s, this.switchEthereumChain(s);
    }
  }
  parseAccountId(e) {
    const [s, r, n] = e.split(":");
    return { chainId: `${s}:${r}`, address: n };
  }
  setAccounts(e) {
    this.accounts = e.filter((s) => this.parseChainId(this.parseAccountId(s).chainId) === this.chainId).map((s) => this.parseAccountId(s).address), this.events.emit("accountsChanged", this.accounts);
  }
  getRpcConfig(e) {
    const s = e?.chains ?? [], r = e?.optionalChains ?? [], n = s.concat(r);
    if (!n.length) throw new Error("No chains specified in either `chains` or `optionalChains`");
    const i = s.length ? e?.methods || fa : [], o = s.length ? e?.events || da : [], a = e?.optionalMethods || [], c = e?.optionalEvents || [], l = e?.rpcMap || this.buildRpcMap(n, e.projectId), u = e?.qrModalOptions || void 0;
    return { chains: s?.map((h) => this.formatChainId(h)), optionalChains: r.map((h) => this.formatChainId(h)), methods: i, events: o, optionalMethods: a, optionalEvents: c, rpcMap: l, showQrModal: !!e?.showQrModal, qrModalOptions: u, projectId: e.projectId, metadata: e.metadata };
  }
  buildRpcMap(e, s) {
    const r = {};
    return e.forEach((n) => {
      r[n] = this.getRpcUrl(n, s);
    }), r;
  }
  async initialize(e) {
    if (this.rpc = this.getRpcConfig(e), this.chainId = this.rpc.chains.length ? fi(this.rpc.chains) : fi(this.rpc.optionalChains), this.signer = await K8.init({ projectId: this.rpc.projectId, metadata: this.rpc.metadata, disableProviderPing: e.disableProviderPing, relayUrl: e.relayUrl, storage: e.storage, storageOptions: e.storageOptions, customStoragePrefix: e.customStoragePrefix, telemetryEnabled: e.telemetryEnabled, logger: e.logger, client: e.client, core: e.core }), this.registerEventListeners(), await this.loadPersistedSession(), this.rpc.showQrModal) {
      let s;
      try {
        const r = await J8(), { convertWCMToAppKitOptions: n } = await Promise.resolve().then(function() {
          return iD;
        }), i = n({ ...this.rpc.qrModalOptions, chains: [.../* @__PURE__ */ new Set([...this.rpc.chains, ...this.rpc.optionalChains])], metadata: this.rpc.metadata, projectId: this.rpc.projectId });
        if (!i.networks.length) throw new Error("No networks found for WalletConnect");
        s = r({ ...i, universalProvider: this.signer, manualWCControl: !0, enableMobileFullScreen: this.rpc.qrModalOptions?.enableMobileFullScreen === !0 });
      } catch (r) {
        throw console.warn(r), new Error("To use QR modal, please install @reown/appkit package");
      }
      if (s) try {
        this.modal = s;
      } catch (r) {
        throw this.signer.logger.error(r), new Error("Could not generate WalletConnectModal Instance");
      }
    }
  }
  loadConnectOpts(e) {
    if (!e) return;
    const { chains: s, optionalChains: r, rpcMap: n } = e;
    s && st(s) && (this.rpc.chains = s.map((i) => this.formatChainId(i)), s.forEach((i) => {
      this.rpc.rpcMap[i] = n?.[i] || this.getRpcUrl(i);
    })), r && st(r) && (this.rpc.optionalChains = [], this.rpc.optionalChains = r?.map((i) => this.formatChainId(i)), r.forEach((i) => {
      this.rpc.rpcMap[i] = n?.[i] || this.getRpcUrl(i);
    }));
  }
  getRpcUrl(e, s) {
    return this.rpc.rpcMap?.[e] || `${Y8}?chainId=eip155:${e}&projectId=${s || this.rpc.projectId}`;
  }
  async loadPersistedSession() {
    if (this.session) try {
      const e = await this.signer.client.core.storage.getItem(`${this.STORAGE_KEY}/chainId`), s = this.session.namespaces[`${this.namespace}:${e}`] ? this.session.namespaces[`${this.namespace}:${e}`] : this.session.namespaces[this.namespace];
      this.setChainIds(e ? [this.formatChainId(e)] : s?.accounts), this.setAccounts(s?.accounts);
    } catch (e) {
      this.signer.logger.error("Failed to load persisted session, clearing state..."), this.signer.logger.error(e), await this.disconnect().catch((s) => this.signer.logger.warn(s));
    }
  }
  reset() {
    this.chainId = 1, this.accounts = [];
  }
  persist() {
    this.session && this.signer.client.core.storage.setItem(`${this.STORAGE_KEY}/chainId`, this.chainId);
  }
  parseAccounts(e) {
    return typeof e == "string" || e instanceof String ? [this.parseAccount(e)] : e.map((s) => this.parseAccount(s));
  }
};
const tD = eD;
function sD(t) {
  if (t) return { "--w3m-font-family": t["--wcm-font-family"], "--w3m-accent": t["--wcm-accent-color"], "--w3m-color-mix": t["--wcm-background-color"], "--w3m-z-index": t["--wcm-z-index"] ? Number(t["--wcm-z-index"]) : void 0, "--w3m-qr-color": t["--wcm-accent-color"], "--w3m-font-size-master": t["--wcm-text-medium-regular-size"], "--w3m-border-radius-master": t["--wcm-container-border-radius"], "--w3m-color-mix-strength": 0 };
}
const rD = (t) => {
  const [e, s] = t.split(":");
  return Wp({ id: s, caipNetworkId: t, chainNamespace: e, name: "", nativeCurrency: { name: "", symbol: "", decimals: 8 }, rpcUrls: { default: { http: ["https://rpc.walletconnect.org/v1"] } } });
};
function nD(t) {
  const e = t.chains?.map(rD).filter(Boolean);
  if (e.length === 0) throw new Error("At least one chain must be specified");
  const s = e.find((n) => n.id === t.defaultChain?.id), r = { projectId: t.projectId, networks: e, themeMode: t.themeMode, themeVariables: sD(t.themeVariables), chainImages: t.chainImages, connectorImages: t.walletImages, defaultNetwork: s, metadata: { ...t.metadata, name: t.metadata?.name || "WalletConnect", description: t.metadata?.description || "Connect to WalletConnect-compatible wallets", url: t.metadata?.url || "https://walletconnect.org", icons: t.metadata?.icons || ["https://walletconnect.org/walletconnect-logo.png"] }, showWallets: !0, featuredWalletIds: t.explorerRecommendedWalletIds === "NONE" ? [] : Array.isArray(t.explorerRecommendedWalletIds) ? t.explorerRecommendedWalletIds : [], excludeWalletIds: t.explorerExcludedWalletIds === "ALL" ? [] : Array.isArray(t.explorerExcludedWalletIds) ? t.explorerExcludedWalletIds : [], enableEIP6963: !1, enableInjected: !1, enableCoinbase: !0, enableWalletConnect: !0, features: { email: !1, socials: !1 } };
  if (t.mobileWallets?.length || t.desktopWallets?.length) {
    const n = [...(t.mobileWallets || []).map((a) => ({ id: a.id, name: a.name, links: a.links })), ...(t.desktopWallets || []).map((a) => ({ id: a.id, name: a.name, links: { native: a.links.native, universal: a.links.universal } }))], i = [...r.featuredWalletIds || [], ...r.excludeWalletIds || []], o = n.filter((a) => !i.includes(a.id));
    o.length && (r.customWallets = o);
  }
  return r;
}
function Wp(t) {
  return { formatters: void 0, fees: void 0, serializers: void 0, ...t };
}
var iD = Object.freeze({ __proto__: null, convertWCMToAppKitOptions: nD, defineChain: Wp }), Ts = /* @__PURE__ */ ((t) => (t[t.Border = -1] = "Border", t[t.Data = 0] = "Data", t[t.Function = 1] = "Function", t[t.Position = 2] = "Position", t[t.Timing = 3] = "Timing", t[t.Alignment = 4] = "Alignment", t))(Ts || {});
const oD = [0, 1], Gp = [1, 0], Yp = [2, 3], Zp = [3, 2], aD = {
  L: oD,
  M: Gp,
  Q: Yp,
  H: Zp
}, cD = /^\d*$/, lD = /^[A-Z0-9 $%*+./:-]*$/, Po = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:", uc = 1, fc = 40, eu = 3, hD = 3, Bn = 40, uD = 10, Xp = [
  // Version: (note that index 0 is for padding, and is set to an illegal value)
  // 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40    Error correction level
  [-1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
  // Low
  [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28],
  // Medium
  [-1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
  // Quartile
  [-1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
  // High
], Jp = [
  // Version: (note that index 0 is for padding, and is set to an illegal value)
  // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40    Error correction level
  [-1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25],
  // Low
  [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49],
  // Medium
  [-1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68],
  // Quartile
  [-1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81]
  // High
];
class fD {
  /* -- Constructor (low level) and fields -- */
  // Creates a new QR Code with the given version number,
  // error correction level, data codeword bytes, and mask number.
  // This is a low-level API that most users should not use directly.
  // A mid-level API is the encodeSegments() function.
  constructor(e, s, r, n) {
    /* -- Fields -- */
    // The width and height of this QR Code, measured in modules, between
    // 21 and 177 (inclusive). This is equal to version * 4 + 17.
    G(this, "size");
    // The index of the mask pattern used in this QR Code, which is between 0 and 7 (inclusive).
    // Even if a QR Code is created with automatic masking requested (mask = -1),
    // the resulting object still has a mask value between 0 and 7.
    G(this, "mask");
    // The modules of this QR Code (false = light, true = dark).
    // Immutable after constructor finishes. Accessed through getModule().
    G(this, "modules", []);
    G(this, "types", []);
    if (this.version = e, this.ecc = s, e < uc || e > fc)
      throw new RangeError("Version value out of range");
    if (n < -1 || n > 7)
      throw new RangeError("Mask value out of range");
    this.size = e * 4 + 17;
    const i = Array.from({ length: this.size }).fill(!1);
    for (let a = 0; a < this.size; a++)
      this.modules.push(i.slice()), this.types.push(i.map(() => 0));
    this.drawFunctionPatterns();
    const o = this.addEccAndInterleave(r);
    if (this.drawCodewords(o), n === -1) {
      let a = 1e9;
      for (let c = 0; c < 8; c++) {
        this.applyMask(c), this.drawFormatBits(c);
        const l = this.getPenaltyScore();
        l < a && (n = c, a = l), this.applyMask(c);
      }
    }
    this.mask = n, this.applyMask(n), this.drawFormatBits(n);
  }
  /* -- Accessor methods -- */
  // Returns the color of the module (pixel) at the given coordinates, which is false
  // for light or true for dark. The top left corner has the coordinates (x=0, y=0).
  // If the given coordinates are out of bounds, then false (light) is returned.
  getModule(e, s) {
    return e >= 0 && e < this.size && s >= 0 && s < this.size && this.modules[s][e];
  }
  /* -- Private helper methods for constructor: Drawing function modules -- */
  // Reads this object's version field, and draws and marks all function modules.
  drawFunctionPatterns() {
    for (let r = 0; r < this.size; r++)
      this.setFunctionModule(6, r, r % 2 === 0, Ts.Timing), this.setFunctionModule(r, 6, r % 2 === 0, Ts.Timing);
    this.drawFinderPattern(3, 3), this.drawFinderPattern(this.size - 4, 3), this.drawFinderPattern(3, this.size - 4);
    const e = this.getAlignmentPatternPositions(), s = e.length;
    for (let r = 0; r < s; r++)
      for (let n = 0; n < s; n++)
        r === 0 && n === 0 || r === 0 && n === s - 1 || r === s - 1 && n === 0 || this.drawAlignmentPattern(e[r], e[n]);
    this.drawFormatBits(0), this.drawVersion();
  }
  // Draws two copies of the format bits (with its own error correction code)
  // based on the given mask and this object's error correction level field.
  drawFormatBits(e) {
    const s = this.ecc[1] << 3 | e;
    let r = s;
    for (let i = 0; i < 10; i++)
      r = r << 1 ^ (r >>> 9) * 1335;
    const n = (s << 10 | r) ^ 21522;
    for (let i = 0; i <= 5; i++)
      this.setFunctionModule(8, i, Ut(n, i));
    this.setFunctionModule(8, 7, Ut(n, 6)), this.setFunctionModule(8, 8, Ut(n, 7)), this.setFunctionModule(7, 8, Ut(n, 8));
    for (let i = 9; i < 15; i++)
      this.setFunctionModule(14 - i, 8, Ut(n, i));
    for (let i = 0; i < 8; i++)
      this.setFunctionModule(this.size - 1 - i, 8, Ut(n, i));
    for (let i = 8; i < 15; i++)
      this.setFunctionModule(8, this.size - 15 + i, Ut(n, i));
    this.setFunctionModule(8, this.size - 8, !0);
  }
  // Draws two copies of the version bits (with its own error correction code),
  // based on this object's version field, iff 7 <= version <= 40.
  drawVersion() {
    if (this.version < 7)
      return;
    let e = this.version;
    for (let r = 0; r < 12; r++)
      e = e << 1 ^ (e >>> 11) * 7973;
    const s = this.version << 12 | e;
    for (let r = 0; r < 18; r++) {
      const n = Ut(s, r), i = this.size - 11 + r % 3, o = Math.floor(r / 3);
      this.setFunctionModule(i, o, n), this.setFunctionModule(o, i, n);
    }
  }
  // Draws a 9*9 finder pattern including the border separator,
  // with the center module at (x, y). Modules can be out of bounds.
  drawFinderPattern(e, s) {
    for (let r = -4; r <= 4; r++)
      for (let n = -4; n <= 4; n++) {
        const i = Math.max(Math.abs(n), Math.abs(r)), o = e + n, a = s + r;
        o >= 0 && o < this.size && a >= 0 && a < this.size && this.setFunctionModule(o, a, i !== 2 && i !== 4, Ts.Position);
      }
  }
  // Draws a 5*5 alignment pattern, with the center module
  // at (x, y). All modules must be in bounds.
  drawAlignmentPattern(e, s) {
    for (let r = -2; r <= 2; r++)
      for (let n = -2; n <= 2; n++)
        this.setFunctionModule(
          e + n,
          s + r,
          Math.max(Math.abs(n), Math.abs(r)) !== 1,
          Ts.Alignment
        );
  }
  // Sets the color of a module and marks it as a function module.
  // Only used by the constructor. Coordinates must be in bounds.
  setFunctionModule(e, s, r, n = Ts.Function) {
    this.modules[s][e] = r, this.types[s][e] = n;
  }
  /* -- Private helper methods for constructor: Codewords and masking -- */
  // Returns a new byte string representing the given data with the appropriate error correction
  // codewords appended to it, based on this object's version and error correction level.
  addEccAndInterleave(e) {
    const s = this.version, r = this.ecc;
    if (e.length !== jn(s, r))
      throw new RangeError("Invalid argument");
    const n = Jp[r[0]][s], i = Xp[r[0]][s], o = Math.floor(pa(s) / 8), a = n - o % n, c = Math.floor(o / n), l = [], u = ED(i);
    for (let f = 0, d = 0; f < n; f++) {
      const g = e.slice(d, d + c - i + (f < a ? 0 : 1));
      d += g.length;
      const w = xD(g, u);
      f < a && g.push(0), l.push(g.concat(w));
    }
    const h = [];
    for (let f = 0; f < l[0].length; f++)
      l.forEach((d, g) => {
        (f !== c - i || g >= a) && h.push(d[f]);
      });
    return h;
  }
  // Draws the given sequence of 8-bit codewords (data and error correction) onto the entire
  // data area of this QR Code. Function modules need to be marked off before this is called.
  drawCodewords(e) {
    if (e.length !== Math.floor(pa(this.version) / 8))
      throw new RangeError("Invalid argument");
    let s = 0;
    for (let r = this.size - 1; r >= 1; r -= 2) {
      r === 6 && (r = 5);
      for (let n = 0; n < this.size; n++)
        for (let i = 0; i < 2; i++) {
          const o = r - i, c = (r + 1 & 2) === 0 ? this.size - 1 - n : n;
          !this.types[c][o] && s < e.length * 8 && (this.modules[c][o] = Ut(e[s >>> 3], 7 - (s & 7)), s++);
        }
    }
  }
  // XORs the codeword modules in this QR Code with the given mask pattern.
  // The function modules must be marked and the codeword bits must be drawn
  // before masking. Due to the arithmetic of XOR, calling applyMask() with
  // the same mask value a second time will undo the mask. A final well-formed
  // QR Code needs exactly one (not zero, two, etc.) mask applied.
  applyMask(e) {
    if (e < 0 || e > 7)
      throw new RangeError("Mask value out of range");
    for (let s = 0; s < this.size; s++)
      for (let r = 0; r < this.size; r++) {
        let n;
        switch (e) {
          case 0:
            n = (r + s) % 2 === 0;
            break;
          case 1:
            n = s % 2 === 0;
            break;
          case 2:
            n = r % 3 === 0;
            break;
          case 3:
            n = (r + s) % 3 === 0;
            break;
          case 4:
            n = (Math.floor(r / 3) + Math.floor(s / 2)) % 2 === 0;
            break;
          case 5:
            n = r * s % 2 + r * s % 3 === 0;
            break;
          case 6:
            n = (r * s % 2 + r * s % 3) % 2 === 0;
            break;
          case 7:
            n = ((r + s) % 2 + r * s % 3) % 2 === 0;
            break;
          default:
            throw new Error("Unreachable");
        }
        !this.types[s][r] && n && (this.modules[s][r] = !this.modules[s][r]);
      }
  }
  // Calculates and returns the penalty score based on state of this QR Code's current modules.
  // This is used by the automatic mask choice algorithm to find the mask pattern that yields the lowest score.
  getPenaltyScore() {
    let e = 0;
    for (let i = 0; i < this.size; i++) {
      let o = !1, a = 0;
      const c = [0, 0, 0, 0, 0, 0, 0];
      for (let l = 0; l < this.size; l++)
        this.modules[i][l] === o ? (a++, a === 5 ? e += eu : a > 5 && e++) : (this.finderPenaltyAddHistory(a, c), o || (e += this.finderPenaltyCountPatterns(c) * Bn), o = this.modules[i][l], a = 1);
      e += this.finderPenaltyTerminateAndCount(o, a, c) * Bn;
    }
    for (let i = 0; i < this.size; i++) {
      let o = !1, a = 0;
      const c = [0, 0, 0, 0, 0, 0, 0];
      for (let l = 0; l < this.size; l++)
        this.modules[l][i] === o ? (a++, a === 5 ? e += eu : a > 5 && e++) : (this.finderPenaltyAddHistory(a, c), o || (e += this.finderPenaltyCountPatterns(c) * Bn), o = this.modules[l][i], a = 1);
      e += this.finderPenaltyTerminateAndCount(o, a, c) * Bn;
    }
    for (let i = 0; i < this.size - 1; i++)
      for (let o = 0; o < this.size - 1; o++) {
        const a = this.modules[i][o];
        a === this.modules[i][o + 1] && a === this.modules[i + 1][o] && a === this.modules[i + 1][o + 1] && (e += hD);
      }
    let s = 0;
    for (const i of this.modules)
      s = i.reduce((o, a) => o + (a ? 1 : 0), s);
    const r = this.size * this.size, n = Math.ceil(Math.abs(s * 20 - r * 10) / r) - 1;
    return e += n * uD, e;
  }
  /* -- Private helper functions -- */
  // Returns an ascending list of positions of alignment patterns for this version number.
  // Each position is in the range [0,177), and are used on both the x and y axes.
  // This could be implemented as lookup table of 40 variable-length lists of integers.
  getAlignmentPatternPositions() {
    if (this.version === 1)
      return [];
    {
      const e = Math.floor(this.version / 7) + 2, s = this.version === 32 ? 26 : Math.ceil((this.version * 4 + 4) / (e * 2 - 2)) * 2, r = [6];
      for (let n = this.size - 7; r.length < e; n -= s)
        r.splice(1, 0, n);
      return r;
    }
  }
  // Can only be called immediately after a light run is added, and
  // returns either 0, 1, or 2. A helper function for getPenaltyScore().
  finderPenaltyCountPatterns(e) {
    const s = e[1], r = s > 0 && e[2] === s && e[3] === s * 3 && e[4] === s && e[5] === s;
    return (r && e[0] >= s * 4 && e[6] >= s ? 1 : 0) + (r && e[6] >= s * 4 && e[0] >= s ? 1 : 0);
  }
  // Must be called at the end of a line (row or column) of modules. A helper function for getPenaltyScore().
  finderPenaltyTerminateAndCount(e, s, r) {
    return e && (this.finderPenaltyAddHistory(s, r), s = 0), s += this.size, this.finderPenaltyAddHistory(s, r), this.finderPenaltyCountPatterns(r);
  }
  // Pushes the given value to the front and drops the last value. A helper function for getPenaltyScore().
  finderPenaltyAddHistory(e, s) {
    s[0] === 0 && (e += this.size), s.pop(), s.unshift(e);
  }
}
function Ht(t, e, s) {
  if (e < 0 || e > 31 || t >>> e)
    throw new RangeError("Value out of range");
  for (let r = e - 1; r >= 0; r--)
    s.push(t >>> r & 1);
}
function Ut(t, e) {
  return (t >>> e & 1) !== 0;
}
class dc {
  // Creates a new QR Code segment with the given attributes and data.
  // The character count (numChars) must agree with the mode and the bit buffer length,
  // but the constraint isn't checked. The given bit buffer is cloned and stored.
  constructor(e, s, r) {
    if (this.mode = e, this.numChars = s, this.bitData = r, s < 0)
      throw new RangeError("Invalid argument");
    this.bitData = r.slice();
  }
  /* -- Methods -- */
  // Returns a new copy of the data bits of this segment.
  getData() {
    return this.bitData.slice();
  }
}
const dD = [1, 10, 12, 14], pD = [2, 9, 11, 13], gD = [4, 8, 16, 16];
function Qp(t, e) {
  return t[Math.floor((e + 7) / 17) + 1];
}
function eg(t) {
  const e = [];
  for (const s of t)
    Ht(s, 8, e);
  return new dc(gD, t.length, e);
}
function yD(t) {
  if (!tg(t))
    throw new RangeError("String contains non-numeric characters");
  const e = [];
  for (let s = 0; s < t.length; ) {
    const r = Math.min(t.length - s, 3);
    Ht(Number.parseInt(t.substring(s, s + r), 10), r * 3 + 1, e), s += r;
  }
  return new dc(dD, t.length, e);
}
function wD(t) {
  if (!sg(t))
    throw new RangeError("String contains unencodable characters in alphanumeric mode");
  const e = [];
  let s;
  for (s = 0; s + 2 <= t.length; s += 2) {
    let r = Po.indexOf(t.charAt(s)) * 45;
    r += Po.indexOf(t.charAt(s + 1)), Ht(r, 11, e);
  }
  return s < t.length && Ht(Po.indexOf(t.charAt(s)), 6, e), new dc(pD, t.length, e);
}
function mD(t) {
  return t === "" ? [] : tg(t) ? [yD(t)] : sg(t) ? [wD(t)] : [eg(vD(t))];
}
function tg(t) {
  return cD.test(t);
}
function sg(t) {
  return lD.test(t);
}
function bD(t, e) {
  let s = 0;
  for (const r of t) {
    const n = Qp(r.mode, e);
    if (r.numChars >= 1 << n)
      return Number.POSITIVE_INFINITY;
    s += 4 + n + r.bitData.length;
  }
  return s;
}
function vD(t) {
  t = encodeURI(t);
  const e = [];
  for (let s = 0; s < t.length; s++)
    t.charAt(s) !== "%" ? e.push(t.charCodeAt(s)) : (e.push(Number.parseInt(t.substring(s + 1, s + 3), 16)), s += 2);
  return e;
}
function pa(t) {
  if (t < uc || t > fc)
    throw new RangeError("Version number out of range");
  let e = (16 * t + 128) * t + 64;
  if (t >= 2) {
    const s = Math.floor(t / 7) + 2;
    e -= (25 * s - 10) * s - 55, t >= 7 && (e -= 36);
  }
  return e;
}
function jn(t, e) {
  return Math.floor(pa(t) / 8) - Xp[e[0]][t] * Jp[e[0]][t];
}
function ED(t) {
  if (t < 1 || t > 255)
    throw new RangeError("Degree out of range");
  const e = [];
  for (let r = 0; r < t - 1; r++)
    e.push(0);
  e.push(1);
  let s = 1;
  for (let r = 0; r < t; r++) {
    for (let n = 0; n < e.length; n++)
      e[n] = ga(e[n], s), n + 1 < e.length && (e[n] ^= e[n + 1]);
    s = ga(s, 2);
  }
  return e;
}
function xD(t, e) {
  const s = e.map((r) => 0);
  for (const r of t) {
    const n = r ^ s.shift();
    s.push(0), e.forEach((i, o) => s[o] ^= ga(i, n));
  }
  return s;
}
function ga(t, e) {
  if (t >>> 8 || e >>> 8)
    throw new RangeError("Byte out of range");
  let s = 0;
  for (let r = 7; r >= 0; r--)
    s = s << 1 ^ (s >>> 7) * 285, s ^= (e >>> r & 1) * t;
  return s;
}
function _D(t, e, s = 1, r = 40, n = -1, i = !0) {
  if (!(uc <= s && s <= r && r <= fc) || n < -1 || n > 7)
    throw new RangeError("Invalid value");
  let o, a;
  for (o = s; ; o++) {
    const h = jn(o, e) * 8, f = bD(t, o);
    if (f <= h) {
      a = f;
      break;
    }
    if (o >= r)
      throw new RangeError("Data too long");
  }
  for (const h of [Gp, Yp, Zp])
    i && a <= jn(o, h) * 8 && (e = h);
  const c = [];
  for (const h of t) {
    Ht(h.mode[0], 4, c), Ht(h.numChars, Qp(h.mode, o), c);
    for (const f of h.getData())
      c.push(f);
  }
  const l = jn(o, e) * 8;
  Ht(0, Math.min(4, l - c.length), c), Ht(0, (8 - c.length % 8) % 8, c);
  for (let h = 236; c.length < l; h ^= 253)
    Ht(h, 8, c);
  const u = Array.from({ length: Math.ceil(c.length / 8) }, () => 0);
  return c.forEach((h, f) => u[f >>> 3] |= h << 7 - (f & 7)), new fD(o, e, u, n);
}
function ID(t, e) {
  const {
    ecc: s = "L",
    boostEcc: r = !1,
    minVersion: n = 1,
    maxVersion: i = 40,
    maskPattern: o = -1,
    border: a = 1
  } = e || {}, c = typeof t == "string" ? mD(t) : Array.isArray(t) ? [eg(t)] : void 0;
  if (!c)
    throw new Error(`uqr only supports encoding string and binary data, but got: ${typeof t}`);
  const l = _D(
    c,
    aD[s],
    n,
    i,
    o,
    r
  ), u = SD({
    version: l.version,
    maskPattern: l.mask,
    size: l.size,
    data: l.modules,
    types: l.types
  }, a);
  return e?.invert && (u.data = u.data.map((h) => h.map((f) => !f))), e?.onEncoded?.(u), u;
}
function SD(t, e = 1) {
  if (!e)
    return t;
  const { size: s } = t, r = s + e * 2;
  t.size = r, t.data.forEach((i) => {
    for (let o = 0; o < e; o++)
      i.unshift(!1), i.push(!1);
  });
  for (let i = 0; i < e; i++)
    t.data.unshift(Array.from({ length: r }, (o) => !1)), t.data.push(Array.from({ length: r }, (o) => !1));
  const n = Ts.Border;
  t.types.forEach((i) => {
    for (let o = 0; o < e; o++)
      i.unshift(n), i.push(n);
  });
  for (let i = 0; i < e; i++)
    t.types.unshift(Array.from({ length: r }, (o) => n)), t.types.push(Array.from({ length: r }, (o) => n));
  return t;
}
function tu(t) {
  return t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function DD(t, e = {}) {
  const s = ID(t, e), {
    pixelSize: r = 10,
    whiteColor: n = "white",
    blackColor: i = "black"
  } = e, o = s.size * r, a = s.size * r;
  let c = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${a} ${o}">`;
  const l = [];
  for (let u = 0; u < s.size; u++)
    for (let h = 0; h < s.size; h++) {
      const f = h * r, d = u * r;
      s.data[u][h] && l.push(`M${f},${d}h${r}v${r}h-${r}z`);
    }
  return c += `<rect fill="${tu(n)}" width="${a}" height="${o}"/>`, c += `<path fill="${tu(i)}" d="${l.join("")}"/>`, c += "</svg>", c;
}
async function wA(t) {
  return tD.init({
    projectId: t.projectId,
    showQrModal: !1,
    chains: [1],
    optionalChains: [8453],
    methods: ["personal_sign", "eth_accounts"],
    optionalMethods: [],
    events: ["accountsChanged", "chainChanged"],
    optionalEvents: ["disconnect"],
    metadata: { name: t.name, description: t.description, url: t.url, icons: t.icons }
  });
}
const mA = (t) => DD(t, { ecc: "M", border: 2, pixelSize: 6, whiteColor: "#ffffff", blackColor: "#030a2a" }), AD = () => {
  throw new Error("AppKit modal is not bundled in Prix Clash (showQrModal is false).");
}, $D = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createAppKit: AD
}, Symbol.toStringTag, { value: "Module" }));
export {
  wA as createProvider,
  mA as qrSVG
};
