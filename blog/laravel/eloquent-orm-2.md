---
title: Laravel Eloquent ORM-(下)
date: '2019-10-05 09:15:39+00:00'
tags:
- laravel
- ithome
---
終於來到這個第 20 天了，今天我們繼續談談 Eloquent ORM 的部分，Laravel 為 Eloquent 提供一個很棒的東西，那就是`relationship`，有點像是我們資料庫裡面的「外來鍵」，透過使用`relationship`，我們可以更加輕巧的使用 ORM 呢！

Laravel 寫了一個很詳盡的文件：https://laravel.com/docs/6.x/eloquent-relationships

提供我們以下這些類型的「relationship」

- 一對一
- 一對多
- 多對多
- 多對一
- has-one-through
- Has Many Through

這裡我以一對多的關係作為情境的例子。沿著之前的簡單部落格專案的例子，「一篇文章可以有很多標籤」吧。

首先，我們必須先做一個很多「標籤」的資料 Model，首先做 Migration 開始。

```
$ php artisan make:migration tags --create=tags
```

在新的`{timestamp}_create_tags_table.php`調整一下資料表結構

```
    public function up()
    {
        Schema::create('tags', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('article_id')->references('id')->on('articles');
            $table->string('name');
            $table->timestamps();
        });
    }
```

之後建立 Model

```
php artisan make:model Tag
```

之後我們就開始建立文章對標籤的一對多關係了，讓我們來到`app\Article.php`這裏。加入一段

```
    public function tags()
    {
        return $this->hasMany('App\Tag');
    }
```

接下來我們來測試一下，打開`php artisan tinker`

```
>>> use App\Article;
>>> $article = Article::first();
=> App\Article {#3053
     id: 11,
     title: "123",
     content: "123",
     created_at: "2019-09-29 08:10:02",
     updated_at: "2019-09-29 08:10:02",
   }
>>> $article->tags
=> Illuminate\Database\Eloquent\Collection {#3047
     all: [],
   }
```

這樣就表示我們有成功了喔！

要看完整程式碼的可以參考這裡:https://github.com/r567tw/Make-PHP-Great-Again/commit/2851d8e553e2eb556026095cf110fca9d7d71972
