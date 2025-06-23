---
title: 來談什麼是 MVC
date: '2019-09-16 16:35:26+00:00'
tags:
- laravel
- ithome
---

Laravel 在 wiki 裡面寫道他是一種 MVC framework關於 MVC，他有點複雜，我很怕自己會有所說錯，簡而言之，他是許多設計模式的結合是一種架構現代 Web application 的架構模式與概念。 
    
MVC 分別對應Ｍ odel、View 和 Controller。我們總是會希望我們在架構組織我們的程式碼是易讀、是好維護、是有意義的。有別於 PHP 常被人所詬病的 spaghetti 義大利麵式的程式碼，作為 MVC 的 Web framework:Laravel 無疑是***解決了這個問題***
    
註：義大利麵式的程式碼就是將所有資料庫連結、業務邏輯、頁面渲染全部都混做堆....隨著業務成長與一天天過去、換手的人越來越多，就會難以維護、難以組織與更新
    
當然 MVC 這個概念比 Laravel 的誕生還要早很多年，PHP 界也不只是只有 Laravel 這個框架獨有 MVC ，如果你搜尋 php mvc 的 web 框架還會有很多選項：例如 Symfony、Zend Framework 等等許多框架，你可以參考這個維基百科：https://zh.wikipedia.org/wiki/PHP%E6%A1%86%E6%9E%B6%E5%88%97%E8%A1%A8
    
作為 phper，如果有機會也學學其他框架也是一件好事的，（我是這麼期許自己的），不過我們此主題談的是 Laravel，所以當然是會繼續談 Laravel，而 Laravel 為什麼可以在 php 眾多框架中脫穎而出，其實就是如他官網所說的：「The PHP Framework for Web Artisans」，他的程式碼如果是高手的話真的可以寫得很「藝術」，我自己不是高手，但也在這個過程當中努力的成長成「Artisan」
    
PS. 請記得`Artisan`這個關鍵字，之後在 Laravel 會很常用到。
    
回到講解 MVC：
    
- Model 負責關於 database 溝通或者封裝相關業務邏輯
- View 負責一切你所看到的東西，也就是網頁的畫面
- Controller 負責協調 Model 和 view 之間的溝通，控制流程、用戶的行為與 Model 之間的改變

真的很怕自己會寫錯，或者有什麼內容上面不太理解，所以我也附上其他相關的資料，如果我有錯誤的話也請麻煩留言告知
    
以下是我覺得解釋 MVC 更多的相關參考資源
- 維基百科：https://zh.wikipedia.org/wiki/MVC
- MVC 是一個巨大誤會: http://blog.turn.tw/?p=1539
``` 這篇文章引起很多討論，就是因為作者的解釋所以讓我對MVC的解釋有所忌憚。
但就像文章作者講的：「MVC有分很多種喔！網路上全部沒寫清楚，你一定看不懂。
沒關係，你只要知道View可以抽出來就好。
C跟M先別管，你先隨便瞎搞吧。」
```
- 跟著小明一起搞懂技術名詞：MVC、SPA 與 SSR：https://medium.com/@hulitw/introduction-mvc-spa-and-ssr-545c941669e9  