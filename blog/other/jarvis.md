---
title: 開發個人助理Jarvis
date: "2022-07-02 13:33:11+00:00"
tags:
  - line notify
  - github
---

# 前言

我其實是一個不太喜歡苦工的工程師，我很喜歡用程式解決我個人的生活問題。自動化最棒了！

之前有個想法希望可以買黃金，剛好看到 github action 有所謂的`schedule` 的選項，於是我就有個大膽的想法：不如就讓 line 來通知到要準備買黃金拉

<!-- truncate -->

# 專案開發

原本他只是個簡單的黃金買賣通知，結果到最後我把他寫成通知天氣預報、股票等買賣的決策系統通知了 XD

或許之後還可以有更多細緻化的設定，反正他就是個超簡單的 side project, 技術基於 line notify, github action 及 python。黃金、天氣與股票各由負責的 python script 處理，算是有點為服務的 feel 吧？

# 如果以後 line notify 壞掉了怎麼辦？

其實就把`helpers/notify.py`裡面的程式調整修改就好了，這個 side project 最最最核心的程式應該就是他了，其他服務都是有各自的實作之後呼叫這裡的 function 去 line notify 通知我。

```python
import os
import requests

def send(message):
    token = os.getenv("TOKEN")

    requests.post(
        headers={'Authorization': "Bearer {}".format(token)},
        data={"message": message}
    )
```

line notify 這個服務有夠簡單，其實就是簡單發出個 POST request 就好，然後你可以去 line notify 的[頁面](https://notify-bot.line.me/zh_TW/)申請 token 就好。

github action 就是簡單寫一下 yaml ，我以我最自豪的黃金為例

```yml
name: gold-notify
on:
  schedule:
    - cron: "30 3 * * 0-4"
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: checkout repo content
        uses: actions/checkout@v2 # checkout the repository content to github runner.
      - name: setup python
        uses: actions/setup-python@v2
        with:
          python-version: 3.8 #install the python needed
      - name: install py package
        run: pip install -r requirements.txt
      - name: execute py script # run the run.py to get the latest data
        run: python gold.py
        env:
          TOKEN: ${{ secrets.TOKEN }}
          GOLD_BUY: ${{ secrets.GOLD_BUY }}
          GOLD_SELL: ${{ secrets.GOLD_SELL }}
```

其實上網查就有發現到有人寫好執行 python 的 github action, 你只要照抄其實就可以給他執行起來。而在 on 裡面規劃一下`schedule`，其實就有點像是個人助理的感覺，line notify 在一定的時間可以通知訊息給你。

# 結果與影響

我順利在低點購買到黃金，然後最近俄烏戰爭開打黃金上漲。我賺到一波真棒

PS. 原本這個專案只是叫什麼 gold-notify 之類的，但為了`中二`，我把他取名成`jarvis` 哈哈哈

> 小君曰：來喔，歡迎大家拿這個 idea & project 去做成你們自己的 jarvis 吧
