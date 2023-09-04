/*
霸王茶姬 v1.01

微信小程序-霸王茶姬
只有签到得积分, 每天跑一两次就行
积分可以换券

授权注册后, 捉 webapi.qmai.cn 域名请求头里面的 Qm-User-Token, 填到变量 bwcjCookie 里面
多账号换行或@或&隔开
export bwcjCookie="H3is33xad2xxxxxxxxxxxxxxxxxx"

cron: 46 8,20 * * *
const $ = new Env("霸王茶姬");
*/
const _0x5b9b40 = _0x584c9b("霸王茶姬"),
      _0x2e9bfb = require("got"),
      _0x51608e = "bwcj",
      _0x2808e6 = /[\n\&\@]/,
      _0x1df3fe = [_0x51608e + "Cookie"],
      _0x44b7ac = 20000,
      _0xf6f71a = 3;

const _0x12fd02 = 1.01,
      _0x1de1e1 = "bwcj",
      _0x8d156c = "https://leafxcy.coding.net/api/user/leafxcy/project/validcode/shared-depot/validCode/git/blob/master/code.json",
      _0x36b563 = "https://leafxcy.coding.net/api/user/leafxcy/project/validcode/shared-depot/validCode/git/blob/master/" + _0x1de1e1 + ".json",
      _0x36120b = "Mozilla/5.0 (iPhone; CPU iPhone OS 16_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.40(0x18002831) NetType/WIFI Language/zh_CN",
      _0x2bc106 = "https://servicewechat.com/wxafec6f8422cb357b/87/page-frame.html",
      _0x437572 = "wxafec6f8422cb357b",
      _0x403e65 = 5;

class _0x29e3c5 {
  constructor() {
    this.index = _0x5b9b40.userIdx++;
    this.name = "";
    this.valid = false;
    const _0x2f7861 = {
      "limit": 0
    };
    const _0x256a1a = {
      "Connection": "keep-alive"
    };
    const _0x2c22be = {
      "retry": _0x2f7861,
      "timeout": _0x44b7ac,
      "followRedirect": false,
      "headers": _0x256a1a
    };
    this.got = _0x2e9bfb.extend(_0x2c22be);
  }

  ["log"](_0x4d2d9e, _0xc57afc = {}) {
    var _0x2fda9d = "",
        _0x20d34d = _0x5b9b40.userCount.toString().length;

    if (this.index) {
      _0x2fda9d += "账号[" + _0x5b9b40.padStr(this.index, _0x20d34d) + "]";
    }

    if (this.name) {
      _0x2fda9d += "[" + this.name + "]";
    }

    _0x5b9b40.log(_0x2fda9d + _0x4d2d9e, _0xc57afc);
  }

  async ["request"](_0x3ac25e) {
    const _0x5ffd8c = ["ECONNRESET", "EADDRINUSE", "ENOTFOUND", "EAI_AGAIN"],
          _0x4e23b1 = ["TimeoutError"];

    var _0x3988ac = null,
        _0x443799 = 0,
        _0x28607e = _0x3ac25e.fn || _0x3ac25e.url;

    _0x3ac25e.method = _0x3ac25e?.["method"]?.["toUpperCase"]() || "GET";

    let _0x2f0974;

    while (_0x443799 < _0xf6f71a) {
      try {
        _0x443799++;
        _0x2f0974 = null;

        let _0x1308db = null,
            _0x28111f = _0x3ac25e?.["timeout"] || this.got?.["defaults"]?.["options"]?.["timeout"]?.["request"] || _0x44b7ac,
            _0xfa7411 = false;

        await new Promise(async _0x3ea900 => {
          setTimeout(() => {
            _0xfa7411 = true;

            _0x3ea900();
          }, _0x28111f);
          await this.got(_0x3ac25e).then(_0x472fe2 => {
            _0x3988ac = _0x472fe2;
          }, _0x6a7e3c => {
            _0x1308db = _0x6a7e3c;
            _0x3988ac = _0x6a7e3c.response;
            _0x2f0974 = _0x1308db?.["code"];
          });

          _0x3ea900();
        });

        if (_0xfa7411) {
          this.log("[" + _0x28607e + "]请求超时(" + _0x28111f / 1000 + "秒)，重试第" + _0x443799 + "次");
        } else {
          if (_0x4e23b1.includes(_0x1308db?.["name"])) {
            this.log("[" + _0x28607e + "]请求超时(" + _0x1308db.code + ")，重试第" + _0x443799 + "次");
          } else {
            if (_0x5ffd8c.includes(_0x1308db?.["code"])) {
              this.log("[" + _0x28607e + "]请求错误(" + _0x1308db.code + ")，重试第" + _0x443799 + "次");
            } else {
              let _0x31d260 = _0x3988ac?.["statusCode"] || 999,
                  _0xaf9a81 = _0x31d260 / 100 | 0;

              if (_0xaf9a81 > 3) {
                this.log("请求[" + _0x28607e + "]返回[" + _0x31d260 + "]");
              }

              if (_0xaf9a81 <= 4) {
                break;
              }
            }
          }
        }
      } catch (_0x470f4e) {
        _0x470f4e.name == "TimeoutError" ? this.log("[" + _0x28607e + "]请求超时，重试第" + _0x443799 + "次") : this.log("[" + _0x28607e + "]请求错误(" + _0x470f4e.message + ")，重试第" + _0x443799 + "次");
      }
    }

    const _0x534df9 = {
      "statusCode": _0x2f0974 || -1,
      "headers": null,
      "result": null
    };

    if (_0x3988ac == null) {
      return Promise.resolve(_0x534df9);
    }

    let {
      statusCode: _0x1b5df3,
      headers: _0x17efbf,
      body: _0x4ef21b
    } = _0x3988ac;

    if (_0x4ef21b) {
      try {
        _0x4ef21b = JSON.parse(_0x4ef21b);
      } catch {}
    }

    const _0x238679 = {
      "statusCode": _0x1b5df3,
      "headers": _0x17efbf,
      "result": _0x4ef21b
    };
    return Promise.resolve(_0x238679);
  }

}

let _0x287bbf = new _0x29e3c5();

class _0x46e11a extends _0x29e3c5 {
  constructor(_0x15b673) {
    super();
    this.token = _0x15b673;
    this.got = this.got.extend({
      "cookieJar": this.cookieJar,
      "headers": {
        "User-Agent": _0x36120b,
        "work-wechat-userid": "",
        "multi-store-id": "",
        "gdt-vid": "",
        "qz-gtd": "",
        "scene": "1006",
        "Qm-From": "wechat",
        "store-id": 49006,
        "Qm-User-Token": this.token,
        "channelCode": "",
        "Qm-From-Type": "catering",
        "promotion-code": "",
        "work-staff-name": "",
        "work-staff-id": "",
        "Accept": "v=1.0",
        "Accept-Encoding": "gzip,compress,br,deflate",
        "Referer": _0x2bc106
      }
    });
  }

  async ["personal_info"](_0x142a7f = {}) {
    let _0x13ce61 = false;

    try {
      const _0x3bb56b = {
        "appid": _0x437572
      };
      const _0x3e14e1 = {
        "fn": "personal_info",
        "method": "get",
        "url": "https://webapi.qmai.cn/web/catering/crm/personal-info",
        "searchParams": _0x3bb56b
      };

      let {
        result: _0x258ac5,
        statusCode: _0x2b3822
      } = await this.request(_0x3e14e1),
          _0x4b75a8 = _0x5b9b40.get(_0x258ac5, "code", _0x2b3822);

      if (_0x4b75a8 === 0) {
        _0x13ce61 = this.valid = true;
        let {
          mobilePhone: _0x29036d,
          name: _0x4ef046
        } = _0x258ac5?.["data"];
        this.name = _0x29036d;
        this.userName = _0x4ef046;
      } else {
        let _0x42b201 = _0x5b9b40.get(_0x258ac5, "message", "");

        this.log("登录失败: " + _0x42b201);
      }
    } catch (_0x5a7cd9) {
      console.log(_0x5a7cd9);
    } finally {
      return _0x13ce61;
    }
  }

  async ["sign_detail"](_0x2d3ccf = {}) {
    try {
      const _0x3f5674 = {
        "appid": _0x437572
      };
      const _0x5445f6 = {
        "fn": "sign_detail",
        "method": "post",
        "url": "https://webapi.qmai.cn/web/catering/integral/sign/detail",
        "json": _0x3f5674
      };

      let {
        result: _0x53f67a,
        statusCode: _0x3400c0
      } = await this.request(_0x5445f6),
          _0x2f345c = _0x5b9b40.get(_0x53f67a, "code", _0x3400c0);

      if (_0x2f345c === 0) {
        let {
          continuityTotal: _0x5c4afd,
          signInDateList: _0x475358,
          activityId: _0x4e238a
        } = _0x53f67a?.["data"],
            _0x41cfa7 = false,
            _0x5636ba = _0x5b9b40.time("yyyy-MM-dd");

        if (_0x475358?.["includes"](_0x5636ba)) {
          _0x41cfa7 = true;
        }

        this.log("今天" + (_0x41cfa7 ? "已" : "未") + "签到, 已连续签到" + _0x5c4afd + "天");
        !_0x41cfa7 && (await this.signIn(_0x4e238a));
      } else {
        let _0x1edd8a = _0x5b9b40.get(_0x53f67a, "message", "");

        this.log("查询签到失败[" + _0x2f345c + "]: " + _0x1edd8a);
      }
    } catch (_0x3da739) {
      console.log(_0x3da739);
    }
  }

  async ["signIn"](_0x3149cb, _0x524079 = {}) {
    try {
      const _0x59c409 = {
        "activityId": _0x3149cb,
        "mobilePhone": this.name,
        "userName": this.userName,
        "appid": _0x437572
      };
      const _0x27d618 = {
        "fn": "signIn",
        "method": "post",
        "url": "https://webapi.qmai.cn/web/catering/integral/sign/signIn",
        "json": _0x59c409
      };

      let {
        result: _0x86652c,
        statusCode: _0x1ec383
      } = await this.request(_0x27d618),
          _0x320bb6 = _0x5b9b40.get(_0x86652c, "code", _0x1ec383);

      if (_0x320bb6 === 0) {
        const _0x1bd3bf = {
          "notify": true
        };
        this.log("签到成功", _0x1bd3bf);
      } else {
        let _0x2bfdef = _0x5b9b40.get(_0x86652c, "message", "");

        this.log("签到失败[" + _0x320bb6 + "]: " + _0x2bfdef);
      }
    } catch (_0x448594) {
      console.log(_0x448594);
    }
  }

  async ["points_info"](_0x570aeb = {}) {
    try {
      const _0x1cb07b = {
        "appid": _0x437572
      };
      const _0x242e85 = {
        "fn": "points_info",
        "method": "post",
        "url": "https://webapi.qmai.cn/web/catering/crm/points-info",
        "json": _0x1cb07b
      };

      let {
        result: _0x18b18e,
        statusCode: _0x3d7906
      } = await this.request(_0x242e85),
          _0x138330 = _0x5b9b40.get(_0x18b18e, "code", _0x3d7906);

      if (_0x138330 === 0) {
        let {
          soonExpiredPoints: _0x13ad13,
          totalPoints: _0x457ec6,
          expiredTime: _0x5d2366
        } = _0x18b18e?.["data"];
        const _0xa1dad4 = {
          "notify": true
        };
        this.log("积分: " + _0x457ec6, _0xa1dad4);

        if (_0x13ad13) {
          const _0x24f3f2 = {
            "notify": true
          };
          this.log("有" + _0x13ad13 + "积分将于[" + _0x5d2366 + "]过期", _0x24f3f2);
        }
      } else {
        let _0x3419ec = _0x5b9b40.get(_0x18b18e, "message", "");

        this.log("查询积分失败[" + _0x138330 + "]: " + _0x3419ec);
      }
    } catch (_0x2f8700) {
      console.log(_0x2f8700);
    }
  }

  async ["userTask"](_0x1e2023 = {}) {
    if (!(await this.personal_info())) {
      return;
    }

    await this.sign_detail();
    await this.points_info();
  }

}

!(async () => {
  if (!(await _0xb1113d())) {
    return;
  }

  _0x5b9b40.read_env(_0x46e11a);

  for (let _0x309962 of _0x5b9b40.userList) {
    await _0x309962.userTask();
  }
})().catch(_0x593c66 => _0x5b9b40.log(_0x593c66)).finally(() => _0x5b9b40.exitNow());

async function _0xb1113d(_0x434d27 = 0) {
  let _0x48cfb0 = false;

  try {
    const _0xc766d5 = {
      "fn": "auth",
      "method": "get",
      "url": _0x8d156c,
      "timeout": 20000
    };
    let {
      statusCode: _0x3eb8bc,
      result: _0xe59ae2
    } = await _0x287bbf.request(_0xc766d5);

    if (_0x3eb8bc != 200) {
      _0x434d27++ < _0x403e65 && (_0x48cfb0 = await _0xb1113d(_0x434d27));
      return _0x48cfb0;
    }

    if (_0xe59ae2?.["code"] == 0) {
      _0xe59ae2 = JSON.parse(_0xe59ae2.data.file.data);

      if (_0xe59ae2?.["commonNotify"] && _0xe59ae2.commonNotify.length > 0) {
        const _0x41abe6 = {
          "notify": true
        };

        _0x5b9b40.log(_0xe59ae2.commonNotify.join("\n") + "\n", _0x41abe6);
      }

      _0xe59ae2?.["commonMsg"] && _0xe59ae2.commonMsg.length > 0 && _0x5b9b40.log(_0xe59ae2.commonMsg.join("\n") + "\n");

      if (_0xe59ae2[_0x1de1e1]) {
        let _0x5a44f2 = _0xe59ae2[_0x1de1e1];
        _0x5a44f2.status == 0 ? _0x12fd02 >= _0x5a44f2.version ? (_0x48cfb0 = true, _0x5b9b40.log(_0x5a44f2.msg[_0x5a44f2.status]), _0x5b9b40.log(_0x5a44f2.updateMsg), _0x5b9b40.log("现在运行的脚本版本是：" + _0x12fd02 + "，最新脚本版本：" + _0x5a44f2.latestVersion)) : _0x5b9b40.log(_0x5a44f2.versionMsg) : _0x5b9b40.log(_0x5a44f2.msg[_0x5a44f2.status]);
      } else {
        _0x5b9b40.log(_0xe59ae2.errorMsg);
      }
    } else {
      _0x434d27++ < _0x403e65 && (_0x48cfb0 = await _0xb1113d(_0x434d27));
    }
  } catch (_0x2e6d2f) {
    _0x5b9b40.log(_0x2e6d2f);
  } finally {
    return _0x48cfb0;
  }
}

async function _0x5e83c8() {
  let _0x48a18a = false;

  try {
    const _0x34eac3 = {
      "fn": "auth",
      "method": "get",
      "url": _0x36b563
    };
    let {
      statusCode: _0x35d559,
      result: _0x44c16d
    } = await _0x287bbf.request(_0x34eac3);

    if (_0x35d559 != 200) {
      return Promise.resolve();
    }

    if (_0x44c16d?.["code"] == 0) {
      _0x44c16d = JSON.parse(_0x44c16d.data.file.data);
      ownerId = _0x44c16d?.["ownerId"] || ownerId;
      share_app = _0x44c16d?.["share_app"] || share_app;

      for (let _0x5ee6df of _0x44c16d.chdTask.simple) {
        !task_chd_simple_list.filter(_0x458f2c => _0x458f2c.missionDefId == _0x5ee6df.missionDefId && _0x458f2c.missionCollectionId == _0x5ee6df.missionCollectionId).length && task_chd_simple_list.push(_0x5ee6df);
      }

      for (let _0x3f1917 of _0x44c16d.chdTask.pageview) {
        !task_chd_pageview_list.filter(_0x3b115e => _0x3b115e.missionDefId == _0x3f1917.missionDefId && _0x3b115e.missionCollectionId == _0x3f1917.missionCollectionId).length && task_chd_pageview_list.push(_0x3f1917);
      }

      for (let _0x2c188d of _0x44c16d.tkjTask.simple) {
        !task_tkj_simple_list.filter(_0x39c750 => _0x39c750.missionDefId == _0x2c188d.missionDefId && _0x39c750.missionCollectionId == _0x2c188d.missionCollectionId).length && task_tkj_simple_list.push(_0x2c188d);
      }

      for (let _0x188550 of _0x44c16d.tkjTask.pageview) {
        !task_tkj_pageview_list.filter(_0x1b1d5b => _0x1b1d5b.missionDefId == _0x188550.missionDefId && _0x1b1d5b.missionCollectionId == _0x188550.missionCollectionId).length && task_tkj_pageview_list.push(_0x188550);
      }
    }
  } catch (_0x3f3aef) {
    _0x5b9b40.log(_0x3f3aef);
  } finally {
    return Promise.resolve(_0x48a18a);
  }
}

function _0x584c9b(_0x5946c7) {
  return new class {
    constructor(_0x2d315c) {
      this.name = _0x2d315c;
      this.startTime = Date.now();
      const _0x2ac6cd = {
        "time": true
      };
      this.log("[" + this.name + "]开始运行\n", _0x2ac6cd);
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

    ["log"](_0x52bcd4, _0x25c78a = {}) {
      const _0x253d0d = {
        "console": true
      };
      Object.assign(_0x253d0d, _0x25c78a);

      if (_0x253d0d.time) {
        let _0xf728bb = _0x253d0d.fmt || "hh:mm:ss";

        _0x52bcd4 = "[" + this.time(_0xf728bb) + "]" + _0x52bcd4;
      }

      if (_0x253d0d.notify) {
        this.notifyStr.push(_0x52bcd4);
      }

      if (_0x253d0d.console) {
        console.log(_0x52bcd4);
      }
    }

    ["get"](_0x3b211c, _0xca2af0, _0x441c58 = "") {
      let _0x4fb079 = _0x441c58;
      _0x3b211c?.["hasOwnProperty"](_0xca2af0) && (_0x4fb079 = _0x3b211c[_0xca2af0]);
      return _0x4fb079;
    }

    ["pop"](_0x43cbbc, _0x312d2b, _0x9a1cf6 = "") {
      let _0x552778 = _0x9a1cf6;
      _0x43cbbc?.["hasOwnProperty"](_0x312d2b) && (_0x552778 = _0x43cbbc[_0x312d2b], delete _0x43cbbc[_0x312d2b]);
      return _0x552778;
    }

    ["copy"](_0x59b325) {
      return Object.assign({}, _0x59b325);
    }

    ["read_env"](_0x1ced95) {
      let _0x9736a4 = _0x1df3fe.map(_0x3e1046 => process.env[_0x3e1046]);

      for (let _0x2d2734 of _0x9736a4.filter(_0x479897 => !!_0x479897)) {
        for (let _0x36a5ef of _0x2d2734.split(_0x2808e6).filter(_0x473a30 => !!_0x473a30)) {
          if (this.userList.includes(_0x36a5ef)) {
            continue;
          }

          this.userList.push(new _0x1ced95(_0x36a5ef));
        }
      }

      this.userCount = this.userList.length;

      if (!this.userCount) {
        const _0x1a9703 = {
          "notify": true
        };
        this.log("未找到变量，请检查变量" + _0x1df3fe.map(_0x2f814a => "[" + _0x2f814a + "]").join("或"), _0x1a9703);
        return false;
      }

      this.log("共找到" + this.userCount + "个账号");
      return true;
    }

    ["time"](_0x1c6cf2, _0x553005 = null) {
      let _0x30fd0a = _0x553005 ? new Date(_0x553005) : new Date(),
          _0x254488 = {
        "M+": _0x30fd0a.getMonth() + 1,
        "d+": _0x30fd0a.getDate(),
        "h+": _0x30fd0a.getHours(),
        "m+": _0x30fd0a.getMinutes(),
        "s+": _0x30fd0a.getSeconds(),
        "q+": Math.floor((_0x30fd0a.getMonth() + 3) / 3),
        "S": this.padStr(_0x30fd0a.getMilliseconds(), 3)
      };

      /(y+)/.test(_0x1c6cf2) && (_0x1c6cf2 = _0x1c6cf2.replace(RegExp.$1, (_0x30fd0a.getFullYear() + "").substr(4 - RegExp.$1.length)));

      for (let _0x4aac85 in _0x254488) new RegExp("(" + _0x4aac85 + ")").test(_0x1c6cf2) && (_0x1c6cf2 = _0x1c6cf2.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x254488[_0x4aac85] : ("00" + _0x254488[_0x4aac85]).substr(("" + _0x254488[_0x4aac85]).length)));

      return _0x1c6cf2;
    }

    async ["showmsg"]() {
      if (!this.notifyFlag) {
        return;
      }

      if (!this.notifyStr.length) {
        return;
      }

      var _0x2fc4f2 = require("./sendNotify");

      this.log("\n============== 推送 ==============");
      await _0x2fc4f2.sendNotify(this.name, this.notifyStr.join("\n"));
    }

    ["padStr"](_0x4c32c4, _0x3fd187, _0xbb0bc3 = {}) {
      let _0x46c8e7 = _0xbb0bc3.padding || "0",
          _0x340b9c = _0xbb0bc3.mode || "l",
          _0x447453 = String(_0x4c32c4),
          _0xec2433 = _0x3fd187 > _0x447453.length ? _0x3fd187 - _0x447453.length : 0,
          _0x44f888 = "";

      for (let _0x5cbbd7 = 0; _0x5cbbd7 < _0xec2433; _0x5cbbd7++) {
        _0x44f888 += _0x46c8e7;
      }

      _0x340b9c == "r" ? _0x447453 = _0x447453 + _0x44f888 : _0x447453 = _0x44f888 + _0x447453;
      return _0x447453;
    }

    ["json2str"](_0x110fc9, _0x30b265, _0x2e9d5c = false) {
      let _0x26e41d = [];

      for (let _0x51d0c9 of Object.keys(_0x110fc9).sort()) {
        let _0x5b2bc4 = _0x110fc9[_0x51d0c9];

        if (_0x5b2bc4 && _0x2e9d5c) {
          _0x5b2bc4 = encodeURIComponent(_0x5b2bc4);
        }

        _0x26e41d.push(_0x51d0c9 + "=" + _0x5b2bc4);
      }

      return _0x26e41d.join(_0x30b265);
    }

    ["str2json"](_0x537889, _0x4b1413 = false) {
      let _0x599df4 = {};

      for (let _0x2585dd of _0x537889.split("&")) {
        if (!_0x2585dd) {
          continue;
        }

        let _0x1d603e = _0x2585dd.indexOf("=");

        if (_0x1d603e == -1) {
          continue;
        }

        let _0x1c445c = _0x2585dd.substr(0, _0x1d603e),
            _0x3080f6 = _0x2585dd.substr(_0x1d603e + 1);

        if (_0x4b1413) {
          _0x3080f6 = decodeURIComponent(_0x3080f6);
        }

        _0x599df4[_0x1c445c] = _0x3080f6;
      }

      return _0x599df4;
    }

    ["randomPattern"](_0x9a6fee, _0x2102f9 = "abcdef0123456789") {
      let _0x567e7a = "";

      for (let _0x5ad052 of _0x9a6fee) {
        if (_0x5ad052 == "x") {
          _0x567e7a += _0x2102f9.charAt(Math.floor(Math.random() * _0x2102f9.length));
        } else {
          _0x5ad052 == "X" ? _0x567e7a += _0x2102f9.charAt(Math.floor(Math.random() * _0x2102f9.length)).toUpperCase() : _0x567e7a += _0x5ad052;
        }
      }

      return _0x567e7a;
    }

    ["randomUuid"]() {
      return this.randomPattern("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");
    }

    ["randomString"](_0x917beb, _0xbc2fa6 = "abcdef0123456789") {
      let _0x2d0e8d = "";

      for (let _0x115630 = 0; _0x115630 < _0x917beb; _0x115630++) {
        _0x2d0e8d += _0xbc2fa6.charAt(Math.floor(Math.random() * _0xbc2fa6.length));
      }

      return _0x2d0e8d;
    }

    ["randomList"](_0x42d9b1) {
      let _0x33cc9d = Math.floor(Math.random() * _0x42d9b1.length);

      return _0x42d9b1[_0x33cc9d];
    }

    ["wait"](_0xf808a0) {
      return new Promise(_0x27bc2b => setTimeout(_0x27bc2b, _0xf808a0));
    }

    async ["exitNow"]() {
      await this.showmsg();

      let _0x35738d = Date.now(),
          _0x5813b3 = (_0x35738d - this.startTime) / 1000;

      this.log("");
      const _0x35d343 = {
        "time": true
      };
      this.log("[" + this.name + "]运行结束，共运行了" + _0x5813b3 + "秒", _0x35d343);
      process.exit(0);
    }

    ["normalize_time"](_0x27df1f, _0x5bdec8 = {}) {
      let _0xa8ea79 = _0x5bdec8.len || this.default_timestamp_len;

      _0x27df1f = _0x27df1f.toString();
      let _0x1011ad = _0x27df1f.length;

      while (_0x1011ad < _0xa8ea79) {
        _0x27df1f += "0";
      }

      _0x1011ad > _0xa8ea79 && (_0x27df1f = _0x27df1f.slice(0, 13));
      return parseInt(_0x27df1f);
    }

    async ["wait_until"](_0x5719bb, _0x91f1b4 = {}) {
      let _0x1f5cfa = _0x91f1b4.logger || this,
          _0x3660ec = _0x91f1b4.interval || this.default_wait_interval,
          _0x118ba7 = _0x91f1b4.limit || this.default_wait_limit,
          _0x258ce1 = _0x91f1b4.ahead || this.default_wait_ahead;

      if (typeof _0x5719bb == "string" && _0x5719bb.includes(":")) {
        if (_0x5719bb.includes("-")) {
          _0x5719bb = new Date(_0x5719bb).getTime();
        } else {
          let _0x5807f3 = this.time("yyyy-MM-dd ");

          _0x5719bb = new Date(_0x5807f3 + _0x5719bb).getTime();
        }
      }

      let _0x2e739e = this.normalize_time(_0x5719bb) - _0x258ce1,
          _0x2e664e = this.time("hh:mm:ss.S", _0x2e739e),
          _0x2aa6d7 = Date.now();

      _0x2aa6d7 > _0x2e739e && (_0x2e739e += 86400000);

      let _0x4dc048 = _0x2e739e - _0x2aa6d7;

      if (_0x4dc048 > _0x118ba7) {
        const _0x228481 = {
          "time": true
        };

        _0x1f5cfa.log("离目标时间[" + _0x2e664e + "]大于" + _0x118ba7 / 1000 + "秒,不等待", _0x228481);
      } else {
        const _0x47ce87 = {
          "time": true
        };

        _0x1f5cfa.log("离目标时间[" + _0x2e664e + "]还有" + _0x4dc048 / 1000 + "秒,开始等待", _0x47ce87);

        while (_0x4dc048 > 0) {
          let _0x591ba7 = Math.min(_0x4dc048, _0x3660ec);

          await this.wait(_0x591ba7);
          _0x2aa6d7 = Date.now();
          _0x4dc048 = _0x2e739e - _0x2aa6d7;
        }

        const _0x38ca7e = {
          "time": true
        };

        _0x1f5cfa.log("已完成等待", _0x38ca7e);
      }
    }

    async ["wait_gap_interval"](_0x77c12f, _0x59f4e0) {
      let _0x38d396 = Date.now() - _0x77c12f;

      _0x38d396 < _0x59f4e0 && (await this.wait(_0x59f4e0 - _0x38d396));
    }

  }(_0x5946c7);
}
