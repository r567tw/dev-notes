---
sidebar_position: 1
---
# Basic
:::info
因為最近有被問到一些資安相關、況且自己對資安也是有興趣。所以把它記錄起來、整理好。
:::

其中需要`分清楚XSS和CSRF的差別`
基礎原理：不要相信使用者的輸入、請求。

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