---
sidebar_position: 3
---
# Optimization

## 關於快還要更快的基礎概念
### 量化
我覺得首先要能夠測量、具體化...因為網站的快慢如果憑感覺，在這樣都是`慢的`，永遠沒有無止境的一天。在這裡推薦兩個測量的工具：[Google PageSpeed](https://pagespeed.web.dev/) 和 [GTmetrix](https://gtmetrix.com/)

老闆最近也幫我們買了一堂課程：`The WpFASTER WordPress Speed Optimization Master Course`

除了上面兩個工具以外他還有推薦一個: [Pingdom](https://tools.pingdom.com/)

### 理論
其實在網路上，所有東西都是`拿的`、`抓的`，只是，光跑得遠比我們快太多太多...有關於`網路`這門課，實在要討論的非常非常多，其實我們身在這個網路世代，真的不要想任何事情是`理所當然的`。你的網路從你家的路由器、電線杆和基地台、海底電纜到遙遠的主機 Server, 都是大大大大的學問、也歸功於很多人的努力和基礎建設，老實講這塊領域我自己也真的不熟(但這也是我有興趣未來想多多學習的地方 ❤️)，另外這還有一門學科叫做網管呢！

話說歪了，就是網路上所有的東西都是拿的抓的，所以最快的方式就是：`不要抓`、`不要拿`，你距離你家衣櫃書櫃的距離肯定大大的比起你到對岸或到日本的距離都來的近！所以如果有快取、有先存在距離你比較近的地方就肯定`比較快`。

再來，如果抓的東西比較小或比較少，那肯定容易的吧！假設有個無人機可以飛過很遠很遠的地方，他載著幾公斤或幾克的貨、那肯定是比載一堆東西的貨機還是貨輪還快的吧！

因此，在網路裡面，除了寫好程式用好的架構能讓 App 變快以外(事實上，這也是本質！)，你可以透過減少 `http request` 的次數或者壓縮、還有適當的快取策略加快整個 App 的速度！

不過啊，我喜歡課程裡面講道的一句話：
> 「Optimization is a PROCESS not an EVENT, and when it comes to website speed there is no such thing as "Fast Enough".」

## 一、選擇好的 Hosting
工程師界有一句笑話這麼說：前端的效能取決於使用者的口袋、而後端的效能取決於老闆的口袋...

老實講，一個好的 Hosting, 願意給你比較多權限與控制調教的主機商，是比較理想的。因此最近看老闆幫我買的課程：`The WpFASTER WordPress Speed Optimization Master Course` 就有提到他不太推薦 專屬主機以及共享主機...因為能調教的空間有限...

## 二、圖片優化
當然啊，圖片能壓縮就能壓縮、另外Google 也推薦一種圖片格式：`Webp`。不過啊、要如何壓縮後又能不失真，以及圖片自適應的功課，我覺得這是我未來要繼續 `Study` 的功課

## 三、壓縮 Response
其實很多瀏覽器都支援壓縮的方式，我以前開發 Laravel 專案時也有特別寫一個計算 `Content-Length` 的 `middleware` 來讓 AWS幫我們壓縮 response, 這是真的實測可以讓網站快速的方法之一

## 四、合併＆壓縮 CSS 和 JS
就像前面理論說到的，就是要讓 response 更輕更少，所以這也是一個方法之一，但最近 Study 到 提到現在有所謂的 HTTP2，似乎這優化的空間可能有限。詳情可以看看這一篇關於 HTTP2 的文章：
- https://totoroliu.medium.com/http-2-%E6%98%AF%E4%BB%80%E9%BA%BC-d7de699bdbae
- https://www.cloudflare.com/zh-tw/learning/performance/http2-vs-http1.1/

## 五、升級 HTTP2 or HTTP3
不 j4

## 六、快取
看你要走前端快取還是後端快取，還是要走物件快取還是Memory 快取，有disk 物件的那種還是 Redis 之類的，這個學問也是很多，我也還在 Studying... 😢

## 七、資料庫讀寫分離、load balance、前後端分離、CDN
這大概屬於系統程式的層面，依據80%原則，我們可以將資料庫做讀寫分離、加入索引使其加快讀取速度，另外也可以加入 load balance 來去對付所謂的高流量。關於這個我蠻推薦一部影片：https://www.youtube.com/watch?v=aqnuKxy_Av8

啊前後端分離比較像是系統架構設計，可以藉由統一 api 都方式提供 web 與 mobile 共同讀取...

另外 CDN 就是把東西上傳到 CDN服務，讓瀏覽器上去的時候能夠「就近取材」

> 謎之音： 寫這一小項有點心虛，因為自己在思考著是否 load test 和 performance test 其實是兩回事...但又有點一體兩面...

## 八、WordPress Special
### Heartbeat API
Wordpress 有個神秘的 Heartbeat API，他就是要來處理一些能處理一些同步的部分...但實際上關掉它或者減少他的發送並不會太多影響什麼操作...

### Disable WP Cron
其實和 Heartbeat API 原理很像，就是減少主機跑網頁的負擔，如果負擔少了自然就會比較快！WP Cron 是一個人在造訪網頁時就會啟動一些排成事件的一個小 feature...，就我開發者而言，我覺得這可以改到用 Linux 本身的 Crontab 裡面直行即可

### 選輕量化的主題
不多說，如果你的主題靠北複雜又重，你再這麼優化都是枉然！

### 少用點外掛
WordPress 那樣就是要讓你可以客製化的，你可以用各種`hook`來勾住東西，所以說我認為如果不是太複雜的外掛，或許也可以自己寫`theme`來做到，當然啦，這可能需要有一點開發程式的能力。

### ~~放棄 Wordpress~~
俗話說，別人的小孩你不方便教，但自己的小孩你可以肆無忌憚 (誤

哈哈哈，我覺得如果要很多客製化的... 你加那麼多外掛又很難割捨，不如自己寫一個搞不好比較好調教...因為你的調教就是被`WordPress`和外掛所限制住，雖然，我自己實測過弄一個空白的`WordPress`什麼外掛都不要加、空白的起初畫面確實還是可以效能一百分和 A 級...好吧！是我的錯，我還是乖乖學習怎麼優化 Wordpress 吧！這是開玩笑的ＸＤ
