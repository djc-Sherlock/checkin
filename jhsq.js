/**************************************
使用方法：抓取linfankj.com域名下请求体body的user_token填写到jhsq_data，多账号用 @ 分隔
******************************************/

// env.js 全局
const $ = new Env('聚汇社区'),
	ckName = 'jhsq_data',
	Notify = 1,
	notify = $.isNode() ? require('./sendNotify') : '';
let envSplitor = ['@'],
	userCookie = ($.isNode() ? process.env[ckName] : $.getdata(ckName)) || '',
	userList = [],
	userIdx = 0,
	userCount = 0;
$.notifyMsg = [];
$.barkKey = ($.isNode() ? process.env.bark_key : $.getdata('bark_key')) || '';

async function main() {
	console.log('\n================== 任务 ==================\n');
	let _0x4a6317 = [];

	for (let _0x55ab35 of userList) {
		_0x55ab35.ckStatus
			? (console.log('随机延迟' + _0x55ab35.getRandomTime() + 'ms'),
			  _0x4a6317.push(await _0x55ab35.signin()),
			  await $.wait(_0x55ab35.getRandomTime()),
			  _0x4a6317.push(await _0x55ab35.draw()),
			  await $.wait(_0x55ab35.getRandomTime()))
			: $.notifyMsg.push('❌账号' + _0x55ab35.index + ' >> Check ck error!');
	}

	await Promise.all(_0x4a6317);
	console.log('\n================= 用户信息 =================\n');
	_0x4a6317 = [];

	for (let _0x19b1aa of userList) {
		_0x19b1aa.ckStatus
			? (console.log('随机延迟' + _0x19b1aa.getRandomTime() + 'ms'), _0x4a6317.push(await _0x19b1aa.getLoginUser()), await $.wait(_0x19b1aa.getRandomTime()))
			: $.notifyMsg.push('❌账号' + _0x19b1aa.index + ' >> Check ck error!');
	}

	await Promise.all(_0x4a6317);
}

class UserInfo {
	constructor(_0x59f7a7) {
		this.index = ++userIdx;
		this.token = _0x59f7a7;
		this.ckStatus = true;
		this.drawStatus = true;
		this.headers = {
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
			Cookie: ' ',
			'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
		};
		this.body = 'user_token=' + this.token + '&request_client=H5';
	}

	['getRandomTime']() {
		return randomInt(1000, 3000);
	}

	async ['signin']() {
		try {
			const _0x200951 = {
				url: 'https://linfankj.com/api/account/qiandao',
				headers: this.headers,
				body: this.body
			};

			let _0x3ce828 = await httpRequest(_0x200951);

			console.log(_0x3ce828);
			_0x3ce828?.['code'] == 200 ? console.log('✅' + _0x3ce828?.['message']) : console.log('🔶' + _0x3ce828?.['message']);
		} catch (_0x1f084e) {
			console.log(_0x1f084e);
		}
	}

	async ['draw']() {
		try {
			const _0x2d41ec = {
				url: 'https://linfankj.com/api/subject/turntable/drawLottery',
				headers: this.headers,
				body: this.body
			};

			let _0xd0685 = await httpRequest(_0x2d41ec);

			console.log(_0xd0685);
			_0xd0685?.['code'] == '200' ? console.log('' + _0xd0685?.['message']) : (console.log('' + _0xd0685?.['message']), (this.drawStatus = false));
		} catch (_0x1022bc) {
			console.log(_0x1022bc);
		}
	}

	async ['getLoginUser']() {
		try {
			const _0x3ddf58 = {
				url: 'https://linfankj.com/api/user/getLoginUser',
				headers: this.headers,
				body: this.body
			};

			let _0x36cf7e = await httpRequest(_0x3ddf58);

			_0x36cf7e?.['code'] == 200
				? DoubleLog('【' + _0x36cf7e?.['data']?.['nickname'] + '】当前金币:' + _0x36cf7e?.['data']?.['gold'] + ',当前现金:' + _0x36cf7e?.['data']?.['wallet'])
				: DoubleLog('🔶' + _0x36cf7e?.['message']);
		} catch (_0x5127a9) {
			console.log(_0x5127a9);
		}
	}
}

async function getCookie() {
	if ($request && $request.method != 'OPTIONS') {
		const _0x526c80 = $request.headers.Cookie || $request.headers.cookie;

		_0x526c80 ? ($.setdata(_0x526c80, ckName), $.msg($.name, '', '获取签到Cookie成功🎉')) : $.msg($.name, '', '错误获取签到Cookie失败');
	}
}

!(async () => {
	if (typeof $request != 'undefined') {
		await getCookie();
		return;
	}

	if (!(await checkEnv())) {
		throw new Error('❌未检测到ck，请添加环境变量');
	}

	userList.length > 0 && (await main());
	$.barkKey && (await BarkNotify($, $.barkKey, $.name, $.notifyMsg.join('\n')));
})()
	.catch(_0x329eab => $.notifyMsg.push(_0x329eab.message || _0x329eab))
	.finally(async () => {
		await SendMsg($.notifyMsg.join('\n'));
		$.done();
	});

function DoubleLog(_0x40d67c) {
	$.isNode() ? _0x40d67c && (console.log('' + _0x40d67c), $.notifyMsg.push('' + _0x40d67c)) : (console.log('' + _0x40d67c), $.notifyMsg.push('' + _0x40d67c));
}

function toParams(_0x5c30d3) {
	var _0x879804 = Object.keys(_0x5c30d3)
		.map(function (_0x2bdfe) {
			return encodeURIComponent(_0x2bdfe) + '=' + encodeURIComponent(_0x5c30d3[_0x2bdfe]);
		})
		.join('&');

	return _0x879804;
}

async function checkEnv() {
	if (userCookie) {
		let _0x59141f = envSplitor[0];

		for (let _0x309fa2 of envSplitor)
			if (userCookie.indexOf(_0x309fa2) > -1) {
				_0x59141f = _0x309fa2;
				break;
			}

		for (let _0x22306f of userCookie.split(_0x59141f)) _0x22306f && userList.push(new UserInfo(_0x22306f));

		userCount = userList.length;
	} else {
		console.log('未找到CK');
		return;
	}

	console.log('共找到' + userCount + '个账号');
	return true;
}

function randomInt(_0x57a102, _0xe5b4e1) {
	return Math.round(Math.random() * (_0xe5b4e1 - _0x57a102) + _0x57a102);
}

async function SendMsg(_0xfa0424) {
	if (!_0xfa0424) {
		return;
	}

	Notify > 0 ? ($.isNode() ? await notify.sendNotify($.name, _0xfa0424) : $.msg($.name, '', _0xfa0424)) : console.log(_0xfa0424);
}

/** ---------------------------------固定不动区域----------------------------------------- */
// prettier-ignore

//请求函数函数二次封装
function httpRequest(options, method) { typeof (method) === 'undefined' ? ('body' in options ? method = 'post' : method = 'get') : method = method; return new Promise((resolve) => { $[method](options, (err, resp, data) => { try { if (err) { console.log(`${method}请求失败`); $.logErr(err) } else { if (data) { typeof JSON.parse(data) == 'object' ? data = JSON.parse(data) : data = data; resolve(data) } else { console.log(`请求api返回数据为空，请检查自身原因`) } } } catch (e) { $.logErr(e, resp) } finally { resolve() } }) }) }
//Bark APP notify
async function BarkNotify(c, k, t, b) { for (let i = 0; i < 3; i++) { console.log(`🔷Bark notify >> Start push (${i + 1})`); const s = await new Promise((n) => { c.post({ url: 'https://api.day.app/push', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: t, body: b, device_key: k, ext_params: { group: t } }) }, (e, r, d) => r && r.status == 200 ? n(1) : n(d || e)) }); if (s === 1) { console.log('✅Push success!'); break } else { console.log(`❌Push failed! >> ${s.message || s}`) } } };
//From chavyleung's Env.js
function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, a) => { s.call(this, t, (t, s, r) => { t ? a(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.encoding = "utf-8", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } getEnv() { return "undefined" != typeof $environment && $environment["surge-version"] ? "Surge" : "undefined" != typeof $environment && $environment["stash-version"] ? "Stash" : "undefined" != typeof module && module.exports ? "Node.js" : "undefined" != typeof $task ? "Quantumult X" : "undefined" != typeof $loon ? "Loon" : "undefined" != typeof $rocket ? "Shadowrocket" : void 0 } isNode() { return "Node.js" === this.getEnv() } isQuanX() { return "Quantumult X" === this.getEnv() } isSurge() { return "Surge" === this.getEnv() } isLoon() { return "Loon" === this.getEnv() } isShadowrocket() { return "Shadowrocket" === this.getEnv() } isStash() { return "Stash" === this.getEnv() } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const a = this.getdata(t); if (a) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, a) => e(a)) }) } runScript(t, e) { return new Promise(s => { let a = this.getdata("@chavy_boxjs_userCfgs.httpapi"); a = a ? a.replace(/\n/g, "").trim() : a; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [i, o] = a.split("@"), n = { url: `http://${o}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": i, Accept: "*/*" }, timeout: r }; this.post(n, (t, e, a) => s(a)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), a = !s && this.fs.existsSync(e); if (!s && !a) return {}; { const a = s ? t : e; try { return JSON.parse(this.fs.readFileSync(a)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), a = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : a ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const a = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of a) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, a) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[a + 1]) >> 0 == +e[a + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, a] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, a, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, a, r] = /^@(.*?)\.(.*?)$/.exec(e), i = this.getval(a), o = a ? "null" === i ? null : i || "{}" : "{}"; try { const e = JSON.parse(o); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), a) } catch (e) { const i = {}; this.lodash_set(i, r, t), s = this.setval(JSON.stringify(i), a) } } else s = this.setval(t, e); return s } getval(t) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": return $persistentStore.read(t); case "Quantumult X": return $prefs.valueForKey(t); case "Node.js": return this.data = this.loaddata(), this.data[t]; default: return this.data && this.data[t] || null } } setval(t, e) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": return $persistentStore.write(t, e); case "Quantumult X": return $prefs.setValueForKey(t, e); case "Node.js": return this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0; default: return this.data && this.data[e] || null } } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { switch (t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"], delete t.headers["content-type"], delete t.headers["content-length"]), t.params && (t.url += "?" + this.queryStr(t.params)), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, a) => { !t && s && (s.body = a, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, a) }); break; case "Quantumult X": this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: a, headers: r, body: i, bodyBytes: o } = t; e(null, { status: s, statusCode: a, headers: r, body: i, bodyBytes: o }, i, o) }, t => e(t && t.error || "UndefinedError")); break; case "Node.js": let s = require("iconv-lite"); this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: a, statusCode: r, headers: i, rawBody: o } = t, n = s.decode(o, this.encoding); e(null, { status: a, statusCode: r, headers: i, rawBody: o, body: n }, n) }, t => { const { message: a, response: r } = t; e(a, r, r && s.decode(r.rawBody, this.encoding)) }) } } post(t, e = (() => { })) { const s = t.method ? t.method.toLocaleLowerCase() : "post"; switch (t.body && t.headers && !t.headers["Content-Type"] && !t.headers["content-type"] && (t.headers["content-type"] = "application/x-www-form-urlencoded"), t.headers && (delete t.headers["Content-Length"], delete t.headers["content-length"]), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient[s](t, (t, s, a) => { !t && s && (s.body = a, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, a) }); break; case "Quantumult X": t.method = s, this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: a, headers: r, body: i, bodyBytes: o } = t; e(null, { status: s, statusCode: a, headers: r, body: i, bodyBytes: o }, i, o) }, t => e(t && t.error || "UndefinedError")); break; case "Node.js": let a = require("iconv-lite"); this.initGotEnv(t); const { url: r, ...i } = t; this.got[s](r, i).then(t => { const { statusCode: s, statusCode: r, headers: i, rawBody: o } = t, n = a.decode(o, this.encoding); e(null, { status: s, statusCode: r, headers: i, rawBody: o, body: n }, n) }, t => { const { message: s, response: r } = t; e(s, r, r && a.decode(r.rawBody, this.encoding)) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let a = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in a) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? a[e] : ("00" + a[e]).substr(("" + a[e]).length))); return t } queryStr(t) { let e = ""; for (const s in t) { let a = t[s]; null != a && "" !== a && ("object" == typeof a && (a = JSON.stringify(a)), e += `${s}=${a}&`) } return e = e.substring(0, e.length - 1), e } msg(e = t, s = "", a = "", r) { const i = t => { switch (typeof t) { case void 0: return t; case "string": switch (this.getEnv()) { case "Surge": case "Stash": default: return { url: t }; case "Loon": case "Shadowrocket": return t; case "Quantumult X": return { "open-url": t }; case "Node.js": return }case "object": switch (this.getEnv()) { case "Surge": case "Stash": case "Shadowrocket": default: { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } case "Loon": { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } case "Quantumult X": { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl, a = t["update-pasteboard"] || t.updatePasteboard; return { "open-url": e, "media-url": s, "update-pasteboard": a } } case "Node.js": return }default: return } }; if (!this.isMute) switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: $notification.post(e, s, a, i(r)); break; case "Quantumult X": $notify(e, s, a, i(r)); break; case "Node.js": }if (!this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), a && t.push(a), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": case "Quantumult X": default: this.log("", `❗️${this.name}, 错误!`, t); break; case "Node.js": this.log("", `❗️${this.name}, 错误!`, t.stack) } } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; switch (this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": case "Quantumult X": default: $done(t); break; case "Node.js": process.exit(1) } } }(t, e) }
