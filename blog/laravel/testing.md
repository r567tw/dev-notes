---
title: Laravel Testing
date: '2019-10-06 12:17:36+00:00'
tags:
- laravel
- ithome
---
接下來我決定我要分享的部分就是關於測試的部分，我指的可不是我們在前端頁面點一點、拉一拉的肉眼測試喔，而是利用程式測試程式。在 php 有一個很有名的工具：PHPUnit，這麼湊巧的是，Laravel 也結合了這個部分，很巧妙的讓我們也能夠輕鬆的使用 phpunit，搭上 TDD 的方法，讓我們更能夠寫出優秀、強韌的程式來。

# 資料夾

首先讓我們看到在 Laravel 專案底下，有一個`tests`的資料夾，賓果！那就是我們測試所放的部分，`Feature`是放置比較針對功能面，需求面功能的測試類別，而`Unit`則是放置關於檔案，像是 Model、Services 等等的測試類別，別急，接下來我會舉一些例子讓你們更加清楚一些。

# 如何執行

```
$ ./vendor/bin/phpunit
```

就這麼簡單，把 vendor 裡面的 bin 有一個 phpunit，把他呼叫起來就好了，如果你什麼都還沒做的話應該會類似以下的畫面

```
PHPUnit 8.3.4 by Sebastian Bergmann and contributors.

..                                                                  2 / 2 (100%)

Time: 735 ms, Memory: 20.00 MB

OK (2 tests, 2 assertions)
```

ㄟ ？哪裡來的兩個測試？哈，原來是 Laravel 自己就附帶兩個測試了，一個是`Feature/ExampleTest.php`，另一個則是`Unit/ExampleTest.php`

然後你會看到類似`assert`為前綴的函式，那就是可以讓我們做結果對應的函式喔。詳細的使用信息你可以參考這個文件：https://laravel.com/docs/6.x/http-tests#available-assertions

# 做個示範：以新增文章還有測試 Relationship 為例

接下來，我們來做個範例測試，測試我們之前寫的新增文章還有測試 Relationship 的部分。

## 新增文章(Feature)

```
$ php artisan make:test ArticleTest
```

接下來你就會看到在`feature`底下有一個`ArticleTest.php`，之後請將裡面的`TestExample`拿掉並貼上

```
    public function testAddArticle()
    {
        $response = $this->post(
            '/article',
            [
                'title' => 'Testing',
                'content' => 'Testing'
            ]
        );

        $response->assertRedirect('/article');
    }
```

執行指令（filter 的參數可以幫助我們只要指定某個測試，而這個參數就是每個 function 去掉前面的 test 即可）

```
$ ./vendor/bin/phpunit --filter=AddArticle
```

接下來如果你拿到

```
OK (1 test, 2 assertions)
```

那你就順利囉～～

## 測試 Relationship(Unit)

接下來我們也順便講關於`unit`的部分，測試 Article 和 Tag 之間的關係

```
$ php artisan make:test ArticleModelTest --unit
```

接下來你就會看到在`unit`底下有一個`ArticleModelTest.php`，之後請將裡面的`TestExample`拿掉並貼上

```
    public function testHaveManyTags()
    {
        $article = \App\Article::first();
        $this->assertInstanceOf(Collection::class, $article->tags);
    }
```

執行指令（filter 的參數可以幫助我們只要指定某個測試，而這個參數就是每個 function 去掉前面的 test 即可）

```
$ ./vendor/bin/phpunit --filter=HaveManyTags
```

接下來如果你拿到

```
OK (1 test, 1 assertions)
```

那恭喜你，結束本日的課程。

要看完整程式碼的可以參考這裡:https://github.com/r567tw/Make-PHP-Great-Again/commit/0d29855f462cecc952f33cefd51ce0696ee2bb12
