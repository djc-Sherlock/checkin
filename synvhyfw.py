# -- coding:UTF-8 --
import json
import time, re, os, sys  # re 用于正规则处理,os可能要用于文件路径读取与判断
import requests as req
import multiprocessing as mp
import logging
import urllib.parse  # 用于url code 的编解码
from costtime import time_counts  # 用来统计时间
import sendNotify  # 发通知
import random
import hashlib
from requests import HTTPError

# 在ql 环境测试ok

# 本脚本要配置的参数
param2 = 'alck'  # 要配置的cookes变量 在config.sh 中配置 例 export synshyck=''
configfile = '/ql/data/config/config.sh'
configfile1 = './config.sh'
#################################
'''
 作者：newhackerman
 日期：2023-08-06
 功能 	所有女生会员服务中心小程序签到
 抓包：抓# 小程序 https://7.meionetech.com/api/operate/wx/record/signIn header中authorization:,
 变量格式：export synshyck='authorization'
 定时：1天一次
 cron: 7 8 * * *
 无邀请码
 用于青龙，其它平台未测试
 [task_local]

 [rewrite_local]

 [MITM]

 '''
#################################
session = req.session()
resultlist = []  # 分别存放每个进程的执行结果

logging.basicConfig(level=logging.INFO, format='%(message)s')
logger = logging.getLogger(__name__)
sleep_time = random.randint(2, 10)  # 连续执行url请求上下文可能需要休息
configdict = {}
if os.path.exists(configfile):
    with open(configfile, 'r', encoding='utf8') as fr:
        lines = fr.readlines()
        if lines is None:
            sys.exit()
        for data in lines:
            data = str(data).replace('\n', '').replace('\'', '', -1).replace('\"', '', -1)  # 删除换行
            if data == '' or data is None:
                continue
            if data.strip()[0] == '#':  # 注释行不要
                continue
            if 'export' in data.strip():
                data = data.replace('export', '', -1)  # 如果用户写了 export 关键字则去除，为了以前的老配置兼容
            data = data.split('=', 1)
            if len(data) < 2:
                continue
            key = data[0].strip()
            value = data[1].strip()
            configdict[key] = value
elif os.path.exists(configfile1):
    with open(configfile1, 'r', encoding='utf8') as fr:
        lines = fr.readlines()
        if lines is None:
            sys.exit()
        for data in lines:
            data = str(data).replace('\n', '').replace('\'', '', -1).replace('\"', '', -1)  # 删除换行
            if data == '' or data is None:
                continue
            if data.strip()[0] == '#':  # 注释行不要
                continue
            if 'export' in data.strip():
                data = data.replace('export', '', -1)  # 如果用户写了 export 关键字则去除，为了以前的老配置兼容
            data = data.split('=', 1)
            if len(data) < 2:
                continue
            key = data[0].strip()
            value = data[1].strip()
            configdict[key] = value
else:
    logger.info('未找到配置文件！！，请检查配置文件路径与文件名')


# 读取配置的非cookies变量
def getconfig(param):
    return configdict[param]


# 获取cookies
def getcookies(param):
    cookieslist = []
    cookiestr = ''
    configs = configdict[param]  # 从字典里取到key对应的值
    configs = str(configs).strip().split('@')  # 按@分割返回
    return configs


# 开始启动任务，主要用于调用多进程启动
def starttask(authorization):
    task = tasks(authorization)
    task.runtasklist()


# phoneagent = random.choice(agentlist)  # 随机选一个agent
user_agent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36 MicroMessenger/7.0.9.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat'


class tasks():

    def __init__(self, authorization):
        self.resultdict = {}
        currenttime = time.time()
        self.st = str(round(currenttime * 1000))
        self.authorization = authorization
        self.headers = {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6945',
            'content-type': 'application/json',
            'authorization':self.authorization,
        }

    # 执行一系列任务
    @time_counts
    def runtasklist(self):

        result = self.synshyck_sign()  # 签到
        time.sleep(1)
        result=self.synshyck_yyzb()
        time.sleep(1)
        result = self.synshyck_viewcust_score()
        time.sleep(1)
        result = self.synshyck_select_score()
        print(result)
        sendNotify.send('所有女生会员服务中心执行结果：', self.resultdict)

    # 签到
    def synshyck_sign(self):
        currenttime = time.strftime('%Y.%m.%d', time.localtime())
        print(currenttime)
        currenttime = time.time()
        self.st = str(round(currenttime * 1000))
        url_signin = f"https://7.meionetech.com/api/operate/wx/record/signIn"
        body = {}
        # logger.info('body%s:' % body)
        try:
            response = session.post(url=url_signin, headers=self.headers, data=body, timeout=5)
            # logger.info(response.text)
            jsontext = response.json()
            if 'token解析失败' in str(jsontext):
                self.resultdict['签到结果'] = 'Token验证异常,请检查token 是否过期/填写错误'
            if '已经达到单日参与次数上限' in str(jsontext):
                self.resultdict['签到结果'] = '你今天已经签到了~'
            if jsontext['code'] == '000':
                self.resultdict['签到结果'] = '签到成功~ 59积分就可以换实物'
                # self.resultdict['签到积分']= jsontext['return_msg']['pointsNum']
            else:
                self.resultdict['签到结果'] = jsontext
            return self.resultdict
        except HTTPError as err:
            logger.info(err)

    # 预约直播
    def synshyck_yyzb(self):
        currenttime = time.strftime('%Y.%m.%d', time.localtime())
        print(currenttime)
        currenttime = time.time()
        self.st = str(round(currenttime * 1000))
        url_signin = f"https://7.meionetech.com/api/live/wx/strategy/live_appointment/561"
        body = {}
        # logger.info('body%s:' % body)
        try:
            response = session.post(url=url_signin, headers=self.headers, data=body, timeout=5)
            # logger.info(response.text)
            jsontext = response.json()
            if '预约成功' in str(jsontext):
                self.resultdict['预约结果'] = '预约成功'
            else:
                self.resultdict['预约结果'] =jsontext
            return self.resultdict
        except HTTPError as err:
            logger.info(err)

    # 浏览会员积分商城
    def synshyck_viewcust_score(self):
        currenttime = time.strftime('%Y.%m.%d', time.localtime())
        print(currenttime)
        currenttime = time.time()
        self.st = str(round(currenttime * 1000))
        url_signin = f"https://7.meionetech.com/api/operate/wx/rewards/task/done?taskId=38"
        body ={"taskId":38}
        # logger.info('body%s:' % body)
        try:
            response = session.post(url=url_signin, headers=self.headers, data=body, timeout=5)
            # logger.info(response.text)
            jsontext = response.json()
            if jsontext['code']=='000':
                self.resultdict['浏览会员积分商城'] = '浏览会员积分商城成功'
            else:
                self.resultdict['浏览会员积分商城'] = jsontext
            return self.resultdict
        except HTTPError as err:
            logger.info(err)
    # 积分查询：
    def synshyck_select_score(self):
        currenttime = time.strftime('%Y.%m.%d', time.localtime())
        print(currenttime)
        currenttime = time.time()
        self.st = str(round(currenttime * 1000))
        url_signin = f"https://7.meionetech.com/api/account/wx/member/assets"
        # body ={"taskId":38}
        # logger.info('body%s:' % body)
        try:
            response = session.get(url=url_signin, headers=self.headers,  timeout=5)
            # logger.info(response.text)
            jsontext = response.json()
            if jsontext['code']=='000':
                self.resultdict['目前积分为'] = jsontext['data']['score']
            else:
                self.resultdict['目前积分为'] = '查询出错！'
            return self.resultdict
        except HTTPError as err:
            logger.info(err)

if __name__ == '__main__':
    cookies = getcookies('synshyck')
    # print(cookies)
    if len(cookies) > 5:
        logger.info('请勿一次性跑太多账号，造成服端与本机压力！')
    i = 0
    if cookies is not None:
        for cookie in cookies:
            # print(cookie)
            authorization = str(cookie).split('&')[0]
            # userCode = str(cookie).split('&')[1]
            # mallCode = str(cookie).split('&')[2]
            # sign=str(cookie).split('&')[2]
            # print('siginbody:', authorization)
            i += 1
            process = mp.Process(target=starttask, args=(authorization,))
            process.start()
            if i % 5 == 0:
                time.sleep(120)  # 先休息120秒再继续启动进程
        sys.exit()
    else:
        logger.info('未配置cookies')
        sys.exit(0)
