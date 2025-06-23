---
title: 建立一個Pypl package
date: '2022-11-06 10:47:20+08:00'
tags:
- package
- pypl
---

這是一篇隨便寫一寫的文章，主要是紀錄我想要建立一個簡單的pypl package紀錄。
建立一個自己的 pypl package 其實還蠻簡單的，需要先事先準備的是:

- 一個pypl帳號或一個 testpypl 帳號：在這裡我使用testpypl, 這個網站就是pypl官方來測試pypl package的網站用的，所以測試的話你可以盡量使用。如果你要正式使用可以使用pypl帳號喔。
- twine pypl package
- build pypl package

# 第一步：準備
當然是建立自己的 package 拉，在這裡我簡單建立一個名為`r567tw_pypl`的pypl package 為例。
> 注意：這裡的名稱建議最好不要使用“-"，我在這裡吃了蠻多苦...(參考:https://stackoverflow.com/questions/761519/is-it-ok-to-use-dashes-in-python-files-when-trying-to-import-them)

資料夾結構會像這樣：
```
├── pyproject.toml
├── src
│   └── r567tw_pypl
│       ├── __init__.py
│       └── greet.py
```

- `__init__.py` 裡面保持空白就好，如果你有曾經處理local package的相關議題，應該可以知道這個檔案在做什麼
- `pyproject.toml`:最重要的檔案，等等會說明 
- `greet.py` 裡面就是你要寫的程式碼拉，或者你要另外寫py也可以，我這裡以greet為例

> 有些教學會教你建立`LINCENSE`  和`README.md`，但因為我們這裡只是測試用我也沒有要很認真將這個當成package經營，我這裡就直接忽略掉了，但不影響我們後面建立package

`greet.py`裡面就這樣寫
```python
def hello(name = None):
    print(f"Hello {name}")
```

至於最重要的檔案：`pyproject.toml` 以我此次要建立的package為例，就這樣寫
```toml
[project]
name = "r567tw_pypl"
version = "0.0.1"
authors = [
  { name="r567tw", email="r567tw@gmail.com" },
]
description = "example package for practice"
readme = "README.md"
requires-python = ">=3.7"

[project.urls]
"Homepage" = "https://github.com/r567tw/r567tw-pypl-package"
"Bug Tracker" = "https://github.com/r567tw/r567tw-pypl-package/issues"
```

裡面其實也有很多規範與格式可以參考，可以自行上網看看其他人或官方怎麼寫。


# 第二步：建立上傳的package
接下來我們就來使用`build`這個package來建立我們要準備上傳給pypl的部分...
```
python -m build 
```

> 接下來你就會看到很多檔案被建立：{package_name}.egg-info、dist資料夾。其中最重要的正是這個dist資料夾

最後使用`twine`這個package來上傳吧，如果你要上傳正式pypl,把中間repository拿掉即可
```
twine upload --repository testpypi dist/*
```

接下來他會問你帳號＆密碼，把你剛剛註冊的資料輸入進去就好囉。

# 最後，來測試一下吧
先建立很純淨的環境
```
virtualenv other
```

然後`pip list`
```
Package    Version
---------- -------
pip        22.2.2
setuptools 65.4.1
wheel      0.37.1
```

很確定很乾淨、沒有我們裝的套件。
然後到`twine`最後丟給你的網址，以這裡為例是：https://test.pypi.org/project/r567tw-pypl/
就按照他中間的指令安裝：
```
pip install -i https://test.pypi.org/simple/ r567tw-pypl
```

這時候`pip list`就會很清楚看到套件已經安裝。
```
Package     Version
----------- -------
pip         22.2.2
r567tw-pypl 0.0.1
setuptools  65.4.1
wheel       0.37.1
```

最後，讓我們實際來玩玩看吧：
```python
from r567tw_pypl import greet


greet.hello("World!")
```

執行後, Good, 看到我們要的結果拉！

# 回顧
此教學極為簡易，只是把目標純粹focus在建立個簡單的pypl package. 像是test啊、還有`pyproject.toml`裡面的設定都可以再說個一篇兩篇之類的，像是我對於`build-system`那裡就還不太懂...或許之後找時間可以再更多專研研究。

# 參考來源
https://packaging.python.org/en/latest/tutorials/packaging-projects/

整個實作程式碼可以參考這裡：https://github.com/r567tw/r567tw-pypl-package

> 小君曰：Hello Pypl
