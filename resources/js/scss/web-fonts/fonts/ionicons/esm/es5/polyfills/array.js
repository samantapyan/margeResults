export function applyPolyfill (window, document) {
/*!
Array.prototype.find
*/
  Array.prototype.find || Object.defineProperty(Array.prototype, 'find', { writable: !0, configurable: !0, value: function (c, e) { if (this == null) throw new TypeError('"this" is null or not defined'); var b = Object(this); var f = b.length >>> 0; if (typeof c !== 'function') throw new TypeError('predicate must be a function'); for (var a = 0; a < f;) { var d = b[a]; if (c.call(e, d, a, b)) return d; a++ } } })
  /*!
Array.from
*/
  Array.from || (Array.from = (function () {
    var l = Object.prototype.toString; var h = function (c) { return typeof c === 'function' || l.call(c) === '[object Function]' }; var m = Math.pow(2, 53) - 1; return function (c) {
      var k = Object(c); if (c == null) throw new TypeError('Array.from requires an array-like object - not null or undefined'); var d = arguments.length > 1 ? arguments[1] : void 0; var f; if (typeof d !== 'undefined') { if (!h(d)) throw new TypeError('Array.from: when provided, the second argument must be a function'); arguments.length > 2 && (f = arguments[2]) } var a =
Number(k.length); a = isNaN(a) ? 0 : a !== 0 && isFinite(a) ? (a > 0 ? 1 : -1) * Math.floor(Math.abs(a)) : a; a = Math.min(Math.max(a, 0), m); for (var g = h(this) ? Object(new this(a)) : Array(a), b = 0, e; b < a;)e = k[b], g[b] = d ? typeof f === 'undefined' ? d(e, b) : d.call(f, e, b) : e, b += 1; g.length = a; return g
    }
  }()))
  /*!
Array.prototype.includes
*/
  Array.prototype.includes || Object.defineProperty(Array.prototype, 'includes', { writable: !0, configurable: !0, value: function (r, e) { if (this == null) throw new TypeError('"this" is null or not defined'); var t = Object(this); var n = t.length >>> 0; if (n === 0) return !1; var i; var o; var a = 0 | e; var u = Math.max(a >= 0 ? a : n - Math.abs(a), 0); for (;u < n;) { if ((i = t[u]) === (o = r) || typeof i === 'number' && typeof o === 'number' && isNaN(i) && isNaN(o)) return !0; u++ } return !1 } })
}
