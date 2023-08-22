/*
天瑞地安抽奖 v1.01

每天跑一两次, 自动抽奖, 周末时候自己手动去提现

天瑞地安APP-首页滚动条-看新闻天天抢红包
捉 https://guess.rabtv.cn/v1/user/init 请求体里面的account_id参数, 填到变量 trdaCookie 里面, 多账号换行隔开
export trdaCookie="b517291864db6d4ceb8ab3e33"

cron: 46 6,18 * * *
const $ = new Env("天瑞地安抽奖");
*/
const _0x22f8e3 = _0x253ba2("天瑞地安抽奖"),
      _0xc0dac9 = require("got"),
      _0x4c9a2f = "trda",
      _0x26865a = /[\n\&\@]/,
      _0x17802f = [_0x4c9a2f + "Cookie"],
      _0x406d42 = 20000,
      _0x2431ca = 3;

const _0x328e4e = 1.01,
      _0x25b767 = "trda",
      _0x993c = "https://leafxcy.coding.net/api/user/leafxcy/project/validcode/shared-depot/validCode/git/blob/master/code.json",
      _0x5cb027 = "Mozilla/5.0 (iPhone; CPU iPhone OS 16_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;;xsb;xsb_ruian;1.2.1;Appstore;native_app",
      _0x46800f = "https://app.rabtv.cn/",
      _0x1a5cc3 = "https://app.rabtv.cn",
      _0x82b4d5 = 5;

class _0x1288d3 {
  constructor() {
    this.index = _0x22f8e3.userIdx++;
    this.name = "";
    this.valid = false;
    const _0x1e2e11 = {
      "limit": 0
    };
    const _0x20315d = {
      "Connection": "keep-alive"
    };
    const _0x5b0d16 = {
      "retry": _0x1e2e11,
      "timeout": _0x406d42,
      "followRedirect": false,
      "headers": _0x20315d
    };
    this.got = _0xc0dac9.extend(_0x5b0d16);
  }

  ["log"](_0x3bb97e, _0x24be10 = {}) {
    var _0x1ba486 = "",
        _0x10b375 = _0x22f8e3.userCount.toString().length;

    if (this.index) {
      _0x1ba486 += "账号[" + _0x22f8e3.padStr(this.index, _0x10b375) + "]";
    }

    if (this.name) {
      _0x1ba486 += "[" + this.name + "]";
    }

    _0x22f8e3.log(_0x1ba486 + _0x3bb97e, _0x24be10);
  }

  async ["request"](_0x375c3e) {
    const _0x277a72 = ["ECONNRESET", "EADDRINUSE", "ENOTFOUND", "EAI_AGAIN"],
          _0x1a6372 = ["TimeoutError"];

    var _0x154110 = null,
        _0x384247 = 0,
        _0x19a927 = _0x375c3e.fn || _0x375c3e.url;

    _0x375c3e.method = _0x375c3e?.["method"]?.["toUpperCase"]() || "GET";

    let _0x36ed57;

    while (_0x384247 < _0x2431ca) {
      try {
        _0x384247++;
        _0x36ed57 = null;

        let _0xd252da = null,
            _0x2f88c3 = _0x375c3e?.["timeout"] || this.got?.["defaults"]?.["options"]?.["timeout"]?.["request"] || _0x406d42,
            _0x43e366 = false;

        await new Promise(async _0x21c7b2 => {
          setTimeout(() => {
            _0x43e366 = true;

            _0x21c7b2();
          }, _0x2f88c3);
          await this.got(_0x375c3e).then(_0xc117dc => {
            _0x154110 = _0xc117dc;
          }, _0xa8ce18 => {
            _0xd252da = _0xa8ce18;
            _0x154110 = _0xa8ce18.response;
            _0x36ed57 = _0xd252da?.["code"];
          });

          _0x21c7b2();
        });

        if (_0x43e366) {
          this.log("[" + _0x19a927 + "]请求超时(" + _0x2f88c3 / 1000 + "秒)，重试第" + _0x384247 + "次");
        } else {
          if (_0x1a6372.includes(_0xd252da?.["name"])) {
            this.log("[" + _0x19a927 + "]请求超时(" + _0xd252da.code + ")，重试第" + _0x384247 + "次");
          } else {
            if (_0x277a72.includes(_0xd252da?.["code"])) {
              this.log("[" + _0x19a927 + "]请求错误(" + _0xd252da.code + ")，重试第" + _0x384247 + "次");
            } else {
              let _0x3bc2df = _0x154110?.["statusCode"] || 999,
                  _0x4a377d = _0x3bc2df / 100 | 0;

              if (_0x4a377d > 3) {
                this.log("请求[" + _0x19a927 + "]返回[" + _0x3bc2df + "]");
              }

              if (_0x4a377d <= 4) {
                break;
              }
            }
          }
        }
      } catch (_0x2ace8a) {
        _0x2ace8a.name == "TimeoutError" ? this.log("[" + _0x19a927 + "]请求超时，重试第" + _0x384247 + "次") : this.log("[" + _0x19a927 + "]请求错误(" + _0x2ace8a.message + ")，重试第" + _0x384247 + "次");
      }
    }

    if (_0x154110 == null) {
      return Promise.resolve({
        "statusCode": _0x36ed57 || -1,
        "headers": null,
        "result": null
      });
    }

    let {
      statusCode: _0x3362d0,
      headers: _0x1dc4b6,
      body: _0x24f78f
    } = _0x154110;

    if (_0x24f78f) {
      try {
        _0x24f78f = JSON.parse(_0x24f78f);
      } catch {}
    }

    const _0x1d80ad = {
      "statusCode": _0x3362d0,
      "headers": _0x1dc4b6,
      "result": _0x24f78f
    };
    return Promise.resolve(_0x1d80ad);
  }

}

let _0x52b363 = new _0x1288d3();

class _0x4f2d07 extends _0x1288d3 {
  constructor(_0x3a07bb) {
    super();
    this.account_id = _0x3a07bb;
    const _0x10eef6 = {
      "User-Agent": _0x5cb027,
      "Referer": _0x46800f,
      "Origin": _0x1a5cc3
    };
    const _0x46cbe3 = {
      "headers": _0x10eef6
    };
    this.got = this.got.extend(_0x46cbe3);
  }

  async ["user_init"](_0x2fda18 = {}) {
    let _0x595d36 = false;

    try {
      const _0x36a51f = {
        "account_id": this.account_id
      };
      const _0x1d6df4 = {
        "fn": "user_init",
        "method": "post",
        "url": "https://guess.rabtv.cn/v1/user/init",
        "form": _0x36a51f
      };

      let {
        result: _0x319c4a,
        statusCode: _0x1b23b3
      } = await this.request(_0x1d6df4),
          _0x459b19 = _0x22f8e3.get(_0x319c4a, "code", _0x1b23b3);

      if (_0x319c4a?.["done"]) {
        this.valid = true;
        _0x595d36 = true;
        let {
          access_token: _0x317402,
          mobile: _0xd6023c
        } = _0x319c4a?.["data"];
        this.access_token = _0x317402;
        this.name = _0xd6023c;
        this.got = this.got.extend({
          "headers": {
            "Authorization": "Bearer " + _0x317402
          }
        });
        this.log("登录成功");
      } else {
        let _0x3bd55c = _0x22f8e3.get(_0x319c4a, "msg", "");

        this.log("登录失败[" + _0x459b19 + "]: " + _0x3bd55c);
      }
    } catch (_0x2adce1) {
      console.log(_0x2adce1);
    } finally {
      return _0x595d36;
    }
  }

  async ["task_current"](_0xadf38a = {}) {
    try {
      const _0x22eaf8 = {
        "fn": "task_current",
        "method": "get",
        "url": "https://guess.rabtv.cn/v1/task/current"
      };

      let {
        result: _0x48fd1d,
        statusCode: _0x54e17d
      } = await this.request(_0x22eaf8),
          _0x37f6af = _0x22f8e3.get(_0x48fd1d, "code", _0x54e17d);

      if (_0x37f6af == 200) {
        for (let _0xf67344 of _0x48fd1d?.["data"] || []) {
          _0xf67344.result == "done" ? _0x22f8e3.log("抽奖" + _0xf67344.id + " -- 已完成") : (await _0x22f8e3.wait(2000), await this.task_do(_0xf67344));
        }
      } else {
        let _0x4c1fcf = _0x22f8e3.get(_0x48fd1d, "msg", "");

        this.log("获取任务列表失败[" + _0x37f6af + "]: " + _0x4c1fcf);
      }
    } catch (_0x1b3eaf) {
      console.log(_0x1b3eaf);
    }
  }

  async ["task_do"](_0x9ed447, _0x224f9a = {}) {
    try {
      const _0x3420d7 = {
        "id": _0x9ed447.id
      };
      const _0x538f1c = {
        "fn": "task_do",
        "method": "post",
        "url": "https://guess.rabtv.cn/v1/task/do",
        "form": _0x3420d7
      };

      let {
        result: _0x507f50,
        statusCode: _0x3ae5ce
      } = await this.request(_0x538f1c),
          _0x4a0b72 = _0x22f8e3.get(_0x507f50, "code", _0x3ae5ce);

      if (_0x507f50?.["done"]) {
        const _0x3c04ec = {
          "notify": true
        };
        this.log("抽奖" + _0x9ed447.id + ": " + (_0x507f50?.["v"] || 0) + "元", _0x3c04ec);
      } else {
        let _0x512b35 = _0x22f8e3.get(_0x507f50, "msg", "");

        this.log("抽奖" + _0x9ed447.id + "失败[" + _0x4a0b72 + "]: " + _0x512b35);
      }
    } catch (_0x14c96b) {
      console.log(_0x14c96b);
    }
  }

  async ["task_information"](_0x1a39f0 = {}) {
    try {
      const _0x4c9448 = {
        "fn": "task_information",
        "method": "get",
        "url": "https://guess.rabtv.cn/v1/user/information"
      };

      let {
        result: _0x30e3a1,
        statusCode: _0x6bca91
      } = await this.request(_0x4c9448),
          _0x3856cd = _0x22f8e3.get(_0x30e3a1, "code", _0x6bca91);

      if (_0x3856cd == 200) {
        const _0x3e5dd2 = {
          "notify": true
        };
        this.log("余额: " + (_0x30e3a1?.["data"]?.["money"] || 0) + "元", _0x3e5dd2);
      } else {
        let _0x4cd106 = _0x22f8e3.get(_0x30e3a1, "msg", "");

        this.log("查询余额失败[" + _0x3856cd + "]: " + _0x4cd106);
      }
    } catch (_0x4a4562) {
      console.log(_0x4a4562);
    }
  }

  async ["userTask"](_0x12cb9a = {}) {
    if (!(await this.user_init())) {
      return;
    }

    await this.task_current();
    await this.task_information();
  }

}

!(async () => {
  if (!(await _0x28390a())) {
    return;
  }

  _0x22f8e3.read_env(_0x4f2d07);

  for (let _0x324874 of _0x22f8e3.userList) {
    await _0x324874.userTask();

    let _0x49368e = Math.floor(Math.random() * 10000) + 5000;

    _0x324874.log("随机等待" + _0x49368e / 1000 + "秒...");

    await _0x22f8e3.wait(_0x49368e);
  }
})().catch(_0x151903 => _0x22f8e3.log(_0x151903)).finally(() => _0x22f8e3.exitNow());

async function _0x28390a(_0x267180 = 0) {
  let _0x56a7a4 = false;

  try {
    const _0x2b2407 = {
      "fn": "auth",
      "method": "get",
      "url": _0x993c,
      "timeout": 20000
    };
    let {
      statusCode: _0x576f96,
      result: _0x1e386c
    } = await _0x52b363.request(_0x2b2407);

    if (_0x576f96 != 200) {
      _0x267180++ < _0x82b4d5 && (_0x56a7a4 = await _0x28390a(_0x267180));
      return _0x56a7a4;
    }

    if (_0x1e386c?.["code"] == 0) {
      _0x1e386c = JSON.parse(_0x1e386c.data.file.data);

      if (_0x1e386c?.["commonNotify"] && _0x1e386c.commonNotify.length > 0) {
        const _0x296177 = {
          "notify": true
        };


      }



      if (_0x1e386c[_0x25b767]) {
        let _0x52a8a6 = _0x1e386c[_0x25b767];
        _0x52a8a6.status == 0 ? _0x328e4e >= _0x52a8a6.version ? (_0x56a7a4 = true, _0x22f8e3.log(_0x52a8a6.msg[_0x52a8a6.status]), _0x22f8e3.log(_0x52a8a6.updateMsg), _0x22f8e3.log("现在运行的脚本版本是：" + _0x328e4e + "，最新脚本版本：" + _0x52a8a6.latestVersion)) : _0x22f8e3.log(_0x52a8a6.versionMsg) : _0x22f8e3.log(_0x52a8a6.msg[_0x52a8a6.status]);
      } else {
        _0x22f8e3.log(_0x1e386c.errorMsg);
      }
    } else {
      _0x267180++ < _0x82b4d5 && (_0x56a7a4 = await _0x28390a(_0x267180));
    }
  } catch (_0x2a79ee) {
    _0x22f8e3.log(_0x2a79ee);
  } finally {
    return _0x56a7a4;
  }
}

function _0x253ba2(_0x527db8) {
  return new class {
    constructor(_0x443fdc) {
      this.name = _0x443fdc;
      this.startTime = Date.now();
      const _0x3190f8 = {
        "time": true
      };
      this.log("[" + this.name + "]开始运行\n", _0x3190f8);
      this.notifyStr = [];
      this.notifyFlag = true;
      this.userIdx = 0;
      this.userList = [];
      this.userCount = 0;
      this.default_timestamp_len = 13;
      this.default_wait_interval = 1000;
      this.default_wait_limit = 3600000;
      this.default_wait_ahead = 0;
    }

    ["log"](_0x2d425b, _0x39231a = {}) {
      const _0x376aa7 = {
        "console": true
      };
      Object.assign(_0x376aa7, _0x39231a);

      if (_0x376aa7.time) {
        let _0x452c67 = _0x376aa7.fmt || "hh:mm:ss";

        _0x2d425b = "[" + this.time(_0x452c67) + "]" + _0x2d425b;
      }

      if (_0x376aa7.notify) {
        this.notifyStr.push(_0x2d425b);
      }

      if (_0x376aa7.console) {
        console.log(_0x2d425b);
      }
    }

    ["get"](_0x5759a7, _0x34087a, _0x4df08e = "") {
      let _0x2584ff = _0x4df08e;
      _0x5759a7?.["hasOwnProperty"](_0x34087a) && (_0x2584ff = _0x5759a7[_0x34087a]);
      return _0x2584ff;
    }

    ["pop"](_0x3a7456, _0x34a5c8, _0x29881a = "") {
      let _0x4d815b = _0x29881a;
      _0x3a7456?.["hasOwnProperty"](_0x34a5c8) && (_0x4d815b = _0x3a7456[_0x34a5c8], delete _0x3a7456[_0x34a5c8]);
      return _0x4d815b;
    }

    ["copy"](_0x5d3938) {
      return Object.assign({}, _0x5d3938);
    }

    ["read_env"](_0x302f10) {
      let _0x271aec = _0x17802f.map(_0x5380ce => process.env[_0x5380ce]);

      for (let _0x1be184 of _0x271aec.filter(_0x3df740 => !!_0x3df740)) {
        for (let _0xa417a2 of _0x1be184.split(_0x26865a).filter(_0x5e7544 => !!_0x5e7544)) {
          if (this.userList.includes(_0xa417a2)) {
            continue;
          }

          this.userList.push(new _0x302f10(_0xa417a2));
        }
      }

      this.userCount = this.userList.length;

      if (!this.userCount) {
        const _0x77c72c = {
          "notify": true
        };
        this.log("未找到变量，请检查变量" + _0x17802f.map(_0x129783 => "[" + _0x129783 + "]").join("或"), _0x77c72c);
        return false;
      }

      this.log("共找到" + this.userCount + "个账号");
      return true;
    }

    ["time"](_0x14fb7a, _0x440d45 = null) {
      let _0x405d56 = _0x440d45 ? new Date(_0x440d45) : new Date(),
          _0x1899ca = {
        "M+": _0x405d56.getMonth() + 1,
        "d+": _0x405d56.getDate(),
        "h+": _0x405d56.getHours(),
        "m+": _0x405d56.getMinutes(),
        "s+": _0x405d56.getSeconds(),
        "q+": Math.floor((_0x405d56.getMonth() + 3) / 3),
        "S": this.padStr(_0x405d56.getMilliseconds(), 3)
      };

      /(y+)/.test(_0x14fb7a) && (_0x14fb7a = _0x14fb7a.replace(RegExp.$1, (_0x405d56.getFullYear() + "").substr(4 - RegExp.$1.length)));

      for (let _0x4312b9 in _0x1899ca) new RegExp("(" + _0x4312b9 + ")").test(_0x14fb7a) && (_0x14fb7a = _0x14fb7a.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x1899ca[_0x4312b9] : ("00" + _0x1899ca[_0x4312b9]).substr(("" + _0x1899ca[_0x4312b9]).length)));

      return _0x14fb7a;
    }

    async ["showmsg"]() {
      if (!this.notifyFlag) {
        return;
      }

      if (!this.notifyStr.length) {
        return;
      }

      var _0x30eb22 = require("./sendNotify");

      this.log("\n============== 推送 ==============");
      await _0x30eb22.sendNotify(this.name, this.notifyStr.join("\n"));
    }

    ["padStr"](_0x13b391, _0x41f084, _0x238030 = {}) {
      let _0x333c9b = _0x238030.padding || "0",
          _0x7bc3c6 = _0x238030.mode || "l",
          _0x1a5f23 = String(_0x13b391),
          _0x4a2a49 = _0x41f084 > _0x1a5f23.length ? _0x41f084 - _0x1a5f23.length : 0,
          _0xfb4719 = "";

      for (let _0x2b3363 = 0; _0x2b3363 < _0x4a2a49; _0x2b3363++) {
        _0xfb4719 += _0x333c9b;
      }

      _0x7bc3c6 == "r" ? _0x1a5f23 = _0x1a5f23 + _0xfb4719 : _0x1a5f23 = _0xfb4719 + _0x1a5f23;
      return _0x1a5f23;
    }

    ["json2str"](_0x453a15, _0x5d4253, _0x444546 = false) {
      let _0x38c9f7 = [];

      for (let _0x14ffb3 of Object.keys(_0x453a15).sort()) {
        let _0x40c72b = _0x453a15[_0x14ffb3];

        if (_0x40c72b && _0x444546) {
          _0x40c72b = encodeURIComponent(_0x40c72b);
        }

        _0x38c9f7.push(_0x14ffb3 + "=" + _0x40c72b);
      }

      return _0x38c9f7.join(_0x5d4253);
    }

    ["str2json"](_0x602e4a, _0x67204b = false) {
      let _0x2f2f02 = {};

      for (let _0x26bbcd of _0x602e4a.split("&")) {
        if (!_0x26bbcd) {
          continue;
        }

        let _0x426bdd = _0x26bbcd.indexOf("=");

        if (_0x426bdd == -1) {
          continue;
        }

        let _0x112828 = _0x26bbcd.substr(0, _0x426bdd),
            _0x4dcaf7 = _0x26bbcd.substr(_0x426bdd + 1);

        if (_0x67204b) {
          _0x4dcaf7 = decodeURIComponent(_0x4dcaf7);
        }

        _0x2f2f02[_0x112828] = _0x4dcaf7;
      }

      return _0x2f2f02;
    }

    ["randomPattern"](_0x2ec3fe, _0x381809 = "abcdef0123456789") {
      let _0x45eea7 = "";

      for (let _0x2e9498 of _0x2ec3fe) {
        if (_0x2e9498 == "x") {
          _0x45eea7 += _0x381809.charAt(Math.floor(Math.random() * _0x381809.length));
        } else {
          _0x2e9498 == "X" ? _0x45eea7 += _0x381809.charAt(Math.floor(Math.random() * _0x381809.length)).toUpperCase() : _0x45eea7 += _0x2e9498;
        }
      }

      return _0x45eea7;
    }

    ["randomUuid"]() {
      return this.randomPattern("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");
    }

    ["randomString"](_0x5cbd12, _0x54e002 = "abcdef0123456789") {
      let _0x12d1d5 = "";

      for (let _0x2e304f = 0; _0x2e304f < _0x5cbd12; _0x2e304f++) {
        _0x12d1d5 += _0x54e002.charAt(Math.floor(Math.random() * _0x54e002.length));
      }

      return _0x12d1d5;
    }

    ["randomList"](_0x7b5af2) {
      let _0x23d0e3 = Math.floor(Math.random() * _0x7b5af2.length);

      return _0x7b5af2[_0x23d0e3];
    }

    ["wait"](_0x277032) {
      return new Promise(_0x3d8872 => setTimeout(_0x3d8872, _0x277032));
    }

    async ["exitNow"]() {
      await this.showmsg();

      let _0x22623b = Date.now(),
          _0x4fafde = (_0x22623b - this.startTime) / 1000;

      this.log("");
      const _0x48385e = {
        "time": true
      };
      this.log("[" + this.name + "]运行结束，共运行了" + _0x4fafde + "秒", _0x48385e);
      process.exit(0);
    }

    ["normalize_time"](_0x37a7e0, _0x30f3d5 = {}) {
      let _0x54fc2d = _0x30f3d5.len || this.default_timestamp_len;

      _0x37a7e0 = _0x37a7e0.toString();
      let _0x337c07 = _0x37a7e0.length;

      while (_0x337c07 < _0x54fc2d) {
        _0x37a7e0 += "0";
      }

      _0x337c07 > _0x54fc2d && (_0x37a7e0 = _0x37a7e0.slice(0, 13));
      return parseInt(_0x37a7e0);
    }

    async ["wait_until"](_0x2f2a81, _0x43a553 = {}) {
      let _0x555ad2 = _0x43a553.logger || this,
          _0x5edb97 = _0x43a553.interval || this.default_wait_interval,
          _0x41e00c = _0x43a553.limit || this.default_wait_limit,
          _0x64f97a = _0x43a553.ahead || this.default_wait_ahead;

      if (typeof _0x2f2a81 == "string" && _0x2f2a81.includes(":")) {
        if (_0x2f2a81.includes("-")) {
          _0x2f2a81 = new Date(_0x2f2a81).getTime();
        } else {
          let _0x2b39a4 = this.time("yyyy-MM-dd ");

          _0x2f2a81 = new Date(_0x2b39a4 + _0x2f2a81).getTime();
        }
      }

      let _0x5696da = this.normalize_time(_0x2f2a81) - _0x64f97a,
          _0x4c248 = this.time("hh:mm:ss.S", _0x5696da),
          _0x2f5b53 = Date.now();

      _0x2f5b53 > _0x5696da && (_0x5696da += 86400000);

      let _0x5045b2 = _0x5696da - _0x2f5b53;

      if (_0x5045b2 > _0x41e00c) {
        const _0x2e5945 = {
          "time": true
        };

        _0x555ad2.log("离目标时间[" + _0x4c248 + "]大于" + _0x41e00c / 1000 + "秒,不等待", _0x2e5945);
      } else {
        const _0x53dee0 = {
          "time": true
        };

        _0x555ad2.log("离目标时间[" + _0x4c248 + "]还有" + _0x5045b2 / 1000 + "秒,开始等待", _0x53dee0);

        while (_0x5045b2 > 0) {
          let _0x2f0244 = Math.min(_0x5045b2, _0x5edb97);

          await this.wait(_0x2f0244);
          _0x2f5b53 = Date.now();
          _0x5045b2 = _0x5696da - _0x2f5b53;
        }

        const _0x53a33a = {
          "time": true
        };

        _0x555ad2.log("已完成等待", _0x53a33a);
      }
    }

    async ["wait_gap_interval"](_0x26cc94, _0x2a0aa8) {
      let _0x5f4a80 = Date.now() - _0x26cc94;

      _0x5f4a80 < _0x2a0aa8 && (await this.wait(_0x2a0aa8 - _0x5f4a80));
    }

  }(_0x527db8);
}
