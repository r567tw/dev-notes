---
title: 綜合應用(2) 使用 Laravel 做一個簡單的部落格：複習-上
date: '2019-09-24 16:02:17+00:00'
tags:
- laravel
- ithome
---
現在讓我們結合過去九天的學習，一起做個簡單的部落格，其中他就只是一個文章的增刪改查的部分。藉此案例來實作我們的小專案。

# 建立環境

首先，讓我們使用指令建立一個全新的 Laravel 專案。讓我們以`FirstLaravel`為名，這個名稱你可以自訂，只要是字串都可以～

```
$ laravel new FirstLaravel
```

**在這裏補充之前沒說過的 Artisan 指令**
為了讓我們的環境可以統一，我們就使用 Laravel 附帶 serve 的指令來開發吧～

```
$ cd FirstLaravel  #先讓我們移動到FirstLaravel這個資料夾底下
$ php artisan serve
Laravel development server started: http://127.0.0.1:8000
```

看到後面的網址了嗎？讓我們在瀏覽器打上`http://127.0.0.1:8000`
就會看到這個畫面，這樣我們就～～成功一半了呵呵～～
![https://ithelp.ithome.com.tw/upload/images/20190925/20106999NAtdmKsWWh.png](https://ithelp.ithome.com.tw/upload/images/20190925/20106999NAtdmKsWWh.png)

# 資料庫、Factory 和 Seeder

接下來，讓我們開始寫程式吧！首先是參考我們第五天說到的 database:https://ithelp.ithome.com.tw/articles/10218302

在 **.env 填好你的資料庫連線資訊之後**，應該就可以開始了，首先也是使用一下指令

```
$ php artisan make:migration create_article_table --create=articles
Created Migration: 2019_09_24_150500_create_article_table
```

## 建立 Migration

接下來你就看到`2019_09_24_150500_create_article_table.php` 在 database/migrations 裡面出現，PS. `2019_09_24_150500`是時間戳記，數字不一樣沒關係，但後面的 create_article_table 要一模模一樣樣啊～

然後讓我們在`up()` 裡面寫一下程式：

```
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title'); //新增一個叫做title的欄位，使用string型態
            $table->text('content'); //新增一個叫做content的欄位，使用text型態
            $table->timestamps();
        });
    }
```

## 建立 Factory

為了在一開始有一些資料可以用，我們也順便把 Factory 和 seeder 也一起弄一弄好了～

為了讓 Factory 來用，我們先建立個簡單的 Model 吧，這樣才有辦法讓 Factory 用

```
$ php artisan make:model Article
```

然後我們可以開始用 Factory 了，Check out~

```
$ php artisan make:factory ArticleFactory --model=Article
```

你就看到 database/factories 裡有一個`ArticleFactory.php` 檔案囉
讓我們寫一下 Factory 的資料吧！

```
<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Article;
use Faker\Generator as Faker;

$factory->define(Article::class, function (Faker $faker) {
    return [
        'title' => $faker->title(),
        'content' => $faker->paragraph()
    ];
});
```

## 建立 Seeder

Factory 只是指定資料如何建立，接下來我們還要建立 Seeder 才會建立資料庫

```
$ php artisan make:seeder ArticlesTableSeeder
```

這樣我們就會看到`ArticlesTableSeeder.php`出現在 database/seeds 資料夾裡面
之後在這個檔案裡面寫道`factory('App\Article', 10)->create();` 就準備好了呢，10 這個數字你可以改別的數字～將`ArticlesTableSeeder.php`程式碼放在下面供參閱

```
<?php

use Illuminate\Database\Seeder;

class ArticlesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        factory('App\Article', 10)->create();
    }
}
```

**別忘了`DatabaseSeeder.php`這個檔案**
對了，別忘了告訴 DatabaseSeeder.php 裡面要呼叫 ArticlesTable 喔，如下範例

```
<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(ArticlesTableSeeder::class);
    }
}
```

接下來讓我們跑指令

```
$ php artisan migrate --seed
```

你就看到你的資料庫有表和資料囉～
![https://ithelp.ithome.com.tw/upload/images/20190925/201069992APBVcyB2Z.png](https://ithelp.ithome.com.tw/upload/images/20190925/201069992APBVcyB2Z.png)

# Routes

之後讓我們在 Route 裡面加入我們 CRUD 的部分，在 routes/web.php 請加入這一行

```
Route::resource('article', 'ArticleController');
```

其實可以一口氣把後面剩下的 Controller 和 View 寫完～
~~但好想耍廢喔~~
所以就讓我們明後天在把這個小專案結束囉～ 我們明天見～

本次文章完整程式碼可以參考至此：https://github.com/r567tw/Make-PHP-Great-Again/commit/8ae1735846c233fb9e6f793eb34293990a758c95
