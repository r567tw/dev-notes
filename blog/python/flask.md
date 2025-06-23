---
title: Python 網頁：Flask
date: '2018-10-28 12:56:44+00:00'
tags:
- python
- ithome
---
寫到這裡真的覺得自己下次要參加鐵人賽要想清楚。 要規劃好內容，也可能自己要寫一些存擋備份（不知道那些完成鐵人賽的是不是都是這樣？） 
    
不然有時候寫到後面，真的不是很想繼續寫下去、也覺得自己寫的內容有點爛ＸＤ
    
也或許自己寫的這個技術並不是自己最在行的，而是自己下班的閒暇之餘所寫的，所以如果有錯或者有什麼提供建議再精進的方向給我！
    
今天要介紹Flask首先，就是要先安裝flask啊！    
```shell
pip install flask
```

接下來建立我們的檔案 index.py

```python
from flask import Flask
app = Flask(__name__)
@app.route("/")
def hello():
    return "Hello World!"
if __name__ == "__main__":
    app.run()
```

最後我們執行index.py就會看到類似底下的訊息
        
```shell
 * Serving Flask app "index" (lazy loading)
 * Environment: production
   WARNING: Do not use the development server in a production environment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

接下來輸入`http://127.0.0.1:5000/` 到瀏覽器裏就會看到Hello World 囉