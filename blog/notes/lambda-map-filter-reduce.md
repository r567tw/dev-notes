---
title: "談Python: Lambda, Map , Filter 及 Reduce"
date: "2021-04-03 05:21:00+00:00"
tags:
  - python
---

從大二開始研究怎麼當一名駭客之後，開始接觸 Python, 出社會後也常常用 Python 開發我個人的工具包，可說是這幾年來個人 Python 的功力大漲！

最近在邊寫邊查資料的過程當中，認識到 Python 的 Lambda,Map 和 Reduce

於是，就讓我寫一篇文章記錄這一切吧 ＾＾

<!-- truncate -->

# Lambda

此 Lambda 不是 AWS 的 Lambda ,我也不知道為什麼這裡要取和 AWS 的 Lambda 一樣的名稱哈哈，總之他是一種 Python 裡面的表示式，可以更加簡便、更加 Function programming 的呈現程式碼，不多贅述，我最喜歡 Show me the code 了！

```python
# 通常我們定義Function是長這個樣子（順便我也想練習強型別，Python也支援喔）
def demoX(x:int) -> int:
    return x + 10;

print(demoX(20)) //output-> 30
```

其實蠻落落長的，所以 Python 說，要有 Lambda , 就有 Lambda

```python
demoX = lambda x: x+10

print(demoX(20))
```

好了，我附上參考網址結束這一切：

- https://openhome.cc/Gossip/Python/LambdaExpression.html

# Map 和 Reduce

`Map` , `Filter`和 `Reduce` 我想要放在一起說，如果常寫 Function Programming 的對這兩個單字一定不陌生，Laravel 的`Collection`也有這些方法。沒錯，他們的用法其實和他們的單字意思很像呢！

```python
# map(function_to_apply, list_of_inputs)
a = list(map(lambda a: a+2,[1,2,3]))
print(a) # [3,4,5]
```

`map` 其實就會迭代列表中的每一個項目，最後回傳出來的是一個`map`的物件，記得之後要用`list`才能把它印出來喔

```python
a = list(filter(lambda a: a>2,[1,2,3,4,5,6]))
print(a) # [3, 4, 5, 6]
```

`filter` 其實和`map`很像，只是它是過濾項目，一樣他是個`filter`的物件，一樣需要`list`，所以你的 function 裡面請回傳出`boolean`，這我就不多說明啦～

```python
from functools import reduce

a = reduce(lambda a,b: a+b,[1,2,3])
print(a) # 6
```

至於 `reduce`需要先 `import` 喔，只要有一個**有兩個參數的 function** , 他就會迭代這清單的項目做出最後的結果

參考網址:

- https://book.Pythontips.com/en/latest/map_filter.html

> 小君曰：Python 也能 Function Programming !
