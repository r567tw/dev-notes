---
title: Python 走入現實：來爬蟲吧(2)
date: '2018-10-17 14:02:02+00:00'
tags:
- python
- ithome
---
前一天我們談到如何使用Python發出類似瀏覽器的request，把所要的HTML+CSS+JS都給他抓過來。但是如果只是這樣那爬蟲又有什麼多厲害呢？ 爬蟲的厲害之處就是能把抓回來的東西，拿出來好好的分析，***藉此獲得我們想要的資訊或者有用的資訊*** 
    
因此，讓我接下來為他介紹收到request之後的事情吧！
# BeautifulSoup
其實Python有許多的爬蟲套件，我之前個人下班在玩的時候都是用這個套件，當然也有其他可以爬的套件。這裏我介紹某位youtuber的資源：https://www.youtube.com/watch?v=T2xNeWutlcA
    
厲害吧！他居然用Python爬蟲去抓成人影片！呵呵 不過他用的是另外一種module 叫做pyquery

好啦，確定你有安裝好beautifulSoup之後就來開始吧這裡就不抓成人影片了，我們先開始抓取‘文字內容’，明天再來講我們怎麼抓取非文字內容的資料。我們來抓youtube今天熱門影片的標題們XD
    
大家都知道：youtube的熱門影片網址是：https://www.youtube.com/feed/trending    
```python
import requests;
from bs4 import BeautifulSoup;


content=request.content
soup=BeautifulSoup(content,"html.parser")

container = soup.select("h3 a")

# print(type(container))
# print(container)
# 接下來只是寫入result.txt檔案的事情
file = open('result.text','w')

for item in container:
    if item:
        #print(type(item))
        value = item.get_text()
        print(value)
        file.write(value+'\n')
        #break #這裡也提一個起手式的遺珠之憾，就是你可以用continue和break來處理 迴圈敘述，這裏為了我之前debug方便，使用break來讓我先只看一個的結果。
        

file.close()
```
用範例講解：首先先把兩個module beautifulsoup ＆request引入接下來你會看到我使用request.get 取得熱門影片的youtube網頁的內容。再來你就用`soup=BeautifulSoup(content,"html.parser")`把content 丟入beautifulSoup解析，後面參數記得加上‘html.parser’
    
然後回去用瀏覽器打開https://www.youtube.com/feed/trending/ 這個網頁，可能希望你會有一些基礎的html+css基礎，總之你可以仔細看看每個標題的地方，上面都會有h3 以及我們最想要的標題文字正好都被包在a這裡面。
    
所以我們可以使用`container = soup.select("h3 a")`來把所有的標題提出來。接下來只是寫入result.txt檔案的事情了
    
1. 你可以先`print(container)`和`print(type(container))` : 你會發現他是`<class 'list'>` ，所以你知道了吧！他就是個 list，所以後面我用迴圈把他一一提取出來。2.進入迴圈後如果你還是很好奇，可以用print(type(item))看看：他是`<class 'bs4.element.Tag'>`，所以後面我可以用get_text()這個方法取出他的標題文字。
    
關於beautifulsoup還有很多可以在教學或更多運用的，這裏我附上我debug參考的一些網址
    
更多BeautifulSoup教學： https://www.dataquest.io/blog/web-scraping-tutorial-Python/

明天我將試看看爬多媒體資源看看！敬請期待！