!function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.Header = t() : e.Header = t()
}(window, (function () {
    return function (e) {
        var t = {};

        function n(r) {
            if (t[r]) return t[r].exports;
            var o = t[r] = {i: r, l: !1, exports: {}};
            return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
        }

        return n.m = e, n.c = t, n.d = function (e, t, r) {
            n.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: r})
        }, n.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
        }, n.t = function (e, t) {
            if (1 & t && (e = n(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var r = Object.create(null);
            if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e) for (var o in e) n.d(r, o, function (t) {
                return e[t]
            }.bind(null, o));
            return r
        }, n.n = function (e) {
            var t = e && e.__esModule ? function () {
                return e.default
            } : function () {
                return e
            };
            return n.d(t, "a", t), t
        }, n.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, n.p = "/", n(n.s = 5)
    }([function (e, t, n) {
        var r = n(1);
        "string" == typeof r && (r = [[e.i, r, ""]]);
        var o = {hmr: !0, transform: void 0, insertInto: void 0};
        n(3)(r, o);
        r.locals && (e.exports = r.locals)
    }, function (e, t, n) {
        (e.exports = n(2)(!1)).push([e.i, "/**\n * Plugin styles\n */\n.ce-header {\n  padding: 0.6em 0 3px;\n  margin: 0;\n  line-height: 1.25em;\n  outline: none;\n}\n\n.ce-header p,\n.ce-header div{\n  padding: 0 !important;\n  margin: 0 !important;\n}\n\n/**\n * Styles for Plugin icon in Toolbar\n */\n.ce-header__icon {}\n\n.ce-header[contentEditable=true][data-placeholder]::before{\n  position: absolute;\n  content: attr(data-placeholder);\n  color: #707684;\n  font-weight: normal;\n  display: none;\n  cursor: text;\n}\n\n.ce-header[contentEditable=true][data-placeholder]:empty::before {\n  display: block;\n}\n\n.ce-header[contentEditable=true][data-placeholder]:empty:focus::before {\n  display: none;\n}\n", ""])
    }, function (e, t) {
        e.exports = function (e) {
            var t = [];
            return t.toString = function () {
                return this.map((function (t) {
                    var n = function (e, t) {
                        var n = e[1] || "", r = e[3];
                        if (!r) return n;
                        if (t && "function" == typeof btoa) {
                            var o = (a = r, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(a)))) + " */"),
                                i = r.sources.map((function (e) {
                                    return "/*# sourceURL=" + r.sourceRoot + e + " */"
                                }));
                            return [n].concat(i).concat([o]).join("\n")
                        }
                        var a;
                        return [n].join("\n")
                    }(t, e);
                    return t[2] ? "@media " + t[2] + "{" + n + "}" : n
                })).join("")
            }, t.i = function (e, n) {
                "string" == typeof e && (e = [[null, e, ""]]);
                for (var r = {}, o = 0; o < this.length; o++) {
                    var i = this[o][0];
                    "number" == typeof i && (r[i] = !0)
                }
                for (o = 0; o < e.length; o++) {
                    var a = e[o];
                    "number" == typeof a[0] && r[a[0]] || (n && !a[2] ? a[2] = n : n && (a[2] = "(" + a[2] + ") and (" + n + ")"), t.push(a))
                }
            }, t
        }
    }, function (e, t, n) {
        var r, o, i = {}, a = (r = function () {
            return window && document && document.all && !window.atob
        }, function () {
            return void 0 === o && (o = r.apply(this, arguments)), o
        }), s = function (e) {
            return document.querySelector(e)
        }, l = function (e) {
            var t = {};
            return function (e) {
                if ("function" == typeof e) return e();
                if (void 0 === t[e]) {
                    var n = s.call(this, e);
                    if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement) try {
                        n = n.contentDocument.head
                    } catch (e) {
                        n = null
                    }
                    t[e] = n
                }
                return t[e]
            }
        }(), u = null, c = 0, f = [], d = n(4);

        function p(e, t) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n], o = i[r.id];
                if (o) {
                    o.refs++;
                    for (var a = 0; a < o.parts.length; a++) o.parts[a](r.parts[a]);
                    for (; a < r.parts.length; a++) o.parts.push(y(r.parts[a], t))
                } else {
                    var s = [];
                    for (a = 0; a < r.parts.length; a++) s.push(y(r.parts[a], t));
                    i[r.id] = {id: r.id, refs: 1, parts: s}
                }
            }
        }

        function h(e, t) {
            for (var n = [], r = {}, o = 0; o < e.length; o++) {
                var i = e[o], a = t.base ? i[0] + t.base : i[0], s = {css: i[1], media: i[2], sourceMap: i[3]};
                r[a] ? r[a].parts.push(s) : n.push(r[a] = {id: a, parts: [s]})
            }
            return n
        }

        function v(e, t) {
            var n = l(e.insertInto);
            if (!n) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
            var r = f[f.length - 1];
            if ("top" === e.insertAt) r ? r.nextSibling ? n.insertBefore(t, r.nextSibling) : n.appendChild(t) : n.insertBefore(t, n.firstChild), f.push(t); else if ("bottom" === e.insertAt) n.appendChild(t); else {
                if ("object" != typeof e.insertAt || !e.insertAt.before) throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
                var o = l(e.insertInto + " " + e.insertAt.before);
                n.insertBefore(t, o)
            }
        }

        function g(e) {
            if (null === e.parentNode) return !1;
            e.parentNode.removeChild(e);
            var t = f.indexOf(e);
            t >= 0 && f.splice(t, 1)
        }

        function b(e) {
            var t = document.createElement("style");
            return void 0 === e.attrs.type && (e.attrs.type = "text/css"), m(t, e.attrs), v(e, t), t
        }

        function m(e, t) {
            Object.keys(t).forEach((function (n) {
                e.setAttribute(n, t[n])
            }))
        }

        function y(e, t) {
            var n, r, o, i;
            if (t.transform && e.css) {
                if (!(i = t.transform(e.css))) return function () {
                };
                e.css = i
            }
            if (t.singleton) {
                var a = c++;
                n = u || (u = b(t)), r = L.bind(null, n, a, !1), o = L.bind(null, n, a, !0)
            } else e.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (n = function (e) {
                var t = document.createElement("link");
                return void 0 === e.attrs.type && (e.attrs.type = "text/css"), e.attrs.rel = "stylesheet", m(t, e.attrs), v(e, t), t
            }(t), r = x.bind(null, n, t), o = function () {
                g(n), n.href && URL.revokeObjectURL(n.href)
            }) : (n = b(t), r = M.bind(null, n), o = function () {
                g(n)
            });
            return r(e), function (t) {
                if (t) {
                    if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
                    r(e = t)
                } else o()
            }
        }

        e.exports = function (e, t) {
            if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document) throw new Error("The style-loader cannot be used in a non-browser environment");
            (t = t || {}).attrs = "object" == typeof t.attrs ? t.attrs : {}, t.singleton || "boolean" == typeof t.singleton || (t.singleton = a()), t.insertInto || (t.insertInto = "head"), t.insertAt || (t.insertAt = "bottom");
            var n = h(e, t);
            return p(n, t), function (e) {
                for (var r = [], o = 0; o < n.length; o++) {
                    var a = n[o];
                    (s = i[a.id]).refs--, r.push(s)
                }
                e && p(h(e, t), t);
                for (o = 0; o < r.length; o++) {
                    var s;
                    if (0 === (s = r[o]).refs) {
                        for (var l = 0; l < s.parts.length; l++) s.parts[l]();
                        delete i[s.id]
                    }
                }
            }
        };
        var w, k = (w = [], function (e, t) {
            return w[e] = t, w.filter(Boolean).join("\n")
        });

        function L(e, t, n, r) {
            var o = n ? "" : r.css;
            if (e.styleSheet) e.styleSheet.cssText = k(t, o); else {
                var i = document.createTextNode(o), a = e.childNodes;
                a[t] && e.removeChild(a[t]), a.length ? e.insertBefore(i, a[t]) : e.appendChild(i)
            }
        }

        function M(e, t) {
            var n = t.css, r = t.media;
            if (r && e.setAttribute("media", r), e.styleSheet) e.styleSheet.cssText = n; else {
                for (; e.firstChild;) e.removeChild(e.firstChild);
                e.appendChild(document.createTextNode(n))
            }
        }

        function x(e, t, n) {
            var r = n.css, o = n.sourceMap, i = void 0 === t.convertToAbsoluteUrls && o;
            (t.convertToAbsoluteUrls || i) && (r = d(r)), o && (r += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(o)))) + " */");
            var a = new Blob([r], {type: "text/css"}), s = e.href;
            e.href = URL.createObjectURL(a), s && URL.revokeObjectURL(s)
        }
    }, function (e, t) {
        e.exports = function (e) {
            var t = "undefined" != typeof window && window.location;
            if (!t) throw new Error("fixUrls requires window.location");
            if (!e || "string" != typeof e) return e;
            var n = t.protocol + "//" + t.host, r = n + t.pathname.replace(/\/[^\/]*$/, "/");
            return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, (function (e, t) {
                var o, i = t.trim().replace(/^"(.*)"$/, (function (e, t) {
                    return t
                })).replace(/^'(.*)'$/, (function (e, t) {
                    return t
                }));
                return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i) ? e : (o = 0 === i.indexOf("//") ? i : 0 === i.indexOf("/") ? n + i : r + i.replace(/^\.\//, ""), "url(" + JSON.stringify(o) + ")")
            }))
        }
    }, function (e, t, n) {
        "use strict";
        n.r(t), n.d(t, "default", (function () {
            return i
        }));
        n(0);

        function r(e) {
            return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function o(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }

        /**
         * Header block for the Editor.js.
         *
         * @author CodeX (team@ifmo.su)
         * @copyright CodeX 2018
         * @license MIT
         * @version 2.0.0
         */
        var i = function () {
            function e(t) {
                var n = t.data, r = t.config, o = t.api, i = t.readOnly;
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.api = o, this.readOnly = i, this._CSS = {
                    block: this.api.styles.block,
                    wrapper: "ce-header"
                }, this._settings = r, this._data = this.normalizeData(n), this._element = this.getTag()
            }

            var t, n, i;
            return t = e, i = [{
                key: "conversionConfig", get: function () {
                    return {export: "text", import: "text"}
                }
            }, {
                key: "sanitize", get: function () {
                    return {level: !1, text: {}}
                }
            }, {
                key: "isReadOnlySupported", get: function () {
                    return !0
                }
            }, {
                key: "pasteConfig", get: function () {
                    return {tags: ["H1", "H2", "H3", "H4", "H5", "H6"]}
                }
            }, {
                key: "toolbox", get: function () {
                    return {
                        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9 7L9 12M9 17V12M9 12L15 12M15 7V12M15 17L15 12"/></svg>',
                        title: "Heading"
                    }
                }
            }], (n = [{
                key: "normalizeData", value: function (e) {
                    var t = {};
                    return "object" !== r(e) && (e = {}), t.text = e.text || "", t.level = parseInt(e.level) || this.defaultLevel.number, t
                }
            }, {
                key: "render", value: function () {
                    return this._element
                }
            }, {
                key: "renderSettings", value: function () {
                    var e = this;
                    return this.levels.map((function (t) {
                        return {
                            icon: t.svg, label: e.api.i18n.t("Heading ".concat(t.number)), onActivate: function () {
                                return e.setLevel(t.number)
                            }, closeOnActivate: !0, isActive: e.currentLevel.number === t.number
                        }
                    }))
                }
            }, {
                key: "setLevel", value: function (e) {
                    this.data = {level: e, text: this.data.text}
                }
            }, {
                key: "merge", value: function (e) {
                    var t = {text: this.data.text + e.text, level: this.data.level};
                    this.data = t
                }
            }, {
                key: "validate", value: function (e) {
                    return "" !== e.text.trim()
                }
            }, {
                key: "save", value: function (e) {
                    return {text: e.innerHTML, level: this.currentLevel.number}
                }
            }, {
                key: "getTag", value: function () {
                    var e = document.createElement(this.currentLevel.tag);
                    return e.innerHTML = this._data.text || "", e.classList.add(this._CSS.wrapper), e.contentEditable = this.readOnly ? "false" : "true", e.dataset.placeholder = this.api.i18n.t(this._settings.placeholder || ""), e
                }
            }, {
                key: "onPaste", value: function (e) {
                    var t = e.detail.data, n = this.defaultLevel.number;
                    switch (t.tagName) {
                        case"H1":
                            n = 1;
                            break;
                        case"H2":
                            n = 2;
                            break;
                        case"H3":
                            n = 3;
                            break;
                        case"H4":
                            n = 4;
                            break;
                        case"H5":
                            n = 5;
                            break;
                        case"H6":
                            n = 6
                    }
                    this._settings.levels && (n = this._settings.levels.reduce((function (e, t) {
                        return Math.abs(t - n) < Math.abs(e - n) ? t : e
                    }))), this.data = {level: n, text: t.innerHTML}
                }
            }, {
                key: "data", get: function () {
                    return this._data.text = this._element.innerHTML, this._data.level = this.currentLevel.number, this._data
                }, set: function (e) {
                    if (this._data = this.normalizeData(e), void 0 !== e.level && this._element.parentNode) {
                        var t = this.getTag();
                        t.innerHTML = this._element.innerHTML, this._element.parentNode.replaceChild(t, this._element), this._element = t
                    }
                    void 0 !== e.text && (this._element.innerHTML = this._data.text || "")
                }
            }, {
                key: "currentLevel", get: function () {
                    var e = this, t = this.levels.find((function (t) {
                        return t.number === e._data.level
                    }));
                    return t || (t = this.defaultLevel), t
                }
            }, {
                key: "defaultLevel", get: function () {
                    var e = this;
                    if (this._settings.defaultLevel) {
                        var t = this.levels.find((function (t) {
                            return t.number === e._settings.defaultLevel
                        }));
                        if (t) return t;
                        console.warn("(ง'̀-'́)ง Heading Tool: the default level specified was not found in available levels")
                    }
                    return this.levels[1]
                }
            }, {
                key: "levels", get: function () {
                    var e = this, t = [{
                        number: 1,
                        tag: "H1",
                        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M19 17V10.2135C19 10.1287 18.9011 10.0824 18.836 10.1367L16 12.5"/></svg>'
                    }, {
                        number: 2,
                        tag: "H2",
                        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 11C16 10 19 9.5 19 12C19 13.9771 16.0684 13.9997 16.0012 16.8981C15.9999 16.9533 16.0448 17 16.1 17L19.3 17"/></svg>'
                    }, {
                        number: 3,
                        tag: "H3",
                        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 11C16 10.5 16.8323 10 17.6 10C18.3677 10 19.5 10.311 19.5 11.5C19.5 12.5315 18.7474 12.9022 18.548 12.9823C18.5378 12.9864 18.5395 13.0047 18.5503 13.0063C18.8115 13.0456 20 13.3065 20 14.8C20 16 19.5 17 17.8 17C17.8 17 16 17 16 16.3"/></svg>'
                    }, {
                        number: 4,
                        tag: "H4",
                        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M18 10L15.2834 14.8511C15.246 14.9178 15.294 15 15.3704 15C16.8489 15 18.7561 15 20.2 15M19 17C19 15.7187 19 14.8813 19 13.6"/></svg>'
                    }, {
                        number: 5,
                        tag: "H5",
                        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 15.9C16 15.9 16.3768 17 17.8 17C19.5 17 20 15.6199 20 14.7C20 12.7323 17.6745 12.0486 16.1635 12.9894C16.094 13.0327 16 12.9846 16 12.9027V10.1C16 10.0448 16.0448 10 16.1 10H19.8"/></svg>'
                    }, {
                        number: 6,
                        tag: "H6",
                        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M19.5 10C16.5 10.5 16 13.3285 16 15M16 15V15C16 16.1046 16.8954 17 18 17H18.3246C19.3251 17 20.3191 16.3492 20.2522 15.3509C20.0612 12.4958 16 12.6611 16 15Z"/></svg>'
                    }];
                    return this._settings.levels ? t.filter((function (t) {
                        return e._settings.levels.includes(t.number)
                    })) : t
                }
            }]) && o(t.prototype, n), i && o(t, i), e
        }()
    }]).default
}));