---
title: Laravel Route(路由)
date: '2019-09-19 13:09:20+00:00'
tags:
- laravel
- ithome
---
前一天我們稍微簡介一下資料夾的結構，談到 routes 這個資料夾放置所有和路由相關的檔案。打開 routes 資料夾，我們看到四個檔案 
    
- api.php :在做前後端分離專案的時候，我們會用到這個檔案
- channels.php：和 Broadcast 有關係，這是 laravel 的功能，我自己也很少用過。期待未來在寫這個系列的時候一起來學習。
- console.php：和指令有關係，我們會常常打 php artisan xxx ，這個檔案就是和這個部分有關係。

    
# web.php
    
讓我們可以先玩一下 web.php看到 laravel 為我們預設了一段
 
```php
Route::get('/', function () {
    return view('welcome');
});
```
    
讓我們按照 code 說一下故事：就是有一個 Route 的類別，他可以有一個 Get 的方法，`/`的意思就是不加任何東西，而 function 這一段就是指示當我們到/的時候應該要怎麼做，這個預設範例就是說我們可以`return view('welcome')` `view()`這個方法指向 resource 底下的 views 資料夾底下，傳入的字串是前綴詞，因此，他會把 welcome.blade.php 這個檔案傳給瀏覽器讀取。就是我們看到的那樣囉
    
所以，我們可以如法炮製在 web.php 寫一個
 
```php
Route::get('hello', function () {
    return 'Hello World'
});
```

然後在你的網址後面加入個/hello，就會看到 Hello World 的字串囉
    
或許你會問到，我希望傳一些資料給 Laravel 可不可以，當然啦 當然可以囉，就像底下這樣寫
    
```php
Route::get('/hello/{name}', function ($name) {
    return 'Hello ' . $name;
});
```
    
神奇吧，在你的{}裡面填入你的名稱，記得後面的 function 也要帶上參數，你就可以帶資料進去了喔！
    
關於 Route 的部分你可以更多深入參考文件https://laravel.com/docs/6.x/routing#route-parameters
    
之後我會講到 RESTFul API 的部分，到那個時候我會在更多的說明有關於這個部分.....
    
# api.php
    
api.php 你發現預設的也是 Route 嗎？
 
```php
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
```

middleware 就是一種過濾、防火牆的概念，這個我們之後會再說明，在這裡你可以不用太多著墨，如同剛剛我們可以如法炮製寫一個小範例，如下
    
```php
Route::get('/hello', function ($name) {
    return 'Hello World';
}
```
    
    
# console.php
我們看到 Laravel 幫我們寫道的預設是
    
```php
Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->describe('Display an inspiring quote');
```

那麼讓我們在終端機並且移到這個資料夾目錄下使用
    
```shell
$ php artisan inspire
```

你就看到一句令人激勵的名言，~~有沒有覺得備感激勵呢？！~~
    
然後你可以在下一個指令，在我們剛剛的指令加入 -help
    
```shell
$ php artisan inspire -help
```
    
有沒有發現後面 describe 裡面的字串出現在 description 裡面了呢～好了別光說不練，讓我們也像之前一樣如法炮製一番加入這段
    
    
```php
Artisan::command('helloworld', function () {
    $this->comment('Hello World');
})->describe('Display Hello World');
```

然後存檔後執行
    
```shell
$ php artisan helloworld
```
    
然後你就看到`Hello World`的字樣囉，關於 command 的部分我們之後會再更多的說明囉～

# channels.php
    
這個和 Broadcast 有關係，這個以後我們和 Broadcast 之後再一起討論吧，絕對不是說~~我沒寫過所以沒把握來寫哈哈~~
    
    
# Artisan 相關指令
    
之後我們會常常使用到 command line 來產生檔案，這也是 laravel 讓人覺得很方便的地方，可以幫我們把一些檔案製造出來讓我們可以自由發揮，因此之後我會全部整理在這裡讓大家參考，如果之後有遺漏的可以在底下留言或者以後我也會自行補充修改：
    
關於 route 的指令如下，如果有遺漏我會在補充
    
    
程式碼的部分你可以參考這裏：https://github.com/r567tw/Make-PHP-Great-Again/commit/83e076b690e938d549c29851bd37f8be9423fe3e