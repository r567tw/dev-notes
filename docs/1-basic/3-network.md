---
sidebar_position: 3
---
# Network

## 如何看到網頁執行原理
1. 輸入網址：當你在瀏覽器中輸入網址（比如 https://www.example.com），你的電腦會開始尋找這個網址所對應的伺服器。
2. DNS解析：首先，你的電腦會向DNS（Domain Name System，域名系統）服務器查詢網址的IP地址。這是為了將你輸入的網址（如 www.example.com）轉換為伺服器可以理解的IP地址（如 192.0.2.1）。
3. 建立TCP連接：一旦你的電腦獲得了伺服器的IP地址，它會開始與該伺服器建立TCP連接。這涉及到客戶端（你的電腦）向伺服器發送一個SYN（同步）封包，以確立連接。伺服器收到SYN封包後，會回復一個SYN-ACK（同步-確認）封包，表示接受連接請求。
4. 確認連接：客戶端收到伺服器的SYN-ACK封包後，會向伺服器發送一個ACK（確認）封包，表示確認連接已經建立。此時，TCP連接已經成功建立。
5. HTTP請求：現在，你的電腦可以向伺服器發送HTTP請求，以獲取所需的網頁內容。這個請求包含了你想要瀏覽的網頁的詳細信息，比如GET請求。
6. 伺服器回應：伺服器收到你的請求後，會開始處理並生成相應的HTTP響應。該響應包含了網頁的HTML代碼、圖片、樣式表等等。
7. 封包傳輸：伺服器將HTTP響應拆分成多個TCP封包，這些封包依次被發送到你的電腦。在封包傳輸的過程中，每個封包都會通過互聯網路傳輸到達你的電腦。
8. 確認接收：當你的電腦收到一個TCP封包時，它會向伺服器發送一個ACK封包，表示已成功接收該封包。這樣，伺服器就知道該封包已經安全到達，可以繼續發送下一個封包。
9. 網頁渲染：最終，當所有封包都到達並且被接收後，你的瀏覽器會開始解析HTML代碼並顯示網頁內容。圖片、樣式表等資源也會被下載並加載到網頁上，最終呈現給你。

> 而這些請求以瀏覽網頁為例都會走過雙方七層協議...就像U型溜滑梯一樣

## 入門篇
什麼是網路：簡單有「網」與「路」，其實網路在早期台灣政府組織的規劃中，是被規劃在「交通部」的業務範圍呢...（不知道現在還是不是）

簡單來說兩個電腦要溝通，就形成路。很多的電腦要一起溝通，就形成網。所以這就是「網路」

通訊協定：裡面採用各式各樣的「階層」，是為了能將複雜的東西簡單化、越下層是越簡單、越共同的，越上層的則是越複雜、越個別功能

LAN(區域網路,自行架設) vs WAN(廣域網路,業者)
網際網路不等於WAN, 但網際網路用到WAN

封包Packet：把資料切割成固定的單位並加上header
## OSI 七層篇
介面層(實體層：路由,switch)->網路層(IP)->傳輸層(TCP/UDP)->應用層(HTTP)

7 Layers each describe a specific networking component
● Layer 7 - Application - HTTP/FTP/gRPC
● Layer 6 - Presentation - Encoding, Serialization
● Layer 5 - Session - Connection establishment, TLS
● Layer 4 - Transport - UDP/TCP
● Layer 3 - Network - IP
● Layer 2 - Data link - Frames, Mac address Ethernet
● Layer 1 - Physical - Electric signals, fiber or radio waves

### IP
- a.b.c.d/x (a.b.c.d are integers) x is the network bits and remains are host
- Subnet mask is used to determine whether an IP is in the same subnet

## TCP/IP 篇
- 網路介面層：乙太網路 ARP RARP MAC位址 WIFI PPP PPPoE=> 實體＋資料鏈結
為直接連結的電腦互相建立連線
- 網路層：IP ICMP 路由
及所謂的網路架構。也就是多個網路連結起來、以便進行封包處理作業

- 傳輸層: TCP ：高可靠性,三向交握/UDP：迅速性
根據網路層為任意兩個端點提供的通訊功能，建立一個特別性符合網路使用之目的通訊作業

- 應用層: HTTP /RTP(影音串流) / POP3 / IMAP / FTP /DNS=>會談、表現、應用
```
HTTP: Request: request line,header,body & Response: status code,header,body
```

TCP: 
->SYN
<-SYN+ACK
-> ACK

-> FIN
<- FIN+ACK
-> ACK
https://ithelp.ithome.com.tw/articles/10280652

概念較為簡單、普及率高

各階層處理作業＆封包之間關係

IP位址：網路透過IP協定識別每一台電腦的一列編號，由ICANN管理
由4個數字組合

連結埠號

公用IP vs 私有IP(內部網路)
    Class A 10.0.0.0 ~ 10.255.255.255
    Class B 172.16.0.0 ~172.31.255.255
    Class C 192.168.0.0 ~ 192.168.255.255

IPV4 v.s IPV6 ：32位二進制數所組成，「左半部」識別網路、「右半部」識別主機
NAPT 位址轉換技術

子網路遮罩： 可根據IP位址與他做AND運算來查詢網路位址

集線器、交換器
路由器
路由：路由器傳送封包的過程稱之為路由，分為靜態路由與動態路由
路由協定 IGP內部 , EGP外部
DHCP
NAT /NAPT: 轉換位址,使用公用IP表明身份

## 深入淺出 DNS
A
MX
TEXT
CNAME

## 第三章TCP/IP架構
VLSM 可變長度子網路遮罩
CIDR 無類別網域間路由, CIDR表示法
MAC位址
ARP:Address Resolution Protocol:位址解析通訊協議,將IP位址分析出MAC位址

網域名稱

## 好用指令
### Windows
- ping
- nslookup Name
- tracert Name
- ipconfig /all ,Route print

### MAC
- ping 
- dig/dig-x IP
- nslookup Name
- traceroute NAme,ip a
- ifconfig -a, ip r route

## 第四章 網路設備及虛擬化
SDN
OpenFlow

## 安全
資安三要素：機密性、可用性、完整性
DMZ: 隔離區
IDS: 入侵偵測系統
IPS：入侵防禦系統
UTM: 整合式威脅管理的設備



## Socket 篇
- Socket 是一種處理程序呼叫的機制，一種抽象層實作。連結應用層與傳輸層的作用
- Socket 為應用程式隱藏TCP/IP網路傳輸層及以下的網路細節、是各個應用程式溝通的橋樑。
- 透過伺服器和用戶端進行通訊。

## RPC
- RPC 是一種不需要了解底層網路技術就可以透過網路從遠端電腦程式上請求服務的協定
- 主要解決分散式系統中服務與服務之間的呼叫問題

有三個角色
- Registry：將本機服務發布成遠端服務、管理遠端服務
- RPC Server：提供服務介面定義與服務類別的實現
- RPC Client：透過遠端代理物件呼叫遠端服務
> 有點像實做出訂閱模式的結構...


## OpenSSL

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

分享好文章：
- https://github.com/aszx87410/blog/issues/45


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

## Server
### Nginx

#### What is Nginx
- Web Server
  - Serves web content
- Reverse Proxy
  - Load Balancing
  - Backend Routing
  - Caching
  - API Gateway

#### 安裝
- 套件管理器安裝
```
sudo apt update 
sudo apt install nginx
```
- 手動編譯安裝
- docker 安裝
```
docker pull nginx
```

#### 服務啟動與暫停
```
nginx # 看看是否有這個指令並啟動 nginx
ps -ef|grep nginx
# 會看到 有 master 和 worker 兩種進程...

lsof -i:80

nginx -s {signal: quit,stop,reload}

```

- master: 管理文件、worker協同
- worker: 實際處理請求

#### Ref
> Source: https://www.youtube.com/watch?v=sCJcusORiE8

#### 與 Apache 的比較
Apache 和 Nginx 都是流行的 Web 服務器軟件，它們的主要作用是接收客戶端的 HTTP 請求，並向客戶端發送 HTTP 響應。它們之間的比較可以從以下幾個方面進行：

設計理念
Apache 的設計理念是提供一個靈活的擴展框架，允許用戶通過插件機制添加新的功能。Nginx 的設計理念是高性能、低資源消耗和易於擴展。

性能
Nginx 通常被認為比 Apache 更快，主要原因是 Nginx 的事件驅動架構和非阻塞 I/O 設計，可以更高效地處理大量的並發請求。

資源消耗
Nginx 的資源消耗比 Apache 更低，主要原因是 Nginx 的設計目標是高性能低資源消耗。相比之下，Apache 的擴展框架和插件機制需要更多的資源。

配置和管理
Apache 的配置文件通常比較複雜，需要更多的管理和維護工作。Nginx 的配置文件相對簡單，易於理解和管理。

綜合來說，如果需要高性能、低資源消耗和簡單易用的 Web 服務器，建議選擇 Nginx；如果需要更靈活的擴展和功能，可以考慮使用 Apache。當然，在實際應用中，還需要根據具體需求進行選擇。

## Websocket 
- 雙向的：允許Client&Server 雙向通信、基於WS協議,TCP協議


## HTTP/2 & HTTP/3
- https://tools.keycdn.com/http2-test
- https://totoroliu.medium.com/http-2-%E6%98%AF%E4%BB%80%E9%BA%BC-d7de699bdbae
- https://ihower.tw/blog/archives/8489

## HTML
### Link Rel 屬性
- https://zhuanlan.zhihu.com/p/150231042
```
<link rel="prefetch" href="/style.css" as="style" />
<link rel="preload" href="/style.css" as="style" />
<link rel="preconnect" href="https://example.com" />
<link rel="dns-prefetch" href="https://example.com" />
<link rel="prerender" href="https://example.com/about.html" />
```

- preload (紧急下载内容)
- prefetch (使用低优先级策略下载内容)
- preconnect (连接到服务器)
- dns-prefetch (解析域名)
- prerender (在后台渲染页面)