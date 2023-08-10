/*
海底捞小程序签到
3 8 * * * hdlqd.js
========= 青龙 =========
变量格式：export hdlck=' xxxx & xxx @  xxxx & xxx '  多个账号用 @分割
*/
const $ = new Env('海底捞小程序签到');
const notify = $.isNode() ? require('./sendNotify') : ''; // 这里是 node（青龙属于node环境）通知相关的
const Notify = 1; //0为关闭通知，1为打开通知,默认为1
const debug = 0; //0为关闭调试，1为打开调试,默认为0
const { default: axios } = require('axios');
const barkAxios = axios.create();
//////////////////////
var request = require('request');
let hdlck = process.env.hdlck || ''; // 这里是 从青龙的 配置文件 读取你写的变量
let PPTOKEN = process.env.PPTOKEN;
let hdlckArr = [];
let data = '';
let APP_TOKEN = '';
let msg = '';
let mobile = '';
!(async () => {
	if (!(await Envs()))
		//多账号分割 判断变量是否为空  初步处理多账号
		return;
	else {
		console.log(`海底捞小程序签到开始`); // console.log是输出信息的，可以在脚本日志中看到输出（打印）的信息

		console.log(
			`\n\n=========================================    \n脚本执行 - 北京时间(UTC+8)：${new Date(
				new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000
			).toLocaleString()} \n=========================================\n`
		);

		console.log(`\n=================== 共找到 ${hdlckArr.length} 个账号 ===================`);

		if (debug) {
			console.log(`【debug】 这是你的全部账号数组:\n ${hdlckArr}`);
		}

		for (let index = 0; index < hdlckArr.length; index++) {
			let num = index + 1;
			console.log(`\n========= 开始【第 ${num} 个账号】=========\n`);

			ck = hdlckArr[index].split('&'); // 这里是分割你每个账号的每个小项
			if (debug) {
				console.log(`\n 【debug】 这是你第 ${num} 账号信息:\n ${data}\n`);
			}

			// 这里是开始做任务    需要注意的点
			// 	1. await只能运行与async函数中
			// 	2. 函数的名字不可以相同
			//      3. 不够可以自己复制

			console.log('开始签到');
			await login();
			await getInfo();
			await signin();
			await getFragment();
			await SendMsg(msg); // 与发送通知有关系
		}
	}
})()
	.catch(e => console.logErr(e))
	.finally(() => $.done());
// 登录获取token
function login(timeout = 3 * 1000) {
	return new Promise(resolve => {
		var options = {
			method: 'POST',
			url: 'https://superapp-public.kiwa-tech.com/api/gateway/login/center/login/wechatLogin',
			headers: {
				Host: 'superapp-public.kiwa-tech.com',
				Connection: 'keep-alive',
				appId: '15',
				_HAIDILAO_APP_TOKEN: '',
				'User-Agent':
					'Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.40(0x1800282b) NetType/WIFI Language/zh_CN',
				Referer: 'https://servicewechat.com/wx1ddeb67115f30d1a/75/page-frame.html',
				'content-type': 'application/json',
				Accept: '*/*'
			},
			body: JSON.stringify({
				type: 1,
				country: 'CN',
				codeType: 1,
				business: '登录',
				terminal: '会员小程序',
				openId: ck[0],
				uid: ck[1]
			})
		};
		if (debug) {
			console.log(`\n【debug】=============== 这是 登录 请求 url ===============`);
			console.log(JSON.stringify(options));
		}

		request(
			options,
			async (error, response, data) => {
				try {
					if (debug) {
						console.log(`\n\n【debug】===============这是 登录 返回data==============`);
						console.log(response.body);
					}

					let result = JSON.parse(response.body);
					if (result.code == 100000) {
						// 这里是根据服务器返回的数据做判断  方便我们知道任务是否完成了
						APP_TOKEN = result.data.token;
						console.log(`【token获取成功】${result.data.token} 🎉 `);
					} else {
						console.log(`\n【token】获取失败!\n `);
						msg += `【token】获取失败!\n `;
						errorMsg(msg);
					}
				} catch (e) {
					console.log(e);
				} finally {
					resolve();
				}
			},
			timeout
		);
	});
}

//获取个人信息
function getInfo(timeout = 3 * 1000) {
	return new Promise(resolve => {
		let url = {
			url: `https://superapp-public.kiwa-tech.com/activity/wxapp/applet/queryGrowthInfo`,
			headers: {
				Host: 'superapp-public.kiwa-tech.com',
				Accept: 'application/json, text/plain, */*',
				ReqType: 'APPH5',
				'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
				Origin: 'https://superapp-public.kiwa-tech.com',
				deviceId: 'null',
				'User-Agent':
					'Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.40(0x1800282b) NetType/WIFI Language/zh_CN miniProgram/wx1ddeb67115f30d1a',
				_HAIDILAO_APP_TOKEN: APP_TOKEN,
				Referer: 'https://superapp-public.kiwa-tech.com/app-sign-in/?SignInToken=' + APP_TOKEN + '&source=MiniApp',
				'Content-Type': 'application/json'
			},
			body: '{}'
		};

		if (debug) {
			console.log(`\n【debug】=============== 这是 获取个人信息 请求 url ===============`);
			console.log(JSON.stringify(url));
		}

		$.post(
			url,
			async (error, response, data) => {
				try {
					if (debug) {
						console.log(`\n\n【debug】===============这是 获取个人信息 返回data==============`);
						console.log(data);
					}

					let result = JSON.parse(data);
					if (result.success == true) {
						mobile = result.data.mobile;
					} else if (result.success == false) {
						console.log(`获取账号信息失败，原因是：${result.msg}`);
						msg += `\n获取账号信息失败，原因是：${result.msg}`;
						errorMsg(msg);
					} else {
						console.log(`\n【获取账号信息】 失败 ❌ 了呢,可能是网络被外星人抓走了!\n `);
						msg += `\n【获取账号信息】 失败 ❌ 了呢,可能是网络被外星人抓走了!\n `;
						errorMsg(msg);
					}
				} catch (e) {
					log(e);
				} finally {
					resolve();
				}
			},
			timeout
		);
	});
}
// 每日签到
function signin(timeout = 3 * 1000) {
	return new Promise(resolve => {
		let url = {
			url: `https://superapp-public.kiwa-tech.com/activity/wxapp/signin/signin`, // 这是请求的 url 可以直接用我们抓包、精简后的URL
			headers: {
				Host: 'superapp-public.kiwa-tech.com',
				Accept: 'application/json, text/plain, */*',
				ReqType: 'APPH5',
				'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
				Origin: 'https://superapp-public.kiwa-tech.com',
				deviceId: 'null',
				'User-Agent':
					'Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.40(0x1800282b) NetType/WIFI Language/zh_CN miniProgram/wx1ddeb67115f30d1a',
				_HAIDILAO_APP_TOKEN: APP_TOKEN,
				Referer: 'https://superapp-public.kiwa-tech.com/app-sign-in/?SignInToken=' + APP_TOKEN + '&source=MiniApp',
				'Content-Type': 'application/json',
				Connection: 'keep-alive'
			},
			body: '{"signinSource":"MiniApp"}'
		};

		if (debug) {
			console.log(`\n【debug】=============== 这是 签到 请求 url ===============`);
			console.log(JSON.stringify(url));
		}

		$.post(
			url,
			async (error, response, data) => {
				try {
					if (debug) {
						console.log(`\n\n【debug】===============这是 签到 返回data==============`);
						console.log(data);
					}

					let result = JSON.parse(data);
					if (result.success == true) {
						// 这里是根据服务器返回的数据做判断  方便我们知道任务是否完成了

						console.log(`账号${mobile}签到成功，获得：${result.signinQueryDetailList[0].fragment}积分 🎉`);
						msg += `\n账号${mobile}签到成功，获得：${result.signinQueryDetailList[0].fragment}积分🎉`;
					} else if (result.success == false) {
						console.log(`\n账号${mobile}签到失败,原因是：${result.msg}!\n `);
						msg += `\n账号${mobile}签到失败,原因是：${result.msg}!\n `
					} else {
						console.log(`\n账号${mobile}签到失败 ❌ 了呢,可能是网络被外星人抓走了!\n `);
						msg += `\n【账号${mobile}签到失败 ❌ 了呢,可能是网络被外星人抓走了!\n `;
						errorMsg(msg);
					}
				} catch (e) {
					console.log(e);
				} finally {
					resolve();
				}
			},
			timeout
		);
	});
}

//查询总碎片
function getFragment(timeout = 3 * 1000) {
	return new Promise(resolve => {
		let url = {
			url: `https://superapp-public.kiwa-tech.com/activity/wxapp/signin/queryFragment`,
			headers: {
				Host: 'superapp-public.kiwa-tech.com',
				Accept: 'application/json, text/plain, */*',
				ReqType: 'APPH5',
				'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
				Origin: 'https://superapp-public.kiwa-tech.com',
				deviceId: 'null',
				'User-Agent':
					'Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.40(0x1800282b) NetType/WIFI Language/zh_CN miniProgram/wx1ddeb67115f30d1a',
				_HAIDILAO_APP_TOKEN: APP_TOKEN,
				Referer: 'https://superapp-public.kiwa-tech.com/app-sign-in/?SignInToken=' + APP_TOKEN + '&source=MiniApp',
				'Content-Type': 'application/json',
				Connection: 'keep-alive'
			},
			body: ''
		};

		if (debug) {
			console.log(`\n【debug】=============== 这是 查询碎片 请求 url ===============`);
			console.log(JSON.stringify(url));
		}

		$.post(
			url,
			async (error, response, data) => {
				try {
					if (debug) {
						console.log(`\n\n【debug】===============这是 查询碎片余额 返回data==============`);
						console.log(data);
					}

					let result = JSON.parse(data);
					if (result.success == true) {
						console.log(`账号${mobile}碎片为：${result.data.total}，最近一次过期时间为：${result.data.expireDate}`);
						msg += `\n账号${mobile}碎片为：${result.data.total}，最近一次过期时间为：${result.data.expireDate}`;
					} else {
						console.log(`账号[${mobile}]查询碎片失败,原因是：${result.msg}`);
						msg += `\n账号[${mobile}]查询碎片失败,原因是：${result.msg}`;
					}
				} catch (e) {
					log(e);
				} finally {
					resolve();
				}
			},
			timeout
		);
	});
}

// 如果有更多的需求，直接复制上一个函数，改个名   然后稍微更改一下内容   就可以用了
// 不要忘记与上面的 函数调用对应起来鸭

//#region 固定代码 可以不管他
// ============================================变量检查============================================ \\
async function Envs() {
	if (hdlck) {
		if (hdlck.indexOf('@') != -1) {
			hdlck.split('@').forEach(item => {
				hdlckArr.push(item);
			});
		} else {
			hdlckArr.push(hdlck);
		}
	} else {
		console.log(`\n 【${$.name}】：未填写变量 hdlck`);
		return;
	}

	return true;
}

// ============================================发送消息============================================ \\
async function SendMsg(message) {
	if (!message) return;

	if (Notify > 0) {
		if ($.isNode()) {
			var notify = require('./sendNotify');
			await notify.sendNotify($.name, message);
		} else {
			$.msg(message);
		}
	} else {
		console.log(message);
	}
}
// ============================================发送error消息============================================ \\
function errorMsg(message) {
	return new Promise(resolve => {
		const body = {
			token: `${PPTOKEN}`,
			title: `海底捞小程序签到`,
			content: `${message}`
		};
		const options = {
			url: `https://www.pushplus.plus/send`,
			body: JSON.stringify(body),
			headers: {
				'Content-Type': ' application/json'
			}
		};
		$.post(options, (err, resp, data) => {
			try {
				if (err) {
					console.log(`push+发送通知消息失败！！\n`);
					console.log(err);
				} else {
					data = JSON.parse(data);
					if (data.code === 200) {
						console.log(`push+发送通知消息完成。\n`);
					} else {
						console.log(`push+发送通知消息失败：${data.msg}\n`);
					}
				}
			} catch (e) {
				$.logErr(e, resp);
			} finally {
				resolve(data);
			}
		});
	});
}

/**
 * 随机数生成
 */
function randomString(e) {
	e = e || 32;
	var t = 'QWERTYUIOPASDFGHJKLZXCVBNM1234567890',
		a = t.length,
		n = '';
	for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
	return n;
}

/**
 * 随机整数生成
 */
function randomInt(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

//#endregion

// prettier-ignore   固定代码  不用管他
function Env(t, e) {
	'undefined' != typeof process && JSON.stringify(process.env).indexOf('GITHUB') > -1 && process.exit(0);
	class s {
		constructor(t) {
			this.env = t;
		}
		send(t, e = 'GET') {
			t = 'string' == typeof t ? { url: t } : t;
			let s = this.get;
			return (
				'POST' === e && (s = this.post),
				new Promise((e, i) => {
					s.call(this, t, (t, s, r) => {
						t ? i(t) : e(s);
					});
				})
			);
		}
		get(t) {
			return this.send.call(this.env, t);
		}
		post(t) {
			return this.send.call(this.env, t, 'POST');
		}
	}
	return new (class {
		constructor(t, e) {
			(this.name = t),
				(this.http = new s(this)),
				(this.data = null),
				(this.dataFile = 'box.dat'),
				(this.logs = []),
				(this.isMute = !1),
				(this.isNeedRewrite = !1),
				(this.logSeparator = '\n'),
				(this.startTime = new Date().getTime()),
				Object.assign(this, e),
				this.log('', `🔔${this.name}, 开始!`);
		}
		isNode() {
			return 'undefined' != typeof module && !!module.exports;
		}
		isQuanX() {
			return 'undefined' != typeof $task;
		}
		isSurge() {
			return 'undefined' != typeof $httpClient && 'undefined' == typeof $loon;
		}
		isLoon() {
			return 'undefined' != typeof $loon;
		}
		toObj(t, e = null) {
			try {
				return JSON.parse(t);
			} catch {
				return e;
			}
		}
		toStr(t, e = null) {
			try {
				return JSON.stringify(t);
			} catch {
				return e;
			}
		}
		getjson(t, e) {
			let s = e;
			const i = this.getdata(t);
			if (i)
				try {
					s = JSON.parse(this.getdata(t));
				} catch {}
			return s;
		}
		setjson(t, e) {
			try {
				return this.setdata(JSON.stringify(t), e);
			} catch {
				return !1;
			}
		}
		getScript(t) {
			return new Promise(e => {
				this.get({ url: t }, (t, s, i) => e(i));
			});
		}
		runScript(t, e) {
			return new Promise(s => {
				let i = this.getdata('@chavy_boxjs_userCfgs.httpapi');
				i = i ? i.replace(/\n/g, '').trim() : i;
				let r = this.getdata('@chavy_boxjs_userCfgs.httpapi_timeout');
				(r = r ? 1 * r : 20), (r = e && e.timeout ? e.timeout : r);
				const [o, h] = i.split('@'),
					n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: 'cron', timeout: r }, headers: { 'X-Key': o, Accept: '*/*' } };
				this.post(n, (t, e, i) => s(i));
			}).catch(t => this.logErr(t));
		}
		loaddata() {
			if (!this.isNode()) return {};
			{
				(this.fs = this.fs ? this.fs : require('fs')), (this.path = this.path ? this.path : require('path'));
				const t = this.path.resolve(this.dataFile),
					e = this.path.resolve(process.cwd(), this.dataFile),
					s = this.fs.existsSync(t),
					i = !s && this.fs.existsSync(e);
				if (!s && !i) return {};
				{
					const i = s ? t : e;
					try {
						return JSON.parse(this.fs.readFileSync(i));
					} catch (t) {
						return {};
					}
				}
			}
		}
		writedata() {
			if (this.isNode()) {
				(this.fs = this.fs ? this.fs : require('fs')), (this.path = this.path ? this.path : require('path'));
				const t = this.path.resolve(this.dataFile),
					e = this.path.resolve(process.cwd(), this.dataFile),
					s = this.fs.existsSync(t),
					i = !s && this.fs.existsSync(e),
					r = JSON.stringify(this.data);
				s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r);
			}
		}
		lodash_get(t, e, s) {
			const i = e.replace(/\[(\d+)\]/g, '.$1').split('.');
			let r = t;
			for (const t of i) if (((r = Object(r)[t]), void 0 === r)) return s;
			return r;
		}
		lodash_set(t, e, s) {
			return Object(t) !== t
				? t
				: (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []),
				  (e.slice(0, -1).reduce((t, s, i) => (Object(t[s]) === t[s] ? t[s] : (t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {})), t)[e[e.length - 1]] = s),
				  t);
		}
		getdata(t) {
			let e = this.getval(t);
			if (/^@/.test(t)) {
				const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
					r = s ? this.getval(s) : '';
				if (r)
					try {
						const t = JSON.parse(r);
						e = t ? this.lodash_get(t, i, '') : e;
					} catch (t) {
						e = '';
					}
			}
			return e;
		}
		setdata(t, e) {
			let s = !1;
			if (/^@/.test(e)) {
				const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
					o = this.getval(i),
					h = i ? ('null' === o ? null : o || '{}') : '{}';
				try {
					const e = JSON.parse(h);
					this.lodash_set(e, r, t), (s = this.setval(JSON.stringify(e), i));
				} catch (e) {
					const o = {};
					this.lodash_set(o, r, t), (s = this.setval(JSON.stringify(o), i));
				}
			} else s = this.setval(t, e);
			return s;
		}
		getval(t) {
			return this.isSurge() || this.isLoon()
				? $persistentStore.read(t)
				: this.isQuanX()
				? $prefs.valueForKey(t)
				: this.isNode()
				? ((this.data = this.loaddata()), this.data[t])
				: (this.data && this.data[t]) || null;
		}
		setval(t, e) {
			return this.isSurge() || this.isLoon()
				? $persistentStore.write(t, e)
				: this.isQuanX()
				? $prefs.setValueForKey(t, e)
				: this.isNode()
				? ((this.data = this.loaddata()), (this.data[e] = t), this.writedata(), !0)
				: (this.data && this.data[e]) || null;
		}
		initGotEnv(t) {
			(this.got = this.got ? this.got : require('got')),
				(this.cktough = this.cktough ? this.cktough : require('tough-cookie')),
				(this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()),
				t && ((t.headers = t.headers ? t.headers : {}), void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar));
		}
		get(t, e = () => {}) {
			t.headers && (delete t.headers['Content-Type'], delete t.headers['Content-Length']),
				this.isSurge() || this.isLoon()
					? (this.isSurge() && this.isNeedRewrite && ((t.headers = t.headers || {}), Object.assign(t.headers, { 'X-Surge-Skip-Scripting': !1 })),
					  $httpClient.get(t, (t, s, i) => {
							!t && s && ((s.body = i), (s.statusCode = s.status)), e(t, s, i);
					  }))
					: this.isQuanX()
					? (this.isNeedRewrite && ((t.opts = t.opts || {}), Object.assign(t.opts, { hints: !1 })),
					  $task.fetch(t).then(
							t => {
								const { statusCode: s, statusCode: i, headers: r, body: o } = t;
								e(null, { status: s, statusCode: i, headers: r, body: o }, o);
							},
							t => e(t)
					  ))
					: this.isNode() &&
					  (this.initGotEnv(t),
					  this.got(t)
							.on('redirect', (t, e) => {
								try {
									if (t.headers['set-cookie']) {
										const s = t.headers['set-cookie'].map(this.cktough.Cookie.parse).toString();
										s && this.ckjar.setCookieSync(s, null), (e.cookieJar = this.ckjar);
									}
								} catch (t) {
									this.logErr(t);
								}
							})
							.then(
								t => {
									const { statusCode: s, statusCode: i, headers: r, body: o } = t;
									e(null, { status: s, statusCode: i, headers: r, body: o }, o);
								},
								t => {
									const { message: s, response: i } = t;
									e(s, i, i && i.body);
								}
							));
		}
		post(t, e = () => {}) {
			if (
				(t.body && t.headers && !t.headers['Content-Type'] && (t.headers['Content-Type'] = 'application/x-www-form-urlencoded'),
				t.headers && delete t.headers['Content-Length'],
				this.isSurge() || this.isLoon())
			)
				this.isSurge() && this.isNeedRewrite && ((t.headers = t.headers || {}), Object.assign(t.headers, { 'X-Surge-Skip-Scripting': !1 })),
					$httpClient.post(t, (t, s, i) => {
						!t && s && ((s.body = i), (s.statusCode = s.status)), e(t, s, i);
					});
			else if (this.isQuanX())
				(t.method = 'POST'),
					this.isNeedRewrite && ((t.opts = t.opts || {}), Object.assign(t.opts, { hints: !1 })),
					$task.fetch(t).then(
						t => {
							const { statusCode: s, statusCode: i, headers: r, body: o } = t;
							e(null, { status: s, statusCode: i, headers: r, body: o }, o);
						},
						t => e(t)
					);
			else if (this.isNode()) {
				this.initGotEnv(t);
				const { url: s, ...i } = t;
				this.got.post(s, i).then(
					t => {
						const { statusCode: s, statusCode: i, headers: r, body: o } = t;
						e(null, { status: s, statusCode: i, headers: r, body: o }, o);
					},
					t => {
						const { message: s, response: i } = t;
						e(s, i, i && i.body);
					}
				);
			}
		}
		time(t, e = null) {
			const s = e ? new Date(e) : new Date();
			let i = {
				'M+': s.getMonth() + 1,
				'd+': s.getDate(),
				'H+': s.getHours(),
				'm+': s.getMinutes(),
				's+': s.getSeconds(),
				'q+': Math.floor((s.getMonth() + 3) / 3),
				S: s.getMilliseconds()
			};
			/(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + '').substr(4 - RegExp.$1.length)));
			for (let e in i) new RegExp('(' + e + ')').test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ('00' + i[e]).substr(('' + i[e]).length)));
			return t;
		}
		msg(e = t, s = '', i = '', r) {
			const o = t => {
				if (!t) return t;
				if ('string' == typeof t) return this.isLoon() ? t : this.isQuanX() ? { 'open-url': t } : this.isSurge() ? { url: t } : void 0;
				if ('object' == typeof t) {
					if (this.isLoon()) {
						let e = t.openUrl || t.url || t['open-url'],
							s = t.mediaUrl || t['media-url'];
						return { openUrl: e, mediaUrl: s };
					}
					if (this.isQuanX()) {
						let e = t['open-url'] || t.url || t.openUrl,
							s = t['media-url'] || t.mediaUrl;
						return { 'open-url': e, 'media-url': s };
					}
					if (this.isSurge()) {
						let e = t.url || t.openUrl || t['open-url'];
						return { url: e };
					}
				}
			};
			if ((this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog)) {
				let t = ['', '==============📣系统通知📣=============='];
				t.push(e), s && t.push(s), i && t.push(i), console.log(t.join('\n')), (this.logs = this.logs.concat(t));
			}
		}
		log(...t) {
			t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator));
		}
		logErr(t, e) {
			const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
			s ? this.log('', `❗️${this.name}, 错误!`, t.stack) : this.log('', `❗️${this.name}, 错误!`, t);
		}
		wait(t) {
			return new Promise(e => setTimeout(e, t));
		}
		done(t = {}) {
			const e = new Date().getTime(),
				s = (e - this.startTime) / 1e3;
			this.log('', `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t);
		}
	})(t, e);
}
