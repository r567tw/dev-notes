---
title: 賽後小感想以及後續學習
date: '2019-10-14 16:03:16+00:00'
tags:
- laravel
- ithome
---
終於來到這最後一天，然而人家最後一天都在寫些感言充廢文，我在這一天還是要稍微帶點技術含量的東西ㄎㄎ

以下東西很多又很雜，畢竟 php 就是~~義大利麵嘛(大誤)~~，請耐心閱讀～

# Laravel Best Practice

介紹一個 Github 專案：https://github.com/alexeymezenin/laravel-best-practices

裡面介紹很多建議的 Laravel 寫法，例如驗證不要寫在 controller 裡面，而是用 Request 類別作為包裝，在寫 Laravel 的時候可以根據這些原則檢核一下自己

# Laravel 遇上大架構

當 Laravel 遇到大架構的時候，基本上我們不會把這些東西都只是塞在 Model\Controller\view 當中，而是會使用到 Repository、Service、Presenter 或 Transformer 做包裝，分別控制資料庫邏輯與商業邏輯、顯示的邏輯和格式的回傳，讓程式更加容易維護、易讀

大架構的部分說明你可以參考以下網址：

- https://learnku.com/articles/19452
- https://www.youtube.com/watch?v=pzY0FBafXd0
- https://www.muzilong.cn/storage/html/2/oomusou.io/laravel/laravel-architecture/index.html

# 可以讓 PHP 偉大的其他東西

其實只學會 Laravel 不足以讓 PHP 偉大啦，不過我期許自己是能夠成為越來越強的 phper 的喔！希望你們也是＾＾

1.學習 swoole：據說這是可以讓 php 效能 up up 的工具框架，是現代 phper 值得學習的一項東西，也是可以讓 php 邁向異步時代的重要推手

2.學習 composer：我還能說什麼呢？沒有 Composer 別跟我說他是現代 php 框架 XD

2.學習 lumen、slim: 剛剛學過 Laravel 一遍了，他就是這麼的肥這麼的胖，所以如果能學會幾個微框架是不錯的，對應 Laravel 來說，Lumen 就是他的簡易版，相信學會了 Laravel 以後，Lumen 上手應該不是什麼太大的難事。

# 如何學好 php

其實我覺得網路上的資源太多了，容易眼花撩亂而且有時候還會學到舊的。我個人是建議以下這些資料

- 書籍：[現代 PHP：新的特點及良好習慣](https://www.books.com.tw/products/0010688181)
- [PHP Right Way](http://laravel-china.github.io/php-the-right-way/)

我個人只推薦這幾個資源，其他就不必了。因為這些資源是可以讓你比較能夠學習`現代php`的方法與資源。

# Laravel 相關資源

- [larvel news](https://laravel-news.com/): 每週都會寄給你 Laravel 界相關資訊，你也可以加入他的 Procast，順便練習英文聽力
- [Diving Laravel](https://divinglaravel.com/):一個深入 Laravel 核心的部落格，會講到 Queue、job 等等較為進階的功能與核心解釋等。

# 賽後感言

其實一開始還卡在題目到底要選什麼...然後就咚咚咚的到開賽前一刻才決定好，於是成為了`時間驅動寫作`，也因為自己的惰性使然，其實有點虎頭蛇尾，自己都覺得自己好像沒有寫的太好......。只能說又學到這次的經驗了～

然後有別於去年我寫的 python，這次的 Laravel 似乎不怎麼討好...所以後面也越寫越沒勁兒，於是成為這樣`小蛇尾`，我自己應該好好檢討吧 XD

本人的技術部落格：https://tech.r567tw.tw/
歡迎使用 feedly 訂閱我的網站喔 XD

未來我會慢慢的將我鐵人賽的文章慢慢的搬過去我個人網站的，並且加以擴充、更新吧？！應該吧？！
