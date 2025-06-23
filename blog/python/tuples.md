---
title: Python 起手式：淺談tuples
date: '2018-10-08 13:49:55+00:00'
tags:
- python
- ithome
---
tuples 也是Python的資料型態之一，同屬於“列表”的一種。宣告方式如下 
    
```shell
>>> tuple =('a','b','c');
>>> tuple
('a', 'b', 'c')
```

tuple 同樣與list一樣可以放置不同的資料型態，唯一不同的是兩者的宣告方式一個是用小括弧;另一個則是使用中括弧。兩者最大不同之處就是tuple不能修改、新增，而list可以。
        
```shell
>>> list = ['a','b','c','d']
>>> list[0]='c'
>>> list
['c', 'b', 'c', 'd']
>>> tuple=('a',0,2,'c')
>>> tuple
('a', 0, 2, 'c')
>>> tuple[0]='b'
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'tuple' object does not support item assignment
```
 
參考資料：
- https://www.w3schools.com/Python/Python_tuples.asp
- http://itman2266.blogspot.com/2013/05/Python-tuple.html
- https://ithelp.ithome.com.tw/articles/10185010