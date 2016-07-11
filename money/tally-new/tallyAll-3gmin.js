var tTime = {
	currentYear : -1,
	currentMonth : -1,
	chooseYear : -1,
	chooseMonth : -1,
	showYear : -1,
	showMonth : -1,
	htmlBeginYear : 2007,
	htmlEndYear : 2016,
	yearHeight : 25,
	monthHeight : 50,
	totalHeight : 625,
	init : function (curDate) {
		this.currentYear = curDate.getFullYear();
		this.currentMonth = curDate.getMonth() + 1
	}
};
tTime.data = {
	loadSomeYearData : function (beginYear, endYear, callback) {
		$.rmi("new", {
			opt : "someYearSum",
			beginYear : beginYear,
			endYear : endYear
		}, function (data) {
			try {
				$.each(data, function (key, val) {
					callback(key, val)
				})
			} catch (e) {}

		})
	},
	loadBillData : function () {
		if (tTime.chooseMonth == -1) {
			tData.startTime = tTime.chooseYear + ".12.01";
			tData.endTime = tTime.chooseYear + ".12.31"
		} else {
			var mDays = tTime.getMonthDays(tTime.chooseYear, tTime.chooseMonth);
			tData.startTime = tTime.chooseYear + "." + tTime.chooseMonth + ".01";
			tData.endTime = tTime.chooseYear + "." + tTime.chooseMonth + "." + mDays
		}
		tFilter.list.removeOne("time");
		$("#fb-time span").html("选择时间");
		tTitle.setDate();
		tFilter.ctrl.loadData()
	}
};
tTime.year = {
	template : '<div id="year-{0}" class="year"><div class="year-num"><div>{0} 年</div></div>{1}</div>',
	monthTemplate : '<div id="month-{0}-{1}" onmouseup="tTime.month.mouseup({0},{1});" class="month"><ul class="month-l"><li class="ml-income">+ <span id="ml-income-{0}-{1}">0</span></li><li class="ml-payout">- <span id="ml-payout-{0}-{1}">0</span></li></ul><ul class="month-r"><li><span class="month-num {2}">{1}</span></li></ul></div>',
	btnMousedown : false,
	btnMousescroll : false,
	boxMousedown : false,
	boxMousemove : false,
	boxMoveY : 0,
	htmlTop : 0,
	htmlBottom : 0,
	initHtml : function () {
		var initMon = tTime.currentMonth;
		var initYear = tTime.currentYear;
		if (initMon > 12) {
			initYear++;
			initMon = initMon - 12
		}
		this.setFirstMonth(initYear, initMon)
	},
	initData : function () {
		this.htmlTop = -tTime.yearHeight + 1;
		this.htmlBottom =  - (tTime.htmlEndYear - tTime.htmlBeginYear) * tTime.totalHeight + this.htmlTop;
		var newMonthStr = "";
		for (var i = tTime.htmlEndYear; i >= tTime.currentYear; i--) {
			for (var j = 12; j >= 1; j--) {
				if (i == tTime.currentYear && j == tTime.currentMonth) {
					break
				}
				if (i > tTime.currentYear || (i == tTime.currentYear && j > tTime.currentMonth)) {
					newMonthStr += "#month-" + i + "-" + j + ","
				}
			}
		}
		$(newMonthStr).addClass("newmonth");
		tTime.data.loadSomeYearData(tTime.htmlBeginYear, tTime.htmlEndYear, tTime.year._updateYear);
		$("#month-" + tTime.currentYear + "-" + tTime.currentMonth).addClass("current current-choose");
		$("#fc-month-box .month").bind("mouseover", function () {
			$(this).addClass($(this).hasClass("current") ? "current-over" : "mouseover")
		}).mouseout(function () {
			$(this).removeClass("mouseover").removeClass("current-over")
		});
		this.wheelAction();
		this.dragAction()
	},
	updateYearData : function (y) {
		tTime.data.loadSomeYearData(y, y, tTime.year._updateYear)
	},
	updateAllYearData : function () {
		tTime.data.loadSomeYearData(tTime.htmlBeginYear, tTime.htmlEndYear, tTime.year._updateYear)
	},
	_updateYear : function (y, data) {
		for (var i = 1; i <= 12; i++) {
			if (data[i] != null) {
				$("#ml-income-" + y + "-" + i).html(formatMoney(data[i].income, 0));
				$("#ml-payout-" + y + "-" + i).html(formatMoney(data[i].payout, 0))
			} else {
				$("#ml-income-" + y + "-" + i).html(0);
				$("#ml-payout-" + y + "-" + i).html(0)
			}
		}
	},
	setFirstMonth : function (y, m) {
		if (y > tTime.htmlEndYear || y < tTime.htmlBeginYear) {
			return
		}
		tTime.showYear = y;
		tTime.showMonth = m;
		$("#fcy-box").html(tTime.showYear + " 年");
		$("#fc-month-box").css("top", "-" + this._getFirstShowTop(y, m) + "px")
	},
	setLastMonth : function (y, m) {
		var fY = 0,
		fM = 0;
		if (m == 1) {
			fM = 12;
			fY = y
		} else {
			fM = m - 1;
			fY = y + 1
		}
		this.setFirstMonth(fY, fM)
	},
	_getFirstShowTop : function (y, m) {
		var top = (tTime.htmlEndYear - y) * tTime.totalHeight;
		return top + tTime.yearHeight + (12 - m) * tTime.monthHeight - 1
	},
	btnMouseDown : function (way) {
		tTime.year.btnMousedown = true;
		window.setTimeout(function () {
			if (tTime.year.btnMousedown == true) {
				tTime.year.btnMousescroll = true;
				var top = way == "prev" ? tTime.year.htmlBottom : tTime.year.htmlTop;
				var curTop = parseInt($("#fc-month-box").css("top"));
				var needTime = way == "prev" ? (-tTime.year.htmlBottom + curTop) * 1.5 : Math.abs(-tTime.year.htmlTop + curTop) * 1.5;
				$("#fc-month-box").animate({
					top : top + "px"
				}, needTime)
			}
		}, 300)
	},
	btnMouseUp : function (way) {
		if (tTime.year.btnMousescroll == false) {
			way == "prev" ? this._showPrev() : this._showNext()
		} else {
			$("#fc-month-box").stop();
			var curTime = tTime.year._getPositionTime();
			tTime.year.setFirstMonth(curTime[0], curTime[1])
		}
		tTime.year.btnMousedown = false;
		tTime.year.btnMousescroll = false
	},
	_showPrev : function () {
		if (tTime.showMonth == 12 && tTime.showYear == tTime.htmlBeginYear) {
			return
		}
		var speed = 100;
		if (tTime.showMonth == 1) {
			tTime.showYear = tTime.showYear - 1;
			$("#fcy-box").html(tTime.showYear + " 年");
			tTime.showMonth = 12;
			speed = speed * 1.5
		} else {
			tTime.showMonth = tTime.showMonth - 1
		}
		$("#fc-month-box").animate({
			top : "-" + this._getFirstShowTop(tTime.showYear, tTime.showMonth) + "px"
		}, speed)
	},
	_showNext : function () {
		if (tTime.showMonth == 12 && tTime.showYear == tTime.htmlEndYear) {
			return
		}
		var speed = 100;
		if (tTime.showMonth == 12) {
			tTime.showYear = tTime.showYear + 1;
			$("#fcy-box").html(tTime.showYear + " 年");
			tTime.showMonth = 1;
			speed = speed * 1.5
		} else {
			tTime.showMonth = tTime.showMonth + 1
		}
		$("#fc-month-box").animate({
			top : "-" + this._getFirstShowTop(tTime.showYear, tTime.showMonth) + "px"
		}, speed)
	},
	wheelAction : function () {
		var mousewheel = $.browser.mozilla ? "DOMMouseScroll" : "mousewheel";
		$("#fc-month").bind(mousewheel, function (event) {
			if ($.browser.mozilla) {
				if (event.detail > 0) {
					tTime.year._showPrev()
				} else {
					tTime.year._showNext()
				}
			} else {
				if (event.wheelDelta < 0) {
					tTime.year._showPrev()
				} else {
					tTime.year._showNext()
				}
			}
			return false
		})
	},
	dragAction : function () {
		$("#fc-month").bind("mousedown", function (e) {
			tTime.year.boxMousedown = true;
			tTime.year.boxMoveY = e.pageY
		});
		$(document).bind("mousemove", function (e) {
			if (tTime.year.boxMousedown == true) {
				tTime.year.boxMousemove = true;
				var y = e.pageY - tTime.year.boxMoveY;
				tTime.year.boxMoveY = e.pageY;
				var top = parseInt($("#fc-month-box").css("top")) + y;
				if (top <= tTime.year.htmlTop && top >= tTime.year.htmlBottom) {
					$("#fc-month-box").css("top", top + "px")
				}
			}
		}).bind("mouseup", function () {
			if (tTime.year.boxMousedown == true) {
				var curTime = tTime.year._getPositionTime();
				tTime.year.setFirstMonth(curTime[0], curTime[1]);
				tTime.year.boxMousedown = false;
				tTime.year.boxMousemove = false;
				tTime.year.boxMoveY = 0
			} else {
				if (tTime.year.btnMousescroll == true) {
					tTime.year.btnMouseUp("")
				}
			}
		})
	},
	_getPositionTime : function () {
		var top = parseInt($("#fc-month-box").css("top")) - 1;
		var year = tTime.htmlEndYear + parseInt(top / tTime.totalHeight);
		var monthHeight = Math.abs(top % tTime.totalHeight) - tTime.yearHeight;
		var monthAdd = (monthHeight % tTime.monthHeight) > (tTime.monthHeight / 2) ? 1 : 0;
		var month = 12 - (parseInt(monthHeight / tTime.monthHeight) + monthAdd);
		if (month == 0) {
			month = 12;
			year = year - 1
		}
		return [year, month]
	}
};
tTime.month = {
	choose : function (year, month) {
		this.remove();
		tTime.chooseYear = year;
		tTime.chooseMonth = month;
		$("#month-" + year + "-" + month).addClass("choose").addClass($("#month-" + year + "-" + month).hasClass("current") ? "current-choose" : "");
		tTime.data.loadBillData()
	},
	mouseup : function (year, month) {
		if (tTime.year.boxMousemove == false) {
			this.choose(year, month)
		}
	},
	remove : function () {
		$("#month-" + tTime.chooseYear + "-" + tTime.chooseMonth).removeClass("choose").removeClass("current-choose");
		tTime.chooseYear = -1;
		tTime.chooseMonth = -1
	},
	setData : function (num, type, year, month) {
		month = parseInt(month, 10);
		var $obj = $("#ml-" + type + "-" + year + "-" + month);
		$obj.html(formatMoney(restoreMoney($obj.html()) + parseFloat(num), 0))
	}
};
tTime.getMonthDays = function (y, m) {
	var lastDay = new Date(y, m, 0);
	return lastDay.getDate()
};
var tData = {
	category : 0,
	account : 0,
	store : 0,
	project : 0,
	member : 0,
	startTime : "",
	endTime : "",
	keyword : "",
	page : 1,
	sort : "",
	isDesc : 0,
	type : 0,
	load : function (byPage, showLoad, callback) {
		if (showLoad) {
			tTitle.showMsg("loading...")
		}
		if (!byPage) {
			this.page = 1
		}
		$.rmi("new", {
			opt : "list2",
			beginDate : this.startTime,
			endDate : this.endTime,
			cids : this.category,
			bids : this.account,
			sids : this.store,
			pids : this.project,
			memids : this.member,
			order : this.sort,
			isDesc : this.isDesc,
			page : this.page,
			note : this.keyword,
			mids : this.type
		}, function (data) {
			try {
				tList.html.setList(data, tData.page);
				tList.page.setHtml(tData.page, data.pageCount);
				tList.setAll.dataInit();
				if (tList.box.openAll == true) {
					tList.box.shrinkList()
				}
				if (showLoad) {
					tTitle.hideMsg()
				}
				if (callback != null && typeof callback == "function") {
					callback()
				}
			} catch (e) {}

		})
	}
};
var tFilter = {
	sortByDate : true
};
tFilter.panel = {
	currentPanel : "",
	show : function (name) {
		this.hide();
		this.currentPanel = name;
		$("#panel-" + name).show();
		tList.setAll.hidePanel()
	},
	hide : function () {
		if (this.currentPanel != "") {
			$("#panel-" + this.currentPanel).hide();
			this.currentPanel = ""
		}
	}
};
tFilter.ctrl = {
	loadData : function (bypage) {
		if (tData.category != 0 || tData.account != 0 || tData.store != 0 || tData.type != 0 || tData.member != 0 || tData.project != 0 || tData.startTime != "" || tData.endTime != "" || tData.keyword != "") {
			$("#fb-all").removeClass("choose")
		} else {
			$("#fb-all").addClass("choose");
			tTime.month.remove()
		}
		tData.load(bypage, true)
	},
	removeAll : function () {
		tData.category = 0;
		tData.account = 0;
		tData.store = 0;
		tData.project = 0;
		tData.member = 0;
		tData.startTime = "";
		tData.endTime = "";
		tData.keyword = "";
		tData.page = 1;
		tData.type = 0;
		$("#fb-all").addClass("choose");
		tFilter.list.removeAll();
		this.baseRemoveStyle("project");
		this.baseRemoveStyle("member");
		this.baseRemoveStyle("store");
		this.baseRemoveStyle("account");
		this.baseRemoveStyle("category");
		this.baseRemoveStyle("type");
		tTime.month.remove();
		tTitle.setDate();
		this.loadData()
	},
	baseSet : function (type, mark) {
		var result = tFilter.cbox.getValue(mark);
		tFilter.panel.hide();
		if (result == "all") {
			this.baseRemove(type)
		} else {
			var typeMsg = this.baseSetVal(type, result[0].join(","));
			tFilter.list.addOne(type, result[1]);
			$("#fb-" + type + " span").html("选择" + typeMsg[1]);
			this.loadData()
		}
	},
	baseRemove : function (type) {
		this.baseRemoveStyle(type);
		this.loadData()
	},
	baseRemoveStyle : function (type) {
		var typeMsg = this.baseSetVal(type, 0);
		tFilter.cbox.removeAll(typeMsg[0]);
		$("#fb-" + type + " span").html("所有" + typeMsg[1]);
		tFilter.list.removeOne(type)
	},
	baseSetVal : function (type, value) {
		var typeMsg = [];
		switch (type) {
		case "project":
			tData.project = value;
			typeMsg = ["cPro", "项目"];
			break;
		case "member":
			tData.member = value;
			typeMsg = ["cMem", "成员"];
			break;
		case "store":
			tData.store = value;
			typeMsg = ["cSto", "商家"];
			break;
		case "account":
			tData.account = value;
			typeMsg = ["cAcc", "账户"];
			break;
		case "category":
			tData.category = value;
			typeMsg = ["cCat", "分类"];
			break;
		case "type":
			tData.type = value;
			typeMsg = ["cTyp", "操作"];
			break
		}
		return typeMsg
	},
	time : {
		set : function () {
			var bDayStr = $("#fb-begindate").val();
			var eDayStr = $("#fb-enddate").val();
			var bDate = new Date(bDayStr.replace(".", "/").replace(".", "/"));
			var eDate = new Date(eDayStr.replace(".", "/").replace(".", "/"));
			if ((bDayStr != "" && eDayStr != "") && (bDate > eDate)) {
				listMsgShow($("#fb-begindate"), "起始日期不能在结束日期之后吧", false);
				return
			}
			tFilter.panel.hide();
			if (bDayStr == "" && eDayStr == "") {
				this.remove()
			} else {
				if (eDayStr != "") {
					tTime.year.setFirstMonth(eDate.getFullYear(), eDate.getMonth() + 1)
				} else {
					if (bDayStr != "") {
						tTime.year.setLastMonth(bDate.getFullYear(), bDate.getMonth() + 1)
					}
				}
				tData.startTime = bDayStr;
				tData.endTime = eDayStr;
				tFilter.list.addTime(bDayStr, eDayStr);
				$("#fb-time span").html("时间范围");
				tTime.month.remove();
				tTitle.setDate();
				tFilter.ctrl.loadData()
			}
		},
		remove : function () {
			tData.startTime = "";
			tData.endTime = "";
			tTime.month.remove();
			tTitle.setDate();
			tFilter.list.removeOne("time");
			$("#fb-begindate,#fb-enddate").val("");
			$("#fb-time span").html("时间范围");
			tFilter.ctrl.loadData()
		}
	},
	keyword : {
		set : function () {
			tData.keyword = $("#search-key").val();
			if (tData.keyword != "") {
				tFilter.list.addKeyword(tData.keyword);
				tFilter.ctrl.loadData()
			} else {
				this.remove()
			}
		},
		remove : function () {
			tData.keyword = "";
			$("#search-key").val("");
			tFilter.list.removeOne("keyword");
			tFilter.ctrl.loadData()
		}
	},
	page : {
		set : function (pageNum) {
			tData.page = pageNum;
			tFilter.ctrl.loadData(true)
		}
	},
	sort : {
		set : function (name) {
			tFilter.sortByDate = (name == "tran_time") ? true : false;
			if ($("#sort-" + name).hasClass("choose")) {
				$("#sort-" + name + " .in").hasClass("down") ? $("#sort-" + name + " .in").removeClass("down") : $("#sort-" + name + " .in").addClass("down")
			} else {
				$("#fc-tit li").removeClass("choose");
				$("#sort-" + name).addClass("choose")
			}
			tData.sort = name;
			tData.isDesc = $("#sort-" + name + " .in").hasClass("down") ? 1 : 0;
			tFilter.ctrl.loadData()
		}
	}
};
tFilter.list = {
	showNum : 0,
	open : function () {
		$("#filter-list").slideDown(100);
		$("#filter-bar").addClass("openbar")
	},
	close : function () {
		$("#filter-list").slideUp(100);
		$("#filter-bar").removeClass("openbar")
	},
	addOne : function (name, valueArray) {
		var htmlArr = new Array();
		var arrLen = valueArray.length;
		var forLen = (arrLen > 10) ? 10 : arrLen;
		for (var i = 0; i < forLen; i++) {
			htmlArr.push('<span class="flcl-1">' + cnSubstr(valueArray[i], 8) + "</span>")
		}
		if (arrLen > 10) {
			htmlArr.push("<span>和&nbsp;其它" + (arrLen - 10) + "个...</span>")
		}
		this.showOne(name, htmlArr.join(""))
	},
	addTime : function (beginDate, endDate) {
		if (beginDate == "" && endDate == "") {
			return
		}
		var bStr = "~",
		eStr = "~",
		dateArr = null;
		if (beginDate != "") {
			dateArr = beginDate.split(".");
			bStr = dateArr[0] + "年" + dateArr[1] + "月" + dateArr[2] + "日"
		}
		if (beginDate == endDate) {
			this.showOne("time", bStr);
			return
		} else {
			if (endDate != "") {
				dateArr = endDate.split(".");
				eStr = dateArr[0] + "年" + dateArr[1] + "月" + dateArr[2] + "日"
			}
		}
		this.showOne("time", bStr + " &nbsp;至&nbsp; " + eStr)
	},
	addKeyword : function (keyword) {
		this.showOne("keyword", keyword)
	},
	showOne : function (name, html) {
		if (this.showNum == 0) {
			this.open()
		}
		if ($("#fl-" + name).hasClass("onshow") == false) {
			this.showNum++;
			$("#fl-" + name).addClass("onshow").slideDown(80)
		}
		$("#fl-" + name + " .flc-list").html(html);
		$("#filter-list .fl-child").removeClass("noborder");
		$("#filter-list .onshow").last().addClass("noborder")
	},
	removeOne : function (name) {
		if ($("#fl-" + name).hasClass("onshow")) {
			$("#fl-" + name).removeClass("onshow").slideUp(80);
			$("#fl-" + name + " .flc-list").html("");
			$("#filter-list .onshow").last().addClass("noborder");
			this.showNum--;
			if (this.showNum == 0) {
				this.close()
			}
		}
	},
	removeAll : function () {
		$("#filter-list .fl-child").removeClass("noborder").removeClass("onshow").hide();
		this.showNum = 0;
		$("#filter-list .fl-child .flc-list").html("");
		this.close()
	}
};
tFilter.cbox = {
	click : function (mark, upmark, upupmark) {
		var $obj = $("#" + mark + "-a");
		if ($obj.hasClass("select")) {
			$obj.add($("#" + mark + ",a." + mark + ",input." + mark)).removeClass("some").removeClass("select")
		} else {
			$obj.add($("#" + mark + ",a." + mark + ",input." + mark)).addClass("select")
		}
		if (upmark != "") {
			this.setParentSelect(upmark)
		}
		if (upupmark != "") {
			this.setParentSelect(upupmark)
		}
	},
	removeAll : function (mark) {
		$("#" + mark + "-a,#" + mark + ",a." + mark + ",input." + mark).removeClass("some").removeClass("select")
	},
	setParentSelect : function (parentMark) {
		if ($("input." + parentMark).not($("input.select")).length == 0) {
			$("#" + parentMark + "-a,#" + parentMark).removeClass("some").addClass("select")
		} else {
			if ($("input." + parentMark).filter(".select").length == 0) {
				$("#" + parentMark + "-a,#" + parentMark).removeClass("some").removeClass("select")
			} else {
				$("#" + parentMark + "-a,#" + parentMark).addClass("some").removeClass("select")
			}
		}
	},
	getValue : function (mark) {
		if ($("input." + mark).filter(".select").length == 0) {
			return "all"
		}
		var result = new Array();
		$("input." + mark).filter(".select").each(function () {
			result.push($(this).val())
		});
		var nameArr = new Array();
		$("a." + mark).filter(".select").filter(".base").each(function () {
			nameArr.push($(this).attr("title"))
		});
		return [result, nameArr]
	}
};
tFilter.fastAdd = {
	addChild : function (type, id, name) {
		var html = '<li><input id="' + type + "-" + id + '" type="checkbox" value="' + id + '" class="hidden ' + type + '" /><a id="' + type + "-" + id + '-a" class="cbox ' + type + ' base" onclick="tFilter.cbox.click(\'' + type + "-" + id + "','" + type + "','');\" title=\"" + name + '">' + cnSubstr(name, 12) + "</a></li>";
		$("#pBox-" + type).append(html);
		addMouseStyle($("#" + type + "-" + id + "-a"), "hover", "");
		addMouseStyle($("#" + type + "-" + id + "-a").parent("li"), "mouseover", "")
	},
	addAccChild : function (parentId, id, name) {
		var html = '<li><input id="cAcc-' + id + '" type="checkbox" value="' + id + '" class="hidden cAcc" /><a id="cAcc-' + id + '-a" class="cbox cAcc base" onclick="tFilter.cbox.click(\'cAcc-' + id + "','cAcc','');\" title=\"" + name + '">' + cnSubstr(name, 12) + "</a></li>";
		$("#pBox-cAcc-" + parentId).append(html).show().addClass("show");
		$("#panel-account ul").removeClass("first");
		$("#panel-account ul.show").first().addClass("first");
		addMouseStyle($("#cAcc-" + id + "-a"), "hover", "")
	},
	addLevel1 : function (type, id, name) {
		var idStr = type + "-" + id;
		var html = '<li id="pLi-cCat-' + idStr + '" class="li nochild"><input id="cCat-' + idStr + '" type="checkbox" value="' + id + '" class="hidden cCat" /><a id="cCat-' + idStr + '-a" class="cbox ctit cCat base" onclick="tFilter.cbox.click(\'cCat-' + idStr + "', 'cCat','');\" title=\"" + name + '">' + cnSubstr(name, 10) + '</a><div class="level2" id="pDiv-cCat-' + idStr + '"><div class="p-box png"><div class="p-top png"><div class="p-top-out"><div class="p-top-in"></div></div></div><div class="p-list png"><div class="p-list-box"><ul id="pBox-cCat-' + idStr + '"></ul><div class="clear"></div></div></div></div><div class="p-bot-2 png"></div></div></li>';
		$("#pBox-cCat-" + type).append(html).show();
		if ((type == "in" && $("#pBox-cCat-out li").length > 0) || (type == "out" && $("#pBox-cCat-in li").length > 0)) {
			$("#pBox-cCat-out").removeClass("last")
		}
		$("#pLi-cCat-" + idStr).bind("mouseenter", function () {
			$(this).children(".level2-show").show();
			$(this).addClass("mouseover")
		}).bind("mouseleave", function () {
			$(this).children(".level2-show").hide();
			$(this).removeClass("mouseover")
		})
	},
	addLevel2 : function (type, id, name, parentId) {
		var idStr = type + "-" + id;
		var parentMark = type + "-" + parentId;
		var html = '<li><input id="cCat-' + idStr + '" type="checkbox" value="' + id + '" class="hidden cCat cCat-' + parentMark + '" /><a id="cCat-' + idStr + '-a" class="cbox cCat base cCat-' + parentMark + '" onclick="tFilter.cbox.click(\'cCat-' + idStr + "', 'cCat-" + parentMark + "','cCat');\" title=\"" + name + '">' + cnSubstr(name, 10) + "</a></li>";
		$("#pBox-cCat-" + parentMark).append(html);
		$("#pLi-cCat-" + parentMark).removeClass("nochild");
		$("#pDiv-cCat-" + parentMark).addClass("level2-show");
		$("#cCat-" + parentMark + "-a").removeClass("base");
		addMouseStyle($("#cCat-" + idStr + "-a"), "hover", "")
	}
};
var tTitle = {
	setDate : function () {
		var bDate = tData.startTime;
		var eDate = tData.endTime;
		if (bDate == "" && eDate == "") {
			$("#ft-date li").hide()
		} else {
			if (bDate == eDate) {
				$("#ft-date li").hide();
				$("#ft-date-begin").html(bDate).show()
			} else {
				$("#ft-date li").show();
				$("#ft-date-begin").html(bDate == "" ? "~" : bDate);
				$("#ft-date-end").html(eDate == "" ? "~" : eDate)
			}
		}
	},
	setDefaultData : function (payout, income) {
		$("#ft-payout").html(formatMoney(payout + "", 2));
		$("#ft-income").html(formatMoney(income + "", 2));
		$("#ft-remain").html(formatMoney((income - payout) + "", 2))
	},
	showMsg : function (msg, time) {
		$("#filter-load").html(msg).show();
		if (time > 0) {
			window.setTimeout(function () {
				$("#filter-load").hide()
			}, time)
		}
	},
	hideMsg : function () {
		$("#filter-load").hide()
	}
};
var billType = {
	payout : 1,
	transferOut : 2,
	borrow : 3,
	borrowBack : 4,
	income : 5,
	lend : 6,
	lendBack : 7,
	transferIn : 8,
	daifu : 12
};
var billManager = {
	addType : billType.payout,
	realType : billType.payout,
	moreIsShow : false,
	typePos : new Array(-1, 0, 2, 3, 3, 1, 3, 3),
	money2IsShow : false,
	showMore : function () {
		if (billManager.moreIsShow == true) {
			this.closeMore()
		} else {
			$("#type-more").addClass("btnshow");
			$("#type-more-box").show();
			billManager.moreIsShow = true
		}
	},
	closeMore : function () {
		if (billManager.moreIsShow == true) {
			$("#type-more-box").hide();
			$("#type-more").removeClass("btnshow");
			billManager.moreIsShow = false
		}
	},
	moreButtonClick : function (type) {
		$("#tm-3,#tm-4,#tm-6,#tm-7,#tm-12,#tm-l-3,#tm-l-4,#tm-l-6,#tm-l-7,#tm-l-12").remove();
		$("#type-menu-ul").append('<li class="tm-l" id="tm-l-' + type + '"></li><li class="tm-n" id="tm-' + type + '"><a onclick="javascript:billManager.changeType(' + type + ');"></a></li>');
		addMouseStyle($("#tm-" + type + " a"), "hover", "active");
		$("#tm-" + type + " a").click();
		billManager.closeMore()
	},
	changeType : function (typeId) {
		var pos = $("#type-menu-ul .tm-n").index($("#tm-" + typeId));
		$("#type-menu li.tm-l").removeClass("tm-l-no");
		$("#type-menu li.tm-l").eq(pos).addClass("tm-l-no");
		if (pos > 0) {
			$("#type-menu li.tm-l").eq(pos - 1).addClass("tm-l-no")
		}
		$("#type-menu a").removeClass("select");
		$("#tm-" + typeId + " a").addClass("select");
		if (typeId == 1 || typeId == 2 || typeId == 5) {
			$("#tb-li-store").show()
		} else {
			$("#tb-li-store").hide()
		}
		$(".tb-li-hidden").hide();
		billManager.realType = typeId;
		if (typeId == 12) {
			typeId = 6;
			$("#tb-outAccount-label-6").html("付款账户：")
		} else {
			if (typeId == 6) {
				$("#tb-outAccount-label-6").html("转出账户：")
			}
		}
		$("#tb-m .tb-ul-1").hide();
		$("#tbul-" + typeId).show();
		billManager.addType = typeId;
		checkAccount();
		if (billManager.realType == 12) {
			this.setDaifuMemo();
			$("#tb-memo").removeClass("default-memo")
		} else {
			$("#tb-memo").addClass("default-memo").val("点击填写备注")
		}
		if (typeId == 1 || typeId == 5 || typeId == 2) {
			$("#template-box").show();
			$("#template-box .template-list").hide();
			$("#template-list-" + typeId).show();
			$("#tb-li-member").show()
		} else {
			$("#template-box,#tb-li-member").hide()
		}
	},
	setDaifuMemo : function () {
		if (billManager.realType == 12) {
			var money = 0;
			money = $("#tb-outMoney-6").val();
			money = (money == "") ? "0" : money;
			$("#tb-memo").val("#代付#帮别人付了" + money + "元")
		}
	}
};
function setDefaultMemo(obj) {
	if ($.trim($(obj).val()) == "") {
		$(obj).addClass("default-memo").val("点击填写备注")
	}
}
function clearDefaultMemo(obj) {
	if ($(obj).hasClass("default-memo")) {
		$(obj).removeClass("default-memo").val("")
	}
}
function checkAccount() {
	$("#tb-r-ul #tb-li-member").css("margin-top", "0px");
	if (billManager.addType == billType.payout || billManager.addType == billType.income) {
		billManager.money2IsShow = false
	} else {
		var cur1 = billManager.form.getOneVal("outAccount", billManager.addType);
		var cur2 = billManager.form.getOneVal("inAccount", billManager.addType);
		if ($param.accountJson[cur1] == $param.accountJson[cur2]) {
			$("#tb-money-hidden-" + billManager.addType).hide();
			billManager.money2IsShow = false;
			$("#tb-label-" + billManager.addType).html("金额：");
			$("#tb-label-" + billManager.addType + "-1").html("金额：")
		} else {
			$("#tb-money-hidden-" + billManager.addType).show();
			billManager.money2IsShow = true;
			var labelStr = new Array("", "", "转出金额：", "负债金额：", "负债金额：", "", "债权金额：", "债权金额：");
			$("#tb-label-" + billManager.addType).html(labelStr[billManager.addType]);
			$("#tb-r-ul #tb-li-member").css("margin-top", "10px");
			if (billManager.addType == 4 || billManager.addType == 6) {
				$("#tb-label-" + billManager.addType + "-1").html("转出金额：")
			}
		}
	}
}
function editCheckAccount1(param) {
	editCheckAccount(param.id.replace("list-account-all-", "").replace("-", ""))
}
function editCheckAccount2(param) {
	editCheckAccount(param.id.replace("list-account-all-2-", "").replace("-", ""))
}
function editCheckAccount(id) {
	var tran = tList.box.data[id][1];
	if (tran.tranType != 2) {
		return
	}
	var oA = Ysl.select("list-account-all-" + id + "-").val();
	var iA = Ysl.select("list-account-all-2-" + id + "-").val();
	if ($param.accountJson[oA] == $param.accountJson[iA]) {
		$("#list-box-" + id + " .list-label-2").html("金额：");
		$("#list-box-" + id + " .list-money-2").hide();
		$("#list-box-" + id + " .list-label-3").hide()
	} else {
		$("#list-box-" + id + " .list-label-2").html("转出额：");
		$("#list-box-" + id + " .list-money-2").show();
		$("#list-box-" + id + " .list-label-3").show()
	}
}
billManager.form = {
	getAllVal : function (i) {
		i = (i == null) ? billManager.addType : i;
		var memo = $("#tb-memo").val();
		var date = $("#tb-datepicker").val();
		memo = $.trim(memo) == "点击填写备注" ? "" : memo;
		date = date.replace(new RegExp("\\.|\\/", "gm"), "-");
		return {
			category : $("#tb-category-" + i).val(),
			outAccount : $("#tb-outAccount-" + i).val(),
			inAccount : $("#tb-inAccount-" + i).val(),
			outMoney : replaeMoneySeparator($("#tb-outMoney-" + i).val()),
			inMoney : replaeMoneySeparator($("#tb-inMoney-" + i).val()),
			date : date,
			project : $("#tb-project").val(),
			member : $("#tb-member").val(),
			memo : memo,
			picture : $("#img-name-add").val(),
			store : $("#tb-store").val(),
			debt : $("#tb-debt-" + i).val()
		}
	},
	clearData : function (i) {
		$("#tb-outMoney-" + i).val("");
		$("#tb-inMoney-" + i).val("");
		$("#tb-memo").val("");
		$("#img-name-add").val("");
		var picUrl = "../images/tally/default.jpg";
		$("#img-show-add").attr("src", picUrl).removeClass("img-show-big").unbind("click");
		$("#img-panel-add .img-del").hide();
		$("#img-panel-add .img-upload").addClass("img-upload-center");
		setDefaultMemo($("#tb-memo"))
	},
	getOneVal : function (name, type) {
		return billManager.form.getOneObj(name, type).val()
	},
	getOneObj : function (name, type) {
		return $("#tb-" + name + (type == null ? "" : "-" + type))
	},
	getSelectInputObj : function (name, type) {
		return $("#tb-" + name + (type == null ? "" : "-" + type) + "_text")
	}
};
billManager.check = {
	formCheckObj : [[], ["category", "outAccount", "", "outMoney", "", "datepicker", "memo"], ["", "outAccount", "inAccount", "outMoney", "", "datepicker", "memo"], ["", "outAccount", "inAccount", "outMoney", "", "datepicker", "memo"], ["", "outAccount", "inAccount", "outMoney", "", "datepicker", "memo"], ["category", "", "inAccount", "", "inMoney", "datepicker", "memo"], ["", "outAccount", "inAccount", "outMoney", "", "datepicker", "memo"], ["", "outAccount", "inAccount", "outMoney", "", "datepicker", "memo"]],
	formCheckType : ["category", "account", "account", "money", "money", "date", "memo"],
	formCheckObj2 : ["", "", "inMoney", "inMoney", "inMoney", "", "inMoney", "inMoney"],
	dataCheck : function () {
		var data = this.formCheckObj[billManager.addType];
		var obj = null;
		var value = null;
		for (var i = 0; i < 7; i++) {
			if (data[i] == "") {
				continue
			} else {
				if (this.formCheckType[i] == "date" || this.formCheckType[i] == "memo") {
					value = billManager.form.getOneVal(data[i], null);
					obj = billManager.form.getOneObj(data[i], null)
				} else {
					value = billManager.form.getOneVal(data[i], billManager.addType);
					obj = this.formCheckType[i] == "money" ? billManager.form.getOneObj(data[i], billManager.addType) : billManager.form.getSelectInputObj(data[i], billManager.addType)
				}
				if (this.formCheckType[i] == "money") {
					value = replaeMoneySeparator(value)
				}
				if (this.dataCheckDo(this.formCheckType[i], value, obj) == false) {
					return false
				}
			}
		}
		if (billManager.money2IsShow) {
			var money2 = billManager.check.formCheckObj2[billManager.addType];
			value = billManager.form.getOneVal(money2, billManager.addType),
			obj = billManager.form.getOneObj(money2, billManager.addType);
			if (money2 != "" && billManager.check.dataCheckDo("money", value, obj) == false) {
				return false
			}
		}
		return true
	},
	dataCheckDo : function (type, value, obj) {
		value = $.trim(value);
		if (type == "money") {
			if (value == "" || value == null) {
				listMsgShow(obj, "请填写金额 ");
				return false
			} else {
				if (isNaN(value) || value >= 10000000000) {
					listMsgShow(obj, "金额填写有误 ");
					return false
				}
			}
		} else {
			if (type == "date") {
				if (value == "") {
					listMsgShow(obj, "请输入日期 ");
					return false
				} else {
					var dateReg = /^\d{4}[\.|\-|\/](0?[1-9]|1[0-2])[\.|\-|\/](0?[1-9]|[1-2]\d|3[0-1])( +(0?\d|1\d|2[0-3]):([0-5]?\d)(:[0-5]?\d)?)?$/;
					if (value.match(dateReg) == null) {
						listMsgShow(obj, "时间填写不正确，格式如2012.01.01 09:00");
						return false
					}
				}
			} else {
				if (type == "account" && value == "") {
					listMsgShow(obj, "请选择账户");
					return false
				} else {
					if (type == "category" && value == "") {
						listMsgShow(obj, "请选择分类");
						return false
					} else {
						if (type == "memo" && value.length > 255) {
							listMsgShow(obj, "备注不能超过255个字符");
							return false
						}
					}
				}
			}
		}
		return true
	}
};
billManager.data = {
	postUrl : ["", "payout", "transfer", "borrow", "lend", "income", "borrow", "lend", "transfer", "change", "change", "change"],
	add : function () {
		if (billManager.check.dataCheck()) {
			var formData = billManager.form.getAllVal();
			billManager.data.dataPost(0, billManager.data.dataChange(formData), billManager.addType)
		}
	},
	dataChange : function (data) {
		var serverData = {
			out_account : 0,
			in_account : 0,
			debt_account : "",
			account : 0,
			price : 0,
			price2 : null
		};
		switch (billManager.addType) {
		case billType.payout:
			serverData.account = data.outAccount;
			serverData.price = data.outMoney;
			break;
		case billType.transferOut:
			serverData.out_account = data.outAccount;
			serverData.in_account = data.inAccount;
			serverData.price = data.outMoney;
			if (billManager.money2IsShow) {
				serverData.price2 = data.inMoney
			}
			break;
		case billType.borrow:
		case billType.lendBack:
			serverData.account = data.inAccount;
			serverData.debt_account = data.outAccount;
			serverData.price = data.outMoney;
			if (billManager.money2IsShow) {
				serverData.price2 = data.inMoney
			}
			break;
		case billType.borrowBack:
		case billType.lend:
			serverData.account = data.outAccount;
			serverData.debt_account = data.inAccount;
			serverData.price = data.outMoney;
			if (billManager.money2IsShow) {
				serverData.price = data.outMoney;
				serverData.price2 = data.inMoney
			}
			break;
		case billType.income:
			serverData.account = data.inAccount;
			serverData.price = data.inMoney;
			serverData.category = data.category;
			break
		}
		serverData.category = data.category;
		serverData.store = data.store;
		serverData.debt = data.debt;
		serverData.time = data.date;
		serverData.project = data.project;
		serverData.memo = data.memo;
		serverData.url = data.picture;
		if (billManager.addType == 1 || billManager.addType == 5) {
			serverData.member = data.member
		}
		return serverData
	},
	dataPost : function (id, data, type) {
		tTitle.showMsg("正在保存...");
		$.rmi(billManager.data.postUrl[type], {
			id : id,
			category : data.category,
			store : data.store,
			time : $.trim(data.time),
			project : data.project,
			member : data.member,
			memo : data.memo,
			url : data.url,
			debt : data.debt,
			out_account : data.out_account,
			in_account : data.in_account,
			debt_account : data.debt_account,
			account : data.account,
			price : $.trim(data.price),
			price2 : $.trim(data.price2)
		}, function (result) {
			try {
				data.time = data.time.replace(new RegExp("\\.|\\/", "gm"), "-");
				var newDate = data.time.split("-");
				if (result.id && result.id == -1) {
					location.href = "../logout.jsp"
				} else {
					if (id > 0) {
						if (result.result == "ok") {
							tTitle.showMsg("修改成功...", 1000);
							var tran = tList.box.data[id][1];
							billManager.data.resetYearData(type, "save", {
								newCurr : $param.accountJson[data.account],
								oldCurr : $param.accountJson[tran.buyerAcountId]
							}, {
								oldYear : tran.date.year + 1900,
								oldMonth : tran.date.month + 1,
								oldMoney : tran.itemAmount,
								newYear : newDate[0],
								newMonth : newDate[1],
								newMoney : data.price
							});
							tData.load(true, false)
						} else {
							if (type == 2 && result.id == -2) {
								listMsgShow($("#list-box-" + id), (data.out_account == data.in_account) ? "转入转出账户不能相同 " : "对不起，债权、债务之间不能转账~");
								tTitle.hideMsg()
							} else {
								listMsgShow($("#list-box-" + id), "对不起，数据保存失败~~(>_<)~~");
								tTitle.hideMsg()
							}
						}
					} else {
						if (result.id == 0) {
							listMsgShow($("#tb-save"), "对不起，添加数据失败~~(>_<)~~");
							tTitle.hideMsg()
						} else {
							if (type == 2 && result.id == -2) {
								listMsgShow($("#tb-inAccount-2_text"), (data.out_account == data.in_account) ? "转入转出账户不能相同 " : "对不起，债权、债务之间不能转账~");
								tTitle.hideMsg()
							} else {
								tTitle.showMsg("添加成功...", 1000);
								billManager.data.resetYearData(type, "add", {
									newCurr : $param.accountJson[data.account],
									oldCurr : ""
								}, {
									newYear : newDate[0],
									newMonth : newDate[1],
									newMoney : data.price
								});
								billManager.form.clearData(type);
								tData.load(false, false);
								UScore.add("../systemSet/basic", "tally", function (status, type, times) {
									if (status == 1) {
										if (times > 0) {
											UScore.showSuccess(type)
										} else {
											UScore.showSuccess(type, null, "，每天最多获得10个经验值")
										}
									}
								})
							}
						}
					}
				}
			} catch (e) {}

		})
	},
	del : function (id, type) {
		$.confirm(function () {
			tTitle.showMsg("正在删除...");
			$.rmi("new", {
				opt : "del",
				transId : id
			}, function (result) {
				try {
					if (result.result == "error") {
						listMsgShow($("#list-box-" + id), "对不起，数据删除失败~~(>_<)~~")
					} else {
						tTitle.showMsg("删除成功...", 1000);
						var tran = tList.box.data[id][1];
						billManager.data.resetYearData(type, "del", {
							oldCurr : $param.accountJson[tran.buyerAcountId],
							newCurr : ""
						}, {
							oldYear : tran.date.year + 1900,
							oldMonth : tran.date.month + 1,
							oldMoney : tran.itemAmount
						});
						tData.load(true, false)
					}
				} catch (e) {}

			})
		})
	},
	save : function (id, type) {
		var boxId = "#list-box-" + id;
		var titId = "#list-tit-" + id;
		var strBoxId = id + "-";
		if (type == 1 || type == 5) {
			var typeStr = (type == 1) ? "payout" : "income";
			var data = {};
			var cateObj = $("#list-" + typeStr + "-" + strBoxId + "_text");
			var accObj = $("#list-account-" + typeStr + "-" + strBoxId + "_text");
			data.category = Ysl.select("list-" + typeStr + "-" + strBoxId).val();
			data.account = Ysl.select("list-account-" + typeStr + "-" + strBoxId).val();
			data.store = Ysl.select("list-store-" + strBoxId).val();
			var timeObj = $(boxId + ' input[name="list-datepicker"]');
			data.time = timeObj.val();
			data.project = Ysl.select("list-project-" + strBoxId).val();
			data.member = Ysl.select("list-member-" + strBoxId).val();
			data.memo = $(boxId + ' input[name="list-memo"]').val();
			data.url = $("#img-name-" + id).val();
			var moneyObj = $(boxId + ' input[name="list-money"]');
			data.price = replaeMoneySeparator(moneyObj.val());
			data.memo = $.trim(data.memo) == "点击填写备注" ? "" : data.memo;
			if (billManager.check.dataCheckDo("category", data.category, cateObj) == false || billManager.check.dataCheckDo("account", data.account, accObj) == false || billManager.check.dataCheckDo("money", data.price, moneyObj) == false || billManager.check.dataCheckDo("date", data.time, timeObj) == false || billManager.check.dataCheckDo("memo", data.memo, $(boxId + ' input[name="list-memo"]')) == false) {
				return false
			} else {
				billManager.data.dataPost(id, data, type)
			}
		} else {
			if (type == 2) {
				var data = {};
				data.out_account = Ysl.select("list-account-all-" + strBoxId).val();
				data.in_account = Ysl.select("list-account-all-2-" + strBoxId).val();
				data.store = Ysl.select("list-store-" + strBoxId).val();
				var moneyObj = $(boxId + ' input[name="list-money"]');
				data.price = moneyObj.val();
				if ($param.accountJson[data.out_account] != $param.accountJson[data.in_account]) {
					var moneyObj2 = $(boxId + ' input[name="list-money-2"]');
					data.price2 = moneyObj2.val();
					if (billManager.check.dataCheckDo("money", data.price2, moneyObj2) == false) {
						return false
					}
				} else {
					data.price2 = data.price
				}
				if (data.out_account == data.in_account) {
					listMsgShow($("#list-account-all-2-" + strBoxId + "_text"), "对不起，转出转入账户不能相同")
				}
				var timeObj = $(boxId + ' input[name="list-datepicker"]');
				data.time = timeObj.val();
				data.project = Ysl.select("list-project-" + strBoxId).val();
				data.memo = $(boxId + ' input[name="list-memo"]').val();
				data.url = $("#img-name-" + id).val();
				data.memo = $.trim(data.memo) == "点击填写备注" ? "" : data.memo;
				if (billManager.check.dataCheckDo("money", data.price, moneyObj) == false || billManager.check.dataCheckDo("date", data.time, timeObj) == false || billManager.check.dataCheckDo("memo", data.memo, $(boxId + ' input[name="list-memo"]')) == false) {
					return false
				} else {
					billManager.data.dataPost(id, data, type)
				}
			} else {
				var data = {};
				data.account = Ysl.select("list-account-all-" + strBoxId).val();
				var moneyObj = $(boxId + ' input[name="list-money"]');
				data.price = moneyObj.val();
				if (data.price == null || data.price == "") {
					data.price = 0
				}
				var timeObj = $(boxId + ' input[name="list-datepicker"]');
				data.time = timeObj.val();
				data.memo = $(boxId + ' input[name="list-memo"]').val();
				data.url = $("#img-name-" + id).val();
				data.memo = $.trim(data.memo) == "点击填写备注" ? "" : data.memo;
				if (billManager.check.dataCheckDo("date", data.time, timeObj) == false || billManager.check.dataCheckDo("memo", data.memo, $(boxId + ' input[name="list-memo"]')) == false) {
					return false
				} else {
					billManager.data.dataPost(id, data, type)
				}
			}
		}
	},
	resetYearData : function (type, action, currency, data) {
		if ((currency.oldCurr != "" && currency.oldCurr != $param.defaultCurrency) || (currency.newCurr != "" && currency.newCurr != $param.defaultCurrency)) {
			if (data.newYear == data.oldYear) {
				tTime.year.updateYearData(data.newYear)
			} else {
				if (data.newYear != null) {
					tTime.year.updateYearData(data.newYear)
				}
				if (data.oldYear != null) {
					tTime.year.updateYearData(data.oldYear)
				}
			}
			return
		}
		if (type != 1 && type != 5) {
			return
		}
		type = (type == 1) ? "payout" : "income";
		if (action == "del") {
			tTime.month.setData(0 - data.oldMoney, type, data.oldYear, data.oldMonth)
		} else {
			if (action == "add") {
				tTime.month.setData(data.newMoney, type, data.newYear, data.newMonth)
			} else {
				if (action == "save") {
					if (data.oldMonth == data.newMonth && data.oldYear == data.newYear) {
						tTime.month.setData(data.newMoney - data.oldMoney, type, data.oldYear, data.oldMonth)
					} else {
						tTime.month.setData(data.newMoney, type, data.newYear, data.newMonth);
						tTime.month.setData(0 - data.oldMoney, type, data.oldYear, data.oldMonth)
					}
				}
			}
		}
	}
};
var imgPanel = {
	loadPanel : function (id) {
		Ysl.ll.loadHtml("image_model_lazy");
		$("#imgIndexId").val(id);
		$("#imagefile").val("");
		$("#imageform").attr("action", "new.do?opt=upload&transId=" + id + "&old=" + $("#img-name-" + id).val());
		$("#image_model").showDialog()
	},
	open : function (id) {
		if ($("#img-name-" + id).val() == "") {
			$("#img-panel-" + id + " .img-del").hide();
			$("#img-panel-" + id + " .img-upload").addClass("img-upload-center")
		} else {
			$("#img-panel-" + id + " .img-del").show();
			$("#img-panel-" + id + " .img-upload").removeClass("img-upload-center")
		}
		$("#img-panel-" + id).show()
	},
	close : function (id) {
		$("#img-panel-" + id).hide()
	},
	imgDel : function (id) {
		var $obj = $("#img-name-" + id);
		var transId = (id == "add") ? -1 : id;
		if ($obj.val() != "") {
			$.rmi("new", {
				opt : "delImg",
				transId : transId,
				url : $obj.val()
			}, function (data) {
				if (data.result == "ok") {
					$obj.val("");
					var picUrl = (id == "add") ? "../images/tally/default.jpg" : "../images/tally/default_1.jpg";
					$("#img-show-" + id).attr("src", picUrl).removeClass("img-show-big").unbind("click");
					$("#img-panel-" + id + " .img-del").hide();
					$("#img-panel-" + id + " .img-upload").addClass("img-upload-center");
					if (tFilter.sortByDate && $("#list-tit-" + id + " .img-icon").length > 0) {
						$("#list-tit-" + id + " .img-icon").remove()
					}
				} else {
					listMsgShow($("#img-show-" + id), "对不起，删除失败~~(>_<)~~")
				}
			})
		}
	}
};
function uploadCallback(result, filename) {
	if (result == 0) {
		var imgPath = filename;
		if ($param.useHttps && imgPath.substring(0, 7) == "http://") {
			imgPath = imgPath.replace("http://", "https://")
		}
		var imgIndexId = $("#imgIndexId").val();
		$("#img-show-" + imgIndexId).attr("src", imgPath).addClass("img-show-big");
		bigImgAct($("#img-show-" + imgIndexId));
		$("#img-name-" + imgIndexId).val(filename);
		if (imgIndexId != "add") {
			tList.box.data[imgIndexId][1].url = filename
		}
		$("#image_model").hideDialog();
		$("#imagefile").val("");
		if (tFilter.sortByDate && $("#list-tit-" + imgIndexId + " .img-icon").length < 1) {
			$("#list-tit-" + imgIndexId + " .ul1 li").append('<span class="img-icon"></span>')
		}
	} else {
		var resultStr = new Array("", "找不到您要上传的图片~~(>_<)~~", "图片大小不能超过300k", "仅能上传jpg、png或gif格式的图片^_^", "对不起，没有上传成功~~(>_<)~~");
		listMsgShow($("#imagefile"), resultStr[result])
	}
}
function bigImgAct($obj) {
	var imgWidth = 700;
	var imgHeight = 600;
	var imgMinWidth = 200;
	var imgMinHeight = 150;
	$obj.click(function () {
		var imgurl = $(this).attr("src");
		var img = new Image();
		var realW = 0,
		realH = 0;
		var urlVal = $("#" + $(this).attr("id").replace("show", "name")).val();
		img.onload = function () {
			var width = img.width;
			var height = img.height;
			if (width > imgWidth || height > imgHeight) {
				if (width / height > imgWidth / imgHeight) {
					realW = imgWidth;
					realH = height / width * realW
				} else {
					realH = imgHeight;
					realW = width / height * realH
				}
			} else {
				realW = width;
				realH = height
			}
			var marginT = 0;
			var marginL = 0;
			var boxW = realW;
			var boxH = realH;
			if (realW < imgMinWidth) {
				marginL = (imgMinWidth - realW) / 2;
				boxW = imgMinWidth
			}
			if (realH < imgMinHeight) {
				marginT = (imgMinHeight - realH) / 2;
				boxH = imgMinHeight
			}
			if (Ysl.ll.loadHtml("bigimg_model_lazy")) {
				if ($param.isVip != "true") {
					$("#bigimg-btn-2").attr("href", "javascript:;").click(function () {
						$("#bigimg_model").hideDialog();
						Ysl.ll.loadHtml("vip_tip_model_lazy");
						$("#novip_tip_head_model").showDialog()
					})
				}
			}
			$("#bigimg").attr("src", imgurl);
			$("#bigimg").css("width", realW + "px").css("height", realH + "px").css("marginTop", marginT + "px").css("marginLeft", marginL + "px");
			var mW = boxW + 24,
			mH = boxH + 24;
			$("#big-m-m").css("width", boxW + "px").css("height", boxH + "px");
			$("#bigimg_model").css("width", mW + "px").css("height", mH + "px");
			$("#bigimg_model").showDialog();
			$("#bigimg-info,#bigimg-info-bg").width(boxW);
			if (urlVal.match(/^(http:|https:)\.*/i)) {
				$("#bigimg-btn-1").attr("href", urlVal)
			} else {
				$("#bigimg-btn-1").attr("href", $param.urlPrex + "/fresh/picture.do?opt=down&img=" + urlVal)
			}
		};
		img.src = imgurl
	})
}
var fast = {
	pubDialogIsLoad : false,
	accDialogIsLoad : false,
	accNowType : 0,
	showAccountDialog : function () {
		fast.loadAccDialog();
		var cId = $("#fast-i-acc-type").val();
		$("#fast-acc-main .choose").parent().click();
		$("#acc-" + cId).click();
		$("#fast-i-acc-money").val(0);
		$("#fast_model_account").showDialog()
	},
	showDialog : function (name) {
		fast.loadPubDialog();
		$("#fast_model .hideObj").hide();
		$("#fast-" + name).add($("#fast-submit-" + name)).add($("#fast-tit-" + name)).show();
		$("#fast_model").showDialog();
		$("#fast-i-" + name).val("").focus()
	},
	showDialog2 : function (name, type, bid) {
		fast.loadPubDialog();
		$("#fast_model .hideObj").hide();
		$("#fast-" + name).add($("#fast-submit-" + name)).add($("#fast-tit-" + name)).show();
		$("#fast_model").showDialog();
		fast.chooseLevel(name, type);
		if (type == "2") {
			fast.setSelectedFromId(name, bid)
		}
		$("#fast-i-" + name).val("").focus()
	},
	setSelectedFromId : function (name, bid) {
		Ysl.w.remove("select", "fast-i-" + name + "-id");
		Ysl.select("fast-i-" + name + "-id").val(bid)
	},
	loadPubDialog : function () {
		if (fast.pubDialogIsLoad == false) {
			Ysl.ll.loadHtml("fast_model_lazy");
			addSubmitStyle($("#fast-i-store"), $("#fast-submit-store"), "hover", "active");
			addSubmitStyle($("#fast-i-project"), $("#fast-submit-project"), "hover", "active");
			addSubmitStyle($("#fast-i-payout"), $("#fast-submit-payout"), "hover", "active");
			addSubmitStyle($("#fast-i-income"), $("#fast-submit-income"), "hover", "active");
			fast.pubDialogIsLoad = true
		}
	},
	loadAccDialog : function () {
		if (fast.accDialogIsLoad == false) {
			var $main = $("#fast-acc-main span");
			var $word = $("#facc-m .fac-word");
			var $child = $("#facc-m .fac-word a");
			$main.click(function () {
				var id = $(this).attr("id").substring(4);
				fast.accNowType = id;
				$main.children().removeClass("choose");
				$(this).children().addClass("choose");
				(id == 1 || id == 15) ? $("#fast-acc-child").children().hide() : $("#fast-acc-child").children().show();
				$word.hide();
				$("#acc-" + id).show();
				$("#acc-" + id + " a").eq(0).click()
			});
			$child.click(function () {
				var id = $(this).attr("id").substring(4);
				$("#fast-i-acc-type").val(id);
				$("#fast-i-acc-name").val($(this).children("span").html()).focus();
				$child.removeClass("select");
				$(this).addClass("select")
			});
			$("#fast-i-acc-money").focus(function () {
				if ($(this).val() == 0) {
					$(this).val("")
				}
			});
			fast.accDialogIsLoad = true
		}
	},
	chooseLevel : function (type, level) {
		$("#fast-" + type + " .l").removeClass("select");
		$("#fast-" + type + "-" + level).addClass("select");
		$("#fast-level-" + type).val(level);
		(level == 2) ? $("#fast-" + type + "-up").show() : $("#fast-" + type + "-up").hide()
	}
};
fast.data = {
	fastSaveShop : function () {
		var storeObj = $("#fast-i-store");
		var shopName = $.trim(storeObj.val());
		var result = fast.check.checkNewName(shopName, "tb-store");
		if (result != "ok") {
			fast.check.showFastAddError(storeObj, result);
			return false
		}
		$.rmi("new", {
			opt : "addStore",
			name : shopName
		}, function (data) {
			if (data.result > 0) {
				fast.callBack.pub("store", data.result, shopName);
				tFilter.fastAdd.addChild("cSto", data.result, shopName)
			} else {
				listMsgShow(storeObj, "对不起，添加商家失败 ")
			}
		})
	},
	fastSaveProject : function () {
		var projectObj = $("#fast-i-project");
		var projectName = $.trim(projectObj.val());
		if (projectName.indexOf("多人-") == 0) {
			fast.check.showFastAddError(projectObj, "项目名称不能以'多人-'开头!");
			return
		}
		var result = fast.check.checkNewName(projectName, "tb-project");
		if (result != "ok") {
			fast.check.showFastAddError(projectObj, result);
			return false
		}
		$.rmi("new", {
			opt : "addProject",
			name : projectName
		}, function (data) {
			if (data.result > 0) {
				fast.callBack.pub("project", data.result, projectName);
				tFilter.fastAdd.addChild("cPro", data.result, projectName)
			} else {
				listMsgShow(projectObj, "对不起，添加项目失败 ")
			}
		})
	},
	fastSaveMember : function () {
		var memberObj = $("#fast-i-member");
		var memberName = $.trim(memberObj.val());
		var result = fast.check.checkNewName(memberName, "tb-member");
		if (result != "ok") {
			fast.check.showFastAddError(memberObj, result);
			return false
		}
		$.rmi("new", {
			opt : "addMember",
			name : memberName
		}, function (data) {
			if (data.result > 0) {
				fast.callBack.pub("member", data.result, memberName);
				tFilter.fastAdd.addChild("cMem", data.result, memberName)
			} else {
				listMsgShow(memberObj, "对不起，添加成员失败 ")
			}
		})
	},
	fastSaveType : function (typeAttribute) {
		var typeStr = typeAttribute == 1 ? "payout" : "income";
		var parentId = $("#fast-i-" + typeStr + "-id").val();
		var $nameObj = $("#fast-i-" + typeStr);
		var name = $nameObj.val();
		var $obj = typeAttribute == 1 ? "list-payout-0-" : "list-income-0-";
		var result = fast.check.checkCategroyNewName(name, $obj);
		var levelNum = $("#fast-level-" + typeStr).val();
		if (result != "ok") {
			fast.check.showFastAddError($nameObj, result);
			return false
		}
		$.rmi("new", {
			opt : "addCategory",
			level : levelNum,
			parent : parentId,
			type : typeAttribute,
			name : name
		}, function (data) {
			if (data.result == "categoryRepeat") {
				fast.check.showFastAddError($nameObj, "categoryRepeat")
			} else {
				if (data.result > 0) {
					fast.callBack.category(typeStr, levelNum, data.result, name, parentId);
					if (levelNum == 1) {
						tFilter.fastAdd.addLevel1((typeAttribute == 1 ? "out" : "in"), data.result, name)
					} else {
						tFilter.fastAdd.addLevel2((typeAttribute == 1 ? "out" : "in"), data.result, name, parentId)
					}
				} else {
					listMsgShow($nameObj, "对不起，添加分类失败")
				}
			}
		})
	}
};
function fastSaveAccount() {
	var name = $("#fast-i-acc-name").val();
	var money = $("#fast-i-acc-money").val();
	var memo = $("#fast-i-acc-memo").val();
	var type = $("#fast-i-acc-type").val();
	var currency = $("#fast-i-acc-currency").val();
	var result = fast.check.checkNewName(name, "base-account-nocurrency");
	if (result != "ok") {
		fast.check.showFastAddError($("#fast-i-acc-name"), result);
		return false
	}
	$.rmi("new", {
		opt : "addAccount",
		group : type,
		name : name,
		money : money,
		memo : memo,
		currency : currency
	}, function (data) {
		if (data.result > 0) {
			fast.callBack.account(type, data.result, name, currency);
			tFilter.fastAdd.addAccChild(fast.accNowType, data.result, name)
		} else {
			listMsgShow($("#fast-i-acc-name"), "对不起，添加账户失败", false)
		}
	})
}
fast.check = {
	checkNewName : function (name, selectId) {
		if (name == "") {
			return "empty"
		} else {
			if (strlen(name) > 50) {
				return "long"
			} else {
				var repeat = "ok";
				if (Ysl.select(selectId).hasText(name)) {
					repeat = "repeat"
				}
				return repeat
			}
		}
	},
	checkCategroyNewName : function (name) {
		if (name == "") {
			return "empty"
		} else {
			if (strlen(name) > 50) {
				return "long"
			} else {
				return "ok"
			}
		}
	},
	showFastAddError : function ($obj, result) {
		if (result == "empty") {
			listMsgShow($obj, "对不起，名称不能为空 ")
		} else {
			if (result == "long") {
				listMsgShow($obj, "对不起，名称不能超过50个字符 ")
			} else {
				if (result == "repeat") {
					listMsgShow($obj, "对不起，您设置的名称已存在 ")
				} else {
					if (result == "categoryRepeat") {
						listMsgShow($obj, "支出或者收入分类中已存在同名分类 ")
					} else {
						listMsgShow($obj, result)
					}
				}
			}
		}
	}
};
fast.callBack = {
	selects : {
		loanaccount : ["tb-outAccount-2", "tb-inAccount-2", "tb-inAccount-6", "tb-outAccount-7", "list-account-all-0-", "list-account-all-2-0-"],
		creditaccount : ["tb-outAccount-2", "tb-inAccount-2", "tb-outAccount-3", "tb-inAccount-4", "list-account-all-0-", "list-account-all-2-0-", "tb-outAccount-6"],
		cardaccount : ["tb-outAccount-1", "list-account-payout-0-", "fe-outAccount"],
		account : ["tb-outAccount-1", "tb-outAccount-2", "tb-inAccount-2", "tb-inAccount-3", "tb-outAccount-4", "tb-inAccount-5", "tb-outAccount-6", "tb-inAccount-7", "list-account-income-0-", "list-account-payout-0-", "list-account-all-0-", "list-account-all-2-0-", "fe-outAccount"],
		project : ["tb-project", "list-project-0-", "fe-project"],
		member : ["tb-member", "list-member-0-", "fe-member"],
		store : ["tb-store", "list-store-0-", "fe-store"],
		payout : ["tb-category-1", "list-payout-0-"],
		income : ["tb-category-5", "list-income-0-"]
	},
	pub : function (type, id, name) {
		var s = fast.callBack.selects[type];
		if (s) {
			for (var i = 0; i < s.length; i++) {
				Ysl.select(s[i]).add(name, id, true);
				Ysl.Global.remove("select_" + s[i])
			}
		}
		$("#fast_model").hideDialog();
		tList.cache.setBoxInputCache()
	},
	category : function (type, level, id, name, parentId) {
		var s = fast.callBack.selects[type];
		if (level == 1) {
			if (s) {
				for (var i = 0; i < s.length; i++) {
					Ysl.select(s[i]).insertGroup(-1, name, id)
				}
			}
			Ysl.select("fast-i-" + type + "-id").add(name, id, true, false);
			levelSelect.addLevel1(type, id, name);
			levelSelect.addLevel1(type + "1", id, name)
		} else {
			if (s) {
				for (var i = 0; i < s.length; i++) {
					Ysl.select(s[i]).add(name, id, true, parentId)
				}
				levelSelect.addLevel2(type, id, name, parentId);
				levelSelect.addLevel2(type + "1", id, name, parentId)
			}
		}
		$("#fast_model").hideDialog();
		tList.cache.setBoxInputCache()
	},
	account : function (type, id, name, currency) {
		var nameStr = ($param.defaultCurrency == currency) ? name : name + "(" + currency + ")";
		if (fast.accNowType == 15) {
			fast.callBack.pub("loanaccount", id, nameStr)
		} else {
			if (fast.accNowType == 4) {
				fast.callBack.pub("creditaccount", id, nameStr);
				if (type == 16) {
					fast.callBack.pub("cardaccount", id, nameStr)
				}
			} else {
				fast.callBack.pub("account", id, nameStr)
			}
		}
		$param.accountJson[id] = currency;
		Ysl.select("base-account-nocurrency").add(name, id, true, false);
		checkAccount();
		$("#fast-i-acc-name,#fast-i-acc-money,#fast-i-acc-memo").val("");
		$("#fast_model_account").hideDialog();
		tList.cache.setBoxInputCache()
	}
};
window.$split = {
	baseId : -1,
	totalMoney : 0,
	canUse : 0,
	splitID : 0,
	showMsg : true,
	editId : -1
};
function splitActionInit() {
	$("#split-addbtn").click(function (event) {
		event.stopPropagation();
		if (saveSplitEdit() != false) {
			splitAdd()
		}
	});
	$(document).click(function () {
		if ($split.editId != -1) {
			saveSplitEdit()
		}
	});
	$("#typeselect-box,#fast-submit-split").click(function (event) {
		event.stopPropagation()
	})
}
function splitInit() {
	$split.baseId = -1;
	$split.totalMoney = 0;
	$split.splitID = 0;
	$split.showMsg = true;
	$split.editId = -1;
	$("#split-money").removeClass("red");
	$("#split-list,#split-err-msg").html("")
}
function split(id, money) {
	if (Ysl.ll.loadHtml("split_model_lazy")) {
		splitActionInit()
	}
	$("#split_model").showDialog();
	splitInit();
	$split.baseId = id;
	$split.totalMoney = money;
	$split.canUse = money;
	$("#total-money").html($split.totalMoney);
	$("#split-money").html($split.totalMoney)
}
function splitAdd() {
	var htmlStr = '<ul class="sl-ul edit-line" id="split-list-' + $split.splitID + '">' + $("#split-html").html() + "</ul>";
	$("#split-list").append(htmlStr);
	$split.editId = $("#split-list .sl-ul").length - 1;
	$("#split-list .sl-ul .s-2").eq($split.editId).html("");
	$("#typeselect-box").prependTo($("#split-list .sl-ul .s-2").eq($split.editId)).show();
	setSplitId();
	$("#split-list .sl-ul .split-id").eq($split.editId).val($split.splitID);
	$split.splitID++;
	$("#split_model .sl-ul").removeClass("double");
	$("#split_model .sl-ul:odd").addClass("double");
	splitEvent();
	$("#split-err-msg").html("")
}
function splitEvent() {
	$("#split-list .split-money").unbind().bind("click", function (event) {
		event.stopPropagation()
	});
	$("#split-list .split-del").unbind().bind("click", function (event) {
		event.stopPropagation();
		var indexId = $("#split-list .split-del").index(this);
		splitDelAction(indexId)
	});
	$("#split-list .split-edit").unbind().bind("click", function (event) {
		event.stopPropagation();
		var indexId = $("#split-list .split-edit").index(this);
		if ($split.editId != indexId) {
			splitEditAction(indexId)
		}
	})
}
function saveSplitEdit() {
	if ($split.editId == -1) {
		return null
	}
	var totalUse = splitUseMoney();
	if (totalUse > $split.totalMoney) {
		if ($split.showMsg == true) {
			$("#split-err-msg").html("您分拆的金额总和已经超过总金额~~(>_<)~~");
			return false
		}
	}
	var selectId = $("#split-type").val();
	var selectStr = $("#split-type").getSelect();
	var id = $("#split-list .sl-ul .split-id").eq($split.editId).val();
	var thisMoney = parseFloat($("#split-list-" + id + " .split-money").val());
	$("#split-list-" + id + " .split-typeid").val(selectId);
	$("#typeselect-box").prependTo($("#split-html .s-2")).hide();
	$("#split-list-" + id + " .s-2").html(cnSubstr(selectStr, 10));
	$("#split-list-" + id).removeClass("edit-line");
	$("#split-list-" + id + " .split-money").hide();
	if (isNaN(thisMoney)) {
		thisMoney = 0;
		$("#split-list-" + id + " .split-money").val(thisMoney)
	}
	thisMoney = thisMoney.toFixed(2);
	$("#split-list-" + id + " .split-money-span").html(thisMoney).show();
	$split.canUse = ($split.totalMoney - totalUse).toFixed(2);
	$("#split-money").html($split.canUse);
	$split.editId = -1;
	return true
}
function splitDelAction(indexId) {
	if ($split.editId == indexId) {
		$("#typeselect-box").prependTo($("#split-html .s-2")).hide();
		$split.editId = -1
	} else {
		if ($split.editId != -1 && $split.editId > indexId) {
			$split.editId--
		}
	}
	var id = $("#split-list .sl-ul .split-id").eq(indexId).val();
	$("#split-list-" + id).remove();
	$(".sl-ul").removeClass("double");
	$(".sl-ul:odd").addClass("double");
	var totalUse = splitUseMoney();
	$split.canUse = ($split.totalMoney - totalUse).toFixed(2);
	$("#split-money").html($split.canUse);
	setSplitId()
}
function splitEditAction(indexId) {
	saveSplitEdit();
	$("#split-err-msg").html("");
	$split.editId = indexId;
	$("#split-list .sl-ul").eq($split.editId).addClass("edit-line");
	$("#split-list .sl-ul .s-2").eq(indexId).html("");
	$("#typeselect-box").prependTo($("#split-list .sl-ul .s-2").eq(indexId)).show();
	Ysl.select("split-type").val($("#split-list .split-typeid").eq($split.editId).val());
	$("#split-list .split-money-span").eq($split.editId).hide();
	$("#split-list .split-money").eq($split.editId).show()
}
function splitUseMoney() {
	var length = $("#split-list .sl-ul").length;
	var totalUse = 0,
	thisUse;
	for (var i = 0; i < length; i++) {
		thisUse = parseFloat($("#split-list .split-money").eq(i).val());
		thisUse = isNaN(thisUse) ? 0 : thisUse;
		totalUse = totalUse + thisUse
	}
	totalUse = totalUse.toFixed(2);
	return totalUse
}
function setSplitId() {
	var length = $("#split-list .sl-ul").length;
	for (var i = 0; i < length; i++) {
		$("#split-list .sl-ul .s-1").eq(i).html(i + 1)
	}
}
function saveSplitList() {
	if (saveSplitEdit() == false) {
		return null
	}
	var totalUse = splitUseMoney();
	if (totalUse > $split.totalMoney) {
		return null
	} else {
		if (totalUse < $split.totalMoney) {
			$("#split-err-msg").html("可分拆总额还没有用完，当前可分拆余额：<b>" + $split.canUse + "</b>");
			return null
		}
	}
	var baseId = $split.baseId;
	var queryString = "opt=split&id=" + baseId;
	var length = $("#split-list .sl-ul").length;
	var money = 0,
	type = -1,
	str = "";
	for (var i = 0; i < length; i++) {
		money = $("#split-list .sl-ul .split-money").eq(i).val();
		type = $("#split-list .sl-ul .split-typeid").eq(i).val();
		queryString += "&type=" + type;
		queryString += "&money=" + money
	}
	$.rmi("new", queryString, function (data) {
		if (data.result == "ok") {
			$("#split_model").hideDialog();
			tData.load(true, false)
		} else {
			$("#split-err-msg").html("对不起，拆分失败")
		}
	})
}
var levelSelect = {
	init : function () {
		$(".levelSelect").each(function () {
			var text = $(this).find(".ls-input-init-text").eq(0).val();
			var val = $(this).find(".ls-input-init-val").eq(0).val();
			$(this).children(".ls-input").eq(0).val(text);
			$(this).children(".ls-input-val").eq(0).val(val)
		});
		$(".levelSelect span").each(function () {
			$(this).html(cnSubstr($(this).html(), 10))
		});
		$(".ls-li").bind("mouseenter", function () {
			$(this).children(".ls2-hasChild").show();
			$(this).addClass("mouseover")
		}).bind("mouseleave", function () {
			$(this).children(".ls2").hide();
			$(this).removeClass("mouseover")
		})
	},
	show : function (id) {
		$(".levelSelect .ls2").hide();
		$("#levelSelect-" + id + " .ls1").show()
	},
	hide : function () {
		$(".levelSelect .ls2").hide();
		$(".levelSelect .ls1").hide()
	},
	select : function (id, val) {
		$("#ls-li-" + id + "-" + val).click()
	},
	choose : function (id, text, val) {
		$("#levelSelect-" + id + " .ls-input").val(text);
		$("#levelSelect-" + id + " .ls-input-val").val(val);
		$(".levelSelect .ls2").hide();
		$(".levelSelect .ls1").hide();
		if (id == "payout1" || id == "income1") {
			$("#fe-category").val(text);
			$("#fe-category-val").val(val);
			$("#fe-category-type").val(id);
			tList.setAll.hidePanel()
		}
	},
	addLevel1 : function (boxId, id, name) {
		var html = '<li id="ls-li-' + boxId + "-" + id + '" class="ls-li"><span title="' + name + '">' + cnSubstr(name, 10) + '</span><div class="ls ls2 ls2-hasChild" style="display:none;"><div class="ls-tit png"><div class="ls-tit-out png"><div class="ls-tit-in png"></div></div></div><div class="ls-box png"><ul id="ls-ul2-' + boxId + "-" + id + '" class="ls-ul png"></ul></div><div class="ls-bot png"><div class="ls-bot-out png"><div class="ls-bot-in png"/></div></div></div></div></li>';
		$("#ls-ul1-" + boxId).prepend(html);
		html = '<li class="ls-li ls-li2" onclick="javascript:fast.showDialog2(\'' + boxId + "', '2','" + id + '\');"><span title="新建二级分类" class="color">新建二级分类</span></li>';
		$("#ls-ul2-" + boxId + "-" + id).prepend(html);
		$("#ls-li-" + boxId + "-" + id).bind("mouseenter", function () {
			$(this).children(".ls2-hasChild").show();
			$(this).addClass("mouseover")
		}).bind("mouseleave", function () {
			$(this).children(".ls2").hide();
			$(this).removeClass("mouseover")
		}).click(function (event) {
			event.stopPropagation()
		})
	},
	addLevel2 : function (boxId, id, name, parentId) {
		var html = '<li id="ls-li2-' + id + '" class="ls-li ls-li2" onclick="levelSelect.choose(\'' + boxId + "', '" + name + "', " + id + ');"><span title="' + name + '">' + cnSubstr(name, 10) + "</span></li>";
		$("#ls-ul2-" + boxId + "-" + parentId).prepend(html);
		$("#ls-li-" + boxId + "-" + parentId + " .ls2").addClass("ls2-hasChild");
		$("#ls-li-" + boxId + "-" + parentId).removeClass("nochild");
		$("#levelSelect-" + boxId + " .ls-input").val(name);
		$("#levelSelect-" + boxId + " .ls-input-val").val(id);
		$("#ls-li2-" + id).bind("mouseenter", function () {
			$(this).addClass("mouseover")
		}).bind("mouseleave", function () {
			$(this).removeClass("mouseover")
		})
	}
};
var tTemplate = {
	set : function (id) {
		tList.setAll.hidePanel();
		var tt = $param.templateJson[id];
		if (tt == null) {
			return
		}
		Ysl.select("tb-project").val(tt.tag + "");
		Ysl.select("tb-member").val(tt.member + "");
		if (tt.memo != "") {
			$("#tb-memo").removeClass("default-memo").val(tt.memo)
		} else {
			$("#tb-memo").addClass("default-memo").val("点击填写备注")
		}
		if (tt.type == 0) {
			Ysl.select("tb-store").val(tt.relationUnit + "");
			$("#tb-outMoney-1").val(parseFloat(tt.buyerMoney).toFixed(2));
			Ysl.select("tb-outAccount-1").val(tt.buyerAccount + "");
			levelSelect.select("payout", tt.sellerCategory)
		} else {
			if (tt.type == 1) {
				$("#tb-inMoney-5").val(parseFloat(tt.sellerMoney).toFixed(2));
				Ysl.select("tb-inAccount-5").val(tt.sellerAccount + "");
				levelSelect.select("income", tt.buyerCategory)
			} else {
				if (tt.type == 3) {
					Ysl.select("tb-store").val(tt.relationUnit + "");
					Ysl.select("tb-inAccount-2", 0, checkAccount).val(tt.sellerAccount + "");
					Ysl.select("tb-outAccount-2", 0, checkAccount).val(tt.buyerAccount + "");
					$("#tb-outMoney-2").val(parseFloat(tt.buyerMoney).toFixed(2));
					$("#tb-inMoney-2").val(parseFloat(tt.sellerMoney).toFixed(2));
					checkAccount()
				}
			}
		}
	}
};
var tList = {
	init : function () {
		tList.cache.setBoxInputCache()
	},
	labelArray : new Array("", new Array("分类：", "账户：", "金额：", "成员：", "时间：", "项目：", "商家：", "备注："), new Array("转出：", "转入：", "金额：", "转入额：", "时间：", "项目：", "商家：", "备注："), "", "", new Array("分类：", "存入：", "金额：", "成员：", "时间：", "项目：", "商家：", "备注："), "", "", "", new Array("账户：", "金额：", "时间：", "", "备注：", "", "", ""), new Array("账户：", "金额：", "时间：", "", "备注：", "", "", ""), new Array("账户：", "金额：", "时间：", "", "备注：", "", "", ""), new Array("转出：", "转入：", "时间：", "", "转出额：", "转入额：", "项目：", "备注：")),
	inputArray : new Array("", new Array("payout", "account-payout", "money", "member", "date", "project", "store", "memo"), new Array("account-all", "account-all-2", "money", "money-2", "date", "project", "store", "memo"), "", "", new Array("income", "account-income", "money", "member", "date", "project", "store", "memo"), "", "", "", new Array("account-all", "money", "date", "", "memo", "", "", ""), new Array("account-all", "money", "date", "", "memo", "", "", ""), new Array("account-all", "money", "date", "", "memo", "", "", ""), new Array("account-all", "account-all-2", "date", "", "money", "money-2", "project", "memo")),
	getListTag : function (typeNum, position) {
		if (this.inputArray[typeNum][position] == "") {
			return ""
		} else {
			if (this.inputArray[typeNum][position] == "memo") {
				return '<li class="lb-li">' + $("#base-" + this.inputArray[typeNum][position]).html() + "</li>"
			} else {
				return '<li class="lb-li"><label class="list-label-' + position + '">' + this.labelArray[typeNum][position] + "</label>" + $("#base-" + this.inputArray[typeNum][position]).html() + "</li>"
			}
		}
	}
};
tList.icon = {
	get : function (iconName) {
		return (typeof(mIcons[iconName]) == "undefined") ? "" : "background-position:-" + mIcons[iconName] * 16 + "px 0px;"
	}
}, tList.cache = {
	date : '<div class="list-date"><ul class="ul1"><li><span class="day">{0}</span>/<span>{1}</span></li></ul><ul class="ul2"><li class="lt-l"></li><li class="lt-income">收入：<span class="orange">+{3}</span></li><li class="lt-payout">支出：<span class="green">-{2}</span></li></ul></div>',
	title : '<div id="list-tit-{0}" class="list-tit" onclick="tList.box.showBox({0});"><ul class="ul1"><li><input id="lEdit-{0}" class="hidden lEdit lEdit{5}" type="checkbox" value="{0}"/><a id="lEdit-{0}-a" class="cBox {14} lEdit lEdit{5} hidden"  onclick="tFilter.cbox.click(\'lEdit-{0}\',\'lEdit\',\'\');"></a>{1}</li></ul><ul class="ul2"><li class="bt-1" title="{3}"><span class="icon icon-{5}" style="{2}"></span><span class="catename">{4}</span><span class="typename typename{5}">{15}</span></li><li class="bt-2">{7}</li><li class="bt-3" title="{8}">{9}</li><li class="bt-4" title="{10}">{11}</li><li class="bt-5" title="{16}">{17}</li><li class="bt-6" title="{12}">{13}</li><li class="bt-7"></li></ul></div>',
	box : '<div id="list-box-{0}" class="list-box {1}"><div class="lstLoad">loading...</div></div>',
	boxBase : '<div class="list-box-in"><div class="lb-image"><div class="lb-imgbox img-box" onMouseOver="javascript:imgPanel.open({0});" onMouseOut="javascript:imgPanel.close({0});"><img class="img-show {8}" id="img-show-{0}" width="130" height="94" src="{2}"/><div class="img-panel" id="img-panel-{0}"><input type="hidden" name="img-name" value="{3}" class="img-name" id="img-name-{0}" /><span class="img-upload png" onclick="javascript:imgPanel.loadPanel({0});">上传</span><span class="img-del png" onclick="javascript:imgPanel.imgDel({0});">删除</span></div></div></div>{4}<div class="lb-btn"><ul>{5}<li>{6}</li><li>{7}</li></ul></div></div>',
	boxInput : new Array(),
	setBoxInputCache : function () {
		var html = new Array();
		var htmlStr = "";
		var showType = [false, true, true, false, false, true, false, false, false, true, true, true, true];
		for (var type = 1; type <= 12; type++) {
			if (showType[type]) {
				htmlStr = '<div class="lb-main"><ul class="lb-ul">' + tList.getListTag(type, 0) + tList.getListTag(type, 1) + tList.getListTag(type, 2) + tList.getListTag(type, 3) + '</ul><ul class="lb-ul">' + tList.getListTag(type, 4) + tList.getListTag(type, 5) + tList.getListTag(type, 6) + "</ul>";
				htmlStr = htmlStr + '<ul class="lb-ul"><li class="lb-li">' + tList.getListTag(type, 7) + "</li></ul></div>";
				html.push(htmlStr)
			} else {
				html.push("")
			}
		}
		this.boxInput = html
	}
};
tList.html = {
	listInit : function () {
		$("#list .list-tit").removeClass("double");
		$("#list .list-tit:odd").addClass("double");
		addMouseStyle($("#list div.list-tit"), "list-hover", "list-active");
		$("#list .cBox").click(function (event) {
			event.stopPropagation()
		})
	},
	setList : function (data, page) {
		tTitle.setDefaultData(data.payout.toFixed(2), data.income.toFixed(2));
		var groupLen = data.groups.length;
		if (data == "" || groupLen <= 0) {
			$("#list-nodata").show();
			$("#list").html("").hide();
			return null
		} else {
			$("#list-nodata").hide();
			$("#list").show()
		}
		var html = new Array();
		var childLen = 0;
		if (!tFilter.sortByDate) {
			html.push('<div class="list-line"></div>')
		}
		for (var i = 0; i < groupLen; i++) {
			if (tFilter.sortByDate) {
				html.push(tList.cache.date.format(numToStr(data.groups[i].list[0].date.date), numToStr(data.groups[i].list[0].date.month + 1), formatMoney(data.groups[i].payout, 2), formatMoney(data.groups[i].income, 2)));
				html.push('<div class="list-line"></div>')
			}
			childLen = data.groups[i].list.length;
			for (var j = 0; j < childLen; j++) {
				tList.box.data[data.groups[i].list[j].tranId] = [0, data.groups[i].list[j]];
				html.push(this.getOneListHtml(data.groups[i].list[j]))
			}
		}
		html.push('<div class="list-shadow"></div>');
		$("#list").html(html.join(""));
		$("#list .list-date").prev().prev().addClass("list-tit-last");
		$("#list .list-tit").last().addClass("list-tit-last");
		$("#list .list-date").first().addClass("list-date-nobg");
		$("#list .list-date").prev().addClass("list-box-nobg");
		$("#list .list-box").last().addClass("list-box-nobg");
		this.listInit()
	},
	getOneListHtml : function (tran) {
		var dateStr = "";
		if (tFilter.sortByDate) {
			if (tran.url != "") {
				dateStr = '<span class="img-icon"></span>'
			}
		} else {
			dateStr = '<span class="day">' + (numToStr(tran.date.date) + '<span class="month">/' + numToStr(tran.date.month + 1) + "</span></span>")
		}
		var cBoxStyle = (tFilter.sortByDate) ? "cBox1" : "cBox2";
		var buyer = tran.buyerAcount;
		var seller = tran.sellerAcount;
		var type = tran.tranType;
		seller = (type == 1 || type == 2 || type == 5 || type == 8) ? seller : "";
		var typename = "";
		var catename = tran.categoryName;
		if (tran.tranType == 1) {
			typename = "(支)"
		} else {
			if (tran.tranType == 5) {
				typename = "(收)"
			} else {
				catename = tran.tranName
			}
		}
		var tit = tList.cache.title.format(tran.tranId, dateStr, tList.icon.get(tran.categoryIcon), catename, cnSubstr(catename, 10), tran.tranType, tran.tranName, formatMoney(tran.itemAmount.toFixed(2), 2), buyer, cnSubstr(buyer, 14), seller, cnSubstr(seller, 16), tran.memo, cnSubstr(tran.memo, 18), cBoxStyle, typename, tran.projectName, cnSubstr(tran.projectName, 10));
		var boxClass = null;
		if (tran.tranType == 1 || tran.tranType == 5 || (tran.tranType == 2 && $param.accountJson[tran.buyerAcountId] != $param.accountJson[tran.sellerAcountId])) {
			boxClass = "list-box-payout"
		} else {
			if (tran.tranType == 2) {
				boxClass = "list-box-transfer"
			} else {
				boxClass = "list-box-normal"
			}
		}
		return tit + tList.cache.box.format(tran.tranId, boxClass)
	}
};
tList.box = {
	data : new Object(),
	currentOpen : -1,
	openAll : false,
	showBox : function (id) {
		var $obj = $("#list-tit-" + id);
		var $boxObj = $("#list-box-" + id);
		if ($obj.hasClass("list-show")) {
			$boxObj.slideUp(150);
			$obj.removeClass("list-show");
			this.currentOpen = -1
		} else {
			if (this.openAll == false && this.currentOpen != -1) {
				$("#list-box-" + this.currentOpen).slideUp(150);
				$("#list-tit-" + this.currentOpen).removeClass("list-show")
			}
			$boxObj.slideDown(200, function () {
				tList.box.loadBox(id)
			});
			$obj.addClass("list-show");
			this.currentOpen = id
		}
	},
	shrinkList : function () {
		tFilter.panel.hide();
		if (this.openAll == true) {
			this.openAll = false;
			$("#openall .icon").removeClass("up");
			$("#openall .text").html("展开全部");
			($.browser.msie && $.browser.version == "6.0") ? $("#list div.list-box").hide() : $("#list div.list-box").slideUp(100);
			$("#list div.list-tit").removeClass("list-show")
		} else {
			this.openAll = true;
			$("#openall .icon").addClass("up");
			$("#openall .text").html("收缩全部");
			$("#list div.list-tit").removeClass("list-show");
			($.browser.msie && $.browser.version == "6.0") ? $("#list div.list-box").show() : "";
			window.setTimeout(function () {
				$("#list div.list-box").each(function () {
					var oId = this.id;
					var index = oId.lastIndexOf("-");
					var id = oId.substr(index + 1);
					tList.box.showBox(id)
				})
			}, 100)
		}
	},
	loadBox : function (tranId) {
		if (this.data[tranId][0] == 1) {
			return
		}
		var tran = this.data[tranId][1];
		var imgUrl = (tran.url == "") ? ($param.res + "/images/tally-new/default.gif") : (tran.url.match(/^(http:|https:)\.*/i) ? tran.url : ($param.resourceUrl + "/" + tran.url));
		if ($param.useHttps && imgUrl.substring(0, 7) == "http://") {
			imgUrl = imgUrl.replace("http://", "https://")
		}
		var split = (tran.tranType == 1) ? ('<li><a class="split-btn" onclick="javascript:split(' + tran.tranId + "," + tran.itemAmount + ');">分拆</a></li>') : "";
		var del = '<a class="del-btn" onclick="javascript:billManager.data.del(' + tran.tranId + "," + tran.tranType + ');">删除</a>';
		var save = '<a onclick="javascript:billManager.data.save(' + tran.tranId + "," + tran.tranType + ')">保存</a>';
		var showBigImg = (tran.url == "") ? "" : "img-show-big";
		var strTranId = tranId + "-";
		var boxtype = tran.tranType;
		if (imgUrl.indexOf(".") < 0) {
			imgUrl = imgUrl + ".jpeg"
		}
		var box = tList.cache.boxBase.format(tran.tranId, "", imgUrl, tran.url, tList.cache.boxInput[boxtype - 1].replace(new RegExp("-0-", "g"), "-" + strTranId), split, save, del, showBigImg);
		var id = "#list-box-" + tranId;
		$(id).html(box);
		if (tran.memo != "") {
			$(id + ' input[name="list-memo"]').val(tran.memo).attr("title", tran.memo)
		} else {
			$(id + ' input[name="list-memo"]').val("点击填写备注").addClass("default-memo")
		}
		$(id + ' input[name="list-datepicker"]').val(getDateStr(tran.date));
		$(id + ' input[name="list-money"]').val(tran.itemAmount);
		if (tran.tranType < 9) {
			Ysl.w.remove("select", "list-project-" + strTranId);
			Ysl.select("list-project-" + strTranId).val(tran.projectId);
			Ysl.w.remove("select", "list-member-" + strTranId);
			Ysl.select("list-member-" + strTranId).val(tran.memberId)
		}
		if (tran.tranType == 1) {
			Ysl.w.remove("select", "list-payout-" + strTranId);
			Ysl.select("list-payout-" + strTranId).val(tran.categoryId);
			Ysl.w.remove("select", "list-store-" + strTranId);
			Ysl.select("list-store-" + strTranId).val(tran.sellerAcountId);
			Ysl.w.remove("select", "list-account-payout-" + strTranId);
			Ysl.select("list-account-payout-" + strTranId).val(tran.buyerAcountId)
		} else {
			if (tran.tranType == 5) {
				Ysl.w.remove("select", "list-income-" + strTranId);
				Ysl.select("list-income-" + strTranId).val(tran.categoryId);
				Ysl.w.remove("select", "list-store-" + strTranId);
				Ysl.select("list-store-" + strTranId).val(tran.sellerAcountId);
				Ysl.w.remove("select", "list-account-income-" + strTranId);
				Ysl.select("list-account-income-" + strTranId).val(tran.buyerAcountId)
			} else {
				if (tran.tranType == 2) {
					Ysl.w.remove("select", "list-store-" + strTranId);
					Ysl.select("list-store-" + strTranId).val(tran.transferStoreId);
					Ysl.w.remove("select", "list-account-all-" + strTranId);
					Ysl.select("list-account-all-" + strTranId, 0, editCheckAccount1).val(tran.buyerAcountId);
					Ysl.w.remove("select", "list-account-all-2-" + strTranId);
					Ysl.select("list-account-all-2-" + strTranId, 0, editCheckAccount2).val(tran.sellerAcountId);
					if ($param.accountJson[tran.buyerAcountId] != $param.accountJson[tran.sellerAcountId]) {
						$(id + ' input[name="list-money-2"]').val(tran.currencyAmount)
					}
				} else {
					tran.buyerAcountId = tran.sellerAcountId;
					Ysl.w.remove("select", "list-account-all-" + strTranId);
					Ysl.select("list-account-all-" + strTranId).val(tran.buyerAcountId)
				}
			}
		}
		addMouseStyle($(id + " input").add($(id + " a")), "hover", "active");
		setDatepicker($(id + " .list-datepicker"));
		if (tran.url != "") {
			bigImgAct($("#img-show-" + tranId))
		}
	},
	getTimeStr : function (date) {}

};
tList.page = {
	setHtml : function (currentPage, totalPage) {
		if (totalPage <= 1) {
			$("#page").html("").hide();
			return
		} else {
			if (currentPage > totalPage) {
				currentPage = totalPage
			} else {
				if (currentPage < 1) {
					currentPage = 1
				}
			}
		}
		var showNum = 9;
		var moveNum = (showNum - 1) / 2;
		var startNum = 1;
		var totalShow = showNum;
		if (totalPage < showNum) {
			startNum = 1;
			totalShow = totalPage
		} else {
			if (currentPage <= moveNum) {
				startNum = 1
			} else {
				if (currentPage > (totalPage - moveNum)) {
					startNum = totalPage - showNum + 1
				} else {
					startNum = currentPage - moveNum
				}
			}
		}
		var htmlArray = new Array();
		if (currentPage == startNum) {
			htmlArray.push('<span id="page-l" class="button no"><span class="btn-l">首&nbsp;&nbsp;页</span></span><a id="page-l1" class="not">上一页</a>')
		} else {
			htmlArray.push('<span id="page-l" onclick="tFilter.ctrl.page.set(1);" class="button"><span class="btn-l">首&nbsp;&nbsp;页</span></span><a id="page-l1" onclick="tFilter.ctrl.page.set(' + (currentPage - 1) + ');">上一页</a>')
		}
		var num = 0;
		for (var i = 0; i < totalShow; i++) {
			num = startNum + i;
			htmlArray.push("<a" + (num == currentPage ? ' class="choose"' : ' onclick="tFilter.ctrl.page.set(' + num + ');"') + ">" + num + "</a>")
		}
		if (num != totalPage) {
			htmlArray.push('<a class="page-last" onclick="tFilter.ctrl.page.set(' + totalPage + ');">...' + totalPage + "</a>")
		}
		if (currentPage == totalPage) {
			htmlArray.push('<span id="page-r" class="button no"><span class="btn-r">下一页</span></span>')
		} else {
			htmlArray.push('<span id="page-r" onclick="tFilter.ctrl.page.set(' + (currentPage + 1) + ');" class="button"><span class="btn-r">下一页</span></span>')
		}
		$("#page").html(htmlArray.join("")).show();
		addMouseStyle($("#page a,#page span.button"), "hover", "active")
	}
};
tList.setAll = {
	show : false,
	transCache : null,
	editCache : {},
	currentShow : "",
	init : function () {
		$("#fe-choose-panel .choose-li").bind("mouseenter", function () {
			$(this).addClass("mouseover")
		}).bind("mouseleave", function () {
			$(this).removeClass("mouseover")
		});
		$("#fe-category-panel .ls-li0").bind("mouseenter", function () {
			$(".levelSelect .ls2").hide();
			$(this).find(".ls1").show();
			$(this).addClass("mouseover")
		}).bind("mouseleave", function () {
			$(this).find(".ls1").hide();
			$(this).find(".ls2").hide();
			$(this).removeClass("mouseover")
		})
	},
	dataInit : function () {
		if (this.show) {
			this.showCheckBox()
		}
		$("#lEdit-a").removeClass("select").removeClass("some")
	},
	showCheckBox : function () {
		$("#filter-editall").slideDown(150);
		tList.setAll.show = true;
		$("#list .ul1 li").addClass("sortBox");
		$("#list .cBox").removeClass("hidden");
		$("#list .img-icon").addClass("hidden");
		tFilter.panel.hide()
	},
	hideCheckBox : function () {
		if (tList.setAll.show == true) {
			$("#list .ul1 li").removeClass("sortBox");
			$("#list .cBox").addClass("hidden");
			$("#list .img-icon").removeClass("hidden");
			tList.setAll.show = false;
			$("#filter-editall").slideUp(150);
			$("#fb-editall").removeClass("select")
		}
	},
	showPanel : function (name, e) {
		(e && e.stopPropagation) ? e.stopPropagation() : (window.event.cancelBubble = true);
		if (name == this.currentShow) {
			this.hidePanel()
		} else {
			this.hidePanel();
			this.currentShow = name;
			$("#" + name + "-panel").show();
			$("#" + name).addClass("currentShow");
			tFilter.panel.hide()
		}
	},
	hidePanel : function () {
		if (this.currentShow != "") {
			$("#" + this.currentShow + "-panel").hide();
			$("#" + this.currentShow).removeClass("currentShow");
			this.currentShow = ""
		}
	},
	initCategory : function () {
		$("#fe-category").val("分类修改为...");
		$("#fe-category-val").val(-1);
		$("#fe-category-type").val(-1);
		tList.setAll.hidePanel()
	},
	choose : function (type) {
		if (type == "all") {
			$("a.lEdit,input.lEdit").addClass("select");
			$("#lEdit-a").removeClass("some").addClass("select")
		} else {
			if (type == "none") {
				$("a.lEdit,input.lEdit").removeClass("select");
				$("#lEdit-a").removeClass("select").removeClass("some")
			} else {
				if (type == "payout") {
					$("a.lEdit,input.lEdit").removeClass("select");
					$("a.lEdit1,input.lEdit1").addClass("select");
					$("#lEdit-a").removeClass("select").addClass("some")
				} else {
					if (type == "income") {
						$("a.lEdit,input.lEdit").removeClass("select");
						$("a.lEdit5,input.lEdit5").addClass("select");
						$("#lEdit-a").removeClass("select").addClass("some")
					}
				}
			}
		}
		this.hidePanel()
	},
	del : function () {
		var select = tFilter.cbox.getValue("lEdit");
		if (select == "all") {
			tTitle.showMsg("没有选择操作的账单", 3000);
			return
		} else {
			$.confirm("您确定要删除么？", function () {
				tTitle.showMsg("正在删除，请稍候...");
				$.rmi("new", {
					opt : "batchDel",
					ids : select[0] + ""
				}, function (data) {
					if (data.result == "error") {
						tTitle.showMsg("对不起，删除失败...", 2000)
					} else {
						tTitle.showMsg("删除成功！", 2000);
						tTime.year.updateAllYearData();
						tData.load(true, false);
						tFilter.panel.hide()
					}
				})
			})
		}
	},
	edit : function () {
		var select = tFilter.cbox.getValue("lEdit");
		if (select == "all") {
			tTitle.showMsg("没有选择操作的账单", 3000);
			return
		}
		var cateType = $("#fe-category-type").val();
		var outCate = $("#fe-category-val").val();
		var account = $("#fe-outAccount").val();
		var store = $("#fe-store").val();
		var project = $("#fe-project").val();
		var member = $("#fe-member").val();
		this.editCache = {
			outCate : outCate,
			cateType : cateType,
			account : account,
			store : store,
			project : project,
			member : member
		};
		if (outCate == -1 && account == -1 && store == -1 && project == -1 && member == -1) {
			tTitle.showMsg("没有做任何修改", 3000);
			return
		}
		var ids = (select[0] + "").split(",");
		var trans = [];
		var tran = "";
		for (var i = 0; i < ids.length; i++) {
			tran = tList.box.data[ids[i]][1];
			if (tran.tranType == 1) {
				if (outCate != -1 && cateType == "payout1") {
					tran.categoryId = outCate
				}
				tran.sellerAcountId = (store == -1) ? tran.sellerAcountId : store;
				tran.buyerAcountId = (account == -1) ? tran.buyerAcountId : account;
				tran.projectId = (project == -1) ? tran.projectId : project;
				tran.memberId = (member == -1) ? tran.memberId : member;
				trans.push(tran)
			} else {
				if (tran.tranType == 5) {
					if (outCate != -1 && cateType == "income1") {
						tran.categoryId = outCate
					}
					tran.sellerAcountId = (store == -1) ? tran.sellerAcountId : store;
					tran.projectId = (project == -1) ? tran.projectId : project;
					tran.memberId = (member == -1) ? tran.memberId : member;
					if (account != -1 && Ysl.select("list-account-income-0-").hasText($("#fe-outAccount_v_" + account).html())) {
						tran.buyerAcountId = account
					}
					trans.push(tran)
				}
			}
		}
		if (trans.length <= 0) {
			tTitle.showMsg("没有可以修改的账单", 3000);
			return
		}
		tTitle.showMsg("正在编辑，请稍候...");
		window.setTimeout(function () {
			tList.setAll._doSave(trans)
		}, 10)
	},
	_doSave : function (trans) {
		var result = 0;
		tFilter.panel.hide();
		for (var i = 0; i < trans.length; i++) {
			var tran = trans[i];
			var dateStr = getDateStr(tran.date);
			$.rmi(billManager.data.postUrl[tran.tranType], {
				id : tran.tranId,
				category : tran.categoryId,
				store : tran.sellerAcountId,
				time : dateStr,
				project : tran.projectId,
				member : tran.memberId,
				memo : tran.memo,
				url : tran.url,
				debt : null,
				out_account : null,
				in_account : null,
				debt_account : null,
				account : tran.buyerAcountId,
				price : tran.itemAmount,
				price2 : null
			}, function (data) {
				if (data.result == "error") {}

			}, null, {
				async : false
			})
		}
		this.transCache = trans;
		tTitle.showMsg("编辑成功！", 2000);
		tData.load(true, false, tList.setAll._highlightShow)
	},
	_highlightShow : function () {
		var cateStr = "";
		if (tList.setAll.editCache.outCate != -1) {
			if (tList.setAll.editCache.cateType == "payout1") {
				cateStr = $("#list-payout-0-_v_" + tList.setAll.editCache.outCate).html()
			} else {
				cateStr = $("#list-income-0-_v_" + tList.setAll.editCache.outCate).html()
			}
		}
		var account = tList.setAll.editCache.account == -1 ? "" : $("#fe-outAccount_v_" + tList.setAll.editCache.account).html();
		var store = tList.setAll.editCache.store == -1 ? "" : $("#fe-store_v_" + tList.setAll.editCache.store).html();
		var project = tList.setAll.editCache.project == -1 ? "" : $("#fe-project_v_" + tList.setAll.editCache.project).html();
		var titId = "";
		for (var i = 0; i < tList.setAll.transCache.length; i++) {
			titId = "#list-tit-" + tList.setAll.transCache[i].tranId + " .ul2 ";
			$(titId + " .bt-1").html($(titId + " .bt-1").html().replace(cateStr, '<span class="highlight">' + cateStr + "</span>"));
			$(titId + " .bt-3").html($(titId + " .bt-3").html().replace(account, '<span class="highlight">' + account + "</span>"));
			$(titId + " .bt-4").html($(titId + " .bt-4").html().replace(store, '<span class="highlight">' + store + "</span>"));
			$(titId + " .bt-5").html($(titId + " .bt-5").html().replace(project, '<span class="highlight">' + project + "</span>"))
		}
		tList.setAll.editCache = {};
		tList.setAll.transCache = null;
		window.setTimeout(function () {
			$("#list .list-tit .highlight").removeClass("highlight")
		}, 5000)
	}
};
function exportAll() {
	tFilter.panel.hide();
	var filterStr = "&beginDate=" + tData.startTime + "&endDate=" + tData.endTime + "&cids=" + tData.category + "&bids=" + tData.account + "&sids=" + tData.store + "&pids=" + tData.project + "&note=" + tData.keyword + "&mids=" + tData.type + "&memids=" + tData.member + "&token=" + $param.token;
	window.location.href = "../data/standard.do?m=exportAll" + filterStr
}
function removeTargerFocus($obj) {
	$obj.unbind("focus").focus(function () {
		$(this).blur()
	})
}
function addMouseStyle($obj, hoverStyle, activeStyle) {
	$obj.unbind("mouseover").unbind("mouseout").unbind("mousedown").unbind("mouseup").mouseover(function () {
		$(this).addClass(hoverStyle)
	}).mouseout(function () {
		$(this).removeClass(hoverStyle)
	}).mousedown(function () {
		$(this).addClass(activeStyle)
	}).mouseup(function () {
		$(this).removeClass(activeStyle)
	})
}
function addKeyStyle($obj, hoverStyle, activeStyle) {
	$obj.focus(function () {
		$(this).addClass(hoverStyle)
	}).blur(function () {
		$(this).removeClass(hoverStyle)
	}).keydown(function (event) {
		event.keyCode == 13 ? $(this).addClass(activeStyle) : ""
	}).keyup(function (event) {
		event.keyCode == 13 ? $(this).removeClass(activeStyle) : ""
	})
}
function addSubmitStyle($actObj, $subBtn, hoverStyle, activeStyle) {
	$actObj.keypress(function (event) {
		if (event.keyCode == 13) {
			$subBtn.addClass(hoverStyle);
			window.setTimeout(function () {
				$subBtn.removeClass(hoverStyle).addClass(activeStyle);
				window.setTimeout(function () {
					$subBtn.removeClass(activeStyle).click()
				}, 100)
			}, 100)
		}
	})
}
function setDatepicker($obj, ifDetail) {
	if (ifDetail == null) {
		ifDetail = true
	}
	$obj.fdDatepicker({
		showDetail : ifDetail
	})
}
function listMsgShow($obj, msg) {
	$obj.focus();
	$.validatorMsg.show($obj, msg)
}
function isChinese(str) {
	var lst = /[u00-uFF]/;
	return !lst.test(str)
}
function strlen(str) {
	str = str + "";
	var strlength = 0;
	for (var i = 0; i < str.length; i++) {
		if (isChinese(str.charAt(i)) == true) {
			strlength = strlength + 2
		} else {
			strlength = strlength + 1
		}
	}
	return strlength
}
function cnSubstr(str, length) {
	str = str + "";
	if (str == "" || str == null) {
		return str
	} else {
		var strlength = 0;
		var newStr = "";
		for (var i = 0; i < str.length; i++) {
			if (isChinese(str.charAt(i)) == true) {
				strlength = strlength + 2
			} else {
				strlength = strlength + 1
			}
			if (strlength > length) {
				break
			} else {
				newStr = newStr + str.charAt(i)
			}
		}
		return newStr + ((str.length > newStr.length) ? "..." : "")
	}
}
function cnSubstr_account(str, length) {
	var allByteLen = getStrStringByte(str);
	if (allByteLen > length) {
		var befor_max_num = length - 8;
		var after_min_num = allByteLen - 8;
		var beforeStr = "";
		var afterStr = "";
		var strByteNum = 0;
		for (var i = 0, _len = str.length; i < _len; i++) {
			if (str.charCodeAt(i) > 255) {
				strByteNum += 2
			} else {
				strByteNum++
			}
			if (strByteNum < befor_max_num) {
				beforeStr += str.charAt(i)
			} else {
				if (strByteNum > after_min_num) {
					afterStr += str.charAt(i)
				}
			}
		}
		return beforeStr + "..." + afterStr
	} else {
		return str
	}
}
function getStrStringByte(str) {
	return str.replace(/[^\x00-\xff]/g, "xx").length
}
function _getDateStr(year, month, day) {
	var monthStr = (month + 0 < 10) ? "0" + month : month;
	var dateStr = (day + 0 < 10) ? "0" + day : day;
	return year + "." + monthStr + "." + dateStr
}
function getDateStr(date) {
	var year = date.year + 1900;
	var month = numToStr(date.month + 1);
	var day = numToStr(date.date);
	var result = year + "." + month + "." + day;
	if (date.hours > 0 || date.minutes > 0 || date.seconds > 0) {
		result = result + " " + numToStr(date.hours) + ":" + numToStr(date.minutes);
		if (date.seconds > 0) {
			result = result + ":" + date.seconds
		}
	}
	return result
}
function numToStr(num) {
	return (num >= 10) ? num : "0" + num
}
function replaeMoneySeparator(str) {
	return (str != null) ? str.replace(/,/g, "") : str
}
function ready() {
	tTime.init(new Date());
	tTime.year.initHtml();
	tList.init();
	if ($param.initCid == -1 && $param.initAid == -1 && $param.initMemid == -1) {
		tTime.month.choose(tTime.currentYear, tTime.currentMonth)
	} else {
		$("#panel-category-list .li, .p-list-box li").click(function (e) {
			e.stopPropagation()
		});
		if ($param.initCid != -1) {
			$("#cCat-out-" + $param.initCid + "-a").click();
			$("#cCat-in-" + $param.initCid + "-a").click();
			var result = tFilter.cbox.getValue("cCat");
			tFilter.ctrl.baseSetVal("category", result[0].join(","));
			tFilter.list.addOne("category", result[1]);
			$("#fb-category span").html("选择分类")
		}
		if ($param.initAid != -1) {
			if ($param.initAid.indexOf(",") >= 0) {
				var strs = new Array();
				strs = $param.initAid.split(",");
				for (var i = 0; i < strs.length; i++) {
					$("#cAcc-" + strs[i] + "-a").click()
				}
			} else {
				$("#cAcc-" + $param.initAid + "-a").click()
			}
			result = tFilter.cbox.getValue("cAcc");
			tFilter.ctrl.baseSetVal("account", result[0].join(","));
			tFilter.list.addOne("account", result[1]);
			$("#fb-account span").html("选择账户")
		}
		if ($param.initSids != -1) {
			if ($param.initSids.indexOf(",") >= 0) {
				var strs = new Array();
				strs = $param.initSids.split(",");
				for (var i = 0; i < strs.length; i++) {
					$("#cSto-" + strs[i] + "-a").click()
				}
			} else {
				$("#cSto-" + $param.initSids + "-a").click()
			}
			result = tFilter.cbox.getValue("cSto");
			tFilter.ctrl.baseSetVal("store", result[0].join(","));
			tFilter.list.addOne("store", result[1]);
			$("#fb-store span").html("选择商家")
		}
		if ($param.initPids != -1) {
			if ($param.initPids.indexOf(",") >= 0) {
				var strs = new Array();
				strs = $param.initPids.split(",");
				for (var i = 0; i < strs.length; i++) {
					$("#cPro-" + strs[i] + "-a").click()
				}
			} else {
				$("#cPro-" + $param.initPids + "-a").click()
			}
			result = tFilter.cbox.getValue("cPro");
			tFilter.ctrl.baseSetVal("project", result[0].join(","));
			tFilter.list.addOne("project", result[1]);
			$("#fb-project span").html("选择项目")
		}
		if ($param.initNote != -1) {
			$("#search-key").val($param.initNote);
			tFilter.list.addKeyword($param.initNote);
			tFilter.ctrl.loadData()
		}
		if ($param.initMemid != -1) {
			$("#cMem-" + $param.initMemid + "-a").click();
			result = tFilter.cbox.getValue("cMem");
			tFilter.ctrl.baseSetVal("member", result[0].join(","));
			tFilter.list.addOne("member", result[1]);
			$("#fb-member span").html("选择成员")
		}
		$("#fb-begindate").val($param.initBeginDate == "none" ? "" : $param.initBeginDate);
		$("#fb-enddate").val($param.initEndDate == "none" ? "" : $param.initEndDate);
		tFilter.ctrl.time.set()
	}
}
function load() {
	tTime.year.initData();
	if ($.browser.msie && $.browser.version == "6.0") {
		window.setTimeout(function () {
			lastDo()
		}, 100)
	} else {
		lastDo()
	}
}
function lastDo() {
	levelSelect.init();
	addKeyStyle($("#tb-save"), "hover", "active");
	addSubmitStyle($("#tb-memo"), $("#tb-save"), "hover", "active");
	$("#panel-category-list .li, .p-list-box li").bind("mouseenter", function () {
		$(this).children(".level2-show").show();
		$(this).addClass("mouseover")
	}).bind("mouseleave", function () {
		$(this).children(".level2-show").hide();
		$(this).removeClass("mouseover")
	}).click(function (e) {
		e.stopPropagation()
	});
	$("div.p-tit").click(function () {
		tFilter.panel.hide()
	});
	$("#panel-account ul.show").first().addClass("first");
	addMouseStyle($("#filter-list .fl-child"), "mouseover", "");
	setDatepicker($("#tb-datepicker"));
	setDatepicker($("#fb-begindate,#fb-enddate"), false);
	addSubmitStyle($("#search-key"), $("#search-btn"), "hover", "active");
	$(document).click(function () {
		billManager.closeMore();
		tFilter.panel.hide();
		levelSelect.hide();
		tList.setAll.hidePanel()
	});
	tList.setAll.init();
	$(".levelSelect, #filter-bar .panelbtn,#filter-bar .panel,#ui-datepicker-div,#fdDatepicker,#type-more,#type-more-box,#fe-choose-panel,#lEdit-a,#fe-category").click(function (event) {
		event.stopPropagation()
	});
	$("#panel-category a.cCat").each(function () {
		$(this).html(cnSubstr($(this).html(), 10))
	});
	$("#panel-account a.cAcc").each(function () {
		$(this).html(cnSubstr_account($(this).html(), 23))
	});
	$("#panel-store a.cSto,#panel-project a.cPro").each(function () {
		$(this).html(cnSubstr($(this).html(), 12))
	});
	$("#template-box .template-list li").each(function () {
		$(this).html(cnSubstr($(this).html(), 12))
	});
	$("input.money").calculator();
	removeTargerFocus($("a, input.nofocus").not(".focus"));
	addMouseStyle($("a, input, div.btn, span.btn, #fc-tit .sort, div.button"), "hover", "active")
}
ready();
load();
