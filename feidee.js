var request = require('request-promise');
var querystring = require('querystring');

module.exports.all = function () {
	return getAll();
	//     return get();

}

function getAll() {
	return getByPage(1).then(function (data) {

		var rslt = [];
		for (var i = 0; i < data.length; i++) {
			var groups = data[i].groups;

			if (groups && groups.length) {
				for (var j = 0; j < groups.length; j++) {
					var list = groups[j].list;

					if (list && list.length) {
						rslt = [].concat(rslt, list);
					}
				}
			}
		}

		return rslt;
	});
}

function getByPage(page) {
	return get({
		page : page
	}).then(function (data) {

		if (data.pageNo == data.pageCount)
			return data;

		return getByPage(parseInt(data.pageNo) + 1).then(function (nextdata) {
			console.log(nextdata.pageNo);
			return [].concat(data, nextdata);
		});
	});
}

function get(cfg) {

	var body = querystring.stringify(Object.assign({
				opt : 'list2',
				beginDate : '2016.05.02',
				endDate : '',
				cids : 0,
				bids : 0,
				sids : 0,
				pids : 0,
				memids : 0,
				order : '',
				isDesc : 0,
				page : 1,
				note : '',
				mids : 0
			}, cfg)),

	headers = {
		'Accept' : '*/*',
		'Accept-Encoding' : 'gzip, deflate',
		'Accept-Language' : 'en,zh-CN;q=0.8,zh;q=0.6',
		'Connection' : 'keep-alive',
		'Content-Length' : '112',
		'Content-Type' : 'application/x-www-form-urlencoded',
		'Cookie' : 'JSESSIONID=24E36317CA4009D03EB7A3656F730725; __vistor=BB6D883A1akyd6cwy; __auth=543b037085853e86d41fea291c64acb7429bc2b5b1fde92ef2fb8356d001dbb47b430cc250b360d82bd7a71cf607bea9b71fbf884b4bbfb1dba7d2d37d6d2ce1abf7d17f5e42ec657401f2318567c80ee2e90d21241fce9bc186e579fcdccba0; SESSION_COOKIE=money12; __nick=aa.x%40163.com; Hm_lvt_3db4e52bb5797afe0faaa2fde5c96ea4=1467898291,1467989365,1468033289,1468148060; Hm_lpvt_3db4e52bb5797afe0faaa2fde5c96ea4=1468154805; __utmt=1; __utma=180741936.2035605007.1464530641.1468152030.1468154805.52; __utmb=180741936.1.10.1468154805; __utmc=180741936; __utmz=180741936.1466261958.20.5.utmcsr=baidu|utmccn=(organic)|utmcmd=organic|utmctr=%E9%9A%8F%E6%89%8B%E8%AE%B0%E7%94%B5%E8%84%91%E7%89%88',
		'Host' : 'www.feidee.com',
		'Origin' : 'http://www.feidee.com',
		'Referer' : 'http://www.feidee.com/money/tally/new.do',
		'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.63 Safari/537.36',
		'X-Requested-With' : 'XMLHttpRequest'
	};

	return request({
		method : 'post',
		url : 'http://www.feidee.com/money/tally/new.rmi',
		gzip : true,
		body : body,
		json : true,
		headers : headers
	}
		/* , function (e, r, body) {
		if (r && r.statusCode == 200) {

		callback(body)
		}
		} */
	);

}
/*
var getByDateRange = Promise.promisify(function (start, end) {

var getByPage = Promise.promisify(function (p) {
return get();
});
var cfg = {
startDate : formatDate(start),
endDate : formatDate(end),
pageNo : 1
};

});

function getByDateRange = function (start, end) {
var list = [];

var getByPage = function (page, cfg) {
get(Object.assign(cfg, {
page : page
}), function (data) {
if (data && data.pageNo < data.pageCount) {
getByPage(data.pageNo + 1, cfg);
}

if (data && data.groups) {
list = list.concat(data.groups);
}
});
}
}
 */
function formatDate(d) {
	d = d instanceof Date ? d : new Date(d);

	return d.getFullYear() + '.' + ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) + '.' + ((d.getDate() + 1) < 10 ? '0' + d.getDate() : d.getDate());

}

/* exports.info = Promise.promisify(function (cfg, callback) {})
exports.data = function (callback) {}
*/
