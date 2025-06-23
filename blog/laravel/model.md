---
title: Laravel Model
date: '2019-09-21 09:13:55+00:00'
tags:
- laravel
- ithome
---

前面我們已經把資料庫都已經準備好了，接下來我們要進入 MVC 之中的 M 了，就是與業務邏輯、資料庫溝通有關係的那一層，在這裏，我們以 Article 為例 (文章) 
    
讓我們用 artisan 來製作我們的 model 吧，使用指令
    
```shell
php artisan make:model Article
```

接下來你就會看到在 App 這個資料夾出現了`Article.php`，讓我們打開他看看 Laravel 為了我們寫了什麼，讓我們按 code 說故事
        
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    //
}

```

對，其實就是這麼簡單，他只是繼承了 Eloquent\Model 這個 Class，你可不要小看這個 Eloquent\Model，他算是 Laravel 裡的 ORM，他其實裡面很多功能很多東西呢！
    
註：ORM 就是指說我們可以使用物件導向的方法去與資料庫溝通，詳情可以看到最後
    
讓我們看看文件：
https://laravel.com/docs/5.8/eloquent

中文也可以通喔：https://laravel.tw/docs/5.3/eloquent
    
其實你可以看到，他在裡面可以使用類似這樣

```php
protected $table = '<任何你想要宣告的table名稱>';
```
    
假設 Article 這個 model 所要對應到的資料表不是 Articles，那麼你就可以使用這個屬性，將 Model 與 table 作出對應。不過你要知道框架之所以為框架，他就是可以有些「約定成俗」的事情所以如果你的資料表像前面所說的是 articles，那麼根本不用管這個$table 啦～
    
如果你看文件大部分都告訴你了除了可以自訂$table 以外也可以自訂： 

- `$primaryKey`
- `$incrementing`
- `$keyType`
- `$timestamps`
      
除了這些自訂屬性以外，你更可以優雅的索取你所要的資料呢，如文件所下
    
    
```php
$flights = App\Flight::where('active', 1)
               ->orderBy('name', 'desc')
               ->take(10)
               ->get();
```

按著 code 說故事就是說:`搜尋Flight裡active為1的，按照名稱遞減，只取前面十個`
    
Eloquent 本身有簡單的 CRUD 方法:
 
- all()
- create()
- find()
- update()
- delete()
      
夠優雅吧！我告訴你，礙於篇幅關係我在這裡不會多講，但在以後會專門找一章把這些東西整理一次給你～他也可以宣告 relationship、可以處理 attributes、可以允許別人大量的輸入資料等等附帶功能
    
敬請期待未來我們 Make php great again 吧