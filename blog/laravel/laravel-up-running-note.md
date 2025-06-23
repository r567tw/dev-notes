---
title: Laravel 建置與執行及相關筆記
date: "2019-08-31 11:15:17+00:00"
tags:
  - laravel
---

# Laravel 建置與執行

# 1.為甚麼要使用 Laravel

- 為甚麼要使用框架
  - Laravel
  - Lumen
  - Slim
- 歷史
  - Ruby on rails
  - CodeIgniter
  - Laravel
- Laravel 的設計哲學
  - 使用與光有關的字眼
    - illuminate 照亮
    - spark 火花
  - 提升開發速度和開發者的幸福
- Laravel 社群

# 2.設置 Laravel 開發環境與介紹

- 系統需求
- Composer
- 本地開發環境
  - Laravel Valet (mac)
  - Laravel Homestead
    - vagrant up
    - vagrant suspend
    - vagrant halt
    - vagrant destroy
    - vagrant provision
- laravel new & composer create-project
- Laravel 的目錄結構

# 3.路由與控制器

```php
Route::get('/',function(){
    return 'Hello World';
    //return view('welcome'); #resources/views/welcome.blade.php
})

#可用正規表達式限制路由
Route::get('/{name}',function(){
    return 'Hello World';
})->where('name','[0-9]+')
```

- 路由動詞
  - Get 觀看
  - Post 新增
  - Put/Patch 更新
  - Delete 刪除
  - **any**
  ```php
      Route::any('/',function(){})
  ```
  - **match**
  ```php
      Route::match(['get','post'],'/',function(){})
  ```
- 中介層 middleware
  - 在進入 controller 之前 過濾 request 的條件和身分等
  - 有 controller construct 和 route 定義兩種方式宣告
- 使用視圖組件讓所有視圖共用變數

```php
    view()->share('variable','variable);
```

- Controller
  |方法名稱|動詞|URL|
  |--- |--- |--- |
  |index|get|tasks|
  |show|get|tasks/{task}|
  |create|get|tasks/create|
  |store|post|tasks|
  |edit|get|tasks/{task}/edit|
  |update|post (put or patch)|tasks/{task}|
  |destroy|post (delete)|tasks/{task}|

- 路由模型綁定

定義一個特定的參數名稱 如{task} 來指示路由解析器，他應該用那個的 id 來尋找而不是傳統將 id 傳入

- 顯式與隱式
- 路由快取  
   壓榨載入時間的每毫秒

```php
php artisan route:cache
php artisan route:clear
```

- 方法欺騙: method_field() 或者 input-name:\_method
- CSRF
- 轉址 redirect
- 中止請求
  - abort(403)
  - abort_if(condition,403)
  - abort_unless(condition,403)
- 回應 response
  - response()->make() 建立一個 http 回應
  - response()->json()
  - response()->download()

# 4.Blade 模板

```php
 @if 和 @endif
 {{ }}
 @unless @endunless
 @for @foreach @while
 @forelse ==>@foreach 在迭代的物件是空的時可寫應變機制
 @section/@show @yield
 @include
 @extends
```

- 自動 blade 指令
- 全域共用變數

```php
# in App\Providers\AppServiceProvider.php
public function boot()
{
    ...
    view()->share('posts',Post::recent());
}

view()->composer('partials.sidebar',function($view){
    $view->with('posts',Post::recent());
})
#自訂指令
//AppServiceProvider
public function boot()
{
    Blade::directive('ifGuest',function(){
        return "<?php if (auth()->guest()): ?>"
    });
}
```

# 5.前端套件

- laravel-mix

# 6.收集與處理用戶資料

- Request
  - all()
  - except() or only()
  - has() or exist()
  - input() 提供第二個參數是預設值
  - json()
  - 路由資料
    - segment()
  - 上傳檔案
    - $request->hasfile() and $request->file()
    - guessExtension
    - getMimeType
    - move()
    - getClientOriginalName()
    - getClientOriginalExtension()
    - isValid()
    - …..其他(p.102)
- 驗證
  - \$this->validate($request,[rules]);
  - 表單請求 php artisan make:request Arequest
    - authorize()
    - rule / message
  - withErrors 顯示錯誤訊息
  - 規則可以看文件
- Eloquent 模型的大量賦值
  - $fillable in model
- `{{ … }}` v.s `{!! … !!}`

# 7.Artisan 與 Tinker

```php
php artisan make:command {action}
```

- 可以同時生成 model 和 migration 和 controller

```bash
php artisan make:model [name] -m -r
```

# 8.資料庫與 Eloquent

- Laravel 的 ActiveRecord ORM
- config/database.php
- migration 資料庫遷移
  - 系統會依據日期執行他的 up/down 方法
  - 定義 migration
    - up() 作他的 migration
    - down() 恢復他
  - 建立 migration
    - `php artisan make:migration create_users_table`
    - `php artisan make:migration add_votes_to_users_table --table=users php artisan make:migration create_users_table --create=users`
  - `撰寫 migration <a href="https://laravel.com/docs/5.5/migrations">請參考文件</a>`
  - `seeder`指令
    - `php artisan migrate --seed`
    - `php artisan migrate:refresh --seed`
    - `php artisan db:seed`
    - `php artisan db:seed --class=VotesTableSeeder #分別執行`
    - `php artisan make:seeder ContactsTableSeeder`
  - `撰寫seeder 請參考<a href="https://laravel.com/docs/5.5/seeding">文件</a>`
- 查詢產生器
  - 任何一種資料庫的功能核心都是查詢產生器
  - 原生 DB 靜態介面寫法 `php= DB::statement('drop table users') DB::select('select * from student where id=?',[1]) $users=DB::table('users')->get() #....其他如join where insert 等 略`
    - 限制方法
      - select()
      - where()
      - orwhere()
      - whereBetween()
      - whereIn()
      - whereNull() whereNotNull()
      - whereRaw()
      - whereExists()
      - distinct
    - 修改方法
      - orderBy groupbY having() havingRaw()
      - skip() take()
      - latest() oldest()
      - inRandomOrder() 隨機排序結果
    - 結束回傳方法
      - get()
      - first() firstOrFail()
      - value() 拉出某個欄位
      - count()
      - min() max()
      - sum() avg()
    - 聯集與聯結
      - join()
      - union()
    - 增加 更新 刪除
      - insert()
      - update()
      - delete()
    - json 的操作  
       如果你的資料有 json 格式可以這樣寫
      ```php
      //查詢
      DB:table('users')->where('options->isAdmin',true)->get()
      //更新
      DB:table('users')->update(['options->isAdmin',true)
      ```
- Eloquent 模型[請參考文件][1]

Eloquent 雖有獨有 all 方法，但本書建議不要使用~

- Eloquent 模型序列化
  - 將某種複雜的東西轉換成字串 toArray() toJson()
  - https://laravel.com/docs/5.5/eloquent-serialization

# 9.用戶身分驗證與授權

- php artisan make:auth
- https://laravel.com/docs/5.5/authentication
- 守衛
  - config/auth.php
  - auth()->guard(&#8216;user')->user()
- 授權 ACL
  - in blade: can cannot allows denies
  - can
  - gete
  - policy

# 10.請求與回應

- 請求生命週期
  - 每一個請求都會轉成 Illuminate Request 物件 經過 middleware 過濾請求後進入 controller 處理好後就產生 Illuminate Response
  - request
  - resonse
  - middleware
    - 每一個請求都會經過每一個 middleware 最後進入應用程式，之後產生的回應會經過 middleware 回到用戶

# 11.容器

- 相依注入
  - 每一個類別的相依關係都是從外面住入的 而不是在類別中實例化的
- 控制反轉
- app() 全域輔助函式
- 將類別綁定容器
  - 告知容器如果有人要求一個 Logger 實例，則執行這段程式

# 12.測試

- Laravel 內建 PHPUnit、Behat、Mockery、Faker 等
- 單元測試
  - 測試對象是小型、相對獨立的單位，通常是一個類別或方法
- 整合測試
  - 測試各個單位合作及傳遞訊息的方式
- 應用測試
  - 驗收或功能測試，測試整個應用程式的行為
- 在根目錄執行 .\vendor\bin\phpunit
- [文件][2]
- php artisan make:test GreetTest
  - 在 feature 資料夾裡面增加一個 GreetTest.php 繼承 TestCase
  - phpunit 會跑 feature 和 unit 裡的每一個測試
  - $this->get/post/put/patch/delete
  - $this->json
  - $this->followRedirects
- 各種的 asset 測試方法
  - [文件][3]
- [自我練習][4]
- Browser Tests (Laravel Dusk)
  - [元件外掛][5]
- 測試特徵
  - withoutMiddleware
  - databasemigrations
  - databasetransactions

# 13.編寫 API

- 類 REST JSON API 基礎
  - 一種用來建構 API 的架構格式
  - URL 可以獨特的表示一種資源
  - 使用 HTTP 動詞來和資源互動
- CRUD
- Laravel Passport 作 API 身分驗證
  - https://laravel.com/docs/5.5/passport

composer require laravel/passport

在 config/app.php providers 加入 Laravel\PassportServiceProvider::class

php artisan passport:install

將 HasApiTokens 的 trait 加入 App\user

- http://www.itread01.com/content/1496308818.html'
- http://codingweb.tw/2016/12/23/laravel-5-3-api-%E8%AA%8D%E8%AD%89-authentication-passport/

# 14.儲存與取出

- 本地與雲端檔案管理器
- config/filesystems.php
- storage_path() 輔助函式

```bash
php artisan storage:link
```

- 使用 Storage 靜態介面
- Storage::disk('s3')->get('file.jpg')
  - get()
  - put()
  - putFile('dir',$file)
  - exists()
  - copy(old,new)
  - move(old,new)
  - prepend() 在前面加
  - append() 在後面加
  - delete()
  - deleteDirectory()
  - size()
  - lastModified
  - files(dir)
  - allFiles(dir) +子目錄內的
  - directories()
  - allDirectories()
- Session
  - Laravel 的 session 管理器支援：檔案、cookie、資料庫、Memcached、**Redis**

```php
#取出
session()->get('key')
session('key')
#放入
session()->put('key','value')
session(['key','value'])
#session 是陣列時
session->push(key,value)
#全部
session()->all()
#移除
session()->forget(key) #移除一個
session()->flush() #移除每一個
```

- Flash session 儲存
  - 只想要在下一個網頁載入時抹除它

```php
session()->flash(key,value)

session()->reflash() / session()->keep(key)
#讓前一個網頁的flash session 繼續使用
```

- 快取
- 快取中的資料是為每一個應用程式儲存的；而 session 中的資料是為每一個用戶儲存的
- config/cache.php
- https://laravel.com/docs/5.5/cache
  - cache()->get(key,fallbackvalue)
  - cache()->pull(key,fallbackvalue)
  - cache()->put(key,value,minutesOrExpiration)
  - cache()->add(key,value)
  - cache()->forever(key,value)
  - cache()->has()
  - cache()->remember(key,minutes,closure) / cache()->rememberForever(key,closure)
  - cache()->increment(key,amount) / cache()->decrement(key,amount)
  - cache()->forget() / cache()->flush()
- Cookie
- https://laravel.com/docs/5.5/requests#cookies
- Laravel Scout 作全文搜尋
  - 可為 Eloquent 模型加入全文搜尋
  - Algolia 預設驅動程式
  - 要改成 elasticsearch 請另外找辦法

# 15.郵件與通知

- 郵件
- https://laravel.com/docs/5.5/mail
- config/mail.php
  - classic
  - mailable
- 傳統郵件 classic

```php
Mail::send(view,data,closure)
# closure 裡面有寄件者 收件者 等等
```

- Mailable
  本地開發

- log 驅動程式
- Mailtrap.io
- Universal to
- 通知 Notification
- php artisan make:notification WorkoutAvailable

# 16.佇列、工作、事件、廣播與排程器

- 佇列可以將昂貴或緩慢的程序移出任何同步呼叫 ex.傳送郵件
- config/queue.php

- 事件
- event()

- 監聽事件
  - php artisan make:listener jobname --event=UserSubscribed
- 將事件廣播到 WebSocket 與 Laravel Echo
- 排程器
  - cron job in linux
  - app\console\kernel.php
  - $schedule

# 17.輔助函式與集合

- https://laravel.com/docs/5.5/helpers
- https://laravel.com/docs/5.5/collections

# Laravel 的中大型專案架構

- [參考資料][6]
- [laravel 優美架構][7]
- 可用外掛 - https://github.com/Mombuyish/Laravel-Oh-Generators

  1.Model : 僅當成 Eloquent class。  
  2.**Repository : 輔助 model，處理資料庫邏輯，然後注入到 service。**  
  3.**Service : 輔助 controller，處理商業邏輯，然後注入到 controller。**  
  4.Controller : 接收 HTTP request，調用其他 service。  
  5.**Presenter : 處理顯示邏輯，然後注入到 view。**  
  6.View : 使用 blade 將資料 binding 到 HTML。  
  7.Transformer :轉換顯示欄位(API)  
  8.Formatter: 格式的統一顯示格式(API)  
  9.Foundation: 獨立掛載功能

總結

- 職責單一: 就是說每次修改都會有個地方變動而已，所以每個類別都只會有一種改變的理由
- 跟夥伴們取得一個共識：讓他們知道這樣的設計和方法可以帶來時麼樣的好處，建立一個良好的溝通

# Laravel 外掛整理

## Debug

- [Laravel-tracy][8]
  - [vscode-handler][9]:使用 vs-code 一鍵開檔
- laravel debugbar

## 開發相關

- [laravel-model-generator][10]:生成 laravel model
- [laravel-oh-generators][11]:生成優美 laravel 架構

## 驗證

- [laravel-jsvalidation][12]:Laravel 和前端的規則可以共用

## 權限

- [laravel-entrust][13]:使用者權限劃分

## 管理後台

- 管理後台平台外掛 類似 Django 自帶後台?
  - http://labs.infyom.com/laravelgenerator/
  - LARAVEL-ADMIN
    - http://www.ctolib.com/article/comments/21786
    - http://laravel-admin.org/

## Ruby on rail Scaffold

- Laravel 類似 Ruby on rail 的 scaffole 指令
  - https://github.com/appzcoder/crud-generator/

## Office

- laravel excel
- laravel word

## Notification 通知

- laravel flash

## Log

- laravel5 log viewer

## 開發

- laravelcollective HTML

## PDF

- laravel dom-pdf

## 資料庫備份

- laravel-backup

## Datatable

- [yajra datatables][14]

## 其它

- laravel dusk (瀏覽器測試)
- laravel-fractal (創建 api)
- doctrine DBAL (更優的數據表操作)
- intervention image(用於修改及創造圖片)
- [Laravel 寫 log 的建議方法][15]
- https://laravel-china.org/topics/2530/the-highest-amount-of-downloads-of-the-100-laravel-extensions-recommended
- [每一個 laravel 安裝的 package 有哪些][16]

# Laravel 的 Carbon 小技巧

1.本地化

```php
# app/Providers/AppServiceProvider.php
public function boot()
{
    \Carbon\Carbon::setLocale('zh');
}
#$article->created_at->diffForHumans(); # 1 年前
```

2.七個小技巧  
https://9iphp.com/web/php/less-known-useful-carbon-functions.html

- isX :True/False

```php
<?php
$dt->isWeekday();
$dt->isWeekend();
$dt->isYesterday();
$dt->isToday();
$dt->isTomorrow();
$dt->isFuture();
$dt->isPast();
$dt->isLeapYear();
$dt->isSameDay(Carbon::now());
```

- isBirthday

```php
<?php
$born = Carbon::createFromDate(1987, 4, 23);
$noCake = Carbon::createFromDate(2014, 9, 26);
$yesCake = Carbon::createFromDate(2014, 4, 23);
var_dump($born->isBirthday($noCake));      // bool(false)
var_dump($born->isBirthday($yesCake));
```

- StartOfX 和 EndOfX 列表

```php
<?php
$dt = Carbon::create(2012, 1, 31, 12, 0, 0);
echo $dt->startOfDay();     // 2012-01-31 00:00:00
echo $dt->endOfDay();       // 2012-01-31 23:59:59
echo $dt->startOfMonth();   // 2012-01-01 00:00:00
echo $dt->endOfMonth();     // 2012-01-31 23:59:59
echo $dt->startOfYear();    // 2012-01-01 00:00:00
echo $dt->endOfYear();      // 2012-12-31 23:59:59
echo $dt->startOfDecade();  // 2010-01-01 00:00:00
echo $dt->endOfDecade();    // 2019-12-31 23:59:59
echo $dt->startOfCentury(); // 2000-01-01 00:00:00
echo $dt->endOfCentury();   // 2099-12-31 23:59:59
echo $dt->startOfWeek();    // 2012-01-30 00:00:00
echo $dt->endOfWeek();      // 2012-02-05 23:59:59
```

- Today, Tomorrow, Yesterday

```php
<?php
$today = Carbon::today();  // assuming 2016-06-24
echo $today;                   // 2016-06-24 00:00:00
$tomorrow = Carbon::tomorrow();
echo $tomorrow;                      // 2016-06-25 00:00:00
$yesterday = Carbon::yesterday();
echo $yesterday;                   // 2016-06-23 00:00:00
```

- DiffForHumans + 本地化

```php
<?php
echo Carbon::now()->subDays(5)->diffForHumans()//5daysago
Carbon::setLocale('zh');
echo Carbon::now()->addYear()->diffForHumans(); //一年前
```

- 改变 now() 为任意你想要的时间

```php
<?php
$knownDate = Carbon::create(2001, 5, 21, 12);//建测试日期
Carbon::setTestNow($knownDate);    // set the mock
echo Carbon::now();      // 2001-05-21 12:00:00
```

- 星期常量

```php
<?php
var_dump(Carbon::SUNDAY);            // int(0)
var_dump(Carbon::MONDAY);            // int(1)
var_dump(Carbon::TUESDAY);           // int(2)
var_dump(Carbon::WEDNESDAY);         // int(3)
var_dump(Carbon::THURSDAY);          // int(4)
var_dump(Carbon::FRIDAY);            // int(5)
var_dump(Carbon::SATURDAY);          // int(6)
```

# 相關資源

- 理解 laravel 核心概念
  - https://www.codecasts.com/series/peak-into-laravel-core-components
  - https://laravel-china.org/topics/3057/the-core-concept-of-laravel
- 套件管理-軍火庫
  - [Packagist][20]
- 教程
  - [Larvist][21]
  - https://www.codecasts.com/
- sample code
  - [laravel 5.5 blog][22]
- [更有效率的 laravel][23]
- [更深層的 laravel][24]
- [phpconf 筆記][25]
- [使用 Laravel & Vue.js 打造即時資訊看板][26]
- [laravel 優美架構][7]
- [每一個 laravel 安裝的 package 有哪些][16]
- [laravel 小技巧][27]
- [laravel 開源項目大全][28]
- [Redis 應用][29]
- [如何經營 Side Project 拿到 1K 顆星星][30]
- https://medium.com/@guitarbien

[1]: https://laravel.com/docs/5.5/eloquent
[2]: https://laravel.com/docs/5.5/testing
[3]: https://laravel.com/docs/5.5/http-tests#available-assertions
[4]: https://github.com/r567tw/laravel-playground/commit/7478b7b94ed1e1d9742987d03464c92d932e0223
[5]: https://laravel.com/docs/5.5/dusk
[6]: http://oomusou.io/laravel/laravel-architecture/
[7]: https://docs.google.com/presentation/d/1rOWNct6tu8u63Gss8hHwz8KncWkP3yI3BR8dsDs1-Sg/edit#slide=id.g22cf02b506_3_403
[8]: https://packagist.org/packages/recca0120/laravel-tracy
[9]: https://github.com/shengyou/vscode-handler
[10]: https://github.com/ignasbernotas/laravel-model-generator
[11]: https://github.com/Mombuyish/Laravel-Oh-Generators
[12]: https://github.com/proengsoft/laravel-jsvalidation
[13]: https://github.com/Zizaco/entrust
[14]: https://github.com/yajra/laravel-datatables
[15]: https://stackoverflow.com/questions/31087897/laravel-5-log-model-create-update-delete-events
[16]: https://9iphp.com/web/laravel/what-packages-do-you-install-on-every-laravel-application-you-create.html
[17]: http://blog.csdn.net/justdb/article/details/17331569
[18]: http://teddy-chen-tw.blogspot.tw/2014/09/bddtdd.html
[19]: https://tw.alphacamp.co/2015/03/02/tdd-kata/
[20]: https://packagist.org/
[21]: https://www.codecasts.com/
[22]: http://itsolutionstuff.com/post/laravel-55-crud-example-from-scratchexample.html
[23]: https://serversforhackers.com/laravel-perf/course?email=r567tw@gmail.com
[24]: https://divinglaravel.com/
[25]: https://hackmd.io/s/SJEH1KZgx#phpconftw-2016-day-1
[26]: https://docs.google.com/presentation/d/1PN4Ou1b3_gnPyki9JfU3fp9sSeavk0rAvkZptxF2yFc/edit#slide=id.g1871d6e478_0_374
[27]: https://9iphp.com/series/laravel-snippets
[28]: http://laravelacademy.org/laravel-project
[29]: http://www.infoq.com/cn/articles/architecture-practice-01-redis?utm_term=global&utm_content=buffer0f201&utm_medium=social&utm_source=facebook.com&utm_campaign=buffer
[30]: https://medium.com/@xxhomey19/github-%E5%A6%82%E4%BD%95%E7%B6%93%E7%87%9F-side-project-%E6%8B%BF%E5%88%B0-1k-%E9%A1%86%E6%98%9F%E6%98%9F-974b8d170436
