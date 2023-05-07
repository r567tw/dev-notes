---
sidebar_position: 1
---
# WEB
## 執行原理
- input URL (brower)
- HTTP & HTTPS & HTTP2
- CGI Process Request (& connect Database)
- output HTML Page (brower)

## DNS
一個將域名與IP對應連接的伺服器。你可以想像有一個hash表或者dictionary存在某個地方直接對應。

## URI and URL and URN
URI = 資源命名機制、主機名稱、資源名稱
URL: URI的子集

## HTTP、HTTPS、HTTP2
### 請求
1. 請求行: Get/Post/Put/Head/Delete/Option + URI
2. 請求標頭 Header (Request Header)
- accept
- accept-charset : 字元編碼
- accept-encoding : 壓縮
- accept-language
- authorization
- cache-control
- content-length
3. 請求本體 (Request Body)

### 回應
1. 回應狀態碼 Status Code
- 200
- 201
- 400
- 404
- 403
- 405
- 500
2. 回應標頭 (Response Header)
- allow
- content-encoding
- content-length
- content-type
- date
- expire
- last-modified

3. 回應體 (Response Body)

> HTTPS = HTTP + SSL/TLS layer

## Server
Ref: https://tenten.co/insight/dev/apache-nginx-comparison/

## Session & Cookies
> **HTTP是一種stateless的協定**

Session: 伺服器為這次請求開闢一塊記憶體間，這物件便是session物件、結構為ConcurrentHashMap。並且會同時生成session-id, 透過request-header: `set-cookie: JSESSIONID=xxxxxx`,cookie的過期時間是在瀏覽器階段結束之前
Cookie: 瀏覽器的一小段記憶空間

## Web 伺服器實現呼叫介面標準
### CGI
允許WEB伺服器執行外部程式，將他們輸出發送給瀏覽器
### ISAGI
微軟提供的網路服務器標準介面
### WSGI
為Python 語言制定的網路服務器標準介面
### ASGI

## SEO
### Robots
設定搜尋引擎爬蟲: 不允許搜尋蜘蛛爬取全部網站
> 不要讓搜尋引擎加入這個網站...

```txt title=robots.txt
User-agent: *
Disallow: /
```
Ref: https://www.newscan.com.tw/all-seo/robots-block-search-engines.htm

## RESTFul API
:::info
一種透過 HTTP 設計的架構風格
:::
- Resource 通常是單例或集合
- 使用名詞表達Resource
- 表示一制性
- 不在url 使用 crud的名稱
- 使用查詢參數過濾集合

## SSE & Websocket
- SSE 單向的：讓server可以推送資料給client端、基於HTTP 協議
```javascript
res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
```

- Websocket 雙向的：允許Client&Server 雙向通信、基於WS協議,TCP協議
