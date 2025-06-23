---
title: Python 起手式：dictionary
date: '2018-10-09 13:54:18+00:00'
tags:
- python
- ithome
---

寫到這裡，真的覺得可以寫滿30天持續不間斷的真的超級強大的，我覺得自己快撐不住了。不過為了能夠學會Python，我仍然願意忍受工作的辛苦想耍廢之後，還是要繼續寫下去...... 同時，原本是想自己慢慢寫慢慢自己看的，沒想到居然有這麼多人訂閱這篇文。真是讓我受寵若驚，這也是我必須要繼續寫下去的理由。 

Python 中也有一個資料型態，叫做“Dictionary”，有點像是php的 associative arraysphp 是這樣表示的：
```php
$age = array("Peter"=>"35", "Ben"=>"37", "Joe"=>"43");
```
而在Python當中，dictionary是這樣表示的
```python
age = {'Peter': 35, 'Ben': 37, 'Joe': 43}
age['Peter'] # 35
```

而dictionary 和 list一樣可以修改
```python
age['Ben']=38
age # {'Peter': 35, 'Ben': 38, 'Joe': 43}

```

至於dictionary的刪除或清空則需要這樣
```python 
age = {'Peter': 35, 'Ben': 37, 'Joe': 43}
del age['Joe']
age # {'Peter': 35, 'Ben': 37}
age.clear()
age # {}
```

比較特別的是，dictionary可以轉換成string
```python
age = {'Peter': 35, 'Ben': 37, 'Joe': 43}
len(age) # 3
str(age) # "{'Peter': 35, 'Ben': 37, 'Joe': 43}"
type(str(age))  # <class 'str'>
type(age)  # <class 'dict'>

```

其他操作
``` python
age = {'Peter': 35, 'Ben': 37, 'Joe': 43}
age.get('Ben') # 37
age.items() # dict_items([('Peter', 35), ('Ben', 37), ('Joe', 43)])
type(age.items()) # <class 'dict_items'>
age.keys() # dict_keys(['Peter', 'Ben', 'Joe'])
age.values() # dict_values([35, 37, 43])

```
    
同場加映 
```Python
age = {'Peter': 35, 'Ben': 37, 'Joe': 43}
list(age.keys())  #可以只取dictionary 的key的list
# ['Peter', 'Ben', 'Joe']
list(age.values()) #可以只取dictionary 的value的list
# [35, 37, 43]
```

參考資料：
- https://www.tutorialspoint.com/Python/Python_dictionary.htm