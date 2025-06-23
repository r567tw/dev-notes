---
title: Laravel 套件
date: '2019-10-14 12:16:36+00:00'
tags:
- laravel
- ithome
---
今天將帶大家快速帶過幾個官方套件以及個人工作經驗上覺得好用的套件。並且後續也給大家相關的軍火庫可以在日後開發專案上用到。基本上有相對應的需求才用，可以搭配該套件的官方文件撰寫程式，這些基本上文件都很易讀，相信無痛上手是很有可能的喔！

# 官方套件 篇

首先我一定要先推薦一下 Laravel 官方提供的套件啦，就是這些套件形成 Laravel 一個龐大且厲害的生態系。

1. Laravel Cashier([官方文件](https://laravel.com/docs/6.x/billing)):一個關於金流的套件，他可以與國外金流公司 API 做無痛的結合，例如 Stripe 或者 Braintree，當然，如果台灣的話可以使用其他的套件，例如[laravel-newebpay](https://github.com/datomon/laravel-newebpay)或者[laravel-payum](https://github.com/recca0120/laravel-payum?fbclid=IwAR2dE_ltiNdeXc9rJGOCUNjMfFSj5Kz274p_vuxMZEZZWNAoeFb0VYro_fk)

2. Laravel Dusk([官方文件](https://laravel.com/docs/6.x/dusk)):還記得我們之前的測試篇嗎？其實 Dusk 這個服務有點像是`Browsers`的測試，如果你看到文件你就大概明瞭，他是有點 for 終端測試的角色

3. Laravel Passport([官方文件](https://laravel.com/docs/6.x/passport)):一個快速建立 API 授權請求的相關套件，基於 Oauth2 標準

4. Laravel Scout([官方文件](https://laravel.com/docs/6.x/scout)): 一個基於 Eloquent Model 所建立的全文搜索相關開發套件，並且預設以 Algolia 作為驅動

5. Laravel Socialite([官方文件](https://laravel.com/docs/6.x/socialite)):我們在網頁註冊的時候，常常看到 FB/Google 一鍵登入對吧？其實實作 Facebook，Twitter，LinkedIn，Google，GitHub，GitLab 和 Bitbucket 等等相關身份驗證機制並不難，這個套件可以提供你這樣的功能～

6. Laravel Telescope([官方文件](https://laravel.com/docs/6.x/telescope)):本人認為史上最牛的開發調試工具，可以觀察資料庫、也可以觀察任務工作、Request/Respose 等等

另外還有很多其他的官方套件，不過我覺得很少用所以就不特別介紹了......

# 個人經驗 篇

1. laravel-excel([官方文件](https://docs.laravel-excel.com/3.1/getting-started/)): 一個可以方便操作 Excel 的套件

2) laravel log viewer([官方文件](https://github.com/rap2hpoutre/laravel-log-viewer)):有時候我們會需要 Trace log 好幫助我們能夠 trace Request 或者 Response 喔喔～

3) laravel-cors([官方文件](https://github.com/barryvdh/laravel-cors)):前後端分離，你會遇到的 Cors 問題～

4) laravel-permission([官方文件](https://github.com/spatie/laravel-permission)): Laravel 界最有名的權限/角色管理套件

5) laratrust([官方文件](https://laratrust.santigarcor.me/docs/5.0/)): 另一套個人覺得也沒好用的權限/角色管理套件，而且他比前面的 Laravel-permission 多支援 Group 的特色，好用！然後文件也寫得和 Laravel 易讀好用。

6) Forms & HTML([官方文件](https://laravelcollective.com/docs/6.0/html)): Laravel 在 4.x 的版本有所謂的 Form 的語法糖，但在 5.x 版本之後便移除了，很多人還想要繼續有這種功能，所以這個套件便出現了啦！

# 軍火庫

接下來，我要介紹一下 Laravel 的軍火庫

- [packagist](https://packagist.org/) :Laravel 使用 Composer，而 composer 使用的軍火庫也就是這個！

- [packalyst](https://packalyst.com/):類似上面的 packagist，不過這是專屬 Laravel 的喔！
