---
title: "Network"
sidebar_position: 2
---

<!-- @todo: 加入一個 info notification 的敘述讓文章讀起來更順 -->
<!-- info: 此為我對網路與後端工程的理解、筆記大全，有些也用 ChatGPT 做整理與釐清內容，可能有遺漏或不足之處，資料來自於兩個 udemy 課程、書 -->

## 概述
> 當你上網查看某個網頁時，實際上是一個涉及多個層次的複雜過程，牽涉到多個協議和步驟

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

## OSI七層協議
- Layer 7 - Application - HTTP/FTP/gRPC
- Layer 6 - Presentation - Encoding, Serialization
- Layer 5 - Session - Connection establishment, TLS
- Layer 4 - Transport - UDP/TCP
- Layer 3 - Network - IP > Datagram
- Layer 2 - Data link - Frames, Mac address Ethernet
- Layer 1 - Physical - Electric signals, fiber or radio waves

## 硬體設備
- 集線器、交換器
- 路由器
> 路由：路由器傳送封包的過程稱之為路由，分為靜態路由與動態路由

## 網路設備及虛擬化
- SDN 軟體定義網路
- OpenFlow

## Socket
Socket是一種用於在網路上進行通訊的程式設計介面(API)。它可以在不同電腦之間建立連接，使它們能夠進行資料的傳輸。Socket實際上是一個抽象層，允許應用程式通過它來訪問底層的網路協議，例如TCP或UDP。

在網路應用程式中，Socket扮演著幾個重要角色：
- 建立連接：Socket允許兩個或多個應用程式建立連接，以便在它們之間進行通訊。這個連接可以是單向的或雙向的，取決於應用程式的需求。
- 資料傳輸：一旦連接建立，Socket允許應用程式在這些連接上傳送和接收資料。這些資料可以是文本、圖片、音訊等等，具體取決於應用程式的需要。
- 錯誤處理：Socket還負責處理在通訊過程中出現的錯誤。這些錯誤可能包括連接失敗、資料丟失或網路中斷等，Socket會負責處理這些情況並適當地通知應用程式。
- 關閉連接：最後，當通訊結束時，Socket負責關閉連接。這樣可以釋放資源並確保沒有未完成的連接在系統中留下。

## Protocols
### ARP
- 操作在第二層（資料鏈路層）和第三層（網絡層）之間。它用於將IP地址轉換為對應的物理地址（MAC地址）。

```
arp -a
```

### IP
- a.b.c.d/x (a.b.c.d are integers) x is the network bits and remains are host
- Subnet mask is used to determine whether an IP is in the same subnet
- Private IP 範圍：
    - Class A 10.0.0.0 ~ 10.255.255.255
    - Class B 172.16.0.0 ~172.31.255.255
    - Class C 192.168.0.0 ~ 192.168.255.255
- 子網裡面可以互相溝通、子網和子網之間需透過Router溝通
> 10.0.1.1 就不能和 10.0.2.4 溝通
> 子網之間的通信需要透過路由器（Router）來實現，因為交換器（Switch）主要在同一子網內進行數據傳輸。家用環境中的「路由器」通常內建交換器功能，可以處理子網間的路由以及網內數據交換。

- IP 如果要進入網路需要有公開 IP，就需要透過 Router 出去。
- 子網域遮罩
- DHCP
- CIDR 表示法

### ICMP (In IP)
- Laryer 3 Protocal
- 檢測網路是否有通？
- IP協定裡的一部分，它用於在網絡設備之間傳遞控制消息。
```
ping
traceroute
```

:::info
*** NAT: 將私有IP與公有IP做對應、轉換。介接第三層與第四層的「技術」
:::

### UDP
- Layer 4 Protocal
- Stateless
- 有 Port 的概念
- Use cases: Video Call、WebRTC、DNS Query
- 好處：
    - 低延遲：由於UDP不進行連接建立、維護或終止，它的延遲比TCP更低，非常適合要求實時性的應用，如視頻會議和線上遊戲。
    - 簡單高效：UDP協議的頭部開銷小，只有8個字節，相比TCP的20個字節（不包括選項），這使得網絡通訊更加高效。
    - 支持廣播和多播：UDP可以支持廣播和多播，使得同時向多個目標發送數據成為可能，適用於一些特定的應用場景，如實時信息發布。
    - 無連線狀態：UDP是無連線的，這意味著它不需要在通訊雙方之間建立和維護狀態，這對於那些不需要連線狀態，或者由應用層自己控制狀態的應用來說是有好處的。
- 壞處：
    - 不可靠傳輸：UDP不保證數據包的順序、重複或丟失，也不會對丟失的數據包進行重傳，這可能導致應用層需要自行處理這些問題。
    - 無流量控制和擁塞控制：UDP不進行流量控制和擁塞控制，如果網絡狀態不佳，過多的UDP流量可能會導致網絡擁塞，進一步影響數據的傳輸效率。
    - 安全性問題：UDP較少內建安全特性，比如數據加密和身份驗證，這可能需要應用層或上層協議來補充實現。
    - 無確認機制：由於UDP缺乏數據包確認機制，應用程序無法直接知道數據是否成功到達目的地，這在某些對數據傳輸可靠性有較高要求的應用中可能是一個限制。

- UDP Server Example
```javascript
import dgram from 'dgram'

const socket = dgram.createSocket("udp4")
socket.bind(5555, "127.0.0.1")
socket.on("message", (msg, info) => {
    console.log(`message: ${msg} from ${info.address}:${info.port}`)
})
```
> 存擋成 xxx.mjs
> Tip: .mjs 檔案預設支持 import 和 export 語法用於 ECMAScript 模組，而 .js 檔案預設為 CommonJS 模組使用 require 和 module.exports 語法，除非透過配置改為支持 ECMAScript 模組。

```
nc -u 127.0.0.1 5555
```

### TCP
- Layer 4 Protocol
- Standard for transmission control protocol
- connection & requires handshake
- stateful
- TCP具有 [Multiplexing](https://zh.wikipedia.org/zh-tw/%E5%A4%9A%E8%B7%AF%E5%A4%8D%E7%94%A8)
- TCP可以重传丢失的数据段，以确保数据的完整传输。
- use case: remote shell ,web communication ,database connection
- Properties:
    - (Receiver) Flow control : TCP中的一個機制，用來確保發送端不會一次性傳送太多資料給接收端，以避免網路擁塞和資料丟失。
    - (Sender) Congestion Control: TCP協議中的一個機制，用於監控網路上的擁塞情況，並調整傳輸速率，以避免過多的數據流量導致網路擁塞，保持網路的穩定性和效率。(Two algorithms: Slow Start + Congestion Avoidance)

#### TCP Connection
- Connection is a Layer 5 (session)
- Connection is an agreement between client and server
- Must create a connection to send data
- Connection is identified by 4 properties
    - SourceIP-SourcePort
    - DestinationIP-DestinationPort

### DNS（Domain Name System）
- 應用層 Layer 7 協議
- 定義：DNS 是一個用於將網站域名轉換為對應的 IP 地址的分散式命名系統。它充當了網際網路上的「電話簿」，讓計算機可以根據網站域名找到並連接到相應的網站。

- 運作原理：
1. 請求發送：用戶在瀏覽器中輸入網站域名。
2. 本地 DNS 查詢：計算機首先查看本地 DNS 快取，如果沒有找到記錄，則向本地 DNS 伺服器發送請求。
3. DNS 解析：本地 DNS 伺服器進行 DNS 解析，向其他 DNS 伺服器發送遞歸查詢，逐級尋找目標域名的 IP 地址。
4. 結果返回：一旦找到目標域名的 IP 地址，本地 DNS 伺服器將結果返回給用戶的計算機，同時將結果保存在本地快取中。

- 協議層級：在 OSI 模型中，DNS 通常被歸類為**應用層**協議，因為它主要用於應用程序之間的通信和資訊交換。

- DNS 解析過程的優化：為了加快域名解析速度，常見的做法是使用本地 DNS 快取，將最近解析的結果保存在本地。一些瀏覽器和作業系統還會使用預先取得的 DNS 結果，以加速域名解析過程。

- DNS 服務的重要性：DNS 是互聯網基礎設施中至關重要的一部分，它確保了網絡中的各種服務可以被正確定位並訪問。沒有 DNS，用戶將需要記住大量的 IP 地址才能訪問網站，這對於網絡的使用和發展是非常不方便的。

- 安全性考慮：DNS 的安全性問題也是值得關注的，包括 DNS 劫持、DNS 欺騙等攻擊手法。這些攻擊可能會導致用戶被導向惡意網站或服務。

- 擴展性與分散式特性：DNS 的分散式設計使得它能夠應對網絡規模的不斷擴大，同時提供高效的解析服務。
> DNS over HTTPS（DoH）和 DNS over TLS（DoT）：近年來，隨著對隱私和安全性的關注增加，一些新的 DNS 加密協議被開發出來，以確保 DNS 查詢的私密性。

> nslookup , dig

- DNS Record Settings
    - A
    - MX
    - TEXT
    - CNAME

#### DNS resolver：
它是 DNS 系統中的一個元件，用於接收和解析由用戶發送的域名查詢請求。
負責向 DNS 系統中的其他伺服器發送請求，以找到該域名對應的 IP 地址。
- DNS 解析器的角色：
DNS 解析器是一個關鍵的元件，它位於網絡中的客戶端設備（例如個人電腦、手機等）或 DNS 伺服器上。當用戶輸入網站的域名時，解析器負責發送 DNS 查詢並處理相應的回應。如果解析器本身無法解析查詢，它將向上層 DNS 伺服器發送遞歸查詢，直到找到對應的 IP 地址。

### HTTP
| 協議     | HTTP/1                      | HTTP/2                       | HTTP/3                       |
|----------|-----------------------------|------------------------------|------------------------------|
| 奠基於     | HTTP/1.1                    | SPDY / HTTP/2                | QUIC / HTTP/3                |
| 首部壓縮 | 否                          | 是                           | 是                           |                          |
| 連接處理 | 多個連接，每個請求都要新連接 | 單一連接，複用多個請求       | 單一連接，複用多個請求       |
| 效能     | 慢                          | 快                           | 更快                         |
| 安全性   | TLS 可選                    | 必須使用 TLS                  | 必須使用 TLS                  |
| 連接建立 | 三次握手(TCP)                    | 不適用，TCP 連接建立改善      | 0-RTT 加速連接建立           |

:::info
<ul>
<li>http 1.x : 只能串行傳輸，後來有嘗試用 http pipeline 改善，但因很多問題，所以大部份瀏覽器預設都是不用的。</li>
<li>http 2 : 嘗試的解決 http pipeline 的 HOL 問題，它解決的手法是提出 stream 與 frame 的機制來處理。</li>
<li>http 3 : 嘗試的解決 tcp 的 HOL 問題，它解決的手法就是不用 tcp 改用 quic。</li>
</ul>
- Ref: https://mark-lin.com/posts/20190922/#heading2
:::

#### 請求
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

#### 回應
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

#### Session & Cookies
> **HTTP是一種stateless的協定**

Session: 伺服器為這次請求開闢一塊記憶體間，這物件便是session物件、結構為ConcurrentHashMap。並且會同時生成session-id, 透過request-header: `set-cookie: JSESSIONID=xxxxxx`,cookie的過期時間是在瀏覽器階段結束之前
Cookie: 瀏覽器的一小段記憶空間

分享好文章：
- https://github.com/aszx87410/blog/issues/45

### Websocket 
- 定義：WebSocket 是一種在網頁瀏覽器和伺服器之間建立持久、雙向通信的協議。基於WS協議,TCP協議，位於「應用層」Laryer 7
- 用途：主要用於實現即時通信功能，如聊天應用、線上遊戲、股票報價等。
- 建立過程：通過標準的 HTTP 握手建立初始連接，然後升級為 WebSocket 連接。
- 通信方式：提供雙向通信能力，使得伺服器和客戶端可以在不同時間點上互相發送訊息，不需要依賴於客戶端的請求。
- 資源和帶寬：使用較少的資源和帶寬，因為減少了 HTTP 請求和響應的開銷。
- API：提供了簡單易用的 JavaScript API，開發者可以輕鬆地在網頁應用程序中使用 WebSocket 進行即時通信。
- 訊息傳送：使用 send() 方法向伺服器發送訊息，並通過 onmessage 事件處理程序接收伺服器發送的訊息。
- 參考影片：[連結](https://www.youtube.com/watch?v=IG9X0aHN0Ak)

### WebRTC
- Standard APIs for Web Realtime Communication
- WebRTC, short for Web Real-Time Communication, **is both an API and a Protocol.**([Ref](https://webrtcforthecurious.com/docs/01-what-why-and-how/))
- 用途：主要用於實現瀏覽器到瀏覽器之間的視訊通話、音訊通話和檔案共享等即時通信。
- 通信方式：提供了一種用於在瀏覽器之間建立點對點的通信連接的 API。
- 傳輸層：除了使用 TCP 協議外，還使用了 DTLS（用於安全性）和 ICE（用於穿越防火牆和 NAT）等技術。
- 訊息格式：可以包含音訊、視訊、數據等，並且使用 SDP（會話描述協議）進行媒體信息的描述。
- 總結
    - Media Capture and Streams API: 使網頁裝置能夠存取本地端系統的多媒體串流(影音串流)
    - Peer-To-Peer Connection (P2P): 能夠在沒有中介層的情況下讓瀏覽器之間能夠互相傳遞資料

| 特性| WebSocket| WebRTC|
|--------------|------------------------------------------|-----------------------------------------------|
| 定義         | 是一種雙向通信協議，用於在客戶端和伺服器之間建立持久連接。| 是一種即時通信協議，用於在瀏覽器和其他設備之間實現點對點的音頻、視頻和數據傳輸。     |
| 用途         | 主要用於在瀏覽器和伺服器之間進行即時通信，例如聊天應用、遊戲等。| 主要用於實現瀏覽器到瀏覽器之間的視訊通話、音訊通話和檔案共享等。                |
| 傳輸層       | 基於 TCP 協議。                          | 除了使用 TCP 協議外，還使用了 DTLS（用於安全性）和 ICE（用於穿越防火牆和 NAT）等技術。 |
| 訊息格式     | 原始 WebSocket 協議的訊息格式是文本或二進位數據。但也可以使用子協議（例如 STOMP）進行訊息封裝。| WebRTC 的訊息格式可以包含音訊、視訊、數據等，並且使用 SDP（會話描述協議）進行媒體信息的描述。|
| 處理方式     | 主要由 JavaScript API 進行控制。          | 由 JavaScript API 和 WebRTC 原生庫進行控制，例如 WebRTC 库或第三方庫。            |
| 支援性       | 目前所有主流瀏覽器均支援 WebSocket。      | WebRTC 在主流瀏覽器中的支援程度較好，但仍存在一些兼容性問題。                    |
| 安全性       | 基本上是明文傳輸，但可以通過 TLS/SSL 加密來實現安全傳輸。| 使用 DTLS 和 SRTP 來實現端對端的安全傳輸。                                        |

- WebSocket V.S WebRTC: WebSocket 主要用於瀏覽器和伺服器之間的即時通信，而 WebRTC 則專注於瀏覽器到瀏覽器之間的實時視訊和音訊通話。WebSocket 更適合一對多的通信模式，而 WebRTC 更適合點對點的通信模式。

### TLS 
- 之前叫做 SSL (Secure Socket Layer)
- Ref: https://zh.wikipedia.org/zh-tw/%E5%82%B3%E8%BC%B8%E5%B1%A4%E5%AE%89%E5%85%A8%E6%80%A7%E5%8D%94%E5%AE%9A


## Optimization
### MTU、MSS、PMTUD
在網路領域中，MTU、MSS和PMTUD是三個常見的術語，它們分別代表以下概念：

- MTU（Maximum Transmission Unit）：指的是在一個通訊協定中，所能夠傳送的最大封包大小，通常以位元組（bytes）為單位。

- MSS（Maximum Segment Size）：指的是在TCP協議中，所能夠傳送的最大分段大小，也就是TCP頭部除外的最大資料量。

- PMTUD（Path MTU Discovery）：是一種通過動態探測和設定通訊路徑上的最大傳輸單元（MTU）的方法，以確保在IP網路上的資料包不會因為過大而被分段丟失。

|概念|定義|使用範疇|
|  ----  | ----  |---|
|MTU|最大封包大小，在通訊協定中所能夠傳送的最大資料量。|在網路設定和配置中，特別是在路由器、交換機等網路設備中常見。|
|MSS|在TCP協議中，指的是傳送的最大分段大小，通常由接收端和發送端之間的協商決定。|在TCP/IP通訊中，尤其在調整TCP的性能和傳輸效率時重要。|
|PMTUD|是一種通過探測通訊路徑上的最大封包大小的方法，以確保資料包不會因為過大而被分段丟失。|主要在IP網路中，特別是在通過多個網路節點進行傳輸時，確保資料|

### Nagle's Algorithm
當我們在網路上進行小封包的通信時，Nagle's Algorithm（納格爾算法）就變得相當重要。這個算法是由納格爾（John Nagle）於1984年提出的，用於TCP/IP協議中的流量控制。

Nagle's Algorithm的主要目的是減少小封包在網路上的傳輸，從而提高網路的效率。它的作法是將多個小封包合併成一個較大的封包再進行傳輸，從而減少網路上的封包數量。具體來說，當一個TCP連接上有尚未被確認的封包在網路中傳輸時，Nagle's Algorithm會將後續的小封包暫時緩存，直到之前的封包得到確認。

這個算法的應用場景通常在於一些需要高效傳輸的應用，如Telnet或SSH等。因為在這些應用中，即時性是很重要的，而大量的小封包可能會造成網路的壅塞和延遲。利用Nagle's Algorithm，可以將多個小封包合併成一個大封包，從而減少封包數量，提高通信效率，同時又保持了即時性。

然而，有時Nagle's Algorithm可能會導致一些應用的延遲。在一些對即時性要求很高的應用中，可能需要禁用Nagle's Algorithm，以減少通信的延遲。

### Delayed Acknowledgment Effect
Delayed Acknowledgment Effect（延遲確認效應）指的是在TCP通訊中，接收方延遲向發送方發送ACK（確認）消息的情況。TCP通信中，接收方接收到數據後通常會立即向發送方發送ACK消息，確認已經成功接收到數據。但是，在某些情況下，接收方可能會延遲發送ACK消息，導致發送方在收到ACK之前無法確定數據已經到達。

延遲確認效應通常發生在以下情況下：

接收方正在等待結合ACK的數據包：接收方可能會等待將多個ACK合併到一個消息中，從而減少ACK消息的數量。這樣做可以減少網路流量和降低TCP/IP堆棧的負擔，但同時會增加數據傳輸的延遲。

接收方的應用程序正在處理數據：如果接收方的應用程序需要處理接收到的數據，則接收方可能會等待應用程序處理完畢後才發送ACK消息。這樣做可以減少ACK消息的數量，但同樣會增加數據傳輸的延遲。

TCP延遲確認機制：某些TCP實現可能會實現延遲確認機制，即在一段時間內等待接收到更多的數據，以減少ACK消息的數量。這樣做可以提高網路效率，但同樣會增加數據傳輸的延遲。

### TCP Fast Open
TFO代表TCP Fast Open（快速開啟），它是一種旨在改善TCP協議握手過程的機制。通常情況下，當客戶端與服務器建立TCP連接時，需要進行三次握手過程，這導致了一定的延遲。TFO通過在TCP握手中引入一些改變，以減少建立連接所需的往返時間，從而提高連接的建立速度。

TFO的主要思想是在TCP SYN和ACK握手中夾帶數據。在正常的TCP連接建立過程中，SYN和ACK握手僅用於交換連接參數，並在第三次握手中才開始傳輸數據。而TFO允許在SYN和ACK握手中夾帶數據，從而在連接的建立階段就可以開始傳輸數據，從而節省了一個往返時間。

要使用TFO，客戶端和服務器都需要支持TFO機制。當客戶端向服務器發送SYN握手時，可以在SYN段中夾帶數據。如果服務器支持TFO，它可以在SYN+ACK段中也夾帶數據，從而在第二次握手後就可以開始進行數據傳輸。

TFO能夠有效減少TCP連接建立的時間，特別是對於網頁等需要建立大量短暫連接的應用而言，它能夠顯著提高性能。然而，TFO也可能會引入一些安全風險，因此在使用時需要仔細考慮相應的安全問題。

### Layer 4 and Layer 7 負載平衡
Layer 4和Layer 7負載均衡是兩種常見的負載均衡技術，它們在處理網路流量和分發請求方面有所不同。以下是Layer 4和Layer 7負載均衡之間的比較：

- Layer 4負載均衡：
基於傳輸層（Layer 4）的負載均衡，主要使用IP地址和端口信息進行流量分發。
通常使用基於TCP和UDP的負載均衡器，能夠在不解析應用層協議的情況下對流量進行分發。
負載均衡器僅根據IP地址和端口信息來決定請求的路由，而不考慮請求的內容。
優點包括低延遲、高效率和高性能，但缺點是無法進行高級的流量分發和請求路由。

- Layer 7負載均衡：
基於應用層（Layer 7）的負載均衡，通常使用HTTP請求的詳細信息（如URL、Cookie、請求方法等）來進行流量分發。
負載均衡器能夠深入解析應用層協議，根據應用層的信息來決定請求的路由和分發策略。
具有較高的智能化和彈性，可以根據請求的內容進行更精細的流量分發和請求路由。
優點包括更靈活的流量分發和更強大的請求路由能力，但缺點是相對於Layer 4負載均衡器而言，性能上可能會稍微降低。
總的來說，Layer 4和Layer 7負載均衡都有其特定的應用場景和優缺點。Layer 4負載均衡器適合對流量進行簡單而高效的分發，而Layer 7負載均衡器則更適合根據應用層信息進行精細的流量分發和請求路由。在實際應用中，需要根據具體的需求和場景來選擇適合的負載均衡器。

## 後端模式
### [Journey of a request to the Backend](https://medium.com/@hnasr/the-journey-of-a-request-to-the-backend-c3de704de223)
1. Accept (Layer 4 TCP/UDP)
2. Read
3. Decrypt
4. Parse
5. Decode
6. Process

### RPC
- RPC 是一種不需要了解底層網路技術就可以透過網路從遠端電腦程式上請求服務的協定
- 主要解決分散式系統中服務與服務之間的呼叫問題

有三個角色
- Registry：將本機服務發布成遠端服務、管理遠端服務
- RPC Server：提供服務介面定義與服務類別的實現
- RPC Client：透過遠端代理物件呼叫遠端服務
> 有點像實做出訂閱模式的結構...

### SSE 
- SSE 單向的：讓server可以推送資料給client端、基於HTTP 協議
- 在開發者工具當中會有個`event-stream`的 tab
```javascript
res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
```
