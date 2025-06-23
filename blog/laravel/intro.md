---
title: Laravel 導覽與生命週期
date: '2019-09-18 14:46:40+00:00'
tags:
- laravel
- ithome
---

其實 Laravel 作為 php 的框架，其實本質還是 php。當我們在第一天準備環境的時候，我們建立了一個 blog 的資料夾。裡面資料夾分別如下： 
    
    
- `app/` ：我們主要工作的資料夾之一 
- `bootstrap/` ：Laravel 相關啟動的資料夾，基本上我們不會動這裡
- `config/` ：如果你有什麼固定的需要設定的，可以寫在這裡，有需要的話才會需要在這裡工作
- `database/` ：關於建立 table、建立假資料的都在這裡
- `public/` ：進入點，以及前端編譯後的資料都會放在這裡
- `resource/`：blade、以及編譯前的 js 會放在這裡
- `routes/` ：定義路由的地方，主要工作的資料夾之一
- `storage/` ：檔案存放、log 的地方
- `test/` ：顧名思義就是測試的地方
- `vendor/` ：composer 的資料夾，地位有點像是 npm 的 node_modules/ ，基本上這裡連動都可以不用動
- `其他檔案：.env、.env.example、artisan 等等等
      
你看到很多個資料夾不用太緊張，就如同我上面說明的一樣，你主要會工作的資料夾就那幾個，其他能不動就不動，真的有需要才會進去裡面。
    
而在第一段的時候我們也說到 Laravel 的本質就是 php，所以其實我們可以試著打開進入點 public/index.php 來看看，你會發現大部分都是註解，真正重要的 code 只有幾行以下我就直接略過註解直接貼 code 給你們看

```php
<?php
define('LARAVEL_START', microtime(true));
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);
$response->send();
$kernel->terminate($request, $response);
```

接下來請讓我看 code 說故事一樣
   
- 定義了一個 Laravel_START 的常數
- 把 composer 的檔案引入進來
- 剛剛說到了，bootstrap 是 Laravel 很重要的啟動檔案，所以他把它引入並且賦予給$app
- 啟用了這個$app make的方法把http\kernel這個class實例出來，賦予給$kernel
- $kernel handle 賦予的$request ，並交給 response
- ```$response->send()```
- ```$kernel``` terminate 這個 request 和 response...
     
我果真很會看 code 說故事呢，~~自己都自己看不是很懂~~如果不懂也沒關係，但你跟著我這樣看程式碼就大概知道一下 laravel 的啟動到底是怎麼一回事。
    
其實官方文件也有關於他週期的相關說明，礙於篇幅關係我也沒辦法寫得太多，只能這樣簡單帶過...總之 Laravel 在被啟動的時候其實做了很多事情，分別就是走上面的流程，而在 bootstrap 和 kernal 裡面也定義了許多東西與方法，我這裡先點出一個 middleware，這在我們之後會更加詳細說明
    
如果你希望更深入了解的話可以參考以下文章：
    
- 英文文件：https://laravel.com/docs/6.x/lifecycle
- 你也可以看中文文件：
  - https://laravel.tw/docs/5.2/lifecycle
  - https://learnku.com/articles/10642/laravel-request-life-cycle

或者去年的鐵人賽也有一組主題在講 laravel 的原始碼，我自己是有訂閱的（~~不過我還沒看完~~）Laravel 原始碼分析: https://ithelp.ithome.com.tw/users/20102562/ironman/1684
    
另外最近看一篇文章對於Laravel的核心也講得很清楚：https://www.itread01.com/content/1549735233.html