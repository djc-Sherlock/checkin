"""
小阅阅互助  入口   https://x.moonbox.site/?73utPq6i1134=#/?recommend=HU2AT9HTVM0
阅读文章https://x.moonbox.site/api/article/read抓出cookie    填进去直接开冲
export Acookie=cookie
多账号用'===='隔开 例 账号1====账号2
cron：0 8 * * *
"""

import os
import time

import requests

# from dotenv import load_dotenv
#
# load_dotenv()
accounts = os.getenv("Acookie")
if accounts is None:
    print('你没有填入Acookie，咋运行？')
    exit()
accounts_list = accounts.split('====')
num_of_accounts = len(accounts_list)
print(f"获取到 {num_of_accounts} 个账号")
for i, account in enumerate(accounts_list, start=1):
    values = account.split('@')
    Acookie = values[0]
    print(f"\n{'=' * 8}开始执行账号{i}{'=' * 8}")
    import requests

    url = "https://x.moonbox.site/api/user/info"

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x63090621) XWEB/8391 Flue",
        "Cookie": Acookie
    }

    response = requests.get(url, headers=headers).json()
    if response['code'] == 1:
        nickname = response['data']['nickname']
        balance = response['data']['balance']
        print(f"{nickname}---余额{balance}")
        for i in range(30):
            url = "https://x.moonbox.site/api/article/read"
            data = {
                "articleId": 344,
                "articleUser": 114,
                "bigTop": 0,
                "publishId": 349,
                "viewNum": "146",
                "readType": 0,
                "channel": "0",
                "readerDate": 1695174062000,
                "seconds": 34
            }

            response = requests.post(url, headers=headers, json=data).json()
            if response['code'] == 0:
                print(f"{response['msg']}")
                break
            elif response['code'] == 1:
                print(f"阅读成功---获得{response['data']}")
                time.sleep(1)

    else:
        print(f"错误{response}")
    url = "https://x.moonbox.site/api/account/withdraw/info"
    response = requests.get(url, headers=headers).json()
    if response['code'] == 1:
        canWithdrawDou = response['data']['canWithdrawDou']
        freezeDou = response['data']['freezeDou']
        print(f"当前可提现:{canWithdrawDou}豆子\n冻结豆子:{freezeDou}")
        if canWithdrawDou > 192:
            url = "https://x.moonbox.site/api/account/cash/withdraw"
            body = {"dou": canWithdrawDou}
            response = requests.post(url, headers=headers, json=body).json()
            if response['code'] == 1:
                print('提现成功')
            else:
                print(f"错误{response}")
        else:
            print(f"当前可提现豆子：{canWithdrawDou}，不满足提现条件")
    else:
        print(f"错误{response}")
