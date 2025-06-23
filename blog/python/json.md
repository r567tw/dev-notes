---
title: Python 走入現實：json
date: '2018-10-23 15:01:37+00:00'
tags:
- python
- ithome
---
今天來講怎麼用Python怎麼讀取json. 
    
json 是一個資料表示的型式。以範例來看：
```python
import json

# json 的資料形式字串
x =  '{ "name":"jim", "age":25, "city":"Taiwan"}'

# 轉換json
person = json.loads(x)

print(type(person)) #<class 'dict'>
print(person){'name': 'jim', 'age': 25, 'city': 'Taiwan'}
print(person['age']) #25
```
    
要讀取json非常簡單，import json這個module然後經由loads這個方法轉出，會產生一個dictionary型態資料
    
接下來，是反過來～把Python的物件轉換成json，則使用dumps方法
    
```python
import json

person = {'name': 'jim', 'age': 25, 'city': 'Taiwan'}

data = json.dumps(person)

print(type(data)) #<class 'str'>
print(data) #{"name": "jim", "age": 25, "city": "Taiwan"}
```
    
    
      