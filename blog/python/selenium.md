---
title: Python 走入現實：selenium
date: '2018-10-21 05:24:21+00:00'
tags:
- python
- ithome
---
今天來介紹一個特別的module: selenium他是一個可以控制瀏覽器的module. 
    
但如果你要控制瀏覽器載入這個module以外也要在下載相對應瀏覽器的driver還有相對應作業系統的版本，
    
我這裡以我自己作業系統為mac os 還有 瀏覽器的driver設定為我個人最常用的‘chrome’為例如果你是其他os或者要弄其他的瀏覽器，請造訪https://selenium-Python.readthedocs.io/installation.html
    
啊如果還是看不懂歡迎在底下留言討論。
    
先上範例程式碼：這裏我是用yahoo的網址然後在搜尋框打上hello world 並且做搜尋
```python
from selenium import webdriver


#打開瀏覽器,確保你已經有chromedriver在你的目錄下
browser=webdriver.Chrome('./chromedriver')
#在瀏覽器打上網址連入

#這時候就可以分析網頁裡面的元素
element = browser.find_element_by_id('UHSearchBox')
element.send_keys('Hello World')

sumbit = browser.find_element_by_id('UHSearchWeb').click() 
```

關於selenium 你可以更多看文件：https://selenium-Python.readthedocs.io/index.html
    
接下來執行你就會很清楚的發現電腦另立一個新的chrome，然後坐著我們想要做的事...
    
這樣的工作可以做什麼？可以延伸什麼？1.表單填寫：例如如果電子連署我可以大量搞死人連署（大誤ＸＤ2.軟體工程師的網頁測試3.可以和beautifulsoup搭配，天底下已沒有你爬不到的資料XD4.其他你覺得用瀏覽器很麻煩的動作