---
title: Python 起手式：module
date: '2018-10-13 08:24:09+00:00'
tags:
- python
- ithome
---
這將會是起手式的最後一篇文章，之後將會寫關於爬蟲、File IO 或者其他像是Django 與Flask的淺談。這裏我要來給大家介紹一個蠻有趣的東西，通常我們寫程式不會都是一個檔案寫到底的，所以這裏我們要展示一下如果多個檔案的話，Python要如何運用...同時也教教大家我們是怎麼使用module的 
    
要把module用在自己的Python檔案要怎麼用呢？ 其實很簡單：就是用'import'這個關鍵字就好。
    
所以你可以看到之前數字遊戲當中以及之後有許多的範例程式碼會看到import或者from這些關鍵字...那些大部分是Python內建的modules,或者透過pip安裝後的modules...
    
以下我展示我們如果要引入別的檔案該怎麼辦？來假設目前的目錄有x.py 和y.py    
```python
#x.py
class Aclass:
    def sayHello(self):
        print('Hello World')
```
如果y.py要用x.py裡面的x.py的Aclass怎麼辦呢？你可以用from或import這些關鍵字啦，有兩種寫法    
```python 
#y.py 寫法一
import x #將x.py所有內容引入

test = x.Aclass()
test.sayHello() #Hello World

#y.py 寫法二
from x import Aclass #將x.py引入裡面的Aclass

test = Aclass()
test.sayHello() #Hello World
```

這樣就大概完成啦，說真的因為Python都是目前下班的玩具語言，好少這樣玩也好少這樣寫，可能還有很多東西可以值得探究，所以就留待明天繼續寫吧～ 起手式：遺珠之憾！