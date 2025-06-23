---
title: Python 走入現實：來爬蟲吧(3)
date: '2018-10-20 02:55:30+00:00'
tags:
- python
- ithome
---
昨天看到一個大大po 鐵人賽的文章。終於解決了如何提取圖片的問題，原來，request也是可以讀到圖片檔的資訊的 

來吧！ 我們來學習如何爬圖片！其實網頁要呈現圖片有幾個方向
- img 標籤
- css image 相關的屬性
- 用js 放進去（但不太可能有人做這種事情...除非是互動性太高需要換圖片的那種）
     
img 標籤要爬最簡單，看看src標籤就可以囉～ css的話就會比較麻煩一點總之，爬蟲前是要做一些功課的，他是一種極客製化的一種功能
    
這時就要說一下自己的切身之痛我很久以前也在下班時間玩Python的時候寫關於爬蟲的東西，結果不知道最近是不是網頁改版抑或是Python函式庫的問題，總之這個在去年還是前年寫的馬上出錯,怎麼debug都不對.....怎麼google解法都解決不了
    
這時候你要去想辦法尋找解法，
1. 是繼續在這個錯誤當中繞圈，跟他死嗑到底（想辦法正面和這個錯誤衝突）？
2. 尋找替代方案？ （和小學生一樣抄隔壁的作弊XD)
3. 如果是接案或者那種有客戶你還有第三種選擇：說服他不要做這個功能（逃避隨可恥但有用？！！！！！！）
    
因為網路上其實很多人都有在寫Python抓圖片的程式或api ，你要相信一句話：你不是第一個發生這個問題的人
    
我和這個錯誤正面處理已經很久了，所以顯然第一個解法是不適合的，又或者等等寫完這篇鐵人賽或鐵人賽結束我會繼續想辦法解決這個錯誤，所以最後我來參考其他人的程式碼來看看他們怎麼抓圖片。
    
這時候，你有看懂Python程式的功力很重要，如何將他人的程式碼擷取或者看懂邏輯進而應用到自己的程式碼是一門藝術，我自己也還在摸索學習。
    
話不多說，上菜了，以爬https://www.inside.com.tw/ 為例如果你要爬其他網站，可以自行分析，或者歡迎在底下留言和我討論XD 我做不到我會google哈哈哈
    
``` html
<ul class="hero_slides">

```
所以接下來爬蟲囉！ 不知道inside 會不會吉我？哎呦 別這樣 你們如果改版的恐怕我底下的程式碼直接廢掉XD「同是工程師，相煎何太急」
    
這裏也要呼籲，爬蟲請務必遵守法律規範，因為網頁上的圖片是公開的，而且基本上我也沒要拿來幹嘛。所以我是合法使用（應該吧？？？！）
    
***以下程式碼我是來抓inside 最上面slider 的幾張圖片，並且為了整齊將這些圖片都放到images這個資料夾裡*** 
```Python
import requests
from bs4 import BeautifulSoup
import os
import re


content=request.content
soup=BeautifulSoup(content,"html.parser")

container = soup.select("li.hero_slide")

# print(container)
dirname = 'images'
'''
這裡介紹一個module 是os ，如果要學習更多歡迎到這裡：https://kaiching.org/pydoing/py/Python-library-ospath.html
'''
# 如果沒有images 資料夾會出錯，所以這裡我會判斷有沒有這個資料夾如果沒有就建立
# 請注意是'not' os.path.isdir 是判斷這個資料存在回傳true ：不存在是false ，如果不存在就要建立資料夾，為了要讓條件成立你必須加上not，not false 就是true ，就會進入到os.mkdir的環節
if not os.path.isdir(dirname): 
        os.mkdir(dirname)

for item in container:
    if item:
        # print(type(item)) #debug 用，來看看到底輸出是否是預期的結果
        value = item['style']
        # 這裏我用之前的正規表達式提取文字
        # 藉由re.findall出來的是list 所以這裏我宣告找第一個，也就是只有一個
        # 這裏的檔案名稱你可以選擇其他命名方式，我這裡是選擇擷取他在網頁上的檔名
        # example: 如果是https://www.inside.com.tw/wp-content/uploads/2018/10/RTX2Z7S8.jpg 我就擷取到RTX2Z7S8.jpg 為檔名
        
        #再發出一個request，然後建立檔案把編碼寫入檔案中
        imgcontent = pic.content
        #這裏os.path.join 其實你也可以改成 dirname+'/'+filename 啦
        image = open(os.path.join(dirname,filename),'wb')
        image.write(imgcontent)
        image.close()
        # break #debug 用，來看看到底輸出是否是預期的結果
```
    
    
      