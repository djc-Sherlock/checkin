/*
高德打车签到
仅QX测试，其他自测
获取Cookie等信息方法 ，QX开重写，进入【高德地图，打车，福利中心】,如果没提醒，重新打开APP重新进入

自动签到 地图APP/微信小程序、支付宝小程序
由于不懂JS，代码是硬堆的，也不知道怎么弄，好在能跑起来，有懂的大佬可以帮优化下流程
青龙变量
export gdVal = '{"userId":"xx","adiu":"xx","adcode":"xx","bizVersion":"xx","Cookie":"xx","sessionid":"xx"}'
userId、adiu、adcode、bizVersion在响应body里，抓包搜query的请求。Cookie、sessionid在请求头里
======调试区|忽略======
# ^https:\/\/m5(-zb)?\.amap\.com\/ws\/yuece\/(act|openapi)\/(activity\/current\/)?query url script-response-body http://192.168.2.170:8080/ampDache.js
# https://m5-zb.amap.com/ws/yuece/act/query?  
# https://m5.amap.com/ws/yuece/act/query?
# https://m5.amap.com/ws/yuece/openapi/activity/current/query
======调试区|忽略======

====================================
[rewrite_local]
^https:\/\/m5(-zb)?\.amap\.com\/ws\/yuece\/(act|openapi)\/(activity\/current\/)?query url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/task/ampDache.js

[task_local]
1 0 * * * https://raw.githubusercontent.com/wf021325/qx/master/task/ampDache.js, tag=高德地图打车签到, enabled=true

[mitm]
hostname = *.amap.com
====================================
 */
//************抠的算法
function s(e,t){var n,r=4-(e.length%4);n=t?(0==(3&e.length)?e.length>>>2:1+(e.length>>>2)):e.length/4+1;for(var o=new Uint32Array(Math.floor(n)),i=(r<<24)+(r<<16)+(r<<8)+r,a=0;a<n;++a)o[a]=i;for(n=e.length,a=0;a<n;++a)(o[a>>>2]&=~(255<<((3&a)<<3))),(o[a>>>2]|=(255&e[a])<<((3&a)<<3));return o;}
function u(e,t,n,r,o,i){return(((n>>>5)^(t<<2))+((t>>>3)^(n<<4)))^((e^t)+(i[(3&r)^o]^n));}
function l(e){if(e.length<16){var t=new Uint8Array(16);t.set(e),(e=t);}
return e;}
function a(e,t){var n=e.length,r=n<<2;if(t){var o=e[n-1];if(o<(r-=4)-3||o>r)return null;r=o;}
for(var i=new Uint8Array(Math.floor(r)),a=0;a<r;++a)i[a]=e[a>>2]>>((3&a)<<3);return i;}
function c(e){for(var t=e.length,n=new Uint8Array(Math.floor(3*t+1)),r=0,o=0;o<t;o++){var i=e.charCodeAt(o);if(i<128)n[r++]=i;else if(i<2048)(n[r++]=192|(i>>6)),(n[r++]=128|(63&i));else{if(!(i<55296||i>57343)){if(o+1<t){var a=e.charCodeAt(o+1);if(i<56320&&56320<=a&&a<=57343){var s=65536+(((1023&i)<<10)|(1023&a));(n[r++]=240|(s>>18)),(n[r++]=128|((s>>12)&63)),(n[r++]=128|((s>>6)&63)),(n[r++]=128|(63&s)),o++;continue;}}
throw new Error('Malformed string');}
(n[r++]=224|(i>>12)),(n[r++]=128|((i>>6)&63)),(n[r++]=128|(63&i));}}
return n.subarray(0,r+1);}
function d(e,t){return('string'==typeof e&&(e=new Buffer(e,'base64')),'string'==typeof t&&(t=c(t)),null==e||0===e.length?e:a((function(e,t){var n,r,o,i,a,s=e.length,l=s-1;for(n=e[0],o=2654435769*Math.floor(6+52/s);0!==o;o-=2654435769){for(i=(o>>>2)&3,a=l;a>0;--a)(r=e[a-1]),(n=e[a]-=u(o,n,r,a,i,t));(r=e[l]),(n=e[0]-=u(o,n,r,a,i,t));}
return e;})(s(e,!0),s(l(t),!0)),!1));}
function f(e,t){return('string'==typeof e&&(e=c(e)),'string'==typeof t&&(t=c(t)),null==e||0===e.length?e:a((function(e,t){var n,r,o,i,a,s,l=e.length,c=l-1;for(r=e[c],o=0,s=0|Math.floor(6+52/l);s>0;--s){for(i=((o+=2654435769)>>>2)&3,a=0;a<c;++a)(n=e[a+1]),(r=e[a]+=u(o,n,r,a,i,t));(n=e[0]),(r=e[c]+=u(o,n,r,a,i,t));}
return e;})(s(e,!1),s(l(t),!1)),!1));}
var base64EncodeChars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';var base64DecodeChars=new Array(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1);function base64encode(str){var out,i,len;var c1,c2,c3;len=str.length;i=0;out='';while(i<len){c1=str.charCodeAt(i++)&0xff;if(i==len){out+=base64EncodeChars.charAt(c1>>2);out+=base64EncodeChars.charAt((c1&0x3)<<4);out+='==';break;}
c2=str.charCodeAt(i++);if(i==len){out+=base64EncodeChars.charAt(c1>>2);out+=base64EncodeChars.charAt(((c1&0x3)<<4)|((c2&0xf0)>>4));out+=base64EncodeChars.charAt((c2&0xf)<<2);out+='=';break;}
c3=str.charCodeAt(i++);out+=base64EncodeChars.charAt(c1>>2);out+=base64EncodeChars.charAt(((c1&0x3)<<4)|((c2&0xf0)>>4));out+=base64EncodeChars.charAt(((c2&0xf)<<2)|((c3&0xc0)>>6));out+=base64EncodeChars.charAt(c3&0x3f);}
return out;}
function base64decode(str){var c1,c2,c3,c4;var i,len,out;len=str.length;i=0;out='';while(i<len){do{c1=base64DecodeChars[str.charCodeAt(i++)&0xff];}while(i<len&&c1==-1);if(c1==-1)break;do{c2=base64DecodeChars[str.charCodeAt(i++)&0xff];}while(i<len&&c2==-1);if(c2==-1)break;out+=String.fromCharCode((c1<<2)|((c2&0x30)>>4));do{c3=str.charCodeAt(i++)&0xff;if(c3==61)return out;c3=base64DecodeChars[c3];}while(i<len&&c3==-1);if(c3==-1)break;out+=String.fromCharCode(((c2&0xf)<<4)|((c3&0x3c)>>2));do{c4=str.charCodeAt(i++)&0xff;if(c4==61)return out;c4=base64DecodeChars[c4];}while(i<len&&c4==-1);if(c4==-1)break;out+=String.fromCharCode(((c3&0x03)<<6)|c4);}
return out;}
function Json2Form(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.keys(t).sort().map(function(e){return''.concat(e,'=').concat(t[e]);}).join('&');}
function Encrypt_Body(t,e){return(function(t){for(var e='',n=new Uint8Array(t),r=n.byteLength,o=0;o<r;o++)e+=String.fromCharCode(n[o]);return base64encode(e);})(f(t,e));}
//************抠的算法

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const $ = new Env('高德地图签到');
const notify = $.isNode() ? require('./sendNotify') : ''; // 这里是 node（青龙属于node环境）通知相关的
const md5 = require('md5');
const NodeRSA = require('node-rsa');
const Notify = 1; //0为关闭通知，1为打开通知,默认为1
var publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC+8wDPpA9orgXJFrZZXjbETVpdaIlV26Auq46+V3olSimyQBpTfKEKKULcaA+cZ5oXUBZ7o1aDVj7IEadBKOH2eCDUydfJ9PABgLduW668s8jrbqQVM2vzMO6F2sW/23Wc4vas0Rez99OCWgqnEnIvmxQuM4lrKO0wcvX026ic2QIDAQAB';
pubKey = new NodeRSA(publicKey, 'pkcs8-public');
pubKey.setOptions({encryptionScheme: 'pkcs1'});
const gdVal = process.env.GD_Val || '';
var message = '',
	node = '',
	channel, adiu = '',
	userId = '',
	actID = '',
	playID = '',
	Cookie = '',
	sessionid = '',
	adcode = '',
	bizVersion = '';
!(async () => {
	if(gdVal) {
		let obj = JSON.parse(gdVal);
		userId = obj.userId;
		Cookie = obj.Cookie;
		sessionid = obj.sessionid;
		adiu = obj.adiu;
		adcode = obj.adcode;
		bizVersion = obj.bizVersion;
	}
	message += `----------微信小程序签到----------\n`;
	console.log(`----------微信小程序签到----------\n`);
	(node = 'wechatMP'), (channel = 'h5_common'), (actID = '4zRzeQUM8eb'), (playID = '4zRA5kwg75G');
	await checkIn();
	await signIn();

	message += `----------高德地图签到----------\n`;
	console.log(`----------高德地图签到----------\n`);
	(node = 'Amap'), (channel = 'h5_common'), (actID = '4yQc1Mt8nzJ'), (playID = '4yQcyzXdkYU');
	await checkIn();
	await signIn();
	message += `----------支付宝小程序签到----------\n`;
	console.log(`----------支付宝小程序签到----------\n`);
	(node = 'alipayMini'), (channel = 'alipay_mini'), (actID = '4zRAarAdbrf'), (playID = '4zRANYHwdgJ');
	await checkIn();
	await signIn();
	await SendMsg(message);
})()
.catch(e => {
		$.log('', `❌失败! 原因: ${e}!`, '');
	})
	.finally(() => {
		$.done();
	});

function getKey() {
	for(var t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678', n = t.length, r = '', i = 0; i < 16; i++) r += t.charAt(Math.floor(Math.random() * n));
	return r;
}

function getSign(channel) {
	const sign = channel + '@oEEln6dQJK7lRfGxQjlyGthZ4loXcRHR';
	return md5(sign)
		.toUpperCase();
}

function getQuery(adiu, channel, key, sign) {
	let xck = pubKey.encrypt(key, 'base64');
	let _in = {
		channel: channel,
		sign: sign
	};
	_in = Encrypt_Body(Json2Form(_in), key);
	let query = {
		adiu: adiu,
		node: 'wechatMP',
		env: 'prod',
		xck_channel: 'default',
		xck: encodeURIComponent(xck),
		in: encodeURIComponent(_in)
	};
	return Json2Form(query);
}

function getBody(body, key) {
	return Encrypt_Body(Json2Form(body), key);
}

function getHeaders(Cookie, sessionid) {
	return {
		'Content-Type': 'application/x-www-form-urlencoded',
		'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 amap/12.13.1.2034 AliApp(amap/12.13.1.2034) NetType/WiFi',
		Cookie: Cookie,
		sessionid: sessionid
	};
}

function getShowUrl(query) {
	return (url = 'https://m5.amap.com/ws/car-place/show?' + query);
}

function getSigUrl(query) {
	return (url = 'https://m5.amap.com/ws/alice/activity/daily_sign/do_sign?' + query);
}

function getShowBody(node, channel, adiu, userId, sign, actID, playIDs) {
	return {
		bizVersion: bizVersion,
		h5version: '6.35.14',
		platform: 'ios',
		tid: adiu,
		eId: '',
		adiu: adiu,
		diu: adiu,
		imei: adiu,
		idfa: adiu,
		enterprise: '0',
		ts: new Date()
			.getTime(),
		uid: userId,
		userId: userId,
		channel: channel,
		dip: '20020',
		adCode: '',
		actID: actID,
		playTypes: 'dailySign',
		playIDs: playIDs,
		node: node,
		sign: sign
	};
}

function getSigBody(node, channel, adiu, userId, sign, actID, playID, signTerm, signDay) {
	return {
		bizVersion: bizVersion,
		h5version: '6.35.14',
		platform: 'ios',
		tid: adiu,
		eId: '',
		adiu: adiu,
		diu: adiu,
		imei: adiu,
		idfa: adiu,
		enterprise: '0',
		ts: new Date()
			.getTime(),
		uid: userId,
		userId: userId,
		channel: channel,
		dip: '20020',
		actID: actID,
		playID: playID,
		signTerm: signTerm,
		signType: '1',
		signDay: signDay,
		adCode: '',
		node: node,
		div: '',
		sign: sign
	};
}

function checkIn() {
	return new Promise(resove => {
		key = getKey();
		sign = getSign(channel);
		query = getQuery(adiu, channel, key, sign);
		url = getShowUrl(query);
		body = getShowBody(node, channel, adiu, userId, sign, actID, playID);
		body = getBody(body, key);
		body = 'in=' + encodeURIComponent(body);
		headers = getHeaders(Cookie, sessionid);
		const rest = {
			url: url,
			body: body,
			headers: headers
		};
		$.post(rest, (err, resp, data) => {
			try {
				var obj = JSON.parse(data);
				if(obj?.code == '1') {
					obj.data.playMap.dailySign.signList.forEach(t => {
						if(t.date == $.time('MM月dd日')) {
							signTerm11 = obj.data.playMap.dailySign.signTerm;
							signDay11 = t.day;
							isSign = t.isSign; //isSign = 1 为签到过，懒得管了，让它再提交一次吧
							message += `查询:${t.date} isSign=${isSign}\n`;
							console.log(`查询:${t.date} isSign=${isSign}\n`);
						}
					});
				} else {
					message += `查询:${obj?.message}\n`;
					console.log(`查询:${obj?.message}\n`);
				}
			} catch (e) {
				$.logErr(e, '❌查询：请重新登陆更新Token');
				console.log(`❌查询：请重新登陆更新Token`);
			} finally {
				resove();
			}
		});
	});
}

function signIn() {
	return new Promise(resove => {
		key = getKey();
		sign = getSign(channel);
		query = getQuery(adiu, channel, key, sign);
		url = getSigUrl(query);
		body = getSigBody(node, channel, adiu, userId, sign, actID, playID, signTerm11, signDay11);
		body = getBody(body, key);
		body = 'in=' + encodeURIComponent(body);
		headers = getHeaders(Cookie, sessionid);
		const rest = {
			url: url,
			body: body,
			headers: headers
		};
		$.post(rest, (err, resp, data) => {
			try {
				//console.log(data)
				var obj = JSON.parse(data);
				if(obj?.code == '1') {
					message += `签到:签到成功\n`;
					console.log(`签到:签到成功\n`);
				} else {
					message += `签到:${obj?.message}\n`;
					console.log(`签到:${obj?.message}\n`);
				}
			} catch (e) {
				$.logErr(e, '❌请重新登陆更新Token');
				console.log('❌请重新登陆更新Token');
			} finally {
				resove();
			}
		});
	});
}
async function SendMsg(message) {
	if(!message) return;

	if(Notify > 0) {
		if($.isNode()) {
			var notify = require('./sendNotify');
			await notify.sendNotify($.name, message);
		} else {
			$.msg(message);
		}
	} else {
		console.log(message);
	}
}
//************ENV
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,a)=>{s.call(this,t,(t,s,r)=>{t?a(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}getEnv(){return"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":void 0}isNode(){return"Node.js"===this.getEnv()}isQuanX(){return"Quantumult X"===this.getEnv()}isSurge(){return"Surge"===this.getEnv()}isLoon(){return"Loon"===this.getEnv()}isShadowrocket(){return"Shadowrocket"===this.getEnv()}isStash(){return"Stash"===this.getEnv()}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const a=this.getdata(t);if(a)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,a)=>e(a))})}runScript(t,e){return new Promise(s=>{let a=this.getdata("@chavy_boxjs_userCfgs.httpapi");a=a?a.replace(/\n/g,"").trim():a;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[i,o]=a.split("@"),n={url:`http://${o}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":i,Accept:"*/*"},timeout:r};this.post(n,(t,e,a)=>s(a))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),a=!s&&this.fs.existsSync(e);if(!s&&!a)return{};{const a=s?t:e;try{return JSON.parse(this.fs.readFileSync(a))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),a=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):a?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const a=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of a)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,a)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[a+1])>>0==+e[a+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,a]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,a,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,a,r]=/^@(.*?)\.(.*?)$/.exec(e),i=this.getval(a),o=a?"null"===i?null:i||"{}":"{}";try{const e=JSON.parse(o);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),a)}catch(e){const i={};this.lodash_set(i,r,t),s=this.setval(JSON.stringify(i),a)}}else s=this.setval(t,e);return s}getval(t){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.read(t);case"Quantumult X":return $prefs.valueForKey(t);case"Node.js":return this.data=this.loaddata(),this.data[t];default:return this.data&&this.data[t]||null}}setval(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.write(t,e);case"Quantumult X":return $prefs.setValueForKey(t,e);case"Node.js":return this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0;default:return this.data&&this.data[e]||null}}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){switch(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"],delete t.headers["content-type"],delete t.headers["content-length"]),t.params&&(t.url+="?"+this.queryStr(t.params)),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,a)=>{!t&&s&&(s.body=a,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,a)});break;case"Quantumult X":this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:a,headers:r,body:i,bodyBytes:o}=t;e(null,{status:s,statusCode:a,headers:r,body:i,bodyBytes:o},i,o)},t=>e(t&&t.error||"UndefinedError"));break;case"Node.js":let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:a,statusCode:r,headers:i,rawBody:o}=t,n=s.decode(o,this.encoding);e(null,{status:a,statusCode:r,headers:i,rawBody:o,body:n},n)},t=>{const{message:a,response:r}=t;e(a,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";switch(t.body&&t.headers&&!t.headers["Content-Type"]&&!t.headers["content-type"]&&(t.headers["content-type"]="application/x-www-form-urlencoded"),t.headers&&(delete t.headers["Content-Length"],delete t.headers["content-length"]),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,a)=>{!t&&s&&(s.body=a,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,a)});break;case"Quantumult X":t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:a,headers:r,body:i,bodyBytes:o}=t;e(null,{status:s,statusCode:a,headers:r,body:i,bodyBytes:o},i,o)},t=>e(t&&t.error||"UndefinedError"));break;case"Node.js":let a=require("iconv-lite");this.initGotEnv(t);const{url:r,...i}=t;this.got[s](r,i).then(t=>{const{statusCode:s,statusCode:r,headers:i,rawBody:o}=t,n=a.decode(o,this.encoding);e(null,{status:s,statusCode:r,headers:i,rawBody:o,body:n},n)},t=>{const{message:s,response:r}=t;e(s,r,r&&a.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let a={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in a)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?a[e]:("00"+a[e]).substr((""+a[e]).length)));return t}queryStr(t){let e="";for(const s in t){let a=t[s];null!=a&&""!==a&&("object"==typeof a&&(a=JSON.stringify(a)),e+=`${s}=${a}&`)}return e=e.substring(0,e.length-1),e}msg(e=t,s="",a="",r){const i=t=>{switch(typeof t){case void 0:return t;case"string":switch(this.getEnv()){case"Surge":case"Stash":default:return{url:t};case"Loon":case"Shadowrocket":return t;case"Quantumult X":return{"open-url":t};case"Node.js":return}case"object":switch(this.getEnv()){case"Surge":case"Stash":case"Shadowrocket":default:{let e=t.url||t.openUrl||t["open-url"];return{url:e}}case"Loon":{let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}case"Quantumult X":{let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,a=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":a}}case"Node.js":return}default:return}};if(!this.isMute)switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:$notification.post(e,s,a,i(r));break;case"Quantumult X":$notify(e,s,a,i(r));break;case"Node.js":}if(!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),a&&t.push(a),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:this.log("",`❗️${this.name}, 错误!`,t);break;case"Node.js":this.log("",`❗️${this.name}, 错误!`,t.stack)}}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;switch(this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:$done(t);break;case"Node.js":process.exit(1)}}}(t,e)}
