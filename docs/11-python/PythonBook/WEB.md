# 精通 Python：運用簡單的套件進行現代運算

## 第九章 WEB 開展
### 標準程式庫
- http
- urllib
```
import urllib.request as ur
url = 'https://randomuser.me/api/'
conn = ur.urlopen(url)
data = conn.read()
print(data)
```
- Requests
```
import requests
url = 'https://randomuser.me/api/'
resp = requests.get(url)
print(resp.text)
```
- 啟動簡易伺服器
```
python -m http.server
python3 -m http.server
```
- WSGI : web 伺服器閘道介面

### 框架
- Bottle
- Flask
- Django
- web2py

### other
```
import antigravity # 會開啟一個特別的網頁
import webbrowser
webbrowser.open('https://google.com')
webbrowser.open_new('https://google.com')
```
- RESTFul API
- JSON
- Crawl & Scrape
```
pip install scrapy
pip install BeautifulSoup4
```