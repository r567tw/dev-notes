---
title: Python 起手式：Functions
date: '2018-10-10 12:32:19+00:00'
tags:
- python
- ithome
---
前幾天總算把變數的部分有點寫得差不多了，但我知道根據我自己研究起來的資料還有很多很多可以探討的，但我也不想拿來騙鐵人賽的天數XD 所以算是寫了一個段落就告別一個階段。這是一個新的階段，就是來講講關於程式的函式，又可能稱為功能之類的，總之php是這樣寫的： 
```php
<?php
function sayHello($name){
    echo 'hello, '.$name;
}

sayHello('Jim'); #output: hello, Jim
```

function 有點像是物件導向裡面的封裝，把你要跑的流程或者要使用的變數等等寫在一個區塊中，並且為這個區塊取一個名稱，而你只要呼叫這個名稱而且給予這個區塊可以處理的input就可以輸出經過這個區塊處理好的output或者要做的作為，在這個區塊中，你可以return也可以不return （但似乎有return會比較好）
    
function就是現實世界中我們遇到的數學函式，例如三角函數或者什麼幾元幾次方程式之類的，你代入某個數，就會出來一個結果。
    
Python的function也超簡單的
```python 
def functionname( parameters ):
   # ...statement...
```
請注意喔，***Python的':'及縮排都極為重要***，要放入statement 請縮排。在這裡我就做一個簡單示例吧！    
```python
def sayHello(name):
    print('Hello ,'+name)

sayHello('Jim') #Hello ,Jim
```