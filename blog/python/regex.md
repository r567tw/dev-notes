---
title: Python 走入現實：正規表達式
date: '2018-10-18 15:47:55+00:00'
tags:
- python
- ithome
---
不好意思發現要爬蟲多媒體資源時發現一些問題，目前還在debug中哈哈... 
    
以後再來試試看怎麼取獲取多媒體資源，我承諾在鐵人賽結束前一定會想辦法生出來，今天為了能夠完成這一天先以正規表達式代打真是不好意思了。
    
在Python中用正規表達式非常簡單，就是用're'這個module    
```python
import re

string = 'Hello World'
relist = re.findall(r"[a-z]*",string)
print(relist)
```
這樣你就會求出a-z 的文字喔。
    
正規表達式對於我們在搜尋或者分析資料非常好用

提供一些可以參考的資料：
- https://regex101.com/
- http://ju.outofmemory.cn/entry/71121