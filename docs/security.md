---
title: Security
sidebar_position: 5
---

> 其中需要`分清楚XSS和CSRF的差別`
> 基礎原理：不要相信使用者的輸入、請求。

## XSS
跨站Script攻擊，使用網頁提供的input或者其他可供輸入的元素，讓攻擊者有機可乘使用script/惡意程式碼進行跨站類的攻擊

> 防範：使用一些編碼或escape 過濾或加入一些特殊符號再進入server之前。禁止被輸入非法的字元同時也避免惡意碼被執行

- REF: https://medium.com/hannah-lin/xss-2-%E5%A6%82%E4%BD%95%E9%98%B2%E7%A6%A6-xss-%E6%94%BB%E6%93%8A-18fdf10ef5ef
  
## CSRF
使用使用者的cookie或session, 偽裝自己是正常的網路請求

> 防範：使用CSRF token 或者在http header做驗證

## SQL Injection
使用SQL語法的特性，使用網頁提供的input或者其他可輸入的元素，注入SQL得出一些資料或進行攻擊

> 防範：使用`prepare statement`, 或者一般框架的ORM方式，總之在開發中盡量不要使用raw sql 或者字串串接法串接SQL

## CORS
瀏覽器會做檢查、前端可以先發送preflight. 使後端server能認得是否是合法的請求。
- REF: https://medium.com/starbugs/%E5%BC%84%E6%87%82%E5%90%8C%E6%BA%90%E6%94%BF%E7%AD%96-same-origin-policy-%E8%88%87%E8%B7%A8%E7%B6%B2%E5%9F%9F-cors-e2e5c1a53a19

## Password
- Encoding 編碼: 換個方式表達資料, ex. encodeURI() & decodeURI()、base64
- Encrypt 加密: 需要金鑰(key)解密之後才能表達資料 ex. AES、RSA
- Hashing 雜湊: 為不可逆的一個步驟，通常會有`雜湊函數`來處理各種過程，確保資料驗證性

> 密碼的儲存策略:根據下面文章整理
- 方案一: Base64編碼：可以逆推、不推薦、方便decode
- 方案二: AES256 加密：因爲使用者要登入時，後端必須確認使用者輸入的密碼加密後跟資料庫內的 password 是否符合，仍會把 key 放在 server 上。那就仍然有洩漏的風險
- 方案三：用 SHA1 雜湊：如果密碼長度與複雜度夠高的話...但如果密碼複雜度與長度不夠高仍然有可能被目前的高科技破解硬查出來
- **方案四：加鹽後用 SHA1 雜湊(至少比較安全的方案)**：salt 是一種隨機生成的字串，讓他與密碼串接之後雜湊。
- 方案五：用 Bcrypt 慢雜湊演算法

## AES 對稱加密
Ref: https://easonwang.gitbook.io/crypto/aes

- Ref: https://medium.com/starbugs/how-to-store-password-in-database-sefely-6b20f48def92

