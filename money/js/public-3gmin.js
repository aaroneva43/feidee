initInput = function (parentId, width) {
	width = width == null ? 12 : width;
	$("#" + parentId + " input").each(function () {
		if (this.className.indexOf("text") != -1) {
			$(this).focus(function () {
				$(this).addClass("focus")
			});
			$(this).blur(function () {
				$(this).removeClass("focus")
			})
		}
	});
	$("#" + parentId + " .checkbox").each(function () {
		if ($("#h_" + this.id).val() == "1") {
			this.style.backgroundPositionX = "0";
			this.style.backgroundPosition = "0 0px"
		}
		$(this).click(function () {
			if ($("#h_" + this.id).val() == "0") {
				$("#h_" + this.id).val("1");
				this.style.backgroundPositionX = "0";
				this.style.backgroundPosition = "0 0px"
			} else {
				$("#h_" + this.id).val("0");
				this.style.backgroundPositionX = "-" + width + "px";
				this.style.backgroundPosition = "-" + width + "px 0px"
			}
		})
	})
};
function add13Click(btnId, e) {
	e = window.event || e;
	if (e.keyCode == 13) {
		document.getElementById(btnId).click();
		return false
	}
	return true
}
function doEnterClick(param) {
	var e = window.event || param.event;
	if (e.keyCode == 13) {
		param.func();
		return false
	}
	return true
}
var bigImages = ["/images/home/banner2_1.jpg", ];
function preLoadImg(resourceUrl) {
	$(window).load(function () {
		for (var i = 0; i < bigImages.length; i++) {
			var img = new Image();
			img.src = resourceUrl + bigImages[i];
			img = null
		}
	})
}
String.prototype.format = function () {
	if (!arguments) {
		return this
	}
	if (arguments.length == 1) {
		return this.replace(new RegExp("\\{0\\}", "g"), arguments[0])
	}
	var tmp = this;
	for (var i = 0; i < arguments.length; i++) {
		tmp = tmp.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i])
	}
	return tmp
};
(function ($) {
	$.view = function () {
		if ($.browser != null && $.browser.msie) {
			var d = $(document).height(),
			w = $(window).height();
			return [window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, d - w < 20 ? w : d]
		}
		return [$(window).width(), $(document).height()]
	};
	if ($.browser != null) {
		$.browser.msie6 = ($.browser.msie && jQuery.browser.version == "6.0")
	}
})(jQuery);
(function ($) {
	$.rmi = function (url, args, callback, errCallBack, options) {
		var _callback = callback;
		var _options;
		var _errCallBack;
		if (typeof errCallBack == "function") {
			_errCallBack = errCallBack
		} else {
			if (typeof errCallBack == "object") {
				_options = errCallBack
			}
		}
		if (options) {
			_options = options
		}
		var defaultOptions = {
			type : "POST",
			url : (url.indexOf(".rmi") != -1) ? url : (url + ".rmi"),
			data : args,
			cache : false,
			success : function (data, textStatus) {
				if (this.async && this.async == false) {
					Ysl.msg.hide()
				}
				var t = this;
				var jsonData = {};
				if (data && data.length > 0) {
					try {
						eval("jsonData=" + data)
					} catch (e) {
						throw "the responseText not a json type"
					}
				}
				if (jsonData && jsonData.error) {
					if (jsonData.error.code == -1) {
						top.location.reload()
					} else {
						Ysl.msg.error(jsonData.error.msg)
					}
					if (_errCallBack) {
						_errCallBack.call(null, jsonData.error)
					}
					return
				}
				if (_callback) {
					_callback.call(null, jsonData)
				}
			},
			error : function (XMLHttpRequest, textStatus, errorThrown) {
				if (textStatus == "timeout") {
					Ysl.msg.error("请求超时");
					if (_errCallBack) {
						_errCallBack.call(null)
					}
				} else {
					if (textStatus == "error") {
						errorThrown = errorThrown ? errorThrown : "请求出错!";
						Ysl.msg.error(errorThrown);
						if (_errCallBack) {
							_errCallBack.call(null)
						}
					}
				}
			}
		};
		if (_options) {
			$.extend(defaultOptions, _options);
			if (_options.token) {
				defaultOptions.data._token_ = _options.token
			}
		}
		if (defaultOptions.async && defaultOptions.async == false) {
			Ysl.msg.info("loading...", true)
		}
		return $.ajax(defaultOptions)
	};
	$.rmiHtml = function (url, args, callback, errCallBack, options) {
		var _callback = callback;
		var _options;
		var _errCallBack;
		if (typeof errCallBack == "function") {
			_errCallBack = errCallBack
		} else {
			if (typeof errCallBack == "object") {
				_options = errCallBack
			}
		}
		if (options) {
			_options = options
		}
		var defaultOptions = {
			type : "POST",
			url : (url.indexOf(".rmiHtml") != -1) ? url : (url + ".rmiHtml"),
			data : args,
			cache : false,
			success : function (data, textStatus) {
				if (data && data.length > 0) {
					if (data.indexOf("error:{code:-1}") > -1) {
						top.location.reload();
						return
					}
				}
				if (_callback) {
					_callback.call(null, data)
				}
			},
			error : function (XMLHttpRequest, textStatus, errorThrown) {
				_errCallBack.call(null, XMLHttpRequest, textStatus, errorThrown)
			}
		};
		if (_options) {
			$.extend(defaultOptions, _options);
			if (_options.token) {
				defaultOptions.data._token_ = _options.token
			}
		}
		return $.ajax(defaultOptions)
	}
})(jQuery);
if (($.browser != null && $.browser.msie && $.browser.version == "6.0")) {
	try {
		document.execCommand("BackgroundImageCache", false, true)
	} catch (e) {}

}
jQuery.fn.extend({
	bindValidate : function (options) {
		if (!$.validateRules) {
			$.validateRules = []
		}
		var inputId = $(this).attr("id");
		$.validateRules[inputId] = options;
		if (options.maxLength) {
			$(this).attr("maxlength", options.maxLength)
		}
		$(this).bind("keydown", function (event) {
			if (options.onlyInteger) {
				if ((event.keyCode == 8) || (event.keyCode == 116) || (event.keyCode == 46)) {
					return true
				}
				if ((event.keyCode < 48) || (event.keyCode > 57 && event.keyCode < 96) || (event.keyCode > 105)) {
					return false
				}
			}
		});
		$(this).bind("focus", function () {
			$(this).removeClass("error");
			var inputId = $(this).attr("id");
			$("#" + inputId + "-icon").attr("class", "icon-none");
			var textObj = $("#" + inputId + "-text");
			textObj.html(options.focusText).show();
			if (options.errorTextStyle) {
				textObj.removeClass("errorTextStyle")
			}
			if (options.focusTextStyle) {
				textObj.addClass("focusTextStyle")
			}
		});
		$(this).bind("blur", function () {
			var thisObj = $(this);
			var text = thisObj.val();
			thisObj.addClass("error");
			var textObj = $("#" + inputId + "-text");
			if (options.focusTextStyle) {
				textObj.removeClass("focusTextStyle")
			}
			if (!thisObj.validate()) {
				return
			}
			thisObj.showYesInfo()
		})
	},
	isValidEmail : function (text) {
		if (text == "") {
			return true
		}
		var reg = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
		return reg.test(text)
	},
	showErrorInfo : function (text) {
		var inputId = $(this).attr("id");
		$("#" + inputId + "").addClass("error");
		$("#" + inputId + "-icon").attr("class", "icon-no");
		var textObj = $("#" + inputId + "-text");
		textObj.html(text).show();
		var options = $.validateRules[inputId];
		if (options && options.errorTextStyle) {
			textObj.addClass("errorTextStyle")
		}
	},
	showYesInfo : function (text) {
		var inputId = $(this).attr("id");
		$("#" + inputId + "-icon").attr("class", "icon-yes");
		$("#" + inputId).removeClass("error");
		var options = $.validateRules[inputId];
		if (options && options.blurText) {
			$("#" + inputId + "-text").html(options.blurText);
			return
		}
		if (options && !options.showTextIfOk) {
			$("#" + inputId + "-text").hide()
		}
	},
	unbindValidate : function () {
		$(this).unbind();
		$(this).attr("maxlength", 256)
	},
	validate : function () {
		var inputId = $(this).attr("id");
		var options = $.validateRules[inputId];
		var text = $(this).val();
		if (options.emptyText) {
			if (text.length < 1) {
				$(this).showErrorInfo(options.emptyText);
				return false
			}
		} else {
			if (text.length < 1) {
				return true
			}
		}
		if (options.minLength) {
			if (text.length < options.minLength) {
				$(this).showErrorInfo("长度不够" + options.minLength + "位!");
				return false
			}
		}
		if (options.isEmail) {
			if (text.indexOf("+") > -1) {
				$(this).showErrorInfo('邮箱名称中不能包含"+"字符！');
				return false
			}
			if (text.indexOf("。") > -1) {
				$(this).showErrorInfo("邮箱格式不正确!");
				return false
			}
			var res = $(this).isValidEmail(text);
			if (!res) {
				$(this).showErrorInfo("邮箱格式不正确!");
				return false
			}
		}
		if (options.isPhone) {
			if (text == null || text == "") {
				return true
			}
			if (!/^1[0-9]{10}$/.test(text)) {
				$(this).showErrorInfo("电话号码格式不正确!");
				return false
			}
		}
		if (options.isEmailorPhone) {
			if (text != "") {
				if (/^1[0-9]{2,10}$/.test(text)) {
					if (text.length != 11) {
						$(this).showErrorInfo("电话号码长度不正确!");
						return false
					}
				} else {
					if (text.indexOf("+") > -1) {
						$(this).showErrorInfo('邮箱名称中不能包含"+"字符！');
						return false
					}
					if (text.indexOf("。") > -1) {
						$(this).showErrorInfo("邮箱格式不正确!");
						return false
					}
					var res = $(this).isValidEmail(text);
					if (!res) {
						$(this).showErrorInfo("邮箱格式不正确!");
						return false
					}
				}
			}
		}
		if (options.compareWith) {
			if ($(this).val() != $("#" + options.compareWith).val()) {
				$(this).showErrorInfo("两次密码输入不一致！");
				return false
			}
		}
		return true
	}
});
var moneyMsg = {
	info : function (text, notHide) {
		$("#msg_c").attr("class", "info").html(text).css("visibility", "visible").show();
		if (document.documentElement.scrollTop > $("#msg_c").offset().top) {
			location.hash = "#msg_c"
		}
		if (!notHide) {
			window.setTimeout("moneyMsg.clear()", 5000)
		}
	},
	error : function (text, notHide) {
		$("#msg_c").attr("class", "error").html(text).css("visibility", "visible").show();
		if (document.documentElement.scrollTop > $("#msg_c").offset().top) {
			location.hash = "#msg_c"
		}
		if (!notHide) {
			window.setTimeout("moneyMsg.clear()", 5000)
		}
	},
	clear : function () {
		$("#msg_c").css("visibility", "hidden")
	}
};
var PasswordStrength = {
	Level : ["强", "一般", "弱"],
	LevelValue : [30, 20, 0],
	Factor : [1, 2, 5],
	KindFactor : [0, 0, 10, 20],
	Regex : [/[a-zA-Z]/g, /\d/g, /[^a-zA-Z0-9]/g] 
};
PasswordStrength.StrengthValue = function (pwd) {
	var strengthValue = 0;
	var ComposedKind = 0;
	for (var i = 0; i < this.Regex.length; i++) {
		var chars = pwd.match(this.Regex[i]);
		if (chars != null) {
			strengthValue += chars.length * this.Factor[i];
			ComposedKind++
		}
	}
	strengthValue += this.KindFactor[ComposedKind];
	return strengthValue
};
PasswordStrength.StrengthLevel = function (pwd) {
	var value = this.StrengthValue(pwd);
	for (var i = 0; i < this.LevelValue.length; i++) {
		if (value >= this.LevelValue[i]) {
			return i + 1
		}
	}
};
function copyToClipboard(txt) {
	if (window.clipboardData) {
		window.clipboardData.clearData();
		window.clipboardData.setData("Text", txt);
		alert("复制成功！")
	} else {
		if (navigator.userAgent.indexOf("Opera") != -1) {
			window.location = txt;
			alert("复制成功！")
		} else {
			if (window.netscape) {
				try {
					netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
				} catch (e) {
					alert("此浏览器不支持剪贴板，建议手动复制！\n如果想打开剪贴板，请在浏览器地址栏输入'about:config'并回车；\n然后将'signed.applets.codebase_principal_support'设置为'true'。")
				}
				var clip = Components.classes["@mozilla.org/widget/clipboard;1"].createInstance(Components.interfaces.nsIClipboard);
				if (!clip) {
					return
				}
				var trans = Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);
				if (!trans) {
					return
				}
				trans.addDataFlavor("text/unicode");
				var str = new Object();
				var len = new Object();
				var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
				var copytext = txt;
				str.data = copytext;
				trans.setTransferData("text/unicode", str, copytext.length * 2);
				var clipid = Components.interfaces.nsIClipboard;
				if (!clip) {
					return false
				}
				clip.setData(trans, null, clipid.kGlobalClipboard);
				alert("复制成功！")
			}
		}
	}
}
jQuery.fn.extend({
	getChecked : function () {
		if ($(this).attr("class").indexOf("selected") > -1) {
			return true
		}
		return false
	},
	checkbox : function () {
		var $this = $(this);
		$this.click(function () {
			if ($this.attr("class").indexOf("selected") > -1) {
				$this.attr("class", "kCheckbox")
			} else {
				$this.attr("class", "kCheckbox_selected")
			}
		})
	}
});
jQuery.fn.extend({
	setCursorPosition : function (pos) {
		var $this = $(this);
		var inputEle = $this[0];
		var text = $this.val();
		if (!pos) {
			pos = text.length
		}
		if (inputEle.setSelectionRange) {
			inputEle.focus();
			inputEle.setSelectionRange(pos, pos)
		} else {
			if (inputEle.createTextRange) {
				var range = inputEle.createTextRange();
				range.collapse(true);
				range.moveEnd("character", pos);
				range.moveStart("character", pos);
				range.select()
			}
		}
	}
});
function formatMoney(s, n) {
	n = n >= 0 && n <= 20 ? n : 2;
	s = parseFloat((s + "").replace(/[^\d\.-]/g, ""));
	prev = "";
	if (s < 0) {
		prev = "-";
		s = 0 - s
	}
	s = s.toFixed(n) + "";
	var l = s.split(".")[0].split("").reverse(),
	r = s.split(".")[1];
	t = "";
	for (i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "")
	}
	return prev + t.split("").reverse().join("") + (n > 0 ? "." + r : "")
}
function formatMillionMoney(s, n, m) {
	if (s > 9999999 || s < -9999999) {
		s = s / 100000000;
		return formatMoney(s, m) + "亿"
	}
	return formatMoney(s, n)
}
function restoreMoney(s) {
	return parseFloat((s + "").replace(/[^\d\.-]/g, ""))
}
function setCookie(cName, value, expireSeconds, path, domain) {
	var cookieStr = cName + "=" + escape(value);
	if (expireSeconds != null) {
		var exdate = new Date();
		exdate.setTime(expireSeconds * 1000 + exdate.getTime());
		cookieStr += "; expires=" + exdate.toGMTString() + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "")
	}
	document.cookie = cookieStr
}
function getCookie(name) {
	var cookieStr = document.cookie;
	var cookieArr = cookieStr.split("; ");
	for (var i = 0; i < cookieArr.length; i++) {
		var arr = cookieArr[i].split("=");
		if (arr[0] == name) {
			return unescape(arr[1])
		}
	}
	return ""
}
$("#l-category").bind("mouseleave", function () {
	$("#new-use").hide();
	$("#lc-btn").removeClass("hover")
});
$("#mPanel").bind("mouseleave", function () {
	$(this).hide()
});
Ysl = Y = {};
Ysl.w = {
	remove : function (widget, id) {
		Ysl.Global.remove(widget + "_" + id)
	}
};
Ysl.include = function (jssrc) {
	function getPath(relativePath, absolutePath) {
		var reg = new RegExp("\\.\\./", "g");
		var uplayCount = 0;
		var m = relativePath.match(reg);
		if (m) {
			uplayCount = m.length
		}
		var lastIndex = absolutePath.length;
		for (var i = 0; i <= uplayCount; i++) {
			lastIndex = absolutePath.lastIndexOf("/", lastIndex - 1)
		}
		return absolutePath.substr(0, lastIndex + 1) + relativePath.replace(reg, "")
	}
	var scripts = document.getElementsByTagName("script");
	var lastScript = scripts[scripts.length - 1];
	var src = lastScript.src;
	if (src.indexOf("http://") != 0 && src.indexOf("/") != 0) {
		var url = location.href;
		var index = url.indexOf("?");
		if (index != -1) {
			url = url.substring(0, index - 1)
		}
		src = getPath(src, url)
	}
	var jssrcs = jssrc.split("|");
	for (var i = 0; i < jssrcs.length; i++) {
		$.ajax({
			type : "GET",
			url : getPath(jssrc, src),
			async : false,
			dataType : "script"
		})
	}
};
Ysl.getXY = function (o) {
	e = document.getElementById(o);
	var xy = new Array(),
	x = e.offsetLeft,
	y = e.offsetTop + e.clientHeight;
	while (e = e.offsetParent) {
		x += e.offsetLeft;
		y += e.offsetTop
	}
	xy[0] = x;
	xy[1] = y;
	return xy
};
Ysl.Global = {
	items : new Object(),
	contains : function (key) {
		return this.items[key] ? true : false
	},
	add : function (key, obj) {
		if (!this.items[key]) {
			this.items[key] = obj
		}
	},
	get : function (key) {
		return this.items[key]
	},
	remove : function (key) {
		if (this.items[key]) {
			delete this.items[key]
		}
	}
};
Ysl.get = function (id) {
	var pre = "Ysl.get.";
	if (Ysl.Global.contains(pre + id)) {
		return Ysl.Global.get(pre + id)
	} else {
		o = document.getElementById(id);
		Ysl.Global.add(pre + id, o);
		return o
	}
};
Ysl.url = {
	get : function (key) {
		var reg = new RegExp("(^|&|\\?)" + key + "=([^&]*)(&|$)"),
		r;
		if (r = location.search.match(reg)) {
			return unescape(r[2])
		}
		return null
	}
};
Ysl.msg = {
	msgBox : null,
	init : function () {
		if (!this.msgBox) {
			div = document.createElement("DIV");
			div.id = "g_msg";
			document.body.appendChild(div);
			this.msgBox = $("#g_msg")
		}
	},
	error : function (m, notHide) {
		this.init();
		this.msgBox.attr("class", "error");
		this.msgBox.html(m);
		this.show(notHide)
	},
	info : function (m, notHide) {
		this.init();
		this.msgBox.attr("class", "info");
		this.msgBox.html(m);
		this.show(notHide)
	},
	show : function (notHide) {
		this.msgBox.fadeIn("normal");
		if (!notHide) {
			window.setTimeout(Ysl.msg.hide, 4500)
		}
	},
	hide : function () {
		Ysl.msg.msgBox.fadeOut("fast")
	}
};
$.validatorMsg = {
	init : function () {
		var html = "<div id='msgbox' class='png'><div id='msg-m' class='png'><div id='msg-c' class='png'><div id='msg-icon' class='err'></div><div id='msg'></div></div></div><div id='msg-r' class='png'></div></div>";
		$(document.body).append(html)
	},
	show : function (target, msg) {
		if (!document.getElementById("msgbox")) {
			this.init()
		}
		if (typeof target == "string") {
			target = $("#" + target)
		}
		$("#msg").html(msg);
		_msgbox = $("#msgbox");
		var o = target.offset();
		o.top -= 38;
		_msgbox.css("left", o.left + (target.width() - _msgbox.width()) / 2).css("top", o.top).show();
		window.setTimeout($.validatorMsg.hide, 2000)
	},
	hide : function () {
		$("#msgbox").hide()
	}
};
$.validatorMsg2 = {
	options : {
		targetHeight : 20,
		width : 200
	},
	init : function (options) {
		var html = "<div id='msgbox2'><div class='msg-title'>信息提示</div><div class='msg-content'></div><div class='msg-arrow'><span></span></div></div>";
		$(document.body).append(html);
		if (options) {
			$.extend($.validatorMsg2.options, options)
		}
	},
	show : function (target, msg) {
		if (!document.getElementById("msgbox2")) {
			this.init()
		}
		if (typeof target == "string") {
			target = $("#" + target)
		}
		$("#msgbox2 .msg-content").html(msg);
		_msgbox = $("#msgbox2");
		var o = target.offset();
		o.top -= $.validatorMsg2.options.targetHeight;
		_msgbox.css("width", $.validatorMsg2.options.width);
		_msgbox.css("left", o.left + (target.width() - _msgbox.width()) / 2).css("top", o.top).show();
		var $span = $("#msgbox2 .msg-arrow span");
		var sLeft = ($("#msgbox2").width() - $span.width()) / 2;
		$span.css("left", sLeft)
	},
	hide : function () {
		$("#msgbox2").hide()
	},
	setContent : function (content) {
		$("#msgbox2 .msg-content").html(content)
	}
};
$.validatorMsg3 = {
	$moneyMsg : null,
	error : function (moneyMsgObj, text) {
		$.validatorMsg3.$moneyMsg = moneyMsgObj;
		$.validatorMsg3.$moneyMsg.children("span").attr("class", "error").html(text)
	},
	info : function (moneyMsgObj, text) {
		$.validatorMsg3.$moneyMsg = moneyMsgObj;
		$.validatorMsg3.$moneyMsg.children("span").attr("class", "info").html(text)
	},
	show : function () {
		if ($.validatorMsg3.$moneyMsg == null) {
			return
		}
		$.validatorMsg3.$moneyMsg.children("span").css("visibility", "visible")
	},
	hide : function () {
		if ($.validatorMsg3.$moneyMsg == null) {
			return
		}
		$.validatorMsg3.$moneyMsg.children("span").css("visibility", "hidden")
	}
};
(function ($) {
	$.dialogUtil = {
		getCenterPosition : function (self) {
			var h = $(window).height();
			var w = $(window).width();
			var sh = self.outerHeight({
					margin : true
				});
			var sw = self.outerWidth({
					margin : true
				});
			var endLeft = (w - sw) / 2;
			var endTop = $(document).scrollTop() + (h - sh) * 0.382;
			endTop = (endTop < 0 ? 0 : endTop);
			return {
				left : endLeft,
				top : endTop
			}
		},
		showOverlay : function () {
			if (!document.getElementById("ModelOverlay")) {
				div = document.createElement("DIV");
				div.id = "ModelOverlay";
				document.body.appendChild(div);
				$("#ModelOverlay").click(function (event) {
					event.stopPropagation()
				})
			}
			var lay = $("#ModelOverlay");
			var size = $.view();
			lay.width(size[0]);
			lay.height(size[1]);
			lay.fadeTo("normal", 0.7)
		}
	};
	$.confirmUtil = {
		showOverlay : function () {
			if (!document.getElementById("cModelOverlay")) {
				div = document.createElement("DIV");
				div.id = "cModelOverlay";
				document.body.appendChild(div);
				$("#cModelOverlay").click(function (event) {
					event.stopPropagation()
				})
			}
			var lay = $("#cModelOverlay");
			var size = $.view();
			lay.width(size[0]);
			lay.height(size[1]);
			lay.fadeTo("normal", 0.7)
		}
	};
	var confirm_html = "<div id='confirm_model' class='Dialog'><div class='cm-t-o png'><div class='cm-t-i png'><div class='cm-t-m png'>操作提示</div></div></div><div class='cm-m-o png'><div class='cm-m-i png'><div class='cm-m-m'><div id='confirm_msg'>您确定要删除这条记录么？</div><div id='confirm_btn'><a href='javascript:void(0);' class='c_ok'>确定</a>&nbsp;&nbsp;<a href='javascript:void(0);' class='c_cancel'>取消</a></div></div></div></div><div class='cm-b-o png'><div class='cm-b-i png'><div class='cm-b-m png'></div></div></div></div>";
	$.confirm = function (text, okCallBack, cancleCallBack) {
		var _model = $("#confirm_model");
		if (_model.length == 0) {
			$(document.body).append(confirm_html);
			_model = $("#confirm_model");
			$("#confirm_btn .c_cancel").click(function () {
				$("#cModelOverlay,#confirm_model").fadeOut();
				if ($.browser.msie6) {
					$(document.body).removeClass("hideSelect")
				}
				if (cancleCallBack) {
					cancleCallBack()
				}
			})
		}
		$("#cModelOverlay,#confirm_model").hide();
		$("#confirm_btn .c_ok").unbind("click");
		var callBack = $.isFunction(text) ? text : okCallBack;
		if (typeof text === "string") {
			$("#confirm_msg").html(text)
		}
		$("#confirm_btn .c_ok").click(function () {
			$("#cModelOverlay,#confirm_model").fadeOut();
			if (callBack) {
				callBack()
			}
			if ($.browser.msie6) {
				$(document.body).removeClass("hideSelect")
			}
		});
		var of = $.dialogUtil.getCenterPosition(_model);
		_model.css(of);
		if ($.browser.msie6) {
			$(document.body).addClass("hideSelect")
		}
		_model.fadeIn();
		$.confirmUtil.showOverlay()
	};
	$.confirmInfoUtil = {
		showOverlay : function () {
			if (!document.getElementById("infoModelOverlay")) {
				div = document.createElement("DIV");
				div.id = "infoModelOverlay";
				document.body.appendChild(div);
				$("#infoModelOverlay").click(function (event) {
					event.stopPropagation()
				})
			}
			var lay = $("#infoModelOverlay");
			var size = $.view();
			lay.width(size[0]);
			lay.height(size[1]);
			lay.fadeTo("normal", 0.7)
		}
	};
	var confirm_info_html = "<div id='confirm_info_model' class='Dialog'><div class='cm-t-o png'><div class='cm-t-i png'><div class='cm-t-m png'>操作提示</div></div></div><div class='cm-m-o png'><div class='cm-m-i png'><div class='cm-m-m'><div class='confirm_msg'>您确定要删除这条记录么？</div><div class='confirm_btn'><a href='javascript:void(0);' class='c_ok'>确定</a>&nbsp;&nbsp;</div></div></div></div><div class='cm-b-o png'><div class='cm-b-i png'><div class='cm-b-m png'></div></div></div></div>";
	$.confirmInfo = function (text, title, okCallBack) {
		var _model = $("#confirm_info_model");
		if (_model.length == 0) {
			$(document.body).append(confirm_info_html);
			_model = $("#confirm_info_model")
		}
		$("#infoModelOverlay,#confirm_info_model").hide();
		$("#confirm_info_model .c_ok").unbind("click");
		var callBack = $.isFunction(text) ? text : okCallBack;
		if (typeof text === "string") {
			$("#confirm_info_model .confirm_msg").html(text)
		}
		if (title) {
			$("#confirm_info_model .cm-t-m").html(title)
		}
		$("#confirm_info_model .c_ok").click(function () {
			$("#infoModelOverlay,#confirm_info_model").fadeOut();
			if (callBack) {
				callBack()
			}
		});
		var of = $.dialogUtil.getCenterPosition(_model);
		_model.css(of);
		_model.fadeIn();
		$.confirmInfoUtil.showOverlay()
	};
	$.confirmInfoUtil2 = {
		showOverlay : function () {
			if (!document.getElementById("infoModelOverlay2")) {
				div = document.createElement("DIV");
				div.id = "infoModelOverlay2";
				document.body.appendChild(div);
				$("#infoModelOverlay2").click(function (event) {
					event.stopPropagation()
				})
			}
			var lay = $("#infoModelOverlay2");
			var size = $.view();
			lay.width(size[0]);
			lay.height(size[1]);
			lay.fadeTo("normal", 0.7)
		}
	};
	var confirm_info_html2 = "<div id='confirm_info_model2' class='Dialog'><div class='cm-t-o png'><div class='cm-t-i png'><div class='cm-t-m png'>操作提示</div></div></div><div class='cm-m-o png'><div class='cm-m-i png'><div class='cm-m-m'><div class='confirm_msg'>您确定要删除这条记录么？</div><div class='confirm_btn'><a href='javascript:void(0);' class='c_ok'>确定</a>&nbsp;&nbsp;<a href='javascript:void(0);' class='c_cancel'>取消</a></div></div></div></div><div class='cm-b-o png'><div class='cm-b-i png'><div class='cm-b-m png'></div></div></div></div>";
	$.confirmInfo2 = function (text, title, okCallBack, cancleCallBack) {
		var _model = $("#confirm_info_model2");
		if (_model.length == 0) {
			$(document.body).append(confirm_info_html2);
			_model = $("#confirm_info_model2")
		}
		$("#infoModelOverlay2,#confirm_info_model2").hide();
		$("#confirm_info_model2 .c_ok").unbind("click");
		var callBack = $.isFunction(text) ? text : okCallBack;
		if (typeof text === "string") {
			$("#confirm_info_model2 .confirm_msg").html(text)
		}
		if (title) {
			$("#confirm_info_model2 .cm-t-m").html(title)
		}
		$("#confirm_info_model2 .c_ok").click(function () {
			$("#infoModelOverlay2,#confirm_info_model2").fadeOut();
			if (callBack) {
				callBack()
			}
		});
		$("#confirm_info_model2 .c_cancel").click(function () {
			$("#infoModelOverlay2,#confirm_info_model2").fadeOut();
			if ($.browser.msie6) {
				$(document.body).removeClass("hideSelect")
			}
			if (cancleCallBack) {
				cancleCallBack()
			}
		});
		var of = $.dialogUtil.getCenterPosition(_model);
		_model.css(of);
		_model.fadeIn();
		$.confirmInfoUtil2.showOverlay()
	};
	$.fn.extend({
		dialog : function (conf) {
			var dialogId = conf.id;
			var self = $(dialogId);
			$(this).click(function () {
				if (conf.focus) {
					$(dialogId).showDialog({
						focus : conf.focus
					})
				} else {
					$(dialogId).showDialog()
				}
			})
		},
		showDialog : function (conf) {
			if (!this.length) {
				return
			}
			var self = $(this[0]);
			var h = $(window).height();
			var w = $(window).width();
			var sh = self.outerHeight({
					margin : true
				});
			var sw = self.outerWidth({
					margin : true
				});
			var endLeft = (w - sw) / 2;
			var endTop = $(document).scrollTop() + (h - sh) * 0.382;
			endTop = (endTop < 0 ? 0 : endTop);
			if (!document.getElementById("ModelOverlay")) {
				div = document.createElement("DIV");
				div.id = "ModelOverlay";
				document.body.appendChild(div);
				$("#ModelOverlay").click(function (event) {
					event.stopPropagation()
				})
			}
			var lay = $("#ModelOverlay");
			var size = $.view();
			lay.width(size[0]);
			lay.height(size[1]);
			self.css({
				left : endLeft,
				top : endTop
			});
			if ($.browser.msie6) {
				$(document.body).addClass("hideSelect");
				self.show();
				if (conf && conf.focus) {
					$(conf.focus).focus()
				}
			} else {
				self.fadeIn("normal", function () {
					if (conf && conf.focus) {
						$(conf.focus).focus()
					}
				})
			}
			self.find(".close").unbind("click").click(function () {
				self.hideDialog();
				if (conf && conf.onClosed) {
					conf.onClosed()
				}
			});
			if (self.data("init") != true) {
				self.find(".moveable,.pl-top").unbind("mousedown mousemove mouseup").bind("mousedown", function (e) {
					var movedata = {};
					movedata.baseX = e.pageX;
					movedata.baseY = e.pageY;
					var position = self.position();
					movedata.currX = position.left;
					movedata.currY = position.top;
					self.data("moveable", true);
					self.data("movedata", movedata)
				}).bind("mouseup", function (e) {
					self.removeData("moveable").removeData("movedata")
				}).css("cursor", "default");
				self.add($("#ModelOverlay")).bind("mousemove", function (e) {
					if (self.data("moveable") == true) {
						var movedata = self.data("movedata");
						movedata.currX = e.pageX - movedata.baseX + movedata.currX;
						movedata.currY = e.pageY - movedata.baseY + movedata.currY;
						self.css("top", movedata.currY + "px").css("left", movedata.currX + "px");
						movedata.baseY = e.pageY;
						movedata.baseX = e.pageX;
						self.data("movedata", movedata)
					}
				});
				self.data("init", true)
			}
			lay.show();
			lay.fadeTo("normal", 0.7)
		},
		hideDialog : function () {
			if (!this.length) {
				return
			}
			var self = $(this[0]);
			var lay = $("#ModelOverlay");
			lay.css({
				opacity : 0
			});
			lay.hide();
			self.hide()
		}
	})
})(jQuery);
Ysl.number = {
	isNumericAllow : function (code) {
		if ((code > 95 && code < 106) || (code > 32 && code < 41) || (code > 47 && code < 58) || code == 8 || code == 46 || code == 9 || code == 13) {
			return true
		} else {
			return false
		}
	},
	_onlyNumber : function (selectors, isFloat, isPositive) {
		$(selectors).addClass("imeD")
	},
	onlyInt : function (selectors) {
		this._onlyNumber(selectors, false, false)
	},
	onlyPositiveInt : function (selectors) {
		this._onlyNumber(selectors, false, true)
	},
	onlyFloat : function (selectors) {
		this._onlyNumber(selectors, true, false)
	},
	onlyPositiveFloat : function (selectors) {
		this._onlyNumber(selectors, true, true)
	}
};
Number.prototype.format = function (digits) {
	d = digits ? digits : 0;
	if (this % 1 == 0) {
		return this.toFixed(0)
	} else {
		return this.toFixed(d)
	}
};
Ysl.select = Ysl.w.select = function (id, initIndex, onchange) {
	if (Ysl.Global.contains("select_" + id)) {
		return Ysl.Global.get("select_" + id)
	}
	var _obj = new Ysl.w._selectBox(id, initIndex, onchange);
	Ysl.Global.add("select_" + id, _obj);
	return _obj
};
Ysl.w._selectBox = function (id, initIndex, onchange) {
	this.id = id;
	this.input = $("#" + id + "_text");
	this.hidden = $("#" + id);
	this.box = $("#ul_" + id);
	this.options;
	this.onchange = $.isFunction(onchange) ? onchange : null;
	this.boxFocus = 0;
	this.isShow = false;
	this.width = 0;
	if (!initIndex) {
		initIndex == 0
	}
	this._initOptions();
	this.selectedIndex = initIndex;
	this._tmp_key_selected = initIndex;
	this._initBox();
	var _this = this;
	this.input.blur(function () {
		if (_this.box.is(":visible") && _this.boxFocus > 0) {}
		else {
			if ($.browser.msie) {
				try {
					if (document.activeElement.getAttribute("id").indexOf(id) == -1) {
						_this.hide()
					} else {
						_this.input.focus()
					}
				} catch (e) {}

			} else {
				_this.hide()
			}
		}
	}).click(function () {
		_this.box.toggle()
	});
	this.box.mouseover(function () {
		_this.boxFocus = 1
	}).mouseout(function () {
		if ($(this).is(":visible")) {
			_this.boxFocus = 0;
			_this.input.focus()
		}
	});
	this.input.keydown(function (evt) {
		var l = _this.options.length;
		if (l == 0) {
			return
		}
		switch (evt.keyCode) {
		case 38:
			if (!_this.isShow) {
				return
			}
			evt.preventDefault();
			_this.move(-1);
			break;
		case 40:
			if (!_this.isShow) {
				return
			}
			evt.preventDefault();
			_this.move(1);
			break;
		case 13:
			if (!_this.isShow) {
				_this.show();
				return
			}
			$(_this.options.get(_this.selectedIndex)).removeClass("selected");
			$(_this.options.get(_this._tmp_key_selected)).addClass("selected");
			_this.setValue();
			_this.hide();
			break;
		case 27:
			if (!_this.isShow) {
				return
			}
			$(_this.options.get(_this._tmp_key_selected)).removeClass("hover");
			_this._tmp_key_selected = _this.selectedIndex;
			_this.hide();
			break
		}
	});
	return this
};
Ysl.w._selectBox.prototype = {
	LI_HTML : '<li id="{0}_v_{1}" value="{4}" class="{3}">{2}</li>',
	_initBox : function () {
		if (this.width > 0) {
			return
		}
		var parent = this.input.parent();
		var of = this.input.offset();
		var of_p = parent.offset();
		if (!of) {
			return
		}
		var x = of.left - of_p.left;
		var y = of.top - of_p.top + this.input.get(0).clientHeight;
		var w = this.input.get(0).clientWidth;
		this.width = w;
		var l = this.box.children("li").length;
		this.box.css({
			width : w,
			left : x,
			top : y
		});
		if (l > 10) {
			this.box.css({
				height : 220
			})
		}
	},
	_initOptions : function () {
		this.options = this.box.children("li:not(.p)");
		var _this = this;
		this.options.hover(function (evt) {
			evt.preventDefault();
			$(this).addClass("hover")
		}, function (evt) {
			evt.preventDefault();
			$(this).removeClass("hover")
		}).click(function () {
			$(this).parent().children(".selected").removeClass("selected");
			$(this).addClass("selected");
			Ysl.select(_this.id).setValue();
			_this.hide()
		})
	},
	show : function () {
		this._initBox();
		this.box.slideDown("fast");
		this.isShow = true;
		this.input.parent().css("position", "relative")
	},
	hide : function () {
		this.boxFocus = 0;
		this.box.hide();
		this.options.removeClass("hover");
		this.isShow = false;
		this.input.parent().css("position", "static")
	},
	move : function (step) {
		var l = this.options.length;
		var newIndex = this._tmp_key_selected + step;
		if (newIndex < 0) {
			newIndex = l - 1
		} else {
			if (newIndex >= l) {
				newIndex = 0
			}
		}
		$(this.options.get(this._tmp_key_selected)).removeClass("hover");
		$(this.options.get(newIndex)).addClass("hover");
		this._tmp_key_selected = newIndex;
		var el = this.options.get(newIndex);
		var box = this.box.get(0);
		if (el.offsetTop + el.offsetHeight > box.scrollTop + box.clientHeight) {
			box.scrollTop = el.offsetTop + el.offsetHeight - box.clientHeight
		} else {
			if (el.offsetTop < box.scrollTop) {
				box.scrollTop = el.offsetTop
			}
		}
	},
	setValue : function () {
		var li = this.box.children(".selected");
		if (li.length == 0 && this.options.length > 0) {
			li = $(this.options.get(0));
			li.addClass("selected");
			this._tmp_key_selected = 0;
			this.selectedIndex = -1
		}
		if (li.length > 0) {
			this.input.val(li.text());
			this.hidden.val(li.attr("id").substr(this.id.length + 3));
			this._tmp_key_selected = this.options.index(li)
		} else {
			this.input.val("");
			this.hidden.val("")
		}
		var newIndex = this._tmp_key_selected;
		if (newIndex != this.selectedIndex) {
			this.selectedIndex = newIndex;
			this._tmp_key_selected = this.selectedIndex;
			if (this.onchange) {
				this.onchange.call(null, {
					text : this.text(),
					value : this.val(),
					index : this.selectedIndex,
					id : this.id
				})
			}
		}
	},
	val : function (value) {
		if (!value) {
			return this.hidden.val()
		} else {
			this.box.children(".selected").removeClass("selected");
			$("#" + this.id + "_v_" + value).addClass("selected");
			this.setValue()
		}
	},
	text : function () {
		return this.input.val()
	},
	remove : function (value) {
		var option = $("#" + this.id + "_v_" + value);
		if (option.length == 0) {
			return
		}
		if (option.hasClass("p")) {
			var lis = this.box.children("li");
			var pIndex = lis.index(option);
			var childsOptions = new Array();
			for (var i = (pIndex + 1); i < lis.length; i++) {
				var child = $(lis.get(i));
				if (child.hasClass("p")) {
					break
				}
				childsOptions.push(child)
			}
			for (var i = 0; i < childsOptions.length; i++) {
				childsOptions[i].remove()
			}
		}
		option.remove();
		this._initOptions();
		if (this.box.children(".selected").length == 0) {
			this.setValue()
		}
	},
	removeAll : function () {
		if (this.options == null || this.options.length <= 0) {
			return
		}
		for (var i = this.options.length - 1; i >= 0; i--) {
			this.options.get(i).remove()
		}
		this.setValue()
	},
	update : function (value, text) {
		var option = $("#" + this.id + "_v_" + value);
		if (option.length == 0) {
			return
		}
		option.text(text);
		if (option.hasClass("selected")) {
			this.setValue()
		}
	},
	add : function (text, value, selected, parentId) {
		if (selected && selected == true) {
			selected = true
		} else {
			selected = false
		}
		var newLi = this.LI_HTML.format(this.id, value, text, selected == true ? "selected" : "", this.options.length);
		if (selected) {
			this.box.children(".selected").removeClass("selected")
		}
		if (parentId) {
			$(newLi).insertAfter($("#" + this.id + "_v_" + parentId))
		} else {
			this.box.append(newLi)
		}
		this._initOptions();
		if (selected) {
			this.setValue()
		}
	},
	insertGroup : function (index, text, value) {
		var lis = this.box.children("li");
		var newLi = this.LI_HTML.format(this.id, value, text, "p", index == -1 ? lis.length : index);
		if (index == -1) {
			this.box.append(newLi)
		} else {
			$(newLi).insertBefore(lis.get(index))
		}
	},
	insert : function (index, text, value, selected) {
		if (selected && selected == true) {
			selected = true
		} else {
			selected = false
		}
		var newLi = this.LI_HTML.format(this.id, value, text, selected == true ? "selected" : "", index);
		if (selected) {
			this.box.children(".selected").removeClass("selected")
		}
		var nextOption = this.options.get(index);
		if (nextOption) {
			$(newLi).insertBefore(this.options.get(index))
		} else {
			this.box.append(newLi)
		}
		this._initOptions();
		if (selected) {
			this.setValue()
		}
	},
	hasText : function (text) {
		text = $.trim(text);
		var l = this.options.length;
		for (var i = 0; i < l; i++) {
			if (text == this.options.get(i).innerHTML) {
				return true
			}
		}
		return false
	},
	selectByText : function (text) {
		text = $.trim(text);
		var l = this.options.length;
		for (var i = 0; i < l; i++) {
			var option = this.options.get(i);
			if (text == option.innerHTML) {
				var pre = this.id + "_v_";
				var id = option.id.replace(pre, "");
				this.val(id);
				return
			}
		}
	}
};
Ysl.checkbox = Ysl.w.checkbox = function (id, onclick) {
	if (Ysl.Global.contains("checkbox_" + id)) {
		return Ysl.Global.get("checkbox_" + id)
	}
	var _obj = new Ysl.w._checkbox(id, onclick);
	Ysl.Global.add("checkbox_" + id, _obj);
	return _obj
};
Ysl.w._checkbox = function (id, onclick) {
	this.id = id;
	this.link = $("#" + id + "_a");
	this.hidden = $("#" + id);
	this.onclick = $.isFunction(onclick) ? onclick : null
};
Ysl.w._checkbox.prototype.changeV = function () {
	if (this.hidden.val() == "1") {
		this.link.attr("class", "wCheckbox");
		this.hidden.val("0");
		this.value = "0"
	} else {
		this.link.attr("class", "wCheckbox_select");
		this.hidden.val("1");
		this.value = "1"
	}
};
Ysl.w._checkbox.prototype.click = function () {
	this.changeV();
	if (this.onclick) {
		this.onclick.call(null, this.checked())
	}
};
Ysl.w._checkbox.prototype.checked = function (v) {
	if (typeof v != "undefined") {
		if (v == true) {
			this.hidden.val("0")
		} else {
			this.hidden.val("1")
		}
		this.changeV()
	} else {
		return this.hidden.val() == "1"
	}
};
Ysl.lazyLoad = Ysl.ll = {
	loaded : new Object(),
	loadHtml : function (id) {
		if (this.loaded[id]) {
			return false
		}
		var html = $.trim(document.getElementById(id).innerHTML);
		html = html.substring(11, html.length - 14);
		$(document.body).append($(html));
		this.loaded[id] = 1;
		return true
	},
	loadImg : function (url) {
		var img = new Image();
		img.src = url;
		img = null
	}
};
Date.prototype.format = function (format) {
	var o = {
		"M+" : this.getMonth() + 1,
		"d+" : this.getDate(),
		"h+" : this.getHours(),
		"m+" : this.getMinutes(),
		"s+" : this.getSeconds(),
		"q+" : Math.floor((this.getMonth() + 3) / 3),
		S : this.getMilliseconds()
	};
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length))
		}
	}
	return format
};
Date.prototype.getMonthDays = function () {
	var _year = this.getFullYear();
	if (_year < 2000) {
		_year += 1900
	}
	var _month = this.getMonth();
	var monarr = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	if (((_year % 4 == 0) && (_year % 100 != 0)) || (_year % 400 == 0)) {
		monarr[1] = "29"
	}
	return monarr[_month]
};
