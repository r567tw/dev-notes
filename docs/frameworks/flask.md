# Flask

## 入門
- pip install flask
```python
from flask import Flask

app = Flask(__name__,static_folder='/tmp')

@app.route('/')
def hello_world():
    return 'hello world'

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=9000)
```

```
@app.route('/item/<id>')
def item(id):
    return 'Item:{}'.format(id)

@app.route('/login',methods=['GET','POST'])

redirect(location,code=301)
```

- 設定
```
app.config['DEBUG'] =True
app.config.update(DEBUG=True,SECRET_KEY='...')
```
- SQLAlchemy

## flask 進階
- pip install blinker
- pip install flask-login
- pip install flask-script // python manage.py startapp
- pip install flask-debugtoolbar
- pip install flask-Migrate
- pip install flask-wtf
- pip install flask-security
- pip install flask-restful
- pip install flask-admin
- pip install flask-assets
- pip install Werkzeug //middleware

## REST 和 Ajax
- REST:  Representational State Transfer
    - 資源
    - client/server
    - 無狀態
    - 快取
    - 統一介面
    - 分層系統
- Ajax: 非同步javascript and xml

## 網站架構
- WSGI : python web server gateway interface
- WSGI 標準 在 PEP333 規定一種在web server 和ｗeb application 之間推薦的標準介面
    - Gunicorn
    - uWSGI

- Nginx :web 伺服器- 負責處理http 協定，透過WSGI介面丟到web application 處理
- web application ->內容/其他協定

- 反向代理 和 正向代理
- 快取系統
    - 避免透過直接存取資料庫對資料庫造成很大的負擔
    - Memcached
    - Redis

- 快取更新策略
    - 懶惰式載入：如果快取找到，就回傳：如果沒找到在去找資料庫並更新寫回快取
    - 主動更新：預設快取永不失效，當有資料需要更新時同時也會把最新資料寫回快取中，如果耗時，應使用非同步的更新

- 分片和叢集管理

- NoSQL:Not only SQL
    - 不預先定義模式
    - MongoDB
- CDN
- 大型網站架構經驗
    - 快取
    - 負載平衡
    - 高可用性
    - 業務拆分
    - 叢集
    - 減少頁面請求和請求內容量
        - http 是無狀態的應用層協定，每次請求都要client and server 啟動獨立執行緒處理。
    - 動靜頁面分離
    - 動態頁面靜態化

## 系統管理
- supervisor
- fabric
- psutil

## 測試和持續整合
- unittest
- doctest

## 訊息佇列和celery
- Message Queue: 提供非同步通訊協定，可以實現處理程序間通訊或同一處理程序的不同執行緒間通訊
- beanstalked
- RabbitMQ
- celery

## 服務化


## 資料處理
- MapReduce
- Pandas

## 幫助工具
- Ipython
- Jupyter Notebook

- 了解linux 伺服器執行狀況
    - free
    - uptime
    - dstat
    - glances
    - iftop
    - sysdig
    - nethogs
    - iotop
    - iptraf

- boom 壓測工具
- tcpcopy

## python 平行處理程式設計

## python 進階

## web 開發專案實作
