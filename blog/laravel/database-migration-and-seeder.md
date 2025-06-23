---
title: 'Laravel Database: Migration and Seeder'
date: '2019-09-20 14:18:21+00:00'
tags:
- laravel
- ithome
---

俗話說：「兵馬未動，糧草先行」，接下來讓我們講講 Laravel 關於 database 的部分。目前 Laravel 接受底下類型 

- MySQL
- PostgreSQL
- SQLite
- SQL Server
     
之後我們將以「Mysql」作為範例。首先，我們必須確保 資料庫 與 php 有所連結。讓我們打開 .env 這個檔案來看其中有一段關於 database 的敘述

``` 
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=homestead
DB_PASSWORD=homestead
```

我們以 Mysql 為範例，DB_Connection 保持不變。然後 DB_HOST 和 DB_PORT 填入你要連線的資訊，之後填入連線的資料庫 DB_DATABASE ，還有連線的 USERNAME 和 PASSWORD
    
確保這些連線資訊正確之後開始我們準備 Database 裡面的資料啦，讓我們來看看 database 這個資料夾，裡面很簡單也只有三個資料夾
    
    

- factories：他控制整個資料被填充的過程，例如：user 資料應該如何被產生？之後我們在 seeds 可以使用 factory()這個方法
- migrations ：Laravel 很特別的地方就是讓我們資料庫有點感覺是版本控制
- seeds: 裡面放置產生假資料的檔案，等等我們會用例子說明
     
# factories
    
讓我們看看 Laravel 給我們預設的檔案，UserFactory.php 這個檔案，他裡面其實很簡單，程式碼如下：
 
```php
$factory->define(User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'email_verified_at' => now(),
        'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        'remember_token' => Str::random(10),
    ];
});
```
    
這段程式碼其實就展示如果要製作 User 這筆資料應該需要填入怎麼樣的過程，其中$faker 這個東西很好用，他可以很簡單地幫我們回傳一些「類似真實世界」的假資料，faker 的使用可以參考這裡:https://github.com/fzaninotto/Faker
    
因此當我們 User factory 建立好(~~其實也不是我們建立的是 laravel 給我們的~~)，我們就可以在 seed 資料夾裡面的檔案就可以這樣使用啦

```php
factory(App\User::class)->create(); //這裡只會產生一筆
factory(App\User::class,10)->create(); //這裏會一次產生10筆
```

接下來我們可以使用指令製作屬於自己的 factory，請使用
    
```shell
php artisan make:factory ArticleFactory -model=Article
```
    
***之後你就在 return 裡面使用$facker 規劃資料的建置過程囉***
  
# Migration
    
migration 資料夾裡面就是我們正式在資料庫的那些資料表結構啦～ 初次踫到 Laravel 的時候真的覺得這個部分真的很好用，也讓常常與後端溝通的 database 不用兼任 DBA，然後苦寫 SQL(DML)那邊，可以用非常 artisan、優雅的方式宣告資料庫裡面該裝哪些資料表或架構。
    
我們看到 Laravel 也很貼心的給我們一些檔案，我以`2014_10_12_000000_create_users_table.php`作為範例解說，其餘的檔案可以以此類推了解。
    
我們很清楚的看到檔案繼承了`Migration`這個 class

```php
class CreateUsersTable extends Migration
```

而檔案很簡單也只有 up()和 down()兩個 function。一個是在我們執行`php artisan migrate`會用到：up()另一個則是在我們執行`php artisan migrate:rollback`會用到：down()
    
PS.當我們把 migration 和 seeder 裡面的資料寫完之後就可以***執行一些命令把我們寫到的結構寫入資料庫當中***，所以等等我會稍微說明 php artisan migrate 等等指令的效果
    
好啦，廢話不多說 up()裡面寫道：
    
```php
Schema::create('users', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->string('name');
      $table->string('email')->unique();
      $table->timestamp('email_verified_at')->nullable();
      $table->string('password');
      $table->rememberToken();
      $table->timestamps();
});
```

其實這段程式碼就很清楚的表示結構是什麼，首先是建立一個`users`表，然後裡面有一個 autoIncremest 結構的 id \字串結構的 name 欄位....等等等不繼續贅述了，至於你要參考的話可以參考看看這個文件：https://laravel.com/docs/6.x/migrations#columns
    
我們可以使用一個指令建立新的 migration 檔案
    
```shell
$ php artisan make:migration <file name> --create=<table name>
//我以我們要建立"articles"這個表為例，我們指令就這樣寫
$ php artisan make:migration create_article_talbe --create=articles
```
    
然後咧，你就看到某個時間字串接_create_article_table.php 的檔案出現在 migrations 這個資料夾當中，然後很棒的是，他也給了我們 up()和 down()的方法，你可以參考一下剛剛給的[文件](https://laravel.com/docs/6.x/migrations#columns)，在 up()裡面宣告你要給的資料表結構。
    
讓我們使用`php artisan migrate`，你就會看到你的資料庫有一些 table 了喔～如圖

![https://ithelp.ithome.com.tw/upload/images/20190920/20106999tG6RHrbCju.png](https://ithelp.ithome.com.tw/upload/images/20190920/20106999tG6RHrbCju.png)
    
    
PS: 如果你發現資料表結構需要修改，但因為某些原因（例如已經半上線了），你不能直接重設 migration 的話，你可以使用```php artisan make:migration modify_article_table --table=articles```，然後你就可以繼續修改囉～～～

# seeds
    
Laravel 預設給我們只有一個檔案:`DatabaseSeeder.php`其實這個檔案是 seeder 的總管，他會呼叫要把哪些資料填充(seed)，看到他註解的那一行，其實我們可以把它取消註解，變成
    
```php
$this->call(UsersTableSeeder::class);
```

好！ 讓我們填充 User 的資料表吧！使用這個指令
    
```shell
$ php artisan make:seeder <file>
//以UsersTableSeeder為例，如下
$ php artisan make:seeder UsersTableSeeder
```

然後我們就在 seeds 資料夾底下看到`UsersTableSeeder.php`囉其實裡面只有一個 function : run
    
裡面你可以寫 native sql 或者 orm 或者前面我說到的 factory 都可以，反正他就是要拿來填充資料的。
    
但記得 Laravel 是 Artisan 的框架，所以我們當然要把我們前面用到的 factory 來用一用囉
    
在 run()裡面寫道
    
```php
factory('App\User', 10)->create();
```
    
然後你就會看到 users 表裡面有 10 筆假資料囉(如圖)，簡單吧
![https://ithelp.ithome.com.tw/upload/images/20190920/20106999pRw9DsCVi1.png](https://ithelp.ithome.com.tw/upload/images/20190920/20106999pRw9DsCVi1.png)
    
    
# Artisan 相關指令
   
之後我們會常常使用到 command line 來產生檔案，這也是 laravel 讓人覺得很方便的地方，可以幫我們把一些檔案製造出來讓我們可以自由發揮，因此之後我會全部整理在這裡讓大家參考，如果之後有遺漏的可以在底下留言或者以後我也會自行補充修改：
    
關於 migration 得指令整理如下，如果有遺漏我會在補充

1. php artisan make:seeder  //產生seeder檔案
2. php artisan make:factory //產生factory 檔案
3. php artisan make:migration //產生migration 檔案
4. php artisan migrate //將這次的migration讀入資料庫建立架構
5. php artisan migrate:rollback //推回上一次的migration
6. php artisan migrate:reset //推回全數的migration
7. php artisan migrate:refresh //推回所有遷移並且再執行一次
8. php artisan migrate --seed //將這次的migration讀入資料庫建立架構並且也跑seeder
9. php artisan migrate:refresh --seed //推回所有遷移並且再執行一次以及seeder
10. php artisan db:seed //單純跑資料的seeder 填充資料

程式碼的部分你可以參考這裏：https://github.com/r567tw/Make-PHP-Great-Again/commit/6801bd151006bbc1cb1ae5d5165832daf640bff4