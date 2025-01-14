!function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.ImageGallery = t() : e.ImageGallery = t()
}(window, (function () {
    return function (e) {
        var t = {};

        function n(o) {
            if (t[o]) return t[o].exports;
            var r = t[o] = {i: o, l: !1, exports: {}};
            return e[o].call(r.exports, r, r.exports, n), r.l = !0, r.exports
        }

        return n.m = e, n.c = t, n.d = function (e, t, o) {
            n.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: o})
        }, n.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
        }, n.t = function (e, t) {
            if (1 & t && (e = n(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var o = Object.create(null);
            if (n.r(o), Object.defineProperty(o, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e) for (var r in e) n.d(o, r, function (t) {
                return e[t]
            }.bind(null, r));
            return o
        }, n.n = function (e) {
            var t = e && e.__esModule ? function () {
                return e.default
            } : function () {
                return e
            };
            return n.d(t, "a", t), t
        }, n.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, n.p = "/", n(n.s = 22)
    }([function (e, t) {
        function n(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }

        e.exports = function (e, t, o) {
            return t && n(e.prototype, t), o && n(e, o), e
        }
    }, function (e, t) {
        e.exports = function (e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
    }, function (e, t, n) {
        window, e.exports = function (e) {
            var t = {};

            function n(o) {
                if (t[o]) return t[o].exports;
                var r = t[o] = {i: o, l: !1, exports: {}};
                return e[o].call(r.exports, r, r.exports, n), r.l = !0, r.exports
            }

            return n.m = e, n.c = t, n.d = function (e, t, o) {
                n.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: o})
            }, n.r = function (e) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
            }, n.t = function (e, t) {
                if (1 & t && (e = n(e)), 8 & t) return e;
                if (4 & t && "object" == typeof e && e && e.__esModule) return e;
                var o = Object.create(null);
                if (n.r(o), Object.defineProperty(o, "default", {
                    enumerable: !0,
                    value: e
                }), 2 & t && "string" != typeof e) for (var r in e) n.d(o, r, function (t) {
                    return e[t]
                }.bind(null, r));
                return o
            }, n.n = function (e) {
                var t = e && e.__esModule ? function () {
                    return e.default
                } : function () {
                    return e
                };
                return n.d(t, "a", t), t
            }, n.o = function (e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
            }, n.p = "", n(n.s = 3)
        }([function (e, t) {
            var n;
            n = function () {
                return this
            }();
            try {
                n = n || new Function("return this")()
            } catch (e) {
                "object" == typeof window && (n = window)
            }
            e.exports = n
        }, function (e, t, n) {
            "use strict";
            (function (e) {
                var o = n(2), r = setTimeout;

                function i() {
                }

                function a(e) {
                    if (!(this instanceof a)) throw new TypeError("Promises must be constructed via new");
                    if ("function" != typeof e) throw new TypeError("not a function");
                    this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], f(e, this)
                }

                function l(e, t) {
                    for (; 3 === e._state;) e = e._value;
                    0 !== e._state ? (e._handled = !0, a._immediateFn((function () {
                        var n = 1 === e._state ? t.onFulfilled : t.onRejected;
                        if (null !== n) {
                            var o;
                            try {
                                o = n(e._value)
                            } catch (e) {
                                return void c(t.promise, e)
                            }
                            s(t.promise, o)
                        } else (1 === e._state ? s : c)(t.promise, e._value)
                    }))) : e._deferreds.push(t)
                }

                function s(e, t) {
                    try {
                        if (t === e) throw new TypeError("A promise cannot be resolved with itself.");
                        if (t && ("object" == typeof t || "function" == typeof t)) {
                            var n = t.then;
                            if (t instanceof a) return e._state = 3, e._value = t, void u(e);
                            if ("function" == typeof n) return void f((o = n, r = t, function () {
                                o.apply(r, arguments)
                            }), e)
                        }
                        e._state = 1, e._value = t, u(e)
                    } catch (t) {
                        c(e, t)
                    }
                    var o, r
                }

                function c(e, t) {
                    e._state = 2, e._value = t, u(e)
                }

                function u(e) {
                    2 === e._state && 0 === e._deferreds.length && a._immediateFn((function () {
                        e._handled || a._unhandledRejectionFn(e._value)
                    }));
                    for (var t = 0, n = e._deferreds.length; t < n; t++) l(e, e._deferreds[t]);
                    e._deferreds = null
                }

                function d(e, t, n) {
                    this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.promise = n
                }

                function f(e, t) {
                    var n = !1;
                    try {
                        e((function (e) {
                            n || (n = !0, s(t, e))
                        }), (function (e) {
                            n || (n = !0, c(t, e))
                        }))
                    } catch (e) {
                        if (n) return;
                        n = !0, c(t, e)
                    }
                }

                a.prototype.catch = function (e) {
                    return this.then(null, e)
                }, a.prototype.then = function (e, t) {
                    var n = new this.constructor(i);
                    return l(this, new d(e, t, n)), n
                }, a.prototype.finally = o.a, a.all = function (e) {
                    return new a((function (t, n) {
                        if (!e || void 0 === e.length) throw new TypeError("Promise.all accepts an array");
                        var o = Array.prototype.slice.call(e);
                        if (0 === o.length) return t([]);
                        var r = o.length;

                        function i(e, a) {
                            try {
                                if (a && ("object" == typeof a || "function" == typeof a)) {
                                    var l = a.then;
                                    if ("function" == typeof l) return void l.call(a, (function (t) {
                                        i(e, t)
                                    }), n)
                                }
                                o[e] = a, 0 == --r && t(o)
                            } catch (e) {
                                n(e)
                            }
                        }

                        for (var a = 0; a < o.length; a++) i(a, o[a])
                    }))
                }, a.resolve = function (e) {
                    return e && "object" == typeof e && e.constructor === a ? e : new a((function (t) {
                        t(e)
                    }))
                }, a.reject = function (e) {
                    return new a((function (t, n) {
                        n(e)
                    }))
                }, a.race = function (e) {
                    return new a((function (t, n) {
                        for (var o = 0, r = e.length; o < r; o++) e[o].then(t, n)
                    }))
                }, a._immediateFn = "function" == typeof e && function (t) {
                    e(t)
                } || function (e) {
                    r(e, 0)
                }, a._unhandledRejectionFn = function (e) {
                    "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e)
                }, t.a = a
            }).call(this, n(5).setImmediate)
        }, function (e, t, n) {
            "use strict";
            t.a = function (e) {
                var t = this.constructor;
                return this.then((function (n) {
                    return t.resolve(e()).then((function () {
                        return n
                    }))
                }), (function (n) {
                    return t.resolve(e()).then((function () {
                        return t.reject(n)
                    }))
                }))
            }
        }, function (e, t, n) {
            "use strict";

            function o(e) {
                return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                    return typeof e
                } : function (e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                })(e)
            }

            n(4);
            var r, i, a, l, s, c, u, d = n(8), f = (i = function (e) {
                return new Promise((function (t, n) {
                    e = l(e), (e = s(e)).beforeSend && e.beforeSend();
                    var o = window.XMLHttpRequest ? new window.XMLHttpRequest : new window.ActiveXObject("Microsoft.XMLHTTP");
                    o.open(e.method, e.url), o.setRequestHeader("X-Requested-With", "XMLHttpRequest"), Object.keys(e.headers).forEach((function (t) {
                        var n = e.headers[t];
                        o.setRequestHeader(t, n)
                    }));
                    var r = e.ratio;
                    o.upload.addEventListener("progress", (function (t) {
                        var n = Math.round(t.loaded / t.total * 100), o = Math.ceil(n * r / 100);
                        e.progress(Math.min(o, 100))
                    }), !1), o.addEventListener("progress", (function (t) {
                        var n = Math.round(t.loaded / t.total * 100), o = Math.ceil(n * (100 - r) / 100) + r;
                        e.progress(Math.min(o, 100))
                    }), !1), o.onreadystatechange = function () {
                        if (4 === o.readyState) {
                            var e = o.response;
                            try {
                                e = JSON.parse(e)
                            } catch (e) {
                            }
                            var r = d.parseHeaders(o.getAllResponseHeaders()),
                                i = {body: e, code: o.status, headers: r};
                            u(o.status) ? t(i) : n(i)
                        }
                    }, o.send(e.data)
                }))
            }, a = function (e) {
                return e.method = "POST", i(e)
            }, l = function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (e.url && "string" != typeof e.url) throw new Error("Url must be a string");
                if (e.url = e.url || "", e.method && "string" != typeof e.method) throw new Error("`method` must be a string or null");
                if (e.method = e.method ? e.method.toUpperCase() : "GET", e.headers && "object" !== o(e.headers)) throw new Error("`headers` must be an object or null");
                if (e.headers = e.headers || {}, e.type && ("string" != typeof e.type || !Object.values(r).includes(e.type))) throw new Error("`type` must be taken from module's «contentType» library");
                if (e.progress && "function" != typeof e.progress) throw new Error("`progress` must be a function or null");
                if (e.progress = e.progress || function (e) {
                }, e.beforeSend = e.beforeSend || function (e) {
                }, e.ratio && "number" != typeof e.ratio) throw new Error("`ratio` must be a number");
                if (e.ratio < 0 || e.ratio > 100) throw new Error("`ratio` must be in a 0-100 interval");
                if (e.ratio = e.ratio || 90, e.accept && "string" != typeof e.accept) throw new Error("`accept` must be a string with a list of allowed mime-types");
                if (e.accept = e.accept || "*/*", e.multiple && "boolean" != typeof e.multiple) throw new Error("`multiple` must be a true or false");
                if (e.multiple = e.multiple || !1, e.fieldName && "string" != typeof e.fieldName) throw new Error("`fieldName` must be a string");
                return e.fieldName = e.fieldName || "files", e
            }, s = function (e) {
                switch (e.method) {
                    case"GET":
                        var t = c(e.data, r.URLENCODED);
                        delete e.data, e.url = /\?/.test(e.url) ? e.url + "&" + t : e.url + "?" + t;
                        break;
                    case"POST":
                    case"PUT":
                    case"DELETE":
                    case"UPDATE":
                        var n = function () {
                            return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).type || r.JSON
                        }(e);
                        (d.isFormData(e.data) || d.isFormElement(e.data)) && (n = r.FORM), e.data = c(e.data, n), n !== f.contentType.FORM && (e.headers["content-type"] = n)
                }
                return e
            }, c = function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                switch (arguments.length > 1 ? arguments[1] : void 0) {
                    case r.URLENCODED:
                        return d.urlEncode(e);
                    case r.JSON:
                        return d.jsonEncode(e);
                    case r.FORM:
                        return d.formEncode(e);
                    default:
                        return e
                }
            }, u = function (e) {
                return e >= 200 && e < 300
            }, {
                contentType: r = {
                    URLENCODED: "application/x-www-form-urlencoded; charset=utf-8",
                    FORM: "multipart/form-data",
                    JSON: "application/json; charset=utf-8"
                }, request: i, get: function (e) {
                    return e.method = "GET", i(e)
                }, post: a, transport: function (e) {
                    return e = l(e), d.selectFiles(e).then((function (t) {
                        for (var n = new FormData, o = 0; o < t.length; o++) n.append(e.fieldName, t[o], t[o].name);
                        d.isObject(e.data) && Object.keys(e.data).forEach((function (t) {
                            var o = e.data[t];
                            n.append(t, o)
                        }));
                        var r = e.beforeSend;
                        return e.beforeSend = function () {
                            return r(t)
                        }, e.data = n, a(e)
                    }))
                }, selectFiles: function (e) {
                    return delete (e = l(e)).beforeSend, d.selectFiles(e)
                }
            });
            e.exports = f
        }, function (e, t, n) {
            "use strict";
            n.r(t);
            var o = n(1);
            window.Promise = window.Promise || o.a
        }, function (e, t, n) {
            (function (e) {
                var o = void 0 !== e && e || "undefined" != typeof self && self || window, r = Function.prototype.apply;

                function i(e, t) {
                    this._id = e, this._clearFn = t
                }

                t.setTimeout = function () {
                    return new i(r.call(setTimeout, o, arguments), clearTimeout)
                }, t.setInterval = function () {
                    return new i(r.call(setInterval, o, arguments), clearInterval)
                }, t.clearTimeout = t.clearInterval = function (e) {
                    e && e.close()
                }, i.prototype.unref = i.prototype.ref = function () {
                }, i.prototype.close = function () {
                    this._clearFn.call(o, this._id)
                }, t.enroll = function (e, t) {
                    clearTimeout(e._idleTimeoutId), e._idleTimeout = t
                }, t.unenroll = function (e) {
                    clearTimeout(e._idleTimeoutId), e._idleTimeout = -1
                }, t._unrefActive = t.active = function (e) {
                    clearTimeout(e._idleTimeoutId);
                    var t = e._idleTimeout;
                    t >= 0 && (e._idleTimeoutId = setTimeout((function () {
                        e._onTimeout && e._onTimeout()
                    }), t))
                }, n(6), t.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== e && e.setImmediate || this && this.setImmediate, t.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== e && e.clearImmediate || this && this.clearImmediate
            }).call(this, n(0))
        }, function (e, t, n) {
            (function (e, t) {
                !function (e, n) {
                    "use strict";
                    if (!e.setImmediate) {
                        var o, r, i, a, l, s = 1, c = {}, u = !1, d = e.document,
                            f = Object.getPrototypeOf && Object.getPrototypeOf(e);
                        f = f && f.setTimeout ? f : e, "[object process]" === {}.toString.call(e.process) ? o = function (e) {
                            t.nextTick((function () {
                                p(e)
                            }))
                        } : function () {
                            if (e.postMessage && !e.importScripts) {
                                var t = !0, n = e.onmessage;
                                return e.onmessage = function () {
                                    t = !1
                                }, e.postMessage("", "*"), e.onmessage = n, t
                            }
                        }() ? (a = "setImmediate$" + Math.random() + "$", l = function (t) {
                            t.source === e && "string" == typeof t.data && 0 === t.data.indexOf(a) && p(+t.data.slice(a.length))
                        }, e.addEventListener ? e.addEventListener("message", l, !1) : e.attachEvent("onmessage", l), o = function (t) {
                            e.postMessage(a + t, "*")
                        }) : e.MessageChannel ? ((i = new MessageChannel).port1.onmessage = function (e) {
                            p(e.data)
                        }, o = function (e) {
                            i.port2.postMessage(e)
                        }) : d && "onreadystatechange" in d.createElement("script") ? (r = d.documentElement, o = function (e) {
                            var t = d.createElement("script");
                            t.onreadystatechange = function () {
                                p(e), t.onreadystatechange = null, r.removeChild(t), t = null
                            }, r.appendChild(t)
                        }) : o = function (e) {
                            setTimeout(p, 0, e)
                        }, f.setImmediate = function (e) {
                            "function" != typeof e && (e = new Function("" + e));
                            for (var t = new Array(arguments.length - 1), n = 0; n < t.length; n++) t[n] = arguments[n + 1];
                            var r = {callback: e, args: t};
                            return c[s] = r, o(s), s++
                        }, f.clearImmediate = h
                    }

                    function h(e) {
                        delete c[e]
                    }

                    function p(e) {
                        if (u) setTimeout(p, 0, e); else {
                            var t = c[e];
                            if (t) {
                                u = !0;
                                try {
                                    !function (e) {
                                        var t = e.callback, n = e.args;
                                        switch (n.length) {
                                            case 0:
                                                t();
                                                break;
                                            case 1:
                                                t(n[0]);
                                                break;
                                            case 2:
                                                t(n[0], n[1]);
                                                break;
                                            case 3:
                                                t(n[0], n[1], n[2]);
                                                break;
                                            default:
                                                t.apply(void 0, n)
                                        }
                                    }(t)
                                } finally {
                                    h(e), u = !1
                                }
                            }
                        }
                    }
                }("undefined" == typeof self ? void 0 === e ? this : e : self)
            }).call(this, n(0), n(7))
        }, function (e, t) {
            var n, o, r = e.exports = {};

            function i() {
                throw new Error("setTimeout has not been defined")
            }

            function a() {
                throw new Error("clearTimeout has not been defined")
            }

            function l(e) {
                if (n === setTimeout) return setTimeout(e, 0);
                if ((n === i || !n) && setTimeout) return n = setTimeout, setTimeout(e, 0);
                try {
                    return n(e, 0)
                } catch (t) {
                    try {
                        return n.call(null, e, 0)
                    } catch (t) {
                        return n.call(this, e, 0)
                    }
                }
            }

            !function () {
                try {
                    n = "function" == typeof setTimeout ? setTimeout : i
                } catch (e) {
                    n = i
                }
                try {
                    o = "function" == typeof clearTimeout ? clearTimeout : a
                } catch (e) {
                    o = a
                }
            }();
            var s, c = [], u = !1, d = -1;

            function f() {
                u && s && (u = !1, s.length ? c = s.concat(c) : d = -1, c.length && h())
            }

            function h() {
                if (!u) {
                    var e = l(f);
                    u = !0;
                    for (var t = c.length; t;) {
                        for (s = c, c = []; ++d < t;) s && s[d].run();
                        d = -1, t = c.length
                    }
                    s = null, u = !1, function (e) {
                        if (o === clearTimeout) return clearTimeout(e);
                        if ((o === a || !o) && clearTimeout) return o = clearTimeout, clearTimeout(e);
                        try {
                            o(e)
                        } catch (t) {
                            try {
                                return o.call(null, e)
                            } catch (t) {
                                return o.call(this, e)
                            }
                        }
                    }(e)
                }
            }

            function p(e, t) {
                this.fun = e, this.array = t
            }

            function g() {
            }

            r.nextTick = function (e) {
                var t = new Array(arguments.length - 1);
                if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                c.push(new p(e, t)), 1 !== c.length || u || l(h)
            }, p.prototype.run = function () {
                this.fun.apply(null, this.array)
            }, r.title = "browser", r.browser = !0, r.env = {}, r.argv = [], r.version = "", r.versions = {}, r.on = g, r.addListener = g, r.once = g, r.off = g, r.removeListener = g, r.removeAllListeners = g, r.emit = g, r.prependListener = g, r.prependOnceListener = g, r.listeners = function (e) {
                return []
            }, r.binding = function (e) {
                throw new Error("process.binding is not supported")
            }, r.cwd = function () {
                return "/"
            }, r.chdir = function (e) {
                throw new Error("process.chdir is not supported")
            }, r.umask = function () {
                return 0
            }
        }, function (e, t, n) {
            function o(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var o = t[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                }
            }

            var r = n(9);
            e.exports = function () {
                function e() {
                    !function (e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e)
                }

                var t, n;
                return t = e, (n = [{
                    key: "urlEncode", value: function (e) {
                        return r(e)
                    }
                }, {
                    key: "jsonEncode", value: function (e) {
                        return JSON.stringify(e)
                    }
                }, {
                    key: "formEncode", value: function (e) {
                        if (this.isFormData(e)) return e;
                        if (this.isFormElement(e)) return new FormData(e);
                        if (this.isObject(e)) {
                            var t = new FormData;
                            return Object.keys(e).forEach((function (n) {
                                var o = e[n];
                                t.append(n, o)
                            })), t
                        }
                        throw new Error("`data` must be an instance of Object, FormData or <FORM> HTMLElement")
                    }
                }, {
                    key: "isObject", value: function (e) {
                        return "[object Object]" === Object.prototype.toString.call(e)
                    }
                }, {
                    key: "isFormData", value: function (e) {
                        return e instanceof FormData
                    }
                }, {
                    key: "isFormElement", value: function (e) {
                        return e instanceof HTMLFormElement
                    }
                }, {
                    key: "selectFiles", value: function () {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        return new Promise((function (t, n) {
                            var o = document.createElement("INPUT");
                            o.type = "file", e.multiple && o.setAttribute("multiple", "multiple"), e.accept && o.setAttribute("accept", e.accept), o.style.display = "none", document.body.appendChild(o), o.addEventListener("change", (function (e) {
                                var n = e.target.files;
                                t(n), document.body.removeChild(o)
                            }), !1), o.click()
                        }))
                    }
                }, {
                    key: "parseHeaders", value: function (e) {
                        var t = e.trim().split(/[\r\n]+/), n = {};
                        return t.forEach((function (e) {
                            var t = e.split(": "), o = t.shift(), r = t.join(": ");
                            o && (n[o] = r)
                        })), n
                    }
                }]) && o(t, n), e
            }()
        }, function (e, t) {
            var n = function (e) {
                return encodeURIComponent(e).replace(/[!'()*]/g, escape).replace(/%20/g, "+")
            }, o = function (e, t, r, i) {
                return t = t || null, r = r || "&", i = i || null, e ? function (e) {
                    for (var t = new Array, n = 0; n < e.length; n++) e[n] && t.push(e[n]);
                    return t
                }(Object.keys(e).map((function (a) {
                    var l, s, c = a;
                    if (i && (c = i + "[" + c + "]"), "object" == typeof e[a] && null !== e[a]) l = o(e[a], null, r, c); else {
                        t && (s = c, c = !isNaN(parseFloat(s)) && isFinite(s) ? t + Number(c) : c);
                        var u = e[a];
                        u = (u = 0 === (u = !1 === (u = !0 === u ? "1" : u) ? "0" : u) ? "0" : u) || "", l = n(c) + "=" + n(u)
                    }
                    return l
                }))).join(r).replace(/[!'()*]/g, "") : ""
            };
            e.exports = o
        }])
    }, function (e, t) {
        e.exports = function (e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, o = new Array(t); n < t; n++) o[n] = e[n];
            return o
        }
    }, function (e, t, n) {
        var o = n(3);
        e.exports = function (e, t) {
            if (e) {
                if ("string" == typeof e) return o(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(n) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? o(e, t) : void 0
            }
        }
    }, function (e, t, n) {
        var o = n(16), r = n(17), i = n(4), a = n(18);
        e.exports = function (e) {
            return o(e) || r(e) || i(e) || a()
        }
    }, function (e, t) {
        e.exports = '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3.15 13.628A7.749 7.749 0 0 0 10 17.75a7.74 7.74 0 0 0 6.305-3.242l-2.387-2.127-2.765 2.244-4.389-4.496-3.614 3.5zm-.787-2.303l4.446-4.371 4.52 4.63 2.534-2.057 3.533 2.797c.23-.734.354-1.514.354-2.324a7.75 7.75 0 1 0-15.387 1.325zM10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z"></path></svg>'
    }, function (e, t) {
        e.exports = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path></svg>'
    }, function (e, t) {
        e.exports = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-images" viewBox="0 0 16 16"><path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path><path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z"></path></svg>'
    }, function (e, t) {
        e.exports = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grid-1x2-fill" viewBox="0 0 16 16"><path d="M0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V1zm0 9a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5z"></path></svg>'
    }, function (e, t) {
        e.exports = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grid" viewBox="0 0 16 16"><path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"></path></svg>'
    }, function (e, t, n) {
        var o = n(19), r = n(20), i = n(4), a = n(21);
        e.exports = function (e, t) {
            return o(e) || r(e, t) || i(e, t) || a()
        }
    }, function (e, t, n) {
        var o = n(13), r = n(14);
        "string" == typeof (r = r.__esModule ? r.default : r) && (r = [[e.i, r, ""]]);
        var i = {insert: "head", singleton: !1}, a = (o(r, i), r.locals ? r.locals : {});
        e.exports = a
    }, function (e, t, n) {
        "use strict";
        var o, r = function () {
            return void 0 === o && (o = Boolean(window && document && document.all && !window.atob)), o
        }, i = function () {
            var e = {};
            return function (t) {
                if (void 0 === e[t]) {
                    var n = document.querySelector(t);
                    if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement) try {
                        n = n.contentDocument.head
                    } catch (e) {
                        n = null
                    }
                    e[t] = n
                }
                return e[t]
            }
        }(), a = [];

        function l(e) {
            for (var t = -1, n = 0; n < a.length; n++) if (a[n].identifier === e) {
                t = n;
                break
            }
            return t
        }

        function s(e, t) {
            for (var n = {}, o = [], r = 0; r < e.length; r++) {
                var i = e[r], s = t.base ? i[0] + t.base : i[0], c = n[s] || 0, u = "".concat(s, " ").concat(c);
                n[s] = c + 1;
                var d = l(u), f = {css: i[1], media: i[2], sourceMap: i[3]};
                -1 !== d ? (a[d].references++, a[d].updater(f)) : a.push({
                    identifier: u,
                    updater: m(f, t),
                    references: 1
                }), o.push(u)
            }
            return o
        }

        function c(e) {
            var t = document.createElement("style"), o = e.attributes || {};
            if (void 0 === o.nonce) {
                var r = n.nc;
                r && (o.nonce = r)
            }
            if (Object.keys(o).forEach((function (e) {
                t.setAttribute(e, o[e])
            })), "function" == typeof e.insert) e.insert(t); else {
                var a = i(e.insert || "head");
                if (!a) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
                a.appendChild(t)
            }
            return t
        }

        var u, d = (u = [], function (e, t) {
            return u[e] = t, u.filter(Boolean).join("\n")
        });

        function f(e, t, n, o) {
            var r = n ? "" : o.media ? "@media ".concat(o.media, " {").concat(o.css, "}") : o.css;
            if (e.styleSheet) e.styleSheet.cssText = d(t, r); else {
                var i = document.createTextNode(r), a = e.childNodes;
                a[t] && e.removeChild(a[t]), a.length ? e.insertBefore(i, a[t]) : e.appendChild(i)
            }
        }

        function h(e, t, n) {
            var o = n.css, r = n.media, i = n.sourceMap;
            if (r ? e.setAttribute("media", r) : e.removeAttribute("media"), i && btoa && (o += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i)))), " */")), e.styleSheet) e.styleSheet.cssText = o; else {
                for (; e.firstChild;) e.removeChild(e.firstChild);
                e.appendChild(document.createTextNode(o))
            }
        }

        var p = null, g = 0;

        function m(e, t) {
            var n, o, r;
            if (t.singleton) {
                var i = g++;
                n = p || (p = c(t)), o = f.bind(null, n, i, !1), r = f.bind(null, n, i, !0)
            } else n = c(t), o = h.bind(null, n, t), r = function () {
                !function (e) {
                    if (null === e.parentNode) return !1;
                    e.parentNode.removeChild(e)
                }(n)
            };
            return o(e), function (t) {
                if (t) {
                    if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
                    o(e = t)
                } else r()
            }
        }

        e.exports = function (e, t) {
            (t = t || {}).singleton || "boolean" == typeof t.singleton || (t.singleton = r());
            var n = s(e = e || [], t);
            return function (e) {
                if (e = e || [], "[object Array]" === Object.prototype.toString.call(e)) {
                    for (var o = 0; o < n.length; o++) {
                        var r = l(n[o]);
                        a[r].references--
                    }
                    for (var i = s(e, t), c = 0; c < n.length; c++) {
                        var u = l(n[c]);
                        0 === a[u].references && (a[u].updater(), a.splice(u, 1))
                    }
                    n = i
                }
            }
        }
    }, function (e, t, n) {
        (t = n(15)(!1)).push([e.i, '.image-gallery {\r\n  --bg-color: #cdd1e0;\r\n  --front-color: #388ae5;\r\n  --border-color: #e8e8eb;\r\n}\r\n\r\n  .image-gallery__container {\r\n    /*background: #00000005;*/ border: 1px solid rgba(201,201,204,.48);  -webkit-box-shadow: inset 0 1px 2px 0 rgb(35 44 72 / 6%); box-shadow: inset 0 1px 2px 0 rgb(35 44 72 / 6%); border-radius: 3px; \r\n    margin-bottom: 10px;\r\n    padding: 5px;\r\n  }\r\n\r\n  .image-gallery__controls {\r\n    display: flex;\r\n    gap: 10px;\r\n    padding: 8px 2px 3px;\r\n  }\r\n\r\n  .image-gallery__items {\r\n    display: grid;\r\n    gap: 10px;\r\n    grid-template-columns: 1fr 1fr 1fr;\r\n    padding: 10px;\r\n    /*background-color: #2222220d;*/\r\n  }\r\n\r\n  .image-gallery__items:empty {\r\n    display: none;\r\n  }\r\n\r\n  .image-gallery__preloaders {\r\n        background: #00000005; display: flex;\r\n    flex-grow: 1;\r\n    flex-wrap: nowrap;\r\n    padding: 5px;\r\n    gap: 8px;\r\n    overflow: hidden;\r\n  }\r\n\r\n  .image-gallery__preloader {\r\n    min-width: 30px;\r\n    height: 30px;\r\n    border-radius: 50%;\r\n    background-size: cover;\r\n    position: relative;\r\n    background-color: var(--bg-color);\r\n    background-position: center center;\r\n  }\r\n\r\n  .image-gallery__preloader::after {\r\n      content: "";\r\n      position: absolute;\r\n      z-index: 3;\r\n      width: 30px;\r\n      height: 30px;\r\n      border-radius: 50%;\r\n      border: 2px solid var(--bg-color);\r\n      border-top-color: var(--front-color);\r\n      left: 50%;\r\n      top: 50%;\r\n      margin-top: -15px;\r\n      margin-left: -15px;\r\n      animation: image-preloader-spin 2s infinite linear;\r\n      box-sizing: border-box;\r\n    }\r\n\r\n  .image-gallery__image {\r\n    position: relative;\r\n    overflow: hidden;\r\n    aspect-ratio: 16 / 9;\r\n    cursor: move;\r\n    user-select: none;\r\n    background-color: #00000014;\r\n    border-radius: 3px;\r\n    padding: 5px;\r\n  }\r\n\r\n  .image-gallery__image.sortable-ghost {\r\n      opacity: .75;\r\n    }\r\n\r\n  .image-gallery__image--empty,\r\n    .image-gallery__image--loading {\r\n      display: none;\r\n    }\r\n\r\n  .image-gallery__image-picture {\r\n      border-radius: 3px;\r\n      max-width: 100%;\r\n      height: 100%;\r\n      display: block;\r\n      margin: auto;\r\n      object-fit: cover;\r\n      pointer-events: none;\r\n    }\r\n\r\n  .image-gallery__image-trash {\r\n      position: absolute;\r\n      top: 3px;\r\n      right: 3px;\r\n      cursor: pointer;\r\n      color: #fff;\r\n      font-size: 18px;\r\n      background-color: rgba(0, 0, 0, .25);\r\n      line-height: 1;\r\n      padding: 6px 8px;\r\n      border-radius: 3px;\r\n      transition: background-color .1s;\r\n    }\r\n\r\n  .image-gallery__image-trash:hover {\r\n        background-color: rgba(0, 0, 0, .5);\r\n      }\r\n\r\n  .image-gallery__caption[contentEditable="true"][data-placeholder]::before {\r\n      position: absolute !important;\r\n      content: attr(data-placeholder);\r\n      color: #707684;\r\n      font-weight: normal;\r\n      display: none;\r\n    }\r\n\r\n  .image-gallery__caption[contentEditable="true"][data-placeholder]:empty::before {\r\n        display: block;\r\n      }\r\n\r\n  .image-gallery__caption[contentEditable="true"][data-placeholder]:empty:focus::before {\r\n        display: none;\r\n      }\r\n\r\n  .image-gallery__caption {\r\n    display: none; margin-bottom: 10px;\r\n  }\r\n\r\n  .image-gallery .cdx-button {\r\n    /*height: 40px;*/\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    padding: 12px;\r\n    gap: 5px;\r\n    white-space: nowrap;\r\n  }\r\n\r\n  /**\r\n   * Tunes\r\n   * ----------------\r\n   */\r\n\r\n  .image-gallery__tune-wrapper {\r\n    display: flex;\r\n  }\r\n\r\n  .image-gallery__tune {\r\n    width: 50%;\r\n    margin-right: 0 !important;\r\n  }\r\n\r\n@keyframes image-preloader-spin {\r\n  0% {\r\n    transform: rotate(0deg);\r\n  }\r\n\r\n  100% {\r\n    transform: rotate(360deg);\r\n  }\r\n}', ""]), e.exports = t
    }, function (e, t, n) {
        "use strict";
        e.exports = function (e) {
            var t = [];
            return t.toString = function () {
                return this.map((function (t) {
                    var n = function (e, t) {
                        var n = e[1] || "", o = e[3];
                        if (!o) return n;
                        if (t && "function" == typeof btoa) {
                            var r = (a = o, l = btoa(unescape(encodeURIComponent(JSON.stringify(a)))), s = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(l), "/*# ".concat(s, " */")),
                                i = o.sources.map((function (e) {
                                    return "/*# sourceURL=".concat(o.sourceRoot || "").concat(e, " */")
                                }));
                            return [n].concat(i).concat([r]).join("\n")
                        }
                        var a, l, s;
                        return [n].join("\n")
                    }(t, e);
                    return t[2] ? "@media ".concat(t[2], " {").concat(n, "}") : n
                })).join("")
            }, t.i = function (e, n, o) {
                "string" == typeof e && (e = [[null, e, ""]]);
                var r = {};
                if (o) for (var i = 0; i < this.length; i++) {
                    var a = this[i][0];
                    null != a && (r[a] = !0)
                }
                for (var l = 0; l < e.length; l++) {
                    var s = [].concat(e[l]);
                    o && r[s[0]] || (n && (s[2] ? s[2] = "".concat(n, " and ").concat(s[2]) : s[2] = n), t.push(s))
                }
            }, t
        }
    }, function (e, t, n) {
        var o = n(3);
        e.exports = function (e) {
            if (Array.isArray(e)) return o(e)
        }
    }, function (e, t) {
        e.exports = function (e) {
            if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e)
        }
    }, function (e, t) {
        e.exports = function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
    }, function (e, t) {
        e.exports = function (e) {
            if (Array.isArray(e)) return e
        }
    }, function (e, t) {
        e.exports = function (e, t) {
            if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) {
                var n = [], o = !0, r = !1, i = void 0;
                try {
                    for (var a, l = e[Symbol.iterator](); !(o = (a = l.next()).done) && (n.push(a.value), !t || n.length !== t); o = !0) ;
                } catch (e) {
                    r = !0, i = e
                } finally {
                    try {
                        o || null == l.return || l.return()
                    } finally {
                        if (r) throw i
                    }
                }
                return n
            }
        }
    }, function (e, t) {
        e.exports = function () {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
    }, function (e, t, n) {
        "use strict";
        n.r(t), n.d(t, "default", (function () {
            return It
        }));
        var o = n(1), r = n.n(o), i = n(0), a = n.n(i), l = (n(12), n(5)), s = n.n(l);

        /**!
         * Sortable 1.15.0
         * @author    RubaXa   <trash@rubaxa.org>
         * @author    owenm    <owen23355@gmail.com>
         * @license MIT
         */
        function c(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var o = Object.getOwnPropertySymbols(e);
                t && (o = o.filter((function (t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }))), n.push.apply(n, o)
            }
            return n
        }

        function u(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? c(Object(n), !0).forEach((function (t) {
                    f(e, t, n[t])
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : c(Object(n)).forEach((function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }))
            }
            return e
        }

        function d(e) {
            return (d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function f(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        function h() {
            return (h = Object.assign || function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o])
                }
                return e
            }).apply(this, arguments)
        }

        function p(e, t) {
            if (null == e) return {};
            var n, o, r = function (e, t) {
                if (null == e) return {};
                var n, o, r = {}, i = Object.keys(e);
                for (o = 0; o < i.length; o++) n = i[o], t.indexOf(n) >= 0 || (r[n] = e[n]);
                return r
            }(e, t);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                for (o = 0; o < i.length; o++) n = i[o], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
            }
            return r
        }

        function g(e) {
            if ("undefined" != typeof window && window.navigator) return !!navigator.userAgent.match(e)
        }

        var m = g(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), v = g(/Edge/i), y = g(/firefox/i),
            b = g(/safari/i) && !g(/chrome/i) && !g(/android/i), w = g(/iP(ad|od|hone)/i),
            _ = g(/chrome/i) && g(/android/i), S = {capture: !1, passive: !1};

        function E(e, t, n) {
            e.addEventListener(t, n, !m && S)
        }

        function C(e, t, n) {
            e.removeEventListener(t, n, !m && S)
        }

        function x(e, t) {
            if (t) {
                if (">" === t[0] && (t = t.substring(1)), e) try {
                    if (e.matches) return e.matches(t);
                    if (e.msMatchesSelector) return e.msMatchesSelector(t);
                    if (e.webkitMatchesSelector) return e.webkitMatchesSelector(t)
                } catch (e) {
                    return !1
                }
                return !1
            }
        }

        function T(e) {
            return e.host && e !== document && e.host.nodeType ? e.host : e.parentNode
        }

        function D(e, t, n, o) {
            if (e) {
                n = n || document;
                do {
                    if (null != t && (">" === t[0] ? e.parentNode === n && x(e, t) : x(e, t)) || o && e === n) return e;
                    if (e === n) break
                } while (e = T(e))
            }
            return null
        }

        var O, M = /\s+/g;

        function k(e, t, n) {
            if (e && t) if (e.classList) e.classList[n ? "add" : "remove"](t); else {
                var o = (" " + e.className + " ").replace(M, " ").replace(" " + t + " ", " ");
                e.className = (o + (n ? " " + t : "")).replace(M, " ")
            }
        }

        function I(e, t, n) {
            var o = e && e.style;
            if (o) {
                if (void 0 === n) return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(e, "") : e.currentStyle && (n = e.currentStyle), void 0 === t ? n : n[t];
                t in o || -1 !== t.indexOf("webkit") || (t = "-webkit-" + t), o[t] = n + ("string" == typeof n ? "" : "px")
            }
        }

        function A(e, t) {
            var n = "";
            if ("string" == typeof e) n = e; else do {
                var o = I(e, "transform");
                o && "none" !== o && (n = o + " " + n)
            } while (!t && (e = e.parentNode));
            var r = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
            return r && new r(n)
        }

        function P(e, t, n) {
            if (e) {
                var o = e.getElementsByTagName(t), r = 0, i = o.length;
                if (n) for (; r < i; r++) n(o[r], r);
                return o
            }
            return []
        }

        function F() {
            var e = document.scrollingElement;
            return e || document.documentElement
        }

        function j(e, t, n, o, r) {
            if (e.getBoundingClientRect || e === window) {
                var i, a, l, s, c, u, d;
                if (e !== window && e.parentNode && e !== F() ? (a = (i = e.getBoundingClientRect()).top, l = i.left, s = i.bottom, c = i.right, u = i.height, d = i.width) : (a = 0, l = 0, s = window.innerHeight, c = window.innerWidth, u = window.innerHeight, d = window.innerWidth), (t || n) && e !== window && (r = r || e.parentNode, !m)) do {
                    if (r && r.getBoundingClientRect && ("none" !== I(r, "transform") || n && "static" !== I(r, "position"))) {
                        var f = r.getBoundingClientRect();
                        a -= f.top + parseInt(I(r, "border-top-width")), l -= f.left + parseInt(I(r, "border-left-width")), s = a + i.height, c = l + i.width;
                        break
                    }
                } while (r = r.parentNode);
                if (o && e !== window) {
                    var h = A(r || e), p = h && h.a, g = h && h.d;
                    h && (s = (a /= g) + (u /= g), c = (l /= p) + (d /= p))
                }
                return {top: a, left: l, bottom: s, right: c, width: d, height: u}
            }
        }

        function N(e, t, n) {
            for (var o = X(e, !0), r = j(e)[t]; o;) {
                var i = j(o)[n];
                if (!("top" === n || "left" === n ? r >= i : r <= i)) return o;
                if (o === F()) break;
                o = X(o, !1)
            }
            return !1
        }

        function R(e, t, n, o) {
            for (var r = 0, i = 0, a = e.children; i < a.length;) {
                if ("none" !== a[i].style.display && a[i] !== qe.ghost && (o || a[i] !== qe.dragged) && D(a[i], n.draggable, e, !1)) {
                    if (r === t) return a[i];
                    r++
                }
                i++
            }
            return null
        }

        function L(e, t) {
            for (var n = e.lastElementChild; n && (n === qe.ghost || "none" === I(n, "display") || t && !x(n, t));) n = n.previousElementSibling;
            return n || null
        }

        function B(e, t) {
            var n = 0;
            if (!e || !e.parentNode) return -1;
            for (; e = e.previousElementSibling;) "TEMPLATE" === e.nodeName.toUpperCase() || e === qe.clone || t && !x(e, t) || n++;
            return n
        }

        function H(e) {
            var t = 0, n = 0, o = F();
            if (e) do {
                var r = A(e), i = r.a, a = r.d;
                t += e.scrollLeft * i, n += e.scrollTop * a
            } while (e !== o && (e = e.parentNode));
            return [t, n]
        }

        function X(e, t) {
            if (!e || !e.getBoundingClientRect) return F();
            var n = e, o = !1;
            do {
                if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
                    var r = I(n);
                    if (n.clientWidth < n.scrollWidth && ("auto" == r.overflowX || "scroll" == r.overflowX) || n.clientHeight < n.scrollHeight && ("auto" == r.overflowY || "scroll" == r.overflowY)) {
                        if (!n.getBoundingClientRect || n === document.body) return F();
                        if (o || t) return n;
                        o = !0
                    }
                }
            } while (n = n.parentNode);
            return F()
        }

        function z(e, t) {
            return Math.round(e.top) === Math.round(t.top) && Math.round(e.left) === Math.round(t.left) && Math.round(e.height) === Math.round(t.height) && Math.round(e.width) === Math.round(t.width)
        }

        function Y(e, t) {
            return function () {
                if (!O) {
                    var n = arguments, o = this;
                    1 === n.length ? e.call(o, n[0]) : e.apply(o, n), O = setTimeout((function () {
                        O = void 0
                    }), t)
                }
            }
        }

        function U(e, t, n) {
            e.scrollLeft += t, e.scrollTop += n
        }

        function q(e) {
            var t = window.Polymer, n = window.jQuery || window.Zepto;
            return t && t.dom ? t.dom(e).cloneNode(!0) : n ? n(e).clone(!0)[0] : e.cloneNode(!0)
        }

        var V = "Sortable" + (new Date).getTime();

        function W() {
            var e, t = [];
            return {
                captureAnimationState: function () {
                    (t = [], this.options.animation) && [].slice.call(this.el.children).forEach((function (e) {
                        if ("none" !== I(e, "display") && e !== qe.ghost) {
                            t.push({target: e, rect: j(e)});
                            var n = u({}, t[t.length - 1].rect);
                            if (e.thisAnimationDuration) {
                                var o = A(e, !0);
                                o && (n.top -= o.f, n.left -= o.e)
                            }
                            e.fromRect = n
                        }
                    }))
                }, addAnimationState: function (e) {
                    t.push(e)
                }, removeAnimationState: function (e) {
                    t.splice(function (e, t) {
                        for (var n in e) if (e.hasOwnProperty(n)) for (var o in t) if (t.hasOwnProperty(o) && t[o] === e[n][o]) return Number(n);
                        return -1
                    }(t, {target: e}), 1)
                }, animateAll: function (n) {
                    var o = this;
                    if (!this.options.animation) return clearTimeout(e), void ("function" == typeof n && n());
                    var r = !1, i = 0;
                    t.forEach((function (e) {
                        var t = 0, n = e.target, a = n.fromRect, l = j(n), s = n.prevFromRect, c = n.prevToRect,
                            u = e.rect, d = A(n, !0);
                        d && (l.top -= d.f, l.left -= d.e), n.toRect = l, n.thisAnimationDuration && z(s, l) && !z(a, l) && (u.top - l.top) / (u.left - l.left) == (a.top - l.top) / (a.left - l.left) && (t = function (e, t, n, o) {
                            return Math.sqrt(Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)) / Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2)) * o.animation
                        }(u, s, c, o.options)), z(l, a) || (n.prevFromRect = a, n.prevToRect = l, t || (t = o.options.animation), o.animate(n, u, l, t)), t && (r = !0, i = Math.max(i, t), clearTimeout(n.animationResetTimer), n.animationResetTimer = setTimeout((function () {
                            n.animationTime = 0, n.prevFromRect = null, n.fromRect = null, n.prevToRect = null, n.thisAnimationDuration = null
                        }), t), n.thisAnimationDuration = t)
                    })), clearTimeout(e), r ? e = setTimeout((function () {
                        "function" == typeof n && n()
                    }), i) : "function" == typeof n && n(), t = []
                }, animate: function (e, t, n, o) {
                    if (o) {
                        I(e, "transition", ""), I(e, "transform", "");
                        var r = A(this.el), i = r && r.a, a = r && r.d, l = (t.left - n.left) / (i || 1),
                            s = (t.top - n.top) / (a || 1);
                        e.animatingX = !!l, e.animatingY = !!s, I(e, "transform", "translate3d(" + l + "px," + s + "px,0)"), this.forRepaintDummy = function (e) {
                            return e.offsetWidth
                        }(e), I(e, "transition", "transform " + o + "ms" + (this.options.easing ? " " + this.options.easing : "")), I(e, "transform", "translate3d(0,0,0)"), "number" == typeof e.animated && clearTimeout(e.animated), e.animated = setTimeout((function () {
                            I(e, "transition", ""), I(e, "transform", ""), e.animated = !1, e.animatingX = !1, e.animatingY = !1
                        }), o)
                    }
                }
            }
        }

        var G = [], J = {initializeByDefault: !0}, $ = {
            mount: function (e) {
                for (var t in J) J.hasOwnProperty(t) && !(t in e) && (e[t] = J[t]);
                G.forEach((function (t) {
                    if (t.pluginName === e.pluginName) throw"Sortable: Cannot mount plugin ".concat(e.pluginName, " more than once")
                })), G.push(e)
            }, pluginEvent: function (e, t, n) {
                var o = this;
                this.eventCanceled = !1, n.cancel = function () {
                    o.eventCanceled = !0
                };
                var r = e + "Global";
                G.forEach((function (o) {
                    t[o.pluginName] && (t[o.pluginName][r] && t[o.pluginName][r](u({sortable: t}, n)), t.options[o.pluginName] && t[o.pluginName][e] && t[o.pluginName][e](u({sortable: t}, n)))
                }))
            }, initializePlugins: function (e, t, n, o) {
                for (var r in G.forEach((function (o) {
                    var r = o.pluginName;
                    if (e.options[r] || o.initializeByDefault) {
                        var i = new o(e, t, e.options);
                        i.sortable = e, i.options = e.options, e[r] = i, h(n, i.defaults)
                    }
                })), e.options) if (e.options.hasOwnProperty(r)) {
                    var i = this.modifyOption(e, r, e.options[r]);
                    void 0 !== i && (e.options[r] = i)
                }
            }, getEventProperties: function (e, t) {
                var n = {};
                return G.forEach((function (o) {
                    "function" == typeof o.eventProperties && h(n, o.eventProperties.call(t[o.pluginName], e))
                })), n
            }, modifyOption: function (e, t, n) {
                var o;
                return G.forEach((function (r) {
                    e[r.pluginName] && r.optionListeners && "function" == typeof r.optionListeners[t] && (o = r.optionListeners[t].call(e[r.pluginName], n))
                })), o
            }
        };

        function Z(e) {
            var t = e.sortable, n = e.rootEl, o = e.name, r = e.targetEl, i = e.cloneEl, a = e.toEl, l = e.fromEl,
                s = e.oldIndex, c = e.newIndex, d = e.oldDraggableIndex, f = e.newDraggableIndex, h = e.originalEvent,
                p = e.putSortable, g = e.extraEventProperties;
            if (t = t || n && n[V]) {
                var y, b = t.options, w = "on" + o.charAt(0).toUpperCase() + o.substr(1);
                !window.CustomEvent || m || v ? (y = document.createEvent("Event")).initEvent(o, !0, !0) : y = new CustomEvent(o, {
                    bubbles: !0,
                    cancelable: !0
                }), y.to = a || n, y.from = l || n, y.item = r || n, y.clone = i, y.oldIndex = s, y.newIndex = c, y.oldDraggableIndex = d, y.newDraggableIndex = f, y.originalEvent = h, y.pullMode = p ? p.lastPutMode : void 0;
                var _ = u(u({}, g), $.getEventProperties(o, t));
                for (var S in _) y[S] = _[S];
                n && n.dispatchEvent(y), b[w] && b[w].call(t, y)
            }
        }

        var K = ["evt"], Q = function (e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, o = n.evt, r = p(n, K);
            $.pluginEvent.bind(qe)(e, t, u({
                dragEl: te,
                parentEl: ne,
                ghostEl: oe,
                rootEl: re,
                nextEl: ie,
                lastDownEl: ae,
                cloneEl: le,
                cloneHidden: se,
                dragStarted: _e,
                putSortable: pe,
                activeSortable: qe.active,
                originalEvent: o,
                oldIndex: ce,
                oldDraggableIndex: de,
                newIndex: ue,
                newDraggableIndex: fe,
                hideGhostForTarget: Xe,
                unhideGhostForTarget: ze,
                cloneNowHidden: function () {
                    se = !0
                },
                cloneNowShown: function () {
                    se = !1
                },
                dispatchSortableEvent: function (e) {
                    ee({sortable: t, name: e, originalEvent: o})
                }
            }, r))
        };

        function ee(e) {
            Z(u({
                putSortable: pe,
                cloneEl: le,
                targetEl: te,
                rootEl: re,
                oldIndex: ce,
                oldDraggableIndex: de,
                newIndex: ue,
                newDraggableIndex: fe
            }, e))
        }

        var te, ne, oe, re, ie, ae, le, se, ce, ue, de, fe, he, pe, ge, me, ve, ye, be, we, _e, Se, Ee, Ce, xe, Te = !1,
            De = !1, Oe = [], Me = !1, ke = !1, Ie = [], Ae = !1, Pe = [], Fe = "undefined" != typeof document, je = w,
            Ne = v || m ? "cssFloat" : "float", Re = Fe && !_ && !w && "draggable" in document.createElement("div"),
            Le = function () {
                if (Fe) {
                    if (m) return !1;
                    var e = document.createElement("x");
                    return e.style.cssText = "pointer-events:auto", "auto" === e.style.pointerEvents
                }
            }(), Be = function (e, t) {
                var n = I(e),
                    o = parseInt(n.width) - parseInt(n.paddingLeft) - parseInt(n.paddingRight) - parseInt(n.borderLeftWidth) - parseInt(n.borderRightWidth),
                    r = R(e, 0, t), i = R(e, 1, t), a = r && I(r), l = i && I(i),
                    s = a && parseInt(a.marginLeft) + parseInt(a.marginRight) + j(r).width,
                    c = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + j(i).width;
                if ("flex" === n.display) return "column" === n.flexDirection || "column-reverse" === n.flexDirection ? "vertical" : "horizontal";
                if ("grid" === n.display) return n.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
                if (r && a.float && "none" !== a.float) {
                    var u = "left" === a.float ? "left" : "right";
                    return !i || "both" !== l.clear && l.clear !== u ? "horizontal" : "vertical"
                }
                return r && ("block" === a.display || "flex" === a.display || "table" === a.display || "grid" === a.display || s >= o && "none" === n[Ne] || i && "none" === n[Ne] && s + c > o) ? "vertical" : "horizontal"
            }, He = function (e) {
                function t(e, n) {
                    return function (o, r, i, a) {
                        var l = o.options.group.name && r.options.group.name && o.options.group.name === r.options.group.name;
                        if (null == e && (n || l)) return !0;
                        if (null == e || !1 === e) return !1;
                        if (n && "clone" === e) return e;
                        if ("function" == typeof e) return t(e(o, r, i, a), n)(o, r, i, a);
                        var s = (n ? o : r).options.group.name;
                        return !0 === e || "string" == typeof e && e === s || e.join && e.indexOf(s) > -1
                    }
                }

                var n = {}, o = e.group;
                o && "object" == d(o) || (o = {name: o}), n.name = o.name, n.checkPull = t(o.pull, !0), n.checkPut = t(o.put), n.revertClone = o.revertClone, e.group = n
            }, Xe = function () {
                !Le && oe && I(oe, "display", "none")
            }, ze = function () {
                !Le && oe && I(oe, "display", "")
            };
        Fe && !_ && document.addEventListener("click", (function (e) {
            if (De) return e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), De = !1, !1
        }), !0);
        var Ye = function (e) {
            if (te) {
                e = e.touches ? e.touches[0] : e;
                var t = (r = e.clientX, i = e.clientY, Oe.some((function (e) {
                    var t = e[V].options.emptyInsertThreshold;
                    if (t && !L(e)) {
                        var n = j(e), o = r >= n.left - t && r <= n.right + t, l = i >= n.top - t && i <= n.bottom + t;
                        return o && l ? a = e : void 0
                    }
                })), a);
                if (t) {
                    var n = {};
                    for (var o in e) e.hasOwnProperty(o) && (n[o] = e[o]);
                    n.target = n.rootEl = t, n.preventDefault = void 0, n.stopPropagation = void 0, t[V]._onDragOver(n)
                }
            }
            var r, i, a
        }, Ue = function (e) {
            te && te.parentNode[V]._isOutsideThisEl(e.target)
        };

        function qe(e, t) {
            if (!e || !e.nodeType || 1 !== e.nodeType) throw"Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(e));
            this.el = e, this.options = t = h({}, t), e[V] = this;
            var n = {
                group: null,
                sort: !0,
                disabled: !1,
                store: null,
                handle: null,
                draggable: /^[uo]l$/i.test(e.nodeName) ? ">li" : ">*",
                swapThreshold: 1,
                invertSwap: !1,
                invertedSwapThreshold: null,
                removeCloneOnHide: !0,
                direction: function () {
                    return Be(e, this.options)
                },
                ghostClass: "sortable-ghost",
                chosenClass: "sortable-chosen",
                dragClass: "sortable-drag",
                ignore: "a, img",
                filter: null,
                preventOnFilter: !0,
                animation: 0,
                easing: null,
                setData: function (e, t) {
                    e.setData("Text", t.textContent)
                },
                dropBubble: !1,
                dragoverBubble: !1,
                dataIdAttr: "data-id",
                delay: 0,
                delayOnTouchOnly: !1,
                touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
                forceFallback: !1,
                fallbackClass: "sortable-fallback",
                fallbackOnBody: !1,
                fallbackTolerance: 0,
                fallbackOffset: {x: 0, y: 0},
                supportPointer: !1 !== qe.supportPointer && "PointerEvent" in window && !b,
                emptyInsertThreshold: 5
            };
            for (var o in $.initializePlugins(this, e, n), n) !(o in t) && (t[o] = n[o]);
            for (var r in He(t), this) "_" === r.charAt(0) && "function" == typeof this[r] && (this[r] = this[r].bind(this));
            this.nativeDraggable = !t.forceFallback && Re, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? E(e, "pointerdown", this._onTapStart) : (E(e, "mousedown", this._onTapStart), E(e, "touchstart", this._onTapStart)), this.nativeDraggable && (E(e, "dragover", this), E(e, "dragenter", this)), Oe.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), h(this, W())
        }

        function Ve(e, t, n, o, r, i, a, l) {
            var s, c, u = e[V], d = u.options.onMove;
            return !window.CustomEvent || m || v ? (s = document.createEvent("Event")).initEvent("move", !0, !0) : s = new CustomEvent("move", {
                bubbles: !0,
                cancelable: !0
            }), s.to = t, s.from = e, s.dragged = n, s.draggedRect = o, s.related = r || t, s.relatedRect = i || j(t), s.willInsertAfter = l, s.originalEvent = a, e.dispatchEvent(s), d && (c = d.call(u, s, a)), c
        }

        function We(e) {
            e.draggable = !1
        }

        function Ge() {
            Ae = !1
        }

        function Je(e) {
            for (var t = e.tagName + e.className + e.src + e.href + e.textContent, n = t.length, o = 0; n--;) o += t.charCodeAt(n);
            return o.toString(36)
        }

        function $e(e) {
            return setTimeout(e, 0)
        }

        function Ze(e) {
            return clearTimeout(e)
        }

        qe.prototype = {
            constructor: qe, _isOutsideThisEl: function (e) {
                this.el.contains(e) || e === this.el || (Se = null)
            }, _getDirection: function (e, t) {
                return "function" == typeof this.options.direction ? this.options.direction.call(this, e, t, te) : this.options.direction
            }, _onTapStart: function (e) {
                if (e.cancelable) {
                    var t = this, n = this.el, o = this.options, r = o.preventOnFilter, i = e.type,
                        a = e.touches && e.touches[0] || e.pointerType && "touch" === e.pointerType && e,
                        l = (a || e).target,
                        s = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || l,
                        c = o.filter;
                    if (function (e) {
                        Pe.length = 0;
                        var t = e.getElementsByTagName("input"), n = t.length;
                        for (; n--;) {
                            var o = t[n];
                            o.checked && Pe.push(o)
                        }
                    }(n), !te && !(/mousedown|pointerdown/.test(i) && 0 !== e.button || o.disabled) && !s.isContentEditable && (this.nativeDraggable || !b || !l || "SELECT" !== l.tagName.toUpperCase()) && !((l = D(l, o.draggable, n, !1)) && l.animated || ae === l)) {
                        if (ce = B(l), de = B(l, o.draggable), "function" == typeof c) {
                            if (c.call(this, e, l, this)) return ee({
                                sortable: t,
                                rootEl: s,
                                name: "filter",
                                targetEl: l,
                                toEl: n,
                                fromEl: n
                            }), Q("filter", t, {evt: e}), void (r && e.cancelable && e.preventDefault())
                        } else if (c && (c = c.split(",").some((function (o) {
                            if (o = D(s, o.trim(), n, !1)) return ee({
                                sortable: t,
                                rootEl: o,
                                name: "filter",
                                targetEl: l,
                                fromEl: n,
                                toEl: n
                            }), Q("filter", t, {evt: e}), !0
                        })))) return void (r && e.cancelable && e.preventDefault());
                        o.handle && !D(s, o.handle, n, !1) || this._prepareDragStart(e, a, l)
                    }
                }
            }, _prepareDragStart: function (e, t, n) {
                var o, r = this, i = r.el, a = r.options, l = i.ownerDocument;
                if (n && !te && n.parentNode === i) {
                    var s = j(n);
                    if (re = i, ne = (te = n).parentNode, ie = te.nextSibling, ae = n, he = a.group, qe.dragged = te, ge = {
                        target: te,
                        clientX: (t || e).clientX,
                        clientY: (t || e).clientY
                    }, be = ge.clientX - s.left, we = ge.clientY - s.top, this._lastX = (t || e).clientX, this._lastY = (t || e).clientY, te.style["will-change"] = "all", o = function () {
                        Q("delayEnded", r, {evt: e}), qe.eventCanceled ? r._onDrop() : (r._disableDelayedDragEvents(), !y && r.nativeDraggable && (te.draggable = !0), r._triggerDragStart(e, t), ee({
                            sortable: r,
                            name: "choose",
                            originalEvent: e
                        }), k(te, a.chosenClass, !0))
                    }, a.ignore.split(",").forEach((function (e) {
                        P(te, e.trim(), We)
                    })), E(l, "dragover", Ye), E(l, "mousemove", Ye), E(l, "touchmove", Ye), E(l, "mouseup", r._onDrop), E(l, "touchend", r._onDrop), E(l, "touchcancel", r._onDrop), y && this.nativeDraggable && (this.options.touchStartThreshold = 4, te.draggable = !0), Q("delayStart", this, {evt: e}), !a.delay || a.delayOnTouchOnly && !t || this.nativeDraggable && (v || m)) o(); else {
                        if (qe.eventCanceled) return void this._onDrop();
                        E(l, "mouseup", r._disableDelayedDrag), E(l, "touchend", r._disableDelayedDrag), E(l, "touchcancel", r._disableDelayedDrag), E(l, "mousemove", r._delayedDragTouchMoveHandler), E(l, "touchmove", r._delayedDragTouchMoveHandler), a.supportPointer && E(l, "pointermove", r._delayedDragTouchMoveHandler), r._dragStartTimer = setTimeout(o, a.delay)
                    }
                }
            }, _delayedDragTouchMoveHandler: function (e) {
                var t = e.touches ? e.touches[0] : e;
                Math.max(Math.abs(t.clientX - this._lastX), Math.abs(t.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag()
            }, _disableDelayedDrag: function () {
                te && We(te), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents()
            }, _disableDelayedDragEvents: function () {
                var e = this.el.ownerDocument;
                C(e, "mouseup", this._disableDelayedDrag), C(e, "touchend", this._disableDelayedDrag), C(e, "touchcancel", this._disableDelayedDrag), C(e, "mousemove", this._delayedDragTouchMoveHandler), C(e, "touchmove", this._delayedDragTouchMoveHandler), C(e, "pointermove", this._delayedDragTouchMoveHandler)
            }, _triggerDragStart: function (e, t) {
                t = t || "touch" == e.pointerType && e, !this.nativeDraggable || t ? this.options.supportPointer ? E(document, "pointermove", this._onTouchMove) : E(document, t ? "touchmove" : "mousemove", this._onTouchMove) : (E(te, "dragend", this), E(re, "dragstart", this._onDragStart));
                try {
                    document.selection ? $e((function () {
                        document.selection.empty()
                    })) : window.getSelection().removeAllRanges()
                } catch (e) {
                }
            }, _dragStarted: function (e, t) {
                if (Te = !1, re && te) {
                    Q("dragStarted", this, {evt: t}), this.nativeDraggable && E(document, "dragover", Ue);
                    var n = this.options;
                    !e && k(te, n.dragClass, !1), k(te, n.ghostClass, !0), qe.active = this, e && this._appendGhost(), ee({
                        sortable: this,
                        name: "start",
                        originalEvent: t
                    })
                } else this._nulling()
            }, _emulateDragOver: function () {
                if (me) {
                    this._lastX = me.clientX, this._lastY = me.clientY, Xe();
                    for (var e = document.elementFromPoint(me.clientX, me.clientY), t = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(me.clientX, me.clientY)) !== t;) t = e;
                    if (te.parentNode[V]._isOutsideThisEl(e), t) do {
                        if (t[V]) {
                            if (t[V]._onDragOver({
                                clientX: me.clientX,
                                clientY: me.clientY,
                                target: e,
                                rootEl: t
                            }) && !this.options.dragoverBubble) break
                        }
                        e = t
                    } while (t = t.parentNode);
                    ze()
                }
            }, _onTouchMove: function (e) {
                if (ge) {
                    var t = this.options, n = t.fallbackTolerance, o = t.fallbackOffset,
                        r = e.touches ? e.touches[0] : e, i = oe && A(oe, !0), a = oe && i && i.a, l = oe && i && i.d,
                        s = je && xe && H(xe),
                        c = (r.clientX - ge.clientX + o.x) / (a || 1) + (s ? s[0] - Ie[0] : 0) / (a || 1),
                        u = (r.clientY - ge.clientY + o.y) / (l || 1) + (s ? s[1] - Ie[1] : 0) / (l || 1);
                    if (!qe.active && !Te) {
                        if (n && Math.max(Math.abs(r.clientX - this._lastX), Math.abs(r.clientY - this._lastY)) < n) return;
                        this._onDragStart(e, !0)
                    }
                    if (oe) {
                        i ? (i.e += c - (ve || 0), i.f += u - (ye || 0)) : i = {a: 1, b: 0, c: 0, d: 1, e: c, f: u};
                        var d = "matrix(".concat(i.a, ",").concat(i.b, ",").concat(i.c, ",").concat(i.d, ",").concat(i.e, ",").concat(i.f, ")");
                        I(oe, "webkitTransform", d), I(oe, "mozTransform", d), I(oe, "msTransform", d), I(oe, "transform", d), ve = c, ye = u, me = r
                    }
                    e.cancelable && e.preventDefault()
                }
            }, _appendGhost: function () {
                if (!oe) {
                    var e = this.options.fallbackOnBody ? document.body : re, t = j(te, !0, je, !0, e),
                        n = this.options;
                    if (je) {
                        for (xe = e; "static" === I(xe, "position") && "none" === I(xe, "transform") && xe !== document;) xe = xe.parentNode;
                        xe !== document.body && xe !== document.documentElement ? (xe === document && (xe = F()), t.top += xe.scrollTop, t.left += xe.scrollLeft) : xe = F(), Ie = H(xe)
                    }
                    k(oe = te.cloneNode(!0), n.ghostClass, !1), k(oe, n.fallbackClass, !0), k(oe, n.dragClass, !0), I(oe, "transition", ""), I(oe, "transform", ""), I(oe, "box-sizing", "border-box"), I(oe, "margin", 0), I(oe, "top", t.top), I(oe, "left", t.left), I(oe, "width", t.width), I(oe, "height", t.height), I(oe, "opacity", "0.8"), I(oe, "position", je ? "absolute" : "fixed"), I(oe, "zIndex", "100000"), I(oe, "pointerEvents", "none"), qe.ghost = oe, e.appendChild(oe), I(oe, "transform-origin", be / parseInt(oe.style.width) * 100 + "% " + we / parseInt(oe.style.height) * 100 + "%")
                }
            }, _onDragStart: function (e, t) {
                var n = this, o = e.dataTransfer, r = n.options;
                Q("dragStart", this, {evt: e}), qe.eventCanceled ? this._onDrop() : (Q("setupClone", this), qe.eventCanceled || ((le = q(te)).removeAttribute("id"), le.draggable = !1, le.style["will-change"] = "", this._hideClone(), k(le, this.options.chosenClass, !1), qe.clone = le), n.cloneId = $e((function () {
                    Q("clone", n), qe.eventCanceled || (n.options.removeCloneOnHide || re.insertBefore(le, te), n._hideClone(), ee({
                        sortable: n,
                        name: "clone"
                    }))
                })), !t && k(te, r.dragClass, !0), t ? (De = !0, n._loopId = setInterval(n._emulateDragOver, 50)) : (C(document, "mouseup", n._onDrop), C(document, "touchend", n._onDrop), C(document, "touchcancel", n._onDrop), o && (o.effectAllowed = "move", r.setData && r.setData.call(n, o, te)), E(document, "drop", n), I(te, "transform", "translateZ(0)")), Te = !0, n._dragStartId = $e(n._dragStarted.bind(n, t, e)), E(document, "selectstart", n), _e = !0, b && I(document.body, "user-select", "none"))
            }, _onDragOver: function (e) {
                var t, n, o, r, i = this.el, a = e.target, l = this.options, s = l.group, c = qe.active, d = he === s,
                    f = l.sort, h = pe || c, p = this, g = !1;
                if (!Ae) {
                    if (void 0 !== e.preventDefault && e.cancelable && e.preventDefault(), a = D(a, l.draggable, i, !0), P("dragOver"), qe.eventCanceled) return g;
                    if (te.contains(e.target) || a.animated && a.animatingX && a.animatingY || p._ignoreWhileAnimating === a) return H(!1);
                    if (De = !1, c && !l.disabled && (d ? f || (o = ne !== re) : pe === this || (this.lastPutMode = he.checkPull(this, c, te, e)) && s.checkPut(this, c, te, e))) {
                        if (r = "vertical" === this._getDirection(e, a), t = j(te), P("dragOverValid"), qe.eventCanceled) return g;
                        if (o) return ne = re, F(), this._hideClone(), P("revert"), qe.eventCanceled || (ie ? re.insertBefore(te, ie) : re.appendChild(te)), H(!0);
                        var m = L(i, l.draggable);
                        if (!m || function (e, t, n) {
                            var o = j(L(n.el, n.options.draggable));
                            return t ? e.clientX > o.right + 10 || e.clientX <= o.right && e.clientY > o.bottom && e.clientX >= o.left : e.clientX > o.right && e.clientY > o.top || e.clientX <= o.right && e.clientY > o.bottom + 10
                        }(e, r, this) && !m.animated) {
                            if (m === te) return H(!1);
                            if (m && i === e.target && (a = m), a && (n = j(a)), !1 !== Ve(re, i, te, t, a, n, e, !!a)) return F(), m && m.nextSibling ? i.insertBefore(te, m.nextSibling) : i.appendChild(te), ne = i, X(), H(!0)
                        } else if (m && function (e, t, n) {
                            var o = j(R(n.el, 0, n.options, !0));
                            return t ? e.clientX < o.left - 10 || e.clientY < o.top && e.clientX < o.right : e.clientY < o.top - 10 || e.clientY < o.bottom && e.clientX < o.left
                        }(e, r, this)) {
                            var v = R(i, 0, l, !0);
                            if (v === te) return H(!1);
                            if (n = j(a = v), !1 !== Ve(re, i, te, t, a, n, e, !1)) return F(), i.insertBefore(te, v), ne = i, X(), H(!0)
                        } else if (a.parentNode === i) {
                            n = j(a);
                            var y, b, w, _ = te.parentNode !== i, S = !function (e, t, n) {
                                    var o = n ? e.left : e.top, r = n ? e.right : e.bottom, i = n ? e.width : e.height,
                                        a = n ? t.left : t.top, l = n ? t.right : t.bottom, s = n ? t.width : t.height;
                                    return o === a || r === l || o + i / 2 === a + s / 2
                                }(te.animated && te.toRect || t, a.animated && a.toRect || n, r), E = r ? "top" : "left",
                                C = N(a, "top", "top") || N(te, "top", "top"), x = C ? C.scrollTop : void 0;
                            if (Se !== a && (b = n[E], Me = !1, ke = !S && l.invertSwap || _), 0 !== (y = function (e, t, n, o, r, i, a, l) {
                                var s = o ? e.clientY : e.clientX, c = o ? n.height : n.width, u = o ? n.top : n.left,
                                    d = o ? n.bottom : n.right, f = !1;
                                if (!a) if (l && Ce < c * r) {
                                    if (!Me && (1 === Ee ? s > u + c * i / 2 : s < d - c * i / 2) && (Me = !0), Me) f = !0; else if (1 === Ee ? s < u + Ce : s > d - Ce) return -Ee
                                } else if (s > u + c * (1 - r) / 2 && s < d - c * (1 - r) / 2) return function (e) {
                                    return B(te) < B(e) ? 1 : -1
                                }(t);
                                if ((f = f || a) && (s < u + c * i / 2 || s > d - c * i / 2)) return s > u + c / 2 ? 1 : -1;
                                return 0
                            }(e, a, n, r, S ? 1 : l.swapThreshold, null == l.invertedSwapThreshold ? l.swapThreshold : l.invertedSwapThreshold, ke, Se === a))) {
                                var T = B(te);
                                do {
                                    T -= y, w = ne.children[T]
                                } while (w && ("none" === I(w, "display") || w === oe))
                            }
                            if (0 === y || w === a) return H(!1);
                            Se = a, Ee = y;
                            var O = a.nextElementSibling, M = !1, A = Ve(re, i, te, t, a, n, e, M = 1 === y);
                            if (!1 !== A) return 1 !== A && -1 !== A || (M = 1 === A), Ae = !0, setTimeout(Ge, 30), F(), M && !O ? i.appendChild(te) : a.parentNode.insertBefore(te, M ? O : a), C && U(C, 0, x - C.scrollTop), ne = te.parentNode, void 0 === b || ke || (Ce = Math.abs(b - j(a)[E])), X(), H(!0)
                        }
                        if (i.contains(te)) return H(!1)
                    }
                    return !1
                }

                function P(l, s) {
                    Q(l, p, u({
                        evt: e,
                        isOwner: d,
                        axis: r ? "vertical" : "horizontal",
                        revert: o,
                        dragRect: t,
                        targetRect: n,
                        canSort: f,
                        fromSortable: h,
                        target: a,
                        completed: H,
                        onMove: function (n, o) {
                            return Ve(re, i, te, t, n, j(n), e, o)
                        },
                        changed: X
                    }, s))
                }

                function F() {
                    P("dragOverAnimationCapture"), p.captureAnimationState(), p !== h && h.captureAnimationState()
                }

                function H(t) {
                    return P("dragOverCompleted", {insertion: t}), t && (d ? c._hideClone() : c._showClone(p), p !== h && (k(te, pe ? pe.options.ghostClass : c.options.ghostClass, !1), k(te, l.ghostClass, !0)), pe !== p && p !== qe.active ? pe = p : p === qe.active && pe && (pe = null), h === p && (p._ignoreWhileAnimating = a), p.animateAll((function () {
                        P("dragOverAnimationComplete"), p._ignoreWhileAnimating = null
                    })), p !== h && (h.animateAll(), h._ignoreWhileAnimating = null)), (a === te && !te.animated || a === i && !a.animated) && (Se = null), l.dragoverBubble || e.rootEl || a === document || (te.parentNode[V]._isOutsideThisEl(e.target), !t && Ye(e)), !l.dragoverBubble && e.stopPropagation && e.stopPropagation(), g = !0
                }

                function X() {
                    ue = B(te), fe = B(te, l.draggable), ee({
                        sortable: p,
                        name: "change",
                        toEl: i,
                        newIndex: ue,
                        newDraggableIndex: fe,
                        originalEvent: e
                    })
                }
            }, _ignoreWhileAnimating: null, _offMoveEvents: function () {
                C(document, "mousemove", this._onTouchMove), C(document, "touchmove", this._onTouchMove), C(document, "pointermove", this._onTouchMove), C(document, "dragover", Ye), C(document, "mousemove", Ye), C(document, "touchmove", Ye)
            }, _offUpEvents: function () {
                var e = this.el.ownerDocument;
                C(e, "mouseup", this._onDrop), C(e, "touchend", this._onDrop), C(e, "pointerup", this._onDrop), C(e, "touchcancel", this._onDrop), C(document, "selectstart", this)
            }, _onDrop: function (e) {
                var t = this.el, n = this.options;
                ue = B(te), fe = B(te, n.draggable), Q("drop", this, {evt: e}), ne = te && te.parentNode, ue = B(te), fe = B(te, n.draggable), qe.eventCanceled || (Te = !1, ke = !1, Me = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), Ze(this.cloneId), Ze(this._dragStartId), this.nativeDraggable && (C(document, "drop", this), C(t, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), b && I(document.body, "user-select", ""), I(te, "transform", ""), e && (_e && (e.cancelable && e.preventDefault(), !n.dropBubble && e.stopPropagation()), oe && oe.parentNode && oe.parentNode.removeChild(oe), (re === ne || pe && "clone" !== pe.lastPutMode) && le && le.parentNode && le.parentNode.removeChild(le), te && (this.nativeDraggable && C(te, "dragend", this), We(te), te.style["will-change"] = "", _e && !Te && k(te, pe ? pe.options.ghostClass : this.options.ghostClass, !1), k(te, this.options.chosenClass, !1), ee({
                    sortable: this,
                    name: "unchoose",
                    toEl: ne,
                    newIndex: null,
                    newDraggableIndex: null,
                    originalEvent: e
                }), re !== ne ? (ue >= 0 && (ee({
                    rootEl: ne,
                    name: "add",
                    toEl: ne,
                    fromEl: re,
                    originalEvent: e
                }), ee({sortable: this, name: "remove", toEl: ne, originalEvent: e}), ee({
                    rootEl: ne,
                    name: "sort",
                    toEl: ne,
                    fromEl: re,
                    originalEvent: e
                }), ee({
                    sortable: this,
                    name: "sort",
                    toEl: ne,
                    originalEvent: e
                })), pe && pe.save()) : ue !== ce && ue >= 0 && (ee({
                    sortable: this,
                    name: "update",
                    toEl: ne,
                    originalEvent: e
                }), ee({
                    sortable: this,
                    name: "sort",
                    toEl: ne,
                    originalEvent: e
                })), qe.active && (null != ue && -1 !== ue || (ue = ce, fe = de), ee({
                    sortable: this,
                    name: "end",
                    toEl: ne,
                    originalEvent: e
                }), this.save())))), this._nulling()
            }, _nulling: function () {
                Q("nulling", this), re = te = ne = oe = ie = le = ae = se = ge = me = _e = ue = fe = ce = de = Se = Ee = pe = he = qe.dragged = qe.ghost = qe.clone = qe.active = null, Pe.forEach((function (e) {
                    e.checked = !0
                })), Pe.length = ve = ye = 0
            }, handleEvent: function (e) {
                switch (e.type) {
                    case"drop":
                    case"dragend":
                        this._onDrop(e);
                        break;
                    case"dragenter":
                    case"dragover":
                        te && (this._onDragOver(e), function (e) {
                            e.dataTransfer && (e.dataTransfer.dropEffect = "move");
                            e.cancelable && e.preventDefault()
                        }(e));
                        break;
                    case"selectstart":
                        e.preventDefault()
                }
            }, toArray: function () {
                for (var e, t = [], n = this.el.children, o = 0, r = n.length, i = this.options; o < r; o++) D(e = n[o], i.draggable, this.el, !1) && t.push(e.getAttribute(i.dataIdAttr) || Je(e));
                return t
            }, sort: function (e, t) {
                var n = {}, o = this.el;
                this.toArray().forEach((function (e, t) {
                    var r = o.children[t];
                    D(r, this.options.draggable, o, !1) && (n[e] = r)
                }), this), t && this.captureAnimationState(), e.forEach((function (e) {
                    n[e] && (o.removeChild(n[e]), o.appendChild(n[e]))
                })), t && this.animateAll()
            }, save: function () {
                var e = this.options.store;
                e && e.set && e.set(this)
            }, closest: function (e, t) {
                return D(e, t || this.options.draggable, this.el, !1)
            }, option: function (e, t) {
                var n = this.options;
                if (void 0 === t) return n[e];
                var o = $.modifyOption(this, e, t);
                n[e] = void 0 !== o ? o : t, "group" === e && He(n)
            }, destroy: function () {
                Q("destroy", this);
                var e = this.el;
                e[V] = null, C(e, "mousedown", this._onTapStart), C(e, "touchstart", this._onTapStart), C(e, "pointerdown", this._onTapStart), this.nativeDraggable && (C(e, "dragover", this), C(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), (function (e) {
                    e.removeAttribute("draggable")
                })), this._onDrop(), this._disableDelayedDragEvents(), Oe.splice(Oe.indexOf(this.el), 1), this.el = e = null
            }, _hideClone: function () {
                if (!se) {
                    if (Q("hideClone", this), qe.eventCanceled) return;
                    I(le, "display", "none"), this.options.removeCloneOnHide && le.parentNode && le.parentNode.removeChild(le), se = !0
                }
            }, _showClone: function (e) {
                if ("clone" === e.lastPutMode) {
                    if (se) {
                        if (Q("showClone", this), qe.eventCanceled) return;
                        te.parentNode != re || this.options.group.revertClone ? ie ? re.insertBefore(le, ie) : re.appendChild(le) : re.insertBefore(le, te), this.options.group.revertClone && this.animate(te, le), I(le, "display", ""), se = !1
                    }
                } else this._hideClone()
            }
        }, Fe && E(document, "touchmove", (function (e) {
            (qe.active || Te) && e.cancelable && e.preventDefault()
        })), qe.utils = {
            on: E,
            off: C,
            css: I,
            find: P,
            is: function (e, t) {
                return !!D(e, t, e, !1)
            },
            extend: function (e, t) {
                if (e && t) for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                return e
            },
            throttle: Y,
            closest: D,
            toggleClass: k,
            clone: q,
            index: B,
            nextTick: $e,
            cancelNextTick: Ze,
            detectDirection: Be,
            getChild: R
        }, qe.get = function (e) {
            return e[V]
        }, qe.mount = function () {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
            t[0].constructor === Array && (t = t[0]), t.forEach((function (e) {
                if (!e.prototype || !e.prototype.constructor) throw"Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(e));
                e.utils && (qe.utils = u(u({}, qe.utils), e.utils)), $.mount(e)
            }))
        }, qe.create = function (e, t) {
            return new qe(e, t)
        }, qe.version = "1.15.0";
        var Ke, Qe, et, tt, nt, ot, rt = [], it = !1;

        function at() {
            rt.forEach((function (e) {
                clearInterval(e.pid)
            })), rt = []
        }

        function lt() {
            clearInterval(ot)
        }

        var st = Y((function (e, t, n, o) {
            if (t.scroll) {
                var r, i = (e.touches ? e.touches[0] : e).clientX, a = (e.touches ? e.touches[0] : e).clientY,
                    l = t.scrollSensitivity, s = t.scrollSpeed, c = F(), u = !1;
                Qe !== n && (Qe = n, at(), Ke = t.scroll, r = t.scrollFn, !0 === Ke && (Ke = X(n, !0)));
                var d = 0, f = Ke;
                do {
                    var h = f, p = j(h), g = p.top, m = p.bottom, v = p.left, y = p.right, b = p.width, w = p.height,
                        _ = void 0, S = void 0, E = h.scrollWidth, C = h.scrollHeight, x = I(h), T = h.scrollLeft,
                        D = h.scrollTop;
                    h === c ? (_ = b < E && ("auto" === x.overflowX || "scroll" === x.overflowX || "visible" === x.overflowX), S = w < C && ("auto" === x.overflowY || "scroll" === x.overflowY || "visible" === x.overflowY)) : (_ = b < E && ("auto" === x.overflowX || "scroll" === x.overflowX), S = w < C && ("auto" === x.overflowY || "scroll" === x.overflowY));
                    var O = _ && (Math.abs(y - i) <= l && T + b < E) - (Math.abs(v - i) <= l && !!T),
                        M = S && (Math.abs(m - a) <= l && D + w < C) - (Math.abs(g - a) <= l && !!D);
                    if (!rt[d]) for (var k = 0; k <= d; k++) rt[k] || (rt[k] = {});
                    rt[d].vx == O && rt[d].vy == M && rt[d].el === h || (rt[d].el = h, rt[d].vx = O, rt[d].vy = M, clearInterval(rt[d].pid), 0 == O && 0 == M || (u = !0, rt[d].pid = setInterval(function () {
                        o && 0 === this.layer && qe.active._onTouchMove(nt);
                        var t = rt[this.layer].vy ? rt[this.layer].vy * s : 0,
                            n = rt[this.layer].vx ? rt[this.layer].vx * s : 0;
                        "function" == typeof r && "continue" !== r.call(qe.dragged.parentNode[V], n, t, e, nt, rt[this.layer].el) || U(rt[this.layer].el, n, t)
                    }.bind({layer: d}), 24))), d++
                } while (t.bubbleScroll && f !== c && (f = X(f, !1)));
                it = u
            }
        }), 30), ct = function (e) {
            var t = e.originalEvent, n = e.putSortable, o = e.dragEl, r = e.activeSortable, i = e.dispatchSortableEvent,
                a = e.hideGhostForTarget, l = e.unhideGhostForTarget;
            if (t) {
                var s = n || r;
                a();
                var c = t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t,
                    u = document.elementFromPoint(c.clientX, c.clientY);
                l(), s && !s.el.contains(u) && (i("spill"), this.onSpill({dragEl: o, putSortable: n}))
            }
        };

        function ut() {
        }

        function dt() {
        }

        ut.prototype = {
            startIndex: null, dragStart: function (e) {
                var t = e.oldDraggableIndex;
                this.startIndex = t
            }, onSpill: function (e) {
                var t = e.dragEl, n = e.putSortable;
                this.sortable.captureAnimationState(), n && n.captureAnimationState();
                var o = R(this.sortable.el, this.startIndex, this.options);
                o ? this.sortable.el.insertBefore(t, o) : this.sortable.el.appendChild(t), this.sortable.animateAll(), n && n.animateAll()
            }, drop: ct
        }, h(ut, {pluginName: "revertOnSpill"}), dt.prototype = {
            onSpill: function (e) {
                var t = e.dragEl, n = e.putSortable || this.sortable;
                n.captureAnimationState(), t.parentNode && t.parentNode.removeChild(t), n.animateAll()
            }, drop: ct
        }, h(dt, {pluginName: "removeOnSpill"});
        qe.mount(new function () {
            function e() {
                for (var e in this.defaults = {
                    scroll: !0,
                    forceAutoScrollFallback: !1,
                    scrollSensitivity: 30,
                    scrollSpeed: 10,
                    bubbleScroll: !0
                }, this) "_" === e.charAt(0) && "function" == typeof this[e] && (this[e] = this[e].bind(this))
            }

            return e.prototype = {
                dragStarted: function (e) {
                    var t = e.originalEvent;
                    this.sortable.nativeDraggable ? E(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? E(document, "pointermove", this._handleFallbackAutoScroll) : t.touches ? E(document, "touchmove", this._handleFallbackAutoScroll) : E(document, "mousemove", this._handleFallbackAutoScroll)
                }, dragOverCompleted: function (e) {
                    var t = e.originalEvent;
                    this.options.dragOverBubble || t.rootEl || this._handleAutoScroll(t)
                }, drop: function () {
                    this.sortable.nativeDraggable ? C(document, "dragover", this._handleAutoScroll) : (C(document, "pointermove", this._handleFallbackAutoScroll), C(document, "touchmove", this._handleFallbackAutoScroll), C(document, "mousemove", this._handleFallbackAutoScroll)), lt(), at(), clearTimeout(O), O = void 0
                }, nulling: function () {
                    nt = Qe = Ke = it = ot = et = tt = null, rt.length = 0
                }, _handleFallbackAutoScroll: function (e) {
                    this._handleAutoScroll(e, !0)
                }, _handleAutoScroll: function (e, t) {
                    var n = this, o = (e.touches ? e.touches[0] : e).clientX,
                        r = (e.touches ? e.touches[0] : e).clientY, i = document.elementFromPoint(o, r);
                    if (nt = e, t || this.options.forceAutoScrollFallback || v || m || b) {
                        st(e, this.options, i, t);
                        var a = X(i, !0);
                        !it || ot && o === et && r === tt || (ot && lt(), ot = setInterval((function () {
                            var i = X(document.elementFromPoint(o, r), !0);
                            i !== a && (a = i, at()), st(e, n.options, i, t)
                        }), 10), et = o, tt = r)
                    } else {
                        if (!this.options.bubbleScroll || X(i, !0) === F()) return void at();
                        st(e, this.options, X(i, !1), !1)
                    }
                }
            }, h(e, {pluginName: "scroll", initializeByDefault: !0})
        }), qe.mount(dt, ut);
        var ft = qe, ht = n(6), pt = n.n(ht), gt = n(7), mt = n.n(gt), vt = function () {
            function e(t) {
                var n = this, o = t.api, i = t.config, a = t.onSelectFile, l = t.onDeleteFile, s = t.onMoveFile,
                    c = t.readOnly;
                r()(this, e), this.api = o, this.config = i, this.onSelectFile = a, this.onDeleteFile = l, this.onMoveFile = s, this.readOnly = c, this.nodes = {
                    wrapper: yt("div", [this.CSS.baseClass, this.CSS.wrapper]),
                    fileButton: this.createFileButton(),
                    container: yt("div", this.CSS.container),
                    itemsContainer: yt("div", this.CSS.itemsContainer),
                    controls: yt("div", this.CSS.controls),
                    preloaderContainer: yt("div", this.CSS.preloaderContainer),
                    caption: yt("div", [this.CSS.input, this.CSS.caption], {contentEditable: !this.readOnly})
                }, this.preloadersCount = 0, this.nodes.caption.dataset.placeholder = this.config.captionPlaceholder, this.nodes.controls.appendChild(this.nodes.preloaderContainer), this.nodes.controls.appendChild(this.nodes.fileButton), this.nodes.container.appendChild(this.nodes.itemsContainer), this.nodes.container.appendChild(this.nodes.controls), this.nodes.wrapper.appendChild(this.nodes.container), this.nodes.wrapper.appendChild(this.nodes.caption), ["dragenter", "dragover", "dragleave", "drop"].forEach((function (e) {
                    n.nodes.itemsContainer.addEventListener(e, (function (e) {
                        e.preventDefault(), e.stopPropagation()
                    }), !1)
                }))
            }

            return a()(e, [{
                key: "render", value: function (e) {
                    return this.nodes.wrapper
                }
            }, {
                key: "onRendered", value: function () {
                    var e = this;
                    this.sortable || (this.sortable = new ft(this.nodes.itemsContainer, {
                        handle: ".".concat(this.CSS.imageContainer),
                        filter: ".".concat(this.CSS.trashButton),
                        onStart: function () {
                            e.nodes.itemsContainer.classList.add("".concat(e.CSS.itemsContainer, "--drag"))
                        },
                        onEnd: function (t) {
                            e.nodes.itemsContainer.classList.remove("".concat(e.CSS.itemsContainer, "--drag")), t.oldIndex !== t.newIndex && e.onMoveFile(t.oldIndex, t.newIndex)
                        }
                    }))
                }
            }, {
                key: "createFileButton", value: function () {
                    var e = this, t = yt("div", [this.CSS.button]);
                    return t.innerHTML = this.config.buttonContent || "".concat(pt.a, " ").concat(this.api.i18n.t("Select an Image")), t.addEventListener("click", (function () {
                        e.onSelectFile()
                    })), t
                }
            }, {
                key: "showFileButton", value: function () {
                    this.nodes.fileButton.style.display = ""
                }
            }, {
                key: "hideFileButton", value: function () {
                    this.nodes.fileButton.style.display = "none"
                }
            }, {
                key: "getPreloader", value: function (e) {
                    var t = yt("div", this.CSS.imagePreloader);
                    this.nodes.preloaderContainer.append(t);
                    var n = new FileReader;
                    return n.readAsDataURL(e), n.onload = function (e) {
                        t.style.backgroundImage = "url(".concat(e.target.result, ")")
                    }, t
                }
            }, {
                key: "removePreloader", value: function (e) {
                    e.remove()
                }
            }, {
                key: "appendImage", value: function (t) {
                    var n = this, o = t.url, r = /\.mp4$/.test(o) ? "VIDEO" : "IMG", i = {src: o}, a = "load";
                    "VIDEO" === r && (i.autoplay = !1, i.muted = !0, i.playsinline = !0, a = "loadeddata");
                    var l = yt("div", [this.CSS.imageContainer]), s = yt(r, this.CSS.imageEl, i);
                    s.addEventListener(a, (function () {
                        n.toggleStatus(l, e.status.FILLED)
                    })), l.appendChild(s);
                    var c = this.api.i18n.t("Delete"),
                        u = yt("div", [this.CSS.trashButton], {innerHTML: mt.a, title: c});
                    this.api.tooltip.onHover(u, c, {placement: "top"}), u.addEventListener("click", (function () {
                        n.api.tooltip.hide();
                        var e = Array.prototype.slice.call(n.nodes.itemsContainer.children).indexOf(l);
                        -1 !== e && (n.nodes.itemsContainer.removeChild(l), n.onDeleteFile(e))
                    })), l.appendChild(u), this.nodes.itemsContainer.append(l)
                }
            }, {
                key: "fillCaption", value: function (e) {
                    this.nodes.caption && (this.nodes.caption.innerHTML = e)
                }
            }, {
                key: "toggleStatus", value: function (t, n) {
                    for (var o in e.status) Object.prototype.hasOwnProperty.call(e.status, o) && t.classList.toggle("".concat(this.CSS.imageContainer, "--").concat(e.status[o]), n === e.status[o])
                }
            }, {
                key: "CSS", get: function () {
                    return {
                        baseClass: this.api.styles.block,
                        loading: this.api.styles.loader,
                        input: this.api.styles.input,
                        button: this.api.styles.button,
                        wrapper: "image-gallery",
                        container: "image-gallery__container",
                        controls: "image-gallery__controls",
                        itemsContainer: "image-gallery__items",
                        imageContainer: "image-gallery__image",
                        preloaderContainer: "image-gallery__preloaders",
                        imagePreloader: "image-gallery__preloader",
                        imageEl: "image-gallery__image-picture",
                        trashButton: "image-gallery__image-trash",
                        caption: "image-gallery__caption"
                    }
                }
            }], [{
                key: "status", get: function () {
                    return {EMPTY: "empty", UPLOADING: "loading", FILLED: "filled"}
                }
            }]), e
        }(), yt = function (e) {
            var t, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, r = document.createElement(e);
            Array.isArray(n) ? (t = r.classList).add.apply(t, s()(n)) : n && r.classList.add(n);
            for (var i in o) r[i] = o[i];
            return r
        }, bt = n(8), wt = n.n(bt), _t = n(9), St = n.n(_t), Et = function () {
            function e(t) {
                var n = t.api, o = t.actions, i = t.onChange;
                r()(this, e), this.api = n, this.actions = o, this.onChange = i, this.buttons = []
            }

            return a()(e, [{
                key: "render", value: function (t) {
                    var n = this, o = yt("div", this.CSS.wrapper);
                    return this.buttons = [], e.tunes.concat(this.actions).forEach((function (e) {
                        var r = n.api.i18n.t(e.title),
                            i = yt("div", [n.CSS.buttonBase, n.CSS.button], {innerHTML: e.icon, title: r});
                        i.addEventListener("click", (function () {
                            n.tuneClicked(e.name, e.action)
                        })), i.dataset.tune = e.name, i.classList.toggle(n.CSS.buttonActive, t.style === e.name), n.buttons.push(i), n.api.tooltip.onHover(i, r, {placement: "top"}), o.appendChild(i)
                    })), o
                }
            }, {
                key: "tuneClicked", value: function (e, t) {
                    var n = this;
                    if ("function" == typeof t && !t(e)) return !1;
                    this.buttons.forEach((function (t) {
                        t.classList.toggle(n.CSS.buttonActive, t.dataset.tune === e)
                    })), this.onChange(e)
                }
            }, {
                key: "CSS", get: function () {
                    return {
                        wrapper: "image-gallery__tune-wrapper",
                        buttonBase: this.api.styles.settingsButton,
                        button: "image-gallery__tune",
                        buttonActive: this.api.styles.settingsButtonActive
                    }
                }
            }], [{
                key: "tunes", get: function () {
                    // return [{name: "slider", icon: wt.a, title: "Slider"}, {name: "fit", icon: St.a, title: "Fit"}]
                    return []
                }
            }]), e
        }(), Ct = n(10), xt = n.n(Ct), Tt = n(11), Dt = n.n(Tt), Ot = n(2), Mt = n.n(Ot), kt = function () {
            function e(t) {
                var n = t.config;
                r()(this, e), this.config = n
            }

            return a()(e, [{
                key: "uploadSelectedFiles", value: function (e, t) {
                    var n = this, o = t.onPreview, r = t.onUpload, i = t.onError;
                    Mt.a.selectFiles({accept: this.config.types, multiple: !0}).then((function (t) {
                        for (var a = 0, l = function () {
                            if (null !== e && a == e) return "break";
                            a++;
                            var l, c = t[s], u = o(c), d = void 0;
                            if (n.config.uploader && "function" == typeof n.config.uploader.uploadByFile) {
                                var f = n.config.uploader.uploadByFile(c);
                                (l = f) && "function" == typeof l.then || console.warn("Custom uploader method uploadByFile should return a Promise"), d = f
                            } else d = n.uploadByFile(c);
                            d.then((function (e) {
                                r(e, u)
                            })).catch((function (e) {
                                i(e, u)
                            }))
                        }, s = 0; s < t.length; s++) {
                            if ("break" === l()) break
                        }
                    }))
                }
            }, {
                key: "uploadByFile", value: function (e) {
                    var t = new FormData;
                    return t.append(this.config.field, e), this.config.additionalRequestData && Object.keys(this.config.additionalRequestData).length && Object.entries(this.config.additionalRequestData).forEach((function (e) {
                        var n = Dt()(e, 2), o = n[0], r = n[1];
                        t.append(o, r)
                    })), Mt.a.post({
                        url: this.config.endpoints.byFile,
                        data: t,
                        type: Mt.a.contentType.JSON,
                        headers: this.config.additionalRequestHeaders
                    }).then((function (e) {
                        return e.body
                    }))
                }
            }]), e
        }();
        /**
         * Image Gallery Tool for the Editor.js
         *
         * @author CodeX <team@codex.so>
         * @license MIT
         * @see {@link https://github.com/editor-js/image}
         *
         * To developers.
         * To simplify Tool structure, we split it to 4 parts:
         *  1) index.js — main Tool's interface, public API and methods for working with data
         *  2) uploader.js — module that has methods for sending files via AJAX: from device, by URL or File pasting
         *  3) ui.js — module for UI manipulations: render, showing preloader, etc
         *  4) tunes.js — working with Block Tunes: render buttons, handle clicks
         *
         * For debug purposes there is a testing server
         * that can save uploaded files and return a Response {@link UploadResponseFormat}
         *
         *       $ node dev/server.js
         *
         * It will expose 8008 port, so you can pass http://localhost:8008 with the Tools config:
         *
         * image: {
         *   class: ImageGallery,
         *   config: {
         *     endpoints: {
         *       byFile: 'http://localhost:8008/uploadFile',
         *     }
         *   },
         * },
         */
        var It = function () {
            function e(t) {
                var n = this, o = t.data, i = t.config, a = t.api, l = t.readOnly;
                r()(this, e), this.api = a, this.readOnly = l, this.config = {
                    endpoints: i.endpoints || "",
                    additionalRequestData: i.additionalRequestData || {},
                    additionalRequestHeaders: i.additionalRequestHeaders || {},
                    field: i.field || "image",
                    types: i.types || "image/*",
                    captionPlaceholder: this.api.i18n.t(i.captionPlaceholder || "Gallery caption"),
                    buttonContent: i.buttonContent || "",
                    uploader: i.uploader || void 0,
                    actions: i.actions || [],
                    maxElementCount: i.maxElementCount || void 0
                }, this.uploader = new kt({config: this.config}), this.ui = new vt({
                    api: a,
                    config: this.config,
                    onSelectFile: function () {
                        var e = n.config.maxElementCount ? n.config.maxElementCount - n._data.files.length : null;
                        n.uploader.uploadSelectedFiles(e, {
                            onPreview: function (e) {
                                return n.ui.getPreloader(e)
                            }, onUpload: function (e, t) {
                                n.onUpload(e, t)
                            }, onError: function (e, t) {
                                n.uploadingFailed(e, t)
                            }
                        })
                    },
                    onDeleteFile: function (e) {
                        n.deleteImage(e)
                    },
                    onMoveFile: function (e, t) {
                        n.moveImage(e, t)
                    },
                    readOnly: l
                }), this.tunes = new Et({
                    api: a, actions: this.config.actions, onChange: function (e) {
                        return n.styleToggled(e)
                    }
                }), this._data = {}, this.data = o
            }

            return a()(e, null, [{
                key: "isReadOnlySupported", get: function () {
                    return !0
                }
            }, {
                key: "toolbox", get: function () {
                    return {icon: xt.a, title: "Gallery"}
                }
            }]), a()(e, [{
                key: "render", value: function () {
                    return this.ui.render(this.data)
                }
            }, {
                key: "rendered", value: function () {
                    return this.checkMaxElemCount(), this.ui.onRendered()
                }
            }, {
                key: "validate", value: function (e) {
                    return !(!e.files || !e.files.length)
                }
            }, {
                key: "save", value: function () {
                    var e = this.ui.nodes.caption;
                    return this._data.caption = e.innerHTML, this.data
                }
            }, {
                key: "renderSettings", value: function () {
                    return this.tunes.render(this.data)
                }
            }, {
                key: "appendImage", value: function (e) {
                    if (e && e.url) {
                        if (this.config.maxElementCount && this._data.files.length >= this.config.maxElementCount) return;
                        this._data.files.push(e), this.ui.appendImage(e), this.checkMaxElemCount()
                    }
                }
            }, {
                key: "moveImage", value: function (e, t) {
                    t >= this._data.files.length && (t = this._data.files.length - 1), this._data.files.splice(t, 0, this._data.files.splice(e, 1)[0])
                }
            }, {
                key: "deleteImage", value: function (e) {
                    void 0 !== this._data.files[e] && (this._data.files.splice(e, 1), this.checkMaxElemCount())
                }
            }, {
                key: "onUpload", value: function (e, t) {
                    this.ui.removePreloader(t), e.success && e.file ? this.appendImage(e.file) : this.uploadingFailed("incorrect response: " + JSON.stringify(e))
                }
            }, {
                key: "uploadingFailed", value: function (e, t) {
                    this.ui.removePreloader(t), console.log("Image Tool: uploading failed because of", e), this.api.notifier.show({
                        message: this.api.i18n.t("Couldn’t upload image. Please try another."),
                        style: "error"
                    })
                }
            }, {
                key: "styleToggled", value: function (e) {
                    this._data.style = "fit" === e ? "fit" : "slider"
                }
            }, {
                key: "checkMaxElemCount", value: function () {
                    this.config.maxElementCount && this._data.files.length >= this.config.maxElementCount ? this.ui.hideFileButton() : this.ui.showFileButton()
                }
            }, {
                key: "data", set: function (e) {
                    var t = this;
                    this._data.files = [], e.files && e.files.forEach((function (e) {
                        t.appendImage(e)
                    })), this._data.caption = e.caption || "", this.ui.fillCaption(this._data.caption);
                    var n = e.style || "";
                    this.styleToggled(n)
                }, get: function () {
                    return this._data
                }
            }]), e
        }()
    }]).default
}));