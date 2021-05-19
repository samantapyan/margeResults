export function applyPolyfill (window, document) {
/*!
String.prototype.endsWith
*/
  String.prototype.endsWith || Object.defineProperty(String.prototype, 'endsWith', { writable: !0, configurable: !0, value: function (b, a) { if (void 0 === a || a > this.length)a = this.length; return this.substring(a - b.length, a) === b } })
  /*!
String.prototype.includes
*/
  String.prototype.includes || (String.prototype.includes = function (b, a) { typeof a !== 'number' && (a = 0); return a + b.length > this.length ? !1 : this.indexOf(b, a) !== -1 })
  /*!
String.prototype.startsWith
*/
  String.prototype.startsWith || Object.defineProperty(String.prototype, 'startsWith', { writable: !0, configurable: !0, value: function (b, a) { return this.substr(!a || a < 0 ? 0 : +a, b.length) === b } })
}
