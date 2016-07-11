var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));

exports.getItems = function () {
	return 'xxxxxx';
}

exports.info = Promise.promisify(function (cfg, callback) {

		querystring = require('querystring');
		// today = new Date(),
		// endDate = today.getFullYear() + '.' + ((today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)) + '.' + ((today.getDate() + 1) < 10 ? '0' + today.getDate() : today.getDate());

		var form = {
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
		},
		body = querystring.stringify(form),

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
		request({
			method : 'post',
			url : 'http://www.feidee.com/money/tally/new.rmi',
			gzip : true,
			body : body,
			headers : headers
		}, function (e, r, body) {
			if (r && r.statusCode == 200) {

				callback(body)
			}
		});
	})
	exports.data = function (callback) {}
