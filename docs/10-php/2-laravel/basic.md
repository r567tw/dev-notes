---
sidebar_position: 1
---

# Basic
:::info
內容整理 From `Laravel 建置與執行`
:::

## Development
- 系統需求
- Composer
- 本地開發環境
    - Laravel Valet (mac)
    - Laravel Homestead
    - Laravel Sail 
- laravel new & composer create-project
- Laravel 的目錄結構

## Environment For Developer
### Windows
### MacOS
- herd: https://herd.laravel.com/
### Docker

## Route
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

- 路由模型綁定
> 定義一個特定的參數名稱 如 {task} 來指示路由解析器，他應該用那個的 id 來尋找而不是傳統將 id 傳入
> 顯式與隱式

- 路由快取
> 壓榨載入時間的每毫秒
```shell
php artisan route:cache
php artisan route:clear
```

## Middleware
- 在進入 controller 之前 過濾 request 的條件和身分等
- 有 controller construct 和 route 定義兩種方式宣告
- 回傳 response


## View
- 使用視圖組件讓所有視圖共用變數

```php
    view()->share('variable','variable);
```

## Controller

| 方法名稱 | 動詞 | URL |
| -------- | -------- | -------- |
|index  |get  |tasks|
|show   |get  | tasks/{task}|
|create | get | tasks/create|
|store  | post| tasks|
|edit   |get  | tasks/{task}/edit|
|update |post (put or patch)| tasks/{task}|
|destroy|post (delete)| tasks/{task}|


- 方法欺騙: method_field () 或者 input-name:_method
- CSRF 
- 轉址 redirect
- 中止請求
    - abort(403)
    - abort_if(condition,403)
    - abort_unless(condition,403)
- 回應 response
    - response ()->make () 建立一個 http 回應
    - response()->json()
    - response()->download()

## Blade 模板
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

## 收集與處理用戶資料
- Request
    - all()
    - except() or only()
    - has() or exist()
    - input () 提供第二個參數是預設值
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
        - ..... 其他 (p.102)
- 驗證
    - \$this->validate($request,[rules]);
    - 表單請求 php artisan make:request Arequest
        - authorize()
        - rule / message
    - withErrors 顯示錯誤訊息
    - 規則可以看文件
- Eloquent 模型的大量賦值
    - $fillable in model
- {{ ... }} v.s {!! ... !!}

## Artisan 與 Tinker
> php artisan make:command action
> #可以同時生成 model 和 migration 和 controller
> php artisan make:model [name] -m -r

## Eloquent
- Laravel 的 ActiveRecord ORM
- config/database.php
- migration 資料庫遷移
    - 系統會依據日期執行他的 up/down 方法
    - 定義 migration
        - up () 作他的 migration
        - down () 恢復他
    - 建立 migration
        ```shell=
            php artisan make:migration create_users_table

            php artisan make:migration add_votes_to_users_table --table=users

            php artisan make:migration create_users_table --create=users
        ```
    - 撰寫 migration [請參考文件](https://laravel.com/docs/5.5/migrations)
    - seeder
    ```shell
        php artisan migrate --seed #與 migrate 一起
        php artisan migrate:refresh --seed #與 migrate 一起
        php artisan db:seed #分別執行
        php artisan db:seed --class=VotesTableSeeder #分別執行
        php artisan make:seeder ContactsTableSeeder
    ```
    
    ```php
    #database/seeds/DatabaseSeeder.php
    .... 
    public function run()
    {
        $this->call(ContactsTableSeeder::class)
    }
    ```
    - 撰寫 seeder 請參考 [文件](https://laravel.com/docs/5.5/seeding)
- 查詢產生器
    - 任何一種資料庫的功能核心都是查詢產生器
    - 原生 DB 靜態介面寫法
    ```php
        DB::statement('drop table users')
        DB::select('select * from student where id=?',[1])
        $users=DB::table('users')->get()
        #.... 其他如 join where insert 等 略
    ```
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
            - inRandomOrder () 隨機排序結果
        - 結束回傳方法
            - get()
            - first() firstOrFail()
            - value () 拉出某個欄位
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
         // 查詢
         DB:table('users')->where('options->isAdmin',true)->get()
        // 更新
        DB:table('users')->update(['options->isAdmin',true])
- Eloquent 模型 [請參考文件](https://laravel.com/docs/5.5/eloquent)
> Eloquent 雖有獨有 all 方法，但本書建議不要使用～
- Eloquent 模型序列化
    - 將某種複雜的東西轉換成字串 toArray () toJson ()
    - https://laravel.com/docs/5.5/eloquent-serialization

## Request & Response
- 請求生命週期
    - 每一個請求都會轉成 Illuminate Request 物件 經過 middleware 過濾請求後進入 controller 處理好後就產生 Illuminate Response
    - request
    - resonse
    - middleware
        - 每一個請求都會經過每一個 middleware 最後進入應用程式，之後產生的回應會經過 middleware 回到用戶

## Container
- 相依注入
    - 每一個類別的相依關係都是從外面住入的 而不是在類別中實例化的
- 控制反轉
- app () 全域輔助函式
- 將類別綁定容器
    - 告知容器如果有人要求一個 Logger 實例，則執行這段程式

## Testing
- Laravel 內建 PHPUnit、Behat、Mockery、Faker 等
- 單元測試
    - 測試對象是小型、相對獨立的單位，通常是一個類別或方法
- 整合測試
    - 測試各個單位合作及傳遞訊息的方式
- 應用測試
    - 驗收或功能測試，測試整個應用程式的行為

- 在根目錄執行 .\vendor\bin\phpunit
- [文件](https://laravel.com/docs/5.5/testing)
- php artisan make:test GreetTest
    - 在 feature 資料夾裡面增加一個 GreetTest.php 繼承 TestCase
    - phpunit 會跑 feature 和 unit 裡的每一個測試
    - $this->visit(url)
    - $this->call(method,url,params,cookies,file,server,content)
    - $this->get/post/put/patch/delete
    - $this->json
    - $this->followRedirects
- 各種的 asset 測試方法
    - [文件](https://laravel.com/docs/5.5/http-tests#available-assertions)
- [自我練習](https://github.com/r567tw/laravel-playground/commit/7478b7b94ed1e1d9742987d03464c92d932e0223)
- Browser Tests (Laravel Dusk)
    - [元件外掛](https://laravel.com/docs/5.5/dusk)

- 測試特徵
    - withoutMiddleware
    - databasemigrations
    - databasetransactions

## API
- 類 REST JSON API 基礎
    - 一種用來建構 API 的架構格式
    - URL 可以獨特的表示一種資源
    - 使用 HTTP 動詞來和資源互動
- CRUD
- Laravel Passport 作 API 身分驗證
    - https://laravel.com/docs/5.5/passport
> composer require laravel/passport

> 在 config/app.php providers 加入 Laravel\PassportServiceProvider::class

> php artisan passport:install

> 將 HasApiTokens 的 trait 加入 App\user
- http://www.itread01.com/content/1496308818.html'
- http://codingweb.tw/2016/12/23/laravel-5-3-api-%E8%AA%8D%E8%AD%89-authentication-passport/

## Storage
- 本地與雲端檔案管理器
- config/filesystems.php
- storage_path () 輔助函式

> php artisan storage:link

- 使用 Storage 靜態介面
- Storage::disk('s3')->get('file.jpg')
    - get()
    - put()
    - putFile('dir',$file)
    - exists()
    - copy(old,new)
    - move(old,new)
    - prepend () 在前面加
    - append () 在後面加
    - delete()
    - deleteDirectory()
    - size()
    - lastModified
    - files(dir)
    - allFiles (dir) + 子目錄內的
    - directories()
    - allDirectories()

## Session
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
session ()->forget (key) #移除一個
session ()->flush () #移除每一個
```

- Flash session 儲存
    - 只想要在下一個網頁載入時抹除它

```php

session()->flash(key,value)

session()->reflash() / session()->keep(key)
#讓前一個網頁的 flash session 繼續使用
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

> composer require laravel/scout
> 加到 config/app.php
> php artisan vendor:publish
> composer require algolia/algoliasearch-client-php

> 在模型內 加入 Laravel\Scout\Searchable
> toSearchableArray()
> searchableAs()

```php
Revie::search('Llew')->get();
```

> config/scout.php 把 queue 設為 true


## Email
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
> php artisan make:mail Assignment
> 會創造一個 Assignment class (extend mailable)
> build 方法裡面 return $this->view ('view.name')

本地開發
- log 驅動程式
- Mailtrap.io 
- Universal to

- 通知 Notification
- php artisan make:notification WorkoutAvailable

## Queue
- 佇列可以將昂貴或緩慢的程序移出任何同步呼叫 ex. 傳送郵件
- config/queue.php

> php artisan make:job CrunchReports
> dispatch(job)->onQueue('high')
> php artisan queue:work

- 事件
- event()
> php artisan make:event UserSubscribed

- 監聽事件
    - php artisan make:listener jobname --event=UserSubscribed 

- 將事件廣播到 WebSocket 與 Laravel Echo
- 排程器 
    - cron job in linux
    - app\console\kernel.php
    - $schedule
> php /path-to-your-project/artisan schedule:run >> /dev/null 2>&1 (in linux: 將唯一的 cron 項目啟動)

## helpers & Collection
- https://laravel.com/docs/5.5/helpers
- https://laravel.com/docs/5.5/collections

陣列
- array_except () 排除陣列指定鍵值資料
- array_forget () 移除陣列指定鍵值資料
- array_get () 取得陣列指定鍵值資料
- array_has () 陣列是否有指定鍵值
- array_only () 限制取得指定鍵值資料
- array_pluck () 整理陣列清單指定鍵值資料

字串
- e () 跳脫 html 字元
- str_limit($string,10)
- str_contains($string,'kj')

應用程式路徑
- base_path()
- config_path()
- database_path()
- public_path()
- storage_path()

其他
- config()
- dump()
- dd()
- now()
- collect () 將陣列轉換成 collection 資料集合物件

### Collection 資料集合物件
- all()
- toArray()
- toJson()
- values()
- keys()
- contains()
- count()
- except()
- only()
- filter
```
$filterCollection = $collection->filter(function($value,$key){
    return $value>2;
})
```
- first()
- last()
- flip () 翻轉鍵值與數值資料
- forget()
- forPage($page,$row_per_page)
- get()
- implode () 合併指定鍵值數值資料為字串
- map () 運算所有鍵值資料
- pluck () 整理指定鍵值資料為新資料集
- pop () 取出最後一個元素資料
- shift () 取出第一個元素資料
- prepend () 加入資料到資料集第一個位置
- pull () 取得指定鍵值資料並移除資料及鍵值資料
- push () 加入資料到資料集最後位置
- put () 加入鍵值資料到資料集
- random () 隨機取得元素資料
- reverse () 反轉資料及資料順序
- search () 搜尋指定資料
- shuffle () 隨機排序資料集資料
- sort()
- sortBy()
- take()
- unique()
- whereIn()
- whereNotIn()

### 加解密
- encrypt()
- decrypt()

## 錯誤與日誌
- ex. Log::error($message)
    - emergency
    - alert
    - critical
    - error
    - warning
    - notice
    - info
    - debug

錯誤檔案紀錄方式
```
// 檔名位置 config/app.php
return [
    'log' => env('APP_LOG‘,'single');//single,daily
    'log_max_files' => 30
]
```

abort (404)  HTTP 例外錯誤代碼


## 上線清單
- https://www.jishuwen.com/d/2EMv/zh-tw

## 相關資源
1. [Larvel News](https://laravel-news.com/)
2. [Laravel Package](https://packalyst.com/)
3. [Packagist](https://packagist.org/)
4. [語系列表](https://github.com/Laravel-Lang/lang)
5. [Laracast 教程](https://laracasts.com/)
6. [更深層的 laravel](https://divinglaravel.com/)

<!-- ## Ref:
- https://medium.com/@chewysalmon/laravel-docker-development-setup-an-updated-guide-72842dfe8bdf -->

## With Elasticsearch
- https://rezakhademi.medium.com/using-elasticsearch-with-laravel-80e8fd8dbc3b

## Deploy
- https://www.vultr.com/docs/how-to-install-laravel-7-on-ubuntu-20-04-with-nginx-and-mariadb/

## Laravel & WebSocket
- https://roy.usongrat.tw/article/56