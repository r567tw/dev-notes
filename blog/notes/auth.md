---
title: Auth 筆記
date: '2022-11-20 20:47:20+08:00'
tags:
- auth
- jwt
- token
- oauth
---
# HTTP 是一種`Stateless`的協定
這個我以前面試有被考過這一題，印象非常的深刻！所以在這裡便紀錄下來做一個重新再提醒。HTTP其實是一種`Stateless`的協定，也就是無狀態的協定。這意味著：每一次的`HTTP Call`都可以被視為一種獨立事件、彼此互不關聯。

> 然而，我們平時怎麼處理用戶的認證、如何登入登出的呢？

# 認證
接續前面說`HTTP`的`Stateless`，事實上，瀏覽器是一種軟體與應用程式，在`HTTP`當中有`header`可以增加一些簡易的資訊，而瀏覽器會存一些資訊在裡面，像是`cookie`或`session storage`等等。

面試時常常有一題要你比較一下`cookie`，`localstorage`,`sessionstorage`:
這裡我簡述一下下
- `cookie`: 存在瀏覽器的一種方式，空間比較小，會被使用者容易竄改
- `localstorage`: 存在瀏覽器的一種方式，空間比較大，不容易因為瀏覽器關閉而消失
- `sessionstorage`: 也是存在瀏覽器的一種方式，何謂session?就是瀏覽器關閉之後它就消失了......但同樣空間比cookie大多

# 基礎登入登出
基礎的登入登出奠基於`cookie`上，假設你沒有帶這個`cookie`就沒辦法辨認你是誰。而`cookie`是使用者端在控制的，很容易可以偽造，而他也**不適合放機密資料**，於是放在`server`端的`session`就產生了，但接著前面說的`stateless`，事實上瀏覽器那邊也會存一個`session_id`在那裡，於是瀏覽器在呼叫時便能拿這個`session_id`來和`session`做對應取得用戶資料、狀態

而session如果碰上load balancer, 就會需要考慮是否要另外存放在redis之類的等等複雜issue。

# JWT
是一種 token 機制的 auth 系統。主要分成有三個部分：header, payload 和 Signature。你可以透過網路上將token做驗證。
可以看看這部分的[參考資訊](https://medium.com/%E4%BC%81%E9%B5%9D%E4%B9%9F%E6%87%82%E7%A8%8B%E5%BC%8F%E8%A8%AD%E8%A8%88/jwt-json-web-token-%E5%8E%9F%E7%90%86%E4%BB%8B%E7%B4%B9-74abfafad7ba)

# OAuth
一種授權與帳號分開的auth系統，通常與第三方有關係(例如Google登入、Facebook登入)，他會挑出一個畫面問你要用什麼平台登入、並且授權平台可以提供給你的資料(例如email,姓名等等)。關於Oauth 可以看參考資料，我還不算是這部分的專家：[參考資料](https://medium.com/%E9%BA%A5%E5%85%8B%E7%9A%84%E5%8D%8A%E8%B7%AF%E5%87%BA%E5%AE%B6%E7%AD%86%E8%A8%98/%E7%AD%86%E8%A8%98-%E8%AA%8D%E8%AD%98-oauth-2-0-%E4%B8%80%E6%AC%A1%E4%BA%86%E8%A7%A3%E5%90%84%E8%A7%92%E8%89%B2-%E5%90%84%E9%A1%9E%E5%9E%8B%E6%B5%81%E7%A8%8B%E7%9A%84%E5%B7%AE%E7%95%B0-c42da83a6015)

另外還有一篇文章也直得紀錄：https://blog.kenwsc.com/posts/2023/jwt-vs-session/

<!-- OAuth2.0 學習  -->
:::success
auth 真的博大精深
:::

