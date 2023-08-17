# -- coding:UTF-8 --
import json
import time, re, os, sys  # re 用于正规则处理,os可能要用于文件路径读取与判断
import requests as req
import multiprocessing as mp
import logging
import urllib.parse  # 用于url code 的编解码
import notify  # 发通知
import random
import hashlib
from requests import HTTPError

# 在ql 环境测试ok

# 本脚本要配置的参数
param2 = 'synshyck'  # 要配置的cookes变量 在config.sh 中配置 例 export synshyck=''
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



# 开始启动任务，主要用于调用多进程启动
def starttask(authorization):
    task = tasks(authorization)
    task.runtasklist()


# phoneagent = random.choice(agentlist)  # 随机选一个agent
user_agent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36 MicroMessenger/7.0.9.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat'


class tasks():

    def __init__(self, authorization):
        self.resultdict = {}
        self.message=""
        currenttime = time.time()
        self.st = str(round(currenttime * 1000))
        self.authorization = authorization
        self.headers = {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6945',
            'content-type': 'application/json',
            'authorization':self.authorization,
        }

    # 执行一系列任务

    def runtasklist(self):

        result = self.synshyck_sign()  # 签到
        time.sleep(1)
        result=self.synshyck_yyzb()
        time.sleep(1)
        result = self.synshyck_viewcust_score()
        time.sleep(1)
        result = self.synshyck_select_score()
        print(result)
        notify.send('所有女生会员服务中心执行结果：', self.message)

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
                self.message +="签到结果:Token验证异常,请检查token 是否过期\n\n"
            if '已经达到单日参与次数上限' in str(jsontext):
                self.resultdict['签到结果'] = '你今天已经签到了~'
                self.message +="签到结果:你今天已经签到了~\n\n"
            if jsontext['code'] == '000':
                self.resultdict['签到结果'] = '签到成功~ 59积分就可以换实物'
                self.message +="签到结果:签到成功~ 59积分就可以换实物\n\n"
            else:
                self.resultdict['签到结果'] = jsontext
                self.message +="签到失败\n\n"
            return self.message
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
                self.message +="预约结果:预约成功\n\n"
            else:
                self.resultdict['预约结果'] =jsontext
                self.message +="预约失败\n\n"
            return self.message
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
                self.message +="浏览会员积分商城成功\n\n"
            else:
                self.resultdict['浏览会员积分商城'] = jsontext
                self.message +="浏览会员积分商城失败\n\n"
            return self.message
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
                self.message+="目前积分为"+str(jsontext['data']['score'])+"\n\n"
            else:
                self.resultdict['目前积分为'] = '查询出错！'
                self.message +="目前积分查询出错!\n\n"
            return self.message
        except HTTPError as err:
            logger.info(err)

if __name__ == '__main__':
    cookies =os.getenv("synshyck")
    print(cookies)
    i = 0
    if cookies is not None:
        authorization = cookies
        print(authorization)
        i += 1
        process = mp.Process(target=starttask, args=(authorization,))
        process.start()
    else:
        logger.info('未配置cookies')
        sys.exit(0)
