!function (t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.Quote = e() : t.Quote = e()
}(window, function () {
    return function (t) {
        var e = {};

        function n(r) {
            if (e[r]) return e[r].exports;
            var o = e[r] = {i: r, l: !1, exports: {}};
            return t[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
        }

        return n.m = t, n.c = e, n.d = function (t, e, r) {
            n.o(t, e) || Object.defineProperty(t, e, {enumerable: !0, get: r})
        }, n.r = function (t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t, "__esModule", {value: !0})
        }, n.t = function (t, e) {
            if (1 & e && (t = n(t)), 8 & e) return t;
            if (4 & e && "object" == typeof t && t && t.__esModule) return t;
            var r = Object.create(null);
            if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t) for (var o in t) n.d(r, o, function (e) {
                return t[e]
            }.bind(null, o));
            return r
        }, n.n = function (t) {
            var e = t && t.__esModule ? function () {
                return t.default
            } : function () {
                return t
            };
            return n.d(e, "a", e), e
        }, n.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, n.p = "/", n(n.s = 5)
    }([function (t, e, n) {
        var r = n(1);
        "string" == typeof r && (r = [[t.i, r, ""]]);
        var o = {hmr: !0, transform: void 0, insertInto: void 0};
        n(3)(r, o);
        r.locals && (t.exports = r.locals)
    }, function (t, e, n) {
        (t.exports = n(2)(!1)).push([t.i, ".cdx-quote-icon svg {\n  transform: rotate(180deg);\n}\n\n.cdx-quote {\n  margin: 0;\n}\n\n.cdx-quote__text {\n  min-height: 158px;\n  margin-bottom: 10px;\n}\n\n.cdx-quote__caption {}\n\n.cdx-quote [contentEditable=true][data-placeholder]::before{\n  position: absolute;\n  content: attr(data-placeholder);\n  color: #707684;\n  font-weight: normal;\n  opacity: 0;\n}\n\n.cdx-quote [contentEditable=true][data-placeholder]:empty::before {\n  opacity: 1;\n}\n\n.cdx-quote [contentEditable=true][data-placeholder]:empty:focus::before {\n  opacity: 0;\n}\n\n\n.cdx-quote-settings {\n  display: flex;\n}\n\n.cdx-quote-settings .cdx-settings-button {\n  width: 50%;\n}\n", ""])
    }, function (t, e) {
        t.exports = function (t) {
            var e = [];
            return e.toString = function () {
                return this.map(function (e) {
                    var n = function (t, e) {
                        var n = t[1] || "", r = t[3];
                        if (!r) return n;
                        if (e && "function" == typeof btoa) {
                            var o = (a = r, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(a)))) + " */"),
                                i = r.sources.map(function (t) {
                                    return "/*# sourceURL=" + r.sourceRoot + t + " */"
                                });
                            return [n].concat(i).concat([o]).join("\n")
                        }
                        var a;
                        return [n].join("\n")
                    }(e, t);
                    return e[2] ? "@media " + e[2] + "{" + n + "}" : n
                }).join("")
            }, e.i = function (t, n) {
                "string" == typeof t && (t = [[null, t, ""]]);
                for (var r = {}, o = 0; o < this.length; o++) {
                    var i = this[o][0];
                    "number" == typeof i && (r[i] = !0)
                }
                for (o = 0; o < t.length; o++) {
                    var a = t[o];
                    "number" == typeof a[0] && r[a[0]] || (n && !a[2] ? a[2] = n : n && (a[2] = "(" + a[2] + ") and (" + n + ")"), e.push(a))
                }
            }, e
        }
    }, function (t, e, n) {
        var r, o, i = {}, a = (r = function () {
            return window && document && document.all && !window.atob
        }, function () {
            return void 0 === o && (o = r.apply(this, arguments)), o
        }), s = function (t) {
            var e = {};
            return function (t) {
                if ("function" == typeof t) return t();
                if (void 0 === e[t]) {
                    var n = function (t) {
                        return document.querySelector(t)
                    }.call(this, t);
                    if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement) try {
                        n = n.contentDocument.head
                    } catch (t) {
                        n = null
                    }
                    e[t] = n
                }
                return e[t]
            }
        }(), c = null, u = 0, l = [], f = n(4);

        function d(t, e) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n], o = i[r.id];
                if (o) {
                    o.refs++;
                    for (var a = 0; a < o.parts.length; a++) o.parts[a](r.parts[a]);
                    for (; a < r.parts.length; a++) o.parts.push(b(r.parts[a], e))
                } else {
                    var s = [];
                    for (a = 0; a < r.parts.length; a++) s.push(b(r.parts[a], e));
                    i[r.id] = {id: r.id, refs: 1, parts: s}
                }
            }
        }

        function p(t, e) {
            for (var n = [], r = {}, o = 0; o < t.length; o++) {
                var i = t[o], a = e.base ? i[0] + e.base : i[0], s = {css: i[1], media: i[2], sourceMap: i[3]};
                r[a] ? r[a].parts.push(s) : n.push(r[a] = {id: a, parts: [s]})
            }
            return n
        }

        function h(t, e) {
            var n = s(t.insertInto);
            if (!n) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
            var r = l[l.length - 1];
            if ("top" === t.insertAt) r ? r.nextSibling ? n.insertBefore(e, r.nextSibling) : n.appendChild(e) : n.insertBefore(e, n.firstChild), l.push(e); else if ("bottom" === t.insertAt) n.appendChild(e); else {
                if ("object" != typeof t.insertAt || !t.insertAt.before) throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
                var o = s(t.insertInto + " " + t.insertAt.before);
                n.insertBefore(e, o)
            }
        }

        function v(t) {
            if (null === t.parentNode) return !1;
            t.parentNode.removeChild(t);
            var e = l.indexOf(t);
            e >= 0 && l.splice(e, 1)
        }

        function y(t) {
            var e = document.createElement("style");
            return void 0 === t.attrs.type && (t.attrs.type = "text/css"), g(e, t.attrs), h(t, e), e
        }

        function g(t, e) {
            Object.keys(e).forEach(function (n) {
                t.setAttribute(n, e[n])
            })
        }

        function b(t, e) {
            var n, r, o, i;
            if (e.transform && t.css) {
                if (!(i = e.transform(t.css))) return function () {
                };
                t.css = i
            }
            if (e.singleton) {
                var a = u++;
                n = c || (c = y(e)), r = x.bind(null, n, a, !1), o = x.bind(null, n, a, !0)
            } else t.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (n = function (t) {
                var e = document.createElement("link");
                return void 0 === t.attrs.type && (t.attrs.type = "text/css"), t.attrs.rel = "stylesheet", g(e, t.attrs), h(t, e), e
            }(e), r = function (t, e, n) {
                var r = n.css, o = n.sourceMap, i = void 0 === e.convertToAbsoluteUrls && o;
                (e.convertToAbsoluteUrls || i) && (r = f(r));
                o && (r += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(o)))) + " */");
                var a = new Blob([r], {type: "text/css"}), s = t.href;
                t.href = URL.createObjectURL(a), s && URL.revokeObjectURL(s)
            }.bind(null, n, e), o = function () {
                v(n), n.href && URL.revokeObjectURL(n.href)
            }) : (n = y(e), r = function (t, e) {
                var n = e.css, r = e.media;
                r && t.setAttribute("media", r);
                if (t.styleSheet) t.styleSheet.cssText = n; else {
                    for (; t.firstChild;) t.removeChild(t.firstChild);
                    t.appendChild(document.createTextNode(n))
                }
            }.bind(null, n), o = function () {
                v(n)
            });
            return r(t), function (e) {
                if (e) {
                    if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap) return;
                    r(t = e)
                } else o()
            }
        }

        t.exports = function (t, e) {
            if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document) throw new Error("The style-loader cannot be used in a non-browser environment");
            (e = e || {}).attrs = "object" == typeof e.attrs ? e.attrs : {}, e.singleton || "boolean" == typeof e.singleton || (e.singleton = a()), e.insertInto || (e.insertInto = "head"), e.insertAt || (e.insertAt = "bottom");
            var n = p(t, e);
            return d(n, e), function (t) {
                for (var r = [], o = 0; o < n.length; o++) {
                    var a = n[o];
                    (s = i[a.id]).refs--, r.push(s)
                }
                t && d(p(t, e), e);
                for (o = 0; o < r.length; o++) {
                    var s;
                    if (0 === (s = r[o]).refs) {
                        for (var c = 0; c < s.parts.length; c++) s.parts[c]();
                        delete i[s.id]
                    }
                }
            }
        };
        var m, w = (m = [], function (t, e) {
            return m[t] = e, m.filter(Boolean).join("\n")
        });

        function x(t, e, n, r) {
            var o = n ? "" : r.css;
            if (t.styleSheet) t.styleSheet.cssText = w(e, o); else {
                var i = document.createTextNode(o), a = t.childNodes;
                a[e] && t.removeChild(a[e]), a.length ? t.insertBefore(i, a[e]) : t.appendChild(i)
            }
        }
    }, function (t, e) {
        t.exports = function (t) {
            var e = "undefined" != typeof window && window.location;
            if (!e) throw new Error("fixUrls requires window.location");
            if (!t || "string" != typeof t) return t;
            var n = e.protocol + "//" + e.host, r = n + e.pathname.replace(/\/[^\/]*$/, "/");
            return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (t, e) {
                var o, i = e.trim().replace(/^"(.*)"$/, function (t, e) {
                    return e
                }).replace(/^'(.*)'$/, function (t, e) {
                    return e
                });
                return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i) ? t : (o = 0 === i.indexOf("//") ? i : 0 === i.indexOf("/") ? n + i : r + i.replace(/^\.\//, ""), "url(" + JSON.stringify(o) + ")")
            })
        }
    }, function (t, e, n) {
        "use strict";
        n.r(e);
        n(0);

        function r(t) {
            return function (t) {
                if (Array.isArray(t)) {
                    for (var e = 0, n = new Array(t.length); e < t.length; e++) n[e] = t[e];
                    return n
                }
            }(t) || function (t) {
                if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) return Array.from(t)
            }(t) || function () {
                throw new TypeError("Invalid attempt to spread non-iterable instance")
            }()
        }

        function o(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }

        function i(t, e, n) {
            return e && o(t.prototype, e), n && o(t, n), t
        }

        n.d(e, "default", function () {
            return a
        });
        var a = function () {
            function t(e) {
                var n = e.data, r = e.config, o = e.api, i = e.readOnly;
                !function (t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t);
                var a = t.ALIGNMENTS, s = t.DEFAULT_ALIGNMENT;
                this.api = o, this.readOnly = i, this.quotePlaceholder = r.quotePlaceholder || t.DEFAULT_QUOTE_PLACEHOLDER, this.captionPlaceholder = r.captionPlaceholder || t.DEFAULT_CAPTION_PLACEHOLDER, this.data = {
                    text: n.text || "",
                    caption: n.caption || "",
                    alignment: Object.values(a).includes(n.alignment) && n.alignment || r.defaultAlignment || s
                }
            }

            return i(t, [{
                key: "CSS", get: function () {
                    return {
                        baseClass: this.api.styles.block,
                        wrapper: "cdx-quote",
                        text: "cdx-quote__text",
                        input: this.api.styles.input,
                        caption: "cdx-quote__caption"
                    }
                }
            }, {
                key: "settings", get: function () {
                    return [{
                        name: "left",
                        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M17 7L5 7"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M17 17H5"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M13 12L5 12"/></svg>'
                    }, {
                        name: "center",
                        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M18 7L6 7"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M18 17H6"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 12L8 12"/></svg>'
                    }]
                }
            }], [{
                key: "isReadOnlySupported", get: function () {
                    return !0
                }
            }, {
                key: "toolbox", get: function () {
                    return {
                        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 10.8182L9 10.8182C8.80222 10.8182 8.60888 10.7649 8.44443 10.665C8.27998 10.5651 8.15181 10.4231 8.07612 10.257C8.00043 10.0909 7.98063 9.90808 8.01922 9.73174C8.0578 9.55539 8.15304 9.39341 8.29289 9.26627C8.43275 9.13913 8.61093 9.05255 8.80491 9.01747C8.99889 8.98239 9.19996 9.00039 9.38268 9.0692C9.56541 9.13801 9.72159 9.25453 9.83147 9.40403C9.94135 9.55353 10 9.72929 10 9.90909L10 12.1818C10 12.664 9.78929 13.1265 9.41421 13.4675C9.03914 13.8084 8.53043 14 8 14"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 10.8182L15 10.8182C14.8022 10.8182 14.6089 10.7649 14.4444 10.665C14.28 10.5651 14.1518 10.4231 14.0761 10.257C14.0004 10.0909 13.9806 9.90808 14.0192 9.73174C14.0578 9.55539 14.153 9.39341 14.2929 9.26627C14.4327 9.13913 14.6109 9.05255 14.8049 9.01747C14.9989 8.98239 15.2 9.00039 15.3827 9.0692C15.5654 9.13801 15.7216 9.25453 15.8315 9.40403C15.9414 9.55353 16 9.72929 16 9.90909L16 12.1818C16 12.664 15.7893 13.1265 15.4142 13.4675C15.0391 13.8084 14.5304 14 14 14"/></svg>',
                        title: "Quote"
                    }
                }
            }, {
                key: "contentless", get: function () {
                    return !0
                }
            }, {
                key: "enableLineBreaks", get: function () {
                    return !0
                }
            }, {
                key: "DEFAULT_QUOTE_PLACEHOLDER", get: function () {
                    return "Enter a quote"
                }
            }, {
                key: "DEFAULT_CAPTION_PLACEHOLDER", get: function () {
                    return "Enter a caption"
                }
            }, {
                key: "ALIGNMENTS", get: function () {
                    return {left: "left", center: "center"}
                }
            }, {
                key: "DEFAULT_ALIGNMENT", get: function () {
                    return t.ALIGNMENTS.left
                }
            }, {
                key: "conversionConfig", get: function () {
                    return {
                        import: "text", export: function (t) {
                            return t.caption ? "".concat(t.text, " — ").concat(t.caption) : t.text
                        }
                    }
                }
            }]), i(t, [{
                key: "render", value: function () {
                    var t = this._make("blockquote", [this.CSS.baseClass, this.CSS.wrapper]),
                        e = this._make("div", [this.CSS.input, this.CSS.text], {
                            contentEditable: !this.readOnly,
                            innerHTML: this.data.text
                        }), n = this._make("div", [this.CSS.input, this.CSS.caption], {
                            contentEditable: !this.readOnly,
                            innerHTML: this.data.caption
                        });
                    return e.dataset.placeholder = this.quotePlaceholder, n.dataset.placeholder = this.captionPlaceholder, t.appendChild(e), t.appendChild(n), t
                }
            }, {
                key: "save", value: function (t) {
                    var e = t.querySelector(".".concat(this.CSS.text)),
                        n = t.querySelector(".".concat(this.CSS.caption));
                    return Object.assign(this.data, {text: e.innerHTML, caption: n.innerHTML})
                }
            }, {
                key: "renderSettings", value: function () {
                    var t = this;
                    return this.settings.map(function (e) {
                        return {
                            icon: e.icon,
                            label: t.api.i18n.t("Align ".concat((n = e.name, n[0].toUpperCase() + n.substr(1)))),
                            onActivate: function () {
                                return t._toggleTune(e.name)
                            },
                            isActive: t.data.alignment === e.name,
                            closeOnActivate: !0
                        };
                        var n
                    })
                }
            }, {
                key: "_toggleTune", value: function (t) {
                    this.data.alignment = t
                }
            }, {
                key: "_make", value: function (t) {
                    var e, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                        o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                        i = document.createElement(t);
                    Array.isArray(n) ? (e = i.classList).add.apply(e, r(n)) : n && i.classList.add(n);
                    for (var a in o) i[a] = o[a];
                    return i
                }
            }], [{
                key: "sanitize", get: function () {
                    return {text: {br: !0, div: !0}, caption: {br: !0}, alignment: {}}
                }
            }]), t
        }()
    }]).default
});