/*
 * jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Sat Feb 13 22:33:48 2010 -0500
 */
(function (A, w) {
	function ma() {
		if (!c.isReady) {
			try {
				s.documentElement.doScroll("left")
			} catch (a) {
				setTimeout(ma, 1);
				return
			}
			c.ready()
		}
	}
	function Qa(a, b) {
		b.src ? c.ajax({
			url : b.src,
			async : false,
			dataType : "script"
		}) : c.globalEval(b.text || b.textContent || b.innerHTML || "");
		b.parentNode && b.parentNode.removeChild(b)
	}
	function X(a, b, d, f, e, j) {
		var i = a.length;
		if (typeof b === "object") {
			for (var o in b) {
				X(a, o, b[o], f, e, d)
			}
			return a
		}
		if (d !== w) {
			f = !j && f && c.isFunction(d);
			for (o = 0; o < i; o++) {
				e(a[o], b, f ? d.call(a[o], o, e(a[o], b)) : d, j)
			}
			return a
		}
		return i ? e(a[0], b) : w
	}
	function J() {
		return (new Date).getTime()
	}
	function Y() {
		return false
	}
	function Z() {
		return true
	}
	function na(a, b, d) {
		d[0].type = a;
		return c.event.handle.apply(b, d)
	}
	function oa(a) {
		var b,
		d = [],
		f = [],
		e = arguments,
		j,
		i,
		o,
		k,
		n,
		r;
		i = c.data(this, "events");
		if (!(a.liveFired === this || !i || !i.live || a.button && a.type === "click")) {
			a.liveFired = this;
			var u = i.live.slice(0);
			for (k = 0; k < u.length; k++) {
				i = u[k];
				i.origType.replace(O, "") === a.type ? f.push(i.selector) : u.splice(k--, 1)
			}
			j = c(a.target).closest(f, a.currentTarget);
			n = 0;
			for (r = j.length; n < r; n++) {
				for (k = 0; k < u.length; k++) {
					i = u[k];
					if (j[n].selector === i.selector) {
						o = j[n].elem;
						f = null;
						if (i.preType === "mouseenter" || i.preType === "mouseleave") {
							f = c(a.relatedTarget).closest(i.selector)[0]
						}
						if (!f || f !== o) {
							d.push({
								elem : o,
								handleObj : i
							})
						}
					}
				}
			}
			n = 0;
			for (r = d.length; n < r; n++) {
				j = d[n];
				a.currentTarget = j.elem;
				a.data = j.handleObj.data;
				a.handleObj = j.handleObj;
				if (j.handleObj.origHandler.apply(j.elem, e) === false) {
					b = false;
					break
				}
			}
			return b
		}
	}
	function pa(a, b) {
		return "live." + (a && a !== "*" ? a + "." : "") + b.replace(/\./g, "`").replace(/ /g, "&")
	}
	function qa(a) {
		return !a || !a.parentNode || a.parentNode.nodeType === 11
	}
	function ra(a, b) {
		var d = 0;
		b.each(function () {
			if (this.nodeName === (a[d] && a[d].nodeName)) {
				var f = c.data(a[d++]),
				e = c.data(this, f);
				if (f = f && f.events) {
					delete e.handle;
					e.events = {};
					for (var j in f) {
						for (var i in f[j]) {
							c.event.add(this, j, f[j][i], f[j][i].data)
						}
					}
				}
			}
		})
	}
	function sa(a, b, d) {
		var f,
		e,
		j;
		b = b && b[0] ? b[0].ownerDocument || b[0] : s;
		if (a.length === 1 && typeof a[0] === "string" && a[0].length < 512 && b === s && !ta.test(a[0]) && (c.support.checkClone || !ua.test(a[0]))) {
			e = true;
			if (j = c.fragments[a[0]]) {
				if (j !== 1) {
					f = j
				}
			}
		}
		if (!f) {
			f = b.createDocumentFragment();
			c.clean(a, b, f, d)
		}
		if (e) {
			c.fragments[a[0]] = j ? f : 1
		}
		return {
			fragment : f,
			cacheable : e
		}
	}
	function K(a, b) {
		var d = {};
		c.each(va.concat.apply([], va.slice(0, b)), function () {
			d[this] = a
		});
		return d
	}
	function wa(a) {
		return "scrollTo" in a && a.document ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : false
	}
	var c = function (a, b) {
		return new c.fn.init(a, b)
	},
	Ra = A.jQuery,
	Sa = A.$,
	s = A.document,
	T,
	Ta = /^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/,
	Ua = /^.[^:#\[\.,]*$/,
	Va = /\S/,
	Wa = /^(\s|\u00A0)+|(\s|\u00A0)+$/g,
	Xa = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
	P = navigator.userAgent,
	xa = false,
	Q = [],
	L,
	$ = Object.prototype.toString,
	aa = Object.prototype.hasOwnProperty,
	ba = Array.prototype.push,
	R = Array.prototype.slice,
	ya = Array.prototype.indexOf;
	c.fn = c.prototype = {
		init : function (a, b) {
			var d,
			f;
			if (!a) {
				return this
			}
			if (a.nodeType) {
				this.context = this[0] = a;
				this.length = 1;
				return this
			}
			if (a === "body" && !b) {
				this.context = s;
				this[0] = s.body;
				this.selector = "body";
				this.length = 1;
				return this
			}
			if (typeof a === "string") {
				if ((d = Ta.exec(a)) && (d[1] || !b)) {
					if (d[1]) {
						f = b ? b.ownerDocument || b : s;
						if (a = Xa.exec(a)) {
							if (c.isPlainObject(b)) {
								a = [s.createElement(a[1])];
								c.fn.attr.call(a, b, true)
							} else {
								a = [f.createElement(a[1])]
							}
						} else {
							a = sa([d[1]], [f]);
							a = (a.cacheable ? a.fragment.cloneNode(true) : a.fragment).childNodes
						}
						return c.merge(this, a)
					} else {
						if (b = s.getElementById(d[2])) {
							if (b.id !== d[2]) {
								return T.find(a)
							}
							this.length = 1;
							this[0] = b
						}
						this.context = s;
						this.selector = a;
						return this
					}
				} else {
					if (!b && /^\w+$/.test(a)) {
						this.selector = a;
						this.context = s;
						a = s.getElementsByTagName(a);
						return c.merge(this, a)
					} else {
						return !b || b.jquery ? (b || T).find(a) : c(b).find(a)
					}
				}
			} else {
				if (c.isFunction(a)) {
					return T.ready(a)
				}
			}
			if (a.selector !== w) {
				this.selector = a.selector;
				this.context = a.context
			}
			return c.makeArray(a, this)
		},
		selector : "",
		jquery : "1.4.2",
		length : 0,
		size : function () {
			return this.length
		},
		toArray : function () {
			return R.call(this, 0)
		},
		get : function (a) {
			return a == null ? this.toArray() : a < 0 ? this.slice(a)[0] : this[a]
		},
		pushStack : function (a, b, d) {
			var f = c();
			c.isArray(a) ? ba.apply(f, a) : c.merge(f, a);
			f.prevObject = this;
			f.context = this.context;
			if (b === "find") {
				f.selector = this.selector + (this.selector ? " " : "") + d
			} else {
				if (b) {
					f.selector = this.selector + "." + b + "(" + d + ")"
				}
			}
			return f
		},
		each : function (a, b) {
			return c.each(this, a, b)
		},
		ready : function (a) {
			c.bindReady();
			if (c.isReady) {
				a.call(s, c)
			} else {
				Q && Q.push(a)
			}
			return this
		},
		eq : function (a) {
			return a === -1 ? this.slice(a) : this.slice(a, +a + 1)
		},
		first : function () {
			return this.eq(0)
		},
		last : function () {
			return this.eq(-1)
		},
		slice : function () {
			return this.pushStack(R.apply(this, arguments), "slice", R.call(arguments).join(","))
		},
		map : function (a) {
			return this.pushStack(c.map(this, function (b, d) {
					return a.call(b, d, b)
				}))
		},
		end : function () {
			return this.prevObject || c(null)
		},
		push : ba,
		sort : [].sort,
		splice : [].splice
	};
	c.fn.init.prototype = c.fn;
	c.extend = c.fn.extend = function () {
		var a = arguments[0] || {},
		b = 1,
		d = arguments.length,
		f = false,
		e,
		j,
		i,
		o;
		if (typeof a === "boolean") {
			f = a;
			a = arguments[1] || {};
			b = 2
		}
		if (typeof a !== "object" && !c.isFunction(a)) {
			a = {}

		}
		if (d === b) {
			a = this;
			--b
		}
		for (; b < d; b++) {
			if ((e = arguments[b]) != null) {
				for (j in e) {
					i = a[j];
					o = e[j];
					if (a !== o) {
						if (f && o && (c.isPlainObject(o) || c.isArray(o))) {
							i = i && (c.isPlainObject(i) || c.isArray(i)) ? i : c.isArray(o) ? [] : {};
							a[j] = c.extend(f, i, o)
						} else {
							if (o !== w) {
								a[j] = o
							}
						}
					}
				}
			}
		}
		return a
	};
	c.extend({
		noConflict : function (a) {
			A.$ = Sa;
			if (a) {
				A.jQuery = Ra
			}
			return c
		},
		isReady : false,
		ready : function () {
			if (!c.isReady) {
				if (!s.body) {
					return setTimeout(c.ready, 13)
				}
				c.isReady = true;
				if (Q) {
					for (var a, b = 0; a = Q[b++]; ) {
						a.call(s, c)
					}
					Q = null
				}
				c.fn.triggerHandler && c(s).triggerHandler("ready")
			}
		},
		bindReady : function () {
			if (!xa) {
				xa = true;
				if (s.readyState === "complete") {
					return c.ready()
				}
				if (s.addEventListener) {
					s.addEventListener("DOMContentLoaded", L, false);
					A.addEventListener("load", c.ready, false)
				} else {
					if (s.attachEvent) {
						s.attachEvent("onreadystatechange", L);
						A.attachEvent("onload", c.ready);
						var a = false;
						try {
							a = A.frameElement == null
						} catch (b) {}

						s.documentElement.doScroll && a && ma()
					}
				}
			}
		},
		isFunction : function (a) {
			return $.call(a) === "[object Function]"
		},
		isArray : function (a) {
			return $.call(a) === "[object Array]"
		},
		isPlainObject : function (a) {
			if (!a || $.call(a) !== "[object Object]" || a.nodeType || a.setInterval) {
				return false
			}
			if (a.constructor && !aa.call(a, "constructor") && !aa.call(a.constructor.prototype, "isPrototypeOf")) {
				return false
			}
			var b;
			for (b in a) {}

			return b === w || aa.call(a, b)
		},
		isEmptyObject : function (a) {
			for (var b in a) {
				return false
			}
			return true
		},
		error : function (a) {
			throw a
		},
		parseJSON : function (a) {
			if (typeof a !== "string" || !a) {
				return null
			}
			a = c.trim(a);
			if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
				return A.JSON && A.JSON.parse ? A.JSON.parse(a) : (new Function("return " + a))()
			} else {
				c.error("Invalid JSON: " + a)
			}
		},
		noop : function () {},
		globalEval : function (a) {
			if (a && Va.test(a)) {
				var b = s.getElementsByTagName("head")[0] || s.documentElement,
				d = s.createElement("script");
				d.type = "text/javascript";
				if (c.support.scriptEval) {
					d.appendChild(s.createTextNode(a))
				} else {
					d.text = a
				}
				b.insertBefore(d, b.firstChild);
				b.removeChild(d)
			}
		},
		nodeName : function (a, b) {
			return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
		},
		each : function (a, b, d) {
			var f,
			e = 0,
			j = a.length,
			i = j === w || c.isFunction(a);
			if (d) {
				if (i) {
					for (f in a) {
						if (b.apply(a[f], d) === false) {
							break
						}
					}
				} else {
					for (; e < j; ) {
						if (b.apply(a[e++], d) === false) {
							break
						}
					}
				}
			} else {
				if (i) {
					for (f in a) {
						if (b.call(a[f], f, a[f]) === false) {
							break
						}
					}
				} else {
					for (d = a[0]; e < j && b.call(d, e, d) !== false; d = a[++e]) {}

				}
			}
			return a
		},
		trim : function (a) {
			return (a || "").replace(Wa, "")
		},
		makeArray : function (a, b) {
			b = b || [];
			if (a != null) {
				a.length == null || typeof a === "string" || c.isFunction(a) || typeof a !== "function" && a.setInterval ? ba.call(b, a) : c.merge(b, a)
			}
			return b
		},
		inArray : function (a, b) {
			if (b.indexOf) {
				return b.indexOf(a)
			}
			for (var d = 0, f = b.length; d < f; d++) {
				if (b[d] === a) {
					return d
				}
			}
			return -1
		},
		merge : function (a, b) {
			var d = a.length,
			f = 0;
			if (typeof b.length === "number") {
				for (var e = b.length; f < e; f++) {
					a[d++] = b[f]
				}
			} else {
				for (; b[f] !== w; ) {
					a[d++] = b[f++]
				}
			}
			a.length = d;
			return a
		},
		grep : function (a, b, d) {
			for (var f = [], e = 0, j = a.length; e < j; e++) {
				!d !== !b(a[e], e) && f.push(a[e])
			}
			return f
		},
		map : function (a, b, d) {
			for (var f = [], e, j = 0, i = a.length; j < i; j++) {
				e = b(a[j], j, d);
				if (e != null) {
					f[f.length] = e
				}
			}
			return f.concat.apply([], f)
		},
		guid : 1,
		proxy : function (a, b, d) {
			if (arguments.length === 2) {
				if (typeof b === "string") {
					d = a;
					a = d[b];
					b = w
				} else {
					if (b && !c.isFunction(b)) {
						d = b;
						b = w
					}
				}
			}
			if (!b && a) {
				b = function () {
					return a.apply(d || this, arguments)
				}
			}
			if (a) {
				b.guid = a.guid = a.guid || b.guid || c.guid++
			}
			return b
		},
		uaMatch : function (a) {
			a = a.toLowerCase();
			a = /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || !/compatible/.test(a) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(a) || [];
			return {
				browser : a[1] || "",
				version : a[2] || "0"
			}
		},
		browser : {}

	});
	P = c.uaMatch(P);
	if (P.browser) {
		c.browser[P.browser] = true;
		c.browser.version = P.version
	}
	if (c.browser.webkit) {
		c.browser.safari = true
	}
	if (ya) {
		c.inArray = function (a, b) {
			return ya.call(b, a)
		}
	}
	T = c(s);
	if (s.addEventListener) {
		L = function () {
			s.removeEventListener("DOMContentLoaded", L, false);
			c.ready()
		}
	} else {
		if (s.attachEvent) {
			L = function () {
				if (s.readyState === "complete") {
					s.detachEvent("onreadystatechange", L);
					c.ready()
				}
			}
		}
	}
	(function () {
		c.support = {};
		var a = s.documentElement,
		b = s.createElement("script"),
		d = s.createElement("div"),
		f = "script" + J();
		d.style.display = "none";
		d.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
		var e = d.getElementsByTagName("*"),
		j = d.getElementsByTagName("a")[0];
		if (!(!e || !e.length || !j)) {
			c.support = {
				leadingWhitespace : d.firstChild.nodeType === 3,
				tbody : !d.getElementsByTagName("tbody").length,
				htmlSerialize : !!d.getElementsByTagName("link").length,
				style : /red/.test(j.getAttribute("style")),
				hrefNormalized : j.getAttribute("href") === "/a",
				opacity : /^0.55$/.test(j.style.opacity),
				cssFloat : !!j.style.cssFloat,
				checkOn : d.getElementsByTagName("input")[0].value === "on",
				optSelected : s.createElement("select").appendChild(s.createElement("option")).selected,
				parentNode : d.removeChild(d.appendChild(s.createElement("div"))).parentNode === null,
				deleteExpando : true,
				checkClone : false,
				scriptEval : false,
				noCloneEvent : true,
				boxModel : null
			};
			b.type = "text/javascript";
			try {
				b.appendChild(s.createTextNode("window." + f + "=1;"))
			} catch (i) {}

			a.insertBefore(b, a.firstChild);
			if (A[f]) {
				c.support.scriptEval = true;
				delete A[f]
			}
			try {
				delete b.test
			} catch (o) {
				c.support.deleteExpando = false
			}
			a.removeChild(b);
			if (d.attachEvent && d.fireEvent) {
				d.attachEvent("onclick", function k() {
					c.support.noCloneEvent = false;
					d.detachEvent("onclick", k)
				});
				d.cloneNode(true).fireEvent("onclick")
			}
			d = s.createElement("div");
			d.innerHTML = "<input type='radio' name='radiotest' checked='checked'/>";
			a = s.createDocumentFragment();
			a.appendChild(d.firstChild);
			c.support.checkClone = a.cloneNode(true).cloneNode(true).lastChild.checked;
			c(function () {
				var k = s.createElement("div");
				k.style.width = k.style.paddingLeft = "1px";
				s.body.appendChild(k);
				c.boxModel = c.support.boxModel = k.offsetWidth === 2;
				s.body.removeChild(k).style.display = "none"
			});
			a = function (k) {
				var n = s.createElement("div");
				k = "on" + k;
				var r = k in n;
				if (!r) {
					n.setAttribute(k, "return;");
					r = typeof n[k] === "function"
				}
				return r
			};
			c.support.submitBubbles = a("submit");
			c.support.changeBubbles = a("change");
			a = b = d = e = j = null
		}
	})();
	c.props = {
		"for" : "htmlFor",
		"class" : "className",
		readonly : "readOnly",
		maxlength : "maxLength",
		cellspacing : "cellSpacing",
		rowspan : "rowSpan",
		colspan : "colSpan",
		tabindex : "tabIndex",
		usemap : "useMap",
		frameborder : "frameBorder"
	};
	var G = "jQuery" + J(),
	Ya = 0,
	za = {};
	c.extend({
		cache : {},
		expando : G,
		noData : {
			embed : true,
			object : true,
			applet : true
		},
		data : function (a, b, d) {
			if (!(a.nodeName && c.noData[a.nodeName.toLowerCase()])) {
				a = a == A ? za : a;
				var f = a[G],
				e = c.cache;
				if (!f && typeof b === "string" && d === w) {
					return null
				}
				f || (f = ++Ya);
				if (typeof b === "object") {
					a[G] = f;
					e[f] = c.extend(true, {}, b)
				} else {
					if (!e[f]) {
						a[G] = f;
						e[f] = {}

					}
				}
				a = e[f];
				if (d !== w) {
					a[b] = d
				}
				return typeof b === "string" ? a[b] : a
			}
		},
		removeData : function (a, b) {
			if (!(a.nodeName && c.noData[a.nodeName.toLowerCase()])) {
				a = a == A ? za : a;
				var d = a[G],
				f = c.cache,
				e = f[d];
				if (b) {
					if (e) {
						delete e[b];
						c.isEmptyObject(e) && c.removeData(a)
					}
				} else {
					if (c.support.deleteExpando) {
						delete a[c.expando]
					} else {
						a.removeAttribute && a.removeAttribute(c.expando)
					}
					delete f[d]
				}
			}
		}
	});
	c.fn.extend({
		data : function (a, b) {
			if (typeof a === "undefined" && this.length) {
				return c.data(this[0])
			} else {
				if (typeof a === "object") {
					return this.each(function () {
						c.data(this, a)
					})
				}
			}
			var d = a.split(".");
			d[1] = d[1] ? "." + d[1] : "";
			if (b === w) {
				var f = this.triggerHandler("getData" + d[1] + "!", [d[0]]);
				if (f === w && this.length) {
					f = c.data(this[0], a)
				}
				return f === w && d[1] ? this.data(d[0]) : f
			} else {
				return this.trigger("setData" + d[1] + "!", [d[0], b]).each(function () {
					c.data(this, a, b)
				})
			}
		},
		removeData : function (a) {
			return this.each(function () {
				c.removeData(this, a)
			})
		}
	});
	c.extend({
		queue : function (a, b, d) {
			if (a) {
				b = (b || "fx") + "queue";
				var f = c.data(a, b);
				if (!d) {
					return f || []
				}
				if (!f || c.isArray(d)) {
					f = c.data(a, b, c.makeArray(d))
				} else {
					f.push(d)
				}
				return f
			}
		},
		dequeue : function (a, b) {
			b = b || "fx";
			var d = c.queue(a, b),
			f = d.shift();
			if (f === "inprogress") {
				f = d.shift()
			}
			if (f) {
				b === "fx" && d.unshift("inprogress");
				f.call(a, function () {
					c.dequeue(a, b)
				})
			}
		}
	});
	c.fn.extend({
		queue : function (a, b) {
			if (typeof a !== "string") {
				b = a;
				a = "fx"
			}
			if (b === w) {
				return c.queue(this[0], a)
			}
			return this.each(function () {
				var d = c.queue(this, a, b);
				a === "fx" && d[0] !== "inprogress" && c.dequeue(this, a)
			})
		},
		dequeue : function (a) {
			return this.each(function () {
				c.dequeue(this, a)
			})
		},
		delay : function (a, b) {
			a = c.fx ? c.fx.speeds[a] || a : a;
			b = b || "fx";
			return this.queue(b, function () {
				var d = this;
				setTimeout(function () {
					c.dequeue(d, b)
				}, a)
			})
		},
		clearQueue : function (a) {
			return this.queue(a || "fx", [])
		}
	});
	var Aa = /[\n\t]/g,
	ca = /\s+/,
	Za = /\r/g,
	$a = /href|src|style/,
	ab = /(button|input)/i,
	bb = /(button|input|object|select|textarea)/i,
	cb = /^(a|area)$/i,
	Ba = /radio|checkbox/;
	c.fn.extend({
		attr : function (a, b) {
			return X(this, a, b, true, c.attr)
		},
		removeAttr : function (a) {
			return this.each(function () {
				c.attr(this, a, "");
				this.nodeType === 1 && this.removeAttribute(a)
			})
		},
		addClass : function (a) {
			if (c.isFunction(a)) {
				return this.each(function (n) {
					var r = c(this);
					r.addClass(a.call(this, n, r.attr("class")))
				})
			}
			if (a && typeof a === "string") {
				for (var b = (a || "").split(ca), d = 0, f = this.length; d < f; d++) {
					var e = this[d];
					if (e.nodeType === 1) {
						if (e.className) {
							for (var j = " " + e.className + " ", i = e.className, o = 0, k = b.length; o < k; o++) {
								if (j.indexOf(" " + b[o] + " ") < 0) {
									i += " " + b[o]
								}
							}
							e.className = c.trim(i)
						} else {
							e.className = a
						}
					}
				}
			}
			return this
		},
		removeClass : function (a) {
			if (c.isFunction(a)) {
				return this.each(function (k) {
					var n = c(this);
					n.removeClass(a.call(this, k, n.attr("class")))
				})
			}
			if (a && typeof a === "string" || a === w) {
				for (var b = (a || "").split(ca), d = 0, f = this.length; d < f; d++) {
					var e = this[d];
					if (e.nodeType === 1 && e.className) {
						if (a) {
							for (var j = (" " + e.className + " ").replace(Aa, " "), i = 0, o = b.length; i < o; i++) {
								j = j.replace(" " + b[i] + " ", " ")
							}
							e.className = c.trim(j)
						} else {
							e.className = ""
						}
					}
				}
			}
			return this
		},
		toggleClass : function (a, b) {
			var d = typeof a,
			f = typeof b === "boolean";
			if (c.isFunction(a)) {
				return this.each(function (e) {
					var j = c(this);
					j.toggleClass(a.call(this, e, j.attr("class"), b), b)
				})
			}
			return this.each(function () {
				if (d === "string") {
					for (var e, j = 0, i = c(this), o = b, k = a.split(ca); e = k[j++]; ) {
						o = f ? o : !i.hasClass(e);
						i[o ? "addClass" : "removeClass"](e)
					}
				} else {
					if (d === "undefined" || d === "boolean") {
						this.className && c.data(this, "__className__", this.className);
						this.className = this.className || a === false ? "" : c.data(this, "__className__") || ""
					}
				}
			})
		},
		hasClass : function (a) {
			a = " " + a + " ";
			for (var b = 0, d = this.length; b < d; b++) {
				if ((" " + this[b].className + " ").replace(Aa, " ").indexOf(a) > -1) {
					return true
				}
			}
			return false
		},
		val : function (a) {
			if (a === w) {
				var b = this[0];
				if (b) {
					if (c.nodeName(b, "option")) {
						return (b.attributes.value || {}).specified ? b.value : b.text
					}
					if (c.nodeName(b, "select")) {
						var d = b.selectedIndex,
						f = [],
						e = b.options;
						b = b.type === "select-one";
						if (d < 0) {
							return null
						}
						var j = b ? d : 0;
						for (d = b ? d + 1 : e.length; j < d; j++) {
							var i = e[j];
							if (i.selected) {
								a = c(i).val();
								if (b) {
									return a
								}
								f.push(a)
							}
						}
						return f
					}
					if (Ba.test(b.type) && !c.support.checkOn) {
						return b.getAttribute("value") === null ? "on" : b.value
					}
					return (b.value || "").replace(Za, "")
				}
				return w
			}
			var o = c.isFunction(a);
			return this.each(function (k) {
				var n = c(this),
				r = a;
				if (this.nodeType === 1) {
					if (o) {
						r = a.call(this, k, n.val())
					}
					if (typeof r === "number") {
						r += ""
					}
					if (c.isArray(r) && Ba.test(this.type)) {
						this.checked = c.inArray(n.val(), r) >= 0
					} else {
						if (c.nodeName(this, "select")) {
							var u = c.makeArray(r);
							c("option", this).each(function () {
								this.selected = c.inArray(c(this).val(), u) >= 0
							});
							if (!u.length) {
								this.selectedIndex = -1
							}
						} else {
							this.value = r
						}
					}
				}
			})
		}
	});
	c.extend({
		attrFn : {
			val : true,
			css : true,
			html : true,
			text : true,
			data : true,
			width : true,
			height : true,
			offset : true
		},
		attr : function (a, b, d, f) {
			if (!a || a.nodeType === 3 || a.nodeType === 8) {
				return w
			}
			if (f && b in c.attrFn) {
				return c(a)[b](d)
			}
			f = a.nodeType !== 1 || !c.isXMLDoc(a);
			var e = d !== w;
			b = f && c.props[b] || b;
			if (a.nodeType === 1) {
				var j = $a.test(b);
				if (b in a && f && !j) {
					if (e) {
						b === "type" && ab.test(a.nodeName) && a.parentNode && c.error("type property can't be changed");
						a[b] = d
					}
					if (c.nodeName(a, "form") && a.getAttributeNode(b)) {
						return a.getAttributeNode(b).nodeValue
					}
					if (b === "tabIndex") {
						return (b = a.getAttributeNode("tabIndex")) && b.specified ? b.value : bb.test(a.nodeName) || cb.test(a.nodeName) && a.href ? 0 : w
					}
					return a[b]
				}
				if (!c.support.style && f && b === "style") {
					if (e) {
						a.style.cssText = "" + d
					}
					return a.style.cssText
				}
				e && a.setAttribute(b, "" + d);
				a = !c.support.hrefNormalized && f && j ? a.getAttribute(b, 2) : a.getAttribute(b);
				return a === null ? w : a
			}
			return c.style(a, b, d)
		}
	});
	var O = /\.(.*)$/,
	db = function (a) {
		return a.replace(/[^\w\s\.\|`]/g, function (b) {
			return "\\" + b
		})
	};
	c.event = {
		add : function (a, b, d, f) {
			if (!(a.nodeType === 3 || a.nodeType === 8)) {
				if (a.setInterval && a !== A && !a.frameElement) {
					a = A
				}
				var e,
				j;
				if (d.handler) {
					e = d;
					d = e.handler
				}
				if (!d.guid) {
					d.guid = c.guid++
				}
				if (j = c.data(a)) {
					var i = j.events = j.events || {},
					o = j.handle;
					if (!o) {
						j.handle = o = function () {
							return typeof c !== "undefined" && !c.event.triggered ? c.event.handle.apply(o.elem, arguments) : w
						}
					}
					o.elem = a;
					b = b.split(" ");
					for (var k, n = 0, r; k = b[n++]; ) {
						j = e ? c.extend({}, e) : {
							handler : d,
							data : f
						};
						if (k.indexOf(".") > -1) {
							r = k.split(".");
							k = r.shift();
							j.namespace = r.slice(0).sort().join(".")
						} else {
							r = [];
							j.namespace = ""
						}
						j.type = k;
						j.guid = d.guid;
						var u = i[k],
						z = c.event.special[k] || {};
						if (!u) {
							u = i[k] = [];
							if (!z.setup || z.setup.call(a, f, r, o) === false) {
								if (a.addEventListener) {
									a.addEventListener(k, o, false)
								} else {
									a.attachEvent && a.attachEvent("on" + k, o)
								}
							}
						}
						if (z.add) {
							z.add.call(a, j);
							if (!j.handler.guid) {
								j.handler.guid = d.guid
							}
						}
						u.push(j);
						c.event.global[k] = true
					}
					a = null
				}
			}
		},
		global : {},
		remove : function (a, b, d, f) {
			if (!(a.nodeType === 3 || a.nodeType === 8)) {
				var e,
				j = 0,
				i,
				o,
				k,
				n,
				r,
				u,
				z = c.data(a),
				C = z && z.events;
				if (z && C) {
					if (b && b.type) {
						d = b.handler;
						b = b.type
					}
					if (!b || typeof b === "string" && b.charAt(0) === ".") {
						b = b || "";
						for (e in C) {
							c.event.remove(a, e + b)
						}
					} else {
						for (b = b.split(" "); e = b[j++]; ) {
							n = e;
							i = e.indexOf(".") < 0;
							o = [];
							if (!i) {
								o = e.split(".");
								e = o.shift();
								k = new RegExp("(^|\\.)" + c.map(o.slice(0).sort(), db).join("\\.(?:.*\\.)?") + "(\\.|$)")
							}
							if (r = C[e]) {
								if (d) {
									n = c.event.special[e] || {};
									for (B = f || 0; B < r.length; B++) {
										u = r[B];
										if (d.guid === u.guid) {
											if (i || k.test(u.namespace)) {
												f == null && r.splice(B--, 1);
												n.remove && n.remove.call(a, u)
											}
											if (f != null) {
												break
											}
										}
									}
									if (r.length === 0 || f != null && r.length === 1) {
										if (!n.teardown || n.teardown.call(a, o) === false) {
											Ca(a, e, z.handle)
										}
										delete C[e]
									}
								} else {
									for (var B = 0; B < r.length; B++) {
										u = r[B];
										if (i || k.test(u.namespace)) {
											c.event.remove(a, n, u.handler, B);
											r.splice(B--, 1)
										}
									}
								}
							}
						}
						if (c.isEmptyObject(C)) {
							if (b = z.handle) {
								b.elem = null
							}
							delete z.events;
							delete z.handle;
							c.isEmptyObject(z) && c.removeData(a)
						}
					}
				}
			}
		},
		trigger : function (a, b, d, f) {
			var e = a.type || a;
			if (!f) {
				a = typeof a === "object" ? a[G] ? a : c.extend(c.Event(e), a) : c.Event(e);
				if (e.indexOf("!") >= 0) {
					a.type = e = e.slice(0, -1);
					a.exclusive = true
				}
				if (!d) {
					a.stopPropagation();
					c.event.global[e] && c.each(c.cache, function () {
						this.events && this.events[e] && c.event.trigger(a, b, this.handle.elem)
					})
				}
				if (!d || d.nodeType === 3 || d.nodeType === 8) {
					return w
				}
				a.result = w;
				a.target = d;
				b = c.makeArray(b);
				b.unshift(a)
			}
			a.currentTarget = d;
			(f = c.data(d, "handle")) && f.apply(d, b);
			f = d.parentNode || d.ownerDocument;
			try {
				if (!(d && d.nodeName && c.noData[d.nodeName.toLowerCase()])) {
					if (d["on" + e] && d["on" + e].apply(d, b) === false) {
						a.result = false
					}
				}
			} catch (j) {}

			if (!a.isPropagationStopped() && f) {
				c.event.trigger(a, b, f, true)
			} else {
				if (!a.isDefaultPrevented()) {
					f = a.target;
					var i,
					o = c.nodeName(f, "a") && e === "click",
					k = c.event.special[e] || {};
					if ((!k._default || k._default.call(d, a) === false) && !o && !(f && f.nodeName && c.noData[f.nodeName.toLowerCase()])) {
						try {
							if (f[e]) {
								if (i = f["on" + e]) {
									f["on" + e] = null
								}
								c.event.triggered = true;
								f[e]()
							}
						} catch (n) {}

						if (i) {
							f["on" + e] = i
						}
						c.event.triggered = false
					}
				}
			}
		},
		handle : function (a) {
			var b,
			d,
			f,
			e;
			a = arguments[0] = c.event.fix(a || A.event);
			a.currentTarget = this;
			b = a.type.indexOf(".") < 0 && !a.exclusive;
			if (!b) {
				d = a.type.split(".");
				a.type = d.shift();
				f = new RegExp("(^|\\.)" + d.slice(0).sort().join("\\.(?:.*\\.)?") + "(\\.|$)")
			}
			e = c.data(this, "events");
			d = e[a.type];
			if (e && d) {
				d = d.slice(0);
				e = 0;
				for (var j = d.length; e < j; e++) {
					var i = d[e];
					if (b || f.test(i.namespace)) {
						a.handler = i.handler;
						a.data = i.data;
						a.handleObj = i;
						i = i.handler.apply(this, arguments);
						if (i !== w) {
							a.result = i;
							if (i === false) {
								a.preventDefault();
								a.stopPropagation()
							}
						}
						if (a.isImmediatePropagationStopped()) {
							break
						}
					}
				}
			}
			return a.result
		},
		props : "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
		fix : function (a) {
			if (a[G]) {
				return a
			}
			var b = a;
			a = c.Event(b);
			for (var d = this.props.length, f; d; ) {
				f = this.props[--d];
				a[f] = b[f]
			}
			if (!a.target) {
				a.target = a.srcElement || s
			}
			if (a.target.nodeType === 3) {
				a.target = a.target.parentNode
			}
			if (!a.relatedTarget && a.fromElement) {
				a.relatedTarget = a.fromElement === a.target ? a.toElement : a.fromElement
			}
			if (a.pageX == null && a.clientX != null) {
				b = s.documentElement;
				d = s.body;
				a.pageX = a.clientX + (b && b.scrollLeft || d && d.scrollLeft || 0) - (b && b.clientLeft || d && d.clientLeft || 0);
				a.pageY = a.clientY + (b && b.scrollTop || d && d.scrollTop || 0) - (b && b.clientTop || d && d.clientTop || 0)
			}
			if (!a.which && (a.charCode || a.charCode === 0 ? a.charCode : a.keyCode)) {
				a.which = a.charCode || a.keyCode
			}
			if (!a.metaKey && a.ctrlKey) {
				a.metaKey = a.ctrlKey
			}
			if (!a.which && a.button !== w) {
				a.which = a.button & 1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0
			}
			return a
		},
		guid : 100000000,
		proxy : c.proxy,
		special : {
			ready : {
				setup : c.bindReady,
				teardown : c.noop
			},
			live : {
				add : function (a) {
					c.event.add(this, a.origType, c.extend({}, a, {
							handler : oa
						}))
				},
				remove : function (a) {
					var b = true,
					d = a.origType.replace(O, "");
					c.each(c.data(this, "events").live || [], function () {
						if (d === this.origType.replace(O, "")) {
							return b = false
						}
					});
					b && c.event.remove(this, a.origType, oa)
				}
			},
			beforeunload : {
				setup : function (a, b, d) {
					if (this.setInterval) {
						this.onbeforeunload = d
					}
					return false
				},
				teardown : function (a, b) {
					if (this.onbeforeunload === b) {
						this.onbeforeunload = null
					}
				}
			}
		}
	};
	var Ca = s.removeEventListener ? function (a, b, d) {
		a.removeEventListener(b, d, false)
	}
	 : function (a, b, d) {
		a.detachEvent("on" + b, d)
	};
	c.Event = function (a) {
		if (!this.preventDefault) {
			return new c.Event(a)
		}
		if (a && a.type) {
			this.originalEvent = a;
			this.type = a.type
		} else {
			this.type = a
		}
		this.timeStamp = J();
		this[G] = true
	};
	c.Event.prototype = {
		preventDefault : function () {
			this.isDefaultPrevented = Z;
			var a = this.originalEvent;
			if (a) {
				a.preventDefault && a.preventDefault();
				a.returnValue = false
			}
		},
		stopPropagation : function () {
			this.isPropagationStopped = Z;
			var a = this.originalEvent;
			if (a) {
				a.stopPropagation && a.stopPropagation();
				a.cancelBubble = true
			}
		},
		stopImmediatePropagation : function () {
			this.isImmediatePropagationStopped = Z;
			this.stopPropagation()
		},
		isDefaultPrevented : Y,
		isPropagationStopped : Y,
		isImmediatePropagationStopped : Y
	};
	var Da = function (a) {
		var b = a.relatedTarget;
		try {
			for (; b && b !== this; ) {
				b = b.parentNode
			}
			if (b !== this) {
				a.type = a.data;
				c.event.handle.apply(this, arguments)
			}
		} catch (d) {}

	},
	Ea = function (a) {
		a.type = a.data;
		c.event.handle.apply(this, arguments)
	};
	c.each({
		mouseenter : "mouseover",
		mouseleave : "mouseout"
	}, function (a, b) {
		c.event.special[a] = {
			setup : function (d) {
				c.event.add(this, b, d && d.selector ? Ea : Da, a)
			},
			teardown : function (d) {
				c.event.remove(this, b, d && d.selector ? Ea : Da)
			}
		}
	});
	if (!c.support.submitBubbles) {
		c.event.special.submit = {
			setup : function () {
				if (this.nodeName.toLowerCase() !== "form") {
					c.event.add(this, "click.specialSubmit", function (a) {
						var b = a.target,
						d = b.type;
						if ((d === "submit" || d === "image") && c(b).closest("form").length) {
							return na("submit", this, arguments)
						}
					});
					c.event.add(this, "keypress.specialSubmit", function (a) {
						var b = a.target,
						d = b.type;
						if ((d === "text" || d === "password") && c(b).closest("form").length && a.keyCode === 13) {
							return na("submit", this, arguments)
						}
					})
				} else {
					return false
				}
			},
			teardown : function () {
				c.event.remove(this, ".specialSubmit")
			}
		}
	}
	if (!c.support.changeBubbles) {
		var da = /textarea|input|select/i,
		ea,
		Fa = function (a) {
			var b = a.type,
			d = a.value;
			if (b === "radio" || b === "checkbox") {
				d = a.checked
			} else {
				if (b === "select-multiple") {
					d = a.selectedIndex > -1 ? c.map(a.options, function (f) {
							return f.selected
						}).join("-") : ""
				} else {
					if (a.nodeName.toLowerCase() === "select") {
						d = a.selectedIndex
					}
				}
			}
			return d
		},
		fa = function (a, b) {
			var d = a.target,
			f,
			e;
			if (!(!da.test(d.nodeName) || d.readOnly)) {
				f = c.data(d, "_change_data");
				e = Fa(d);
				if (a.type !== "focusout" || d.type !== "radio") {
					c.data(d, "_change_data", e)
				}
				if (!(f === w || e === f)) {
					if (f != null || e) {
						a.type = "change";
						return c.event.trigger(a, b, d)
					}
				}
			}
		};
		c.event.special.change = {
			filters : {
				focusout : fa,
				click : function (a) {
					var b = a.target,
					d = b.type;
					if (d === "radio" || d === "checkbox" || b.nodeName.toLowerCase() === "select") {
						return fa.call(this, a)
					}
				},
				keydown : function (a) {
					var b = a.target,
					d = b.type;
					if (a.keyCode === 13 && b.nodeName.toLowerCase() !== "textarea" || a.keyCode === 32 && (d === "checkbox" || d === "radio") || d === "select-multiple") {
						return fa.call(this, a)
					}
				},
				beforeactivate : function (a) {
					a = a.target;
					c.data(a, "_change_data", Fa(a))
				}
			},
			setup : function () {
				if (this.type === "file") {
					return false
				}
				for (var a in ea) {
					c.event.add(this, a + ".specialChange", ea[a])
				}
				return da.test(this.nodeName)
			},
			teardown : function () {
				c.event.remove(this, ".specialChange");
				return da.test(this.nodeName)
			}
		};
		ea = c.event.special.change.filters
	}
	s.addEventListener && c.each({
		focus : "focusin",
		blur : "focusout"
	}, function (a, b) {
		function d(f) {
			f = c.event.fix(f);
			f.type = b;
			return c.event.handle.call(this, f)
		}
		c.event.special[b] = {
			setup : function () {
				this.addEventListener(a, d, true)
			},
			teardown : function () {
				this.removeEventListener(a, d, true)
			}
		}
	});
	c.each(["bind", "one"], function (a, b) {
		c.fn[b] = function (d, f, e) {
			if (typeof d === "object") {
				for (var j in d) {
					this[b](j, f, d[j], e)
				}
				return this
			}
			if (c.isFunction(f)) {
				e = f;
				f = w
			}
			var i = b === "one" ? c.proxy(e, function (k) {
					c(this).unbind(k, i);
					return e.apply(this, arguments)
				}) : e;
			if (d === "unload" && b !== "one") {
				this.one(d, f, e)
			} else {
				j = 0;
				for (var o = this.length; j < o; j++) {
					c.event.add(this[j], d, i, f)
				}
			}
			return this
		}
	});
	c.fn.extend({
		unbind : function (a, b) {
			if (typeof a === "object" && !a.preventDefault) {
				for (var d in a) {
					this.unbind(d, a[d])
				}
			} else {
				d = 0;
				for (var f = this.length; d < f; d++) {
					c.event.remove(this[d], a, b)
				}
			}
			return this
		},
		delegate : function (a, b, d, f) {
			return this.live(b, d, f, a)
		},
		undelegate : function (a, b, d) {
			return arguments.length === 0 ? this.unbind("live") : this.die(b, null, d, a)
		},
		trigger : function (a, b) {
			return this.each(function () {
				c.event.trigger(a, b, this)
			})
		},
		triggerHandler : function (a, b) {
			if (this[0]) {
				a = c.Event(a);
				a.preventDefault();
				a.stopPropagation();
				c.event.trigger(a, b, this[0]);
				return a.result
			}
		},
		toggle : function (a) {
			for (var b = arguments, d = 1; d < b.length; ) {
				c.proxy(a, b[d++])
			}
			return this.click(c.proxy(a, function (f) {
					var e = (c.data(this, "lastToggle" + a.guid) || 0) % d;
					c.data(this, "lastToggle" + a.guid, e + 1);
					f.preventDefault();
					return b[e].apply(this, arguments) || false
				}))
		},
		hover : function (a, b) {
			return this.mouseenter(a).mouseleave(b || a)
		}
	});
	var Ga = {
		focus : "focusin",
		blur : "focusout",
		mouseenter : "mouseover",
		mouseleave : "mouseout"
	};
	c.each(["live", "die"], function (a, b) {
		c.fn[b] = function (d, f, e, j) {
			var i,
			o = 0,
			k,
			n,
			r = j || this.selector,
			u = j ? this : c(this.context);
			if (c.isFunction(f)) {
				e = f;
				f = w
			}
			for (d = (d || "").split(" "); (i = d[o++]) != null; ) {
				j = O.exec(i);
				k = "";
				if (j) {
					k = j[0];
					i = i.replace(O, "")
				}
				if (i === "hover") {
					d.push("mouseenter" + k, "mouseleave" + k)
				} else {
					n = i;
					if (i === "focus" || i === "blur") {
						d.push(Ga[i] + k);
						i += k
					} else {
						i = (Ga[i] || i) + k
					}
					b === "live" ? u.each(function () {
						c.event.add(this, pa(i, r), {
							data : f,
							selector : r,
							handler : e,
							origType : i,
							origHandler : e,
							preType : n
						})
					}) : u.unbind(pa(i, r), e)
				}
			}
			return this
		}
	});
	c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "), function (a, b) {
		c.fn[b] = function (d) {
			return d ? this.bind(b, d) : this.trigger(b)
		};
		if (c.attrFn) {
			c.attrFn[b] = true
		}
	});
	A.attachEvent && !A.addEventListener && A.attachEvent("onunload", function () {
		for (var a in c.cache) {
			if (c.cache[a].handle) {
				try {
					c.event.remove(c.cache[a].handle.elem)
				} catch (b) {}

			}
		}
	});
	(function () {
		function a(g) {
			for (var h = "", l, m = 0; g[m]; m++) {
				l = g[m];
				if (l.nodeType === 3 || l.nodeType === 4) {
					h += l.nodeValue
				} else {
					if (l.nodeType !== 8) {
						h += a(l.childNodes)
					}
				}
			}
			return h
		}
		function b(g, h, l, m, q, p) {
			q = 0;
			for (var v = m.length; q < v; q++) {
				var t = m[q];
				if (t) {
					t = t[g];
					for (var y = false; t; ) {
						if (t.sizcache === l) {
							y = m[t.sizset];
							break
						}
						if (t.nodeType === 1 && !p) {
							t.sizcache = l;
							t.sizset = q
						}
						if (t.nodeName.toLowerCase() === h) {
							y = t;
							break
						}
						t = t[g]
					}
					m[q] = y
				}
			}
		}
		function d(g, h, l, m, q, p) {
			q = 0;
			for (var v = m.length; q < v; q++) {
				var t = m[q];
				if (t) {
					t = t[g];
					for (var y = false; t; ) {
						if (t.sizcache === l) {
							y = m[t.sizset];
							break
						}
						if (t.nodeType === 1) {
							if (!p) {
								t.sizcache = l;
								t.sizset = q
							}
							if (typeof h !== "string") {
								if (t === h) {
									y = true;
									break
								}
							} else {
								if (k.filter(h, [t]).length > 0) {
									y = t;
									break
								}
							}
						}
						t = t[g]
					}
					m[q] = y
				}
			}
		}
		var f = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
		e = 0,
		j = Object.prototype.toString,
		i = false,
		o = true;
		[0, 0].sort(function () {
			o = false;
			return 0
		});
		var k = function (g, h, l, m) {
			l = l || [];
			var q = h = h || s;
			if (h.nodeType !== 1 && h.nodeType !== 9) {
				return []
			}
			if (!g || typeof g !== "string") {
				return l
			}
			for (var p = [], v, t, y, S, H = true, M = x(h), I = g; (f.exec(""), v = f.exec(I)) !== null; ) {
				I = v[3];
				p.push(v[1]);
				if (v[2]) {
					S = v[3];
					break
				}
			}
			if (p.length > 1 && r.exec(g)) {
				if (p.length === 2 && n.relative[p[0]]) {
					t = ga(p[0] + p[1], h)
				} else {
					for (t = n.relative[p[0]] ? [h] : k(p.shift(), h); p.length; ) {
						g = p.shift();
						if (n.relative[g]) {
							g += p.shift()
						}
						t = ga(g, t)
					}
				}
			} else {
				if (!m && p.length > 1 && h.nodeType === 9 && !M && n.match.ID.test(p[0]) && !n.match.ID.test(p[p.length - 1])) {
					v = k.find(p.shift(), h, M);
					h = v.expr ? k.filter(v.expr, v.set)[0] : v.set[0]
				}
				if (h) {
					v = m ? {
						expr : p.pop(),
						set : z(m)
					}
					 : k.find(p.pop(), p.length === 1 && (p[0] === "~" || p[0] === "+") && h.parentNode ? h.parentNode : h, M);
					t = v.expr ? k.filter(v.expr, v.set) : v.set;
					if (p.length > 0) {
						y = z(t)
					} else {
						H = false
					}
					for (; p.length; ) {
						var D = p.pop();
						v = D;
						if (n.relative[D]) {
							v = p.pop()
						} else {
							D = ""
						}
						if (v == null) {
							v = h
						}
						n.relative[D](y, v, M)
					}
				} else {
					y = []
				}
			}
			y || (y = t);
			y || k.error(D || g);
			if (j.call(y) === "[object Array]") {
				if (H) {
					if (h && h.nodeType === 1) {
						for (g = 0; y[g] != null; g++) {
							if (y[g] && (y[g] === true || y[g].nodeType === 1 && E(h, y[g]))) {
								l.push(t[g])
							}
						}
					} else {
						for (g = 0; y[g] != null; g++) {
							y[g] && y[g].nodeType === 1 && l.push(t[g])
						}
					}
				} else {
					l.push.apply(l, y)
				}
			} else {
				z(y, l)
			}
			if (S) {
				k(S, q, l, m);
				k.uniqueSort(l)
			}
			return l
		};
		k.uniqueSort = function (g) {
			if (B) {
				i = o;
				g.sort(B);
				if (i) {
					for (var h = 1; h < g.length; h++) {
						g[h] === g[h - 1] && g.splice(h--, 1)
					}
				}
			}
			return g
		};
		k.matches = function (g, h) {
			return k(g, null, null, h)
		};
		k.find = function (g, h, l) {
			var m,
			q;
			if (!g) {
				return []
			}
			for (var p = 0, v = n.order.length; p < v; p++) {
				var t = n.order[p];
				if (q = n.leftMatch[t].exec(g)) {
					var y = q[1];
					q.splice(1, 1);
					if (y.substr(y.length - 1) !== "\\") {
						q[1] = (q[1] || "").replace(/\\/g, "");
						m = n.find[t](q, h, l);
						if (m != null) {
							g = g.replace(n.match[t], "");
							break
						}
					}
				}
			}
			m || (m = h.getElementsByTagName("*"));
			return {
				set : m,
				expr : g
			}
		};
		k.filter = function (g, h, l, m) {
			for (var q = g, p = [], v = h, t, y, S = h && h[0] && x(h[0]); g && h.length; ) {
				for (var H in n.filter) {
					if ((t = n.leftMatch[H].exec(g)) != null && t[2]) {
						var M = n.filter[H],
						I,
						D;
						D = t[1];
						y = false;
						t.splice(1, 1);
						if (D.substr(D.length - 1) !== "\\") {
							if (v === p) {
								p = []
							}
							if (n.preFilter[H]) {
								if (t = n.preFilter[H](t, v, l, p, m, S)) {
									if (t === true) {
										continue
									}
								} else {
									y = I = true
								}
							}
							if (t) {
								for (var U = 0; (D = v[U]) != null; U++) {
									if (D) {
										I = M(D, t, U, v);
										var Ha = m^!!I;
										if (l && I != null) {
											if (Ha) {
												y = true
											} else {
												v[U] = false
											}
										} else {
											if (Ha) {
												p.push(D);
												y = true
											}
										}
									}
								}
							}
							if (I !== w) {
								l || (v = p);
								g = g.replace(n.match[H], "");
								if (!y) {
									return []
								}
								break
							}
						}
					}
				}
				if (g === q) {
					if (y == null) {
						k.error(g)
					} else {
						break
					}
				}
				q = g
			}
			return v
		};
		k.error = function (g) {
			throw "Syntax error, unrecognized expression: " + g
		};
		var n = k.selectors = {
			order : ["ID", "NAME", "TAG"],
			match : {
				ID : /#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
				CLASS : /\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
				NAME : /\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,
				ATTR : /\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
				TAG : /^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,
				CHILD : /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
				POS : /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
				PSEUDO : /:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
			},
			leftMatch : {},
			attrMap : {
				"class" : "className",
				"for" : "htmlFor"
			},
			attrHandle : {
				href : function (g) {
					return g.getAttribute("href")
				}
			},
			relative : {
				"+" : function (g, h) {
					var l = typeof h === "string",
					m = l && !/\W/.test(h);
					l = l && !m;
					if (m) {
						h = h.toLowerCase()
					}
					m = 0;
					for (var q = g.length, p; m < q; m++) {
						if (p = g[m]) {
							for (; (p = p.previousSibling) && p.nodeType !== 1; ) {}

							g[m] = l || p && p.nodeName.toLowerCase() === h ? p || false : p === h
						}
					}
					l && k.filter(h, g, true)
				},
				">" : function (g, h) {
					var l = typeof h === "string";
					if (l && !/\W/.test(h)) {
						h = h.toLowerCase();
						for (var m = 0, q = g.length; m < q; m++) {
							var p = g[m];
							if (p) {
								l = p.parentNode;
								g[m] = l.nodeName.toLowerCase() === h ? l : false
							}
						}
					} else {
						m = 0;
						for (q = g.length; m < q; m++) {
							if (p = g[m]) {
								g[m] = l ? p.parentNode : p.parentNode === h
							}
						}
						l && k.filter(h, g, true)
					}
				},
				"" : function (g, h, l) {
					var m = e++,
					q = d;
					if (typeof h === "string" && !/\W/.test(h)) {
						var p = h = h.toLowerCase();
						q = b
					}
					q("parentNode", h, m, g, p, l)
				},
				"~" : function (g, h, l) {
					var m = e++,
					q = d;
					if (typeof h === "string" && !/\W/.test(h)) {
						var p = h = h.toLowerCase();
						q = b
					}
					q("previousSibling", h, m, g, p, l)
				}
			},
			find : {
				ID : function (g, h, l) {
					if (typeof h.getElementById !== "undefined" && !l) {
						return (g = h.getElementById(g[1])) ? [g] : []
					}
				},
				NAME : function (g, h) {
					if (typeof h.getElementsByName !== "undefined") {
						var l = [];
						h = h.getElementsByName(g[1]);
						for (var m = 0, q = h.length; m < q; m++) {
							h[m].getAttribute("name") === g[1] && l.push(h[m])
						}
						return l.length === 0 ? null : l
					}
				},
				TAG : function (g, h) {
					return h.getElementsByTagName(g[1])
				}
			},
			preFilter : {
				CLASS : function (g, h, l, m, q, p) {
					g = " " + g[1].replace(/\\/g, "") + " ";
					if (p) {
						return g
					}
					p = 0;
					for (var v; (v = h[p]) != null; p++) {
						if (v) {
							if (q^(v.className && (" " + v.className + " ").replace(/[\t\n]/g, " ").indexOf(g) >= 0)) {
								l || m.push(v)
							} else {
								if (l) {
									h[p] = false
								}
							}
						}
					}
					return false
				},
				ID : function (g) {
					return g[1].replace(/\\/g, "")
				},
				TAG : function (g) {
					return g[1].toLowerCase()
				},
				CHILD : function (g) {
					if (g[1] === "nth") {
						var h = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(g[2] === "even" && "2n" || g[2] === "odd" && "2n+1" || !/\D/.test(g[2]) && "0n+" + g[2] || g[2]);
						g[2] = h[1] + (h[2] || 1) - 0;
						g[3] = h[3] - 0
					}
					g[0] = e++;
					return g
				},
				ATTR : function (g, h, l, m, q, p) {
					h = g[1].replace(/\\/g, "");
					if (!p && n.attrMap[h]) {
						g[1] = n.attrMap[h]
					}
					if (g[2] === "~=") {
						g[4] = " " + g[4] + " "
					}
					return g
				},
				PSEUDO : function (g, h, l, m, q) {
					if (g[1] === "not") {
						if ((f.exec(g[3]) || "").length > 1 || /^\w/.test(g[3])) {
							g[3] = k(g[3], null, null, h)
						} else {
							g = k.filter(g[3], h, l, true^q);
							l || m.push.apply(m, g);
							return false
						}
					} else {
						if (n.match.POS.test(g[0]) || n.match.CHILD.test(g[0])) {
							return true
						}
					}
					return g
				},
				POS : function (g) {
					g.unshift(true);
					return g
				}
			},
			filters : {
				enabled : function (g) {
					return g.disabled === false && g.type !== "hidden"
				},
				disabled : function (g) {
					return g.disabled === true
				},
				checked : function (g) {
					return g.checked === true
				},
				selected : function (g) {
					return g.selected === true
				},
				parent : function (g) {
					return !!g.firstChild
				},
				empty : function (g) {
					return !g.firstChild
				},
				has : function (g, h, l) {
					return !!k(l[3], g).length
				},
				header : function (g) {
					return /h\d/i.test(g.nodeName)
				},
				text : function (g) {
					return "text" === g.type
				},
				radio : function (g) {
					return "radio" === g.type
				},
				checkbox : function (g) {
					return "checkbox" === g.type
				},
				file : function (g) {
					return "file" === g.type
				},
				password : function (g) {
					return "password" === g.type
				},
				submit : function (g) {
					return "submit" === g.type
				},
				image : function (g) {
					return "image" === g.type
				},
				reset : function (g) {
					return "reset" === g.type
				},
				button : function (g) {
					return "button" === g.type || g.nodeName.toLowerCase() === "button"
				},
				input : function (g) {
					return /input|select|textarea|button/i.test(g.nodeName)
				}
			},
			setFilters : {
				first : function (g, h) {
					return h === 0
				},
				last : function (g, h, l, m) {
					return h === m.length - 1
				},
				even : function (g, h) {
					return h % 2 === 0
				},
				odd : function (g, h) {
					return h % 2 === 1
				},
				lt : function (g, h, l) {
					return h < l[3] - 0
				},
				gt : function (g, h, l) {
					return h > l[3] - 0
				},
				nth : function (g, h, l) {
					return l[3] - 0 === h
				},
				eq : function (g, h, l) {
					return l[3] - 0 === h
				}
			},
			filter : {
				PSEUDO : function (g, h, l, m) {
					var q = h[1],
					p = n.filters[q];
					if (p) {
						return p(g, l, h, m)
					} else {
						if (q === "contains") {
							return (g.textContent || g.innerText || a([g]) || "").indexOf(h[3]) >= 0
						} else {
							if (q === "not") {
								h = h[3];
								l = 0;
								for (m = h.length; l < m; l++) {
									if (h[l] === g) {
										return false
									}
								}
								return true
							} else {
								k.error("Syntax error, unrecognized expression: " + q)
							}
						}
					}
				},
				CHILD : function (g, h) {
					var l = h[1],
					m = g;
					switch (l) {
					case "only":
					case "first":
						for (; m = m.previousSibling; ) {
							if (m.nodeType === 1) {
								return false
							}
						}
						if (l === "first") {
							return true
						}
						m = g;
					case "last":
						for (; m = m.nextSibling; ) {
							if (m.nodeType === 1) {
								return false
							}
						}
						return true;
					case "nth":
						l = h[2];
						var q = h[3];
						if (l === 1 && q === 0) {
							return true
						}
						h = h[0];
						var p = g.parentNode;
						if (p && (p.sizcache !== h || !g.nodeIndex)) {
							var v = 0;
							for (m = p.firstChild; m; m = m.nextSibling) {
								if (m.nodeType === 1) {
									m.nodeIndex = ++v
								}
							}
							p.sizcache = h
						}
						g = g.nodeIndex - q;
						return l === 0 ? g === 0 : g % l === 0 && g / l >= 0
					}
				},
				ID : function (g, h) {
					return g.nodeType === 1 && g.getAttribute("id") === h
				},
				TAG : function (g, h) {
					return h === "*" && g.nodeType === 1 || g.nodeName.toLowerCase() === h
				},
				CLASS : function (g, h) {
					return (" " + (g.className || g.getAttribute("class")) + " ").indexOf(h) > -1
				},
				ATTR : function (g, h) {
					var l = h[1];
					g = n.attrHandle[l] ? n.attrHandle[l](g) : g[l] != null ? g[l] : g.getAttribute(l);
					l = g + "";
					var m = h[2];
					h = h[4];
					return g == null ? m === "!=" : m === "=" ? l === h : m === "*=" ? l.indexOf(h) >= 0 : m === "~=" ? (" " + l + " ").indexOf(h) >= 0 : !h ? l && g !== false : m === "!=" ? l !== h : m === "^=" ? l.indexOf(h) === 0 : m === "$=" ? l.substr(l.length - h.length) === h : m === "|=" ? l === h || l.substr(0, h.length + 1) === h + "-" : false
				},
				POS : function (g, h, l, m) {
					var q = n.setFilters[h[2]];
					if (q) {
						return q(g, l, h, m)
					}
				}
			}
		},
		r = n.match.POS;
		for (var u in n.match) {
			n.match[u] = new RegExp(n.match[u].source + /(?![^\[]*\])(?![^\(]*\))/.source);
			n.leftMatch[u] = new RegExp(/(^(?:.|\r|\n)*?)/.source + n.match[u].source.replace(/\\(\d+)/g, function (g, h) {
						return "\\" + (h - 0 + 1)
					}))
		}
		var z = function (g, h) {
			g = Array.prototype.slice.call(g, 0);
			if (h) {
				h.push.apply(h, g);
				return h
			}
			return g
		};
		try {
			Array.prototype.slice.call(s.documentElement.childNodes, 0)
		} catch (C) {
			z = function (g, h) {
				h = h || [];
				if (j.call(g) === "[object Array]") {
					Array.prototype.push.apply(h, g)
				} else {
					if (typeof g.length === "number") {
						for (var l = 0, m = g.length; l < m; l++) {
							h.push(g[l])
						}
					} else {
						for (l = 0; g[l]; l++) {
							h.push(g[l])
						}
					}
				}
				return h
			}
		}
		var B;
		if (s.documentElement.compareDocumentPosition) {
			B = function (g, h) {
				if (!g.compareDocumentPosition || !h.compareDocumentPosition) {
					if (g == h) {
						i = true
					}
					return g.compareDocumentPosition ? -1 : 1
				}
				g = g.compareDocumentPosition(h) & 4 ? -1 : g === h ? 0 : 1;
				if (g === 0) {
					i = true
				}
				return g
			}
		} else {
			if ("sourceIndex" in s.documentElement) {
				B = function (g, h) {
					if (!g.sourceIndex || !h.sourceIndex) {
						if (g == h) {
							i = true
						}
						return g.sourceIndex ? -1 : 1
					}
					g = g.sourceIndex - h.sourceIndex;
					if (g === 0) {
						i = true
					}
					return g
				}
			} else {
				if (s.createRange) {
					B = function (g, h) {
						if (!g.ownerDocument || !h.ownerDocument) {
							if (g == h) {
								i = true
							}
							return g.ownerDocument ? -1 : 1
						}
						var l = g.ownerDocument.createRange(),
						m = h.ownerDocument.createRange();
						l.setStart(g, 0);
						l.setEnd(g, 0);
						m.setStart(h, 0);
						m.setEnd(h, 0);
						g = l.compareBoundaryPoints(Range.START_TO_END, m);
						if (g === 0) {
							i = true
						}
						return g
					}
				}
			}
		}
		(function () {
			var g = s.createElement("div"),
			h = "script" + (new Date).getTime();
			g.innerHTML = "<a name='" + h + "'/>";
			var l = s.documentElement;
			l.insertBefore(g, l.firstChild);
			if (s.getElementById(h)) {
				n.find.ID = function (m, q, p) {
					if (typeof q.getElementById !== "undefined" && !p) {
						return (q = q.getElementById(m[1])) ? q.id === m[1] || typeof q.getAttributeNode !== "undefined" && q.getAttributeNode("id").nodeValue === m[1] ? [q] : w : []
					}
				};
				n.filter.ID = function (m, q) {
					var p = typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id");
					return m.nodeType === 1 && p && p.nodeValue === q
				}
			}
			l.removeChild(g);
			l = g = null
		})();
		(function () {
			var g = s.createElement("div");
			g.appendChild(s.createComment(""));
			if (g.getElementsByTagName("*").length > 0) {
				n.find.TAG = function (h, l) {
					l = l.getElementsByTagName(h[1]);
					if (h[1] === "*") {
						h = [];
						for (var m = 0; l[m]; m++) {
							l[m].nodeType === 1 && h.push(l[m])
						}
						l = h
					}
					return l
				}
			}
			g.innerHTML = "<a href='#'></a>";
			if (g.firstChild && typeof g.firstChild.getAttribute !== "undefined" && g.firstChild.getAttribute("href") !== "#") {
				n.attrHandle.href = function (h) {
					return h.getAttribute("href", 2)
				}
			}
			g = null
		})();
		s.querySelectorAll && function () {
			var g = k,
			h = s.createElement("div");
			h.innerHTML = "<p class='TEST'></p>";
			if (!(h.querySelectorAll && h.querySelectorAll(".TEST").length === 0)) {
				k = function (m, q, p, v) {
					q = q || s;
					if (!v && q.nodeType === 9 && !x(q)) {
						try {
							return z(q.querySelectorAll(m), p)
						} catch (t) {}

					}
					return g(m, q, p, v)
				};
				for (var l in g) {
					k[l] = g[l]
				}
				h = null
			}
		}
		();
		(function () {
			var g = s.createElement("div");
			g.innerHTML = "<div class='test e'></div><div class='test'></div>";
			if (!(!g.getElementsByClassName || g.getElementsByClassName("e").length === 0)) {
				g.lastChild.className = "e";
				if (g.getElementsByClassName("e").length !== 1) {
					n.order.splice(1, 0, "CLASS");
					n.find.CLASS = function (h, l, m) {
						if (typeof l.getElementsByClassName !== "undefined" && !m) {
							return l.getElementsByClassName(h[1])
						}
					};
					g = null
				}
			}
		})();
		var E = s.compareDocumentPosition ? function (g, h) {
			return !!(g.compareDocumentPosition(h) & 16)
		}
		 : function (g, h) {
			return g !== h && (g.contains ? g.contains(h) : true)
		},
		x = function (g) {
			return (g = (g ? g.ownerDocument || g : 0).documentElement) ? g.nodeName !== "HTML" : false
		},
		ga = function (g, h) {
			var l = [],
			m = "",
			q;
			for (h = h.nodeType ? [h] : h; q = n.match.PSEUDO.exec(g); ) {
				m += q[0];
				g = g.replace(n.match.PSEUDO, "")
			}
			g = n.relative[g] ? g + "*" : g;
			q = 0;
			for (var p = h.length; q < p; q++) {
				k(g, h[q], l)
			}
			return k.filter(m, l)
		};
		c.find = k;
		c.expr = k.selectors;
		c.expr[":"] = c.expr.filters;
		c.unique = k.uniqueSort;
		c.text = a;
		c.isXMLDoc = x;
		c.contains = E
	})();
	var eb = /Until$/,
	fb = /^(?:parents|prevUntil|prevAll)/,
	gb = /,/;
	R = Array.prototype.slice;
	var Ia = function (a, b, d) {
		if (c.isFunction(b)) {
			return c.grep(a, function (e, j) {
				return !!b.call(e, j, e) === d
			})
		} else {
			if (b.nodeType) {
				return c.grep(a, function (e) {
					return e === b === d
				})
			} else {
				if (typeof b === "string") {
					var f = c.grep(a, function (e) {
							return e.nodeType === 1
						});
					if (Ua.test(b)) {
						return c.filter(b, f, !d)
					} else {
						b = c.filter(b, f)
					}
				}
			}
		}
		return c.grep(a, function (e) {
			return c.inArray(e, b) >= 0 === d
		})
	};
	c.fn.extend({
		find : function (a) {
			for (var b = this.pushStack("", "find", a), d = 0, f = 0, e = this.length; f < e; f++) {
				d = b.length;
				c.find(a, this[f], b);
				if (f > 0) {
					for (var j = d; j < b.length; j++) {
						for (var i = 0; i < d; i++) {
							if (b[i] === b[j]) {
								b.splice(j--, 1);
								break
							}
						}
					}
				}
			}
			return b
		},
		has : function (a) {
			var b = c(a);
			return this.filter(function () {
				for (var d = 0, f = b.length; d < f; d++) {
					if (c.contains(this, b[d])) {
						return true
					}
				}
			})
		},
		not : function (a) {
			return this.pushStack(Ia(this, a, false), "not", a)
		},
		filter : function (a) {
			return this.pushStack(Ia(this, a, true), "filter", a)
		},
		is : function (a) {
			return !!a && c.filter(a, this).length > 0
		},
		closest : function (a, b) {
			if (c.isArray(a)) {
				var d = [],
				f = this[0],
				e,
				j = {},
				i;
				if (f && a.length) {
					e = 0;
					for (var o = a.length; e < o; e++) {
						i = a[e];
						j[i] || (j[i] = c.expr.match.POS.test(i) ? c(i, b || this.context) : i)
					}
					for (; f && f.ownerDocument && f !== b; ) {
						for (i in j) {
							e = j[i];
							if (e.jquery ? e.index(f) > -1 : c(f).is(e)) {
								d.push({
									selector : i,
									elem : f
								});
								delete j[i]
							}
						}
						f = f.parentNode
					}
				}
				return d
			}
			var k = c.expr.match.POS.test(a) ? c(a, b || this.context) : null;
			return this.map(function (n, r) {
				for (; r && r.ownerDocument && r !== b; ) {
					if (k ? k.index(r) > -1 : c(r).is(a)) {
						return r
					}
					r = r.parentNode
				}
				return null
			})
		},
		index : function (a) {
			if (!a || typeof a === "string") {
				return c.inArray(this[0], a ? c(a) : this.parent().children())
			}
			return c.inArray(a.jquery ? a[0] : a, this)
		},
		add : function (a, b) {
			a = typeof a === "string" ? c(a, b || this.context) : c.makeArray(a);
			b = c.merge(this.get(), a);
			return this.pushStack(qa(a[0]) || qa(b[0]) ? b : c.unique(b))
		},
		andSelf : function () {
			return this.add(this.prevObject)
		}
	});
	c.each({
		parent : function (a) {
			return (a = a.parentNode) && a.nodeType !== 11 ? a : null
		},
		parents : function (a) {
			return c.dir(a, "parentNode")
		},
		parentsUntil : function (a, b, d) {
			return c.dir(a, "parentNode", d)
		},
		next : function (a) {
			return c.nth(a, 2, "nextSibling")
		},
		prev : function (a) {
			return c.nth(a, 2, "previousSibling")
		},
		nextAll : function (a) {
			return c.dir(a, "nextSibling")
		},
		prevAll : function (a) {
			return c.dir(a, "previousSibling")
		},
		nextUntil : function (a, b, d) {
			return c.dir(a, "nextSibling", d)
		},
		prevUntil : function (a, b, d) {
			return c.dir(a, "previousSibling", d)
		},
		siblings : function (a) {
			return c.sibling(a.parentNode.firstChild, a)
		},
		children : function (a) {
			return c.sibling(a.firstChild)
		},
		contents : function (a) {
			return c.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : c.makeArray(a.childNodes)
		}
	}, function (a, b) {
		c.fn[a] = function (d, f) {
			var e = c.map(this, b, d);
			eb.test(a) || (f = d);
			if (f && typeof f === "string") {
				e = c.filter(f, e)
			}
			e = this.length > 1 ? c.unique(e) : e;
			if ((this.length > 1 || gb.test(f)) && fb.test(a)) {
				e = e.reverse()
			}
			return this.pushStack(e, a, R.call(arguments).join(","))
		}
	});
	c.extend({
		filter : function (a, b, d) {
			if (d) {
				a = ":not(" + a + ")"
			}
			return c.find.matches(a, b)
		},
		dir : function (a, b, d) {
			var f = [];
			for (a = a[b]; a && a.nodeType !== 9 && (d === w || a.nodeType !== 1 || !c(a).is(d)); ) {
				a.nodeType === 1 && f.push(a);
				a = a[b]
			}
			return f
		},
		nth : function (a, b, d) {
			b = b || 1;
			for (var f = 0; a; a = a[d]) {
				if (a.nodeType === 1 && ++f === b) {
					break
				}
			}
			return a
		},
		sibling : function (a, b) {
			for (var d = []; a; a = a.nextSibling) {
				a.nodeType === 1 && a !== b && d.push(a)
			}
			return d
		}
	});
	var Ja = / jQuery\d+="(?:\d+|null)"/g,
	V = /^\s+/,
	Ka = /(<([\w:]+)[^>]*?)\/>/g,
	hb = /^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i,
	La = /<([\w:]+)/,
	ib = /<tbody/i,
	jb = /<|&#?\w+;/,
	ta = /<script|<object|<embed|<option|<style/i,
	ua = /checked\s*(?:[^=]|=\s*.checked.)/i,
	Ma = function (a, b, d) {
		return hb.test(d) ? a : b + "></" + d + ">"
	},
	F = {
		option : [1, "<select multiple='multiple'>", "</select>"],
		legend : [1, "<fieldset>", "</fieldset>"],
		thead : [1, "<table>", "</table>"],
		tr : [2, "<table><tbody>", "</tbody></table>"],
		td : [3, "<table><tbody><tr>", "</tr></tbody></table>"],
		col : [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
		area : [1, "<map>", "</map>"],
		_default : [0, "", ""]
	};
	F.optgroup = F.option;
	F.tbody = F.tfoot = F.colgroup = F.caption = F.thead;
	F.th = F.td;
	if (!c.support.htmlSerialize) {
		F._default = [1, "div<div>", "</div>"]
	}
	c.fn.extend({
		text : function (a) {
			if (c.isFunction(a)) {
				return this.each(function (b) {
					var d = c(this);
					d.text(a.call(this, b, d.text()))
				})
			}
			if (typeof a !== "object" && a !== w) {
				return this.empty().append((this[0] && this[0].ownerDocument || s).createTextNode(a))
			}
			return c.text(this)
		},
		wrapAll : function (a) {
			if (c.isFunction(a)) {
				return this.each(function (d) {
					c(this).wrapAll(a.call(this, d))
				})
			}
			if (this[0]) {
				var b = c(a, this[0].ownerDocument).eq(0).clone(true);
				this[0].parentNode && b.insertBefore(this[0]);
				b.map(function () {
					for (var d = this; d.firstChild && d.firstChild.nodeType === 1; ) {
						d = d.firstChild
					}
					return d
				}).append(this)
			}
			return this
		},
		wrapInner : function (a) {
			if (c.isFunction(a)) {
				return this.each(function (b) {
					c(this).wrapInner(a.call(this, b))
				})
			}
			return this.each(function () {
				var b = c(this),
				d = b.contents();
				d.length ? d.wrapAll(a) : b.append(a)
			})
		},
		wrap : function (a) {
			return this.each(function () {
				c(this).wrapAll(a)
			})
		},
		unwrap : function () {
			return this.parent().each(function () {
				c.nodeName(this, "body") || c(this).replaceWith(this.childNodes)
			}).end()
		},
		append : function () {
			return this.domManip(arguments, true, function (a) {
				this.nodeType === 1 && this.appendChild(a)
			})
		},
		prepend : function () {
			return this.domManip(arguments, true, function (a) {
				this.nodeType === 1 && this.insertBefore(a, this.firstChild)
			})
		},
		before : function () {
			if (this[0] && this[0].parentNode) {
				return this.domManip(arguments, false, function (b) {
					this.parentNode.insertBefore(b, this)
				})
			} else {
				if (arguments.length) {
					var a = c(arguments[0]);
					a.push.apply(a, this.toArray());
					return this.pushStack(a, "before", arguments)
				}
			}
		},
		after : function () {
			if (this[0] && this[0].parentNode) {
				return this.domManip(arguments, false, function (b) {
					this.parentNode.insertBefore(b, this.nextSibling)
				})
			} else {
				if (arguments.length) {
					var a = this.pushStack(this, "after", arguments);
					a.push.apply(a, c(arguments[0]).toArray());
					return a
				}
			}
		},
		remove : function (a, b) {
			for (var d = 0, f; (f = this[d]) != null; d++) {
				if (!a || c.filter(a, [f]).length) {
					if (!b && f.nodeType === 1) {
						c.cleanData(f.getElementsByTagName("*"));
						c.cleanData([f])
					}
					f.parentNode && f.parentNode.removeChild(f)
				}
			}
			return this
		},
		empty : function () {
			for (var a = 0, b; (b = this[a]) != null; a++) {
				for (b.nodeType === 1 && c.cleanData(b.getElementsByTagName("*")); b.firstChild; ) {
					b.removeChild(b.firstChild)
				}
			}
			return this
		},
		clone : function (a) {
			var b = this.map(function () {
					if (!c.support.noCloneEvent && !c.isXMLDoc(this)) {
						var d = this.outerHTML,
						f = this.ownerDocument;
						if (!d) {
							d = f.createElement("div");
							d.appendChild(this.cloneNode(true));
							d = d.innerHTML
						}
						return c.clean([d.replace(Ja, "").replace(/=([^="'>\s]+\/)>/g, '="$1">').replace(V, "")], f)[0]
					} else {
						return this.cloneNode(true)
					}
				});
			if (a === true) {
				ra(this, b);
				ra(this.find("*"), b.find("*"))
			}
			return b
		},
		html : function (a) {
			if (a === w) {
				return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(Ja, "") : null
			} else {
				if (typeof a === "string" && !ta.test(a) && (c.support.leadingWhitespace || !V.test(a)) && !F[(La.exec(a) || ["", ""])[1].toLowerCase()]) {
					a = a.replace(Ka, Ma);
					try {
						for (var b = 0, d = this.length; b < d; b++) {
							if (this[b].nodeType === 1) {
								c.cleanData(this[b].getElementsByTagName("*"));
								this[b].innerHTML = a
							}
						}
					} catch (f) {
						this.empty().append(a)
					}
				} else {
					c.isFunction(a) ? this.each(function (e) {
						var j = c(this),
						i = j.html();
						j.empty().append(function () {
							return a.call(this, e, i)
						})
					}) : this.empty().append(a)
				}
			}
			return this
		},
		replaceWith : function (a) {
			if (this[0] && this[0].parentNode) {
				if (c.isFunction(a)) {
					return this.each(function (b) {
						var d = c(this),
						f = d.html();
						d.replaceWith(a.call(this, b, f))
					})
				}
				if (typeof a !== "string") {
					a = c(a).detach()
				}
				return this.each(function () {
					var b = this.nextSibling,
					d = this.parentNode;
					c(this).remove();
					b ? c(b).before(a) : c(d).append(a)
				})
			} else {
				return this.pushStack(c(c.isFunction(a) ? a() : a), "replaceWith", a)
			}
		},
		detach : function (a) {
			return this.remove(a, true)
		},
		domManip : function (a, b, d) {
			function f(u) {
				return c.nodeName(u, "table") ? u.getElementsByTagName("tbody")[0] || u.appendChild(u.ownerDocument.createElement("tbody")) : u
			}
			var e,
			j,
			i = a[0],
			o = [],
			k;
			if (!c.support.checkClone && arguments.length === 3 && typeof i === "string" && ua.test(i)) {
				return this.each(function () {
					c(this).domManip(a, b, d, true)
				})
			}
			if (c.isFunction(i)) {
				return this.each(function (u) {
					var z = c(this);
					a[0] = i.call(this, u, b ? z.html() : w);
					z.domManip(a, b, d)
				})
			}
			if (this[0]) {
				e = i && i.parentNode;
				e = c.support.parentNode && e && e.nodeType === 11 && e.childNodes.length === this.length ? {
					fragment : e
				}
				 : sa(a, this, o);
				k = e.fragment;
				if (j = k.childNodes.length === 1 ? (k = k.firstChild) : k.firstChild) {
					b = b && c.nodeName(j, "tr");
					for (var n = 0, r = this.length; n < r; n++) {
						d.call(b ? f(this[n], j) : this[n], n > 0 || e.cacheable || this.length > 1 ? k.cloneNode(true) : k)
					}
				}
				o.length && c.each(o, Qa)
			}
			return this
		}
	});
	c.fragments = {};
	c.each({
		appendTo : "append",
		prependTo : "prepend",
		insertBefore : "before",
		insertAfter : "after",
		replaceAll : "replaceWith"
	}, function (a, b) {
		c.fn[a] = function (d) {
			var f = [];
			d = c(d);
			var e = this.length === 1 && this[0].parentNode;
			if (e && e.nodeType === 11 && e.childNodes.length === 1 && d.length === 1) {
				d[b](this[0]);
				return this
			} else {
				e = 0;
				for (var j = d.length; e < j; e++) {
					var i = (e > 0 ? this.clone(true) : this).get();
					c.fn[b].apply(c(d[e]), i);
					f = f.concat(i)
				}
				return this.pushStack(f, a, d.selector)
			}
		}
	});
	c.extend({
		clean : function (a, b, d, f) {
			b = b || s;
			if (typeof b.createElement === "undefined") {
				b = b.ownerDocument || b[0] && b[0].ownerDocument || s
			}
			for (var e = [], j = 0, i; (i = a[j]) != null; j++) {
				if (typeof i === "number") {
					i += ""
				}
				if (i) {
					if (typeof i === "string" && !jb.test(i)) {
						i = b.createTextNode(i)
					} else {
						if (typeof i === "string") {
							i = i.replace(Ka, Ma);
							var o = (La.exec(i) || ["", ""])[1].toLowerCase(),
							k = F[o] || F._default,
							n = k[0],
							r = b.createElement("div");
							for (r.innerHTML = k[1] + i + k[2]; n--; ) {
								r = r.lastChild
							}
							if (!c.support.tbody) {
								n = ib.test(i);
								o = o === "table" && !n ? r.firstChild && r.firstChild.childNodes : k[1] === "<table>" && !n ? r.childNodes : [];
								for (k = o.length - 1; k >= 0; --k) {
									c.nodeName(o[k], "tbody") && !o[k].childNodes.length && o[k].parentNode.removeChild(o[k])
								}
							}
							!c.support.leadingWhitespace && V.test(i) && r.insertBefore(b.createTextNode(V.exec(i)[0]), r.firstChild);
							i = r.childNodes
						}
					}
					if (i.nodeType) {
						e.push(i)
					} else {
						e = c.merge(e, i)
					}
				}
			}
			if (d) {
				for (j = 0; e[j]; j++) {
					if (f && c.nodeName(e[j], "script") && (!e[j].type || e[j].type.toLowerCase() === "text/javascript")) {
						f.push(e[j].parentNode ? e[j].parentNode.removeChild(e[j]) : e[j])
					} else {
						e[j].nodeType === 1 && e.splice.apply(e, [j + 1, 0].concat(c.makeArray(e[j].getElementsByTagName("script"))));
						d.appendChild(e[j])
					}
				}
			}
			return e
		},
		cleanData : function (a) {
			for (var b, d, f = c.cache, e = c.event.special, j = c.support.deleteExpando, i = 0, o; (o = a[i]) != null; i++) {
				if (d = o[c.expando]) {
					b = f[d];
					if (b.events) {
						for (var k in b.events) {
							e[k] ? c.event.remove(o, k) : Ca(o, k, b.handle)
						}
					}
					if (j) {
						delete o[c.expando]
					} else {
						o.removeAttribute && o.removeAttribute(c.expando)
					}
					delete f[d]
				}
			}
		}
	});
	var kb = /z-?index|font-?weight|opacity|zoom|line-?height/i,
	Na = /alpha\([^)]*\)/,
	Oa = /opacity=([^)]*)/,
	ha = /float/i,
	ia = /-([a-z])/ig,
	lb = /([A-Z])/g,
	mb = /^-?\d+(?:px)?$/i,
	nb = /^-?\d/,
	ob = {
		position : "absolute",
		visibility : "hidden",
		display : "block"
	},
	pb = ["Left", "Right"],
	qb = ["Top", "Bottom"],
	rb = s.defaultView && s.defaultView.getComputedStyle,
	Pa = c.support.cssFloat ? "cssFloat" : "styleFloat",
	ja = function (a, b) {
		return b.toUpperCase()
	};
	c.fn.css = function (a, b) {
		return X(this, a, b, true, function (d, f, e) {
			if (e === w) {
				return c.curCSS(d, f)
			}
			if (typeof e === "number" && !kb.test(f)) {
				e += "px"
			}
			c.style(d, f, e)
		})
	};
	c.extend({
		style : function (a, b, d) {
			if (!a || a.nodeType === 3 || a.nodeType === 8) {
				return w
			}
			if ((b === "width" || b === "height") && parseFloat(d) < 0) {
				d = w
			}
			var f = a.style || a,
			e = d !== w;
			if (!c.support.opacity && b === "opacity") {
				if (e) {
					f.zoom = 1;
					b = parseInt(d, 10) + "" === "NaN" ? "" : "alpha(opacity=" + d * 100 + ")";
					a = f.filter || c.curCSS(a, "filter") || "";
					f.filter = Na.test(a) ? a.replace(Na, b) : b
				}
				return f.filter && f.filter.indexOf("opacity=") >= 0 ? parseFloat(Oa.exec(f.filter)[1]) / 100 + "" : ""
			}
			if (ha.test(b)) {
				b = Pa
			}
			b = b.replace(ia, ja);
			if (e) {
				f[b] = d
			}
			return f[b]
		},
		css : function (a, b, d, f) {
			if (b === "width" || b === "height") {
				var e,
				j = b === "width" ? pb : qb;
				function i() {
					e = b === "width" ? a.offsetWidth : a.offsetHeight;
					f !== "border" && c.each(j, function () {
						f || (e -= parseFloat(c.curCSS(a, "padding" + this, true)) || 0);
						if (f === "margin") {
							e += parseFloat(c.curCSS(a, "margin" + this, true)) || 0
						} else {
							e -= parseFloat(c.curCSS(a, "border" + this + "Width", true)) || 0
						}
					})
				}
				a.offsetWidth !== 0 ? i() : c.swap(a, ob, i);
				return Math.max(0, Math.round(e))
			}
			return c.curCSS(a, b, d)
		},
		curCSS : function (a, b, d) {
			var f,
			e = a.style;
			if (!c.support.opacity && b === "opacity" && a.currentStyle) {
				f = Oa.test(a.currentStyle.filter || "") ? parseFloat(RegExp.$1) / 100 + "" : "";
				return f === "" ? "1" : f
			}
			if (ha.test(b)) {
				b = Pa
			}
			if (!d && e && e[b]) {
				f = e[b]
			} else {
				if (rb) {
					if (ha.test(b)) {
						b = "float"
					}
					b = b.replace(lb, "-$1").toLowerCase();
					e = a.ownerDocument.defaultView;
					if (!e) {
						return null
					}
					if (a = e.getComputedStyle(a, null)) {
						f = a.getPropertyValue(b)
					}
					if (b === "opacity" && f === "") {
						f = "1"
					}
				} else {
					if (a.currentStyle) {
						d = b.replace(ia, ja);
						f = a.currentStyle[b] || a.currentStyle[d];
						if (!mb.test(f) && nb.test(f)) {
							b = e.left;
							var j = a.runtimeStyle.left;
							a.runtimeStyle.left = a.currentStyle.left;
							e.left = d === "fontSize" ? "1em" : f || 0;
							f = e.pixelLeft + "px";
							e.left = b;
							a.runtimeStyle.left = j
						}
					}
				}
			}
			return f
		},
		swap : function (a, b, d) {
			var f = {};
			for (var e in b) {
				f[e] = a.style[e];
				a.style[e] = b[e]
			}
			d.call(a);
			for (e in b) {
				a.style[e] = f[e]
			}
		}
	});
	if (c.expr && c.expr.filters) {
		c.expr.filters.hidden = function (a) {
			var b = a.offsetWidth,
			d = a.offsetHeight,
			f = a.nodeName.toLowerCase() === "tr";
			return b === 0 && d === 0 && !f ? true : b > 0 && d > 0 && !f ? false : c.curCSS(a, "display") === "none"
		};
		c.expr.filters.visible = function (a) {
			return !c.expr.filters.hidden(a)
		}
	}
	var sb = J(),
	tb = /<script(.|\s)*?\/script>/gi,
	ub = /select|textarea/i,
	vb = /color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i,
	N = /=\?(&|$)/,
	ka = /\?/,
	wb = /(\?|&)_=.*?(&|$)/,
	xb = /^(\w+:)?\/\/([^\/?#]+)/,
	yb = /%20/g,
	zb = c.fn.load;
	c.fn.extend({
		load : function (a, b, d) {
			if (typeof a !== "string") {
				return zb.call(this, a)
			} else {
				if (!this.length) {
					return this
				}
			}
			var f = a.indexOf(" ");
			if (f >= 0) {
				var e = a.slice(f, a.length);
				a = a.slice(0, f)
			}
			f = "GET";
			if (b) {
				if (c.isFunction(b)) {
					d = b;
					b = null
				} else {
					if (typeof b === "object") {
						b = c.param(b, c.ajaxSettings.traditional);
						f = "POST"
					}
				}
			}
			var j = this;
			c.ajax({
				url : a,
				type : f,
				dataType : "html",
				data : b,
				complete : function (i, o) {
					if (o === "success" || o === "notmodified") {
						j.html(e ? c("<div />").append(i.responseText.replace(tb, "")).find(e) : i.responseText)
					}
					d && j.each(d, [i.responseText, o, i])
				}
			});
			return this
		},
		serialize : function () {
			return c.param(this.serializeArray())
		},
		serializeArray : function () {
			return this.map(function () {
				return this.elements ? c.makeArray(this.elements) : this
			}).filter(function () {
				return this.name && !this.disabled && (this.checked || ub.test(this.nodeName) || vb.test(this.type))
			}).map(function (a, b) {
				a = c(this).val();
				return a == null ? null : c.isArray(a) ? c.map(a, function (d) {
					return {
						name : b.name,
						value : d
					}
				}) : {
					name : b.name,
					value : a
				}
			}).get()
		}
	});
	c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
		c.fn[b] = function (d) {
			return this.bind(b, d)
		}
	});
	c.extend({
		get : function (a, b, d, f) {
			if (c.isFunction(b)) {
				f = f || d;
				d = b;
				b = null
			}
			return c.ajax({
				type : "GET",
				url : a,
				data : b,
				success : d,
				dataType : f
			})
		},
		getScript : function (a, b) {
			return c.get(a, null, b, "script")
		},
		getJSON : function (a, b, d) {
			return c.get(a, b, d, "json")
		},
		post : function (a, b, d, f) {
			if (c.isFunction(b)) {
				f = f || d;
				d = b;
				b = {}

			}
			return c.ajax({
				type : "POST",
				url : a,
				data : b,
				success : d,
				dataType : f
			})
		},
		ajaxSetup : function (a) {
			c.extend(c.ajaxSettings, a)
		},
		ajaxSettings : {
			url : location.href,
			global : true,
			type : "GET",
			contentType : "application/x-www-form-urlencoded",
			processData : true,
			async : true,
			xhr : A.XMLHttpRequest && (A.location.protocol !== "file:" || !A.ActiveXObject) ? function () {
				return new A.XMLHttpRequest
			}
			 : function () {
				try {
					return new A.ActiveXObject("Microsoft.XMLHTTP")
				} catch (a) {}

			},
			accepts : {
				xml : "application/xml, text/xml",
				html : "text/html",
				script : "text/javascript, application/javascript",
				json : "application/json, text/javascript",
				text : "text/plain",
				_default : "*/*"
			}
		},
		lastModified : {},
		etag : {},
		ajax : function (a) {
			function b() {
				e.success && e.success.call(k, o, i, x);
				e.global && f("ajaxSuccess", [x, e])
			}
			function d() {
				e.complete && e.complete.call(k, x, i);
				e.global && f("ajaxComplete", [x, e]);
				e.global && !--c.active && c.event.trigger("ajaxStop")
			}
			function f(q, p) {
				(e.context ? c(e.context) : c.event).trigger(q, p)
			}
			var e = c.extend(true, {}, c.ajaxSettings, a),
			j,
			i,
			o,
			k = a && a.context || e,
			n = e.type.toUpperCase();
			if (e.data && e.processData && typeof e.data !== "string") {
				e.data = c.param(e.data, e.traditional)
			}
			if (e.dataType === "jsonp") {
				if (n === "GET") {
					N.test(e.url) || (e.url += (ka.test(e.url) ? "&" : "?") + (e.jsonp || "callback") + "=?")
				} else {
					if (!e.data || !N.test(e.data)) {
						e.data = (e.data ? e.data + "&" : "") + (e.jsonp || "callback") + "=?"
					}
				}
				e.dataType = "json"
			}
			if (e.dataType === "json" && (e.data && N.test(e.data) || N.test(e.url))) {
				j = e.jsonpCallback || "jsonp" + sb++;
				if (e.data) {
					e.data = (e.data + "").replace(N, "=" + j + "$1")
				}
				e.url = e.url.replace(N, "=" + j + "$1");
				e.dataType = "script";
				A[j] = A[j] || function (q) {
					o = q;
					b();
					d();
					A[j] = w;
					try {
						delete A[j]
					} catch (p) {}

					z && z.removeChild(C)
				}
			}
			if (e.dataType === "script" && e.cache === null) {
				e.cache = false
			}
			if (e.cache === false && n === "GET") {
				var r = J(),
				u = e.url.replace(wb, "$1_=" + r + "$2");
				e.url = u + (u === e.url ? (ka.test(e.url) ? "&" : "?") + "_=" + r : "")
			}
			if (e.data && n === "GET") {
				e.url += (ka.test(e.url) ? "&" : "?") + e.data
			}
			e.global && !c.active++ && c.event.trigger("ajaxStart");
			r = (r = xb.exec(e.url)) && (r[1] && r[1] !== location.protocol || r[2] !== location.host);
			if (e.dataType === "script" && n === "GET" && r) {
				var z = s.getElementsByTagName("head")[0] || s.documentElement,
				C = s.createElement("script");
				C.src = e.url;
				if (e.scriptCharset) {
					C.charset = e.scriptCharset
				}
				if (!j) {
					var B = false;
					C.onload = C.onreadystatechange = function () {
						if (!B && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
							B = true;
							b();
							d();
							C.onload = C.onreadystatechange = null;
							z && C.parentNode && z.removeChild(C)
						}
					}
				}
				z.insertBefore(C, z.firstChild);
				return w
			}
			var E = false,
			x = e.xhr();
			if (x) {
				e.username ? x.open(n, e.url, e.async, e.username, e.password) : x.open(n, e.url, e.async);
				try {
					if (e.data || a && a.contentType) {
						x.setRequestHeader("Content-Type", e.contentType)
					}
					if (e.ifModified) {
						c.lastModified[e.url] && x.setRequestHeader("If-Modified-Since", c.lastModified[e.url]);
						c.etag[e.url] && x.setRequestHeader("If-None-Match", c.etag[e.url])
					}
					r || x.setRequestHeader("X-Requested-With", "XMLHttpRequest");
					x.setRequestHeader("Accept", e.dataType && e.accepts[e.dataType] ? e.accepts[e.dataType] + ", */*" : e.accepts._default)
				} catch (ga) {}

				if (e.beforeSend && e.beforeSend.call(k, x, e) === false) {
					e.global && !--c.active && c.event.trigger("ajaxStop");
					x.abort();
					return false
				}
				e.global && f("ajaxSend", [x, e]);
				var g = x.onreadystatechange = function (q) {
					if (!x || x.readyState === 0 || q === "abort") {
						E || d();
						E = true;
						if (x) {
							x.onreadystatechange = c.noop
						}
					} else {
						if (!E && x && (x.readyState === 4 || q === "timeout")) {
							E = true;
							x.onreadystatechange = c.noop;
							i = q === "timeout" ? "timeout" : !c.httpSuccess(x) ? "error" : e.ifModified && c.httpNotModified(x, e.url) ? "notmodified" : "success";
							var p;
							if (i === "success") {
								try {
									o = c.httpData(x, e.dataType, e)
								} catch (v) {
									i = "parsererror";
									p = v
								}
							}
							if (i === "success" || i === "notmodified") {
								j || b()
							} else {
								c.handleError(e, x, i, p)
							}
							d();
							q === "timeout" && x.abort();
							if (e.async) {
								x = null
							}
						}
					}
				};
				try {
					var h = x.abort;
					x.abort = function () {
						x && h.call(x);
						g("abort")
					}
				} catch (l) {}

				e.async && e.timeout > 0 && setTimeout(function () {
					x && !E && g("timeout")
				}, e.timeout);
				try {
					x.send(n === "POST" || n === "PUT" || n === "DELETE" ? e.data : null)
				} catch (m) {
					c.handleError(e, x, null, m);
					d()
				}
				e.async || g();
				return x
			}
		},
		handleError : function (a, b, d, f) {
			if (a.error) {
				a.error.call(a.context || a, b, d, f)
			}
			if (a.global) {
				(a.context ? c(a.context) : c.event).trigger("ajaxError", [b, a, f])
			}
		},
		active : 0,
		httpSuccess : function (a) {
			try {
				return !a.status && location.protocol === "file:" || a.status >= 200 && a.status < 300 || a.status === 304 || a.status === 1223 || a.status === 0
			} catch (b) {}

			return false
		},
		httpNotModified : function (a, b) {
			var d = a.getResponseHeader("Last-Modified"),
			f = a.getResponseHeader("Etag");
			if (d) {
				c.lastModified[b] = d
			}
			if (f) {
				c.etag[b] = f
			}
			return a.status === 304 || a.status === 0
		},
		httpData : function (a, b, d) {
			var f = a.getResponseHeader("content-type") || "",
			e = b === "xml" || !b && f.indexOf("xml") >= 0;
			a = e ? a.responseXML : a.responseText;
			e && a.documentElement.nodeName === "parsererror" && c.error("parsererror");
			if (d && d.dataFilter) {
				a = d.dataFilter(a, b)
			}
			if (typeof a === "string") {
				if (b === "json" || !b && f.indexOf("json") >= 0) {
					a = c.parseJSON(a)
				} else {
					if (b === "script" || !b && f.indexOf("javascript") >= 0) {
						c.globalEval(a)
					}
				}
			}
			return a
		},
		param : function (a, b) {
			function d(i, o) {
				if (c.isArray(o)) {
					c.each(o, function (k, n) {
						b || /\[\]$/.test(i) ? f(i, n) : d(i + "[" + (typeof n === "object" || c.isArray(n) ? k : "") + "]", n)
					})
				} else {
					!b && o != null && typeof o === "object" ? c.each(o, function (k, n) {
						d(i + "[" + k + "]", n)
					}) : f(i, o)
				}
			}
			function f(i, o) {
				o = c.isFunction(o) ? o() : o;
				e[e.length] = encodeURIComponent(i) + "=" + encodeURIComponent(o)
			}
			var e = [];
			if (b === w) {
				b = c.ajaxSettings.traditional
			}
			if (c.isArray(a) || a.jquery) {
				c.each(a, function () {
					f(this.name, this.value)
				})
			} else {
				for (var j in a) {
					d(j, a[j])
				}
			}
			return e.join("&").replace(yb, "+")
		}
	});
	var la = {},
	Ab = /toggle|show|hide/,
	Bb = /^([+-]=)?([\d+-.]+)(.*)$/,
	W,
	va = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]];
	c.fn.extend({
		show : function (a, b) {
			if (a || a === 0) {
				return this.animate(K("show", 3), a, b)
			} else {
				a = 0;
				for (b = this.length; a < b; a++) {
					var d = c.data(this[a], "olddisplay");
					this[a].style.display = d || "";
					if (c.css(this[a], "display") === "none") {
						d = this[a].nodeName;
						var f;
						if (la[d]) {
							f = la[d]
						} else {
							var e = c("<" + d + " />").appendTo("body");
							f = e.css("display");
							if (f === "none") {
								f = "block"
							}
							e.remove();
							la[d] = f
						}
						c.data(this[a], "olddisplay", f)
					}
				}
				a = 0;
				for (b = this.length; a < b; a++) {
					this[a].style.display = c.data(this[a], "olddisplay") || ""
				}
				return this
			}
		},
		hide : function (a, b) {
			if (a || a === 0) {
				return this.animate(K("hide", 3), a, b)
			} else {
				a = 0;
				for (b = this.length; a < b; a++) {
					var d = c.data(this[a], "olddisplay");
					!d && d !== "none" && c.data(this[a], "olddisplay", c.css(this[a], "display"))
				}
				a = 0;
				for (b = this.length; a < b; a++) {
					this[a].style.display = "none"
				}
				return this
			}
		},
		_toggle : c.fn.toggle,
		toggle : function (a, b) {
			var d = typeof a === "boolean";
			if (c.isFunction(a) && c.isFunction(b)) {
				this._toggle.apply(this, arguments)
			} else {
				a == null || d ? this.each(function () {
					var f = d ? a : c(this).is(":hidden");
					c(this)[f ? "show" : "hide"]()
				}) : this.animate(K("toggle", 3), a, b)
			}
			return this
		},
		fadeTo : function (a, b, d) {
			return this.filter(":hidden").css("opacity", 0).show().end().animate({
				opacity : b
			}, a, d)
		},
		animate : function (a, b, d, f) {
			var e = c.speed(b, d, f);
			if (c.isEmptyObject(a)) {
				return this.each(e.complete)
			}
			return this[e.queue === false ? "each" : "queue"](function () {
				var j = c.extend({}, e),
				i,
				o = this.nodeType === 1 && c(this).is(":hidden"),
				k = this;
				for (i in a) {
					var n = i.replace(ia, ja);
					if (i !== n) {
						a[n] = a[i];
						delete a[i];
						i = n
					}
					if (a[i] === "hide" && o || a[i] === "show" && !o) {
						return j.complete.call(this)
					}
					if ((i === "height" || i === "width") && this.style) {
						j.display = c.css(this, "display");
						j.overflow = this.style.overflow
					}
					if (c.isArray(a[i])) {
						(j.specialEasing = j.specialEasing || {})[i] = a[i][1];
						a[i] = a[i][0]
					}
				}
				if (j.overflow != null) {
					this.style.overflow = "hidden"
				}
				j.curAnim = c.extend({}, a);
				c.each(a, function (r, u) {
					var z = new c.fx(k, j, r);
					if (Ab.test(u)) {
						z[u === "toggle" ? o ? "show" : "hide" : u](a)
					} else {
						var C = Bb.exec(u),
						B = z.cur(true) || 0;
						if (C) {
							u = parseFloat(C[2]);
							var E = C[3] || "px";
							if (E !== "px") {
								k.style[r] = (u || 1) + E;
								B = (u || 1) / z.cur(true) * B;
								k.style[r] = B + E
							}
							if (C[1]) {
								u = (C[1] === "-=" ? -1 : 1) * u + B
							}
							z.custom(B, u, E)
						} else {
							z.custom(B, u, "")
						}
					}
				});
				return true
			})
		},
		stop : function (a, b) {
			var d = c.timers;
			a && this.queue([]);
			this.each(function () {
				for (var f = d.length - 1; f >= 0; f--) {
					if (d[f].elem === this) {
						b && d[f](true);
						d.splice(f, 1)
					}
				}
			});
			b || this.dequeue();
			return this
		}
	});
	c.each({
		slideDown : K("show", 1),
		slideUp : K("hide", 1),
		slideToggle : K("toggle", 1),
		fadeIn : {
			opacity : "show"
		},
		fadeOut : {
			opacity : "hide"
		}
	}, function (a, b) {
		c.fn[a] = function (d, f) {
			return this.animate(b, d, f)
		}
	});
	c.extend({
		speed : function (a, b, d) {
			var f = a && typeof a === "object" ? a : {
				complete : d || !d && b || c.isFunction(a) && a,
				duration : a,
				easing : d && b || b && !c.isFunction(b) && b
			};
			f.duration = c.fx.off ? 0 : typeof f.duration === "number" ? f.duration : c.fx.speeds[f.duration] || c.fx.speeds._default;
			f.old = f.complete;
			f.complete = function () {
				f.queue !== false && c(this).dequeue();
				c.isFunction(f.old) && f.old.call(this)
			};
			return f
		},
		easing : {
			linear : function (a, b, d, f) {
				return d + f * a
			},
			swing : function (a, b, d, f) {
				return (-Math.cos(a * Math.PI) / 2 + 0.5) * f + d
			}
		},
		timers : [],
		fx : function (a, b, d) {
			this.options = b;
			this.elem = a;
			this.prop = d;
			if (!b.orig) {
				b.orig = {}

			}
		}
	});
	c.fx.prototype = {
		update : function () {
			this.options.step && this.options.step.call(this.elem, this.now, this);
			(c.fx.step[this.prop] || c.fx.step._default)(this);
			if ((this.prop === "height" || this.prop === "width") && this.elem.style) {
				this.elem.style.display = "block"
			}
		},
		cur : function (a) {
			if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
				return this.elem[this.prop]
			}
			return (a = parseFloat(c.css(this.elem, this.prop, a))) && a > -10000 ? a : parseFloat(c.curCSS(this.elem, this.prop)) || 0
		},
		custom : function (a, b, d) {
			function f(j) {
				return e.step(j)
			}
			this.startTime = J();
			this.start = a;
			this.end = b;
			this.unit = d || this.unit || "px";
			this.now = this.start;
			this.pos = this.state = 0;
			var e = this;
			f.elem = this.elem;
			if (f() && c.timers.push(f) && !W) {
				W = setInterval(c.fx.tick, 13)
			}
		},
		show : function () {
			this.options.orig[this.prop] = c.style(this.elem, this.prop);
			this.options.show = true;
			this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());
			c(this.elem).show()
		},
		hide : function () {
			this.options.orig[this.prop] = c.style(this.elem, this.prop);
			this.options.hide = true;
			this.custom(this.cur(), 0)
		},
		step : function (a) {
			var b = J(),
			d = true;
			if (a || b >= this.options.duration + this.startTime) {
				this.now = this.end;
				this.pos = this.state = 1;
				this.update();
				this.options.curAnim[this.prop] = true;
				for (var f in this.options.curAnim) {
					if (this.options.curAnim[f] !== true) {
						d = false
					}
				}
				if (d) {
					if (this.options.display != null) {
						this.elem.style.overflow = this.options.overflow;
						a = c.data(this.elem, "olddisplay");
						this.elem.style.display = a ? a : this.options.display;
						if (c.css(this.elem, "display") === "none") {
							this.elem.style.display = "block"
						}
					}
					this.options.hide && c(this.elem).hide();
					if (this.options.hide || this.options.show) {
						for (var e in this.options.curAnim) {
							c.style(this.elem, e, this.options.orig[e])
						}
					}
					this.options.complete.call(this.elem)
				}
				return false
			} else {
				e = b - this.startTime;
				this.state = e / this.options.duration;
				a = this.options.easing || (c.easing.swing ? "swing" : "linear");
				this.pos = c.easing[this.options.specialEasing && this.options.specialEasing[this.prop] || a](this.state, e, 0, 1, this.options.duration);
				this.now = this.start + (this.end - this.start) * this.pos;
				this.update()
			}
			return true
		}
	};
	c.extend(c.fx, {
		tick : function () {
			for (var a = c.timers, b = 0; b < a.length; b++) {
				a[b]() || a.splice(b--, 1)
			}
			a.length || c.fx.stop()
		},
		stop : function () {
			clearInterval(W);
			W = null
		},
		speeds : {
			slow : 600,
			fast : 200,
			_default : 400
		},
		step : {
			opacity : function (a) {
				c.style(a.elem, "opacity", a.now)
			},
			_default : function (a) {
				if (a.elem.style && a.elem.style[a.prop] != null) {
					a.elem.style[a.prop] = (a.prop === "width" || a.prop === "height" ? Math.max(0, a.now) : a.now) + a.unit
				} else {
					a.elem[a.prop] = a.now
				}
			}
		}
	});
	if (c.expr && c.expr.filters) {
		c.expr.filters.animated = function (a) {
			return c.grep(c.timers, function (b) {
				return a === b.elem
			}).length
		}
	}
	c.fn.offset = "getBoundingClientRect" in s.documentElement ? function (a) {
		var b = this[0];
		if (a) {
			return this.each(function (e) {
				c.offset.setOffset(this, a, e)
			})
		}
		if (!b || !b.ownerDocument) {
			return null
		}
		if (b === b.ownerDocument.body) {
			return c.offset.bodyOffset(b)
		}
		var d = b.getBoundingClientRect(),
		f = b.ownerDocument;
		b = f.body;
		f = f.documentElement;
		return {
			top : d.top + (self.pageYOffset || c.support.boxModel && f.scrollTop || b.scrollTop) - (f.clientTop || b.clientTop || 0),
			left : d.left + (self.pageXOffset || c.support.boxModel && f.scrollLeft || b.scrollLeft) - (f.clientLeft || b.clientLeft || 0)
		}
	}
	 : function (a) {
		var b = this[0];
		if (a) {
			return this.each(function (r) {
				c.offset.setOffset(this, a, r)
			})
		}
		if (!b || !b.ownerDocument) {
			return null
		}
		if (b === b.ownerDocument.body) {
			return c.offset.bodyOffset(b)
		}
		c.offset.initialize();
		var d = b.offsetParent,
		f = b,
		e = b.ownerDocument,
		j,
		i = e.documentElement,
		o = e.body;
		f = (e = e.defaultView) ? e.getComputedStyle(b, null) : b.currentStyle;
		for (var k = b.offsetTop, n = b.offsetLeft; (b = b.parentNode) && b !== o && b !== i; ) {
			if (c.offset.supportsFixedPosition && f.position === "fixed") {
				break
			}
			j = e ? e.getComputedStyle(b, null) : b.currentStyle;
			k -= b.scrollTop;
			n -= b.scrollLeft;
			if (b === d) {
				k += b.offsetTop;
				n += b.offsetLeft;
				if (c.offset.doesNotAddBorder && !(c.offset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(b.nodeName))) {
					k += parseFloat(j.borderTopWidth) || 0;
					n += parseFloat(j.borderLeftWidth) || 0
				}
				f = d;
				d = b.offsetParent
			}
			if (c.offset.subtractsBorderForOverflowNotVisible && j.overflow !== "visible") {
				k += parseFloat(j.borderTopWidth) || 0;
				n += parseFloat(j.borderLeftWidth) || 0
			}
			f = j
		}
		if (f.position === "relative" || f.position === "static") {
			k += o.offsetTop;
			n += o.offsetLeft
		}
		if (c.offset.supportsFixedPosition && f.position === "fixed") {
			k += Math.max(i.scrollTop, o.scrollTop);
			n += Math.max(i.scrollLeft, o.scrollLeft)
		}
		return {
			top : k,
			left : n
		}
	};
	c.offset = {
		initialize : function () {
			var a = s.body,
			b = s.createElement("div"),
			d,
			f,
			e,
			j = parseFloat(c.curCSS(a, "marginTop", true)) || 0;
			c.extend(b.style, {
				position : "absolute",
				top : 0,
				left : 0,
				margin : 0,
				border : 0,
				width : "1px",
				height : "1px",
				visibility : "hidden"
			});
			b.innerHTML = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
			a.insertBefore(b, a.firstChild);
			d = b.firstChild;
			f = d.firstChild;
			e = d.nextSibling.firstChild.firstChild;
			this.doesNotAddBorder = f.offsetTop !== 5;
			this.doesAddBorderForTableAndCells = e.offsetTop === 5;
			f.style.position = "fixed";
			f.style.top = "20px";
			this.supportsFixedPosition = f.offsetTop === 20 || f.offsetTop === 15;
			f.style.position = f.style.top = "";
			d.style.overflow = "hidden";
			d.style.position = "relative";
			this.subtractsBorderForOverflowNotVisible = f.offsetTop === -5;
			this.doesNotIncludeMarginInBodyOffset = a.offsetTop !== j;
			a.removeChild(b);
			c.offset.initialize = c.noop
		},
		bodyOffset : function (a) {
			var b = a.offsetTop,
			d = a.offsetLeft;
			c.offset.initialize();
			if (c.offset.doesNotIncludeMarginInBodyOffset) {
				b += parseFloat(c.curCSS(a, "marginTop", true)) || 0;
				d += parseFloat(c.curCSS(a, "marginLeft", true)) || 0
			}
			return {
				top : b,
				left : d
			}
		},
		setOffset : function (a, b, d) {
			if (/static/.test(c.curCSS(a, "position"))) {
				a.style.position = "relative"
			}
			var f = c(a),
			e = f.offset(),
			j = parseInt(c.curCSS(a, "top", true), 10) || 0,
			i = parseInt(c.curCSS(a, "left", true), 10) || 0;
			if (c.isFunction(b)) {
				b = b.call(a, d, e)
			}
			d = {
				top : b.top - e.top + j,
				left : b.left - e.left + i
			};
			"using" in b ? b.using.call(a, d) : f.css(d)
		}
	};
	c.fn.extend({
		position : function () {
			if (!this[0]) {
				return null
			}
			var a = this[0],
			b = this.offsetParent(),
			d = this.offset(),
			f = /^body|html$/i.test(b[0].nodeName) ? {
				top : 0,
				left : 0
			}
			 : b.offset();
			d.top -= parseFloat(c.curCSS(a, "marginTop", true)) || 0;
			d.left -= parseFloat(c.curCSS(a, "marginLeft", true)) || 0;
			f.top += parseFloat(c.curCSS(b[0], "borderTopWidth", true)) || 0;
			f.left += parseFloat(c.curCSS(b[0], "borderLeftWidth", true)) || 0;
			return {
				top : d.top - f.top,
				left : d.left - f.left
			}
		},
		offsetParent : function () {
			return this.map(function () {
				for (var a = this.offsetParent || s.body; a && !/^body|html$/i.test(a.nodeName) && c.css(a, "position") === "static"; ) {
					a = a.offsetParent
				}
				return a
			})
		}
	});
	c.each(["Left", "Top"], function (a, b) {
		var d = "scroll" + b;
		c.fn[d] = function (f) {
			var e = this[0],
			j;
			if (!e) {
				return null
			}
			if (f !== w) {
				return this.each(function () {
					if (j = wa(this)) {
						j.scrollTo(!a ? f : c(j).scrollLeft(), a ? f : c(j).scrollTop())
					} else {
						this[d] = f
					}
				})
			} else {
				return (j = wa(e)) ? "pageXOffset" in j ? j[a ? "pageYOffset" : "pageXOffset"] : c.support.boxModel && j.document.documentElement[d] || j.document.body[d] : e[d]
			}
		}
	});
	c.each(["Height", "Width"], function (a, b) {
		var d = b.toLowerCase();
		c.fn["inner" + b] = function () {
			return this[0] ? c.css(this[0], d, false, "padding") : null
		};
		c.fn["outer" + b] = function (f) {
			return this[0] ? c.css(this[0], d, false, f ? "margin" : "border") : null
		};
		c.fn[d] = function (f) {
			var e = this[0];
			if (!e) {
				return f == null ? null : this
			}
			if (c.isFunction(f)) {
				return this.each(function (j) {
					var i = c(this);
					i[d](f.call(this, j, i[d]()))
				})
			}
			return "scrollTo" in e && e.document ? e.document.compatMode === "CSS1Compat" && e.document.documentElement["client" + b] || e.document.body["client" + b] : e.nodeType === 9 ? Math.max(e.documentElement["client" + b], e.body["scroll" + b], e.documentElement["scroll" + b], e.body["offset" + b], e.documentElement["offset" + b]) : f === w ? c.css(e, d) : this.css(d, typeof f === "string" ? f : f + "px")
		}
	});
	A.jQuery = A.$ = c
})(window);
jQuery.fn.extend({
	selectbox : function (options) {
		return this.each(function () {
			new jQuery.SelectBox(this, options)
		})
	}
});
jQuery.fn.extend({
	selectOption : function (val) {
		$(this).each(function () {
			$(this).val(val);
			var parentObj = $(this).parent(".selectspan");
			var inputObj = parentObj.children("input");
			var selectLiId = inputObj.attr("id") + "_" + val;
			var selectLi = parentObj.find("#" + selectLiId);
			parentObj.find("li").removeClass("selected");
			selectLi.addClass("selected");
			inputObj.val(selectLi.html())
		})
	}
});
jQuery.fn.extend({
	getSelect : function () {
		var parentObj = $(this).parent(".selectspan");
		var inputObj = parentObj.children("input");
		return inputObj.val()
	}
});
jQuery.fn.extend({
	addOption : function (val, nameStr) {
		$(this).each(function () {
			var value = $(this).val();
			$(this).append('<option value="' + val + '">' + nameStr + "</option>");
			var newSelect = $(this).clone();
			var parentObj = $(this).parent(".selectspan");
			parentObj.html("");
			parentObj.append(newSelect);
			newSelect.selectbox();
			newSelect.selectOption(value)
		})
	}
});
if (!window.console) {
	var console = {
		log : function (msg) {}

	}
}
jQuery.SelectBox = function (selectobj, options) {
	var opt = options || {};
	opt.inputClass = opt.inputClass || "selectbox";
	opt.containerClass = opt.containerClass || "selectbox-wrapper";
	opt.hoverClass = opt.hoverClass || "current";
	opt.currentClass = opt.selectedClass || "selected";
	opt.debug = opt.debug || false;
	opt.unableClass = opt.unableClass || "unable";
	var elm_id = selectobj.id;
	var active = 0;
	var inFocus = false;
	var hasfocus = 0;
	var hasClick = -1;
	var $select = $(selectobj);
	var $container = setupContainer(opt);
	var $input = setupInput(opt);
	$select.hide().before($input).before($container);
	init();
	$input.click(function () {
		$container.toggle()
	}).focus(function () {
		$(this).addClass("selectfocus");
		if ($container.not(":visible") && hasClick < 0) {
			inFocus = true;
			$container.slideDown(200)
		} else {
			if ($container.not(":visible") && hasClick > 0) {
				inFocus = false;
				hasClick = -1
			}
		}
	}).keydown(function (event) {
		switch (event.keyCode) {
		case 38:
			event.preventDefault();
			moveSelect(-1);
			break;
		case 40:
			event.preventDefault();
			moveSelect(1);
			break;
		case 13:
			event.preventDefault();
			$("li." + opt.hoverClass).trigger("click");
			break;
		case 27:
			hideMe();
			break
		}
	}).blur(function () {
		$(this).removeClass("selectfocus");
		if ($container.is(":visible") && hasfocus > 0) {
			if (opt.debug) {
				console.log("container visible and has focus")
			}
		} else {
			if ($.browser.msie) {
				try {
					if (document.activeElement.getAttribute("id").indexOf("_container") == -1) {
						hideMe()
					} else {
						$input.focus()
					}
				} catch (e) {}

			} else {
				hideMe()
			}
		}
	});
	$container.mouseover(function () {
		hasfocus = 1;
		$container.focus()
	}).mouseout(function () {
		if ($container.is(":visible")) {
			hasfocus = -1;
			$input.focus()
		}
	});
	function hideMe() {
		hasfocus = 0;
		$container.hide()
	}
	function init() {
		$container.append(getSelectOptions($input.attr("id"))).hide();
		var width = $input.css("width");
		var realwidth = parseInt(width) + 20;
		$container.width(realwidth + "px");
		if ($container.find("li").length >= 9) {
			$container.height("200px")
		}
	}
	function setupContainer(options) {
		var container = document.createElement("div");
		$container = $(container);
		$container.attr("id", elm_id + "_container");
		$container.addClass(options.containerClass);
		return $container
	}
	function setupInput(options) {
		var input = document.createElement("input");
		var $input = $(input);
		$input.attr("id", elm_id + "_input");
		$input.attr("type", "text");
		$input.addClass(options.inputClass);
		$input.attr("autocomplete", "off");
		$input.attr("readonly", "readonly");
		$input.attr("tabIndex", $select.attr("tabindex"));
		return $input
	}
	function moveSelect(step) {
		var lis = $("li", $container);
		if (!lis || lis.length == 0) {
			return false
		}
		active += step;
		if (active < 0) {
			active = lis.size() - 1
		} else {
			if (active > lis.size() - 1) {
				active = 0
			}
		}
		scroll(lis, active);
		lis.removeClass(opt.hoverClass);
		$(lis[active]).addClass(opt.hoverClass)
	}
	function scroll(list, active) {
		var el = $(list[active]).get(0);
		var list = $container.get(0);
		if (el.offsetTop + el.offsetHeight > list.scrollTop + list.clientHeight) {
			list.scrollTop = el.offsetTop + el.offsetHeight - list.clientHeight
		} else {
			if (el.offsetTop < list.scrollTop) {
				list.scrollTop = el.offsetTop
			}
		}
	}
	function setCurrent() {
		var li = $("li." + opt.currentClass, $container).get(0);
		var ar = ("" + li.id).substr($input.attr("id").length + 1);
		var el = ar;
		$select.val(el);
		$input.val($(li).html());
		return true
	}
	function getCurrentSelected() {
		return $select.val()
	}
	function getCurrentValue() {
		return $input.val()
	}
	function getSelectOptions(parentid) {
		var select_options = new Array();
		var ul = document.createElement("ul");
		$select.children("option").each(function () {
			var li = document.createElement("li");
			li.setAttribute("id", parentid + "_" + $(this).val());
			li.innerHTML = $(this).html();
			$(li).addClass($(this).attr("class"));
			if ($(this).is(":selected")) {
				$input.val($(this).html());
				$(li).addClass(opt.currentClass)
			}
			ul.appendChild(li);
			$(li).mouseover(function (event) {
				if ($(this).hasClass(opt.unableClass)) {
					return null
				}
				hasfocus = 1;
				if (opt.debug) {
					console.log("over on : " + this.id)
				}
				jQuery(event.target, $container).addClass(opt.hoverClass)
			}).mouseout(function (event) {
				if ($(this).hasClass(opt.unableClass)) {
					return null
				}
				hasfocus = -1;
				if (opt.debug) {
					console.log("out on : " + this.id)
				}
				jQuery(event.target, $container).removeClass(opt.hoverClass)
			}).click(function (event) {
				if ($(this).hasClass(opt.unableClass)) {
					return null
				}
				var oldValue = getCurrentSelected();
				var fl = $("li." + opt.hoverClass, $container).get(0);
				if (opt.debug) {
					console.log("click on :" + this.id)
				}
				$(this).siblings().removeClass(opt.currentClass);
				$(this).addClass(opt.currentClass);
				setCurrent();
				var newValue = getCurrentSelected();
				if (opt.onclick) {
					opt.onclick({
						oldValue : oldValue,
						newValue : newValue,
						id : $select.attr("id")
					})
				}
				hasfocus = -1;
				hasClick = 1;
				$select.get(0).blur();
				hideMe()
			})
		});
		return ul
	}
};
(function ($) {
	$.extend($.ui, {
		datepicker : {
			version : "1.7.2"
		}
	});
	var PROP_NAME = "datepicker";
	function Datepicker() {
		this.debug = false;
		this._curInst = null;
		this._keyEvent = false;
		this._disabledInputs = [];
		this._datepickerShowing = false;
		this._inDialog = false;
		this._mainDivId = "ui-datepicker-div";
		this._inlineClass = "ui-datepicker-inline";
		this._appendClass = "ui-datepicker-append";
		this._triggerClass = "ui-datepicker-trigger";
		this._dialogClass = "ui-datepicker-dialog";
		this._disableClass = "ui-datepicker-disabled";
		this._unselectableClass = "ui-datepicker-unselectable";
		this._currentClass = "ui-datepicker-current-day";
		this._dayOverClass = "ui-datepicker-days-cell-over";
		this.regional = [];
		this.regional[""] = {
			closeText : "Done",
			prevText : "Prev",
			nextText : "Next",
			currentText : "Today",
			monthNames : ["��&nbsp;1��", "��&nbsp;2��", "��&nbsp;3��", "��&nbsp;4��", "��&nbsp;5��", "��&nbsp;6��", "��&nbsp;7��", "��&nbsp;8��", "��&nbsp;9��", "��&nbsp;10��", "��&nbsp;11��", "��&nbsp;12��"],
			monthNamesShort : ["һ��", "����", "����", "����", "����", "����", "����", "����", "����", "ʮ��", "ʮһ��", "ʮ����"],
			dayNames : ["������", "����һ", "���ڶ�", "������", "������", "������", "������"],
			dayNamesShort : ["����", "��һ", "�ܶ�", "����", "����", "����", "����"],
			dayNamesMin : ["��", "һ", "��", "��", "��", "��", "��"],
			dateFormat : "yy-mm-dd",
			firstDay : 0,
			isRTL : false
		};
		this._defaults = {
			showOn : "focus",
			showAnim : "show",
			showOptions : {},
			defaultDate : null,
			appendText : "",
			buttonText : "...",
			buttonImage : "",
			buttonImageOnly : false,
			hideIfNoPrevNext : false,
			navigationAsDateFormat : false,
			gotoCurrent : false,
			changeMonth : false,
			changeYear : false,
			showMonthAfterYear : false,
			yearRange : "-10:+10",
			showOtherMonths : false,
			calculateWeek : this.iso8601Week,
			shortYearCutoff : "+10",
			minDate : null,
			maxDate : null,
			duration : "normal",
			beforeShowDay : null,
			beforeShow : null,
			onSelect : null,
			onChangeMonthYear : null,
			onClose : null,
			numberOfMonths : 1,
			showCurrentAtPos : 0,
			stepMonths : 1,
			stepBigMonths : 12,
			altField : "",
			altFormat : "",
			constrainInput : true,
			showButtonPanel : false
		};
		$.extend(this._defaults, this.regional[""]);
		this.dpDiv = $('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all ui-helper-hidden-accessible"></div>')
	}
	$.extend(Datepicker.prototype, {
		markerClassName : "hasDatepicker",
		log : function () {
			if (this.debug) {
				console.log.apply("", arguments)
			}
		},
		setDefaults : function (settings) {
			extendRemove(this._defaults, settings || {});
			return this
		},
		_attachDatepicker : function (target, settings) {
			var inlineSettings = null;
			for (var attrName in this._defaults) {
				var attrValue = target.getAttribute("date:" + attrName);
				if (attrValue) {
					inlineSettings = inlineSettings || {};
					try {
						inlineSettings[attrName] = eval(attrValue)
					} catch (err) {
						inlineSettings[attrName] = attrValue
					}
				}
			}
			var nodeName = target.nodeName.toLowerCase();
			var inline = (nodeName == "div" || nodeName == "span");
			if (!target.id) {
				target.id = "dp" + (++this.uuid)
			}
			var inst = this._newInst($(target), inline);
			inst.settings = $.extend({}, settings || {}, inlineSettings || {});
			if (nodeName == "input") {
				this._connectDatepicker(target, inst)
			} else {
				if (inline) {
					this._inlineDatepicker(target, inst)
				}
			}
		},
		_newInst : function (target, inline) {
			var id = target[0].id.replace(/([:\[\]\.])/g, "\\\\$1");
			return {
				id : id,
				input : target,
				selectedDay : 0,
				selectedMonth : 0,
				selectedYear : 0,
				drawMonth : 0,
				drawYear : 0,
				inline : inline,
				dpDiv : (!inline ? this.dpDiv : $('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
			}
		},
		_connectDatepicker : function (target, inst) {
			var input = $(target);
			inst.append = $([]);
			inst.trigger = $([]);
			if (input.hasClass(this.markerClassName)) {
				return
			}
			var appendText = this._get(inst, "appendText");
			var isRTL = this._get(inst, "isRTL");
			if (appendText) {
				inst.append = $('<span class="' + this._appendClass + '">' + appendText + "</span>");
				input[isRTL ? "before" : "after"](inst.append)
			}
			var showOn = this._get(inst, "showOn");
			if (showOn == "focus" || showOn == "both") {
				input.focus(this._showDatepicker)
			}
			if (showOn == "button" || showOn == "both") {
				var buttonText = this._get(inst, "buttonText");
				var buttonImage = this._get(inst, "buttonImage");
				inst.trigger = $(this._get(inst, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
							src : buttonImage,
							alt : buttonText,
							title : buttonText
						}) : $('<button type="button"></button>').addClass(this._triggerClass).html(buttonImage == "" ? buttonText : $("<img/>").attr({
								src : buttonImage,
								alt : buttonText,
								title : buttonText
							})));
				input[isRTL ? "before" : "after"](inst.trigger);
				inst.trigger.click(function () {
					if ($.datepicker._datepickerShowing && $.datepicker._lastInput == target) {
						$.datepicker._hideDatepicker()
					} else {
						$.datepicker._showDatepicker(target)
					}
					return false
				})
			}
			input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).bind("setData.datepicker", function (event, key, value) {
				inst.settings[key] = value
			}).bind("getData.datepicker", function (event, key) {
				return this._get(inst, key)
			});
			$.data(target, PROP_NAME, inst)
		},
		_inlineDatepicker : function (target, inst) {
			var divSpan = $(target);
			if (divSpan.hasClass(this.markerClassName)) {
				return
			}
			divSpan.addClass(this.markerClassName).append(inst.dpDiv).bind("setData.datepicker", function (event, key, value) {
				inst.settings[key] = value
			}).bind("getData.datepicker", function (event, key) {
				return this._get(inst, key)
			});
			$.data(target, PROP_NAME, inst);
			this._setDate(inst, this._getDefaultDate(inst));
			this._updateDatepicker(inst);
			this._updateAlternate(inst)
		},
		_dialogDatepicker : function (input, dateText, onSelect, settings, pos) {
			var inst = this._dialogInst;
			if (!inst) {
				var id = "dp" + (++this.uuid);
				this._dialogInput = $('<input type="text" id="' + id + '" size="1" style="position: absolute; top: -100px;"/>');
				this._dialogInput.keydown(this._doKeyDown);
				$("body").append(this._dialogInput);
				inst = this._dialogInst = this._newInst(this._dialogInput, false);
				inst.settings = {};
				$.data(this._dialogInput[0], PROP_NAME, inst)
			}
			extendRemove(inst.settings, settings || {});
			this._dialogInput.val(dateText);
			this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
			if (!this._pos) {
				var browserWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
				var browserHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
				var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
				var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
				this._pos = [(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY]
			}
			this._dialogInput.css("left", this._pos[0] + "px").css("top", this._pos[1] + "px");
			inst.settings.onSelect = onSelect;
			this._inDialog = true;
			this.dpDiv.addClass(this._dialogClass);
			this._showDatepicker(this._dialogInput[0]);
			if ($.blockUI) {
				$.blockUI(this.dpDiv)
			}
			$.data(this._dialogInput[0], PROP_NAME, inst);
			return this
		},
		_destroyDatepicker : function (target) {
			var $target = $(target);
			var inst = $.data(target, PROP_NAME);
			if (!$target.hasClass(this.markerClassName)) {
				return
			}
			var nodeName = target.nodeName.toLowerCase();
			$.removeData(target, PROP_NAME);
			if (nodeName == "input") {
				inst.append.remove();
				inst.trigger.remove();
				$target.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress)
			} else {
				if (nodeName == "div" || nodeName == "span") {
					$target.removeClass(this.markerClassName).empty()
				}
			}
		},
		_enableDatepicker : function (target) {
			var $target = $(target);
			var inst = $.data(target, PROP_NAME);
			if (!$target.hasClass(this.markerClassName)) {
				return
			}
			var nodeName = target.nodeName.toLowerCase();
			if (nodeName == "input") {
				target.disabled = false;
				inst.trigger.filter("button").each(function () {
					this.disabled = false
				}).end().filter("img").css({
					opacity : "1.0",
					cursor : ""
				})
			} else {
				if (nodeName == "div" || nodeName == "span") {
					var inline = $target.children("." + this._inlineClass);
					inline.children().removeClass("ui-state-disabled")
				}
			}
			this._disabledInputs = $.map(this._disabledInputs, function (value) {
					return (value == target ? null : value)
				})
		},
		_disableDatepicker : function (target) {
			var $target = $(target);
			var inst = $.data(target, PROP_NAME);
			if (!$target.hasClass(this.markerClassName)) {
				return
			}
			var nodeName = target.nodeName.toLowerCase();
			if (nodeName == "input") {
				target.disabled = true;
				inst.trigger.filter("button").each(function () {
					this.disabled = true
				}).end().filter("img").css({
					opacity : "0.5",
					cursor : "default"
				})
			} else {
				if (nodeName == "div" || nodeName == "span") {
					var inline = $target.children("." + this._inlineClass);
					inline.children().addClass("ui-state-disabled")
				}
			}
			this._disabledInputs = $.map(this._disabledInputs, function (value) {
					return (value == target ? null : value)
				});
			this._disabledInputs[this._disabledInputs.length] = target
		},
		_isDisabledDatepicker : function (target) {
			if (!target) {
				return false
			}
			for (var i = 0; i < this._disabledInputs.length; i++) {
				if (this._disabledInputs[i] == target) {
					return true
				}
			}
			return false
		},
		_getInst : function (target) {
			try {
				return $.data(target, PROP_NAME)
			} catch (err) {
				throw "Missing instance data for this datepicker"
			}
		},
		_optionDatepicker : function (target, name, value) {
			var inst = this._getInst(target);
			if (arguments.length == 2 && typeof name == "string") {
				return (name == "defaults" ? $.extend({}, $.datepicker._defaults) : (inst ? (name == "all" ? $.extend({}, inst.settings) : this._get(inst, name)) : null))
			}
			var settings = name || {};
			if (typeof name == "string") {
				settings = {};
				settings[name] = value
			}
			if (inst) {
				if (this._curInst == inst) {
					this._hideDatepicker(null)
				}
				var date = this._getDateDatepicker(target);
				extendRemove(inst.settings, settings);
				this._setDateDatepicker(target, date);
				this._updateDatepicker(inst)
			}
		},
		_changeDatepicker : function (target, name, value) {
			this._optionDatepicker(target, name, value)
		},
		_refreshDatepicker : function (target) {
			var inst = this._getInst(target);
			if (inst) {
				this._updateDatepicker(inst)
			}
		},
		_setDateDatepicker : function (target, date, endDate) {
			var inst = this._getInst(target);
			if (inst) {
				this._setDate(inst, date, endDate);
				this._updateDatepicker(inst);
				this._updateAlternate(inst)
			}
		},
		_getDateDatepicker : function (target) {
			var inst = this._getInst(target);
			if (inst && !inst.inline) {
				this._setDateFromField(inst)
			}
			return (inst ? this._getDate(inst) : null)
		},
		_doKeyDown : function (event) {
			var inst = $.datepicker._getInst(event.target);
			var handled = true;
			var isRTL = inst.dpDiv.is(".ui-datepicker-rtl");
			inst._keyEvent = true;
			if ($.datepicker._datepickerShowing) {
				switch (event.keyCode) {
				case 9:
					$.datepicker._hideDatepicker(null, "");
					break;
				case 13:
					var sel = $("td." + $.datepicker._dayOverClass + ", td." + $.datepicker._currentClass, inst.dpDiv);
					if (sel[0]) {
						$.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0])
					} else {
						$.datepicker._hideDatepicker(null, $.datepicker._get(inst, "duration"))
					}
					return false;
					break;
				case 27:
					$.datepicker._hideDatepicker(null, $.datepicker._get(inst, "duration"));
					break;
				case 33:
					$.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths")), "M");
					break;
				case 34:
					$.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths")), "M");
					break;
				case 35:
					if (event.ctrlKey || event.metaKey) {
						$.datepicker._clearDate(event.target)
					}
					handled = event.ctrlKey || event.metaKey;
					break;
				case 36:
					if (event.ctrlKey || event.metaKey) {
						$.datepicker._gotoToday(event.target)
					}
					handled = event.ctrlKey || event.metaKey;
					break;
				case 37:
					if (event.ctrlKey || event.metaKey) {
						$.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), "D")
					}
					handled = event.ctrlKey || event.metaKey;
					if (event.originalEvent.altKey) {
						$.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths")), "M")
					}
					break;
				case 38:
					if (event.ctrlKey || event.metaKey) {
						$.datepicker._adjustDate(event.target, -7, "D")
					}
					handled = event.ctrlKey || event.metaKey;
					break;
				case 39:
					if (event.ctrlKey || event.metaKey) {
						$.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), "D")
					}
					handled = event.ctrlKey || event.metaKey;
					if (event.originalEvent.altKey) {
						$.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths")), "M")
					}
					break;
				case 40:
					if (event.ctrlKey || event.metaKey) {
						$.datepicker._adjustDate(event.target, +7, "D")
					}
					handled = event.ctrlKey || event.metaKey;
					break;
				default:
					handled = false
				}
			} else {
				if (event.keyCode == 36 && event.ctrlKey) {
					$.datepicker._showDatepicker(this)
				} else {
					handled = false
				}
			}
			if (handled) {
				event.preventDefault();
				event.stopPropagation()
			}
		},
		_doKeyPress : function (event) {
			var inst = $.datepicker._getInst(event.target);
			if ($.datepicker._get(inst, "constrainInput")) {
				var chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat"));
				var chr = String.fromCharCode(event.charCode == undefined ? event.keyCode : event.charCode);
				return event.ctrlKey || (chr < " " || !chars || chars.indexOf(chr) > -1)
			}
		},
		_showDatepicker : function (input) {
			input = input.target || input;
			if (input.nodeName.toLowerCase() != "input") {
				input = $("input", input.parentNode)[0]
			}
			if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput == input) {
				return
			}
			var inst = $.datepicker._getInst(input);
			var beforeShow = $.datepicker._get(inst, "beforeShow");
			extendRemove(inst.settings, (beforeShow ? beforeShow.apply(input, [input, inst]) : {}));
			$.datepicker._hideDatepicker(null, "");
			$.datepicker._lastInput = input;
			$.datepicker._setDateFromField(inst);
			if ($.datepicker._inDialog) {
				input.value = ""
			}
			if (!$.datepicker._pos) {
				$.datepicker._pos = $.datepicker._findPos(input);
				$.datepicker._pos[1] += input.offsetHeight
			}
			var isFixed = false;
			$(input).parents().each(function () {
				isFixed |= $(this).css("position") == "fixed";
				return !isFixed
			});
			if (isFixed && $.browser.opera) {
				$.datepicker._pos[0] -= document.documentElement.scrollLeft;
				$.datepicker._pos[1] -= document.documentElement.scrollTop
			}
			var offset = {
				left : $.datepicker._pos[0],
				top : $.datepicker._pos[1]
			};
			$.datepicker._pos = null;
			inst.rangeStart = null;
			inst.dpDiv.css({
				position : "absolute",
				display : "block",
				top : "-1000px"
			});
			$.datepicker._updateDatepicker(inst);
			offset = $.datepicker._checkOffset(inst, offset, isFixed);
			inst.dpDiv.css({
				position : ($.datepicker._inDialog && $.blockUI ? "static" : (isFixed ? "fixed" : "absolute")),
				display : "none",
				left : offset.left + "px",
				top : offset.top + "px"
			});
			if (!inst.inline) {
				var showAnim = $.datepicker._get(inst, "showAnim") || "show";
				var duration = $.datepicker._get(inst, "duration");
				var postProcess = function () {
					$.datepicker._datepickerShowing = true;
					if ($.browser.msie && parseInt($.browser.version, 10) < 7) {
						$("iframe.ui-datepicker-cover").css({
							width : inst.dpDiv.width() + 4,
							height : inst.dpDiv.height() + 4
						})
					}
				};
				if ($.effects && $.effects[showAnim]) {
					inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess)
				} else {
					inst.dpDiv[showAnim](duration, postProcess)
				}
				if (duration == "") {
					postProcess()
				}
				if (inst.input[0].type != "hidden") {
					inst.input[0].focus()
				}
				$.datepicker._curInst = inst
			}
		},
		_updateDatepicker : function (inst) {
			var dims = {
				width : inst.dpDiv.width() + 4,
				height : inst.dpDiv.height() + 4
			};
			var self = this;
			inst.dpDiv.empty().append(this._generateHTML(inst)).find("iframe.ui-datepicker-cover").css({
				width : dims.width,
				height : dims.height
			}).end().find("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a").bind("mouseout", function () {
				$(this).removeClass("ui-state-hover");
				if (this.className.indexOf("ui-datepicker-prev") != -1) {
					$(this).removeClass("ui-datepicker-prev-hover")
				}
				if (this.className.indexOf("ui-datepicker-next") != -1) {
					$(this).removeClass("ui-datepicker-next-hover")
				}
			}).bind("mouseover", function () {
				if (!self._isDisabledDatepicker(inst.inline ? inst.dpDiv.parent()[0] : inst.input[0])) {
					$(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
					$(this).addClass("ui-state-hover");
					if (this.className.indexOf("ui-datepicker-prev") != -1) {
						$(this).addClass("ui-datepicker-prev-hover")
					}
					if (this.className.indexOf("ui-datepicker-next") != -1) {
						$(this).addClass("ui-datepicker-next-hover")
					}
				}
			}).end().find("." + this._dayOverClass + " a").trigger("mouseover").end();
			var numMonths = this._getNumberOfMonths(inst);
			var cols = numMonths[1];
			var width = 17;
			if (cols > 1) {
				inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", (width * cols) + "em")
			} else {
				inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("")
			}
			inst.dpDiv[(numMonths[0] != 1 || numMonths[1] != 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi");
			inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
			if (inst.input && inst.input[0].type != "hidden" && inst == $.datepicker._curInst) {
				$(inst.input[0]).focus()
			}
		},
		_checkOffset : function (inst, offset, isFixed) {
			var dpWidth = inst.dpDiv.outerWidth();
			var dpHeight = inst.dpDiv.outerHeight();
			var inputWidth = inst.input ? inst.input.outerWidth() : 0;
			var inputHeight = inst.input ? inst.input.outerHeight() : 0;
			var viewWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) + $(document).scrollLeft();
			var viewHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) + $(document).scrollTop();
			offset.left -= (this._get(inst, "isRTL") ? (dpWidth - inputWidth) : 0);
			offset.left -= (isFixed && offset.left == inst.input.offset().left) ? $(document).scrollLeft() : 0;
			offset.top -= (isFixed && offset.top == (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;
			offset.left -= (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ? Math.abs(offset.left + dpWidth - viewWidth) : 0;
			offset.top -= (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ? Math.abs(offset.top + dpHeight + inputHeight * 2 - viewHeight) : 0;
			return offset
		},
		_findPos : function (obj) {
			while (obj && (obj.type == "hidden" || obj.nodeType != 1)) {
				obj = obj.nextSibling
			}
			var position = $(obj).offset();
			return [position.left, position.top]
		},
		_hideDatepicker : function (input, duration) {
			var inst = this._curInst;
			if (!inst || (input && inst != $.data(input, PROP_NAME))) {
				return
			}
			if (inst.stayOpen) {
				this._selectDate("#" + inst.id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear))
			}
			inst.stayOpen = false;
			if (this._datepickerShowing) {
				duration = (duration != null ? duration : this._get(inst, "duration"));
				var showAnim = this._get(inst, "showAnim");
				var postProcess = function () {
					$.datepicker._tidyDialog(inst)
				};
				if (duration != "" && $.effects && $.effects[showAnim]) {
					inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess)
				} else {
					inst.dpDiv[(duration == "" ? "hide" : (showAnim == "slideDown" ? "slideUp" : (showAnim == "fadeIn" ? "fadeOut" : "hide")))](duration, postProcess)
				}
				if (duration == "") {
					this._tidyDialog(inst)
				}
				var onClose = this._get(inst, "onClose");
				if (onClose) {
					onClose.apply((inst.input ? inst.input[0] : null), [(inst.input ? inst.input.val() : ""), inst])
				}
				this._datepickerShowing = false;
				this._lastInput = null;
				if (this._inDialog) {
					this._dialogInput.css({
						position : "absolute",
						left : "0",
						top : "-100px"
					});
					if ($.blockUI) {
						$.unblockUI();
						$("body").append(this.dpDiv)
					}
				}
				this._inDialog = false
			}
			this._curInst = null
		},
		_tidyDialog : function (inst) {
			inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
		},
		_checkExternalClick : function (event) {
			if (!$.datepicker._curInst) {
				return
			}
			var $target = $(event.target);
			if (($target.parents("#" + $.datepicker._mainDivId).length == 0) && !$target.hasClass($.datepicker.markerClassName) && !$target.hasClass($.datepicker._triggerClass) && $.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI)) {
				$.datepicker._hideDatepicker(null, "")
			}
		},
		_adjustDate : function (id, offset, period) {
			var target = $(id);
			var inst = this._getInst(target[0]);
			if (this._isDisabledDatepicker(target[0])) {
				return
			}
			this._adjustInstDate(inst, offset + (period == "M" ? this._get(inst, "showCurrentAtPos") : 0), period);
			this._updateDatepicker(inst)
		},
		_gotoToday : function (id) {
			var target = $(id);
			var inst = this._getInst(target[0]);
			if (this._get(inst, "gotoCurrent") && inst.currentDay) {
				inst.selectedDay = inst.currentDay;
				inst.drawMonth = inst.selectedMonth = inst.currentMonth;
				inst.drawYear = inst.selectedYear = inst.currentYear
			} else {
				var date = new Date();
				inst.selectedDay = date.getDate();
				inst.drawMonth = inst.selectedMonth = date.getMonth();
				inst.drawYear = inst.selectedYear = date.getFullYear()
			}
			this._notifyChange(inst);
			this._adjustDate(target)
		},
		_selectMonthYear : function (id, select, period) {
			var target = $(id);
			var inst = this._getInst(target[0]);
			inst._selectingMonthYear = false;
			inst["selected" + (period == "M" ? "Month" : "Year")] = inst["draw" + (period == "M" ? "Month" : "Year")] = parseInt(select.options[select.selectedIndex].value, 10);
			this._notifyChange(inst);
			this._adjustDate(target)
		},
		_clickMonthYear : function (id) {
			var target = $(id);
			var inst = this._getInst(target[0]);
			if (inst.input && inst._selectingMonthYear && !$.browser.msie) {
				inst.input[0].focus()
			}
			inst._selectingMonthYear = !inst._selectingMonthYear
		},
		_selectDay : function (id, month, year, td) {
			var target = $(id);
			if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
				return
			}
			var inst = this._getInst(target[0]);
			inst.selectedDay = inst.currentDay = $("a", td).html();
			inst.selectedMonth = inst.currentMonth = month;
			inst.selectedYear = inst.currentYear = year;
			if (inst.stayOpen) {
				inst.endDay = inst.endMonth = inst.endYear = null
			}
			this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear));
			if (inst.stayOpen) {
				inst.rangeStart = this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
				this._updateDatepicker(inst)
			}
		},
		_clearDate : function (id) {
			var target = $(id);
			var inst = this._getInst(target[0]);
			inst.stayOpen = false;
			inst.endDay = inst.endMonth = inst.endYear = inst.rangeStart = null;
			this._selectDate(target, "")
		},
		_selectDate : function (id, dateStr) {
			var target = $(id);
			var inst = this._getInst(target[0]);
			dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
			if (inst.input) {
				inst.input.val(dateStr)
			}
			this._updateAlternate(inst);
			var onSelect = this._get(inst, "onSelect");
			if (onSelect) {
				onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst])
			} else {
				if (inst.input) {
					inst.input.trigger("change")
				}
			}
			if (inst.inline) {
				this._updateDatepicker(inst)
			} else {
				if (!inst.stayOpen) {
					this._hideDatepicker(null, this._get(inst, "duration"));
					this._lastInput = inst.input[0];
					if (typeof(inst.input[0]) != "object") {
						inst.input[0].focus()
					}
					this._lastInput = null
				}
			}
		},
		_updateAlternate : function (inst) {
			var altField = this._get(inst, "altField");
			if (altField) {
				var altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat");
				var date = this._getDate(inst);
				dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
				$(altField).each(function () {
					$(this).val(dateStr)
				})
			}
		},
		noWeekends : function (date) {
			var day = date.getDay();
			return [(day > 0 && day < 6), ""]
		},
		iso8601Week : function (date) {
			var checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
			var firstMon = new Date(checkDate.getFullYear(), 1 - 1, 4);
			var firstDay = firstMon.getDay() || 7;
			firstMon.setDate(firstMon.getDate() + 1 - firstDay);
			if (firstDay < 4 && checkDate < firstMon) {
				checkDate.setDate(checkDate.getDate() - 3);
				return $.datepicker.iso8601Week(checkDate)
			} else {
				if (checkDate > new Date(checkDate.getFullYear(), 12 - 1, 28)) {
					firstDay = new Date(checkDate.getFullYear() + 1, 1 - 1, 4).getDay() || 7;
					if (firstDay > 4 && (checkDate.getDay() || 7) < firstDay - 3) {
						return 1
					}
				}
			}
			return Math.floor(((checkDate - firstMon) / 86400000) / 7) + 1
		},
		parseDate : function (format, value, settings) {
			if (format == null || value == null) {
				throw "Invalid arguments"
			}
			value = (typeof value == "object" ? value.toString() : value + "");
			if (value == "") {
				return null
			}
			var shortYearCutoff = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff;
			var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
			var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
			var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
			var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
			var year = -1;
			var month = -1;
			var day = -1;
			var doy = -1;
			var literal = false;
			var lookAhead = function (match) {
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
				if (matches) {
					iFormat++
				}
				return matches
			};
			var getNumber = function (match) {
				lookAhead(match);
				var origSize = (match == "@" ? 14 : (match == "y" ? 4 : (match == "o" ? 3 : 2)));
				var size = origSize;
				var num = 0;
				while (size > 0 && iValue < value.length && value.charAt(iValue) >= "0" && value.charAt(iValue) <= "9") {
					num = num * 10 + parseInt(value.charAt(iValue++), 10);
					size--
				}
				if (size == origSize) {
					throw "Missing number at position " + iValue
				}
				return num
			};
			var getName = function (match, shortNames, longNames) {
				var names = (lookAhead(match) ? longNames : shortNames);
				var size = 0;
				for (var j = 0; j < names.length; j++) {
					size = Math.max(size, names[j].length)
				}
				var name = "";
				var iInit = iValue;
				while (size > 0 && iValue < value.length) {
					name += value.charAt(iValue++);
					for (var i = 0; i < names.length; i++) {
						if (name == names[i]) {
							return i + 1
						}
					}
					size--
				}
				throw "Unknown name at position " + iInit
			};
			var checkLiteral = function () {
				if (value.charAt(iValue) != format.charAt(iFormat)) {
					throw "Unexpected literal at position " + iValue
				}
				iValue++
			};
			var iValue = 0;
			for (var iFormat = 0; iFormat < format.length; iFormat++) {
				if (literal) {
					if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
						literal = false
					} else {
						checkLiteral()
					}
				} else {
					switch (format.charAt(iFormat)) {
					case "d":
						day = getNumber("d");
						break;
					case "D":
						getName("D", dayNamesShort, dayNames);
						break;
					case "o":
						doy = getNumber("o");
						break;
					case "m":
						month = getNumber("m");
						break;
					case "M":
						month = getName("M", monthNamesShort, monthNames);
						break;
					case "y":
						year = getNumber("y");
						break;
					case "@":
						var date = new Date(getNumber("@"));
						year = date.getFullYear();
						month = date.getMonth() + 1;
						day = date.getDate();
						break;
					case "'":
						if (lookAhead("'")) {
							checkLiteral()
						} else {
							literal = true
						}
						break;
					default:
						checkLiteral()
					}
				}
			}
			if (year == -1) {
				year = new Date().getFullYear()
			} else {
				if (year < 100) {
					year += new Date().getFullYear() - new Date().getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100)
				}
			}
			if (doy > -1) {
				month = 1;
				day = doy;
				do {
					var dim = this._getDaysInMonth(year, month - 1);
					if (day <= dim) {
						break
					}
					month++;
					day -= dim
				} while (true)
			}
			var date = this._daylightSavingAdjust(new Date(year, month - 1, day));
			if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day) {
				throw "Invalid date"
			}
			return date
		},
		ATOM : "yy-mm-dd",
		COOKIE : "D, dd M yy",
		ISO_8601 : "yy-mm-dd",
		RFC_822 : "D, d M y",
		RFC_850 : "DD, dd-M-y",
		RFC_1036 : "D, d M y",
		RFC_1123 : "D, d M yy",
		RFC_2822 : "D, d M yy",
		RSS : "D, d M y",
		TIMESTAMP : "@",
		W3C : "yy-mm-dd",
		formatDate : function (format, date, settings) {
			if (!date) {
				return ""
			}
			var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
			var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
			var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
			var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
			var lookAhead = function (match) {
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
				if (matches) {
					iFormat++
				}
				return matches
			};
			var formatNumber = function (match, value, len) {
				var num = "" + value;
				if (lookAhead(match)) {
					while (num.length < len) {
						num = "0" + num
					}
				}
				return num
			};
			var formatName = function (match, value, shortNames, longNames) {
				return (lookAhead(match) ? longNames[value] : shortNames[value])
			};
			var output = "";
			var literal = false;
			if (date) {
				for (var iFormat = 0; iFormat < format.length; iFormat++) {
					if (literal) {
						if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
							literal = false
						} else {
							output += format.charAt(iFormat)
						}
					} else {
						switch (format.charAt(iFormat)) {
						case "d":
							output += formatNumber("d", date.getDate(), 2);
							break;
						case "D":
							output += formatName("D", date.getDay(), dayNamesShort, dayNames);
							break;
						case "o":
							var doy = date.getDate();
							for (var m = date.getMonth() - 1; m >= 0; m--) {
								doy += this._getDaysInMonth(date.getFullYear(), m)
							}
							output += formatNumber("o", doy, 3);
							break;
						case "m":
							output += formatNumber("m", date.getMonth() + 1, 2);
							break;
						case "M":
							output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
							break;
						case "y":
							output += (lookAhead("y") ? date.getFullYear() : (date.getYear() % 100 < 10 ? "0" : "") + date.getYear() % 100);
							break;
						case "@":
							output += date.getTime();
							break;
						case "'":
							if (lookAhead("'")) {
								output += "'"
							} else {
								literal = true
							}
							break;
						default:
							output += format.charAt(iFormat)
						}
					}
				}
			}
			return output
		},
		_possibleChars : function (format) {
			var chars = "";
			var literal = false;
			for (var iFormat = 0; iFormat < format.length; iFormat++) {
				if (literal) {
					if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
						literal = false
					} else {
						chars += format.charAt(iFormat)
					}
				} else {
					switch (format.charAt(iFormat)) {
					case "d":
					case "m":
					case "y":
					case "@":
						chars += "0123456789";
						break;
					case "D":
					case "M":
						return null;
					case "'":
						if (lookAhead("'")) {
							chars += "'"
						} else {
							literal = true
						}
						break;
					default:
						chars += format.charAt(iFormat)
					}
				}
			}
			return chars
		},
		_get : function (inst, name) {
			return inst.settings[name] !== undefined ? inst.settings[name] : this._defaults[name]
		},
		_setDateFromField : function (inst) {
			var dateFormat = this._get(inst, "dateFormat");
			var dates = inst.input ? inst.input.val() : null;
			inst.endDay = inst.endMonth = inst.endYear = null;
			var date = defaultDate = this._getDefaultDate(inst);
			var settings = this._getFormatConfig(inst);
			try {
				date = this.parseDate(dateFormat, dates, settings) || defaultDate
			} catch (event) {
				this.log(event);
				date = defaultDate
			}
			inst.selectedDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = date.getFullYear();
			inst.currentDay = (dates ? date.getDate() : 0);
			inst.currentMonth = (dates ? date.getMonth() : 0);
			inst.currentYear = (dates ? date.getFullYear() : 0);
			this._adjustInstDate(inst)
		},
		_getDefaultDate : function (inst) {
			var date = this._determineDate(this._get(inst, "defaultDate"), new Date());
			var minDate = this._getMinMaxDate(inst, "min", true);
			var maxDate = this._getMinMaxDate(inst, "max");
			date = (minDate && date < minDate ? minDate : date);
			date = (maxDate && date > maxDate ? maxDate : date);
			return date
		},
		_determineDate : function (date, defaultDate) {
			var offsetNumeric = function (offset) {
				var date = new Date();
				date.setDate(date.getDate() + offset);
				return date
			};
			var offsetString = function (offset, getDaysInMonth) {
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth();
				var day = date.getDate();
				var pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
				var matches = pattern.exec(offset);
				while (matches) {
					switch (matches[2] || "d") {
					case "d":
					case "D":
						day += parseInt(matches[1], 10);
						break;
					case "w":
					case "W":
						day += parseInt(matches[1], 10) * 7;
						break;
					case "m":
					case "M":
						month += parseInt(matches[1], 10);
						day = Math.min(day, getDaysInMonth(year, month));
						break;
					case "y":
					case "Y":
						year += parseInt(matches[1], 10);
						day = Math.min(day, getDaysInMonth(year, month));
						break
					}
					matches = pattern.exec(offset)
				}
				return new Date(year, month, day)
			};
			date = (date == null ? defaultDate : (typeof date == "string" ? offsetString(date, this._getDaysInMonth) : (typeof date == "number" ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : date)));
			date = (date && date.toString() == "Invalid Date" ? defaultDate : date);
			if (date) {
				date.setHours(0);
				date.setMinutes(0);
				date.setSeconds(0);
				date.setMilliseconds(0)
			}
			return this._daylightSavingAdjust(date)
		},
		_daylightSavingAdjust : function (date) {
			if (!date) {
				return null
			}
			date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
			return date
		},
		_setDate : function (inst, date, endDate) {
			var clear = !(date);
			var origMonth = inst.selectedMonth;
			var origYear = inst.selectedYear;
			date = this._determineDate(date, new Date());
			inst.selectedDay = inst.currentDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = inst.currentMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = inst.currentYear = date.getFullYear();
			if (origMonth != inst.selectedMonth || origYear != inst.selectedYear) {
				this._notifyChange(inst)
			}
			this._adjustInstDate(inst);
			if (inst.input) {
				inst.input.val(clear ? "" : this._formatDate(inst))
			}
		},
		_getDate : function (inst) {
			var startDate = (!inst.currentYear || (inst.input && inst.input.val() == "") ? null : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
			return startDate
		},
		_generateHTML : function (inst) {
			var today = new Date();
			today = this._daylightSavingAdjust(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
			var isRTL = this._get(inst, "isRTL");
			var showButtonPanel = this._get(inst, "showButtonPanel");
			var hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext");
			var navigationAsDateFormat = this._get(inst, "navigationAsDateFormat");
			var numMonths = this._getNumberOfMonths(inst);
			var showCurrentAtPos = this._get(inst, "showCurrentAtPos");
			var stepMonths = this._get(inst, "stepMonths");
			var stepBigMonths = this._get(inst, "stepBigMonths");
			var isMultiMonth = (numMonths[0] != 1 || numMonths[1] != 1);
			var currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) : new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
			var minDate = this._getMinMaxDate(inst, "min", true);
			var maxDate = this._getMinMaxDate(inst, "max");
			var drawMonth = inst.drawMonth - showCurrentAtPos;
			var drawYear = inst.drawYear;
			if (drawMonth < 0) {
				drawMonth += 12;
				drawYear--
			}
			if (maxDate) {
				var maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(), maxDate.getMonth() - numMonths[1] + 1, maxDate.getDate()));
				maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
				while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
					drawMonth--;
					if (drawMonth < 0) {
						drawMonth = 11;
						drawYear--
					}
				}
			}
			inst.drawMonth = drawMonth;
			inst.drawYear = drawYear;
			var prevText = this._get(inst, "prevText");
			prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst)));
			var prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? '<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery.datepicker._adjustDate(\'#' + inst.id + "', -" + stepMonths + ", 'M');\" title=\"" + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "e" : "w") + '">' + prevText + "</span></a>" : (hideIfNoPrevNext ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "e" : "w") + '">' + prevText + "</span></a>"));
			var nextText = this._get(inst, "nextText");
			nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst)));
			var next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ? '<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery.datepicker._adjustDate(\'#' + inst.id + "', +" + stepMonths + ", 'M');\" title=\"" + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "w" : "e") + '">' + nextText + "</span></a>" : (hideIfNoPrevNext ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "w" : "e") + '">' + nextText + "</span></a>"));
			var currentText = this._get(inst, "currentText");
			var gotoDate = (this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today);
			currentText = (!navigationAsDateFormat ? currentText : this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));
			var controls = (!inst.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery.datepicker._hideDatepicker();">' + this._get(inst, "closeText") + "</button>" : "");
			var buttonPanel = (showButtonPanel) ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (isRTL ? controls : "") + (this._isInRange(inst, gotoDate) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery.datepicker._gotoToday(\'#' + inst.id + "');\">" + currentText + "</button>" : "") + (isRTL ? "" : controls) + "</div>" : "";
			var firstDay = parseInt(this._get(inst, "firstDay"), 10);
			firstDay = (isNaN(firstDay) ? 0 : firstDay);
			var dayNames = this._get(inst, "dayNames");
			var dayNamesShort = this._get(inst, "dayNamesShort");
			var dayNamesMin = this._get(inst, "dayNamesMin");
			var monthNames = this._get(inst, "monthNames");
			var monthNamesShort = this._get(inst, "monthNamesShort");
			var beforeShowDay = this._get(inst, "beforeShowDay");
			var showOtherMonths = this._get(inst, "showOtherMonths");
			var calculateWeek = this._get(inst, "calculateWeek") || this.iso8601Week;
			var endDate = inst.endDay ? this._daylightSavingAdjust(new Date(inst.endYear, inst.endMonth, inst.endDay)) : currentDate;
			var defaultDate = this._getDefaultDate(inst);
			var html = "";
			for (var row = 0; row < numMonths[0]; row++) {
				var group = "";
				for (var col = 0; col < numMonths[1]; col++) {
					var selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
					var cornerClass = " ui-corner-all";
					var calender = "";
					if (isMultiMonth) {
						calender += '<div class="ui-datepicker-group ui-datepicker-group-';
						switch (col) {
						case 0:
							calender += "first";
							cornerClass = " ui-corner-" + (isRTL ? "right" : "left");
							break;
						case numMonths[1] - 1:
							calender += "last";
							cornerClass = " ui-corner-" + (isRTL ? "left" : "right");
							break;
						default:
							calender += "middle";
							cornerClass = "";
							break
						}
						calender += '">'
					}
					calender += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + cornerClass + '">' + (/all|left/.test(cornerClass) && row == 0 ? (isRTL ? next : prev) : "") + (/all|right/.test(cornerClass) && row == 0 ? (isRTL ? prev : next) : "") + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, selectedDate, row > 0 || col > 0, monthNames, monthNamesShort) + '</div><table class="ui-datepicker-calendar"><thead><tr>';
					var thead = "";
					for (var dow = 0; dow < 7; dow++) {
						var day = (dow + firstDay) % 7;
						thead += "<th" + ((dow + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + '><span title="' + dayNames[day] + '">' + dayNamesMin[day] + "</span></th>"
					}
					calender += thead + "</tr></thead><tbody>";
					var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
					if (drawYear == inst.selectedYear && drawMonth == inst.selectedMonth) {
						inst.selectedDay = Math.min(inst.selectedDay, daysInMonth)
					}
					var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
					var numRows = (isMultiMonth ? 6 : Math.ceil((leadDays + daysInMonth) / 7));
					var printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
					for (var dRow = 0; dRow < numRows; dRow++) {
						calender += "<tr>";
						var tbody = "";
						for (var dow = 0; dow < 7; dow++) {
							var daySettings = (beforeShowDay ? beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, ""]);
							var otherMonth = (printDate.getMonth() != drawMonth);
							var unselectable = otherMonth || !daySettings[0] || (minDate && printDate < minDate) || (maxDate && printDate > maxDate);
							tbody += '<td class="' + ((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (otherMonth ? " ui-datepicker-other-month" : "") + ((printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth && inst._keyEvent) || (defaultDate.getTime() == printDate.getTime() && defaultDate.getTime() == selectedDate.getTime()) ? " " + this._dayOverClass : "") + (unselectable ? " " + this._unselectableClass + " ui-state-disabled" : "") + (otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + (printDate.getTime() >= currentDate.getTime() && printDate.getTime() <= endDate.getTime() ? " " + this._currentClass : "") + (printDate.getTime() == today.getTime() ? " ui-datepicker-today" : "")) + '"' + ((!otherMonth || showOtherMonths) && daySettings[2] ? ' title="' + daySettings[2] + '"' : "") + (unselectable ? "" : " onclick=\"DP_jQuery.datepicker._selectDay('#" + inst.id + "'," + drawMonth + "," + drawYear + ', this);return false;"') + ">" + (otherMonth ? (showOtherMonths ? printDate.getDate() : "&#xa0;") : (unselectable ? '<span class="ui-state-default">' + printDate.getDate() + "</span>" : '<a class="ui-state-default' + (printDate.getTime() == today.getTime() ? " ui-state-highlight" : "") + (printDate.getTime() >= currentDate.getTime() && printDate.getTime() <= endDate.getTime() ? " ui-state-active" : "") + '" href="#">' + printDate.getDate() + "</a>")) + "</td>";
							printDate.setDate(printDate.getDate() + 1);
							printDate = this._daylightSavingAdjust(printDate)
						}
						calender += tbody + "</tr>"
					}
					drawMonth++;
					if (drawMonth > 11) {
						drawMonth = 0;
						drawYear++
					}
					calender += "</tbody></table>" + (isMultiMonth ? "</div>" + ((numMonths[0] > 0 && col == numMonths[1] - 1) ? '<div class="ui-datepicker-row-break"></div>' : "") : "");
					group += calender
				}
				html += group
			}
			html += buttonPanel + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !inst.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : "");
			inst._keyEvent = false;
			return html
		},
		_generateMonthYearHeader : function (inst, drawMonth, drawYear, minDate, maxDate, selectedDate, secondary, monthNames, monthNamesShort) {
			minDate = (inst.rangeStart && minDate && selectedDate < minDate ? selectedDate : minDate);
			var changeMonth = this._get(inst, "changeMonth");
			var changeYear = this._get(inst, "changeYear");
			var showMonthAfterYear = this._get(inst, "showMonthAfterYear");
			var html = '<div class="ui-datepicker-title">';
			var monthHtml = "";
			if (secondary || !changeMonth) {
				monthHtml += '<span class="ui-datepicker-month">' + monthNames[drawMonth] + "</span> "
			} else {
				var inMinYear = (minDate && minDate.getFullYear() == drawYear);
				var inMaxYear = (maxDate && maxDate.getFullYear() == drawYear);
				monthHtml += '<select class="ui-datepicker-month" onchange="DP_jQuery.datepicker._selectMonthYear(\'#' + inst.id + "', this, 'M');\" onclick=\"DP_jQuery.datepicker._clickMonthYear('#" + inst.id + "');\">";
				for (var month = 0; month < 12; month++) {
					if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth())) {
						monthHtml += '<option value="' + month + '"' + (month == drawMonth ? ' selected="selected"' : "") + ">" + monthNamesShort[month] + "</option>"
					}
				}
				monthHtml += "</select>"
			}
			if (!showMonthAfterYear) {
				html += monthHtml + ((secondary || changeMonth || changeYear) && (!(changeMonth && changeYear)) ? "&#xa0;" : "")
			}
			if (secondary || !changeYear) {
				html += '<span class="ui-datepicker-year">' + drawYear + "</span>"
			} else {
				var years = this._get(inst, "yearRange").split(":");
				var year = 0;
				var endYear = 0;
				if (years.length != 2) {
					year = drawYear - 10;
					endYear = drawYear + 10
				} else {
					if (years[0].charAt(0) == "+" || years[0].charAt(0) == "-") {
						year = drawYear + parseInt(years[0], 10);
						endYear = drawYear + parseInt(years[1], 10)
					} else {
						year = parseInt(years[0], 10);
						endYear = parseInt(years[1], 10)
					}
				}
				year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
				endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
				html += '<select class="ui-datepicker-year" onchange="DP_jQuery.datepicker._selectMonthYear(\'#' + inst.id + "', this, 'Y');\" onclick=\"DP_jQuery.datepicker._clickMonthYear('#" + inst.id + "');\">";
				for (; year <= endYear; year++) {
					html += '<option value="' + year + '"' + (year == drawYear ? ' selected="selected"' : "") + ">" + year + "</option>"
				}
				html += "</select>"
			}
			if (showMonthAfterYear) {
				html += (secondary || changeMonth || changeYear ? "&#xa0;" : "") + monthHtml
			}
			html += "</div>";
			return html
		},
		_adjustInstDate : function (inst, offset, period) {
			var year = inst.drawYear + (period == "Y" ? offset : 0);
			var month = inst.drawMonth + (period == "M" ? offset : 0);
			var day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + (period == "D" ? offset : 0);
			var date = this._daylightSavingAdjust(new Date(year, month, day));
			var minDate = this._getMinMaxDate(inst, "min", true);
			var maxDate = this._getMinMaxDate(inst, "max");
			date = (minDate && date < minDate ? minDate : date);
			date = (maxDate && date > maxDate ? maxDate : date);
			inst.selectedDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = date.getFullYear();
			if (period == "M" || period == "Y") {
				this._notifyChange(inst)
			}
		},
		_notifyChange : function (inst) {
			var onChange = this._get(inst, "onChangeMonthYear");
			if (onChange) {
				onChange.apply((inst.input ? inst.input[0] : null), [inst.selectedYear, inst.selectedMonth + 1, inst])
			}
		},
		_getNumberOfMonths : function (inst) {
			var numMonths = this._get(inst, "numberOfMonths");
			return (numMonths == null ? [1, 1] : (typeof numMonths == "number" ? [1, numMonths] : numMonths))
		},
		_getMinMaxDate : function (inst, minMax, checkRange) {
			var date = this._determineDate(this._get(inst, minMax + "Date"), null);
			return (!checkRange || !inst.rangeStart ? date : (!date || inst.rangeStart > date ? inst.rangeStart : date))
		},
		_getDaysInMonth : function (year, month) {
			return 32 - new Date(year, month, 32).getDate()
		},
		_getFirstDayOfMonth : function (year, month) {
			return new Date(year, month, 1).getDay()
		},
		_canAdjustMonth : function (inst, offset, curYear, curMonth) {
			var numMonths = this._getNumberOfMonths(inst);
			var date = this._daylightSavingAdjust(new Date(curYear, curMonth + (offset < 0 ? offset : numMonths[1]), 1));
			if (offset < 0) {
				date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()))
			}
			return this._isInRange(inst, date)
		},
		_isInRange : function (inst, date) {
			var newMinDate = (!inst.rangeStart ? null : this._daylightSavingAdjust(new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay)));
			newMinDate = (newMinDate && inst.rangeStart < newMinDate ? inst.rangeStart : newMinDate);
			var minDate = newMinDate || this._getMinMaxDate(inst, "min");
			var maxDate = this._getMinMaxDate(inst, "max");
			return ((!minDate || date >= minDate) && (!maxDate || date <= maxDate))
		},
		_getFormatConfig : function (inst) {
			var shortYearCutoff = this._get(inst, "shortYearCutoff");
			shortYearCutoff = (typeof shortYearCutoff != "string" ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
			return {
				shortYearCutoff : shortYearCutoff,
				dayNamesShort : this._get(inst, "dayNamesShort"),
				dayNames : this._get(inst, "dayNames"),
				monthNamesShort : this._get(inst, "monthNamesShort"),
				monthNames : this._get(inst, "monthNames")
			}
		},
		_formatDate : function (inst, day, month, year) {
			if (!day) {
				inst.currentDay = inst.selectedDay;
				inst.currentMonth = inst.selectedMonth;
				inst.currentYear = inst.selectedYear
			}
			var date = (day ? (typeof day == "object" ? day : this._daylightSavingAdjust(new Date(year, month, day))) : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
			return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst))
		}
	});
	function extendRemove(target, props) {
		$.extend(target, props);
		for (var name in props) {
			if (props[name] == null || props[name] == undefined) {
				target[name] = props[name]
			}
		}
		return target
	}
	function isArray(a) {
		return (a && (($.browser.safari && typeof a == "object" && a.length) || (a.constructor && a.constructor.toString().match(/\Array\(\)/))))
	}
	$.fn.datepicker = function (options) {
		if (!$.datepicker.initialized) {
			$(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv);
			$.datepicker.initialized = true
		}
		var otherArgs = Array.prototype.slice.call(arguments, 1);
		if (typeof options == "string" && (options == "isDisabled" || options == "getDate")) {
			return $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs))
		}
		if (options == "option" && arguments.length == 2 && typeof arguments[1] == "string") {
			return $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs))
		}
		return this.each(function () {
			typeof options == "string" ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this].concat(otherArgs)) : $.datepicker._attachDatepicker(this, options)
		})
	};
	$.datepicker = new Datepicker();
	$.datepicker.initialized = false;
	$.datepicker.uuid = new Date().getTime();
	$.datepicker.version = "1.7.2";
	window.DP_jQuery = $
})(jQuery);
(function () {
	function qa(a, b) {
		a || (a = {});
		for (var c in b) {
			a[c] = b[c]
		}
		return a
	}
	function oa(a, b) {
		return parseInt(a, b || 10)
	}
	function Kb(a) {
		return typeof a == "string"
	}
	function Eb(a) {
		return typeof a == "object"
	}
	function ac(a) {
		return typeof a == "number"
	}
	function mc(a, b) {
		for (var c = a.length; c--; ) {
			if (a[c] == b) {
				a.splice(c, 1);
				break
			}
		}
	}
	function J(a) {
		return a !== Ra && a !== null
	}
	function za(a, b, c) {
		var d,
		e;
		if (Kb(b)) {
			if (J(c)) {
				a.setAttribute(b, c)
			} else {
				if (a && a.getAttribute) {
					e = a.getAttribute(b)
				}
			}
		} else {
			if (J(b) && Eb(b)) {
				for (d in b) {
					a.setAttribute(d, b[d])
				}
			}
		}
		return e
	}
	function nc(a) {
		if (!a || a.constructor != Array) {
			a = [a]
		}
		return a
	}
	function y() {
		var a = arguments,
		b,
		c,
		d = a.length;
		for (b = 0; b < d; b++) {
			c = a[b];
			if (typeof c !== "undefined" && c !== null) {
				return c
			}
		}
	}
	function Wd(a) {
		var b = "",
		c;
		for (c in a) {
			b += Ad(c) + ":" + a[c] + ";"
		}
		return b
	}
	function Ia(a, b) {
		if (Ac) {
			if (b && b.opacity !== Ra) {
				b.filter = "alpha(opacity=" + b.opacity * 100 + ")"
			}
		}
		qa(a.style, b)
	}
	function fb(a, b, c, d, e) {
		a = Aa.createElement(a);
		b && qa(a, b);
		e && Ia(a, {
			padding : 0,
			border : nb,
			margin : 0
		});
		c && Ia(a, c);
		d && d.appendChild(a);
		return a
	}
	function bc(a, b) {
		Bc = y(a, b.animation)
	}
	function Bd() {
		var a = Sa.global.useUTC;
		Cc = a ? Date.UTC : function (b, c, d, e, f, g) {
			return (new Date(b, c, y(d, 1), y(e, 0), y(f, 0), y(g, 0))).getTime()
		};
		bd = a ? "getUTCMinutes" : "getMinutes";
		cd = a ? "getUTCHours" : "getHours";
		dd = a ? "getUTCDay" : "getDay";
		oc = a ? "getUTCDate" : "getDate";
		Dc = a ? "getUTCMonth" : "getMonth";
		Ec = a ? "getUTCFullYear" : "getFullYear";
		Cd = a ? "setUTCMinutes" : "setMinutes";
		Dd = a ? "setUTCHours" : "setHours";
		ed = a ? "setUTCDate" : "setDate";
		Ed = a ? "setUTCMonth" : "setMonth";
		Fd = a ? "setUTCFullYear" : "setFullYear"
	}
	function Fc(a) {
		Gc || (Gc = fb(Lb));
		a && Gc.appendChild(a);
		Gc.innerHTML = ""
	}
	function xb(a, b) {
		var c = function () {};
		c.prototype = new a;
		qa(c.prototype, b);
		return c
	}
	function Gd(a, b, c, d) {
		var e = Sa.lang;
		a = a;
		var f = isNaN(b = cb(b)) ? 2 : b;
		b = c === undefined ? e.decimalPoint : c;
		d = d === undefined ? e.thousandsSep : d;
		e = a < 0 ? "-" : "";
		c = oa(a = cb(+a || 0).toFixed(f)) + "";
		var g = (g = c.length) > 3 ? g % 3 : 0;
		return e + (g ? c.substr(0, g) + d : "") + c.substr(g).replace(/(\d{3})(?=\d)/g, "$1" + d) + (f ? b + cb(a - c).toFixed(f).slice(2) : "")
	}
	function Hc() {}

	function Hd(a, b) {
		function c(m, h) {
			function x(l, p) {
				this.pos = l;
				this.minor = p;
				this.isNew = true;
				p || this.addLabel()
			}
			function w(l) {
				if (l) {
					this.options = l;
					this.id = l.id
				}
				return this
			}
			function O() {
				var l = [],
				p = [],
				r;
				Ta = u = null;
				Z = [];
				t(Ba, function (o) {
					r = false;
					t(["xAxis", "yAxis"], function (la) {
						if (o.isCartesian && (la == "xAxis" && ma || la == "yAxis" && !ma) && (o.options[la] == h.index || o.options[la] === Ra && h.index === 0)) {
							o[la] = s;
							Z.push(o);
							r = true
						}
					});
					if (!o.visible && v.ignoreHiddenSeries) {
						r = false
					}
					if (r) {
						var T,
						Y,
						G,
						B,
						ia;
						if (!ma) {
							T = o.options.stacking;
							Ic = T == "percent";
							if (T) {
								B = o.type + y(o.options.stack, "");
								ia = "-" + B;
								o.stackKey = B;
								Y = l[B] || [];
								l[B] = Y;
								G = p[ia] || [];
								p[ia] = G
							}
							if (Ic) {
								Ta = 0;
								u = 99
							}
						}
						if (o.isCartesian) {
							t(o.data, function (la) {
								var C = la.x,
								na = la.y,
								S = na < 0,
								$ = S ? G : Y;
								S = S ? ia : B;
								if (Ta === null) {
									Ta = u = la[H]
								}
								if (ma) {
									if (C > u) {
										u = C
									} else {
										if (C < Ta) {
											Ta = C
										}
									}
								} else {
									if (J(na)) {
										if (T) {
											$[C] = J($[C]) ? $[C] + na : na
										}
										na = $ ? $[C] : na;
										la = y(la.low, na);
										if (!Ic) {
											if (na > u) {
												u = na
											} else {
												if (la < Ta) {
													Ta = la
												}
											}
										}
										if (T) {
											ea[S] || (ea[S] = {});
											ea[S][C] = {
												total : na,
												cum : na
											}
										}
									}
								}
							});
							if (/(area|column|bar)/.test(o.type) && !ma) {
								if (Ta >= 0) {
									Ta = 0;
									Id = true
								} else {
									if (u < 0) {
										u = 0;
										Jd = true
									}
								}
							}
						}
					}
				})
			}
			function ja(l, p) {
				var r;
				Fb = p ? 1 : Ua.pow(10, ob(Ua.log(l) / Ua.LN10));
				r = l / Fb;
				if (!p) {
					p = [1, 2, 2.5, 5, 10];
					if (h.allowDecimals === false) {
						if (Fb == 1) {
							p = [1, 2, 5, 10]
						} else {
							if (Fb <= 0.1) {
								p = [1 / Fb]
							}
						}
					}
				}
				for (var o = 0; o < p.length; o++) {
					l = p[o];
					if (r <= (p[o] + (p[o + 1] || p[o])) / 2) {
						break
					}
				}
				l *= Fb;
				return l
			}
			function L(l) {
				var p;
				p = l;
				if (J(Fb)) {
					p = (Fb < 1 ? fa(1 / Fb) : 1) * 10;
					p = fa(l * p) / p
				}
				return p
			}
			function ga() {
				var l,
				p,
				r,
				o,
				T = h.tickInterval,
				Y = h.tickPixelInterval;
				l = h.maxZoom || (ma ? pb(m.smallestInterval * 5, u - Ta) : null);
				A = M ? wa : sa;
				if (Mb) {
					r = m[ma ? "xAxis" : "yAxis"][h.linkedTo];
					o = r.getExtremes();
					K = y(o.min, o.dataMin);
					P = y(o.max, o.dataMax)
				} else {
					K = y(pa, h.min, Ta);
					P = y(Na, h.max, u)
				}
				if (P - K < l) {
					o = (l - P + K) / 2;
					K = Ca(K - o, y(h.min, K - o), Ta);
					P = pb(K + l, y(h.max, K + l), u)
				}
				if (!Va && !Ic && !Mb && J(K) && J(P)) {
					l = P - K || 1;
					if (!J(h.min) && !J(pa) && Vb && (Ta < 0 || !Id)) {
						K -= l * Vb
					}
					if (!J(h.max) && !J(Na) && Kd && (u > 0 || !Jd)) {
						P += l * Kd
					}
				}
				Wa = K == P ? 1 : Mb && !T && Y == r.options.tickPixelInterval ? r.tickInterval : y(T, Va ? 1 : (P - K) * Y / A);
				if (!N && !J(h.tickInterval)) {
					Wa = ja(Wa)
				}
				s.tickInterval = Wa;
				Jc = h.minorTickInterval === "auto" && Wa ? Wa / 5 : h.minorTickInterval;
				if (N) {
					ra = [];
					T = Sa.global.useUTC;
					var G = 1000 / qb,
					B = 60000 / qb,
					ia = 3600000 / qb;
					Y = 86400000 / qb;
					l = 604800000 / qb;
					o = 2592000000 / qb;
					var la = 31556952000 / qb,
					C = [["second", G, [1, 2, 5, 10, 15, 30]], ["minute", B, [1, 2, 5, 10, 15, 30]], ["hour", ia, [1, 2, 3, 4, 6, 8, 12]], ["day", Y, [1, 2]], ["week", l, [1, 2]], ["month", o, [1, 2, 3, 4, 6]], ["year", la, null]],
					na = C[6],
					S = na[1],
					$ = na[2];
					for (r = 0; r < C.length; r++) {
						na = C[r];
						S = na[1];
						$ = na[2];
						if (C[r + 1]) {
							if (Wa <= (S * $[$.length - 1] + C[r + 1][1]) / 2) {
								break
							}
						}
					}
					if (S == la && Wa < 5 * S) {
						$ = [1, 2, 5]
					}
					C = ja(Wa / S, $);
					$ = new Date(K * qb);
					$.setMilliseconds(0);
					if (S >= G) {
						$.setSeconds(S >= B ? 0 : C * ob($.getSeconds() / C))
					}
					if (S >= B) {
						$[Cd](S >= ia ? 0 : C * ob($[bd]() / C))
					}
					if (S >= ia) {
						$[Dd](S >= Y ? 0 : C * ob($[cd]() / C))
					}
					if (S >= Y) {
						$[ed](S >= o ? 1 : C * ob($[oc]() / C))
					}
					if (S >= o) {
						$[Ed](S >= la ? 0 : C * ob($[Dc]() / C));
						p = $[Ec]()
					}
					if (S >= la) {
						p -= p % C;
						$[Fd](p)
					}
					S == l && $[ed]($[oc]() - $[dd]() + h.startOfWeek);
					r = 1;
					p = $[Ec]();
					G = $.getTime() / qb;
					B = $[Dc]();
					for (ia = $[oc](); G < P && r < wa; ) {
						ra.push(G);
						if (S == la) {
							G = Cc(p + r * C, 0) / qb
						} else {
							if (S == o) {
								G = Cc(p, B + r * C) / qb
							} else {
								if (!T && (S == Y || S == l)) {
									G = Cc(p, B, ia + r * C * (S == Y ? 1 : 7))
								} else {
									G += S * C
								}
							}
						}
						r++
					}
					ra.push(G);
					Kc = h.dateTimeLabelFormats[na[0]]
				} else {
					r = ob(K / Wa) * Wa;
					p = fd(P / Wa) * Wa;
					ra = [];
					for (r = L(r); r <= p; ) {
						ra.push(r);
						r = L(r + Wa)
					}
				}
				if (!Mb) {
					if (Va || ma && m.hasColumn) {
						p = (Va ? 1 : Wa) * 0.5;
						if (Va || !J(y(h.min, pa))) {
							K -= p
						}
						if (Va || !J(y(h.max, Na))) {
							P += p
						}
					}
					p = ra[0];
					r = ra[ra.length - 1];
					if (h.startOnTick) {
						K = p
					} else {
						K > p && ra.shift()
					}
					if (h.endOnTick) {
						P = r
					} else {
						P < r && ra.pop()
					}
					Gb || (Gb = {
							x : 0,
							y : 0
						});
					if (!N && ra.length > Gb[H]) {
						Gb[H] = ra.length
					}
				}
			}
			function Ea() {
				var l,
				p;
				gb = K;
				cc = P;
				O();
				ga();
				ha = D;
				D = A / (P - K || 1);
				if (!ma) {
					for (l in ea) {
						for (p in ea[l]) {
							ea[l][p].cum = ea[l][p].total
						}
					}
				}
				if (!s.isDirty) {
					s.isDirty = K != gb || P != cc
				}
			}
			function ua(l) {
				l = (new w(l)).render();
				Nb.push(l);
				return l
			}
			function bb() {
				var l = h.title,
				p = h.alternateGridColor,
				r = h.lineWidth,
				o,
				T,
				Y = m.hasRendered,
				G = Y && J(gb) && !isNaN(gb);
				o = Z.length && J(K) && J(P);
				A = M ? wa : sa;
				D = A / (P - K || 1);
				xa = M ? V : rb;
				if (o || Mb) {
					if (Jc && !Va) {
						for (o = K + (ra[0] - K) % Jc; o <= P; o += Jc) {
							Wb[o] || (Wb[o] = new x(o, true));
							G && Wb[o].isNew && Wb[o].render(null, true);
							Wb[o].isActive = true;
							Wb[o].render()
						}
					}
					t(ra, function (B, ia) {
						if (!Mb || B >= K && B <= P) {
							G && sb[B].isNew && sb[B].render(ia, true);
							sb[B].isActive = true;
							sb[B].render(ia)
						}
					});
					p && t(ra, function (B, ia) {
						if (ia % 2 === 0 && B < P) {
							dc[B] || (dc[B] = new w);
							dc[B].options = {
								from : B,
								to : ra[ia + 1] !== Ra ? ra[ia + 1] : P,
								color : p
							};
							dc[B].render();
							dc[B].isActive = true
						}
					});
					Y || t((h.plotLines || []).concat(h.plotBands || []), function (B) {
						Nb.push((new w(B)).render())
					})
				}
				t([sb, Wb, dc], function (B) {
					for (var ia in B) {
						if (B[ia].isActive) {
							B[ia].isActive = false
						} else {
							B[ia].destroy();
							delete B[ia]
						}
					}
				});
				if (r) {
					o = V + (Oa ? wa : 0) + Q;
					T = Pa - rb - (Oa ? sa : 0) + Q;
					o = aa.crispLine([Za, M ? V : o, M ? T : ba, Da, M ? Xa - Ab : o, M ? T : Pa - rb], r);
					if (Fa) {
						Fa.animate({
							d : o
						})
					} else {
						Fa = aa.path(o).attr({
								stroke : h.lineColor,
								"stroke-width" : r,
								zIndex : 7
							}).add()
					}
				}
				if (s.axisTitle) {
					o = M ? V : ba;
					r = oa(l.style.fontSize || 12);
					o = {
						low : o + (M ? 0 : A),
						middle : o + A / 2,
						high : o + (M ? A : 0)
					}
					[l.align];
					r = (M ? ba + sa : V) + (M ? 1 : -1) * (Oa ? -1 : 1) * gd + (E == 2 ? r : 0);
					s.axisTitle[Y ? "animate" : "attr"]({
						x : M ? o : r + (Oa ? wa : 0) + Q + (l.x || 0),
						y : M ? r - (Oa ? sa : 0) + Q : o + (l.y || 0)
					})
				}
				s.isDirty = false
			}
			function Ja(l) {
				for (var p = Nb.length; p--; ) {
					Nb[p].id == l && Nb[p].destroy()
				}
			}
			var ma = h.isX,
			Oa = h.opposite,
			M = Ga ? !ma : ma,
			E = M ? Oa ? 0 : 2 : Oa ? 1 : 3,
			ea = {};
			h = ya(ma ? Lc : hd, [Xd, Yd, Ld, Zd][E], h);
			var s = this,
			N = h.type == "datetime",
			Q = h.offset || 0,
			H = ma ? "x" : "y",
			A,
			D,
			ha,
			xa = M ? V : rb,
			va,
			Ka,
			tb,
			Hb,
			Fa,
			Ta,
			u,
			Z,
			pa,
			Na,
			P = null,
			K = null,
			gb,
			cc,
			Vb = h.minPadding,
			Kd = h.maxPadding,
			Mb = J(h.linkedTo),
			Id,
			Jd,
			Ic,
			Md = h.events,
			id,
			Nb = [],
			Wa,
			Jc,
			Fb,
			ra,
			sb = {},
			Wb = {},
			dc = {},
			ec,
			fc,
			gd,
			Kc,
			Va = h.categories,
			$d = h.labels.formatter || function () {
				var l = this.value;
				return Kc ? Mc(Kc, l) : Wa % 1000000 === 0 ? l / 1000000 + "M" : Wa % 1000 === 0 ? l / 1000 + "k" : !Va && l >= 1000 ? Gd(l, 0) : l
			},
			Nc = M && h.labels.staggerLines,
			Xb = h.reversed,
			Yb = Va && h.tickmarkPlacement == "between" ? 0.5 : 0;
			x.prototype = {
				addLabel : function () {
					var l = this.pos,
					p = h.labels,
					r = !(l == K && !y(h.showFirstLabel, 1) || l == P && !y(h.showLastLabel, 0)),
					o = Va && M && Va.length && !p.step && !p.staggerLines && !p.rotation && wa / Va.length || !M && wa / 2,
					T = this.label;
					l = $d.call({
							isFirst : l == ra[0],
							isLast : l == ra[ra.length - 1],
							dateTimeLabelFormat : Kc,
							value : Va && Va[l] ? Va[l] : l
						});
					o = o && {
						width : o - 2 * (p.padding || 10) + $a
					};
					o = qa(o, p.style);
					if (T === Ra) {
						this.label = J(l) && r && p.enabled ? aa.text(l, 0, 0).attr({
								align : p.align,
								rotation : p.rotation
							}).css(o).add(tb) : null
					} else {
						T && T.attr({
							text : l
						}).css(o)
					}
				},
				getLabelSize : function () {
					var l = this.label;
					return l ? (this.labelBBox = l.getBBox())[M ? "height" : "width"] : 0
				},
				render : function (l, p) {
					var r = !this.minor,
					o = this.label,
					T = this.pos,
					Y = h.labels,
					G = this.gridLine,
					B = r ? h.gridLineWidth : h.minorGridLineWidth,
					ia = r ? h.gridLineColor : h.minorGridLineColor,
					la = r ? h.gridLineDashStyle : h.minorGridLineDashStyle,
					C = this.mark,
					na = r ? h.tickLength : h.minorTickLength,
					S = r ? h.tickWidth : h.minorTickWidth || 0,
					$ = r ? h.tickColor : h.minorTickColor,
					pc = r ? h.tickPosition : h.minorTickPosition;
					r = Y.step;
					var hb = p && Oc || Pa,
					Ob;
					Ob = M ? va(T + Yb, null, null, p) + xa : V + Q + (Oa ? (p && jd || Xa) - Ab - V : 0);
					hb = M ? hb - rb + Q - (Oa ? sa : 0) : hb - va(T + Yb, null, null, p) - xa;
					if (B) {
						T = Ka(T + Yb, B, p);
						if (G === Ra) {
							G = {
								stroke : ia,
								"stroke-width" : B
							};
							if (la) {
								G.dashstyle = la
							}
							this.gridLine = G = B ? aa.path(T).attr(G).add(Hb) : null
						}
						G && T && G.animate({
							d : T
						})
					}
					if (S) {
						if (pc == "inside") {
							na = -na
						}
						if (Oa) {
							na = -na
						}
						B = aa.crispLine([Za, Ob, hb, Da, Ob + (M ? 0 : -na), hb + (M ? na : 0)], S);
						if (C) {
							C.animate({
								d : B
							})
						} else {
							this.mark = aa.path(B).attr({
									stroke : $,
									"stroke-width" : S
								}).add(tb)
						}
					}
					if (o) {
						Ob = Ob + Y.x - (Yb && M ? Yb * D * (Xb ? -1 : 1) : 0);
						hb = hb + Y.y - (Yb && !M ? Yb * D * (Xb ? 1 : -1) : 0);
						J(Y.y) || (hb += parseInt(o.styles.lineHeight) * 0.9 - o.getBBox().height / 2);
						if (Nc) {
							hb += l % Nc * 16
						}
						if (r) {
							o[l % r ? "hide" : "show"]()
						}
						o[this.isNew ? "attr" : "animate"]({
							x : Ob,
							y : hb
						})
					}
					this.isNew = false
				},
				destroy : function () {
					for (var l in this) {
						this[l] && this[l].destroy && this[l].destroy()
					}
				}
			};
			w.prototype = {
				render : function () {
					var l = this,
					p = l.options,
					r = p.label,
					o = l.label,
					T = p.width,
					Y = p.to,
					G,
					B = p.from,
					ia = p.dashStyle,
					la = l.svgElem,
					C = [],
					na,
					S,
					$ = p.color;
					S = p.zIndex;
					var pc = p.events;
					if (T) {
						C = Ka(p.value, T);
						p = {
							stroke : $,
							"stroke-width" : T
						};
						if (ia) {
							p.dashstyle = ia
						}
					} else {
						if (J(B) && J(Y)) {
							B = Ca(B, K);
							Y = pb(Y, P);
							G = Ka(Y);
							if ((C = Ka(B)) && G) {
								C.push(G[4], G[5], G[1], G[2])
							} else {
								C = null
							}
							p = {
								fill : $
							}
						} else {
							return
						}
					}
					if (J(S)) {
						p.zIndex = S
					}
					if (la) {
						if (C) {
							la.animate({
								d : C
							}, null, la.onGetPath)
						} else {
							la.hide();
							la.onGetPath = function () {
								la.show()
							}
						}
					} else {
						if (C && C.length) {
							l.svgElem = la = aa.path(C).attr(p).add();
							if (pc) {
								ia = function (hb) {
									la.on(hb, function (Ob) {
										pc[hb].apply(l, [Ob])
									})
								};
								for (na in pc) {
									ia(na)
								}
							}
						}
					}
					if (r && J(r.text) && C && C.length && wa > 0 && sa > 0) {
						r = ya({
								align : M && G && "center",
								x : M ? !G && 4 : 10,
								verticalAlign : !M && G && "middle",
								y : M ? G ? 16 : 10 : G ? 6 : -4,
								rotation : M && !G && 90
							}, r);
						if (!o) {
							l.label = o = aa.text(r.text, 0, 0).attr({
									align : r.textAlign || r.align,
									rotation : r.rotation,
									zIndex : S
								}).css(r.style).add()
						}
						G = [C[1], C[4], C[6] || C[1]];
						C = [C[2], C[5], C[7] || C[2]];
						na = pb.apply(Ua, G);
						S = pb.apply(Ua, C);
						o.align(r, false, {
							x : na,
							y : S,
							width : Ca.apply(Ua, G) - na,
							height : Ca.apply(Ua, C) - S
						});
						o.show()
					} else {
						o && o.hide()
					}
					return l
				},
				destroy : function () {
					for (var l in this) {
						this[l] && this[l].destroy && this[l].destroy();
						delete this[l]
					}
					mc(Nb, this)
				}
			};
			va = function (l, p, r, o) {
				var T = 1,
				Y = 0,
				G = o ? ha : D;
				o = o ? gb : K;
				G || (G = D);
				if (r) {
					T *= -1;
					Y = A
				}
				if (Xb) {
					T *= -1;
					Y -= T * A
				}
				if (p) {
					if (Xb) {
						l = A - l
					}
					l = l / G + o
				} else {
					l = T * (l - o) * G + Y
				}
				return l
			};
			Ka = function (l, p, r) {
				var o,
				T,
				Y;
				l = va(l, null, null, r);
				var G = r && Oc || Pa,
				B = r && jd || Xa,
				ia;
				r = T = fa(l + xa);
				o = Y = fa(G - l - xa);
				if (isNaN(l)) {
					ia = true
				} else {
					if (M) {
						o = ba;
						Y = G - rb;
						if (r < V || r > V + wa) {
							ia = true
						}
					} else {
						r = V;
						T = B - Ab;
						if (o < ba || o > ba + sa) {
							ia = true
						}
					}
				}
				return ia ? null : aa.crispLine([Za, r, o, Da, T, Y], p || 0)
			};
			if (Ga && ma && Xb === Ra) {
				Xb = true
			}
			qa(s, {
				addPlotBand : ua,
				addPlotLine : ua,
				adjustTickAmount : function () {
					if (Gb && !N && !Va && !Mb) {
						var l = ec,
						p = ra.length;
						ec = Gb[H];
						if (p < ec) {
							for (; ra.length < ec; ) {
								ra.push(L(ra[ra.length - 1] + Wa))
							}
							D *= (p - 1) / (ec - 1);
							P = ra[ra.length - 1]
						}
						if (J(l) && ec != l) {
							s.isDirty = true
						}
					}
				},
				categories : Va,
				getExtremes : function () {
					return {
						min : K,
						max : P,
						dataMin : Ta,
						dataMax : u
					}
				},
				getPlotLinePath : Ka,
				getThreshold : function (l) {
					if (K > l) {
						l = K
					} else {
						if (P < l) {
							l = P
						}
					}
					return va(l, 0, 1)
				},
				isXAxis : ma,
				options : h,
				plotLinesAndBands : Nb,
				getOffset : function () {
					var l = Z.length && J(K) && J(P),
					p = 0,
					r = 0,
					o = h.title,
					T = h.labels,
					Y = [-1, 1, 1, -1][E];
					if (!tb) {
						tb = aa.g("axis").attr({
								zIndex : 7
							}).add();
						Hb = aa.g("grid").attr({
								zIndex : 1
							}).add()
					}
					fc = 0;
					if (l || Mb) {
						t(ra, function (B) {
							if (sb[B]) {
								sb[B].addLabel()
							} else {
								sb[B] = new x(B)
							}
							if (E === 0 || E == 2 || {
								1 : "left",
								3 : "right"
							}
								[E] == T.align) {
								fc = Ca(sb[B].getLabelSize(), fc)
							}
						});
						if (Nc) {
							fc += (Nc - 1) * 16
						}
					} else {
						for (var G in sb) {
							sb[G].destroy();
							delete sb[G]
						}
					}
					if (o && o.text) {
						if (!s.axisTitle) {
							s.axisTitle = aa.text(o.text, 0, 0).attr({
									zIndex : 7,
									rotation : o.rotation || 0,
									align : o.textAlign || {
										low : "left",
										middle : "center",
										high : "right"
									}
									[o.align]
								}).css(o.style).add()
						}
						p = s.axisTitle.getBBox()[M ? "height" : "width"];
						r = y(o.margin, M ? 5 : 10)
					}
					Q = Y * (h.offset || Pb[E]);
					gd = fc + (E != 2 && fc && Y * h.labels[M ? "y" : "x"]) + r;
					Pb[E] = Ca(Pb[E], gd + p + Y * Q)
				},
				render : bb,
				setCategories : function (l, p) {
					s.categories = Va = l;
					t(Z, function (r) {
						r.translate();
						r.setTooltipPoints(true)
					});
					s.isDirty = true;
					y(p, true) && m.redraw()
				},
				setExtremes : function (l, p, r, o) {
					r = y(r, true);
					La(s, "setExtremes", {
						min : l,
						max : p
					}, function () {
						pa = l;
						Na = p;
						r && m.redraw(o)
					})
				},
				setScale : Ea,
				setTickPositions : ga,
				translate : va,
				redraw : function () {
					gc.resetTracker && gc.resetTracker();
					bb();
					t(Nb, function (l) {
						l.render()
					});
					t(Z, function (l) {
						l.isDirty = true
					})
				},
				removePlotBand : Ja,
				removePlotLine : Ja,
				reversed : Xb,
				stacks : ea
			});
			for (id in Md) {
				Qa(s, id, Md[id])
			}
			Ea()
		}
		function d() {
			var m = {};
			return {
				add : function (h, x, w, O) {
					if (!m[h]) {
						x = aa.text(x, 0, 0).css(a.toolbar.itemStyle).align({
								align : "right",
								x : -Ab - 20,
								y : ba + 30
							}).on("click", O).attr({
								align : "right",
								zIndex : 20
							}).add();
						m[h] = x
					}
				},
				remove : function (h) {
					Fc(m[h].element);
					m[h] = null
				}
			}
		}
		function e(m) {
			function h() {
				var H = this.points || nc(this),
				A = H[0].series.xAxis,
				D = this.x;
				A = A && A.options.type == "datetime";
				var ha = Kb(D) || A,
				xa;
				xa = ha ? ['<span style="font-size: 10px">', A ? Mc("%A, %b %e, %Y", D) : D, "</span><br/>"] : [];
				t(H, function (va) {
					xa.push(va.point.tooltipFormatter(ha))
				});
				return xa.join("")
			}
			function x(H, A) {
				E = ma ? H : (2 * E + H) / 3;
				ea = ma ? A : (ea + A) / 2;
				s.translate(E, ea);
				kd = cb(H - E) > 1 || cb(A - ea) > 1 ? function () {
					x(H, A)
				}
				 : null
			}
			function w() {
				if (!ma) {
					var H = q.hoverPoints;
					s.hide();
					t(ga, function (A) {
						A && A.hide()
					});
					H && t(H, function (A) {
						A.setState()
					});
					q.hoverPoints = null;
					ma = true
				}
			}
			var O,
			ja = m.borderWidth,
			L = m.crosshairs,
			ga = [],
			Ea = m.style,
			ua = m.shared,
			bb = oa(Ea.padding),
			Ja = ja + bb,
			ma = true,
			Oa,
			M,
			E = 0,
			ea = 0;
			Ea.padding = 0;
			var s = aa.g("tooltip").attr({
					zIndex : 8
				}).add(),
			N = aa.rect(Ja, Ja, 0, 0, m.borderRadius, ja).attr({
					fill : m.backgroundColor,
					"stroke-width" : ja
				}).add(s).shadow(m.shadow),
			Q = aa.text("", bb + Ja, oa(Ea.fontSize) + bb + Ja).attr({
					zIndex : 1
				}).css(Ea).add(s);
			s.hide();
			return {
				shared : ua,
				refresh : function (H) {
					var A,
					D,
					ha,
					xa = 0,
					va = {},
					Ka = [];
					ha = H.tooltipPos;
					A = m.formatter || h;
					va = q.hoverPoints;
					var tb = function (Fa) {
						return {
							series : Fa.series,
							point : Fa,
							x : Fa.category,
							y : Fa.y,
							percentage : Fa.percentage,
							total : Fa.total || Fa.stackTotal
						}
					};
					if (ua) {
						va && t(va, function (Fa) {
							Fa.setState()
						});
						q.hoverPoints = H;
						t(H, function (Fa) {
							Fa.setState(yb);
							xa += Fa.plotY;
							Ka.push(tb(Fa))
						});
						D = H[0].plotX;
						xa = fa(xa) / H.length;
						va = {
							x : H[0].category
						};
						va.points = Ka;
						H = H[0]
					} else {
						va = tb(H)
					}
					va = A.call(va);
					O = H.series;
					D = ua ? D : H.plotX;
					xa = ua ? xa : H.plotY;
					A = fa(ha ? ha[0] : Ga ? wa - xa : D);
					D = fa(ha ? ha[1] : Ga ? sa - D : xa);
					ha = ua || !H.series.isCartesian || hc(A, D);
					if (va === false || !ha) {
						w()
					} else {
						if (ma) {
							s.show();
							ma = false
						}
						Q.attr({
							text : va
						});
						ha = Q.getBBox();
						Oa = ha.width + 2 * bb;
						M = ha.height + 2 * bb;
						N.attr({
							width : Oa,
							height : M,
							stroke : m.borderColor || H.color || O.color || "#606060"
						});
						A = A - Oa + V - 25;
						D = D - M + ba + 10;
						if (A < 7) {
							A = 7;
							D -= 30
						}
						if (D < 5) {
							D = 5
						} else {
							if (D + M > Pa) {
								D = Pa - M - 5
							}
						}
						x(fa(A - Ja), fa(D - Ja))
					}
					if (L) {
						L = nc(L);
						D = L.length;
						for (var Hb; D--; ) {
							if (L[D] && (Hb = H.series[D ? "yAxis" : "xAxis"])) {
								A = Hb.getPlotLinePath(H[D ? "y" : "x"], 1);
								if (ga[D]) {
									ga[D].attr({
										d : A,
										visibility : Bb
									})
								} else {
									ha = {
										"stroke-width" : L[D].width || 1,
										stroke : L[D].color || "#C0C0C0",
										zIndex : 2
									};
									if (L[D].dashStyle) {
										ha.dashstyle = L[D].dashStyle
									}
									ga[D] = aa.path(A).attr(ha).add()
								}
							}
						}
					}
				},
				hide : w
			}
		}
		function f(m, h) {
			function x(E) {
				var ea;
				E = E || ib.event;
				if (!E.target) {
					E.target = E.srcElement
				}
				ea = E.touches ? E.touches.item(0) : E;
				if (E.type != "mousemove" || ib.opera) {
					for (var s = ta, N = {
							left : s.offsetLeft,
							top : s.offsetTop
						}; s = s.offsetParent; ) {
						N.left += s.offsetLeft;
						N.top += s.offsetTop;
						if (s != Aa.body && s != Aa.documentElement) {
							N.left -= s.scrollLeft;
							N.top -= s.scrollTop
						}
					}
					qc = N
				}
				if (Ac) {
					E.chartX = E.x;
					E.chartY = E.y
				} else {
					if (ea.layerX === Ra) {
						E.chartX = ea.pageX - qc.left;
						E.chartY = ea.pageY - qc.top
					} else {
						E.chartX = E.layerX;
						E.chartY = E.layerY
					}
				}
				return E
			}
			function w(E) {
				var ea = {
					xAxis : [],
					yAxis : []
				};
				t(ab, function (s) {
					var N = s.translate,
					Q = s.isXAxis;
					ea[Q ? "xAxis" : "yAxis"].push({
						axis : s,
						value : N((Ga ? !Q : Q) ? E.chartX - V : sa - E.chartY + ba, true)
					})
				});
				return ea
			}
			function O() {
				var E = m.hoverSeries,
				ea = m.hoverPoint;
				ea && ea.onMouseOut();
				E && E.onMouseOut();
				rc && rc.hide();
				ld = null
			}
			function ja() {
				if (ua) {
					var E = {
						xAxis : [],
						yAxis : []
					},
					ea = ua.getBBox(),
					s = ea.x - V,
					N = ea.y - ba;
					if (Ea) {
						t(ab, function (Q) {
							var H = Q.translate,
							A = Q.isXAxis,
							D = Ga ? !A : A,
							ha = H(D ? s : sa - N - ea.height, true);
							H = H(D ? s + ea.width : sa - N, true);
							E[A ? "xAxis" : "yAxis"].push({
								axis : Q,
								min : pb(ha, H),
								max : Ca(ha, H)
							})
						});
						La(m, "selection", E, md)
					}
					ua = ua.destroy()
				}
				m.mouseIsDown = nd = Ea = false;
				Cb(Aa, Ib ? "touchend" : "mouseup", ja)
			}
			var L,
			ga,
			Ea,
			ua,
			bb = v.zoomType,
			Ja = /x/.test(bb),
			ma = /y/.test(bb),
			Oa = Ja && !Ga || ma && Ga,
			M = ma && !Ga || Ja && Ga;
			Pc = function () {
				if (Qc) {
					Qc.translate(V, ba);
					Ga && Qc.attr({
						width : m.plotWidth,
						height : m.plotHeight
					}).invert()
				} else {
					m.trackerGroup = Qc = aa.g("tracker").attr({
							zIndex : 9
						}).add()
				}
			};
			Pc();
			if (h.enabled) {
				m.tooltip = rc = e(h)
			}
			(function () {
				var E = true;
				ta.onmousedown = function (s) {
					s = x(s);
					m.mouseIsDown = nd = true;
					L = s.chartX;
					ga = s.chartY;
					Qa(Aa, Ib ? "touchend" : "mouseup", ja)
				};
				var ea = function (s) {
					if (!(s && s.touches && s.touches.length > 1)) {
						s = x(s);
						if (!Ib) {
							s.returnValue = false
						}
						var N = s.chartX,
						Q = s.chartY,
						H = !hc(N - V, Q - ba);
						if (Ib && s.type == "touchstart") {
							if (za(s.target, "isTracker")) {
								m.runTrackerClick || s.preventDefault()
							} else {
								!ae && !H && s.preventDefault()
							}
						}
						if (H) {
							E || O();
							if (N < V) {
								N = V
							} else {
								if (N > V + wa) {
									N = V + wa
								}
							}
							if (Q < ba) {
								Q = ba
							} else {
								if (Q > ba + sa) {
									Q = ba + sa
								}
							}
						}
						if (nd && s.type != "touchstart") {
							if (Ea = Math.sqrt(Math.pow(L - N, 2) + Math.pow(ga - Q, 2)) > 10) {
								if (ic && (Ja || ma) && hc(L - V, ga - ba)) {
									ua || (ua = aa.rect(V, ba, Oa ? 1 : wa, M ? 1 : sa, 0).attr({
												fill : "rgba(69,114,167,0.25)",
												zIndex : 7
											}).add())
								}
								if (ua && Oa) {
									N = N - L;
									ua.attr({
										width : cb(N),
										x : (N > 0 ? 0 : N) + L
									})
								}
								if (ua && M) {
									Q = Q - ga;
									ua.attr({
										height : cb(Q),
										y : (Q > 0 ? 0 : Q) + ga
									})
								}
							}
						} else {
							if (!H) {
								var A;
								Q = m.hoverPoint;
								N = m.hoverSeries;
								var D,
								ha,
								xa = Xa,
								va = Ga ? s.chartY : s.chartX - V;
								if (rc && h.shared) {
									A = [];
									D = Ba.length;
									for (ha = 0; ha < D; ha++) {
										if (Ba[ha].visible && Ba[ha].tooltipPoints.length) {
											s = Ba[ha].tooltipPoints[va];
											s._dist = cb(va - s.plotX);
											xa = pb(xa, s._dist);
											A.push(s)
										}
									}
									for (D = A.length; D--; ) {
										A[D]._dist > xa && A.splice(D, 1)
									}
									if (A.length && A[0].plotX != ld) {
										rc.refresh(A);
										ld = A[0].plotX
									}
								}
								if (N && N.tracker) {
									(s = N.tooltipPoints[va]) && s != Q && s.onMouseOver()
								}
							}
						}
						return (E = H) || !ic
					}
				};
				ta.onmousemove = ea;
				Qa(ta, "mouseleave", O);
				ta.ontouchstart = function (s) {
					if (Ja || ma) {
						ta.onmousedown(s)
					}
					ea(s)
				};
				ta.ontouchmove = ea;
				ta.ontouchend = function () {
					Ea && O()
				};
				ta.onclick = function (s) {
					var N = m.hoverPoint;
					s = x(s);
					s.cancelBubble = true;
					if (!Ea) {
						if (N && za(s.target, "isTracker")) {
							var Q = N.plotX,
							H = N.plotY;
							qa(N, {
								pageX : qc.left + V + (Ga ? wa - H : Q),
								pageY : qc.top + ba + (Ga ? sa - Q : H)
							});
							La(N.series, "click", qa(s, {
									point : N
								}));
							N.firePointEvent("click", s)
						} else {
							qa(s, w(s));
							hc(s.chartX - V, s.chartY - ba) && La(m, "click", s)
						}
					}
					Ea = false
				}
			})();
			Nd = setInterval(function () {
					kd && kd()
				}, 32);
			qa(this, {
				zoomX : Ja,
				zoomY : ma,
				resetTracker : O
			})
		}
		function g(m) {
			var h = m.type || v.type || v.defaultSeriesType,
			x = ub[h],
			w = q.hasRendered;
			if (w) {
				if (Ga && h == "column") {
					x = ub.bar
				} else {
					if (!Ga && h == "bar") {
						x = ub.column
					}
				}
			}
			h = new x;
			h.init(q, m);
			if (!w && h.inverted) {
				Ga = true
			}
			if (h.isCartesian) {
				ic = h.isCartesian
			}
			Ba.push(h);
			return h
		}
		function i() {
			v.alignTicks !== false && t(ab, function (m) {
				m.adjustTickAmount()
			});
			Gb = null
		}
		function k(m) {
			var h = q.isDirtyLegend,
			x,
			w = q.isDirtyBox,
			O = Ba.length,
			ja = O,
			L = q.clipRect;
			for (bc(m, q); ja--; ) {
				m = Ba[ja];
				if (m.isDirty && m.options.stacking) {
					x = true;
					break
				}
			}
			if (x) {
				for (ja = O; ja--; ) {
					m = Ba[ja];
					if (m.options.stacking) {
						m.isDirty = true
					}
				}
			}
			t(Ba, function (ga) {
				if (ga.isDirty) {
					ga.cleanData();
					ga.getSegments();
					if (ga.options.legendType == "point") {
						h = true
					}
				}
			});
			if (h && od.renderLegend) {
				od.renderLegend();
				q.isDirtyLegend = false
			}
			if (ic) {
				if (!Rc) {
					Gb = null;
					t(ab, function (ga) {
						ga.setScale()
					})
				}
				i();
				sc();
				t(ab, function (ga) {
					if (ga.isDirty || w) {
						ga.redraw();
						w = true
					}
				})
			}
			if (w) {
				pd();
				Pc();
				if (L) {
					Sc(L);
					L.animate({
						width : q.plotSizeX,
						height : q.plotSizeY
					})
				}
			}
			t(Ba, function (ga) {
				if (ga.isDirty && ga.visible && (!ga.isCartesian || ga.xAxis)) {
					ga.redraw()
				}
			});
			gc && gc.resetTracker && gc.resetTracker();
			La(q, "redraw")
		}
		function j() {
			var m = a.xAxis || {},
			h = a.yAxis || {},
			x;
			m = nc(m);
			t(m, function (w, O) {
				w.index = O;
				w.isX = true
			});
			h = nc(h);
			t(h, function (w, O) {
				w.index = O
			});
			ab = m.concat(h);
			q.xAxis = [];
			q.yAxis = [];
			ab = jc(ab, function (w) {
					x = new c(q, w);
					q[x.isXAxis ? "xAxis" : "yAxis"].push(x);
					return x
				});
			i()
		}
		function n(m, h) {
			kc = ya(a.title, m);
			tc = ya(a.subtitle, h);
			t([["title", m, kc], ["subtitle", h, tc]], function (x) {
				var w = x[0],
				O = q[w],
				ja = x[1];
				x = x[2];
				if (O && ja) {
					O.destroy();
					O = null
				}
				if (x && x.text && !O) {
					q[w] = aa.text(x.text, 0, 0).attr({
							align : x.align,
							"class" : "highcharts-" + w,
							zIndex : 1
						}).css(x.style).add().align(x, false, uc)
				}
			})
		}
		function z() {
			jb = v.renderTo;
			Od = Zb + qd++;
			if (Kb(jb)) {
				jb = Aa.getElementById(jb)
			}
			jb.innerHTML = "";
			if (!jb.offsetWidth) {
				Qb = jb.cloneNode(0);
				Ia(Qb, {
					position : lc,
					top : "-9999px",
					display : ""
				});
				Aa.body.appendChild(Qb)
			}
			Tc = (Qb || jb).offsetWidth;
			vc = (Qb || jb).offsetHeight;
			q.chartWidth = Xa = v.width || Tc || 600;
			q.chartHeight = Pa = v.height || (vc > 19 ? vc : 400);
			q.container = ta = fb(Lb, {
					className : "highcharts-container" + (v.className ? " " + v.className : ""),
					id : Od
				}, qa({
						position : Pd,
						overflow : vb,
						width : Xa + $a,
						height : Pa + $a,
						textAlign : "left"
					}, v.style), Qb || jb);
			q.renderer = aa = v.forExport ? new Uc(ta, Xa, Pa, true) : new Qd(ta, Xa, Pa);
			var m,
			h;
			if (Rd && ta.getBoundingClientRect) {
				m = function () {
					Ia(ta, {
						left : 0,
						top : 0
					});
					h = ta.getBoundingClientRect();
					Ia(ta, {
						left : -h.left % 1 + $a,
						top : -h.top % 1 + $a
					})
				};
				m();
				Qa(ib, "resize", m);
				Qa(q, "destroy", function () {
					Cb(ib, "resize", m)
				})
			}
		}
		function F() {
			function m() {
				var x = v.width || jb.offsetWidth,
				w = v.height || jb.offsetHeight;
				if (x && w) {
					if (x != Tc || w != vc) {
						clearTimeout(h);
						h = setTimeout(function () {
								rd(x, w, false)
							}, 100)
					}
					Tc = x;
					vc = w
				}
			}
			var h;
			Qa(window, "resize", m);
			Qa(q, "destroy", function () {
				Cb(window, "resize", m)
			})
		}
		function W() {
			var m = a.labels,
			h = a.credits,
			x;
			n();
			od = q.legend = new be(q);
			sc();
			t(ab, function (w) {
				w.setTickPositions(true)
			});
			i();
			sc();
			pd();
			ic && t(ab, function (w) {
				w.render()
			});
			if (!q.seriesGroup) {
				q.seriesGroup = aa.g("series-group").attr({
						zIndex : 3
					}).add()
			}
			t(Ba, function (w) {
				w.translate();
				w.setTooltipPoints();
				w.render()
			});
			m.items && t(m.items, function () {
				var w = qa(m.style, this.style),
				O = oa(w.left) + V,
				ja = oa(w.top) + ba + 12;
				delete w.left;
				delete w.top;
				aa.text(this.html, O, ja).attr({
					zIndex : 2
				}).css(w).add()
			});
			if (!q.toolbar) {
				q.toolbar = d(q)
			}
			if (h.enabled && !q.credits) {
				x = h.href;
				aa.text(h.text, 0, 0).on("click", function () {
					if (x) {
						location.href = x
					}
				}).attr({
					align : h.position.align,
					zIndex : 8
				}).css(h.style).add().align(h.position)
			}
			Pc();
			q.hasRendered = true;
			if (Qb) {
				jb.appendChild(ta);
				Fc(Qb)
			}
		}
		function ca() {
			var m = Ba.length,
			h = ta && ta.parentNode;
			La(q, "destroy");
			Cb(ib, "unload", ca);
			Cb(q);
			for (t(ab, function (x) {
					Cb(x)
				}); m--; ) {
				Ba[m].destroy()
			}
			if (ta) {
				ta.innerHTML = "";
				Cb(ta);
				h && h.removeChild(ta);
				ta = null
			}
			if (aa) {
				aa.alignedObjects = null
			}
			clearInterval(Nd);
			for (m in q) {
				delete q[m]
			}
		}
		function ka() {
			if (!wc && ib == ib.top && Aa.readyState != "complete") {
				Aa.attachEvent("onreadystatechange", function () {
					Aa.detachEvent("onreadystatechange", ka);
					ka()
				})
			} else {
				z();
				sd();
				td();
				t(a.series || [], function (m) {
					g(m)
				});
				q.inverted = Ga = y(Ga, a.chart.inverted);
				j();
				q.render = W;
				q.tracker = gc = new f(q, a.tooltip);
				W();
				La(q, "load");
				b && b.apply(q, [q]);
				t(q.callbacks, function (m) {
					m.apply(q, [q])
				})
			}
		}
		Lc = ya(Lc, Sa.xAxis);
		hd = ya(hd, Sa.yAxis);
		Sa.xAxis = Sa.yAxis = null;
		a = ya(Sa, a);
		var v = a.chart,
		I = v.margin;
		I = Eb(I) ? I : [I, I, I, I];
		var da = y(v.marginTop, I[0]),
		X = y(v.marginRight, I[1]),
		U = y(v.marginBottom, I[2]),
		R = y(v.marginLeft, I[3]),
		Ha = v.spacingTop,
		Ya = v.spacingRight,
		ud = v.spacingBottom,
		Vc = v.spacingLeft,
		uc,
		kc,
		tc,
		ba,
		Ab,
		rb,
		V,
		Pb,
		jb,
		Qb,
		ta,
		Od,
		Tc,
		vc,
		Xa,
		Pa,
		jd,
		Oc,
		Wc,
		vd,
		wd,
		Xc,
		q = this,
		ae = (I = v.events) && !!I.click,
		xd,
		hc,
		rc,
		nd,
		$b,
		Sd,
		yd,
		sa,
		wa,
		gc,
		Qc,
		Pc,
		od,
		Rb,
		Sb,
		qc,
		ic = v.showAxes,
		Rc = 0,
		ab = [],
		Gb,
		Ba = [],
		Ga,
		aa,
		kd,
		Nd,
		ld,
		pd,
		sc,
		sd,
		td,
		rd,
		md,
		Td,
		be = function (m) {
			function h(u, Z) {
				var pa = u.legendItem,
				Na = u.legendLine,
				P = u.legendSymbol,
				K = M.color,
				gb = Z ? L.itemStyle.color : K;
				K = Z ? u.color : K;
				pa && pa.css({
					fill : gb
				});
				Na && Na.attr({
					stroke : K
				});
				P && P.attr({
					stroke : K,
					fill : K
				})
			}
			function x(u, Z, pa) {
				var Na = u.legendItem,
				P = u.legendLine,
				K = u.legendSymbol;
				u = u.checkbox;
				Na && Na.attr({
					x : Z,
					y : pa
				});
				P && P.translate(Z, pa - 4);
				K && K.attr({
					x : Z + K.xOff,
					y : pa + K.yOff
				});
				if (u) {
					u.x = Z;
					u.y = pa
				}
			}
			function w() {
				t(bb, function (u) {
					var Z = u.checkbox;
					Z && Ia(Z, {
						left : Ka.attr("translateX") + u.legendItemWidth + Z.x - 40 + $a,
						top : Ka.attr("translateY") + Z.y - 11 + $a
					})
				})
			}
			function O(u) {
				var Z,
				pa,
				Na,
				P,
				K,
				gb = u.legendItem;
				P = u.series || u;
				if (!gb) {
					K = /^(bar|pie|area|column)$/.test(P.type);
					u.legendItem = gb = aa.text(L.labelFormatter.call(u), 0, 0).css(u.visible ? ma : M).on("mouseover", function () {
							u.setState(yb);
							gb.css(Oa)
						}).on("mouseout", function () {
							gb.css(u.visible ? ma : M);
							u.setState()
						}).on("click", function () {
							var Vb = function () {
								u.setVisible()
							};
							u.firePointEvent ? u.firePointEvent("legendItemClick", null, Vb) : La(u, "legendItemClick", null, Vb)
						}).attr({
							zIndex : 2
						}).add(Ka);
					if (!K && u.options && u.options.lineWidth) {
						var cc = u.options;
						P = {
							"stroke-width" : cc.lineWidth,
							zIndex : 2
						};
						if (cc.dashStyle) {
							P.dashstyle = cc.dashStyle
						}
						u.legendLine = aa.path([Za, -Ea - ua, 0, Da, -ua, 0]).attr(P).add(Ka)
					}
					if (K) {
						Z = aa.rect(pa = -Ea - ua, Na = -11, Ea, 12, 2).attr({
								"stroke-width" : 0,
								zIndex : 3
							}).add(Ka)
					} else {
						if (u.options && u.options.marker && u.options.marker.enabled) {
							Z = aa.symbol(u.symbol, pa = -Ea / 2 - ua, Na = -4, u.options.marker.radius).attr(u.pointAttr[db]).attr({
									zIndex : 3
								}).add(Ka)
						}
					}
					if (Z) {
						Z.xOff = pa;
						Z.yOff = Na
					}
					u.legendSymbol = Z;
					h(u, u.visible);
					if (u.options && u.options.showCheckbox) {
						u.checkbox = fb("input", {
								type : "checkbox",
								checked : u.selected,
								defaultChecked : u.selected
							}, L.itemCheckboxStyle, ta);
						Qa(u.checkbox, "click", function (Vb) {
							La(u, "checkboxClick", {
								checked : Vb.target.checked
							}, function () {
								u.select()
							})
						})
					}
				}
				Z = gb.getBBox();
				pa = u.legendItemWidth = L.itemWidth || Ea + ua + Z.width + ea;
				D = Z.height;
				if (ga && Q - N + pa > (Hb || Xa - 2 * E - N)) {
					Q = N;
					H += D
				}
				A = H;
				x(u, Q, H);
				if (ga) {
					Q += pa
				} else {
					H += D
				}
				tb = Hb || Ca(ga ? Q - N : pa, tb);
				bb.push(u)
			}
			function ja() {
				Q = N;
				H = s;
				A = tb = 0;
				bb = [];
				Ka || (Ka = aa.g("legend").attr({
							zIndex : 7
						}).add());
				Ta && Fa.reverse();
				t(Fa, function (Na) {
					if (Na.options.showInLegend) {
						t(Na.options.legendType == "point" ? Na.data : [Na], O)
					}
				});
				Ta && Fa.reverse();
				Rb = Hb || tb;
				Sb = A - s + D;
				if (xa || va) {
					Rb += 2 * E;
					Sb += 2 * E;
					if (ha) {
						Rb > 0 && Sb > 0 && ha.animate(ha.crisp(null, null, null, Rb, Sb))
					} else {
						ha = aa.rect(0, 0, Rb, Sb, L.borderRadius, xa || 0).attr({
								stroke : L.borderColor,
								"stroke-width" : xa || 0,
								fill : va || nb
							}).add(Ka).shadow(L.shadow)
					}
					ha[bb.length ? "show" : "hide"]()
				}
				for (var u = ["left", "right", "top", "bottom"], Z, pa = 4; pa--; ) {
					Z = u[pa];
					if (Ja[Z] && Ja[Z] != "auto") {
						L[pa < 2 ? "align" : "verticalAlign"] = Z;
						L[pa < 2 ? "x" : "y"] = oa(Ja[Z]) * (pa % 2 ? -1 : 1)
					}
				}
				Ka.align(qa(L, {
						width : Rb,
						height : Sb
					}), true, uc);
				Rc || w()
			}
			var L = m.options.legend;
			if (L.enabled) {
				var ga = L.layout == "horizontal",
				Ea = L.symbolWidth,
				ua = L.symbolPadding,
				bb,
				Ja = L.style,
				ma = L.itemStyle,
				Oa = L.itemHoverStyle,
				M = L.itemHiddenStyle,
				E = oa(Ja.padding),
				ea = 20,
				s = 18,
				N = 4 + E + Ea + ua,
				Q,
				H,
				A,
				D = 0,
				ha,
				xa = L.borderWidth,
				va = L.backgroundColor,
				Ka,
				tb,
				Hb = L.width,
				Fa = m.series,
				Ta = L.reversed;
				ja();
				Qa(m, "endResize", w);
				return {
					colorizeItem : h,
					destroyItem : function (u) {
						var Z = u.checkbox;
						t(["legendItem", "legendLine", "legendSymbol"], function (pa) {
							u[pa] && u[pa].destroy()
						});
						Z && Fc(u.checkbox)
					},
					renderLegend : ja
				}
			}
		};
		hc = function (m, h) {
			return m >= 0 && m <= wa && h >= 0 && h <= sa
		};
		Td = function () {
			La(q, "selection", {
				resetSelection : true
			}, md);
			q.toolbar.remove("zoom")
		};
		md = function (m) {
			var h = Sa.lang,
			x = q.pointCount < 100;
			q.toolbar.add("zoom", h.resetZoom, h.resetZoomTitle, Td);
			!m || m.resetSelection ? t(ab, function (w) {
				w.setExtremes(null, null, false, x)
			}) : t(m.xAxis.concat(m.yAxis), function (w) {
				var O = w.axis;
				if (q.tracker[O.isXAxis ? "zoomX" : "zoomY"]) {
					O.setExtremes(w.min, w.max, false, x)
				}
			});
			k()
		};
		sc = function () {
			var m = a.legend,
			h = y(m.margin, 10),
			x = m.x,
			w = m.y,
			O = m.align,
			ja = m.verticalAlign,
			L;
			sd();
			if ((q.title || q.subtitle) && !J(da)) {
				if (L = Ca(q.title && !kc.floating && !kc.verticalAlign && kc.y || 0, q.subtitle && !tc.floating && !tc.verticalAlign && tc.y || 0)) {
					ba = Ca(ba, L + y(kc.margin, 15) + Ha)
				}
			}
			if (m.enabled && !m.floating) {
				if (O == "right") {
					J(X) || (Ab = Ca(Ab, Rb - x + h + Ya))
				} else {
					if (O == "left") {
						J(R) || (V = Ca(V, Rb + x + h + Vc))
					} else {
						if (ja == "top") {
							J(da) || (ba = Ca(ba, Sb + w + h + Ha))
						} else {
							if (ja == "bottom") {
								J(U) || (rb = Ca(rb, Sb - w + h + ud))
							}
						}
					}
				}
			}
			ic && t(ab, function (ga) {
				ga.getOffset()
			});
			J(R) || (V += Pb[3]);
			J(da) || (ba += Pb[0]);
			J(U) || (rb += Pb[2]);
			J(X) || (Ab += Pb[1]);
			td()
		};
		rd = function (m, h, x) {
			var w = q.title,
			O = q.subtitle;
			Rc += 1;
			bc(x, q);
			Oc = Pa;
			jd = Xa;
			Xa = fa(m);
			Pa = fa(h);
			Ia(ta, {
				width : Xa + $a,
				height : Pa + $a
			});
			aa.setSize(Xa, Pa, x);
			wa = Xa - V - Ab;
			sa = Pa - ba - rb;
			Gb = null;
			t(ab, function (ja) {
				ja.isDirty = true;
				ja.setScale()
			});
			t(Ba, function (ja) {
				ja.isDirty = true
			});
			q.isDirtyLegend = true;
			q.isDirtyBox = true;
			sc();
			w && w.align(null, null, uc);
			O && O.align(null, null, uc);
			k(x);
			Oc = null;
			La(q, "resize");
			setTimeout(function () {
				La(q, "endResize", null, function () {
					Rc -= 1
				})
			}, Bc && Bc.duration || 500)
		};
		td = function () {
			q.plotLeft = V = fa(V);
			q.plotTop = ba = fa(ba);
			q.plotWidth = wa = fa(Xa - V - Ab);
			q.plotHeight = sa = fa(Pa - ba - rb);
			q.plotSizeX = Ga ? sa : wa;
			q.plotSizeY = Ga ? wa : sa;
			uc = {
				x : Vc,
				y : Ha,
				width : Xa - Vc - Ya,
				height : Pa - Ha - ud
			}
		};
		sd = function () {
			ba = y(da, Ha);
			Ab = y(X, Ya);
			rb = y(U, ud);
			V = y(R, Vc);
			Pb = [0, 0, 0, 0]
		};
		pd = function () {
			var m = v.borderWidth || 0,
			h = v.backgroundColor,
			x = v.plotBackgroundColor,
			w = v.plotBackgroundImage,
			O,
			ja = {
				x : V,
				y : ba,
				width : wa,
				height : sa
			};
			O = m + (v.shadow ? 8 : 0);
			if (m || h) {
				if (Wc) {
					Wc.animate(Wc.crisp(null, null, null, Xa - O, Pa - O))
				} else {
					Wc = aa.rect(O / 2, O / 2, Xa - O, Pa - O, v.borderRadius, m).attr({
							stroke : v.borderColor,
							"stroke-width" : m,
							fill : h || nb
						}).add().shadow(v.shadow)
				}
			}
			if (x) {
				if (vd) {
					vd.animate(ja)
				} else {
					vd = aa.rect(V, ba, wa, sa, 0).attr({
							fill : x
						}).add().shadow(v.plotShadow)
				}
			}
			if (w) {
				if (wd) {
					wd.animate(ja)
				} else {
					wd = aa.image(w, V, ba, wa, sa).add()
				}
			}
			if (v.plotBorderWidth) {
				if (Xc) {
					Xc.animate(Xc.crisp(null, V, ba, wa, sa))
				} else {
					Xc = aa.rect(V, ba, wa, sa, 0, v.plotBorderWidth).attr({
							stroke : v.plotBorderColor,
							"stroke-width" : v.plotBorderWidth,
							zIndex : 4
						}).add()
				}
			}
			q.isDirtyBox = false
		};
		Yc = Jb = 0;
		Qa(ib, "unload", ca);
		v.reflow !== false && Qa(q, "load", F);
		if (I) {
			for (xd in I) {
				Qa(q, xd, I[xd])
			}
		}
		q.options = a;
		q.series = Ba;
		q.addSeries = function (m, h, x) {
			var w;
			if (m) {
				bc(x, q);
				h = y(h, true);
				La(q, "addSeries", {
					options : m
				}, function () {
					w = g(m);
					w.isDirty = true;
					q.isDirtyLegend = true;
					h && q.redraw()
				})
			}
			return w
		};
		q.animation = y(v.animation, true);
		q.destroy = ca;
		q.get = function (m) {
			var h,
			x,
			w;
			for (h = 0; h < ab.length; h++) {
				if (ab[h].options.id == m) {
					return ab[h]
				}
			}
			for (h = 0; h < Ba.length; h++) {
				if (Ba[h].options.id == m) {
					return Ba[h]
				}
			}
			for (h = 0; h < Ba.length; h++) {
				w = Ba[h].data;
				for (x = 0; x < w.length; x++) {
					if (w[x].id == m) {
						return w[x]
					}
				}
			}
			return null
		};
		q.getSelectedPoints = function () {
			var m = [];
			t(Ba, function (h) {
				m = m.concat(zd(h.data, function (x) {
							return x.selected
						}))
			});
			return m
		};
		q.getSelectedSeries = function () {
			return zd(Ba, function (m) {
				return m.selected
			})
		};
		q.hideLoading = function () {
			Zc($b, {
				opacity : 0
			}, {
				duration : a.loading.hideDuration,
				complete : function () {
					Ia($b, {
						display : nb
					})
				}
			});
			yd = false
		};
		q.isInsidePlot = hc;
		q.redraw = k;
		q.setSize = rd;
		q.setTitle = n;
		q.showLoading = function (m) {
			var h = a.loading;
			if (!$b) {
				$b = fb(Lb, {
						className : "highcharts-loading"
					}, qa(h.style, {
							left : V + $a,
							top : ba + $a,
							width : wa + $a,
							height : sa + $a,
							zIndex : 10,
							display : nb
						}), ta);
				Sd = fb("span", null, h.labelStyle, $b)
			}
			Sd.innerHTML = m || a.lang.loading;
			if (!yd) {
				Ia($b, {
					opacity : 0,
					display : ""
				});
				Zc($b, {
					opacity : h.style.opacity
				}, {
					duration : h.showDuration
				});
				yd = true
			}
		};
		q.pointCount = 0;
		ka()
	}
	var Aa = document,
	ib = window,
	Ua = Math,
	fa = Ua.round,
	ob = Ua.floor,
	fd = Ua.ceil,
	Ca = Ua.max,
	pb = Ua.min,
	cb = Ua.abs,
	kb = Ua.cos,
	zb = Ua.sin,
	Tb = Ua.PI,
	Ud = Tb * 2 / 360,
	xc = navigator.userAgent,
	Ac = /msie/i.test(xc) && !ib.opera,
	yc = Aa.documentMode == 8,
	ce = /AppleWebKit/.test(xc),
	Rd = /Firefox/.test(xc),
	wc = !!Aa.createElementNS && !!Aa.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
	Ib = "ontouchstart" in Aa.documentElement,
	Jb,
	Yc,
	de = {},
	qd = 0,
	qb = 1,
	Gc,
	Sa,
	Mc,
	Bc,
	$c,
	Ra,
	Lb = "div",
	lc = "absolute",
	Pd = "relative",
	vb = "hidden",
	Zb = "highcharts-",
	Bb = "visible",
	$a = "px",
	nb = "none",
	Za = "M",
	Da = "L",
	Vd = "rgba(192,192,192," + (wc ? 0.000001 : 0.002) + ")",
	db = "",
	yb = "hover",
	Cc,
	bd,
	cd,
	dd,
	oc,
	Dc,
	Ec,
	Cd,
	Dd,
	ed,
	Ed,
	Fd,
	eb = ib.HighchartsAdapter,
	Db = eb || {},
	t = Db.each,
	zd = Db.grep,
	jc = Db.map,
	ya = Db.merge,
	Ad = Db.hyphenate,
	Qa = Db.addEvent,
	Cb = Db.removeEvent,
	La = Db.fireEvent,
	Zc = Db.animate,
	Sc = Db.stop,
	ub = {};
	eb && eb.init && eb.init();
	if (!eb && ib.jQuery) {
		var lb = jQuery;
		t = function (a, b) {
			for (var c = 0, d = a.length; c < d; c++) {
				if (b.call(a[c], a[c], c, a) === false) {
					return c
				}
			}
		};
		zd = lb.grep;
		jc = function (a, b) {
			for (var c = [], d = 0, e = a.length; d < e; d++) {
				c[d] = b.call(a[d], a[d], d, a)
			}
			return c
		};
		ya = function () {
			var a = arguments;
			return lb.extend(true, null, a[0], a[1], a[2], a[3])
		};
		Ad = function (a) {
			return a.replace(/([A-Z])/g, function (b, c) {
				return "-" + c.toLowerCase()
			})
		};
		Qa = function (a, b, c) {
			lb(a).bind(b, c)
		};
		Cb = function (a, b, c) {
			var d = Aa.removeEventListener ? "removeEventListener" : "detachEvent";
			if (Aa[d] && !a[d]) {
				a[d] = function () {}

			}
			lb(a).unbind(b, c)
		};
		La = function (a, b, c, d) {
			var e = lb.Event(b),
			f = "detached" + b;
			qa(e, c);
			if (a[b]) {
				a[f] = a[b];
				a[b] = null
			}
			lb(a).trigger(e);
			if (a[f]) {
				a[b] = a[f];
				a[f] = null
			}
			d && !e.isDefaultPrevented() && d(e)
		};
		Zc = function (a, b, c) {
			var d = lb(a);
			if (b.d) {
				a.toD = b.d;
				b.d = 1
			}
			d.stop();
			d.animate(b, c)
		};
		Sc = function (a) {
			lb(a).stop()
		};
		lb.extend(lb.easing, {
			easeOutQuad : function (a, b, c, d, e) {
				return -d * (b /= e) * (b - 2) + c
			}
		});
		var ee = jQuery.fx.step._default,
		fe = jQuery.fx.prototype.cur;
		lb.fx.step._default = function (a) {
			var b = a.elem;
			b.attr ? b.attr(a.prop, a.now) : ee.apply(this, arguments)
		};
		lb.fx.step.d = function (a) {
			var b = a.elem;
			if (!a.started) {
				var c = $c.init(b, b.d, b.toD);
				a.start = c[0];
				a.end = c[1];
				a.started = true
			}
			b.attr("d", $c.step(a.start, a.end, a.pos, b.toD))
		};
		lb.fx.prototype.cur = function () {
			var a = this.elem;
			return a.attr ? a.attr(this.prop) : fe.apply(this, arguments)
		}
	}
	$c = {
		init : function (a, b, c) {
			b = b || "";
			var d = a.shift,
			e = b.indexOf("C") > -1,
			f = e ? 7 : 3,
			g;
			b = b.split(" ");
			c = [].concat(c);
			var i,
			k,
			j = function (n) {
				for (g = n.length; g--; ) {
					n[g] == Za && n.splice(g + 1, 0, n[g + 1], n[g + 2], n[g + 1], n[g + 2])
				}
			};
			if (e) {
				j(b);
				j(c)
			}
			if (a.isArea) {
				i = b.splice(b.length - 6, 6);
				k = c.splice(c.length - 6, 6)
			}
			if (d) {
				c = [].concat(c).splice(0, f).concat(c);
				a.shift = false
			}
			if (b.length) {
				for (a = c.length; b.length < a; ) {
					d = [].concat(b).splice(b.length - f, f);
					if (e) {
						d[f - 6] = d[f - 2];
						d[f - 5] = d[f - 1]
					}
					b = b.concat(d)
				}
			}
			if (i) {
				b = b.concat(i);
				c = c.concat(k)
			}
			return [b, c]
		},
		step : function (a, b, c, d) {
			var e = [],
			f = a.length;
			if (c == 1) {
				e = d
			} else {
				if (f == b.length && c < 1) {
					for (; f--; ) {
						d = parseFloat(a[f]);
						e[f] = isNaN(d) ? a[f] : c * parseFloat(b[f] - d) + d
					}
				} else {
					e = b
				}
			}
			return e
		}
	};
	eb = {
		enabled : true,
		align : "center",
		x : 0,
		y : 15,
		style : {
			color : "#666",
			fontSize : "11px",
			lineHeight : "14px"
		}
	};
	Sa = {
		colors : ["#4572A7", "#AA4643", "#89A54E", "#80699B", "#3D96AE", "#DB843D", "#92A8CD", "#A47D7C", "#B5CA92"],
		symbols : ["circle", "diamond", "square", "triangle", "triangle-down"],
		lang : {
			loading : "Loading...",
			months : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			weekdays : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			decimalPoint : ".",
			resetZoom : "Reset zoom",
			resetZoomTitle : "Reset zoom level 1:1",
			thousandsSep : ","
		},
		global : {
			useUTC : true
		},
		chart : {
			borderColor : "#4572A7",
			borderRadius : 5,
			defaultSeriesType : "line",
			ignoreHiddenSeries : true,
			spacingTop : 10,
			spacingRight : 10,
			spacingBottom : 15,
			spacingLeft : 10,
			style : {
				fontFamily : '"Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
				fontSize : "12px"
			},
			backgroundColor : "#FFFFFF",
			plotBorderColor : "#C0C0C0"
		},
		title : {
			text : "Chart title",
			align : "center",
			y : 15,
			style : {
				color : "#3E576F",
				fontSize : "16px"
			}
		},
		subtitle : {
			text : "",
			align : "center",
			y : 30,
			style : {
				color : "#6D869F"
			}
		},
		plotOptions : {
			line : {
				allowPointSelect : false,
				showCheckbox : false,
				animation : {
					duration : 1000
				},
				events : {},
				lineWidth : 2,
				shadow : true,
				marker : {
					enabled : true,
					lineWidth : 0,
					radius : 4,
					lineColor : "#FFFFFF",
					states : {
						hover : {},
						select : {
							fillColor : "#FFFFFF",
							lineColor : "#000000",
							lineWidth : 2
						}
					}
				},
				point : {
					events : {}

				},
				dataLabels : ya(eb, {
					enabled : false,
					y : -6,
					formatter : function () {
						return this.y
					}
				}),
				showInLegend : true,
				states : {
					hover : {
						marker : {}

					},
					select : {
						marker : {}

					}
				},
				stickyTracking : true
			}
		},
		labels : {
			style : {
				position : lc,
				color : "#3E576F"
			}
		},
		legend : {
			enabled : true,
			align : "center",
			layout : "horizontal",
			labelFormatter : function () {
				return this.name
			},
			borderWidth : 1,
			borderColor : "#909090",
			borderRadius : 5,
			shadow : false,
			style : {
				padding : "5px"
			},
			itemStyle : {
				cursor : "pointer",
				color : "#3E576F"
			},
			itemHoverStyle : {
				cursor : "pointer",
				color : "#000000"
			},
			itemHiddenStyle : {
				color : "#C0C0C0"
			},
			itemCheckboxStyle : {
				position : lc,
				width : "13px",
				height : "13px"
			},
			symbolWidth : 16,
			symbolPadding : 5,
			verticalAlign : "bottom",
			x : 0,
			y : 0
		},
		loading : {
			hideDuration : 100,
			labelStyle : {
				fontWeight : "bold",
				position : Pd,
				top : "1em"
			},
			showDuration : 100,
			style : {
				position : lc,
				backgroundColor : "white",
				opacity : 0.5,
				textAlign : "center"
			}
		},
		tooltip : {
			enabled : true,
			backgroundColor : "rgba(255, 255, 255, .85)",
			borderWidth : 2,
			borderRadius : 5,
			shadow : true,
			snap : Ib ? 25 : 10,
			style : {
				color : "#333333",
				fontSize : "12px",
				padding : "5px",
				whiteSpace : "nowrap"
			}
		},
		toolbar : {
			itemStyle : {
				color : "#4572A7",
				cursor : "pointer"
			}
		},
		credits : {
			enabled : true,
			text : "Highcharts.com",
			href : "http://www.highcharts.com",
			position : {
				align : "right",
				x : -10,
				verticalAlign : "bottom",
				y : -5
			},
			style : {
				cursor : "pointer",
				color : "#909090",
				fontSize : "10px"
			}
		}
	};
	var Lc = {
		dateTimeLabelFormats : {
			second : "%H:%M:%S",
			minute : "%H:%M",
			hour : "%H:%M",
			day : "%e. %b",
			week : "%e. %b",
			month : "%b '%y",
			year : "%Y"
		},
		endOnTick : false,
		gridLineColor : "#C0C0C0",
		labels : eb,
		lineColor : "#C0D0E0",
		lineWidth : 1,
		max : null,
		min : null,
		minPadding : 0.01,
		maxPadding : 0.01,
		minorGridLineColor : "#E0E0E0",
		minorGridLineWidth : 1,
		minorTickColor : "#A0A0A0",
		minorTickLength : 2,
		minorTickPosition : "outside",
		startOfWeek : 1,
		startOnTick : false,
		tickColor : "#C0D0E0",
		tickLength : 5,
		tickmarkPlacement : "between",
		tickPixelInterval : 100,
		tickPosition : "outside",
		tickWidth : 1,
		title : {
			align : "middle",
			style : {
				color : "#6D869F",
				fontWeight : "bold"
			}
		},
		type : "linear"
	},
	hd = ya(Lc, {
			endOnTick : true,
			gridLineWidth : 1,
			tickPixelInterval : 72,
			showLastLabel : true,
			labels : {
				align : "right",
				x : -8,
				y : 3
			},
			lineWidth : 0,
			maxPadding : 0.05,
			minPadding : 0.05,
			startOnTick : true,
			tickWidth : 0,
			title : {
				rotation : 270,
				text : "Y-values"
			}
		}),
	Zd = {
		labels : {
			align : "right",
			x : -8,
			y : null
		},
		title : {
			rotation : 270
		}
	},
	Yd = {
		labels : {
			align : "left",
			x : 8,
			y : null
		},
		title : {
			rotation : 90
		}
	},
	Ld = {
		labels : {
			align : "center",
			x : 0,
			y : 14
		},
		title : {
			rotation : 0
		}
	},
	Xd = ya(Ld, {
			labels : {
				y : -5
			}
		}),
	wb = Sa.plotOptions;
	eb = wb.line;
	wb.spline = ya(eb);
	wb.scatter = ya(eb, {
			lineWidth : 0,
			states : {
				hover : {
					lineWidth : 0
				}
			}
		});
	wb.area = ya(eb, {});
	wb.areaspline = ya(wb.area);
	wb.column = ya(eb, {
			borderColor : "#FFFFFF",
			borderWidth : 1,
			borderRadius : 0,
			groupPadding : 0.2,
			marker : null,
			pointPadding : 0.1,
			minPointLength : 0,
			states : {
				hover : {
					brightness : 0.1,
					shadow : false
				},
				select : {
					color : "#C0C0C0",
					borderColor : "#000000",
					shadow : false
				}
			}
		});
	wb.bar = ya(wb.column, {
			dataLabels : {
				align : "left",
				x : 5,
				y : 0
			}
		});
	wb.pie = ya(eb, {
			borderColor : "#FFFFFF",
			borderWidth : 1,
			center : ["50%", "50%"],
			colorByPoint : true,
			dataLabels : {
				distance : 30,
				enabled : true,
				formatter : function () {
					return this.point.name
				},
				y : 5
			},
			legendType : "point",
			marker : null,
			size : "75%",
			showInLegend : false,
			slicedOffset : 10,
			states : {
				hover : {
					brightness : 0.1,
					shadow : false
				}
			}
		});
	Bd();
	var Ub = function (a) {
		var b = [],
		c;
		(function (d) {
			if (c = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/.exec(d)) {
				b = [oa(c[1]), oa(c[2]), oa(c[3]), parseFloat(c[4], 10)]
			} else {
				if (c = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(d)) {
					b = [oa(c[1], 16), oa(c[2], 16), oa(c[3], 16), 1]
				}
			}
		})(a);
		return {
			get : function (d) {
				return b && !isNaN(b[0]) ? d == "rgb" ? "rgb(" + b[0] + "," + b[1] + "," + b[2] + ")" : d == "a" ? b[3] : "rgba(" + b.join(",") + ")" : a
			},
			brighten : function (d) {
				if (ac(d) && d !== 0) {
					var e;
					for (e = 0; e < 3; e++) {
						b[e] += oa(d * 255);
						if (b[e] < 0) {
							b[e] = 0
						}
						if (b[e] > 255) {
							b[e] = 255
						}
					}
				}
				return this
			},
			setOpacity : function (d) {
				b[3] = d;
				return this
			}
		}
	};
	Mc = function (a, b, c) {
		function d(F) {
			return F.toString().replace(/^([0-9])$/, "0$1")
		}
		if (!J(b) || isNaN(b)) {
			return "Invalid date"
		}
		a = y(a, "%Y-%m-%d %H:%M:%S");
		b = new Date(b * qb);
		var e = b[cd](),
		f = b[dd](),
		g = b[oc](),
		i = b[Dc](),
		k = b[Ec](),
		j = Sa.lang,
		n = j.weekdays;
		j = j.months;
		b = {
			a : n[f].substr(0, 3),
			A : n[f],
			d : d(g),
			e : g,
			b : j[i].substr(0, 3),
			B : j[i],
			m : d(i + 1),
			y : k.toString().substr(2, 2),
			Y : k,
			H : d(e),
			I : d(e % 12 || 12),
			l : e % 12 || 12,
			M : d(b[bd]()),
			p : e < 12 ? "AM" : "PM",
			P : e < 12 ? "am" : "pm",
			S : d(b.getSeconds())
		};
		for (var z in b) {
			a = a.replace("%" + z, b[z])
		}
		return c ? a.substr(0, 1).toUpperCase() + a.substr(1) : a
	};
	Hc.prototype = {
		init : function (a, b) {
			this.element = Aa.createElementNS("http://www.w3.org/2000/svg", b);
			this.renderer = a
		},
		animate : function (a, b, c) {
			if (b = y(b, Bc, true)) {
				b = ya(b);
				if (c) {
					b.complete = c
				}
				Zc(this, a, b)
			} else {
				this.attr(a);
				c && c()
			}
		},
		attr : function (a, b) {
			var c,
			d,
			e,
			f,
			g = this.element,
			i = g.nodeName,
			k = this.renderer,
			j,
			n = this.shadows,
			z,
			F = this;
			if (Kb(a) && J(b)) {
				c = a;
				a = {};
				a[c] = b
			}
			if (Kb(a)) {
				c = a;
				if (i == "circle") {
					c = {
						x : "cx",
						y : "cy"
					}
					[c] || c
				} else {
					if (c == "strokeWidth") {
						c = "stroke-width"
					}
				}
				F = za(g, c) || this[c] || 0;
				if (c != "d" && c != "visibility") {
					F = parseFloat(F)
				}
			} else {
				for (c in a) {
					j = false;
					d = a[c];
					if (c == "d") {
						if (d && d.join) {
							d = d.join(" ")
						}
						if (/(NaN| {2}|^$)/.test(d)) {
							d = "M 0 0"
						}
						this.d = d
					} else {
						if (c == "x" && i == "text") {
							for (e = 0; e < g.childNodes.length; e++) {
								f = g.childNodes[e];
								za(f, "x") == za(g, "x") && za(f, "x", d)
							}
							if (this.rotation) {
								za(g, "transform", "rotate(" + this.rotation + " " + d + " " + oa(a.y || za(g, "y")) + ")")
							}
						} else {
							if (c == "fill") {
								d = k.color(d, g, c)
							} else {
								if (i == "circle" && (c == "x" || c == "y")) {
									c = {
										x : "cx",
										y : "cy"
									}
									[c] || c
								} else {
									if (c == "translateX" || c == "translateY" || c == "rotation" || c == "verticalAlign") {
										this[c] = d;
										this.updateTransform();
										j = true
									} else {
										if (c == "stroke") {
											d = k.color(d, g, c)
										} else {
											if (c == "dashstyle") {
												c = "stroke-dasharray";
												if (d) {
													d = d.toLowerCase().replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
													for (e = d.length; e--; ) {
														d[e] = oa(d[e]) * a["stroke-width"]
													}
													d = d.join(",")
												}
											} else {
												if (c == "isTracker") {
													this[c] = d
												} else {
													if (c == "width") {
														d = oa(d)
													} else {
														if (c == "align") {
															c = "text-anchor";
															d = {
																left : "start",
																center : "middle",
																right : "end"
															}
															[d]
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
					if (c == "strokeWidth") {
						c = "stroke-width"
					}
					if (ce && c == "stroke-width" && d === 0) {
						d = 0.000001
					}
					if (this.symbolName && /^(x|y|r|start|end|innerR)/.test(c)) {
						if (!z) {
							this.symbolAttr(a);
							z = true
						}
						j = true
					}
					if (n && /^(width|height|visibility|x|y|d)$/.test(c)) {
						for (e = n.length; e--; ) {
							za(n[e], c, d)
						}
					}
					if (c == "text") {
						this.textStr = d;
						this.added && k.buildText(this)
					} else {
						j || za(g, c, d)
					}
				}
			}
			return F
		},
		symbolAttr : function (a) {
			var b = this;
			t(["x", "y", "r", "start", "end", "width", "height", "innerR"], function (c) {
				b[c] = y(a[c], b[c])
			});
			b.attr({
				d : b.renderer.symbols[b.symbolName](b.x, b.y, b.r, {
					start : b.start,
					end : b.end,
					width : b.width,
					height : b.height,
					innerR : b.innerR
				})
			})
		},
		clip : function (a) {
			return this.attr("clip-path", "url(" + this.renderer.url + "#" + a.id + ")")
		},
		crisp : function (a, b, c, d, e) {
			var f,
			g = {},
			i = {},
			k;
			a = a || this.strokeWidth || 0;
			k = a % 2 / 2;
			i.x = ob(b || this.x || 0) + k;
			i.y = ob(c || this.y || 0) + k;
			i.width = ob((d || this.width || 0) - 2 * k);
			i.height = ob((e || this.height || 0) - 2 * k);
			i.strokeWidth = a;
			for (f in i) {
				if (this[f] != i[f]) {
					this[f] = g[f] = i[f]
				}
			}
			return g
		},
		css : function (a) {
			var b = this.element;
			b = a && a.width && b.nodeName == "text";
			if (a && a.color) {
				a.fill = a.color
			}
			this.styles = a = qa(this.styles, a);
			if (Ac && !wc) {
				b && delete a.width;
				Ia(this.element, a)
			} else {
				this.attr({
					style : Wd(a)
				})
			}
			b && this.added && this.renderer.buildText(this);
			return this
		},
		on : function (a, b) {
			var c = b;
			if (Ib && a == "click") {
				a = "touchstart";
				c = function (d) {
					d.preventDefault();
					b()
				}
			}
			this.element["on" + a] = c;
			return this
		},
		translate : function (a, b) {
			return this.attr({
				translateX : a,
				translateY : b
			})
		},
		invert : function () {
			this.inverted = true;
			this.updateTransform();
			return this
		},
		updateTransform : function () {
			var a = this.translateX || 0,
			b = this.translateY || 0,
			c = this.inverted,
			d = this.rotation,
			e = [];
			if (c) {
				a += this.attr("width");
				b += this.attr("height")
			}
			if (a || b) {
				e.push("translate(" + a + "," + b + ")")
			}
			if (c) {
				e.push("rotate(90) scale(-1,1)")
			} else {
				d && e.push("rotate(" + d + " " + this.x + " " + this.y + ")")
			}
			e.length && za(this.element, "transform", e.join(" "))
		},
		toFront : function () {
			var a = this.element;
			a.parentNode.appendChild(a);
			return this
		},
		align : function (a, b, c) {
			if (a) {
				this.alignOptions = a;
				this.alignByTranslate = b;
				c || this.renderer.alignedObjects.push(this)
			} else {
				a = this.alignOptions;
				b = this.alignByTranslate
			}
			c = y(c, this.renderer);
			var d = a.align,
			e = a.verticalAlign,
			f = (c.x || 0) + (a.x || 0),
			g = (c.y || 0) + (a.y || 0),
			i = {};
			if (/^(right|center)$/.test(d)) {
				f += (c.width - (a.width || 0)) / {
					right : 1,
					center : 2
				}
				[d]
			}
			i[b ? "translateX" : "x"] = fa(f);
			if (/^(bottom|middle)$/.test(e)) {
				g += (c.height - (a.height || 0)) / ({
					bottom : 1,
					middle : 2
				}
					[e] || 1)
			}
			i[b ? "translateY" : "y"] = fa(g);
			this[this.placed ? "animate" : "attr"](i);
			this.placed = true;
			return this
		},
		getBBox : function () {
			var a,
			b,
			c,
			d = this.rotation,
			e = d * Ud;
			try {
				a = qa({}, this.element.getBBox())
			} catch (f) {
				a = {
					width : 0,
					height : 0
				}
			}
			b = a.width;
			c = a.height;
			if (d) {
				a.width = cb(c * zb(e)) + cb(b * kb(e));
				a.height = cb(c * kb(e)) + cb(b * zb(e))
			}
			return a
		},
		show : function () {
			return this.attr({
				visibility : Bb
			})
		},
		hide : function () {
			return this.attr({
				visibility : vb
			})
		},
		add : function (a) {
			var b = this.renderer,
			c = a || b,
			d = c.element || b.box,
			e = d.childNodes,
			f = this.element,
			g = za(f, "zIndex");
			this.parentInverted = a && a.inverted;
			this.textStr !== undefined && b.buildText(this);
			if (g) {
				c.handleZ = true;
				g = oa(g)
			}
			if (c.handleZ) {
				for (c = 0; c < e.length; c++) {
					a = e[c];
					b = za(a, "zIndex");
					if (a != f && (oa(b) > g || !J(g) && J(b))) {
						d.insertBefore(f, a);
						return this
					}
				}
			}
			d.appendChild(f);
			this.added = true;
			return this
		},
		destroy : function () {
			var a = this.element || {},
			b = this.shadows,
			c = a.parentNode,
			d;
			a.onclick = a.onmouseout = a.onmouseover = a.onmousemove = null;
			Sc(this);
			c && c.removeChild(a);
			b && t(b, function (e) {
				(c = e.parentNode) && c.removeChild(e)
			});
			mc(this.renderer.alignedObjects, this);
			for (d in this) {
				delete this[d]
			}
			return null
		},
		empty : function () {
			for (var a = this.element, b = a.childNodes, c = b.length; c--; ) {
				a.removeChild(b[c])
			}
		},
		shadow : function (a) {
			var b = [],
			c,
			d = this.element,
			e = this.parentInverted ? "(-1,-1)" : "(1,1)";
			if (a) {
				for (a = 1; a <= 3; a++) {
					c = d.cloneNode(0);
					za(c, {
						isShadow : "true",
						stroke : "rgb(0, 0, 0)",
						"stroke-opacity" : 0.05 * a,
						"stroke-width" : 7 - 2 * a,
						transform : "translate" + e,
						fill : nb
					});
					d.parentNode.insertBefore(c, d);
					b.push(c)
				}
				this.shadows = b
			}
			return this
		}
	};
	var Uc = function () {
		this.init.apply(this, arguments)
	};
	Uc.prototype = {
		init : function (a, b, c, d) {
			var e = location,
			f;
			this.Element = Hc;
			f = this.createElement("svg").attr({
					xmlns : "http://www.w3.org/2000/svg",
					version : "1.1"
				});
			a.appendChild(f.element);
			this.box = f.element;
			this.boxWrapper = f;
			this.alignedObjects = [];
			this.url = Ac ? "" : e.href.replace(/#.*?$/, "");
			this.defs = this.createElement("defs").add();
			this.forExport = d;
			this.setSize(b, c, false)
		},
		createElement : function (a) {
			var b = new this.Element;
			b.init(this, a);
			return b
		},
		buildText : function (a) {
			for (var b = a.element, c = y(a.textStr, "").toString().replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">').replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(/<br[^>]?>/g), d = b.childNodes, e = /style="([^"]+)"/, f = /href="([^"]+)"/, g = za(b, "x"), i = a.styles, k = Rd && i && i.HcDirection == "rtl" && !this.forExport, j, n = i && oa(i.width), z = i && i.lineHeight, F, W = d.length; W--; ) {
				b.removeChild(d[W])
			}
			n && !a.added && this.box.appendChild(b);
			t(c, function (ca, ka) {
				var v,
				I = 0,
				da;
				ca = ca.replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||");
				v = ca.split("|||");
				t(v, function (X) {
					if (X !== "" || v.length == 1) {
						var U = {},
						R = Aa.createElementNS("http://www.w3.org/2000/svg", "tspan");
						e.test(X) && za(R, "style", X.match(e)[1].replace(/(;| |^)color([ :])/, "$1fill$2"));
						if (f.test(X)) {
							za(R, "onclick", 'location.href="' + X.match(f)[1] + '"');
							Ia(R, {
								cursor : "pointer"
							})
						}
						X = X.replace(/<(.|\n)*?>/g, "") || " ";
						if (k) {
							j = [];
							for (W = X.length; W--; ) {
								j.push(X.charAt(W))
							}
							X = j.join("")
						}
						R.appendChild(Aa.createTextNode(X));
						if (I) {
							U.dx = 3
						} else {
							U.x = g
						}
						if (!I) {
							if (ka) {
								da = oa(window.getComputedStyle(F, null).getPropertyValue("line-height"));
								if (isNaN(da)) {
									da = z || F.offsetHeight || 18
								}
								za(R, "dy", da)
							}
							F = R
						}
						za(R, U);
						b.appendChild(R);
						I++;
						if (n) {
							X = X.replace(/-/g, "- ").split(" ");
							for (var Ha, Ya = []; X.length || Ya.length; ) {
								Ha = b.getBBox().width;
								U = Ha > n;
								if (!U || X.length == 1) {
									X = Ya;
									Ya = [];
									if (X.length) {
										R = Aa.createElementNS("http://www.w3.org/2000/svg", "tspan");
										za(R, {
											x : g,
											dy : z || 16
										});
										b.appendChild(R);
										if (Ha > n) {
											n = Ha
										}
									}
								} else {
									R.removeChild(R.firstChild);
									Ya.unshift(X.pop())
								}
								R.appendChild(Aa.createTextNode(X.join(" ").replace(/- /g, "-")))
							}
						}
					}
				})
			})
		},
		crispLine : function (a, b) {
			if (a[1] == a[4]) {
				a[1] = a[4] = fa(a[1]) + b % 2 / 2
			}
			if (a[2] == a[5]) {
				a[2] = a[5] = fa(a[2]) + b % 2 / 2
			}
			return a
		},
		path : function (a) {
			return this.createElement("path").attr({
				d : a,
				fill : nb
			})
		},
		circle : function (a, b, c) {
			a = Eb(a) ? a : {
				x : a,
				y : b,
				r : c
			};
			return this.createElement("circle").attr(a)
		},
		arc : function (a, b, c, d, e, f) {
			if (Eb(a)) {
				b = a.y;
				c = a.r;
				d = a.innerR;
				e = a.start;
				f = a.end;
				a = a.x
			}
			return this.symbol("arc", a || 0, b || 0, c || 0, {
				innerR : d || 0,
				start : e || 0,
				end : f || 0
			})
		},
		rect : function (a, b, c, d, e, f) {
			if (Eb(a)) {
				b = a.y;
				c = a.width;
				d = a.height;
				e = a.r;
				a = a.x
			}
			e = this.createElement("rect").attr({
					rx : e,
					ry : e,
					fill : nb
				});
			return e.attr(e.crisp(f, a, b, Ca(c, 0), Ca(d, 0)))
		},
		setSize : function (a, b, c) {
			var d = this.alignedObjects,
			e = d.length;
			this.width = a;
			this.height = b;
			for (this.boxWrapper[y(c, true) ? "animate" : "attr"]({
					width : a,
					height : b
				}); e--; ) {
				d[e].align()
			}
		},
		g : function (a) {
			return this.createElement("g").attr(J(a) && {
				"class" : Zb + a
			})
		},
		image : function (a, b, c, d, e) {
			var f = {
				preserveAspectRatio : nb
			};
			arguments.length > 1 && qa(f, {
				x : b,
				y : c,
				width : d,
				height : e
			});
			f = this.createElement("image").attr(f);
			f.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a);
			return f
		},
		symbol : function (a, b, c, d, e) {
			var f,
			g = this.symbols[a];
			g = g && g(b, c, d, e);
			var i = /^url\((.*?)\)$/;
			if (g) {
				f = this.path(g);
				qa(f, {
					symbolName : a,
					x : b,
					y : c,
					r : d
				});
				e && qa(f, e)
			} else {
				if (i.test(a)) {
					a = a.match(i)[1];
					f = this.image(a).attr({
							x : b,
							y : c
						});
					fb("img", {
						onload : function () {
							var k = de[this.src] || [this.width, this.height];
							f.attr({
								width : k[0],
								height : k[1]
							}).translate(-fa(k[0] / 2), -fa(k[1] / 2))
						},
						src : a
					})
				} else {
					f = this.circle(b, c, d)
				}
			}
			return f
		},
		symbols : {
			square : function (a, b, c) {
				c = 0.707 * c;
				return [Za, a - c, b - c, Da, a + c, b - c, a + c, b + c, a - c, b + c, "Z"]
			},
			triangle : function (a, b, c) {
				return [Za, a, b - 1.33 * c, Da, a + c, b + 0.67 * c, a - c, b + 0.67 * c, "Z"]
			},
			"triangle-down" : function (a, b, c) {
				return [Za, a, b + 1.33 * c, Da, a - c, b - 0.67 * c, a + c, b - 0.67 * c, "Z"]
			},
			diamond : function (a, b, c) {
				return [Za, a, b - c, Da, a + c, b, a, b + c, a - c, b, "Z"]
			},
			arc : function (a, b, c, d) {
				var e = d.start,
				f = d.end - 0.000001,
				g = d.innerR,
				i = kb(e),
				k = zb(e),
				j = kb(f);
				f = zb(f);
				d = d.end - e < Tb ? 0 : 1;
				return [Za, a + c * i, b + c * k, "A", c, c, 0, d, 1, a + c * j, b + c * f, Da, a + g * j, b + g * f, "A", g, g, 0, d, 0, a + g * i, b + g * k, "Z"]
			}
		},
		clipRect : function (a, b, c, d) {
			var e = Zb + qd++,
			f = this.createElement("clipPath").attr({
					id : e
				}).add(this.defs);
			a = this.rect(a, b, c, d, 0).add(f);
			a.id = e;
			return a
		},
		color : function (a, b, c) {
			var d,
			e = /^rgba/;
			if (a && a.linearGradient) {
				var f = this;
				b = a.linearGradient;
				c = Zb + qd++;
				var g,
				i,
				k;
				g = f.createElement("linearGradient").attr({
						id : c,
						gradientUnits : "userSpaceOnUse",
						x1 : b[0],
						y1 : b[1],
						x2 : b[2],
						y2 : b[3]
					}).add(f.defs);
				t(a.stops, function (j) {
					if (e.test(j[1])) {
						d = Ub(j[1]);
						i = d.get("rgb");
						k = d.get("a")
					} else {
						i = j[1];
						k = 1
					}
					f.createElement("stop").attr({
						offset : j[0],
						"stop-color" : i,
						"stop-opacity" : k
					}).add(g)
				});
				return "url(" + this.url + "#" + c + ")"
			} else {
				if (e.test(a)) {
					d = Ub(a);
					za(b, c + "-opacity", d.get("a"));
					return d.get("rgb")
				} else {
					return a
				}
			}
		},
		text : function (a, b, c) {
			var d = Sa.chart.style;
			b = fa(y(b, 0));
			c = fa(y(c, 0));
			a = this.createElement("text").attr({
					x : b,
					y : c,
					text : a
				}).css({
					"font-family" : d.fontFamily,
					"font-size" : d.fontSize
				});
			a.x = b;
			a.y = c;
			return a
		}
	};
	var Ma;
	if (!wc) {
		var ge = xb(Hc, {
				init : function (a, b) {
					var c = ["<", b, ' filled="f" stroked="f"'],
					d = ["position: ", lc, ";"];
					if (b == "shape" || b == Lb) {
						d.push("left:0;top:0;width:10px;height:10px;")
					}
					if (yc) {
						d.push("visibility: ", b == Lb ? vb : Bb)
					}
					c.push(' style="', d.join(""), '"/>');
					if (b) {
						c = b == Lb || b == "span" || b == "img" ? c.join("") : a.prepVML(c);
						this.element = fb(c)
					}
					this.renderer = a
				},
				add : function (a) {
					var b = this.renderer,
					c = this.element,
					d = b.box;
					d = a ? a.element || a : d;
					a && a.inverted && b.invertChild(c, d);
					yc && d.gVis == vb && Ia(c, {
						visibility : vb
					});
					d.appendChild(c);
					this.added = true;
					this.alignOnAdd && this.updateTransform();
					return this
				},
				attr : function (a, b) {
					var c,
					d,
					e,
					f = this.element || {},
					g = f.style,
					i = f.nodeName,
					k = this.renderer,
					j = this.symbolName,
					n,
					z,
					F = this.shadows,
					W = this;
					if (Kb(a) && J(b)) {
						c = a;
						a = {};
						a[c] = b
					}
					if (Kb(a)) {
						c = a;
						W = c == "strokeWidth" || c == "stroke-width" ? this.strokeweight : this[c]
					} else {
						for (c in a) {
							d = a[c];
							n = false;
							if (j && /^(x|y|r|start|end|width|height|innerR)/.test(c)) {
								if (!z) {
									this.symbolAttr(a);
									z = true
								}
								n = true
							} else {
								if (c == "d") {
									d = d || [];
									this.d = d.join(" ");
									e = d.length;
									for (n = []; e--; ) {
										n[e] = ac(d[e]) ? fa(d[e] * 10) - 5 : d[e] == "Z" ? "x" : d[e]
									}
									d = n.join(" ") || "x";
									f.path = d;
									if (F) {
										for (e = F.length; e--; ) {
											F[e].path = d
										}
									}
									n = true
								} else {
									if (c == "zIndex" || c == "visibility") {
										if (yc && c == "visibility" && i == "DIV") {
											f.gVis = d;
											n = f.childNodes;
											for (e = n.length; e--; ) {
												Ia(n[e], {
													visibility : d
												})
											}
											if (d == Bb) {
												d = null
											}
										}
										if (d) {
											g[c] = d
										}
										n = true
									} else {
										if (/^(width|height)$/.test(c)) {
											if (this.updateClipping) {
												this[c] = d;
												this.updateClipping()
											} else {
												g[c] = d
											}
											n = true
										} else {
											if (/^(x|y)$/.test(c)) {
												this[c] = d;
												if (f.tagName == "SPAN") {
													this.updateTransform()
												} else {
													g[{
															x : "left",
															y : "top"
														}
														[c]] = d
												}
											} else {
												if (c == "class") {
													f.className = d
												} else {
													if (c == "stroke") {
														d = k.color(d, f, c);
														c = "strokecolor"
													} else {
														if (c == "stroke-width" || c == "strokeWidth") {
															f.stroked = d ? true : false;
															c = "strokeweight";
															this[c] = d;
															if (ac(d)) {
																d += $a
															}
														} else {
															if (c == "dashstyle") {
																(f.getElementsByTagName("stroke")[0] || fb(k.prepVML(["<stroke/>"]), null, null, f))[c] = d || "solid";
																this.dashstyle = d;
																n = true
															} else {
																if (c == "fill") {
																	if (i == "SPAN") {
																		g.color = d
																	} else {
																		f.filled = d != nb ? true : false;
																		d = k.color(d, f, c);
																		c = "fillcolor"
																	}
																} else {
																	if (c == "translateX" || c == "translateY" || c == "rotation" || c == "align") {
																		if (c == "align") {
																			c = "textAlign"
																		}
																		this[c] = d;
																		this.updateTransform();
																		n = true
																	} else {
																		if (c == "text") {
																			f.innerHTML = d;
																			n = true
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
							if (F && c == "visibility") {
								for (e = F.length; e--; ) {
									F[e].style[c] = d
								}
							}
							if (!n) {
								if (yc) {
									f[c] = d
								} else {
									za(f, c, d)
								}
							}
						}
					}
					return W
				},
				clip : function (a) {
					var b = this,
					c = a.members;
					c.push(b);
					b.destroyClip = function () {
						mc(c, b)
					};
					return b.css(a.getCSS(b.inverted))
				},
				css : function (a) {
					var b = this.element;
					if (b = a && b.tagName == "SPAN" && a.width) {
						delete a.width;
						this.textWidth = b;
						this.updateTransform()
					}
					this.styles = qa(this.styles, a);
					Ia(this.element, a);
					return this
				},
				destroy : function () {
					this.destroyClip && this.destroyClip();
					Hc.prototype.destroy.apply(this)
				},
				empty : function () {
					for (var a = this.element.childNodes, b = a.length, c; b--; ) {
						c = a[b];
						c.parentNode.removeChild(c)
					}
				},
				getBBox : function () {
					var a = this.element;
					if (a.nodeName == "text") {
						a.style.position = lc
					}
					return {
						x : a.offsetLeft,
						y : a.offsetTop,
						width : a.offsetWidth,
						height : a.offsetHeight
					}
				},
				on : function (a, b) {
					this.element["on" + a] = function () {
						var c = ib.event;
						c.target = c.srcElement;
						b(c)
					};
					return this
				},
				updateTransform : function () {
					if (this.added) {
						var a = this,
						b = a.element,
						c = a.translateX || 0,
						d = a.translateY || 0,
						e = a.x || 0,
						f = a.y || 0,
						g = a.textAlign || "left",
						i = {
							left : 0,
							center : 0.5,
							right : 1
						}
						[g],
						k = g && g != "left";
						if (c || d) {
							a.css({
								marginLeft : c,
								marginTop : d
							})
						}
						a.inverted && t(b.childNodes, function (I) {
							a.renderer.invertChild(I, b)
						});
						if (b.tagName == "SPAN") {
							var j,
							n;
							c = a.rotation;
							var z;
							j = 0;
							d = 1;
							var F = 0,
							W;
							z = oa(a.textWidth);
							var ca = a.xCorr || 0,
							ka = a.yCorr || 0,
							v = [c, g, b.innerHTML, a.textWidth].join(",");
							if (v != a.cTT) {
								if (J(c)) {
									j = c * Ud;
									d = kb(j);
									F = zb(j);
									Ia(b, {
										filter : c ? ["progid:DXImageTransform.Microsoft.Matrix(M11=", d, ", M12=", -F, ", M21=", F, ", M22=", d, ", sizingMethod='auto expand')"].join("") : nb
									})
								}
								j = b.offsetWidth;
								n = b.offsetHeight;
								if (j > z) {
									Ia(b, {
										width : z + $a,
										display : "block",
										whiteSpace : "normal"
									});
									j = z
								}
								z = fa(oa(b.style.fontSize || 12) * 1.2);
								ca = d < 0 && -j;
								ka = F < 0 && -n;
								W = d * F < 0;
								ca += F * z * (W ? 1 - i : i);
								ka -= d * z * (c ? W ? i : 1 - i : 1);
								if (k) {
									ca -= j * i * (d < 0 ? -1 : 1);
									if (c) {
										ka -= n * i * (F < 0 ? -1 : 1)
									}
									Ia(b, {
										textAlign : g
									})
								}
								a.xCorr = ca;
								a.yCorr = ka
							}
							Ia(b, {
								left : e + ca,
								top : f + ka
							});
							a.cTT = v
						}
					} else {
						this.alignOnAdd = true
					}
				},
				shadow : function (a) {
					var b = [],
					c = this.element,
					d = this.renderer,
					e,
					f = c.style,
					g,
					i = c.path;
					if ("" + c.path === "") {
						i = "x"
					}
					if (a) {
						for (a = 1; a <= 3; a++) {
							g = ['<shape isShadow="true" strokeweight="', 7 - 2 * a, '" filled="false" path="', i, '" coordsize="100,100" style="', c.style.cssText, '" />'];
							e = fb(d.prepVML(g), null, {
									left : oa(f.left) + 1,
									top : oa(f.top) + 1
								});
							g = ['<stroke color="black" opacity="', 0.05 * a, '"/>'];
							fb(d.prepVML(g), null, null, e);
							c.parentNode.insertBefore(e, c);
							b.push(e)
						}
						this.shadows = b
					}
					return this
				}
			});
		Ma = function () {
			this.init.apply(this, arguments)
		};
		Ma.prototype = ya(Uc.prototype, {
				isIE8 : xc.indexOf("MSIE 8.0") > -1,
				init : function (a, b, c) {
					var d;
					this.Element = ge;
					this.alignedObjects = [];
					d = this.createElement(Lb);
					a.appendChild(d.element);
					this.box = d.element;
					this.boxWrapper = d;
					this.setSize(b, c, false);
					if (!Aa.namespaces.hcv) {
						Aa.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");
						Aa.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
					}
				},
				clipRect : function (a, b, c, d) {
					var e = this.createElement();
					return qa(e, {
						members : [],
						left : a,
						top : b,
						width : c,
						height : d,
						getCSS : function (f) {
							var g = this.top,
							i = this.left,
							k = i + this.width,
							j = g + this.height;
							g = {
								clip : "rect(" + fa(f ? i : g) + "px," + fa(f ? j : k) + "px," + fa(f ? k : j) + "px," + fa(f ? g : i) + "px)"
							};
							!f && yc && qa(g, {
								width : k + $a,
								height : j + $a
							});
							return g
						},
						updateClipping : function () {
							t(e.members, function (f) {
								f.css(e.getCSS(f.inverted))
							})
						}
					})
				},
				color : function (a, b, c) {
					var d,
					e = /^rgba/;
					if (a && a.linearGradient) {
						var f,
						g,
						i = a.linearGradient,
						k,
						j,
						n,
						z;
						t(a.stops, function (F, W) {
							if (e.test(F[1])) {
								d = Ub(F[1]);
								f = d.get("rgb");
								g = d.get("a")
							} else {
								f = F[1];
								g = 1
							}
							if (W) {
								n = f;
								z = g
							} else {
								k = f;
								j = g
							}
						});
						a = 90 - Ua.atan((i[3] - i[1]) / (i[2] - i[0])) * 180 / Tb;
						c = ["<", c, ' colors="0% ', k, ",100% ", n, '" angle="', a, '" opacity="', z, '" o:opacity2="', j, '" type="gradient" focus="100%" />'];
						fb(this.prepVML(c), null, null, b)
					} else {
						if (e.test(a) && b.tagName != "IMG") {
							d = Ub(a);
							c = ["<", c, ' opacity="', d.get("a"), '"/>'];
							fb(this.prepVML(c), null, null, b);
							return d.get("rgb")
						} else {
							return a
						}
					}
				},
				prepVML : function (a) {
					var b = this.isIE8;
					a = a.join("");
					if (b) {
						a = a.replace("/>", ' xmlns="urn:schemas-microsoft-com:vml" />');
						a = a.indexOf('style="') == -1 ? a.replace("/>", ' style="display:inline-block;behavior:url(#default#VML);" />') : a.replace('style="', 'style="display:inline-block;behavior:url(#default#VML);')
					} else {
						a = a.replace("<", "<hcv:")
					}
					return a
				},
				text : function (a, b, c) {
					var d = Sa.chart.style;
					return this.createElement("span").attr({
						text : a,
						x : fa(b),
						y : fa(c)
					}).css({
						whiteSpace : "nowrap",
						fontFamily : d.fontFamily,
						fontSize : d.fontSize
					})
				},
				path : function (a) {
					return this.createElement("shape").attr({
						coordsize : "100 100",
						d : a
					})
				},
				circle : function (a, b, c) {
					return this.path(this.symbols.circle(a, b, c))
				},
				g : function (a) {
					var b;
					if (a) {
						b = {
							className : Zb + a,
							"class" : Zb + a
						}
					}
					return this.createElement(Lb).attr(b)
				},
				image : function (a, b, c, d, e) {
					var f = this.createElement("img").attr({
							src : a
						});
					arguments.length > 1 && f.css({
						left : b,
						top : c,
						width : d,
						height : e
					});
					return f
				},
				rect : function (a, b, c, d, e, f) {
					if (Eb(a)) {
						b = a.y;
						c = a.width;
						d = a.height;
						e = a.r;
						a = a.x
					}
					var g = this.symbol("rect");
					g.r = e;
					return g.attr(g.crisp(f, a, b, Ca(c, 0), Ca(d, 0)))
				},
				invertChild : function (a, b) {
					var c = b.style;
					Ia(a, {
						flip : "x",
						left : oa(c.width) - 10,
						top : oa(c.height) - 10,
						rotation : -90
					})
				},
				symbols : {
					arc : function (a, b, c, d) {
						var e = d.start,
						f = d.end,
						g = kb(e),
						i = zb(e),
						k = kb(f),
						j = zb(f);
						d = d.innerR;
						var n = 0.07 / c,
						z = d && 0.1 / d || 0;
						if (f - e === 0) {
							return ["x"]
						} else {
							if (2 * Tb - f + e < n) {
								k = -n
							} else {
								if (f - e < z) {
									k = kb(e + z)
								}
							}
						}
						return ["wa", a - c, b - c, a + c, b + c, a + c * g, b + c * i, a + c * k, b + c * j, "at", a - d, b - d, a + d, b + d, a + d * k, b + d * j, a + d * g, b + d * i, "x", "e"]
					},
					circle : function (a, b, c) {
						return ["wa", a - c, b - c, a + c, b + c, a + c, b, a + c, b, "e"]
					},
					rect : function (a, b, c, d) {
						if (!J(d)) {
							return []
						}
						var e = d.width;
						d = d.height;
						var f = a + e,
						g = b + d;
						c = pb(c, e, d);
						return [Za, a + c, b, Da, f - c, b, "wa", f - 2 * c, b, f, b + 2 * c, f - c, b, f, b + c, Da, f, g - c, "wa", f - 2 * c, g - 2 * c, f, g, f, g - c, f - c, g, Da, a + c, g, "wa", a, g - 2 * c, a + 2 * c, g, a + c, g, a, g - c, Da, a, b + c, "wa", a, b, a + 2 * c, b + 2 * c, a, b + c, a + c, b, "x", "e"]
					}
				}
			})
	}
	var Qd = wc ? Uc : Ma;
	Hd.prototype.callbacks = [];
	var zc = function () {};
	zc.prototype = {
		init : function (a, b) {
			var c;
			this.series = a;
			this.applyOptions(b);
			this.pointAttr = {};
			if (a.options.colorByPoint) {
				c = a.chart.options.colors;
				if (!this.options) {
					this.options = {}

				}
				this.color = this.options.color = this.color || c[Jb++];
				if (Jb >= c.length) {
					Jb = 0
				}
			}
			a.chart.pointCount++;
			return this
		},
		applyOptions : function (a) {
			var b = this.series;
			this.config = a;
			if (ac(a) || a === null) {
				this.y = a
			} else {
				if (Eb(a) && !ac(a.length)) {
					qa(this, a);
					this.options = a
				} else {
					if (Kb(a[0])) {
						this.name = a[0];
						this.y = a[1]
					} else {
						if (ac(a[0])) {
							this.x = a[0];
							this.y = a[1]
						}
					}
				}
			}
			if (this.x === Ra) {
				this.x = b.autoIncrement()
			}
		},
		destroy : function () {
			var a = this,
			b = a.series,
			c;
			b.chart.pointCount--;
			a == b.chart.hoverPoint && a.onMouseOut();
			b.chart.hoverPoints = null;
			Cb(a);
			t(["graphic", "tracker", "group", "dataLabel", "connector"], function (d) {
				a[d] && a[d].destroy()
			});
			a.legendItem && a.series.chart.legend.destroyItem(a);
			for (c in a) {
				a[c] = null
			}
		},
		select : function (a, b) {
			var c = this,
			d = c.series.chart;
			c.selected = a = y(a, !c.selected);
			c.firePointEvent(a ? "select" : "unselect");
			c.setState(a && "select");
			b || t(d.getSelectedPoints(), function (e) {
				if (e.selected && e != c) {
					e.selected = false;
					e.setState(db);
					e.firePointEvent("unselect")
				}
			})
		},
		onMouseOver : function () {
			var a = this.series.chart,
			b = a.tooltip,
			c = a.hoverPoint;
			c && c != this && c.onMouseOut();
			this.firePointEvent("mouseOver");
			b && !b.shared && b.refresh(this);
			this.setState(yb);
			a.hoverPoint = this
		},
		onMouseOut : function () {
			this.firePointEvent("mouseOut");
			this.setState();
			this.series.chart.hoverPoint = null
		},
		tooltipFormatter : function (a) {
			var b = this.series;
			return ['<span style="color:' + b.color + '">', this.name || b.name, "</span>: ", !a ? "<b>x = " + (this.name || this.x) + ",</b> " : "", "<b>", !a ? "y = " : "", this.y, "</b><br/>"].join("")
		},
		getDataLabelText : function () {
			return this.series.options.dataLabels.formatter.call({
				x : this.x,
				y : this.y,
				series : this.series,
				point : this,
				percentage : this.percentage,
				total : this.total || this.stackTotal
			})
		},
		update : function (a, b, c) {
			var d = this,
			e = d.series,
			f = d.dataLabel,
			g = d.graphic,
			i = e.chart;
			b = y(b, true);
			d.firePointEvent("update", {
				options : a
			}, function () {
				d.applyOptions(a);
				f && f.attr({
					text : d.getDataLabelText()
				});
				if (Eb(a)) {
					e.getAttribs();
					g && g.attr(d.pointAttr[e.state])
				}
				e.isDirty = true;
				b && i.redraw(c)
			})
		},
		remove : function (a, b) {
			var c = this,
			d = c.series,
			e = d.chart,
			f = d.data;
			bc(b, e);
			a = y(a, true);
			c.firePointEvent("remove", null, function () {
				mc(f, c);
				c.destroy();
				d.isDirty = true;
				a && e.redraw()
			})
		},
		firePointEvent : function (a, b, c) {
			var d = this,
			e = this.series.options;
			if (e.point.events[a] || d.options && d.options.events && d.options.events[a]) {
				this.importEvents()
			}
			if (a == "click" && e.allowPointSelect) {
				c = function (f) {
					d.select(null, f.ctrlKey || f.metaKey || f.shiftKey)
				}
			}
			La(this, a, b, c)
		},
		importEvents : function () {
			if (!this.hasImportedEvents) {
				var a = ya(this.series.options.point, this.options).events,
				b;
				this.events = a;
				for (b in a) {
					Qa(this, b, a[b])
				}
				this.hasImportedEvents = true
			}
		},
		setState : function (a) {
			var b = this.series,
			c = b.options.states,
			d = wb[b.type].marker && b.options.marker,
			e = d && !d.enabled,
			f = (d = d && d.states[a]) && d.enabled === false,
			g = b.stateMarkerGraphic,
			i = b.chart,
			k = this.pointAttr;
			a || (a = db);
			if (!(a == this.state || this.selected && a != "select" || c[a] && c[a].enabled === false || a && (f || e && !d.enabled))) {
				if (this.graphic) {
					this.graphic.attr(k[a])
				} else {
					if (a) {
						if (!g) {
							b.stateMarkerGraphic = g = i.renderer.circle(0, 0, k[a].r).attr(k[a]).add(b.group)
						}
						g.translate(this.plotX, this.plotY)
					}
					if (g) {
						g[a ? "show" : "hide"]()
					}
				}
				this.state = a
			}
		}
	};
	var mb = function () {};
	mb.prototype = {
		isCartesian : true,
		type : "line",
		pointClass : zc,
		pointAttrToOptions : {
			stroke : "lineColor",
			"stroke-width" : "lineWidth",
			fill : "fillColor",
			r : "radius"
		},
		init : function (a, b) {
			var c,
			d;
			d = a.series.length;
			this.chart = a;
			b = this.setOptions(b);
			qa(this, {
				index : d,
				options : b,
				name : b.name || "Series " + (d + 1),
				state : db,
				pointAttr : {},
				visible : b.visible !== false,
				selected : b.selected === true
			});
			d = b.events;
			for (c in d) {
				Qa(this, c, d[c])
			}
			if (d && d.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) {
				a.runTrackerClick = true
			}
			this.getColor();
			this.getSymbol();
			this.setData(b.data, false)
		},
		autoIncrement : function () {
			var a = this.options,
			b = this.xIncrement;
			b = y(b, a.pointStart, 0);
			this.pointInterval = y(this.pointInterval, a.pointInterval, 1);
			this.xIncrement = b + this.pointInterval;
			return b
		},
		cleanData : function () {
			var a = this.chart,
			b = this.data,
			c,
			d,
			e = a.smallestInterval,
			f,
			g;
			b.sort(function (i, k) {
				return i.x - k.x
			});
			for (g = b.length - 1; g >= 0; g--) {
				b[g - 1] && b[g - 1].x == b[g].x && b.splice(g - 1, 1)
			}
			for (g = b.length - 1; g >= 0; g--) {
				if (b[g - 1]) {
					f = b[g].x - b[g - 1].x;
					if (d === Ra || f < d) {
						d = f;
						c = g
					}
				}
			}
			if (e === Ra || d < e) {
				a.smallestInterval = d
			}
			this.closestPoints = c
		},
		getSegments : function () {
			var a = -1,
			b = [],
			c = this.data;
			t(c, function (d, e) {
				if (d.y === null) {
					e > a + 1 && b.push(c.slice(a + 1, e));
					a = e
				} else {
					e == c.length - 1 && b.push(c.slice(a + 1, e + 1))
				}
			});
			this.segments = b
		},
		setOptions : function (a) {
			var b = this.chart.options.plotOptions;
			return ya(b[this.type], b.series, a)
		},
		getColor : function () {
			var a = this.chart.options.colors;
			this.color = this.options.color || a[Jb++] || "#0000ff";
			if (Jb >= a.length) {
				Jb = 0
			}
		},
		getSymbol : function () {
			var a = this.chart.options.symbols;
			this.symbol = this.options.marker.symbol || a[Yc++];
			if (Yc >= a.length) {
				Yc = 0
			}
		},
		addPoint : function (a, b, c, d) {
			var e = this.data,
			f = this.graph,
			g = this.area,
			i = this.chart;
			a = (new this.pointClass).init(this, a);
			bc(d, i);
			if (f && c) {
				f.shift = c
			}
			if (g) {
				g.shift = c;
				g.isArea = true
			}
			b = y(b, true);
			e.push(a);
			c && e[0].remove(false);
			this.isDirty = true;
			b && i.redraw()
		},
		setData : function (a, b) {
			var c = this,
			d = c.data,
			e = c.initialColor,
			f = c.chart,
			g = d && d.length || 0;
			c.xIncrement = null;
			if (J(e)) {
				Jb = e
			}
			for (a = jc(nc(a || []), function (i) {
						return (new c.pointClass).init(c, i)
					}); g--; ) {
				d[g].destroy()
			}
			c.data = a;
			c.cleanData();
			c.getSegments();
			c.isDirty = true;
			f.isDirtyBox = true;
			y(b, true) && f.redraw(false)
		},
		remove : function (a, b) {
			var c = this,
			d = c.chart;
			a = y(a, true);
			if (!c.isRemoving) {
				c.isRemoving = true;
				La(c, "remove", null, function () {
					c.destroy();
					d.isDirtyLegend = d.isDirtyBox = true;
					a && d.redraw(b)
				})
			}
			c.isRemoving = false
		},
		translate : function () {
			for (var a = this.chart, b = this.options.stacking, c = this.xAxis.categories, d = this.yAxis, e = this.data, f = e.length; f--; ) {
				var g = e[f],
				i = g.x,
				k = g.y,
				j = g.low,
				n = d.stacks[(k < 0 ? "-" : "") + this.stackKey];
				g.plotX = this.xAxis.translate(i);
				if (b && this.visible && n && n[i]) {
					j = n[i];
					i = j.total;
					j.cum = j = j.cum - k;
					k = j + k;
					if (b == "percent") {
						j = i ? j * 100 / i : 0;
						k = i ? k * 100 / i : 0
					}
					g.percentage = i ? g.y * 100 / i : 0;
					g.stackTotal = i
				}
				if (J(j)) {
					g.yBottom = d.translate(j, 0, 1)
				}
				if (k !== null) {
					g.plotY = d.translate(k, 0, 1)
				}
				g.clientX = a.inverted ? a.plotHeight - g.plotX : g.plotX;
				g.category = c && c[g.x] !== Ra ? c[g.x] : g.x
			}
		},
		setTooltipPoints : function (a) {
			var b = this.chart,
			c = b.inverted,
			d = [],
			e = fa((c ? b.plotTop : b.plotLeft) + b.plotSizeX),
			f,
			g,
			i = [];
			if (a) {
				this.tooltipPoints = null
			}
			t(this.segments, function (k) {
				d = d.concat(k)
			});
			if (this.xAxis && this.xAxis.reversed) {
				d = d.reverse()
			}
			t(d, function (k, j) {
				f = d[j - 1] ? d[j - 1].high + 1 : 0;
				for (g = k.high = d[j + 1] ? ob((k.plotX + (d[j + 1] ? d[j + 1].plotX : e)) / 2) : e; f <= g; ) {
					i[c ? e - f++ : f++] = k
				}
			});
			this.tooltipPoints = i
		},
		onMouseOver : function () {
			var a = this.chart,
			b = a.hoverSeries;
			if (!(!Ib && a.mouseIsDown)) {
				b && b != this && b.onMouseOut();
				this.options.events.mouseOver && La(this, "mouseOver");
				this.tracker && this.tracker.toFront();
				this.setState(yb);
				a.hoverSeries = this
			}
		},
		onMouseOut : function () {
			var a = this.options,
			b = this.chart,
			c = b.tooltip,
			d = b.hoverPoint;
			d && d.onMouseOut();
			this && a.events.mouseOut && La(this, "mouseOut");
			c && !a.stickyTracking && c.hide();
			this.setState();
			b.hoverSeries = null
		},
		animate : function (a) {
			var b = this.chart,
			c = this.clipRect,
			d = this.options.animation;
			if (d && !Eb(d)) {
				d = {}

			}
			if (a) {
				if (!c.isAnimating) {
					c.attr("width", 0);
					c.isAnimating = true
				}
			} else {
				c.animate({
					width : b.plotSizeX
				}, d);
				this.animate = null
			}
		},
		drawPoints : function () {
			var a,
			b = this.data,
			c = this.chart,
			d,
			e,
			f,
			g,
			i,
			k;
			if (this.options.marker.enabled) {
				for (f = b.length; f--; ) {
					g = b[f];
					d = g.plotX;
					e = g.plotY;
					k = g.graphic;
					if (e !== Ra && !isNaN(e)) {
						a = g.pointAttr[g.selected ? "select" : db];
						i = a.r;
						if (k) {
							k.animate({
								x : d,
								y : e,
								r : i
							})
						} else {
							g.graphic = c.renderer.symbol(y(g.marker && g.marker.symbol, this.symbol), d, e, i).attr(a).add(this.group)
						}
					}
				}
			}
		},
		convertAttribs : function (a, b, c, d) {
			var e = this.pointAttrToOptions,
			f,
			g,
			i = {};
			a = a || {};
			b = b || {};
			c = c || {};
			d = d || {};
			for (f in e) {
				g = e[f];
				i[f] = y(a[g], b[f], c[f], d[f])
			}
			return i
		},
		getAttribs : function () {
			var a = this,
			b = wb[a.type].marker ? a.options.marker : a.options,
			c = b.states,
			d = c[yb],
			e,
			f = a.color,
			g = {
				stroke : f,
				fill : f
			},
			i = a.data,
			k = [],
			j,
			n = a.pointAttrToOptions;
			if (a.options.marker) {
				d.radius = d.radius || b.radius + 2;
				d.lineWidth = d.lineWidth || b.lineWidth + 1
			} else {
				d.color = d.color || Ub(d.color || f).brighten(d.brightness).get()
			}
			k[db] = a.convertAttribs(b, g);
			t([yb, "select"], function (F) {
				k[F] = a.convertAttribs(c[F], k[db])
			});
			a.pointAttr = k;
			for (f = i.length; f--; ) {
				g = i[f];
				if ((b = g.options && g.options.marker || g.options) && b.enabled === false) {
					b.radius = 0
				}
				e = false;
				if (g.options) {
					for (var z in n) {
						if (J(b[n[z]])) {
							e = true
						}
					}
				}
				if (e) {
					j = [];
					c = b.states || {};
					e = c[yb] = c[yb] || {};
					if (!a.options.marker) {
						e.color = Ub(e.color || g.options.color).brighten(e.brightness || d.brightness).get()
					}
					j[db] = a.convertAttribs(b, k[db]);
					j[yb] = a.convertAttribs(c[yb], k[yb], j[db]);
					j.select = a.convertAttribs(c.select, k.select, j[db])
				} else {
					j = k
				}
				g.pointAttr = j
			}
		},
		destroy : function () {
			var a = this,
			b = a.chart,
			c = /\/5[0-9\.]+ (Safari|Mobile)\//.test(xc),
			d,
			e;
			Cb(a);
			a.legendItem && a.chart.legend.destroyItem(a);
			t(a.data, function (f) {
				f.destroy()
			});
			t(["area", "graph", "dataLabelsGroup", "group", "tracker"], function (f) {
				if (a[f]) {
					d = c && f == "group" ? "hide" : "destroy";
					a[f][d]()
				}
			});
			if (b.hoverSeries == a) {
				b.hoverSeries = null
			}
			mc(b.series, a);
			for (e in a) {
				delete a[e]
			}
		},
		drawDataLabels : function () {
			if (this.options.dataLabels.enabled) {
				var a,
				b,
				c = this.data,
				d = this.options.dataLabels,
				e,
				f = this.dataLabelsGroup,
				g = this.chart,
				i = g.inverted,
				k = this.type,
				j;
				if (!f) {
					f = this.dataLabelsGroup = g.renderer.g(Zb + "data-labels").attr({
							visibility : this.visible ? Bb : vb,
							zIndex : 5
						}).translate(g.plotLeft, g.plotTop).add()
				}
				j = d.color;
				if (j == "auto") {
					j = null
				}
				d.style.color = y(j, this.color);
				t(c, function (n) {
					var z = n.barX;
					z = z && z + n.barW / 2 || n.plotX || -999;
					var F = y(n.plotY, -999),
					W = n.dataLabel,
					ca = d.align;
					e = n.getDataLabelText();
					a = (i ? g.plotWidth - F : z) + d.x;
					b = (i ? g.plotHeight - z : F) + d.y;
					if (k == "column") {
						a += {
							left : -1,
							right : 1
						}
						[ca] * n.barW / 2 || 0
					}
					if (W) {
						W.animate({
							x : a,
							y : b
						})
					} else {
						if (J(e)) {
							W = n.dataLabel = g.renderer.text(e, a, b).attr({
									align : ca,
									rotation : d.rotation,
									zIndex : 1
								}).css(d.style).add(f)
						}
					}
					i && !d.y && W.attr({
						y : b + parseInt(W.styles.lineHeight) * 0.9 - W.getBBox().height / 2
					})
				})
			}
		},
		drawGraph : function () {
			var a = this,
			b = a.options,
			c = a.graph,
			d = [],
			e,
			f = a.area,
			g = a.group,
			i = b.lineColor || a.color,
			k = b.lineWidth,
			j = b.dashStyle,
			n,
			z = a.chart.renderer,
			F = a.yAxis.getThreshold(b.threshold || 0),
			W = /^area/.test(a.type),
			ca = [],
			ka = [];
			t(a.segments, function (v) {
				n = [];
				t(v, function (U, R) {
					if (a.getPointSpline) {
						n.push.apply(n, a.getPointSpline(v, U, R))
					} else {
						n.push(R ? Da : Za);
						R && b.step && n.push(U.plotX, v[R - 1].plotY);
						n.push(U.plotX, U.plotY)
					}
				});
				if (v.length > 1) {
					d = d.concat(n)
				} else {
					ca.push(v[0])
				}
				if (W) {
					var I = [],
					da,
					X = n.length;
					for (da = 0; da < X; da++) {
						I.push(n[da])
					}
					X == 3 && I.push(Da, n[1], n[2]);
					if (b.stacking && a.type != "areaspline") {
						for (da = v.length - 1; da >= 0; da--) {
							I.push(v[da].plotX, v[da].yBottom)
						}
					} else {
						I.push(Da, v[v.length - 1].plotX, F, Da, v[0].plotX, F)
					}
					ka = ka.concat(I)
				}
			});
			a.graphPath = d;
			a.singlePoints = ca;
			if (W) {
				e = y(b.fillColor, Ub(a.color).setOpacity(b.fillOpacity || 0.75).get());
				if (f) {
					f.animate({
						d : ka
					})
				} else {
					a.area = a.chart.renderer.path(ka).attr({
							fill : e
						}).add(g)
				}
			}
			if (c) {
				c.animate({
					d : d
				})
			} else {
				if (k) {
					c = {
						stroke : i,
						"stroke-width" : k
					};
					if (j) {
						c.dashstyle = j
					}
					a.graph = z.path(d).attr(c).add(g).shadow(b.shadow)
				}
			}
		},
		render : function () {
			var a = this,
			b = a.chart,
			c,
			d,
			e = a.options,
			f = e.animation,
			g = f && a.animate;
			f = g ? f && f.duration || 500 : 0;
			var i = a.clipRect;
			d = b.renderer;
			if (!i) {
				i = a.clipRect = !b.hasRendered && b.clipRect ? b.clipRect : d.clipRect(0, 0, b.plotSizeX, b.plotSizeY);
				if (!b.clipRect) {
					b.clipRect = i
				}
			}
			if (!a.group) {
				c = a.group = d.g("series");
				if (b.inverted) {
					d = function () {
						c.attr({
							width : b.plotWidth,
							height : b.plotHeight
						}).invert()
					};
					d();
					Qa(b, "resize", d)
				}
				c.clip(a.clipRect).attr({
					visibility : a.visible ? Bb : vb,
					zIndex : e.zIndex
				}).translate(b.plotLeft, b.plotTop).add(b.seriesGroup)
			}
			a.drawDataLabels();
			g && a.animate(true);
			a.getAttribs();
			a.drawGraph && a.drawGraph();
			a.drawPoints();
			a.options.enableMouseTracking !== false && a.drawTracker();
			g && a.animate();
			setTimeout(function () {
				i.isAnimating = false;
				if ((c = a.group) && i != b.clipRect && i.renderer) {
					c.clip(a.clipRect = b.clipRect);
					i.destroy()
				}
			}, f);
			a.isDirty = false
		},
		redraw : function () {
			var a = this.chart,
			b = this.group;
			if (b) {
				a.inverted && b.attr({
					width : a.plotWidth,
					height : a.plotHeight
				});
				b.animate({
					translateX : a.plotLeft,
					translateY : a.plotTop
				})
			}
			this.translate();
			this.setTooltipPoints(true);
			this.render()
		},
		setState : function (a) {
			var b = this.options,
			c = this.graph,
			d = b.states;
			b = b.lineWidth;
			a = a || db;
			if (this.state != a) {
				this.state = a;
				if (!(d[a] && d[a].enabled === false)) {
					if (a) {
						b = d[a].lineWidth || b + 1
					}
					if (c && !c.dashstyle) {
						c.attr({
							"stroke-width" : b
						}, a ? 0 : 500)
					}
				}
			}
		},
		setVisible : function (a, b) {
			var c = this.chart,
			d = this.legendItem,
			e = this.group,
			f = this.tracker,
			g = this.dataLabelsGroup,
			i,
			k = this.data,
			j = c.options.chart.ignoreHiddenSeries;
			i = this.visible;
			i = (this.visible = a = a === Ra ? !i : a) ? "show" : "hide";
			e && e[i]();
			if (f) {
				f[i]()
			} else {
				for (e = k.length; e--; ) {
					f = k[e];
					f.tracker && f.tracker[i]()
				}
			}
			g && g[i]();
			d && c.legend.colorizeItem(this, a);
			this.isDirty = true;
			this.options.stacking && t(c.series, function (n) {
				if (n.options.stacking && n.visible) {
					n.isDirty = true
				}
			});
			if (j) {
				c.isDirtyBox = true
			}
			b !== false && c.redraw();
			La(this, i)
		},
		show : function () {
			this.setVisible(true)
		},
		hide : function () {
			this.setVisible(false)
		},
		select : function (a) {
			this.selected = a = a === Ra ? !this.selected : a;
			if (this.checkbox) {
				this.checkbox.checked = a
			}
			La(this, a ? "select" : "unselect")
		},
		drawTracker : function () {
			var a = this,
			b = a.options,
			c = [].concat(a.graphPath),
			d = c.length,
			e = a.chart,
			f = e.options.tooltip.snap,
			g = a.tracker,
			i = b.cursor;
			i = i && {
				cursor : i
			};
			var k = a.singlePoints,
			j;
			if (d) {
				for (j = d + 1; j--; ) {
					c[j] == Za && c.splice(j + 1, 0, c[j + 1] - f, c[j + 2], Da);
					if (j && c[j] == Za || j == d) {
						c.splice(j, 0, Da, c[j - 2] + f, c[j - 1])
					}
				}
			}
			for (j = 0; j < k.length; j++) {
				d = k[j];
				c.push(Za, d.plotX - f, d.plotY, Da, d.plotX + f, d.plotY)
			}
			if (g) {
				g.attr({
					d : c
				})
			} else {
				a.tracker = e.renderer.path(c).attr({
						isTracker : true,
						stroke : Vd,
						fill : nb,
						"stroke-width" : b.lineWidth + 2 * f,
						visibility : a.visible ? Bb : vb,
						zIndex : 1
					}).on(Ib ? "touchstart" : "mouseover", function () {
						e.hoverSeries != a && a.onMouseOver()
					}).on("mouseout", function () {
						b.stickyTracking || a.onMouseOut()
					}).css(i).add(e.trackerGroup)
			}
		}
	};
	Ma = xb(mb);
	ub.line = Ma;
	Ma = xb(mb, {
			type : "area"
		});
	ub.area = Ma;
	Ma = xb(mb, {
			type : "spline",
			getPointSpline : function (a, b, c) {
				var d = b.plotX,
				e = b.plotY,
				f = a[c - 1],
				g = a[c + 1],
				i,
				k,
				j,
				n;
				if (c && c < a.length - 1) {
					a = f.plotY;
					j = g.plotX;
					g = g.plotY;
					var z;
					i = (1.5 * d + f.plotX) / 2.5;
					k = (1.5 * e + a) / 2.5;
					j = (1.5 * d + j) / 2.5;
					n = (1.5 * e + g) / 2.5;
					z = (n - k) * (j - d) / (j - i) + e - n;
					k += z;
					n += z;
					if (k > a && k > e) {
						k = Ca(a, e);
						n = 2 * e - k
					} else {
						if (k < a && k < e) {
							k = pb(a, e);
							n = 2 * e - k
						}
					}
					if (n > g && n > e) {
						n = Ca(g, e);
						k = 2 * e - n
					} else {
						if (n < g && n < e) {
							n = pb(g, e);
							k = 2 * e - n
						}
					}
					b.rightContX = j;
					b.rightContY = n
				}
				if (c) {
					b = ["C", f.rightContX || f.plotX, f.rightContY || f.plotY, i || d, k || e, d, e];
					f.rightContX = f.rightContY = null
				} else {
					b = [Za, d, e]
				}
				return b
			}
		});
	ub.spline = Ma;
	Ma = xb(Ma, {
			type : "areaspline"
		});
	ub.areaspline = Ma;
	var ad = xb(mb, {
			type : "column",
			pointAttrToOptions : {
				stroke : "borderColor",
				"stroke-width" : "borderWidth",
				fill : "color",
				r : "borderRadius"
			},
			init : function () {
				mb.prototype.init.apply(this, arguments);
				var a = this,
				b = a.chart;
				b.hasColumn = true;
				b.hasRendered && t(b.series, function (c) {
					if (c.type == a.type) {
						c.isDirty = true
					}
				})
			},
			translate : function () {
				var a = this,
				b = a.chart,
				c = 0,
				d = a.xAxis.reversed,
				e = a.xAxis.categories,
				f = {},
				g,
				i;
				mb.prototype.translate.apply(a);
				t(b.series, function (I) {
					if (I.type == a.type) {
						if (I.options.stacking) {
							g = I.stackKey;
							if (f[g] === Ra) {
								f[g] = c++
							}
							i = f[g]
						} else {
							if (I.visible) {
								i = c++
							}
						}
						I.columnIndex = i
					}
				});
				var k = a.options,
				j = a.data,
				n = a.closestPoints;
				b = cb(j[1] ? j[n].plotX - j[n - 1].plotX : b.plotSizeX / (e ? e.length : 1));
				e = b * k.groupPadding;
				n = (b - 2 * e) / c;
				var z = k.pointWidth,
				F = J(z) ? (n - z) / 2 : n * k.pointPadding,
				W = Ca(y(z, n - 2 * F), 1),
				ca = F + (e + ((d ? c - a.columnIndex : a.columnIndex) || 0) * n - b / 2) * (d ? -1 : 1),
				ka = a.yAxis.getThreshold(k.threshold || 0),
				v = y(k.minPointLength, 5);
				t(j, function (I) {
					var da = I.plotY,
					X = I.yBottom || ka,
					U = I.plotX + ca,
					R = fd(pb(da, X)),
					Ha = fd(Ca(da, X) - R),
					Ya;
					if (cb(Ha) < v) {
						if (v) {
							Ha = v;
							R = cb(R - ka) > v ? X - v : ka - (da <= ka ? v : 0)
						}
						Ya = R - 3
					}
					qa(I, {
						barX : U,
						barY : R,
						barW : W,
						barH : Ha
					});
					I.shapeType = "rect";
					I.shapeArgs = {
						x : U,
						y : R,
						width : W,
						height : Ha,
						r : k.borderRadius
					};
					I.trackerArgs = J(Ya) && ya(I.shapeArgs, {
							height : Ca(6, Ha + 3),
							y : Ya
						})
				})
			},
			getSymbol : function () {},
			drawGraph : function () {},
			drawPoints : function () {
				var a = this,
				b = a.options,
				c = a.chart.renderer,
				d,
				e;
				t(a.data, function (f) {
					var g = f.plotY;
					if (g !== Ra && !isNaN(g)) {
						d = f.graphic;
						e = f.shapeArgs;
						if (d) {
							Sc(d);
							d.animate(e)
						} else {
							f.graphic = c[f.shapeType](e).attr(f.pointAttr[f.selected ? "select" : db]).add(a.group).shadow(b.shadow)
						}
					}
				})
			},
			drawTracker : function () {
				var a = this,
				b = a.chart,
				c = b.renderer,
				d,
				e,
				f = +new Date,
				g = a.options.cursor,
				i = g && {
					cursor : g
				},
				k;
				t(a.data, function (j) {
					e = j.tracker;
					d = j.trackerArgs || j.shapeArgs;
					if (j.y !== null) {
						if (e) {
							e.attr(d)
						} else {
							j.tracker = c[j.shapeType](d).attr({
									isTracker : f,
									fill : Vd,
									visibility : a.visible ? Bb : vb,
									zIndex : 1
								}).on(Ib ? "touchstart" : "mouseover", function (n) {
									k = n.relatedTarget || n.fromElement;
									b.hoverSeries != a && za(k, "isTracker") != f && a.onMouseOver();
									j.onMouseOver()
								}).on("mouseout", function (n) {
									if (!a.options.stickyTracking) {
										k = n.relatedTarget || n.toElement;
										za(k, "isTracker") != f && a.onMouseOut()
									}
								}).css(i).add(b.trackerGroup)
						}
					}
				})
			},
			animate : function (a) {
				var b = this,
				c = b.data;
				if (!a) {
					t(c, function (d) {
						var e = d.graphic;
						if (e) {
							e.attr({
								height : 0,
								y : b.yAxis.translate(0, 0, 1)
							});
							e.animate({
								height : d.barH,
								y : d.barY
							}, b.options.animation)
						}
					});
					b.animate = null
				}
			},
			remove : function () {
				var a = this,
				b = a.chart;
				b.hasRendered && t(b.series, function (c) {
					if (c.type == a.type) {
						c.isDirty = true
					}
				});
				mb.prototype.remove.apply(a, arguments)
			}
		});
	ub.column = ad;
	Ma = xb(ad, {
			type : "bar",
			init : function (a) {
				a.inverted = this.inverted = true;
				ad.prototype.init.apply(this, arguments)
			}
		});
	ub.bar = Ma;
	Ma = xb(mb, {
			type : "scatter",
			translate : function () {
				var a = this;
				mb.prototype.translate.apply(a);
				t(a.data, function (b) {
					b.shapeType = "circle";
					b.shapeArgs = {
						x : b.plotX,
						y : b.plotY,
						r : a.chart.options.tooltip.snap
					}
				})
			},
			drawTracker : function () {
				var a = this,
				b = a.options.cursor,
				c = b && {
					cursor : b
				},
				d;
				t(a.data, function (e) {
					(d = e.graphic) && d.attr({
						isTracker : true
					}).on("mouseover", function () {
						a.onMouseOver();
						e.onMouseOver()
					}).on("mouseout", function () {
						a.options.stickyTracking || a.onMouseOut()
					}).css(c)
				})
			},
			cleanData : function () {}

		});
	ub.scatter = Ma;
	Ma = xb(zc, {
			init : function () {
				zc.prototype.init.apply(this, arguments);
				var a = this,
				b;
				qa(a, {
					visible : a.visible !== false,
					name : y(a.name, "Slice")
				});
				b = function () {
					a.slice()
				};
				Qa(a, "select", b);
				Qa(a, "unselect", b);
				return a
			},
			setVisible : function (a) {
				var b = this.series.chart,
				c = this.tracker,
				d = this.dataLabel,
				e = this.connector,
				f;
				f = (this.visible = a = a === Ra ? !this.visible : a) ? "show" : "hide";
				this.group[f]();
				c && c[f]();
				d && d[f]();
				e && e[f]();
				this.legendItem && b.legend.colorizeItem(this, a)
			},
			slice : function (a, b, c) {
				var d = this.series.chart,
				e = this.slicedTranslation;
				bc(c, d);
				y(b, true);
				a = this.sliced = J(a) ? a : !this.sliced;
				this.group.animate({
					translateX : a ? e[0] : d.plotLeft,
					translateY : a ? e[1] : d.plotTop
				})
			}
		});
	Ma = xb(mb, {
			type : "pie",
			isCartesian : false,
			pointClass : Ma,
			pointAttrToOptions : {
				stroke : "borderColor",
				"stroke-width" : "borderWidth",
				fill : "color"
			},
			getColor : function () {
				this.initialColor = Jb
			},
			animate : function () {
				var a = this;
				t(a.data, function (b) {
					var c = b.graphic;
					b = b.shapeArgs;
					var d = -Tb / 2;
					if (c) {
						c.attr({
							r : 0,
							start : d,
							end : d
						});
						c.animate({
							r : b.r,
							start : b.start,
							end : b.end
						}, a.options.animation)
					}
				});
				a.animate = null
			},
			translate : function () {
				var a = 0,
				b = -0.25,
				c = this.options,
				d = c.slicedOffset,
				e = d + c.borderWidth,
				f = c.center,
				g = this.chart,
				i = g.plotWidth,
				k = g.plotHeight,
				j,
				n,
				z,
				F = this.data,
				W = 2 * Tb,
				ca,
				ka = pb(i, k),
				v,
				I,
				da,
				X = c.dataLabels.distance;
				f.push(c.size, c.innerSize || 0);
				f = jc(f, function (U, R) {
						return (v = /%$/.test(U)) ? [i, k, ka, ka][R] * oa(U) / 100 : U
					});
				this.getX = function (U, R) {
					z = Ua.asin((U - f[1]) / (f[2] / 2 + X));
					return f[0] + (R ? -1 : 1) * kb(z) * (f[2] / 2 + X)
				};
				this.center = f;
				t(F, function (U) {
					a += U.y
				});
				t(F, function (U) {
					ca = a ? U.y / a : 0;
					j = fa(b * W * 1000) / 1000;
					b += ca;
					n = fa(b * W * 1000) / 1000;
					U.shapeType = "arc";
					U.shapeArgs = {
						x : f[0],
						y : f[1],
						r : f[2] / 2,
						innerR : f[3] / 2,
						start : j,
						end : n
					};
					z = (n + j) / 2;
					U.slicedTranslation = jc([kb(z) * d + g.plotLeft, zb(z) * d + g.plotTop], fa);
					I = kb(z) * f[2] / 2;
					da = zb(z) * f[2] / 2;
					U.tooltipPos = [f[0] + I * 0.7, f[1] + da * 0.7];
					U.labelPos = [f[0] + I + kb(z) * X, f[1] + da + zb(z) * X, f[0] + I + kb(z) * e, f[1] + da + zb(z) * e, f[0] + I, f[1] + da, X < 0 ? "center" : z < W / 4 ? "left" : "right", z];
					U.percentage = ca * 100;
					U.total = a
				});
				this.setTooltipPoints()
			},
			render : function () {
				this.getAttribs();
				this.drawPoints();
				this.options.enableMouseTracking !== false && this.drawTracker();
				this.drawDataLabels();
				this.options.animation && this.animate && this.animate();
				this.isDirty = false
			},
			drawPoints : function () {
				var a = this.chart,
				b = a.renderer,
				c,
				d,
				e,
				f;
				t(this.data, function (g) {
					d = g.graphic;
					f = g.shapeArgs;
					e = g.group;
					if (!e) {
						e = g.group = b.g("point").attr({
								zIndex : 5
							}).add()
					}
					c = g.sliced ? g.slicedTranslation : [a.plotLeft, a.plotTop];
					e.translate(c[0], c[1]);
					if (d) {
						d.animate(f)
					} else {
						g.graphic = b.arc(f).attr(qa(g.pointAttr[db], {
									"stroke-linejoin" : "round"
								})).add(g.group)
					}
					g.visible === false && g.setVisible(false)
				})
			},
			drawDataLabels : function () {
				var a = this.data,
				b,
				c = this.chart,
				d = this.options.dataLabels,
				e = y(d.connectorPadding, 10),
				f = y(d.connectorWidth, 1),
				g,
				i,
				k = d.distance > 0,
				j,
				n,
				z = this.center[1],
				F = [[], [], [], []],
				W,
				ca,
				ka,
				v,
				I,
				da,
				X,
				U = 4,
				R;
				mb.prototype.drawDataLabels.apply(this);
				t(a, function (Ha) {
					var Ya = Ha.labelPos[7];
					F[Ya < 0 ? 0 : Ya < Tb / 2 ? 1 : Ya < Tb ? 2 : 3].push(Ha)
				});
				F[1].reverse();
				F[3].reverse();
				for (X = function (Ha, Ya) {
					return Ha.y > Ya.y
				}; U--; ) {
					a = 0;
					b = [].concat(F[U]);
					b.sort(X);
					for (R = b.length; R--; ) {
						b[R].rank = R
					}
					for (v = 0; v < 2; v++) {
						n = (da = U % 3) ? 9999 : -9999;
						I = da ? -1 : 1;
						for (R = 0; R < F[U].length; R++) {
							b = F[U][R];
							if (g = b.dataLabel) {
								i = b.labelPos;
								ka = Bb;
								W = i[0];
								ca = i[1];
								j || (j = g && g.getBBox().height);
								if (k) {
									if (v && b.rank < a) {
										ka = vb
									} else {
										if (!da && ca < n + j || da && ca > n - j) {
											ca = n + I * j;
											W = this.getX(ca, U > 1);
											if (!da && ca + j > z || da && ca - j < z) {
												if (v) {
													ka = vb
												} else {
													a++
												}
											}
										}
									}
								}
								if (b.visible === false) {
									ka = vb
								}
								if (ka == Bb) {
									n = ca
								}
								if (v) {
									g.attr({
										visibility : ka,
										align : i[6]
									})[g.moved ? "animate" : "attr"]({
										x : W + d.x + ({
											left : e,
											right : -e
										}
											[i[6]] || 0),
										y : ca + d.y
									});
									g.moved = true;
									if (k && f) {
										g = b.connector;
										i = [Za, W + (i[6] == "left" ? 5 : -5), ca, Da, W, ca, Da, i[2], i[3], Da, i[4], i[5]];
										if (g) {
											g.animate({
												d : i
											});
											g.attr("visibility", ka)
										} else {
											b.connector = g = this.chart.renderer.path(i).attr({
													"stroke-width" : f,
													stroke : d.connectorColor || "#606060",
													visibility : ka,
													zIndex : 3
												}).translate(c.plotLeft, c.plotTop).add()
										}
									}
								}
							}
						}
					}
				}
			},
			drawTracker : ad.prototype.drawTracker,
			getSymbol : function () {}

		});
	ub.pie = Ma;
	ib.Highcharts = {
		Chart : Hd,
		dateFormat : Mc,
		pathAnim : $c,
		getOptions : function () {
			return Sa
		},
		numberFormat : Gd,
		Point : zc,
		Color : Ub,
		Renderer : Qd,
		seriesTypes : ub,
		setOptions : function (a) {
			Sa = ya(Sa, a);
			Bd();
			return Sa
		},
		Series : mb,
		addEvent : Qa,
		createElement : fb,
		discardElement : Fc,
		css : Ia,
		each : t,
		extend : qa,
		map : jc,
		merge : ya,
		pick : y,
		extendClass : xb,
		version : "2.1.4"
	}
})();