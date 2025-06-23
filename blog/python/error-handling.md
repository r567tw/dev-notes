---
title: Python 起手式：Error Handling-以猜數字遊戲為例
date: '2018-10-04 12:52:05+00:00'
tags:
- python
- ithome
---

Python同樣與其他語言一樣，也有他的Error Handling, 什麼是Error Handling呢？程式有輸入也有輸出，還有控制的過程，但萬一在過程當中出錯了怎麼辦？就像郵局從寄信方收到信件、最後要經過處理、透過郵差送信給收信方，在這樣繁複的過程中，有可能會出現一些問題而導致收信方收不到信件。
    
對於程式本身，有哪些地方會出錯呢？這裡我以短短幾年工程師生涯所遇到的雷來談談～
程式本身沒有錯，錯的是撰寫程式的人XD（好悲催～） 好啦！這也就是我們工程師存在的價值啦！沒有人能夠一定保證程式永遠都不會出錯～ Garbage in Garbage out，使用者習慣與環境千千百百種，都會有可能有當初撰寫程式者沒有預期到的輸入，況且，在軟體工程界當中：「沒有不變的需求」，可能這一段時間他可以完全無誤地跑，但有可能以後時間長了或者增加了新需求後，就不能跑了...

還有啊，有時候也不見得是程式撰寫者及程式本身的錯誤，在寫程式的過程當中，有時會呼叫外部的函式庫或外部的API，這有時也不是你的錯，但就這麼剛好他回傳或者你送出的就不是你所期待的，那麼就會噴錯了。

為了解決當程式面對這些error可以仍持續地執行下去。你就一定要有error handling，以確保使用者不會“驚嚇”到

關於Python的error handling 敘述如下

```Python
try:
    {statement area}
catch (error type),(value):
    {error handing}
else:
    { statement area continue...}
finally:
    {finally area}
```

說明：

在Python界當中，縮排和`:`很重要！請務必注意！
而catch後面的 error type和value 不一定要加，你也可以單純的’catch:‘這樣一行帶過

至於error type你可以參考這個[網址](http://www.runoob.com/Python/Python-exceptions.html)else 則是**當try所包的statement無誤的時候**會執行的。

最後finally子句就是無論try或有沒有取得exception,**都會執行的區域**，php同樣也有類似finally的敘述。
    
以昨天寫的猜數字小遊戲為例子，可能出錯的就是input那一塊，因為input是由使用者輸入的，萬一使用者輸入的不是數字怎麼辦呢？同時，我們也加入可以計算你猜數字的次數需求。

所以會改成底下這個樣子：
```Python
import random
ans =  random.randint(0,10) #取從1到10的亂數
times = 0
print('請猜一個0~10的數字')
play = True

while(play):
    try:
        guess = int(input('來隨便猜一個數字吧: ')) #input出來預設為str，轉型為int
    except:
        print('程式出現非預期的錯誤，遊戲結束，答案是'+str(ans))
        #str()是將數字轉文字，'+'串接的必須是同樣的型態。
        play = False
    else:
        times = times+1 #每猜一次就要+1
        if (guess > ans):
            print('喔你猜得太大囉')
        elif (guess < ans):
            print('喔你猜得太小囉')
        else:
            print('恭喜你猜對了！')
            play = False
    finally:
        print('你猜了'+str(times)+'次') 
```

說真的，我寫程式也很少寫error handling，我也是邊查資料邊寫邊做的。如果有錯誤或者要補充的歡迎來指教及提醒。
[參考網址](https://docs.Python.org/3/tutorial/errors.html)