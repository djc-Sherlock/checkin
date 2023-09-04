/**************************************

脚本名称：微信小程序 喜茶GO 签到
脚本作者：@Sliverkiss
更新日期：2023.09.01 12:11:17

脚本兼容：Surge、QuantumultX、Loon、Shadowrocket、Node.js
只测试过loon和青龙，其它环境请自行尝试

ps:获取ck后请勿频繁打开小程序，避免ck失效。

*************************
【 签到脚本使用教程 】:
*************************

青龙：
1.登录后抓包 vip.heytea.com域名下的Authorization，填写到heytea_data,多账号用 @ 分割
2.可选推送：将bark的key填写到bark_key，不填默认使用青龙自带的推送

Loon: 
1.将获取Cookie脚本保存到本地
2.打开小程序->我的->任务中心，若提示获取Cookie成功则可以使用该脚本
3.关闭获取ck脚本，避免产生不必要的mitm。

[Script]
cron "8 8 * * *" script-path=https://raw.githubusercontent.com/Sliverkiss/GoodNight/master/Script/heytea.js, timeout=300, tag=喜茶Go
http-request ^https:\/\/vip.heytea.com\/api\/service-member\/vip\/task\/member script-path=https://raw.githubusercontent.com/Sliverkiss/GoodNight/master/Script/heytea.js, timeout=10, tag=喜茶Go获取token
[MITM]
hostname =vip.heytea.com


------------------------------------------
1、此脚本仅用于学习研究，不保证其合法性、准确性、有效性，请根据情况自行判断，本人对此不承担任何保证责任。
2、由于此脚本仅用于学习研究，您必须在下载后 24 小时内将所有内容从您的计算机或手机或任何存储设备中完全删除，若违反规定引起任何事件本人对此均不负责。
3、请勿将此脚本用于任何商业或非法目的，若违反规定请自行对此负责。
4、此脚本涉及应用与本人无关，本人对因此引起的任何隐私泄漏或其他后果不承担任何责任。
5、本人对任何脚本引发的问题概不负责，包括但不限于由脚本错误引起的任何损失和损害。
6、如果任何单位或个人认为此脚本可能涉嫌侵犯其权利，应及时通知并提供身份证明，所有权证明，我们将在收到认证文件确认后删除此脚本。
7、所有直接或间接使用、查看此脚本的人均应该仔细阅读此声明。本人保留随时更改或补充此声明的权利。一旦您使用或复制了此脚本，即视为您已接受此免责声明。


******************************************/


// env.js 全局
const $ = new Env('喜茶Go'),
	ckName = 'heytea_data',
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
	console.log('\n============= 用户CK有效性验证 =============\n');
	let _0x54136e = [];

	for (let _0x21707d of userList) {
		console.log('🔷账号' + _0x21707d.index + ' >> Start check CK');

		_0x54136e.push(await _0x21707d.check());

		await $.wait(_0x21707d.getRandomTime());
	}

	await Promise.all(_0x54136e);
	console.log('\n================== 任务 ==================\n');
	_0x54136e = [];

	for (let _0x47df2 of userList) {
		_0x47df2.ckStatus
			? (DoubleLog('🔷账号' + _0x47df2.index + ' >> Start work'),
			  console.log('随机延迟' + _0x47df2.getRandomTime() + 'ms'),
			  _0x54136e.push(await _0x47df2.signin()),
			  await $.wait(_0x47df2.getRandomTime()),
			  _0x54136e.push(await _0x47df2.point()),
			  await $.wait(_0x47df2.getRandomTime()))
			: $.notifyMsg.push('❌账号' + _0x47df2.index + ' >> Check ck error!');
	}

	await Promise.all(_0x54136e);
}

class UserInfo {
	constructor(_0x462c6f) {
		this.index = ++userIdx;
		this.token = _0x462c6f;
		this.ckStatus = true;
		this.headers = {
			Authorization: this.token,
			'Content-Type': 'application/json'
		};
	}

	['getRandomTime']() {
		return randomInt(1000, 3000);
	}

	async ['signin']() {
		try {
			const _0x28d068 = {
				url: 'https://vip.heytea.com/api/service-member/vip/task/award/114',
				headers: {
					Authorization: this.token,
					'Content-Type': 'application/json'
				},
				body: '{}'
			};

			let _0x2a99ec = await httpRequest(_0x28d068);

			_0x2a99ec?.['code'] == 0 ? DoubleLog('✅签到成功！获得' + _0x2a99ec?.['data']?.['score'] + '积分') : DoubleLog('🔶' + _0x2a99ec.message);
		} catch (_0xc15147) {
			console.log(_0xc15147);
		}
	}

	async ['point']() {
		let _0x4bec83 = {
				url: 'https://vip.heytea.com/api/service-member/vip/task/member',
				headers: this.headers
			},
			_0x4ac5dd = await httpRequest(_0x4bec83);

		_0x4ac5dd?.['code'] == 0 ? DoubleLog('✅目前共' + _0x4ac5dd?.['data']?.['usableScore'] + '积分') : console.log(_0x4ac5dd.message);
	}

	async ['check']() {
		let _0x34c3f4 = {
				url: 'https://vip.heytea.com/api/service-member/vip/task/member',
				headers: this.headers
			},
			_0x54f226 = await httpRequest(_0x34c3f4);

		_0x54f226?.['code'] == 0 ? console.log('✅check success!') : ((this.ckStatus = false), console.log('❌账号' + this.index + ' >> check ck error!'));
	}
}

async function getCookie() {
	if ($request && $request.method != 'OPTIONS') {
		const _0x10e60d = $request.headers.Authorization || $request.headers.authorization;

		_0x10e60d ? ($.setdata(_0x10e60d, ckName), $.msg($.name, '', '获取签到Cookie成功🎉')) : $.msg($.name, '', '错误获取签到Cookie失败');
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
})()
	.catch(_0x3cce32 => $.notifyMsg.push(_0x3cce32.message || _0x3cce32))
	.finally(async () => {
		$.barkKey && (await BarkNotify($, $.barkKey, $.name, $.notifyMsg.join('\n')));
		await SendMsg($.notifyMsg.join('\n'));
		$.done();
	});

function DoubleLog(_0x12a005) {
	$.isNode() ? _0x12a005 && (console.log('' + _0x12a005), $.notifyMsg.push('' + _0x12a005)) : (console.log('' + _0x12a005), $.notifyMsg.push('' + _0x12a005));
}

function toParams(_0x4ab4c0) {
	var _0x568be5 = Object.keys(_0x4ab4c0)
		.map(function (_0x5a3c9b) {
			return encodeURIComponent(_0x5a3c9b) + '=' + encodeURIComponent(_0x4ab4c0[_0x5a3c9b]);
		})
		.join('&');

	return _0x568be5;
}

async function checkEnv() {
	if (userCookie) {
		let _0x38c414 = envSplitor[0];

		for (let _0x5833d3 of envSplitor)
			if (userCookie.indexOf(_0x5833d3) > -1) {
				_0x38c414 = _0x5833d3;
				break;
			}

		for (let _0x4742ca of userCookie.split(_0x38c414)) _0x4742ca && userList.push(new UserInfo(_0x4742ca));

		userCount = userList.length;
	} else {
		console.log('未找到CK');
		return;
	}

	console.log('共找到' + userCount + '个账号');
	return true;
}

function randomInt(_0x25ce06, _0x4122e7) {
	return Math.round(Math.random() * (_0x4122e7 - _0x25ce06) + _0x25ce06);
}

async function SendMsg(_0x189716) {
	if (!_0x189716) {
		return;
	}

	Notify > 0 ? ($.isNode() ? await notify.sendNotify($.name, _0x189716) : $.msg($.name, '', _0x189716)) : console.log(_0x189716);
}

/** ---------------------------------固定不动区域----------------------------------------- */
// prettier-ignore

//请求函数函数二次封装
function httpRequest(options, method) { typeof (method) === 'undefined' ? ('body' in options ? method = 'post' : method = 'get') : method = method; return new Promise((resolve) => { $[method](options, (err, resp, data) => { try { if (err) { console.log(`${method}请求失败`); $.logErr(err) } else { if (data) { typeof JSON.parse(data) == 'object' ? data = JSON.parse(data) : data = data; resolve(data) } else { console.log(`请求api返回数据为空，请检查自身原因`) } } } catch (e) { $.logErr(e, resp) } finally { resolve() } }) }) }
//Bark APP notify
async function BarkNotify(c, k, t, b) { for (let i = 0; i < 3; i++) { console.log(`🔷Bark notify >> Start push (${i + 1})`); const s = await new Promise((n) => { c.post({ url: 'https://api.day.app/push', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: t, body: b, device_key: k, ext_params: { group: t } }) }, (e, r, d) => r && r.status == 200 ? n(1) : n(d || e)) }); if (s === 1) { console.log('✅Push success!'); break } else { console.log(`❌Push failed! >> ${s.message || s}`) } } };
//From chavyleung's Env.js
function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, a) => { s.call(this, t, (t, s, r) => { t ? a(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.encoding = "utf-8", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } getEnv() { return "undefined" != typeof $environment && $environment["surge-version"] ? "Surge" : "undefined" != typeof $environment && $environment["stash-version"] ? "Stash" : "undefined" != typeof module && module.exports ? "Node.js" : "undefined" != typeof $task ? "Quantumult X" : "undefined" != typeof $loon ? "Loon" : "undefined" != typeof $rocket ? "Shadowrocket" : void 0 } isNode() { return "Node.js" === this.getEnv() } isQuanX() { return "Quantumult X" === this.getEnv() } isSurge() { return "Surge" === this.getEnv() } isLoon() { return "Loon" === this.getEnv() } isShadowrocket() { return "Shadowrocket" === this.getEnv() } isStash() { return "Stash" === this.getEnv() } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const a = this.getdata(t); if (a) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, a) => e(a)) }) } runScript(t, e) { return new Promise(s => { let a = this.getdata("@chavy_boxjs_userCfgs.httpapi"); a = a ? a.replace(/\n/g, "").trim() : a; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [i, o] = a.split("@"), n = { url: `http://${o}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": i, Accept: "*/*" }, timeout: r }; this.post(n, (t, e, a) => s(a)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), a = !s && this.fs.existsSync(e); if (!s && !a) return {}; { const a = s ? t : e; try { return JSON.parse(this.fs.readFileSync(a)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), a = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : a ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const a = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of a) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, a) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[a + 1]) >> 0 == +e[a + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, a] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, a, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, a, r] = /^@(.*?)\.(.*?)$/.exec(e), i = this.getval(a), o = a ? "null" === i ? null : i || "{}" : "{}"; try { const e = JSON.parse(o); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), a) } catch (e) { const i = {}; this.lodash_set(i, r, t), s = this.setval(JSON.stringify(i), a) } } else s = this.setval(t, e); return s } getval(t) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": return $persistentStore.read(t); case "Quantumult X": return $prefs.valueForKey(t); case "Node.js": return this.data = this.loaddata(), this.data[t]; default: return this.data && this.data[t] || null } } setval(t, e) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": return $persistentStore.write(t, e); case "Quantumult X": return $prefs.setValueForKey(t, e); case "Node.js": return this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0; default: return this.data && this.data[e] || null } } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { switch (t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"], delete t.headers["content-type"], delete t.headers["content-length"]), t.params && (t.url += "?" + this.queryStr(t.params)), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, a) => { !t && s && (s.body = a, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, a) }); break; case "Quantumult X": this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: a, headers: r, body: i, bodyBytes: o } = t; e(null, { status: s, statusCode: a, headers: r, body: i, bodyBytes: o }, i, o) }, t => e(t && t.error || "UndefinedError")); break; case "Node.js": let s = require("iconv-lite"); this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: a, statusCode: r, headers: i, rawBody: o } = t, n = s.decode(o, this.encoding); e(null, { status: a, statusCode: r, headers: i, rawBody: o, body: n }, n) }, t => { const { message: a, response: r } = t; e(a, r, r && s.decode(r.rawBody, this.encoding)) }) } } post(t, e = (() => { })) { const s = t.method ? t.method.toLocaleLowerCase() : "post"; switch (t.body && t.headers && !t.headers["Content-Type"] && !t.headers["content-type"] && (t.headers["content-type"] = "application/x-www-form-urlencoded"), t.headers && (delete t.headers["Content-Length"], delete t.headers["content-length"]), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient[s](t, (t, s, a) => { !t && s && (s.body = a, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, a) }); break; case "Quantumult X": t.method = s, this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: a, headers: r, body: i, bodyBytes: o } = t; e(null, { status: s, statusCode: a, headers: r, body: i, bodyBytes: o }, i, o) }, t => e(t && t.error || "UndefinedError")); break; case "Node.js": let a = require("iconv-lite"); this.initGotEnv(t); const { url: r, ...i } = t; this.got[s](r, i).then(t => { const { statusCode: s, statusCode: r, headers: i, rawBody: o } = t, n = a.decode(o, this.encoding); e(null, { status: s, statusCode: r, headers: i, rawBody: o, body: n }, n) }, t => { const { message: s, response: r } = t; e(s, r, r && a.decode(r.rawBody, this.encoding)) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let a = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in a) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? a[e] : ("00" + a[e]).substr(("" + a[e]).length))); return t } queryStr(t) { let e = ""; for (const s in t) { let a = t[s]; null != a && "" !== a && ("object" == typeof a && (a = JSON.stringify(a)), e += `${s}=${a}&`) } return e = e.substring(0, e.length - 1), e } msg(e = t, s = "", a = "", r) { const i = t => { switch (typeof t) { case void 0: return t; case "string": switch (this.getEnv()) { case "Surge": case "Stash": default: return { url: t }; case "Loon": case "Shadowrocket": return t; case "Quantumult X": return { "open-url": t }; case "Node.js": return }case "object": switch (this.getEnv()) { case "Surge": case "Stash": case "Shadowrocket": default: { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } case "Loon": { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } case "Quantumult X": { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl, a = t["update-pasteboard"] || t.updatePasteboard; return { "open-url": e, "media-url": s, "update-pasteboard": a } } case "Node.js": return }default: return } }; if (!this.isMute) switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: $notification.post(e, s, a, i(r)); break; case "Quantumult X": $notify(e, s, a, i(r)); break; case "Node.js": }if (!this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), a && t.push(a), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": case "Quantumult X": default: this.log("", `❗️${this.name}, 错误!`, t); break; case "Node.js": this.log("", `❗️${this.name}, 错误!`, t.stack) } } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; switch (this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": case "Quantumult X": default: $done(t); break; case "Node.js": process.exit(1) } } }(t, e) }
