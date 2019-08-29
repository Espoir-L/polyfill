(function(undefined) {
  function ArrayCreate(r) {
      if (1 / r == -Infinity && (r = 0),
      r > Math.pow(2, 32) - 1)
          throw new RangeError("Invalid array length");
      var n = [];
      return n.length = r,
      n
  }
  function Call(t, l) {
      var n = arguments.length > 2 ? arguments[2] : [];
      if (!1 === IsCallable(t))
          throw new TypeError(Object.prototype.toString.call(t) + "is not a function.");
      return t.apply(l, n)
  }
  function Get(n, t) {
      return n[t]
  }
  function HasProperty(n, r) {
      return r in n
  }
  function IsArray(r) {
      return "[object Array]" === Object.prototype.toString.call(r)
  }
  function IsCallable(n) {
      return "function" == typeof n
  }
  function SameValueNonNumber(e, n) {
      return e === n
  }
  function ToBoolean(o) {
      return Boolean(o)
  }
  function ToInteger(n) {
      var i = Number(n);
      return isNaN(i) ? 0 : 1 / i === Infinity || 1 / i == -Infinity || i === Infinity || i === -Infinity ? i : (i < 0 ? -1 : 1) * Math.floor(Math.abs(i))
  }
  function ToLength(n) {
      var t = ToInteger(n);
      return t <= 0 ? 0 : Math.min(t, Math.pow(2, 53) - 1)
  }
  function ToObject(e) {
      if (null === e || e === undefined)
          throw TypeError();
      return Object(e)
  }
  function GetV(t, e) {
      return ToObject(t)[e]
  }
  function GetMethod(e, n) {
      var r = GetV(e, n);
      if (null === r || r === undefined)
          return undefined;
      if (!1 === IsCallable(r))
          throw new TypeError("Method not callable: " + n);
      return r
  }
  function Type(e) {
      switch (typeof e) {
      case "undefined":
          return "undefined";
      case "boolean":
          return "boolean";
      case "number":
          return "number";
      case "string":
          return "string";
      case "symbol":
          return "symbol";
      default:
          return null === e ? "null" : "Symbol"in this && e instanceof this.Symbol ? "symbol" : "object"
      }
  }
  function GetPrototypeFromConstructor(t, o) {
      var r = Get(t, "prototype");
      return "object" !== Type(r) && (r = o),
      r
  }
  function IsConstructor(t) {
      return "object" === Type(t) && ("function" == typeof t && !!t.prototype)
  }
  function IteratorClose(r, t) {
      if ("object" !== Type(r["[[Iterator]]"]))
          throw new Error(Object.prototype.toString.call(r["[[Iterator]]"]) + "is not an Object.");
      var e = r["[[Iterator]]"]
        , o = GetMethod(e, "return");
      if (o === undefined)
          return t;
      try {
          var n = Call(o, e)
      } catch (c) {
          var a = c
      }
      if (t)
          return t;
      if (a)
          throw a;
      if ("object" !== Type(n))
          throw new TypeError("Iterator's return method returned a non-object.");
      return t
  }
  function IteratorComplete(t) {
      if ("object" !== Type(t))
          throw new Error(Object.prototype.toString.call(t) + "is not an Object.");
      return ToBoolean(Get(t, "done"))
  }
  function IteratorNext(t) {
      if (arguments.length < 2)
          var e = Call(t["[[NextMethod]]"], t["[[Iterator]]"]);
      else
          e = Call(t["[[NextMethod]]"], t["[[Iterator]]"], [arguments[1]]);
      if ("object" !== Type(e))
          throw new TypeError("bad iterator");
      return e
  }
  function IteratorStep(t) {
      var r = IteratorNext(t);
      return !0 !== IteratorComplete(r) && r
  }
  function IteratorValue(t) {
      if ("object" !== Type(t))
          throw new Error(Object.prototype.toString.call(t) + "is not an Object.");
      return Get(t, "value")
  }
  function OrdinaryToPrimitive(r, t) {
      if ("string" === t)
          var e = ["toString", "valueOf"];
      else
          e = ["valueOf", "toString"];
      for (var i = 0; i < e.length; ++i) {
          var n = e[i]
            , a = Get(r, n);
          if (IsCallable(a)) {
              var o = Call(a, r);
              if ("object" !== Type(o))
                  return o
          }
      }
      throw new TypeError("Cannot convert to primitive.")
  }
  function SameValueZero(n, e) {
      return Type(n) === Type(e) && ("number" === Type(n) ? !(!isNaN(n) || !isNaN(e)) || (1 / n === Infinity && 1 / e == -Infinity || (1 / n == -Infinity && 1 / e === Infinity || n === e)) : SameValueNonNumber(n, e))
  }
  function ToPrimitive(e) {
      var t = arguments.length > 1 ? arguments[1] : undefined;
      if ("object" === Type(e)) {
          if (arguments.length < 2)
              var i = "default";
          else
              t === String ? i = "string" : t === Number && (i = "number");
          var r = "function" == typeof this.Symbol && "symbol" == typeof this.Symbol.toPrimitive ? GetMethod(e, this.Symbol.toPrimitive) : undefined;
          if (r !== undefined) {
              var n = Call(r, e, [i]);
              if ("object" !== Type(n))
                  return n;
              throw new TypeError("Cannot convert exotic object to primitive.")
          }
          return "default" === i && (i = "number"),
          OrdinaryToPrimitive(e, i)
      }
      return e
  }
  function ToString(t) {
      switch (Type(t)) {
      case "symbol":
          throw new TypeError("Cannot convert a Symbol value to a string");
      case "object":
          return ToString(ToPrimitive(t, "string"));
      default:
          return String(t)
      }
  }
  if (!("defineProperty"in Object && function() {
      try {
          var e = {}
          return Object.defineProperty(e, "test", {
              value: 42
          }),
          !0
      } catch (t) {
          return !1
      }
  }())) {
      !function(e) {
          var t = Object.prototype.hasOwnProperty("__defineGetter__")
            , r = "A property cannot both have accessors and be writable or have a value";
          Object.defineProperty = function n(o, i, c) {
              if (e && (o === window || o === document || o === Element.prototype || o instanceof Element))
                  return e(o, i, c);
              if (null === o || !(o instanceof Object || "object" == typeof o))
                  throw new TypeError("Object.defineProperty called on non-object");
              if (!(c instanceof Object))
                  throw new TypeError("Property description must be an object");
              var a = String(i)
                , f = "value"in c || "writable"in c
                , p = "get"in c && typeof c.get
                , s = "set"in c && typeof c.set;
              if (p) {
                  if ("function" !== p)
                      throw new TypeError("Getter must be a function");
                  if (!t)
                      throw new TypeError("Getters & setters cannot be defined on this javascript engine");
                  if (f)
                      throw new TypeError(r);
                  Object.__defineGetter__.call(o, a, c.get)
              } else
                  o[a] = c.value;
              if (s) {
                  if ("function" !== s)
                      throw new TypeError("Setter must be a function");
                  if (!t)
                      throw new TypeError("Getters & setters cannot be defined on this javascript engine");
                  if (f)
                      throw new TypeError(r);
                  Object.__defineSetter__.call(o, a, c.set)
              }
              return "value"in c && (o[a] = c.value),
              o
          }
      }(Object.defineProperty);
  }
  function CreateDataProperty(e, r, t) {
      var a = {
          value: t,
          writable: !0,
          enumerable: !0,
          configurable: !0
      };
      try {
          return Object.defineProperty(e, r, a),
          !0
      } catch (n) {
          return !1
      }
  }
  function CreateDataPropertyOrThrow(t, r, o) {
      var e = CreateDataProperty(t, r, o);
      if (!e)
          throw new TypeError("Cannot assign value `" + Object.prototype.toString.call(o) + "` to property `" + Object.prototype.toString.call(r) + "` on object `" + Object.prototype.toString.call(t) + "`");
      return e
  }
  function CreateIterResultObject(e, r) {
      if ("boolean" !== Type(r))
          throw new Error;
      var t = {};
      return CreateDataProperty(t, "value", e),
      CreateDataProperty(t, "done", r),
      t
  }
  function CreateMethodProperty(e, r, t) {
      var a = {
          value: t,
          writable: !0,
          enumerable: !1,
          configurable: !0
      };
      Object.defineProperty(e, r, a)
  }
  if (!("isArray"in Array)) {
      CreateMethodProperty(Array, "isArray", function r(e) {
          return IsArray(e)
      });
  }
  if (!("forEach"in Array.prototype)) {
      CreateMethodProperty(Array.prototype, "forEach", function r(t) {
          var e = ToObject(this)
            , n = e instanceof String ? e.split("") : e
            , o = ToLength(Get(e, "length"));
          if (!1 === IsCallable(t))
              throw new TypeError(t + " is not a function");
          for (var a = arguments.length > 1 ? arguments[1] : undefined, i = 0; i < o; ) {
              var f = ToString(i);
              if (HasProperty(n, f)) {
                  var l = Get(n, f);
                  Call(t, a, [l, i, e])
              }
              i += 1
          }
          return undefined
      });
  }
  if (!("bind"in Function.prototype)) {
      CreateMethodProperty(Function.prototype, "bind", function t(n) {
          var r = Array
            , o = Object
            , e = r.prototype
            , l = function g() {}
            , p = e.slice
            , a = e.concat
            , i = e.push
            , c = Math.max
            , u = this;
          if (!IsCallable(u))
              throw new TypeError("Function.prototype.bind called on incompatible " + u);
          for (var y, h = p.call(arguments, 1), s = function() {
              if (this instanceof y) {
                  var t = u.apply(this, a.call(h, p.call(arguments)));
                  return o(t) === t ? t : this
              }
              return u.apply(n, a.call(h, p.call(arguments)))
          }, f = c(0, u.length - h.length), b = [], d = 0; d < f; d++)
              i.call(b, "$" + d);
          return y = Function("binder", "return function (" + b.join(",") + "){ return binder.apply(this, arguments); }")(s),
          u.prototype && (l.prototype = u.prototype,
          y.prototype = new l,
          l.prototype = null),
          y
      });
  }
  if (!("freeze"in Object)) {
      CreateMethodProperty(Object, "freeze", function e(r) {
          return r
      });
  }
  if (!("getOwnPropertyDescriptor"in Object && "function" == typeof Object.getOwnPropertyDescriptor && function() {
      try {
          var t = {}
          return t.test = 0,
          0 === Object.getOwnPropertyDescriptor(t, "test").value
      } catch (e) {
          return !1
      }
  }())) {
      !function() {
          function e(e) {
              try {
                  return e.sentinel = 0,
                  0 === Object.getOwnPropertyDescriptor(e, "sentinel").value
              } catch (t) {}
          }
          var t, r, o, n = Function.prototype.call, c = Object.prototype, i = n.bind(c.hasOwnProperty);
          if ((o = i(c, "__defineGetter__")) && (t = n.bind(c.__lookupGetter__),
          r = n.bind(c.__lookupSetter__)),
          Object.defineProperty) {
              var p = e({});
              if (!("undefined" == typeof document || e(document.createElement("div"))) || !p)
                  var _ = Object.getOwnPropertyDescriptor
          }
          if (!Object.getOwnPropertyDescriptor || _) {
              CreateMethodProperty(Object, "getOwnPropertyDescriptor", function a(e, n) {
                  if ("object" != typeof e && "function" != typeof e || null === e)
                      throw new TypeError("Object.getOwnPropertyDescriptor called on a non-object: " + e);
                  if (_)
                      try {
                          return _.call(Object, e, n)
                      } catch (l) {}
                  if (i(e, n)) {
                      var p = {
                          enumerable: !0,
                          configurable: !0
                      };
                      if (o) {
                          var a = e.__proto__;
                          e.__proto__ = c;
                          var f = t(e, n)
                            , u = r(e, n);
                          if (e.__proto__ = a,
                          f || u)
                              return f && (p.get = f),
                              u && (p.set = u),
                              p
                      }
                      return p.value = e[n],
                      p.writable = !0,
                      p
                  }
              })
          }
      }();
  }
  if (!("getOwnPropertyNames"in Object)) {
      var toString = {}.toString
        , split = "".split;
      CreateMethodProperty(Object, "getOwnPropertyNames", function t(e) {
          var r, o = [], n = ["length", "name", "arguments", "caller", "prototype", "observe", "unobserve"];
          if (void 0 === e || null === e)
              throw new TypeError("Cannot convert undefined or null to object");
          e = "[object String]" == toString.call(e) ? split.call(e, "") : Object(e);
          for (r in e)
              Object.prototype.hasOwnProperty.call(e, r) && o.push(r);
          for (var l = 0, a = n.length; l < a; l++)
              n[l]in e && o.push(n[l]);
          return o
      });
  }
  if (!("getPrototypeOf"in Object)) {
      CreateMethodProperty(Object, "getPrototypeOf", function t(o) {
          if (o !== Object(o))
              throw new TypeError("Object.getPrototypeOf called on non-object");
          var e = o.__proto__;
          return e || null === e ? e : "function" == typeof o.constructor && o instanceof o.constructor ? o.constructor.prototype : o instanceof Object ? Object.prototype : null
      });
  }
  if (!("keys"in Object && function() {
      return 2 === Object.keys(arguments).length
  }(1, 2) && function() {
      try {
          return Object.keys(""),
          !0
      } catch (t) {
          return !1
      }
  }())) {
      CreateMethodProperty(Object, "keys", function() {
          "use strict";
          function t(t) {
              var e = r.call(t)
                , n = "[object Arguments]" === e;
              return n || (n = "[object Array]" !== e && null !== t && "object" == typeof t && "number" == typeof t.length && t.length >= 0 && "[object Function]" === r.call(t.callee)),
              n
          }
          var e = Object.prototype.hasOwnProperty
            , r = Object.prototype.toString
            , n = Object.prototype.propertyIsEnumerable
            , o = !n.call({
              toString: null
          }, "toString")
            , l = n.call(function() {}, "prototype")
            , c = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"]
            , i = function(t) {
              var e = t.constructor;
              return e && e.prototype === t
          }
            , u = {
              $console: !0,
              $external: !0,
              $frame: !0,
              $frameElement: !0,
              $frames: !0,
              $innerHeight: !0,
              $innerWidth: !0,
              $outerHeight: !0,
              $outerWidth: !0,
              $pageXOffset: !0,
              $pageYOffset: !0,
              $parent: !0,
              $scrollLeft: !0,
              $scrollTop: !0,
              $scrollX: !0,
              $scrollY: !0,
              $self: !0,
              $webkitIndexedDB: !0,
              $webkitStorageInfo: !0,
              $window: !0
          }
            , a = function() {
              if ("undefined" == typeof window)
                  return !1;
              for (var t in window)
                  try {
                      if (!u["$" + t] && e.call(window, t) && null !== window[t] && "object" == typeof window[t])
                          try {
                              i(window[t])
                          } catch (r) {
                              return !0
                          }
                  } catch (r) {
                      return !0
                  }
              return !1
          }()
            , f = function(t) {
              if ("undefined" == typeof window || !a)
                  return i(t);
              try {
                  return i(t)
              } catch (e) {
                  return !1
              }
          };
          return function p(n) {
              var i = "[object Function]" === r.call(n)
                , u = t(n)
                , a = "[object String]" === r.call(n)
                , p = [];
              if (n === undefined || null === n)
                  throw new TypeError("Cannot convert undefined or null to object");
              var s = l && i;
              if (a && n.length > 0 && !e.call(n, 0))
                  for (var y = 0; y < n.length; ++y)
                      p.push(String(y));
              if (u && n.length > 0)
                  for (var g = 0; g < n.length; ++g)
                      p.push(String(g));
              else
                  for (var h in n)
                      s && "prototype" === h || !e.call(n, h) || p.push(String(h));
              if (o)
                  for (var w = f(n), d = 0; d < c.length; ++d)
                      w && "constructor" === c[d] || !e.call(n, c[d]) || p.push(c[d]);
              return p
          }
      }());
  }
  if (!("defineProperties"in Object)) {
      CreateMethodProperty(Object, "defineProperties", function e(r, t) {
          if ("object" !== Type(r))
              throw new TypeError("Object.defineProperties called on non-object");
          for (var o = ToObject(t), n = Object.keys(o), c = [], i = 0; i < n.length; i++) {
              var b = n[i]
                , f = Object.getOwnPropertyDescriptor(o, b);
              if (f !== undefined && f.enumerable) {
                  var p = Get(o, b)
                    , a = p;
                  c.push([b, a])
              }
          }
          for (var i = 0; i < c.length; i++) {
              var j = c[i][0]
                , a = c[i][1];
              Object.defineProperty(r, j, a)
          }
          return r
      });
  }
  if (!("create"in Object)) {
      CreateMethodProperty(Object, "create", function e(t, r) {
          if ("object" !== Type(t) && "null" !== Type(t))
              throw new TypeError("Object prototype may only be an Object or null");
          var o = new Function("e","function Object() {}Object.prototype=e;return new Object")(t);
          return o.constructor.prototype = t,
          1 in arguments ? Object.defineProperties(o, r) : o
      });
  }
  function OrdinaryCreateFromConstructor(r, e) {
      var t = arguments[2] || {}
        , o = GetPrototypeFromConstructor(r, e)
        , a = Object.create(o);
      for (var n in t)
          Object.prototype.hasOwnProperty.call(t, n) && Object.defineProperty(a, n, {
              configurable: !0,
              enumerable: !1,
              writable: !0,
              value: t[n]
          });
      return a
  }
  function Construct(r) {
      var t = arguments.length > 2 ? arguments[2] : r
        , o = arguments.length > 1 ? arguments[1] : [];
      if (!IsConstructor(r))
          throw new TypeError("F must be a constructor.");
      if (!IsConstructor(t))
          throw new TypeError("newTarget must be a constructor.");
      if (t === r)
          return new (Function.prototype.bind.apply(r, [null].concat(o)));
      var n = OrdinaryCreateFromConstructor(t, Object.prototype);
      return Call(r, n, o)
  }
  function ArraySpeciesCreate(r, e) {
      if (1 / e == -Infinity && (e = 0),
      !1 === IsArray(r))
          return ArrayCreate(e);
      var t = Get(r, "constructor");
      if ("object" === Type(t) && null === (t = "Symbol"in this && "species"in this.Symbol ? Get(t, this.Symbol.species) : undefined) && (t = undefined),
      t === undefined)
          return ArrayCreate(e);
      if (!IsConstructor(t))
          throw new TypeError("C must be a constructor");
      return Construct(t, [e])
  }
  if (!("filter"in Array.prototype)) {
      CreateMethodProperty(Array.prototype, "filter", function r(e) {
          var t = ToObject(this)
            , o = ToLength(Get(t, "length"));
          if (!1 === IsCallable(e))
              throw new TypeError(e + " is not a function");
          for (var a = arguments.length > 1 ? arguments[1] : undefined, n = ArraySpeciesCreate(t, 0), i = 0, l = 0; i < o; ) {
              var f = ToString(i);
              if (HasProperty(t, f)) {
                  var h = Get(t, f);
                  ToBoolean(Call(e, a, [h, i, t])) && (CreateDataPropertyOrThrow(n, ToString(l), h),
                  l += 1)
              }
              i += 1
          }
          return n
      });
  }
  if (!("map"in Array.prototype)) {
      CreateMethodProperty(Array.prototype, "map", function r(e) {
          var t = ToObject(this)
            , a = ToLength(Get(t, "length"));
          if (!1 === IsCallable(e))
              throw new TypeError(e + " is not a function");
          for (var o = arguments.length > 1 ? arguments[1] : undefined, n = ArraySpeciesCreate(t, a), i = 0; i < a; ) {
              var p = ToString(i);
              if (HasProperty(t, p)) {
                  var h = Get(t, p)
                    , l = Call(e, o, [h, i, t]);
                  CreateDataPropertyOrThrow(n, p, l)
              }
              i += 1
          }
          return n
      });
  }
  if (!("Symbol"in this && 0 === this.Symbol.length)) {
      !function(t, r, n) {
          "use strict";
          var e, o = 0, u = "" + Math.random(), l = "__symbol:", c = l.length, a = "__symbol@@" + u, i = "defineProperty", f = "defineProperties", s = "getOwnPropertyNames", v = "getOwnPropertyDescriptor", b = "propertyIsEnumerable", h = t.prototype, y = h.hasOwnProperty, m = h[b], p = h.toString, g = Array.prototype.concat, w = t.getOwnPropertyNames ? t.getOwnPropertyNames(window) : [], d = t[s], S = function L(t) {
              if ("[object Window]" === p.call(t))
                  try {
                      return d(t)
                  } catch (r) {
                      return g.call([], w)
                  }
              return d(t)
          }, P = t[v], j = t.create, O = t.keys, E = t.freeze || t, N = t[i], _ = t[f], k = P(t, s), T = function(t, r, n) {
              if (!y.call(t, a))
                  try {
                      N(t, a, {
                          enumerable: !1,
                          configurable: !1,
                          writable: !1,
                          value: {}
                      })
                  } catch (e) {
                      t[a] = {}
                  }
              t[a]["@@" + r] = n
          }, z = function(t, r) {
              var n = j(t);
              return S(r).forEach(function(t) {
                  M.call(r, t) && G(n, t, r[t])
              }),
              n
          }, A = function(t) {
              var r = j(t);
              return r.enumerable = !1,
              r
          }, D = function Q() {}, F = function(t) {
              return t != a && !y.call(x, t)
          }, I = function(t) {
              return t != a && y.call(x, t)
          }, M = function R(t) {
              var r = "" + t;
              return I(r) ? y.call(this, r) && this[a]["@@" + r] : m.call(this, t)
          }, W = function(r) {
              var n = {
                  enumerable: !1,
                  configurable: !0,
                  get: D,
                  set: function(t) {
                      e(this, r, {
                          enumerable: !1,
                          configurable: !0,
                          writable: !0,
                          value: t
                      }),
                      T(this, r, !0)
                  }
              };
              try {
                  N(h, r, n)
              } catch (o) {
                  h[r] = n.value
              }
              return E(x[r] = N(t(r), "constructor", B))
          }, q = function U() {
              var t = arguments[0];
              if (this instanceof U)
                  throw new TypeError("Symbol is not a constructor");
              return W(l.concat(t || "", u, ++o))
          }, x = j(null), B = {
              value: q
          }, C = function(t) {
              return x[t]
          }, G = function V(t, r, n) {
              var o = "" + r;
              return I(o) ? (e(t, o, n.enumerable ? A(n) : n),
              T(t, o, !!n.enumerable)) : N(t, r, n),
              t
          }, H = function(t) {
              return function(r) {
                  return y.call(t, a) && y.call(t[a], "@@" + r)
              }
          }, J = function X(t) {
              return S(t).filter(t === h ? H(t) : I).map(C)
          };
          k.value = G,
          N(t, i, k),
          k.value = J,
          N(t, "getOwnPropertySymbols", k),
          k.value = function Y(t) {
              return S(t).filter(F)
          }
          ,
          N(t, s, k),
          k.value = function Z(t, r) {
              var n = J(r);
              return n.length ? O(r).concat(n).forEach(function(n) {
                  M.call(r, n) && G(t, n, r[n])
              }) : _(t, r),
              t
          }
          ,
          N(t, f, k),
          k.value = M,
          N(h, b, k),
          k.value = q,
          N(n, "Symbol", k),
          k.value = function(t) {
              var r = l.concat(l, t, u);
              return r in h ? x[r] : W(r)
          }
          ,
          N(q, "for", k),
          k.value = function(t) {
              if (F(t))
                  throw new TypeError(t + " is not a symbol");
              return y.call(x, t) ? t.slice(2 * c, -u.length) : void 0
          }
          ,
          N(q, "keyFor", k),
          k.value = function $(t, r) {
              var n = P(t, r);
              return n && I(r) && (n.enumerable = M.call(t, r)),
              n
          }
          ,
          N(t, v, k),
          k.value = function(t, r) {
              return 1 === arguments.length || void 0 === r ? j(t) : z(t, r)
          }
          ,
          N(t, "create", k);
          var K = null === function() {
              return this
          }
          .call(null);
          k.value = K ? function() {
              var t = p.call(this);
              return "[object String]" === t && I(this) ? "[object Symbol]" : t
          }
          : function() {
              if (this === window)
                  return "[object Null]";
              var t = p.call(this);
              return "[object String]" === t && I(this) ? "[object Symbol]" : t
          }
          ,
          N(h, "toString", k),
          e = function(t, r, n) {
              var e = P(h, r);
              delete h[r],
              N(t, r, n),
              t !== h && N(h, r, e)
          }
      }(Object, 0, this);
  }
  if (!("Symbol"in this && "iterator"in this.Symbol)) {
      Object.defineProperty(Symbol, "iterator", {
          value: Symbol("iterator")
      });
  }
  function GetIterator(t) {
      var e = arguments.length > 1 ? arguments[1] : GetMethod(t, Symbol.iterator)
        , r = Call(e, t);
      if ("object" !== Type(r))
          throw new TypeError("bad iterator");
      var o = GetV(r, "next")
        , a = Object.create(null);
      return a["[[Iterator]]"] = r,
      a["[[NextMethod]]"] = o,
      a["[[Done]]"] = !1,
      a
  }
  if (!("Symbol"in this && "species"in this.Symbol)) {
      Object.defineProperty(Symbol, "species", {
          value: Symbol("species")
      });
  }
  if (!("Set"in this && function() {
      try {
          var t = new Set([1, 2])
          return 0 === Set.length && 2 === t.size && "Symbol"in this && "iterator"in Symbol && "function" == typeof t[Symbol.iterator]
      } catch (e) {
          return !1
      }
  }())) {
      !function(e) {
          function t(e, t) {
              if ("object" != typeof e)
                  throw new TypeError("createSetIterator called on incompatible receiver " + Object.prototype.toString.call(e));
              if (!0 !== e._es6Set)
                  throw new TypeError("createSetIterator called on incompatible receiver " + Object.prototype.toString.call(e));
              var r = Object.create(i);
              return Object.defineProperty(r, "[[IteratedSet]]", {
                  configurable: !0,
                  enumerable: !1,
                  writable: !0,
                  value: e
              }),
              Object.defineProperty(r, "[[SetNextIndex]]", {
                  configurable: !0,
                  enumerable: !1,
                  writable: !0,
                  value: 0
              }),
              Object.defineProperty(r, "[[SetIterationKind]]", {
                  configurable: !0,
                  enumerable: !1,
                  writable: !0,
                  value: t
              }),
              r
          }
          var r = function() {
              try {
                  var e = {};
                  return Object.defineProperty(e, "t", {
                      configurable: !0,
                      enumerable: !1,
                      get: function() {
                          return !0
                      },
                      set: undefined
                  }),
                  !!e.t
              } catch (t) {
                  return !1
              }
          }()
            , o = Symbol("undef")
            , n = function c() {
              if (!(this instanceof c))
                  throw new TypeError('Constructor Set requires "new"');
              var e = OrdinaryCreateFromConstructor(this, c.prototype, {
                  _values: [],
                  _size: 0,
                  _es6Set: !0
              });
              r || Object.defineProperty(e, "size", {
                  configurable: !0,
                  enumerable: !1,
                  writable: !0,
                  value: 0
              });
              var t = arguments.length > 0 ? arguments[0] : undefined;
              if (null === t || t === undefined)
                  return e;
              var o = e.add;
              if (!IsCallable(o))
                  throw new TypeError("Set.prototype.add is not a function");
              try {
                  for (var n = GetIterator(t); ; ) {
                      var a = IteratorStep(n);
                      if (!1 === a)
                          return e;
                      var i = IteratorValue(a);
                      try {
                          o.call(e, i)
                      } catch (y) {
                          return IteratorClose(n, y)
                      }
                  }
              } catch (y) {
                  if (!Array.isArray(t) && "[object Arguments]" !== Object.prototype.toString.call(t) && !t.callee)
                      throw y;
                  var l, p = t.length;
                  for (l = 0; l < p; l++)
                      o.call(e, t[l])
              }
              return e
          };
          Object.defineProperty(n, "prototype", {
              configurable: !1,
              enumerable: !1,
              writable: !1,
              value: {}
          }),
          r ? Object.defineProperty(n, Symbol.species, {
              configurable: !0,
              enumerable: !1,
              get: function() {
                  return this
              },
              set: undefined
          }) : CreateMethodProperty(n, Symbol.species, n),
          CreateMethodProperty(n.prototype, "add", function p(e) {
              var t = this;
              if ("object" != typeof t)
                  throw new TypeError("Method Set.prototype.add called on incompatible receiver " + Object.prototype.toString.call(t));
              if (!0 !== t._es6Set)
                  throw new TypeError("Method Set.prototype.add called on incompatible receiver " + Object.prototype.toString.call(t));
              for (var n = t._values, a = 0; a < n.length; a++) {
                  var i = n[a];
                  if (i !== o && SameValueZero(i, e))
                      return t
              }
              return 1 / e == -Infinity && (e = 0),
              t._values.push(e),
              this._size = ++this._size,
              r || (this.size = this._size),
              t
          }),
          CreateMethodProperty(n.prototype, "clear", function y() {
              var e = this;
              if ("object" != typeof e)
                  throw new TypeError("Method Set.prototype.clear called on incompatible receiver " + Object.prototype.toString.call(e));
              if (!0 !== e._es6Set)
                  throw new TypeError("Method Set.prototype.clear called on incompatible receiver " + Object.prototype.toString.call(e));
              for (var t = e._values, n = 0; n < t.length; n++)
                  t[n] = o;
              return this._size = 0,
              r || (this.size = this._size),
              undefined
          }),
          CreateMethodProperty(n.prototype, "constructor", n),
          CreateMethodProperty(n.prototype, "delete", function(e) {
              var t = this;
              if ("object" != typeof t)
                  throw new TypeError("Method Set.prototype.delete called on incompatible receiver " + Object.prototype.toString.call(t));
              if (!0 !== t._es6Set)
                  throw new TypeError("Method Set.prototype.delete called on incompatible receiver " + Object.prototype.toString.call(t));
              for (var n = t._values, a = 0; a < n.length; a++) {
                  var i = n[a];
                  if (i !== o && SameValueZero(i, e))
                      return n[a] = o,
                      this._size = --this._size,
                      r || (this.size = this._size),
                      !0
              }
              return !1
          }),
          CreateMethodProperty(n.prototype, "entries", function u() {
              return t(this, "key+value")
          }),
          CreateMethodProperty(n.prototype, "forEach", function f(e) {
              var t = this;
              if ("object" != typeof t)
                  throw new TypeError("Method Set.prototype.forEach called on incompatible receiver " + Object.prototype.toString.call(t));
              if (!0 !== t._es6Set)
                  throw new TypeError("Method Set.prototype.forEach called on incompatible receiver " + Object.prototype.toString.call(t));
              if (!IsCallable(e))
                  throw new TypeError(Object.prototype.toString.call(e) + " is not a function.");
              if (arguments[1])
                  var r = arguments[1];
              for (var n = t._values, a = 0; a < n.length; a++) {
                  var i = n[a];
                  i !== o && e.call(r, i, i, t)
              }
              return undefined
          }),
          CreateMethodProperty(n.prototype, "has", function d(e) {
              var t = this;
              if ("object" != typeof t)
                  throw new TypeError("Method Set.prototype.forEach called on incompatible receiver " + Object.prototype.toString.call(t));
              if (!0 !== t._es6Set)
                  throw new TypeError("Method Set.prototype.forEach called on incompatible receiver " + Object.prototype.toString.call(t));
              for (var r = t._values, n = 0; n < r.length; n++) {
                  var a = r[n];
                  if (a !== o && SameValueZero(a, e))
                      return !0
              }
              return !1
          });
          var a = function h() {
              return t(this, "value")
          };
          CreateMethodProperty(n.prototype, "values", a),
          CreateMethodProperty(n.prototype, "keys", a),
          r && Object.defineProperty(n.prototype, "size", {
              configurable: !0,
              enumerable: !1,
              get: function() {
                  var e = this;
                  if ("object" != typeof e)
                      throw new TypeError("Method Set.prototype.size called on incompatible receiver " + Object.prototype.toString.call(e));
                  if (!0 !== e._es6Set)
                      throw new TypeError("Method Set.prototype.size called on incompatible receiver " + Object.prototype.toString.call(e));
                  for (var t = e._values, r = 0, n = 0; n < t.length; n++) {
                      t[n] !== o && (r += 1)
                  }
                  return r
              },
              set: undefined
          }),
          CreateMethodProperty(n.prototype, Symbol.iterator, a),
          "name"in n || Object.defineProperty(n, "name", {
              configurable: !0,
              enumerable: !1,
              writable: !1,
              value: "Set"
          });
          var i = {};
          Object.defineProperty(i, "isSetIterator", {
              configurable: !1,
              enumerable: !1,
              writable: !1,
              value: !0
          }),
          CreateMethodProperty(i, "next", function b() {
              var e = this;
              if ("object" != typeof e)
                  throw new TypeError("Method %SetIteratorPrototype%.next called on incompatible receiver " + Object.prototype.toString.call(e));
              if (!e.isSetIterator)
                  throw new TypeError("Method %SetIteratorPrototype%.next called on incompatible receiver " + Object.prototype.toString.call(e));
              var t = e["[[IteratedSet]]"]
                , r = e["[[SetNextIndex]]"]
                , n = e["[[SetIterationKind]]"];
              if (t === undefined)
                  return CreateIterResultObject(undefined, !0);
              if (!t._es6Set)
                  throw new Error(Object.prototype.toString.call(t) + " does not have [[SetData]] internal slot.");
              for (var a = t._values, i = a.length; r < i; ) {
                  var l = a[r];
                  if (r += 1,
                  e["[[SetNextIndex]]"] = r,
                  l !== o)
                      return "key+value" === n ? CreateIterResultObject([l, l], !1) : CreateIterResultObject(l, !1)
              }
              return e["[[IteratedSet]]"] = undefined,
              CreateIterResultObject(undefined, !0)
          }),
          CreateMethodProperty(i, Symbol.iterator, function s() {
              return this
          });
          try {
              CreateMethodProperty(e, "Set", n)
          } catch (l) {
              e.Set = n
          }
      }(this);
  }
}
).call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});
