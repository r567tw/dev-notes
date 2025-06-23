---
title: Laravel Eloquent ORM-(上)
date: '2019-10-03 16:22:24+00:00'
tags:
- laravel
- ithome
---
接下來我們介紹 Laravel 的 ORM：Eloquent，ORM 就是使用物件導向的方式去操作資料庫。這對負責程式開發的工程師有一個很不錯的好處：不用處理「純 SQL 語法」，當然，不使用「純 SQL」的效能會略比使用 Eloquent 還要差一點，然而，這是可以讓我們有比較易讀的程式碼以及較好的維護性。

簡單來說`Eloquent`他就是 Laravel 內部的類別。其實我們**繼承**他就可以讓我們做使用了，例如之前練習的 Article.php

```
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    //
}
```

為了接下來我們可以來做一些介紹 Elquent 的部分，我這裡介紹一個之前沒講過指令，但在我們 Debug\開發的時候非常好用，那就是

```
$ php artisan tinker
```

![https://ithelp.ithome.com.tw/upload/images/20191004/20106999DfcndxmpZt.png](https://ithelp.ithome.com.tw/upload/images/20191004/20106999DfcndxmpZt.png)

然後你可以利用 Cli 的模式去查詢這個 Model，例如查詢所有 Article
![https://ithelp.ithome.com.tw/upload/images/20191004/20106999WMACJ9zJvE.png](https://ithelp.ithome.com.tw/upload/images/20191004/20106999WMACJ9zJvE.png)

框架的好處就是`約定成俗`，因此當你這樣的宣告`Article.php`的 Model，他當然也就會對照`articles`，那如果今天有個情境：不是`articles`怎麼辦？那也很簡單，在 Eloquent 裡面加入一個新屬性

```
protected $table = 'my_articles';
```

這樣我們也可以使用其他 table 處理 ORM 囉！

而他另外還有一個很常用的屬性，就是是否讓我們`批次賦值`的部分，這個批次賦值可以讓我們不用每一次都要`new`一個 Model，然後一個一個屬性宣告，最後`save()`(請複習我們之前[綜合應用(4) 使用 Laravel 做一個簡單的部落格：複習-下
](https://ithelp.ithome.com.tw/articles/10221374))

```
//沒有使用批次賦值
$article = new Article();
$article->title = $title;
$article->content = $content;
$article->save();
```

但是如果我們要使用`批次賦值`之後，這就方便許多了，首先在`eloquent model`同樣增加一種屬性

```
protected $fillable = ['title','content'];
```

之後我們 ArticleController 就可以這樣改囉～

```
//使用批次賦值
$article = Article::create($request->all())
```

這樣是否方便許多了呢？

現在，讓我們感受一下 ORM 的魔力一下，假設我今天想要找出標題為'title'的資料該怎麼處理？在 Laravel 的 Eloquent ORM 裡，非常簡單

```
Article::where('title','title')->get()
```
![https://ithelp.ithome.com.tw/upload/images/20191004/20106999Sg7Xj1l6qz.png](https://ithelp.ithome.com.tw/upload/images/20191004/20106999Sg7Xj1l6qz.png)

詳細的深入可以參考文件：https://laravel.com/docs/6.x/eloquent
明天將會討論 Relationship 的部分，敬請期待吧～

註：如果要離開`php artisan tinker`的可以使用`exit`就可以離開囉
![https://ithelp.ithome.com.tw/upload/images/20191004/201069996b4GeGn4cm.png](https://ithelp.ithome.com.tw/upload/images/20191004/201069996b4GeGn4cm.png)

要看完整程式碼的可以參考這裡(今天的程式碼超少的啦 XD):https://github.com/r567tw/Make-PHP-Great-Again/commit/e7041c983f0fd019ef8aa2bff5672e58f2c93588
