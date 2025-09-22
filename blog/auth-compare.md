---
title: Passport , Breeze, Fortify , Sanctum 不負責任比較
date: "2022-08-21 01:33:11+00:00"
tags:
  - laravel
  - auth
---

我覺得 Laravel 的 Authentication 其實變了很多。

從一開始可以使用`php artisan make:auth` 做一個簡單的`auth`起手架以後，往後變成要下載 package，到現在可以根據不同的情境使用不同的 package。

<!-- truncate -->

真不知道該說這是變得麻煩還是越來越進步？(我私心覺得，是進步！)

1. Breeze

如果懷念以前的`make:auth`的時光可以使用這個 package，附帶前端 UI, 使用 Tailwind CSS 作為樣式配置

教學文件可以參考：[https://laravel.com/docs/9.x/starter-kits](https://laravel.com/docs/9.x/starter-kits)

2. Sanctum

我最近開了一個新的 laravel 專案，最近就有附帶這個 package，他有點像是`firebase`那一種，總之如果你要簡單實作 token based 的系統可以使用這個 package，但他最大的缺點就是沒有支援`oauth`，如果要使用`oauth`請左轉去用`Passport`，否則他其實和`passport`很像的。

詳細教學可以參考：[https://laravel.com/docs/9.x/sanctum#main-content](https://laravel.com/docs/9.x/sanctum#main-content)

3. Passport

他比`Sanctum`早出生很多，或許在 implement token based 以前專案都會使用這個套件，我自己目前還沒玩過(聽說未來我新公司會用，蠻期待的)。
和`sanctum` 最大的差別似乎就是他有額外支持`oauth`的部分，如果你有`oauth`的需求請直接使用這個套件拉

詳細教學可以參考：[https://laravel.com/docs/9.x/passport](https://laravel.com/docs/9.x/passport)

4. Fortify

這個套件有點神秘，他一個與其他 auth 相關套件最大的差別就是**他沒有前端實現**
所以我個人認為應該是比較適合已經存在的專案之類的，或者你只是想要 **純後端實現的認證系統**。

相關教學可以參考：[https://laravel.com/docs/9.x/fortify#main-content](https://laravel.com/docs/9.x/fortify#main-content)

> 小君曰：我個人自己有在玩`Breeze`&`Sanctum`，不得不說，`Sanctum`真的很不錯，我喜歡。
