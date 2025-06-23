---
title: Python 起手式：遺珠之憾
date: '2018-10-14 14:03:53+00:00'
tags:
- python
- ithome
---
我覺得起手式有些還未講完的。不過我覺得還是希望可以先結束這一塊！然後開始寫一些爬蟲或file io、爬蟲之類的。 

來吧！所以來開始撰寫一些“遺珠之憾”，希望給大家一些資源好好學習。讓大家知道其實還有很多沒有說到的部分。

1. 多重listlist不只是可以單維，也可以多維。例如像是底下這個樣子
```python
list = [[1,2,3],[4,5,6]]
>>> list[0][1]
2
>>> list[1][2]
6
```
2. turpleturple 不是可以只有用括弧包一、二個值而已，也可以包很多，另外兩個turple也可以相加，不過兩者的相加不過就是兩個的串連。
```python
>>> x = (1,2,'abc','def',6)
>>> y = (3,4,'ghi')
>>> x+y
(1, 2, 'abc', 'def', 6, 3, 4, 'ghi')
(1, 2, 'abc', 'def', 6, 3, 4, 'ghi')
>>> y = (6,2,'ghi')
>>> x+y
(1, 2, 'abc', 'def', 6, 6, 2, 'ghi')
```
3. lambda我們一般來說會這樣寫def 函式
``` def add(a, b):
    return a+b if m > n else n
#result
>>> add(5,6)
11
```
但是我今天研究還有lambda的寫法。
```python
add = lambda a, b: a+b
#result
>>> add(5,6)
11
```
    
    
      