---
title: Pytube 簡單教學
date: '2019-03-03 09:24:30+00:00'
tags:
- python
- pytube
---
來寫個簡單的Python 教學好了，對了！ 去年我有挑戰it 幫鐵人賽，參加的是自我挑戰組，並且自己訂的主題就是Python 30天！ 歡迎大家去看看！

[連結於此][1]

對於鐵人賽完賽的心得不必多說，我想已經都寫在最後一天了，總之就是覺得自己還有很大的成長空間，下次參加鐵人賽一定要有更充足的準備和題目。

不得不說，這次鐵人賽的獎品  
我個人覺得好浮誇......

好了，簡單交代近況也夠了，進入主題來談談Python 好用的套件pytube 吧！

pytube 是用來可以抓youtube的影片，首先，你必須先安裝它

```shell
$ pip install pytube
```

接下來你可以確認一下pytube 是否正常運作？
```shell
$ pytube --version
$ pytube 9.4.0
```

> 如果你是最新安裝pytube version 應該會是9.5.1 , 不過pytube 9.5.1 有些問題，可以參考此[連結](https://www.flag.com.tw/bk/t/ft700)解決問題

接下來我們就可以開始寫下載youtube影片的程式啦！  
這裡我只是簡單呈現怎麼撰寫，詳細與延伸可以參考文件：https://Python-pytube.readthedocs.io/en/latest/#  
小君曰：不知道為什麼文件的版本似乎落後了我目前寫的版本...

**就是這麼簡單！！！！**
```python
from pytube import YouTube

```
像我自己想要更加炫技一下就會想知道我目前youtube影片的名字的話可以這樣寫..... 加入beautifulSoup 這個可以分析網頁的套件。
```python
from pytube import YouTube
import requests
from bs4 import BeautifulSoup


# 先去youtube 上看看這部影片的名字
context = request.content
# 藉由BeautifulSoup
soup=BeautifulSoup(context,"html.parser")
# 取得我要的資料
video_name = soup.select('h1.watch-title-container')[0].get_text();
# 資料清理
video_name = video_name.replace('\n','')
video_name = video_name.replace(' ','')
# 準備下載啦
print('下載 來自'+video_name+' 的youtube影片中...')
print('下載完成！')
```

 [1]: https://ithelp.ithome.com.tw/users/20106999/ironman/1805