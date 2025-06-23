---
title: 開發一個知道每日AWS Cost的Bot
date: "2023-02-01 16:03:16+00:00"
tags:
  - aws
---

最近開啟了`AWS`帳號，但說真的本人目前仍然是個窮小子，所以會很注意自己 aws 上面花的錢，然後又希望自己可以用很自動化的方式，每天告訴我成本這樣...

by the way: 之前我曾經在`ithome`發問有關此類的問題，有位大大給我很好的建議：[想請問從目前的虛擬主機搬到 AWS 的成本
](https://ithelp.ithome.com.tw/questions/10195602)

那為什麼我又突然想打開 aws 呢，原因無他，就是練習麻～

- ✅ 用`ec2`部署一個 `laravel` 的專案
- ✅ 用`cdk`開發個簡單的 lambda

至於上面詳細的細節我整理如下

👉[`ec2`部署一個 `laravel` 的專案](https://jimmynotes.netlify.app/docs/clouds/aws/deploy-to-ec2)

👉[用`cdk`開發個簡單的 lambda](https://jimmynotes.netlify.app/docs/clouds/aws/cdk)

<!-- {{<admonition info "info">}}
由於是成本考量，目前已經close囉，工作目前以GCP為主沒再碰什麼AWS啦 😅...
至於 lambda 可能還在想怎麼 apply 生活中哈
{{</admonition>}} -->

同時在`pypl`中我也有發現很方便人家寫好的的 lib：[`awscost`](https://pypi.org/project/awscost/)，有夠方便，只要下個指令就好了～

於是在`google`,`stackoverflow`之後就寫了以下這段程式：

```python
import boto3
import datetime
import os
from helpers import notify

billing_client = boto3.client('ce')

today = datetime.date.today() - datetime.timedelta(1)
yesterday = today - datetime.timedelta(1)

start = yesterday.strftime('%Y-%m-%d')
end =today.strftime('%Y-%m-%d')

response = billing_client.get_cost_and_usage(
   TimePeriod={
     'Start': start,
     'End': end
    },
   Granularity='DAILY',
   Metrics=[
    'BlendedCost','UnblendedCost',
    'NetAmortizedCost','NetUnblendedCost',
    'NormalizedUsageAmount','AmortizedCost']
)

# print(response['ResultsByTime'])

for r in response['ResultsByTime']:
    blendedCost = r['Total']['BlendedCost']['Amount']
    unblendedCost = r['Total']['UnblendedCost']['Amount']
    netAmortizedCost = r['Total']['NetAmortizedCost']['Amount']
    netUnblendedCost = r['Total']['NetUnblendedCost']['Amount']
    normalizedUsageAmount = r['Total']['NormalizedUsageAmount']['Amount']
    amortizedCost = r['Total']['AmortizedCost']['Amount']

    #convert the amount to float
    amount = float(blendedCost) + float(unblendedCost) + float(netAmortizedCost) + float(netUnblendedCost) + float(normalizedUsageAmount) + float(amortizedCost)

# print(amount)

content = "\nAWS Cost: {} USD".format(amount)

notify.send(content)
```

而 notify 裡面就很簡單的這樣寫：

```
import os
import requests

def send(message):
    token = os.getenv("TOKEN")
    notify_url = "https://notify-api.line.me/api/notify"

    requests.post(
        notify_url,
        headers={'Authorization': "Bearer {}".format(token)},
        data={"message": message}
    )
```

接下來你只要準備好執行環境的`aws profile`, 或者給與足夠的權限、甚至直接部署到 aws lambda 上......（發現 aws lambda 上直接可以呼叫到`boto3`...）

即可開箱即用。

## 結果

我發現`aws`查成本是需要錢的！！！ 要給亞馬遜保護費了 🥺

![](/images/aws-cost.png)

:::success
哭哭，不敢真的讓他自動化了
:::
