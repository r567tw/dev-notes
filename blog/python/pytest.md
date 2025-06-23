---
title: Pytest 簡單教學
date: '2019-09-08 08:03:52+00:00'
tags:
- pytest
---
最近在整理自己的履歷和side projects......，順便也買了一些線上課程學習，其中有一門課是教你演算法，舉Leetcode 裡面的題目為例，如果再工程師界久了都知道，Leetcode 是一個刷題網站，而我身為想要變強的工程師當然不可以忽略這個網站啊...... 因此在bitbucket 開了一個專案，放置一些藉由上課所學習的解題檔案（線上課程用的是JAVA），但我想要轉成Python ，藉此提升自己的Python實力~~

如果有興趣可以來看看，但因為目前上課進度緩慢，其實也才幾題而已XD https://bitbucket.org/r567tw/leetcode/src/master/

不過在本機跑的時候也想要自己就先在本機測試一下不要用leetcode 在那邊幫我測試...但之前都是用類似以下的語法
```python
test = Solution(); #先new 一個Solution 的class
print(Solution.method(...)) #然後呼叫方法一個一個用肉眼檢查
```

這種方法超級土法煉鋼的... 完全就不是工程師的style ~~

而我是一個php工程師，之前花了一點時間了解phpunit , 然後也有在一些專案寫一些UnitTest... 心想.... 難道Python 沒有嗎？

叮咚！ 原來就是Pytest 啊！ 我現在leetcode 刷題要在本機測試都會使用這個來玩玩看的！接下來我要介紹怎麼使用Pytest，以及我如何將這個導入到我這個leetcode 的練習專案。

# 安裝Pytest

首先你要使用pytest 之前就一定要確認pytest 有沒有在你的電腦當中（廢話！），所以你可以參考[這個文件][1]來幫助你安裝pytest ,其實也就這麼簡單
```shell
$ pip install pytest
```

然後其實很簡單，就是使用pytest 這個指令或者pip freeze 確認pytest 在不在就好了啊

# 使用Pytest

其實和phpunit 很像，其實也是用所謂“assert”的方式確認答案是否正確，以底下程式碼為例說明：

```python
from solutions.atoi import Solution


def test_myAtoi():
    test = Solution()
    assert(test.myAtoi("42") == 42)
    assert(test.myAtoi("   -42") == -42)
    assert(test.myAtoi("4193 with words") == 4193)
```

其實Pytest 的部分就是去偵測你的個函數名稱是否前綴有個\`test\` ，如果有的話就會跑底下的內容，於是一個完美個TDD流程完成！

接下來就是跑個指令、然後看看結果就好了，以我目前很緩慢只有解Atoi\Palindrome\Pow 的狀況就像底下的情況一樣

alindrome

```shell
$ pytest
============================================= test session starts =============================================
platform darwin -- Python 3.6.4, pytest-3.3.1, py-1.5.2, pluggy-0.6.0
rootdir: /Users/fang/playground/leetcode, inifile:
collected 3 items                                                                                             

tests/test_atoi.py .                                                                                    [ 33%]
tests/test_palindrome.py .                                                                              [ 66%]
tests/test_pow.py .                                                                                     [100%]
========================================== 3 passed in 0.05 seconds ===========================================
```

你寫幾個測試檔案，裡面就會有幾個items ，如果你最後沒看到什麼failed 的話就表示你都很順利喔～

剩下的我就利用一些modulte 引入的概念，將資料夾很清楚分出tests 和 solutions ，之後我就在solutions 裡面放入leetcode 這題的解法，而tests 裡面放的就是要被驗證的結果，沒過pytest 就會告訴我沒過了

> 小君曰：之後要參加鐵人賽了，就決定暫時不繼續努力週更了ＸＤ
 [1]: https://docs.pytest.org/en/latest/getting-started.html