---
title: Python 起手式：總是要有control flow！
date: '2018-10-03 14:09:29+00:00'
tags:
- python
- ithome
---

# 前言
昨天展示了超簡單input和output的小程式，如果程式只是in and out ,那麼有什麼好繼續學的呢？當然啦，garbage in ,garbage out，如果丟程式非預期的輸入，當然程式輸出就是各種error或垃圾啦！程式的厲害之處及關鍵就是在於他的演算法，演算法你可以理解為“做事情的方法”，做事情、總是會有一套流程與一連串的動作，而在這樣的流程與動作中，我們可以分類一些路徑，在這裡我們稱之為「control flow」(控制流)
    
control flow 分為兩個：條件和迴圈

# Python的註解方法
ㄧ開始，我應該要先介紹註解，哈 昨天就應該先寫的～

註解是一個程式撰寫上的說明，你可以使用它向下次要看你程式的人（或者也可能也是你自己）說明你這段要寫的內容、可能怎麼運用、或者提醒什麼注意事項。
  
```Python
//這是單行註解用法
'''
這是多行註解用法
'''
```
# Python的條件敘述
Python的條件敘述表示如下（此為虛擬碼-一個不是正式程式碼的表示法）

```Python
if (boolean exp1):
    #statementsA...
elif (boolean exp2):
    #statementsB...
else:
    #statementsC...
```
說明：

在Python 中，縮排是一件非常重要的事情，有點像是php的{} ，所以Python就是一種強迫你排版的程式語言（誤！

exp 是運算式，在if 和elif 用括弧把它包起來，而exp將會輸出true 或false ,就是現實中的對還是錯，如上面虛擬碼所示，如果exp1 是對的就會走statementsA;exp2是對的就會走statementsB;兩個都錯的話就走statementsC，對了 如果只有一個條件的話只要寫if...else 就好，elif的區塊可以省略。還有，else 是代表前面的敘述式都沒有對的話，最後才走的流程。

關於條件敘述你可以參考這個[維基資料](https://en.wikipedia.org/wiki/Conditional_(computer_programming))

 - **注意if、elif、else 後面要加上`：`**
 - **Python 沒有switch...case的敘述喔，相關資料以及要實現的可以參考[此網址](http://Python.jobbole.com/82008/)**
    
# Python的迴圈敘述

```Python 
# 1)
for i in range(start,stop,step):
    #statements
# 2) 
while (exp):
    #statements
```

說明:

Python的迴圈很簡單，就是for 和while敘述，然後如果只是單純的數字迴圈就用range(start,stop) 這樣i就會從start跌代到stop(**不包含B**)(沒有宣告step就預設為1)，舉例來說range(1,5)，i就會從1,2,3到4
    
如果，你想要從5迭代到1呢？ 你可以用range(5,0,-1) ，這樣i就會 5,4,3,2,1
    
當然，“：”很重要、縮排也很重要！

注意，Python沒有foreach喔，如果要foreach 可以把range替換成你要的array物件，這樣就可以使用了

相關資料請參考[此網址](https://stackoverflow.com/questions/40346498/Python-foreach-equivalent)
    
# 總結：寫個猜數字小遊戲
好了，就別只光說不練，來個簡單的猜數字小遊戲，希望你們可以更加理解條件和迴圈敘述，請在你所在的目錄增加一個“game.py”，然後請參考以下這段程式碼

```Python
import random

ans =  random.randint(0,10) #取從1到10的亂數

print('請猜一個0~10的數字')
play = True
while(play):
    guess = int(input('來隨便猜一個數字吧: ')) #input出來預設為str，轉型為int
    if (guess > ans):
        print('喔你猜得太大囉')
    elif (guess < ans):
        print('喔你猜得太小囉')
    else:
        print('恭喜你猜對了！')
        play = False

```
    
接下來執行`python3 game.py`就可以玩個簡單的猜數字遊戲囉！
這個簡單的猜數字小遊戲我就不說明了，如果還是有不懂或錯誤，歡迎留言指教喔！