---
title: 'Laravel Auth: 為網站加入會員囉～'
date: '2019-09-27 16:29:05+00:00'
tags:
- laravel
- ithome
---
經過前幾天導覽過簡單的 Laravel 之 CRUD 篇，現在開始我們要一一來談談關於比較進階，而且也是平時開發常用到的功能與指令等，可能有時候也會順便在講解的時候偶爾帶入前幾天說的東西。在網站開發上，我們常常會有所謂的「會員制度」，身為一個成熟的框架 Laravel，他要如何實現會員制度這個功能呢？放心，不會很辛苦，**幾個指令就能搞定**，厲害吧！讓我們來體驗這種快速開發吧！ `Let's Go!`

# 在 Laravel6.0 之前

其實作者我很早就開始寫 Laravel 了，只是我沒想到在我寫這一系列文章的時候，Laravel 6.0 就已經出來啦！ 推薦一下隔壁棚的鐵人賽，那裡會稍微帶到 Laravel6.0 的特色：[Laravel 6.0 初體驗！怎麼用最新的 laravel 架網站！](https://ithelp.ithome.com.tw/users/20120550/ironman/2575)

既然都是寫 Laravel 當然都支持一下啦～
不過廢話說太多了，在 Laravel 6.0 之前，Laravel 5.x 的版本其實很厲害，一個指令就能完成：

```
$ php artisan make:auth
```

這也太簡單了...不過這一切，要從 Laravel 6 說起

# 在 Laravel 6.0 之後

後來當我下`php artisan make:auth`之後，居然出錯，和我說沒有 make:auth 這個指令，我就知道，Laravel 6.0 改版囉～ 和各位說明一下，如果你們仔細去看之前小專案的`composer.json`就會發現
![https://ithelp.ithome.com.tw/upload/images/20190928/20106999WYYMzPKstF.png](https://ithelp.ithome.com.tw/upload/images/20190928/20106999WYYMzPKstF.png)

**原來是 Laravel 6.0 的部分啊(拍手)**

好了，又歪樓，因為幾個指令就能完成 Auth 的部分所以才會說那麼多廢話，我絕對不是~~因為要把鐵人賽的文章寫到一定字數挑戰成功才故意寫這麼多~~

首先，讓我們先用 Composer 安裝一個 Package

```
$ composer require laravel/ui
```

之後請使用 ui 的指令，並且加入--auth 這個參數

```
$ php artisan ui vue --auth
Vue scaffolding installed successfully.
Please run "npm install && npm run dev" to compile your fresh scaffolding.
Authentication scaffolding generated successfully.
```

之後按照他的回應說`Please run "npm install && npm run dev" to compile your fresh scaffolding.`，在下一些指令

```
$ npm install && npm run dev
```

然後呢？~~沒有然後了~~，
使用`php artisan serve`
之後你只要進入到`http://127.0.0.1:8000`，你就會看到你的畫面右邊有兩個字：`login` 和 `register`
![https://ithelp.ithome.com.tw/upload/images/20190928/20106999dtAvgyO7S7.png](https://ithelp.ithome.com.tw/upload/images/20190928/20106999dtAvgyO7S7.png)

~~剩下的就是玩耍的部分了~~

要看完成程式碼的可以參考這裡(不過其實都是用指令生成出來的啦，沒什麼參考價值 XD): https://github.com/r567tw/Make-PHP-Great-Again/commit/efa323cdfa9c5708a72299ff3e95d47e8334654c
