---
title: Python 起手式：繼承
date: '2018-10-12 14:47:42+00:00'
tags:
- python
- ithome
---
其實物件導向的世界很大，有空可以去翻翻設計模式（design pattern)(大誤？！或許我只是新手，只是寫給for 新手或者我自己寫來看，所以就沒太多的專研，但物件導向確實是個值得探討很久的議題，預計可以多寫幾天的鐵人賽（誒～ 好啦，我還是配合自己的步調好了，我還是希望後面我可以寫到爬蟲啊、Django或者flask等等的。 
    
經過研究發現，我們其實不知不覺就已經使用到繼承，我以昨天寫的person 類別為例。
```python
class Person:
  def __init__(self, height, weight):
    self.height = height
    self.weight = weight
  def sayToPersonHello(self,name):
    print('Hello '+ name)

print(type(Person)) #<class 'type'>
print(type(John)) #<class '__main__.Person'>
print(Person.__bases__) #(<class 'object'>,)
```

其實我們在寫person這個類別的時候，其實就繼承了object這個類別...
    
所以接下來，我們可以宣告women這個類別繼承Person, 在Python好簡單，只要類別名稱旁邊加入（）即可，然後括弧內加入類別的名稱。    
```python
class Person:
  def __init__(self, height, weight):
    self.height = height
    self.weight = weight
  def sayToPersonHello(self,name):
    print('Hello '+ name)

class Women(Person):
  def __init__(self,height,weight):
    super().__init__(height,weight)
  
  def period(self):
    print('women has period!')

Jennifer = Women(5, 40)
print(type(Women)) #<class 'type'>
print(type(Jennifer)) #<class '__main__.Women'>
print(Women.__bases__) #(<class '__main__.Person'>,)
Jennifer.sayToPersonHello('Jim') #Hello Jim  #子類別也可以呼叫父類別的方法
Jennifer.period() #women has period !
```
後記：(更)發現物件導向一研究起來真的不得了，Python可以允許多重繼承，以及他沒有interface等等...好多好多，看來還是日後有更多研究後在繼續寫下去吧...
    
例如多重繼承的程式碼範例，將Women 同時繼承Person和Animal等類別...居然可以通過！    
```python
class Person:
  def __init__(self, height, weight):
    self.height = height
    self.weight = weight
  def sayToPersonHello(self,name):
    print('Hello '+ name)

class Animal:
  def __init__(self,name):
    self.name = name
  def spark(self):
    print('spark!')

class Women(Person,Animal):
  def __init__(self,height,weight):
    super().__init__(height,weight)
  
  def period(self):
    print('women has period !')

print(type(Women))#(<class '__main__.Person'>, <class '__main__.Animal'>)
print(type(Jennifer)) #<class '__main__.Women'>
Jennifer = Women(5, 40) 
Jennifer.spark() #spark!
```
然後關於物件導向的部分先在這裡告一個小小段落，發現真的好多東西，為了我自己的良心，我還是慢慢研究慢慢的將成果與大家分享，如果有高手的話歡迎來指教一下！....

附上我的參考資料：
- https://openhome.cc/Gossip/Python/index.html
- https://stackoverflow.com/questions/15526858/how-to-extend-a-class-in-Python
- https://stackoverflow.com/questions/372042/difference-between-abstract-class-and-interface-in-Python
- https://stackoverflow.com/questions/2124190/how-do-i-implement-interfaces-in-Python
- https://stackoverflow.com/questions/12179271/meaning-of-classmethod-and-staticmethod-for-beginner