---
title: Python起手式：探討lists
date: '2018-10-07 07:01:07+00:00'
tags:
- python
- ithome
---
前面談到資料結構numbers 數字。今天來講講在程式語言當中很重要的list（我發現之前用collection 形容有點不太恰當，我會修改之前寫的文章！事實上在Python中有一個collection的module 誒～我鐵人賽又可以多一天來寫啦XD） 
    
關於collection 可以參考：https://docs.Python.org/2/library/collections.html我想以後再找一天為這個部分做個小專題好了！
    
另外本篇文章我也是參考：https://www.tutorialspoint.com/Python/Python_lists.htm
    
在現實中，我們也是有這種list的概念。像是班級的學生名冊、或者成績風雲榜、排名等等，就是那種以“串”為單位的資料型態。在php當中，就是array ,也是程式語言中常稱呼的「Array」(陣列)注意：Python 沒有 array
    
在Python中，list宣告很簡單

```shell 
>>> list = ['a','b','c']
>>> print(list)
['a', 'b', 'c']
```
用`[]`作為宣告的符號，包住你想要包的資料，資料與資料以`,`作為區隔
而list 可以變化他的值，其中有 insert 、append、或者index等等方法....你可以任意運用以下我謹以程式碼帶過操作：

```shell 
>>> list= ['a','b','c','d']
>>> list
['a', 'b', 'c', 'd']
>>> type(list)
<class 'list'>
>>> list.append('e')  #將元素放到list的最後
>>> list
['a', 'b', 'c', 'd', 'e']
>>> list.count('a')  #這個元素在list有幾個
1
#值得一提的是如果要知道list裡面有幾個元素不可以用count(),count裡面一定要有參數，你可以使用len(list)
>>> len(list)
5
>>> list.insert(0,'a') #你也可以宣告index(list index以0為開頭)，然後插入元素，不過在那個index之後的元素將會都往後移。
>>> list
['a', 'a', 'b', 'c', 'd', 'e']
>>> list.remove('d')
>>> list
['a', 'a', 'b', 'c', 'e']
>>> list.append(5) #list裡面可以允許不同的形態
>>> list
['a', 'a', 'b', 'c', 'e', 5]
>>> list.reverse() #把list倒轉 
>>> list
[5, 'e', 'c', 'b', 'a', 'a']

```
好啦，之後我會陸續介紹tuples 和dictionary 這兩個資料型態，藉此告別Python的資料型態之旅