/*
天瑞地安app 首页滚动做任务抽红包
抓包 https://vapp.tmuyun.com 域名请求头中的 X-SESSION-ID
https://guess.rabtv.cn 域名请求头中的 authorization
用&连接不分顺序
变量格式； export tmuyun="session=XXXXXXX&authorization=Bearer XXXXXXXX" 多账户用 @ 或者换行隔开
*/
const $ = new Env('天瑞地安');
let Notify = 1; //通知开关，0为关,大于0为开
let envSplitor = ['\n', '@'];
let _0x3aab95, _0xe0042e, _0x13dde9, _0x2b5b90;

const _0xc63ea9 = require('sha256'),
	{ machineId: _0x527665, machineIdSync: _0xea270c } = require('node-machine-id');

_0x527665().then(_0xc2efbf => {});

let _0xd8715b = _0xea270c(),
	_0xf38a09 = ($.isNode() ? process.env.cgkeyID : $.getdata('cgkeyID')) || '',
	_0x5c68a5 = ($.isNode() ? process.env.tmuyun : $.getdata('tmuyun')) || '',
	_0x5844c0 = [];

let _0xc70144 = 0,
	_0x26e707 = 0;

class _0x3fac71 {
	constructor(_0x53a7d5) {
		this.index = ++_0xc70144;
		this.name = this.index;
		this.valid = false;
		this.param = $.str2json(_0x53a7d5);
	}

	async ['my']() {
		try {
			let _0x156581 = '',
				_0x5b54cc = '',
				_0x2c43c4 = '',
				_0x4376c1 = this.param.authorization,
				_0x3bbc95 = 'https://guess.rabtv.cn/v1/user/information',
				_0x803a15 = '',
				_0x393956 = _0x587458(_0x3bbc95, _0x4376c1, _0x156581, _0x2c43c4, _0x5b54cc, _0x803a15);

			await _0x170ff2('post', _0x393956);
			let _0x5a97c8 = _0xe0042e;

			if (!_0x5a97c8) {
				return;
			}

			if (_0x5a97c8?.['data']['money']) {
				$.logAndNotify('账号[' + this.name + ']' + _0x5a97c8.data.nick_name + ' 已获得' + _0x5a97c8.data.money + '元');
				this.valid = true;
				await this.signIn();
			} else {
				$.logAndNotify('账号[' + this.name + ']变量不正确会导致无法做任务，请检查');
			}
		} catch (_0x2c291c) {
		} finally {
			return Promise.resolve(1);
		}
	}

	async ['signIn']() {
		try {
			let _0x3a6d85 = '',
				_0xe063d2 = '',
				_0x3dad44 = '',
				_0x4c8770 = this.param.cauthorization,
				_0x5622fe = 'https://crm.rabtv.cn/v2/index/signIn',
				_0x421368 = '',
				_0x5a14ae = _0x587458(_0x5622fe, _0x4c8770, _0x3a6d85, _0x3dad44, _0xe063d2, _0x421368);

			await _0x170ff2('post', _0x5a14ae);
			let _0x98cbae = _0xe0042e;

			if (!_0x98cbae) {
				return;
			}
			console.log(_0x98cbae);
			if (_0x98cbae.code == 1) {
				$.logAndNotify('账号[' + this.name + ']签到: 第' + _0x98cbae.data.continue_sign_num + '天');
			} else {
				$.logAndNotify('账号[' + this.name + ']签到: ' + _0x98cbae.msg);
			}
		} catch (_0x419bd8) {
		} finally {
			return Promise.resolve(1);
		}
	}

	async ['userTask']() {
		$.logAndNotify('\n============= 账号[' + this.index + '] =============');
		await this.my();

		if (!this.valid) {
			return;
		}
	}
}

!(async () => {
	if (!(typeof $request !== 'undefined')) {
		if (!(await _0x538320())) {
			return;
		}

		await _0x34819e();

		if (!(await _0x256ba9())) {
			return;
		}

		for (let _0x9ff22 of _0x5844c0) {
			await _0x9ff22.userTask();
		}

		await $.showmsg();
	}
})()
	.catch(_0x5cdab2 => console.log(_0x5cdab2))
	.finally(() => $.done());

async function _0x538320() {
	if (_0x5c68a5) {
		let _0x5f5130 = envSplitor[0];

		for (let _0x5d672d of envSplitor) {
			if (_0x5c68a5.indexOf(_0x5d672d) > -1) {
				_0x5f5130 = _0x5d672d;
				break;
			}
		}

		for (let _0x221a1b of _0x5c68a5.split(_0x5f5130)) {
			if (_0x221a1b) {
				_0x5844c0.push(new _0x3fac71(_0x221a1b));
			}
		}

		_0x26e707 = _0x5844c0.length;
	} else {
		console.log('\n未找到CK');
		return;
	}

	console.log('共找到' + _0x26e707 + '个账号');
	return true;
}

function _0x147017() {
	return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (_0x558413) {
		const _0x311746 = (Math.random() * 16) | 0;

		const _0x2e7d04 = _0x558413 === 'x' ? _0x311746 : (_0x311746 & 3) | 8;

		return _0x2e7d04.toString(16);
	});
}

async function _0x34819e() {
	try {
		let _0x1a6ea8 = 'https://v1.jinrishici.com/all.json',
			_0x9bf2ce = '',
			_0x30192d = _0x587458(_0x1a6ea8, _0x9bf2ce);

		await _0x170ff2('get', _0x30192d);
		let _0x21d2ad = _0xe0042e;

		if (!_0x21d2ad) {
			return;
		}

		$.logAndNotify('\n' + _0x21d2ad.content + '  \n————《' + _0x21d2ad.origin + '》' + _0x21d2ad.author);
		_0x3aab95 = _0x21d2ad.content;
	} catch (_0x27e774) {
	} finally {
		return Promise.resolve(1);
	}
}

async function _0x256ba9() {
	try {
		let _0x5b312e = 'http://111.67.197.7/api.php?act=km_logon&app=10002&uuid=' + _0xd8715b + '&kami=' + _0xf38a09,
			_0x5f1d40 = '',
			_0x5e8272 = _0x587458(_0x5b312e, _0x5f1d40);

		await _0x170ff2('get', _0x5e8272);
		let _0x199799 = _0xe0042e;

		if (!_0x199799) {
			return true;
		}

		if (_0x199799.code == 200) {
			console.log('\n卡密校验成功');
			return true;
		} else {
			return true;
		}
	} catch (_0xa85a29) {
	} finally {
	}
}

function _0x587458(_0x42aa8d, _0x34d636, _0x19c001, _0x10ca2b, _0x15eeab, _0x2634ea = '') {
	let _0x2aee3c = _0x42aa8d.replace('//', '/').split('/')[1];

	const _0x156688 = {
		Host: _0x2aee3c,
		'X-SESSION-ID': _0x34d636,
		'X-TIMESTAMP': _0x19c001,
		'X-SIGNATURE': _0x10ca2b,
		'X-REQUEST-ID': _0x15eeab,
		'X-TENANT-ID': '48',
		'User-Agent': '2.31.742;00000000-6b42-eedf-ffff-ffffe370e2dd;OPPO R9s;Android;9;Release',
		authorization: _0x34d636
	};
	const _0x2e892b = {
		url: _0x42aa8d,
		headers: _0x156688,
		timeout: 6000
	};
	_0x2634ea &&
		((_0x2e892b.body = _0x2634ea),
		(_0x2e892b.headers['content-type'] = 'application/x-www-form-urlencoded'),
		(_0x2e892b.headers['Content-Length'] = _0x2e892b.body ? _0x2e892b.body.length : 0));
	return _0x2e892b;
}

async function _0x170ff2(_0x5131c2, _0x3f7c43) {
	_0xe0042e = null;
	_0x13dde9 = null;
	_0x2b5b90 = null;
	return new Promise(_0x2371a0 => {
		$.send(_0x5131c2, _0x3f7c43, async (_0x4c7929, _0x3f2331, _0x4a6a71) => {
			try {
				_0x13dde9 = _0x3f2331;
				_0x2b5b90 = _0x4a6a71;

				if (_0x4c7929) {
					_0xe0042e = JSON.parse(_0x2b5b90);
				} else {
					if (_0x4a6a71.body) {
						if (typeof _0x4a6a71.body == 'object') {
							_0xe0042e = _0x4a6a71.body;
						} else {
							try {
								_0xe0042e = JSON.parse(_0x4a6a71.body);
							} catch (_0x642f72) {
								_0xe0042e = _0x4a6a71.body;
							}
						}
					}
				}
			} catch (_0xcf8036) {
			} finally {
				_0x2371a0();
			}
		});
	});
}

function Env(_0x5f3350, _0x2b54ea) {
	'undefined' != typeof process && JSON.stringify(process.env).indexOf('BUHTIG'.split('').reverse().join('')) > -1 && process.exit(0);
	return new (class {
		constructor(_0x1f0084, _0x2eea90) {
			this.name = _0x1f0084;
			this.notifyStr = ''.split('').reverse().join('');
			this.startTime = new Date().getTime();
			Object.assign(this, _0x2eea90);
			console.log(this.name + '：行运始开 '.split('').reverse().join(''));
		}

		['edoNsi'.split('').reverse().join('')]() {
			return 'denifednu'.split('').reverse().join('') != typeof module && !!module.exports;
		}

		['XnauQsi'.split('').reverse().join('')]() {
			return 'denifednu'.split('').reverse().join('') != typeof $task;
		}

		['egruSsi'.split('').reverse().join('')]() {
			return 'denifednu'.split('').reverse().join('') != typeof $httpClient && 'undefined' == typeof $loon;
		}

		['nooLsi'.split('').reverse().join('')]() {
			return 'undefined' != typeof $loon;
		}

		['atadteg'.split('').reverse().join('')](_0x53c71e) {
			let _0x487ccc = this.getval(_0x53c71e);

			if (/^@/.test(_0x53c71e)) {
				const [, _0x59b6e6, _0x12fb0a] = /^@(.*?)\.(.*?)$/.exec(_0x53c71e),
					_0x4617fc = _0x59b6e6 ? this.getval(_0x59b6e6) : '';

				if (_0x4617fc) {
					try {
						const _0x1d9c2f = JSON.parse(_0x4617fc);

						_0x487ccc = _0x1d9c2f ? this.lodash_get(_0x1d9c2f, _0x12fb0a, '') : _0x487ccc;
					} catch (_0xfed2c6) {
						_0x487ccc = ''.split('').reverse().join('');
					}
				}
			}

			return _0x487ccc;
		}

		['setdata'](_0x292c2c, _0x211560) {
			let _0x37d463 = !1;

			if (/^@/.test(_0x211560)) {
				const [, _0x2ac9b4, _0x44718d] = /^@(.*?)\.(.*?)$/.exec(_0x211560),
					_0x2b20e7 = this.getval(_0x2ac9b4),
					_0x2f11da = _0x2ac9b4 ? ('null' === _0x2b20e7 ? null : _0x2b20e7 || '{}') : '}{'.split('').reverse().join('');

				try {
					const _0x395ccf = JSON.parse(_0x2f11da);

					this.lodash_set(_0x395ccf, _0x44718d, _0x292c2c);
					_0x37d463 = this.setval(JSON.stringify(_0x395ccf), _0x2ac9b4);
				} catch (_0x4c49a1) {
					const _0x19bf35 = {};
					this.lodash_set(_0x19bf35, _0x44718d, _0x292c2c);
					_0x37d463 = this.setval(JSON.stringify(_0x19bf35), _0x2ac9b4);
				}
			} else {
				_0x37d463 = this.setval(_0x292c2c, _0x211560);
			}

			return _0x37d463;
		}

		['getval'](_0x3618d1) {
			return this.isSurge() || this.isLoon()
				? $persistentStore.read(_0x3618d1)
				: this.isQuanX()
				? $prefs.valueForKey(_0x3618d1)
				: this.isNode()
				? ((this.data = this.loaddata()), this.data[_0x3618d1])
				: (this.data && this.data[_0x3618d1]) || null;
		}

		['setval'](_0x1dfb71, _0x270f1a) {
			return this.isSurge() || this.isLoon()
				? $persistentStore.write(_0x1dfb71, _0x270f1a)
				: this.isQuanX()
				? $prefs.setValueForKey(_0x1dfb71, _0x270f1a)
				: this.isNode()
				? ((this.data = this.loaddata()), (this.data[_0x270f1a] = _0x1dfb71), this.writedata(), !0)
				: (this.data && this.data[_0x270f1a]) || null;
		}

		['send'](_0x25c9f4, _0xc53fe7, _0x49c7b7 = () => {}) {
			if (_0x25c9f4 != 'teg'.split('').reverse().join('') && _0x25c9f4 != 'tsop'.split('').reverse().join('') && _0x25c9f4 != 'put' && _0x25c9f4 != 'delete') {
				console.log('：法方ptth的效无'.split('').reverse().join('') + _0x25c9f4);
				return;
			}

			if (_0x25c9f4 == 'get' && _0xc53fe7.headers) {
				delete _0xc53fe7.headers['content-type'];
				delete _0xc53fe7.headers['Content-Length'];
			} else {
				if (_0xc53fe7.body && _0xc53fe7.headers) {
					if (!_0xc53fe7.headers['content-type']) {
						_0xc53fe7.headers['content-type'] = 'nosj/noitacilppa'.split('').reverse().join('');
					}
				}
			}

			if (this.isSurge() || this.isLoon()) {
				if (this.isSurge() && this.isNeedRewrite) {
					_0xc53fe7.headers = _0xc53fe7.headers || {};
					Object.assign(_0xc53fe7.headers, {
						'X-Surge-Skip-Scripting': !1
					});
				}

				let _0x9f0ca1 = {
					method: _0x25c9f4,
					url: _0xc53fe7.url,
					headers: _0xc53fe7.headers,
					timeout: _0xc53fe7.timeout,
					data: _0xc53fe7.body
				};

				if (_0x25c9f4 == 'get') {
					delete _0x9f0ca1.data;
				}

				$axios(_0x9f0ca1)
					.then(_0x27205e => {
						const { status: _0xf59f3a, request: _0x4f4dc7, headers: _0x1676c6, data: _0x189c90 } = _0x27205e;

						_0x49c7b7(null, _0x4f4dc7, {
							statusCode: _0xf59f3a,
							headers: _0x1676c6,
							body: _0x189c90
						});
					})
					.catch(_0x4a59f1 => console.log(_0x4a59f1));
			} else {
				if (this.isQuanX()) {
					_0xc53fe7.method = _0x25c9f4.toUpperCase();
					this.isNeedRewrite &&
						((_0xc53fe7.opts = _0xc53fe7.opts || {}),
						Object.assign(_0xc53fe7.opts, {
							hints: !1
						}));
					$task.fetch(_0xc53fe7).then(
						_0x5a01ee => {
							const { statusCode: _0x5b108e, request: _0x2c0c43, headers: _0x4ca035, body: _0x500d24 } = _0x5a01ee;

							_0x49c7b7(null, _0x2c0c43, {
								statusCode: _0x5b108e,
								headers: _0x4ca035,
								body: _0x500d24
							});
						},
						_0x35df6f => _0x49c7b7(_0x35df6f)
					);
				} else {
					if (this.isNode()) {
						this.got = this.got ? this.got : require('got');
						const { url: _0x172ec9, ..._0xc2a196 } = _0xc53fe7;
						this.instance = this.got.extend({
							followRedirect: false
						});

						this.instance[_0x25c9f4](_0x172ec9, _0xc2a196).then(
							_0x12b662 => {
								const { statusCode: _0x1fe2a1, request: _0x1e24e8, headers: _0x188457, body: _0xdd6482 } = _0x12b662;

								_0x49c7b7(null, _0x1e24e8, {
									statusCode: _0x1fe2a1,
									headers: _0x188457,
									body: _0xdd6482
								});
							},
							_0x1b1fb1 => {
								const { message: _0x4d5313, response: _0xd68d40 } = _0x1b1fb1;

								_0x49c7b7(_0x4d5313, _0xd68d40, _0xd68d40 && _0xd68d40.body);
							}
						);
					}
				}
			}
		}

		['emit'.split('').reverse().join('')](_0x2d89a0) {
			let _0x57dc8c = {
				'M+': new Date().getMonth() + 1,
				'd+': new Date().getDate(),
				'h+': new Date().getHours(),
				'm+': new Date().getMinutes(),
				's+': new Date().getSeconds(),
				'q+': Math.floor((new Date().getMonth() + 3) / 3),
				S: new Date().getMilliseconds()
			};
			/(y+)/.test(_0x2d89a0) && (_0x2d89a0 = _0x2d89a0.replace(RegExp.$1, (new Date().getFullYear() + '').substr(4 - RegExp.$1.length)));

			for (let _0x5b1485 in _0x57dc8c)
				new RegExp('(' + _0x5b1485 + ')').test(_0x2d89a0) &&
					(_0x2d89a0 = _0x2d89a0.replace(
						RegExp.$1,
						1 == RegExp.$1.length ? _0x57dc8c[_0x5b1485] : ('00' + _0x57dc8c[_0x5b1485]).substr(('' + _0x57dc8c[_0x5b1485]).length)
					));

			return _0x2d89a0;
		}

		async ['showmsg']() {
			if (Notify > 0) {
				if (!this.notifyStr) {
					return;
				}

				let _0x4ff4c8 = this.name + ' 运行通知\n' + this.notifyStr;

				if ($.isNode()) {
					var _0x5187b8 = require('./sendNotify');

					console.log('\n============== 推送 ==============');
					await _0x5187b8.sendNotify(this.name, _0x4ff4c8);
				} else {
					this.msg(_0x4ff4c8);
				}
			} else {
				console.log('\n============== 推送已关闭 ==============');
			}
		}

		['logAndNotify'](_0x341da8) {
			console.log(_0x341da8);
			this.notifyStr += _0x341da8;
			this.notifyStr += '\n';
		}

		['msg'](_0x56094e = t, _0x3a6dbc = ''.split('').reverse().join(''), _0x42752b = ''.split('').reverse().join(''), _0x3a2b46) {
			const _0x5ee6ef = _0x3c5616 => {
				if (!_0x3c5616) {
					return _0x3c5616;
				}

				if ('gnirts'.split('').reverse().join('') == typeof _0x3c5616) {
					return this.isLoon()
						? _0x3c5616
						: this.isQuanX()
						? {
								'open-url': _0x3c5616
						  }
						: this.isSurge()
						? {
								url: _0x3c5616
						  }
						: void 0;
				}

				if ('tcejbo'.split('').reverse().join('') == typeof _0x3c5616) {
					if (this.isLoon()) {
						let _0x22d60e = _0x3c5616.openUrl || _0x3c5616.url || _0x3c5616['open-url'],
							_0x854ba8 = _0x3c5616.mediaUrl || _0x3c5616['media-url'];

						return {
							openUrl: _0x22d60e,
							mediaUrl: _0x854ba8
						};
					}

					if (this.isQuanX()) {
						let _0x3f18be = _0x3c5616['open-url'] || _0x3c5616.url || _0x3c5616.openUrl,
							_0x18b2c = _0x3c5616['media-url'] || _0x3c5616.mediaUrl;

						return {
							'open-url': _0x3f18be,
							'media-url': _0x18b2c
						};
					}

					if (this.isSurge()) {
						let _0x519a86 = _0x3c5616.url || _0x3c5616.openUrl || _0x3c5616['open-url'];

						return {
							url: _0x519a86
						};
					}
				}
			};

			this.isMute ||
				(this.isSurge() || this.isLoon()
					? $notification.post(_0x56094e, _0x3a6dbc, _0x42752b, _0x5ee6ef(_0x3a2b46))
					: this.isQuanX() && $notify(_0x56094e, _0x3a6dbc, _0x42752b, _0x5ee6ef(_0x3a2b46)));
			let _0x146944 = ['', '============== 知通统系 =============='.split('').reverse().join('')];

			_0x146944.push(_0x56094e);

			_0x3a6dbc && _0x146944.push(_0x3a6dbc);
			_0x42752b && _0x146944.push(_0x42752b);
			console.log(_0x146944.join('\n'));
		}

		['getMin'](_0x59491d, _0x2cd339) {
			return _0x59491d < _0x2cd339 ? _0x59491d : _0x2cd339;
		}

		['getMax'](_0x543dcb, _0x45ab18) {
			return _0x543dcb < _0x45ab18 ? _0x45ab18 : _0x543dcb;
		}

		['padStr'](_0x135ae5, _0x148ee3, _0x28afb5 = '0') {
			let _0x37af40 = String(_0x135ae5);

			let _0x477c13 = _0x148ee3 > _0x37af40.length ? _0x148ee3 - _0x37af40.length : 0;

			let _0x2fe4a6 = '';

			for (let _0x597f2c = 0; _0x597f2c < _0x477c13; _0x597f2c++) {
				_0x2fe4a6 += _0x28afb5;
			}

			_0x2fe4a6 += _0x37af40;
			return _0x2fe4a6;
		}

		['phoneNum'](_0x4eb1f6) {
			if (_0x4eb1f6.length == 11) {
				let _0x2356e8 = _0x4eb1f6.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');

				return _0x2356e8;
			} else {
				return _0x4eb1f6;
			}
		}

		['rts2nosj'.split('').reverse().join('')](_0x734852, _0xacaff8, _0x100f44 = false) {
			let _0x35a2da = [];

			for (let _0x13adde of Object.keys(_0x734852).sort()) {
				let _0x108406 = _0x734852[_0x13adde];

				if (_0x108406 && _0x100f44) {
					_0x108406 = encodeURIComponent(_0x108406);
				}

				_0x35a2da.push(_0x13adde + '=' + _0x108406);
			}

			return _0x35a2da.join(_0xacaff8);
		}

		['str2json'](_0x44129e, _0x394fd0 = false) {
			let _0x35fff8 = {};

			for (let _0x955dbc of _0x44129e.split('&')) {
				if (!_0x955dbc) {
					continue;
				}

				let _0x1fdb2e = _0x955dbc.indexOf('=');

				if (_0x1fdb2e == -1) {
					continue;
				}

				let _0x451be3 = _0x955dbc.substr(0, _0x1fdb2e);

				let _0x35386f = _0x955dbc.substr(_0x1fdb2e + 1);

				if (_0x394fd0) {
					_0x35386f = decodeURIComponent(_0x35386f);
				}

				_0x35fff8[_0x451be3] = _0x35386f;
			}

			return _0x35fff8;
		}

		['gnirtSmodnar'.split('').reverse().join('')](_0x1af2fa, _0x47355e = 'abcdef0123456789') {
			let _0x4f9abd = '';

			for (let _0x2b1733 = 0; _0x2b1733 < _0x1af2fa; _0x2b1733++) {
				_0x4f9abd += _0x47355e.charAt(Math.floor(Math.random() * _0x47355e.length));
			}

			return _0x4f9abd;
		}

		['tsiLmodnar'.split('').reverse().join('')](_0x238a8e) {
			let _0x4c2cb7 = Math.floor(Math.random() * _0x238a8e.length);

			return _0x238a8e[_0x4c2cb7];
		}

		['wait'](_0x1d0c03) {
			return new Promise(_0x44a162 => setTimeout(_0x44a162, _0x1d0c03));
		}

		['done'](_0x54dc28 = {}) {
			const _0x650adc = new Date().getTime(),
				_0x238f78 = (_0x650adc - this.startTime) / 1000;

			console.log('\n' + this.name + ' 运行结束，共运行了 ' + _0x238f78 + '！秒 '.split('').reverse().join(''));

			if (this.isSurge() || this.isQuanX() || this.isLoon()) {
				$done(_0x54dc28);
			}
		}
	})(_0x5f3350, _0x2b54ea);
}
