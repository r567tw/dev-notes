---
title: Python 走入現實：來爬蟲吧(1)
date: '2018-10-16 15:07:02+00:00'
tags:
- python
- ithome
---
剛剛在想今天要寫什麼的時候....突然想到之前其實就有點想寫爬蟲的主題ＸＤ所以就來寫一波！ 
# 淺談網路與網頁
其實我們藉由瀏覽器打入網址看到的“網頁”，獲得的都是一種“資源”，而這個資源他所回傳的是HTML+CSS＋JS(當然對於‘api’來說，他有可能回傳的是'json'、’xml‘或者其他類型)。其實說穿了網頁前端說難不難說雜不雜，就是基於這三大天王。當然你會問，那麼我們常說的後端語言：php、ruby、或者是現在我們在談的Python呢？我們總不可能拿前端來連資料庫吧（安全緣故）？沒錯！ 對於開發者的角度來說，我們是用這些後端語言，但如果你發現，其實後端語言都是會由CGI或者後端渲染的引擎，當你試著對網頁開啟右鍵檢查時，他還是HTML+CSS+JS啊！
    
這裏還只是淺談，如果要繼續深入的話可以說非常非常多，預計30天鐵人賽都寫不完，這裏我極力推薦某個部落客寫的有關於http的文章以及一些我個人覺得可以更加深入的參考資料，淺顯明瞭、而且我也是讀過了對於網路、瀏覽器有更多的認識呢！
    
- [NotFalse 技術客所寫的http教學系列](https://notfalse.net/http-series)
- [來做個網路瀏覽器吧！Let's build a web browser! 系列](https://ithelp.ithome.com.tw/users/20103745/ironman/1270)：去年某大大寫的鐵人賽系列，看不懂沒關係，我也看不是太懂XD 但前面幾篇文章多少對於瀏覽器如何運作或者網路如何操作會有更多的了解
- [維基](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)或者google: 當然你也可以用wiki或自行google來幫助自己更加了解
    
***總之，我們可以知道我們爬回來的東西就是一連串的文字，就是HTML+CSS+JS/除非你是對API 當然就獲得其他類型的資料***
# 環境建置
如果你不喜歡自己的環境太過髒亂，你想要有‘virtual’ 環境，那非常好，Python3自己有內建，另外我自己或網路上也推薦‘virtualenv’這個modules

總之，時間不多 let's start!我就先假設大家想要有一個不受污染的環境吧先確定安裝好pip之後請執行
```shell
pip install virtualenv #安裝virtualenv這個環境
virtualenv crawler #建立一個名字叫做crawler的虛擬環境
source crawler/bin/activate #啟動這個crawler 這個環境(for mac)
\crawler\Scripts\activate.bat #或者也可以執行這個指令 (for windows) [參考](https://programwithus.com/learn-to-code/Pip-and-virtualenv-on-Windows/)

```
你的環境如果有啟動的話應該可以看到你們前面會有個類似`(crawler)`的字樣。要離開的話就使用'deactivate'這個指令吧！在虛擬環境之下/或者直接本機請安裝幾個會需要用到爬蟲的module吧！
```shell
pip install requests #安裝一個可以發出網路request的module
pip install BeautifulSoup4 #可以用這個module分析回傳回來的html+css+js
```
# 牛刀小試一下
在想要不要一口氣談完爬蟲的同時我發現時間很晚了，所以就只好分個幾天慢慢說明好了。前面說到我們的爬蟲通常會拿回來HTML+CSS+JS，那我們就來驗證一下吧！建立crawler.py    
```python
import requests;
from bs4 import BeautifulSoup;


content=request.content

print(content)
```
執行後你看到了什麼呢？是不是html+css+js呢？
或者你也可以使用
```python
print(type(content))
```
回傳了`<class 'bytes'>`bytes就是檔案的最小單位。

如果還是很好奇我說的回傳的html+css+js （因為print出來有什麼x開頭的亂碼）那麼我們試著把回傳回來的bytes 轉成string 寫入檔案中，我們可以這樣改寫：
```python 
import requests;
from bs4 import BeautifulSoup;


content=request.content

file = open('result.txt','w')
file.write(content.decode('utf-8'))
```
執行後看看result.txt是不是就是網站的html+css+js呢？

如果你今天頑皮一點把`result.txt`改為`result.html`呢？哈哈！ 打開`result.html`就是"很像"的yahoo首頁啦～～ XD 但應該是不能work的首頁啦，畢竟你只是copy前端，yahoo的背後還有很多眉眉角角呢（我們剛剛談到的後端開發語言或資料庫或圖片等等）