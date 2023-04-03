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