---
title: Python 起手式：談物件導向
date: '2018-10-11 14:37:57+00:00'
tags:
- python
- ithome
---
嗚，到第11天了！今天來談談物件導向的部分，物件導向簡單來說就是一種“物件”的資料型態。這種資料型態比較特別的就是在物件裡，有“屬性”和“方法”，不像之前所介紹的資料型態比較單向，數字就是數字;文字就是文字。 
    
Python的物件表示非常簡單，只要使用'class'這個關鍵字就好，然後記得要“縮排”，在Python當中，縮排可以視為一種區塊。而要使用物件這種資料型態只要用你所宣告的class新名稱，然後加入‘()’就好了。如下所示：

```python 
class Person:
    height=5
    weight=40

John = Person()
print(John.height) #5
```
然後在上面的例子中，我們的height和weight都被寫死了，在現實世界我們的height和weight都不太一樣，在物件導向的世界有construct這個方法可以使用，php、ruby都是這樣，那Python呢？請看底下示範
```python
class Person:
  def __init__(self, height, weight):
    self.height = height
    self.weight = weight

John = Person(5, 40)
print(John.height) #5
```
Python厲害的地方是不用特別宣告屬性，直接在init 這個方法做出宣告即可。請記得，***self是必要的***，然後記得縮排，Python的construct就完成了

而物件導向除了屬性，也有方法，在這裡我用程式帶過：
```python
class Person:
  def __init__(self, height, weight):
    self.height = height
    self.weight = weight
  def sayHello(self):
    print('Hello')

John = Person(5, 40)
John.sayHello() #Hello
```
所以呢，Python的方法就是用def這個關鍵字，然後請記得加入self，記得縮排就可以啦！當然，也可以試試看加入外部的參數
```python
class Person:
  def __init__(self, height, weight):
    self.height = height
    self.weight = weight
  def sayToPersonHello(self,name):
    print('Hello '+ name)

John = Person(5, 40)
John.sayToPersonHello('Jim') #Hello Jim
```  