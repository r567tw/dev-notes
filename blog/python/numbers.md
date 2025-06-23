---
title: Python 起手式：淺談 numbers
date: '2018-10-06 00:42:04+00:00'
tags:
- python
- ithome
---

原本想說變數與型態得部分一天寫完就好，但昨天整理了一下發現原來Python 的型態博大精深，有發現到另外自己以前在玩轉Python沒有注意的細節。（說真的有時候寫Python也很少會注意到這些細節，反正就是要寫什麼查什麼，出了錯自己debug...） 
    
鐵人賽的好處就是為了要給別人看，所以你必須要好好整理、你寫的文章說的話都要是True，不可以隨便唬弄人，也藉著這個機會也是好好為自己學習的Python做出整理。
    
放心，Python的變數不會拖太久，我預計就特別在拉出來講numbers以及collections 就好，文字與boolean因為是蠻簡單的型態，上網查的時候也沒有發現什麼特別的點，所以就不繼續著墨這裏。(20181007更：我發現用collections 稱呼非常不恰當，所以我決定直接以list、tuple和dictionary 稱呼並逐天深入了解介紹)
# Numbers 有三種
numbers就是我們現實生活中常用到的數字，舉凡整數、正整數、負數以及小數等等... 為了確保自己在numbers的理解沒有問題，我特別參考了官網對於numbers的教學：https://docs.Python.org/3/tutorial/introduction.html#numbers

numbers 有三種
1. int
2. float
3. complex
    
簡單來說，Python的numbers 就是可以加減乘除的，同時也支援我們現實的四則運算。
    
    
```shell 
>>> 1+1
2
>>> 1+5*6
31
>>> (1+5)*6
36
>>> type(1+1)
<class 'int'>
>>> type(1+5*6)
<class 'int'>
>>> type((1+5)*6)
<class 'int'>
```
## 整數 int
這個型態最簡單了，就是1到9和0，現實世界中的正整數、負整數和0要宣告負整數很簡單，像現實世界當中加個`-`就好
```shell 
>>> -1
-1
>>> type(-1)
<class 'int'>
>>> type(0)
<class 'int'>
>>> type(15)
<class 'int'>
```
## 小數/浮點數 float
float就是現實遇到的小數，只要你用`.`符號就可以囉
```shell 
>>> 1.5
1.5
>>> type(1.5)
<class 'float'>
```
## complex
這東西有點複雜，我自己也不是很能理解，由於工作的關係也鮮少使用到這個型態。意思是除了純數字及符號以外你還可以加入一些虛數，參考網址：http://www.runoob.com/Python/Python-numbers.html

這裏complex就定義為複數有實數和虛數構成。
```shell 
>>> 5j
5j
>>> type(5j)
<class 'complex'>
>>> 6+5j
(6+5j)
>>> type(6+5j)
<class 'complex'>
>>> -3j
(-0-3j)
>>> type(-3j)
<class 'complex'>
>>> 3-3j
(3-3j)
>>> type(3-3j)
<class 'complex'>
```
    
    
      